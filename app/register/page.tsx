"use client";

import { FormEvent, useMemo, useState } from "react";

type RegisterResponse = {
  success: boolean;
  business_id: string;
  public_link: string;
};

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    branch_name: "",
    google_review_url: "",
    manager_whatsapp: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<RegisterResponse | null>(null);
  const [downloading, setDownloading] = useState(false);

  const qrUrl = useMemo(() => {
    if (!result?.public_link) return "";
    return `https://api.qrserver.com/v1/create-qr-code/?size=340x340&format=png&data=${encodeURIComponent(result.public_link)}`;
  }, [result?.public_link]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!/^92\d{10}$/.test(form.manager_whatsapp.trim())) {
      setError("WhatsApp number must start with 92 and be followed by 10 digits.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || "Unable to create account.");
      }

      setResult(data);
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function downloadQr() {
    if (!qrUrl || !result) return;
    setDownloading(true);
    try {
      const response = await fetch(qrUrl);
      if (!response.ok) {
        throw new Error("Failed to download QR code.");
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = `${result.business_id}-qr.png`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (err: any) {
      setError(err?.message || "Unable to download QR code.");
    } finally {
      setDownloading(false);
    }
  }

  if (result) {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#09090b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "540px",
            backgroundColor: "#111115",
            border: "1px solid #27272a",
            borderRadius: "20px",
            padding: "30px",
            color: "#f4f4f5",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#10b981", margin: "0 0 8px 0", fontWeight: 600 }}>
            Account created successfully
          </p>
          <h1 style={{ margin: "0 0 16px 0", fontSize: "30px", letterSpacing: "-0.03em" }}>
            Your public page is ready
          </h1>
          <p style={{ margin: "0 0 20px 0", color: "#a1a1aa" }}>
            Share this link or print the QR code for your counter.
          </p>

          <a
            href={result.public_link}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "10px",
              padding: "10px 14px",
              color: "#d4d4d8",
              textDecoration: "none",
              marginBottom: "22px",
              wordBreak: "break-all",
            }}
          >
            {result.public_link}
          </a>

          {qrUrl ? (
            <div style={{ display: "grid", placeItems: "center", gap: "14px" }}>
              <img
                src={qrUrl}
                alt="QR code for business public page"
                width={260}
                height={260}
                style={{
                  borderRadius: "14px",
                  border: "1px solid #27272a",
                  backgroundColor: "#fff",
                  padding: "8px",
                }}
              />

              <button
                type="button"
                onClick={downloadQr}
                disabled={downloading}
                style={{
                  width: "100%",
                  maxWidth: "260px",
                  border: "none",
                  borderRadius: "10px",
                  backgroundColor: "#ffffff",
                  color: "#09090b",
                  padding: "12px",
                  fontWeight: 700,
                  cursor: downloading ? "not-allowed" : "pointer",
                  opacity: downloading ? 0.8 : 1,
                }}
              >
                {downloading ? "Downloading..." : "Download QR Code"}
              </button>
            </div>
          ) : null}
        </section>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#09090b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "540px",
          backgroundColor: "#111115",
          border: "1px solid #27272a",
          borderRadius: "20px",
          padding: "30px",
          color: "#f4f4f5",
        }}
      >
        <p
          style={{
            margin: "0 0 8px 0",
            color: "#10b981",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 700,
          }}
        >
          The Daily Pulse
        </p>
        <h1 style={{ margin: "0 0 10px 0", fontSize: "30px", letterSpacing: "-0.03em" }}>
          Business registration
        </h1>
        <p style={{ margin: "0 0 24px 0", color: "#a1a1aa" }}>
          Create your account and instantly get your shareable public feedback link.
        </p>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: "14px" }}>
          <label style={{ display: "grid", gap: "7px", fontSize: "14px" }}>
            Business Name
            <input
              required
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="e.g., Slotly Salon"
              style={{
                border: "1px solid #27272a",
                backgroundColor: "#09090b",
                color: "#f4f4f5",
                borderRadius: "10px",
                padding: "12px",
                outline: "none",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: "7px", fontSize: "14px" }}>
            Branch Location
            <input
              required
              value={form.branch_name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, branch_name: event.target.value }))
              }
              placeholder="e.g., Gulberg, DHA"
              style={{
                border: "1px solid #27272a",
                backgroundColor: "#09090b",
                color: "#f4f4f5",
                borderRadius: "10px",
                padding: "12px",
                outline: "none",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: "7px", fontSize: "14px" }}>
            Google Review Profile URL
            <input
              required
              type="url"
              value={form.google_review_url}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, google_review_url: event.target.value }))
              }
              placeholder="https://www.google.com/maps/..."
              style={{
                border: "1px solid #27272a",
                backgroundColor: "#09090b",
                color: "#f4f4f5",
                borderRadius: "10px",
                padding: "12px",
                outline: "none",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: "7px", fontSize: "14px" }}>
            Manager WhatsApp Number
            <input
              required
              value={form.manager_whatsapp}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, manager_whatsapp: event.target.value }))
              }
              placeholder="923001234567"
              style={{
                border: "1px solid #27272a",
                backgroundColor: "#09090b",
                color: "#f4f4f5",
                borderRadius: "10px",
                padding: "12px",
                outline: "none",
              }}
            />
          </label>

          {error ? (
            <p style={{ margin: "0", color: "#f87171", fontSize: "14px" }}>{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "4px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#ffffff",
              color: "#09090b",
              padding: "12px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </section>
    </main>
  );
}
