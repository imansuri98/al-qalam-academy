'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface Option {
  text: string;
  isCorrect: boolean;
}

interface IrabExerciseProps {
  exerciseId: string
  questionText: string // The full Arabic sentence
  highlightedWord: string // The word to evaluate
  translationText?: string
  irabVowelOptions: Option[] // Vowel choices (Dhammah, Fathah, etc.)
  irabRoleOptions: Option[] // Role choices (Mubtada, Khabar, etc.)
  explanation?: string
  onComplete: (score: number, maxScore: number) => void
}

export default function IrabExercise({
  questionText,
  highlightedWord,
  translationText,
  irabVowelOptions,
  irabRoleOptions,
  explanation,
  onComplete,
}: IrabExerciseProps) {
  const [selectedVowelIdx, setSelectedVowelIdx] = useState<number | null>(null)
  const [selectedRoleIdx, setSelectedRoleIdx] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  // Splitting sentence around the highlighted word to render it beautifully
  const sentenceParts = questionText.split(highlightedWord)

  const handleSubmit = () => {
    if (selectedVowelIdx === null || selectedRoleIdx === null || submitted) return
    setSubmitted(true)

    const isVowelCorrect = irabVowelOptions[selectedVowelIdx].isCorrect
    const isRoleCorrect = irabRoleOptions[selectedRoleIdx].isCorrect
    const isBothCorrect = isVowelCorrect && isRoleCorrect

    onComplete(isBothCorrect ? 1 : 0, 1)
  }

  const vowelCorrect = selectedVowelIdx !== null && irabVowelOptions[selectedVowelIdx].isCorrect
  const roleCorrect = selectedRoleIdx !== null && irabRoleOptions[selectedRoleIdx].isCorrect
  const isBothCorrect = vowelCorrect && roleCorrect

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
          Grammatical Case Quiz / إعراب الكلمات
        </span>
      </div>

      {/* Highlighted Arabic sentence */}
      <div className="mb-6 text-center">
        <div className="font-amiri text-4xl leading-loose text-slate-850 dark:text-slate-100 mb-2 flex flex-row-reverse flex-wrap justify-center items-center gap-1.5" dir="rtl">
          {sentenceParts.map((part, idx) => (
            <span key={idx} className="inline-flex items-center">
              {part}
              {idx < sentenceParts.length - 1 && (
                <span className={`px-3.5 py-1 rounded-xl font-bold border-2 transition-all duration-200 ${
                  submitted
                    ? isBothCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-50 dark:bg-rose-950/20 border-rose-500 text-rose-600 dark:text-rose-400'
                    : 'bg-amber-50 dark:bg-amber-950/20 border-amber-400 text-amber-700 dark:text-amber-300'
                }`}>
                  {highlightedWord}
                </span>
              )}
            </span>
          ))}
        </div>
        {translationText && (
          <p className="text-sm text-slate-500 dark:text-slate-400 font-sans" dir="ltr">
            "{translationText}"
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Part 1: Vowel case marker options */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            1. Final Case Vowel (حركة الإعراب)
          </p>
          <div className="space-y-2">
            {irabVowelOptions.map((vowel, idx) => {
              let btnClass = "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850/50 text-slate-700 dark:text-slate-350"
              if (selectedVowelIdx === idx) {
                btnClass = "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300"
              }
              if (submitted) {
                if (vowel.isCorrect) {
                  btnClass = "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300"
                } else if (selectedVowelIdx === idx) {
                  btnClass = "border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300"
                }
              }

              return (
                <button
                  key={idx}
                  disabled={submitted}
                  onClick={() => setSelectedVowelIdx(idx)}
                  className={`w-full py-2.5 px-4 rounded-xl border text-right font-amiri text-2xl transition-all duration-200 flex justify-between items-center cursor-pointer ${btnClass}`}
                  dir="rtl"
                >
                  <span>{vowel.text}</span>
                  {submitted && vowel.isCorrect && <Check className="h-5 w-5 text-emerald-500" />}
                  {submitted && !vowel.isCorrect && selectedVowelIdx === idx && <X className="h-5 w-5 text-rose-500" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Part 2: Grammatical role options */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            2. Grammatical Role (الموقع الإعرابي)
          </p>
          <div className="space-y-2">
            {irabRoleOptions.map((role, idx) => {
              let btnClass = "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850/50 text-slate-700 dark:text-slate-350"
              if (selectedRoleIdx === idx) {
                btnClass = "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300"
              }
              if (submitted) {
                if (role.isCorrect) {
                  btnClass = "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300"
                } else if (selectedRoleIdx === idx) {
                  btnClass = "border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300"
                }
              }

              return (
                <button
                  key={idx}
                  disabled={submitted}
                  onClick={() => setSelectedRoleIdx(idx)}
                  className={`w-full py-2.5 px-4 rounded-xl border text-right font-sans text-sm transition-all duration-200 flex justify-between items-center cursor-pointer ${btnClass}`}
                >
                  <span>{role.text}</span>
                  {submitted && role.isCorrect && <Check className="h-5 w-5 text-emerald-500" />}
                  {submitted && !role.isCorrect && selectedRoleIdx === idx && <X className="h-5 w-5 text-rose-500" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedVowelIdx === null || selectedRoleIdx === null}
          className="w-full py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all duration-200 cursor-pointer"
        >
          Check Answer / تحقق
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-sm font-bold ${isBothCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isBothCorrect ? 'Correct! / أحسنت' : 'Incorrect / حاول مرة أخرى'}
            </span>
          </div>
          {explanation && (
            <p className="text-sm text-slate-600 dark:text-slate-350 font-sans leading-relaxed">
              {explanation}
            </p>
          )}
        </motion.div>
      )}
    </div>
  )
}
