-- ============================================================
-- The Daily Pulse — Scan Logs Analytics Enhancement
-- Adds rating and device_type to scan_logs for the analytics dashboard
-- ============================================================

ALTER TABLE scan_logs
  ADD COLUMN IF NOT EXISTS rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  ADD COLUMN IF NOT EXISTS device_type VARCHAR(50) DEFAULT 'unknown';

-- Index for analytics performance
CREATE INDEX IF NOT EXISTS idx_scanlogs_rating ON scan_logs(rating);
