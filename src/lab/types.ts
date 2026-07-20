/**
 * Types and interfaces for the Learn Classical Arabic platform.
 */

export interface ArabicExample {
  arabic: string;
  transliteration?: string;
  meaning: string;
  highlightedWord?: string;
  explanation?: string;
}

export interface LessonContent {
  id: string;
  title: string;
  subtitle?: string;
  type: 'explanation' | 'table' | 'interactive' | 'rule' | 'chart' | 'list';
  text?: string;
  list?: string[];
  tableHeaders?: string[];
  tableRows?: Array<string[]>; // e.g., ["Arabic", "Pronunciation", "Meaning"]
  examples?: ArabicExample[];
  alertMessage?: string;
}

export type QuestionType = 'multiple_choice' | 'identify' | 'convert' | 'matching' | 'sentence_builder';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[]; // For multiple choice
  correctAnswer: string; // Answer string or representation
  explanation?: string;
  details?: {
    sentence?: string;
    words?: string[]; // For sentence builder matching
    matchPairs?: { left: string; right: string }[]; // For matching challenges
  };
}

export interface Chapter {
  id: number;
  slug: string;
  title: string;
  arabicTitle?: string;
  subtitle: string;
  summary: string;
  category: 'Nouns & Basics' | 'Sentences' | 'Verbs & Conjugations' | 'Particles';
  lessons: LessonContent[];
  quiz: QuizQuestion[];
}

export interface UserProgress {
  completedChapters: number[];
  quizScores: Record<string, number>; // key: slug, value: pct
  overallPoints: number;
  streakCount: number;
  lastActiveDate?: string;
}
