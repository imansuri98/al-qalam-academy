'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, CheckCircle, ChevronRight, Award, Lock, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { ChapterData } from '@/sanity/lib/fetch'
import MCQExercise from './exercises/MCQExercise'
import FillInBlankExercise from './exercises/FillInBlankExercise'
import DragAndDropExercise from './exercises/DragAndDropExercise'

// Custom Rich Text block renderer that auto-detects Arabic and applies appropriate styling/direction
function PortableTextRenderer({ value }: { value: any[] }) {
  if (!value || !Array.isArray(value)) return null

  return (
    <div className="space-y-4">
      {value.map((block: any, blockIdx: number) => {
        if (block._type !== 'block') return null

        const text = block.children?.map((c: any) => c.text).join('') || ''
        const isArabic = /[\u0600-\u06FF]/.test(text)
        const dirAttr = isArabic ? 'rtl' : 'ltr'
        const fontClass = isArabic 
          ? 'font-amiri text-3xl leading-loose text-right text-slate-800 dark:text-slate-100' 
          : 'font-sans text-base leading-relaxed text-left text-slate-650 dark:text-slate-300'

        if (block.style === 'h2') {
          return (
            <h2 key={block._key || blockIdx} dir={dirAttr} className={`text-2xl font-bold mt-6 mb-3 ${isArabic ? 'font-amiri' : 'font-sans'}`}>
              {text}
            </h2>
          )
        }

        if (block.style === 'h3') {
          return (
            <h3 key={block._key || blockIdx} dir={dirAttr} className={`text-xl font-bold mt-4 mb-2 ${isArabic ? 'font-amiri' : 'font-sans'}`}>
              {text}
            </h3>
          )
        }

        return (
          <p key={block._key || blockIdx} dir={dirAttr} className={fontClass}>
            {block.children?.map((child: any, childIdx: number) => {
              const isBold = child.marks?.includes('strong')
              const isItalic = child.marks?.includes('em')
              return (
                <span
                  key={child._key || childIdx}
                  className={`${isBold ? 'font-bold' : ''} ${isItalic ? 'italic' : ''}`}
                >
                  {child.text}
                </span>
              )
            })}
          </p>
        )
      })}
    </div>
  )
}

interface ChapterClientProps {
  chapter: ChapterData
  initialCompletedExercises: string[]
  userLoggedIn: boolean
}

export default function ChapterClient({
  chapter,
  initialCompletedExercises,
  userLoggedIn,
}: ChapterClientProps) {
  const [completed, setCompleted] = useState<string[]>(initialCompletedExercises)
  const [activeExerciseIdx, setActiveExerciseIdx] = useState(0)
  const [scores, setScores] = useState<Record<string, number>>({})

  const exercises = chapter.exercises || []
  const totalExercises = exercises.length

  const handleExerciseComplete = async (exerciseId: string, score: number, maxScore: number) => {
    // Add to local state
    if (!completed.includes(exerciseId)) {
      setCompleted((prev) => [...prev, exerciseId])
    }
    setScores((prev) => ({ ...prev, [exerciseId]: score }))

    if (userLoggedIn) {
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chapterSlug: chapter.slug,
            exerciseId,
            score,
            maxScore,
          }),
        })
      } catch (error) {
        console.error('Error saving progress:', error)
      }
    }
  }

  const completedCount = completed.length
  const progressPercent = totalExercises > 0 ? Math.round((completedCount / totalExercises) * 100) : 0
  const isChapterFinished = totalExercises > 0 && completedCount === totalExercises

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 columns: Intro & Grammar Rules */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Lesson {chapter.chapterNumber}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-amiri text-slate-800 dark:text-slate-100 mt-2 mb-6 leading-relaxed" dir="rtl">
              {chapter.title}
            </h1>

            {chapter.intro ? (
              <PortableTextRenderer value={chapter.intro} />
            ) : (
              <p className="text-slate-400 italic">No introduction content provided.</p>
            )}
          </div>

          {/* Grammar Callout Cards (القواعد) */}
          {chapter.rules && chapter.rules.length > 0 && (
            <div className="bg-amber-50/50 dark:bg-amber-950/10 rounded-2xl border border-amber-200/60 dark:border-amber-900/30 p-8">
              <h2 className="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Rules Summary (القواعد)
              </h2>
              <div className="space-y-3.5" dir="rtl">
                {chapter.rules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="bg-white/95 dark:bg-slate-900/90 border-r-4 border-amber-500 rounded-xl p-4 shadow-sm flex items-start gap-3"
                  >
                    <span className="text-amber-600 dark:text-amber-500 font-bold shrink-0 mt-0.5">
                      {idx + 1}.
                    </span>
                    <p className="font-amiri text-2xl leading-loose text-slate-800 dark:text-slate-150 text-right w-full">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column: Interactive Exercises */}
        <div className="space-y-6">
          <div className="bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-2xl p-5">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-indigo-500" /> Exercises
            </h2>

            {totalExercises > 0 ? (
              <>
                {/* Progress bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                    <span>Lesson completion</span>
                    <span>{completedCount} / {totalExercises} done ({progressPercent}%)</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {!userLoggedIn && (
                  <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-600 dark:text-amber-400 text-xs">
                    You are not logged in. Your progress will not be saved.
                  </div>
                )}

                {/* Exercise Selection List */}
                <div className="space-y-2 mb-6">
                  {exercises.map((ex, idx) => {
                    const isDone = completed.includes(ex._id)
                    const isActive = activeExerciseIdx === idx
                    const isLocked = idx > 0 && !completed.includes(exercises[idx - 1]._id)

                    return (
                      <button
                        key={ex._id}
                        disabled={isLocked && !isDone}
                        onClick={() => setActiveExerciseIdx(idx)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all duration-200 ${
                          isActive
                            ? 'border-indigo-600 bg-indigo-600 text-white font-semibold'
                            : isDone
                            ? 'border-emerald-250 bg-emerald-50/20 dark:bg-emerald-950/10 text-emerald-700 dark:text-emerald-400'
                            : isLocked
                            ? 'border-slate-200 dark:border-slate-800 opacity-50 cursor-not-allowed text-slate-400'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-350 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isDone ? (
                            <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                          ) : isLocked ? (
                            <Lock className="h-4.5 w-4.5 shrink-0" />
                          ) : (
                            <HelpCircle className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
                          )}
                          <span className="text-sm truncate max-w-[180px]">
                            {idx + 1}. {ex.title}
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 opacity-70" />
                      </button>
                    )
                  })}
                </div>

                {/* Active Exercise Render */}
                <div>
                  {exercises.map((ex, idx) => {
                    if (idx !== activeExerciseIdx) return null

                    const props = {
                      exerciseId: ex._id,
                      questionText: ex.questionText,
                      translationText: ex.translationText,
                      options: ex.options || [],
                      explanation: ex.explanation,
                      onComplete: (score: number, maxScore: number) =>
                        handleExerciseComplete(ex._id, score, maxScore),
                    }

                    if (ex.type === 'mcq') {
                      return <MCQExercise key={ex._id} {...props} />
                    }
                    if (ex.type === 'fill_in_blank') {
                      return <FillInBlankExercise key={ex._id} {...props} />
                    }
                    if (ex.type === 'drag_and_drop') {
                      return <DragAndDropExercise key={ex._id} {...props} />
                    }

                    return <p key={ex._id}>Unsupported exercise type.</p>
                  })}
                </div>

                {/* Finished State Callout */}
                {isChapterFinished && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-6 p-6 bg-gradient-to-tr from-emerald-500 to-teal-600 text-white rounded-2xl shadow-xl text-center"
                  >
                    <Award className="h-12 w-12 mx-auto mb-2 text-white animate-bounce" />
                    <h3 className="font-bold text-xl">Mabrook! / مبروك</h3>
                    <p className="text-sm text-emerald-100 mt-1">
                      You have successfully completed all exercises in this chapter!
                    </p>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-sm italic">
                No exercises registered for this lesson yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
