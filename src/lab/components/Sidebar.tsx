"use client";
import React from 'react';
import { Chapter } from '../types';
import { Search, BookOpen, CheckCircle, Award, Compass } from 'lucide-react';

interface SidebarProps {
  chapters: Chapter[];
  activeChapterIdx: number;
  setActiveChapterIdx: (idx: number) => void;
  completedChapters: number[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Sidebar({
  chapters,
  activeChapterIdx,
  setActiveChapterIdx,
  completedChapters,
  searchQuery,
  setSearchQuery,
}: SidebarProps) {
  // Group chapters by category
  const categories: Array<'Nouns & Basics' | 'Sentences' | 'Verbs & Conjugations' | 'Particles'> = [
    'Nouns & Basics',
    'Sentences',
    'Verbs & Conjugations',
    'Particles',
  ];

  const filteredChapters = chapters.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100" id="sidebar-panel">
      {/* Platform Title */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-605 bg-gradient-to-r from-emerald-600 to-teal-700 p-2 rounded-lg text-white font-serif font-extrabold text-lg">
            ع
          </div>
          <div>
            <h1 className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-emerald-400">🕌 Darul Uloom Academey</h1>
            <span className="text-[10px] text-slate-400">Quranic & Classical Arabic</span>
          </div>
        </div>
      </div>

      {/* Course Progress Mini Tracker */}
      <div className="p-4 bg-slate-800/45 border-b border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            Module Progress
          </span>
          <span className="text-xs font-bold text-indigo-400">
            {completedChapters.length} / {chapters.length} Done
          </span>
        </div>
        <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-indigo-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(completedChapters.length / chapters.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Fast Search input */}
      <div className="p-4 border-b border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search rules, verbs, etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-800 hover:bg-slate-800/80 focus:bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden transition-all"
          />
        </div>
      </div>

      {/* Chapters Index List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">
        {categories.map((category) => {
          const catChapters = filteredChapters.filter((c) => c.category === category);
          if (catChapters.length === 0) return null;

          return (
            <div key={category} className="space-y-1.5">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 block px-2.5 mb-1.5">
                {category}
              </span>

              <div className="space-y-1">
                {catChapters.map((cb) => {
                  const globalIdx = chapters.findIndex((c) => c.id === cb.id);
                  const isActive = activeChapterIdx === globalIdx;
                  const isCompleted = completedChapters.includes(cb.id);

                  return (
                    <button
                      key={cb.id}
                      onClick={() => setActiveChapterIdx(globalIdx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${
                        isActive
                          ? 'bg-indigo-600/90 text-white shadow-xs font-medium'
                          : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <span className="font-mono text-xs text-indigo-400 font-bold">
                          {String(cb.id).padStart(2, '0')}
                        </span>
                        <div className="truncate">
                          <span className={`block text-xs truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                            {cb.title}
                          </span>
                          <span className="block text-[10px] text-slate-400 truncate mt-0.5">
                            {cb.subtitle}
                          </span>
                        </div>
                      </div>

                      {isCompleted && (
                        <CheckCircle className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-200' : 'text-emerald-500'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredChapters.length === 0 && (
          <div className="text-center py-6 text-slate-500 space-y-1">
            <Compass className="w-8 h-8 mx-auto mb-2 text-slate-600" />
            <p className="text-xs font-semibold">No lessons found</p>
            <p className="text-[10px]">Try typing a different keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
}
