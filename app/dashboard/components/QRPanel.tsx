"use client";

import { useState } from "react";
import QRCodeGenerator from "@/app/admin/components/QRCodeGenerator";
import type { Business } from "@/lib/supabase";

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

        setCoords({
          lat: latitude,
          lng: longitude,
        });

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();

          if (data.display_name) {
            setAddress(data.display_name);
          }
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

    if (!address.trim()) {
      setMessage("Please enter a delivery address.");
      return;
    }

    if (!/^92\d{10}$/.test(fullPhone)) {
      setMessage("Invalid phone number.");
      return;
    }

    try {
      await syncDatabase({
        order_requested: true,
      });

      setOrdered(true);

      setMessage(
        "Standee order received. Our team will contact you shortly."
      );
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Unable to place order."
      );
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <QRCodeGenerator
        businessSlug={business.id}
        businessName={business.name}
      />

      <section className="rounded-3xl border border-zinc-800/60 bg-[#111115] p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Physical Standee
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Order Acrylic Standee
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          We'll print your premium acrylic standee with your QR code already
          attached and deliver it ready to place at your reception.
        </p>

        {ordered ? (
          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <h3 className="font-semibold text-emerald-400">
              ✅ Order Submitted
            </h3>

            <p className="mt-2 text-sm text-emerald-500">
              We'll contact you before dispatching your standee.
            </p>
          </div>
        ) : (
          <form
            onSubmit={submitOrder}
            className="mt-8 space-y-5"
          >
            <button
              type="button"
              onClick={detectLocation}
              disabled={detecting}
              className="w-full rounded-2xl border border-zinc-800/60 bg-zinc-900 hover:bg-zinc-800 py-3 font-semibold text-white transition"
            >
              {detecting
                ? "Detecting location..."
                : "📍 Detect My Location"}
            </button>

            {coords && (
              <iframe
                className="h-52 w-full rounded-2xl border border-zinc-800/60"
                src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`}
              />
            )}

            <textarea
              rows={3}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Delivery Address"
              className="w-full rounded-2xl border border-zinc-800/60 bg-[#18181b] text-white p-4 outline-none focus:border-amber-500 transition-colors"
            />

            <input
              value={secondaryAddress}
              onChange={(e) => setSecondaryAddress(e.target.value)}
              placeholder="Suite / Floor / Landmark"
              className="w-full rounded-2xl border border-zinc-800/60 bg-[#18181b] text-white p-4 outline-none focus:border-amber-500 transition-colors"
            />

            <div className="flex">
              <div className="flex items-center rounded-l-2xl border border-r-0 border-zinc-800/60 bg-zinc-900 px-4 font-semibold text-zinc-300">
                +92
              </div>

              <input
                maxLength={10}
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, ""))
                }
                placeholder="3001234567"
                className="w-full rounded-r-2xl border border-zinc-800/60 bg-[#18181b] text-white p-4 outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <button
              className="w-full rounded-2xl bg-amber-500 py-4 font-semibold text-zinc-950 transition hover:bg-amber-400"
            >
              Request Standee
            </button>
          </form>
        )}

        {message && (
          <p className="mt-5 text-sm text-zinc-400">
            {message}
          </p>
        )}
      </section>
    </div>
  );
}