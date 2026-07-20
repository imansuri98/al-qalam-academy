import { groq } from 'next-sanity'

export const chaptersQuery = groq`
  *[_type == "chapter"] | order(chapterNumber asc) {
    _id,
    title,
    "slug": slug.current,
    chapterNumber,
    "exerciseCount": count(exercises)
  }
`

export const chapterBySlugQuery = groq`
  *[_type == "chapter" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    chapterNumber,
    intro,
    sections[] {
      title,
      content
    },
    vocabulary[]-> {
      _id,
      word,
      english,
      partOfSpeech,
      pluralForm,
      verbConjugation {
        past,
        present,
        masdar
      },
      transliteration,
      audioUrl,
      notes
    },
    grammarRules[]-> {
      _id,
      name,
      nameArabic,
      formula,
      explanation,
      examples[] {
        arabic,
        english,
        breakdown
      }
    },
    rules,
    exercises[]-> {
      _id,
      title,
      type,
      questionText,
      translationText,
      options[] {
        text,
        isCorrect
      },
      highlightedWord,
      irabVowelOptions[] {
        text,
        isCorrect
      },
      irabRoleOptions[] {
        text,
        isCorrect
      },
      pairs[] {
        arabic,
        english
      },
      explanation
    }
  }
`
