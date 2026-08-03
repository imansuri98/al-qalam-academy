import { describe, it, expect } from "vitest";
import {
  stripTashkeel,
  normalizeArabicText,
  IRAB_CASE_METADATA,
} from "./index";

describe("Arabic Utils Unit Tests", () => {
  it("strips Tashkeel diacritics correctly", () => {
    const vowelled = "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ";
    const unvowelled = stripTashkeel(vowelled);
    expect(unvowelled).toBe("الحمد لله رب العالمين");
  });

  it("normalizes Alef hamzas and letters for search indexing", () => {
    const input = "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ";
    const normalized = normalizeArabicText(input);
    expect(normalized).toBe("انما الاعمال بالنيات");
  });

  it("provides complete metadata for I'rab grammatical case types", () => {
    expect(IRAB_CASE_METADATA.MARFOO.labelAr).toBe("مَرْفُوع");
    expect(IRAB_CASE_METADATA.MANSOOB.colorHex).toBe("#16A34A");
    expect(IRAB_CASE_METADATA.MAJROOR.colorHex).toBe("#CC6B49");
    expect(IRAB_CASE_METADATA.MAJZOOM.code).toBe("MAJZOOM");
    expect(IRAB_CASE_METADATA.MABNI.badgeClass).toContain("purple");
  });
});
