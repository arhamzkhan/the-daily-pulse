"use client";

import { useMemo, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { getReviewUrl } from "@/lib/site";
import type { IndustryTheme } from "@/lib/themes";

const DISPLAY_SIZE = 260;
const EXPORT_SIZE = 2048;

type QRCodeGeneratorProps = {
  businessSlug: string;
  businessName?: string;
  theme?: IndustryTheme;
};

export default function QRCodeGenerator({
  businessSlug,
  businessName,
  theme,
}: QRCodeGeneratorProps) {
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const exportCanvasRef = useRef<HTMLCanvasElement>(null);
  const [downloading, setDownloading] = useState(false);

  const reviewUrl = useMemo(() => getReviewUrl(businessSlug), [businessSlug]);

  const cardClass = theme
    ? `rounded-2xl border p-7 ${theme.cardBg} ${theme.cardBorder} ${theme.shadow}`
    : "rounded-2xl border border-[#1e1e24]/10 bg-white/80 p-7 shadow-xl shadow-[#1e1e24]/5";
  const titleClass = theme ? `${theme.headingFont} ${theme.title}` : "font-semibold text-[#1e1e24]";
  const subtitleClass = theme ? theme.subtitle : "text-[#1e1e24]/60";
  const eyebrowClass = theme ? theme.eyebrow : "text-[#1a5c4d] tracking-[0.18em]";
  const innerClass = theme
    ? `rounded-2xl border p-6 ${theme.cardBorder} ${theme.pageBg}`
    : "rounded-2xl border border-[#1e1e24]/10 bg-[#fdfbf7] p-6";
  const buttonClass = theme
    ? `w-full rounded-xl px-4 py-3.5 text-sm font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 ${theme.googleButton}`
    : "w-full rounded-xl bg-[#1a5c4d] py-3.5 text-sm font-semibold text-white transition hover:bg-[#164d41] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70";

  async function downloadPng() {
    const exportCanvas = exportCanvasRef.current;
    if (!exportCanvas) return;

    setDownloading(true);
    try {
      await new Promise((resolve) => requestAnimationFrame(resolve));

      const dataUrl = exportCanvas.toDataURL("image/png");
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = `${businessSlug}-qr-standee.png`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    } finally {
      setDownloading(false);
    }
  }

  return (
    <section className={cardClass}>
      <div className="mb-6">
        <p className={`text-[11px] font-bold uppercase ${eyebrowClass}`}>QR & Standee</p>
        <h2 className={`mt-2 text-xl tracking-tight ${titleClass}`}>Your unique check-in QR code</h2>
        <p className={`mt-2 text-sm leading-relaxed ${subtitleClass}`}>
          Voucho generates a QR code string pointing to{" "}
          <strong className="font-semibold">{reviewUrl}</strong>. Download or print this code for
          your counter. When you order an acrylic standee, we apply this exact code to the physical
          unit before shipping it to your branch.
        </p>
      </div>

      <div className={`flex flex-col items-center gap-6 ${innerClass}`}>
        <div className="rounded-2xl border border-[#1e1e24]/10 bg-white p-4 shadow-sm">
          <QRCodeCanvas
            ref={displayCanvasRef}
            value={reviewUrl}
            size={DISPLAY_SIZE}
            level="H"
            marginSize={2}
            bgColor="#ffffff"
            fgColor="#1e1e24"
            title={`QR code for ${businessName || businessSlug}`}
          />
        </div>

        <div className={`w-full rounded-xl border px-4 py-3 text-center ${theme ? theme.cardBorder : "border-[#1e1e24]/10"} ${theme ? theme.pageBg : "bg-white/80"}`}>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${subtitleClass}`}>
            Encoded URL
          </p>
          <p className={`mt-1 break-all text-sm font-medium ${theme ? theme.title : "text-[#1e1e24]"}`}>
            {reviewUrl}
          </p>
        </div>

        <button type="button" onClick={downloadPng} disabled={downloading} className={buttonClass}>
          {downloading ? "Preparing download..." : "Download PNG"}
        </button>

        <p className={`text-center text-xs ${subtitleClass}`}>
          Exports a high-resolution {EXPORT_SIZE}px PNG for professional printing.
        </p>
      </div>

      <div className="sr-only" aria-hidden="true">
        <QRCodeCanvas
          ref={exportCanvasRef}
          value={reviewUrl}
          size={EXPORT_SIZE}
          level="H"
          marginSize={2}
          bgColor="#ffffff"
          fgColor="#1e1e24"
        />
      </div>
    </section>
  );
}
