"use client";

import React, { useState, useEffect, useRef } from "react";
import mermaid from "mermaid";

/* ─── Default Examples ───────────────────────────────── */

const EXAMPLE_TEMPLATES = [
  {
    label: "Nominal vs Verbal Sentence",
    code: `flowchart TD
  A[Arabic Sentence] --> B{Does it start\\nwith a verb?}
  B -- Yes --> C[الجُمْلَةُ الفِعْلِيَّة\\nVerbal Sentence]
  B -- No --> D[الجُمْلَةُ الاسْمِيَّة\\nNominal Sentence]
  C --> E[Verb فِعْلٌ + Subject فَاعِلٌ]
  D --> F[Subject مُبْتَدَأٌ + Predicate خَبَرٌ]
  style C fill:#FFF7ED,stroke:#C2410C
  style D fill:#EFF6FF,stroke:#2563EB
  style E fill:#FFF7ED,stroke:#FED7AA
  style F fill:#EFF6FF,stroke:#BFDBFE`,
  },
  {
    label: "Case Ending Decision Tree",
    code: `flowchart TD
  A[Word in Sentence] --> B{What is its\\ngrammatical role?}
  B -- Subject/Predicate --> C[مَرْفُوعٌ Nominative\\nـُ or ـٌ]
  B -- Object/Complement --> D[مَنْصُوبٌ Accusative\\nـَ or ـً]
  B -- After preposition\\nor Idaafa --> E[مَجْرُورٌ Genitive\\nـِ or ـٍ]
  style C fill:#ECFDF5,stroke:#16A34A
  style D fill:#FEF3C7,stroke:#D97706
  style E fill:#F5F3FF,stroke:#7C3AED`,
  },
  {
    label: "Verb Conjugation Flow",
    code: `flowchart LR
  A[Root فِعْل] --> B[Past الْمَاضِي\\nفَعَلَ]
  A --> C[Present الْمُضَارِع\\nيَفْعُلُ]
  A --> D[Command الْأَمْر\\nافْعَلْ]
  B --> E[فَعَلَ / فَعَلَتْ\\nhe/she did]
  C --> F[يَفْعُلُ / تَفْعُلُ\\nhe/she does]
  style A fill:#F8FAF6,stroke:#0F172A
  style B fill:#FFF7ED,stroke:#C2410C
  style C fill:#EFF6FF,stroke:#2563EB
  style D fill:#ECFDF5,stroke:#16A34A`,
  },
];

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    primaryColor: "#F8FAF6",
    primaryTextColor: "#0F172A",
    primaryBorderColor: "#E2E8F0",
    lineColor: "#94A3B8",
    fontFamily: "Inter, sans-serif",
    fontSize: "13px",
  },
});

/* ─── Component ──────────────────────────────────────── */

interface GrammarFlowchartProps {
  initialCode?: string;
  onChange?: (code: string) => void;
}

let renderCount = 0;

export default function GrammarFlowchart({ initialCode, onChange }: GrammarFlowchartProps) {
  const [code, setCode] = useState(initialCode ?? EXAMPLE_TEMPLATES[0].code);
  const [svgContent, setSvgContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);

  const renderDiagram = async (src: string) => {
    setIsRendering(true);
    setError(null);
    try {
      renderCount++;
      const id = `mermaid-gram-${renderCount}`;
      const { svg } = await mermaid.render(id, src);
      setSvgContent(svg);
    } catch (e: any) {
      setError(e?.message || "Invalid diagram syntax. Check your Mermaid code.");
    } finally {
      setIsRendering(false);
    }
  };

  useEffect(() => {
    renderDiagram(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      {/* Template Picker */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Templates:</span>
        {EXAMPLE_TEMPLATES.map((t) => (
          <button
            key={t.label}
            onClick={() => { setCode(t.code); onChange?.(t.code); }}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-colors"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Mermaid Flowchart Syntax
            </label>
            <button
              onClick={() => { renderDiagram(code); onChange?.(code); }}
              disabled={isRendering}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
            >
              {isRendering ? "Rendering…" : "▶ Render"}
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            className="w-full font-mono text-xs p-3 rounded-2xl border border-slate-200 bg-slate-900 text-emerald-300 focus:outline-none focus:border-blue-400 resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Rendered Preview */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Live Preview
          </label>
          <div className="rounded-2xl border border-slate-200 bg-[#F8FAF6] p-4 min-h-[320px] flex items-center justify-center overflow-auto">
            {error ? (
              <div className="text-rose-600 text-xs font-mono bg-rose-50 p-4 rounded-xl border border-rose-200 max-w-full">
                <p className="font-bold mb-1">Syntax Error</p>
                <p className="opacity-80">{error}</p>
              </div>
            ) : isRendering ? (
              <div className="text-slate-400 text-xs animate-pulse">Rendering diagram…</div>
            ) : (
              <div
                className="max-w-full"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
