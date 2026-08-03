"use client";

import React, { useState } from "react";
import Link from "next/link";

interface VocabItem {
  id: string;
  wordAr: string;
  wordEn: string;
  rootAr: string;
  imageUrl: string;
  audioUrl: string;
  partOfSpeech: "NOUN" | "VERB" | "PARTICLE" | "PHRASE";
}

interface LessonNode {
  id: string;
  titleAr: string;
  titleEn: string;
  vocabularies: VocabItem[];
}

interface ModuleNode {
  id: string;
  titleAr: string;
  titleEn: string;
  lessons: LessonNode[];
}

interface LevelNode {
  id: string;
  titleAr: string;
  titleEn: string;
  modules: ModuleNode[];
}

export default function VocabularyStudioPage() {
  const [targetCourse, setTargetCourse] = useState<"course-1" | "course-2">("course-1");
  const [viewMode, setViewMode] = useState<"TREE" | "BIG_VOCAB_STUDIO">("TREE");

  // Accordion Expand/Collapse States
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({
    "voc-lvl-1": true,
  });
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "voc-mod-101": true,
  });
  const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({
    "voc-les-101a": true,
  });

  const toggleLevel = (lvlId: string) => {
    setExpandedLevels((prev) => ({ ...prev, [lvlId]: !prev[lvlId] }));
  };

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const toggleLesson = (lesId: string) => {
    setExpandedLessons((prev) => ({ ...prev, [lesId]: !prev[lesId] }));
  };

  // Sample Vocabulary Data
  const defaultVocab1: VocabItem = {
    id: "voc-101",
    wordAr: "الْكِتَابُ",
    wordEn: "The Book",
    rootAr: "ك - ت - ب",
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    audioUrl: "/audio/kitab.mp3",
    partOfSpeech: "NOUN",
  };

  const defaultVocab2: VocabItem = {
    id: "voc-102",
    wordAr: "الْمَكْتَبَةُ",
    wordEn: "The Library",
    rootAr: "ك - ت - ب",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&q=80",
    audioUrl: "/audio/maktaba.mp3",
    partOfSpeech: "NOUN",
  };

  const [levels, setLevels] = useState<LevelNode[]>([
    {
      id: "voc-lvl-1",
      titleAr: "الْمُسْتَوَى الأَوَّلُ: الْمُفْرَدَاتُ الأَسَاسِيَّةُ",
      titleEn: "Level 1: Essential Vocabulary & Audio",
      modules: [
        {
          id: "voc-mod-101",
          titleAr: "مُفْرَدَاتُ الْحَيَاةِ الْيَوْمِيَّةِ",
          titleEn: "Module 1: Everyday Objects & Places",
          lessons: [
            {
              id: "voc-les-101a",
              titleAr: "الْأَدَوَاتُ الْمَدْرَسِيَّةُ وَالْمَكْتَبِيَّةُ",
              titleEn: "Lesson 1: School & Office Supplies",
              vocabularies: [defaultVocab1, defaultVocab2],
            },
          ],
        },
      ],
    },
  ]);

  // Active Selected Word for Big View Vocabulary Studio
  const [activeLevelId, setActiveLevelId] = useState<string>("");
  const [activeModuleId, setActiveModuleId] = useState<string>("");
  const [activeLessonId, setActiveLessonId] = useState<string>("");
  const [activeVocab, setActiveVocab] = useState<VocabItem | null>(null);

  // Big View Vocabulary Studio Form States
  const [wordAr, setWordAr] = useState("");
  const [wordEn, setWordEn] = useState("");
  const [rootAr, setRootAr] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState<VocabItem["partOfSpeech"]>("NOUN");
  const [isSaved, setIsSaved] = useState(false);

  // Open Big View Vocabulary Studio
  const handleOpenBigVocabStudio = (
    lvlId: string,
    modId: string,
    lesId: string,
    vItem: VocabItem
  ) => {
    setActiveLevelId(lvlId);
    setActiveModuleId(modId);
    setActiveLessonId(lesId);
    setActiveVocab(vItem);

    setWordAr(vItem.wordAr);
    setWordEn(vItem.wordEn);
    setRootAr(vItem.rootAr);
    setImageUrl(vItem.imageUrl);
    setAudioUrl(vItem.audioUrl);
    setPartOfSpeech(vItem.partOfSpeech);
    setViewMode("BIG_VOCAB_STUDIO");
  };

  // Save changes from Big View Studio back to Tree & Publish OTA
  const handleSaveBigVocab = () => {
    if (!activeVocab) return;
    setIsSaved(true);

    setLevels(
      levels.map((lvl) => {
        if (lvl.id !== activeLevelId) return lvl;
        return {
          ...lvl,
          modules: lvl.modules.map((mod) => {
            if (mod.id !== activeModuleId) return mod;
            return {
              ...mod,
              lessons: mod.lessons.map((les) => {
                if (les.id !== activeLessonId) return les;
                return {
                  ...les,
                  vocabularies: les.vocabularies.map((v) =>
                    v.id === activeVocab.id
                      ? {
                          ...v,
                          wordAr,
                          wordEn,
                          rootAr,
                          imageUrl,
                          audioUrl,
                          partOfSpeech,
                        }
                      : v
                  ),
                };
              }),
            };
          }),
        };
      })
    );

    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  // Mock Image File Uploader
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeObjUrl = URL.createObjectURL(file);
      setImageUrl(fakeObjUrl);
    }
  };

  // Mock Audio File Uploader
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeObjUrl = URL.createObjectURL(file);
      setAudioUrl(fakeObjUrl);
    }
  };

  // Tree CRUD Handlers
  const handleAddLevel = () => {
    const titleEn = prompt("Enter Level Title in English:", `Level ${levels.length + 1}: Vocabulary Suite`);
    if (!titleEn) return;
    const newLvlId = `voc-lvl-${Date.now()}`;
    const newLvl: LevelNode = {
      id: newLvlId,
      titleAr: "الْمُسْتَوَى الْجَدِيدُ",
      titleEn: titleEn,
      modules: [],
    };
    setLevels([...levels, newLvl]);
    setExpandedLevels((prev) => ({ ...prev, [newLvlId]: true }));
  };

  const handleDeleteLevel = (lvlId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this Level suite?")) {
      setLevels(levels.filter((l) => l.id !== lvlId));
    }
  };

  const handleAddModule = (lvlId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const titleEn = prompt("Enter Module Title in English:", "New Vocabulary Module");
    if (!titleEn) return;
    const newModId = `voc-mod-${Date.now()}`;
    const newMod: ModuleNode = {
      id: newModId,
      titleAr: "الْوَحْدَةُ الْجَدِيدَةُ",
      titleEn: titleEn,
      lessons: [],
    };
    setLevels(
      levels.map((lvl) => (lvl.id === lvlId ? { ...lvl, modules: [...lvl.modules, newMod] } : lvl))
    );
    setExpandedLevels((prev) => ({ ...prev, [lvlId]: true }));
    setExpandedModules((prev) => ({ ...prev, [newModId]: true }));
  };

  const handleDeleteModule = (lvlId: string, modId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this module?")) {
      setLevels(
        levels.map((lvl) =>
          lvl.id === lvlId
            ? { ...lvl, modules: lvl.modules.filter((m) => m.id !== modId) }
            : lvl
        )
      );
    }
  };

  const handleAddLesson = (lvlId: string, modId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const titleEn = prompt("Enter Lesson Title for Vocabulary Suite:", "New Lesson Vocabulary Target");
    if (!titleEn) return;
    const newLesId = `voc-les-${Date.now()}`;
    const newLes: LessonNode = {
      id: newLesId,
      titleAr: "الدَّرْسُ الْجَدِيدُ",
      titleEn: titleEn,
      vocabularies: [defaultVocab1],
    };

    setLevels(
      levels.map((lvl) => {
        if (lvl.id !== lvlId) return lvl;
        return {
          ...lvl,
          modules: lvl.modules.map((mod) => {
            if (mod.id !== modId) return mod;
            return { ...mod, lessons: [...mod.lessons, newLes] };
          }),
        };
      })
    );
    setExpandedModules((prev) => ({ ...prev, [modId]: true }));
    setExpandedLessons((prev) => ({ ...prev, [newLesId]: true }));
  };

  const handleDeleteLesson = (lvlId: string, modId: string, lesId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this lesson container?")) {
      setLevels(
        levels.map((lvl) => {
          if (lvl.id !== lvlId) return lvl;
          return {
            ...lvl,
            modules: lvl.modules.map((mod) => {
              if (mod.id !== modId) return mod;
              return { ...mod, lessons: mod.lessons.filter((l) => l.id !== lesId) };
            }),
          };
        })
      );
    }
  };

  const handleAddVocabToLesson = (lvlId: string, modId: string, lesId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const wordEnPrompt = prompt("Enter English Meaning for Word:", "The Student");
    if (!wordEnPrompt) return;

    const newVocab: VocabItem = {
      id: `voc-${Date.now()}`,
      wordAr: "الطَّالِبُ",
      wordEn: wordEnPrompt,
      rootAr: "ط - ل - ب",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80",
      audioUrl: "/audio/talib.mp3",
      partOfSpeech: "NOUN",
    };

    setLevels(
      levels.map((lvl) => {
        if (lvl.id !== lvlId) return lvl;
        return {
          ...lvl,
          modules: lvl.modules.map((mod) => {
            if (mod.id !== modId) return mod;
            return {
              ...mod,
              lessons: mod.lessons.map((les) => {
                if (les.id !== lesId) return les;
                return { ...les, vocabularies: [...les.vocabularies, newVocab] };
              }),
            };
          }),
        };
      })
    );
    setExpandedLessons((prev) => ({ ...prev, [lesId]: true }));
  };

  const handleDeleteVocabItem = (lvlId: string, modId: string, lesId: string, vocId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this vocabulary word and audio?")) {
      setLevels(
        levels.map((lvl) => {
          if (lvl.id !== lvlId) return lvl;
          return {
            ...lvl,
            modules: lvl.modules.map((mod) => {
              if (mod.id !== modId) return mod;
              return {
                ...mod,
                lessons: mod.lessons.map((les) => {
                  if (les.id !== lesId) return les;
                  return { ...les, vocabularies: les.vocabularies.filter((v) => v.id !== vocId) };
                }),
              };
            }),
          };
        })
      );
    }
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
            Vocabulary & Native Audio Studio
          </h1>
          <p className="text-xs text-claude-textMuted mt-0.5">
            {viewMode === "TREE"
              ? "Nested Tree: Level → Module → Lesson → Numbered Vocabulary Word Bars (with Image & Audio)."
              : `Big View Studio for Vocabulary Word: "${wordEn}"`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-claude-border rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setTargetCourse("course-1")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                targetCourse === "course-1"
                  ? "bg-claude-terracotta text-white shadow-sm"
                  : "text-claude-textMuted hover:text-claude-textMain"
              }`}
            >
              Course 1: Classical Roots
            </button>
            <button
              onClick={() => setTargetCourse("course-2")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                targetCourse === "course-2"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-claude-textMuted hover:text-claude-textMain"
              }`}
            >
              Course 2: Daily Fusha
            </button>
          </div>

          {viewMode === "BIG_VOCAB_STUDIO" ? (
            <button
              onClick={() => setViewMode("TREE")}
              className="px-4 py-2 bg-white border border-claude-border hover:border-claude-borderHover font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              ← Back to Vocabulary Suite Tree
            </button>
          ) : (
            <button
              onClick={handleAddLevel}
              className="px-4 py-2 bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              + Add Level Vocabulary Suite
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: FULL SCREEN NESTED VOCABULARY TREE */}
      {viewMode === "TREE" && (
        <div className="space-y-4 max-w-6xl mx-auto">
          {levels.map((lvl, lvlIdx) => {
            const isLvlExpanded = !!expandedLevels[lvl.id];

            return (
              <div key={lvl.id} className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm overflow-hidden transition-all">
                {/* LEVEL BAR */}
                <div
                  onClick={() => toggleLevel(lvl.id)}
                  className="p-5 bg-claude-bg/60 hover:bg-claude-bg cursor-pointer flex items-center justify-between border-b border-claude-border transition-colors select-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-xl bg-white border border-claude-border font-bold text-sm flex items-center justify-center text-claude-textMain shadow-sm">
                      {isLvlExpanded ? "▼" : "►"}
                    </span>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                          Level {lvlIdx + 1} Vocabulary Suite
                        </span>
                        <h2 className="text-base font-bold text-claude-textMain">{lvl.titleEn}</h2>
                      </div>
                      <span className="font-arabic text-lg text-slate-900 font-bold block dir-rtl" dir="rtl">
                        {lvl.titleAr}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleAddModule(lvl.id, e)}
                      className="px-3.5 py-1.5 text-xs font-bold text-claude-terracotta bg-claude-terracottaLight border border-claude-terracotta/20 rounded-xl hover:bg-claude-terracotta hover:text-white transition-colors"
                    >
                      + Add Module
                    </button>
                    <button
                      onClick={(e) => handleDeleteLevel(lvl.id, e)}
                      className="px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors"
                    >
                      🗑️ Level
                    </button>
                  </div>
                </div>

                {/* EXPANDED MODULES */}
                {isLvlExpanded && (
                  <div className="p-6 space-y-4 bg-white border-t border-claude-border/40">
                    {lvl.modules.map((mod, modIdx) => {
                      const isModExpanded = !!expandedModules[mod.id];

                      return (
                        <div key={mod.id} className="border border-claude-border rounded-xl overflow-hidden bg-claude-bg/30">
                          {/* MODULE BAR */}
                          <div
                            onClick={() => toggleModule(mod.id)}
                            className="p-4 bg-white hover:bg-claude-bg cursor-pointer flex items-center justify-between border-b border-claude-border transition-colors select-none"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center border border-amber-200">
                                {isModExpanded ? "▼" : "►"}
                              </span>
                              <div>
                                <span className="text-xs font-extrabold text-claude-textMain block">
                                  Module {modIdx + 1}: {mod.titleEn}
                                </span>
                                <span className="font-arabic text-sm text-slate-900 font-bold block dir-rtl" dir="rtl">
                                  {mod.titleAr}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => handleAddLesson(lvl.id, mod.id, e)}
                                className="px-3 py-1 text-xs font-bold bg-claude-sageLight text-claude-sage border border-claude-sage/20 rounded-lg hover:bg-emerald-100 transition-colors"
                              >
                                + Add Lesson Target
                              </button>
                              <button
                                onClick={(e) => handleDeleteModule(lvl.id, mod.id, e)}
                                className="px-2 py-1 text-xs font-bold text-rose-600 bg-white border border-rose-200 rounded-lg hover:bg-rose-50"
                              >
                                ✕ Module
                              </button>
                            </div>
                          </div>

                          {/* EXPANDED LESSONS CONTAINER */}
                          {isModExpanded && (
                            <div className="p-4 space-y-3 bg-claude-bg/50">
                              {mod.lessons.map((les, lesIdx) => {
                                const isLesExpanded = !!expandedLessons[les.id];

                                return (
                                  <div key={les.id} className="border border-claude-border rounded-xl bg-white overflow-hidden shadow-xs">
                                    {/* LESSON BAR */}
                                    <div
                                      onClick={() => toggleLesson(les.id)}
                                      className="p-3.5 bg-claude-bg/40 hover:bg-claude-bg cursor-pointer flex items-center justify-between border-b border-claude-border transition-colors select-none"
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded bg-white border font-bold text-xs flex items-center justify-center text-claude-textMain">
                                          {isLesExpanded ? "▼" : "►"}
                                        </span>
                                        <div>
                                          <span className="text-xs font-bold text-claude-textMain block">
                                            Lesson {lesIdx + 1}: {les.titleEn}
                                          </span>
                                          <span className="font-arabic text-sm text-slate-900 font-bold block dir-rtl" dir="rtl">
                                            {les.titleAr}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                                          🔤 {les.vocabularies.length} Words & Native Audio
                                        </span>
                                        <button
                                          onClick={(e) => handleAddVocabToLesson(lvl.id, mod.id, les.id, e)}
                                          className="px-3 py-1 text-xs font-bold bg-claude-terracotta text-white rounded-lg hover:bg-[#B85C3C] transition-colors"
                                        >
                                          + Add Word & Audio
                                        </button>
                                        <button
                                          onClick={(e) => handleDeleteLesson(lvl.id, mod.id, les.id, e)}
                                          className="p-1 text-rose-600 hover:bg-rose-50 text-xs"
                                        >
                                          ✕
                                        </button>
                                      </div>
                                    </div>

                                    {/* VOCABULARY WORD BARS */}
                                    {isLesExpanded && (
                                      <div className="p-3.5 space-y-2 bg-claude-bg/20">
                                        {les.vocabularies.map((vItem, vIdx) => (
                                          <div
                                            key={vItem.id}
                                            className="claude-card rounded-xl p-3 bg-white border border-claude-border hover:border-claude-borderHover transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs"
                                          >
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                              {/* Thumbnail Image */}
                                              <img
                                                src={vItem.imageUrl}
                                                alt={vItem.wordEn}
                                                className="w-10 h-10 rounded-lg object-cover border border-claude-border shrink-0"
                                              />

                                              <div className="space-y-0.5 flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                  <span className="font-arabic text-lg text-slate-900 font-bold dir-rtl" dir="rtl">
                                                    {vItem.wordAr}
                                                  </span>
                                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                                                    Root: {vItem.rootAr}
                                                  </span>
                                                </div>
                                                <span className="text-xs font-bold text-claude-textMain block truncate">
                                                  Word {vIdx + 1}: {vItem.wordEn} ({vItem.partOfSpeech})
                                                </span>
                                              </div>
                                            </div>

                                            <div className="flex items-center gap-3 shrink-0">
                                              <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                                                🔊 Native Audio Attached
                                              </span>

                                              {/* PROMINENT EDIT BUTTON FOR BIG VOCAB STUDIO */}
                                              <button
                                                onClick={() => handleOpenBigVocabStudio(lvl.id, mod.id, les.id, vItem)}
                                                className="px-4 py-2 rounded-xl bg-claude-terracotta text-white font-bold text-xs hover:bg-[#B85C3C] transition-colors shadow-sm flex items-center gap-1.5"
                                                title="Open Big View Vocabulary Studio"
                                              >
                                                ✏️ Edit Word, Image & Audio
                                              </button>

                                              <button
                                                onClick={(e) => handleDeleteVocabItem(lvl.id, mod.id, les.id, vItem.id, e)}
                                                className="p-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg text-xs"
                                              >
                                                ✕
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 2: DEDICATED FULL SCREEN BIG VIEW VOCABULARY STUDIO */}
      {viewMode === "BIG_VOCAB_STUDIO" && activeVocab && (
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setViewMode("TREE")}
              className="text-xs font-bold text-claude-terracotta hover:underline flex items-center gap-1"
            >
              ← Return to Vocabulary Suite Tree
            </button>
            <span className="text-xs font-mono text-claude-textMuted">Big View Vocabulary Studio Canvas</span>
          </div>

          <div className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm p-6 space-y-6">
            {/* Word & Meaning Header Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-claude-border pb-6">
              <div className="md:col-span-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  Vowelled Arabic Word (Tashkeel)
                </label>
                <input
                  type="text"
                  value={wordAr}
                  onChange={(e) => setWordAr(e.target.value)}
                  placeholder="الْكِتَابُ"
                  className="w-full font-arabic text-3xl font-bold text-slate-900 border-b border-claude-border focus:border-claude-terracotta focus:outline-none py-1 dir-rtl"
                  dir="rtl"
                />
              </div>

              <div className="md:col-span-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  English Translation / Meaning
                </label>
                <input
                  type="text"
                  value={wordEn}
                  onChange={(e) => setWordEn(e.target.value)}
                  placeholder="The Book"
                  className="w-full text-xl font-bold text-claude-textMain border-b border-claude-border focus:border-claude-terracotta focus:outline-none py-2"
                />
              </div>

              <div className="md:col-span-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  3-Letter Root / Part of Speech
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={rootAr}
                    onChange={(e) => setRootAr(e.target.value)}
                    placeholder="ك - ت - ب"
                    className="w-full font-arabic text-sm font-bold text-slate-900 border-b border-claude-border focus:border-claude-terracotta focus:outline-none py-2 text-center"
                  />
                  <select
                    value={partOfSpeech}
                    onChange={(e) => setPartOfSpeech(e.target.value as any)}
                    className="w-full p-2 rounded-xl bg-claude-bg border border-claude-border text-xs font-bold text-claude-textMain focus:outline-none"
                  >
                    <option value="NOUN">Noun (اسم)</option>
                    <option value="VERB">Verb (فعل)</option>
                    <option value="PARTICLE">Particle (حرف)</option>
                    <option value="PHRASE">Phrase (تعبير)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Media Uploaders: Image Uploader & Native Audio Uploader */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* IMAGE UPLOADER BOX */}
              <div className="bg-claude-bg/40 border border-claude-border rounded-xl p-4 space-y-3">
                <span className="text-xs font-extrabold text-claude-textMain uppercase tracking-wider block">
                  🖼️ Word Visual Image Uploader
                </span>

                <div className="flex items-center gap-4">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Word preview"
                      className="w-24 h-24 rounded-xl object-cover border border-claude-border shadow-xs shrink-0"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-white border-2 border-dashed border-claude-border flex items-center justify-center text-xs text-claude-textMuted shrink-0">
                      No Image
                    </div>
                  )}

                  <div className="space-y-2 flex-1">
                    <label className="block text-xs font-semibold text-claude-terracotta hover:underline cursor-pointer">
                      <span>📁 Select Image File from Disk</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Or paste Image URL..."
                      className="w-full p-2 rounded-lg bg-white border border-claude-border text-xs text-claude-textMain"
                    />
                  </div>
                </div>
              </div>

              {/* NATIVE AUDIO UPLOADER BOX */}
              <div className="bg-claude-bg/40 border border-claude-border rounded-xl p-4 space-y-3">
                <span className="text-xs font-extrabold text-claude-textMain uppercase tracking-wider block">
                  🎙️ Native Speaker Audio Recorder / Uploader
                </span>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-claude-terracotta hover:underline cursor-pointer">
                    <span>🎙️ Upload Native Audio File (.mp3, .wav)</span>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioFileChange}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    placeholder="Or paste Audio URL..."
                    className="w-full p-2 rounded-lg bg-white border border-claude-border text-xs text-claude-textMain"
                  />

                  {/* Audio Player Preview */}
                  {audioUrl && (
                    <audio controls src={audioUrl} className="w-full h-8" />
                  )}
                </div>
              </div>
            </div>

            {/* Real-Time Learner Card View Preview */}
            <div className="bg-white border border-claude-border rounded-xl p-5 space-y-3">
              <span className="text-[10px] font-mono font-bold text-claude-textMuted uppercase tracking-wider block">
                👁️ Live Learner Visual Flashcard Preview
              </span>
              <div className="max-w-xs mx-auto bg-claude-bg/50 border border-claude-border rounded-2xl p-5 text-center space-y-3 shadow-sm">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={wordEn}
                    className="w-32 h-32 rounded-xl object-cover mx-auto border border-claude-border shadow-sm"
                  />
                )}
                <div>
                  <span className="font-arabic text-3xl font-bold text-slate-900 block dir-rtl" dir="rtl">
                    {wordAr || "الْكِتَابُ"}
                  </span>
                  <p className="text-sm font-bold text-claude-textMain mt-1">{wordEn || "The Book"}</p>
                  <span className="text-[11px] font-mono text-claude-textMuted block mt-0.5">
                    Root: {rootAr || "ك-ت-ب"} • {partOfSpeech}
                  </span>
                </div>

                <button className="px-4 py-2 rounded-full bg-claude-terracotta text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 mx-auto">
                  🔊 Play Native Audio
                </button>
              </div>
            </div>

            {/* OTA Publish Footer */}
            <div className="border-t border-claude-border pt-4 flex items-center justify-between">
              {isSaved && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  ✓ OTA Vocabulary & Audio Published
                </span>
              )}
              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={() => setViewMode("TREE")}
                  className="px-4 py-2.5 rounded-xl bg-white border border-claude-border text-claude-textMain font-semibold text-xs hover:border-claude-borderHover"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBigVocab}
                  className="px-6 py-2.5 rounded-xl bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs transition-colors shadow-sm"
                >
                  🚀 Save & Publish Vocabulary OTA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
