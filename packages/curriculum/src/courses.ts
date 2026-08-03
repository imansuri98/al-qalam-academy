/**
 * Course Curriculum Hierarchy Data & Types
 * Single source of truth for Course 1 (Classical Grammar) and Course 2 (Spoken Fusha).
 *
 * Course 1 content extracted from: "Classical Arabic course book.md"
 * Structure: Level → Module → Lesson
 * Exercises are left empty (TODO) for future authoring.
 */

export interface QuestionItem {
  id: string;
  sentenceAr: string;
  sentenceEn: string;
  optionsCsv: string;
  correctAnswer: string;
  grammaticalRuleEn: string;
}

export interface ExerciseUnit {
  id: string;
  titleAr: string;
  titleEn: string;
  exerciseType: "TASHKEEL_PICKER" | "SENTENCE_REORDER" | "TRANSLATION" | "IRAB_ANALYSIS";
  questions: QuestionItem[];
}

export type BlockType =
  | "TEXT"
  | "VOCABULARY_CARD"
  | "BEFORE_AFTER_COMPARISON"
  | "IRAB_TABLE"
  | "AUDIO_CALLOUT"
  | "CONCEPT_MAP"
  | "PARSE_TREE"
  | "INTERACTIVE_DRILL"
  | "MORPHOLOGY_CHART"
  | "FLOWCHART"
  | "WHITEBOARD";

export interface LessonBlock {
  id: string;
  type: BlockType;
  orderIndex: number;
  data: Record<string, any>;
}

export interface InsightCard {
  id: string;
  titleEn: string;
  arabicExample: string;
  insightBodyEn: string;
  category: "RHETORIC" | "GRAMMAR" | "WISDOM";
  sourceEn?: string;
}

export interface LessonNode {
  id: string;
  titleAr: string;
  titleEn: string;
  durationMins?: number;
  hasAudio?: boolean;
  contentBodyEn: string;
  audioUrl?: string;
  exercisesCount?: number;
  exercises?: ExerciseUnit[];
  canvasData?: Record<string, any>;
  blocks?: LessonBlock[];
  insightCard?: InsightCard;
}

export interface ModuleNode {
  id: string;
  titleAr: string;
  titleEn: string;
  lessons: LessonNode[];
}

export interface LevelNode {
  id: string;
  titleAr: string;
  titleEn: string;
  modules: ModuleNode[];
}

export interface VocabItem {
  id: string;
  wordAr: string;
  wordEn: string;
  imageUrl: string;
  audioUrl: string;
}

export interface DialogueLine {
  id: string;
  speakerNameAr: string;
  speakerNameEn: string;
  avatarColor: string;
  textAr: string;
  textEn: string;
  audioUrl: string;
}

export interface Course2LessonNode {
  id: string;
  titleAr: string;
  titleEn: string;
  durationMins?: number;
  hasAudio?: boolean;
  exercisesCount?: number;
  vocabularies?: VocabItem[];
  fullDialogueAudioUrl?: string;
  dialogueLines?: DialogueLine[];
  exercises?: QuestionItem[];
}

export interface Course2ModuleNode {
  id: string;
  titleAr: string;
  titleEn: string;
  lessons: Course2LessonNode[];
}

export interface Course2LevelNode {
  id: string;
  titleAr: string;
  titleEn: string;
  modules: Course2ModuleNode[];
}

// ─────────────────────────────────────────────────────────────────────────────
// COURSE 1 — CLASSICAL ARABIC GRAMMAR (النَّحْوُ وَالصَّرْفُ الْكَلَاسِيكِيُّ)
// Source: "Classical Arabic course book.md"
// ─────────────────────────────────────────────────────────────────────────────

export const COURSE_1_LEVELS: LevelNode[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL 1: FOUNDATIONS (الأَسَاسِيَّات)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "lvl-1",
    titleAr: "الْمُسْتَوَى الأَوَّلُ: الأَسَاسِيَّات",
    titleEn: "Level 1: Foundations",
    modules: [
      // ───────────────────────────────────────────────────────────────────────
      // MODULE 1: The Building Blocks
      // ───────────────────────────────────────────────────────────────────────
      {
        id: "mod-1",
        titleAr: "أَجْزَاءُ الجُمْلَةِ: الاِسْمُ وَالفِعْلُ وَالحَرْفُ",
        titleEn: "Module 1: The Building Blocks — Ism, Fil, Harf",
        lessons: [
          {
            id: "les-1-1",
            titleAr: "الجُمْلَةُ المُفِيدَةُ",
            titleEn: "Lesson 1.1: The Useful Sentence",
            durationMins: 12,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Ever wondered how words talk to each other? Just like LEGO bricks, words need to be snapped together in the right way to build something amazing. If you just hold one brick, you can't build a house. You need a plan!

Have you ever said a word that left everyone waiting for more? Like if you walked into a room and just said "The book..." and walked out? Everyone would be confused! That is because a single word like "book" or a broken phrase like "book of zaid" doesn't tell a story.

**The Building Blocks**

In Arabic, every single word you speak falls into one of three buckets:

1. **اَلِاسْمُ (Noun):** A name of a person, place, thing, or idea.
2. **اَلْفِعْلُ (Verb):** An action or something happening at a specific time.
3. **اَلْحَرْفُ (Particle):** A tiny word like "in" or "from."

**From Bricks to Walls**

If you take a **حَرْفٌ** (Particle) like **فِي** (in), it has a meaning in your head, but it doesn't give us any "Useful Benefit" (**فَائِدَةٌ**). If you say "In the house," (**فِي الْبَيْتِ**) it is better, but it is still an incomplete building (**مُرَكَّبٌ نَاقِصٌ**). We are still waiting to hear *who* is in the house or *what* is happening there!

A **الجُمْلَةُ الْمُفِيدَةُ** (The Useful Sentence) is when you combine these blocks so the listener is satisfied and doesn't need to ask "And then what?"

- Incomplete: "The fast horse..." (What about it?)
- Complete: "The horse is fast." (Now I understand!)

**Rules (قَوَاعِدُ)**

1. **الجُمْلَةُ الْمُفِيدَةُ**: The combination of words that provides a complete, meaningful benefit to the listener.`,
          },
          {
            id: "les-1-2",
            titleAr: "المَبْنِيُّ وَالمُعْرَبُ",
            titleEn: "Lesson 1.2: Built vs. Flexible",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Have you ever noticed that some things in life never change no matter where they are, while others adapt to their surroundings? Think about a heavy stone in a garden versus a flexible plant. No matter how much it rains or how the wind blows, the stone stays the same. But the plant might lean or grow differently depending on the sun and water.

Did you know that words in Arabic are just like that? Some are like "stones" that never change their endings, and some are like "plants" that change their vowels based on their position in a sentence.

Look at these examples:

1. **جَاءَ هَؤُلَاءِ الرِّجَالُ**
2. **رَأَيْتُ هَؤُلَاءِ الرِّجَالُ**
3. **مَرَرْتُ بِهَؤُلَاءِ الرِّجَالِ**

Now look at these:

1. **جَاءَ زَيْدٌ**
2. **رَأَيْتُ زَيْدًا**
3. **مَرَرْتُ بِزَيْدٍ**

In Arabic, most nouns are flexible. Their last letter changes its vowel (**حَرَكَةٌ**) depending on whether the word is the one doing the action, receiving the action, or coming after a particle. This flexibility is called **اَلإِعْرَابُ**.

On the other hand, some words are stubborn! No matter where you put them in a sentence, the last letter always sounds exactly the same. This "fixed" state is called **اَلْبِنَاءُ**. Think of it like a building (**بِنَاءٌ**) that is cemented into the ground; it cannot move or change.

**Rules (قَوَاعِدُ)**

1. **اَلْمُعْرَبُ**: A word whose last letter changes its vowel (**حَرَكَةٌ**) due to the change of its position or the words coming before it. Most **أَسْمَاءٌ** (nouns) are in this category.
2. **اَلْمَبْنِيُّ**: A word whose last letter remains in one state and never changes, regardless of its position in the sentence. This includes all **حُرُوفٌ** (particles), certain types of nouns (like pronouns), and some verbs.
3. The change in **اَلْمُعْرَبُ** is usually between **ضَمَّةٌ**, **فَتْحَةٌ**, and **كَسْرَةٌ**.`,
          },
          {
            id: "les-1-3",
            titleAr: "عَلَامَاتُ الإِعْرَابِ الأَرْبَعَةُ",
            titleEn: "Lesson 1.3: Introduction to the Four Signs",
            durationMins: 18,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `How do you know who is doing what in a story? In English, we usually know by the order of the words. If I say "The boy bit the apple," you know the boy did the biting because he came first.

But in Arabic, words are like people wearing specific **badges**. These badges tell us their job, no matter where they stand in the sentence! These badges are the small vowels at the very end of the word.

Look at these examples:

1. **قَالَ الْمُعَلِّمُ**: (The teacher said). The **ضَمَّةٌ** tells us the teacher is the speaker.
2. **رَأَيْتُ الْمُعَلِّمَ**: (I saw the teacher). The **فَتْحَةٌ** tells us the teacher was the one seen.
3. **سَلَّمْتُ عَلَى الْمُعَلِّمِ**: (I gave greetings to the teacher). The **كَسْرَةٌ** appears because of the word "to" (**عَلَى**).

In English, we see this with words like "Who" (**رَفْعٌ**) and "Whom" (**نَصْبٌ/جَرٌّ**). In Arabic, we use these four "States" to keep everything organized.

**Rules (قَوَاعِدُ)**

1. **اَلرَّفْعُ (Raf'):** The state of the Subject (the one doing the action). Its primary sign is the **ضَمَّةٌ** (—ُ).
2. **اَلنَّصْبُ (Nasb):** The state of the Object (the one receiving the action). Its primary sign is the **فَتْحَةٌ** (—َ).
3. **اَلْجَرُّ (Jarr):** The state of a word following a particle (like "in" or "with"). Its primary sign is the **كَسْرَةٌ** (—ِ). **This is only for nouns.**
4. **اَلْجَزْمُ (Jazm):** The state of a verb being "stopped" or commanded. Its primary sign is the **سُكُونٌ** (—ْ). **This is only for verbs.**

Mastering Raf', Nasb, Jarr, and Jazm in two specific ways constitutes 95% of Arabic grammar (Nahw):

**1. The "Who": Which words take these states?**
- Raf' and Nasb: Apply to both Nouns and Present Tense Verbs.
- Jarr: Applies exclusively to Nouns.
- Jazm: Applies exclusively to Present Tense Verbs.

**2. The "How": How are these states expressed?**
- Primary Signs: Expressed through short vowels (Damma, Fatha, Kasra) and the Sukun.
- Secondary Signs: Expressed through letters (Alif, Waw, Ya, Noon) or the removal of letters.`,
          },
          {
            id: "les-1-4",
            titleAr: "نِظَامُ الجُذُورِ الثُّلَاثِيَّةِ",
            titleEn: "Lesson 1.4: The Three Root Letter System",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Have you ever seen a tree where all the branches, leaves, and fruits come from the same hidden root? In Arabic, words grow exactly like that! Most words aren't just random sounds; they are part of a big family that shares the same "DNA."

This "DNA" usually consists of three core letters called the **الحروف الاصلية** (Root). Imagine having the letters **ك - ت - ب**. By just changing the vowels or adding a few extra letters around them, you can create a library of meanings, all related to the idea of "writing."

Look at this family:

- **كَتَبَ** (He wrote)
- **كِتَابٌ** (A book)
- **مَكْتَبٌ** (A desk/office)
- **كَاتِبٌ** (A writer)

In English, the words "book," "write," and "desk" look nothing alike. You have to memorize three different words. But in Arabic, if you know the three root letters, you can often guess what a new word means even if you've never seen it before!

**Rules (قَوَاعِدُ)**

1. **الحروف الاصلية**: Most Arabic words are derived from a "Triple Root" consisting of three original letters.
2. **اَلْفِعْلُ الْمَاضِي**: The root is usually found in the simplest form of the verb (the 3rd person masculine past tense), like **فَعَلَ**.
3. **الْمِيزَانُ الصَّرْفِيُّ**: Scholars use the pattern **ف - ع - ل** (Fa-'A-La) as a scale to measure words. The first letter is the **فَاءُ الْفِعْلِ**, the second is **عَيْنُ الْفِعْلِ**, and the third is **لَامُ الْفِعْلِ**. So in كتب: kaaf is the fa letter, taa is the ein letter, and baa is the laam letter.
4. By adding extra letters (like **م**, **ا**, or **ت**) to the root, we change the meaning while keeping the core "flavor" of the root.`,
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────────
      // MODULE 2: Properties of the Noun
      // ───────────────────────────────────────────────────────────────────────
      {
        id: "mod-2",
        titleAr: "خَصَائِصُ الاِسْمِ",
        titleEn: "Module 2: Properties of the Noun",
        lessons: [
          {
            id: "les-2-1",
            titleAr: "الجِنْسُ: المُذَكَّرُ وَالمُؤَنَّثُ",
            titleEn: "Lesson 2.1: Gender — Masculine vs. Feminine",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `In English, if you see a chair or a pen, you call it "it." It is neutral. But in the world of Arabic, every single noun has a personality! Everything—from the sun in the sky to the shoes on your feet—is treated as either a "he" (**مُذَكَّرٌ**) or a "she" (**مُؤَنَّثٌ**).

Imagine the Arabic language as a big family gathering. There is no "neutral" corner to sit in. Every object you point to must be addressed with the correct gender, which affects the words you use around it.

For example:
- **اَلْقَمَرُ** (The moon) is treated as a male.
- **اَلشَّمْسُ** (The sun) is treated as a female.

Wait, how do we know which is which? Usually, the "default" for words is masculine. To make a word feminine, we often give it a special "bow" or "hat" at the end, most commonly the **تَاء مَرْبُوطَة** (ة).

In English, we sometimes do this with people (Actor vs. Actress, Waiter vs. Waitress), but in Arabic, we do this for almost everything!

**Rules (قَوَاعِدُ)**

1. **اَلْمُذَكَّرُ (Masculine):** Any noun that does not have the signs of being feminine. This is the "starting point" for nouns.
2. **اَلْمُؤَنَّثُ (Feminine):** This is divided into two main types:
   - **True Feminine:** Humans or animals that are biologically female (e.g., **أُمٌّ** - Mother).
   - **Grammatical Feminine:** Objects that Arabic speakers decided to treat as female.
3. **Signs of Femininity (عَلَامَاتُ التَّأْنِيثِ):** The most famous sign is the **تَاء مَرْبُوطَة** (**ة**) added to the end of a word.
   - Example: **مُعَلِّمٌ** (Male teacher) → **مُعَلِّمَةٌ** (Female teacher)
   - Alif mamduda (ـَاء) is another sign of femininity.
4. **Body Parts in Pairs:** Generally, any part of the body that you have two of (eyes, ears, hands, feet) is treated as feminine.`,
          },
          {
            id: "les-2-2",
            titleAr: "العَدَدُ: المُفْرَدُ وَالمُثَنَّى وَالجَمْعُ",
            titleEn: "Lesson 2.2: Number — Singular, Dual, and Plural",
            durationMins: 18,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `In English, we usually have one or many. If you have one cat, it is "singular," and if you have two, three, or a hundred, they are all "plural."

But Arabic is more precise! It has a special "VIP room" just for the number **two**. In Arabic, we distinguish between one person, a pair of people, and a big group. This allows you to know exactly how many things someone is talking about just by the ending of a single word.

Imagine you are at a fruit stand:
- **تُفَّاحَةٌ**: (One apple) — **Singular**
- **تُفَّاحَتَانِ**: (Two apples) — **Dual**
- **تُفَّاحَاتٌ**: (Many apples) — **Plural**

**Rules (قَوَاعِدُ)**

1. **اَلْمُفْرَدُ (Singular):** A noun that refers to only one person or thing.
2. **اَلْمُثَنَّى (Dual):** A noun that refers to exactly two. It is formed by adding **ـَانِ** (in the state of **رَفْعٌ**) or **ـَيْنِ** (in the states of **نَصْبٌ** or **جَرٌّ**) to the end of the singular word.
3. **اَلْجَمْعُ (Plural):** A noun that refers to three or more. It has three main types:
   - **جَمْعُ الْمُذَكَّرِ السَّالِمُ (Sound Masculine Plural):** Formed by adding **ـُونَ** (in the state of رَفْعٌ) or **ـِينَ** (in the states of نَصْبٌ or جَرٌّ). Example: **مُسْلِمُونَ**
   - **جَمْعُ الْمُؤَنَّثِ السَّالِمُ (Sound Feminine Plural):** Formed by adding **ـَاتٌ**. Example: **مُسْلِمَاتٌ**
   - **جَمْعُ التَّكْسِيرِ (Broken Plural):** The "rebel" plural. It doesn't follow a fixed ending; instead, it breaks the singular shape. Example: **كِتَابٌ** becomes **كُتُبٌ**`,
          },
          {
            id: "les-2-3",
            titleAr: "التَّعْيِينُ: النَّكِرَةُ وَالمَعْرِفَةُ",
            titleEn: "Lesson 2.3: Definiteness — Indefinite vs. Definite",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Imagine you are a tourist in a new city.

- If you tell a taxi driver, "Take me to **a** masjid" (**مَسْجِدٌ**), he can take you to any of the 100 masjids in the city. That is **نَكِرَةٌ** (Indefinite).
- If you say, "Take me to **the** masjid" (**اَلْمَسْجِدُ**), he knows exactly which one you mean—perhaps the big one in the center of town. That is **مَعْرِفَةٌ** (Definite).

In Arabic, the difference is like a light switch. A noun without the "light" of **الـ** is general and carries **تَنْوِينٌ** (un/an/in). When you flip the switch by adding **الـ**, the noun becomes bright and specific, and the **تَنْوِينٌ** disappears because it cannot stay in the "light."

**Rules (قَوَاعِدُ)**

1. **اَلنَّكِرَةُ (Indefinite):** A noun that is general. It is marked by **تَنْوِينٌ** (double vowels) at the end.
   - Example: **طَبِيبٌ** (A doctor—could be any doctor).
2. **اَلْمَعْرِفَةُ (Definite):** A noun that is specific. The most common way to make it specific is adding the prefix **الـ**.
   - Example: **اَلطَّبِيبُ** (The doctor—a specific one we know).
3. **The Conflict Rule:** **الـ** and **تَنْوِينٌ** are like oil and water; they never mix. A word either starts with **الـ** or ends with **تَنْوِينٌ**, but never both.
4. **Automatic Specifics:** Some words don't need **الـ** because they are already famous/specific, like names of people (**زَيْنَبُ**), pronouns (**نَحْنُ** - We), or pointing words (**تِلْكَ** - That).`,
          },
          {
            id: "les-2-4",
            titleAr: "الصَّرْفُ: المُنْصَرِفُ وَالمَمْنُوعُ مِنَ الصَّرْفِ",
            titleEn: "Lesson 2.4: Flexibility — Fully Flexible vs. Diptotes",
            durationMins: 22,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `We studied murab and mabni. Under murab, this category comes.

In our previous lessons, we saw how most nouns love to change their "outfits." They can wear a **ضَمَّةٌ** for **رَفْعٌ**, a **فَتْحَةٌ** for **نَصْبٌ**, and a **كَسْرَةٌ** for **جَرٌّ**. They also love wearing their **تَنْوِينٌ** (double-vowel) hats!

But today, we meet a special group of nouns that are a bit more picky. They are like people who refuse to wear certain colors or hats. These are called **المَمْنُوعُ مِنَ الصَّرْفِ** (Diptotes).

Imagine a playground where most kids (**المُنْصَرِفُ**) can go on every slide—the **ضَمَّةٌ** slide, the **فَتْحَةٌ** slide, and the **كَسْرَةٌ** slide. Then, there is a group of kids (**المَمْنُوعُ مِنَ الصَّرْفِ**) who have two strict rules:

1. They **never** wear the **تَنْوِينٌ** hat.
2. They **never** go on the **كَسْرَةٌ** slide. Even when they should be in the state of **جَرٌّ**, they wear a **فَتْحَةٌ** instead!

**Rules (قَوَاعِدُ)**

1. **اَلْمُنْصَرِفُ (Fully Flexible):** Most Arabic nouns. They accept **تَنْوِينٌ** and can take all three vowels (ضمة، فتحة، كسرة).
2. **اَلْمَمْنُوعُ مِنَ الصَّرْفِ (Diptotes):** Nouns that are "prevented from changing" fully.
   - They **cannot** take **تَنْوِينٌ**.
   - In the state of **جَرٌّ**, they take a **فَتْحَةٌ** instead of a **كَسْرَةٌ**.
3. **Common Diptotes include:**
   - Many proper names (like **أَحْمَدُ** and **عُمَرُ**).
   - Names of most cities and countries (like **مَكَّةُ** and **مِصْرُ**).
   - Certain plural patterns (like **مَسَاجِدُ** and **مَصَابِيحُ**).
   - Adjectives ending in **ـَان** (like **عَطْشَانُ** - Thirsty).

**The Single Reason (عِلَّةٌ وَاحِدَةٌ):** Some nouns become diptotes from one strong reason alone:
- The Ultimate Plural (مُنْتَهَى الْجُمُوعِ): Patterns like **مَفَاعِلُ** (e.g., مَسَاجِدُ) or **مَفَاعِيْلُ** (e.g., مَصَابِيْحُ).
- Feminine Alif: Alif Maqsurah (ـَى) like **حُبْلَى**, or Alif Mamdudah (ـاء) like **صَحْرَاءُ**.

**The Combined Reasons (عِلَّتَانِ):** Most diptotes require two reasons — a Proper Name or Adjective plus a structural/meaning trait such as:
- A. Proper Names + Femininity, Non-Arabic origin, compound structure, verb-pattern form, or ending in extra Alif+Noon.
- B. Adjectives + ending in Alif+Noon, following the Af'alu pattern (colors/superlatives), or numerical patterns.`,
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────────
      // MODULE 3: Verb Classification
      // ───────────────────────────────────────────────────────────────────────
      {
        id: "mod-3",
        titleAr: "أَقْسَامُ الفِعْلِ",
        titleEn: "Module 3: Verb Classification",
        lessons: [
          {
            id: "les-3-1",
            titleAr: "المُتَكَلِّمُ وَالمُخَاطَبُ وَالغَائِبُ",
            titleEn: "Lesson 3.1: Perspective — Speaker, Addressee, Absent",
            durationMins: 12,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Think of Perspective as the "camera angle" of a conversation. Depending on where the camera is pointed, the verbs and pronouns in Arabic change completely.

Here is the same action—sitting—viewed through the three different perspectives:

**1. The Speaker (1st Person: اَلْمُتَكَلِّمُ)**
The camera is on ME. The Scenario: You are telling someone what you did. The Example: "I sat on the chair."
Arabic Logic: You use pronouns like أَنَا (Ana - I) or نَحْنُ (Nahnu - We). In a verb like Jalasa (to sit), you add a specific ending to show you are the one talking: Jalas-tu.

**2. The Addressee (2nd Person: اَلْمُخَاطَبُ)**
The camera is on YOU. The Scenario: You are looking at a friend and telling them what they did. The Example: "You sat on the chair."
Arabic Logic: You must now choose based on who you are facing. If it's a male, you say أَنْتَ (Anta); if a female, أَنْتِ (Anti). The verb ending changes to match: Jalas-ta or Jalas-ti.

**3. The Absent (3rd Person: اَلْغَائِبُ)**
The camera is on HIM/HER (somewhere else). The Scenario: You are gossiping or telling a story about someone who isn't part of the "Me and You" circle. The Example: "He sat on the chair" or "She sat on the chair."
Arabic Logic: You use هُوَ (Huwa - He) or هِيَ (Hiya - She). The verb takes its simplest form: Jalasa (He sat) or Jalas-at (She sat).`,
          },
          {
            id: "les-3-2",
            titleAr: "الزَّمَنُ: الماضي وَالمُضَارِعُ وَالمُسْتَقْبَلُ",
            titleEn: "Lesson 3.2: Tense — Past, Present, and Future",
            durationMins: 12,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Think of **Tense** as a **Timeline** that tells you where the action is located relative to the moment you are speaking.

**1. The Past (اَلْمَاضِي - Al-Maadi) — "The Done Deal"**
- "He **wrote** the letter." (كَتَبَ - *Kataba*)
- In Arabic, past tense verbs are "built" (*Mabni*), meaning their base endings don't change regardless of the sentence structure. It's a solid fact of history.

**2. The Present (اَلْمُضَارِع - Al-Mudari') — "The In-Motion Action"**
- "He **is writing**" or "He **writes**." (يَكْتُبُ - *Yaktubu*)
- This is the only verb that can be in the states of **Raf'**, **Nasb**, or **Jazm**. It is alive and changing as the conversation flows.

**3. The Future (اَلْمُسْتَقْبَل - Al-Mustaqbal) — "Coming Soon"**
- Arabic doesn't have a completely separate verb form for the future. Instead, you take the **Present Tense** and add a tiny "speed boost" to the front:
  - **Add "Sa" (سَـ):** For the near future. (*Sayaktubu* - He will write soon).
  - **Add "Sawfa" (سَوْفَ):** For the distant future. (*Sawfa yaktubu* - He will write eventually).`,
          },
          {
            id: "les-3-3",
            titleAr: "الفِعْلُ المَاضِي وَتَصْرِيفُهُ",
            titleEn: "Lesson 3.3: The Past Tense and Its 14 Conjugations",
            durationMins: 25,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `**The 14 Conjugations (تَصْرِيفُ المَاضِي)**

Using the root **فَعَلَ** (He did) as our model:

| Perspective | Gender | Singular (1) | Dual (2) | Plural (3+) |
|---|---|---|---|---|
| **Absent (3rd)** | **Masc.** | **فَعَلَ** (He) | **فَعَلَا** (They 2) | **فَعَلُوا** (They) |
|  | **Fem.** | **فَعَلَتْ** (She) | **فَعَلَتَا** (They 2) | **فَعَلْنَ** (They) |
| **Present (2nd)** | **Masc.** | **فَعَلْتَ** (You) | **فَعَلْتُمَا** (You 2) | **فَعَلْتُمْ** (You all) |
|  | **Fem.** | **فَعَلْتِ** (You) | **فَعَلْتُمَا** (You 2) | **فَعَلْتُنَّ** (You all) |
| **Speaker (1st)** | **Both** | **فَعَلْتُ** (I) | — | **فَعَلْنَا** (We) |

**Technical Observations (Key Rules)**

1. **The Base Form:** The first form (**فَعَلَ**) has no visible suffix. The "He" is hidden inside.
2. **The Feminine 'T':** The **تْ** at the end of **فَعَلَتْ** is just a sign that the subject is a lady. It has a **سُكُونٌ**.
3. **The Alif of Protection:** In **فَعَلُوا**, the silent Alif at the end helps us distinguish the plural "Ooo" sound from other types of endings.
4. **The Sukun Break:** Look closely at the 3rd letter of the root (the **ل**). From **فَعَلْنَ** (They women) all the way to the end of the table, that 3rd letter stays "still" with a **سُكُونٌ**.`,
          },
          {
            id: "les-3-4",
            titleAr: "الفِعْلُ المُضَارِعُ وَتَصْرِيفُهُ",
            titleEn: "Lesson 3.4: The Present Tense and Its 14 Conjugations",
            durationMins: 25,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `In Arabic, the **Present Tense/Future Tense (الفِعْلُ الْمُضَارِعُ)** is used to describe actions happening now or actions that happen habitually (like "I pray" or "He eats").

Unlike the Past Tense, which only changes at the **end** (suffixes), the Present Tense changes at the **beginning** and the **end**.

**The Four Signs (حُرُوفُ الْمُضَارَعَةِ)**

To turn a past verb into a present one, you must add one of four letters to the start. You can remember them by the word **أَنَيْتُ** (Anaytu):
- **أـ**: Used for "I" (**أَنَا**).
- **نـ**: Used for "We" (**نَحْنُ**).
- **يـ**: Used for "He/They" (**غَائِبٌ**).
- **تـ**: Used for "She/You" (**مُخَاطَبٌ**).

**The 14 Conjugations (تَصْرِيفُ الْمُضَارِعِ)**

Using **يَفْعُلُ** (He does):

| Perspective | Gender | Singular (1) | Dual (2) | Plural (3+) |
|---|---|---|---|---|
| **Absent (3rd)** | **Masc.** | **يَفْعُلُ** (He) | **يَفْعُلَانِ** (They 2) | **يَفْعُلُونَ** (They) |
|  | **Fem.** | **تَفْعُلُ** (She) | **تَفْعُلَانِ** (They 2) | **يَفْعُلْنَ** (They) |
| **Present (2nd)** | **Masc.** | **تَفْعُلُ** (You) | **تَفْعُلَانِ** (You 2) | **تَفْعُلُونَ** (You all) |
|  | **Fem.** | **تَفْعُلِينَ** (You) | **تَفْعُلَانِ** (You 2) | **تَفْعُلْنَ** (You all) |
| **Speaker (1st)** | **Both** | **أَفْعُلُ** (I) | — | **نَفْعُلُ** (We) |

**Key Observations**

1. **يـ** is used for almost all "Absent Masculine" forms; **تـ** for all "You" forms.
2. **تَفْعُلُ** can mean "She does" OR "You (man) do" — context tells us which.
3. **The Noon of Power (ن):** In forms like **يَفْعُلُونَ**, the **ن** can disappear if certain words come before the verb (learned in advanced lessons).
4. **The Future:** Add **سَـ** (soon) or **سَوْفَ** (later) before the present tense verb.`,
          },
          {
            id: "les-3-5",
            titleAr: "أَبْوَابُ الفِعْلِ السِّتَّةُ",
            titleEn: "Lesson 3.5: The Six Gates (Verb Patterns)",
            durationMins: 22,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Think of the **Six Gates (أَبْوَاب)** as the "musical scales" of Arabic verbs. While the first and last letters of a three-letter verb usually stay consistent, the **middle letter (عَيْن)** acts like a volume knob that shifts between the Past and Present.

To master these, you just need to track how the vowel on the middle letter "tunes" itself when you move from the **Past** (مَاضِي) to the **Present** (مُضَارِع). There are only six possible combinations:

| # | Name of the Gate | Past Vowel | Present Vowel | The Change |
|---|---|---|---|---|
| 1 | **بَابُ نَصَرَ** | **ـَ** (Fat-ha) | **ـُ** (Damma) | a → u |
| 2 | **بَابُ ضَرَبَ** | **ـَ** (Fat-ha) | **ـِ** (Kasra) | a → i |
| 3 | **بَابُ فَتَحَ** | **ـَ** (Fat-ha) | **ـَ** (Fat-ha) | a → a |
| 4 | **بَابُ سَمِعَ** | **ـِ** (Kasra) | **ـَ** (Fat-ha) | i → a |
| 5 | **بَابُ كَرُمَ** | **ـُ** (Damma) | **ـُ** (Damma) | u → u |
| 6 | **بَابُ حَسِبَ** | **ـِ** (Kasra) | **ـِ** (Kasra) | i → i |

**Key Technical Rules**

- **The Dictionary Rule:** You cannot guess which gate a verb belongs to just by looking at the past tense. You must check a dictionary or hear it from a speaker.
- **The Throat Letter Rule (Gate 3):** For a verb to belong to **بَابُ فَتَحَ**, it usually has a "throat letter" (**ء، هـ، ع، ح، غ، خ**) as its second or third root letter.
- **The Quality Rule (Gate 5):** Verbs in **بَابُ كَرُمَ** usually describe inherent qualities or nature (noble, beautiful, small).
- **The Sensation Rule (Gate 4):** This gate is for **internal experiences** — feelings, learning, and temporary states.
- **The Rare Gate (Gate 6):** This is the rarest category in Arabic. Very few verbs fall here.`,
          },
          {
            id: "les-3-6",
            titleAr: "المَعْلُومُ وَالمَجْهُولُ",
            titleEn: "Lesson 3.6: Active vs. Passive Voice",
            durationMins: 20,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `We are now moving into the "Voice" of the verb. In Arabic, this is the difference between knowing exactly who did the work and focusing only on the work that was done.

**1. The Known (المَعْلُومُ - Active Voice)**
This is the standard form of the verb where the **Doer (الفَاعِلُ)** is known or mentioned.
- **Pattern:** Verb → Known Doer → Object
- **Example:** **قَرَأَ الطَّالِبُ الكِتَابَ** (The student read the book).

**2. The Unknown (المَجْهُولُ - Passive Voice)**
In this form, the **Doer is hidden, removed, or unknown**. The focus shifts entirely to the **Object**.
- **English Equivalent:** "The book **was read**."
- **Arabic Equivalent:** **قُرِئَ الكِتَابُ**

**How to Build the Passive (The Vowel Code)**

To change a verb from Active to Passive, we change the **vowels (Harakat)** — not the letters:

**A. The Past Tense (المَاضِي):**
- **Rule:** Damma on the first letter, Kasra on the second-to-last letter.
- **Active:** **فَعَلَ** → **Passive:** **فُعِلَ**
- **Example:** **كَتَبَ** (He wrote) → **كُتِبَ** (It was written).

**B. The Present Tense (المُضَارِعُ):**
- **Rule:** Damma on the first letter (the prefix), Fat-ha on the second-to-last letter.
- **Active:** **يَفْعَلُ** → **Passive:** **يُفْعَلُ**
- **Example:** **يَقْتُلُ** (He kills) → **يُقْتَلُ** (He is being killed).

**The "Deputy Subject" (نَائِبُ الفَاعِلِ)**
When the Doer (**الفَاعِلُ**) leaves the sentence, the Object takes its place:
1. The Object moves from the **Mansoob** state (Fat-ha) to the **Marfoo'** state (Damma).
2. It is now called the **Deputy Subject (نَائِبُ الفَاعِلِ)**.

> **Active:** **خَلَقَ اللهُ الإِنْسَانَ** (Allah created mankind).
> **Passive:** **خُلِقَ الإِنْسَانُ** (Mankind was created).`,
          },
          {
            id: "les-3-7",
            titleAr: "فِعْلُ الأَمْرِ",
            titleEn: "Lesson 3.7: The Command Verb",
            durationMins: 20,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `The **Command Verb (فِعْلُ الأَمْرِ)** is used to request or order an action. In Arabic, you only give a direct command to someone standing in front of you — the **Present/Addressed Perspective (المُخَاطَب)**. Because of this, there are only **6 patterns** for the command verb (Singular, Dual, and Plural for Masculine and Feminine).

**How to Build a Command from the Present Tense**

Let's use the verb **تَنْصُرُ** (You help) as our example:

**Step 1:** Start with the 2nd Person Present Tense → **تَنْصُرُ**

**Step 2:** Remove the "You" Prefix (تـ) → **ـنْصُرُ**

**Step 3:** Make the Ending "Still" (Jazm) — change the Damma to a Sukun, or drop the Noon:
→ **ـنْصُرْ**

**Step 4:** Add a "Helper Alif" (ا) if the first letter has a Sukun:
- If the middle letter has a **ضَمَّة**, the Alif gets a **ضَمَّة** → **اُنْصُرْ**
- If the middle letter has a **فَتْحَة** or **كَسْرَة**, the Alif gets a **كَسْرَة** → **اِضْرِبْ** / **اِفْتَحْ**

**The 6 Patterns Using نَصَرَ (To Help):**

| Gender | Singular | Dual | Plural |
|---|---|---|---|
| **Masculine** | **اُنْصُرْ** | **اُنْصُرَا** | **اُنْصُرُوا** |
| **Feminine** | **اُنْصُرِي** | **اُنْصُرَا** | **اُنْصُرْنَ** |`,
          },
          {
            id: "les-3-8",
            titleAr: "فِعْلُ النَّهْيِ",
            titleEn: "Lesson 3.8: The Prohibitive — \"Don't\"",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `**Nahi (النَّهْي)** is the grammatical term for **Prohibition**. While the *Amr* (Command) tells someone *to do* something, the *Nahi* tells them **"Do not do it."** This is achieved by using **لَا النَّاهِيَة** (The *Laa* of Prohibition).

**How to Construct the Nahi**

Unlike the Command (*Amr*), you don't have to cut the verb apart. You simply take the 2nd-person Present Tense and apply two changes:

1. **Add the Stop Sign:** Place **لَا** before the Present Tense (2nd person).
2. **Make it "Still" (Jazm):** The verb ending must change to the Jazm state:
   - **Single:** The Damma becomes a **Sukun** (ـُ → ـْ).
   - **Dual/Plural:** The **Noon (ن)** at the end is dropped.
   - **Exception:** The **Noon** in the feminine plural (**تَفْعَلْنَ**) stays — it never leaves.

**The 6 Patterns Using فَعَلَ/يَفْعُلُ:**

| Gender | Singular | Dual | Plural |
|---|---|---|---|
| **Masculine** | **لَا تَفْعُلْ** | **لَا تَفْعُلَا** | **لَا تَفْعُلُوا** |
| **Feminine** | **لَا تَفْعُلِي** | **لَا تَفْعُلَا** | **لَا تَفْعُلْنَ** |

**Important Distinction: "No" vs "Don't"**

- **Negation (Nafi):** A statement of fact. "You **don't** help." → **لَا تَنْصُرُ** (verb stays with Damma).
- **Prohibition (Nahi):** An order. "**Don't** help!" → **لَا تَنْصُرْ** (verb ends in **Sukun**).`,
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────────
      // MODULE 4: Particles
      // ───────────────────────────────────────────────────────────────────────
      {
        id: "mod-4",
        titleAr: "الحُرُوفُ",
        titleEn: "Module 4: Particles",
        lessons: [
          {
            id: "les-4-1",
            titleAr: "حُرُوفُ الجَرِّ",
            titleEn: "Lesson 4.1: Particles of Jarr (Prepositions)",
            durationMins: 18,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `The **Particles of Jarr (حُرُوفُ الجَرِّ)**, often called "Prepositions," are a specific group of words that only enter upon **Nouns**. Their primary job is to connect nouns to other parts of the sentence, and they have a "superpower": they change the grammatical state of the noun that follows them.

**The Rule of the Harf Jarr**

When a Harf Jarr appears before a noun, that noun must enter the state of **جَرّ (Jar)**:
- **The Sign:** For most singular nouns, the sign of Jar is a **Kasra (—ِ)** on the last letter.
- **The Term:** The noun after a Harf Jarr is called a **مَجْرُور (Majroor)**.
- **Formula:** Harf Jarr + Noun = Noun with a Kasra
- **Example:** **البَيْتُ** (The house) → **فِي البَيْتِ** (In the house).

**The 9 Most Common Particles of Jarr:**

| Harf Jarr | Meaning | Example | Translation |
|---|---|---|---|
| **مِنْ** | From | **مِنَ الْمَسْجِدِ** | From the Masjid |
| **إِلَى** | To / Towards | **إِلَى الْمَدْرَسَةِ** | To the school |
| **عَنْ** | About / Away from | **عَنِ النَّبِيِّ** | About the Prophet |
| **عَلَى** | On / Upon | **عَلَى الْمَكْتَبِ** | On the desk |
| **فِي** | In / Inside | **فِي الْقَلْبِ** | In the heart |
| **بِـ** | With / By | **بِالْقَلَمِ** | With the pen |
| **لِـ** | For / Belonging to | **لِلَّهِ** | For Allah |
| **كَـ** | Like / As | **كَالْأَسَدِ** | Like the lion |
| **حَتَّى** | Until | **حَتَّى الْفَجْرِ** | Until dawn |

**Special Formatting Rules**
- **بِـ / لِـ / كَـ**: These single letters "stick" directly to the beginning of the noun.
- **لِـ (For)**: When attached to a word with **الـ**, the Alif of the "Al" is dropped. Example: **الْحَمْدُ** + **لِـ** = **لِلَّهِ**.
- **مِنْ / عَنْ**: If the word after them starts with a Sukun, they take a small vowel: **مِنَ اللهِ**, **عَنِ النَّبِيِّ**.`,
          },
          {
            id: "les-4-2",
            titleAr: "حُرُوفُ العَطْفِ",
            titleEn: "Lesson 4.2: Particles of Conjunction",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Particles of Conjunction (حُرُوفُ العَطْفِ) are the "linkers" of the Arabic language. Their job is to join two words or two sentences together.

The word before the conjunction is the **المَعْطُوف عَلَيْهِ** (The followed), and the word after it is the **المَعْطُوف** (The follower).

**The Mirror Rule (The Power of Coordination)**

Conjunctions are like mirrors. The word *after* the conjunction must copy the grammatical state (the ending vowel) of the word *before* it:
- If the first word has a Damma, the second word gets a Damma.
- If the first word has a Kasra, the second word gets a Kasra.
> Example: **جَاءَ زَيْدٌ وَعَمْرٌو** (Zayd and 'Amr came). Amr copied the damma of Zayd because of the mirror Waw.

**Common Particles of Conjunction:**

| Harf Atf | Meaning | Nuance / Timing |
|---|---|---|
| **وَ** | And | Simple joining (no specific order/time). |
| **فَـ** | Then / So | Immediate succession (Right after). |
| **ثُمَّ** | Then | Succession with a delay (After a while). |
| **أَوْ** | Or | Choice between two things. |
| **بَلْ** | But / Rather | Correcting or adding to a previous thought. |
| **أَمْ** | Or | Used specifically in questions. |

**Deep Dive into the "Then" Duo (فَـ vs ثُمَّ)**

This distinction is very important in the Quran:
- **فَـ (Immediate):** **دَخَلَ زَيْدٌ فَـعَمْرٌو** → Zayd entered, and *immediately* behind him, 'Amr entered.
- **ثُمَّ (Delayed):** **دَخَلَ زَيْدٌ ثُمَّ عَمْرٌو** → Zayd entered, and *after some time*, 'Amr entered.`,
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────────
      // MODULE 5: Phrases
      // ───────────────────────────────────────────────────────────────────────
      {
        id: "mod-5",
        titleAr: "المُرَكَّبَاتُ النَّاقِصَةُ",
        titleEn: "Module 5: Phrases (Incomplete Structures)",
        lessons: [
          {
            id: "les-5-1",
            titleAr: "الإِضَافَةُ",
            titleEn: "Lesson 5.1: The Possessive Phrase",
            durationMins: 18,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Imagine you have two separate nouns — like **"Book"** and **"Allah"** — floating in space. In Arabic, we can "glue" them together to create a powerful connection of belonging. This "Grammatical Glue" is called **الإِضَافَةُ (The Idafah)**.

Examples:
- **بَيْتُ اللهِ** (The House of Allah)
- **قَلَمُ الطَّالِبِ** (The student's pen)
- **دِينُ الإِسْلَامِ** (The religion of Islam)

In English, we express this in 2 ways:
- "The teacher's car" (Adding 's)
- "The door of the masjid" (Using "of")

The **مُرَكَّبٌ إِضَافِيٌّ** (Possessive Fragment) consists of two parts:

1. **المُضَافُ** (The Owned Thing): It is a minimalist — it drops its **تَنْوِينٌ** (tanween), light and ready to be connected.
2. **المُضَافُ إِلَيْهِ** (The Owner): It is the "Boss" of the relationship.

**Rules**

1. **Rules for المُضَافُ (The Owned):**
   - It **cannot** have **الـ** at the beginning.
   - It **cannot** have **تَنْوِينٌ** (double vowels) at the end. It must have a single vowel (ـُ / ـَ / ـِ).
2. **Rules for المُضَافُ إِلَيْهِ (The Owner):**
   - It must **always** be in the state of **جَرٌّ**. Its default sign is a **كَسْرَةٌ**.

Quick note: A mudaf *can* have **الـ** if it is derived from a masdar and acting like a verb.`,
          },
          {
            id: "les-5-2",
            titleAr: "النَّعْتُ وَالمَنْعُوتُ",
            titleEn: "Lesson 5.2: Adjective-Noun Agreement",
            durationMins: 20,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Imagine you are standing at a fruit stall. You see two crates of apples: one has **Red Apples** and the other has **Green Apples**.

- The **Apple** is the noun (**Man'ut / المَنْعُوتُ**).
- **Red** or **Green** is the adjective (**Na't / النَّعْتُ**).

In Arabic, these two are glued together like a price tag on a fruit. The tag (**Na't**) must follow the fruit (**Man'ut**) wherever it goes. They must match perfectly in four ways:

| Example | Rule |
|---|---|
| **تُفَّاحٌ أَحْمَرُ** (A red apple) | Both masculine, singular, same case |
| **تُفَّاحَةٌ خَضْرَاء** (A green apple) | Both feminine |
| **اَلتُّفَّاحُ الْحُلْوُ** (The sweet apple) | Both have الـ |
| **تُفَّاحَتَانِ كَبِيْرَتَانِ** (Two big apples) | Both dual |
| **فِي سُوقٍ نَظِيفٍ** (In a clean market) | Both Majroor (Kasra) |

**Rules (قَوَاعِدُ)**

To be a valid "Shadow" relationship, the **النَّعْتُ** (Adjective) must follow the **الْمَنْعُوتُ** (Noun) in **4 things**:

1. **State (إِعْرَابٌ):** If the noun is **رَفْعٌ** (Damma), the adjective must be **رَفْعٌ**.
2. **Gender (جِنْسٌ):** Masculine noun → masculine adjective; Feminine noun → feminine adjective (with **ة**).
3. **Definiteness (وُسْعَةٌ):** If the noun has **الـ** (Definite), the adjective **must** also have **الـ**. If indefinite, both have **تَنْوِينٌ**.
4. **Number (عَدَدٌ):** Singular follows singular, dual follows dual, plural follows plural.`,
          },
          {
            id: "les-5-3",
            titleAr: "أَسْمَاءُ الإِشَارَةِ",
            titleEn: "Lesson 5.3: Demonstrative Phrases",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Have you ever noticed how often we point at things while talking? "Look at **this** book" or "Pass me **that** pen." In Arabic, these pointing words are called **أَسْمَاءُ الإِشَارَةِ** (Demonstrative Nouns).

Examples:
- **هَذَا الكِتَابُ** (This book)
- **ذَلِكَ الرَّجُلُ** (That man)
- **تِلْكَ الشَّجَرَةُ** (That tree)

The **مُرَكَّبٌ إِشَارِيٌّ** consists of two parts:
1. **اِسْمُ الإِشَارَةِ**: The pointing word (This/That).
2. **المُشَارُ إِلَيْهِ**: The object being pointed at.

**The Full Table of Demonstratives:**

| Number | Near (Masc) | Near (Fem) | Far (Masc) | Far (Fem) |
|---|---|---|---|---|
| **Singular** | **هَذَا** | **هَذِهِ** | **ذَلِكَ** | **تِلْكَ** |
| **Dual** | **هَذَانِ** | **هَاتَانِ** | **ذَانِكَ** | **تَانِكَ** |
| **Plural** | **هَؤُلَاءِ** | **هَؤُلَاءِ** | **أُولَئِكَ** | **أُولَئِكَ** |

**Rules**

1. **The "AL" Rule:** To make a demonstrative phrase (like "This book"), the object **must** have **الـ**. If you say **هَذَا كِتَابٌ** (without **الـ**), it becomes a full sentence: "This is a book."
2. **Distance:** Arabic distinguishes between "Near" (this) and "Far" (that).
3. **Agreement:** The pointing word must match the object in **Gender** and **Number**.
4. **Fixed State:** Most pointing words are **مَبْنِيٌّ** (unchanging) — **هَذَا** stays **هَذَا** in all states.`,
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────────
      // MODULE 6: The Sentence Core
      // ───────────────────────────────────────────────────────────────────────
      {
        id: "mod-6",
        titleAr: "أَرْكَانُ الجُمْلَةِ",
        titleEn: "Module 6: The Sentence Core",
        lessons: [
          {
            id: "les-6-1",
            titleAr: "الجُمْلَةُ الاِسْمِيَّةُ: المُبْتَدَأُ وَالخَبَرُ",
            titleEn: "Lesson 6.1: The Nominal Sentence — Subject & Predicate",
            durationMins: 20,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Welcome to the first type of "Wall" we will build. The **Nominal Sentence (الجُمْلَةُ الاِسْمِيَّةُ)** is the simplest way to make a statement in Arabic. It is a sentence that **starts with a Noun**.

If you want to say "The house is big" or "Allah is Merciful," you are building a Nominal Sentence.

**The Two Pillars**

A Nominal Sentence is built on two main pillars. If one is missing, the wall collapses:

1. **المُبْتَدَأُ (The Subject):** The noun you are starting with. It is the "Topic" of your sentence. It usually comes first.
2. **الخَبَرُ (The Predicate):** The "News" or information you are giving about the Subject. It completes the meaning.

In English, we need the word "is," "am," or "are" to link subject and predicate.

In Arabic, **there is no word for "is."** When you place a specific type of Subject next to a specific type of Predicate, the "is" appears automatically in the meaning.

**Rules**

To make the "is" appear and the sentence be correct, follow these three golden rules:

1. **The State (Case):** Both the **المُبْتَدَأُ** and the **الخَبَرُ** must be in the state of **رَفْعٌ** (usually ending with a Damma or Tanween Damma).
2. **The Capacity (Definiteness):**
   - The **المُبْتَدَأُ** (Subject) is usually **Definite** (starts with **الـ**).
   - The **الخَبَرُ** (Predicate) is usually **Indefinite** (ends with Tanween).
3. **Gender Agreement:** If the Subject is Masculine, the Predicate must be Masculine; if Feminine, then Feminine.

> **Example:** **البَيْتُ كَبِيرٌ** (The house [is] big).
> - **البَيْتُ**: Definite + Damma (Mubtada)
> - **كَبِيرٌ**: Indefinite + Tanween Damma (Khabar)`,
          },
          {
            id: "les-6-2",
            titleAr: "الجُمْلَةُ الفِعْلِيَّةُ: الفَاعِلُ وَالمَفْعُولُ بِهِ",
            titleEn: "Lesson 6.2: The Verbal Sentence — Doer and Object",
            durationMins: 20,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Now that we have built the Nominal Wall, it is time to build the **Verbal Sentence (الجُمْلَةُ الفِعْلِيَّةُ)**. This "Wall" is all about action. A Verbal Sentence is any sentence that **starts with a Verb**.

**The Three Pillars**

A complete Verbal Sentence can have up to three main parts:

1. **الفِعْلُ (The Verb):** The action (Past, Present, or Command). This must come **first**.
2. **الفَاعِلُ (The Subject/Doer):** The one who performed the action.
3. **المَفْعُولُ بِهِ (The Object):** The one or thing that received the action. (Not every verb needs an object.)

Word order comparison:
- **English:** Subject → Verb → Object
- **Arabic:** **Verb → Subject → Object**

**Rules**

To distinguish between the person "doing" and the thing "receiving," Arabic uses vowels as labels:

1. **The Doer (الفَاعِلُ):** Must always be in the state of **رَفْعٌ** (usually ends with a Damma or Tanween Damma).
2. **The Object (المَفْعُولُ بِهِ):** Must always be in the state of **نَصْبٌ** (usually ends with a Fat-ha or Tanween Fat-ha).
3. **Gender Match:** The verb must match the **Doer** in gender. If the boy eats, use **أَكَلَ**. If the girl eats, use **أَكَلَتْ**.

> **Example:** **قَرَأَ الطَّالِبُ الكِتَابَ** (The student read the book).
> - **قَرَأَ**: Verb (Past)
> - **الطَّالِبُ**: Ends with Damma (Doer)
> - **الكِتَابَ**: Ends with Fat-ha (Object)`,
          },
          {
            id: "les-6-3",
            titleAr: "الجُمْلَةُ الإِنْشَائِيَّةُ",
            titleEn: "Lesson 6.3: The Inshaiyyah Sentence (Non-Declarative)",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Up until now, we have studied the **Khabariyyah Sentence (الجُمْلَةُ الْخَبَرِيَّةُ)** — sentences that give us a "news report" or a statement of fact that could be true or false.

But what if you aren't giving news? What if you are asking a question, giving an order, or making a wish? This is where we use the **Inshaiyyah Sentence (الجُمْلَةُ الإِنْشَائِيَّةُ)** — a sentence where you cannot call the speaker a "liar" or "truth-teller" because they aren't reporting a fact; they are **creating** a request, a feeling, or a demand.

Examples:
- **هَلْ شَرِبْتَ الْمَاءَ؟** (Did you drink the water?)
- **اِجْلِسْ هُنَا!** (Sit here!)
- **لَا تَحْزَنْ!** (Do not be sad!)
- **يَا اللهُ!** (O Allah!)

A **جُمْلَةٌ إِنْشَائِيَّةٌ** is a sentence that establishes a meaning that did not exist before the words were spoken. It is not "news"; it is an interaction.

**Rules**

1. **Non-Truth Bearing:** You cannot say "That is true" or "That is a lie" to an Inshaiyyah sentence. "Sit down!" is an order, not a statement of fact.
2. **Types of Inshaiyyah:** There are many types, but the most common are:
   - **الأَمْرُ (Command):** Ordering something to happen.
   - **النَّهْيُ (Prohibition):** Ordering something to stop.
   - **الِاسْتِفْهَامُ (Question):** Asking for information.
   - **النِّدَاءُ (Calling):** Calling someone's attention (using **يَا**).
   - **التَّمَنِّي (Wishing):** Expressing a wish (using **لَيْتَ**).`,
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────────
      // MODULE 7: The Change-Agents
      // ───────────────────────────────────────────────────────────────────────
      {
        id: "mod-7",
        titleAr: "النَّوَاسِخُ",
        titleEn: "Module 7: The Change-Agents (Nawasikh)",
        lessons: [
          {
            id: "les-7-1",
            titleAr: "كَانَ وَأَخَوَاتُهَا",
            titleEn: "Lesson 7.1: Kāna and its Sisters",
            durationMins: 22,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Welcome to **Module 7**! You have mastered the "Wall" (the basic sentence), but now we introduce **Change-Agents (النَّوَاسِخُ)** — words that enter a perfectly stable sentence and change its rules. We start with the most famous group: **كَانَ وَأَخَوَاتُهَا** (Kana and its Sisters).

**The Function of Kāna**

Originally, a Nominal Sentence has two pillars that are both in the state of **رَفْعٌ** (Damma):
> Example: **زَيْدٌ قَائِمٌ** (Zayd is standing). — Both ends with Damma.

When **كَانَ** (Was) enters the sentence, it changes the "News" (the Predicate) but leaves the "Subject" alone:
> **كَانَ زَيْدٌ قَائِمًا** (Zayd was standing). — Predicate now has Fat-ha.

**Rules**

1. **The Subject (اِسْمُ كَانَ):** Remains in the state of **رَفْعٌ** (Damma).
2. **The Predicate (خَبَرُ كَانَ):** Changes to the state of **نَصْبٌ** (Fat-ha).
3. **The Sisters:** Other verbs that act exactly like **كَانَ** but with different meanings:

| Sister | Meaning | Example |
|---|---|---|
| **كَانَ** | Was | **كَانَ اللهُ غَفُورًا** |
| **أَصْبَحَ** | Became (in the morning) | **أَصْبَحَ المَاءُ بَارِدًا** |
| **صَارَ** | Became / Transformed | **صَارَ الطِّينُ خَزَفًا** |
| **لَيْسَ** | Is not (Negation) | **لَيْسَ النَّجَاحُ سَهْلًا** |
| **مَا زَالَ** | Still | **مَا زَالَ الطَّالِبُ نَائِمًا** |

Note: Some sisters have a present tense form (مُضَارِع) and some do not.`,
          },
          {
            id: "les-7-2",
            titleAr: "إِنَّ وَأَخَوَاتُهَا",
            titleEn: "Lesson 7.2: Inna and its Sisters",
            durationMins: 20,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `If **كَانَ** was the "Gentle Giant" that changed the end of the sentence, then **إِنَّ** (Inna) and its sisters are the "Opposite Force."

While **كَانَ** leaves the Subject alone and changes the Predicate, **إِنَّ** does the exact opposite: it attacks the **Subject** and leaves the **Predicate** alone.

**The Function of Inna**

The primary job of **إِنَّ** is **تَوْكِيدٌ** (Emphasis/Certainty). It turns a simple statement into a powerful fact:
- Normal: **اللهُ غَفُورٌ** (Allah is Forgiving).
- With Inna: **إِنَّ اللهَ غَفُورٌ** (Indeed, Allah is Forgiving).

**Rules**

1. **The Subject (اِسْمُ إِنَّ):** Changes to the state of **نَصْبٌ** (Fat-ha).
2. **The Predicate (خَبَرُ إِنَّ):** Remains in its original state of **رَفْعٌ** (Damma).
3. **The Sisters:**

| Sister | Meaning | Example |
|---|---|---|
| **إِنَّ** | Indeed / Verily | **إِنَّ اللهَ مَعَنَا** |
| **أَنَّ** | That | **أَعْلَمُ أَنَّ اللهَ قَدِيرٌ** |
| **كَأَنَّ** | As if / Like | **كَأَنَّ العِلْمَ نُورٌ** |
| **لَكِنَّ** | But / However | **الكِتَابُ صَغِيرٌ لَكِنَّ العِلْمَ كَبِيرٌ** |
| **لَيْتَ** | If only (Wishing) | **لَيْتَ الشَّبَابَ يَعُودُ** |
| **لَعَلَّ** | Perhaps / So that | **لَعَلَّ اللهَ يُحْدِثُ أَمْرًا** |`,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEVEL 2: INTERMEDIATE SYNTHESIS (التَّرْكِيبُ المُتَوَسِّطُ)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "lvl-2",
    titleAr: "الْمُسْتَوَى الثَّانِي: التَّرْكِيبُ المُتَوَسِّطُ",
    titleEn: "Level 2: Intermediate Synthesis",
    modules: [
      // ───────────────────────────────────────────────────────────────────────
      // MODULE 8: Intermediate Morphology
      // ───────────────────────────────────────────────────────────────────────
      {
        id: "mod-8",
        titleAr: "تَصْرِيفُ الأَفْعَالِ",
        titleEn: "Module 8: Intermediate Morphology",
        lessons: [
          {
            id: "les-8-1",
            titleAr: "الثُّلَاثِيُّ وَالمَزِيدُ: الجُذُورُ الأَصْلِيَّةُ وَالمَزِيدَةُ",
            titleEn: "Lesson 8.1: 3-Letter Roots vs. Expanded Roots",
            durationMins: 30,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Every Arabic word has a **Root** (the DNA).

- **Bare (3-Letter):** The DNA in its simplest, most natural state. Like **ك-ت-ب**.
- **Expanded (Mazid):** When you "engineer" the DNA by adding letters to create a specific function or result.

**The Functional "Why" — The Purpose of Expanding**

In Arabic, we don't just add letters for sound; we add them for **Logic**:

**A. The Power Up (Intensity)**
When you double a letter (using a Shadda), you physically make the word "heavier":
- **Bare:** **قَطَعَ** (He cut) → Simple action.
- **Expanded:** **قَطَّعَ** (He chopped/shredded) → Done many times or with great force.

**B. The "Push" (Making it Happen to Others)**
Adding a letter turns an action into an influence:
- **Bare:** **نَزَلَ** (He descended/came down) → He did it himself.
- **Expanded:** **أَنْزَلَ** (He sent down) → He made something else come down.

**C. The "Request" (Seeking)**
The prefix **اِسْتَـ** (Ist) tells the listener the doer is *looking* for something:
- **Bare:** **غَفَرَ** (He forgave).
- **Expanded:** **اِسْتَغْفَرَ** (He sought forgiveness).

**The "Big 10" Patterns (أَبْوَابُ الثُّلَاثِيِّ الْمُزِيدِ):**

| Class | Pattern (Masdar) | Added Letters | Core Meaning |
|---|---|---|---|
| +1 Letter | **إِفْعَال** | أ | Passing action to others |
| +1 Letter | **تَفْعِيل** | ّ (Shadda) | Intensity / Teaching |
| +1 Letter | **مُفَاعَلَة** | ا | Partnership / Interaction |
| +2 Letters | **تَفَعُّل** | ت + ّ | Personal effort / Learning |
| +2 Letters | **تَفَاعُل** | ت + ا | Group teamwork |
| +2 Letters | **اِفْتِعَال** | ا + ت | Earning / Striving |
| +2 Letters | **اِنْفِعَال** | ا + ن | Result of an action (Passive) |
| +3 Letters | **اِسْتِفْعَال** | ا + س + ت | Seeking / Requesting |

**The 6 Primary Doors (الثُّلَاثِيُّ الْمُجَرَّدُ):**
1. **بَاب فَتَحَ - يَفْتَحُ** | 2. **بَاب نَصَرَ - يَنْصُرُ** | 3. **بَاب ضَرَبَ - يَضْرِبُ**
4. **بَاب سَمِعَ - يَسْمَعُ** | 5. **بَاب حَسِبَ - يَحْسِبُ** | 6. **بَاب كَرُمَ - يَكْرُمُ**`,
          },
          {
            id: "les-8-2",
            titleAr: "الفِعْلُ الرُّبَاعِيُّ",
            titleEn: "Lesson 8.2: Quadrilateral Roots (Ruba'i)",
            durationMins: 20,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Think of the Arabic language as a construction site where almost every building is a **"Triangle"** (The 3-Letter Root). But in the specialized districts of the language, you'll find the **"Squares"** (The 4-Letter Root). These are the **Ruba'i** roots — built from the ground up with four unique, inseparable letters.

**1. Ruba'i Mujarrad: بَاب فَعْلَلَة**
Used for repetitive actions or four distinct root letters:
- **بَعْثَرَ** (To scatter/overturn — used in Surah Al-Infitar)
- **وَسْوَسَ** (To whisper — used in Surah An-Nas)
- **زَلْزَلَ** (To shake violently — used in Surah Az-Zalzalah)

**2. Ruba'i Mazid Fih: بَاب تَفَعْلُل**
Describes the result of an action or something happening reflexively:
- **تَرَدَّى** (To fall headlong — used in Surah Al-Ma'idah)

**3. Ruba'i Mazid Fih: بَاب اِفْعِلَّال**
Used for deep internal states:
- **اِطْمَأَنَّ** (To be at rest/peace — used in Surah Al-Fajr) → **مُطْمَئِنٌّ** (Tranquil)

**Grammar Rules (القَوَاعِدُ)**
1. **Fixed Roots:** Unlike 3-letter verbs, these roots have 4 essential letters (e.g., د-ح-ر-ج). You cannot remove any without losing the meaning.`,
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────────
      // MODULE 9: The Nominative State
      // ───────────────────────────────────────────────────────────────────────
      {
        id: "mod-9",
        titleAr: "المَرْفُوعَاتُ",
        titleEn: "Module 9: The Nominative State (Marfu'at)",
        lessons: [
          {
            id: "les-9-1",
            titleAr: "أنواع المرفوعات السبعة",
            titleEn: "Lesson 9.1: The 7 Types of Nominative Words",
            durationMins: 20,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Welcome to **Module 9**! In Arabic grammar, there is a "VIP Club" of words called **المَرْفُوعَاتُ** (The Nominatives). These are words that **must** end in a **Damma** (or its equivalent state of *Raf'*).

There are **7 main types** of words that are always in the state of **رَفْعٌ**. Think of this module as the "Grand Review and Final Polish" of the Nominative state.

**1. The Subject of a Nominal Sentence (المُبْتَدَأُ)**
The word that starts a nominal sentence.
> Example: **زَيْدٌ عَالِمٌ** (Zayd is a scholar).

**2. The Predicate of a Nominal Sentence (الخَبَرُ)**
The news about the subject.
> Example: **زَيْدٌ عَالِمٌ**.

**3. The Doer of a Verbal Sentence (الفَاعِلُ)**
The one who performed the action.
> Example: **جَاءَ الحَقُّ** (The Truth has come).

**4. The Deputy Subject (نَائِبُ الفَاعِلِ)**
The object that took the doer's place in a Passive sentence (Lesson 3.6).
> Example: **خُلِقَ الإِنْسَانُ** (Mankind was created).

**5. The Subject of Kāna (اِسْمُ كَانَ)**
Remember, Kāna leaves the first part alone (Lesson 7.1).
> Example: **كَانَ اللهُ غَفُورًا** — اللهُ has Damma.

**6. The Predicate of Inna (خَبَرُ إِنَّ)**
Inna attacks the first part but leaves the second part alone (Lesson 7.2).
> Example: **إِنَّ اللهَ غَفُورٌ** — غَفُورٌ has Damma.

**7. The "Follower" Nominatives (التَّوَابِعُ)**
Adjectives, emphasis words, substitutes, and conjunctions that follow and match a nominative noun.`,
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────────
      // MODULE 10: The Accusative State
      // ───────────────────────────────────────────────────────────────────────
      {
        id: "mod-10",
        titleAr: "المَنْصُوبَاتُ",
        titleEn: "Module 10: The Accusative State (Mansubat)",
        lessons: [
          {
            id: "les-10-1",
            titleAr: "المَفْعُولُ بِهِ",
            titleEn: "Lesson 10.1: Direct Object",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `If I say to you: "The lion ate..." and then I stop. You will immediately ask: "What did the lion eat?"

The **المَفْعُولُ بِهِ** is the "target" in the sentence — the person or thing that the action of the Doer fell upon. Think of a verbal sentence like an arrow being shot:

1. The Verb (فِعْلٌ) is the act of shooting.
2. The Doer (فَاعِلٌ) is the person holding the bow.
3. The Direct Object (مَفْعُولٌ بِهِ) is the target the arrow hits.

Examples (notice the Fat-ha):
- **رَكِبَ الفَارِسُ الجَوَادَ.** (The knight rode the horse.)
- **قَرَأَ الطَّالِبُ القُرْآنَ.** (The student read the Quran.)
- **خَلَقَ اللهُ الأَرْضَ.** (Allah created the Earth.)

**Rules (قَوَاعِدُ)**

1. **Grammatical State:** The المَفْعُولُ بِهِ is always in the state of **نَصْبٌ** (Accusative).
2. **The Sign:** The primary sign for this state in a singular noun is the **Fat-ha (ـَ)**.
3. **Position:** It usually appears after the Doer (فَاعِلٌ) in a verbal sentence.`,
          },
          {
            id: "les-10-2",
            titleAr: "المَفْعُولُ المُطْلَقُ",
            titleEn: "Lesson 10.2: Absolute Object",
            durationMins: 18,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Have you ever wanted to say something with **extra power**? Instead of just saying "I ran," you want to say "I ran a **serious** run!"

The **المَفْعُولُ المُطْلَقُ** is a noun (specifically a **Masdar / Infinitive**) derived from the same root as the verb in the sentence. It is called "Absolute" because it isn't tied to a specific person or time; it is the **pure essence** of the action.

Examples:
- **كَلَّمَ اللهُ مُوسَى تَكْلِيمًا.** (Allah spoke to Moses a [direct] **speaking**.)
- **وَرَتِّلِ القُرْآنَ تَرْتِيلًا.** (Recite the Quran a [proper] **recitation**.)
- **فَرِحَ النَّاجِحُ فَرَحًا شَدِيدًا.** (The successful one rejoiced a great **rejoicing**.)

We use it for three main reasons:
1. **To Emphasize:** "He *really* jumped." (**قَفَزَ قَفْزًا**)
2. **To Describe the Style:** "He slept the *sleep of a child*." (**نَامَ نَوْمَ الطِّفْلِ**)
3. **To Count:** "He prostrated *one prostration*." (**سَجَدَ سَجْدَةً**)

**Rules (قَوَاعِدُ)**

1. **The "Twin" Rule:** The المَفْعُولُ المُطْلَقُ must share the same root letters as the verb.
2. **Grammatical State:** Always **مَنْصُوبٌ** (Accusative).
3. **The Sign:** Its primary sign is the **فَتْحَةٌ** (ـً).
4. **Placement:** Always comes after the verb has been mentioned.`,
          },
          {
            id: "les-10-3",
            titleAr: "المَفْعُولُ لِأَجْلِهِ",
            titleEn: "Lesson 10.3: Object of Purpose (The \"Why\")",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Have you ever done something specifically because of a feeling in your heart? You stood up **out of respect**, or you studied hard **hoping for success**.

The **مَفْعُولُ لِأَجْلِهِ** is the **"Why."** It is the grammar of **intent** and **motivation**.

Examples (the underlined words answer: "Why did you do it?"):
- **قَامَ الطَّالِبُ اِحْتِرَامًا لِلْمُعَلِّمِ.** (The student stood up **out of respect** for the teacher.)
- **يُصَلِّي المُؤْمِنُ طَمَعًا فِي الجَنَّةِ.** (The believer prays **hoping** for Paradise.)
- **تَصَدَّقْتُ ابْتِغَاءَ مَرْضَاةِ اللهِ.** (I gave charity **seeking** the pleasure of Allah.)
- **سَافَرْتُ طَلَبًا لِلْعِلْمِ.** (I traveled **in search** of knowledge.)

**Rules (قَوَاعِدُ)**

1. **The "Why" Rule:** It answers the question: **لِمَاذَا؟** (Why?).
2. **Grammatical State:** Always **مَنْصُوبٌ** (Accusative).
3. **The Sign:** Its primary sign is the **فَتْحَةٌ** (ـً).`,
          },
          {
            id: "les-10-4",
            titleAr: "المَفْعُولُ فِيهِ / الظَّرْفُ",
            titleEn: "Lesson 10.4: Adverb of Time and Place",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Every story needs a **Setting**. If I tell you "I met my friend," your next questions will be "**When?**" and "**Where?**"

The **المَفْعُولُ فِيهِ** (also known as **الظَّرْف**) literally means "The Object *in* which" the action happens. Think of it as a **Box**: the action is placed inside this box of Time or Space.

**Adverbs of Time (ظَرْفُ زَمَانٍ) — answer: مَتَى؟ (When?):**
- **سَافَرْتُ لَيْلًا.** (I traveled **at night**.)
- **صُمْتُ يَوْمَ الخَمِيسِ.** (I fasted **on Thursday**.)
- **يَهْطِلُ المَطَرُ شِتَاءً.** (The rain falls **in winter**.)

**Adverbs of Place (ظَرْفُ مَكَانٍ) — answer: أَيْنَ؟ (Where?):**
- **جَلَسْتُ فَوْقَ الكُرْسِيِّ.** (I sat **above** the chair.)
- **وَقَفَ الإِمَامُ أَمَامَ المُصَلِّينَ.** (The Imam stood **in front of** the worshippers.)
- **بَنَى العُصْفُورُ عُشَّهُ بَيْنَ الأَغْصَانِ.** (The bird built its nest **between** the branches.)

**Rules (قَوَاعِدُ)**

1. **Grammatical State:** Always **مَنْصُوبٌ** (Accusative).
2. **The Sign:** Its primary sign is the **فَتْحَةٌ** (ـَ).
3. **The Mudaf Rule:** Many adverbs of place (like **فَوْقَ**, **تَحْتَ**, **أَمَامَ**) act as a **مُضَافٌ**, meaning the word after them will have a **Kasra**.`,
          },
          {
            id: "les-10-5",
            titleAr: "المَفْعُولُ مَعَهُ",
            titleEn: "Lesson 10.5: Object of Accompaniment",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Have you ever walked along the beach while the sun was setting? You weren't exactly "walking the sun" — but you were walking *alongside* it.

The **المَفْعُولُ مَعَهُ** is a noun that comes after a specific **وَاوُ المَعِيَّةِ** (Waw of Accompaniment), which means "alongside" or "at the same time as."

Examples (notice the Fat-ha on the word following the special Waw):
- **سَارَ الرَّجُلُ وَالجَبَلَ.** (The man walked alongside/with the mountain.)
- **اِسْتَيْقَظْتُ وَطُلُوعَ الشَّمْسِ.** (I woke up with the rising of the sun.)
- **سَافَرَ المُسَافِرُ وَاللَّيْلَ.** (The traveler traveled along with the night.)

**How is it different from a normal "And"?**
- Normal "And" (حَرْفُ عَطْفٍ): **Zayd and Amr** ate. (Both are eating.)
- Waw of Accompaniment: **Zayd walked and the wall.** (Zayd is walking; the wall is just there next to him.)

**Rules (قَوَاعِدُ)**

1. The **و** before the noun must mean "alongside" or "at the same time as."
2. **Grammatical State:** Always **مَنْصُوبٌ** (Accusative).
3. **The Sign:** Its primary sign is the **فَتْحَةٌ** (ـَ).
4. **The Doer Check:** The noun after the **و** should be something that cannot logically share in doing the action.`,
          },
          {
            id: "les-10-6",
            titleAr: "الحَالُ",
            titleEn: "Lesson 10.6: The Hal — Condition / State",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `If I tell you, "The guest arrived," you know *who* came. But don't you want to know **how** he came? Did he arrive **smiling**? Was he **tired**? Was he **rushing**?

The **الحَالُ** functions like a "snapshot" taken at the time of the event. It describes the **manner** or **state** of the Doer (**الفَاعِلُ**) or the Object (**المَفْعُولُ بِهِ**) at the time the verb occurs. It answers the question: **كَيْفَ؟** (How?)

Examples:
- **جَاءَ الطِّفْلُ ضَاحِكًا.** (The child came **laughing**.)
- **صَلَّى المُؤْمِنُ خَاشِعًا.** (The believer prayed **humbly**.)
- **شَرِبْتُ الْمَاءَ بَارِدًا.** (I drank the water **[while it was] cold**.)

The **الحَالُ** can also be expressed as a sentence (Hal Jumlah):
- **رَأَيْتُ الْأُمَّ تَبْتَسِمُ.** (I saw the mother **smiling**.)
- **خَرَجْتُ مِنَ الْبَيْتِ وَالْمَطَرُ يَنْزِلُ.** (I left the house **while the rain was falling**.)

**Two parts of the "Picture":**
1. **صَاحِبُ الحَالِ** (The Owner of the Condition): The person we are describing.
2. **الحَالُ** (The Condition): The description itself.

**Rules (قَوَاعِدُ)**
1. The **الحَالُ** answers: **كَيْفَ؟** (How?)
2. **Grammatical State:** Always **مَنْصُوبٌ** (Accusative).
3. **The Sign:** Its primary sign is the **فَتْحَةٌ** (ـً).
4. **Indefinite Rule:** The **الحَالُ** is almost always **نَكِرَةٌ** (without **الـ**).`,
          },
          {
            id: "les-10-7",
            titleAr: "التَّمْيِيزُ",
            titleEn: "Lesson 10.7: Distinction (Tamyiz) and Numbers",
            durationMins: 22,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `"Have you ever had a friend say, 'I have twenty,' and then just stop talking? You know they have the number 20, but you're left wondering: Twenty **what**?" The **Tamyiz** is the word that drops in to **clear the fog**.

**التَّمْيِيزُ** is a noun used to remove ambiguity (vagueness) from a previous word or an entire sentence. It falls into two categories:
1. **Distinction of a Single Word (ذات):** Clarifying numbers, weights, or measurements. "I have a liter (**of what?**) **لَبَنًا** (milk)."
2. **Distinction of a Sentence (نِسْبَة):** Clarifying a relationship. "The student is the most hardworking (**in what?**) **أَدَبًا** (in manners)."

Examples:
- **اِشْتَرَيْتُ عِشْرِينَ كِتَابًا.** (I bought twenty **books**.)
- **طَابَ مُحَمَّدٌ نَفْسًا.** (Muhammad was happy **in soul**.)
- **أَنَا أَكْثَرُ مِنْكَ مَالًا.** (I am more than you **in wealth**.)

**Rules:** Grammatical State: Always **مَنْصُوبٌ**. Sign: **فَتْحَةٌ** (ـً). Must be **نَكِرَةٌ** (indefinite).

**The "Dance" of Numbers and Tamyiz:**

| Numbers | Rule |
|---|---|
| **1 & 2** | Follow the noun in gender (like adjectives). |
| **3–10** | Opposite gender from the noun! Noun is plural + Majroor. |
| **11 & 12** | Both parts match the noun in gender. Noun: singular + Mansub (-an). |
| **13–19** | Unit (opposite gender) + Ten (matches noun). Noun: singular + Mansub. |
| **Multiples of 10 (20–90)** | Gender-neutral. Noun: singular + Mansub. |
| **100, 1000, millions** | Same form regardless of gender. Noun: singular + Majroor. |`,
          },
          {
            id: "les-10-8",
            titleAr: "المُنَادَى",
            titleEn: "Lesson 10.8: The Vocative (Al-Munada)",
            durationMins: 18,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `"Have you ever been in a crowded room where everyone is talking, and suddenly someone shouts your name? In that split second, you are pulled out of the 'background' and placed under a **grammatical spotlight**."

The **المُنَادَى** is the noun that comes after a tool used for calling (the most famous being **يَا**). It is part of the **مَنْصُوبَاتُ** because calling "O Zayd!" is like saying "I am calling Zayd" — so Zayd is the object.

Examples:
- **يَا زَيْدُ، انْتَبِهْ.** (O **Zayd**, pay attention.) — single name, gets Damma
- **يَا عَبْدَ اللهِ، أَقْبِلْ.** (O **Abdullah**, come forward.) — possessive phrase, gets Fat-ha
- **يَا طَالِبًا، اجْتَهِدْ.** (O **student** [any student], work hard.) — indefinite, gets Fat-ha

**The two main types:**

1. **The "Fixed" (المَبْنِيّ):** If it is a single name (**زَيْدُ**) or a specific person in front of you (**رَجُلُ**), it ends with a **Damma**.
2. **The "Accusative" (المَنْصُوب):** If the name is a possessive phrase (**عَبْدَ اللهِ**) or you are calling someone general (**طَالِبًا**), it takes a **Fat-ha**.

**Rules (قَوَاعِدُ)**

1. **The Tool:** The most common word for calling is **يَا**.
2. **Grammatical State:** The **المُنَادَى** is fundamentally **مَنْصُوبٌ** (Accusative).
3. **The Damma Exception:** If the name is a **single word** (proper name), it takes a **Damma** (without Tanween).
4. **Calling "Allah":** We say **يَا اللهُ** or **اللَّهُمَّ** (the "Meem" replaces the "Ya").`,
          },
          {
            id: "les-10-9",
            titleAr: "الاِسْتِثْنَاءُ",
            titleEn: "Lesson 10.9: The Exception (Istithna)",
            durationMins: 18,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `"Have you ever been at a party where everyone decided to leave, but one person stayed behind to help clean up? You would say, 'Everyone left **except** Zayd.' The **Istithna** is the grammatical gatekeeper that stands at the exit and says, 'Everyone passes through... but not you.'"

In Arabic, "The Exception" is like a mathematical minus sign (−). It allows us to make a general statement and then "subtract" one specific part from it.

**The Three Parts:**
1. **المُسْتَثْنَى مِنْهُ** (The Big Group): The ones the action originally applied to.
2. **أَدَاةُ الاِسْتِثْنَاءِ** (The Tool): The word **إِلَّا** (Except).
3. **المُسْتَثْنَى** (The Exception): The specific one being subtracted.

Examples:
- **حَضَرَ الضُّيُوفُ إِلَّا وَاحِدًا.** (The guests arrived, except one.) — positive sentence, exception is Mansoob
- **مَا حَضَرَ الضُّيُوفُ إِلَّا وَاحِدٌ.** (No guests arrived, except one.) — negative sentence, exception is Marfoo'
- **فَسَجَدَ الْمَلَائِكَةُ كُلُّهُمْ أَجْمَعُونَ إِلَّا إِبْلِيسَ.** (The angels prostrated, all of them, except Iblis.)
- **مَا مُحَمَّدٌ إِلَّا رَسُولٌ.** (Muhammad is not but a messenger.)`,
          },
          {
            id: "les-10-10",
            titleAr: "اِسْمُ إِنَّ وَخَبَرُ كَانَ",
            titleEn: "Lesson 10.10: Noun of Inna & Predicate of Kana",
            durationMins: 12,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `This lesson consolidates what we learned in Module 7 — specifically the accusative roles created by the Change-Agents:

**اِسْمُ إِنَّ (Noun of Inna)**

When إِنَّ (and its sisters) enters a nominal sentence, the Subject (اِسْمُ إِنَّ) changes to **نَصْبٌ** (Fat-ha):
- **إِنَّ اللهَ غَفُورٌ** → The word **اللهَ** now has a Fat-ha — it is **مَنْصُوبٌ**.

**خَبَرُ كَانَ (Predicate of Kana)**

When كَانَ (and its sisters) enters a nominal sentence, the Predicate (خَبَرُ كَانَ) changes to **نَصْبٌ** (Fat-ha):
- **كَانَ اللهُ غَفُورًا** → The word **غَفُورًا** now has Tanween Fat-ha — it is **مَنْصُوبٌ**.

**Both of these are members of the Accusative (مَنْصُوبَاتُ) family**, even though they come from the Nawasikh (Change-Agents) chapter. Understanding them as "accusatives" helps unify the picture of Arabic grammar.`,
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────────
      // MODULE 11: The Genitive State
      // ───────────────────────────────────────────────────────────────────────
      {
        id: "mod-11",
        titleAr: "المَجْرُورَاتُ",
        titleEn: "Module 11: The Genitive State (Majruurat)",
        lessons: [
          {
            id: "les-11-1",
            titleAr: "المَجْرُورُ بِحَرْفِ الجَرِّ",
            titleEn: "Lesson 11.1: Genitive by Particles",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `The **مَجْرُورُ بِحَرْفِ الجَرِّ** (Genitive by Preposition) is a noun that follows a particle of Jarr (Harf Jarr), causing it to take a **Kasra (ـِ)** as its ending vowel.

This was introduced in Lesson 4.1 (Particles of Jarr). This module reviews it within the complete framework of Arabic cases.

The key particles of Jarr are: **مِنْ، إِلَى، عَنْ، عَلَى، فِي، بِـ، لِـ، كَـ، حَتَّى**

**The Sign of Genitive:**
- For most singular nouns: **Kasra (—ِ)**
- For Diptotes (المَمْنُوعُ مِنَ الصَّرْفِ): **Fat-ha** instead of Kasra!
- For sound masculine plurals: **Yaa (ـِينَ)**
- For duals: **Yaa (ـَيْنِ)**

> Example: **ذَهَبْتُ إِلَى الْمَسْجِدِ** (I went to the mosque.) → **الْمَسْجِدِ** has Kasra.
> Diptote example: **مَرَرْتُ بِمَسَاجِدَ** (I passed by mosques) → Fat-ha because **مَسَاجِدَ** is a Diptote.`,
          },
          {
            id: "les-11-2",
            titleAr: "المُضَافُ إِلَيْهِ",
            titleEn: "Lesson 11.2: Genitive by Possession (Mudaf Ilayh)",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `The **المُضَافُ إِلَيْهِ** (The Owner in an Idafah) is always in the state of **جَرٌّ**, carrying a **Kasra** as its mark. This was introduced in Lesson 5.1 (The Possessive Phrase).

This form of genitive is created NOT by a preposition but by the bond of possession (Idafah):

> **بَيْتُ اللهِ** → **اللهِ** has Kasra — it is **مَجْرُورٌ** because it is the المُضَافُ إِلَيْهِ.

**Summary of Genitive Causes:**
There are only two causes for the Genitive state in Arabic:
1. Following a Particle of Jarr (Harf Jarr) — Module 11.1
2. Being the second word (owner) in a Possessive Phrase (Idafah) — this lesson

Both result in a **Kasra** (or its equivalent for special noun types).`,
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────────
      // MODULE 12: The Followers
      // ───────────────────────────────────────────────────────────────────────
      {
        id: "mod-12",
        titleAr: "التَّوَابِعُ",
        titleEn: "Module 12: The Followers (Tawabi')",
        lessons: [
          {
            id: "les-12-1",
            titleAr: "النَّعْتُ / الصِّفَةُ",
            titleEn: "Lesson 12.1: Adjective (Na't / Sifa)",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `The **النَّعْتُ** (Adjective) is a Follower — it always mirrors the noun it describes in four qualities: **grammatical state, gender, definiteness, and number**.

This topic was introduced in Lesson 5.2 (Adjective-Noun Agreement) and is now reviewed within the larger system of التَّوَابِعُ (The Followers).

**Key Reminder:** The adjective must "shadow" the noun in:
1. **Case (إِعْرَابٌ):** Damma follows Damma, Kasra follows Kasra, Fat-ha follows Fat-ha.
2. **Gender (جِنْسٌ):** Masculine noun → masculine adjective; Feminine noun → feminine adjective.
3. **Definiteness (تَعْرِيفٌ):** Definite noun (with الـ) → definite adjective; Indefinite noun (with Tanween) → indefinite adjective.
4. **Number (عَدَدٌ):** Singular/Dual/Plural.

Note: For **broken plurals (جَمْعُ التَّكْسِيرِ)**, the adjective can be either plural or feminine singular:
> **كُتُبٌ كَثِيرَةٌ** (Many books) — feminine singular adjective for a broken plural noun.`,
          },
          {
            id: "les-12-2",
            titleAr: "التَّوْكِيدُ",
            titleEn: "Lesson 12.2: Emphasis (Tawkid)",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Have you ever told someone a piece of news, and they looked at you with disbelief? "The teacher came," and they ask, "Really? The teacher **himself**?" In Arabic, how do we remove doubt from the listener's mind?

The **التَّوْكِيدُ** (Emphasis) is the "Bodyguard" of a word — a Follower that follows the word it emphasizes everywhere to make sure its meaning is clear.

Examples:
- **جَاءَ المَلِكُ نَفْسُهُ.** (The King himself came.)
- **نَجَحَ الطُّلَّابُ كُلُّهُمْ.** (The students, all of them, succeeded.)
- **رَأَيْتُ الوَزِيرَ عَيْنَهُ.** (I saw the Minister himself.)

There are two main ways to emphasize:

1. **Verbal Emphasis (التَّوْكِيدُ اللَّفْظِيُّ):** Simply repeating the word.
   - Example: **جَاءَ جَاءَ الحَقُّ** (The Truth has come, has come).
2. **Meaningful Emphasis (التَّوْكِيدُ المَعْنَوِيُّ):** Using specific "Power Words":
   - **نَفْس / عَيْن** (Self/Same) — confirms the specific person.
   - **كُل / جَمِيع** (All/Entirety) — confirms no one was left out.

**Rules (قَوَاعِدُ)**
1. **The Follower Rule:** The emphasis follows the word it emphasizes in its ending vowel.
2. **The Pronoun Link:** When using words like **نَفْس** or **كُل**, you must attach a pronoun pointing back to the leader (**نَفْسُهُ**, **كُلُّهُمْ**).
3. **Removal Test:** If you remove the emphasis word, the sentence should still make basic sense.`,
          },
          {
            id: "les-12-3",
            titleAr: "البَدَلُ",
            titleEn: "Lesson 12.3: Substitution (Badal)",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Have you ever introduced someone by their title and then their name? "The leader, **Zayd**, arrived." If I removed "leader," the sentence still works: "Zayd arrived." In Arabic, when one word can completely "replace" another while keeping the same meaning, we call it **The Substitution (البَدَلُ)**.

The **بَدَلٌ** is the ultimate "Follower." It mimics the case (Damma, Fat-ha, or Kasra) of the word it is substituting for.

Examples:
- **جَاءَ الخَلِيفَةُ عُمَرُ.** (The Caliph, **Umar**, came.) — both are Marfoo'
- **نَفَعَنِي المُرَبِّي نُصْحُهُ.** (The mentor benefited me, [specifically] **his advice**.)
- **أَكَلْتُ الرَّغِيفَ ثُلُثَهُ.** (I ate the loaf, **a third of it**.)

**Three main types:**

1. **Total Substitution (بَدَلُ كُلٍّ مِنْ كُلٍّ):** The substitute is the *exact same thing* as the first word.
   - Example: **الفَارُوقُ عُمَرُ** (The Farooq [is] Umar).
2. **Partial Substitution (بَدَلُ بَعْضٍ مِنْ كُلٍّ):** The substitute is a *physical part* of the first word.
   - Example: **سَقَطَ البَيْتُ سَقْفُهُ** (The house fell, [specifically] its roof).
3. **Qualitative Substitution (بَدَلُ اشْتِمَالٍ):** The substitute is a *quality or meaning* related to the first word.
   - Example: **أَعْجَبَنِي الزَّهْرُ أَرِيجُهُ** (The flower amazed me, [specifically] its scent).`,
          },
          {
            id: "les-12-4",
            titleAr: "العَطْفُ",
            titleEn: "Lesson 12.4: Conjunction (Atf) as a Follower",
            durationMins: 12,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `**العَطْفُ** (Conjunction) as a follower refers to the grammatical coordination where a word or sentence is joined to a preceding one using a Harf Atf (Conjunction Particle).

We covered the particles of conjunction in Lesson 4.2. In the context of the Followers (تَوَابِعُ), what matters is the **Mirror Rule**: the word *after* the conjunction must match the grammatical case of the word *before* it.

> **جَاءَ زَيْدٌ وَعَمْرٌو** — Amr is Marfoo' (Damma + Tanween) because Zayd is Marfoo'.
> **مَرَرْتُ بِزَيْدٍ وَعَمْرٍو** — Amr is Majroor (Kasra) because Zayd is Majroor.

This is what makes the Conjunction (العَطْفُ) a **Follower (تَابِعٌ)** — the second word follows the first in its grammatical state.

For the full table of conjunction particles and their nuances, refer back to Lesson 4.2.`,
          },
        ],
      },

      // ───────────────────────────────────────────────────────────────────────
      // MODULE 13: Advanced Syntax & Sentence Styles
      // ───────────────────────────────────────────────────────────────────────
      {
        id: "mod-13",
        titleAr: "أَسَالِيبُ الجُمْلَةِ",
        titleEn: "Module 13: Advanced Syntax & Sentence Styles",
        lessons: [
          {
            id: "les-13-1",
            titleAr: "أُسْلُوبُ الشَّرْطِ",
            titleEn: "Lesson 13.1: Conditional Sentences",
            durationMins: 25,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Welcome to the grammar of **"The Deal."** The **Conditional Sentence (Ash-Shart)** is a contract between two actions: "If Action A happens, then Action B will definitely follow."

**The Three Flavors of "If":**

**A. إِنْ — The "Pure Maybe"**
- Used for possibilities that haven't happened yet.
- **The Vibe:** A neutral, future possibility.
- **The Grammar:** Often makes both verbs "chopped" (Majzum / with Sukun).
- Example: **إِنْ تَجْتَهِدْ تَنْجَحْ** (If you study, you will succeed.)

**B. إِذَا — The "When/Certainty"**
- Used for things that are expected or guaranteed to happen. Feels more like "when" than "if."
- **The Vibe:** High certainty or frequent occurrence.
- **The Grammar:** Usually precedes a past-tense verb, even talking about the future.
- Example: **إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ** (When the victory of Allah comes...)

**C. لَوْ — The "Impossible Dream"**
- Used for things that **did not happen**, so the result **could not happen**. Grammar of regret.
- **The Vibe:** Hypotheses or impossibilities.
- **The Grammar:** The second part often starts with **لَـ** for emphasis.
- Example: **لَوْ كُنْتُ غَنِيًّا لَتَصَدَّقْتُ** (If I were rich [but I'm not], I would have given charity.)

**When is Fā (فَـ) added to the result?**
You must add **فَـ** (Fā al-Jazā') if the result is:
- A Noun Sentence: **إِنْ تَجْتَهِدْ فَـالنَّجَاحُ حَلِيفُكَ**
- A Command: **إِنْ رَأَيْتَهُ فَـقُلْ لَهُ**
- Starts with specific words: **قَدْ**, **سَـ/سَوْفَ**, **مَا**

**Words Similar to إِنْ (Jazim tools):**

| Word | Meaning | Example |
|---|---|---|
| **مَنْ** | Whoever | **مَنْ يَعْمَلْ خَيْرًا يَرَهُ** |
| **مَا** | Whatever | **مَا تُنْفِقُوا يَعْلَمْهُ اللهُ** |
| **مَتَى** | Whenever | **مَتَى تَذْهَبْ أَذْهَبْ** |
| **أَيْنَ** | Wherever | **أَيْنَمَا تَكُونُوا يُدْرِكْكُمُ الْمَوْتُ** |`,
          },
          {
            id: "les-13-2",
            titleAr: "الطَّلَبُ وَجَوَابُ الطَّلَبِ",
            titleEn: "Lesson 13.2: The Imperative and Its Result",
            durationMins: 18,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `"Think of a vending machine. You press the button (the command), and the soda falls out (the result)."

In Arabic, when you begin a sentence with a **Request** (Command or Prohibition), the verb that follows as a result gets a special "Grammatical Stamp" — a **Sukun** on its ending.

**Two main pillars:**
1. **الطَّلَبُ (The Request):** Usually a Command (**أَمْر**) or a Prohibition (**نَهْي**).
2. **جَوَابُ الطَّلَبِ (The Result):** The Present Tense verb that happens because of the request.

Examples:
- **اِجْتَهِدْ تَنْجَحْ.** (Study hard — you will pass.)
- **أَنْفِقْ تُؤْجَرْ.** (Spend in charity — you will be rewarded.)
- **اِبْتَسِمْ تَفْرَحْ.** (Smile — you will be happy.)
- **لَا تَغْضَبْ تَدْخُلِ الجَنَّةَ.** (Do not get angry — you will enter Paradise.)

**Rules (قَوَاعِدُ)**

1. The sentence must begin with a **Request** (Command, Prohibition, or Question).
2. The result must be a **Present Tense verb** (**مُضَارِع**).
3. The result verb takes a **Sukun** (or drops its final vowel if it's a "weak" letter).
4. The result must logically follow the command.
5. If the request is a "Don't" (**نَهْي**), the result must be something praiseworthy: **لَا تَقْرُبِ النَّارَ تَسْلَمْ** (Don't go near the fire — you will be safe).`,
          },
          {
            id: "les-13-3",
            titleAr: "التَّصْغِيرُ",
            titleEn: "Lesson 13.3: The Diminutive",
            durationMins: 18,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `"Imagine you have a full-sized car. If you want to talk about a tiny toy version of it, you give it a specific 'smallness' shape. In Arabic, **Tasghir** is like putting a word into a special mold that instantly shrinks it."

**Why do we use it?**
1. **Smallness:** Show something is physically small (**كَلْب** → **كُلَيْب** "Small dog").
2. **Endearment:** Show love (**أَخ** → **أُخَيّ** "Dear brother").
3. **Shortness of Time/Distance:** (**بَعْد** → **بُعَيْد** "Just a little after").
4. **Belittling:** Show something is unimportant.

**The Three Patterns:**

**1. The 3-Letter Pattern: فُعَيْل (Fu'ayl)**
Used for nouns with three original letters:
- **كَلْب** (Dog) → **كُلَيْب** | **نَهْر** (River) → **نُهَيْر** | **رَجُل** (Man) → **رُجَيْل**

**2. The 4-Letter Pattern: فُعَيْعِل (Fu'ay'il)**
Used for nouns with four original letters:
- **دِرْهَم** → **دُرَيْهِم** | **مَسْجِد** → **مُسَيْجِد** | **مَنْزِل** → **مُنَيْزِل**

**3. The 5-Letter Pattern: فُعَيْعِيل (Fu'ay'il)**
Used for five-letter nouns where the fourth letter is a long vowel:
- **مِفْتَاح** (Key) → **مُفَيْتِيح** | **عُصْفُور** (Bird) → **عُصَيْفِير**

**Special Case: Feminine Nouns without Ta Marbuta**
If a three-letter noun is feminine but lacks **ة**, we add **ة** when shrinking it:
- **شَمْس** (Sun) → **شُمَيْسَة** | **أُذُن** (Ear) → **أُذَيْنَة**

Quranic example: **يَا بُنَيَّ، أَقِمِ الصَّلَاةَ.** (O my dear little son, establish prayer.)`,
          },
          {
            id: "les-13-4",
            titleAr: "النِّسْبَةُ",
            titleEn: "Lesson 13.4: Relative Nouns (Nisbah)",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `If you meet someone from **Egypt** (**مِصْر**), how do you describe them in one word? You say they are **Egyptian** (**مِصْرِيّ**).

In Arabic, we take a noun and turn it into an adjective showing **origin**, **belonging**, or **nationality** using the "Super-Suffix" called the **Nisbah** — a heavy "**Ya**" with a Shaddah (ـِيّ):

Examples:
- **أَنَا طَالِبٌ عَرَبِيٌّ.** (I am an **Arab** student.)
- **هَذَا سِجَّادٌ تُرْكِيٌّ.** (This is a **Turkish** carpet.)
- **القُرْآنُ كِتَابٌ سَمَاوِيٌّ.** (The Quran is a **heavenly** book.)

**Why do we use it?**
- **Nationality:** **كَنَدَا** → **كَنَدِيّ** (Canadian)
- **Religion/School of Thought:** **إِسْلَام** → **إِسْلَامِيّ** (Islamic)
- **Nature/Quality:** **ذَهَب** [Gold] → **ذَهَبِيّ** [Golden]

**Rules (القَوَاعِدُ)**

1. **The Basic Rule:** Add **ـِيّ** to the end and put a **Kasra** on the letter before it. Example: **مَكَّة** → **مَكِّيّ**.
2. **The "Ta Marbuta" Rule:** If the word ends in **ة**, you **must** delete it before adding the Nisbah. Example: **مَدِينَة** (City) → **مَدَنِيّ** (Civic/Urban).
3. **Feminine Form:** Add a **Ta Marbuta** to the Nisbah for feminine: **مِصْرِيّ** (Male Egyptian) → **مِصْرِيَّة** (Female Egyptian).`,
          },
          {
            id: "les-13-5",
            titleAr: "النُّدْبَةُ",
            titleEn: "Lesson 13.5: Lamentation (Nudbah)",
            durationMins: 12,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Have you ever felt a pain so deep — either in your body or your heart — that a simple "ouch" wasn't enough? In Arabic, there is a special dramatic way to express **deep pain** or **lamentation**: **النُّدْبَةُ**.

Notice the "Wa" at the beginning and the long "Ah" sound at the end:
- **وَارَأْسَاه!** (O, my [aching] **head**!)
- **وَاقَلْبَاه!** (O, my [breaking] **heart**!)
- **وَامُعْتَصِمَاه!** (O, **Mu'tasim**! — the famous historical cry for help)

**النُّدْبَةُ** is a specific type of calling (**مُنَادَى**) used for:
1. **المُتَفَجَّعُ عَلَيْهِ:** Lamenting someone who has passed away or a great loss.
2. **المُتَوَجَّعُ مِنْهُ:** Expressing physical pain in a specific body part.

**Rules (قَوَاعِدُ)**
- **The Tool:** You must use **وَا** (*Wā*). You cannot use *Yā* for true lamentation.
- **The Ending:** We add an **Alif** (ـَا) to the end of the noun to show the "stretch" of the cry.
- **The Final Touch:** We often add a **Hā** (ـه) at the very end when stopping: "Qalb-āh" or "Rā's-āh."
- **Grammar State:** Just like the Vocative, the noun is fundamentally **مَنْصُوبٌ**.`,
          },
          {
            id: "les-13-6",
            titleAr: "الاِسْتِغَاثَةُ",
            titleEn: "Lesson 13.6: Appeal for Help (Istighathah)",
            durationMins: 12,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],

            contentBodyEn: `Imagine you are lost at sea. You fire an **emergency flare**. In Arabic, **Istighāthah** is that flare — a specific grammatical "S.O.S." signal using the letter **Lām**:

Examples:
- **يَا لَلْقَوِيِّ لِلضَّعِيفِ!** (O [I call] the strong **to help** the weak!)
- **يَا لَلْمُسْلِمِينَ لِلْقُدْسِ!** (O [I call] the Muslims **to help** Jerusalem!)
- **يَا لَلهِ لِلْمَظْلُومِ!** (O Allah, [help] the oppressed!)

**Three main components:**
1. **أَدَاةُ النِّدَاءِ (The Tool):** Always use **يَا**.
2. **المُسْتَغَاثُ بِهِ (The Helper):** Gets a **Lām with a Fat-ha** (**لَـ**) attached.
3. **المُسْتَغَاثُ لَهُ (The Victim/Cause):** Gets a **Lām with a Kasra** (**لِـ**) attached.

**Rules:**
- The Helper's Lām: **must** have Fat-ha (**لَـ**).
- The Victim's Lām: **must** have Kasra (**لِـ**).
- Because of the Lām (a preposition), all nouns are in **مَجْرُور** (Genitive/Kasra) state.`,
          },
          {
            id: "les-13-7",
            titleAr: "التَّرْخِيمُ",
            titleEn: "Lesson 13.7: Shortening Names (Tarkhim)",
            durationMins: 12,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Have you ever been in such a hurry to call a friend that you didn't even finish their name? In English: *Thomas* → *Tom*, *Elizabeth* → *Beth*. In Arabic, this isn't just slang — it's the formal grammatical art called **التَّرْخِيمُ** (Tar-kheem), meaning "softening" or "easing."

Examples:
- **يَا عَائِشَ، أَقْبِلِي.** (O **'A'ish**! — originally **عَائِشَةُ**)
- **يَا فَاطِمَ، تَمَهَّلِي.** (O **Fatim**! — originally **فَاطِمَةُ**)
- **يَا حَارِ، انْتَبِهْ.** (O **Hari**! — originally **حَارِثُ**)

**التَّرْخِيمُ** is the deletion of the final letter (or letters) of a noun when it is being called (**مُنَادَى**).

**Two ways to pronounce the shortened name:**
1. **Language of those who "Wait":** Keep the original vowel of the last remaining letter. **عَائِشَةُ** → **يَا عَائِشَ** (Fat-ha stays).
2. **Language of those who "Don't Wait":** Give the new end a fresh **Damma**. → **يَا عَائِشُ**.

**Rules (قَوَاعِدُ)**
1. It only happens after **يَا**.
2. Any name ending in **ة**, or proper nouns more than 3 letters long, can be shortened.
3. Usually only the last letter is deleted.`,
          },
          {
            id: "les-13-8",
            titleAr: "القَسَمُ",
            titleEn: "Lesson 13.8: Oaths (Al-Qasam)",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `Have you ever wanted to convince someone that you are telling the absolute truth? "I swear!" In Arabic, taking an **Oath** is a very serious and structured grammatical act.

Examples:
- **وَاللهِ، لَأَقُولَنَّ الحَقَّ.** (**By Allah**, I will certainly speak the truth.)
- **تَاللهِ لَقَدْ آثَرَكَ اللهُ عَلَيْنَا.** (**By Allah**, indeed Allah has preferred you over us.)
- **بِاللهِ، هَلْ رَأَيْتَ زَيْدًا؟** (**By Allah**, did you see Zayd?)

**An Oath (القَسَمُ) has three parts:**
1. **أَدَاةُ القَسَمِ (The Swearing Tool):** The letters **و، ب، ت** used to start the oath.
2. **المُقْسَمُ بِهِ (The One Sworn By):** In Islam, only Allah or His attributes.
3. **جَوَابُ القَسَمِ (The Statement):** The thing you are actually swearing is true.

**Rules (قَوَاعِدُ)**
- **The Kasra Rule:** The tools of oath (**و، ب، ت**) are actually a type of **Preposition**. The word after them **must** take a **Kasra**. *Correct:* **وَاللهِ** (Wallahi). *Incorrect:* **وَاللهُ**.
- **The "Lām" of Certainty:** The statement you are swearing often starts with a **لَـ** for emphasis. Example: **وَاللهِ لَـأَجْتَهِدَنَّ** (By Allah, I will surely work hard).
- **The "Nūn" of Emphasis:** Verbs in an oath often end with a heavy **نّ** (Nūn al-Tawkīd).`,
          },
          {
            id: "les-13-9",
            titleAr: "الاِسْتِفْهَامُ",
            titleEn: "Lesson 13.9: Interrogation (Al-Istifham)",
            durationMins: 18,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `What is the most important tool for a scientist, a detective, or a student? The **Question**. Without questions, we cannot learn!

Arabic question tools are divided into two types:
1. **Letters (حَرْفَان):** **هَلْ** and **أَ** — used for "Yes/No" questions.
2. **Nouns (أَسْمَاء):** Used to ask about specific things (people, places, times, reasons).

| Tool | Meaning/Use |
|---|---|
| **مَنْ** | Who (For people) |
| **مَا / مَاذَا** | What (For objects/actions) |
| **مَتَى** | When (For time) |
| **أَيْنَ** | Where (For place) |
| **كَيْفَ** | How (For state/manner) |
| **كَمْ** | How many (For quantity) |
| **لِمَاذَا** | Why (For reason) |

Examples:
- **هَلْ أَنْتَ بَيِّنٌ؟** (Are you clear?)
- **مَنْ هَذَا الرَّجُلُ؟** (Who is this man?)
- **مَاذَا تَفْعَلُ؟** (What are you doing?)
- **أَقَرَأْتَ الكِتَابَ؟** (Did you read the book?)

**Rules (قَوَاعِدُ)**
- **Priority of Position:** The question tool **must** be the first word in the sentence.
- **هَلْ vs أَ:** هَلْ is for simple Yes/No. أَ is also for Yes/No but is used to ask for a **choice** between two things using **أَمْ**: **أَطَالِبٌ أَنْتَ أَمْ مُعَلِّمٌ؟**
- **The "Kam" Rule:** The noun after **كَمْ** (How many) in a question must be **singular, indefinite, and take a Fat-ha**: **كَمْ كِتَابًا عِنْدَكَ؟**`,
          },
          {
            id: "les-13-10",
            titleAr: "المَدْحُ وَالذَّمُّ",
            titleEn: "Lesson 13.10: Praise and Blame",
            durationMins: 15,
            hasAudio: false,
            exercisesCount: 0,
            exercises: [],
            contentBodyEn: `How do you give a "Thumbs Up" or a "Thumbs Down" using only your words? In Arabic, we have a specific grammatical "Scale" for **Praise** (giving credit) and **Blame** (pointing out a fault).

Examples:
- **نِعْمَ الخُلُقُ الصِّدْقُ.** (**Excellent** is the character trait: Honesty.)
- **حَبَّذَا النَّظَافَةُ.** (**Wonderful** is cleanliness.)
- **بِئْسَ الرَّجُلُ الكَاذِبُ.** (**Evil/Wretched** is the man who lies.)
- **لَا حَبَّذَا الإِهْمَالُ.** (**How bad** is negligence.)

**The Pillar of Praise (المَدْح):**
- **نِعْمَ (Ni'ma):** The classic verb for "What a great..."
- **حَبَّذَا (Habbadhā):** A quicker way to say "This is lovable/excellent."

**The Pillar of Blame (الذَّمّ):**
- **بِئْسَ (Bi'sa):** The classic verb for "What a wretched..."
- **لَا حَبَّذَا (Lā Habbadhā):** The opposite of Habbadhā.

**Rules (قَوَاعِدُ)**

1. **The Three Parts:** These sentences have a specific structure:
   - **The Verb:** (نِعْمَ or بِئْسَ)
   - **The Subject (الفَاعِل):** The category being judged (e.g., "The friend").
   - **The Specific Choice (المَخْصُوص):** The exact person or thing being praised/blamed.
2. **The Damma Rule:** All three parts typically stay in the **مَرْفُوع** (Damma) state.
3. **Gender Matching:** If praising a female, add a silent **ت** to the verb: **نِعْمَتِ المَرْأَةُ مَرْيَمُ.**
4. **Quranic Example:** **نِعْمَ العَبْدُ!** (What an excellent servant!) — referring to Prophet Ayyub.`,
          },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COURSE 2 — INFORMAL CONVERSATIONAL FUSHA (الْعَرَبِيَّةُ الْمُعَاصِرَةُ)
// ─────────────────────────────────────────────────────────────────────────────

export const COURSE_2_LEVELS: Course2LevelNode[] = [
  {
    id: "lvl-fusha-1",
    titleAr: "الْمُسْتَوَى الأَوَّلُ: التَّحِيَّاتُ وَالْحَيَاةُ الْيَوْمِيَّةُ",
    titleEn: "Level 1: Daily Greetings & Spoken Dialogues",
    modules: [
      {
        id: "mod-fusha-101",
        titleAr: "الـتَّعَارُفُ فِي الْأَمَاكِنِ الْعَامَّةِ",
        titleEn: "Module 1: Introductions in Public Places",
        lessons: [
          {
            id: "les-fusha-101a",
            titleAr: "التَّحِيَّاتُ الْيَوْمِيَّةُ وَالسَّلَامُ",
            titleEn: "Daily Greetings & Social Politeness",
            durationMins: 15,
            hasAudio: true,
            exercisesCount: 5,
            vocabularies: [
              {
                id: "v-1",
                wordAr: "مَرْحَبًا",
                wordEn: "Hello / Welcome",
                imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
                audioUrl: "/audio/marhaban.mp3",
              },
              {
                id: "v-2",
                wordAr: "كَيْفَ حَالُكَ؟",
                wordEn: "How are you?",
                imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&q=80",
                audioUrl: "/audio/kayfa_haluk.mp3",
              },
            ],
            fullDialogueAudioUrl: "/audio/full_dialogue_greetings.mp3",
            dialogueLines: [
              {
                id: "dl-1",
                speakerNameAr: "أَحْمَدُ",
                speakerNameEn: "Ahmad",
                avatarColor: "bg-blue-600",
                textAr: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
                textEn: "Peace be upon you, and the mercy of Allah and His blessings.",
                audioUrl: "/audio/salam.mp3",
              },
              {
                id: "dl-2",
                speakerNameAr: "فَاطِمَةُ",
                speakerNameEn: "Fatima",
                avatarColor: "bg-emerald-600",
                textAr: "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللَّهِ! أَهْلًا وَسَهْلًا يَا أَحْمَدُ.",
                textEn: "And upon you be peace! Welcome, Ahmad.",
                audioUrl: "/audio/wa_alaykum_salam.mp3",
              },
            ],
            exercises: [
              {
                id: "ex-c2-1",
                sentenceAr: "____ عَلَيْكُمْ يَا أَحْمَدُ",
                sentenceEn: "Peace be upon you, Ahmad.",
                optionsCsv: "السَّلَامُ, كَيْفَ, أَهْلًا, مَرْحَبًا",
                correctAnswer: "السَّلَامُ",
                grammaticalRuleEn: "Standard Islamic and Classical greeting formulation.",
              },
            ],
          },
        ],
      },
    ],
  },
];
