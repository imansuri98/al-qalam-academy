import { defineType, defineField } from 'sanity'

export const vocabularySchema = defineType({
  name: 'vocabulary',
  title: 'Vocabulary Word',
  type: 'document',
  fields: [
    defineField({
      name: 'word',
      title: 'Arabic Word (with Tashkeel)',
      type: 'string',
      description: 'The Arabic word fully vowelled, e.g. كَتَبَ or كِتَابٌ',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'english',
      title: 'English Translation',
      type: 'string',
      description: 'Primary English translation of the word.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'partOfSpeech',
      title: 'Part of Speech',
      type: 'string',
      options: {
        list: [
          { title: 'Noun (اِسْم)', value: 'noun' },
          { title: 'Verb (فِعْل)', value: 'verb' },
          { title: 'Particle (حَرْف)', value: 'particle' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pluralForm',
      title: 'Plural Form (For Nouns)',
      type: 'string',
      description: 'Arabic plural spelling with Tashkeel, e.g. كُتُبٌ (crucial for broken plurals).',
      hidden: ({ document }) => document?.partOfSpeech !== 'noun',
    }),
    defineField({
      name: 'verbConjugation',
      title: 'Verb Conjugation (For Verbs)',
      type: 'object',
      hidden: ({ document }) => document?.partOfSpeech !== 'verb',
      fields: [
        { name: 'past', title: 'Past Tense (الماضي)', type: 'string', description: 'e.g. كَتَبَ' },
        { name: 'present', title: 'Present Tense (المضارع)', type: 'string', description: 'e.g. يَكْتُبُ' },
        { name: 'masdar', title: 'Verbal Noun (المصدر)', type: 'string', description: 'e.g. كِتَابَةٌ' },
      ],
    }),
    defineField({
      name: 'transliteration',
      title: 'Transliteration',
      type: 'string',
      description: 'Pronunciation spelling guide, e.g. kataba or kitaabun.',
    }),
    defineField({
      name: 'audioUrl',
      title: 'Audio File / URL',
      type: 'string',
      description: 'Upload link or public URL for pronunciation audio.',
    }),
    defineField({
      name: 'notes',
      title: 'Grammar Notes / Context',
      type: 'text',
      description: 'Additional notes about usage, gender, or preposition combinations.',
    }),
  ],
})
