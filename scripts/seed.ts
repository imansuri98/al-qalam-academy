import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

// Standard seed data payload
const exercises = [
  {
    _id: 'ex-mcq-1',
    _type: 'exercise',
    title: 'Identify Useful Sentence / التمييز بين الجمل',
    type: 'mcq',
    questionText: 'البُسْتَانُ جَمِيلٌ',
    translationText: 'Is this a complete/useful sentence (Jumla Mufida)?',
    options: [
      { text: 'Yes, it forms a complete thought ("The garden is beautiful").', isCorrect: true },
      { text: 'No, it is an incomplete phrase.', isCorrect: false },
    ],
    explanation: 'In Arabic, a nominal sentence starting with a subject (Mubtada) and ending with a predicate (Khabar) forms a complete/useful sentence (Jumla Mufida) without needing an explicit "is" verb in the present tense.',
  },
  {
    _id: 'ex-fib-1',
    _type: 'exercise',
    title: 'Subject Case Ending / إعراب المبتدأ',
    type: 'fill_in_blank',
    questionText: '___ جَمِيلٌ',
    translationText: 'Complete the sentence with the correct case ending for the Subject (Mubtada): "The garden is beautiful."',
    options: [
      { text: 'البُسْتَانُ', isCorrect: true }, // Nominative (Marfoo') - dhammah
      { text: 'البُسْتَانَ', isCorrect: false }, // Accusative (Mansoob)
      { text: 'البُسْتَانِ', isCorrect: false }, // Genitive (Majroor)
    ],
    explanation: 'The Mubtada (subject) in Arabic is always in the Nominative case (Marfoo\'), which is indicated here by the Dhammah case ending (ُ) on the final letter of "البُسْتَانُ".',
  },
  {
    _id: 'ex-dnd-1',
    _type: 'exercise',
    title: 'Assemble Verbal Sentence / تركيب الجملة الفعلية',
    type: 'drag_and_drop',
    questionText: 'قَرَأَ الطَّالِبُ الكِتَابَ',
    translationText: 'Assemble the sentence: "The student read the book."',
    options: [
      { text: 'قَرَأَ' },     // Verb: Read (Fi'l)
      { text: 'الطَّالِبُ' }, // Subject: The student (Fa'il - Marfoo' with dhammah)
      { text: 'الكِتَابَ' },  // Object: The book (Maf'ool bihi - Mansoob with fathah)
    ],
    explanation: 'This is a verbal sentence (Jumla Fi\'liyya) starting with the verb (قَرَأَ), followed by the subject/doer (الطَّالِبُ - Marfoo\' with dhammah), and the direct object (الكِتَابَ - Mansoob with fathah). Notice the case ending differences!',
  }
]

const chapter = {
  _id: 'ch-1',
  _type: 'chapter',
  chapterNumber: 1,
  title: 'الْجُمْلَةُ الْمُفِيدَةُ (The Complete Sentence)',
  slug: { _type: 'slug', current: 'al-jumla-al-mufida' },
  intro: [
    {
      _key: 'b1',
      _type: 'block',
      style: 'normal',
      children: [
        {
          _key: 'b1-c1',
          _type: 'span',
          text: 'In English, we define a sentence as a set of words expressing a complete thought. Similarly, in Classical Arabic grammar, the first foundational concept is the ',
        },
        {
          _key: 'b1-c2',
          _type: 'span',
          text: 'Jumla Mufida (الْجُمْلَةُ الْمُفِيدَةُ)',
          marks: ['strong'],
        },
        {
          _key: 'b1-c3',
          _type: 'span',
          text: ' or Useful Sentence.',
        }
      ]
    },
    {
      _key: 'b2',
      _type: 'block',
      style: 'normal',
      children: [
        {
          _key: 'b2-c1',
          _type: 'span',
          text: 'Let\'s look at an example: ',
        },
        {
          _key: 'b2-c2',
          _type: 'span',
          text: 'البُسْتَانُ جَمِيلٌ',
          marks: ['strong'],
        },
        {
          _key: 'b2-c3',
          _type: 'span',
          text: ' which means "The garden is beautiful." This combination gives us a complete thought, so it is a Jumla Mufida. In contrast, if we say "If the student went..." this is incomplete and is NOT a Jumla Mufida.',
        }
      ]
    }
  ],
  rules: [
    'التَّرْكِيبُ الَّذِي يُفِيدُ فَائِدَةً تَامَّةً يُسَمَّى جُمْلَةً مُفِيدَةً، وَيُسَمَّى أَيْضاً كَلَاماً (The composition which yields a complete benefit is called a useful sentence, and is also named speech).',
    'الجُمْلَةُ المُفِيدَةُ قَدْ تَتَرَكَّبُ مِنْ كَلِمَتَيْنِ، وَقَدْ تَتَرَكَّبُ مِنْ أَكْثَرَ، وَكُلُّ كَلِمَةٍ فِيهَا تُعَدُّ جُزْءاً مِنْهَا (A useful sentence can consist of two words or more; every word is considered a part of it).'
  ],
  exercises: exercises.map(ex => ({
    _type: 'reference',
    _key: ex._id,
    _ref: ex._id
  }))
}

async function runSeed() {
  console.log('--- Generating Local Backup JSON file ---')
  const ndjson = [chapter, ...exercises].map(doc => JSON.stringify(doc)).join('\n')
  const backupPath = path.join(process.cwd(), 'seed-data.json')
  fs.writeFileSync(backupPath, ndjson)
  console.log(`Successfully wrote backup to: ${backupPath}`)

  const writeToken = process.env.SANITY_API_WRITE_TOKEN
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

  if (!writeToken || !projectId || projectId === 'mockproj1') {
    console.log('\n[!] Skipping direct Sanity API seeding because SANITY_API_WRITE_TOKEN or a valid NEXT_PUBLIC_SANITY_PROJECT_ID is missing.')
    console.log('To import this data, run Sanity CLI import:')
    console.log('  npx sanity dataset import seed-data.json production --replace')
    return
  }

  console.log('\n--- Seeding Sanity dataset directly via API ---')
  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-03-19',
    token: writeToken,
    useCdn: false,
  })

  try {
    for (const doc of exercises) {
      console.log(`Upserting exercise: ${doc.title}`)
      await client.createOrReplace(doc)
    }
    console.log(`Upserting chapter: ${chapter.title}`)
    await client.createOrReplace(chapter)
    console.log('Seeding completed successfully!')
  } catch (error) {
    console.error('API Seeding failed:', error)
  }
}

runSeed()
