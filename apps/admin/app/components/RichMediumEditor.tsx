"use client";

import React, { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  Lightbulb,
  Languages,
  Table,
  Link as LinkIcon,
  Globe,
  Maximize2,
  Minimize2,
  Upload,
  Music,
  CheckCircle2,
} from "lucide-react";

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
  const [editorLanguage, setEditorLanguage] = useState<"en" | "ar" | "bilingual">("en");
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const handleLanguageChange = (lang: "en" | "ar" | "bilingual") => {
    setEditorLanguage(lang);
    if (lang === "ar") {
      setTextAlign("right");
    } else if (lang === "en") {
      setTextAlign("left");
    }
  };

  // Word & Reading Time Metrics
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const characterCount = content.length;
  const readingTimeMins = Math.max(1, Math.ceil(wordCount / 180));

  const textDir = editorLanguage === "ar" ? "rtl" : "ltr";
  const fontClass = editorLanguage === "ar" ? "font-arabic" : "font-sans";

  return (
    <div
      className={`claude-card rounded-2xl bg-white border border-claude-border shadow-sm overflow-hidden flex flex-col transition-all ${
        isFullscreen
          ? "fixed inset-4 z-50 shadow-2xl min-h-0"
          : "min-h-[880px]"
      }`}
    >
      {/* Icon-Based Formatting Toolbar */}
      <div className="bg-claude-bg border-b border-claude-border p-3 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left Side Controls: Language Choice, Font Size & Icon Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {/* Language Choice Selector */}
            <div className="flex items-center bg-white border border-claude-border rounded-xl p-0.5 shadow-2xs">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  editorLanguage === "en"
                    ? "bg-claude-terracotta text-white shadow-2xs"
                    : "text-claude-textMuted hover:text-claude-textMain"
                }`}
                title="Switch Editor to English Mode (LTR)"
              >
                <span>🇬🇧 EN</span>
              </button>

              <button
                onClick={() => handleLanguageChange("ar")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  editorLanguage === "ar"
                    ? "bg-claude-terracotta text-white shadow-2xs"
                    : "text-claude-textMuted hover:text-claude-textMain"
                }`}
                title="Switch Editor to Arabic Mode (RTL + Vowelled Script)"
              >
                <span>🇸🇦 العربية</span>
              </button>

              <button
                onClick={() => handleLanguageChange("bilingual")}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  editorLanguage === "bilingual"
                    ? "bg-claude-terracotta text-white shadow-2xs"
                    : "text-claude-textMuted hover:text-claude-textMain"
                }`}
                title="Bilingual / Dual Grammar Mode"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Dual</span>
              </button>
            </div>

            <div className="h-4 w-px bg-claude-border mx-1" />

            {/* Font Size Dropdown */}
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-white border border-claude-border text-xs font-bold text-claude-textMain focus:outline-none focus:border-claude-terracotta shadow-2xs"
              title="Change Text Size"
            >
              <option value="14px">Small (14px)</option>
              <option value="16px">Normal (16px)</option>
              <option value="18px">Medium (18px)</option>
              <option value="22px">Large (22px)</option>
              <option value="28px">Heading (28px)</option>
            </select>

            <div className="h-4 w-px bg-claude-border mx-1" />

            {/* ICON-ONLY TOOLBAR BUTTONS WITH HOVER TEXT */}
            <button
              onClick={() => insertText("**", "**")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title="Bold (**text**)"
            >
              <Bold className="w-4 h-4" />
            </button>

            <button
              onClick={() => insertText("*", "*")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title="Italic (*text*)"
            >
              <Italic className="w-4 h-4" />
            </button>

            <button
              onClick={() => insertText("<u>", "</u>")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title="Underline (<u>text</u>)"
            >
              <Underline className="w-4 h-4" />
            </button>

            <button
              onClick={() => insertText("~~", "~~")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title="Strikethrough (~~text~~)"
            >
              <Strikethrough className="w-4 h-4" />
            </button>

            <button
              onClick={() => insertText("`", "`")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title="Inline Code (`code`)"
            >
              <Code className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-claude-border mx-1" />

            <button
              onClick={() => insertText("# ")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title="Heading 1 (# Title)"
            >
              <Heading1 className="w-4 h-4" />
            </button>

            <button
              onClick={() => insertText("## ")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title="Heading 2 (## Subtitle)"
            >
              <Heading2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => insertText("### ")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title="Heading 3 (### Section)"
            >
              <Heading3 className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-claude-border mx-1" />

            <button
              onClick={() => insertText("- ")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title="Bullet List (- Item)"
            >
              <List className="w-4 h-4" />
            </button>

            <button
              onClick={() => insertText("1. ")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title="Numbered List (1. Item)"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            <button
              onClick={() => insertText("> ")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title="Blockquote (> Quote)"
            >
              <Quote className="w-4 h-4" />
            </button>

            <button
              onClick={() => insertText("💡 **Grammar Rule**: ")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-amber-100 hover:text-amber-800 transition-colors shadow-2xs"
              title="Callout Note (💡 Rule)"
            >
              <Lightbulb className="w-4 h-4 text-amber-600" />
            </button>

            <button
              onClick={() => insertText("\n\nالْجُمْلَةُ النَّحْوِيَّةُ: ")}
              className="p-2 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-600 hover:text-white transition-colors shadow-2xs"
              title="Insert Pure Vowelled Arabic Block"
            >
              <Languages className="w-4 h-4" />
            </button>

            <button
              onClick={() => insertText("\n| Arabic | Meaning | Rule |\n|---|---|---|\n| **كِتَابٌ** | Book | Marfoo' |\n")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title="Insert Grammar Table"
            >
              <Table className="w-4 h-4" />
            </button>

            <button
              onClick={() => insertText("[", "](https://)")}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title="Insert Link ([Text](URL))"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Right Side Alignment & Fullscreen Toggles */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setTextAlign("left")}
              className={`p-2 rounded-xl border transition-colors shadow-2xs ${
                textAlign === "left"
                  ? "bg-claude-terracotta text-white border-claude-terracotta"
                  : "bg-white border-claude-border hover:bg-claude-bg"
              }`}
              title="Align Left (LTR)"
            >
              <AlignLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTextAlign("center")}
              className={`p-2 rounded-xl border transition-colors shadow-2xs ${
                textAlign === "center"
                  ? "bg-claude-terracotta text-white border-claude-terracotta"
                  : "bg-white border-claude-border hover:bg-claude-bg"
              }`}
              title="Align Center"
            >
              <AlignCenter className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTextAlign("right")}
              className={`p-2 rounded-xl border transition-colors shadow-2xs ${
                textAlign === "right"
                  ? "bg-claude-terracotta text-white border-claude-terracotta"
                  : "bg-white border-claude-border hover:bg-claude-bg"
              }`}
              title="Align Right (RTL)"
            >
              <AlignRight className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-claude-border mx-1" />

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-white border border-claude-border hover:bg-claude-terracottaLight hover:text-claude-terracotta transition-colors shadow-2xs"
              title={isFullscreen ? "Exit Fullscreen Editor" : "Expand Editor to Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* FULL LESSON NATIVE AUDIO RECORDER & PLAYER BANNER */}
      {setAudioUrl && (
        <div className="bg-emerald-50/70 border-b border-emerald-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
              <Music className="w-5 h-5" />
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
            <label className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer shrink-0 flex items-center gap-1.5 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Upload Audio</span>
              <input type="file" accept="audio/*" onChange={handleAudioFileChange} className="hidden" />
            </label>

            <input
              type="text"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              placeholder="Or paste Full Lesson Audio URL (.mp3)..."
              className="flex-1 p-2 rounded-xl bg-white border border-emerald-300 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 shadow-2xs font-medium"
            />

            {audioUrl && (
              <audio controls src={audioUrl} className="h-8 max-w-[160px]" />
            )}
          </div>
        </div>
      )}

      {/* Expanded Main Editor Canvas Body */}
      <div className="flex-1 p-8 space-y-6 flex flex-col min-h-[550px]">
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

        {/* Large Textarea Editor Canvas */}
        <div className="flex-1 flex flex-col pt-2 min-h-[420px]">
          <div className="flex items-center justify-between text-[11px] font-bold text-claude-textMuted mb-1.5">
            <span>Lesson Content & Grammar Notes</span>
            <span className="font-mono uppercase tracking-wider">
              {editorLanguage === "ar" ? "🇸🇦 Arabic Mode (RTL)" : editorLanguage === "en" ? "🇬🇧 English Mode (LTR)" : "🌐 Dual Mode"}
            </span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ fontSize, textAlign }}
            dir={textDir}
            placeholder={
              editorLanguage === "ar"
                ? "اكْتُبْ شَرْحَ الدَّرْسِ وَالقَوَاعِدَ النَّحْوِيَّةَ هُنَا..."
                : "Write your detailed lesson notes, vowelled Arabic examples, and grammar rules here..."
            }
            className={`w-full flex-1 min-h-[420px] p-6 rounded-2xl bg-claude-bg/30 border border-claude-border leading-relaxed text-claude-textMain focus:outline-none focus:border-claude-terracotta ${fontClass} resize-y transition-colors shadow-inner`}
          />
        </div>
      </div>

      {/* Status Bar & OTA Publish Footer */}
      <div className="bg-claude-bg border-t border-claude-border px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-claude-textMuted">
        <div className="flex items-center gap-5">
          <span>Words: <strong className="text-claude-textMain">{wordCount}</strong></span>
          <span>Characters: <strong className="text-claude-textMain">{characterCount}</strong></span>
          <span>Est. Read: <strong className="text-claude-textMain">{readingTimeMins} min</strong></span>
          {audioUrl && (
            <span className="text-emerald-800 font-bold flex items-center gap-1 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
              🔊 Full Lesson Audio Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isSaved && (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Published Over-The-Air</span>
            </span>
          )}
          <button
            onClick={onSave}
            className="px-6 py-3 rounded-xl bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs transition-colors shadow-md flex items-center gap-2"
          >
            <span>🚀 Publish OTA Lesson & Audio Update</span>
          </button>
        </div>
      </div>
    </div>
  );
}
