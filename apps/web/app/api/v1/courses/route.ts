import { NextResponse } from "next/server";
import { db, courses, modules, lessons } from "@alarabi/database";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allCourses = await db.select().from(courses);
    const allModules = await db.select().from(modules);
    const allLessons = await db.select().from(lessons);

    const result = allCourses.map((c) => {
      const courseMods = allModules
        .filter((m) => m.courseId === c.id)
        .sort((a, b) => a.orderIndex - b.orderIndex)
        .map((m) => {
          const modLessons = allLessons
            .filter((l) => l.moduleId === m.id)
            .sort((a, b) => a.orderIndex - b.orderIndex);
          return {
            ...m,
            lessons: modLessons,
          };
        });

      return {
        ...c,
        modules: courseMods,
      };
    });

    return NextResponse.json({
      success: true,
      source: "PostgreSQL Database (alqalam_academy)",
      data: result,
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
    const { titleAr, titleEn, courseType, descriptionEn, orderIndex } = body;

    const inserted = await db
      .insert(courses)
      .values({
        titleAr,
        titleEn,
        courseType,
        descriptionEn,
        orderIndex: orderIndex || 1,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Course created successfully in PostgreSQL",
      data: inserted[0],
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
