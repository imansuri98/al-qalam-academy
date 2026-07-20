import { auth } from '@/auth'
import { getChapters } from '@/sanity/lib/fetch'
import { db, userProgress } from '@/lib/db'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { BookOpen, CheckCircle2, Play, Award, Sparkles } from 'lucide-react'

export const revalidate = 10 // Revalidate every 10 seconds

export default async function CourseOverviewPage() {
  const session = await auth()
  const chapters = await getChapters()

  // Fetch completed exercises for progress calculations
  const progressMap: Record<string, number> = {} // slug -> count of completed exercises
  
  if (session?.user?.id) {
    try {
      const records = await db
        .select({
          chapterSlug: userProgress.chapterSlug,
          exerciseId: userProgress.exerciseId,
        })
        .from(userProgress)
        .where(eq(userProgress.userId, session.user.id))

      records.forEach((record) => {
        progressMap[record.chapterSlug] = (progressMap[record.chapterSlug] || 0) + 1
      })
    } catch (err) {
      console.error('Failed to fetch user progress:', err)
    }
  }

  const completedChaptersCount = chapters.filter((ch) => {
    const completed = progressMap[ch.slug] || 0
    return ch.exerciseCount > 0 && completed >= ch.exerciseCount
  }).length

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 flex flex-col justify-start">
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 mb-10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold tracking-wider text-sm uppercase mb-3">
            <Sparkles className="h-4 w-4" /> Al Qalam Self-Study Academy
          </div>
          <h1 className="text-4xl font-extrabold sm:text-5xl tracking-tight mb-4">
            {session ? `As-salamu alaykum, ${session.user?.name || 'Student'}` : 'Classical Arabic Grammar'}
          </h1>
          <p className="text-slate-300 max-w-2xl text-lg leading-relaxed mb-6">
            Master the grammatical structure (Qawa'id) of Classical Arabic (Fusha) using modern, active recall exercises and detailed explanations.
          </p>

          {session ? (
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 border-t border-slate-800 pt-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-400" />
                <span>Chapters: <strong>{chapters.length}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-400" />
                <span>Completed Chapters: <strong>{completedChaptersCount} / {chapters.length}</strong></span>
              </div>
            </div>
          ) : (
            <div className="border-t border-slate-800 pt-6">
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold text-white transition-all shadow-lg hover:shadow-indigo-500/20 cursor-pointer"
              >
                Create Account to Track Progress
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Chapters Index */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
          Course curriculum
        </h2>

        {chapters.length === 0 ? (
          <div className="text-center py-16 bg-white/50 dark:bg-slate-900/50 backdrop-blur rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-medium">No chapters published yet.</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Access the /studio editor to insert course materials.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chapters.map((chapter) => {
              const completedCount = progressMap[chapter.slug] || 0
              const totalCount = chapter.exerciseCount
              const percent = totalCount > 0 ? Math.min(Math.round((completedCount / totalCount) * 100), 100) : 0
              const isCompleted = totalCount > 0 && completedCount >= totalCount

              return (
                <div
                  key={chapter._id}
                  className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all duration-300 group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg">
                        Lesson {chapter.chapterNumber}
                      </span>
                      {isCompleted && (
                        <span className="text-emerald-500 flex items-center gap-1 text-xs font-semibold">
                          <CheckCircle2 className="h-4 w-4" /> Completed
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold font-amiri text-slate-800 dark:text-slate-100 mb-2 leading-relaxed group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" dir="rtl">
                      {chapter.title}
                    </h3>

                    {chapter.rules && chapter.rules.length > 0 && (
                      <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-1 mt-3 mb-6 list-disc list-inside">
                        {chapter.rules.slice(0, 2).map((rule, idx) => (
                          <li key={idx} className="truncate">{rule}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-auto">
                    {totalCount > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                          <span>Exercises Progress</span>
                          <span>{completedCount} / {totalCount} ({percent}%)</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <Link
                      href={`/chapters/${chapter.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-slate-100 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-sm transition-all duration-200 cursor-pointer"
                    >
                      <Play className="h-4 w-4" /> {percent > 0 ? 'Continue Lesson' : 'Start Lesson'}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
