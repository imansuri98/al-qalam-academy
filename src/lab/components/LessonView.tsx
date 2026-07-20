"use client";
import React from 'react';
import { Chapter, LessonContent } from '../types';
import { Info, BookOpen, ChevronRight, CheckCircle2, Star, Play, CircleDot, ArrowRight, HelpCircle, GraduationCap } from 'lucide-react';
import QuizSection from './QuizSection';
import CaseSimulator from './CaseSimulator';
import VerbConjugator from './VerbConjugator';
import AmrNahiConjugator from './AmrNahiConjugator';
import ChapterFocusLab from './ChapterFocusLab';

interface LessonViewProps {
  chapter: Chapter;
  activeTab: 'lessons' | 'lab' | 'playground' | 'quiz';
  setActiveTab: (tab: 'lessons' | 'lab' | 'playground' | 'quiz') => void;
  completed: boolean;
  onCompleteQuiz: (slug: string, score: number) => void;
  previousScore?: number;
}

export default function LessonView({
  chapter,
  activeTab,
  setActiveTab,
  completed,
  onCompleteQuiz,
  previousScore,
}: LessonViewProps) {
  return (
    <div className="space-y-8" id="lesson-view-panel">
      {/* Lesson Header */}
      <div className="bg-radial from-indigo-50/50 to-white p-6 sm:p-8 rounded-2xl border border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 rounded-md">
                Chapter {chapter.id}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">
                Category: {chapter.category}
              </span>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight font-serif">
                {chapter.title}
              </h1>
              {chapter.arabicTitle && (
                <span className="font-serif text-xl sm:text-2xl text-indigo-600 font-bold" dir="rtl">
                  {chapter.arabicTitle}
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm mt-2 max-w-2xl leading-relaxed">
              {chapter.summary}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 bg-slate-50 border border-slate-100 p-3 rounded-xl">
            <div className="bg-indigo-600 text-white rounded-lg p-2 font-bold font-serif text-lg">
              ع
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-black">Platform Mode</span>
              <span className="block text-xs font-semibold text-slate-700">Classical Grammar</span>
            </div>
          </div>
        </div>
        {/* Local Chapter Nav Tabs - Topic Quiz comes before Playground & Simulator */}
        <div className="flex border-b border-slate-150 mt-8 gap-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              setActiveTab('lessons');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`pb-3 text-sm font-semibold tracking-wide transition-all border-b-2 outline-hidden cursor-pointer shrink-0 ${
              activeTab === 'lessons'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Lessons ({chapter.lessons.length})
          </button>

          <button
            onClick={() => {
              setActiveTab('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`pb-3 text-sm font-semibold tracking-wide transition-all border-b-2 outline-hidden cursor-pointer shrink-0 ${
              activeTab === 'quiz'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Topic Quiz
            {completed && (
              <span className="ml-1.5 inline-flex items-center justify-center bg-emerald-500 text-white rounded-full w-3.5 h-3.5 text-[8px] font-black">
                ✓
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('lab');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`pb-3 text-sm font-semibold tracking-wide transition-all border-b-2 outline-hidden cursor-pointer shrink-0 flex items-center gap-1.5 ${
              activeTab === 'lab'
                ? 'border-emerald-600 text-emerald-600 font-black'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Interactive Lab
            <span className="px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-sm">
              NEW
            </span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('playground');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`pb-3 text-sm font-semibold tracking-wide transition-all border-b-2 outline-hidden cursor-pointer shrink-0 ${
              activeTab === 'playground'
                ? 'border-indigo-600 text-indigo-600 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Playground & Simulator
          </button>
        </div>
      </div>

      {/* Render selected mode */}
      {activeTab === 'lessons' && (
        <div className="space-y-6 animate-fade-in">
          {chapter.lessons.map((lesson, idx) => (
            <div
              key={lesson.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-md/5 transition-all p-6 sm:p-8 space-y-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 text-[9px] font-extrabold text-indigo-650 bg-indigo-50 border border-indigo-110 rounded-sm">
                  Lesson {chapter.id}.{idx + 1}
                </span>
                <span className="text-slate-300 select-none">•</span>
                <div className="flex items-center gap-2">
                  <CircleDot className="w-4 h-4 text-indigo-500 shrink-0" />
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight">
                    {lesson.title}
                  </h3>
                </div>
              </div>

              {lesson.text && (
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {lesson.text}
                </p>
              )}

              {/* Lists format */}
              {lesson.list && (
                <div className="bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-100 space-y-2">
                  {lesson.list.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex gap-2.5 items-start text-xs text-slate-700">
                      <span className="font-bold text-indigo-600 mt-0.5">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Rendering Custom Dynamic Tables */}
              {lesson.type === 'table' && lesson.tableHeaders && lesson.tableRows && (
                <div className="overflow-x-auto rounded-xl border border-slate-100">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-150">
                        {lesson.tableHeaders.map((hdr, i) => (
                          <th key={i} className="px-4 py-3 font-semibold text-slate-600 tracking-wider">
                            {hdr}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {lesson.tableRows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-slate-50/50">
                          {row.map((cell, cellIdx) => {
                            // Check if cell is an Arabic string
                            const isArabic = /[\u0600-\u06FF]/.test(cell);
                            return (
                              <td
                                key={cellIdx}
                                className={`px-4 py-3 text-slate-700 font-medium ${
                                  isArabic ? 'font-serif text-lg font-bold text-slate-900 text-right sm:text-left' : ''
                                }`}
                              >
                                {cell}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Warning/Alert message cards */}
              {lesson.alertMessage && (
                <div className="flex gap-3 bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 text-indigo-900">
                  <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold mb-0.5">Grammar Rule Alert</span>
                    <p className="text-xs text-indigo-800 leading-relaxed">{lesson.alertMessage}</p>
                  </div>
                </div>
              )}

              {/* Interactive Examples cards */}
              {lesson.examples && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lesson.examples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
                    >
                      <div>
                        <span className="font-serif text-xl font-black text-slate-900 block tracking-wide">
                          {ex.arabic}
                        </span>
                        {ex.transliteration && (
                          <span className="text-[10px] text-slate-400 font-mono block mt-1">
                            /{ex.transliteration}/
                          </span>
                        )}
                        <span className="text-xs font-semibold text-slate-700 block mt-2">
                          Meaning: <span className="text-slate-500 font-normal">{ex.meaning}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Quiz Completion Challenge Call-To-Action (Draws attention to Topic Quiz) */}
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-slate-150 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg border border-indigo-500/20 relative overflow-hidden">
            <div className="space-y-1.5 relative z-10">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                ⭐ CHAPTER COMPLETION CHALLENGE ⭐
              </span>
              <h4 className="text-base sm:text-lg font-black text-white tracking-tight">
                Ready to prove your Classical Arabic mastery?
              </h4>
              <p className="text-slate-400 text-xs max-w-md leading-relaxed">
                Step up to the plate and unlock pure satisfaction! Complete the <span className="text-indigo-300 font-bold">Chapter Quiz Challenge</span> now, lock in your newfound grammatical knowledge, and level up your Arabic journey! 🚀
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                document.getElementById('lesson-view-panel')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.02] transform text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30 font-sans cursor-pointer relative z-10 shrink-0"
            >
              Take Quiz Challenge!
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/10 to-transparent pointer-events-none" />
          </div>

          {/* Sandbox Playground Secondary Call-To-Action */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
            <div>
              <h4 className="text-base sm:text-lg font-bold tracking-tight">Finished absorbing the grammar rules?</h4>
              <p className="text-slate-400 text-xs mt-1 max-w-md">
                Launch the Interactive Sandbox / Conjugator Playground to test how the suffix cases morph.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('playground');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                document.getElementById('lesson-view-panel')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
            >
              Go to Simulator Block
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'lab' && (
        <div className="space-y-6 animate-fade-in">
          <ChapterFocusLab chapter={chapter} />
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="space-y-6 animate-fade-in">
          <QuizSection
            questions={chapter.quiz}
            slug={chapter.slug}
            onCompleteQuiz={onCompleteQuiz}
            previousScore={previousScore}
          />
        </div>
      )}

      {activeTab === 'playground' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Sandbox Playground</span>
                <h2 className="text-xl font-bold text-slate-800 tracking-tight mt-0.5">Interactive Arabic Labs</h2>
              </div>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-2xl font-sans">
              Test Arabic suffix conjugations, grammar case endings, and root verbs instantly in the simulator dashboard. Review lessons to map concepts directly to these tables.
            </p>
          </div>

          <CaseSimulator />
          <VerbConjugator />
          <AmrNahiConjugator />
        </div>
      )}
    </div>
  );
}

