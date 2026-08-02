"use client";

import React, { useState } from "react";

export interface RichMediumEditorProps {
  titleAr: string;
  setTitleAr: (val: string) => void;
  titleEn: string;
  setTitleEn: (val: string) => void;
  content: string;
  setContent: (val: string) => void;
  audioUrl?: string;
  setAudioUrl?: (val: string) => void;
  onSave: () => void;
  isSaved: boolean;
}

export default function RichMediumEditor({
  titleAr,
  setTitleAr,
  titleEn,
  setTitleEn,
  content,
  setContent,
  audioUrl = "",
  setAudioUrl,
  onSave,
  isSaved,
}: RichMediumEditorProps) {
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left");
  const [fontSize, setFontSize] = useState<string>("16px");

  const insertText = (prefix: string, suffix: string = "") => {
    setContent(`${content}\n${prefix}${suffix}`);
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && setAudioUrl) {
      const fakeObjUrl = URL.createObjectURL(file);
      setAudioUrl(fakeObjUrl);
    }
  };

  // Word & Reading Time Metrics
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const characterCount = content.length;
  const readingTimeMins = Math.max(1, Math.ceil(wordCount / 180));

  return (
    <div className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm overflow-hidden flex flex-col min-h-[720px]">
      {/* Google Docs & Medium Hybrid Rich Toolbar */}
      <div className="bg-claude-bg border-b border-claude-border p-3 space-y-2.5">
        {/* Row 1: Formatting Actions */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-claude-border text-xs font-medium text-claude-textMain focus:outline-none focus:border-claude-terracotta"
          >
            <option value="14px">Small (14px)</option>
            <option value="16px">Normal (16px)</option>
            <option value="18px">Medium (18px)</option>
            <option value="22px">Large (22px)</option>
            <option value="28px">Heading (28px)</option>
          </select>

          <div className="h-4 w-px bg-claude-border mx-1" />

          <button
            onClick={() => insertText("**", "**")}
            className="px-2.5 py-1 rounded-lg bg-white border border-claude-border font-bold hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors"
            title="Bold"
          >
            B
          </button>
          <button
            onClick={() => insertText("*", "*")}
            className="px-2.5 py-1 rounded-lg bg-white border border-claude-border italic hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors"
            title="Italic"
          >
            I
          </button>
          <button
            onClick={() => insertText("<u>", "</u>")}
            className="px-2.5 py-1 rounded-lg bg-white border border-claude-border underline hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors"
            title="Underline"
          >
            U
          </button>
          <button
            onClick={() => insertText("~~", "~~")}
            className="px-2.5 py-1 rounded-lg bg-white border border-claude-border line-through hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors"
            title="Strikethrough"
          >
            S
          </button>
          <button
            onClick={() => insertText("`", "`")}
            className="px-2 py-1 rounded-lg bg-white border border-claude-border font-mono text-[11px] hover:bg-claude-terracottaLight transition-colors"
            title="Inline Code"
          >
            {"</>"}
          </button>

          <div className="h-4 w-px bg-claude-border mx-1" />

          <button
            onClick={() => insertText("# ")}
            className="px-2.5 py-1 rounded-lg bg-white border border-claude-border font-extrabold hover:bg-claude-terracottaLight transition-colors"
          >
            H1
          </button>
          <button
            onClick={() => insertText("## ")}
            className="px-2.5 py-1 rounded-lg bg-white border border-claude-border font-bold hover:bg-claude-terracottaLight transition-colors"
          >
            H2
          </button>
          <button
            onClick={() => insertText("### ")}
            className="px-2.5 py-1 rounded-lg bg-white border border-claude-border font-semibold hover:bg-claude-terracottaLight transition-colors"
          >
            H3
          </button>

          <div className="h-4 w-px bg-claude-border mx-1" />

          <button
            onClick={() => setTextAlign("left")}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${
              textAlign === "left" ? "bg-claude-terracotta text-white border-claude-terracotta" : "bg-white border-claude-border"
            }`}
          >
            Left ≡
          </button>
          <button
            onClick={() => setTextAlign("center")}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${
              textAlign === "center" ? "bg-claude-terracotta text-white border-claude-terracotta" : "bg-white border-claude-border"
            }`}
          >
            Center ≡
          </button>
          <button
            onClick={() => setTextAlign("right")}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${
              textAlign === "right" ? "bg-claude-terracotta text-white border-claude-terracotta" : "bg-white border-claude-border"
            }`}
          >
            ≡ Right (RTL)
          </button>
        </div>

        {/* Row 2: Lists & Special Blocks */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1 border-t border-claude-border/60">
          <button
            onClick={() => insertText("- ")}
            className="px-2.5 py-1 rounded-lg bg-white border border-claude-border hover:bg-claude-terracottaLight transition-colors"
          >
            • Bullet List
          </button>
          <button
            onClick={() => insertText("1. ")}
            className="px-2.5 py-1 rounded-lg bg-white border border-claude-border hover:bg-claude-terracottaLight transition-colors"
          >
            1. Numbered List
          </button>
          <button
            onClick={() => insertText("> ")}
            className="px-2.5 py-1 rounded-lg bg-white border border-claude-border hover:bg-claude-terracottaLight transition-colors"
          >
            ” Blockquote
          </button>
          <button
            onClick={() => insertText("💡 **Grammar Rule**: ")}
            className="px-2.5 py-1 rounded-lg bg-white border border-claude-border hover:bg-claude-terracottaLight transition-colors"
          >
            💡 Callout Note
          </button>
          <button
            onClick={() => insertText("\n\nالْجُمْلَةُ النَّحْوِيَّةُ: ")}
            className="px-3 py-1 rounded-lg bg-claude-terracottaLight text-claude-terracotta border border-claude-terracotta/30 font-arabic font-bold text-sm hover:bg-claude-terracotta hover:text-white transition-colors"
          >
            ع Pure Arabic Block
          </button>
        </div>
      </div>

      {/* FULL LESSON NATIVE AUDIO RECORDER & PLAYER BANNER */}
      {setAudioUrl && (
        <div className="bg-emerald-50/70 border-b border-emerald-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
              🎙️
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
                Full Lesson Native Speaker Audio Recitation
              </h3>
              <p className="text-[11px] text-emerald-800 font-medium">
                Upload or record complete native Fusha audio recitation for this entire lesson.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-md">
            <label className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer shrink-0">
              <span>📁 Upload Audio File</span>
              <input type="file" accept="audio/*" onChange={handleAudioFileChange} className="hidden" />
            </label>

            <input
              type="text"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              placeholder="Or paste Full Lesson Audio URL (.mp3)..."
              className="flex-1 p-1.5 rounded-lg bg-white border border-emerald-300 text-xs text-slate-900 focus:outline-none"
            />

            {audioUrl && (
              <audio controls src={audioUrl} className="h-8 max-w-[160px]" />
            )}
          </div>
        </div>
      )}

      {/* Main Medium Editor Canvas Body */}
      <div className="flex-1 p-8 space-y-6 flex flex-col">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
            Arabic Script Lesson Title (Tashkeel)
          </label>
          <input
            type="text"
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
            placeholder="عُنْوَانُ الدَّرْسِ بِالتَّشْكِيلِ..."
            className="w-full font-arabic text-3xl md:text-4xl text-slate-900 font-bold focus:outline-none border-b border-claude-border focus:border-claude-terracotta py-2 dir-rtl transition-colors"
            dir="rtl"
          />
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
            English Lesson Title
          </label>
          <input
            type="text"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            placeholder="Title of the Lesson in English..."
            className="w-full text-2xl font-bold text-claude-textMain focus:outline-none border-b border-claude-border focus:border-claude-terracotta py-1.5 transition-colors"
          />
        </div>

        <div className="flex-1 flex flex-col pt-2">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ fontSize, textAlign }}
            placeholder="Write your lesson explanation here..."
            className="w-full flex-1 p-4 rounded-xl bg-claude-bg/30 border border-claude-border leading-relaxed text-claude-textMain focus:outline-none focus:border-claude-terracotta font-sans resize-none transition-colors"
          />
        </div>
      </div>

      {/* Status Bar & OTA Publish Footer */}
      <div className="bg-claude-bg border-t border-claude-border px-8 py-3.5 flex items-center justify-between text-xs text-claude-textMuted">
        <div className="flex items-center gap-4">
          <span>Words: <strong className="text-claude-textMain">{wordCount}</strong></span>
          <span>Characters: <strong className="text-claude-textMain">{characterCount}</strong></span>
          <span>Est. Read: <strong className="text-claude-textMain">{readingTimeMins} min</strong></span>
          {audioUrl && (
            <span className="text-emerald-800 font-bold flex items-center gap-1">
              🔊 Full Lesson Audio Ready
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isSaved && (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              ✓ Published Over-The-Air
            </span>
          )}
          <button
            onClick={onSave}
            className="px-6 py-2.5 rounded-xl bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs transition-colors shadow-sm"
          >
            🚀 Publish OTA Lesson & Audio Update
          </button>
        </div>
      </div>
    </div>
  );
}
