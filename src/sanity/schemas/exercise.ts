import { defineType, defineField } from 'sanity'

export const exerciseSchema = defineType({
  name: 'exercise',
  title: 'Exercise',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Multiple Choice (MCQ)', value: 'mcq' },
          { title: 'Fill in the Blank', value: 'fill_in_blank' },
          { title: 'Sentence Builder (Drag & Drop)', value: 'drag_and_drop' },
          { title: 'Translate Arabic to English', value: 'translate_ar_en' },
          { title: 'Translate English to Arabic', value: 'translate_en_ar' },
          { title: 'I\'rab Case Ending & Syntax Quiz', value: 'irab' },
          { title: 'Vocabulary Card Matching', value: 'matching' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'questionText',
      title: 'Question Text (Arabic)',
      type: 'string',
      description: 'The Arabic sentence/word to evaluate (e.g. "ذَهَبَ الطَّالِبُ إِلَى المَدْرَسَةِ")',
    }),
    defineField({
      name: 'translationText',
      title: 'Translation / Prompt (English)',
      type: 'string',
      description: 'The English translation prompt (e.g., "The student went to the school")',
    }),
    defineField({
      name: 'options',
      title: 'Options / Word Chips',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'option',
          fields: [
            { name: 'text', title: 'Option/Word Text', type: 'string' },
            { name: 'isCorrect', title: 'Is Correct?', type: 'boolean' },
          ],
        },
      ],
      description: 'Provide options for MCQ, correct answers for Fill-in-the-Blank, or correct word ordering for Translation/Sentence Builder.',
    }),
    defineField({
      name: 'highlightedWord',
      title: 'Highlighted Word (For I\'rab)',
      type: 'string',
      description: 'Which word in the questionText should be highlighted (e.g. "الطَّالِبُ")',
      hidden: ({ document }) => document?.type !== 'irab',
    }),
    defineField({
      name: 'irabVowelOptions',
      title: 'I\'rab Vowel Options',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'vowelOption',
          fields: [
            { name: 'text', title: 'Vowel Character (e.g., Dhammah ُ )', type: 'string' },
            { name: 'isCorrect', title: 'Is Correct?', type: 'boolean' },
          ],
        },
      ],
      hidden: ({ document }) => document?.type !== 'irab',
    }),
    defineField({
      name: 'irabRoleOptions',
      title: 'I\'rab Grammatical Role Options',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'roleOption',
          fields: [
            { name: 'text', title: 'Grammatical Role (e.g., Mubtada / مبتدأ)', type: 'string' },
            { name: 'isCorrect', title: 'Is Correct?', type: 'boolean' },
          ],
        },
      ],
      hidden: ({ document }) => document?.type !== 'irab',
    }),
    defineField({
      name: 'pairs',
      title: 'Matching Pairs (For Vocabulary Matching)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pair',
          fields: [
            { name: 'arabic', title: 'Arabic Word', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'english', title: 'English Word', type: 'string', validation: (Rule) => Rule.required() },
          ],
        },
      ],
      hidden: ({ document }) => document?.type !== 'matching',
    }),
    defineField({
      name: 'explanation',
      title: 'Grammar Explanation (English)',
      type: 'text',
      description: 'Detailed explanation of the Classical Arabic grammar rules (Qawa\'id) applied.',
    }),
  ],
})
