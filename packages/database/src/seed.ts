/**
 * Seed Data Generator for Al-Arabi Platform
 * Enforces: Swapped Courses + English Instruction + Pure Arabic Script + ZERO Transliteration
 */

export const SAMPLE_COURSES = [
  {
    id: "course-grammar-1",
    titleAr: "النَّحْوُ وَالصَّرْفُ الْكَلَاسِيكِيُّ",
    titleEn: "Course 1: Classical Arabic Grammar (Nahw & Sarf)",
    courseType: "CLASSICAL_GRAMMAR" as const,
    descriptionEn: "Master sentence structure, grammatical case endings (I'rab), and 3-letter verb root patterns (Sarf).",
    orderIndex: 1,
  },
  {
    id: "course-fusha-1",
    titleAr: "الْعَرَبِيَّةُ الْمُعَاصِرَةُ لِلتَّوَاصُلِ",
    titleEn: "Course 2: Informal Conversational Fusha",
    courseType: "INFORMAL_FUSHA" as const,
    descriptionEn: "Master accessible Modern Standard Arabic for practical daily communication, greetings, and real-life dialogues.",
    orderIndex: 2,
  },
];

export const SAMPLE_MODULES = [
  // Course 1 Modules (Classical Grammar)
  {
    id: "mod-grammar-1",
    courseId: "course-grammar-1",
    titleAr: "الْجُمْلَةُ الِاسْمِيَّةُ (الْمُبْتَدَأُ وَالْخَبَرُ)",
    titleEn: "Module 1: The Nominal Sentence (Subject & Predicate)",
    orderIndex: 1,
  },
  {
    id: "mod-grammar-2",
    courseId: "course-grammar-1",
    titleAr: "حُرُوفُ الْجَرِّ وَالْإِضَافَةُ",
    titleEn: "Module 2: Prepositions (Harf Jarr) & Possessives (Idafa)",
    orderIndex: 2,
  },
  // Course 2 Modules (Informal Conversational Fusha)
  {
    id: "mod-fusha-1",
    courseId: "course-fusha-1",
    titleAr: "الـتَّعَارُفُ وَالتَّحِيَّاتُ",
    titleEn: "Module 1: Greetings & Introductions",
    orderIndex: 1,
  },
  {
    id: "mod-fusha-2",
    courseId: "course-fusha-1",
    titleAr: "فِي الْمَطْعَمِ وَالْمَقْهَى",
    titleEn: "Module 2: At the Restaurant & Cafe",
    orderIndex: 2,
  },
];
