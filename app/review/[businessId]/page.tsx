import type { Metadata } from "next";
import { getBusinessById, supabase } from "@/lib/supabase";
import ReviewClient from "./ReviewClient";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ businessId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { businessId } = await params;
  const decodedId = decodeURIComponent(businessId);
  const business = await getBusinessById(decodedId);

  if (!business) {
    return { title: "Check-in Not Found" };
  }

  return {
    title: `${business.name} — ${business.branch_name}`,
    description: `Share your feedback with ${business.name}.`,
  };
}

function StatusCard({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-neutral-950 px-4 py-8 text-center text-neutral-100">
      <div className="w-full max-w-[420px] rounded-3xl border border-neutral-800 bg-neutral-900 px-6 py-10 shadow-2xl">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-950 text-2xl text-emerald-400">
          ◌
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">{message}</p>
      </div>
    </div>
  );
}

export default async function ReviewPage({ params }: PageProps) {
  const { businessId } = await params;

  // Fetch business metadata
  const decodedId = decodeURIComponent(businessId);
  const business = await getBusinessById(decodedId);

  if (!business) {
    return (
      <StatusCard
        title="Check-in Point Not Found"
        message="This link may be incorrect or no longer active. Please ask the staff for the correct QR code."
      />
    );
  }

  // Check if business has a valid user link and is active
  if (!business.user_id || !business.is_active) {
    return (
      <StatusCard
        title="Service Suspended"
        message="This check-in point is currently inactive. Please contact the branch management for assistance."
      />
    );
  }

  // Increment scans asynchronously
  const { error: scanError } = await supabase.rpc("increment_scans", {
    business_id: businessId,
  });

  if (scanError) {
    console.error("[Tracking] increment_scans failed:", scanError.message);
  }

  const isRtl = business.language_preference === "urdu";

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="min-h-[100dvh] bg-neutral-950 font-sans antialiased text-neutral-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[420px]">
        <ReviewClient business={business} />
      </div>
    </div>
  );
}
