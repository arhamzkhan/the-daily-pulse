"use client";

import { useState } from "react";
import QRCodeGenerator from "@/app/admin/components/QRCodeGenerator";
import type { Business } from "@/lib/supabase";
import { MapPin, Package, CheckCircle2, Navigation } from "lucide-react";

type QRPanelProps = {
  business: Business;
  message: string;
  setMessage: (message: string) => void;
  syncDatabase: (updatedFields: Partial<Business>) => Promise<void>;
};

export default function QRPanel({
  business,
  message,
  setMessage,
  syncDatabase,
}: QRPanelProps) {
  const [address, setAddress] = useState("");
  const [secondaryAddress, setSecondaryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [ordered, setOrdered] = useState(false);

  async function detectLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data.display_name) setAddress(data.display_name);
        } catch (err) {
          console.error(err);
        }
        setDetecting(false);
      },
      () => {
        setDetecting(false);
        alert("Unable to detect your location.");
      }
    );
  }

  async function submitOrder(event: React.FormEvent) {
    event.preventDefault();
    const fullPhone = `92${phone}`;
    if (!address.trim()) { setMessage("Please enter a delivery address."); return; }
    if (!/^92\d{10}$/.test(fullPhone)) { setMessage("Invalid phone number."); return; }
    try {
      await syncDatabase({ order_requested: true });
      setOrdered(true);
      setMessage("Standee order received. Our team will contact you shortly.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Unable to place order.");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-zinc-800/80 bg-zinc-900/60 text-white text-sm p-3.5 outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-zinc-600";

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <QRCodeGenerator businessSlug={business.id} businessName={business.name} />

      <section className="rounded-2xl border border-zinc-800/80 bg-[#121215] p-6 overflow-hidden relative">
        {/* Ambient glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-[0.05] bg-amber-500" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
              <Package className="h-3.5 w-3.5 text-amber-400" strokeWidth={1.75} />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-500">
              Physical Standee
            </p>
          </div>

          <h2 className="mt-3 text-2xl font-bold text-white tracking-tight">
            Order Acrylic Standee
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            We'll print your premium acrylic standee with your QR code already
            attached and deliver it ready to place at your reception.
          </p>

          {ordered ? (
            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <h3 className="font-semibold text-emerald-400 text-sm">Order Submitted</h3>
                <p className="mt-1 text-xs text-emerald-500/70">
                  We'll contact you before dispatching your standee.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={submitOrder} className="mt-6 space-y-4">
              <button
                type="button"
                onClick={detectLocation}
                disabled={detecting}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-800/60 hover:border-zinc-700/80 py-3 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-50"
              >
                <Navigation
                  className={`h-4 w-4 text-blue-400 ${detecting ? "animate-spin" : ""}`}
                  strokeWidth={1.75}
                />
                {detecting ? "Detecting location..." : "Detect My Location"}
              </button>

              {coords && (
                <iframe
                  className="h-48 w-full rounded-xl border border-zinc-800/80"
                  src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
                />
              )}

              <textarea
                rows={3}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Delivery Address"
                className={inputClass}
              />

              <input
                value={secondaryAddress}
                onChange={(e) => setSecondaryAddress(e.target.value)}
                placeholder="Suite / Floor / Landmark (optional)"
                className={inputClass}
              />

              <div className="flex">
                <div className="flex items-center rounded-l-xl border border-r-0 border-zinc-800/80 bg-zinc-900/80 px-4 text-sm font-semibold text-zinc-400">
                  +92
                </div>
                <input
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="3001234567"
                  className="w-full rounded-r-xl border border-zinc-800/80 bg-zinc-900/60 text-white text-sm p-3.5 outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-zinc-600"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 py-3.5 text-sm font-bold text-zinc-950 transition-all hover:from-amber-400 hover:to-amber-300 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.99]"
              >
                Request Standee Delivery
              </button>
            </form>
          )}

          {message && !ordered && (
            <p className="mt-4 text-xs text-zinc-500 text-center">{message}</p>
          )}
        </div>
      </section>
    </div>
  );
}