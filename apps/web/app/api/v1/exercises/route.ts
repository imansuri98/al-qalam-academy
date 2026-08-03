import { NextResponse } from "next/server";
import { db, exercises, eq } from "@alarabi/database";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lessonId = searchParams.get("lessonId");

    if (lessonId) {
      const result = await db
        .select()
        .from(exercises)
        .where(eq(exercises.lessonId, lessonId));

      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    const allExercises = await db.select().from(exercises);
    return NextResponse.json({
      success: true,
      data: allExercises,
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
    const { id, lessonId, type, promptEn, payloadJson, orderIndex } = body;

    if (id) {
      // Update existing exercise
      const updated = await db
        .update(exercises)
        .set({
          lessonId,
          type,
          promptEn,
          payloadJson,
          orderIndex: orderIndex || 1,
        })
        .where(eq(exercises.id, id))
        .returning();

      return NextResponse.json({
        success: true,
        message: "Exercise updated in PostgreSQL DB",
        data: updated[0],
      });
    }

    // Insert new exercise
    const inserted = await db
      .insert(exercises)
      .values({
        lessonId,
        type: type || "TASHKEEL_PICKER",
        promptEn: promptEn || "Exercise Unit Prompt",
        payloadJson: payloadJson || {},
        orderIndex: orderIndex || 1,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Exercise saved to PostgreSQL DB",
      data: inserted[0],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Exercise ID is required" },
        { status: 400 }
      );
    }

    await db.delete(exercises).where(eq(exercises.id, id));

    return NextResponse.json({
      success: true,
      message: "Exercise deleted from PostgreSQL DB",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
