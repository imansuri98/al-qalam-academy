import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { pgTable, text, timestamp, integer, uuid, uniqueIndex } from 'drizzle-orm/pg-core'

// 1. Database Schema Definitions

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  password: text('password').notNull(), // Hashed password
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const userProgress = pgTable('user_progress', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  chapterSlug: text('chapter_slug').notNull(),
  exerciseId: text('exercise_id').notNull(),
  score: integer('score').notNull(),
  maxScore: integer('max_score').notNull(),
  completedAt: timestamp('completed_at').defaultNow().notNull(),
}, (table) => {
  return {
    userExerciseUnique: uniqueIndex('user_exercise_unique_idx').on(table.userId, table.chapterSlug, table.exerciseId),
  }
})

// 2. Database Connection Setup

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres_password@localhost:5432/alqalam',
})

export const db = drizzle(pool, { schema: { users, userProgress } })
export type DbUser = typeof users.$inferSelect
export type DbUserProgress = typeof userProgress.$inferSelect
