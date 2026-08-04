# Security Audit Report: Voucho

**Date:** July 20, 2026
**Auditor:** Jules, Lead Security Engineer

This document presents the findings of a comprehensive security audit of the Voucho codebase.

---

## Executive Summary
Voucho is a full-stack Next.js 16 application integrating Supabase, SSR, and PostgreSQL. While the codebase uses parameterized queries and secure security headers, several critical security vulnerabilities exist regarding Row Level Security (RLS), Access Control, Server Action validation, and Open Redirects.

---

## Issue Severity Classification

### 1. Critical Issues

#### 1.1. Unauthenticated Administrative Server Actions (`app/admin/page.tsx`)
- **Vulnerability Type:** Broken Access Control / Authentication Bypass
- **Description:** Server actions `updateBusinessStatus`, `updateBusinessDetails`, and `terminateBusiness` in `app/admin/page.tsx` are exported as direct POST endpoints. They do not perform any authentication or user role verification server-side. An attacker can directly call these actions with arbitrary business IDs to modify or permanently delete any business's data.
- **Remediation:** Authenticate the user session server-side using `supabase.auth.getUser()`, verify that `user_metadata.is_admin === true`, and execute the operation using the elevated `getServiceSupabase()` client only after authorized access is proven.

#### 1.2. Complete Authentication Bypass & IDOR in Legacy `/api/admin` Route (`app/api/admin/route.ts`)
- **Vulnerability Type:** Insecure Direct Object Reference (IDOR) & Authentication Bypass
- **Description:** The legacy route `/api/admin/route.ts` contains GET and POST endpoints that query and update business configurations directly based on the `id` request parameter. It does not perform any authorization check. Anyone can read sensitive details or overwrite settings (e.g., WhatsApp number or Google Review URL) for any business in the system.
- **Remediation:** Implement server-side authentication and check for admin roles. Better yet, secure these endpoints with strict session validation.

---

### 2. High Issues

#### 2.1. Missing Row Level Security on `scan_logs` Table
- **Vulnerability Type:** Broken Object Level Authorization (BOLA)
- **Description:** The `scan_logs` table stores analytical click and view events. Row Level Security (RLS) is not enabled on this table. Anyone with the public anon key can perform arbitrary SELECT, UPDATE, or DELETE queries on this table, exposing private analytics, rating, and device logs for all businesses.
- **Remediation:** Enable RLS on `scan_logs`. Add policies to allow anonymous inserts (`TO anon, authenticated WITH CHECK (true)`) and restrict read access solely to the authenticated business owner.

#### 2.2. Functional Security Denial of Service in Portal Actions (`app/portal/actions.ts`)
- **Vulnerability Type:** Broken Access Control / Database Permission Misconfiguration
- **Description:** The administrative portal actions check the `portal_session` cookie but use the standard browser-synchronized `createClient()` instance. Because RLS restricts update/delete permissions to `auth.uid() = user_id`, these operations fail for portal admins because they are not signed into Supabase auth as the specific business owner.
- **Remediation:** After verifying the active administrative session, use the server-side elevated `getServiceSupabase()` client to bypass RLS and perform administrative edits.

---

### 3. Medium Issues

#### 3.1. Open Redirect in Redirect Router (`app/api/click/route.ts`)
- **Vulnerability Type:** Unvalidated Redirect (Open Redirect)
- **Description:** The click tracking route `/api/click` takes an unvalidated `url` or `to` query parameter and issues a direct redirect via `NextResponse.redirect(targetUrl)`. This allows attackers to construct phishing URLs under the trusted application domain (e.g., `https://trusted-domain.com/api/click?id=XYZ&type=google&url=https://phishing.com`).
- **Remediation:** Query the business by ID and assert that the redirected `targetUrl` perfectly starts with or matches either the registered `google_review_url` or the formatted `manager_whatsapp` URL for that business.

#### 3.2. Open Redirect in Auth Session Router (`lib/auth-actions.ts`)
- **Vulnerability Type:** Unvalidated Redirect (Open Redirect)
- **Description:** The login action retrieves an untrusted `next` URL from the login form data and performs a redirect.
- **Remediation:** Restrict the `next` value to relative paths (e.g., requiring it to start with `/` and not `//`).

#### 3.3. Permissive Row Level Security Select Policy on `businesses` Table
- **Vulnerability Type:** Excessive Data Exposure / Information Leakage
- **Description:** The SELECT policy for `businesses` is `USING (true)`. While this allows public lookups, any client can fetch all entries of the `businesses` table, revealing manager WhatsApp numbers and internal analytics.
- **Remediation:** Standardize business querying through secured server endpoints or secure views if business-wide listing is undesirable.

---

### 4. Low Issues
*(None identified)*

---

### 5. Informational Issues

#### 5.1. Session Token Refreshes in Middleware
- **Recommendation:** Although session handling is securely managed via cookie-based `@supabase/ssr` methods, Next.js middleware is currently not configured to automatically refresh sessions on every navigation request. We recommend adding token refreshing to middleware to ensure continuous, seamless user sessions.

#### 5.2. Secrets Management
- **Status: Verified Secure**
- **Details:** The Supabase Service Role key is kept strictly server-only. Only the public `anon` key is exposed to the frontend. All sensitive values are managed in `.env.local` and excluded from git tracking.
