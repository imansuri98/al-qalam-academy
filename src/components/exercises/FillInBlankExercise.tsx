'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface Option {
  text: string
  isCorrect: boolean
}

interface FillInBlankExerciseProps {
  exerciseId: string
  questionText: string
  translationText?: string
  options: Option[]
  explanation?: string
  onComplete: (score: number, maxScore: number) => void
}

export default function FillInBlankExercise({
  questionText,
  translationText,
  options,
  explanation,
  onComplete,
}: FillInBlankExerciseProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  // Split sentence around "___"
  const parts = questionText.split('___')

  const handleChipClick = (word: string) => {
    if (submitted) return
    setSelectedWord(word === selectedWord ? null : word)
  }

  const handleSubmit = () => {
    if (!selectedWord || submitted) return
    setSubmitted(true)
    const matchedOption = options.find((opt) => opt.text === selectedWord)
    const isCorrect = matchedOption?.isCorrect || false
    onComplete(isCorrect ? 1 : 0, 1)
  }

  const selectedOption = options.find((opt) => opt.text === selectedWord)
  const isAnswerCorrect = selectedOption?.isCorrect || false

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
          Fill in the Blank / امْلأ الفَرَاغ
        </span>
      </div>

      <div className="mb-6 text-center">
        {/* Render Arabic sentence with styled blank */}
        <div className="font-amiri text-4xl leading-loose text-slate-800 dark:text-slate-100 mb-4 flex flex-row-reverse flex-wrap justify-center items-center gap-2" dir="rtl">
          {parts.map((part, index) => (
            <span key={index} className="flex items-center">
              {part}
              {index < parts.length - 1 && (
                <span className={`mx-2 min-w-[120px] h-12 inline-flex items-center justify-center border-b-2 border-dashed rounded-lg px-3 text-2xl font-bold font-amiri transition-all duration-200 ${
                  submitted 
                    ? isAnswerCorrect 
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                      : 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400'
                    : selectedWord 
                      ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400' 
                      : 'border-slate-400 text-slate-400'
                }`}>
                  {selectedWord || '...'}
                </span>
              )}
            </span>
          ))}
        </div>
        {translationText && (
          <p className="text-sm text-slate-500 dark:text-slate-400 font-sans" dir="ltr">
            {translationText}
          </p>
        )}
      </div>

      {/* Word Pool Chips */}
      <div className="flex flex-wrap gap-3 justify-center mb-6" dir="rtl">
        {options.map((option, idx) => {
          const isSelected = selectedWord === option.text
          let chipClass = "border-slate-200 dark:border-slate-800 hover:border-slate-400 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          
          if (isSelected) {
            chipClass = "border-indigo-600 bg-indigo-600 text-white shadow-md"
          }
          if (submitted) {
            if (option.isCorrect) {
              chipClass = "border-emerald-600 bg-emerald-600 text-white opacity-90 cursor-not-allowed"
            } else if (isSelected) {
              chipClass = "border-rose-600 bg-rose-600 text-white opacity-90 cursor-not-allowed"
            } else {
              chipClass = "opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleChipClick(option.text)}
              disabled={submitted}
              className={`py-2.5 px-6 rounded-full border text-xl font-medium font-amiri transition-all duration-200 cursor-pointer ${chipClass}`}
            >
              {option.text}
            </button>
          )
        })}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedWord}
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
            <span className={`text-sm font-bold ${isAnswerCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isAnswerCorrect ? 'Correct! / أحسنت' : 'Incorrect / حاول مرة أخرى'}
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
