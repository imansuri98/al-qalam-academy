"use client";

import React, { useState } from "react";
import { IRAB_CASE_METADATA, IrabCaseType } from "@alarabi/arabic-utils";

export interface IrabWord {
  wordAr: string;
  meaningEn: string;
  irabCase: IrabCaseType;
  roleEn: string;
  explanationEn: string;
}

export interface IrabParsingExerciseProps {
  promptEn: string;
  sentenceAr: string;
  words: IrabWord[];
}

export default function IrabParsingExercise({
  promptEn,
  words,
}: IrabParsingExerciseProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const activeWord = words[selectedIndex];
  const caseMeta = IRAB_CASE_METADATA[activeWord.irabCase];

  return (
    <div className="claude-card rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-medium">
          Grammar Exercise: I'rab Sentence Dissector
        </span>
        <span className="text-xs text-claude-textMuted">Click any word to inspect</span>
      </div>

      <p className="text-sm font-semibold text-claude-textMain">{promptEn}</p>

      {/* Sentence Word Tokens */}
      <div className="p-6 bg-claude-bg border border-claude-border rounded-xl text-center space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-4 dir-rtl" dir="rtl">
          {words.map((item, idx) => {
            const meta = IRAB_CASE_METADATA[item.irabCase];
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`px-5 py-3 rounded-xl border transition-all flex flex-col items-center ${
                  isSelected
                    ? "bg-white border-claude-terracotta shadow-md scale-105"
                    : "bg-white border-claude-border hover:border-claude-borderHover"
                }`}
              >
                <span className="font-arabic text-3xl text-slate-900 mb-1">{item.wordAr}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${meta.badgeClass}`}>
                  {meta.labelAr}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Word Details */}
        <div className="text-left p-4 bg-white border border-claude-border rounded-xl space-y-2 shadow-sm text-sm">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-claude-terracotta">
              Word: <span className="font-arabic text-xl text-slate-900 ml-2">{activeWord.wordAr}</span>
            </span>
            <span className="text-xs text-claude-textMuted">
              Meaning: <strong className="text-claude-textMain">{activeWord.meaningEn}</strong>
            </span>
          </div>
          <div className="text-xs">
            <span className="font-semibold text-claude-sage">Grammatical Role:</span> {activeWord.roleEn}
          </div>
          <p className="text-xs text-claude-textMuted border-t border-claude-border pt-2 mt-2">
            💡 {activeWord.explanationEn}
          </p>
        </div>
      </div>
    </div>
  );
}
