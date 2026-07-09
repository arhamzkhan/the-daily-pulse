/**
 * app/review/layout.tsx
 * Sub-layout for the /review segment.
 * Keeps the shared outer review structure DRY.
 */
export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
