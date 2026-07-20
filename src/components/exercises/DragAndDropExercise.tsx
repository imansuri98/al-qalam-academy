'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X, RotateCcw } from 'lucide-react'

interface Option {
  text: string
  isCorrect?: boolean
}

interface DragAndDropExerciseProps {
  exerciseId: string
  questionText: string // The full Arabic sentence
  translationText?: string // English translation
  options: Option[] // Sentence words in correct order
  explanation?: string
  onComplete: (score: number, maxScore: number) => void
}

interface WordItem {
  id: string
  text: string
}

export default function DragAndDropExercise({
  translationText,
  options,
  explanation,
  onComplete,
}: DragAndDropExerciseProps) {
  const [pool, setPool] = useState<WordItem[]>([])
  const [tray, setTray] = useState<WordItem[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Load and shuffle options
  useEffect(() => {
    const items = options.map((opt, index) => ({
      id: `${opt.text}-${index}`,
      text: opt.text,
    }))
    // Scramble order
    const shuffled = [...items].sort(() => Math.random() - 0.5)
    setPool(shuffled)
    setTray([])
    setSubmitted(false)
    setIsCorrect(false)
  }, [options])

  const handlePoolClick = (item: WordItem) => {
    if (submitted) return
    setPool((prev) => prev.filter((w) => w.id !== item.id))
    setTray((prev) => [...prev, item])
  }

  const handleTrayClick = (item: WordItem) => {
    if (submitted) return
    setTray((prev) => prev.filter((w) => w.id !== item.id))
    setPool((prev) => [...prev, item])
  }

  const handleReset = () => {
    if (submitted) return
    const items = options.map((opt, index) => ({
      id: `${opt.text}-${index}`,
      text: opt.text,
    }))
    setPool([...items].sort(() => Math.random() - 0.5))
    setTray([])
  }

  const handleCheck = () => {
    if (tray.length === 0 || submitted) return
    setSubmitted(true)

    // Compare user sequence against original options sequence
    const correctSequence = options.map((opt) => opt.text)
    const userSequence = tray.map((item) => item.text)

    const matches =
      correctSequence.length === userSequence.length &&
      correctSequence.every((val, idx) => val === userSequence[idx])

    setIsCorrect(matches)
    onComplete(matches ? 1 : 0, 1)
  }

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400">
          Sentence Builder / تركيب الجملة
        </span>
        {!submitted && tray.length > 0 && (
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition flex items-center gap-1 text-xs font-medium cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>

      {/* English Prompt */}
      {translationText && (
        <div className="mb-6 text-center">
          <p className="text-lg font-medium text-slate-600 dark:text-slate-300">
            Build this sentence:
          </p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 font-sans italic mt-1">
            "{translationText}"
          </p>
        </div>
      )}

      {/* Answer Tray */}
      <div
        className={`min-h-[70px] p-4 rounded-xl border border-dashed flex flex-wrap gap-2.5 justify-center items-center mb-6 bg-slate-50/50 dark:bg-slate-950/20 transition-all duration-200 ${
          submitted
            ? isCorrect
              ? 'border-emerald-500 bg-emerald-50/20'
              : 'border-rose-500 bg-rose-50/20'
            : tray.length > 0
            ? 'border-indigo-400'
            : 'border-slate-300 dark:border-slate-700'
        }`}
        dir="rtl"
      >
        {tray.length === 0 ? (
          <span className="text-slate-400 text-sm font-sans">Tap words below to build sentence</span>
        ) : (
          tray.map((word) => (
            <motion.button
              layout
              key={word.id}
              onClick={() => handleTrayClick(word)}
              disabled={submitted}
              className={`py-2 px-5 rounded-lg text-2xl font-medium font-amiri border transition-colors shadow-sm cursor-pointer ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-rose-600 border-rose-600 text-white'
                  : 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600 hover:border-rose-200'
              }`}
            >
              {word.text}
            </motion.button>
          ))
        )}
      </div>

      {/* Word Pool */}
      <div className="mb-6">
        <p className="text-xs text-slate-400 text-center font-sans mb-3">Word Pool:</p>
        <div className="flex flex-wrap gap-2.5 justify-center" dir="rtl">
          {pool.map((word) => (
            <motion.button
              layout
              key={word.id}
              onClick={() => handlePoolClick(word)}
              disabled={submitted}
              className="py-2.5 px-5 rounded-lg text-2xl font-medium font-amiri bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 shadow-sm cursor-pointer"
            >
              {word.text}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Submissions & Explanation */}
      {!submitted ? (
        <button
          onClick={handleCheck}
          disabled={tray.length === 0}
          className="w-full py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all duration-200 cursor-pointer"
        >
          Check Sentence / تحقق
        </button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-sm font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isCorrect ? 'Correct! / أحسنت' : 'Incorrect / حاول مرة أخرى'}
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
