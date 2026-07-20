'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface MCQOption {
  text: string
  isCorrect: boolean
}

interface MCQExerciseProps {
  exerciseId: string
  questionText: string
  translationText?: string
  options: MCQOption[]
  explanation?: string
  onComplete: (score: number, maxScore: number) => void
}

export default function MCQExercise({
  questionText,
  translationText,
  options,
  explanation,
  onComplete,
}: MCQExerciseProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (idx: number) => {
    if (submitted) return
    setSelectedIdx(idx)
  }

  const handleSubmit = () => {
    if (selectedIdx === null || submitted) return
    setSubmitted(true)
    const isCorrect = options[selectedIdx].isCorrect
    onComplete(isCorrect ? 1 : 0, 1)
  }

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
          Multiple Choice / اختر الإجابة
        </span>
      </div>

      <div className="mb-6 text-center">
        <h3 className="font-amiri text-4xl font-bold leading-loose text-slate-800 dark:text-slate-100 mb-2" dir="rtl">
          {questionText}
        </h3>
        {translationText && (
          <p className="text-sm text-slate-500 dark:text-slate-400 font-sans" dir="ltr">
            {translationText}
          </p>
        )}
      </div>

      <div className="space-y-3 mb-6">
        {options.map((option, idx) => {
          let btnClass = "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300"
          if (selectedIdx === idx) {
            btnClass = "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300"
          }

          if (submitted) {
            if (option.isCorrect) {
              btnClass = "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300"
            } else if (selectedIdx === idx) {
              btnClass = "border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300"
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={submitted}
              className={`w-full py-4 px-5 rounded-xl border text-right font-amiri text-2xl font-medium transition-all duration-200 flex justify-between items-center ${btnClass}`}
              dir="rtl"
            >
              <span>{option.text}</span>
              {submitted && option.isCorrect && <Check className="h-6 w-6 text-emerald-500 shrink-0" />}
              {submitted && !option.isCorrect && selectedIdx === idx && <X className="h-6 w-6 text-rose-500 shrink-0" />}
            </button>
          )
        })}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selectedIdx === null}
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
            <span className={`text-sm font-bold ${options[selectedIdx!].isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
              {options[selectedIdx!].isCorrect ? 'Correct! / أحسنت' : 'Incorrect / حاول مرة أخرى'}
            </span>
          </div>
          {explanation && (
            <p className="text-sm text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
              {explanation}
            </p>
          )}
        </motion.div>
      )}
    </div>
  )
}
