"use client";
import React, { useState, useEffect } from 'react';
import { Chapter, UserProgress } from './types';
import { chaptersData } from './chaptersData';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import QuizSection from './components/QuizSection';
import VerbConjugator from './components/VerbConjugator';
import CaseSimulator from './components/CaseSimulator';
import AICopilot from './components/AICopilot';
import { BookOpen, Sparkles, Award, GraduationCap, Flame, Menu, X, ArrowLeft, ArrowRight, HelpCircle, GraduationCap as CapIcon } from 'lucide-react';

export default function App() {
  const [chapters] = useState<Chapter[]>(chaptersData);
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'lessons' | 'lab' | 'playground' | 'quiz'>('lessons');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // User Profile Progress with LocalStorage saving
  const [progress, setProgress] = useState<UserProgress>({
    completedChapters: [],
    quizScores: {},
    overallPoints: 0,
    streakCount: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem('classical_arabic_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) setProgress(parsed);
      } catch (e) {
        console.error('Error parsed saved progress:', e);
      }
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('classical_arabic_progress', JSON.stringify(newProgress));
  };

  const handleCompleteQuiz = (chapterSlug: string, score: number) => {
    const currentChapter = chapters[activeChapterIdx];
    const isAlreadyCompleted = progress.completedChapters.includes(currentChapter.id);

    let updatedCompleted = [...progress.completedChapters];
    if (score >= 70 && !isAlreadyCompleted) {
      updatedCompleted.push(currentChapter.id);
    }

    const updatedScores = {
      ...progress.quizScores,
      [chapterSlug]: Math.max(progress.quizScores[chapterSlug] || 0, score),
    };

    const newPoints = progress.overallPoints + (isAlreadyCompleted ? 15 : 100);

    // Calculate streak count correctly with calendar day logic
    const todayStr = new Date().toISOString().split('T')[0];
    let newStreak = progress.streakCount;

    if (progress.lastActiveDate !== todayStr) {
      if (!progress.lastActiveDate) {
        // First ever lesson/quiz completed on the first day gets a 1-day streak
        newStreak = 1;
      } else {
        const lastDate = new Date(progress.lastActiveDate);
        const todayDate = new Date(todayStr);
        const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Consecutive active day
          newStreak = progress.streakCount + 1;
        } else if (diffDays > 1) {
          // Break in sequence, reset to 1
          newStreak = 1;
        }
      }
    }

    saveProgress({
      ...progress,
      completedChapters: updatedCompleted,
      quizScores: updatedScores,
      overallPoints: newPoints,
      streakCount: newStreak,
      lastActiveDate: todayStr,
    });
  };

  const currentChapter = chapters[activeChapterIdx];
  const isCompleted = progress.completedChapters.includes(currentChapter.id);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans" id="learn-arabic-app">
      {/* 1. Mobile Sidebar Drawer Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/45 dark:bg-slate-950/70 z-40 lg:hidden"
        />
      )}

      {/* 2. Responsive Side Navigation Panel */}
      <div
        className={`fixed inset-y-0 left-0 w-72 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 lg:z-10 h-full`}
      >
        <Sidebar
          chapters={chapters}
          activeChapterIdx={activeChapterIdx}
          setActiveChapterIdx={(idx) => {
            setActiveChapterIdx(idx);
            setActiveTab('lessons');
            setSidebarOpen(false); // Close on selection for mobile
          }}
          completedChapters={progress.completedChapters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* 3. Main Workspace and Course viewer */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Workspace Top Toolbar */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-50 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Curriculum standard:</span>
              <span className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-150 font-bold uppercase rounded-lg">
                🕌 Darul Uloom Classical Standard
              </span>
            </div>
          </div>

          {/* Point Counter / Badges */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-xs font-bold shadow-xs">
              <Flame className="w-4 h-4 text-orange-600 animate-bounce" />
              <span>{progress.streakCount} Day Streak</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block">Total Experience</span>
                <span className="text-xs font-extrabold text-slate-700">{progress.overallPoints} XP</span>
              </div>
              <div className="bg-indigo-600 text-white rounded-full p-2">
                <CapIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Workspace Container */}
        <main className="flex-1 overflow-y-auto min-h-0 bg-slate-50/50 p-4 sm:p-6 lg:p-8 space-y-8 custom-scrollbar">
          {/* Welcome Alert Card (Prominent only on startup) */}
          {activeChapterIdx === 0 && activeTab === 'lessons' && (
            <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-2 relative z-10 z-index-10">
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-extrabold tracking-widest text-emerald-400">
                  🕌 Darul Uloom Academic Path
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-serif tracking-tight leading-tight">
                  Learn Classical Quranic Arabic
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed font-sans">
                  Welcome to our premier grammar tracks. Guided step-by-step with simple, clear, and interactive modules crafted alongside classical Islamic curriculum guidelines. Perfect for mastering the language of the Holy Quran!
                </p>
              </div>
              <div className="shrink-0 relative z-10 flex gap-4">
                <button
                  onClick={() => {
                    // Quick scroll to conjugator
                    document.getElementById('conjugator-container')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Explore verb conjugations
                </button>
              </div>
              <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial from-indigo-700/10 to-transparent pointer-events-none" />
            </div>
          )}

          {/* Render Core Chapter Module Block */}
          <LessonView
            chapter={currentChapter}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            completed={isCompleted}
            onCompleteQuiz={handleCompleteQuiz}
            previousScore={progress.quizScores[currentChapter.slug]}
          />

          {/* AI Copilot integrated companion */}
          <AICopilot />

          {/* Bottom simple and elegant pagination footer */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-12 mb-6">
            <button
              onClick={() => {
                if (activeChapterIdx > 0) {
                  setActiveChapterIdx((idx) => idx - 1);
                  setActiveTab('lessons');
                }
              }}
              disabled={activeChapterIdx === 0}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                activeChapterIdx === 0
                  ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                  : 'border-slate-100 text-slate-600 hover:bg-white hover:border-slate-200'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous Lesson
            </button>

            <span className="text-xs font-semibold text-slate-500">
              Chapter {currentChapter.id} • Topic {activeChapterIdx + 1} of {chapters.length}
            </span>

            <button
              onClick={() => {
                if (activeChapterIdx + 1 < chapters.length) {
                  setActiveChapterIdx((idx) => idx + 1);
                  setActiveTab('lessons');
                }
              }}
              disabled={activeChapterIdx + 1 === chapters.length}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                activeChapterIdx + 1 === chapters.length
                  ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                  : 'border-slate-100 text-indigo-650 hover:bg-white hover:border-indigo-100'
              }`}
            >
              Next Lesson
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
