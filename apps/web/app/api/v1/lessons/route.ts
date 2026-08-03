import { NextResponse } from "next/server";
import { db, lessons } from "@alarabi/database";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lessonId = searchParams.get("id");

    if (lessonId) {
      const result = await db
        .select()
        .from(lessons)
        .where(eq(lessons.id, lessonId));

      return NextResponse.json({
        success: true,
        data: result[0] || null,
      });
    }

    const allLessons = await db.select().from(lessons);
    return NextResponse.json({
      success: true,
      data: allLessons,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { moduleId, titleAr, titleEn, contentNotesEn, orderIndex } = body;

    const inserted = await db
      .insert(lessons)
      .values({
        moduleId,
        titleAr,
        titleEn,
        contentNotesEn,
        orderIndex: orderIndex || 1,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Lesson created/updated in PostgreSQL DB",
      data: inserted[0],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
