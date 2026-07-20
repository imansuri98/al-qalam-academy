import { defineType, defineField } from 'sanity'

export const grammarRuleSchema = defineType({
  name: 'grammarRule',
  title: 'Grammar Rule (قاعدة)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Rule Name (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameArabic',
      title: 'Rule Name (Arabic)',
      type: 'string',
      description: 'e.g. الجملة الاسمية or المبتدأ والخبر',
    }),
    defineField({
      name: 'formula',
      title: 'Grammar Formula / Pattern',
      type: 'string',
      description: 'Mathematical-style pattern, e.g., Mubtada (مرفوع) + Khabar (مرفوع)',
    }),
    defineField({
      name: 'explanation',
      title: 'Explanation (English)',
      type: 'text',
      description: 'Comprehensive grammatical breakdown explaining this syntax rule to English speakers.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'examples',
      title: 'Examples',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'example',
          fields: [
            { name: 'arabic', title: 'Arabic Sentence (with Tashkeel)', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'english', title: 'English Translation', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'breakdown', title: 'I\'rab Breakdown / Note', type: 'string', description: 'Brief syntax role explanation' },
          ],
        },
      ],
    }),
  ],
})
