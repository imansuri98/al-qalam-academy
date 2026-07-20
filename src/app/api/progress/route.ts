import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db, userProgress } from '@/lib/db'
import { eq } from 'drizzle-orm'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { chapterSlug, exerciseId, score, maxScore } = await request.json()

    if (!chapterSlug || !exerciseId || score === undefined || maxScore === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Upsert user progress record
    await db
      .insert(userProgress)
      .values({
        userId: session.user.id,
        chapterSlug,
        exerciseId,
        score,
        maxScore,
        completedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [userProgress.userId, userProgress.chapterSlug, userProgress.exerciseId],
        set: {
          score,
          maxScore,
          completedAt: new Date(),
        },
      })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Save progress error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const progressList = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, session.user.id))

    return NextResponse.json({ progress: progressList })
  } catch (error) {
    console.error('Fetch progress error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
