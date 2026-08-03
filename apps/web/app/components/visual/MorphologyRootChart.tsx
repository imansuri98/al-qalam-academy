"use client";

import React, { useState } from "react";
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface MorphForm {
  id: string;
  arabic: string;
  pattern: string;
  patternEn: string;
  color: string;
}

const PALETTE = ["#C2410C", "#2563EB", "#16A34A", "#9333EA", "#D97706", "#0891B2"];

const DEFAULT_FORMS: MorphForm[] = [
  { id: "1", arabic: "كَتَبَ", pattern: "فَعَلَ", patternEn: "Past verb", color: PALETTE[0] },
  { id: "2", arabic: "يَكْتُبُ", pattern: "يَفْعُلُ", patternEn: "Present verb", color: PALETTE[1] },
  { id: "3", arabic: "كِتَابٌ", pattern: "فِعَالٌ", patternEn: "Verbal noun", color: PALETTE[2] },
  { id: "4", arabic: "كَاتِبٌ", pattern: "فَاعِلٌ", patternEn: "Active participle", color: PALETTE[3] },
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 min-w-[140px]">
      <p className="font-arabic text-xl font-bold text-slate-900 text-right dir-rtl" dir="rtl">{d.arabic}</p>
      <p className="text-xs font-bold text-slate-600 mt-0.5">{d.patternEn}</p>
    </div>
  );
}

interface MorphologyRootChartProps {
  initialRoot?: string;
  initialForms?: MorphForm[];
}

export default function MorphologyRootChart({ initialRoot, initialForms }: MorphologyRootChartProps) {
  const [root] = useState(initialRoot ?? "ك-ت-ب");
  const [forms] = useState<MorphForm[]>(initialForms ?? DEFAULT_FORMS);

  const chartData = forms.map((f, i) => ({ ...f, value: 100 - i * 12, fill: f.color }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Morphological Family</h3>
        <span className="font-arabic font-extrabold text-lg text-slate-900 dir-rtl" dir="rtl">{root}</span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="15%" outerRadius="90%" data={chartData}>
          <RadialBar dataKey="value" cornerRadius={8} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconSize={10} formatter={(value, entry: any) => (
            <span className="text-[11px] font-bold text-slate-700">{entry.payload.arabic} — {entry.payload.patternEn}</span>
          )} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
