/**
 * Classical Arabic Capstone Passages Data & Types
 * Single source of truth for Quran, Hadith, and Literature passages.
 */

export interface PassageQuestion {
  id: string;
  questionAr: string;
  questionEn: string;
  exerciseType?:
    | "TASHKEEL_PICKER"
    | "SENTENCE_REORDER"
    | "IRAB_PARSING"
    | "SARF_PARSING"
    | "TRANSLATION"
    | "TRANSLATION_EN_AR"
    | "MULTIPLE_CHOICE"
    | string;
  options?: string[];
  optionsCsv?: string;
  correctAnswer: string;
  grammaticalRuleEn: string;
}

export interface PassageItem {
  id: string;
  category: "QURAN" | "HADITH" | "LITERATURE";
  titleAr: string;
  titleEn: string;
  citationEn: string;
  arabicText: string;
  englishTranslation: string;
  isUnlocked?: boolean;
  unlockRequirementEn?: string;
  unlockScope?: "MODULE" | "LEVEL";
  unlockedAfterMilestoneTitle?: string;
  questions: PassageQuestion[];
}

export const DEFAULT_PASSAGES: PassageItem[] = [
  {
    id: "pas-101",
    category: "QURAN",
    titleAr: "سُورَةُ الْفَاتِحَةِ (آيَاتُ الْجُمْلَةِ الِاسْمِيَّةِ)",
    titleEn: "Surah Al-Fatiha Capstone Passage",
    citationEn: "Holy Quran • Surah Al-Fatiha 1:1-7",
    arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ",
    englishTranslation:
      "[All] praise is [due] to Allah, Lord of the worlds - The Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense.",
    isUnlocked: true,
    unlockRequirementEn: "Completed Module 1: The Nominal Sentence (Level 1)",
    unlockScope: "MODULE",
    unlockedAfterMilestoneTitle: "Module 1 Capstone: Nominal Sentence Drills (Level 1)",
    questions: [
      {
        id: "pq-1",
        questionAr: "مَا هُوَ إِعْرَابُ كَلِمَةِ (الْحَمْدُ) فِي الآيَةِ؟",
        questionEn: "What is the grammatical case (I'rab) of the word (الْحَمْدُ)?",
        options: ["مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "خَبَرٌ مَرْفُوعٌ", "اسْمٌ مَجْرُورٌ", "فَاعِلٌ مَرْفُوعٌ"],
        optionsCsv: "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ, خَبَرٌ مَرْفُوعٌ, اسْمٌ مَجْرُورٌ, فَاعِلٌ مَرْفُوعٌ",
        correctAnswer: "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ",
        grammaticalRuleEn: "Subject (Mubtada') starting the nominal sentence, Marfoo' with Dammah.",
      },
      {
        id: "pq-2",
        questionAr: "اخْتَرِ التَّشْكِيلَ الصَّحِيحَ لِكَلِمَةِ (رَبِّ)",
        questionEn: "Select the correct vowelled ending for (رَبِّ)",
        options: ["رَبِّ", "رَبُّ", "رَبَّ", "رَبٌّ"],
        optionsCsv: "رَبِّ, رَبُّ, رَبَّ, رَبٌّ",
        correctAnswer: "رَبِّ",
        grammaticalRuleEn: "Badal / Na't in Genitive case (Majroor with Kasrah).",
      },
    ],
  },
  {
    id: "pas-102",
    category: "HADITH",
    titleAr: "حَدِيثُ النِّيَّةِ (صَحِيحُ الْبُخَارِيِّ #1)",
    titleEn: "Hadith of Intentions Capstone",
    citationEn: "Prophetic Hadith • Sahih Al-Bukhari #1",
    arabicText: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
    englishTranslation:
      "Actions are but by intentions, and every person will have only what they intended.",
    isUnlocked: true,
    unlockRequirementEn: "Completed Module 2: Prepositions & Genitive Annexation (Level 1)",
    unlockScope: "MODULE",
    unlockedAfterMilestoneTitle: "Module 2 Capstone: Prepositions & Genitive Annexation (Level 1)",
    questions: [
      {
        id: "pq-3",
        questionAr: "مَا هُوَ إِعْرَابُ كَلِمَةِ (الْأَعْمَالُ)؟",
        questionEn: "What is the parsing of (الْأَعْمَالُ)?",
        options: ["مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "خَبَرٌ مَرْفُوعٌ", "حَرْفُ جَرٍّ", "فَاعِلٌ"],
        optionsCsv: "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ, خَبَرٌ مَرْفُوعٌ, حَرْفُ جَرٍّ, فَاعِلٌ",
        correctAnswer: "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ",
        grammaticalRuleEn: "Subject (Mubtada') following Innama.",
      },
    ],
  },
  {
    id: "pas-103",
    category: "LITERATURE",
    titleAr: "حِكْمَةُ الْمُتَنَبِّي فِي الْعِلْمِ وَالْأَدَبِ",
    titleEn: "Al-Mutanabbi Literature Graduation Capstone",
    citationEn: "Classical Arabic Poetry • Diwan Al-Mutanabbi",
    arabicText: "أَعَزُّ مَكَانٍ فِي الدُّنَى زِينُ سَابِحٍ وَخَيْرُ جَلِيسٍ فِي الزَّمَانِ كِتَابُ",
    englishTranslation:
      "The most honorable place in the world is the saddle of a swimming horse, and the best companion in time is a book.",
    isUnlocked: false,
    unlockRequirementEn: "🔒 Unlocks upon Graduation from Level 1: Complete Classical Grammar Track",
    unlockScope: "LEVEL",
    unlockedAfterMilestoneTitle: "Level 1 Graduation: Complete Beginner Classical Grammar",
    questions: [
      {
        id: "pq-4",
        questionAr: "مَا هُوَ إِعْرَابُ كَلِمَةِ (كِتَابُ) فِي بَيْتِ الشِّعْرِ؟",
        questionEn: "What is the parsing of (كِتَابُ) in the poem?",
        options: ["خَبَرُ الْمُبْتَدَأِ مَرْفُوعٌ", "مُبْتَدَأٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ", "مَجْرُورٌ"],
        optionsCsv: "خَبَرُ الْمُبْتَدَأِ مَرْفُوعٌ, مُبْتَدَأٌ مَرْفُوعٌ, مَفْعُولٌ بِهِ, مَجْرُورٌ",
        correctAnswer: "خَبَرُ الْمُبْتَدَأِ مَرْفُوعٌ",
        grammaticalRuleEn: "Predicate (Khabar) for the subject (خَيْرُ جَلِيسٍ).",
      },
    ],
  },
];
