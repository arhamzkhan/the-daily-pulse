import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import OnboardingForm from "./OnboardingForm";

export const metadata = {
  title: "Account Setup",
};

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/onboarding");
  }

  const { data: existingBusiness } = await supabase
    .from("businesses")
    .select("id, industry_type")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingBusiness?.industry_type) {
    redirect("/dashboard");
  }

  return <OnboardingForm existingBusinessId={existingBusiness?.id ?? null} />;
}
