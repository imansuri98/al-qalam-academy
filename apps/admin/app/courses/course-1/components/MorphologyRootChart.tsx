"use client";

import React, { useState } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ─── Types ─────────────────────────────────────────── */

interface MorphForm {
  id: string;
  arabic: string;
  pattern: string;     // e.g. "فَاعِلٌ"
  patternEn: string;   // e.g. "Active Participle"
  color: string;
}

/* ─── Colour Palette ─────────────────────────────────── */

const PALETTE = [
  "#C2410C", "#2563EB", "#16A34A", "#9333EA",
  "#D97706", "#0891B2", "#DC2626", "#0D9488",
];

/* ─── Default Data ───────────────────────────────────── */

const DEFAULT_ROOT = "ك-ت-ب";

const DEFAULT_FORMS: MorphForm[] = [
  { id: "1", arabic: "كَتَبَ", pattern: "فَعَلَ", patternEn: "Past verb (he wrote)", color: PALETTE[0] },
  { id: "2", arabic: "يَكْتُبُ", pattern: "يَفْعُلُ", patternEn: "Present verb (he writes)", color: PALETTE[1] },
  { id: "3", arabic: "كِتَابٌ", pattern: "فِعَالٌ", patternEn: "Verbal noun (book)", color: PALETTE[2] },
  { id: "4", arabic: "كِتَابَةٌ", pattern: "فِعَالَةٌ", patternEn: "Masdar (writing act)", color: PALETTE[3] },
  { id: "5", arabic: "كَاتِبٌ", pattern: "فَاعِلٌ", patternEn: "Active participle (writer)", color: PALETTE[4] },
  { id: "6", arabic: "مَكْتُوبٌ", pattern: "مَفْعُولٌ", patternEn: "Passive participle (written)", color: PALETTE[5] },
  { id: "7", arabic: "مَكْتَبٌ", pattern: "مَفْعَلٌ", patternEn: "Noun of place (desk/office)", color: PALETTE[6] },
];

/* ─── Custom Tooltip ─────────────────────────────────── */

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 min-w-[160px]">
      <p className="font-arabic text-2xl font-bold text-slate-900 text-right dir-rtl" dir="rtl">
        {d.arabic}
      </p>
      <p className="text-xs font-bold text-slate-600 mt-1">{d.patternEn}</p>
      <p className="text-[10px] font-mono text-slate-400">{d.pattern}</p>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────── */

interface MorphologyRootChartProps {
  initialRoot?: string;
  initialForms?: MorphForm[];
  onChange?: (root: string, forms: MorphForm[]) => void;
}

let formCounter = 100;

export default function MorphologyRootChart({
  initialRoot,
  initialForms,
  onChange,
}: MorphologyRootChartProps) {
  const [root, setRoot] = useState(initialRoot ?? DEFAULT_ROOT);
  const [forms, setForms] = useState<MorphForm[]>(initialForms ?? DEFAULT_FORMS);

  const [newAr, setNewAr] = useState("");
  const [newPattern, setNewPattern] = useState("");
  const [newPatternEn, setNewPatternEn] = useState("");

  const chartData = forms.map((f, i) => ({
    ...f,
    value: 100 - i * 10,
    fill: f.color,
  }));

  const handleAdd = () => {
    if (!newAr.trim()) return;
    formCounter++;
    const newForm: MorphForm = {
      id: `f-${formCounter}`,
      arabic: newAr.trim(),
      pattern: newPattern.trim() || "فَعَلَ",
      patternEn: newPatternEn.trim() || "Derived form",
      color: PALETTE[forms.length % PALETTE.length],
    };
    const updated = [...forms, newForm];
    setForms(updated);
    onChange?.(root, updated);
    setNewAr("");
    setNewPattern("");
    setNewPatternEn("");
  };

  const handleDelete = (id: string) => {
    const updated = forms.filter((f) => f.id !== id);
    setForms(updated);
    onChange?.(root, updated);
  };

  return (
    <div className="space-y-4">
      {/* Root Input */}
      <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="flex-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            3-Letter Root (جَذْرٌ ثُلَاثِيٌّ)
          </label>
          <input
            value={root}
            onChange={(e) => setRoot(e.target.value)}
            className="w-full font-arabic text-2xl font-bold p-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-400 text-right dir-rtl"
            dir="rtl"
            placeholder="ك-ت-ب"
          />
        </div>
        <div className="text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Root</p>
          <p className="font-arabic text-4xl font-black text-slate-800 dir-rtl" dir="rtl">{root}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radial Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Morphological Family Chart
          </h3>
          <ResponsiveContainer width="100%" height={320}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="15%"
              outerRadius="90%"
              data={chartData}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={8}
                label={{ position: "insideStart", fill: "#fff", fontSize: 10, fontWeight: 700 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconSize={10}
                formatter={(value, entry: any) => (
                  <span className="text-[11px] font-bold text-slate-700">
                    {entry.payload.arabic} — {entry.payload.patternEn}
                  </span>
                )}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Forms List + Add */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Derived Forms</h3>
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {forms.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: f.color }} />
                  <div>
                    <span className="font-arabic text-lg font-bold text-slate-900 dir-rtl" dir="rtl">
                      {f.arabic}
                    </span>
                    <span className="text-[10px] text-slate-500 block">{f.patternEn}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="text-rose-400 hover:text-rose-600 text-xs p-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Add Form */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Add Derived Form</p>
            <input
              value={newAr}
              onChange={(e) => setNewAr(e.target.value)}
              className="w-full font-arabic text-base font-bold p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400 text-right"
              dir="rtl"
              placeholder="الْكَلِمَةُ"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                value={newPattern}
                onChange={(e) => setNewPattern(e.target.value)}
                className="font-arabic text-sm p-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400 text-right"
                dir="rtl"
                placeholder="فَاعِلٌ"
              />
              <input
                value={newPatternEn}
                onChange={(e) => setNewPatternEn(e.target.value)}
                className="text-xs p-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400"
                placeholder="Active participle"
              />
            </div>
            <button
              onClick={handleAdd}
              className="w-full py-2 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-900 transition-colors"
            >
              + Add Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
