-- ============================================================
-- The Daily Pulse — Multi-Tenancy + Industry Theming Migration
-- Run in Supabase SQL Editor or via supabase db push
-- ============================================================

-- 1. Industry type enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'industry_type') THEN
    CREATE TYPE industry_type AS ENUM ('salon', 'gym', 'dining', 'cafe', 'retail');
  END IF;
END $$;

-- 2. Secure user link (CASCADE) + industry column + analytics counters
ALTER TABLE businesses
  DROP CONSTRAINT IF EXISTS businesses_user_id_fkey;

ALTER TABLE businesses
  ADD COLUMN IF NOT EXISTS industry_type industry_type DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS total_scans INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS google_clicks INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS whatsapp_clicks INTEGER NOT NULL DEFAULT 0;

ALTER TABLE businesses
  ADD CONSTRAINT businesses_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_businesses_industry ON businesses(industry_type);

-- 3. Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read businesses" ON businesses;
DROP POLICY IF EXISTS "Owners can insert their business" ON businesses;
DROP POLICY IF EXISTS "Owners can update their business" ON businesses;
DROP POLICY IF EXISTS "Owners can delete their business" ON businesses;

CREATE POLICY "Public can read businesses"
  ON businesses FOR SELECT
  USING (true);

CREATE POLICY "Owners can insert their business"
  ON businesses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owners can update their business"
  ON businesses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owners can delete their business"
  ON businesses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 4. Analytics RPC helpers (idempotent)
CREATE OR REPLACE FUNCTION increment_scans(business_id VARCHAR)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE businesses
  SET total_scans = total_scans + 1
  WHERE id = business_id;
END;
$$;

CREATE OR REPLACE FUNCTION increment_google_clicks(row_id VARCHAR)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE businesses
  SET google_clicks = google_clicks + 1
  WHERE id = row_id;
END;
$$;

CREATE OR REPLACE FUNCTION increment_whatsapp_clicks(row_id VARCHAR)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE businesses
  SET whatsapp_clicks = whatsapp_clicks + 1
  WHERE id = row_id;
END;
$$;

GRANT EXECUTE ON FUNCTION increment_scans(VARCHAR) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_google_clicks(VARCHAR) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_whatsapp_clicks(VARCHAR) TO anon, authenticated;
