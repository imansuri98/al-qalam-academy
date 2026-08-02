/**
 * Arabic Language & Grammatical Utility Helpers
 * Strict Zero Transliteration Enforcement
 */

// Tashkeel Unicode Regex Range (Fatha, Damma, Kasra, Sukun, Tanween, Shadda, Madda, etc.)
const TASHKEEL_REGEX = /[\u0617-\u061A\u064B-\u0652\u0656-\u065F\u0670\u06D6-\u06ED]/g;

/**
 * Strips all diacritic marks (Tashkeel / Harakat) from Arabic text.
 * Used for database search indexing and fuzzy word matching.
 */
export function stripTashkeel(text: string): string {
  if (!text) return "";
  return text.replace(TASHKEEL_REGEX, "");
}

/**
 * Normalizes Arabic letters (e.g. Alef with Hamza to bare Alef) for search indexing.
 */
export function normalizeArabicText(text: string): string {
  if (!text) return "";
  return stripTashkeel(text)
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "ء")
    .replace(/ئ/g, "ء");
}

/**
 * Grammatical Case Types for I'rab (Classical Grammar)
 */
export type IrabCaseType = "MARFOO" | "MANSOOB" | "MAJROOR" | "MAJZOOM" | "MABNI";

export interface IrabCaseMeta {
  code: IrabCaseType;
  labelAr: string;
  labelEn: string;
  colorHex: string;
  badgeClass: string;
}

/**
 * Color Tokens & Metadata for Classical Arabic I'rab (Claude Light Theme)
 * Refined terracotta/clay for Majroor (NOT bright orange/saffron)
 */
export const IRAB_CASE_METADATA: Record<IrabCaseType, IrabCaseMeta> = {
  MARFOO: {
    code: "MARFOO",
    labelAr: "مَرْفُوع",
    labelEn: "Nominative (Marfoo')",
    colorHex: "#2563EB", // Slate Blue
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
  },
  MANSOOB: {
    code: "MANSOOB",
    labelAr: "مَنْصُوب",
    labelEn: "Accusative (Mansoob)",
    colorHex: "#16A34A", // Warm Sage / Green
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  MAJROOR: {
    code: "MAJROOR",
    labelAr: "مَجْرُور",
    labelEn: "Genitive (Majroor)",
    colorHex: "#CC6B49", // Muted Terracotta / Clay
    badgeClass: "bg-orange-50 text-amber-900 border-orange-200",
  },
  MAJZOOM: {
    code: "MAJZOOM",
    labelAr: "مَجْزُوم",
    labelEn: "Jussive (Majzoom)",
    colorHex: "#E11D48", // Muted Crimson
    badgeClass: "bg-rose-50 text-rose-800 border-rose-200",
  },
  MABNI: {
    code: "MABNI",
    labelAr: "مَبْنِيّ",
    labelEn: "Fixed (Mabni)",
    colorHex: "#7C3AED", // Purple
    badgeClass: "bg-purple-50 text-purple-800 border-purple-200",
  },
};
