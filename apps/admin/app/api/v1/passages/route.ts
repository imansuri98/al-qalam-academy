import { NextResponse } from "next/server";
import { db, passages } from "@alarabi/database";
import { eq } from "drizzle-orm";
import { DEFAULT_PASSAGES, PassageItem } from "@alarabi/curriculum";

export async function GET() {
  try {
    const result = await db.select().from(passages);

    // If there is no data in the database, return DEFAULT_PASSAGES
    if (result.length === 0) {
      return NextResponse.json({
        success: true,
        passages: DEFAULT_PASSAGES,
      });
    }

    const mapped = result.map((p) => ({
      id: p.id,
      category: p.category as any,
      titleAr: p.titleAr,
      titleEn: p.titleEn,
      citationEn: p.citationEn,
      arabicText: p.arabicText,
      englishTranslation: p.englishTranslation,
      unlockScope: (p.unlockScope || "MODULE") as any,
      unlockedAfterMilestoneTitle: p.unlockedAfterMilestoneTitle || "",
      questions: p.questionsJson as any,
    }));

    return NextResponse.json({
      success: true,
      passages: mapped,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passage } = body;

    if (!passage || !passage.id) {
      return NextResponse.json({ success: false, error: "Invalid passage data" }, { status: 400 });
    }

    await db
      .insert(passages)
      .values({
        id: passage.id,
        category: passage.category,
        titleAr: passage.titleAr || "",
        titleEn: passage.titleEn || "",
        citationEn: passage.citationEn || "",
        arabicText: passage.arabicText || "",
        englishTranslation: passage.englishTranslation || "",
        unlockScope: passage.unlockScope || "MODULE",
        unlockedAfterMilestoneTitle: passage.unlockedAfterMilestoneTitle || "",
        questionsJson: passage.questions || [],
      })
      .onConflictDoUpdate({
        target: passages.id,
        set: {
          category: passage.category,
          titleAr: passage.titleAr || "",
          titleEn: passage.titleEn || "",
          citationEn: passage.citationEn || "",
          arabicText: passage.arabicText || "",
          englishTranslation: passage.englishTranslation || "",
          unlockScope: passage.unlockScope || "MODULE",
          unlockedAfterMilestoneTitle: passage.unlockedAfterMilestoneTitle || "",
          questionsJson: passage.questions || [],
        },
      });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing passage ID" }, { status: 400 });
    }

    await db.delete(passages).where(eq(passages.id, id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
