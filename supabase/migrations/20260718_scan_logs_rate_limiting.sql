-- ============================================================
-- The Daily Pulse — Scan Logs Rate Limiting Migration
-- Implements database-level strict rate-limiting on 'scan_logs'
-- ============================================================

-- 1. Add client_hash column to scan_logs to identify unique clients securely
ALTER TABLE scan_logs 
  ADD COLUMN IF NOT EXISTS client_hash VARCHAR(64) DEFAULT NULL;

-- Create an index to quickly lookup logs by client_hash and scanned_at for rate checking
CREATE INDEX IF NOT EXISTS idx_scanlogs_client_rate
  ON scan_logs(client_hash, scanned_at DESC);

-- 2. Create the rate-limiting trigger function
CREATE OR REPLACE FUNCTION enforce_scan_logs_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_count INTEGER;
  v_limit CONSTANT INTEGER := 10; -- Max 10 log inserts per minute per client/business
  v_window CONSTANT INTERVAL := INTERVAL '1 minute';
BEGIN
  -- If client_hash is not provided (e.g., from legacy client), bypass database-level IP check
  IF NEW.client_hash IS NULL OR NEW.client_hash = '' THEN
    RETURN NEW;
  END IF;

  -- Count previous inserts in the rate window for this specific client and business
  SELECT COUNT(*)
  INTO v_count
  FROM scan_logs
  WHERE client_hash = NEW.client_hash
    AND business_id = NEW.business_id
    AND scanned_at >= NOW() - v_window;

  -- Check if threshold is exceeded
  IF v_count >= v_limit THEN
    RAISE EXCEPTION 'Rate limit exceeded. Maximum % scan events allowed per %.', v_limit, v_window
      USING ERRCODE = 'base36_limit_exceeded'; -- Custom SQLSTATE or general exception
  END IF;

  RETURN NEW;
END;
$$;

-- 3. Bind the trigger to scan_logs table
DROP TRIGGER IF EXISTS trigger_scan_logs_rate_limit ON scan_logs;
CREATE TRIGGER trigger_scan_logs_rate_limit
  BEFORE INSERT ON scan_logs
  FOR EACH ROW
  EXECUTE FUNCTION enforce_scan_logs_rate_limit();
