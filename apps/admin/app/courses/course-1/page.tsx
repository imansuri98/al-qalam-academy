"use client";

import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  COURSE_1_LEVELS,
  DEFAULT_PASSAGES,
  LevelNode,
  ModuleNode,
  LessonNode,
  ExerciseUnit,
  QuestionItem,
  PassageItem,
} from "@alarabi/curriculum";
import RichMediumEditor from "../../components/RichMediumEditor";

/* ─── Dynamic imports (SSR-safe) ────────────────────── */

const LessonConceptMap     = dynamic(() => import("./components/LessonConceptMap"),     { ssr: false, loading: () => <CanvasLoader /> });
const LessonWhiteboard     = dynamic(() => import("./components/LessonWhiteboard"),     { ssr: false, loading: () => <CanvasLoader /> });
const IrabParseTreeEditor  = dynamic(() => import("./components/IrabParseTreeEditor"),  { ssr: false, loading: () => <CanvasLoader /> });
const MorphologyRootChart  = dynamic(() => import("./components/MorphologyRootChart"),  { ssr: false, loading: () => <CanvasLoader /> });
const HarakahDragBoard     = dynamic(() => import("./components/HarakahDragBoard"),     { ssr: false, loading: () => <CanvasLoader /> });
const GrammarFlowchart     = dynamic(() => import("./components/GrammarFlowchart"),     { ssr: false, loading: () => <CanvasLoader /> });
const LessonBlockBuilder   = dynamic(() => import("./components/LessonBlockBuilder"),   { ssr: false, loading: () => <CanvasLoader /> });

function CanvasLoader() {
  return (
    <div className="h-64 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-200">
      <div className="text-xs text-slate-400 animate-pulse">Loading visual canvas…</div>
    </div>
  );
}

/* ─── Types ─────────────────────────────────────────── */

type AdminView = "MAIN" | "LESSON_STUDIO";
type LessonTab = "NOTES" | "EXERCISES" | "INSIGHT";

interface InsightCard {
  id: string;
  titleEn: string;
  arabicExample: string;
  insightBodyEn: string;
  category: "RHETORIC" | "GRAMMAR" | "WISDOM";
  sourceEn?: string;
}

/* ─── Default Insights ───────────────────────────────── */

const DEFAULT_INSIGHTS: InsightCard[] = [
  {
    id: "insight-1",
    titleEn: "Why Arabic Puts the Predicate Last",
    arabicExample: "الْعِلْمُ نُورٌ",
    insightBodyEn:
      "In Arabic nominal sentences (الجُمْلَةُ الاسْمِيَّة), the subject (مُبْتَدَأٌ) always comes first and the predicate (خَبَرٌ) follows. This mirrors a timeless rhetorical principle: establish the subject of your statement before attributing qualities to it. 'Knowledge is light' — we define 'knowledge' first, then illuminate it.",
    category: "RHETORIC",
    sourceEn: "Ibn Hisham, Mughni al-Labib",
  },
  {
    id: "insight-2",
    titleEn: "The Three Vowels That Carry All Meaning",
    arabicExample: "ضَرَبَ / ضُرِبَ",
    insightBodyEn:
      "Arabic's case system (I'rab) encodes grammatical meaning directly into vowel endings. The same root ض-ر-ب means 'he struck' (ضَرَبَ) vs 'he was struck' (ضُرِبَ) — active vs passive — communicated through internal vowel changes alone. No extra words needed. This compactness is a hallmark of Classical Arabic.",
    category: "GRAMMAR",
    sourceEn: "Al-Jurjani, Dala'il al-I'jaz",
  },
  {
    id: "insight-3",
    titleEn: "The Wisdom in Verb-First Sentences",
    arabicExample: "قَامَ زَيْدٌ",
    insightBodyEn:
      "When Arabic verbal sentences (الجُمْلَةُ الفِعْلِيَّة) place the verb first (قَامَ زَيْدٌ — 'Zayd stood'), the action is emphasised over the actor. Classical scholars noted this reflects Arabic's orientation toward deeds before identity — what you do precedes who you are.",
    category: "WISDOM",
    sourceEn: "Al-Zamakhshari, Al-Mufassal",
  },
  {
    id: "insight-4",
    titleEn: "إِنَّمَا — The Most Powerful Restriction Particle",
    arabicExample: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    insightBodyEn:
      "The particle إِنَّمَا (innama) is a rhetorical restriction device (حَصْرٌ) meaning 'only / nothing but'. When it precedes a nominal sentence it restricts the predicate exclusively to the subject. 'Actions are by intentions only' — this single particle eliminates all other possible causes, making the statement absolute and rhetorically devastating in its precision.",
    category: "RHETORIC",
    sourceEn: "Prophetic Hadith • Sahih al-Bukhari #1",
  },
];

/* ─── Lesson Tab Config (Simplified 3 Focused Tabs) ── */

const LESSON_TABS: { id: LessonTab; label: string; emoji: string; desc: string }[] = [
  { id: "NOTES",     emoji: "📝", label: "Lesson Story Canvas", desc: "Notion-style interactive block stream" },
  { id: "EXERCISES", emoji: "🎯", label: "Quiz Unit",           desc: "End-of-lesson practice questions" },
  { id: "INSIGHT",   emoji: "💡", label: "Did You Know?",       desc: "Lesson's custom rhetorical insight pop-up" },
];

/* ─── Category colour helper ─────────────────────────── */

function insightCatStyle(cat: InsightCard["category"]) {
  return cat === "RHETORIC"
    ? "bg-amber-100 text-amber-800 border-amber-200"
    : cat === "GRAMMAR"
    ? "bg-blue-100 text-blue-800 border-blue-200"
    : "bg-emerald-100 text-emerald-800 border-emerald-200";
}

/* ═══════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════ */

export default function Course1AdminPage() {
  /* ── View state ── */
  const [view, setView] = useState<AdminView>("MAIN");
  const [lessonTab, setLessonTab] = useState<LessonTab>("NOTES");
  const [activeLesson, setActiveLesson] = useState<LessonNode | null>(null);

  /* ── Curriculum tree ── */
  const [levels, setLevels] = useState<LevelNode[]>(COURSE_1_LEVELS);
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({ "lvl-1": true });
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ "mod-101": true });

  /* ── Lesson editor ── */
  const [editorTitleAr, setEditorTitleAr]     = useState("");
  const [editorTitleEn, setEditorTitleEn]     = useState("");
  const [editorContent, setEditorContent]     = useState("");
  const [editorAudioUrl, setEditorAudioUrl]   = useState("");
  const [lessonExercises, setLessonExercises] = useState<ExerciseUnit[]>([]);
  const [lessonInsightForm, setLessonInsightForm] = useState<Partial<InsightCard>>({});
  const [isSaved, setIsSaved] = useState(false);

  /* ── Exercise builder (inside lesson) ── */
  const [activeExIdx, setActiveExIdx] = useState(0);
  const [activeQIdx, setActiveQIdx]   = useState(0);

  /* ── Passages ── */
  const [passages, setPassages] = useState<PassageItem[]>(DEFAULT_PASSAGES);
  const [insights, setInsights] = useState<InsightCard[]>([]);

  useEffect(() => {
    async function loadData() {
      // Fetch passages
      try {
        const res = await fetch("/api/v1/passages");
        const data = await res.json();
        if (data.success && data.passages) {
          setPassages(data.passages);
        }
      } catch (e) {
        console.error("Failed to fetch passages:", e);
      }

      // Fetch insights
      try {
        const res = await fetch("/api/v1/insights");
        const data = await res.json();
        if (data.success && data.insights) {
          setInsights(data.insights);
        }
      } catch (e) {
        console.error("Failed to fetch insights:", e);
      }
    }
    loadData();
  }, []);

  const [editingPassageId, setEditingPassageId]   = useState<string | null>(null);
  const [passageCategory, setPassageCategory]     = useState<"ALL"|"QURAN"|"HADITH"|"LITERATURE">("ALL");
  const [editPassageForm, setEditPassageForm]     = useState<Partial<PassageItem>>({});

  /* ── Insights ── */
  const [editingInsightId, setEditingInsightId] = useState<string | null>(null);
  const [editInsightForm, setEditInsightForm] = useState<Partial<InsightCard>>({});
  const [insightModal, setInsightModal]       = useState<InsightCard | null>(null);

  /* ── Computed ── */
  const filteredPassages = useMemo(() =>
    passageCategory === "ALL" ? passages : passages.filter((p) => p.category === passageCategory),
    [passages, passageCategory]
  );

  /* ════════════════════ CRUD HANDLERS ════════════════ */

  /* Curriculum tree */
  const toggleLevel = (id: string) => setExpandedLevels((p) => ({ ...p, [id]: !p[id] }));
  const toggleModule = (id: string) => setExpandedModules((p) => ({ ...p, [id]: !p[id] }));

  const handleAddLevel = () => {
    const titleEn = prompt("Level title (English):", `Level ${levels.length + 1}`);
    if (!titleEn) return;
    const id = `lvl-${Date.now()}`;
    setLevels([...levels, { id, titleAr: "الْمُسْتَوَى الْجَدِيدُ", titleEn, modules: [] }]);
    setExpandedLevels((p) => ({ ...p, [id]: true }));
  };

  const handleDeleteLevel = (lvlId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this level and all its content?")) {
      setLevels(levels.filter((l) => l.id !== lvlId));
    }
  };

  const handleAddModule = (lvlId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const titleEn = prompt("Module title (English):", "New Grammar Module");
    if (!titleEn) return;
    const id = `mod-${Date.now()}`;
    setLevels(levels.map((l) =>
      l.id === lvlId ? { ...l, modules: [...l.modules, { id, titleAr: "الْوَحْدَةُ الْجَدِيدَةُ", titleEn, lessons: [] }] } : l
    ));
    setExpandedModules((p) => ({ ...p, [id]: true }));
  };

  const handleDeleteModule = (lvlId: string, modId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this module?")) {
      setLevels(levels.map((l) =>
        l.id === lvlId ? { ...l, modules: l.modules.filter((m) => m.id !== modId) } : l
      ));
    }
  };

  const handleAddLesson = (lvlId: string, modId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const titleEn = prompt("Lesson title (English):", "New Grammar Lesson");
    if (!titleEn) return;
    const newLes: LessonNode = {
      id: `les-${Date.now()}`,
      titleAr: "الدَّرْسُ الْجَدِيدُ",
      titleEn,
      contentBodyEn: "Start writing your lesson notes here…",
      audioUrl: "",
      exercises: [],
    };
    setLevels(levels.map((l) => {
      if (l.id !== lvlId) return l;
      return { ...l, modules: l.modules.map((m) =>
        m.id === modId ? { ...m, lessons: [...m.lessons, newLes] } : m
      )};
    }));
  };

  const handleDeleteLesson = (lvlId: string, modId: string, lesId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this lesson?")) {
      setLevels(levels.map((l) => {
        if (l.id !== lvlId) return l;
        return { ...l, modules: l.modules.map((m) =>
          m.id === modId ? { ...m, lessons: m.lessons.filter((les) => les.id !== lesId) } : m
        )};
      }));
      if (activeLesson?.id === lesId) { setView("MAIN"); setActiveLesson(null); }
    }
  };

  /* ── RENAME & REORDER HANDLERS FOR LEVELS, MODULES & LESSONS ── */

  const handleRenameLevel = (lvlId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const lvl = levels.find((l) => l.id === lvlId);
    if (!lvl) return;
    const newEn = prompt("Level title (English):", lvl.titleEn);
    if (!newEn) return;
    const newAr = prompt("Level title (Arabic):", lvl.titleAr);
    if (!newAr) return;
    setLevels(levels.map((l) => (l.id === lvlId ? { ...l, titleEn: newEn, titleAr: newAr } : l)));
  };

  const handleMoveLevel = (idx: number, dir: -1 | 1, e: React.MouseEvent) => {
    e.stopPropagation();
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= levels.length) return;
    const updated = [...levels];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    setLevels(updated);
  };

  const handleRenameModule = (lvlId: string, modId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const lvl = levels.find((l) => l.id === lvlId);
    const mod = lvl?.modules.find((m) => m.id === modId);
    if (!mod) return;
    const newEn = prompt("Module title (English):", mod.titleEn);
    if (!newEn) return;
    const newAr = prompt("Module title (Arabic):", mod.titleAr);
    if (!newAr) return;
    setLevels(levels.map((l) => (l.id === lvlId ? {
      ...l,
      modules: l.modules.map((m) => (m.id === modId ? { ...m, titleEn: newEn, titleAr: newAr } : m)),
    } : l)));
  };

  const handleMoveModule = (lvlId: string, modIdx: number, dir: -1 | 1, e: React.MouseEvent) => {
    e.stopPropagation();
    setLevels(levels.map((l) => {
      if (l.id !== lvlId) return l;
      const targetIdx = modIdx + dir;
      if (targetIdx < 0 || targetIdx >= l.modules.length) return l;
      const updatedMods = [...l.modules];
      const temp = updatedMods[modIdx];
      updatedMods[modIdx] = updatedMods[targetIdx];
      updatedMods[targetIdx] = temp;
      return { ...l, modules: updatedMods };
    }));
  };

  const handleRenameLesson = (lvlId: string, modId: string, lesId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const lvl = levels.find((l) => l.id === lvlId);
    const mod = lvl?.modules.find((m) => m.id === modId);
    const les = mod?.lessons.find((les) => les.id === lesId);
    if (!les) return;
    const newEn = prompt("Lesson title (English):", les.titleEn);
    if (!newEn) return;
    const newAr = prompt("Lesson title (Arabic):", les.titleAr);
    if (!newAr) return;
    setLevels(levels.map((l) => (l.id === lvlId ? {
      ...l,
      modules: l.modules.map((m) => (m.id === modId ? {
        ...m,
        lessons: m.lessons.map((les) => (les.id === lesId ? { ...les, titleEn: newEn, titleAr: newAr } : les)),
      } : m)),
    } : l)));
  };

  const handleMoveLesson = (lvlId: string, modId: string, lesIdx: number, dir: -1 | 1, e: React.MouseEvent) => {
    e.stopPropagation();
    setLevels(levels.map((l) => {
      if (l.id !== lvlId) return l;
      return {
        ...l,
        modules: l.modules.map((m) => {
          if (m.id !== modId) return m;
          const targetIdx = lesIdx + dir;
          if (targetIdx < 0 || targetIdx >= m.lessons.length) return m;
          const updatedLessons = [...m.lessons];
          const temp = updatedLessons[lesIdx];
          updatedLessons[lesIdx] = updatedLessons[targetIdx];
          updatedLessons[targetIdx] = temp;
          return { ...m, lessons: updatedLessons };
        }),
      };
    }));
  };

  /* Open lesson studio */
  const handleOpenLessonStudio = (les: LessonNode) => {
    setActiveLesson(les);
    setEditorTitleAr(les.titleAr || "");
    setEditorTitleEn(les.titleEn || "");
    setEditorContent(les.contentBodyEn || "");
    setEditorAudioUrl(les.audioUrl || "");

    const rawExercises = les.exercises || [];
    const normalizedExercises: ExerciseUnit[] = rawExercises.map((ex: any, idx: number) => {
      if (ex && Array.isArray(ex.questions)) {
        return {
          ...ex,
          id: ex.id || `ex-${Date.now()}-${idx}`,
          titleAr: ex.titleAr || "",
          titleEn: ex.titleEn || `Exercise ${idx + 1}`,
          exerciseType: ex.exerciseType || "TASHKEEL_PICKER",
          questions: ex.questions.map((q: any, qidx: number) => ({
            ...q,
            id: q.id || `q-${Date.now()}-${idx}-${qidx}`,
            sentenceAr: q.sentenceAr || "",
            sentenceEn: q.sentenceEn || "",
            optionsCsv: q.optionsCsv || (Array.isArray(q.options) ? q.options.join(", ") : ""),
            correctAnswer: q.correctAnswer || "",
            grammaticalRuleEn: q.grammaticalRuleEn || "",
          })),
        };
      }

      return {
        id: ex.id || `ex-${Date.now()}-${idx}`,
        titleAr: ex.titleAr || "",
        titleEn: ex.titleEn || `Exercise ${idx + 1}`,
        exerciseType: ex.exerciseType || "TASHKEEL_PICKER",
        questions: [
          {
            id: ex.id || `q-${Date.now()}-${idx}`,
            sentenceAr: ex.sentenceAr || "",
            sentenceEn: ex.sentenceEn || "",
            optionsCsv: ex.optionsCsv || (Array.isArray(ex.options) ? ex.options.join(", ") : ""),
            correctAnswer: ex.correctAnswer || "",
            grammaticalRuleEn: ex.grammaticalRuleEn || "",
          },
        ],
      };
    });

    setLessonExercises(normalizedExercises);
    setLessonInsightForm(les.insightCard ? { ...les.insightCard } : {
      id: `insight-${les.id}`,
      titleEn: `Insight for ${les.titleEn}`,
      arabicExample: les.titleAr || "الْعِلْمُ نُورٌ",
      insightBodyEn: "Rhetorical or grammatical insight for this lesson unit.",
      category: "RHETORIC",
      sourceEn: "",
    });
    setActiveExIdx(0);
    setActiveQIdx(0);
    setLessonTab("NOTES");
    setView("LESSON_STUDIO");
  };

  /* Save lesson back to tree */
  const handleSaveLesson = () => {
    if (!activeLesson) return;
    setIsSaved(true);
    const updatedInsight = lessonInsightForm.titleEn ? (lessonInsightForm as InsightCard) : undefined;
    setLevels(levels.map((l) => ({
      ...l,
      modules: l.modules.map((m) => ({
        ...m,
        lessons: m.lessons.map((les) =>
          les.id === activeLesson.id
            ? { ...les, titleAr: editorTitleAr, titleEn: editorTitleEn, contentBodyEn: editorContent, audioUrl: editorAudioUrl, exercises: lessonExercises, insightCard: updatedInsight, blocks: activeLesson.blocks }
            : les
        ),
      })),
    })));
    setTimeout(() => setIsSaved(false), 2500);
  };

  /* Exercise CRUD inside lesson */
  const activeEx = lessonExercises[activeExIdx] ?? null;
  const activeQ  = activeEx?.questions[activeQIdx] ?? null;

  const updateQ = (field: keyof QuestionItem, val: string) => {
    setLessonExercises(lessonExercises.map((ex, ei) =>
      ei !== activeExIdx ? ex : {
        ...ex,
        questions: ex.questions.map((q, qi) => qi === activeQIdx ? { ...q, [field]: val } : q),
      }
    ));
  };

  const handleAddExercise = () => {
    const titleEn = prompt("Exercise title:", "");
    if (!titleEn) return;
    const newEx: ExerciseUnit = {
      id: `ex-${Date.now()}`,
      titleAr: "",
      titleEn,
      exerciseType: "TASHKEEL_PICKER",
      questions: [
        {
          id: `q-${Date.now()}-0`,
          sentenceAr: "",
          sentenceEn: "",
          optionsCsv: "",
          correctAnswer: "",
          grammaticalRuleEn: "",
        },
      ],
    };
    setLessonExercises([...lessonExercises, newEx]);
    setActiveExIdx(lessonExercises.length);
    setActiveQIdx(0);
  };

  const handleDeleteExercise = (idx: number) => {
    if (!confirm("Delete this exercise unit?")) return;
    setLessonExercises(lessonExercises.filter((_, i) => i !== idx));
    setActiveExIdx(Math.max(0, idx - 1));
  };

  /* Passages CRUD */
  const handleEditPassage = (pas: PassageItem) => {
    setEditingPassageId(pas.id);
    setEditPassageForm({ ...pas });
  };

  const handleSavePassage = () => {
    setPassages(passages.map((p) => p.id === editingPassageId ? { ...p, ...editPassageForm } as PassageItem : p));
    setEditingPassageId(null);
  };

  const handleDeletePassage = (id: string) => {
    if (confirm("Delete this passage?")) setPassages(passages.filter((p) => p.id !== id));
  };

  const handleAddPassage = () => {
    const newP: PassageItem = {
      id: `pas-${Date.now()}`,
      category: "QURAN",
      titleAr: "نَصٌّ جَدِيدٌ",
      titleEn: "New Passage",
      citationEn: "Source citation here",
      arabicText: "النَّصُّ الْعَرَبِيُّ",
      englishTranslation: "English translation of the passage.",
      isUnlocked: false,
      unlockRequirementEn: "🔒 Complete a module to unlock",
      questions: [],
    };
    setPassages([...passages, newP]);
    handleEditPassage(newP);
  };

  /* Insights CRUD */
  const handleEditInsight = (ins: InsightCard) => {
    setEditingInsightId(ins.id);
    setEditInsightForm({ ...ins });
  };

  const handleSaveInsight = async () => {
    const updated = { ...editInsightForm, id: editingInsightId } as InsightCard;
    setInsights(insights.map((ins) => ins.id === editingInsightId ? updated : ins));
    setEditingInsightId(null);

    try {
      await fetch("/api/v1/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ insight: updated }),
      });
    } catch (e) {
      console.error("Failed to save insight:", e);
    }
  };

  const handleDeleteInsight = async (id: string) => {
    if (confirm("Delete this insight?")) {
      setInsights(insights.filter((ins) => ins.id !== id));
      try {
        await fetch(`/api/v1/insights?id=${id}`, { method: "DELETE" });
      } catch (e) {
        console.error("Failed to delete insight:", e);
      }
    }
  };

  const handleAddInsight = () => {
    const newIns: InsightCard = {
      id: `insight-${Date.now()}`,
      titleEn: "New Rhetorical Insight",
      arabicExample: "مِثَالٌ عَرَبِيٌّ",
      insightBodyEn: "Explain the grammatical or rhetorical insight here.",
      category: "GRAMMAR",
      sourceEn: "",
    };
    setInsights([...insights, newIns]);
    handleEditInsight(newIns);
  };

  /* ════════════════════ RENDER ═══════════════════════ */

  return (
    <div className="min-h-screen bg-claude-bg text-claude-textMain">

      {/* ── LESSON STUDIO VIEW ── */}
      {view === "LESSON_STUDIO" && activeLesson && (
        <div className="space-y-5 max-w-7xl mx-auto">
          {/* Studio Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-claude-border pb-4">
            <div>
              <button
                onClick={() => setView("MAIN")}
                className="text-xs font-bold text-claude-terracotta hover:underline flex items-center gap-1"
              >
                ← Back to Course 1 Overview
              </button>
              <h1 className="text-xl font-extrabold text-claude-textMain mt-1">
                Lesson Studio: {editorTitleEn}
              </h1>
              <p className="font-arabic text-base font-bold text-slate-700 dir-rtl mt-0.5" dir="rtl">
                {editorTitleAr}
              </p>
            </div>
            <button
              onClick={handleSaveLesson}
              className={`px-6 py-2.5 rounded-xl text-white font-bold text-xs transition-colors shadow-sm shrink-0 ${
                isSaved
                  ? "bg-emerald-600"
                  : "bg-claude-terracotta hover:bg-[#B85C3C]"
              }`}
            >
              {isSaved ? "✓ Saved!" : "💾 Save Lesson"}
            </button>
          </div>

          {/* Tab Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-claude-border rounded-2xl shadow-sm">
            {LESSON_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setLessonTab(tab.id)}
                title={tab.desc}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  lessonTab === tab.id
                    ? "bg-claude-terracotta text-white shadow-sm"
                    : "text-claude-textMuted hover:text-claude-textMain hover:bg-slate-50"
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[500px]">

            {/* BLOCK STREAM / NOTES */}
            {lessonTab === "NOTES" && (
              <div className="space-y-6">
                <LessonBlockBuilder
                  key={activeLesson.id}
                  blocks={activeLesson.blocks}
                  onChange={(updatedBlocks) => {
                    setActiveLesson((prev) => (prev ? { ...prev, blocks: updatedBlocks } : null));
                  }}
                />
              </div>
            )}

            {/* RHETORIC INSIGHT FOR THIS LESSON */}
            {lessonTab === "INSIGHT" && (
              <div className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-claude-border pb-4">
                  <div>
                    <h2 className="font-bold text-claude-textMain">💡 Lesson Rhetorical Insight (Did You Know?)</h2>
                    <p className="text-xs text-claude-textMuted">Author a custom pop-up takeaway for this specific lesson</p>
                  </div>
                  <button
                    onClick={() => setInsightModal(lessonInsightForm as any)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>👁️ Preview Popup</span>
                  </button>
                </div>

                <div className="space-y-4 max-w-2xl">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Category</label>
                    <select
                      value={lessonInsightForm.category || "RHETORIC"}
                      onChange={(e) => setLessonInsightForm({ ...lessonInsightForm, category: e.target.value as any })}
                      className="text-xs font-bold p-2.5 rounded-xl border border-slate-200 focus:outline-none"
                    >
                      <option value="RHETORIC">RHETORIC (Balaagha)</option>
                      <option value="GRAMMAR">GRAMMAR (Nahw)</option>
                      <option value="WISDOM">WISDOM (Hikmah)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Title / Hook (English)</label>
                    <input
                      value={lessonInsightForm.titleEn || ""}
                      onChange={(e) => setLessonInsightForm({ ...lessonInsightForm, titleEn: e.target.value })}
                      className="w-full text-sm font-bold p-3 rounded-xl border border-slate-200 focus:outline-none"
                      placeholder="e.g. Why Arabic Puts the Predicate Last"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Arabic Example (Vowelled)</label>
                    <input
                      value={lessonInsightForm.arabicExample || ""}
                      onChange={(e) => setLessonInsightForm({ ...lessonInsightForm, arabicExample: e.target.value })}
                      className="w-full font-arabic text-2xl font-bold p-3 rounded-xl border border-slate-200 text-right dir-rtl focus:outline-none"
                      dir="rtl" placeholder="الْعِلْمُ نُورٌ"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Insight Body Explanation (Paragraph)</label>
                    <textarea
                      value={lessonInsightForm.insightBodyEn || ""}
                      onChange={(e) => setLessonInsightForm({ ...lessonInsightForm, insightBodyEn: e.target.value })}
                      rows={5}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none leading-relaxed"
                      placeholder="Explain the rhetorical or grammatical insight for this lesson..."
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Source Citation (Optional)</label>
                    <input
                      value={lessonInsightForm.sourceEn || ""}
                      onChange={(e) => setLessonInsightForm({ ...lessonInsightForm, sourceEn: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none font-mono"
                      placeholder="e.g. Ibn Hisham, Mughni al-Labib"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* EXERCISES */}
            {lessonTab === "EXERCISES" && (
              <div className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-claude-border pb-4">
                  <div>
                    <h2 className="font-bold text-claude-textMain">🎯 Exercise Suite</h2>
                    <p className="text-xs text-claude-textMuted">{lessonExercises.length} Exercise Units</p>
                  </div>
                  <button
                    onClick={handleAddExercise}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl"
                  >
                    + Add Exercise Unit
                  </button>
                </div>

                {/* Exercise Tabs */}
                {lessonExercises.length > 0 ? (
                  <>
                    <div className="flex flex-wrap gap-2">
                      {lessonExercises.map((ex, ei) => (
                        <div key={ex.id} className="flex items-center gap-1">
                          <button
                            onClick={() => { setActiveExIdx(ei); setActiveQIdx(0); }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              activeExIdx === ei ? "bg-purple-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            Exercise {ei + 1}
                          </button>
                          <button
                            onClick={() => handleDeleteExercise(ei)}
                            className="text-rose-400 hover:text-rose-600 text-xs px-1"
                          >✕</button>
                        </div>
                      ))}
                    </div>

                    {activeEx && (
                      <div className="space-y-4">
                        {/* Exercise metadata */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Title (Arabic)</label>
                            <input
                              value={activeEx.titleAr}
                              onChange={(e) => setLessonExercises(lessonExercises.map((ex, i) => i === activeExIdx ? { ...ex, titleAr: e.target.value } : ex))}
                              className="w-full font-arabic text-base font-bold p-2 rounded-lg border border-slate-200 focus:outline-none text-right"
                              dir="rtl"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Title (English)</label>
                            <input
                              value={activeEx.titleEn}
                              onChange={(e) => setLessonExercises(lessonExercises.map((ex, i) => i === activeExIdx ? { ...ex, titleEn: e.target.value } : ex))}
                              className="w-full text-sm font-bold p-2 rounded-lg border border-slate-200 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Type</label>
                            <select
                              value={activeEx.exerciseType}
                              onChange={(e) => setLessonExercises(lessonExercises.map((ex, i) => i === activeExIdx ? { ...ex, exerciseType: e.target.value as any } : ex))}
                              className="w-full text-xs font-bold p-2 rounded-lg border border-slate-200 focus:outline-none"
                            >
                              <option value="TASHKEEL_PICKER">Harakah Challenge (Tashkeel Picker)</option>
                              <option value="SENTENCE_REORDER">Sentence Unscrambler</option>
                              <option value="TRANSLATION">Translation 1: Arabic → English</option>
                              <option value="TRANSLATION_EN_AR">Translation 2: English → Arabic</option>
                              <option value="IRAB_PARSING">I'rab 3-Step Syntactic Breakdown</option>
                              <option value="SARF_PARSING">Sarf 3-Step Morphological Conjugation Drill</option>
                              <option value="MULTIPLE_CHOICE">Multiple Choice (Open MCQ)</option>
                            </select>
                          </div>
                        </div>

                        {/* Question Tabs */}
                        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Questions:</span>
                          {(activeEx.questions || []).map((_, qi) => (
                            <button
                              key={qi}
                              onClick={() => setActiveQIdx(qi)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                activeQIdx === qi ? "bg-purple-600 text-white scale-105" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                              }`}
                            >
                              Q{qi + 1}
                            </button>
                          ))}
                          <button
                            onClick={() => {
                              const newQ: QuestionItem = {
                                id: `q-${Date.now()}`,
                                sentenceAr: "",
                                sentenceEn: "",
                                optionsCsv: "",
                                correctAnswer: "",
                                grammaticalRuleEn: "",
                              };
                              setLessonExercises(lessonExercises.map((ex, i) => i === activeExIdx ? { ...ex, questions: [...(ex.questions || []), newQ] } : ex));
                              setActiveQIdx((activeEx.questions || []).length);
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100"
                          >
                            + Add Q
                          </button>
                        </div>

                        {/* Active Question Fields */}
                        {activeQ && (
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase">
                                  {activeEx.exerciseType === "SENTENCE_REORDER" ? "Full Correct Arabic Sentence" : "Arabic Sentence (with blank __)"}
                                </label>
                                {activeEx.exerciseType === "SENTENCE_REORDER" && (
                                  <button
                                    onClick={() => {
                                      const words = activeQ.sentenceAr.trim().split(/\s+/);
                                      const shuffled = [...words].sort(() => 0.5 - Math.random());
                                      updateQ("optionsCsv", shuffled.join(", "));
                                      updateQ("correctAnswer", words.join(","));
                                    }}
                                    className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[10px] hover:bg-purple-200"
                                  >
                                    🔀 Auto-Scramble Word Tiles
                                  </button>
                                )}
                              </div>
                              <input value={activeQ.sentenceAr} onChange={(e) => updateQ("sentenceAr", e.target.value)}
                                placeholder="Enter Vowelled Arabic Sentence or Prompt..."
                                className="w-full font-arabic text-xl font-bold p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-purple-400 text-right" dir="rtl" />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                                {activeEx.exerciseType === "SENTENCE_REORDER" ? "English Sentence Translation" : "English Prompt"}
                              </label>
                              <input value={activeQ.sentenceEn} onChange={(e) => updateQ("sentenceEn", e.target.value)}
                                placeholder="Enter English Context or Question Prompt..."
                                className="w-full text-sm p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-purple-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                                  {activeEx.exerciseType === "SENTENCE_REORDER" ? "Scrambled Word Tiles (comma-separated)" : "Options (comma-separated)"}
                                </label>
                                <input value={activeQ.optionsCsv} onChange={(e) => updateQ("optionsCsv", e.target.value)}
                                  placeholder="Choice 1, Choice 2, Choice 3, Choice 4"
                                  className="w-full font-arabic text-sm font-bold p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none text-right" dir="rtl" />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                                  {activeEx.exerciseType === "SENTENCE_REORDER" ? "Correct Word Sequence (comma-separated)" : "Correct Answer"}
                                </label>
                                <input value={activeQ.correctAnswer} onChange={(e) => updateQ("correctAnswer", e.target.value)}
                                  placeholder="Enter Exact Correct Answer Choice..."
                                  className="w-full font-arabic text-sm font-bold p-3 rounded-xl bg-emerald-50 border border-emerald-300 focus:outline-none text-right text-emerald-950" dir="rtl" />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Grammatical Rule Note</label>
                              <input value={activeQ.grammaticalRuleEn} onChange={(e) => updateQ("grammaticalRuleEn", e.target.value)}
                                className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 text-claude-textMuted">
                    <span className="text-4xl block mb-2">🎯</span>
                    <p className="text-sm font-bold">No exercises yet</p>
                    <p className="text-xs mt-1">Click "+ Add Exercise Unit" to build the first quiz</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MAIN VIEW ── */}
      {view === "MAIN" && (
        <div className="max-w-6xl mx-auto space-y-10">

          {/* ── HEADER ── */}
          <div className="flex items-center justify-between border-b border-claude-border pb-4">
            <div>
              <Link href="/" className="text-xs font-semibold text-claude-terracotta hover:underline">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-extrabold text-claude-textMain mt-1">
                Course 1: Classical Arabic Grammar (Nahw & Sarf)
              </h1>
              <p className="text-xs text-claude-textMuted">
                Unified Admin Studio — Curriculum · Passages · Insights · All Visual Tools
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddLevel}
                className="px-4 py-2 bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
              >
                + Add Level
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              SECTION 2 — CURRICULUM TREE
          ══════════════════════════════════════════════ */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-claude-border pb-3">
              <div>
                <span className="text-[10px] font-bold text-claude-terracotta uppercase tracking-wider block">Curriculum Hierarchy</span>
                <h2 className="text-xl font-extrabold text-claude-textMain">Levels · Modules · Lessons</h2>
              </div>
              <span className="text-xs text-claude-textMuted font-mono">{levels.length} Levels</span>
            </div>

            <div className="space-y-5">
              {levels.map((lvl, lvlIdx) => {
                const isLvlExpanded = !!expandedLevels[lvl.id];
                return (
                  <div key={lvl.id} className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/30 shadow-md overflow-hidden">
                    {/* Level Bar (Deep Indigo Theme) */}
                    <div
                      onClick={() => toggleLevel(lvl.id)}
                      className="p-4.5 bg-indigo-900 hover:bg-indigo-950 text-white cursor-pointer flex items-center justify-between transition-colors select-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-indigo-800 border border-indigo-700 font-bold text-xs flex items-center justify-center text-indigo-200">
                          {isLvlExpanded ? "▼" : "►"}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-400/20 text-indigo-200 border border-indigo-400/30">
                              Level {lvlIdx + 1}
                            </span>
                            <span className="text-base font-extrabold text-white">{lvl.titleEn}</span>
                          </div>
                          <span className="font-arabic text-lg text-amber-200 font-bold block" dir="rtl">{lvl.titleAr}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Reorder Level */}
                        <button onClick={(e) => handleMoveLevel(lvlIdx, -1, e)} disabled={lvlIdx === 0} className="p-1 text-indigo-300 hover:text-white disabled:opacity-30 text-xs">▲</button>
                        <button onClick={(e) => handleMoveLevel(lvlIdx, 1, e)} disabled={lvlIdx === levels.length - 1} className="p-1 text-indigo-300 hover:text-white disabled:opacity-30 text-xs">▼</button>
                        {/* Rename Level */}
                        <button onClick={(e) => handleRenameLevel(lvl.id, e)} className="px-2.5 py-1 text-xs font-bold text-indigo-200 bg-indigo-800/80 border border-indigo-700 rounded-xl hover:bg-indigo-800">
                          ✏️ Rename
                        </button>
                        <button onClick={(e) => handleAddModule(lvl.id, e)}
                          className="px-3.5 py-1.5 text-xs font-bold text-amber-900 bg-amber-300 border border-amber-400 rounded-xl hover:bg-amber-400 transition-colors shadow-2xs">
                          + Add Module
                        </button>
                        <button onClick={(e) => handleDeleteLevel(lvl.id, e)}
                          className="px-2.5 py-1.5 text-xs font-bold text-rose-300 bg-rose-950/60 border border-rose-800 rounded-xl hover:bg-rose-900">
                          🗑️
                        </button>
                      </div>
                    </div>

                    {/* Modules Container (Warm Amber Theme) */}
                    {isLvlExpanded && (
                      <div className="p-5 space-y-4 bg-indigo-50/20">
                        {lvl.modules.map((mod, modIdx) => {
                          const isModExpanded = !!expandedModules[mod.id];
                          return (
                            <div key={mod.id} className="border-2 border-amber-200 rounded-2xl overflow-hidden bg-amber-50/40 shadow-2xs">
                              {/* Module Bar (Amber Theme) */}
                              <div
                                onClick={() => toggleModule(mod.id)}
                                className="p-4 bg-amber-100/90 hover:bg-amber-200/90 cursor-pointer flex items-center justify-between border-b border-amber-200 transition-colors select-none"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="w-7 h-7 rounded-xl bg-amber-700 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                                    {isModExpanded ? "▼" : "►"}
                                  </span>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                                        Module {modIdx + 1}
                                      </span>
                                      <span className="text-sm font-extrabold text-amber-950">{mod.titleEn}</span>
                                    </div>
                                    <span className="font-arabic text-base text-amber-900 font-bold block" dir="rtl">{mod.titleAr}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {/* Reorder Module */}
                                  <button onClick={(e) => handleMoveModule(lvl.id, modIdx, -1, e)} disabled={modIdx === 0} className="p-1 text-amber-800 hover:text-amber-950 disabled:opacity-30 text-xs">▲</button>
                                  <button onClick={(e) => handleMoveModule(lvl.id, modIdx, 1, e)} disabled={modIdx === lvl.modules.length - 1} className="p-1 text-amber-800 hover:text-amber-950 disabled:opacity-30 text-xs">▼</button>
                                  {/* Rename Module */}
                                  <button onClick={(e) => handleRenameModule(lvl.id, mod.id, e)} className="px-2.5 py-1 text-xs font-bold text-amber-900 bg-amber-200/80 border border-amber-300 rounded-xl hover:bg-amber-200">
                                    ✏️ Rename
                                  </button>
                                  <button onClick={(e) => handleAddLesson(lvl.id, mod.id, e)}
                                    className="px-3 py-1.5 text-xs font-bold bg-emerald-700 text-white border border-emerald-800 rounded-xl hover:bg-emerald-800 shadow-2xs">
                                    + Add Lesson
                                  </button>
                                  <button onClick={(e) => handleDeleteModule(lvl.id, mod.id, e)}
                                    className="text-xs text-rose-600 hover:text-rose-800 px-2 font-bold">✕ Delete Mod</button>
                                </div>
                              </div>

                              {/* Lessons Container (Emerald Theme) */}
                              {isModExpanded && (
                                <div className="p-4 space-y-3 bg-amber-50/20">
                                  {mod.lessons.map((les, lesIdx) => (
                                    <div
                                      key={les.id}
                                      className="rounded-xl p-4 bg-emerald-50/90 border-2 border-emerald-200 hover:border-emerald-400 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs"
                                    >
                                      <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs">
                                          {lesIdx + 1}
                                        </div>
                                        <div className="min-w-0">
                                          <span className="font-arabic text-base font-extrabold text-emerald-950 block truncate" dir="rtl">{les.titleAr}</span>
                                          <span className="text-xs font-bold text-emerald-900 block truncate">Lesson {lesIdx + 1}: {les.titleEn}</span>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2 shrink-0">
                                        {/* Reorder Lesson */}
                                        <button onClick={(e) => handleMoveLesson(lvl.id, mod.id, lesIdx, -1, e)} disabled={lesIdx === 0} className="p-1 text-emerald-800 hover:text-emerald-950 disabled:opacity-30 text-xs font-bold">▲</button>
                                        <button onClick={(e) => handleMoveLesson(lvl.id, mod.id, lesIdx, 1, e)} disabled={lesIdx === mod.lessons.length - 1} className="p-1 text-emerald-800 hover:text-emerald-950 disabled:opacity-30 text-xs font-bold">▼</button>
                                        {/* Rename Lesson */}
                                        <button onClick={(e) => handleRenameLesson(lvl.id, mod.id, les.id, e)} className="px-2.5 py-1 text-xs font-bold text-emerald-900 bg-emerald-100 border border-emerald-300 rounded-xl hover:bg-emerald-200">
                                          ✏️ Rename
                                        </button>
                                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                                          🎯 {(les.exercises || []).length} Qs
                                        </span>
                                        <button
                                          onClick={() => handleOpenLessonStudio(les)}
                                          className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs transition-colors shadow-2xs flex items-center gap-1.5"
                                        >
                                          ✏️ Open Lesson Studio
                                        </button>
                                        <button
                                          onClick={(e) => handleDeleteLesson(lvl.id, mod.id, les.id, e)}
                                          className="p-2 text-rose-600 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs"
                                        >✕</button>
                                      </div>
                                    </div>
                                  ))}
                                  {mod.lessons.length === 0 && (
                                    <p className="text-xs text-amber-800/60 py-3 text-center font-medium">No lessons yet — click + Add Lesson to create one</p>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                        {lvl.modules.length === 0 && (
                          <p className="text-xs text-indigo-900/60 text-center py-4 font-medium">No modules — click + Add Module to create one</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              SECTION 3 — CAPSTONE PASSAGES
          ══════════════════════════════════════════════ */}
          <section className="space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-claude-border pb-3">
              <div>
                <span className="text-[10px] font-bold text-claude-terracotta uppercase tracking-wider block">Graduation Capstones</span>
                <h2 className="text-xl font-extrabold text-claude-textMain">Classical Passages (Quran, Hadith & Literature)</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 border border-slate-200">
                  {(["ALL", "QURAN", "HADITH", "LITERATURE"] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setPassageCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        passageCategory === cat ? "bg-white text-claude-terracotta shadow-sm border border-slate-200" : "text-slate-500"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAddPassage}
                  className="px-4 py-2 bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs rounded-xl"
                >
                  + Add Passage
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {filteredPassages.map((pas) => (
                <div key={pas.id} className={`claude-card rounded-2xl bg-white border border-claude-border shadow-sm p-5 space-y-4 ${!pas.isUnlocked ? "opacity-70" : ""}`}>
                  {editingPassageId === pas.id ? (
                    /* ── Edit Form ── */
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase">Editing Passage</p>
                      <input
                        value={editPassageForm.titleEn || ""}
                        onChange={(e) => setEditPassageForm({ ...editPassageForm, titleEn: e.target.value })}
                        className="w-full text-xs font-bold p-2 rounded-lg border border-slate-200 focus:outline-none"
                        placeholder="Title (English)"
                      />
                      <textarea
                        value={editPassageForm.arabicText || ""}
                        onChange={(e) => setEditPassageForm({ ...editPassageForm, arabicText: e.target.value })}
                        className="w-full font-arabic text-base font-bold p-2 rounded-lg border border-slate-200 focus:outline-none text-right"
                        dir="rtl" rows={3} placeholder="النَّصُّ الْعَرَبِيُّ"
                      />
                      <textarea
                        value={editPassageForm.englishTranslation || ""}
                        onChange={(e) => setEditPassageForm({ ...editPassageForm, englishTranslation: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                        rows={2} placeholder="English translation"
                      />
                      <input
                        value={editPassageForm.citationEn || ""}
                        onChange={(e) => setEditPassageForm({ ...editPassageForm, citationEn: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                        placeholder="Citation"
                      />
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-bold text-slate-500">
                          <input
                            type="checkbox"
                            checked={!!editPassageForm.isUnlocked}
                            onChange={(e) => setEditPassageForm({ ...editPassageForm, isUnlocked: e.target.checked })}
                            className="mr-1.5"
                          />
                          Unlocked
                        </label>
                        <select
                          value={editPassageForm.category || "QURAN"}
                          onChange={(e) => setEditPassageForm({ ...editPassageForm, category: e.target.value as any })}
                          className="text-xs p-1.5 rounded-lg border border-slate-200 focus:outline-none"
                        >
                          <option value="QURAN">QURAN</option>
                          <option value="HADITH">HADITH</option>
                          <option value="LITERATURE">LITERATURE</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={handleSavePassage} className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 flex-1">✓ Save</button>
                        <button onClick={() => setEditingPassageId(null)} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    /* ── Display Card ── */
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-claude-border bg-claude-bg text-claude-textMain">
                          {pas.category}
                        </span>
                        <span className={`text-[10px] font-bold flex items-center gap-1 ${pas.isUnlocked ? "text-emerald-700" : "text-amber-700"}`}>
                          {pas.isUnlocked ? "🔓 Unlocked" : "🔒 Locked"}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-claude-textMain">{pas.titleEn}</h3>
                        <p className="text-[10px] text-claude-textMuted font-mono">{pas.citationEn}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-claude-bg border border-claude-border text-right" dir="rtl">
                        <p className="font-arabic text-base font-bold text-slate-900 leading-loose">{pas.arabicText}</p>
                      </div>
                      <p className="text-xs text-claude-textMuted italic line-clamp-2">"{pas.englishTranslation}"</p>
                      <div className="flex items-center gap-2 pt-2 border-t border-claude-border">
                        <button onClick={() => handleEditPassage(pas)}
                          className="flex-1 py-2 rounded-xl bg-claude-bg border border-claude-border text-xs font-bold text-claude-textMain hover:border-claude-borderHover">
                          ✏️ Edit Passage
                        </button>
                        <button onClick={() => handleDeletePassage(pas.id)}
                          className="p-2 rounded-xl text-rose-500 border border-rose-200 hover:bg-rose-50 text-xs">🗑️</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              SECTION 4 — DID YOU KNOW? INSIGHTS
          ══════════════════════════════════════════════ */}
          <section className="space-y-5 pb-12">
            <div className="flex items-center justify-between border-b border-claude-border pb-3">
              <div>
                <span className="text-[10px] font-bold text-claude-terracotta uppercase tracking-wider block">Rhetorical Insights</span>
                <h2 className="text-xl font-extrabold text-claude-textMain">💡 Did You Know? Cards</h2>
                <p className="text-xs text-claude-textMuted">Visible to learners as clickable pop-up insight cards</p>
              </div>
              <button
                onClick={handleAddInsight}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl"
              >
                + Add Insight
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((ins) => (
                <div key={ins.id} className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm">
                  {editingInsightId === ins.id ? (
                    /* ── Edit Form ── */
                    <div className="p-5 space-y-3">
                      <p className="text-xs font-bold text-slate-500 uppercase">Editing Insight</p>
                      <select
                        value={editInsightForm.category || "GRAMMAR"}
                        onChange={(e) => setEditInsightForm({ ...editInsightForm, category: e.target.value as any })}
                        className="text-xs font-bold p-2 rounded-lg border border-slate-200 focus:outline-none"
                      >
                        <option value="RHETORIC">RHETORIC</option>
                        <option value="GRAMMAR">GRAMMAR</option>
                        <option value="WISDOM">WISDOM</option>
                      </select>
                      <input
                        value={editInsightForm.titleEn || ""}
                        onChange={(e) => setEditInsightForm({ ...editInsightForm, titleEn: e.target.value })}
                        className="w-full text-sm font-bold p-2 rounded-lg border border-slate-200 focus:outline-none"
                        placeholder="Title / hook (English)"
                      />
                      <input
                        value={editInsightForm.arabicExample || ""}
                        onChange={(e) => setEditInsightForm({ ...editInsightForm, arabicExample: e.target.value })}
                        className="w-full font-arabic text-xl font-bold p-2 rounded-lg border border-slate-200 focus:outline-none text-right"
                        dir="rtl" placeholder="الْمِثَالُ الْعَرَبِيُّ"
                      />
                      <textarea
                        value={editInsightForm.insightBodyEn || ""}
                        onChange={(e) => setEditInsightForm({ ...editInsightForm, insightBodyEn: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                        rows={4} placeholder="Full rhetorical insight explanation…"
                      />
                      <input
                        value={editInsightForm.sourceEn || ""}
                        onChange={(e) => setEditInsightForm({ ...editInsightForm, sourceEn: e.target.value })}
                        className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                        placeholder="Source citation (optional)"
                      />
                      <div className="flex gap-2">
                        <button onClick={handleSaveInsight} className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 flex-1">✓ Save</button>
                        <button onClick={() => setEditingInsightId(null)} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${insightCatStyle(ins.category)}`}>
                          {ins.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setInsightModal(ins)}
                            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 underline"
                          >
                            Preview popup
                          </button>
                          <button onClick={() => handleEditInsight(ins)}
                            className="text-xs text-claude-terracotta hover:underline font-bold">✏️</button>
                          <button onClick={() => handleDeleteInsight(ins.id)}
                            className="text-xs text-rose-500 hover:text-rose-700 font-bold">✕</button>
                        </div>
                      </div>
                      <h3 className="text-sm font-extrabold text-claude-textMain">{ins.titleEn}</h3>
                      <p className="font-arabic text-2xl font-bold text-slate-900 text-right dir-rtl" dir="rtl">
                        {ins.arabicExample}
                      </p>
                      <p className="text-xs text-claude-textMuted leading-relaxed line-clamp-3">{ins.insightBodyEn}</p>
                      {ins.sourceEn && (
                        <p className="text-[10px] text-claude-textMuted font-mono">{ins.sourceEn}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ── INSIGHT PREVIEW MODAL ── */}
      {insightModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setInsightModal(null)}
        >
          <div
            className="bg-white border border-claude-border rounded-3xl max-w-lg w-full p-7 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${insightCatStyle(insightModal.category)}`}>
                {insightModal.category}
              </span>
              <button onClick={() => setInsightModal(null)} className="text-slate-400 hover:text-slate-600 text-lg leading-none">✕</button>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-claude-textMain">💡 {insightModal.titleEn}</h2>
            </div>
            <div className="p-4 rounded-2xl bg-claude-bg border border-claude-border text-center">
              <p className="font-arabic text-3xl font-black text-slate-900 leading-loose dir-rtl" dir="rtl">
                {insightModal.arabicExample}
              </p>
            </div>
            <p className="text-sm text-claude-textMuted leading-relaxed">{insightModal.insightBodyEn}</p>
            {insightModal.sourceEn && (
              <p className="text-xs text-claude-textMuted font-mono border-t border-claude-border pt-3">
                📚 {insightModal.sourceEn}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
