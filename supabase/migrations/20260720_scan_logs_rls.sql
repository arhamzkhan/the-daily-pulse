-- ============================================================
-- The Daily Pulse — Scan Logs Row Level Security Migration
-- Implements robust, secure table-level policies on 'scan_logs'
-- ============================================================

-- 1. Enable Row Level Security on 'scan_logs'
ALTER TABLE scan_logs ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies if any
DROP POLICY IF EXISTS "Public can insert scan logs" ON scan_logs;
DROP POLICY IF EXISTS "Owners can select scan logs" ON scan_logs;

-- 3. Policy: Public can insert scan logs (anon and authenticated users can log scan/clicks)
CREATE POLICY "Public can insert scan logs"
  ON scan_logs FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 4. Policy: Owners can select scan logs (authenticated business owners can read their logs)
CREATE POLICY "Owners can select scan logs"
  ON scan_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = scan_logs.business_id
        AND businesses.user_id = auth.uid()
    )
  );
