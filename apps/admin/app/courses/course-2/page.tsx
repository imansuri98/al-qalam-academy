"use client";

import React, { useState } from "react";
import Link from "next/link";

interface VocabItem {
  id: string;
  wordAr: string;
  wordEn: string;
  imageUrl: string;
  audioUrl: string;
}

interface DialogueLine {
  id: string;
  speakerNameAr: string;
  speakerNameEn: string;
  avatarColor: string;
  textAr: string;
  textEn: string;
  audioUrl: string;
}

interface ExerciseQuestion {
  id: string;
  sentenceAr: string;
  sentenceEn: string;
  optionsCsv: string;
  correctAnswer: string;
  grammaticalRuleEn: string;
}

interface Course2LessonNode {
  id: string;
  titleAr: string;
  titleEn: string;
  vocabularies: VocabItem[];
  fullDialogueAudioUrl: string;
  dialogueLines: DialogueLine[];
  exercises: ExerciseQuestion[];
}

interface ModuleNode {
  id: string;
  titleAr: string;
  titleEn: string;
  lessons: Course2LessonNode[];
}

interface LevelNode {
  id: string;
  titleAr: string;
  titleEn: string;
  modules: ModuleNode[];
}

export default function Course2CurriculumPage() {
  const [viewMode, setViewMode] = useState<"TREE" | "LESSON_STUDIO">("TREE");

  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({
    "lvl-fusha-1": true,
  });
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "mod-fusha-101": true,
  });

  const toggleLevel = (lvlId: string) => {
    setExpandedLevels((prev) => ({ ...prev, [lvlId]: !prev[lvlId] }));
  };

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const defaultLesson: Course2LessonNode = {
    id: "les-fusha-101a",
    titleAr: "التَّحِيَّاتُ الْيَوْمِيَّةُ وَالتَّعَارُفُ",
    titleEn: "Daily Greetings & Self Introduction",
    vocabularies: [
      {
        id: "v-1",
        wordAr: "مَرْحَبًا",
        wordEn: "Hello / Welcome",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
        audioUrl: "/audio/marhaban.mp3",
      },
      {
        id: "v-2",
        wordAr: "كَيْفَ حَالُكَ؟",
        wordEn: "How are you?",
        imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&q=80",
        audioUrl: "/audio/kayfa_haluk.mp3",
      },
    ],
    fullDialogueAudioUrl: "/audio/full_dialogue_greetings.mp3",
    dialogueLines: [
      {
        id: "dl-1",
        speakerNameAr: "أَحْمَدُ",
        speakerNameEn: "Ahmad",
        avatarColor: "bg-blue-600",
        textAr: "السَّلَامُ عَلَيْكُمْ يَا فَاطِمَةُ! كَيْفَ حَالُكِ الْيَوْمَ؟",
        textEn: "Peace be upon you, Fatima! How are you today?",
        audioUrl: "/audio/ahmad_line1.mp3",
      },
      {
        id: "dl-2",
        speakerNameAr: "فَاطِمَةُ",
        speakerNameEn: "Fatima",
        avatarColor: "bg-emerald-600",
        textAr: "وَعَلَيْكُمُ السَّلَامُ يَا أَحْمَدُ! أَنَا بِخَيْرٍ وَالْحَمْدُ لِلَّهِ. وَأَنْتَ؟",
        textEn: "And upon you be peace, Ahmad! I am fine, thank God. And you?",
        audioUrl: "/audio/fatima_line1.mp3",
      },
      {
        id: "dl-3",
        speakerNameAr: "سَارَةُ",
        speakerNameEn: "Sarah",
        avatarColor: "bg-[#CC6B49]",
        textAr: "أَهْلًا بِكُمَا جَمِيعًا! مَرْحَبًا بِكُمَا فِي الْمَدِينَةِ.",
        textEn: "Welcome to both of you! Welcome to the city.",
        audioUrl: "/audio/sarah_line1.mp3",
      },
    ],
    exercises: [
      {
        id: "q-fusha-1",
        sentenceAr: "كَيْفَ حَالُكَ الْيَوْمَ؟",
        sentenceEn: "How are you today?",
        optionsCsv: "أَنَا بِخَيْرٍ, شُكْرًا جَزِيلًا, مَعَ السَّلَامَةِ, أَهْلًا وَسَهْلًا",
        correctAnswer: "أَنَا بِخَيْرٍ",
        grammaticalRuleEn: "Standard polite response to greeting",
      },
    ],
  };

  const [levels, setLevels] = useState<LevelNode[]>([
    {
      id: "lvl-fusha-1",
      titleAr: "الْمُسْتَوَى الأَوَّلُ: التَّحِيَّاتُ وَالْحَيَاةُ الْيَوْمِيَّةُ",
      titleEn: "Level 1: Daily Greetings & Spoken Dialogues",
      modules: [
        {
          id: "mod-fusha-101",
          titleAr: "الـتَّعَارُفُ فِي الْأَمَاكِنِ الْعَامَّةِ",
          titleEn: "Module 1: Introductions in Public Places",
          lessons: [defaultLesson],
        },
      ],
    },
  ]);

  const [activeLesson, setActiveLesson] = useState<Course2LessonNode | null>(null);
  const [lessonTab, setLessonTab] = useState<"VOCAB" | "DIALOGUE" | "PRACTICE">("DIALOGUE");
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [vocabList, setVocabList] = useState<VocabItem[]>([]);
  const [fullDialogueAudioUrl, setFullDialogueAudioUrl] = useState("");
  const [dialogueLines, setDialogueLines] = useState<DialogueLine[]>([]);
  const [exercisesList, setExercisesList] = useState<ExerciseQuestion[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  const handleAddLevel = () => {
    const titleEn = prompt("Enter Level Title in English:", `Level ${levels.length + 1}: Spoken Arabic`);
    if (!titleEn) return;
    const newLvlId = `lvl-fusha-${Date.now()}`;
    const newLvl: LevelNode = {
      id: newLvlId,
      titleAr: "الْمُسْتَوَى الْجَدِيدُ",
      titleEn: titleEn,
      modules: [],
    };
    setLevels([...levels, newLvl]);
    setExpandedLevels((prev) => ({ ...prev, [newLvlId]: true }));
  };

  const handleEditLevel = (lvlId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const lvl = levels.find((l) => l.id === lvlId);
    if (!lvl) return;
    const newEn = prompt("Edit Level English Title:", lvl.titleEn);
    if (newEn === null) return;
    const newAr = prompt("Edit Level Arabic Title:", lvl.titleAr);
    if (newAr === null) return;

    setLevels(
      levels.map((l) => (l.id === lvlId ? { ...l, titleEn: newEn, titleAr: newAr } : l))
    );
  };

  const handleDeleteLevel = (lvlId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this Level and all its modules & lessons?")) {
      setLevels(levels.filter((l) => l.id !== lvlId));
    }
  };

  const handleAddModule = (lvlId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const titleEn = prompt("Enter Module Title in English:", "New Spoken Arabic Module");
    if (!titleEn) return;
    const newModId = `mod-fusha-${Date.now()}`;
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

  const handleEditModule = (lvlId: string, modId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const lvl = levels.find((l) => l.id === lvlId);
    const mod = lvl?.modules.find((m) => m.id === modId);
    if (!mod) return;
    const newEn = prompt("Edit Module English Title:", mod.titleEn);
    if (newEn === null) return;
    const newAr = prompt("Edit Module Arabic Title:", mod.titleAr);
    if (newAr === null) return;

    setLevels(
      levels.map((l) =>
        l.id === lvlId
          ? {
              ...l,
              modules: l.modules.map((m) =>
                m.id === modId ? { ...m, titleEn: newEn, titleAr: newAr } : m
              ),
            }
          : l
      )
    );
  };

  const handleDeleteModule = (lvlId: string, modId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this module and all its dialogue lessons?")) {
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
    const titleEn = prompt("Enter Lesson Title in English:", "New Spoken Arabic Dialogue Lesson");
    if (!titleEn) return;
    const newLes: Course2LessonNode = {
      id: `les-fusha-${Date.now()}`,
      titleAr: "الدَّرْسُ الْجَدِيدُ",
      titleEn: titleEn,
      vocabularies: [],
      fullDialogueAudioUrl: "",
      dialogueLines: [],
      exercises: [],
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
  };

  const handleDeleteLesson = (lvlId: string, modId: string, lesId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this dialogue lesson?")) {
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

  const handleOpenLessonStudio = (les: Course2LessonNode) => {
    setActiveLesson(les);
    setTitleAr(les.titleAr);
    setTitleEn(les.titleEn);
    setVocabList([...les.vocabularies]);
    setFullDialogueAudioUrl(les.fullDialogueAudioUrl || "");
    setDialogueLines([...les.dialogueLines]);
    setExercisesList([...les.exercises]);
    setLessonTab("DIALOGUE");
    setViewMode("LESSON_STUDIO");
  };

  const handleSaveLesson = () => {
    if (!activeLesson) return;
    setIsSaved(true);

    setLevels(
      levels.map((lvl) => ({
        ...lvl,
        modules: lvl.modules.map((mod) => ({
          ...mod,
          lessons: mod.lessons.map((les) =>
            les.id === activeLesson.id
              ? {
                  ...les,
                  titleAr,
                  titleEn,
                  vocabularies: vocabList,
                  fullDialogueAudioUrl,
                  dialogueLines,
                  exercises: exercisesList,
                }
              : les
          ),
        })),
      }))
    );

    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const handleAddDialogueLine = () => {
    const newLine: DialogueLine = {
      id: `dl-${Date.now()}`,
      speakerNameAr: "أَحْمَدُ",
      speakerNameEn: "Ahmad",
      avatarColor: "bg-blue-600",
      textAr: "نَصُّ الْحِوَارِ الْجَدِيدُ...",
      textEn: "New dialogue line translation...",
      audioUrl: "",
    };
    setDialogueLines([...dialogueLines, newLine]);
  };

  const updateDialogueLine = (id: string, field: keyof DialogueLine, val: string) => {
    setDialogueLines(
      dialogueLines.map((line) => (line.id === id ? { ...line, [field]: val } : line))
    );
  };

  const handleDeleteDialogueLine = (id: string) => {
    setDialogueLines(dialogueLines.filter((l) => l.id !== id));
  };

  const handleAddVocab = () => {
    const newV: VocabItem = {
      id: `v-${Date.now()}`,
      wordAr: "كَلِمَةٌ جَدِيدَةٌ",
      wordEn: "New Word",
      imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
      audioUrl: "",
    };
    setVocabList([...vocabList, newV]);
  };

  const updateVocab = (id: string, field: keyof VocabItem, val: string) => {
    setVocabList(
      vocabList.map((v) => (v.id === id ? { ...v, [field]: val } : v))
    );
  };

  const handleVocabImageFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeObjUrl = URL.createObjectURL(file);
      updateVocab(id, "imageUrl", fakeObjUrl);
    }
  };

  const handleDeleteVocab = (id: string) => {
    setVocabList(vocabList.filter((v) => v.id !== id));
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
            Course 2: Spoken Arabic Studio
          </h1>
          <p className="text-xs text-claude-textMuted">
            Each lesson embeds: 1) Vocabulary & Image Uploader, 2) Multi-Person Spoken Dialogue, and 3) Practice Drills.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {viewMode === "LESSON_STUDIO" ? (
            <button
              onClick={() => setViewMode("TREE")}
              className="px-4 py-2 bg-white border border-claude-border font-bold text-xs rounded-xl hover:border-claude-borderHover"
            >
              ← Back to Course 2 Tree
            </button>
          ) : (
            <button
              onClick={handleAddLevel}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
            >
              + Add Level
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: CURRICULUM TREE */}
      {viewMode === "TREE" && (
        <div className="space-y-4 max-w-6xl mx-auto">
          {levels.map((lvl, lvlIdx) => {
            const isLvlExpanded = !!expandedLevels[lvl.id];

            return (
              <div key={lvl.id} className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm overflow-hidden transition-all">
                <div
                  onClick={() => toggleLevel(lvl.id)}
                  className="p-5 bg-claude-bg/60 hover:bg-claude-bg cursor-pointer flex items-center justify-between border-b border-claude-border transition-colors select-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-xl bg-white border border-claude-border font-bold text-sm flex items-center justify-center text-claude-textMain shadow-sm">
                      {isLvlExpanded ? "▼" : "►"}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                          Level {lvlIdx + 1} Spoken Arabic
                        </span>
                        <h2 className="text-base font-bold text-claude-textMain">{lvl.titleEn}</h2>
                      </div>
                      <span className="font-arabic text-lg text-slate-900 font-bold block dir-rtl" dir="rtl">
                        {lvl.titleAr}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleAddModule(lvl.id, e)}
                      className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100"
                    >
                      + Add Module
                    </button>
                    <button
                      onClick={(e) => handleEditLevel(lvl.id, e)}
                      className="px-3 py-1.5 text-xs font-bold text-claude-textMain bg-white border border-claude-border rounded-xl hover:bg-claude-bg"
                    >
                      ✏️ Edit Level
                    </button>
                    <button
                      onClick={(e) => handleDeleteLevel(lvl.id, e)}
                      className="px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100"
                    >
                      🗑️ Delete Level
                    </button>
                  </div>
                </div>

                {isLvlExpanded && (
                  <div className="p-6 space-y-4 bg-white border-t border-claude-border">
                    {lvl.modules.map((mod, modIdx) => {
                      const isModExpanded = !!expandedModules[mod.id];

                      return (
                        <div key={mod.id} className="border border-claude-border rounded-xl overflow-hidden bg-claude-bg/30">
                          <div
                            onClick={() => toggleModule(mod.id)}
                            className="p-4 bg-white hover:bg-claude-bg cursor-pointer flex items-center justify-between border-b border-claude-border transition-colors select-none"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center border border-emerald-200">
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

                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => handleAddLesson(lvl.id, mod.id, e)}
                                className="px-3 py-1 text-xs font-bold bg-claude-sageLight text-claude-sage border border-claude-sage/20 rounded-lg hover:bg-emerald-100"
                              >
                                + Add Lesson
                              </button>
                              <button
                                onClick={(e) => handleEditModule(lvl.id, mod.id, e)}
                                className="px-2.5 py-1 text-xs font-bold bg-white text-claude-textMain border border-claude-border rounded-lg hover:bg-claude-bg"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={(e) => handleDeleteModule(lvl.id, mod.id, e)}
                                className="px-2.5 py-1 text-xs font-bold text-rose-600 bg-white border border-rose-200 rounded-lg hover:bg-rose-50"
                              >
                                ✕ Delete
                              </button>
                            </div>
                          </div>

                          {isModExpanded && (
                            <div className="p-4 space-y-3 bg-claude-bg/50">
                              {mod.lessons.map((les, lesIdx) => (
                                <div
                                  key={les.id}
                                  className="claude-card rounded-xl p-4 bg-white border border-claude-border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                                >
                                  <div className="space-y-0.5">
                                    <span className="font-arabic text-xl font-bold text-slate-900 block dir-rtl" dir="rtl">
                                      {les.titleAr}
                                    </span>
                                    <span className="text-xs font-bold text-claude-textMain block">
                                      Lesson {lesIdx + 1}: {les.titleEn}
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2 pt-1">
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                                        🖼️ Vocab + Image Uploader ({les.vocabularies.length} Words)
                                      </span>
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
                                        💬 Spoken Dialogue ({les.dialogueLines.length} Lines)
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <button
                                      onClick={() => handleOpenLessonStudio(les)}
                                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
                                    >
                                      ✏️ Edit Spoken Arabic Lesson
                                    </button>
                                    <button
                                      onClick={(e) => handleDeleteLesson(lvl.id, mod.id, les.id, e)}
                                      className="p-2 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl text-xs"
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

      {/* VIEW MODE 2: LESSON STUDIO */}
      {viewMode === "LESSON_STUDIO" && activeLesson && (
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-claude-border rounded-2xl p-4 shadow-sm">
            <div>
              <span className="text-[10px] font-mono text-claude-textMuted uppercase block">
                Course 2 Spoken Arabic Integrated Studio
              </span>
              <h2 className="text-xl font-extrabold text-claude-textMain">{titleEn}</h2>
            </div>

            <div className="flex items-center bg-claude-bg p-1 rounded-xl border border-claude-border">
              <button
                onClick={() => setLessonTab("VOCAB")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lessonTab === "VOCAB"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-claude-textMuted hover:text-claude-textMain"
                }`}
              >
                1. 🖼️ Vocab & Image Uploader ({vocabList.length})
              </button>
              <button
                onClick={() => setLessonTab("DIALOGUE")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lessonTab === "DIALOGUE"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-claude-textMuted hover:text-claude-textMain"
                }`}
              >
                2. 💬 Spoken Dialogue ({dialogueLines.length} Lines)
              </button>
              <button
                onClick={() => setLessonTab("PRACTICE")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lessonTab === "PRACTICE"
                    ? "bg-purple-600 text-white shadow-xs"
                    : "text-claude-textMuted hover:text-claude-textMain"
                }`}
              >
                3. 🎯 Practice Drills
              </button>
            </div>
          </div>

          {/* SECTION 1: VOCAB & IMAGE UPLOADER */}
          {lessonTab === "VOCAB" && (
            <div className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-claude-border pb-4">
                <div>
                  <h3 className="font-extrabold text-claude-textMain text-base">
                    Section 1: Lesson Vocabulary with Image Visual Uploader
                  </h3>
                  <p className="text-xs text-claude-textMuted">
                    Words used in the conversation with image uploads & audio clips.
                  </p>
                </div>
                <button
                  onClick={handleAddVocab}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
                >
                  + Add Lesson Word
                </button>
              </div>

              <div className="space-y-4">
                {vocabList.map((v) => (
                  <div key={v.id} className="p-5 rounded-2xl bg-claude-bg/40 border border-claude-border space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={v.imageUrl}
                          alt={v.wordEn}
                          className="w-16 h-16 rounded-xl object-cover border border-claude-border shadow-xs shrink-0"
                        />
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-claude-terracotta hover:underline cursor-pointer">
                            <span>📁 Upload Image File</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleVocabImageFileChange(v.id, e)}
                              className="hidden"
                            />
                          </label>
                          <input
                            type="text"
                            value={v.imageUrl}
                            onChange={(e) => updateVocab(v.id, "imageUrl", e.target.value)}
                            placeholder="Or paste Image URL..."
                            className="w-full text-xs p-1.5 rounded-lg bg-white border border-claude-border"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteVocab(v.id)}
                        className="text-xs text-rose-600 font-semibold hover:underline self-end md:self-center"
                      >
                        Delete Word
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-claude-border/60 pt-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-claude-textMuted block mb-1">
                          Vowelled Arabic Word
                        </label>
                        <input
                          type="text"
                          value={v.wordAr}
                          onChange={(e) => updateVocab(v.id, "wordAr", e.target.value)}
                          className="w-full font-arabic text-xl font-bold text-slate-900 border-b border-claude-border focus:border-amber-600 focus:outline-none py-1 dir-rtl"
                          dir="rtl"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase text-claude-textMuted block mb-1">
                          English Translation
                        </label>
                        <input
                          type="text"
                          value={v.wordEn}
                          onChange={(e) => updateVocab(v.id, "wordEn", e.target.value)}
                          className="w-full text-xs font-semibold text-claude-textMain border-b border-claude-border focus:border-amber-600 focus:outline-none py-1"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold uppercase text-claude-textMuted block mb-1">
                          Native Audio URL (.mp3)
                        </label>
                        <input
                          type="text"
                          value={v.audioUrl}
                          onChange={(e) => updateVocab(v.id, "audioUrl", e.target.value)}
                          placeholder="/audio/word.mp3"
                          className="w-full text-xs font-mono text-claude-textMain border-b border-claude-border focus:border-amber-600 focus:outline-none py-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: SPOKEN DIALOGUE STUDIO */}
          {lessonTab === "DIALOGUE" && (
            <div className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm p-6 space-y-6">
              <div className="border-b border-claude-border pb-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-claude-textMain text-base">
                      Section 2: Multi-Person Spoken Dialogue Studio
                    </h3>
                    <p className="text-xs text-claude-textMuted">
                      Add multiple speakers (Ahmad, Fatima, Sarah...) with native audio clips per line.
                    </p>
                  </div>
                  <button
                    onClick={handleAddDialogueLine}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                  >
                    + Add Speaker Line
                  </button>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                  <span className="text-lg">🎙️</span>
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-emerald-950 uppercase block">
                      Full Spoken Conversation Audio File (.mp3)
                    </span>
                    <input
                      type="text"
                      value={fullDialogueAudioUrl}
                      onChange={(e) => setFullDialogueAudioUrl(e.target.value)}
                      placeholder="/audio/full_dialogue.mp3"
                      className="w-full text-xs font-mono bg-white border border-emerald-300 p-1.5 rounded-lg focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {dialogueLines.map((line, lIdx) => (
                  <div
                    key={line.id}
                    className="p-5 rounded-2xl bg-claude-bg/40 border border-claude-border space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-claude-border pb-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center ${line.avatarColor}`}>
                          {line.speakerNameEn ? line.speakerNameEn[0] : "S"}
                        </span>
                        <span className="text-xs font-extrabold text-claude-textMain">
                          Line {lIdx + 1} • Speaker:
                        </span>
                        <input
                          type="text"
                          value={line.speakerNameAr}
                          onChange={(e) => updateDialogueLine(line.id, "speakerNameAr", e.target.value)}
                          placeholder="أَحْمَدُ"
                          className="font-arabic text-sm font-bold text-slate-900 bg-white border border-claude-border px-2 py-0.5 rounded dir-rtl"
                          dir="rtl"
                        />
                        <input
                          type="text"
                          value={line.speakerNameEn}
                          onChange={(e) => updateDialogueLine(line.id, "speakerNameEn", e.target.value)}
                          placeholder="Ahmad"
                          className="text-xs font-bold text-claude-textMain bg-white border border-claude-border px-2 py-0.5 rounded w-24"
                        />
                      </div>

                      <button
                        onClick={() => handleDeleteDialogueLine(line.id)}
                        className="text-xs text-rose-600 font-semibold hover:underline"
                      >
                        Delete Line
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-bold uppercase text-claude-textMuted block mb-1">
                          Vowelled Arabic Dialogue Text
                        </label>
                        <input
                          type="text"
                          value={line.textAr}
                          onChange={(e) => updateDialogueLine(line.id, "textAr", e.target.value)}
                          className="w-full font-arabic text-2xl font-bold text-slate-900 border-b border-claude-border focus:border-emerald-600 focus:outline-none py-1 dir-rtl"
                          dir="rtl"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-bold uppercase text-claude-textMuted block mb-1">
                            English Translation
                          </label>
                          <input
                            type="text"
                            value={line.textEn}
                            onChange={(e) => updateDialogueLine(line.id, "textEn", e.target.value)}
                            className="w-full text-xs font-semibold text-claude-textMain border-b border-claude-border focus:border-emerald-600 focus:outline-none py-1"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold uppercase text-claude-textMuted block mb-1">
                            Line Native Audio (.mp3)
                          </label>
                          <input
                            type="text"
                            value={line.audioUrl}
                            onChange={(e) => updateDialogueLine(line.id, "audioUrl", e.target.value)}
                            placeholder="/audio/line1.mp3"
                            className="w-full text-xs font-mono text-claude-textMain border-b border-claude-border focus:border-emerald-600 focus:outline-none py-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: PRACTICE DRILLS */}
          {lessonTab === "PRACTICE" && (
            <div className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm p-6 space-y-4">
              <h3 className="font-extrabold text-claude-textMain text-base">
                Section 3: Dialogue Practice Drills
              </h3>
              <p className="text-xs text-claude-textMuted">
                5-sentence practice exercises tailored for this conversational dialogue.
              </p>
              <Link
                href="/lessons/new"
                className="inline-block px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-xs"
              >
                Open Exercise Builder Studio →
              </Link>
            </div>
          )}

          {/* Footer OTA Save */}
          <div className="bg-white border border-claude-border rounded-2xl p-4 flex items-center justify-between shadow-sm">
            {isSaved && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                ✓ Course 2 Spoken Arabic Lesson Published OTA
              </span>
            )}
            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => setViewMode("TREE")}
                className="px-4 py-2.5 rounded-xl bg-white border border-claude-border text-claude-textMain font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLesson}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                🚀 Save & Publish Spoken Arabic Lesson OTA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
