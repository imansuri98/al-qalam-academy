"use client";

import React, { useState } from "react";
import { CheckCircle2, RotateCcw, Volume2, ArrowRight } from "lucide-react";

export interface QuestionData {
  id: string;
  sentenceAr: string;
  sentenceEn: string;
  options: string[];
  correctAnswer: string;
  grammaticalRuleEn: string;
  audioUrl?: string;
  speakerNameAr?: string;
}

export interface ExerciseData {
  id: string;
  exerciseType:
    | "TASHKEEL_PICKER"
    | "SENTENCE_REORDER"
    | "IRAB_PARSING"
    | "DIALOGUE_ROLEPLAY"
    | "AUDIO_MATCHING";
  titleAr: string;
  titleEn: string;
  instructionAr: string;
  instructionEn: string;
  questions: QuestionData[];
}

export interface ExerciseEngineProps {
  exercises: ExerciseData[];
}

export default function ExerciseEngine({ exercises }: ExerciseEngineProps) {
  const [activeExIdx, setActiveExIdx] = useState(0);
  const [activeQIdx, setActiveQIdx] = useState(0);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [unscrambledWords, setUnscrambledWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  /* 3-Step I'rab Parsing State */
  const [irabCaseState, setIrabCaseState] = useState<string>("");
  const [irabCaseSign, setIrabCaseSign]   = useState<string>("");
  const [irabGrammarRole, setIrabGrammarRole] = useState<string>("");

  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeEx = exercises[activeExIdx] || exercises[0];
  const activeQ = activeEx?.questions[activeQIdx];

  React.useEffect(() => {
    if (activeEx?.exerciseType === "SENTENCE_REORDER" && activeQ) {
      const words = activeQ.options;
      const shuffled = [...words].sort(() => 0.5 - Math.random());
      setAvailableWords(shuffled);
      setUnscrambledWords([]);
    } else {
      setAvailableWords([]);
      setUnscrambledWords([]);
    }
    setSelectedOption(null);
    setIrabCaseState("");
    setIrabCaseSign("");
    setIrabGrammarRole("");
    setIsAnswered(false);
  }, [activeExIdx, activeQIdx, activeEx]);

  if (!activeEx || !activeQ) {
    return (
      <div className="p-8 text-center bg-[#F8FAF6] rounded-2xl border border-[#E2E8F0] text-[#64748B]">
        No practice drills available. Select a course to start drills.
      </div>
    );
  }

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleTapAvailableWord = (word: string, index: number) => {
    if (isAnswered) return;
    setUnscrambledWords([...unscrambledWords, word]);
    setAvailableWords(availableWords.filter((_, idx) => idx !== index));
  };

  const handleTapUnscrambledWord = (word: string, index: number) => {
    if (isAnswered) return;
    setAvailableWords([...availableWords, word]);
    setUnscrambledWords(unscrambledWords.filter((_, idx) => idx !== index));
  };

  const handleSubmitAnswer = () => {
    if (isAnswered) return;

    let userCorrect = false;

    if (activeEx.exerciseType === "SENTENCE_REORDER") {
      const userSentenceComma = unscrambledWords.join(",").trim();
      const userSentenceSpace = unscrambledWords.join(" ").trim();
      const targetCorrect = activeQ.correctAnswer.trim();
      const targetSentenceAr = activeQ.sentenceAr.trim();

      userCorrect =
        userSentenceComma === targetCorrect ||
        userSentenceSpace === targetSentenceAr ||
        userSentenceComma === targetSentenceAr.split(/\s+/).join(",");
    } else if (activeEx.exerciseType === "IRAB_PARSING") {
      const targetCorrect = activeQ.correctAnswer.trim();
      userCorrect =
        (irabCaseState !== "" && targetCorrect.includes(irabCaseState)) ||
        (irabGrammarRole !== "" && targetCorrect.includes(irabGrammarRole)) ||
        (selectedOption !== null && selectedOption.trim() === targetCorrect);
    } else {
      userCorrect = selectedOption?.trim() === activeQ.correctAnswer.trim();
    }

    setIsCorrect(userCorrect);
    setIsAnswered(true);

    if (userCorrect) {
      setScoreCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (activeQIdx + 1 < activeEx.questions.length) {
      setActiveQIdx((prev) => prev + 1);
    } else if (activeExIdx + 1 < exercises.length) {
      setActiveExIdx((prev) => prev + 1);
      setActiveQIdx(0);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setActiveExIdx(0);
    setActiveQIdx(0);
    setScoreCount(0);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Exercise Unit Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-[#0F172A] uppercase tracking-wider mr-2">
            Practice Units:
          </span>
          {exercises.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => {
                setActiveExIdx(idx);
                setActiveQIdx(0);
                setIsCompleted(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeExIdx === idx
                  ? "bg-[#C2410C] text-white shadow-2xs"
                  : "bg-white text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]"
              }`}
            >
              Unit {idx + 1}: {ex.exerciseType.replace("_", " ")}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-[#64748B] bg-white px-3 py-1 rounded-md border border-[#E2E8F0]">
          Question {activeQIdx + 1} of {activeEx.questions.length}
        </span>
      </div>

      {/* COMPLETED CELEBRATION SCORECARD */}
      {isCompleted ? (
        <div className="bg-white border-2 border-[#C2410C] rounded-2xl p-8 text-center space-y-5 shadow-xs">
          <CheckCircle2 className="w-12 h-12 text-[#C2410C] mx-auto" />

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-[#0F172A]">
              Practice Suite Completed!
            </h2>
            <p className="text-xs text-[#64748B]">
              You answered <strong>{scoreCount}</strong> out of{" "}
              <strong>{activeEx.questions.length}</strong> questions correctly.
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl brand-button font-bold text-xs shadow-2xs inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Practice Drills</span>
          </button>
        </div>
      ) : (
        /* ACTIVE QUESTION CARD BUILDER */
        <div className="pro-card rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
          {/* Header & Instructions */}
          <div className="border-b border-[#E2E8F0] pb-4 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-arabic font-bold text-[#090D16] dir-rtl" dir="rtl">
                {activeEx.instructionAr}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F8FAF6] text-[#0F172A] border border-[#E2E8F0]">
                {activeEx.exerciseType.replace("_", " ")}
              </span>
            </div>

            <h3 className="text-xs font-bold text-[#0F172A]">
              {activeEx.instructionEn}
            </h3>
          </div>

          {/* QUESTION PROMPT CARD */}
          <div className="bg-[#F8FAF6] border border-[#E2E8F0] rounded-xl p-6 text-center space-y-3">
            {activeQ.speakerNameAr && (
              <span className="text-xs font-arabic font-bold text-[#C2410C] bg-white px-3 py-1 rounded-md border border-[#E2E8F0] inline-block dir-rtl" dir="rtl">
                🗣️ {activeQ.speakerNameAr}:
              </span>
            )}

            <span className="font-arabic text-3xl font-bold text-[#090D16] block dir-rtl leading-relaxed" dir="rtl">
              {activeEx.exerciseType === "TASHKEEL_PICKER" && selectedOption
                ? activeQ.sentenceAr.replace("____", selectedOption)
                : activeQ.sentenceAr}
            </span>

            <p className="text-xs text-[#475569] font-medium">
              {activeQ.sentenceEn}
            </p>

            {activeQ.audioUrl && (
              <button className="px-3 py-1 rounded-md bg-white border border-[#E2E8F0] text-[#0F172A] text-xs font-bold flex items-center justify-center gap-1.5 mx-auto">
                <Volume2 className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>Listen Audio</span>
              </button>
            )}
          </div>

          {/* DRILL TYPE 1: SENTENCE UNSCRAMBLER WORD BUBBLES */}
          {activeEx.exerciseType === "SENTENCE_REORDER" ? (
            <div className="space-y-5">
              <div className="min-h-[64px] p-4 rounded-xl bg-[#F8FAF6] border-2 border-dashed border-[#E2E8F0] flex flex-wrap items-center justify-center gap-2">
                {unscrambledWords.length === 0 ? (
                  <span className="text-xs text-[#64748B] font-medium">
                    Tap the vowelled word bubbles below to unscramble sentence in order...
                  </span>
                ) : (
                  unscrambledWords.map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTapUnscrambledWord(word, idx)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#C2410C] text-[#FFFFFF] font-arabic text-base font-bold shadow-2xs dir-rtl"
                      dir="rtl"
                    >
                      {word}
                    </button>
                  ))
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {availableWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTapAvailableWord(word, idx)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#C2410C] text-[#090D16] font-arabic text-base font-bold shadow-2xs transition-colors dir-rtl"
                    dir="rtl"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          ) : activeEx.exerciseType === "IRAB_PARSING" ? (
            /* DRILL TYPE: 3-STEP I'RAB SYNTACTIC BREAKDOWN */
            <div className="space-y-6 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-xs">
              {/* Live I'rab Formula Preview */}
              <div className="p-4 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] text-center space-y-1">
                <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider block">Live Syntactic Formula (الإِعْرَابُ)</span>
                <p className="font-arabic text-2xl font-black text-[#090D16] dir-rtl leading-relaxed" dir="rtl">
                  {irabCaseState || irabCaseSign || irabGrammarRole
                    ? `${irabGrammarRole} ${irabCaseState} ${irabCaseSign ? `وَعَلاَمَةُ إِعْرَابِهِ ${irabCaseSign}` : ""}`
                    : "Select Step 1, Step 2, and Step 3 below..."}
                </p>
              </div>

              {/* STEP 1: Case State */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#0F172A]">Step 1: Grammatical Case State (حَالَةُ الإِعْرَابِ)</span>
                  <span className="text-[10px] font-mono text-[#C2410C] font-bold">{irabCaseState || "Not selected"}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["مَرْفُوعٌ (Marfoo')", "مَنْصُوبٌ (Mansoob')", "مَجْرُورٌ (Majroor')", "مَجْزُومٌ (Majzoom')"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setIrabCaseState(item.split(" ")[0])}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        irabCaseState === item.split(" ")[0]
                          ? "bg-[#C2410C] text-white border-[#C2410C] shadow-2xs"
                          : "bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#C2410C]"
                      }`}
                    >
                      <span className="font-arabic text-base font-bold block dir-rtl" dir="rtl">{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 2: Case Sign */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#0F172A]">Step 2: Sign of Case (عَلاَمَةُ الإِعْرَابِ)</span>
                  <span className="text-[10px] font-mono text-[#C2410C] font-bold">{irabCaseSign || "Not selected"}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["الضَّمَّةُ (Damma)", "الْفَتْحَةُ (Fatha)", "الْكَسْرَةُ (Kasra)", "السُّكُونُ (Sukoon)", "الْوَاوُ (Waw)", "الْيَاءُ (Ya')", "الْأَلِيفُ (Alif)", "النُّونُ (Nun)"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setIrabCaseSign(item.split(" ")[0])}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        irabCaseSign === item.split(" ")[0]
                          ? "bg-[#C2410C] text-white border-[#C2410C] shadow-2xs"
                          : "bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#C2410C]"
                      }`}
                    >
                      <span className="font-arabic text-base font-bold block dir-rtl" dir="rtl">{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 3: Grammatical Role / Reason */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#0F172A]">Step 3: Grammatical Role / Reason (الْمَوْقِعُ الأَعْرَابِيُّ)</span>
                  <span className="text-[10px] font-mono text-[#C2410C] font-bold">{irabGrammarRole || "Not selected"}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["مُبْتَدَأٌ (Mubtada')", "خَبَرٌ (Khabar)", "فَاعِلٌ (Fa'il)", "مَفْعُولٌ بِهِ (Ma'ful Bihi)", "اسْمُ إِنَّ (Ism Inna)", "خَبَرُ كَانَ (Khabar Kana)", "اسْمٌ مَجْرُورٌ (Genitive Noun)", "ظَرْفٌ (Adverb)"].map((item) => (
                    <button
                      key={item}
                      onClick={() => setIrabGrammarRole(item.split(" ")[0])}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                        irabGrammarRole === item.split(" ")[0]
                          ? "bg-[#C2410C] text-white border-[#C2410C] shadow-2xs"
                          : "bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#C2410C]"
                      }`}
                    >
                      <span className="font-arabic text-base font-bold block dir-rtl" dir="rtl">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : activeEx.exerciseType === "TASHKEEL_PICKER" ? (
            /* DRILL TYPE 2: TASHKEEL HARAKAH PICKER (Damma, Fatha, Kasra, Tanween) */
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">
                  Select the Correct Final Case Vowel Ending:
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(activeQ.options.length > 0 ? activeQ.options : ["ـُ (Damma)", "ـَ (Fatha)", "ـِ (Kasra)", "ـٌ (Tanween Damma)"]).map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  let btnStyle = "bg-[#FFFFFF] border-[#E2E8F0] text-[#090D16] hover:border-[#C2410C]";

                  if (isAnswered) {
                    if (opt.trim() === activeQ.correctAnswer.trim()) {
                      btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "bg-rose-50 border-rose-400 text-rose-900";
                    }
                  } else if (isSelected) {
                    btnStyle = "bg-[#FFF7ED] border-[#C2410C] text-[#C2410C] font-black scale-105";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-4 rounded-xl border text-center transition-all shadow-2xs ${btnStyle}`}
                    >
                      <span className="font-arabic text-2xl font-black block dir-rtl" dir="rtl">
                        {opt.trim()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* DRILL TYPE 3: STANDARD OPTIONS */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeQ.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                let btnStyle = "bg-[#FFFFFF] border-[#E2E8F0] text-[#090D16] hover:border-[#C2410C]";

                if (isAnswered) {
                  if (opt.trim() === activeQ.correctAnswer.trim()) {
                    btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-50 border-rose-400 text-rose-900";
                  }
                } else if (isSelected) {
                  btnStyle = "bg-[#FFF7ED] border-[#C2410C] text-[#C2410C] font-bold";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-3.5 rounded-xl border text-center transition-all shadow-2xs ${btnStyle}`}
                  >
                    <span className="font-arabic text-lg font-bold block dir-rtl" dir="rtl">
                      {opt.trim()}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* ANSWER FEEDBACK & GRAMMATICAL RULE */}
          {isAnswered && (
            <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAF6] text-xs leading-relaxed text-[#475569] space-y-1">
              <div className="font-extrabold text-[#0F172A]">
                {isCorrect ? "✓ Correct Answer!" : "✕ Incorrect"}
              </div>
              <p>
                <strong>Grammar Rule:</strong> {activeQ.grammaticalRuleEn}
              </p>
            </div>
          )}

          {/* ACTION SUBMIT & NEXT BUTTONS */}
          <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
            <span className="text-xs text-[#64748B] font-semibold">
              Score: {scoreCount} / {activeEx.questions.length}
            </span>

            {!isAnswered ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={
                  activeEx.exerciseType === "SENTENCE_REORDER"
                    ? unscrambledWords.length === 0
                    : !selectedOption
                }
                className="px-5 py-2.5 rounded-xl brand-button disabled:opacity-50 font-bold text-xs shadow-2xs"
              >
                Check Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl brand-button font-bold text-xs shadow-2xs flex items-center gap-1.5"
              >
                <span>{activeQIdx + 1 < activeEx.questions.length ? "Next Question" : "Finish Suite"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
