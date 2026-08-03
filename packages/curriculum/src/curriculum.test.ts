import { describe, it, expect } from "vitest";
import { DEFAULT_PASSAGES, COURSE_1_LEVELS, COURSE_2_LEVELS } from "./index";

describe("Curriculum Dataset Unit Tests", () => {
  it("contains default capstone passages for Quran, Hadith, and Literature", () => {
    expect(DEFAULT_PASSAGES.length).toBeGreaterThanOrEqual(3);
    const quran = DEFAULT_PASSAGES.find((p) => p.category === "QURAN");
    expect(quran).toBeDefined();
    expect(quran?.titleEn).toContain("Al-Fatiha");

    const hadith = DEFAULT_PASSAGES.find((p) => p.category === "HADITH");
    expect(hadith).toBeDefined();
    expect(hadith?.titleEn).toContain("Intentions");

    const lit = DEFAULT_PASSAGES.find((p) => p.category === "LITERATURE");
    expect(lit).toBeDefined();
    expect(lit?.titleEn).toContain("Mutanabbi");
  });

  it("contains valid Course 1 levels with modules and lessons", () => {
    expect(COURSE_1_LEVELS.length).toBeGreaterThan(0);
    const level1 = COURSE_1_LEVELS[0];
    expect(level1.id).toBe("lvl-1");
    expect(level1.modules.length).toBeGreaterThan(0);

    const mod1 = level1.modules[0];
    expect(mod1.lessons.length).toBeGreaterThan(0);
    expect(mod1.lessons[0].titleEn).toContain("Subject & Predicate");
  });

  it("contains valid Course 2 levels with spoken dialogue lessons", () => {
    expect(COURSE_2_LEVELS.length).toBeGreaterThan(0);
    const level1 = COURSE_2_LEVELS[0];
    expect(level1.id).toBe("lvl-fusha-1");
    expect(level1.modules.length).toBeGreaterThan(0);
  });
});
