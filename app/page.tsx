/**
 * app/page.tsx
 * Root route — minimal landing page redirecting to the demo review route.
 * In production, this can be replaced with an admin dashboard.
 */
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to demo business for quick testing
  redirect("/review/demo-001");
}
