import { defineType, defineField } from 'sanity'

export const chapterSchema = defineType({
  name: 'chapter',
  title: 'Chapter',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'chapterNumber',
      title: 'Chapter Number',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Introductory overview of the chapter.',
    }),
    defineField({
      name: 'sections',
      title: 'Lesson Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          fields: [
            { name: 'title', title: 'Section Title', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'content', title: 'Content (Rich Text)', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() },
          ],
        },
      ],
      description: 'Break the lesson down into sub-sections/topics.',
    }),
    defineField({
      name: 'vocabulary',
      title: 'Vocabulary (المفردات)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'vocabulary' }] }],
      description: 'Words introduced in this lesson.',
    }),
    defineField({
      name: 'grammarRules',
      title: 'Key Grammar Rules (القواعد)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'grammarRule' }] }],
      description: 'Specific grammar rules focused on in this lesson.',
    }),
    defineField({
      name: 'rules',
      title: 'Grammar Highlights (legacy strings)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key rules/takeaways to highlight in callout cards.',
    }),
    defineField({
      name: 'exercises',
      title: 'Exercises',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'exercise' }] }],
      description: 'Exercises included in this chapter.',
    }),
  ],
})
