export type IndustryType = "salon" | "gym" | "dining" | "cafe" | "retail";

export type IndustryTheme = {
  pageBg: string;
  pageGradient: string;
  cardBg: string;
  cardBorder: string;
  headingFont: string;
  bodyFont: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
  googleButton: string;
  whatsappButton: string;
  statusIcon: string;
  shadow: string;
  reviewEyebrow: string;
};

export const INDUSTRY_OPTIONS: { value: IndustryType; label: string; description: string }[] = [
  { value: "salon", label: "Salon & Spa", description: "Clean, elegant, premium self-care" },
  { value: "gym", label: "Gym & Fitness", description: "High-energy, athletic, bold contrast" },
  { value: "dining", label: "Fine Dining", description: "Sophisticated, upscale hospitality" },
  { value: "cafe", label: "Cafe & Casual", description: "Warm, cozy, rustic everyday dining" },
  { value: "retail", label: "Retail & General", description: "Versatile, modern storefront experience" },
];

const themes: Record<IndustryType, IndustryTheme> = {
  salon: {
    pageBg: "bg-[#fdfbf7]",
    pageGradient: "bg-[radial-gradient(circle_at_50%_0%,#f5efe6_0%,#fdfbf7_70%)]",
    cardBg: "bg-[#fffdf9]",
    cardBorder: "border-[#e8dfd2]",
    headingFont: "font-serif",
    bodyFont: "font-sans",
    eyebrow: "text-[#b08d57] tracking-[0.18em]",
    title: "text-[#2a2421] font-serif",
    subtitle: "text-[#6b5f56]",
    footer: "text-[#a89585]",
    googleButton: "bg-gradient-to-r from-[#c9a66b] to-[#b76e79] text-[#fffdf9] shadow-lg shadow-[#c9a66b]/25",
    whatsappButton: "bg-[#2a2421] text-[#fdfbf7] border border-[#3d3530] shadow-lg shadow-black/10",
    statusIcon: "border-[#e8dfd2] bg-[#f8f2ea] text-[#b08d57]",
    shadow: "shadow-2xl shadow-[#c9a66b]/10",
    reviewEyebrow: "How was your visit?",
  },
  gym: {
    pageBg: "bg-[#0c0c0e]",
    pageGradient: "bg-[radial-gradient(circle_at_50%_0%,#1a1a1f_0%,#0c0c0e_70%)]",
    cardBg: "bg-[#141418]",
    cardBorder: "border-white/10",
    headingFont: "font-sans font-extrabold tracking-tight",
    bodyFont: "font-sans",
    eyebrow: "text-[#39ff14] tracking-[0.2em]",
    title: "text-white font-extrabold tracking-tight",
    subtitle: "text-zinc-400",
    footer: "text-zinc-600",
    googleButton: "bg-[#39ff14] text-[#0c0c0e] shadow-lg shadow-[#39ff14]/30 font-bold",
    whatsappButton: "bg-[#ff5a09] text-white shadow-lg shadow-[#ff5a09]/30 font-bold",
    statusIcon: "border-white/10 bg-white/[0.04] text-[#39ff14]",
    shadow: "shadow-2xl shadow-black/50",
    reviewEyebrow: "How was your session?",
  },
  dining: {
    pageBg: "bg-[#121614]",
    pageGradient: "bg-[radial-gradient(circle_at_50%_0%,#1c2420_0%,#121614_70%)]",
    cardBg: "bg-[#171c19]",
    cardBorder: "border-[#2a332d]",
    headingFont: "font-serif",
    bodyFont: "font-sans",
    eyebrow: "text-[#c9b37e] tracking-[0.18em]",
    title: "text-[#f3efe4] font-serif",
    subtitle: "text-[#9ca89f]",
    footer: "text-[#5f6b63]",
    googleButton: "bg-gradient-to-r from-[#8b6b3d] to-[#c9b37e] text-[#121614] shadow-lg shadow-[#c9b37e]/20",
    whatsappButton: "bg-[#2d3b34] text-[#f3efe4] border border-[#3d4f45] shadow-lg shadow-black/20",
    statusIcon: "border-[#2a332d] bg-[#1a211d] text-[#c9b37e]",
    shadow: "shadow-2xl shadow-black/40",
    reviewEyebrow: "How was your dining experience?",
  },
  cafe: {
    pageBg: "bg-[#f7f1e8]",
    pageGradient: "bg-[radial-gradient(circle_at_50%_0%,#efe4d4_0%,#f7f1e8_70%)]",
    cardBg: "bg-[#fffaf3]",
    cardBorder: "border-[#e2d0bc]",
    headingFont: "font-serif",
    bodyFont: "font-sans",
    eyebrow: "text-[#a65d3f] tracking-[0.16em]",
    title: "text-[#3d2b1f] font-serif",
    subtitle: "text-[#7a5c47]",
    footer: "text-[#a89585]",
    googleButton: "bg-[#c4683a] text-[#fffaf3] shadow-lg shadow-[#c4683a]/25",
    whatsappButton: "bg-[#5c3d2e] text-[#fffaf3] border border-[#6e4a38] shadow-lg shadow-[#5c3d2e]/20",
    statusIcon: "border-[#e2d0bc] bg-[#f3e8da] text-[#a65d3f]",
    shadow: "shadow-2xl shadow-[#c4683a]/10",
    reviewEyebrow: "How was your visit today?",
  },
  retail: {
    pageBg: "bg-[#09090b]",
    pageGradient: "bg-[radial-gradient(circle_at_50%_0%,#18181b_0%,#09090b_70%)]",
    cardBg: "bg-[#111115]",
    cardBorder: "border-white/10",
    headingFont: "font-sans font-bold tracking-tight",
    bodyFont: "font-sans",
    eyebrow: "text-zinc-500 tracking-[0.18em]",
    title: "text-white font-bold tracking-tight",
    subtitle: "text-zinc-400",
    footer: "text-zinc-600",
    googleButton: "bg-white text-[#09090b] shadow-lg shadow-white/10",
    whatsappButton: "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20",
    statusIcon: "border-white/10 bg-white/[0.04] text-zinc-500",
    shadow: "shadow-2xl shadow-black/40",
    reviewEyebrow: "Your feedback matters",
  },
};

export function isIndustryType(value: string | null | undefined): value is IndustryType {
  return value === "salon" || value === "gym" || value === "dining" || value === "cafe" || value === "retail";
}

export function getTheme(industry: string | null | undefined): IndustryTheme {
  if (isIndustryType(industry)) {
    return themes[industry];
  }
  return themes.retail;
}

export function getDashboardShell(theme: IndustryTheme) {
  return {
    page: `${theme.pageBg} ${theme.bodyFont} min-h-screen`,
    gradient: theme.pageGradient,
    card: `${theme.cardBg} ${theme.cardBorder} border rounded-2xl`,
    heading: theme.title,
    muted: theme.subtitle,
    accent: theme.googleButton,
    label: theme.eyebrow,
  };
}
