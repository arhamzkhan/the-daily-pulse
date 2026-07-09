"use client";

import { useMemo, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const PUBLIC_BASE_URL = "https://the-daily-pulse.com";
const DISPLAY_SIZE = 260;
const EXPORT_SIZE = 2048;

type QRCodeGeneratorProps = {
  businessSlug: string;
  businessName?: string;
};

export default function QRCodeGenerator({
  businessSlug,
  businessName,
}: QRCodeGeneratorProps) {
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const exportCanvasRef = useRef<HTMLCanvasElement>(null);
  const [downloading, setDownloading] = useState(false);

  const reviewUrl = useMemo(
    () => `${PUBLIC_BASE_URL}/review/${businessSlug}`,
    [businessSlug]
  );

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
    <section className="rounded-2xl border border-white/10 bg-[#111115] p-7 shadow-2xl shadow-black/30">
      <div className="mb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-400">
          QR Standee Manager
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">
          Your print-ready check-in code
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          Place this at reception, mirrors, or checkout counters. Customers scan once to leave a
          Google review or reach your manager on WhatsApp.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/8 bg-[#09090b] p-6">
        <div className="rounded-2xl border border-white/10 bg-white p-4 shadow-[0_0_40px_rgba(255,255,255,0.06)]">
          <QRCodeCanvas
            ref={displayCanvasRef}
            value={reviewUrl}
            size={DISPLAY_SIZE}
            level="H"
            marginSize={2}
            bgColor="#ffffff"
            fgColor="#09090b"
            title={`QR code for ${businessName || businessSlug}`}
          />
        </div>

        <div className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Public link
          </p>
          <p className="mt-1 break-all text-sm font-medium text-zinc-200">{reviewUrl}</p>
        </div>

        <button
          type="button"
          onClick={downloadPng}
          disabled={downloading}
          className="w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-[#09090b] transition hover:bg-zinc-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {downloading ? "Preparing download..." : "Download PNG"}
        </button>

        <p className="text-center text-xs text-zinc-500">
          Exports a high-resolution {EXPORT_SIZE}px PNG for professional printing.
        </p>
      </div>

      {/* Hidden high-res canvas used only for print-quality export */}
      <div className="sr-only" aria-hidden="true">
        <QRCodeCanvas
          ref={exportCanvasRef}
          value={reviewUrl}
          size={EXPORT_SIZE}
          level="H"
          marginSize={2}
          bgColor="#ffffff"
          fgColor="#09090b"
        />
      </div>
    </section>
  );
}
