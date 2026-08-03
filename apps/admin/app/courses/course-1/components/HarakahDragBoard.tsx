"use client";

import React, { useState, useRef, useCallback } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

/* ─── Harakah Tokens ─────────────────────────────────── */

interface Token {
  id: string;
  symbol: string;
  display: string;
  name: string;
  color: string;
  bg: string;
  border: string;
}

const TOKENS: Token[] = [
  { id: "damma",       symbol: "ُ",  display: "ـُ",  name: "Damma — Marfoo'",      color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE" },
  { id: "kasra",       symbol: "ِ",  display: "ـِ",  name: "Kasra — Majroor",       color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
  { id: "fatha",       symbol: "َ",  display: "ـَ",  name: "Fatha — Mansoob",       color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
  { id: "tanween_u",   symbol: "ٌ",  display: "ـٌ",  name: "Tanween Damm",          color: "#C2410C", bg: "#FFF7ED", border: "#FED7AA" },
  { id: "tanween_i",   symbol: "ٍ",  display: "ـٍ",  name: "Tanween Kasr",          color: "#9D174D", bg: "#FDF2F8", border: "#FBCFE8" },
  { id: "tanween_a",   symbol: "ً",  display: "ـً",  name: "Tanween Fath",          color: "#B45309", bg: "#FFFBEB", border: "#FDE68A" },
  { id: "sukun",       symbol: "ْ",  display: "ـْ",  name: "Sukun — No vowel",     color: "#374151", bg: "#F9FAFB", border: "#E5E7EB" },
  { id: "shadda",      symbol: "ّ",  display: "ـّ",  name: "Shadda — Doubled",     color: "#065F46", bg: "#ECFDF5", border: "#A7F3D0" },
];

/* ─── Draggable Token ─────────────────────────────────── */

interface DraggableTokenProps {
  token: Token;
  dropRef: React.RefObject<HTMLDivElement>;
  onDrop: (tokenId: string) => void;
  isPlaced: boolean;
}

function DraggableToken({ token, dropRef, onDrop, isPlaced }: DraggableTokenProps) {
  const [{ x, y, scale, opacity }, api] = useSpring(() => ({
    x: 0, y: 0, scale: 1, opacity: 1,
    config: config.wobbly,
  }));

  const bind = useDrag(({ active, movement: [mx, my], xy: [px, py], last }) => {
    api.start({ x: active ? mx : 0, y: active ? my : 0, scale: active ? 1.15 : 1, immediate: active });

    if (last && dropRef.current) {
      const rect = dropRef.current.getBoundingClientRect();
      const inside =
        px >= rect.left && px <= rect.right && py >= rect.top && py <= rect.bottom;
      if (inside) {
        onDrop(token.id);
        // fly into the blank
        api.start({ x: 0, y: 0, scale: 1.3, opacity: 0.8 });
        setTimeout(() => api.start({ scale: 1, opacity: 1 }), 400);
      } else {
        api.start({ x: 0, y: 0, scale: 1 });
      }
    }
  }, { filterTaps: true });

  return (
    <animated.div
      {...bind()}
      style={{ x, y, scale, opacity, touchAction: "none" }}
      className="cursor-grab active:cursor-grabbing select-none"
    >
      <div
        className={`w-16 h-16 rounded-2xl border-2 flex flex-col items-center justify-center shadow-sm transition-all ${
          isPlaced ? "ring-2 ring-offset-1" : ""
        }`}
        style={{
          backgroundColor: token.bg,
          borderColor: token.border,
          ...(isPlaced ? { ringColor: token.color } : {}),
        }}
      >
        <span
          className="font-arabic text-3xl font-black leading-none"
          style={{ color: token.color }}
        >
          {token.display}
        </span>
        <span className="text-[8px] font-bold text-slate-400 mt-0.5 text-center leading-tight px-1">
          {token.name.split("—")[0].trim()}
        </span>
      </div>
    </animated.div>
  );
}

/* ─── Main Component ─────────────────────────────────── */

interface HarakahDragBoardProps {
  sentenceAr?: string;
  blankIndex?: number;
  baseWordAr?: string;
  correctTokenId?: string;
  onCorrect?: () => void;
}

export default function HarakahDragBoard({
  sentenceAr = "الْعِلْمُ {BLANK} فِي الْحَيَاةِ",
  blankIndex = 1,
  baseWordAr = "نُور",
  correctTokenId = "tanween_u",
  onCorrect,
}: HarakahDragBoardProps) {
  const dropRef = useRef<HTMLDivElement>(null);
  const [placedToken, setPlacedToken] = useState<Token | null>(null);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");

  const [feedbackSpring, feedbackApi] = useSpring(() => ({
    scale: 1, config: config.wobbly,
  }));

  const handleDrop = useCallback((tokenId: string) => {
    const token = TOKENS.find((t) => t.id === tokenId);
    if (!token) return;
    setPlacedToken(token);

    const isCorrect = tokenId === correctTokenId;
    setFeedback(isCorrect ? "correct" : "wrong");
    feedbackApi.start({ scale: isCorrect ? 1.2 : 0.9 });
    setTimeout(() => feedbackApi.start({ scale: 1 }), 400);
    if (isCorrect) onCorrect?.();
  }, [correctTokenId, feedbackApi, onCorrect]);

  const handleReset = () => {
    setPlacedToken(null);
    setFeedback("idle");
  };

  const sentenceParts = sentenceAr.split("{BLANK}");

  const dropBg =
    feedback === "correct" ? "#ECFDF5" : feedback === "wrong" ? "#FEF2F2" : "#F8FAF6";
  const dropBorder =
    feedback === "correct" ? "#86EFAC" : feedback === "wrong" ? "#FCA5A5" : "#CBD5E1";

  return (
    <div className="space-y-6">
      {/* Instruction */}
      <div className="text-center space-y-1">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Drag the correct Harakah to fill the blank
        </h3>
        <p className="text-[11px] text-slate-400">
          Drop the vowel mark that correctly ends the word <span className="font-arabic font-bold text-slate-700 dir-rtl" dir="rtl">{baseWordAr}</span>
        </p>
      </div>

      {/* Sentence Display */}
      <div className="flex items-center justify-center gap-4 py-6 px-4 bg-[#F8FAF6] rounded-2xl border border-slate-200">
        <span className="font-arabic text-3xl font-bold text-slate-900 dir-rtl" dir="rtl">
          {sentenceParts[1]?.trim()}
        </span>

        {/* Drop Zone */}
        <animated.div style={feedbackSpring}>
          <div
            ref={dropRef}
            className="min-w-[80px] h-16 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all"
            style={{ backgroundColor: dropBg, borderColor: dropBorder }}
          >
            {placedToken ? (
              <div className="text-center">
                <span className="font-arabic text-3xl font-black" style={{ color: placedToken.color }}>
                  {baseWordAr}{placedToken.symbol}
                </span>
                <p className="text-[8px] font-bold mt-0.5" style={{ color: placedToken.color }}>
                  {placedToken.display}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <span className="font-arabic text-2xl text-slate-300">{baseWordAr}___</span>
                <p className="text-[9px] text-slate-400 mt-0.5">Drop here</p>
              </div>
            )}
          </div>
        </animated.div>

        <span className="font-arabic text-3xl font-bold text-slate-900 dir-rtl" dir="rtl">
          {sentenceParts[0]?.trim()}
        </span>
      </div>

      {/* Feedback Banner */}
      {feedback !== "idle" && (
        <div
          className={`p-3 rounded-xl border text-center text-xs font-bold ${
            feedback === "correct"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {feedback === "correct"
            ? `✓ Correct! ${placedToken?.name} is right — ${baseWordAr}${placedToken?.symbol} is Marfoo'.`
            : `✗ Not quite. ${placedToken?.name} is incorrect here. Try again!`}
          <button onClick={handleReset} className="ml-3 underline text-[10px] opacity-70">
            Reset
          </button>
        </div>
      )}

      {/* Token Palette */}
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">
          Harakah Token Palette — Drag to the blank above
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {TOKENS.map((token) => (
            <DraggableToken
              key={token.id}
              token={token}
              dropRef={dropRef}
              onDrop={handleDrop}
              isPlaced={placedToken?.id === token.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
