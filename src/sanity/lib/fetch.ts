import { client } from './client'
import { chaptersQuery, chapterBySlugQuery } from './queries'

export interface VocabularyData {
  _id: string
  word: string
  english: string
  partOfSpeech: 'noun' | 'verb' | 'particle'
  pluralForm?: string
  verbConjugation?: {
    past?: string
    present?: string
    masdar?: string
  }
  transliteration?: string
  audioUrl?: string
  notes?: string
}

export interface GrammarRuleExample {
  arabic: string
  english: string
  breakdown?: string
}

export interface GrammarRuleData {
  _id: string
  name: string
  nameArabic?: string
  formula?: string
  explanation: string
  examples?: GrammarRuleExample[]
}

export interface ExerciseData {
  _id: string
  title: string
  type: 'mcq' | 'fill_in_blank' | 'drag_and_drop' | 'translate_ar_en' | 'translate_en_ar' | 'irab' | 'matching'
  questionText?: string
  translationText?: string
  options?: { text: string; isCorrect: boolean }[]
  highlightedWord?: string
  irabVowelOptions?: { text: string; isCorrect: boolean }[]
  irabRoleOptions?: { text: string; isCorrect: boolean }[]
  pairs?: { arabic: string; english: string }[]
  explanation?: string
}

export interface ChapterListData {
  _id: string
  title: string
  slug: string
  chapterNumber: number
  rules?: string[]
  exerciseCount: number
}

export interface ChapterSection {
  title: string
  content: any[] // Rich text blocks
}

export interface ChapterData {
  _id: string
  title: string
  slug: string
  chapterNumber: number
  intro?: any[]
  sections?: ChapterSection[]
  vocabulary?: VocabularyData[]
  grammarRules?: GrammarRuleData[]
  rules?: string[] // Legacy support
  exercises?: ExerciseData[]
}

export async function getChapters(): Promise<ChapterListData[]> {
  try {
    return await client.fetch(chaptersQuery)
  } catch (error) {
    console.error('Error fetching chapters from Sanity:', error)
    return []
  }
}

export async function getChapterBySlug(slug: string): Promise<ChapterData | null> {
  try {
    return await client.fetch(chapterBySlugQuery, { slug })
  } catch (error) {
    console.error(`Error fetching chapter ${slug} from Sanity:`, error)
    return null
  }
}
