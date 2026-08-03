import { NextResponse } from "next/server";
import { db, lessons } from "@alarabi/database";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lessonId = searchParams.get("id");

    if (lessonId) {
      const result = await db.select().from(lessons).where(eq(lessons.id, lessonId));
      return NextResponse.json({ success: true, data: result[0] || null });
    }

    const allLessons = await db.select().from(lessons);
    return NextResponse.json({ success: true, data: allLessons });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, titleAr, titleEn, contentNotesEn, canvasJson, moduleId } = body;

    if (!titleAr || !titleEn) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    if (id) {
      const updated = await db
        .update(lessons)
        .set({
          titleAr,
          titleEn,
          contentNotesEn,
          canvasJson,
        })
        .where(eq(lessons.id, id))
        .returning();

      return NextResponse.json({ success: true, data: updated[0] });
    }

    if (!moduleId) {
      return NextResponse.json({ success: false, error: "moduleId required for new lesson" }, { status: 400 });
    }

    const created = await db
      .insert(lessons)
      .values({
        moduleId,
        titleAr,
        titleEn,
        contentNotesEn,
        canvasJson,
      })
      .returning();

    return NextResponse.json({ success: true, data: created[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
