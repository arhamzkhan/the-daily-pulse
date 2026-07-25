import { redirect } from "next/navigation";

export const metadata = {
  title: "Account Setup",
};

export default async function OnboardingPage() {
  redirect("/dashboard");
}
