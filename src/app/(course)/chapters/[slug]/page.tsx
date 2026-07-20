import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import { getChapterBySlug } from '@/sanity/lib/fetch'
import { db, userProgress } from '@/lib/db'
import { eq, and } from 'drizzle-orm'
import ChapterClient from '@/components/ChapterClient'

interface ChapterPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params
  const chapter = await getChapterBySlug(slug)

  if (!chapter) {
    notFound()
  }

  const session = await auth()
  const userLoggedIn = !!session?.user?.id

  let initialCompletedExercises: string[] = []

  if (userLoggedIn) {
    try {
      const records = await db
        .select({ exerciseId: userProgress.exerciseId })
        .from(userProgress)
        .where(
          and(
            eq(userProgress.userId, session.user.id),
            eq(userProgress.chapterSlug, slug)
          )
        )

      initialCompletedExercises = records.map((r) => r.exerciseId)
    } catch (error) {
      console.error('Failed to load user exercise completions:', error)
    }
  }

  return (
    <ChapterClient
      chapter={chapter}
      initialCompletedExercises={initialCompletedExercises}
      userLoggedIn={userLoggedIn}
    />
  )
}
