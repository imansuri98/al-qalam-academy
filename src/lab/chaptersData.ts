import { Chapter } from './types';

export const chaptersData: Chapter[] = [
  {
    id: 1,
    slug: 'muzakkar-and-muannas',
    title: 'Muzakkar and Muannas',
    arabicTitle: 'المُذَكَّر وَالمُؤَنَّث',
    subtitle: 'Masculine and Feminine Gender Rules',
    category: 'Nouns & Basics',
    summary: 'Discover how gender works in Classical Arabic nouns. Learn to spot the Round Ta (ة) and identify feminine exceptions.',
    lessons: [
      {
        id: 'c1-l1',
        title: 'The Gender Binary in Arabic',
        type: 'table',
        text: 'In Classical Arabic, every single noun belongs strictly to one of two genders. See how even inanimate objects are assigned gender:',
        tableHeaders: ['Noun Type', 'Masculine (Muzakkar)', 'Feminine (Muannas)'],
        tableRows: [
          ['Living Beings', 'رَجُلٌ (A man)', 'اِمْرَأَةٌ (A woman)'],
          ['Inanimate Objects', 'بَيْتٌ (A house)', 'سَيَّارَةٌ (A car)'],
          ['Natural Elements', 'بَحْرٌ (A sea)', 'شَمْسٌ (A sun - feminine exception)']
        ]
      },
      {
        id: 'c1-l2',
        title: 'The Main Feminine Sign: Round Ta (ة)',
        type: 'table',
        text: 'The easiest and most common sign of a feminine noun is the Ta Marbuta (ة - Round Ta). Here is how a masculine noun transforms when the Round Ta is attached:',
        tableHeaders: ['Base Masculine', 'Add Suffix', 'Pronunciation Shift', 'Resulting Feminine Form'],
        tableRows: [
          ['صَاحِبٌ (Companion - M)', 'ة', '-un → -atun', 'صَاحِبَةٌ (Companion - F)'],
          ['طَبِيبٌ (Doctor - M)', 'ة', '-un → -atun', 'طَبِيبَةٌ (Doctor - F)'],
          ['جَمِيلٌ (Beautiful - M)', 'ة', '-un → -atun', 'جَمِيلَةٌ (Beautiful - F)']
        ],
        alertMessage: 'Watch the phonetic change: The ة makes a clear "ah" or "at" sound at the end of the word!'
      },
      {
        id: 'c1-l3',
        title: 'Basic Transformation Examples',
        type: 'table',
        tableHeaders: ['Masculine (Muzakkar)', 'Feminine (Muannas)', 'English Meaning'],
        tableRows: [
          ['مُسْلِمٌ (Muslimun)', 'مُسْلِمَةٌ (Muslimatun)', 'Muslim man / Muslim woman'],
          ['صَالِحٌ (Saalihun)', 'صَالِحَةٌ (Saalihatun)', 'Pious man / Pious woman'],
          ['كَبِيرٌ (Kabeerun)', 'كَبِيرَةٌ (Kabeeratun)', 'Big (M) / Big (F)']
        ]
      },
      {
        id: 'c1-l4',
        title: 'Feminine Without Ta Marbuta (ة)',
        type: 'table',
        text: 'For some nouns, there is no physical ة, but the word is treated as naturally or historically feminine. Beginners must learn these classical exceptions:',
        tableHeaders: ['Exception Type', 'Arabic Word', 'Phonetic', 'English Meaning'],
        tableRows: [
          ['Natural / Body Parts', 'يَدٌ', 'Yadun', 'Hand (paired body parts are feminine)'],
          ['Celestial Elements', 'شَمْسٌ', 'Shamsun', 'Sun (historically feminine by usage)'],
          ['Natural Relationships', 'أُمٌّ', 'Ummun', 'Mother (naturally feminine)'],
          ['Proper Girl Names', 'زَيْنَبُ', 'Zaynabu', 'Zainab (all girl proper names are feminine)']
        ]
      },
      {
        id: 'c1-l5',
        title: 'Muzakkar to Muannas Transformation',
        type: 'table',
        tableHeaders: ['Original Form (Muzakkar)', 'Add Suffix', 'Resulting Feminine Form (Muannas)'],
        tableRows: [
          ['مُسْلِمٌ (Muslim - Muslim man)', 'ة', 'مُسْلِمَةٌ (Muslimah - Muslim woman)'],
          ['صَالِحٌ (Saalih - Pious man)', 'ة', 'صَالِحَةٌ (Saalihah - Pious woman)'],
          ['مُؤْمِنٌ (Mumin - Believing man)', 'ة', 'مُؤْمِنَةٌ (Muminah - Believing woman)']
        ]
      },
      {
        id: 'c1-l6',
        title: 'Pattern Recognition',
        type: 'table',
        tableHeaders: ['If You See', 'Usually Means'],
        tableRows: [
          ['ة (Ta Marbuta) at the end of a word', 'Muannas (Feminine)'],
          ['No ة at the end of a word', 'Usually Muzakkar (Masculine)']
        ]
      }
    ],
    quiz: [
      {
        id: 'c1-q1',
        type: 'convert',
        prompt: 'Convert the student "طَالِبٌ" (Student - Masculine) to its Feminine (Muannas) form:',
        options: ['طَالِبَتٌ', 'طَالِبَةٌ', 'طَالِبَاتٌ', 'طَالِبُونَ'],
        correctAnswer: 'طَالِبَةٌ',
        explanation: 'We append the Round Ta (ة) to the end of the original masculine noun: طَالِبٌ + ة = طَالِبَةٌ.'
      },
      {
        id: 'c1-q2',
        type: 'identify',
        prompt: 'What is the gender of the classical noun "شَمْسٌ" (Sun)?',
        options: ['Muzakkar (Masculine)', 'Muannas (Feminine)'],
        correctAnswer: 'Muannas (Feminine)',
        explanation: 'Although شَمْسٌ does not end with ة, it is a famous exception and treated as Feminine in Classical Arabic syntax.'
      },
      {
        id: 'c1-q3',
        type: 'multiple_choice',
        prompt: 'Which of the following is the main sign of feminine gender in Arabic nouns?',
        options: ['Tanween (ـٌ)', 'Silent Sukoon (ـْ)', 'Round Ta / Taa Marbuta (ة)', 'Fatha (ـَ)'],
        correctAnswer: 'Round Ta / Taa Marbuta (ة)',
        explanation: 'The Round Ta (ة) is the standard physical indicator of feminine Arabic words.'
      }
    ]
  },
  {
    id: 2,
    slug: 'numbers-in-arabic',
    title: 'Numbers in Arabic',
    arabicTitle: 'المُفْرَد، التَّثْنِيَة، الجَمْع',
    subtitle: 'Singular, Dual, and Plural',
    category: 'Nouns & Basics',
    summary: 'Master the unique dual form of Classical Arabic (exactly two) alongside singular and plural suffixes.',
    lessons: [
      {
        id: 'c2-l1',
        title: 'Number Systems: English vs Arabic',
        type: 'table',
        text: 'Unlike English which only has singular and plural, classical Arabic features a precise three-state number system with a dedicated dual ending:',
        tableHeaders: ['Number of Items', 'English Group', 'Arabic Grammatical Category', 'Suffix Feature'],
        tableRows: [
          ['Exactly One (1)', 'Singular', 'Wahid (وَاحِد)', 'Base word form (e.g., مُسْلِمٌ)'],
          ['Exactly Two (2)', 'Plural', 'Tasniya (تَثْنِيَة - Dual)', 'Special suffix ـَانِ (aani)'],
          ['Three or More (3+)', 'Plural', 'Jama (جَمْع - Plural)', 'Suffix ـُونَ (oona) or ـَاتٌ (aatun)']
        ]
      },
      {
        id: 'c2-l2',
        title: 'Noun Number Classifications',
        type: 'table',
        tableHeaders: ['Class Name', 'Arabic Form', 'English Description'],
        tableRows: [
          ['Wahid (واحِد)', 'وَاحِد', 'Singular (One of something)'],
          ['Tasniya (تَثْنِيَة)', 'تَثْنِيَة', 'Dual (Exactly two of something)'],
          ['Jama (جَمْع)', 'جَمْع', 'Plural (Three or more of something)']
        ]
      },
      {
        id: 'c2-l3',
        title: 'Masculine Number Transformation',
        type: 'table',
        tableHeaders: ['Number State', 'Arabic Form', 'Pronunciation / Suffix Added'],
        tableRows: [
          ['One (Singular)', 'مُسْلِمٌ', 'Muslim (One Muslim man - Base form)'],
          ['Two (Dual)', 'مُسْلِمَانِ', 'Muslimāni (Two Muslim men - Suffix + ـَانِ)'],
          ['Many (Plural)', 'مُسْلِمُونَ', 'Muslimūna (Three or more Muslim men - Suffix + ـُونَ)']
        ]
      },
      {
        id: 'c2-l3-fem',
        title: 'Feminine Number Transformation',
        type: 'table',
        tableHeaders: ['Number State', 'Arabic Form', 'Pronunciation / Suffix Added'],
        tableRows: [
          ['One (Singular)', 'مُسْلِمَةٌ', 'Muslimah (One Muslim woman - Base form with ة)'],
          ['Two (Dual)', 'مُسْلِمَتَانِ', 'Muslimatāni (Two Muslim women - Change ة to open ت and add ـَانِ)'],
          ['Many (Plural)', 'مُسْلِمَاتٌ', 'Muslimātun (Three or more Muslim women - Remove ة and add ـَاتٌ)']
        ]
      },
      {
        id: 'c2-l4',
        title: 'Sufflation Master Patterns',
        type: 'table',
        tableHeaders: ['Number Step', 'Masculine (Muzakkar)', 'Feminine (Muannas)'],
        tableRows: [
          ['Original (Singular)', 'مُسْلِمٌ', 'مُسْلِمَةٌ'],
          ['Dual (Two)', 'Add suffix: + ـَانِ', 'Change ة → ت and add: + ـَانِ'],
          ['Plural (Many / 3+)', 'Add suffix: + ـُونَ', 'Remove ة and add suffix: + ـَاتٌ']
        ]
      },
      {
        id: 'c2-l5',
        title: 'More Classical Examples',
        type: 'table',
        tableHeaders: ['Noun Type', 'Singular (1)', 'Dual (2)', 'Plural (3+)'],
        tableRows: [
          ['Masc "Pious"', 'صَالِحٌ', 'صَالِحَانِ', 'صَالِحُونَ'],
          ['Fem "Pious"', 'صَالِحَةٌ', 'صَالِحَتَانِ', 'صَالِحَاتٌ'],
          ['Masc "Scholar"', 'عَالِمٌ', 'عَالِمَانِ', 'عَالِمُونَ'],
          ['Fem "Scholar"', 'عَالِمَةٌ', 'عَالِمَتَانِ', 'عَالِمَاتٌ']
        ]
      }
    ],
    quiz: [
      {
        id: 'c2-q1',
        type: 'convert',
        prompt: 'Convert "مُدَرِّسٌ" (Male Teacher) to its Dual (Tasniya) form:',
        options: ['مُدَرِّسُونَ', 'مُدَرِّسَاتٌ', 'مُدَرِّسَانِ', 'مُدَرِّسَةٌ'],
        correctAnswer: 'مُدَرِّسَانِ',
        explanation: 'We attach "انِ" to form the dual masculine: مُدَرِّسٌ + انِ = مُدَرِّسَانِ.'
      },
      {
        id: 'c2-q2',
        type: 'convert',
        prompt: 'Convert "طَالِبَةٌ" (Female Student) to its Plural (Jama) form:',
        options: ['طَالِبَاتٌ', 'طَالِبَانِ', 'طَالِبَتَانِ', 'طَالِبُونَ'],
        correctAnswer: 'طَالِبَاتٌ',
        explanation: 'We remove the ة and append "اتٌ" for feminine plural: طَالِبَةٌ → طَالِبَاتٌ.'
      }
    ]
  },
  {
    id: 3,
    slug: 'ism-e-ishara',
    title: 'Ism-e-Ishāra',
    arabicTitle: 'اِسْم الإِشَارَة',
    subtitle: 'The Pointing Words (This and That)',
    category: 'Nouns & Basics',
    summary: 'Learn the pointing pronouns. Arabic pointing words change according to proximity (near vs miles away), dual numbers, and genders.',
    lessons: [
      {
        id: 'c3-l1',
        title: 'Pointers Matrix Concept',
        type: 'table',
        text: 'In Classical Arabic, pointing words change dynamically based on gender, quantity, and proximity. Let us contrast these elements:',
        tableHeaders: ['Core Attribute', 'English System', 'Arabic (Ism-e-Ishāra) System', 'Required Matching'],
        tableRows: [
          ['Proximity', 'Near (This) vs Far (That)', 'Near (قَرِيب) vs Far (بَعِيد)', 'Must match relative physical distance'],
          ['Gender', 'Selfsame ("this boy", "this girl")', 'Muzakkar (M) vs Muannas (F)', 'Pointer gender must match target gender'],
          ['Quantity', 'Singular (this) vs Plural (these)', 'Singular (1), Dual (2), Plural (3+)', 'Pointer must match quantity state']
        ]
      },
      {
        id: 'c3-l1-secret',
        title: 'Pointer Selection Process',
        type: 'table',
        tableHeaders: ['Question to Ask', 'Example Options / Decision', 'Arabic Reference'],
        tableRows: [
          ['1. Masculine or Feminine?', 'كِتَابٌ (Book - M) / سَيَّارَةٌ (Car - F)', 'مُذَكَّر / مُؤَنَّث'],
          ['2. One, Two, or Many?', 'وَاحِد (Singular) / اِثْنَانِ (Dual) / جَمْع (Plural)', 'مُفْرَد / تَثْنِيَة / جَمْع'],
          ['3. Near or Far?', 'قَرِيب (Near - "This") / بَعِيد (Far - "That")', 'قَرِيب / بَعِيد']
        ]
      },
      {
        id: 'c3-l2',
        title: 'Pointing to One Person (Singular)',
        type: 'table',
        tableHeaders: ['Type', 'Near ("This")', 'Far ("That")', 'Meaning'],
        tableRows: [
          ['Masculine', 'هَذَا (Haazaa)', 'ذَلِكَ (Zaalika)', 'This / That (M)'],
          ['Feminine', 'هَذِهِ (Haazihi)', 'تِلْكَ (Tilka)', 'This / That (F)']
        ]
      },
      {
        id: 'c3-l2-examples',
        title: 'Examples (Singular)',
        type: 'table',
        text: 'Observe these singular pointing combinations and how the pointing pronoun aligns with its companion noun:',
        tableHeaders: ['Pointer Type', 'Arabic Phrase', 'Pronunciation', 'English Translation'],
        tableRows: [
          ['Masculine Near', 'هَذَا مُسْلِمٌ', 'Haazaa muslimun', 'This is a Muslim man'],
          ['Masculine Far', 'ذَلِكَ مُسْلِمٌ', 'Zaalika muslimun', 'That is a Muslim man'],
          ['Feminine Near', 'هَذِهِ مُسْلِمَةٌ', 'Haazihi muslimatun', 'This is a Muslim woman'],
          ['Feminine Far', 'تِلْكَ مُسْلِمَةٌ', 'Tilka muslimatun', 'That is a Muslim woman']
        ]
      },
      {
        id: 'c3-l3',
        title: 'Pointing to Two People (Dual)',
        type: 'table',
        tableHeaders: ['Type', 'Near ("These Two")', 'Far ("Those Two")', 'Meaning'],
        tableRows: [
          ['Masculine', 'هَذَانِ (Haazaani)', 'ذَانِكَ (Zaanika)', 'These / Those Two (M)'],
          ['Feminine', 'هَاتَانِ (Haataani)', 'تَانِكَ (Taanika)', 'These / Those Two (F)']
        ]
      },
      {
        id: 'c3-l3-examples',
        title: 'Examples (Dual)',
        type: 'table',
        text: 'Notice how dual pointer pronouns match exactly two nouns, retaining gender distinctions:',
        tableHeaders: ['Pointer Type', 'Arabic Phrase', 'Pronunciation', 'English Translation'],
        tableRows: [
          ['Masculine Near (2)', 'هَذَانِ مُسْلِمَانِ', 'Haazaani muslimaani', 'These two are Muslim men'],
          ['Masculine Far (2)', 'ذَانِكَ مُسْلِمَانِ', 'Zaanika muslimaani', 'Those two are Muslim men'],
          ['Feminine Near (2)', 'هَاتَانِ مُسْلِمَتَانِ', 'Haataani muslimataani', 'These two are Muslim women'],
          ['Feminine Far (2)', 'تَانِكَ مُسْلِمَتَانِ', 'Taanika muslimataani', 'Those two are Muslim women']
        ]
      },
      {
        id: 'c3-l4',
        title: 'Pointing to Many (Plural - 3+)',
        type: 'table',
        tableHeaders: ['Type', 'Near ("These")', 'Far ("Those")', 'Meaning'],
        tableRows: [
          ['Masc & Fem', 'هَؤُلَاءِ (Haa\'ulaa\'i)', 'أُولَئِكَ (Ulaa\'ika)', 'These / Those (M & F Plural)']
        ]
      },
      {
        id: 'c3-l4-examples',
        title: 'Examples (Plural)',
        type: 'table',
        text: 'In plural pointers (3+), near and far pronouns are shared across both genders, simplifying your choices:',
        tableHeaders: ['Pointer Type', 'Arabic Phrase', 'Pronunciation', 'English Translation'],
        tableRows: [
          ['Near Plural (M)', 'هَؤُلَاءِ مُسْلِمُونَ', 'Haau’laai muslimoona', 'These are Muslim men'],
          ['Far Plural (M)', 'أُولَئِكَ مُسْلِمُونَ', 'Ulaasa muslimoona', 'Those are Muslim men'],
          ['Near Plural (F)', 'هَؤُلَاءِ مُسْلِمَاتٌ', 'Haau’laai muslimaatun', 'These are Muslim women'],
          ['Far Plural (F)', 'أُولَئِكَ مُسْلِمَاتٌ', 'Ulaasa muslimaatun', 'Those are Muslim women']
        ]
      },
      {
        id: 'c3-l5-golden',
        title: 'Ism-e-Ishāra Master Summary Grid',
        type: 'table',
        tableHeaders: ['Number State', 'Masculine Near', 'Masculine Far', 'Feminine Near', 'Feminine Far'],
        tableRows: [
          ['One (Singular)', 'هَذَا', 'ذَلِكَ', 'هَذِهِ', 'تِلْكَ'],
          ['Two (Dual)', 'هَذَانِ', 'ذَانِكَ', 'هَاتَانِ', 'تَانِكَ'],
          ['Many (Plural)', 'هَؤُلَاءِ', 'أُولَئِكَ', 'هَؤُلَاءِ', 'أُولَئِكَ']
        ]
      }
    ],
    quiz: [
      {
        id: 'c3-q1',
        type: 'multiple_choice',
        prompt: 'Fill in the blank with the correct near pointing word: "_______ طَالِبَةٌ" (A female student).',
        options: ['هَذَا', 'هَذِهِ', 'ذَلِكَ', 'تِلْكَ'],
        correctAnswer: 'هَذِهِ',
        explanation: 'Since طَالِبَةٌ is singular and feminine ending in Taa Marbuta, we must configure "هَذِهِ" (This - female).'
      },
      {
        id: 'c3-q2',
        type: 'multiple_choice',
        prompt: 'Fill in the blank with the correct far pointing word: "_______ صَالِحَانِ" (Two pious men - Dual Masculine).',
        options: ['ذَانِكَ', 'تَانِكَ', 'أُولَئِكَ', 'تِلْكَ'],
        correctAnswer: 'ذَانِكَ',
        explanation: 'ذَانِكَ is the far pointing word for Dual Masculine nouns ("Those two men").'
      }
    ]
  },
  {
    id: 4,
    slug: 'dhama-ir-pronouns',
    title: 'Dhamā’ir',
    arabicTitle: 'الضَّمَائِر',
    subtitle: 'Arabic Pronouns (Independent & Attached)',
    category: 'Nouns & Basics',
    summary: 'Replace repetitive nouns with Arabic pronouns. Contrast stand-alone pronouns with possessive endings.',
    lessons: [
      {
        id: 'c4-l1',
        title: 'The Grammar of Pronouns (Dhamā’ir)',
        type: 'table',
        text: 'Arabic pronouns are classified into three distinct points of view (perspectives), each carrying dedicated forms:',
        tableHeaders: ['Grammatical Perspective', 'Arabic Name', 'Functional Focus', 'Example Meaning'],
        tableRows: [
          ['Third Person (Absent)', 'Ghaa’ib (غَائب)', 'Referring to someone not present', 'He, She, They'],
          ['Second Person (Addressed)', 'Haadir (حَاضِر)', 'Direct dialogue with the listener', 'You, You all'],
          ['First Person (Speaker)', 'Mutakallim (مُتَكَلِّم)', 'Speaking from self-identity', 'I, We']
        ]
      },
      {
        id: 'c4-l1-why',
        title: 'Natural Pronoun Substitutions',
        type: 'table',
        text: 'Pronouns streamline speeches. Observe how Arabic replaces repetitive proper nouns with pronouns:',
        tableHeaders: ['Noun Context', 'Repetitive Phrase', 'With Pronoun Suffix/Word', 'English Transition'],
        tableRows: [
          ['Subject Word', 'مُحَمَّدٌ مُسْلِمٌ. مُحَمَّدٌ مُجْتَهِدٌ', 'مُحَمَّدٌ مُسْلِمٌ. هُوَ مُجْتَهِدٌ', 'Muhammad is a Muslim. He is hardworking.'],
          ['Possessive Asset', 'كِتَابُ مُسْلِمٍ (Book of Muslim)', 'كِتَابُهُ (Book of Him)', 'His book']
        ]
      },
      {
        id: 'c4-l1-types',
        title: 'Two Main Classes of Pronouns',
        type: 'table',
        text: 'Arabic split pronouns into separate standalone words and attached suffix units:',
        tableHeaders: ['Pronoun Class', 'Arabic Term', 'Shorthand Property', 'Example Form'],
        tableRows: [
          ['Separate Pronouns', 'الضَّمَائِرُ الْمُنْفَصِلَةُ', 'Stands independently as a separate word', 'هُوَ (Huwa - He)'],
          ['Attached Pronouns', 'الضَّمَائِرُ الْمُتَّصِلَةُ', 'Glues to the end of nouns, verbs, or particles', 'ـهُ (-hu - His)']
        ]
      },
      {
        id: 'c4-l2',
        title: '3rd Person Separate Pronouns (The Absent - الغائب)',
        type: 'table',
        tableHeaders: ['Pronoun Class/Perspective', 'Arabic Standalone Word', 'Pronunciation', 'Associated English Meaning', 'Classical Model Example'],
        tableRows: [
          ['Masc. Singular (He)', 'هُوَ', 'Huwa', 'He / It (Masc)', 'هُوَ مُسْلِمٌ (He is a Muslim)'],
          ['Masc. Dual (They two men)', 'هُمَا', 'Humā', 'They two (Masc)', 'هُمَا مُسْلِمَانِ (They two are Muslims)'],
          ['Masc. Plural (They men)', 'هُمْ', 'Hum', 'They (Masc Plural)', 'هُمْ مُسْلِمُونَ (They are Muslims)'],
          ['Fem. Singular (She)', 'هِيَ', 'Hiya', 'She / It (Fem)', 'هِيَ مُسْلِمَةٌ (She is a Muslim woman)'],
          ['Fem. Dual (They two women)', 'هُمَا', 'Humā', 'They two (Fem)', 'هُمَا مُسْلِمَتَانِ (They two women are Muslims)'],
          ['Fem. Plural (They women)', 'هُنَّ', 'Hunna', 'They (Fem Plural)', 'هُنَّ مُسْلِمَاتٌ (They women are Muslims)']
        ]
      },
      {
        id: 'c4-l3',
        title: '2nd Person Pronouns (The Addressed - الحاضر)',
        type: 'table',
        tableHeaders: ['Pronoun Class/Perspective', 'Arabic Standalone Word', 'Pronunciation', 'Associated English Meaning', 'Classical Model Example'],
        tableRows: [
          ['Masc. Singular (You man)', 'أَنْتَ', 'Anta', 'You (Masc Singular)', 'أَنْتَ مُسْلِمٌ (You are a Muslim man)'],
          ['Masc. Dual (You two men)', 'أَنْتُمَا', 'Antumā', 'You two (Masc)', 'أَنْتُمَا مُسْلِمَانِ (You two are Muslims)'],
          ['Masc. Plural (You all men)', 'أَنْتُمْ', 'Antum', 'You all (Masc Plural)', 'أَنْتُمْ مُسْلِمُونَ (You all are Muslims)'],
          ['Fem. Singular (You woman)', 'أَنْتِ', 'Antī', 'You (Fem Singular)', 'أَنْتِ مُسْلِمَةٌ (You are a Muslim woman)'],
          ['Fem. Dual (You two women)', 'أَنْتُمَا', 'Antumā', 'You two (Fem)', 'أَنْتُمَا مُسْلِمَتَانِ (You two women are Muslims)'],
          ['Fem. Plural (You all women)', 'أَنْتُنَّ', 'Antunna', 'You all (Fem Plural)', 'أَنْتُنَّ مُسْلِمَاتٌ (You all women are Muslims)']
        ]
      },
      {
        id: 'c4-l3-mutakallim',
        title: '1st Person Pronouns (The Speaker - المتكلم)',
        type: 'table',
        tableHeaders: ['Pronoun', 'Meaning', 'Example', 'Translation'],
        tableRows: [
          ['أَنَا (Ana)', 'I (M & F)', 'أَنَا مُسْلِمٌ', 'I am a Muslim'],
          ['نَحْنُ (Nahnu)', 'We (M & F Dual & Plural)', 'نَحْنُ مُسْلِمُونَ', 'We are Muslims']
        ]
      },
      {
        id: 'c4-l3-attached-intro',
        title: 'Suffix Pronouns in Action',
        type: 'table',
        text: 'Attached pronouns connect directly to other words to show possession and owner relations:',
        tableHeaders: ['Base Noun', 'Suffix Pronoun', 'Combined Written Word', 'Resulting Meaning'],
        tableRows: [
          ['كِتَابٌ (Book)', 'ـهُ (-hu / His)', 'كِتَابُهُ (Kitābuhu)', 'His book'],
          ['بَيْتٌ (House)', 'ـهَا (-hā / Her)', 'بَيْتُهَا (Baytuhā)', 'Her book'],
          ['قَلَمٌ (Pen)', 'ـكَ (-ka / Your)', 'قَلَمُكَ (Qalamuka)', 'Your pen (M)']
        ]
      },
      {
        id: 'c4-l4-3rd',
        title: '3rd Person Attached Pronouns (The Absent - الغائب)',
        type: 'table',
        tableHeaders: ['Pronoun Class/Perspective', 'Arabic Attached Suffix', 'Pronunciation', 'Associated English Meaning', 'Possessive Model Example'],
        tableRows: [
          ['Masc. Singular (His)', 'ـهُ', '-hu', 'His / Him', 'كِتَابُهُ (His book)'],
          ['Masc. Dual (Their two men)', 'ـهُمَا', '-humā', 'Their two (Masc)', 'كِتَابُهُمَا (Their two men’s book)'],
          ['Masc. Plural (Their men)', 'ـهُمْ', '-hum', 'Their (Masc Plural)', 'كِتَابُهُمْ (Their men’s book)'],
          ['Fem. Singular (Her)', 'ـهَا', '-hā', 'Her', 'كِتَابُهَا (Her book)'],
          ['Fem. Dual (Their two women)', 'ـهُمَا', '-humā', 'Their two (Fem)', 'كِتَابُهُمَا (Their two women’s book)'],
          ['Fem. Plural (Their women)', 'ـهُنَّ', '-hunna', 'Their (Fem Plural)', 'كِتَابُهُنَّ (Their women’s book)']
        ]
      },
      {
        id: 'c4-l4-2nd',
        title: '2nd Person Attached Pronouns (The Addressed - الحاضر)',
        type: 'table',
        tableHeaders: ['Pronoun Class/Perspective', 'Arabic Attached Suffix', 'Pronunciation', 'Associated English Meaning', 'Possessive Model Example'],
        tableRows: [
          ['Masc. Singular (Your man)', 'ـكَ', '-ka', 'Your (Masc Singular)', 'كِتَابُكَ (Your book)'],
          ['Masc. Dual (Your two men)', 'ـكُمَا', '-kumā', 'Your two (Masc)', 'كِتَابُكُمَا (Your two men’s book)'],
          ['Masc. Plural (Your all men)', 'ـكُمْ', '-kum', 'Your all (Masc Plural)', 'كِتَابُكُمْ (Your all men’s book)'],
          ['Fem. Singular (Your woman)', 'ـكِ', '-ki', 'Your (Fem Singular)', 'كِتَابُكِ (Your book)'],
          ['Fem. Dual (Your two women)', 'ـكُمَا', '-kumā', 'Your two (Fem)', 'كِتَابُكُمَا (Your two women’s book)'],
          ['Fem. Plural (Your all women)', 'ـكُنَّ', '-kunna', 'Your all (Fem Plural)', 'كِتَابُكُنَّ (Your all women’s book)']
        ]
      },
      {
        id: 'c4-l4-1st',
        title: '1st Person Attached Pronouns (The Speaker - المتكلم)',
        type: 'table',
        tableHeaders: ['Pronoun Suffix', 'Meaning', 'Possessive Example', 'Translation'],
        tableRows: [
          ['ـي (-ī)', 'My', 'كِتَابِي (Kitābī)', 'My book'],
          ['ـنَا (-nā)', 'Our / Us (Dual & Plural)', 'كِتَابُنَا (Kitābu-nā)', 'Our book']
        ]
      },
      {
        id: 'c4-l5-comparison',
        title: 'Pronoun Contrast: Separate vs Attached',
        type: 'table',
        tableHeaders: ['Meaning / Category', 'Separate Standalone Form', 'Attached Suffix Form'],
        tableRows: [
          ['He / His (Masculine Singular)', 'هُوَ (Huwa)', 'ـهُ (-hu)'],
          ['They Two / Theirs (Masculine Dual)', 'هُمَا (Humā)', 'ـهُمَا (-humā)'],
          ['They / Theirs (Masculine Plural)', 'هُمْ (Hum)', 'ـهُمْ (-hum)'],
          ['She / Hers (Feminine Singular)', 'هِيَ (Hiya)', 'ـهَا (-hā)'],
          ['They Two / Theirs (Feminine Dual)', 'هُمَا (Humā)', 'ـهُمَا (-humā)'],
          ['They / Theirs (Feminine Plural)', 'هُنَّ (Hunna)', 'ـهُنَّ (-hunna)'],
          ['You / Yours (Masculine Singular)', 'أَنْتَ (Anta)', 'ـكَ (-ka)'],
          ['You Two / Yours (Masculine Dual)', 'أَنْتُمَا (Antumā)', 'ـكُمَا (-kumā)'],
          ['You All / Yours (Masculine Plural)', 'أَنْتُمْ (Antum)', 'ـكُمْ (-kum)'],
          ['You / Yours (Feminine Singular)', 'أَنْتِ (Antī)', 'ـكِ (-ki)'],
          ['You Two / Yours (Feminine Dual)', 'أَنْتُمَا (Antumā)', 'ـكُمَا (-kumā)'],
          ['You All / Yours (Feminine Plural)', 'أَنْتُنَّ (Antunna)', 'ـكُنَّ (-kunna)'],
          ['I / My (Common Singular)', 'أَنَا (Ana)', 'ـي (-ī)'],
          ['We / Our (Common Plural & Dual)', 'نَحْنُ (Nahnu)', 'ـنَا (-nā)']
        ]
      },
      {
        id: 'c4-l5-usage',
        title: 'Pronoun Usage Patterns',
        type: 'table',
        tableHeaders: ['Pronoun Type', 'Grammatical Role / Behavior', 'Example Sentence', 'English Translation'],
        tableRows: [
          ['Separate (المنفصلة)', 'Stands alone independently, usually as the subject', 'هُوَ مُسْلِمٌ', 'He is a Muslim'],
          ['Attached (المتصلة)', 'Connects directly as a suffix to show ownership', 'كِتَابُهُ', 'His book']
        ]
      }
    ],
    quiz: [
      {
        id: 'c4-q1',
        type: 'multiple_choice',
        prompt: 'Identify the correct separate pronoun for: "_______ مُسْلِمَاتٌ" (They are Muslim women).',
        options: ['هُمْ', 'أَنْتُمْ', 'هُنَّ', 'أَنَا'],
        correctAnswer: 'هُنَّ',
        explanation: 'هُنَّ is the separate 3rd person plural feminine pronoun ("They, feminine").'
      },
      {
        id: 'c4-q2',
        type: 'multiple_choice',
        prompt: 'Translate the ownership phrase "كِتَابُنَا" correctly:',
        options: ['His book', 'Their book', 'Our book', 'My book'],
        correctAnswer: 'Our book',
        explanation: 'The suffix "-naa" (ـنَا) stands for first person plural possessive ("Our").'
      }
    ]
  },
  {
    id: 5,
    slug: 'marifa-and-nakira',
    title: 'Marifa and Nakira',
    arabicTitle: 'المَعْرِفَة وَالنَّكِرَة',
    subtitle: 'The Specific and the General (A vs The)',
    category: 'Nouns & Basics',
    summary: 'Master the definite and indefinite nouns. Learn the crucial "AL" rule and why double vowels vanish.',
    lessons: [
      {
        id: 'c5-l1',
        title: 'The Balance of Definiteness',
        type: 'table',
        text: 'Nouns are fundamentally split into general entities and specific objects. Contrast these definitions:',
        tableHeaders: ['Category', 'Arabic Term', 'English Concept', 'Typical Ending / Feature'],
        tableRows: [
          ['Indefinite Nouns', 'Nakira (نَكِرَة)', 'General / unspecified ("a" or "some")', 'Ends in Tanween double Pesh (e.g. بَيْتٌ)'],
          ['Definite Nouns', 'Marifa (مَعْرِفَة)', 'Specific / known ("the")', 'Prefixed with اَلـ or is a Proper Name']
        ]
      },
      {
        id: 'c5-l1-diff',
        title: 'Definiteness Sign Recognition Table',
        type: 'table',
        tableHeaders: ['Marker / Sign', 'Usually Indicates', 'Example Word', 'English Translation'],
        tableRows: [
          ['تَنْوِين (Tanween double ending)', 'Nakira (Indefinite / General)', 'بَيْتٌ', 'A house'],
          ['الـ (Al- prefix)', 'Marifa (Definite / Specific)', 'اَلْبَيْتُ', 'The house'],
          ['Proper Name / Person’s Name', 'Marifa (Definite / Specific)', 'مُحَمَّدٌ', 'Muhammad']
        ]
      },
      {
        id: 'c5-l2',
        title: 'Indefinite Sign: Tanween (Double Vowel)',
        type: 'table',
        text: 'Most indefinite general nouns end with a Tanween (Double Pesh "ـٌ" / Double Zabar "ـً" / Double Zair "ـٍ"). See these core examples:',
        tableHeaders: ['Indefinite Noun (Nakira)', 'Pronunciation', 'General Meaning', 'Indication Marker'],
        tableRows: [
          ['رَجُلٌ', 'Rajulun', 'A man (any man)', 'Ends in double damma (tanween)'],
          ['بَيْتٌ', 'Baytun', 'A house (any house)', 'Ends in double damma (tanween)'],
          ['كِتَابٌ', 'Kitābun', 'A book (any book)', 'Ends in double damma (tanween)']
        ]
      },
      {
        id: 'c5-l3',
        title: 'Making a word Specific: The "Al" Rule',
        type: 'table',
        text: 'By adding prefix ال (Al-) to a Nakira word, it becomes Marifa. Crucially, as the prefix joins, the tanween ending is stripped down into a single vowel:',
        tableHeaders: ['Transformation Phase', 'Arabic Form', 'Syntactic Action', 'State Achieved'],
        tableRows: [
          ['Starting Base', 'بَيْتٌ (Baytun)', 'Indefinite noun with Tanween Pesh', 'Nakira (General)'],
          ['Add Prefix (Intermediate)', 'ال + بَيْتٌ', 'Insert definite particle "ال" to front', 'Invalid Combination'],
          ['Drop Tanween (Final)', 'اَلْبَيْتُ (Al-baytu)', 'Convert double Pesh to a single Pesh', 'Marifa (Definite "The House")']
        ],
        alertMessage: '❌ NEVER write: اَلْبَيْتٌ (Al-baytun). It MUST be: اَلْبَيْتُ (Al-baytu).'
      },
      {
        id: 'c5-l4',
        title: 'Nakira to Marifa Conversion',
        type: 'table',
        tableHeaders: ['Nakira (Indefinite)', 'Add ال', 'Resulting Marifa (Definite)', 'Meaning Transition'],
        tableRows: [
          ['بَيْتٌ (Baytun)', 'ال + بَيْتٌ', 'اَلْبَيْتُ', 'A house → The house'],
          ['رَجُلٌ (Rajulun)', 'ال + رَجُلٌ', 'اَلرَّجُلُ', 'A man → The man'],
          ['كِتَابٌ (Kitābun)', 'ال + كِتَابٌ', 'اَلْكِتَابُ', 'A book → The book']
        ]
      }
    ],
    quiz: [
      {
        id: 'c5-q1',
        type: 'convert',
        prompt: 'Convert the general noun "رَجُلٌ" (a man) to its definite form (the man):',
        options: ['اَلرَّجُلٌ', 'اَلرَّجُلُ', 'رَجُلَانِ', 'الرَّجُلِ'],
        correctAnswer: 'اَلرَّجُلُ',
        explanation: 'Add "ال" and drop the tanween double-ending to a single damma (ُ): اَلرَّجُلُ.'
      },
      {
        id: 'c5-q2',
        type: 'identify',
        prompt: 'What type of word is "مَحْمُودٌ" (Mahmud - proper name)?',
        options: ['Nakira (Indefinite)', 'Marifa (Definite)'],
        correctAnswer: 'Marifa (Definite)',
        explanation: 'Names of people are naturally specific (Marifa), even though they might end with a tanween sound!'
      }
    ]
  },
  {
    id: 6,
    slug: 'mubtada-and-khabar',
    title: 'Mubtada and Khabar',
    arabicTitle: 'المُبْتَدَأ وَالخَبَر',
    subtitle: 'Building Simple Sentences (Subject & Predicate)',
    category: 'Sentences',
    summary: 'Construct your first full Arabic sentences using the classic formula: Definite Subject + Indefinite Predicate.',
    lessons: [
      {
        id: 'c6-l1',
        title: 'The Simple Nominal Formula',
        type: 'table',
        text: 'Basic nominal sentences in classical Arabic do not contain primary verbs. Instead, they balance two nominal components:',
        tableHeaders: ['Component Name', 'Arabic Term', 'Functional Role', 'Core Characteristic'],
        tableRows: [
          ['Subject', 'Mubtada (المُبْتَدَأ)', 'The entity being introduced or spoken about', 'Usually Definite (Marifa)'],
          ['Predicate / Information', 'Khabar (الخَبَر)', 'The information provided about the Mubtada', 'Usually Indefinite (Nakira)']
        ]
      },
      {
        id: 'c6-l1-parts',
        title: 'Word Role Analysis Table',
        type: 'table',
        tableHeaders: ['Word', 'Grammatical Role', 'Meaning', 'Grammatical State'],
        tableRows: [
          ['اَلْبَيْتُ (Al-baytu)', 'Mubtada (Subject)', 'The house', 'Definite (Marifa) & Ends in Damma'],
          ['كَبِيرٌ (Kabeerun)', 'Khabar (Information/Predicate)', 'is Big', 'Indefinite (Nakira) & Ends in Tanween']
        ]
      },
      {
        id: 'c6-l2',
        title: 'Vowel Agreement Constraints',
        type: 'table',
        text: 'Mubtada and Khabar share the nominative case (Damma), but differ in definiteness:',
        tableHeaders: ['Component', 'Grammatical Role', 'Definiteness Pattern', 'Ending Vowel State', 'Model Element'],
        tableRows: [
          ['Mubtada', 'Subject', 'Marifa (Definite - with ال prefix)', 'Damma / Pesh (ُـ)', 'اَلْبَيْتُ (The house)'],
          ['Khabar', 'Predicate', 'Nakira (Indefinite)', 'Dammatein / Double Pesh (ٌـ)', 'كَبِيرٌ (is big)']
        ],
        alertMessage: 'Both parts of the sentence end in Damma / Dammatein (nominative case, Marfoo‘)!'
      },
      {
        id: 'c6-l3',
        title: 'Nominal Sentence Structure Patterns',
        type: 'table',
        tableHeaders: ['Structure Formula', 'Arabic Example Phrase', 'Breakdown of Roles', 'English Translation'],
        tableRows: [
          ['Definite Noun (Mubtada) + Indefinite Noun (Khabar)', 'اَلْبَيْتُ كَبِيرٌ', 'اَلْبَيْتُ (Mubtada) + كَبِيرٌ (Khabar)', 'The house is big.'],
          ['Proper Name (Mubtada) + Indefinite Noun (Khabar)', 'مَحْمُودٌ عَالِمٌ', 'مَحْمُودٌ (Mubtada) + عَالِمٌ (Khabar)', 'Mahmud is a scholar.']
        ]
      },
      {
        id: 'c6-l4',
        title: 'The Gender & Number Consistency Rule',
        type: 'table',
        text: 'The Khabar must always mirror both the gender and number of the Mubtada. Proper name Mubtadas do not need "ال" as they are already definite. Observe this full agreement framework across all states:',
        tableHeaders: ['Type / Number & Gender', 'Definiteness State', 'Mubtada (Subject)', 'Khabar (Predicate)', 'Complete Sentence', 'Phonetic Pronunciation', 'English Translation'],
        tableRows: [
          ['Wahid (Singular) - Muzakkar', 'With Alif-Lam (اَلـ)', 'اَلرَّجُلُ', 'صَالِحٌ', 'اَلرَّجُلُ صَالِحٌ', 'Al-rajulu saalihun', 'The man is pious.'],
          ['Wahid (Singular) - Mu’annas', 'With Alif-Lam (اَلـ)', 'اَلْبِنْتُ', 'صَالِحَةٌ', 'اَلْبِنْتُ صَالِحَةٌ', 'Al-bintu saalihatun', 'The girl is pious.'],
          ['Wahid (Singular) - Muzakkar', 'Proper Name (No Alif-Lam)', 'زَيْدٌ', 'صَالِحٌ', 'زَيْدٌ صَالِحٌ', 'Zaydun saalihun', 'Zayd is pious.'],
          ['Wahid (Singular) - Mu’annas', 'Proper Name (No Alif-Lam)', 'عَائِشَةُ', 'صَالِحَةٌ', 'عَائِشَةُ صَالِحَةٌ', 'Aishatu saalihatun', 'Aishah is pious.'],
          ['Tasniya (Dual) - Muzakkar', 'With Alif-Lam (اَلـ)', 'اَلرَّجُلَانِ', 'صَالِحَانِ', 'اَلرَّجُلَانِ صَالِحَانِ', 'Al-rajulaani saalihaani', 'The two men are pious.'],
          ['Tasniya (Dual) - Mu’annas', 'With Alif-Lam (اَلـ)', 'اَلْبِنْتَانِ', 'صَالِحَتَانِ', 'اَلْبِنْتَانِ صَالِحَتَانِ', 'Al-bintaani saalihataani', 'The two girls are pious.'],
          ['Tasniya (Dual) - Muzakkar', 'Proper Names (No Alif-Lam)', 'زَيْدٌ وَخَالِدٌ', 'صَالِحَانِ', 'زَيْدٌ وَخَالِدٌ صَالِحَانِ', 'Zaydun wa Khaalidun saalihaani', 'Zayd and Khalid are pious.'],
          ['Tasniya (Dual) - Mu’annas', 'Proper Names (No Alif-Lam)', 'عَائِشَةُ وَفَاطِمَةُ', 'صَالِحَتَانِ', 'عَائِشَةُ وَفَاطِمَةُ صَالِحَتَانِ', 'Aishatu wa Faatimatu saalihataani', 'Aishah and Fatimah are pious.'],
          ['Jama‘ (Plural) - Muzakkar', 'With Alif-Lam (اَلـ)', 'اَلْمُسْلِمُونَ', 'صَالِحُونَ', 'اَلْمُسْلِمُونَ صَالِحُونَ', 'Al-muslimoona saalihoona', 'The Muslims are pious.'],
          ['Jama‘ (Plural) - Mu’annas', 'With Alif-Lam (اَلـ)', 'اَلْمُسْلِمَاتُ', 'صَالِحَاتٌ', 'اَلْمُسْلِمَاتُ صَالِحَاتٌ', 'Al-muslimaatu saalihaatun', 'The Muslim women are pious.'],
          ['Jama‘ (Plural) - Muzakkar', 'Proper Names (No Alif-Lam)', 'زَيْدٌ وَخَالِدٌ وَحَامِدٌ', 'صَالِحُونَ', 'زَيْدٌ وَخَالِدٌ وَحَامِدٌ صَالِحُونَ', 'Zaydun wa Khaalidun wa Haamidun saalihoona', 'Zayd, Khalid, and Hamid are pious.'],
          ['Jama‘ (Plural) - Mu’annas', 'Proper Names (No Alif-Lam)', 'عَائِشَةُ وَفَاطِمَةُ وَزَيْنَبُ', 'صَالِحَاتٌ', 'عَائِشَةُ وَفَاطِمَةُ وَزَيْنَبُ صَالِحَاتٌ', 'Aishatu wa Faatimatu wa Zaynabu saalihaatun', 'Aishah, Fatimah, and Zaynab are pious.']
        ],
        alertMessage: '💡 Rule: Notice how Zayd (زَيْدٌ) has no prefix but is a Proper Name, meaning it is naturally Marifa (Definite). Both the subject and predicate agree fully in gender, number, and case!'
      }
    ],
    quiz: [
      {
        id: 'c6-q1',
        type: 'identify',
        prompt: 'In the sentence "اَلْبَيْتُ كَبِيرٌ" (The house is big), what is the grammatical role of "كَبِيرٌ"?',
        options: ['Mubtada', 'Khabar', 'Mudaf', 'Sifat'],
        correctAnswer: 'Khabar',
        explanation: 'كَبِيرٌ is the Khabar (Predicate) because it is indefinite and provides the crucial information about the house.'
      },
      {
        id: 'c6-q2',
        type: 'sentence_builder',
        prompt: 'Build the correct feminine sentence for "The female teacher is pious (صَالِحَة)":',
        options: ['اَلْمُدَرِّسُ صَالِحٌ', 'اَلْمُدَرِّسَةُ صَالِحَةٌ', 'مُدَرِّسَةٌ صَالِحَةٌ', 'اَلْمُدَرِّسَةُ صَالِحٌ'],
        correctAnswer: 'اَلْمُدَرِّسَةُ صَالِحَةٌ',
        explanation: 'The subject must be definite (اَلْمُدَرِّسَةُ) and the predicate must match its gender and be indefinite (صَالِحَةٌ).'
      }
    ]
  },
  {
    id: 7,
    slug: 'mudaf-and-mudaf-ilaih',
    title: 'Mudaf & Mudaf Ilaih',
    arabicTitle: 'المُضَاف وَالمُضَاف إِلَيْه',
    subtitle: 'The Ownership Duo (Possession Syntax)',
    category: 'Sentences',
    summary: 'Show possession and ownership by merging two nouns. Keep the item owned extremely light, and watch the owner drop to the Kasra state.',
    lessons: [
      {
        id: 'c7-l1',
        title: 'The Owner and The Owned',
        type: 'table',
        text: 'To say "Zaid’s pen" or "The door of the house" in Classical Arabic, we link two nouns. They play distinct grammatical roles:',
        tableHeaders: ['Structural Order', 'Grammatical Term', 'Meaning', 'Vowel State'],
        tableRows: [
          ['First Noun', 'Mudaf (المُضَاف)', 'The item being possessed or associated', 'Can take any single ending vowel (No "ال" or Tanween)'],
          ['Second Noun', 'Mudaf Ilaih (المُضَاف إِلَيْه)', 'The owner or entity associated with', '⚠️ ALWAYS Kasra / Majroor state (Zeer)']
        ]
      },
      {
        id: 'c7-l1-works',
        title: 'Ownership Formation Steps',
        type: 'table',
        tableHeaders: ['Formation Step', 'Arabic Word / Phrase', 'Meaning / Role'],
        tableRows: [
          ['1. Item Owned (Book)', 'كِتَابٌ', 'The possessed item (original state)'],
          ['2. Owner (The Student)', 'اَلطَّالِبُ', 'The owner (original state)'],
          ['3. Combined (Possession Duo)', 'كِتَابُ الطَّالِبِ', 'The Book of the Student (The student’s book; Mudaf + Mudaf Ilaih)']
        ]
      },
      {
        id: 'c7-l1-obs',
        title: 'Mudaf Construction Rule Summary',
        type: 'table',
        tableHeaders: ['Attribute / Rule', 'Mudaf (The Owned - First)', 'Mudaf Ilaih (The Owner - Second)'],
        tableRows: [
          ['Position Order', 'First noun in the pair', 'Second noun in the pair'],
          ['Has "ال" (Definite Prefix)?', '❌ NEVER (Forbidden)', 'Usually Definite (Has ال or is a Name)'],
          ['Has Tanween (Double Ending)?', '❌ NEVER (Always single vowel)', 'Can have tanween if indefinite owner (e.g. Zaid)'],
          ['Ending Vowel Case / State', 'Can change depending on sentence', '⚠️ ALWAYS Kasra state (Zeer / Majroor)']
        ]
      },
      {
        id: 'c7-l2',
        title: 'Rules for the Owned Item (Mudaf)',
        type: 'table',
        text: 'The owned item (Mudaf) must be kept light. See this comparative table of valid versus invalid construction rules:',
        tableHeaders: ['Construction Rule', 'Valid Formulation', 'Invalid Formulation', 'Reason'],
        tableRows: [
          ['Forbidden "ال"', 'بَابُ الْبَيْتِ', 'اَلْبَابُ الْبَيْتِ', 'Mudaf can never take the definite prefix "ال"'],
          ['Forbidden Tanween', 'كِتَابُ زَيْدٍ', 'كِتَابٌ زَيْدٍ', 'Mudaf can never end with a double-vowel (Tanween)']
        ],
        alertMessage: '❌ NEVER write: اَلْقَلَمُ زَيْدٍ. It must be: قَلَمُ زَيْدٍ!'
      },
      {
        id: 'c7-l3',
        title: 'Rules for the Owner (Mudaf Ilaih)',
        type: 'table',
        text: 'The owner is always placed in the Zeer (Kasra "ـِ" or "ـٍ") majroor case. Review how this affects different owners:',
        tableHeaders: ['Owner Classification', 'Base Noun', 'Mudaf Ilaih form', 'Full Possession Phrase', 'Resulting Meaning'],
        tableRows: [
          ['Definite Owner', 'اَلطَّالِبُ (The Student)', 'الطَّالِبِ', 'كِتَابُ الطَّالِبِ', 'The student’s book'],
          ['Indefinite Owner', 'طَالِبٌ (A Student)', 'طَالِبٍ', 'كِتَابُ طَالِبٍ', 'A student’s book'],
          ['Proper Name', 'زَيْدٌ (Zaid)', 'زَيْدٍ', 'كِتَابُ زَيْدٍ', 'Zaid’s book']
        ]
      },
      {
        id: 'c7-l4',
        title: 'Examples of Possession Syntax',
        type: 'table',
        tableHeaders: ['Type', 'Arabic Phrase', 'English Translation', 'Breakdown'],
        tableRows: [
          ['General Owner', 'قَلَمُ وَلَدٍ (Qalamu waladin)', 'A boy\'s pen', 'Double Kasra (indefinite)'],
          ['Specific Owner', 'قَلَمُ الْوَلَدِ (Qalamu al-waladi)', 'The boy\'s pen', 'Single Kasra (due to ال)'],
          ['Proper Name', 'قَلَمُ مَحْمُودٍ', 'Mahmud\'s pen', 'Proper name owner with Kasra'],
          ['Noble Phrase', 'كِتَابُ اللهِ (Kitahu l-laahi)', 'The Book of Allah', 'Allah is the Owner (Majroor)']
        ]
      }
    ],
    quiz: [
      {
        id: 'c7-q1',
        type: 'multiple_choice',
        prompt: 'Choose the correct first word (Mudaf) to complete "_______ الْبَيْتِ" (The door of the house):',
        options: ['اَلْبَابُ', 'بَابٌ', 'بَابُ', 'بَابِ'],
        correctAnswer: 'بَابُ',
        explanation: 'According to Mudaf rules, it must be light (no ال and no tanween). Thus, "بَابُ" with a single damma is correct.'
      },
      {
        id: 'c7-q2',
        type: 'multiple_choice',
        prompt: 'Which of the following is correct for "Zaid\'s book"?',
        options: ['كِتَابُ زَيْدٌ', 'كِتَابُ زَيْدٍ', 'كِتَابٌ زَيْدٍ', 'اَلْكِتَابُ زَيْدٍ'],
        correctAnswer: 'كِتَابُ زَيْدٍ',
        explanation: 'The owned book (Mudaf) is "كِتَابُ" (light), and Zaid (Mudaf Ilaih) takes the Kasra genitive case "زَيْدٍ".'
      }
    ]
  },
  {
    id: 8,
    slug: 'mausuf-and-sifat',
    title: 'Mausuf & Sifat',
    arabicTitle: 'المَوْصُوف وَالصِّفَة',
    subtitle: 'The Description Duo (Nouns & Adjectives)',
    category: 'Sentences',
    summary: 'Discover descriptive structures. Unlike English, Arabic adjectives follow their nouns and mimic them like a shadow.',
    lessons: [
      {
        id: 'c8-l1',
        title: 'Introduction to Adjectives',
        type: 'table',
        text: 'In English, we say "a pious man" (Adjective before Noun). In Arabic, the order is completely reversed. See the core structure:',
        tableHeaders: ['Language Paradigm', 'Word Order Formula', 'Example Phrase', 'Role Descriptions'],
        tableRows: [
          ['English Syntax', 'Adjective + Noun', 'A pious (Adjective) man (Noun)', 'Descriptor comes before the person'],
          ['Classical Arabic Syntax', 'Mausuf (Noun) + Sifat (Adjective)', 'رَجُلٌ (Mausuf) صَالِحٌ (Sifat)', 'The noun is described first, adjective follows as shadow']
        ]
      },
      {
        id: 'c8-l2',
        title: 'The Shadow Rule ("Follow the Leader")',
        type: 'table',
        text: 'The Sifat is like a shadow of the Mausuf. It must mimic the leader in exactly four core grammatical aspects:',
        tableHeaders: ['Agreement Variable', 'Rule Specification', 'Masculine Noun Example', 'Feminine Noun Example'],
        tableRows: [
          ['1. Vowel Case', 'Must share identical vowel states (Nominative, Accusative, Genitive)', 'رَجُلٌ صَالِحٌ (Damma)', 'بِنْتٌ صَالِحَةٌ (Damma)'],
          ['2. Gender Profile', 'Descriptor must match the gender of the described noun', 'رَجُلٌ صَالِحٌ (Masculine)', 'بِنْتٌ صَالِحَةٌ (Feminine with ة)'],
          ['3. Definiteness (Specificity)', 'If noun takes AL- prefix, adjective MUST also take AL- prefix', 'اَلرَّجُلُ الصَّالِحُ (Definite)', 'اَلْبِنْتُ الصَّالِحَةُ (Definite)'],
          ['4. Number Quantity', 'Singular, Dual, and plural states must align perfectly', 'رَجُلَانِ صَالِحَانِ (Dual)', 'بِنْتَانِ صَالِحَتَانِ (Dual)']
        ]
      },
      {
        id: 'c8-l3',
        title: 'Adjective Agreement Examples',
        type: 'table',
        tableHeaders: ['Class Type', 'Arabic Example', 'Meaning', 'Why? Match Attributes'],
        tableRows: [
          ['Nakira Singular (M)', 'رَجُلٌ صَالِحٌ', 'A pious man', 'Both are indefinite, singular, masculine, with genitive/nominative double Pesh.'],
          ['Nakira Singular (F)', 'اِمْرَأَةٌ صَالِحَةٌ', 'A pious woman', 'Both are indefinite, singular, feminine, ending with ة.'],
          ['Marifa Singular (M)', 'اَلرَّجُلُ الصَّالِحُ', 'The pious man', 'Both have ال and a single Pesh, definite, singular, masculine.'],
          ['Marifa Singular (F)', 'اَلْمَرْأَةُ الصَّالِحَةُ', 'The pious woman', 'Both have ال and a single Pesh, definite, singular, feminine with ة.'],
          ['Nakira Dual (M)', 'رَجُلَانِ صَالِحَانِ', 'Two pious men', 'Both have the dual -āni (ـَانِ) ending, indefinite, dual, masculine.'],
          ['Nakira Dual (F)', 'اِمْرَأَتَانِ صَالِحَتَانِ', 'Two pious women', 'Both have the feminine dual -atāni (ـَتَانِ) ending, indefinite, dual, feminine.'],
          ['Marifa Dual (M)', 'اَلرَّجُلَانِ الصَّالِحَانِ', 'The two pious men', 'Both have ال and the dual -āni (ـَانِ) ending, definite, dual, masculine.'],
          ['Marifa Dual (F)', 'اَلْمَرْأَتَانِ الصَّالِحَتَانِ', 'The two pious women', 'Both have ال and the feminine dual -atāni (ـَتَانِ) ending, definite, dual, feminine.'],
          ['Nakira Plural (M)', 'رِجَالٌ صَالِحُونَ', 'Pious men', 'Plural broken/sound matching, indefinite, masculine.'],
          ['Nakira Plural (F)', 'نِسَاءٌ صَالِحَاتٌ', 'Pious women', 'Plural sound feminine suffix -āt (ـَاتٌ), indefinite, feminine.'],
          ['Marifa Plural (M)', 'اَلرِّجَالُ الصَّالِحُونَ', 'The pious men', 'Both have ال, definite, plural, masculine.'],
          ['Marifa Plural (F)', 'اَلنِّسَاءُ الصَّالِحَاتُ', 'The pious women', 'Both have ال, definite, plural, feminine.']
        ]
      }
    ],
    quiz: [
      {
        id: 'c8-q1',
        type: 'multiple_choice',
        prompt: 'Select the correctly aligned phrase for "The big house" (House is الْبَيْتُ, Big is كَبِير):',
        options: ['بَيْتٌ كَبِيرٌ', 'اَلْبَيْتُ كَبِيرٌ', 'اَلْكَبِيرُ بَيْتٌ', 'اَلْبَيْتُ الْكَبِيرُ'],
        correctAnswer: 'اَلْبَيْتُ الْكَبِيرُ',
        explanation: 'Since "The house" is designated with AL (اَلْبَيْتُ), its adjective must also match with AL and case: "اَلْكَبِيرُ".'
      },
      {
        id: 'c8-q2',
        type: 'multiple_choice',
        prompt: 'Translate correctly: "صَالِحٌ رَجُلٌ" is not valid. How do you write "A pious man"?',
        options: ['رَجُلٌ صَالِحٌ', 'رَجُلُ صَالِحٍ', 'اَلرَّجُلُ صَالِحٌ', 'رَجُلٌ الصَّالِحُ'],
        correctAnswer: 'رَجُلٌ صَالِحٌ',
        explanation: 'Noun (Mausuf) comes first: رَجُلٌ, followed by indefinite matching adjective: صَالِحٌ.'
      }
    ]
  },
  {
    id: 9,
    slug: 'arabic-numbers',
    title: 'Arabic Numbers',
    arabicTitle: 'الأَعْدَاد فِي العَرَبِيَّة',
    subtitle: 'Counting from 1 to 100+ Step-by-Step',
    category: 'Nouns & Basics',
    summary: 'Master counting from simple units, to double digits, compounding rules, and major scales.',
    lessons: [
      {
        id: 'c9-l1',
        title: 'Step 1: Digits 1 to 10',
        type: 'table',
        tableHeaders: ['Number', 'Arabic Script', 'Phonetic Pronunciation'],
        tableRows: [
          ['1', 'وَاحِدٌ', 'Waahidun'],
          ['2', 'اِثْنَانِ', 'Ithnaani'],
          ['3', 'ثَلَاثَةٌ', 'Salaasatun'],
          ['4', 'أَرْبَعَةٌ', 'Arba\'atun'],
          ['5', 'خَمْسَةٌ', 'Khamsatun'],
          ['6', 'سِتَّةٌ', 'Sittatun'],
          ['7', 'سَبْعَةٌ', 'Sab\'atun'],
          ['8', 'ثَمَانِيَةٌ', 'Samaaniyatun'],
          ['9', 'تِسْعَةٌ', 'Tis\'atun'],
          ['10', 'عَشَرَةٌ', 'Asharatun']
        ]
      },
      {
        id: 'c9-l2',
        title: 'Step 2: Numbers 11 to 19',
        type: 'table',
        text: 'The rule is simple: Pick the base minor digit and append عَشَرَ (-ashara). For example, 3 (ثَلَاثَةٌ) becomes ثَلَاثَةَ عَشَرَ. Here is the full list from 11 to 19:',
        tableHeaders: ['Number', 'Arabic Script', 'Phonetic Pronunciation'],
        tableRows: [
          ['11', 'أَحَدَ عَشَرَ', 'Ahada \'ashara'],
          ['12', 'اِثْنَا عَشَرَ', 'Ithna \'ashara'],
          ['13', 'ثَلَاثَةَ عَشَرَ', 'Thalaathata \'ashara'],
          ['14', 'أَرْبَعَةَ عَشَرَ', 'Arba\'ata \'ashara'],
          ['15', 'خَمْسَةَ عَشَرَ', 'Khamsata \'ashara'],
          ['16', 'سِتَّةَ عَشَرَ', 'Sittata \'ashara'],
          ['17', 'سَبْعَةَ عَشَرَ', 'Sab\'ata \'ashara'],
          ['18', 'ثَمَانِيَةَ عَشَرَ', 'Thamaaniyata \'ashara'],
          ['19', 'تِسْعَةَ عَشَرَ', 'Tis\'ata \'ashara']
        ]
      },
      {
        id: 'c9-l3',
        title: 'Step 3: Decimals / The Tens Scale (20 to 90)',
        type: 'table',
        tableHeaders: ['NumberValue', 'Arabic Word', 'Pronunciation Pattern'],
        tableRows: [
          ['20', 'عِشْرُونَ', 'Ishroona'],
          ['30', 'ثَلَاثُونَ', 'Salaasoona'],
          ['40', 'أَرْبَعُونَ', 'Arba\'oona'],
          ['50', 'خَمْسُونَ', 'Khamsoona'],
          ['60', 'سِتُّونَ', 'Sittoona'],
          ['70', 'سَبْعُونَ', 'Sab\'oona'],
          ['80', 'ثَمَانُونَ', 'Samaanoona'],
          ['90', 'تِسْعُونَ', 'Tis\'oona']
        ]
      },
      {
        id: 'c9-l4',
        title: 'Step 4: Compounding Digits (21-29)',
        type: 'table',
        text: 'To count double-digits (21-29), state the minor digit first, add the conjunction "وَ" (and), and finish with the tens decimal:',
        tableHeaders: ['Target Number', 'Minor Digit', 'Conjunction (and)', 'Decimal Tens', 'Combined Arabic Form', 'Pronunciation'],
        tableRows: [
          ['21', 'وَاحِدٌ', 'وَ', 'عِشْرُونَ', 'وَاحِدٌ وَعِشْرُونَ', 'Waahidun wa-ʿishrūna'],
          ['22', 'اِثْنَانِ', 'وَ', 'عِشْرُونَ', 'اِثْنَانِ وَعِشْرُونَ', 'Ithnāni wa-ʿishrūna'],
          ['23', 'ثَلَاثَةٌ', 'وَ', 'عِشْرُونَ', 'ثَلَاثَةٌ وَعِشْرُونَ', 'Thalaathatun wa-ʿishrūna'],
          ['24', 'أَرْبَعَةٌ', 'وَ', 'عِشْرُونَ', 'أَرْبَعَةٌ وَعِشْرُونَ', 'Arba\'atun wa-ʿishrūna'],
          ['25', 'خَمْسَةٌ', 'وَ', 'عِشْرُونَ', 'خَمْسَةٌ وَعِشْرُونَ', 'Khamsatun wa-ʿishrūna'],
          ['26', 'سِتَّةٌ', 'وَ', 'عِشْرُونَ', 'سِتَّةٌ وَعِشْرُونَ', 'Sittatun wa-ʿishrūna'],
          ['27', 'سَبْعَةٌ', 'وَ', 'عِشْرُونَ', 'سَبْعَةٌ وَعِشْرُونَ', 'Sab\'atun wa-ʿishrūna'],
          ['28', 'ثَمَانِيَةٌ', 'وَ', 'عِشْرُونَ', 'ثَمَانِيَةٌ وَعِشْرُونَ', 'Thamaaniyatun wa-ʿishrūna'],
          ['29', 'تِسْعَةٌ', 'وَ', 'عِشْرُونَ', 'تِسْعَةٌ وَعِشْرُونَ', 'Tisʿatun wa-ʿishrūna']
        ],
        alertMessage: '💡 Note: The exact same compounding pattern (Minor Digit + وَ + Tens Value) carries on all the way from 30 to 99! For example, 35 is خَمْسَةٌ وَثَلَاثُونَ (five and thirty - khamsatun wa-thalaathoona) and 99 is تِسْعَةٌ وَتِسْعُونَ (nine and ninety - tis\'atun wa-tis\'oona).'
      },
      {
        id: 'c9-l5',
        title: 'Major Counters',
        type: 'table',
        text: 'For larger numerical scales, Classical Arabic employs stable absolute counters:',
        tableHeaders: ['Numerical Value', 'Arabic Script', 'Phonetic Pronunciation', 'Typical Example'],
        tableRows: [
          ['100', 'مِائَةٌ', 'Mi’atun', 'مِائَةُ كِتَابٍ (100 books)'],
          ['1,000', 'أَلْفٌ', 'Alfun', 'أَلْفُ لَيْلَةٍ (1,000 nights)'],
          ['1,000,000', 'مِلْيُونٌ', 'Milyoonun', 'مِلْيُونُ رَجُلٍ (1,000,000 men)']
        ]
      }
    ],
    quiz: [
      {
        id: 'c9-q1',
        type: 'multiple_choice',
        prompt: 'Which Arabic word represents number 5?',
        options: ['سَبْعَةٌ', 'ثَلَاثَةٌ', 'خَمْسَةٌ', 'وَاحِدٌ'],
        correctAnswer: 'خَمْسَةٌ',
        explanation: 'خَمْسَةٌ means Five in classical numbers.'
      },
      {
        id: 'c9-q2',
        type: 'multiple_choice',
        prompt: 'Translate 24 into Classical Arabic syntax ("Four and Twenty"):',
        options: ['أَرْبَعَةَ عَشَرَ', 'أَرْبَعُونَ', 'أَرْبَعَةٌ وَعِشْرُونَ', 'عِشْرُونَ'],
        correctAnswer: 'أَرْبَعَةٌ وَعِشْرُونَ',
        explanation: 'We bundle minor four (أَرْبَعَةٌ) + "and" (وَ) + twenty (عِشْرُونَ) to get أَرْبَعَةٌ وَعِشْرُونَ.'
      }
    ]
  },
  {
    id: 10,
    slug: 'fil-the-verb',
    title: 'Fi‘l - The Arabic Verb',
    arabicTitle: 'الفِعْل فِي العَرَبِيَّة',
    subtitle: 'The 3 Standard Verb Eras and Root Secrets',
    category: 'Verbs & Conjugations',
    summary: 'Discover the root system (ف ع ل). Learn the difference between Past, Present-Future, and Command verbs.',
    lessons: [
      {
        id: 'c10-l1',
        title: 'Words vs Actions: Parts of Speech',
        type: 'table',
        text: 'Every statement pivots between entities and actions. Contrast the properties of nouns and verbs below:',
        tableHeaders: ['Word Category', 'Arabic Term', 'Functional focus', 'Example', 'Meaning'],
        tableRows: [
          ['Noun', 'Ism (اِسْم)', 'Identifies static persons, places, things', 'كِتَابٌ', 'A book'],
          ['Verb', 'Fiʿl (فِعْل)', 'Describes events bounded by specific timeline', 'كَتَبَ', 'He wrote']
        ]
      },
      {
        id: 'c10-l2',
        title: 'The 3 Distinct Verb Categories',
        type: 'table',
        tableHeaders: ['Verb Classification', 'Arabic Class Name', 'English Translation', 'Model Root Example'],
        tableRows: [
          ['Past Tense', 'مَاضِي', 'Finished Action (did)', 'كَتَبَ (He wrote)'],
          ['Present & Future', 'مُضَارِع', 'Ongoing / Future (does)', 'يَكْتُبُ (He writes / will write)'],
          ['Command & Negative', 'أَمْر / نَهْي', 'Direct actions (Do! / Don\'t!)', 'اُكْتُبْ / لَا تَكْتُبْ']
        ]
      },
      {
        id: 'c10-l3',
        title: 'The 3-Letter Root Secret (ك-ت-ب)',
        type: 'table',
        text: 'Nearly every verb maps to a 3-letter semantic anchor. See how the root ك-ت-ب (writing) morphs across the eras:',
        tableHeaders: ['Verb Aspect', 'Arabic Form', 'Transliteration', 'English Translation', 'Syntactic Focus'],
        tableRows: [
          ['Past Tense', 'كَتَبَ', 'Kataba', 'He wrote', 'Finished action (suffix rules)'],
          ['Present Tense', 'يَكْتُبُ', 'Yaktubu', 'He writes / will write', 'Ongoing action (prefix-suffix rules)'],
          ['Command Form', 'اُكْتُبْ', 'Uktub', 'Write! (Order)', 'Imperative action (silent ending)']
        ],
        alertMessage: 'We conjugate the root by changing suffixes and prefixes!'
      },
      {
        id: 'c10-l4',
        title: 'The Suffix Paradigm of Past Verbs',
        type: 'table',
        text: 'Instead of separate verbs, Arabic simply appends standard suffixes to represent different doers. See how consistent these endings are:',
        tableHeaders: ['Subject Actor', 'Added Suffix Sg.', 'Model Conjugate (فَعَلَ)', 'Root: كَتَبَ (Write)', 'English Translation'],
        tableRows: [
          ['3rd person Masculine (He)', 'None (Base)', 'فَعَلَ', 'كَتَبَ', 'He wrote'],
          ['1st person Singular (I)', 'ـْتُ', 'فَعَلْتُ', 'كَتَبْتُ', 'I wrote'],
          ['3rd person Plural (They)', 'ـُوا', 'فَعَلُوا', 'كَتَبُوا', 'They wrote'],
          ['1st person Plural (We)', 'ـْنَا', 'فَعَلْنَا', 'كَتَبْنَا', 'We wrote']
        ]
      },
      {
        id: 'c10-l5',
        title: 'The 14 Segas of Past Tense Conjugation (Using نَصَرَ)',
        type: 'table',
        text: 'Let us see how the base verb **نَصَرَ** ("He helped") conjugates through all 14 Segas according to who did the action:',
        tableHeaders: ['Subject / Person', 'Arabic Form', 'What Changed', 'English Meaning'],
        tableRows: [
          ['3rd Person Masc (He)', 'نَصَرَ', 'Base form', 'He helped'],
          ['3rd Person Masc Dual (Two men)', 'نَصَرَا', 'Added ا to the end (ر → رَا)', 'Two men helped'],
          ['3rd Person Masc Plural (They)', 'نَصَرُوا', 'Added وا to the end (ر → رُوا)', 'They helped'],
          ['3rd Person Fem (She)', 'نَصَرَتْ', 'Added تْ to the end (ر → رَتْ)', 'She helped'],
          ['3rd Person Fem Dual (Two women)', 'نَصَرَتَا', 'Added تَا to the end (ر → رَتَا)', 'Two women helped'],
          ['3rd Person Fem Plural (They women)', 'نَصَرْنَ', 'Added نَ with sukoon on last root (ر → رْنَ)', 'They women helped'],
          ['2nd Person Masc (You man)', 'نَصَرْتَ', 'Added تَ with sukoon on last root (ر → رْتَ)', 'You (man) helped'],
          ['2nd Person Fem (You woman)', 'نَصَرْتِ', 'Added تِ with sukoon on last root (ر → رْتِ)', 'You (woman) helped'],
          ['2nd Person Dual (You two)', 'نَصَرْتُمَا', 'Added تُمَا with sukoon on last root (ر → رْتُمَا)', 'You two helped'],
          ['2nd Person Masc Plural (You all men)', 'نَصَرْتُمْ', 'Added تُمْ with sukoon on last root (ر → رْتُمْ)', 'You all men helped'],
          ['2nd Person Fem Plural (You women)', 'نَصَرْتُنَّ', 'Added تُنَّ with sukoon on last root (ر → رْتُنَّ)', 'You women helped'],
          ['1st Person Singular (I)', 'نَصَرْتُ', 'Added تُ with sukoon on last root (ر → رْتُ)', 'I helped'],
          ['1st Person Plural (We)', 'نَصَرْنَا', 'Added نَا with sukoon on last root (ر → رْنَا)', 'We helped']
        ]
      }
    ],
    quiz: [
      {
        id: 'c10-q1',
        type: 'identify',
        prompt: 'Identify the verb type of "يَكْتُبُ" (He writes):',
        options: ['Māḍī (Past)', 'Muḍāri‘ (Present/Future)', 'Amr (Command)'],
        correctAnswer: 'Muḍāri‘ (Present/Future)',
        explanation: 'Verbs starting with "يـ" like يَكْتُبُ are Muḍāri‘ (Present/Future).'
      },
      {
        id: 'c10-q2',
        type: 'multiple_choice',
        prompt: 'What are the 3 template root letters usually denoted in Arabic grammar models?',
        options: ['ا ب ت', 'ك ت ب', 'ف ع ل', 'ن ص ر'],
        correctAnswer: 'ف ع ل',
        explanation: 'Fā, \'Ayn, and Lām (ف-ع-ل) are the standard universal model letters used to demonstrate verb paradigms.'
      }
    ]
  },
  {
    id: 11.1,
    slug: 'fi-l-fa-il-maf-ool-bihi',
    title: 'Fi‘l, Fā‘il, and Maf‘ool Bihi',
    arabicTitle: 'الفِعْل، الفَاعِل، المَفْعُول بِهِ',
    subtitle: 'The Action, The Doer, and The Receiver',
    category: 'Sentences',
    summary: 'Build robust action sentences. Learn why the doer takes Damma and the receiver/object takes Fatha in the basic verbal sentence structure (Jumla Fi‘liyya).',
    lessons: [
      {
        id: 'c11.1-l1',
        title: 'The Active Clause Components',
        type: 'table',
        text: 'A verbal sentence (Jumla Fiʿliyya) centers around an action. See the three essential pillars:',
        tableHeaders: ['Syntactic Pillar', 'Arabic Term', 'Functional Role', 'Typical Default Case Vowel state'],
        tableRows: [
          ['The Action / Verb', 'Fiʿl (فِعْل)', 'Defines what event occurred', 'Constructed from root letters (e.g. قَرَأَ)'],
          ['The Actor / Doer', 'Fāʿil (فَاعِل)', 'The subject committing the action', 'ALWAYS nominative (Damma / Pesh sound)'],
          ['The Object / Receiver', 'Mafʿool Bihi (مَفْعُول بِهِ)', 'The entity receiving the action directly', 'ALWAYS accusative (Fatha / Zabar sound)']
        ]
      },
      {
        id: 'c11.1-l2',
        title: 'The Secret Ending Case Signs',
        type: 'table',
        text: 'Even if the word order in the sentence is rearranged, the ending vowel signs tell us who did what:',
        tableHeaders: ['Sentence Role', 'Primary Arabic Vowel Case Mark', 'Pronunciation Key', 'Technical State Name'],
        tableRows: [
          ['Subject Actor (Fāʿil)', 'Damma (ُـ / ٌـ) at the end', 'Pesh / Double Pesh sound', 'Marfooʿ (مَرْفُوع)'],
          ['Target Receiver (Mafʿool Bihi)', 'Fatha (َـ / ًـ) at the end', 'Zabar / Double Zabar sound', 'Mansoor / Mansoob (مَنْصُوب)']
        ]
      },
      {
        id: 'c11.1-l3',
        title: 'Analysing a Classic Example',
        type: 'table',
        text: 'Let us decompose the classic clause: قَرَأَ طَالِبٌ كِتَابًا (A student read a book):',
        tableHeaders: ['Written Word', 'Grammatical Role', 'Vowel State', 'English Transliteration & Meaning'],
        tableRows: [
          ['قَرَأَ', 'Fiʿl (Verb)', 'Past Tense Fatha (Mabni)', 'Qaraʾa - Read / Deciphered'],
          ['طَالِبٌ', 'Fāʿil (Doer / Actor)', 'Double Damma (Marfooʿ)', 'Tālibun - A student (did it)'],
          ['كِتَابًا', 'Mafʿool Bihi (Object / Receiver)', 'Double Fatha (Mansoob)', 'Kitāban - A physical book (received it)']
        ]
      }
    ],
    quiz: [
      {
        id: 'c11.1-q1',
        type: 'multiple_choice',
        prompt: 'In "شَرِبَ الْوَلَدُ اللَّبَنَ" (The boy drank the milk), why does "اللَّبَنَ" (milk) end with a Fatha vowel?',
        options: ['Because it is the Verb (Fi‘l)', 'Because it is the mudaf owner', 'Because it is the Object/Receiver (Maf‘ool Bihi)', 'Because it is the Doer (Fā‘il)'],
        correctAnswer: 'Because it is the Object/Receiver (Maf‘ool Bihi)',
        explanation: 'اللَّبَنَ is the object receiving the action. Therefore, it is marked with accusative fatha (َـ).'
      },
      {
        id: 'c11.1-q2',
        type: 'multiple_choice',
        prompt: 'Which sign is standard for the Active Doer (Fā‘il) at the end of the word?',
        options: ['Fatha', 'Damma', 'Kasra', 'Sukoon'],
        correctAnswer: 'Damma',
        explanation: 'A Fā‘il is always Marfoo‘ (Nominative), which is primarily indicated by a Damma.'
      }
    ]
  },
  {
    id: 11.2,
    slug: 'visible-fa-il',
    title: 'Visible Fā‘il',
    arabicTitle: 'الفَاعِل الظَّاهِر',
    subtitle: 'The Visible Doer',
    category: 'Sentences',
    summary: 'Understand the specific rules for when the doer of the sentence is directly specified as a visible noun following the verb.',
    lessons: [
      {
        id: 'c11.2-l1',
        title: 'The Rule of the Visible Doer (Fā‘il Ẓāhir)',
        type: 'table',
        text: 'A doer written explicitly as a separate word is called a Visible Fā‘il. Observe its dual rules:',
        tableHeaders: ['Grammatical Rule', 'Concrete Behaviour', 'Detailed Explanation'],
        tableRows: [
          ['1. Singular Verb Policy', 'Verb ALWAYS remains singular (Mufrad)', 'Even if the doer is dual (2) or plural (3+), the verb does not take dual/plural suffixes'],
          ['2. Gender Agreement Policy', 'Verb of matching gender must precede doer', 'If the doer is feminine, the verb must end in a feminine marker (like َتْ)']
        ]
      },
      {
        id: 'c11.2-l2',
        title: 'The Examples with "الدَّرْسَ" (The Lesson)',
        type: 'table',
        text: 'In the following examples, notice how the object **الدَّرْسَ** always has a Fatha (-) because it is the Maf‘ool Bihi. See how the verb stays singular while matching the doer\'s gender:',
        tableHeaders: ['Class / Gender', 'Arabic Sentence', 'Visible Fā‘il', 'English Translation'],
        tableRows: [
          ['Singular Masculine', 'كَتَبَ الطَّالِبُ الدَّرْسَ', 'الطَّالِبُ', 'The boy wrote the lesson'],
          ['Dual Masculine', 'كَتَبَ الطَّالِبَانِ الدَّرْسَ', 'الطَّالِباَنِ', 'Two boys wrote the lesson'],
          ['Plural Masculine', 'كَتَبَ الطُّلَّابُ الدَّرْسَ', 'الطُّلَّابُ', 'The boys wrote the lesson'],
          ['Singular Feminine', 'كَتَبَتِ الْبِنْتُ الدَّرْسَ', 'الْبِنْتُ', 'The girl wrote the lesson'],
          ['Dual Feminine', 'كَتَبَتِ الْبِنْتَانِ الدَّرْسَ', 'الْبِنْتَانِ', 'Two girls wrote the lesson'],
          ['Plural Feminine', 'كَتَبَتِ الْبَنَاتُ الدَّرْسَ', 'الْبَنَاتُ', 'The girls wrote the lesson']
        ]
      },
      {
        id: 'c11.2-l3',
        title: 'Smart Notice: Verb Agreement',
        type: 'table',
        text: 'Because the number is already clear from the visible Fā‘il noun, the verb stays singular. See gender contrasts:',
        tableHeaders: ['Subject Gender', 'Verb Base Form', 'Complete Sentence Example', 'Syntactic Match', 'Merger Pronunciation Note'],
        tableRows: [
          ['Masculine', 'كَتَبَ (Singular)', 'كَتَبَ الطُّلَّابُ', 'Singular verb + Masc. plural noun', 'Direct fluent flow'],
          ['Feminine', 'كَتَبَتْ (Feminine)', 'كَتَبَتِ الْبَنَاتُ', 'Feminine verb + Fem. plural noun', 'Sukoon shifts to helper Kasra for easier pronunciation']
        ],
        alertMessage: 'Notice spelling helper: كَتَبَتْ الْبِنْتُ merges phonetically with a small helping kasra to become كَتَبَتِ الْبِنْتُ for easier flow!'
      }
    ],
    quiz: [
      {
        id: 'c11.2-q1',
        type: 'multiple_choice',
        prompt: 'In Classical sentence structures, if the visible doer is Dual or Plural, what remains singular?',
        options: ['The Object/Maf‘ool', 'The Verb/Fi‘l', 'The pronoun ending', 'The case endings'],
        correctAnswer: 'The Verb/Fi‘l',
        explanation: 'If the Fā‘il is visible, the preceding verb remains SINGULAR in gender-matched form: e.g., كَتَبَ الطُّلَّابُ (not كَتَبُوا الطُّلَّابُ).'
      },
      {
        id: 'c11.2-q2',
        type: 'multiple_choice',
        prompt: 'Which of the following is grammatically correct for "The students (masculine plural) wrote physical letters"?',
        options: ['كَتَبُوا الطُّلَّابُ الرَّسَائِلَ', 'كَتَبَ الطُّلَّابُ الرَّسَائِلَ', 'كَتَبْتَ الطُّلَّابُ الرَّسَائِلَ', 'كَتَبَتِ الطُّلَّابُ الرَّسَائِلَ'],
        correctAnswer: 'كَتَبَ الطُّلَّابُ الرَّسَائِلَ',
        explanation: 'The verb (كَتَبَ) must be singular masculine because its visible doer (الطُّلَّابُ) is masculine plural.'
      }
    ]
  },
  {
    id: 11.3,
    slug: 'hidden-fa-il',
    title: 'Hidden Fā‘il',
    arabicTitle: 'الفَاعِل المُسْتَتِر',
    subtitle: 'The Hidden Doer',
    category: 'Sentences',
    summary: 'Explore how pronouns are embedded automatically inside verb paradigms to act as hidden or implied doers when no visible noun follows.',
    lessons: [
      {
        id: 'c11.3-l1',
        title: 'Implied and Attached Subjects',
        type: 'table',
        text: 'Every statement needs a doer. If no visible noun is written after the verb, the verb contains its own built-in pronoun:',
        tableHeaders: ['Subject Property', 'Syntactic Name', 'How to Decode', 'Core Consequence'],
        tableRows: [
          ['Implied Pronoun', 'Fāʿil Mustatir (فَاعِل مُسْتَتِر)', 'Implicitly hide in 1st/2nd/3rd person bases', 'Decoded by analyzing prefix/suffix of verb'],
          ['Explicit Suffix', 'Attached Pronoun doer', 'Conjugated endings like "-tu" or "-naa"', 'Direct suffix behaves as the active subject']
        ]
      },
      {
        id: 'c11.3-l2',
        title: 'The 14 Hidden Forms with "الدَّرْسَ" (The Lesson)',
        type: 'table',
        text: 'In the following examples, notice how the subject (implied pronoun doer) is embedded perfectly inside the verb, while the object "الدَّرْسَ" remains visible:',
        tableHeaders: ['Arabic Sentence', 'Hidden Fā‘il (Pronoun)', 'English Meaning'],
        tableRows: [
          ['كَتَبَ الدَّرْسَ', 'هُوَ (He)', 'He wrote the lesson'],
          ['كَتَبَا الدَّرْسَ', 'هُمَا (Two men)', 'Two men wrote the lesson'],
          ['كَتَبُوا الدَّرْسَ', 'هُمْ (They)', 'They wrote the lesson'],
          ['كَتَبَتْ الدَّرْسَ', 'هِيَ (She)', 'She wrote the lesson'],
          ['كَتَبَتَا الدَّرْسَ', 'هُمَا (Two women)', 'Two women wrote the lesson'],
          ['كَتَبْنَ الدَّرْسَ', 'هُنَّ (The women)', 'The women wrote the lesson'],
          ['كَتَبْتَ الدَّرْسَ', 'أَنْتَ (You - man)', 'You (man) wrote the lesson'],
          ['كَتَبْتِ الدَّرْسَ', 'أَنْتِ (You - woman)', 'You (woman) wrote the lesson'],
          ['كَتَبْتُمَا الدَّرْسَ', 'أَنْتُمَا (You two)', 'You two wrote the lesson'],
          ['كَتَبْتُمْ الدَّرْسَ', 'أَنْتُمْ (You all men)', 'You all men wrote the lesson'],
          ['كَتَبْتُنَّ الدَّرْسَ', 'أَنْتُنَّ (You women)', 'You women wrote the lesson'],
          ['كَتَبْتُ الدَّرْسَ', 'أَنَا (I)', 'I wrote the lesson'],
          ['كَتَبْنَا الدَّرْسَ', 'نَحْنُ (We)', 'We wrote the lesson']
        ]
      },
      {
        id: 'c11.3-l3',
        title: 'Prior Noun Rule & Golden Rule',
        type: 'table',
        text: 'Arabic grammar states that a doer must follow its verb. Study this crucial ordering requirement:',
        tableHeaders: ['Sentence Structure', 'Grammatical Analysis', 'Subject Identity', 'Translational Meaning'],
        tableRows: [
          ['الْبِنْتُ كَتَبَتِ الدَّرْسَ', 'Prior subject "الْبِنْتُ" starts sentence', 'Fāʿil is hidden pronoun (هِيَ) inside verb', 'The girl - she wrote the lesson'],
          ['كَتَبَتِ الْبِنْتُ الدَّرْسَ', 'Standard verbal sentence order', 'Fāʿil is the visible noun "الْبِنْتُ" after verb', 'The girl wrote the lesson']
        ],
        alertMessage: 'Example: In "الْوَلَدُ كَتَبَ الدَّرْسَ", the word الْوَلَدُ is technically prior. The Fā‘il of كَتَبَ is the hidden pronoun (هُوَ) inside the verb that refers back to the boy!'
      }
    ],
    quiz: [
      {
        id: 'c11.3-q1',
        type: 'multiple_choice',
        prompt: 'In the verb "كَتَبْتُ" (I wrote), what is the Fā‘il (Doer)?',
        options: ['The object of the verb', 'The attached suffix pronoun "-tu" representing "I"', 'A completely invisible noun', 'There is no doer'],
        correctAnswer: 'The attached suffix pronoun "-tu" representing "I"',
        explanation: 'The suffix -tu (تُ) in كَتَبْتُ functions directly as the active attached pronoun doer.'
      },
      {
        id: 'c11.3-q2',
        type: 'multiple_choice',
        prompt: 'What does "Fā‘il Mustatir" mean in classical Arabic grammar?',
        options: ['A visible noun doer', 'An accusative object', 'A hidden or implied pronoun doer', 'A feminine suffix'],
        correctAnswer: 'A hidden or implied pronoun doer',
        explanation: 'Mustatir (مستتر) translated literally means concealed or covered, which represents an implied pronoun.'
      }
    ]
  },
  {
    id: 12.1,
    slug: 'what-is-mudari',
    title: 'What is Muḍāri‘?',
    arabicTitle: 'مَا هُوَ المُضَارِع؟',
    subtitle: 'The Living Verb',
    category: 'Verbs & Conjugations',
    summary: 'Understand the present-future verb system. Learn structural boundaries, the 4 Magic indicators, and how to define immediate future meanings.',
    lessons: [
      {
        id: 'c12.1-l1',
        title: 'The Muḍāri‘ Identity',
        type: 'table',
        text: 'The Muḍāri‘ verb represents ongoing (present) or intended (future) actions. Learn how its structure differs from the past tense:',
        tableHeaders: ['Verb Family', 'Conjugation Change Area', 'Indicator Prefix Letters', 'Example Transition (كَتَبَ)'],
        tableRows: [
          ['Past Tense (Māḍī)', 'Changes exclusively at the suffix (ending)', 'None (root letters form base)', 'كَتَبْتُ (I wrote)'],
          ['Present Tense (Muḍāriʿ)', 'Changes at BOTH prefix and suffix', '4 Magic letters: ي , ت , أ , ن', 'أَكْتُبُ (I write)']
        ]
      },
      {
        id: 'c12.1-l2',
        title: 'The 4 Magic Letters',
        type: 'table',
        tableHeaders: ['Letter Prefix', 'Who it represents', 'Model Example', 'English meaning'],
        tableRows: [
          ['يـ (Ya)', 'He / They', 'يَفْعَلُ', 'He does'],
          ['تـ (Ta)', 'She / You', 'تَفْعَلُ', 'She does / You do'],
          ['أَ (A)', 'I', 'أَفْعَلُ', 'I do'],
          ['نـ (Na)', 'We', 'نَفْعَلُ', 'We do']
        ]
      },
      {
        id: 'c12.1-l3',
        title: 'Instating absolute Future: Suffix سَـ',
        type: 'table',
        text: 'While the Muḍāri‘ represents both present and future, attaching these markers locks the meaning exclusively to the future:',
        tableHeaders: ['Future Marker Type', 'How to Apply', 'Example Phrase', 'Translational Distinction'],
        tableRows: [
          ['Immediate Future', 'Attach prefixed "سَـ" directly to the verb', 'سَيَكْتُبُ (Sayaktubu)', 'He will write immediately'],
          ['Distant / General Future', 'Place independent word "سَوْفَ" before verb', 'سَوْفَ يَكْتُبُ (Sawfa yaktubu)', 'He will write in the future']
        ],
        alertMessage: 'Example: سَيَفْعَلُ (Sayaf‘alu) = He WILL do. The word سَوْفَ (Sawfa) can also be placed before the verb for a more distant future.'
      }
    ],
    quiz: [
      {
        id: 'c12.1-q1',
        type: 'multiple_choice',
        prompt: 'Convert the normal present verb "يَقْرَأُ" (He reads) into absolute future tense:',
        options: ['سَيَقْرَأُ', 'تَقْرَأُ', 'قَرَأَ سَـ', 'الْقِرَاءَةُ'],
        correctAnswer: 'سَيَقْرَأُ',
        explanation: 'We attach the prefix "سَـ" directly to the front to get سَيَقْرَأُ (He will read).'
      },
      {
        id: 'c12.1-q2',
        type: 'multiple_choice',
        prompt: 'Which letter prefix represents "We" in the Muḍāri‘ verb tense?',
        options: ['أَ (A)', 'تـ (Ta)', 'يـ (Ya)', 'نـ (Na)'],
        correctAnswer: 'نـ (Na)',
        explanation: 'The prefix "نـ" (Na) always represents the first-person plural subject "We".'
      }
    ]
  },
  {
    id: 12.2,
    slug: 'how-mudari-changes',
    title: 'How Muḍāri‘ Changes',
    arabicTitle: 'تَصْرِيف المُضَارِع',
    subtitle: 'The 14 Forms Made Easy',
    category: 'Verbs & Conjugations',
    summary: 'Learn the complete systematic 14-form conjugation table of present tense verbs across all singular, dual, and plural person perspectives.',
    lessons: [
      {
        id: 'c12.2-l1',
        title: 'The Suffix-Prefix Combinations',
        type: 'table',
        text: 'To form the 14 standard Muḍāriʿ conjugations, we link beginning prefixes with special ending suffixes:',
        tableHeaders: ['Subject Profile', 'Affixed Prefix', 'Affixed Suffix', 'Resulting Grammatical Class Name'],
        tableRows: [
          ['Dual (Two individuals)', 'يـ / تـ', 'ـَانِ (-āni)', 'Tathniyah (تثنية)'],
          ['Masculine Plural (They/You all)', 'يـ / تـ', 'ـُونَ (-ūna)', 'Jamʿ Mudhakkar (جمع مذكر)'],
          ['Feminine Singular (You [f])', 'تـ', 'ـِينَ (-īna)', 'Wāhidah Mu’annas (واحدة مؤنث)'],
          ['Feminine Plural (They [f]/You all [f])', 'يـ / تـ', 'ـْنَ (-na)', 'Jamʿ Mu’annas (جمع مؤنث)']
        ]
      },
      {
        id: 'c12.2-l2',
        title: 'The 14 Conjugations Table (Using يَفْعَلُ)',
        type: 'table',
        tableHeaders: ['Perspective', 'Singular', 'Dual', 'Plural'],
        tableRows: [
          ['3rd Person Masc (Absent)', 'يَفْعَلُ (He does)', 'يَفْعَلَانِ (They two do)', 'يَفْعَلُونَ (They all do)'],
          ['3rd Person Fem (Absent)', 'تَفْعَلُ (She does)', 'تَفْعَلَانِ (They two [f] do)', 'يَفْعَلْنَ (They all [f] do)'],
          ['2nd Person Masc (Present)', 'تَفْعَلُ (You do)', 'تَفْعَلَانِ (You two do)', 'تَفْعَلُونَ (You all do)'],
          ['2nd Person Fem (Present)', 'تَفْعَلِينَ (You [f] do)', 'تَفْعَلَانِ (You two [f] do)', 'تَفْعَلْنَ (You all [f] do)'],
          ['1st Person (Self)', 'أَفْعَلُ (I do)', '—', 'نَفْعَلُ (We do)']
        ]
      },
      {
        id: 'c12.2-l3',
        title: 'Feminine Plural Nuance',
        type: 'table',
        text: 'The feminine plural forms end with a sukoon followed by Nun Fatha "نَ" (Nun of Femininity). These forms are Mabni:',
        tableHeaders: ['Grammatical State', 'Verbal Form example', 'Pronunciation', 'Modifiability Character'],
        tableRows: [
          ['3rd Person Fem. Plural', 'يَفْعَلْنَا / يَفْعَلْنَ', 'Yafʿalna', 'Mabni (Rigid / Never changes)'],
          ['2nd Person Fem. Plural', 'تَفْعَلْنَا / تَفْعَلْنَ', 'Tafʿalna', 'Mabni (Rigid / Never changes)']
        ],
        alertMessage: 'Example: يَكْتُبْنَ (They [f] write) remains exactly the same under all grammatical conditions.'
      }
    ],
    quiz: [
      {
        id: 'c12.2-q1',
        type: 'multiple_choice',
        prompt: 'What is the correct dual present form of "يَفْعَلُ" (representing "They two [m] do")?',
        options: ['يَفْعَلُونَ', 'تَفْعَلْنَ', 'يَفْعَلَانِ', 'تَفْعَلِينَ'],
        correctAnswer: 'يَفْعَلَانِ',
        explanation: 'Dual present verbs add the suffix -āni (ـَانِ) to represent exactly two subjects.'
      },
      {
        id: 'c12.2-q2',
        type: 'multiple_choice',
        prompt: 'Which form matches second-person feminine singular "أَنْتِ" (You [feminine singular] do)?',
        options: ['تَفْعَلُ', 'تَفْعَلِينَ', 'أَفْعَلُ', 'يَفْعَلْنَ'],
        correctAnswer: 'تَفْعَلِينَ',
        explanation: 'The suffix -īna (ـِينَ) along with prefix ta- corresponds to "Antī" (You [f. sg.]).'
      }
    ]
  },
  {
    id: 12.3,
    slug: 'secret-of-six-babs',
    title: 'The Secret of the Six Bābs',
    arabicTitle: 'أَبْوَاب الفِعْل الثُّلَاثِي',
    subtitle: 'The Middle Sound Change',
    category: 'Verbs & Conjugations',
    summary: 'Master the systematic middle-vowel shifts as verbs transition from Past to Present, helping you vocalize any verb like a native.',
    lessons: [
      {
        id: 'c12.3-l1',
        title: 'Middle Vowel Shift Rule (ʿAyn Kalimah)',
        type: 'table',
        text: 'As a verb moves from past (Māḍī) to present (Muḍāriʿ), the vowel on its middle (ʿAyn) root letter shifts. This groups verbs into six standard doors (Bābs):',
        tableHeaders: ['Grammatical Concept', 'Arabic Term', 'Shorthand Meaning', 'Why it matters'],
        tableRows: [
          ['Middle Root Letter', 'ʿAyn Kalimah (عَيْن الْكَلِمَة)', 'The second letter of the 3-letter root', 'Its vowel vowel shift defines the verb’s sound family'],
          ['The Six Families', 'Abwāb al-Fiʿl (أَبْوَاب الْفِعْل)', 'The historical six doors of Arabic verbs', 'Dictates how to vocalize unmarked text correctly']
        ]
      },
      {
        id: 'c12.3-l2',
        title: 'The Great Six Bābs',
        type: 'table',
        tableHeaders: ['Bāb Name', 'Vowel Change (Past → Present)', 'Past Form', 'Present Form', 'Meaning'],
        tableRows: [
          ['Bab Nasara (ن)', 'A → U', 'نَصَرَ', 'يَنْصُرُ', 'To Help / Assist'],
          ['Bab Daraba (ض)', 'A → I', 'ضَرَبَ', 'يَضْرِبُ', 'To Hit / Strike'],
          ['Bab Fataha (ف)', 'A → A', 'فَتَحَ', 'يَفْتَحُ', 'To Open'],
          ['Bab Sami‘a (س)', 'I → A', 'سَمِعَ', 'يَسْمَعُ', 'To Hear'],
          ['Bab Karuma (ك)', 'U → U', 'كَرُمَ', 'يَكْرُمُ', 'To be Generous'],
          ['Bab Hasiba (ح)', 'I → I', 'حَسِبَ', 'يَحْسِبُ', 'To Think / Deem']
        ]
      },
      {
        id: 'c12.3-l3',
        title: 'Vocalizing Unmarked Verbs',
        type: 'table',
        text: 'Standard printed Arabic leaves out vowels. Here is how modern dictionaries mark Bābs so you know how to read them:',
        tableHeaders: ['Dictionary Mark', 'Active Bāb Family', 'Middle Vowel in Past', 'Middle Vowel in Present', 'Example Reading'],
        tableRows: [
          ['Shorthand (ن)', 'Nasara', 'Fatha (e.g. صَ)', 'Damma (e.g. صُ)', 'نَصَرَ → يَنْصُرُ'],
          ['Shorthand (ض)', 'Daraba', 'Fatha (e.g. رَ)', 'Kasra (e.g. رِ)', 'ضَرَبَ → يَضْرِبُ']
        ],
        alertMessage: 'Dictionaries specify the Bāb using the single letter shorthand: like (ن) next to نَصَرَ.'
      }
    ],
    quiz: [
      {
        id: 'c12.3-q1',
        type: 'multiple_choice',
        prompt: 'Which Bāb is represented by active shift "فَتَحَ → يَفْتَحُ"?',
        options: ['A to U (Nasara)', 'A to I (Daraba)', 'A to A (Fataha)', 'I to A (Sami‘a)'],
        correctAnswer: 'A to A (Fataha)',
        explanation: 'Both the middle letter "تَ" in past and "تَ" in present keep a Fatha vowel, matching the A-to-A Fataha paradigm.'
      },
      {
        id: 'c12.3-q2',
        type: 'multiple_choice',
        prompt: 'Vowel shift "A → I" (Fatha in past, Kasra in present) belongs to which classic Bāb?',
        options: ['Bāb Sami‘a', 'Bāb Nasara', 'Bāb Daraba', 'Bāb Karuma'],
        correctAnswer: 'Bāb Daraba',
        explanation: 'Bāb Daraba (ضَرَبَ → يَضْرِبُ) has an "a → i" vocalization shift of its middle root letter.'
      }
    ]
  },
  {
    id: 13,
    slug: 'al-amr-command',
    title: 'Al-Amr - The Command Verb',
    arabicTitle: 'الأَمْر فِي العَرَبِيَّة',
    subtitle: 'How to Give Active Orders',
    category: 'Verbs & Conjugations',
    summary: 'Master commands (Do this!). Learn the 3-step formula to morph present verbs into direct active commands.',
    lessons: [
      {
        id: 'c13-l1',
        title: 'Who Receives Commands?',
        type: 'table',
        text: 'In classical Arabic, commands (Amr) can only be directed to people directly interacting with you. Observe these scope settings:',
        tableHeaders: ['Persona Layer', 'Arabic Name', 'Command Authority', 'Applicable Forms'],
        tableRows: [
          ['1st Person (Speaker)', 'Mutakallim (المتكلم)', '❌ Cannot command oneself directly', 'No Amr forms'],
          ['2nd Person (Addressee)', 'Hāḍir (الحاضر)', '✅ Perfect target of direct command', 'All 6 active forms (singular, dual, plural)'],
          ['3rd Person (Absent)', 'Ghā’ib (الغائب)', '❌ Cannot command an absent party directly', 'Requires special particles (Lām of command)']
        ]
      },
      {
        id: 'c13-l2',
        title: 'The 3-Step Command Formula',
        type: 'table',
        text: 'Follow these three precise sequential steps on a present-tense active verb to form a command:',
        tableHeaders: ['Step Priority', 'Action to Execute', 'Form state for "You write" (تَكْتُبُ)', 'Resulting sound state'],
        tableRows: [
          ['Step 1', 'Strip the starting marker prefix (تـ) completely', 'كْتُبُ', 'Starting with silent letter'],
          ['Step 2', 'Force the last vowel into a silent sukoon (ـْ)', 'كْتُبْ', 'Unvocalized ending'],
          ['Step 3', 'Add helping Alif (ا). Vowel fits middle letter: If middle is Damma (ُـ) -> write (اُ), else write (اِ)', 'اُكْتُبْ', 'Final command form (Uktub! - "Write!")']
        ],
        alertMessage: 'Example for "You help" (تَنْصُرُ): Remove تـ → نْصُرُ → Sukoon ending → نْصُرْ → Add Alif (middle is damma "صُ") → اُنْصُرْ (Unsur - Help!)'
      },
      {
        id: 'c13-l3',
        title: 'Classical Amr Suffix Models',
        type: 'table',
        tableHeaders: ['Standard Present (You)', 'Amr Command', 'Pronunciation', 'Audience'],
        tableRows: [
          ['تَفْعَلُ', 'اِفْعَلْ', 'If\'al', 'One Man'],
          ['تَفْعَلُونَ', 'اِفْعَلُوا', 'If\'aloo', 'Many Men'],
          ['تَفْعَلِينَ', 'اِفْعَلِي', 'If\'alee', 'One Woman'],
          ['تَفْعَلْنَ', 'اِفْعَلْنَ', 'If\'alna', 'Many Women']
        ]
      }
    ],
    quiz: [
      {
        id: 'c13-q1',
        type: 'multiple_choice',
        prompt: 'Derive the active command form for "تَكْتُبُ" (You write):',
        options: ['اِكْتُبْ', 'اُكْتُبْ', 'لَا تَكْتُبْ', 'كَتَبَ'],
        correctAnswer: 'اُكْتُبْ',
        explanation: 'Remove تـ -> كْتُبُ -> sukoon ending -> كْتُبْ -> Add Alif with Damma (since middle letter "تُ" has damma) -> اُكْتُبْ.'
      },
      {
        id: 'c13-q2',
        type: 'multiple_choice',
        prompt: 'Which helping prefix vowel goes on Alif if the middle verb letter is Fatha (َـ)?',
        options: ['Damma (ُا)', 'Kasra (ِا)', 'Fatha (َا)'],
        correctAnswer: 'Kasra (ِا)',
        explanation: 'If the middle letter is Fatha or Kasra, the helping Alif always takes a Kasra (ِا).'
      }
    ]
  },
  {
    id: 14,
    slug: 'an-nahy-negative',
    title: 'An-Nahy - The Negative Command',
    arabicTitle: 'النَّهْي عَن الفِعْل',
    subtitle: 'How to Prevent Actions (Do Not Do!)',
    category: 'Verbs & Conjugations',
    summary: 'Learn how to forbid actions. Contrast the structure of positive commands with negative commands.',
    lessons: [
      {
        id: 'c14-l1',
        title: 'Forbidding Actions',
        type: 'table',
        text: 'While Amr commands command people to act, An-Nahy forbids them. Contrast these active intentions:',
        tableHeaders: ['Objective Class', 'Grammatical Purpose', 'Arabic Prototype', 'Resulting Meaning'],
        tableRows: [
          ['Amr (Command)', 'Instructs someone to execute an action', 'اُكْتُبْ', 'Write! (Order)'],
          ['An-Nahy (Prohibition)', 'Instructs someone to stop or avoid an action', 'لَا تَكْتُبْ', 'Do not write! (Forbidding)']
        ]
      },
      {
        id: 'c14-l2',
        title: 'The Forbidding Formula',
        type: 'table',
        text: 'Unlike Amr where the marker is stripped, Nahy preserves the starting present "تـ" letter. Follow these two actions:',
        tableHeaders: ['Syntactic Action', 'Form state for "You write" (تَكْتُبُ)', 'Vowel Adjustment', 'Standard Outcome'],
        tableRows: [
          ['1. Place forbidding particle "لَا" before verb', 'لَا تَكْتُبُ', 'Sentence starts with negative "No"', 'Invalid/incomplete'],
          ['2. Force last letter into silent sukoon (ـْ)', 'لَا تَكْتُبْ', 'Damma ends in sukoon (Majzoom)', 'Forbidden Action: "Do not write!"']
        ],
        alertMessage: 'Example for "You write" (تَكْتُبُ): Add لَا → لَا تَكْتُبُ → Sukoon ending → لَا تَكْتُبْ (Laa taktub - Do not write!)'
      },
      {
        id: 'c14-l3',
        title: 'Contrast Grid: Amr vs Nahy',
        type: 'table',
        tableHeaders: ['Verb Objective', 'Positive Command (Amr)', 'Negative Command (Nahy)', 'Meaning'],
        tableRows: [
          ['To go (M)', 'اِذْهَبْ (Idhhab!)', 'لَا تَذْهَبْ (Laa tadhhab!)', 'Go! / Do not go!'],
          ['To write (M)', 'اُكْتُبْ (Uktub!)', 'لَا تَكْتُبْ (Laa taktub!)', 'Write! / Do not write!'],
          ['To open (F)', 'اِفْتَحِي (Iftahi!)', 'لَا تَفْتَحِي (Laa taftahi!)', 'Open! / Do not open!']
        ]
      }
    ],
    quiz: [
      {
        id: 'c14-q1',
        type: 'multiple_choice',
        prompt: 'Build the correct Negative Command for "Do not play!" (You play is تَلْعَبُ, root ل ع ب):',
        options: ['اِلْعَبْ', 'لَا تَلْعَبْ', 'لَا يَلْعَبُ', 'لَا تَلْعَبُ'],
        correctAnswer: 'لَا تَلْعَبْ',
        explanation: 'Add لَا to present tense and place sukoon on the ending letter: لَا تَلْعَبُ + sukoon = لَا تَلْعَبْ.'
      }
    ]
  },
  {
    id: 15.1,
    slug: 'what-is-a-harf',
    title: 'What is a Harf?',
    arabicTitle: 'مَا هُوَ الحَرْف؟',
    subtitle: 'The Glue of Arabic',
    category: 'Particles',
    summary: 'Explore the third building block of Arabic speech: Particles. Learn why prepositions are like glue.',
    lessons: [
      {
        id: 'c15.1-l1',
        title: 'The Three Pillars of Speech',
        type: 'table',
        text: 'Every single word in Classical Arabic relates directly to one of three universal categories:',
        tableHeaders: ['Pillar Category', 'Arabic Term', 'Shorthand Meaning', 'Core Functional Property'],
        tableRows: [
          ['Noun', 'Ism (اِسْم)', 'Person, place, object, or adjective', 'Has complete standalone meaning, accepts "ال" and Tanween'],
          ['Verb', 'Fiʿl (فِعْل)', 'Timeline bounded action (past/present/command)', 'Has complete standalone meaning, conjugates with suffixes'],
          ['Particle', 'Harf (حَرْف)', 'Linking connectors like "in", "to", "on"', '❌ Cannot convey complete meaning without joining a Noun/Verb']
        ]
      },
      {
        id: 'c15.1-l2',
        title: 'Understanding the Glue Concept',
        type: 'table',
        text: 'A particle functions like syntactic glue. Study how its meaning remains incomplete until linked:',
        tableHeaders: ['Input Class', 'Input Word', 'Standalone Understanding', 'Coupled Phrase Result', 'Meaning Level achieved'],
        tableRows: [
          ['Pure Noun', 'كِتَابٌ (Kitābun)', 'You understand a physical book', '—', 'Complete concept'],
          ['Pure Harf', 'فِي (Fī)', 'You understand a relation "in", but wait for context', '—', 'Incomplete concept'],
          ['Coupled Pair', 'فِي كِتَابٍ (Fī kitābin)', 'Both words connect smoothly', 'كِتَابِي فِي الْبَيْتِ', 'Perfect Context: "In a book"']
        ]
      },
      {
        id: 'c15.1-l3',
        title: 'Smart Understanding: Nouns vs Verbs vs Particles',
        type: 'table',
        text: 'To memorize the speech components easily, analyze this functional comparison:',
        tableHeaders: ['Syntactic Building Block', 'Analogical Role', 'Sentential Assignment', 'Concrete Example'],
        tableRows: [
          ['Noun (Ism)', 'The Object', 'Acts as subject, target, or descriptor', 'اَلْكِتَابُ (The book)'],
          ['Verb (Fiʿl)', 'The Action', 'Propels narrative through time', 'قَرَأَ (Read)'],
          ['Particle (Harf)', 'The Connector (Glue)', 'Binds Nouns and actions with logical directions', 'عَلَى (On / Upon)']
        ],
        alertMessage: 'Example: اَلْكِتَابُ عَلَى الْمَكْتَبِ ("The book is on the desk"). Here, the Harf عَلَى ("on") serves as glue connecting "the book" and "the desk"!'
      },
      {
        id: 'c15.1-l4',
        title: 'All Hurūf are Mabni',
        type: 'table',
        text: 'A foundational absolute rule is that all Arabic particles are Mabni (unalterable):',
        tableHeaders: ['Grammatical Concept', 'Behavioral Definition', 'Impact on Vowels', 'Consistent Forms'],
        tableRows: [
          ['Mabni State (مَبْنِيّ)', 'Rigid / Indestructible ending', 'They never change their final vowels regardless of sentence location', 'فِي (In), مِنْ (From), عَلَى (On)']
        ]
      }
    ],
    quiz: [
      {
        id: 'c15.1-q1',
        type: 'multiple_choice',
        prompt: 'Which of the following belongs to a category of speech that cannot give a full meaning alone?',
        options: ['كِتَابٌ (Noun)', 'كَتَبَ (Verb)', 'فِي (Particle)', 'طَالِبٌ (Noun)'],
        correctAnswer: 'فِي (Particle)',
        explanation: 'فِي is a Harf (Particle) and serves as a connector word; it requires other words to complete its meaning.'
      },
      {
        id: 'c15.1-q2',
        type: 'multiple_choice',
        prompt: 'What does the term "Mabni" mean when applied to Arabic Particles (Hurūf)?',
        options: [
          'They change endings constantly',
          'Their ending always stays the same and never changes',
          'They represent actions',
          'They only apply to dual forms'
        ],
        correctAnswer: 'Their ending always stays the same and never changes',
        explanation: 'All Hurūf are Mabni, meaning they are indeclinable and preserved in their fixed physical vowel endings.'
      }
    ]
  },
  {
    id: 15.2,
    slug: 'huruf-al-jarr',
    title: 'Hurūf al-Jarr',
    arabicTitle: 'حُرُوف الجَرّ',
    subtitle: 'The Pulling Particles',
    category: 'Particles',
    summary: 'Master the common prepositions that enter nouns and pull them down into the Kasra case state.',
    lessons: [
      {
        id: 'c15.2-l1',
        title: 'The Pulling Action (Majroor)',
        type: 'table',
        text: 'Prepositions in Arabic are called Hurūf al-Jarr. They pull following nouns down into Kasra ending vowel states:',
        tableHeaders: ['Particle Type', 'Target Word Class', 'Assigned Vowel ending', 'Resulting Grammatical State'],
        tableRows: [
          ['Hurūf al-Jarr (حُرُوف الجَرّ)', 'Nouns ONLY (Verbs are immune)', 'Kasra (ـِ / ـٍ) double or single', 'Majroor (مَجْرُور / Pulled Down)']
        ]
      },
      {
        id: 'c15.2-l2',
        title: 'How It Changes (Damma to Kasra)',
        type: 'table',
        text: 'See how a noun’s normal nominative state changes the second a Harf Jarr enters before it:',
        tableHeaders: ['Noun Phase', 'Arabic Form Phrase', 'Ending Vowel', 'Active Connector', 'Meaning Achieved'],
        tableRows: [
          ['Starting State (Isolated)', 'اَلْبَيْتُ', 'Damma (Pesh)', 'None', 'The house'],
          ['With Jarr Preposition', 'فِي الْبَيْتِ', 'Kasra (Zair)', 'فِي (In)', 'In the house']
        ],
        alertMessage: '❌ NEVER write or say: فِي الْبَيْتُ. It is always: فِي الْبَيْتِ!'
      },
      {
        id: 'c15.2-l3',
        title: 'Common Hurūf al-Jarr to Memorize',
        type: 'table',
        text: 'These are the most important pulling prepositions in Arabic:',
        tableHeaders: ['Harf', 'Pronunciation', 'Meaning', 'Example', 'Meaning'],
        tableRows: [
          ['مِنْ', 'Min', 'From', 'مِنَ الْمَسْجِدِ', 'From the masjid'],
          ['إِلَى', 'Ilaa', 'To', 'إِلَى الْمَدْرَسَةِ', 'To the school'],
          ['عَلَى', '‘Alaa', 'On', 'عَلَى الْمَكْتَبِ', 'On the desk'],
          ['فِي', 'Fī', 'In', 'فِي الْقَلْبِ', 'In the heart'],
          ['بِـ', 'Bi', 'With', 'بِالْقَلَمِ', 'With the pen'],
          ['لِـ', 'Li', 'For', 'لِلَّهِ', 'For Allah'],
          ['كَـ', 'Ka', 'Like', 'كَالْأَسَدِ', 'Like the lion']
        ]
      },
      {
        id: 'c15.2-l4',
        title: 'Full Sentence Examples',
        type: 'table',
        text: 'Study these full verbal sentences using Hurūf al-Jarr:',
        tableHeaders: ['Arabic Structural Phrase', 'Phonetic Pronunciation', 'Active Harf Jarr', 'Resulting Noun State', 'English Translation'],
        tableRows: [
          ['صَلَّيْتُ فِي الْمَسْجِدِ', 'Sallaytu fil-masjidi', 'فِي (In)', 'الْمَسْجِدِ (Majroor with Kasra)', 'I prayed in the masjid'],
          ['ذَهَبْتُ إِلَى الْمَدْرَسَةِ', 'Dhahabtu ilal-madrasati', 'إِلَى (To)', 'الْمَدْرَسَةِ (Majroor with Kasra)', 'I went to the school'],
          ['كَتَبْتُ بِالْقَلَمِ', 'Katabtu bil-qalami', 'بِـ (With)', 'الْقَلَمِ (Majroor with Kasra)', 'I wrote with the pen']
        ]
      }
    ],
    quiz: [
      {
        id: 'c15.2-q1',
        type: 'multiple_choice',
        prompt: 'What ending vowel is assigned to a standard noun after a Harf Jarr enters before it?',
        options: ['Damma (Pesh)', 'Fatha (Zabar)', 'Kasra (Zair / Zeer)', 'Sukoon'],
        correctAnswer: 'Kasra (Zair / Zeer)',
        explanation: 'Hurūf al-Jarr pulls nouns into the Majroor state, which is primarily marked by a Kasra.'
      },
      {
        id: 'c15.2-q2',
        type: 'multiple_choice',
        prompt: 'Translate the phrase "On the desk" correctly:',
        options: ['إِلَى الْمَكْتَبِ', 'عَلَى الْمَكْتَبِ', 'فِي الْمَكْتَبِ', 'مِنَ الْمَكْتَبِ'],
        correctAnswer: 'عَلَى الْمَكْتَبِ',
        explanation: 'عَلَى means "On/Upon", and it pulls الْمَكْتَبُ to became الْمَكْتَبِ.'
      }
    ]
  },
  {
    id: 15.3,
    slug: 'special-rules-of-huruf',
    title: 'Special Rules of Hurūf',
    arabicTitle: 'أَحْكَام الحُرُوف',
    subtitle: 'Sticky Letters and Sound Changes',
    category: 'Particles',
    summary: 'Learn hidden sound alterations, helping vowels for pronunciation, and the magical Wāw of Oath.',
    lessons: [
      {
        id: 'c15.3-l1',
        title: 'The Sticky Single-Letter Hurūf',
        type: 'table',
        text: 'Single-letter particles merge directly into spelling. Examine these sticky prepositions:',
        tableHeaders: ['Sticky Particle', 'Target meaning', 'Example Written form', 'Phonetic Sound', 'English Translation'],
        tableRows: [
          ['بِـ (Bi)', 'With / By means of', 'بِالْقَلَمِ', 'Bil-qalami', 'With the pen'],
          ['لِـ (Li)', 'For / Belongs to', 'لِلَّهِ', 'Lil-laahi', 'For Allah / Belongs to Allah'],
          ['كَـ (Ka)', 'Like / Analogous to', 'كَالْأَسَدِ', 'Kal-asadi', 'Like the lion']
        ]
      },
      {
        id: 'c15.3-l2',
        title: 'Dropping the Alif Rule',
        type: 'table',
        text: 'Connecting the prefix preposition "لِـ" to a noun starting with "ال" triggers a spelling reduction rule:',
        tableHeaders: ['Word Phase', 'Arabic Form', 'Spelling Action', 'Resulting Spelled Word'],
        tableRows: [
          ['Base noun with "ال"', 'اَللَّهُ', 'Starts with definite Alif-Lam', 'اَللَّهُ'],
          ['Add "لِـ"', 'لِـ + اَللَّهُ', 'Strip the Alif (ا) completely', 'لِلَّهِ (For Allah)']
        ],
        alertMessage: 'This spelling rule is crucial to prevent incorrect word merge duplicates like لِاللَّه!'
      },
      {
        id: 'c15.3-l3',
        title: 'Pronunciation Helpers (Helping Vowels)',
        type: 'table',
         text: 'Sometimes Arabic classical speech adds a small helping vowel to avoid clashing silent letters and keep the pronunciation smooth:',
        tableHeaders: ['Original Merge Clash', 'Easier Pronunciation', 'Reason / Helper', 'English Meaning'],
        tableRows: [
          ['مِنْ الْمَسْجِدِ (Min al-masjid)', 'مِنَ الْمَسْجِدِ (Min-al-masjidi)', 'Sukoon is changed to Fatha (َـ)', 'From the masjid'],
          ['عَنْ NUN-SUKOON', 'عَنِ النَّبِيِّ (ʿAn-in-nabiyyi)', 'Sukoon is changed to Kasra (ِـ)', 'About the Prophet']
        ]
      },
      {
        id: 'c15.3-l4',
        title: 'The Wāw of Oath (وَ)',
        type: 'table',
        text: 'When making solemn oaths, the letter Wāw behaves as a Harf Jarr pulling the following noun to Kasra:',
        tableHeaders: ['Context of وَ', 'Function', 'Consecutive Vowel ending', 'Solemn Oath Example', 'Meaning'],
        tableRows: [
          ['Conjunction', 'Joins two nouns ("and")', 'Copies the case of preceding noun', 'زَيْدٌ وَخَالِدٌ', 'Zaid and Khalid'],
          ['Solemn Oath', 'Acts as Harf Jarr ("By...")', 'Casts following noun directly to Kasra', 'وَاللهِ', 'By Allah!']
        ],
        alertMessage: 'Always check if the context is an oath. If it is, the following noun must take a Kasra ending!'
      }
    ],
    quiz: [
      {
        id: 'c15.3-q1',
        type: 'multiple_choice',
        prompt: 'What happens to the Alif (ا) of "اَل" when the single-letter preposition "لِـ" is attached to it?',
        options: [
          'It changes into a Wāw',
          'It drops completely from the spelling',
          'It takes a double damma',
          'It remains exactly as it is'
        ],
        correctAnswer: 'It drops completely from the spelling',
        explanation: 'When لِـ connects to a word starting with "ال", the Alif is dropped, resulting in a direct spelling merge like "لِلَّهِ".'
      },
      {
        id: 'c15.3-q2',
        type: 'multiple_choice',
        prompt: 'Why does the word for Allah end with Kasra in the phrase "وَاللهِ"?',
        options: [
          'Because it is the direct object',
          'Because the Wāw of Oath acts as a Harf Jarr',
          'Because of dual number rules',
          'Because of a hidden past tense verb'
        ],
        correctAnswer: 'Because the Wāw of Oath acts as a Harf Jarr',
        explanation: 'The Wāw of Oath functions exactly as a Harf Jarr prepostional connector, pulling "اللَّهُ" into the Kasra majroor state ("اللَّهِ").'
      }
    ]
  },
  {
    id: 16,
    slug: 'huruf-al-atf',
    title: 'Conjunctions (Ḥurūf al-Atf)',
    arabicTitle: 'حُرُوف العَطْف',
    subtitle: 'The Case Copying Connectors',
    category: 'Particles',
    summary: 'Discover how Arabic conjunctions link nouns and act like case-copying machines, transmitting case endings seamlessly.',
    lessons: [
      {
        id: 'c16-l1',
        title: 'What is a Harf Atf?',
        type: 'table',
        text: 'Conjunctions link syntactic components together. Master these two critical partner definitions:',
        tableHeaders: ['Grammatical Component', 'Arabic Term', 'Functional placement description', 'Example (زَيْدٌ وَخَالِدٌ)'],
        tableRows: [
          ['The Preceding Lead Word', 'Maʿtoof Alaih (المَعْطُوف عَلَيْه)', 'The noun directly in front of conjunction', 'زَيْدٌ'],
          ['The Following Connected Word', 'Maʿtoof (المَعْطُوف)', 'The noun coming directly after conjunction', 'خَالِدٌ']
        ]
      },
      {
        id: 'c16-l2',
        title: 'The Great Case Copying Rule',
        type: 'table',
        text: 'Conjunctions transmit case endings directly to the following Maʿtoof noun. See how endings copy perfectly:',
        tableHeaders: ['Preceding Lead Case state', 'Maʿtoof Alaih Vowel', 'Maʿtoof connected Vowel', 'Full Connected Example', 'Meaning'],
        tableRows: [
          ['Nominative (Damma)', 'Damma (e.g. زَيْدٌ)', 'Damma (e.g. خَالِدٌ)', 'زَيْدٌ وَخَالِدٌ', 'Zaid and Khalid (as subject)'],
          ['Accusative (Fatha)', 'Fatha (e.g. زَيْدًا)', 'Fatha (e.g. خَالِدًا)', 'زَيْدًا وَخَالِدًا', 'Zaid and Khalid (as object)'],
          ['Genitive (Kasra)', 'Kasra (e.g. زَيْدٍ)', 'Kasra (e.g. خَالِدٍ)', 'زَيْدٍ وَخَالِدٍ', 'Zaid and Khalid (as genitive)']
        ],
        alertMessage: 'Example: خَرَجَ زَيْدٌ وَخَالِدٌ (Zaid and Khalid went out). Both end with Damma because Zaid is the doer (nominative) and Khalid copied Zaid\'s case ending!'
      },
      {
        id: 'c16-l3',
        title: 'The Three Main Conjunctions',
        type: 'table',
        tableHeaders: ['Conjunction', 'Arabic Letter', 'Function / Meaning', 'Example'],
        tableRows: [
          ['Wāw', 'وَ', 'And (Simple connection together)', 'زَيْدٌ وَخَالِدٌ (Zaid and Khalid)'],
          ['Fā', 'فَـ', 'And then (Immediately, sequential connection)', 'دَخَلَ زَيْدٌ فَخَالِدٌ (Zaid entered, then immediately Khalid)'],
          ['Thumma', 'ثُمَّ', 'And afterward (With chronological delay/gap)', 'دَخَلَ زَيْدٌ ثُمَّ خَالِدٌ (Zaid entered, then after a delay Khalid)']
        ]
      }
    ],
    quiz: [
      {
        id: 'c16-q1',
        type: 'multiple_choice',
        prompt: 'In the sentence "خَرَجَ زَيْدٌ وَخَالِدٌ", why does "خَالِدٌ" end with a Damma?',
        options: [
          'Because of a hidden preposition',
          'Because it copied the nominative case of Zaid via the conjunction وَ',
          'Because it is the direct object',
          'Because it is feminine'
        ],
        correctAnswer: 'Because it copied the nominative case of Zaid via the conjunction وَ',
        explanation: 'The conjunction "وَ" connects Khalid to Zaid, copying Zaid’s nominative (Damma) case ending.'
      },
      {
        id: 'c16-q2',
        type: 'multiple_choice',
        prompt: 'Which conjunction means "and then" (implying immediate sequential order)?',
        options: ['وَ', 'فَـ', 'ثُمَّ', 'مِنْ'],
        correctAnswer: 'فَـ',
        explanation: 'The prefix "فَـ" is used for immediate succession, while "ثُمَّ" is used for succession with a delay.'
      }
    ]
  },
  {
    id: 17,
    slug: 'inna-and-its-sisters',
    title: 'Inna & its Sisters (Inna wa Akhawatuha)',
    arabicTitle: 'إِنَّ وَأَخَوَاتُهَا',
    subtitle: 'The Accusative Shift Modifiers',
    category: 'Particles',
    summary: 'Learn how Inna and its siblings override normal nominal sentence balance, casting the subject into the Fatha case.',
    lessons: [
      {
        id: 'c17-l1',
        title: 'Introducing Inna & Her Sisters',
        type: 'table',
        text: 'The particle Inna and its siblings attach exclusively to nominal sentences to change emphasis and focus:',
        tableHeaders: ['Particle Family', 'Scope of deployment', 'Active Functional Objective', 'Example Starter'],
        tableRows: [
          ['Inna and Akhawātuhā (إِنَّ وَأَخَوَاتُهَا)', 'Nominal sentences only (Jumla Ismiyyah)', 'Adds strong semantic emphasis, contrast or doubt', 'إِنَّ (Indeed)']
        ]
      },
      {
        id: 'c17-l2',
        title: 'The Transmutation Rule',
        type: 'table',
        text: 'Normally, a nominal sentence ends with two Dammas. When Inna enters, it creates a drastic case ending shift:',
        tableHeaders: ['Sentence Component', 'Standard Default state Vowel', 'Post-Inna Shift state Vowel', 'New Syntactic Name', 'Action Example'],
        tableRows: [
          ['Subject (Mubtada)', 'Damma (e.g. الْبَيْتُ)', 'Fatha (e.g. الْبَيْتَ)', 'Ism Inna (اِسْم إِنَّ)', 'إِنَّ الْبَيْتَ...'],
          ['Predicate (Khabar)', 'Damma (e.g. جَمِيلٌ)', 'Preserves Damma (جَمِيلٌ)', 'Khabar Inna (خَبَر إِنَّ)', '...جَمِيلٌ']
        ],
        alertMessage: 'Example: اَلْبَيْتُ جَمِيلٌ (The house is beautiful) becomes إِنَّ الْبَيْتَ جَمِيلٌ (Indeed, the house is beautiful). Notice الْبَيْتُ became الْبَيْتَ!'
      },
      {
        id: 'c17-l3',
        title: 'The Famous Modifiers Group',
        type: 'table',
        tableHeaders: ['Sister Particle', 'Arabic Script', 'English Meaning', 'Example Sentence'],
        tableRows: [
          ['Inna', 'إِنَّ', 'Indeed (Adds strong emphasis)', 'إِنَّ زَيْدًا صَالِحٌ (Indeed, Zaid is righteous)'],
          ['Anna', 'أَنَّ', 'That (Functions as a connector)', 'عَلِمْتُ أَنَّ زَيْدًا صَالِحٌ (I knew that Zaid is righteous)'],
          ['Ka\'anna', 'كَأَنَّ', 'As if (Draws a comparison)', 'كَأَنَّ زَيْدًا أَسَدٌ (As if Zaid is a lion)'],
          ['Lakinna', 'لَكِنَّ', 'But (Shows contrast/correction)', 'الْبَيْتُ كَبِيرٌ لَكِنَّ الْبَابَ صَغِيرٌ (The house is big but the door is small)']
        ]
      }
    ],
    quiz: [
      {
        id: 'c17-q1',
        type: 'multiple_choice',
        prompt: 'What grammatical shift occurs when "إِنَّ" enters the nominal sentence "اَلْبَيْتُ جَمِيلٌ"?',
        options: [
          'The subject becomes الْبَيْتَ (Fatha)',
          'The predicate becomes جَمِيلًا (Fatha)',
          'Both words take a Kasra',
          'The sentence remains completely unchanged'
        ],
        correctAnswer: 'The subject becomes الْبَيْتَ (Fatha)',
        explanation: 'إِنَّ changes the subject (Mubtada) from Damma to Fatha, making it "إِنَّ الْبَيْتَ جَمِيلٌ".'
      },
      {
        id: 'c17-q2',
        type: 'multiple_choice',
        prompt: 'Match the sister "كَأَنَّ" with its correct meaning:',
        options: ['Indeed', 'But', 'As if (Comparison)', 'That'],
        correctAnswer: 'As if (Comparison)',
        explanation: 'كَأَنَّ is used to describe comparison, meaning "As if" or "Like".'
      }
    ]
  }
];
