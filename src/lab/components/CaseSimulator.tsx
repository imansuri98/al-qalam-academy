"use client";
import React, { useState } from 'react';
import { Sparkles, Info, HelpCircle, ArrowRightLeft, BookOpen, Volume2, Bookmark, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SimulatorWord {
  base: string; // e.g. بيت
  english: string;
  transliteration: string; // base translit e.g. bayt
  plural: string; // e.g. buyūt
  pluralTranslation: string; // e.g. houses
}

const WORDS: SimulatorWord[] = [
  { base: 'بَيْت', english: 'House', transliteration: 'bayt', plural: 'بُيُوت', pluralTranslation: 'Houses' },
  { base: 'رَجُل', english: 'Man', transliteration: 'rajul', plural: 'رِجَال', pluralTranslation: 'Men' },
  { base: 'كِتَاب', english: 'Book', transliteration: 'kitāb', plural: 'كُتُب', pluralTranslation: 'Books' },
  { base: 'قَلَم', english: 'Pen', transliteration: 'qalam', plural: 'أَقْلَام', pluralTranslation: 'Pens' },
  { base: 'مَسْجِد', english: 'Mosque', transliteration: 'masjid', plural: 'مَسَاجِد', pluralTranslation: 'Mosques' },
  { base: 'طَالِب', english: 'Student', transliteration: 'ṭālib', plural: 'طُلَّاب', pluralTranslation: 'Students' },
];

export default function CaseSimulator() {
  const [selectedWordIdx, setSelectedWordIdx] = useState(0);
  const [hasAl, setHasAl] = useState(false);
  const [caseEnding, setCaseEnding] = useState<'nominative' | 'accusative' | 'genitive'>('nominative');
  const [showExplanation, setShowExplanation] = useState(true);

  const word = WORDS[selectedWordIdx];

  // Calculate suffix
  let suffix = '';
  let translitSuffix = '';
  let ruleMessage = '';
  let caseNameArabic = '';
  let caseNameEnglish = '';
  let grammaticalRole = '';
  let indicatorVowel = '';

  if (caseEnding === 'nominative') {
    suffix = hasAl ? 'ُ' : 'ٌ';
    translitSuffix = hasAl ? 'u' : 'un';
    caseNameArabic = 'مَرْفُوع (Marfū‘)';
    caseNameEnglish = 'Nominative Case (Raf‘)';
    grammaticalRole = 'Indicates the Subject (Fā‘il), Definite Predicate, or Starter word of a sentence (Mubtada’).';
    indicatorVowel = 'Ḍamma (ـُ) or Ḍammatayn (ـٌ)';
    ruleMessage = hasAl
      ? 'With the Definite Prefix ال, the noun drops its Tanween and takes a single Ḍamma (ـُـ) at the last letter.'
      : 'As an Indefinite noun, the ending gets the double-vowel Tanween Ḍamma (ـٌـ), pronounced with "-un" ending.';
  } else if (caseEnding === 'accusative') {
    const endsWithTaaMarbuta = word.base.endsWith('ة');
    suffix = hasAl ? 'َ' : 'ً';
    if (!hasAl && !endsWithTaaMarbuta) {
      suffix = 'ًا';
    }
    translitSuffix = hasAl ? 'a' : 'an';
    caseNameArabic = 'مَنْصُوب (Manṣūb)';
    caseNameEnglish = 'Accusative Case (Naṣb)';
    grammaticalRole = 'Indicates the Direct Object (Maf‘ūl Bihi), specific adverbs, or the focus predicate of helper verbs.';
    indicatorVowel = 'Fatḥa (ـَ) or Fatḥatayn with Alif (ـًا)';
    ruleMessage = hasAl
      ? 'With the Definite Prefix ال, the noun drops Tanween and takes a single Fatḥa (ـَـ) at the last letter.'
      : 'In its indefinite accusative form, the noun takes a double Fatḥa Tanween (ـًـ). Since most letters cannot support Tanween Fatḥa directly on their own, an helper "Alif" (ا) is appended as a visual kickstand (ـًا).';
  } else {
    suffix = hasAl ? 'ِ' : 'ٍ';
    translitSuffix = hasAl ? 'i' : 'in';
    caseNameArabic = 'مَجْرُور (Majrūr)';
    caseNameEnglish = 'Genitive Case (Jarr)';
    grammaticalRole = 'Indicates possession (Muḍāf Ilayh) or a word coming directly after a Harf Jarr (Preposition).';
    indicatorVowel = 'Kasra (ـِ) or Kasratayn (ـٍ)';
    ruleMessage = hasAl
      ? 'With the Definite Prefix ال, the noun drops Tanween and takes a single Kasra (ـِـ) at the base of the last letter.'
      : 'As an indefinite noun, the ending takes a double Kasra Tanween (ـٍـ) underneath the last letter, pronounced as "-in".';
  }

  // Generate complete rendered Arabic word
  const renderedArabic = hasAl ? `اَل${word.base}${suffix}` : `${word.base}${suffix}`;
  const translated = hasAl ? `The ${word.english}` : `A ${word.english}`;

  // Break Arabic word parts for nice visual highlight
  // e.g. Al + Base + Suffix
  const visualAl = hasAl ? 'اَلْ' : '';
  const visualBase = word.base;
  const visualSuffix = suffix;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
      id="case-simulator-block"
    >
      {/* Visual Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute right-[-20px] top-[-20px] w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-64 h-24 bg-indigo-505/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-300 mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Declension Syntactic System
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white">
              Noun Case Ending Simulator
            </h2>
            <p className="text-sm text-emerald-100/75 mt-1.5 max-w-2xl font-sans leading-relaxed">
              Explore how Arabic nouns dynamically transition through the <span className="font-semibold text-emerald-300">Nominative</span>, <span className="font-semibold text-emerald-300">Accusative</span>, and <span className="font-semibold text-emerald-300">Genitive</span> states, and notice how Tanween is blocked by the introduction of Definite <span className="font-mono bg-white/10 px-1 py-0.5 rounded text-white">ال</span>.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Info className="w-4 h-4 text-emerald-300" />
              {showExplanation ? 'Hide Guide' : 'Show Guide'}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Playground Main Workspace */}
      <div className="p-6 sm:p-8 grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Controller Board (Interactive Controls) */}
        <div className="xl:col-span-5 space-y-6">
          
          {/* 1. Noun Word Picker */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">
                1. Select Noun Base (Nakira)
              </label>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                6 Classical Nouns
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {WORDS.map((w, idx) => (
                <button
                  key={w.base}
                  onClick={() => setSelectedWordIdx(idx)}
                  className={`relative p-3.5 text-right rounded-2xl border text-xs transition-all cursor-pointer flex flex-col justify-between overflow-hidden group ${
                    selectedWordIdx === idx
                      ? 'border-emerald-600 bg-emerald-50/25 shadow-xs ring-2 ring-emerald-500/10'
                      : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center w-full mb-1 border-b border-transparent group-hover:border-slate-100/50 pb-1">
                    <span className="text-[10px] text-slate-400 font-mono italic">/{w.transliteration}/</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedWordIdx === idx ? 'bg-emerald-600' : 'bg-transparent'}`} />
                  </div>
                  <div className="w-full flex items-baseline justify-between pt-1">
                    <span className="text-[11px] font-bold text-slate-600 font-sans group-hover:text-emerald-950 transition-colors">{w.english}</span>
                    <span className="font-serif text-xl font-extrabold text-slate-800 tracking-wide dir-rtl" dir="rtl">{w.base}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. State Switcher for Definite (ال) vs Indefinite (Tanween) */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-150/70">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest block">
                2. Suffix Blocking (Definiteness)
              </label>
              <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100/50">
                Mutual Exclusion Play
              </span>
            </div>
            <div className="grid grid-cols-2 bg-slate-200/60 p-1 rounded-xl gap-1">
              <button
                onClick={() => setHasAl(false)}
                className={`py-2 px-3 font-semibold text-xs rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
                  !hasAl
                    ? 'bg-emerald-700 text-white shadow-sm border-emerald-800'
                    : 'text-slate-500 hover:text-emerald-700 border-transparent'
                }`}
              >
                <span>Indefinite</span>
                <span className={`text-[10px] font-serif font-black px-1.5 py-0.5 rounded ${
                  !hasAl ? 'bg-white/15 text-emerald-100' : 'bg-slate-200/50 text-slate-500'
                }`}>نَكِرَة</span>
              </button>
              <button
                onClick={() => setHasAl(true)}
                className={`py-2 px-3 font-semibold text-xs rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 border-2 ${
                  hasAl
                    ? 'bg-emerald-700 text-white shadow-sm border-emerald-800'
                    : 'text-slate-505 hover:text-emerald-700 border-transparent'
                }`}
              >
                <span>Definite [ ال ]</span>
                <span className={`text-[10px] font-serif font-black px-1.5 py-0.5 rounded ${
                  hasAl ? 'bg-white/15 text-emerald-100' : 'bg-slate-200/50 text-slate-500'
                }`}>مَعْرِفَة</span>
              </button>
            </div>
          </div>

          {/* 3. Grammatical Case Ending Choice (Raf', Nasb, Jarr) */}
          <div>
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-3">
              3. Trigger Syntactic Shift (Case Ending)
            </label>
            <div className="space-y-2.5">
              {[
                { type: 'nominative', label: 'Nominative Case (Marfū‘)', sub: 'Subject / Starter (Raf‘)', char: hasAl ? 'ُ' : 'ٌ', colorTheme: 'emerald' },
                { type: 'accusative', label: 'Accusative Case (Manṣūb)', sub: 'Direct Object (Naṣb)', char: hasAl ? 'َ' : (word.base.endsWith('ة') ? 'ً' : 'ً‌ا'), colorTheme: 'blue' },
                { type: 'genitive', label: 'Genitive Case (Majrūr)', sub: 'Possessive / Prepositional (Jarr)', char: hasAl ? 'ِ' : 'ٍ', colorTheme: 'indigo' }
              ].map((item) => {
                const isActive = caseEnding === item.type;
                const activeColorClass = 
                  item.type === 'nominative' ? 'border-emerald-600 bg-emerald-50/10 border-2' :
                  item.type === 'accusative' ? 'border-blue-600 bg-blue-50/10 border-2' :
                  'border-black bg-slate-50 border-2';

                return (
                  <button
                    key={item.type}
                    onClick={() => setCaseEnding(item.type as any)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isActive 
                        ? `${activeColorClass} shadow-xs ring-2 ring-slate-100` 
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        isActive 
                          ? (item.type === 'nominative' ? 'bg-emerald-100 text-emerald-800' :
                             item.type === 'accusative' ? 'bg-blue-100 text-blue-800' :
                             'bg-indigo-100 text-indigo-800')
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {item.type === 'nominative' ? 'N' : item.type === 'accusative' ? 'A' : 'G'}
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-800 leading-tight">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                          {item.sub}
                        </span>
                      </div>
                    </div>
                    <span className="font-serif text-2xl font-black bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-100 text-slate-800 transition-transform scale-100 hover:scale-105 select-none shadow-xs">
                      {item.char}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side: Virtual Desktop / Declension visualizer block */}
        <div className={`xl:col-span-7 flex flex-col justify-between rounded-3xl p-6 sm:p-8 border h-full min-h-[460px] transition-all duration-300 ${
          caseEnding === 'nominative' ? 'bg-emerald-50/20 border-emerald-500/40' :
          caseEnding === 'accusative' ? 'bg-blue-50/20 border-blue-500/40' :
          'bg-slate-50/50 border-slate-900/60'
        }`}>
          
          {/* Top segment: The Large Arabic display board with custom letter separation highlighter */}
          <div className="text-center flex-1 flex flex-col items-center justify-center py-6">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1 block">
              Resulting Pronounced Declension
            </span>
            
            {/* The actual premium workspace simulator card */}
            <div className="bg-white border border-slate-150/70 p-8 rounded-3xl shadow-xs my-3 text-center w-full max-w-sm relative">
              
              {/* Absolutes for beauty decorations */}
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
              </div>
              <span className="absolute top-2.5 right-4 font-mono text-[9px] text-slate-300 font-bold uppercase">vowel analyzer</span>

              {/* Styled components combining correctly as a single Arabic cursive text */}
              <div className="py-6 flex flex-row-reverse items-center justify-center font-serif text-6xl font-black select-all tracking-normal" dir="rtl">
                <motion.span
                  key={caseEnding + '-' + hasAl + '-' + selectedWordIdx}
                  initial={{ y: -8, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className={`${
                    caseEnding === 'nominative' ? 'text-emerald-850' :
                    caseEnding === 'accusative' ? 'text-blue-850' :
                    'text-slate-900'
                  }`}
                  title={`${caseNameEnglish}: ${renderedArabic}`}
                >
                  {renderedArabic}
                </motion.span>
              </div>

              {/* Graphical Breakdown Legend */}
              <div className="mb-6 flex flex-wrap flex-row-reverse items-center justify-center gap-1 text-[11px] text-slate-400 font-sans border-t border-b border-slate-100 py-3">
                {hasAl && (
                  <>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">اَلْـ (Al-)</span>
                    <span className="text-slate-300 font-bold">+</span>
                  </>
                )}
                <span className="font-semibold text-slate-700 bg-slate-50 px-3 py-0.5 rounded border border-slate-200">{word.base}</span>
                <span className="text-slate-300 font-bold">+</span>
                <span className={`font-bold px-2 py-0.5 rounded border transition-colors ${
                  caseEnding === 'nominative' ? 'bg-emerald-50 border-emerald-300 text-emerald-700' :
                  caseEnding === 'accusative' ? 'bg-blue-50 border-blue-300 text-blue-700' :
                  'bg-slate-100 border-slate-400 text-slate-850'
                }`}>
                  {suffix} ({caseEnding === 'nominative' ? 'un/u' : caseEnding === 'accusative' ? 'an/a' : 'in/i'})
                </span>
              </div>

              {/* Translation bar */}
              <div className="inline-flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
                <span className="text-xs font-semibold text-slate-700">
                  Meaning: <span className="font-bold text-emerald-800">{translated}</span>
                </span>
                <span className="text-slate-300 select-none">|</span>
                <span className="text-[10px] text-slate-400 font-mono italic">/{translitSuffix}/</span>
              </div>

              {/* Little sound guide */}
              <div className="mt-4 flex justify-center items-center gap-1.5 text-[10px] text-slate-400 font-mono font-medium">
                <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Sounds like: <span className="font-bold text-slate-600">"{word.english.toLowerCase()}{translitSuffix}"</span></span>
              </div>

            </div>

            {/* Micro layout for Plural conversion feature */}
            <div className="mt-2.5 w-full max-w-sm bg-indigo-50/20 rounded-2xl p-3 border border-indigo-100/50 flex items-center justify-between gap-3 text-xs leading-none">
              <span className="font-medium text-indigo-900 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-505" />
                Broken Plural:
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-500">/{word.pluralTranslation}/</span>
                <span className="font-serif font-black text-sm text-indigo-950 bg-indigo-100/50 px-2 py-1 rounded" dir="rtl">{word.plural}</span>
              </div>
            </div>
          </div>

          {/* Bottom segment: Explanatory summary details */}
          <div className="bg-white border border-slate-150/70 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <span className="flex gap-2 items-center text-xs font-black text-slate-800">
                <Bookmark className="w-4 h-4 text-emerald-600 shrink-0" />
                ACTIVE CONFIGURATION
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase leading-none ${
                caseEnding === 'nominative' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                caseEnding === 'accusative' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                'bg-indigo-50 text-indigo-750 border border-indigo-150'
              }`}>
                {caseEnding}
              </span>
            </div>

            {/* Syntactic summary grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Arabic Case Term:</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{caseNameArabic}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Primary Indicator:</span>
                <span className="font-semibold text-slate-905 block mt-0.5 font-sans flex items-center gap-1.5">{indicatorVowel}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">Sentence Role:</span>
                <span className="text-slate-600 block mt-0.5 leading-relaxed">{grammaticalRole}</span>
              </div>
            </div>

            {/* Explanatory sentence dynamic text */}
            <div className="mt-3 p-3 rounded-xl bg-slate-50/50 border border-dashed border-slate-200">
              <p className="text-xs text-slate-600 leading-relaxed font-sans flex items-start gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{ruleMessage}</span>
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Guide Banner Collapse */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100 bg-emerald-50/30 overflow-hidden"
          >
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex gap-2.5 items-center text-slate-800">
                <HelpCircle className="w-5 h-5 text-emerald-700" />
                <h4 className="text-sm font-bold">Understanding Declension (الإعراب) Rule Categories</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                In Classical Quranic Arabic, nouns do not remain static. Instead, the final vowel case ending of a noun morphs depending on its exact syntactic function within a sentence (e.g. if it acts as a subject doing the action, or an object receiving the action). This phenomenon is called **I‘rāb (إعراب)**.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="bg-emerald-50/10 border-2 border-emerald-500 p-4 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">Raf‘ (الرفع)</span>
                  <p className="text-xs font-semibold text-slate-850 mt-1">First State: Mubtada’</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Defaults to double Pesh (ٌـ) if indefinite, or single Pesh (ُـ) if definite. It marks subjects, starters, or predicate modifiers.</p>
                </div>
                <div className="bg-blue-50/10 border-2 border-blue-500 p-4 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">Naṣb (النصب)</span>
                  <p className="text-xs font-semibold text-slate-850 mt-1">Second State: Object</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Takes a double Zabar and helper Alif (ـًا) if indefinite, or single Zabar (َـ) if definite. Marks objective direct actions.</p>
                </div>
                <div className="bg-slate-50/20 border-2 border-slate-900 p-4 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-800 bg-slate-200 px-2.5 py-0.5 rounded">Jarr (الجر)</span>
                  <p className="text-xs font-semibold text-slate-850 mt-1">Third State: Possessive</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">Takes double Zeer (ٍـ) if indefinite, or single Zeer (ِـ) if definite. Occurs after classical prepositions.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
