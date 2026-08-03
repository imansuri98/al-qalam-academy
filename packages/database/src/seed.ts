import crypto from "crypto";
import { db } from "./client";
import { courses, modules, lessons, exercises } from "./schema";
import { COURSE_1_LEVELS, COURSE_2_LEVELS } from "@alarabi/curriculum";

/**
 * Helper to generate a deterministic UUID string from any text ID
 */
function toUuid(idStr: string): string {
  const hex = crypto.createHash("sha256").update(idStr).digest("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

async function seedDatabase() {
  console.log("🌱 Starting Bulk Course Data Seeding into PostgreSQL...");

  // 1. SEED COURSES
  console.log("📦 Seeding Courses...");

  const course1Id = toUuid("course-1");
  const course2Id = toUuid("course-2");

  await db.insert(courses).values([
    {
      id: course1Id,
      titleAr: "النَّحْوُ وَالصَّرْفُ الْكَلَاسِيكِيُّ",
      titleEn: "Course 1: Classical Arabic Grammar (Nahw & Sarf)",
      courseType: "CLASSICAL_GRAMMAR",
      descriptionEn: "Master sentence structure, grammatical case endings (I'rab), and 3-letter verb root patterns (Sarf).",
      orderIndex: 1,
    },
    {
      id: course2Id,
      titleAr: "الْعَرَبِيَّةُ الْمُعَاصِرَةُ لِلتَّوَاصُلِ",
      titleEn: "Course 2: Informal Conversational Fusha",
      courseType: "INFORMAL_FUSHA",
      descriptionEn: "Master accessible Modern Standard Arabic for practical daily communication, greetings, and real-life dialogues.",
      orderIndex: 2,
    },
  ]).onConflictDoNothing();

  // 2. SEED COURSE 1 (MODULES & LESSONS)
  console.log("📚 Seeding Course 1 (Classical Grammar) Modules & Lessons...");
  let globalModIndex = 1;

  for (const level of COURSE_1_LEVELS) {
    for (const mod of level.modules) {
      const modUuid = toUuid(mod.id);

      await db.insert(modules).values({
        id: modUuid,
        courseId: course1Id,
        titleAr: mod.titleAr,
        titleEn: mod.titleEn,
        orderIndex: globalModIndex++,
      }).onConflictDoNothing();

      let lesIdx = 1;
      for (const les of mod.lessons) {
        const lesUuid = toUuid(les.id);

        await db.insert(lessons).values({
          id: lesUuid,
          moduleId: modUuid,
          titleAr: les.titleAr,
          titleEn: les.titleEn,
          contentNotesEn: les.contentBodyEn,
          orderIndex: lesIdx++,
        }).onConflictDoNothing();

        // Seed exercises if present
        if (les.exercises && les.exercises.length > 0) {
          let exIdx = 1;
          for (const exUnit of les.exercises) {
            await db.insert(exercises).values({
              id: toUuid(exUnit.id || `${les.id}-ex-${exIdx}`),
              lessonId: lesUuid,
              type: "TASHKEEL_PICKER",
              promptEn: exUnit.titleEn || "Practice Unit",
              payloadJson: exUnit,
              orderIndex: exIdx++,
            }).onConflictDoNothing();
          }
        }
      }
    }
  }

  // 3. SEED COURSE 2 (SPOKEN FUSHA)
  console.log("🗣️ Seeding Course 2 (Spoken Fusha) Modules & Lessons...");
  let course2ModIdx = 1;

  for (const level of COURSE_2_LEVELS) {
    for (const mod of level.modules) {
      const modUuid = toUuid(mod.id);

      await db.insert(modules).values({
        id: modUuid,
        courseId: course2Id,
        titleAr: mod.titleAr,
        titleEn: mod.titleEn,
        orderIndex: course2ModIdx++,
      }).onConflictDoNothing();

      let lesIdx = 1;
      for (const les of mod.lessons) {
        const lesUuid = toUuid(les.id);

        await db.insert(lessons).values({
          id: lesUuid,
          moduleId: modUuid,
          titleAr: les.titleAr,
          titleEn: les.titleEn,
          contentNotesEn: JSON.stringify({
            dialogueLines: les.dialogueLines || [],
            vocabularies: les.vocabularies || [],
          }),
          orderIndex: lesIdx++,
        }).onConflictDoNothing();
      }
    }
  }

  console.log("✅ PostgreSQL Course Data Seeding Complete!");
  process.exit(0);
}

seedDatabase().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
