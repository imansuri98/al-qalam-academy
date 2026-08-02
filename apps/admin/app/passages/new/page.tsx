"use client";

import React, { useState } from "react";
import Link from "next/link";

interface PassageQuestion {
  id: string;
  questionAr: string;
  questionEn: string;
  optionsCsv: string;
  correctAnswer: string;
  grammaticalRuleEn: string;
}

interface PassageItem {
  id: string;
  category: "QURAN" | "HADITH" | "LITERATURE";
  titleAr: string;
  titleEn: string;
  citationEn: string;
  arabicText: string;
  englishTranslation: string;
  unlockScope: "MODULE" | "LEVEL";
  unlockedAfterMilestoneTitle: string;
  questions: PassageQuestion[];
}

export default function ClassicalPassagesStudioPage() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "QURAN" | "HADITH" | "LITERATURE">("ALL");
  const [viewMode, setViewMode] = useState<"LIST" | "EDITOR">("LIST");

  // Sample Passages Unlocked After Module & Level Completion
  const [passages, setPassages] = useState<PassageItem[]>([
    {
      id: "pas-101",
      category: "QURAN",
      titleAr: "سُورَةُ الْفَاتِحَةِ (تَطْبِيقُ الْجُمْلَةِ الِاسْمِيَّةِ)",
      titleEn: "Surah Al-Fatiha Capstone Passage",
      citationEn: "Holy Quran • Surah Al-Fatiha 1:1-7",
      arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ",
      englishTranslation: "[All] praise is [due] to Allah, Lord of the worlds - The Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense.",
      unlockScope: "MODULE",
      unlockedAfterMilestoneTitle: "Module 1 Capstone: Nominal Sentence Drills (Level 1)",
      questions: [
        {
          id: "pq-1",
          questionAr: "مَا هُوَ إِعْرَابُ كَلِمَةِ (الْحَمْدُ) فِي الآيَةِ؟",
          questionEn: "What is the grammatical case (I'rab) of the word (الْحَمْدُ)?",
          optionsCsv: "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ, خَبَرٌ مَرْفُوعٌ, اسْمٌ مَجْرُورٌ, فاعِلٌ مَرْفُوعٌ",
          correctAnswer: "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ",
          grammaticalRuleEn: "Subject (Mubtada') starting the nominal sentence, Marfoo' with Dammah.",
        },
      ],
    },
    {
      id: "pas-102",
      category: "HADITH",
      titleAr: "حَدِيثُ النِّيَّةِ (صَحِيحُ الْبُخَارِيِّ #1)",
      titleEn: "Hadith of Intentions Module Capstone",
      citationEn: "Prophetic Hadith • Sahih Al-Bukhari #1",
      arabicText: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      englishTranslation: "Actions are but by intentions, and every person will have only what they intended.",
      unlockScope: "MODULE",
      unlockedAfterMilestoneTitle: "Module 2 Capstone: Prepositions & Genitive Annexation (Level 1)",
      questions: [
        {
          id: "pq-3",
          questionAr: "مَا هُوَ إِعْرَابُ كَلِمَةِ (الْأَعْمَالُ)؟",
          questionEn: "What is the parsing of (الْأَعْمَالُ)?",
          optionsCsv: "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ, خَبَرٌ, حَرْفُ جَرٍّ, فاعِلٌ",
          correctAnswer: "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ",
          grammaticalRuleEn: "Mubtada' following Innama.",
        },
      ],
    },
    {
      id: "pas-103",
      category: "LITERATURE",
      titleAr: "مُعَلَّقَةُ امْرِئِ الْقَيْسِ وَحِكَمُ الْمُتَنَبِّي",
      titleEn: "Level 1 Graduation Literature Capstone",
      citationEn: "Classical Arabic Literature • Mu'allaqat & Diwan Al-Mutanabbi",
      arabicText: "أَعَزُّ مَكَانٍ فِي الدُّنَى زِينُ سَابِحٍ وَخَيْرُ جَلِيسٍ فِي الزَّمَانِ كِتَابُ",
      englishTranslation: "The most honorable place in the world is the saddle of a swimming horse, and the best companion in time is a book.",
      unlockScope: "LEVEL",
      unlockedAfterMilestoneTitle: "Level 1 Graduation: Complete Beginner Classical Grammar",
      questions: [
        {
          id: "pq-4",
          questionAr: "مَا هُوَ إِعْرَابُ كَلِمَةِ (كِتَابُ) فِي بَيْتِ الشِّعْرِ؟",
          questionEn: "What is the parsing of (كِتَابُ) in the poem?",
          optionsCsv: "خَبَرُ الْمُبْتَدَأِ مَرْفُوعٌ, مُبْتَدَأٌ, مَفْعُولٌ بِهِ, مَجْرُورٌ",
          correctAnswer: "خَبَرُ الْمُبْتَدَأِ مَرْفُوعٌ",
          grammaticalRuleEn: "Khabar for (خَيْرُ جَلِيسٍ).",
        },
      ],
    },
  ]);

  // Active Passage for Editor Mode
  const [activePassage, setActivePassage] = useState<PassageItem | null>(null);
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [category, setCategory] = useState<PassageItem["category"]>("QURAN");
  const [citationEn, setCitationEn] = useState("");
  const [arabicText, setArabicText] = useState("");
  const [englishTranslation, setEnglishTranslation] = useState("");
  const [unlockScope, setUnlockScope] = useState<"MODULE" | "LEVEL">("MODULE");
  const [unlockedAfterMilestoneTitle, setUnlockedAfterMilestoneTitle] = useState("");
  const [questionsList, setQuestionsList] = useState<PassageQuestion[]>([]);
  const [activeQTab, setActiveQTab] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const filteredPassages = activeCategory === "ALL"
    ? passages
    : passages.filter((p) => p.category === activeCategory);

  const handleOpenEditor = (passage?: PassageItem) => {
    if (passage) {
      setActivePassage(passage);
      setTitleAr(passage.titleAr);
      setTitleEn(passage.titleEn);
      setCategory(passage.category);
      setCitationEn(passage.citationEn);
      setArabicText(passage.arabicText);
      setEnglishTranslation(passage.englishTranslation);
      setUnlockScope(passage.unlockScope);
      setUnlockedAfterMilestoneTitle(passage.unlockedAfterMilestoneTitle);
      setQuestionsList([...passage.questions]);
    } else {
      setActivePassage(null);
      setTitleAr("نَصٌّ كَلَاسِيكِيٌّ جَدِيدٌ");
      setTitleEn("New Module/Level Capstone Passage");
      setCategory("QURAN");
      setCitationEn("Quran / Hadith / Literature Citation");
      setArabicText("الْنَّصُّ الْعَرَبِيُّ بِالتَّشْكِيلِ...");
      setEnglishTranslation("English translation...");
      setUnlockScope("MODULE");
      setUnlockedAfterMilestoneTitle("Module 1 Capstone: Nominal Sentence Drills (Level 1)");
      setQuestionsList([
        {
          id: `pq-new-${Date.now()}`,
          questionAr: "السُّؤَالُ الْأَوَّلُ عَنِ النَّصِّ",
          questionEn: "Question 1 about the passage",
          optionsCsv: "خِيَار 1, خِيَار 2, خِيَار 3, خِيَار 4",
          correctAnswer: "خِيَار 1",
          grammaticalRuleEn: "Parsing rule explanation",
        },
      ]);
    }
    setActiveQTab(0);
    setViewMode("EDITOR");
  };

  const handleSavePassage = () => {
    setIsSaved(true);

    if (activePassage) {
      setPassages(
        passages.map((p) =>
          p.id === activePassage.id
            ? {
                ...p,
                titleAr,
                titleEn,
                category,
                citationEn,
                arabicText,
                englishTranslation,
                unlockScope,
                unlockedAfterMilestoneTitle,
                questions: questionsList,
              }
            : p
        )
      );
    } else {
      const newP: PassageItem = {
        id: `pas-${Date.now()}`,
        category,
        titleAr,
        titleEn,
        citationEn,
        arabicText,
        englishTranslation,
        unlockScope,
        unlockedAfterMilestoneTitle,
        questions: questionsList,
      };
      setPassages([...passages, newP]);
    }

    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const handleDeletePassage = (id: string) => {
    if (confirm("Delete this milestone classical passage?")) {
      setPassages(passages.filter((p) => p.id !== id));
    }
  };

  const updateCurrentQuestion = (field: keyof PassageQuestion, val: string) => {
    setQuestionsList(
      questionsList.map((q, idx) => (idx === activeQTab ? { ...q, [field]: val } : q))
    );
  };

  const handleAddQuestion = () => {
    const newQ: PassageQuestion = {
      id: `pq-${Date.now()}`,
      questionAr: "سُؤَالٌ جَدِيدٌ عَنِ النَّصِّ",
      questionEn: "New question about passage",
      optionsCsv: "خِيَار 1, خِيَار 2, خِيَار 3, خِيَار 4",
      correctAnswer: "خِيَار 1",
      grammaticalRuleEn: "Rule explanation",
    };
    setQuestionsList([...questionsList, newQ]);
    setActiveQTab(questionsList.length);
  };

  return (
    <div className="min-h-screen bg-claude-bg text-claude-textMain space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-claude-border pb-4">
        <div>
          <Link href="/" className="text-xs font-semibold text-claude-terracotta hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-extrabold text-claude-textMain mt-1">
            Classical Passages Studio (Unlocked After Module or Level Completion)
          </h1>
          <p className="text-xs text-claude-textMuted mt-0.5">
            Manage Capstone Passages (Quran, Hadith & Literature) unlocked when learners complete an entire Module or Level.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {viewMode === "EDITOR" ? (
            <button
              onClick={() => setViewMode("LIST")}
              className="px-4 py-2 bg-white border border-claude-border font-bold text-xs rounded-xl hover:border-claude-borderHover shadow-sm"
            >
              ← Back to Passages Catalog
            </button>
          ) : (
            <button
              onClick={() => handleOpenEditor()}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
            >
              + Create Module/Level Capstone Passage
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: PASSAGES CATALOG LIST */}
      {viewMode === "LIST" && (
        <div className="space-y-6 max-w-6xl mx-auto">
          {/* Category Filter Tabs */}
          <div className="flex items-center bg-white border border-claude-border rounded-2xl p-1.5 shadow-sm max-w-fit">
            <button
              onClick={() => setActiveCategory("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "ALL"
                  ? "bg-claude-terracotta text-white shadow-xs"
                  : "text-claude-textMuted hover:text-claude-textMain"
              }`}
            >
              All Capstones ({passages.length})
            </button>
            <button
              onClick={() => setActiveCategory("QURAN")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "QURAN"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-claude-textMuted hover:text-claude-textMain"
              }`}
            >
              📖 Quran ({passages.filter((p) => p.category === "QURAN").length})
            </button>
            <button
              onClick={() => setActiveCategory("HADITH")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "HADITH"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-claude-textMuted hover:text-claude-textMain"
              }`}
            >
              📜 Hadith ({passages.filter((p) => p.category === "HADITH").length})
            </button>
            <button
              onClick={() => setActiveCategory("LITERATURE")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "LITERATURE"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-claude-textMuted hover:text-claude-textMain"
              }`}
            >
              🏛️ Literature ({passages.filter((p) => p.category === "LITERATURE").length})
            </button>
          </div>

          {/* Passages Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPassages.map((p) => (
              <div
                key={p.id}
                className="claude-card rounded-2xl p-6 bg-white border border-claude-border hover:border-claude-borderHover transition-all flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                        p.category === "QURAN"
                          ? "bg-amber-50 text-amber-900 border-amber-200"
                          : p.category === "HADITH"
                          ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                          : "bg-blue-50 text-blue-900 border-blue-200"
                      }`}
                    >
                      {p.category === "QURAN"
                        ? "📖 Quranic Text"
                        : p.category === "HADITH"
                        ? "📜 Prophetic Hadith"
                        : "🏛️ Classical Literature"}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200">
                      Unlocked by {p.unlockScope} Completion
                    </span>
                  </div>

                  <div>
                    <span className="font-arabic text-2xl font-bold text-slate-900 block dir-rtl" dir="rtl">
                      {p.titleAr}
                    </span>
                    <h2 className="text-base font-extrabold text-claude-textMain mt-0.5">{p.titleEn}</h2>
                    <p className="text-xs text-claude-textMuted font-medium">{p.citationEn}</p>
                  </div>

                  {/* Vowelled Arabic Quote Box */}
                  <div className="p-4 bg-claude-bg/60 rounded-xl border border-claude-border">
                    <span className="font-arabic text-xl font-bold text-slate-900 block dir-rtl text-center" dir="rtl">
                      "{p.arabicText}"
                    </span>
                  </div>

                  {/* Milestone Unlock Gate Badge */}
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl space-y-1">
                    <span className="text-[10px] font-extrabold text-purple-900 uppercase tracking-wider block">
                      🔒 Milestone Unlock Gate ({p.unlockScope}):
                    </span>
                    <p className="text-xs font-semibold text-purple-950">
                      Available to solve after finishing: <strong className="underline">{p.unlockedAfterMilestoneTitle}</strong>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-claude-border flex items-center justify-between">
                  <button
                    onClick={() => handleDeletePassage(p.id)}
                    className="text-xs text-rose-600 font-semibold hover:underline"
                  >
                    Delete Passage
                  </button>

                  <button
                    onClick={() => handleOpenEditor(p)}
                    className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-colors shadow-xs"
                  >
                    ✏️ Edit Text & Milestone
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: PASSAGE & MILESTONE EDITOR */}
      {viewMode === "EDITOR" && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setViewMode("LIST")}
              className="text-xs font-bold text-purple-700 hover:underline"
            >
              ← Return to Passages Catalog
            </button>
            <span className="text-xs font-mono text-claude-textMuted">Capstone Milestone Studio Canvas</span>
          </div>

          <div className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm p-6 space-y-6">
            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-claude-border pb-6">
              <div className="md:col-span-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  Text Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-claude-bg border border-claude-border text-xs font-bold text-claude-textMain focus:outline-none"
                >
                  <option value="QURAN">📖 Quranic Passage (الْقُرْآنُ الْكَرِيمُ)</option>
                  <option value="HADITH">📜 Prophetic Hadith (الْحَدِيثُ النَّبَوِيُّ)</option>
                  <option value="LITERATURE">🏛️ Classical Literature (الأَدَبُ الْعَرَبِيُّ)</option>
                </select>
              </div>

              <div className="md:col-span-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  Title (Arabic Script)
                </label>
                <input
                  type="text"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  className="w-full font-arabic text-lg font-bold text-slate-900 border-b border-claude-border focus:border-purple-600 focus:outline-none py-1 dir-rtl"
                  dir="rtl"
                />
              </div>

              <div className="md:col-span-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  Title & Citation (English)
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full text-xs font-bold text-claude-textMain border-b border-claude-border focus:border-purple-600 focus:outline-none py-1"
                />
              </div>
            </div>

            {/* Vowelled Arabic Text & Translation */}
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  Vowelled Arabic Text (Tashkeel)
                </label>
                <textarea
                  rows={3}
                  value={arabicText}
                  onChange={(e) => setArabicText(e.target.value)}
                  className="w-full font-arabic text-2xl font-bold text-slate-900 p-4 rounded-xl bg-claude-bg/40 border border-claude-border focus:border-purple-600 focus:outline-none dir-rtl leading-relaxed"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  English Context / Translation
                </label>
                <input
                  type="text"
                  value={englishTranslation}
                  onChange={(e) => setEnglishTranslation(e.target.value)}
                  className="w-full p-3 rounded-xl bg-claude-bg/30 border border-claude-border text-xs font-semibold text-claude-textMain focus:outline-none"
                />
              </div>

              {/* Milestone Scope & Unlock Target */}
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl space-y-3">
                <span className="text-xs font-extrabold text-purple-900 uppercase tracking-wider block">
                  🔒 Milestone Unlock Gate (Available ONLY after Finishing Module or Level)
                </span>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                  <div className="md:col-span-4">
                    <label className="text-[10px] font-bold text-purple-900 uppercase block mb-1">
                      Unlock Scope Type
                    </label>
                    <select
                      value={unlockScope}
                      onChange={(e) => setUnlockScope(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-white border border-purple-300 text-xs font-bold text-purple-950 focus:outline-none"
                    >
                      <option value="MODULE">After Completing Entire Module</option>
                      <option value="LEVEL">After Completing Entire Level</option>
                    </select>
                  </div>

                  <div className="md:col-span-8">
                    <label className="text-[10px] font-bold text-purple-900 uppercase block mb-1">
                      Prerequisite Milestone Name
                    </label>
                    <input
                      type="text"
                      value={unlockedAfterMilestoneTitle}
                      onChange={(e) => setUnlockedAfterMilestoneTitle(e.target.value)}
                      placeholder="e.g. Module 1 Capstone: Nominal Sentence Drills (Level 1)"
                      className="w-full p-2.5 rounded-xl bg-white border border-purple-300 text-xs font-bold text-purple-950 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Questions Tab Manager */}
            <div className="border-t border-claude-border pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase text-claude-textMain">
                    Comprehension & Parsing Questions:
                  </span>
                  {questionsList.map((_, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => setActiveQTab(qIdx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        activeQTab === qIdx
                          ? "bg-purple-600 text-white shadow-xs"
                          : "bg-claude-bg text-claude-textMuted border border-claude-border"
                      }`}
                    >
                      Q{qIdx + 1}
                    </button>
                  ))}
                  <button
                    onClick={handleAddQuestion}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs"
                  >
                    + Add Q
                  </button>
                </div>
              </div>

              {/* Active Question Form */}
              <div className="p-5 rounded-2xl bg-claude-bg/40 border border-claude-border space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-claude-textMuted block mb-1">
                    Question (Arabic Script)
                  </label>
                  <input
                    type="text"
                    value={questionsList[activeQTab]?.questionAr || ""}
                    onChange={(e) => updateCurrentQuestion("questionAr", e.target.value)}
                    className="w-full font-arabic text-lg font-bold text-slate-900 border-b border-claude-border focus:border-purple-600 focus:outline-none py-1 dir-rtl"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-claude-textMuted block mb-1">
                    Question (English Context)
                  </label>
                  <input
                    type="text"
                    value={questionsList[activeQTab]?.questionEn || ""}
                    onChange={(e) => updateCurrentQuestion("questionEn", e.target.value)}
                    className="w-full text-xs font-semibold text-claude-textMain border-b border-claude-border focus:border-purple-600 focus:outline-none py-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-claude-textMuted block mb-1">
                      Options (Comma-Separated)
                    </label>
                    <input
                      type="text"
                      value={questionsList[activeQTab]?.optionsCsv || ""}
                      onChange={(e) => updateCurrentQuestion("optionsCsv", e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-claude-border text-xs font-arabic font-bold text-slate-900 dir-rtl"
                      dir="rtl"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-claude-textMuted block mb-1">
                      Correct Answer Choice
                    </label>
                    <input
                      type="text"
                      value={questionsList[activeQTab]?.correctAnswer || ""}
                      onChange={(e) => updateCurrentQuestion("correctAnswer", e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-arabic font-bold text-emerald-900 dir-rtl"
                      dir="rtl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer OTA Publish */}
            <div className="border-t border-claude-border pt-4 flex items-center justify-between">
              {isSaved && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  ✓ Capstone Passage & Questions Published OTA
                </span>
              )}
              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={() => setViewMode("LIST")}
                  className="px-4 py-2.5 rounded-xl bg-white border border-claude-border text-claude-textMain font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePassage}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  🚀 Save & Publish Passage OTA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
