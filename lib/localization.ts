/**
 * lib/localization.ts
 * Static localization dictionary for all supported languages.
 * No external i18n library required — deterministic at build time.
 */

export type Language = "english" | "roman_urdu" | "urdu";

export interface LocaleStrings {
  direction: "ltr" | "rtl";
  tagline: string;
  buttonA: string;
  buttonB: string;
  waText: string;
}

export const LOCALE_MAP: Record<Language, LocaleStrings> = {
  english: {
    direction: "ltr",
    tagline:
      "We value your presence. Please select your preferred channel to connect with us today.",
    buttonA: "Visit Our Google Business Profile",
    buttonB: "Connect with Management Directly",
    waText:
      "Hi, I am currently at your venue and wanted to share some direct feedback regarding my experience...",
  },
  roman_urdu: {
    direction: "ltr",
    tagline:
      "Hamaray paas aanay ka shukriya. Aaj aap hum se kis tarah rabta karna chahtay hain?",
    buttonA: "Humara Google Profile Visit Karain",
    buttonB: "Management Se Direct Baat Karain",
    waText:
      "Hi, mein abhi aap ke outlet par hoon aur apna feedback direct share karna chahta hoon...",
  },
  urdu: {
    direction: "rtl",
    tagline:
      "ہمارے پاس آنے کا شکریہ۔ آج آپ ہم سے کس طرح رابطہ کرنا چاہتے ہیں؟",
    buttonA: "ہمارا گوگل پروفائل وزٹ کریں",
    buttonB: "مینجمنٹ سے براہ راست بات کریں",
    waText:
      "اسلام علیکم، میں ابھی آپ کے آؤٹ لیٹ پر موجود ہوں اور اپنے تجربے کے بارے میں کچھ بات کرنا چاہتا ہوں۔۔۔",
  },
};

export function getLocale(lang: string): LocaleStrings {
  if (lang === "english" || lang === "roman_urdu" || lang === "urdu") {
    return LOCALE_MAP[lang];
  }
  // Fallback to roman_urdu
  return LOCALE_MAP.roman_urdu;
}
