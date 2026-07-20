"use client";
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { Check, X, Award, HelpCircle, CheckCircle, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';

interface QuizSectionProps {
  questions: QuizQuestion[];
  slug: string;
  onCompleteQuiz: (slug: string, score: number) => void;
  previousScore?: number;
}

export default function QuizSection({ questions, slug, onCompleteQuiz, previousScore }: QuizSectionProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answersLog, setAnswersLog] = useState<Array<{ q: string; isCorrect: boolean; selected: string; correct: string }>>([]);

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center space-y-3">
        <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
        <h3 className="text-base font-bold text-slate-800">No Assessment Loaded</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">This particular introduction chapter represents absolute foundational basics and features no complex multi-choice quiz.</p>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  const handleOptionClick = (opt: string) => {
    if (isAnswered) return;
    setSelectedOpt(opt);
  };

  const handleSubmit = () => {
    if (!selectedOpt || isAnswered) return;

    const isCorrect = selectedOpt === currentQ.correctAnswer;
    setIsAnswered(true);

    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setAnswersLog((log) => [
      ...log,
      {
        q: currentQ.prompt,
        isCorrect,
        selected: selectedOpt,
        correct: currentQ.correctAnswer,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((idx) => idx + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      const finalPct = Math.round((score / questions.length) * 100);
      onCompleteQuiz(slug, finalPct);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setAnswersLog([]);
  };

  if (quizFinished) {
    const finalPct = Math.round((score / questions.length) * 100);
    const passed = finalPct >= 70;

    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-6" id="quiz-finish-block">
        <div className="text-center space-y-3 max-w-md mx-auto">
          <div className="inline-flex items-center justify-center p-4 bg-indigo-50 text-indigo-600 rounded-full mb-2">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">Quiz Completed!</h2>
          <p className="text-xs text-slate-500">You completed the foundation assessment checking your comprehension of syntax.</p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-2 gap-4">
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest">Your Score</span>
              <span className={`text-2xl font-bold ${passed ? 'text-emerald-600' : 'text-amber-600'}`}>
                {finalPct}%
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest">Questions Passed</span>
              <span className="text-2xl font-bold text-slate-800">
                {score} / {questions.length}
              </span>
            </div>
          </div>

          <div className="pt-2">
            {passed ? (
              <div className="bg-emerald-50 rounded-xl p-3 text-left text-xs text-emerald-800 border border-emerald-100">
                🎉 <span className="font-bold">Excellent Work!</span> You passed the benchmark. This chapter is unlocked and completed in your profile track.
              </div>
            ) : (
              <div className="bg-amber-50 rounded-xl p-3 text-left text-xs text-amber-800 border border-amber-100">
                ⚠️ <span className="font-bold">Study recommendation:</span> We recommend scoring at least 70% to fully commit this rule to memory. Feel free to retake this anytime!
              </div>
            )}
          </div>
        </div>

        {/* Detailed Breakdown Log */}
        <div className="border-t border-slate-100 pt-6 mt-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">Assessment Breakdown</h3>
          <div className="space-y-2.5">
            {answersLog.map((logItem, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                  logItem.isCorrect ? 'bg-emerald-50/20 border-emerald-100' : 'bg-red-50/25 border-red-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Question {idx + 1}</span>
                  <span className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                    logItem.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {logItem.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-slate-655 font-medium leading-relaxed">{logItem.q}</p>
                <p className="text-[11px] text-slate-500">
                  <span className="font-semibold">Selected answer:</span> {logItem.selected}
                  {!logItem.isCorrect && (
                    <span className="block text-slate-600 mt-1">
                      <span className="font-bold text-emerald-700">Correct answer:</span> {logItem.correct}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={resetQuiz}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-xl transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-6 animate-fade-in" id="active-quiz-block">
      {/* Quiz Progress Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div>
          <span className="block text-[10px] uppercase font-black tracking-widest text-slate-400">Current Question</span>
          <span className="text-sm font-bold text-slate-850">
            {currentIdx + 1} of {questions.length} Quiz Challenges
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-12 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg flex items-center justify-center">
            {score} pts
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Dynamic Prompt with dual script styling */}
        <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight leading-relaxed">
          {currentQ.prompt}
        </h3>

        {/* If question has sentence details, render it nicely */}
        {currentQ.details?.sentence && (
          <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-100">
            <span className="font-serif text-2xl font-bold tracking-wide text-slate-800 leading-normal">
              {currentQ.details.sentence}
            </span>
          </div>
        )}

        {/* Dynamic Option list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
          {currentQ.options?.map((opt, idx) => {
            const isSelected = selectedOpt === opt;
            const belongsToCorrect = opt === currentQ.correctAnswer;

            let optStyle = 'border-slate-100 hover:border-slate-200 bg-slate-50/40 text-slate-700';
            if (isAnswered) {
              if (belongsToCorrect) {
                optStyle = 'border-emerald-500 bg-emerald-50/50 text-emerald-900 font-semibold';
              } else if (isSelected) {
                optStyle = 'border-red-300 bg-red-50/30 text-red-900';
              } else {
                optStyle = 'border-slate-100 opacity-60 text-slate-400';
              }
            } else if (isSelected) {
              optStyle = 'border-indigo-500 bg-indigo-50/50 text-indigo-900 font-semibold';
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(opt)}
                disabled={isAnswered}
                className={`w-full p-4 text-left rounded-xl border text-xs sm:text-sm transition-all focus:outline-hidden ${optStyle}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={/[\u0600-\u06FF]/.test(opt) ? 'font-serif text-lg font-bold' : ''}>
                      {opt}
                    </span>
                  </div>

                  {isAnswered && belongsToCorrect && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !belongsToCorrect && (
                    <X className="w-5 h-5 text-red-500 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Answer feedback & Explanation drawer */}
      {isAnswered && (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-2 animate-slide-up">
          <div className="flex items-center gap-2">
            {selectedOpt === currentQ.correctAnswer ? (
              <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-2 py-0.5 rounded">Correct Response</span>
            ) : (
              <span className="text-red-700 font-bold text-xs bg-red-105 px-2 py-0.5 rounded">Inaccurate Response</span>
            )}
          </div>
          {currentQ.explanation && (
            <p className="text-xs text-slate-600 leading-relaxed pt-1 font-medium">
              <span className="font-bold text-slate-800">Explanation:</span> {currentQ.explanation}
            </p>
          )}
        </div>
      )}

      {/* Controls Bar Footer */}
      <div className="flex justify-between items-center border-t border-slate-100 pt-5 mt-4">
        <div>
          {previousScore !== undefined && (
            <span className="text-[10px] text-slate-400 font-semibold block">
              Previous attempt best score: {previousScore}%
            </span>
          )}
        </div>

        <div className="flex gap-2">
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOpt}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                selectedOpt
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              Verify Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
            >
              {currentIdx + 1 < questions.length ? 'Next Question' : 'Complete Assessment'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
