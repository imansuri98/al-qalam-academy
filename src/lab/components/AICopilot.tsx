"use client";
import React, { useState } from 'react';
import { Sparkles, Brain, Loader2, HelpCircle, BookOpen, Check, AlertCircle } from 'lucide-react';

interface AnalysisResult {
  translation?: string;
  classification?: string;
  root?: string;
  gender?: string;
  caseEnding?: string;
  explanation?: string;
}

const SAMPLE_PHRASES = [
  { text: 'كَتَبَ الْوَلَدُ الدَّرْسَ', label: 'The boy wrote the lesson.' },
  { text: 'فِي الْمَسْجِدِ', label: 'In the mosque.' },
  { text: 'طَالِبَةٌ صَالِحَةٌ', label: 'A pious female student.' },
  { text: 'سَيَنْصُرُ اللهُ الْمُؤْمِنِينَ', label: 'Allah will help the believers.' },
];

export default function AICopilot() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (textToAnalyze: string) => {
    if (!textToAnalyze.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/analyze-arabic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToAnalyze }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Server returned an error');
      }

      const data = await response.json();
      setResult(data);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Verification connection issues occurred. Ensure your GEMINI_API_KEY config is established in your Settings panel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm border border-slate-800" id="ai-copilot-container">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600/30 p-2.5 rounded-xl border border-indigo-500/25">
          <Brain className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <span className="inline-block text-[10px] tracking-widest font-black uppercase text-indigo-400">
            PRO STUDY COPILOT
          </span>
          <h2 className="text-lg font-bold tracking-tight">AI Quranic Grammar Assistant</h2>
        </div>
      </div>

      <p className="text-slate-400 text-xs leading-relaxed">
        Curious about how a specific Quranic word or phrase is constructed? Enter any Classical Arabic text below to decompose its exact categories, suffix case endings, and root verbs instantly.
      </p>

      {/* Inputs box */}
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type any word or phrase (e.g. فِي الْبَيْتِ or كَتَبَ)..."
            rows={3}
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-600 font-serif leading-relaxed focus:outline-hidden transition-all"
          />
          <button
            onClick={() => handleAnalyze(inputText)}
            disabled={loading || !inputText.trim()}
            className="absolute right-3.5 bottom-3.5 flex items-center gap-1.5 px-4.5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-xs font-bold rounded-lg text-white transition-all transition-duration-150"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Explain Syntax
              </>
            )}
          </button>
        </div>

        {/* Suggestion tags */}
        <div className="space-y-2">
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">
            Or Click a Sample Classical Phrase:
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_PHRASES.map((ph, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(ph.text);
                  handleAnalyze(ph.text);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-850 hover:text-white border border-slate-800 text-[11px] text-slate-300 font-medium transition-all"
              >
                <span className="font-serif block text-slate-200 text-left mb-0.5">{ph.text}</span>
                <span className="text-[9px] text-slate-500 font-sans block text-left">{ph.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Output Card */}
      {error && (
        <div className="bg-amber-900/35 border border-amber-800/40 p-4 rounded-xl flex gap-3 text-xs text-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-1">Copilot Analysis Limit</span>
            <p className="leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      {/* Interactive Result Card */}
      {result && (
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 animate-fade-in">
          <div className="border-b border-slate-850 pb-3 flex justify-between items-center">
            <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400">Analysis Breakdown</span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-indigo-500/10 text-indigo-300 font-semibold px-2 py-0.5 rounded">
              <Check className="w-3 h-3" /> Grammatically Verified
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/50">
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-black">Translation</span>
              <span className="text-xs font-semibold text-slate-200 mt-1 block leading-tight">
                {result.translation || 'None provided'}
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/50">
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-black">Classification</span>
              <span className="text-xs font-bold text-indigo-400 mt-1 block">
                {result.classification || 'Ism (Noun)'}
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/50">
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-black">Root Letters</span>
              <span className="text-xs font-semibold text-slate-200 mt-1 block">
                {result.root || 'N/A'}
              </span>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/50">
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-black">Case state / Ending</span>
              <span className="text-xs font-semibold text-emerald-400 mt-1 block">
                {result.caseEnding || 'N/A'}
              </span>
            </div>
          </div>

          {result.explanation && (
            <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850/50 space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest text-indigo-300 font-extrabold block">Grammarian commentary:</span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium whitespace-pre-line">
                {result.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
