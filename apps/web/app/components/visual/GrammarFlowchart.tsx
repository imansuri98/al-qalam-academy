"use client";

import React, { useState, useEffect } from "react";
import mermaid from "mermaid";

const DEFAULT_CODE = `flowchart TD
  A[Arabic Sentence] --> B{Does it start\\nwith a verb?}
  B -- Yes --> C[الجُمْلَةُ الفِعْلِيَّة\\nVerbal Sentence]
  B -- No --> D[الجُمْلَةُ الاسْمِيَّة\\nNominal Sentence]
  style C fill:#FFF7ED,stroke:#C2410C
  style D fill:#EFF6FF,stroke:#2563EB`;

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

let count = 0;

interface GrammarFlowchartProps {
  initialCode?: string;
}

export default function GrammarFlowchart({ initialCode }: GrammarFlowchartProps) {
  const [code] = useState(initialCode ?? DEFAULT_CODE);
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    async function render() {
      try {
        count++;
        const { svg } = await mermaid.render(`mermaid-web-${count}`, code);
        setSvgContent(svg);
      } catch (e) {}
    }
    render();
  }, [code]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-[#F8FAF6] p-4 flex items-center justify-center overflow-auto">
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    </div>
  );
}
