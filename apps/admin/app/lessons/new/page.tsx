"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { COURSE_1_LEVELS } from "@alarabi/curriculum";

interface QuestionItem {
  id: string;
  sentenceAr: string;
  sentenceEn: string;
  optionsCsv: string;
  correctAnswer: string;
  grammaticalRuleEn: string;
}

interface ExerciseUnit {
  id: string;
  titleAr: string;
  titleEn: string;
  exerciseType: "TASHKEEL_PICKER" | "SENTENCE_REORDER" | "TRANSLATION" | "IRAB_ANALYSIS";
  questions: QuestionItem[];
}

interface LessonNode {
  id: string;
  titleAr: string;
  titleEn: string;
  exercises: ExerciseUnit[];
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

export default function ExerciseStudioPage() {
  const [targetCourse, setTargetCourse] = useState<"course-1" | "course-2">("course-1");
  const [viewMode, setViewMode] = useState<"TREE" | "BIG_QUESTION_STUDIO">("TREE");

  // Accordion Expand/Collapse States
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({
    "lvl-1": true,
  });
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({});

  const toggleLevel = (lvlId: string) => {
    setExpandedLevels((prev) => ({ ...prev, [lvlId]: !prev[lvlId] }));
  };

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const toggleLesson = (lesId: string) => {
    setExpandedLessons((prev) => ({ ...prev, [lesId]: !prev[lesId] }));
  };

  // Sample default exercise unit template
  const defaultEx1: ExerciseUnit = {
    id: "ex-101a",
    titleAr: "تَحَدِّي تَشْكِيلِ الْمُبْتَدَأِ وَالْخَبَرِ",
    titleEn: "Harakah Challenge: Mubtada & Khabar",
    exerciseType: "TASHKEEL_PICKER",
    questions: [
      {
        id: "q-1",
        sentenceAr: "الْعِلْمُ ____ فِي الْحَيَاةِ",
        sentenceEn: "Knowledge is light in life.",
        optionsCsv: "نُورٌ, نُورًا, نُورٍ, نُورَ",
        correctAnswer: "نُورٌ",
        grammaticalRuleEn: "Khabar is Marfoo' with Tanween Dammah (ٌُ)",
      },
      {
        id: "q-2",
        sentenceAr: "الْطَّالِبُ ____ فِي الدَّرْسِ",
        sentenceEn: "The student is attentive in class.",
        optionsCsv: "مُجْتَهِدٌ, مُجْتَهِدًا, مُجْتَهِدٍ, مُجْتَهِدَ",
        correctAnswer: "مُجْتَهِدٌ",
        grammaticalRuleEn: "Khabar is Marfoo' with Tanween Dammah (ٌُ)",
      },
      {
        id: "q-3",
        sentenceAr: "الْمَسْجِدُ ____ فِي الْمَدِينَةِ",
        sentenceEn: "The mosque is large in the city.",
        optionsCsv: "كَبِيرٌ, كَبِيرًا, كَبِيرٍ, كَبِيرَ",
        correctAnswer: "كَبِيرٌ",
        grammaticalRuleEn: "Khabar is Marfoo' with Tanween Dammah (ٌُ)",
      },
      {
        id: "q-4",
        sentenceAr: "الْأُسْتَاذُ ____ فِي الْقَاعَةِ",
        sentenceEn: "The professor is present in the hall.",
        optionsCsv: "حَاضِرٌ, حَاضِرًا, حَاضِرٍ, حَاضِرَ",
        correctAnswer: "حَاضِرٌ",
        grammaticalRuleEn: "Khabar is Marfoo' with Tanween Dammah (ٌُ)",
      },
      {
        id: "q-5",
        sentenceAr: "الْكِتَابُ ____ عَلَى الْمَكْتَبِ",
        sentenceEn: "The book is useful on the desk.",
        optionsCsv: "مُفِيدٌ, مُفِيدًا, مُفِيدٍ, مُفِيدَ",
        correctAnswer: "مُفِيدٌ",
        grammaticalRuleEn: "Khabar is Marfoo' with Tanween Dammah (ٌُ)",
      },
    ],
  };

  // Populate Tree with Course 1 Levels & Lessons from shared package
  const initialTree: LevelNode[] = COURSE_1_LEVELS.map((lvl) => ({
    id: lvl.id,
    titleAr: lvl.titleAr,
    titleEn: lvl.titleEn,
    modules: lvl.modules.map((mod) => ({
      id: mod.id,
      titleAr: mod.titleAr,
      titleEn: mod.titleEn,
      lessons: mod.lessons.map((les, i) => ({
        id: les.id,
        titleAr: les.titleAr,
        titleEn: les.titleEn,
        exercises: i === 0 ? [defaultEx1] : [],
      })),
    })),
  }));

  const [levels, setLevels] = useState<LevelNode[]>(initialTree);
  const [isDbSynced, setIsDbSynced] = useState(false);

  // Sync exercises with PostgreSQL database on load
  useEffect(() => {
    async function loadDbExercises() {
      try {
        const res = await fetch("/api/v1/exercises");
        const json = await res.json();

        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const dbExercises = json.data;

          setLevels((prevLevels) =>
            prevLevels.map((lvl) => ({
              ...lvl,
              modules: lvl.modules.map((mod) => ({
                ...mod,
                lessons: mod.lessons.map((les) => {
                  const matchingDbEx = dbExercises.filter((ex: any) => ex.lessonId === les.id);
                  if (matchingDbEx.length > 0) {
                    const mappedEx: ExerciseUnit[] = matchingDbEx.map((ex: any) => ({
                      id: ex.id,
                      titleAr: ex.payloadJson?.titleAr || "تَمْرِينٌ جَدِيدٌ",
                      titleEn: ex.promptEn || ex.payloadJson?.titleEn || "Exercise Unit",
                      exerciseType: ex.type || "TASHKEEL_PICKER",
                      questions: ex.payloadJson?.questions || [],
                    }));
                    return { ...les, exercises: mappedEx };
                  }
                  return les;
                }),
              })),
            }))
          );
        }
        setIsDbSynced(true);
      } catch (e) {
        console.error("Failed to load exercises from PostgreSQL", e);
      }
    }

    loadDbExercises();
  }, []);

  // Active Selected Exercise for Big View Question Studio
  const [activeLevelId, setActiveLevelId] = useState<string>("");
  const [activeModuleId, setActiveModuleId] = useState<string>("");
  const [activeLessonId, setActiveLessonId] = useState<string>("");
  const [activeExercise, setActiveExercise] = useState<ExerciseUnit | null>(null);

  // Big View Question Studio Form States
  const [activeQTab, setActiveQTab] = useState<number>(0);
  const [exTitleAr, setExTitleAr] = useState("");
  const [exTitleEn, setExTitleEn] = useState("");
  const [exType, setExType] = useState<ExerciseUnit["exerciseType"]>("TASHKEEL_PICKER");
  const [questionsList, setQuestionsList] = useState<QuestionItem[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // OPEN BIG VIEW QUESTION STUDIO WHEN CLICKING AN INDIVIDUAL EXERCISE
  const handleOpenBigQuestionStudio = (
    lvlId: string,
    modId: string,
    lesId: string,
    ex: ExerciseUnit
  ) => {
    setActiveLevelId(lvlId);
    setActiveModuleId(modId);
    setActiveLessonId(lesId);
    setActiveExercise(ex);

    setExTitleAr(ex.titleAr);
    setExTitleEn(ex.titleEn);
    setExType(ex.exerciseType);
    setQuestionsList([...ex.questions]);
    setActiveQTab(0);
    setViewMode("BIG_QUESTION_STUDIO");
  };

  // Save changes from Big View back to PostgreSQL DB & update Tree
  const handleSaveBigStudio = async () => {
    if (!activeExercise) return;
    setIsSaved(true);

    try {
      await fetch("/api/v1/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: activeExercise.id.startsWith("ex-") ? undefined : activeExercise.id,
          lessonId: activeLessonId,
          type: exType,
          promptEn: exTitleEn,
          payloadJson: {
            titleAr: exTitleAr,
            titleEn: exTitleEn,
            questions: questionsList,
          },
        }),
      });
    } catch (e) {
      console.error("Failed to persist exercise to PostgreSQL", e);
    }

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
                  exercises: les.exercises.map((ex) =>
                    ex.id === activeExercise.id
                      ? {
                          ...ex,
                          titleAr: exTitleAr,
                          titleEn: exTitleEn,
                          exerciseType: exType,
                          questions: questionsList,
                        }
                      : ex
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

  // Question editing inside Big View Studio
  const updateCurrentQuestion = (field: keyof QuestionItem, val: string) => {
    setQuestionsList(
      questionsList.map((q, idx) => (idx === activeQTab ? { ...q, [field]: val } : q))
    );
  };

  const handleAddQuestionToBigStudio = () => {
    const newQ: QuestionItem = {
      id: `q-studio-${Date.now()}`,
      sentenceAr: "جُمْلَةٌ عَرَبِيَّةٌ جَدِيدَةٌ ____ فِي الدَّرْسِ",
      sentenceEn: "New English context phrase.",
      optionsCsv: "خِيَار 1, خِيَار 2, خِيَار 3, خِيَار 4",
      correctAnswer: "خِيَار 1",
      grammaticalRuleEn: "Rule explanation note",
    };
    setQuestionsList([...questionsList, newQ]);
    setActiveQTab(questionsList.length);
  };

  const handleDeleteQuestionFromBigStudio = (qIdx: number) => {
    if (questionsList.length <= 1) {
      alert("Exercise unit must have at least 1 question.");
      return;
    }
    const updated = questionsList.filter((_, idx) => idx !== qIdx);
    setQuestionsList(updated);
    setActiveQTab(Math.max(0, qIdx - 1));
  };

  // Tree CRUD Handlers
  const handleAddLevel = () => {
    const titleEn = prompt("Enter Level Title in English:", `Level ${levels.length + 1}: Exercise Suite`);
    if (!titleEn) return;
    const newLvlId = `ex-lvl-${Date.now()}`;
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
    const titleEn = prompt("Enter Module Title in English:", "New Exercise Module");
    if (!titleEn) return;
    const newModId = `ex-mod-${Date.now()}`;
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
    const titleEn = prompt("Enter Lesson Title for Exercise Suite:", "New Lesson Exercise Target");
    if (!titleEn) return;
    const newLesId = `ex-les-${Date.now()}`;
    const newLes: LessonNode = {
      id: newLesId,
      titleAr: "الدَّرْسُ الْجَدِيدُ",
      titleEn: titleEn,
      exercises: [defaultEx1],
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
    if (confirm("Delete this lesson exercise container?")) {
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

  const handleAddExerciseToLesson = (lvlId: string, modId: string, lesId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const titleEn = prompt("Enter Exercise Unit Title:", "New 5-Question Exercise Unit");
    if (!titleEn) return;

    const defaultQs: QuestionItem[] = Array.from({ length: 5 }).map((_, i) => ({
      id: `q-new-${Date.now()}-${i + 1}`,
      sentenceAr: `الْجُمْلَةُ الْعَرَبِيَّةُ ${i + 1} ____ فِي الدَّرْسِ`,
      sentenceEn: `English context phrase ${i + 1}`,
      optionsCsv: "خِيَار 1, خِيَار 2, خِيَار 3, خِيَار 4",
      correctAnswer: "خِيَار 1",
      grammaticalRuleEn: "Rule explanation " + (i + 1),
    }));

    const newEx: ExerciseUnit = {
      id: `ex-${Date.now()}`,
      titleAr: "تَمْرِينٌ جَدِيدٌ (5 أَسْئِلَةٍ)",
      titleEn: titleEn,
      exerciseType: "TASHKEEL_PICKER",
      questions: defaultQs,
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
                return { ...les, exercises: [...les.exercises, newEx] };
              }),
            };
          }),
        };
      })
    );
    setExpandedLessons((prev) => ({ ...prev, [lesId]: true }));
  };

  const handleDeleteExerciseUnit = async (
    lvlId: string,
    modId: string,
    lesId: string,
    exId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (confirm("Delete this exercise unit?")) {
      if (!exId.startsWith("ex-")) {
        try {
          await fetch(`/api/v1/exercises?id=${exId}`, { method: "DELETE" });
        } catch (e) {
          console.error("Failed to delete exercise from DB", e);
        }
      }

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
                  return { ...les, exercises: les.exercises.filter((ex) => ex.id !== exId) };
                }),
              };
            }),
          };
        })
      );
    }
  };

  const currentQ = questionsList[activeQTab] || {
    id: "q-1",
    sentenceAr: "",
    sentenceEn: "",
    optionsCsv: "",
    correctAnswer: "",
    grammaticalRuleEn: "",
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
            Exercise Studio & Multi-Question Builder
          </h1>
          <p className="text-xs text-claude-textMuted mt-0.5">
            {viewMode === "TREE"
              ? "Course 1 & 2 Live Hierarchy: Level → Module → Lesson → Exercise Units. Connected to PostgreSQL DB."
              : `Big View Question Studio for Exercise: "${exTitleEn}"`}
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
              Course 1: Grammar Exercises
            </button>
            <button
              onClick={() => setTargetCourse("course-2")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                targetCourse === "course-2"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-claude-textMuted hover:text-claude-textMain"
              }`}
            >
              Course 2: Fusha Dialogues
            </button>
          </div>

          {viewMode === "BIG_QUESTION_STUDIO" ? (
            <button
              onClick={() => setViewMode("TREE")}
              className="px-4 py-2 bg-white border border-claude-border hover:border-claude-borderHover font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              ← Back to Full Screen Exercise Tree
            </button>
          ) : (
            <button
              onClick={handleAddLevel}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              + Add Level Exercise Suite
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: FULL SCREEN NESTED EXERCISE TREE */}
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
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                          Level {lvlIdx + 1} Exercise Suite
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
                      className="px-3.5 py-1.5 text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-600 hover:text-white transition-colors"
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
                              <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center border border-purple-200">
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
                                    {/* LESSON CONTAINER BAR */}
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
                                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                                          {les.exercises.length} Exercise Units
                                        </span>
                                        <button
                                          onClick={(e) => handleAddExerciseToLesson(lvl.id, mod.id, les.id, e)}
                                          className="px-3 py-1 text-xs font-bold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                        >
                                          + Add 5-Q Exercise Unit
                                        </button>
                                        <button
                                          onClick={(e) => handleDeleteLesson(lvl.id, mod.id, les.id, e)}
                                          className="p-1 text-rose-600 hover:bg-rose-50 text-xs"
                                        >
                                          ✕
                                        </button>
                                      </div>
                                    </div>

                                    {/* EXERCISE UNITS LIST BARS */}
                                    {isLesExpanded && (
                                      <div className="p-3.5 space-y-2 bg-claude-bg/20">
                                        {les.exercises.map((ex, exIdx) => (
                                          <div
                                            key={ex.id}
                                            className="claude-card rounded-xl p-3 bg-white border border-claude-border hover:border-claude-borderHover transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs"
                                          >
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                                                {exIdx + 1}
                                              </div>

                                              <div className="space-y-0.5 flex-1 min-w-0">
                                                <span className="font-arabic text-base text-slate-900 font-bold block truncate dir-rtl" dir="rtl">
                                                  {ex.titleAr}
                                                </span>
                                                <span className="text-xs font-bold text-claude-textMain block truncate">
                                                  Exercise Unit {exIdx + 1}: {ex.titleEn}
                                                </span>
                                              </div>
                                            </div>

                                            <div className="flex items-center gap-3 shrink-0">
                                              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200">
                                                {ex.exerciseType.replace("_", " ")} • {ex.questions.length} Questions
                                              </span>

                                              <button
                                                onClick={() => handleOpenBigQuestionStudio(lvl.id, mod.id, les.id, ex)}
                                                className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-colors shadow-sm flex items-center gap-1.5"
                                              >
                                                ✏️ Build / Edit Questions
                                              </button>

                                              <button
                                                onClick={(e) => handleDeleteExerciseUnit(lvl.id, mod.id, les.id, ex.id, e)}
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

      {/* VIEW MODE 2: DEDICATED FULL SCREEN BIG VIEW QUESTION STUDIO */}
      {viewMode === "BIG_QUESTION_STUDIO" && activeExercise && (
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setViewMode("TREE")}
              className="text-xs font-bold text-purple-700 hover:underline flex items-center gap-1"
            >
              ← Return to Full Screen Exercise Tree
            </button>
            <span className="text-xs font-mono text-claude-textMuted">PostgreSQL Connected Studio Canvas</span>
          </div>

          <div className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm p-6 space-y-6">
            {/* Unit Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-claude-border pb-6">
              <div className="md:col-span-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  Exercise Title (Arabic Script)
                </label>
                <input
                  type="text"
                  value={exTitleAr}
                  onChange={(e) => setExTitleAr(e.target.value)}
                  className="w-full font-arabic text-xl font-bold text-slate-900 border-b border-claude-border focus:border-purple-600 focus:outline-none py-1 dir-rtl"
                  dir="rtl"
                />
              </div>

              <div className="md:col-span-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  Exercise Title (English)
                </label>
                <input
                  type="text"
                  value={exTitleEn}
                  onChange={(e) => setExTitleEn(e.target.value)}
                  className="w-full text-base font-bold text-claude-textMain border-b border-claude-border focus:border-purple-600 focus:outline-none py-1"
                />
              </div>

              <div className="md:col-span-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  Exercise Mechanism / Type
                </label>
                <select
                  value={exType}
                  onChange={(e) => setExType(e.target.value as any)}
                  className="w-full p-2 rounded-xl bg-claude-bg border border-claude-border text-xs font-bold text-claude-textMain focus:outline-none focus:border-purple-600"
                >
                  <option value="TASHKEEL_PICKER">Harakah Challenge (Tashkeel Picker)</option>
                  <option value="SENTENCE_REORDER">Sentence Unscrambler (Reorder Words)</option>
                  <option value="TRANSLATION">Pure Arabic Translation (Zero Transliteration)</option>
                  <option value="IRAB_ANALYSIS">Grammatical Parsing Challenge (I'rab)</option>
                </select>
              </div>
            </div>

            {/* Question Tabs Bar */}
            <div className="flex items-center justify-between border-b border-claude-border pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold text-claude-textMain uppercase tracking-wider mr-2">
                  Exercise Questions:
                </span>
                {questionsList.map((_, qIdx) => (
                  <button
                    key={qIdx}
                    onClick={() => setActiveQTab(qIdx)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      activeQTab === qIdx
                        ? "bg-purple-600 text-white shadow-sm scale-105"
                        : "bg-claude-bg text-claude-textMuted hover:text-claude-textMain border border-claude-border"
                    }`}
                  >
                    Question {qIdx + 1}
                  </button>
                ))}
                <button
                  onClick={handleAddQuestionToBigStudio}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs hover:bg-emerald-100"
                >
                  + Add Question
                </button>
              </div>

              <button
                onClick={() => handleDeleteQuestionFromBigStudio(activeQTab)}
                className="text-xs text-rose-600 font-semibold hover:underline"
              >
                Delete Question {activeQTab + 1}
              </button>
            </div>

            {/* Active Question Fields */}
            <div className="space-y-4 pt-1">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  Question Sentence (Vowelled Arabic Script)
                </label>
                <input
                  type="text"
                  value={currentQ.sentenceAr}
                  onChange={(e) => updateCurrentQuestion("sentenceAr", e.target.value)}
                  className="w-full font-arabic text-2xl font-bold text-slate-900 p-3 rounded-xl bg-claude-bg border border-claude-border focus:outline-none focus:border-purple-600 dir-rtl"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  Question Sentence Translation (English Prompt)
                </label>
                <input
                  type="text"
                  value={currentQ.sentenceEn}
                  onChange={(e) => updateCurrentQuestion("sentenceEn", e.target.value)}
                  className="w-full text-sm font-semibold text-claude-textMain p-3 rounded-xl bg-claude-bg border border-claude-border focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                    Multiple Choice Options (Comma Separated CSV)
                  </label>
                  <input
                    type="text"
                    value={currentQ.optionsCsv}
                    onChange={(e) => updateCurrentQuestion("optionsCsv", e.target.value)}
                    className="w-full font-arabic text-sm font-bold text-slate-900 p-3 rounded-xl bg-claude-bg border border-claude-border focus:outline-none focus:border-purple-600 dir-rtl"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                    Exact Correct Answer (Must Match Option)
                  </label>
                  <input
                    type="text"
                    value={currentQ.correctAnswer}
                    onChange={(e) => updateCurrentQuestion("correctAnswer", e.target.value)}
                    className="w-full font-arabic text-sm font-bold text-emerald-800 p-3 rounded-xl bg-emerald-50/60 border border-emerald-300 focus:outline-none dir-rtl"
                    dir="rtl"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                  Grammatical Rule Explanation Note (English)
                </label>
                <input
                  type="text"
                  value={currentQ.grammaticalRuleEn}
                  onChange={(e) => updateCurrentQuestion("grammaticalRuleEn", e.target.value)}
                  className="w-full text-xs font-medium text-claude-textMain p-3 rounded-xl bg-claude-bg border border-claude-border focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            {/* Save & Publish Footer */}
            <div className="pt-4 border-t border-claude-border flex items-center justify-between">
              {isSaved ? (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
                  ✓ Saved to PostgreSQL DB & Published Live OTA
                </span>
              ) : (
                <span className="text-xs text-claude-textMuted">
                  Click save to persist exercise unit to PostgreSQL database.
                </span>
              )}

              <button
                onClick={handleSaveBigStudio}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                🚀 Save to PostgreSQL & Publish OTA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
