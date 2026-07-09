-- ============================================================
-- The Daily Pulse — Database Schema
-- PostgreSQL DDL with parameterized-query-safe structure
-- ============================================================

CREATE TABLE IF NOT EXISTS businesses (
    id                   VARCHAR(50)  PRIMARY KEY,
    user_id              UUID         REFERENCES auth.users(id) ON DELETE SET NULL,
    name                 VARCHAR(100) NOT NULL,
    branch_name          VARCHAR(100) NOT NULL,
    google_review_url    TEXT         NOT NULL,
    manager_whatsapp     VARCHAR(32)  NOT NULL,
    language_preference  VARCHAR(15)  NOT NULL DEFAULT 'roman_urdu'
                             CHECK (language_preference IN ('english', 'roman_urdu', 'urdu')),
    is_active            BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at           TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scan_logs (
    id           SERIAL      PRIMARY KEY,
    business_id  VARCHAR(50) REFERENCES businesses(id) ON DELETE CASCADE,
    action_type  VARCHAR(20) NOT NULL
                     CHECK (action_type IN ('page_view', 'review_click', 'manager_click')),
    scanned_at   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_businesses_user ON businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_scanlogs_business ON scan_logs(business_id);
CREATE INDEX IF NOT EXISTS idx_scanlogs_action   ON scan_logs(action_type);
-- Composite index used by the 5-second duplicate-suppression window query
CREATE INDEX IF NOT EXISTS idx_scanlogs_dedup
    ON scan_logs(business_id, action_type, scanned_at DESC);
