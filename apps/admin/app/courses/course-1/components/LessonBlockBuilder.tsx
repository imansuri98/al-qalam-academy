"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { LessonBlock, BlockType } from "@alarabi/curriculum";

/* ─── Dynamic Visual Component Imports ───────────────── */

const LessonConceptMap    = dynamic(() => import("./LessonConceptMap"),    { ssr: false });
const LessonWhiteboard    = dynamic(() => import("./LessonWhiteboard"),    { ssr: false });
const IrabParseTreeEditor = dynamic(() => import("./IrabParseTreeEditor"), { ssr: false });
const MorphologyRootChart = dynamic(() => import("./MorphologyRootChart"), { ssr: false });
const HarakahDragBoard    = dynamic(() => import("./HarakahDragBoard"),    { ssr: false });
const GrammarFlowchart    = dynamic(() => import("./GrammarFlowchart"),    { ssr: false });

/* ─── Block Definition Metadata ──────────────────────── */

interface BlockMeta {
  type: BlockType;
  label: string;
  emoji: string;
  category: "CONTENT" | "VISUAL" | "INTERACTIVE";
  description: string;
}

const BLOCK_CATALOG: BlockMeta[] = [
  { type: "TEXT",                    label: "Rich Text & Arabic",    emoji: "📝", category: "CONTENT",     description: "WYSIWYG plain text & vowelled Arabic script" },
  { type: "VOCABULARY_CARD",         label: "Pre-Exercise Vocab",   emoji: "🎴", category: "CONTENT",     description: "Word card (Image + Arabic + Audio) before drills" },
  { type: "BEFORE_AFTER_COMPARISON", label: "Grammar Transformation",emoji: "↔️", category: "CONTENT",     description: "Before vs After rule comparison toggle" },
  { type: "IRAB_TABLE",              label: "I'rab Breakdown Table", emoji: "📐", category: "CONTENT",     description: "4-Column sentence analysis table" },
  { type: "AUDIO_CALLOUT",           label: "Native Audio Recitation",emoji: "🔊", category: "CONTENT",     description: "Audio phrase card with transcription" },
  { type: "CONCEPT_MAP",             label: "Concept Map Canvas",    emoji: "🎨", category: "VISUAL",      description: "React Flow node diagram builder" },
  { type: "PARSE_TREE",              label: "I'rab Parse Tree",      emoji: "🌿", category: "VISUAL",      description: "Syntactic breakdown tree builder" },
  { type: "MORPHOLOGY_CHART",        label: "Sarf Morphology Chart", emoji: "📊", category: "VISUAL",      description: "3-Letter root derived family radial chart" },
  { type: "FLOWCHART",               label: "Rule Flowchart",        emoji: "📋", category: "VISUAL",      description: "Mermaid decision logic diagram" },
  { type: "WHITEBOARD",              label: "Freehand Whiteboard",   emoji: "✏️", category: "VISUAL",      description: "Excalidraw sketch canvas" },
  { type: "INTERACTIVE_DRILL",       label: "Harakah Drag Exercise", emoji: "🖐️", category: "INTERACTIVE", description: "Spring-animated drag vowel drill" },
];

/* ─── Props ─────────────────────────────────────────── */

interface LessonBlockBuilderProps {
  blocks?: LessonBlock[];
  onChange?: (blocks: LessonBlock[]) => void;
}

/* ─── Sample Default Initial Blocks (All 11 Block Types) ── */

const DEFAULT_SAMPLE_BLOCKS: LessonBlock[] = [
  {
    id: "blk-1",
    type: "TEXT",
    orderIndex: 0,
    data: {
      text: "Classical Arabic sentences are divided into two main categories: Nominal Sentences (الجُمْلَةُ الاسْمِيَّة) and Verbal Sentences (الجُمْلَةُ الفِعْلِيَّة). Let's explore each structure in detail below.",
    },
  },
  {
    id: "blk-2",
    type: "VOCABULARY_CARD",
    orderIndex: 1,
    data: {
      wordAr: "الْعِلْمُ",
      wordDiacriticsAr: "الْعِلْمُ",
      meaningEn: "Knowledge / Learning",
      imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
      audioUrl: "",
      noteEn: "Key noun used in Mubtada' examples. Notice the Damma ending (ـُ).",
    },
  },
  {
    id: "blk-3",
    type: "BEFORE_AFTER_COMPARISON",
    orderIndex: 2,
    data: {
      titleEn: "Effect of Particle (إِنَّ) on Nominal Sentence",
      beforeLabelEn: "Original Nominal Sentence",
      beforeArabic: "الْعِلْمُ نُورٌ",
      beforeCaseEn: "Mubtada' is Marfoo' with Damma (ـُ)",
      afterLabelEn: "After Adding إِنَّ",
      afterArabic: "إِنَّ الْعِلْمَ نُورٌ",
      afterCaseEn: "Ism Inna becomes Mansoob with Fatha (ـَ)",
    },
  },
  {
    id: "blk-4",
    type: "IRAB_TABLE",
    orderIndex: 3,
    data: {
      sentenceAr: "الْعِلْمُ نُورٌ فِي الْحَيَاةِ",
      rows: [
        { wordAr: "الْعِلْمُ", roleAr: "مُبْتَدَأٌ", caseAr: "مَرْفُوعٌ بِالضَّمَّةِ", meaningEn: "Knowledge (Subject)" },
        { wordAr: "نُورٌ", roleAr: "خَبَرٌ", caseAr: "مَرْفُوعٌ بِالتَّنْوِينِ", meaningEn: "Light (Predicate)" },
        { wordAr: "فِي", roleAr: "حَرْفُ جَرٍّ", caseAr: "مَبْنِيٌّ عَلَى السُّكُونِ", meaningEn: "In (Preposition)" },
        { wordAr: "الْحَيَاةِ", roleAr: "اسْمٌ مَجْرُورٌ", caseAr: "مَجْرُورٌ بِالْكَسْرَةِ", meaningEn: "Life (Genitive noun)" },
      ],
    },
  },
  {
    id: "blk-5",
    type: "AUDIO_CALLOUT",
    orderIndex: 4,
    data: {
      arabicText: "الْعِلْمُ نُورٌ وَالْجَهْلُ ظَلاَمٌ",
      audioUrl: "",
    },
  },
  {
    id: "blk-6",
    type: "CONCEPT_MAP",
    orderIndex: 5,
    data: {
      nodes: [
        { id: "n1", type: "conceptCard", position: { x: 80, y: 60 }, data: { label: "Subject", arabic: "الْمُبْتَدَأُ", english: "Mubtada' (Subject)" } },
        { id: "n2", type: "conceptCard", position: { x: 360, y: 60 }, data: { label: "Predicate", arabic: "الْخَبَرُ", english: "Khabar (Predicate)" } },
      ],
      edges: [
        { id: "e1-2", source: "n1", target: "n2", label: "paired with" },
      ],
    },
  },
  {
    id: "blk-7",
    type: "PARSE_TREE",
    orderIndex: 6,
    data: {
      tree: {
        name: "الْجُمْلَةُ",
        role: "ROOT",
        children: [
          { name: "الْعِلْمُ", role: "مُبْتَدَأٌ" },
          { name: "نُورٌ", role: "خَبَرٌ" },
        ],
      },
    },
  },
  {
    id: "blk-8",
    type: "MORPHOLOGY_CHART",
    orderIndex: 7,
    data: {
      root: "ك-ت-ب",
      forms: [
        { id: "1", arabic: "كَتَبَ", pattern: "فَعَلَ", patternEn: "Past verb", color: "#C2410C" },
        { id: "2", arabic: "يَكْتُبُ", pattern: "يَفْعُلُ", patternEn: "Present verb", color: "#2563EB" },
        { id: "3", arabic: "كِتَابٌ", pattern: "فِعَالٌ", patternEn: "Verbal noun", color: "#16A34A" },
        { id: "4", arabic: "كَاتِبٌ", pattern: "فَاعِلٌ", patternEn: "Active participle", color: "#9333EA" },
      ],
    },
  },
  {
    id: "blk-9",
    type: "FLOWCHART",
    orderIndex: 8,
    data: {
      code: `flowchart TD
  A[Arabic Sentence] --> B{Starts with verb?}
  B -- Yes --> C[Verbal Sentence الجُمْلَةُ الفِعْلِيَّة]
  B -- No --> D[Nominal Sentence الجُمْلَةُ الاسْمِيَّة]`,
    },
  },
  {
    id: "blk-10",
    type: "WHITEBOARD",
    orderIndex: 9,
    data: {},
  },
  {
    id: "blk-11",
    type: "INTERACTIVE_DRILL",
    orderIndex: 10,
    data: {
      sentenceAr: "____ نُورٌ",
      baseWordAr: "الْعِلْم",
      correctTokenId: "damma",
    },
  },
];

const DEFAULT_INITIAL_BLOCK: LessonBlock[] = [
  {
    id: `blk-init-${Date.now()}`,
    type: "TEXT",
    orderIndex: 0,
    data: { text: "" },
  },
];

export default function LessonBlockBuilder({ blocks: initialBlocks, onChange }: LessonBlockBuilderProps) {
  const [blocks, setBlocks] = useState<LessonBlock[]>(
    initialBlocks && initialBlocks.length > 0 ? initialBlocks : DEFAULT_INITIAL_BLOCK
  );
  const [showCatalog, setShowCatalog] = useState(false);

  useEffect(() => {
    if (initialBlocks && initialBlocks.length > 0) {
      setBlocks(initialBlocks);
    }
  }, [initialBlocks]);

  const notifyChange = (updated: LessonBlock[]) => {
    setBlocks(updated);
    onChange?.(updated);
  };

  /* Add new block */
  const handleAddBlock = (type: BlockType) => {
    const newBlock: LessonBlock = {
      id: `blk-${Date.now()}`,
      type,
      orderIndex: blocks.length,
      data: getDefaultDataForType(type),
    };
    const updated = [...blocks, newBlock];
    notifyChange(updated);
    setShowCatalog(false);
  };

  /* Reorder */
  const handleMove = (index: number, dir: -1 | 1) => {
    const targetIdx = index + dir;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    updated.forEach((b, i) => (b.orderIndex = i));
    notifyChange(updated);
  };

  /* Delete */
  const handleDelete = (id: string) => {
    if (!confirm("Delete this content block?")) return;
    const updated = blocks.filter((b) => b.id !== id).map((b, i) => ({ ...b, orderIndex: i }));
    notifyChange(updated);
  };

  /* Update block data */
  const handleUpdateData = (id: string, field: string, val: any) => {
    const updated = blocks.map((b) => (b.id === id ? { ...b, data: { ...b.data, [field]: val } } : b));
    notifyChange(updated);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* Header Bar Actions */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Notion-Style Lesson Block Stream</h2>
          <p className="text-xs text-slate-500">All 11 block types pre-populated. Edit, reorder (▲/▼), or delete (✕) any block for this lesson.</p>
        </div>
        <button
          onClick={() => {
            if (confirm("Reset blocks and load all 11 template block types?")) {
              notifyChange(DEFAULT_SAMPLE_BLOCKS);
            }
          }}
          className="px-3.5 py-1.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
        >
          <span>🔄 Load All 11 Template Blocks</span>
        </button>
      </div>

      {/* Blocks Stream */}
      <div className="space-y-4">
        {blocks.map((blk, idx) => {
          const meta = BLOCK_CATALOG.find((b) => b.type === blk.type) || BLOCK_CATALOG[0];

          return (
            <div
              key={blk.id}
              className="group relative rounded-2xl bg-white border border-slate-200 hover:border-slate-400 transition-all shadow-xs overflow-hidden p-5 space-y-3"
            >
              {/* Block Controls Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">{meta.emoji}</span>
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">{meta.label}</span>
                  <span className="text-[10px] text-slate-400">Block #{idx + 1}</span>
                </div>

                <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleMove(idx, -1)}
                    disabled={idx === 0}
                    className="p-1 text-slate-500 hover:bg-slate-100 rounded text-xs disabled:opacity-30"
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => handleMove(idx, 1)}
                    disabled={idx === blocks.length - 1}
                    className="p-1 text-slate-500 hover:bg-slate-100 rounded text-xs disabled:opacity-30"
                    title="Move Down"
                  >
                    ▼
                  </button>
                  <button
                    onClick={() => handleDelete(blk.id)}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded text-xs ml-2"
                    title="Delete Block"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Block Editor Content */}
              <div className="pt-1">
                {/* 1. TEXT / WYSIWYG */}
                {blk.type === "TEXT" && (
                  <WysiwygTextBlock
                    text={blk.data.text || ""}
                    onChange={(val) => handleUpdateData(blk.id, "text", val)}
                  />
                )}

                {/* 2. PRE-EXERCISE VOCABULARY CARD */}
                {blk.type === "VOCABULARY_CARD" && (
                  <VocabCardEditor
                    data={blk.data}
                    onChange={(field, val) => handleUpdateData(blk.id, field, val)}
                  />
                )}

                {/* 3. BEFORE AFTER COMPARISON */}
                {blk.type === "BEFORE_AFTER_COMPARISON" && (
                  <BeforeAfterEditor
                    data={blk.data}
                    onChange={(field, val) => handleUpdateData(blk.id, field, val)}
                  />
                )}

                {/* 4. IRAB TABLE */}
                {blk.type === "IRAB_TABLE" && (
                  <IrabTableEditor
                    data={blk.data}
                    onChange={(field, val) => handleUpdateData(blk.id, field, val)}
                  />
                )}

                {/* 5. AUDIO CALLOUT */}
                {blk.type === "AUDIO_CALLOUT" && (
                  <AudioCalloutEditor
                    data={blk.data}
                    onChange={(field, val) => handleUpdateData(blk.id, field, val)}
                  />
                )}

                {/* VISUAL EMBEDDED BLOCKS */}
                {blk.type === "CONCEPT_MAP"     && <LessonConceptMap initialData={blk.data as any} onChange={(nodes, edges) => handleUpdateData(blk.id, "nodes", nodes)} />}
                {blk.type === "WHITEBOARD"      && <LessonWhiteboard initialData={blk.data} onChange={(d) => handleUpdateData(blk.id, "scene", d)} />}
                {blk.type === "PARSE_TREE"      && <IrabParseTreeEditor initialTree={blk.data.tree} onChange={(tree) => handleUpdateData(blk.id, "tree", tree)} />}
                {blk.type === "MORPHOLOGY_CHART" && <MorphologyRootChart initialRoot={blk.data.root} initialForms={blk.data.forms} onChange={(root, forms) => { handleUpdateData(blk.id, "root", root); handleUpdateData(blk.id, "forms", forms); }} />}
                {blk.type === "FLOWCHART"        && <GrammarFlowchart initialCode={blk.data.code} onChange={(code) => handleUpdateData(blk.id, "code", code)} />}
                {blk.type === "INTERACTIVE_DRILL" && <HarakahDragBoard sentenceAr={blk.data.sentenceAr} baseWordAr={blk.data.baseWordAr} correctTokenId={blk.data.correctTokenId} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Block Selector */}
      <div className="pt-2">
        {showCatalog ? (
          <div className="p-5 bg-white border border-slate-300 rounded-2xl shadow-lg space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Choose Block Type to Insert</span>
              <button onClick={() => setShowCatalog(false)} className="text-slate-400 hover:text-slate-600 text-xs">✕ Close</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {BLOCK_CATALOG.map((meta) => (
                <button
                  key={meta.type}
                  onClick={() => handleAddBlock(meta.type)}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all flex items-start gap-3 group"
                >
                  <span className="text-2xl p-2 rounded-lg bg-slate-100 group-hover:bg-blue-100 transition-colors shrink-0">{meta.emoji}</span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{meta.label}</span>
                    <span className="text-[10px] text-slate-500 block leading-relaxed">{meta.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowCatalog(true)}
            className="w-full py-3.5 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 text-slate-600 hover:text-blue-700 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <span>+ Add Block to Lesson Stream</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ════════════════════ INLINE BLOCK EDITORS ════════════════ */

/* WYSIWYG Text Block */
function WysiwygTextBlock({ text, onChange }: { text: string; onChange: (v: string) => void }) {
  const insertFormatting = (prefix: string, suffix: string = "") => {
    onChange(`${text} ${prefix}الْكَلِمَةُ${suffix}`);
  };

  return (
    <div className="space-y-2">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
        <button onClick={() => insertFormatting("**", "**")} className="px-2 py-1 bg-white rounded font-bold text-xs shadow-2xs">B</button>
        <button onClick={() => insertFormatting("*", "*")} className="px-2 py-1 bg-white rounded italic text-xs shadow-2xs">I</button>
        <button onClick={() => insertFormatting("`", "`")} className="px-2 py-1 bg-white rounded font-mono text-[11px] text-orange-700 shadow-2xs">Code</button>
        <button onClick={() => insertFormatting("> ")} className="px-2 py-1 bg-white rounded text-xs shadow-2xs">Quote</button>
        <button onClick={() => insertFormatting("### ")} className="px-2 py-1 bg-white rounded font-bold text-xs shadow-2xs">H3</button>
        <span className="w-px h-4 bg-slate-300 mx-1" />
        <button onClick={() => insertFormatting("**", "**")} className="px-2.5 py-1 bg-amber-100 text-amber-900 font-arabic font-bold text-sm rounded shadow-2xs">
          + Arabic Script
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="w-full text-xs font-sans p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed"
        placeholder="Type plain text or vowelled Arabic script notes here..."
      />
    </div>
  );
}

/* Pre-Exercise Vocab Card Editor */
function VocabCardEditor({ data, onChange }: { data: any; onChange: (f: string, v: any) => void }) {
  return (
    <div className="space-y-3 p-4 bg-amber-50/60 rounded-xl border border-amber-200">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">🎴 Pre-Exercise Vocabulary Card</span>
        <span className="text-[10px] text-amber-600">Will be shown to learner right before exercise</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-bold text-slate-500 block mb-1">Arabic Word (Vowelled)</label>
          <input
            value={data.wordDiacriticsAr || ""}
            onChange={(e) => onChange("wordDiacriticsAr", e.target.value)}
            className="w-full font-arabic text-xl font-bold p-2 rounded-lg border border-slate-200 text-right dir-rtl"
            dir="rtl" placeholder="الْعِلْمُ"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 block mb-1">English Meaning</label>
          <input
            value={data.meaningEn || ""}
            onChange={(e) => onChange("meaningEn", e.target.value)}
            className="w-full text-xs font-bold p-2 rounded-lg border border-slate-200"
            placeholder="Knowledge / Learning"
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 block mb-1">Image URL (Optional)</label>
          <input
            value={data.imageUrl || ""}
            onChange={(e) => onChange("imageUrl", e.target.value)}
            className="w-full text-xs p-2 rounded-lg border border-slate-200"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 block mb-1">Audio URL (Optional)</label>
          <input
            value={data.audioUrl || ""}
            onChange={(e) => onChange("audioUrl", e.target.value)}
            className="w-full text-xs p-2 rounded-lg border border-slate-200"
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  );
}

/* Before / After Grammar Comparison */
function BeforeAfterEditor({ data, onChange }: { data: any; onChange: (f: string, v: any) => void }) {
  return (
    <div className="space-y-3 p-4 bg-blue-50/50 rounded-xl border border-blue-200">
      <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">↔️ Grammar Transformation Comparison</span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 bg-white rounded-lg border border-blue-200 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">State 1 (Before)</span>
          <input value={data.beforeArabic || ""} onChange={(e) => onChange("beforeArabic", e.target.value)} className="w-full font-arabic text-lg font-bold p-1.5 rounded border border-slate-200 text-right" dir="rtl" placeholder="الْعِلْمُ نُورٌ" />
          <input value={data.beforeCaseEn || ""} onChange={(e) => onChange("beforeCaseEn", e.target.value)} className="w-full text-xs p-1.5 rounded border border-slate-200" placeholder="Mubtada' Marfoo' (ـُ)" />
        </div>

        <div className="p-3 bg-white rounded-lg border border-blue-200 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">State 2 (After)</span>
          <input value={data.afterArabic || ""} onChange={(e) => onChange("afterArabic", e.target.value)} className="w-full font-arabic text-lg font-bold p-1.5 rounded border border-slate-200 text-right" dir="rtl" placeholder="إِنَّ الْعِلْمَ نُورٌ" />
          <input value={data.afterCaseEn || ""} onChange={(e) => onChange("afterCaseEn", e.target.value)} className="w-full text-xs p-1.5 rounded border border-slate-200" placeholder="Ism Inna Mansoob (ـَ)" />
        </div>
      </div>
    </div>
  );
}

/* I'rab 4-Column Table Editor */
function IrabTableEditor({ data, onChange }: { data: any; onChange: (f: string, v: any) => void }) {
  const rows = data.rows || [];

  const updateRow = (rIdx: number, field: string, val: string) => {
    const updated = rows.map((r: any, i: number) => (i === rIdx ? { ...r, [field]: val } : r));
    onChange("rows", updated);
  };

  const addRow = () => {
    onChange("rows", [...rows, { wordAr: "كَلِمَةٌ", roleAr: "مُبْتَدَأٌ", caseAr: "مَرْفُوعٌ", meaningEn: "Meaning" }]);
  };

  return (
    <div className="space-y-3 p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">📐 I'rab 4-Column Breakdown Table</span>
        <button onClick={addRow} className="px-3 py-1 bg-emerald-700 text-white font-bold text-[10px] rounded-md">+ Add Row</button>
      </div>

      <div className="space-y-2">
        {rows.map((row: any, rIdx: number) => (
          <div key={rIdx} className="grid grid-cols-4 gap-2 bg-white p-2 rounded-lg border border-slate-200">
            <input value={row.wordAr} onChange={(e) => updateRow(rIdx, "wordAr", e.target.value)} className="font-arabic text-sm font-bold p-1 rounded border border-slate-200 text-right" dir="rtl" placeholder="الْكَلِمَةُ" />
            <input value={row.roleAr} onChange={(e) => updateRow(rIdx, "roleAr", e.target.value)} className="font-arabic text-xs font-bold p-1 rounded border border-slate-200 text-right" dir="rtl" placeholder="مُبْتَدَأٌ" />
            <input value={row.caseAr} onChange={(e) => updateRow(rIdx, "caseAr", e.target.value)} className="font-arabic text-xs p-1 rounded border border-slate-200 text-right" dir="rtl" placeholder="مَرْفُوعٌ" />
            <input value={row.meaningEn} onChange={(e) => updateRow(rIdx, "meaningEn", e.target.value)} className="text-xs p-1 rounded border border-slate-200" placeholder="Meaning" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Audio Callout Editor */
function AudioCalloutEditor({ data, onChange }: { data: any; onChange: (f: string, v: any) => void }) {
  return (
    <div className="space-y-3 p-4 bg-purple-50/50 rounded-xl border border-purple-200">
      <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">🔊 Native Audio Phrase Callout</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={data.arabicText || ""} onChange={(e) => onChange("arabicText", e.target.value)} className="font-arabic text-lg font-bold p-2 rounded-lg border border-slate-200 text-right" dir="rtl" placeholder="الْعِبَارَةُ الْعَرَبِيَّةُ" />
        <input value={data.audioUrl || ""} onChange={(e) => onChange("audioUrl", e.target.value)} className="text-xs p-2 rounded-lg border border-slate-200" placeholder="Audio URL (https://...)" />
      </div>
    </div>
  );
}

/* Helper default data generator */
function getDefaultDataForType(type: BlockType): Record<string, any> {
  switch (type) {
    case "TEXT": return { text: "Start writing plain text or vowelled Arabic notes..." };
    case "VOCABULARY_CARD": return { wordDiacriticsAr: "كَلِمَةٌ", meaningEn: "New Word", imageUrl: "", audioUrl: "" };
    case "BEFORE_AFTER_COMPARISON": return { beforeArabic: "الْعِلْمُ نُورٌ", afterArabic: "إِنَّ الْعِلْمَ نُورٌ" };
    case "IRAB_TABLE": return { rows: [{ wordAr: "الْعِلْمُ", roleAr: "مُبْتَدَأٌ", caseAr: "مَرْفُوعٌ", meaningEn: "Knowledge" }] };
    case "AUDIO_CALLOUT": return { arabicText: "الْعِلْمُ نُورٌ", audioUrl: "" };
    default: return {};
  }
}
