import {
  pgTable,
  uuid,
  text,
  integer,
  jsonb,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

/**
 * Multi-Role Permission Enum:
 * 1. SUPER_ADMIN: Full platform control + can add/remove other Admins.
 * 2. ADMIN: Content creation (Lessons, Exercises, Vocab) but CANNOT manage Admins.
 * 3. LEARNER: Standard student user.
 */
export const userRoleEnum = pgEnum("user_role", [
  "SUPER_ADMIN",
  "ADMIN",
  "LEARNER",
]);

/**
 * 2 Distinct Independent Courses:
 * 1. CLASSICAL_GRAMMAR: Course 1 - Classical Arabic Grammar (Nahw & Sarf)
 * 2. INFORMAL_FUSHA: Course 2 - Informal Conversational Fusha
 */
export const courseTypeEnum = pgEnum("course_type", [
  "CLASSICAL_GRAMMAR",
  "INFORMAL_FUSHA",
]);

/**
 * Rich Polymorphic Exercise Types for Arabic Learning
 */
export const exerciseTypeEnum = pgEnum("exercise_type", [
  "MULTIPLE_CHOICE",       // Standard Multiple Choice
  "IRAB_PARSING",          // Grammatical Case Breakdown
  "SENTENCE_REORDER",      // Unscramble Arabic Words into Correct Sentence
  "FILL_BLANK",            // Fill in missing word or case ending
  "AUDIO_MATCH",           // Native Audio Listening Comprehension
  "ROOT_FORM_MATCH",       // 3-Letter Root & Sarf Form Matcher
  "TASHKEEL_PICKER",       // Pick correct final diacritic mark
  "ARABIC_TO_ENGLISH",     // Arabic Script -> English Translation
  "ENGLISH_TO_ARABIC",     // English Prompt -> Arabic Script Translation
  "NAHW_ANALYSIS",         // Syntax Analysis (Mubtada/Khabar, Mudaf/Mudaf Ilayh, Harf Jarr)
  "SARF_ANALYSIS",         // Morphology Analysis (Madi/Mudari, Masdar, Ism Fail/Maful, Gender/Number)
]);

// Users Table with Super Admin & Admin Roles
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  role: userRoleEnum("role").notNull().default("LEARNER"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2 Separate Independent Courses Table
export const courses = pgTable("courses", {
  id: uuid("id").primaryKey().defaultRandom(),
  titleAr: text("title_ar").notNull(),
  titleEn: text("title_en").notNull(),
  courseType: courseTypeEnum("course_type").notNull(),
  descriptionEn: text("description_en").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

// Modules Table (per Course)
export const modules = pgTable("modules", {
  id: uuid("id").primaryKey().defaultRandom(),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  titleAr: text("title_ar").notNull(),
  titleEn: text("title_en").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
});

// Lessons Table (per Module)
export const lessons = pgTable("lessons", {
  id: uuid("id").primaryKey().defaultRandom(),
  moduleId: uuid("module_id")
    .notNull()
    .references(() => modules.id, { onDelete: "cascade" }),
  titleAr: text("title_ar").notNull(),
  titleEn: text("title_en").notNull(),
  contentNotesEn: text("content_notes_en"),
  canvasJson: jsonb("canvas_json"), // Stores visual canvas (React Flow nodes, I'rab tree, flowchart)
  orderIndex: integer("order_index").notNull().default(0),
});

// Exercises Table (Polymorphic Exercise Engine)
export const exercises = pgTable("exercises", {
  id: uuid("id").primaryKey().defaultRandom(),
  lessonId: uuid("lesson_id")
    .notNull()
    .references(() => lessons.id, { onDelete: "cascade" }),
  type: exerciseTypeEnum("type").notNull(),
  promptEn: text("prompt_en").notNull(),
  payloadJson: jsonb("payload_json").notNull(), // Flexible data structure per exercise type
  orderIndex: integer("order_index").notNull().default(0),
});

// Vocabulary Table
export const vocabulary = pgTable("vocabulary", {
  id: uuid("id").primaryKey().defaultRandom(),
  wordAr: text("word_ar").notNull(),
  wordDiacriticsAr: text("word_diacritics_ar").notNull(),
  meaningEn: text("meaning_en").notNull(),
  root3Letter: text("root_3_letter"),
  audioUrl: text("audio_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User Progress Table
export const userProgress = pgTable("user_progress", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lessonId: uuid("lesson_id")
    .notNull()
    .references(() => lessons.id, { onDelete: "cascade" }),
  scorePercentage: integer("score_percentage").notNull().default(0),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});

// Classical Capstone Passages Table (Quran, Hadith, Literature)
export const passages = pgTable("passages", {
  id: text("id").primaryKey(),
  category: text("category").notNull(), // QURAN | HADITH | LITERATURE
  titleAr: text("title_ar").notNull(),
  titleEn: text("title_en").notNull(),
  citationEn: text("citation_en").notNull(),
  arabicText: text("arabic_text").notNull(),
  englishTranslation: text("english_translation").notNull(),
  unlockScope: text("unlock_scope").default("MODULE"),
  unlockedAfterMilestoneTitle: text("unlocked_after_milestone_title"),
  questionsJson: jsonb("questions_json").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Rhetorical Insights Table
export const insights = pgTable("insights", {
  id: text("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  arabicExample: text("arabic_example").notNull(),
  insightBodyEn: text("insight_body_en").notNull(),
  category: text("category").notNull(), // RHETORIC | GRAMMAR | WISDOM
  sourceEn: text("source_en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
