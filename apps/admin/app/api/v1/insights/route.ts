import { NextResponse } from "next/server";
import { db, insights } from "@alarabi/database";
import { eq } from "drizzle-orm";

const DEFAULT_INSIGHTS = [
  {
    id: "insight-1",
    titleEn: "Why Arabic Puts the Predicate Last",
    arabicExample: "الْعِلْمُ نُورٌ",
    insightBodyEn:
      "In Arabic nominal sentences (الجُمْلَةُ الاسْمِيَّة), the subject (مُبْتَدَأٌ) always comes first and the predicate (خَبَرٌ) follows. This mirrors a timeless rhetorical principle: establish the subject of your statement before attributing qualities to it. 'Knowledge is light' — we define 'knowledge' first, then illuminate it.",
    category: "RHETORIC",
    sourceEn: "Ibn Hisham, Mughni al-Labib",
  },
  {
    id: "insight-2",
    titleEn: "The Three Vowels That Carry All Meaning",
    arabicExample: "ضَرَبَ / ضُرِبَ",
    insightBodyEn:
      "Arabic's case system (I'rab) encodes grammatical meaning directly into vowel endings. The same root ض-ر-ب means 'he struck' (ضَرَبَ) vs 'he was struck' (ضُرِبَ) — active vs passive — communicated through internal vowel changes alone. No extra words needed. This compactness is a hallmark of Classical Arabic.",
    category: "GRAMMAR",
    sourceEn: "Al-Jurjani, Dala'il al-I'jaz",
  },
  {
    id: "insight-3",
    titleEn: "The Wisdom in Verb-First Sentences",
    arabicExample: "قَامَ زَيْدٌ",
    insightBodyEn:
      "When Arabic verbal sentences (الجُمْلَةُ الفِعْلِيَّة) place the verb first (قَامَ زَيْدٌ — 'Zayd stood'), the action is emphasised over the actor. Classical scholars noted this reflects Arabic's orientation toward deeds before identity — what you do precedes who you are.",
    category: "WISDOM",
    sourceEn: "Al-Zamakhshari, Al-Mufassal",
  },
  {
    id: "insight-4",
    titleEn: "إِنَّمَا — The Most Powerful Restriction Particle",
    arabicExample: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
    insightBodyEn:
      "The particle إِنَّمَا (innama) is a rhetorical restriction device (حَصْرٌ) meaning 'only / nothing but'. When it precedes a nominal sentence it restricts the predicate exclusively to the subject. 'Actions are by intentions only' — this single particle eliminates all other possible causes, making the statement absolute and rhetorically devastating in its precision.",
    category: "RHETORIC",
    sourceEn: "Prophetic Hadith • Sahih al-Bukhari #1",
  },
];

export async function GET() {
  try {
    const result = await db.select().from(insights);

    if (result.length === 0) {
      return NextResponse.json({
        success: true,
        insights: DEFAULT_INSIGHTS,
      });
    }

    const mapped = result.map((ins) => ({
      id: ins.id,
      titleEn: ins.titleEn,
      arabicExample: ins.arabicExample,
      insightBodyEn: ins.insightBodyEn,
      category: ins.category as any,
      sourceEn: ins.sourceEn || "",
    }));

    return NextResponse.json({
      success: true,
      insights: mapped,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { insight } = body;

    if (!insight || !insight.id) {
      return NextResponse.json({ success: false, error: "Invalid insight data" }, { status: 400 });
    }

    await db
      .insert(insights)
      .values({
        id: insight.id,
        titleEn: insight.titleEn || "",
        arabicExample: insight.arabicExample || "",
        insightBodyEn: insight.insightBodyEn || "",
        category: insight.category || "GRAMMAR",
        sourceEn: insight.sourceEn || "",
      })
      .onConflictDoUpdate({
        target: insights.id,
        set: {
          titleEn: insight.titleEn || "",
          arabicExample: insight.arabicExample || "",
          insightBodyEn: insight.insightBodyEn || "",
          category: insight.category || "GRAMMAR",
          sourceEn: insight.sourceEn || "",
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
      return NextResponse.json({ success: false, error: "Missing insight ID" }, { status: 400 });
    }

    await db.delete(insights).where(eq(insights.id, id));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
