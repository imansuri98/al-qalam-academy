"use client";
import React, { useState } from 'react';
import { Sparkles, BookOpen, AlertCircle, Layers, Fingerprint, Filter, Command, Eye, Info, HelpCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

// Root template configuration
interface RootConfig {
  key: string;
  letters: string;
  english: string;
  bab: string;
  baseEng: string;
  f: string; // First letter
  s: string; // Second letter
  t: string; // Third letter
  flat: string; // First letter translit
  slat: string; // Second letter translit
  tlat: string; // Third letter translit
  mudariVow: string; // Vowel of second letter in present tense (ُ or َ or ِ)
  mudariLat: string; // Translit of second letter vowel in present tense (u, a, i)
  amrAlifVow: string; // Vowel of Alif in Direct Amr (ُ or ِ)
  amrAlifLat: string; // Translit of Alif vowel in Direct Amr (u, i)
}

const COMPLEX_ROOTS: RootConfig[] = [
  {
    key: 'nasara',
    letters: 'ن ص ر',
    english: 'To Help (Nasara)',
    bab: 'Bab Nasara (A → U)',
    baseEng: 'help',
    f: 'ن', s: 'ص', t: 'ر',
    flat: 'n', slat: 's', tlat: 'r',
    mudariVow: 'ُ', mudariLat: 'u',
    amrAlifVow: 'ُ', amrAlifLat: 'u'
  },
  {
    key: 'fataha',
    letters: 'ف ت ح',
    english: 'To Open (Fataha)',
    bab: 'Bab Fataha (A → A)',
    baseEng: 'open',
    f: 'ف', s: 'ت', t: 'ح',
    flat: 'f', slat: 't', tlat: 'h',
    mudariVow: 'َ', mudariLat: 'a',
    amrAlifVow: 'ِ', amrAlifLat: 'i'
  },
  {
    key: 'daraba',
    letters: 'ض ر ب',
    english: 'To Hit (Daraba)',
    bab: 'Bab Daraba (A → I)',
    baseEng: 'hit',
    f: 'ض', s: 'ر', t: 'ب',
    flat: 'd', slat: 'r', tlat: 'b',
    mudariVow: 'ِ', mudariLat: 'i',
    amrAlifVow: 'ِ', amrAlifLat: 'i'
  },
  {
    key: 'samia',
    letters: 'س م ع',
    english: 'To Hear (Sami\'a)',
    bab: 'Bab Sami\'a (I → A)',
    baseEng: 'hear',
    f: 'س', s: 'م', t: 'ع',
    flat: 's', slat: 'm', tlat: "a'",
    mudariVow: 'َ', mudariLat: 'a',
    amrAlifVow: 'ِ', amrAlifLat: 'i'
  },
  {
    key: 'karuma',
    letters: 'ك ر م',
    english: 'To Be Noble (Karuma)',
    bab: 'Bab Karuma (U → U)',
    baseEng: 'be noble',
    f: 'ك', s: 'ر', t: 'م',
    flat: 'k', slat: 'r', tlat: 'm',
    mudariVow: 'ُ', mudariLat: 'u',
    amrAlifVow: 'ُ', amrAlifLat: 'u'
  },
  {
    key: 'hasiba',
    letters: 'ح س ب',
    english: 'To Reckon (Hasiba)',
    bab: 'Bab Hasiba (I → I)',
    baseEng: 'reckon',
    f: 'ح', s: 'س', t: 'ب',
    flat: 'h', slat: 's', tlat: 'b',
    mudariVow: 'ِ', mudariLat: 'i',
    amrAlifVow: 'ِ', amrAlifLat: 'i'
  }
];

export interface ConjugationItem {
  pronoun: string;
  pronounEng: string;
  arabic: string;
  translit: string;
  meaning: string;
  class: string;
  countType: 'Singular' | 'Dual' | 'Plural';
  suffixRule: string;
  isDirect: boolean;
}

// Helper to obtain demographic labels
const getDemographic = (pronoun: string): string => {
  if (pronoun.includes('هُوَ')) return '3rd Person Singular Masculine (غائب مفرد مذكر)';
  if (pronoun.includes('هُمَا') && pronoun.includes('M')) return '3rd Person Dual Masculine (غائب تثنية مذكر)';
  if (pronoun.includes('هُمَا') && pronoun.includes('F')) return '3rd Person Dual Feminine (غائب تثنية مؤنث)';
  if (pronoun.includes('هُمْ')) return '3rd Person Plural Masculine (غائب جمع مذكر)';
  if (pronoun.includes('هِيَ')) return '3rd Person Singular Feminine (غائب مفرد مؤنث)';
  if (pronoun.includes('هُنَّ')) return '3rd Person Plural Feminine (غائب جمع مؤنث)';
  if (pronoun.includes('أَنْتَ')) return '2nd Person Singular Masculine (مخاطب مفرد مذكر)';
  if (pronoun.includes('أَنْتُمَا') && pronoun.includes('M')) return '2nd Person Dual Masculine (مخاطب تثنية مذكر)';
  if (pronoun.includes('أَنْتُمَا') && pronoun.includes('F')) return '2nd Person Dual Feminine (مخاطب تثنية مؤنث)';
  if (pronoun.includes('أَنْتُمْ')) return '2nd Person Plural Masculine (مخاطب جمع مذكر)';
  if (pronoun.includes('أَنْتِ')) return '2nd Person Singular Feminine (مخاطب مفرد مؤنث)';
  if (pronoun.includes('أَنْتُنَّ')) return '2nd Person Plural Feminine (مخاطب جمع مؤنث)';
  if (pronoun.includes('أَنَا')) return '1st Person Singular Common (متكلم مفرد)';
  if (pronoun.includes('نَحْنُ')) return '1st Person Dual & Plural Common (متكلم تثنية وجمع)';
  return 'Classical Arabic Personal Pronoun (ضمير)';
};

// Main dynamic generator
const getAmrNahiConjugations = (config: RootConfig, type: 'amr' | 'nahy'): ConjugationItem[] => {
  const { f, s, t, flat, slat, tlat, mudariVow, mudariLat, amrAlifVow, amrAlifLat, baseEng } = config;

  const items: {
    pronoun: string;
    pronounEng: string;
    class: string;
    countType: 'Singular' | 'Dual' | 'Plural';
    prefix: string;
    prefixLat: string;
    isDirect: boolean;
    suffix: string;
    suffixLat: string;
    meaning: string;
    suffixRule: string;
  }[] = [
    // 3rd Person Masculine (Absent / Ghaib)
    {
      pronoun: 'هُوَ',
      pronounEng: 'Huwa (He)',
      class: '3rd Person (Masc)',
      countType: 'Singular',
      prefix: type === 'amr' ? 'لِيَ' : 'لَا يَ',
      prefixLat: type === 'amr' ? 'liya' : 'laa ya',
      isDirect: false,
      suffix: 'ْ',
      suffixLat: '',
      meaning: type === 'amr' ? `Let him ${baseEng}` : `He must not ${baseEng}`,
      suffixRule: type === 'amr' ? 'Prefix لِـ + Jazm (Sukun)' : 'Prefix لَا + Jazm (Sukun)'
    },
    {
      pronoun: 'هُمَا',
      pronounEng: 'Huma (They Two M)',
      class: '3rd Person (Masc)',
      countType: 'Dual',
      prefix: type === 'amr' ? 'لِيَ' : 'لَا يَ',
      prefixLat: type === 'amr' ? 'liya' : 'laa ya',
      isDirect: false,
      suffix: 'َا',
      suffixLat: 'aa',
      meaning: type === 'amr' ? `Let them two (M) ${baseEng}` : `They two (M) must not ${baseEng}`,
      suffixRule: 'Drop Noon + Add Alif'
    },
    {
      pronoun: 'هُمْ',
      pronounEng: 'Hum (They All M)',
      class: '3rd Person (Masc)',
      countType: 'Plural',
      prefix: type === 'amr' ? 'لِيَ' : 'لَا يَ',
      prefixLat: type === 'amr' ? 'liya' : 'laa ya',
      isDirect: false,
      suffix: 'ُوا',
      suffixLat: 'oo',
      meaning: type === 'amr' ? `Let them all (M) ${baseEng}` : `They all (M) must not ${baseEng}`,
      suffixRule: 'Drop Noon + Add Waw'
    },
    // 3rd Person Feminine (Absent / Ghaib)
    {
      pronoun: 'هِيَ',
      pronounEng: 'Hiya (She)',
      class: '3rd Person (Fem)',
      countType: 'Singular',
      prefix: type === 'amr' ? 'لِتَ' : 'لَا تَ',
      prefixLat: type === 'amr' ? 'lita' : 'laa ta',
      isDirect: false,
      suffix: 'ْ',
      suffixLat: '',
      meaning: type === 'amr' ? `Let her ${baseEng}` : `She must not ${baseEng}`,
      suffixRule: type === 'amr' ? 'Prefix لِـ + Jazm (Sukun)' : 'Prefix لَا + Jazm (Sukun)'
    },
    {
      pronoun: 'هُمَا',
      pronounEng: 'Huma (They Two F)',
      class: '3rd Person (Fem)',
      countType: 'Dual',
      prefix: type === 'amr' ? 'لِتَ' : 'لَا تَ',
      prefixLat: type === 'amr' ? 'lita' : 'laa ta',
      isDirect: false,
      suffix: 'َا',
      suffixLat: 'aa',
      meaning: type === 'amr' ? `Let them two (F) ${baseEng}` : `They two (F) must not ${baseEng}`,
      suffixRule: 'Drop Noon + Add Alif'
    },
    {
      pronoun: 'هُنَّ',
      pronounEng: 'Hunna (They All F)',
      class: '3rd Person (Fem)',
      countType: 'Plural',
      prefix: type === 'amr' ? 'لِيَ' : 'لَا يَ',
      prefixLat: type === 'amr' ? 'liya' : 'laa ya',
      isDirect: false,
      suffix: 'ْنَ',
      suffixLat: 'na',
      meaning: type === 'amr' ? `Let them all (F) ${baseEng}` : `They all (F) must not ${baseEng}`,
      suffixRule: 'Fixed Noon Niswa'
    },

    // 2nd Person Masculine (Addressed / Ḥāḍir) -- DIRECT Real Command/Imperatives
    {
      pronoun: 'أَنْتَ',
      pronounEng: 'Anta (You M)',
      class: '2nd Person (Masc)',
      countType: 'Singular',
      prefix: type === 'amr' ? '' : 'لَا تَ',
      prefixLat: type === 'amr' ? '' : 'laa ta',
      isDirect: type === 'amr',
      suffix: 'ْ',
      suffixLat: '',
      meaning: type === 'amr' ? `${baseEng.charAt(0).toUpperCase() + baseEng.slice(1)}! (M Sing)` : `Do not ${baseEng}! (M Sing)`,
      suffixRule: type === 'amr' ? 'Direct: Alif + Jazm (Sukun)' : 'Prefix لَا + Jazm (Sukun)'
    },
    {
      pronoun: 'أَنْتُمَا',
      pronounEng: 'Antuma (You Two M)',
      class: '2nd Person (Masc)',
      countType: 'Dual',
      prefix: type === 'amr' ? '' : 'لَا تَ',
      prefixLat: type === 'amr' ? '' : 'laa ta',
      isDirect: type === 'amr',
      suffix: 'َا',
      suffixLat: 'aa',
      meaning: type === 'amr' ? `${baseEng.charAt(0).toUpperCase() + baseEng.slice(1)}! (M Dual)` : `Do not ${baseEng}! (M Dual)`,
      suffixRule: type === 'amr' ? 'Direct: Alif + Drop Noon' : 'Prefix لَا + Drop Noon'
    },
    {
      pronoun: 'أَنْتُمْ',
      pronounEng: 'Antum (You All M)',
      class: '2nd Person (Masc)',
      countType: 'Plural',
      prefix: type === 'amr' ? '' : 'لَا تَ',
      prefixLat: type === 'amr' ? '' : 'laa ta',
      isDirect: type === 'amr',
      suffix: 'ُوا',
      suffixLat: 'oo',
      meaning: type === 'amr' ? `${baseEng.charAt(0).toUpperCase() + baseEng.slice(1)}! (M Plur)` : `Do not ${baseEng}! (M Plur)`,
      suffixRule: type === 'amr' ? 'Direct: Alif + Drop Noon' : 'Prefix لَا + Drop Noon'
    },

    // 2nd Person Feminine (Addressed / Ḥāḍir) -- DIRECT Real Command/Imperatives
    {
      pronoun: 'أَنْتِ',
      pronounEng: 'Anti (You F)',
      class: '2nd Person (Fem)',
      countType: 'Singular',
      prefix: type === 'amr' ? '' : 'لَا تَ',
      prefixLat: type === 'amr' ? '' : 'laa ta',
      isDirect: type === 'amr',
      suffix: 'ِي',
      suffixLat: 'ee',
      meaning: type === 'amr' ? `${baseEng.charAt(0).toUpperCase() + baseEng.slice(1)}! (F Sing)` : `Do not ${baseEng}! (F Sing)`,
      suffixRule: type === 'amr' ? 'Direct: Alif + Add Ya' : 'Prefix لَا + Drop Noon + Add Ya'
    },
    {
      pronoun: 'أَنْتُمَا',
      pronounEng: 'Antuma (You Two F)',
      class: '2nd Person (Fem)',
      countType: 'Dual',
      prefix: type === 'amr' ? '' : 'لَا تَ',
      prefixLat: type === 'amr' ? '' : 'laa ta',
      isDirect: type === 'amr',
      suffix: 'َا',
      suffixLat: 'aa',
      meaning: type === 'amr' ? `${baseEng.charAt(0).toUpperCase() + baseEng.slice(1)}! (F Dual)` : `Do not ${baseEng}! (F Dual)`,
      suffixRule: type === 'amr' ? 'Direct: Alif + Drop Noon' : 'Prefix لَا + Drop Noon'
    },
    {
      pronoun: 'أَنْتُنَّ',
      pronounEng: 'Antunna (You All F)',
      class: '2nd Person (Fem)',
      countType: 'Plural',
      prefix: type === 'amr' ? '' : 'لَا تَ',
      prefixLat: type === 'amr' ? '' : 'laa ta',
      isDirect: type === 'amr',
      suffix: 'ْنَ',
      suffixLat: 'na',
      meaning: type === 'amr' ? `${baseEng.charAt(0).toUpperCase() + baseEng.slice(1)}! (F Plur)` : `Do not ${baseEng}! (F Plur)`,
      suffixRule: type === 'amr' ? 'Direct: Alif + Keep Noon' : 'Prefix لَا + Keep Noon Niswa'
    },

    // 1st Person Speaker (Speaker / Mutakallim)
    {
      pronoun: 'أَنَا',
      pronounEng: 'Ana (I)',
      class: '1st Person (Common)',
      countType: 'Singular',
      prefix: type === 'amr' ? 'لِأَ' : 'لَا أَ',
      prefixLat: type === 'amr' ? 'li-a' : 'laa a',
      isDirect: false,
      suffix: 'ْ',
      suffixLat: '',
      meaning: type === 'amr' ? `Let me ${baseEng}` : `I must not ${baseEng}`,
      suffixRule: type === 'amr' ? 'Prefix لِـ + Jazm (Sukun)' : 'Prefix لَا + Jazm (Sukun)'
    },
    {
      pronoun: 'نَحْنُ',
      pronounEng: 'Nahnu (We)',
      class: '1st Person (Common)',
      countType: 'Plural',
      prefix: type === 'amr' ? 'لِنَ' : 'لَا نَ',
      prefixLat: type === 'amr' ? 'lina' : 'laa na',
      isDirect: false,
      suffix: 'ْ',
      suffixLat: '',
      meaning: type === 'amr' ? `Let us ${baseEng}` : `We must not ${baseEng}`,
      suffixRule: type === 'amr' ? 'Prefix لِـ + Jazm (Sukun)' : 'Prefix لَا + Jazm (Sukun)'
    }
  ];

  return items.map(item => {
    let arabic = '';
    let translit = '';

    if (item.isDirect) {
      arabic = `ا${amrAlifVow}${f}ْ${s}${mudariVow}${t}${item.suffix}`;
      translit = `${amrAlifLat}${flat}${slat}${mudariLat}${tlat}${item.suffixLat}`;
    } else {
      arabic = `${item.prefix}${f}ْ${s}${mudariVow}${t}${item.suffix}`;
      translit = `${item.prefixLat}${flat}${slat}${mudariLat}${tlat}${item.suffixLat}`;
    }

    // Standardize transliteration
    translit = translit
      .replace('aaa', 'aa')
      .replace('uuu', 'uu')
      .replace('iii', 'ii');

    return {
      pronoun: item.pronoun,
      pronounEng: item.pronounEng,
      class: item.class,
      countType: item.countType,
      arabic,
      translit,
      meaning: item.meaning,
      suffixRule: item.suffixRule,
      isDirect: item.isDirect
    };
  });
};

interface CardProps {
  item: ConjugationItem;
  type: 'amr' | 'nahy';
  isSelected: boolean;
  onClick: () => void;
  key?: any;
}

const AmrNahiCard = ({ item, type, isSelected, onClick }: CardProps) => {
  const pronounLabel = item.pronoun === 'أَنَا' ? 'أَنَا (I [M/F])' :
                       item.pronoun === 'نَحْنُ' ? 'نَحْنُ (We [Dual & Plural, M/F])' :
                       item.pronounEng;

  return (
    <motion.button
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={`w-full flex flex-col justify-between p-4 rounded-2xl border text-left transition-all bg-white cursor-pointer select-none ${
        isSelected
          ? 'border-violet-600 bg-violet-50/15 shadow-sm ring-2 ring-violet-500/10'
          : 'border-slate-150 hover:border-slate-300 hover:shadow-xs hover:bg-slate-50/10'
      }`}
    >
      <div className="flex justify-between items-start mb-2 w-full gap-2 font-sans">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
          isSelected ? 'bg-violet-100 text-violet-800' : 'bg-slate-100 text-slate-600'
        }`}>
          {pronounLabel}
        </span>
        <span className={`text-[8px] px-1.5 py-0.5 rounded-sm font-mono font-black border ${
          item.isDirect 
            ? 'text-violet-700 bg-violet-100/40 border-violet-100/50' 
            : 'text-amber-700 bg-amber-100/40 border-amber-100/50'
        }`}>
          {item.isDirect ? 'Direct (حاضر)' : 'Indirect (غائب/متكلم)'}
        </span>
      </div>

      <div className="text-right my-1.5 w-full">
        <span className="font-serif text-2xl font-black block leading-snug tracking-wide text-slate-800" dir="rtl">
          {item.arabic}
        </span>
        <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
          /{item.translit}/
        </span>
      </div>

      <div className="border-t border-slate-100 pt-2 mt-1.5 w-full font-sans">
        <span className="text-[11px] font-semibold text-slate-700 block truncate">
          Meaning: <span className="text-slate-500 font-normal italic">{item.meaning}</span>
        </span>
      </div>
    </motion.button>
  );
};

export default function AmrNahiConjugator() {
  const [selectedRootIdx, setSelectedRootIdx] = useState<number>(0);
  const [conjugationType, setConjugationType] = useState<'amr' | 'nahy'>('amr');
  const [selectedFormIdx, setSelectedFormIdx] = useState<number>(6); // Default: Anta (2nd Person Masculine Singular)
  const [numberFilter, setNumberFilter] = useState<'all' | 'singular' | 'dual' | 'plural'>('all');
  const [personFilter, setPersonFilter] = useState<'all' | 'ghaib' | 'hadir' | 'mutakallim'>('all');
  const [genderFilter, setGenderFilter] = useState<'all' | 'muzakkar' | 'muannas'>('all');

  const root = COMPLEX_ROOTS[selectedRootIdx];
  const verbList = getAmrNahiConjugations(root, conjugationType);

  const filterForm = (formItem: ConjugationItem, indexInOriginal: number) => {
    const pronoun = formItem.pronoun;
    const isDual = pronoun === 'نَحْنُ' || formItem.pronounEng.includes('Two') || formItem.countType === 'Dual';
    const isPlural = pronoun === 'نَحْنُ' || formItem.pronounEng.includes('All') || formItem.countType === 'Plural';
    const isSingular = !isDual && !isPlural;

    // 1. Quantity/Number Filter
    if (numberFilter === 'singular' && !isSingular) return false;
    if (numberFilter === 'dual' && !isDual) return false;
    if (numberFilter === 'plural' && !isPlural) return false;

    // 2. Person Filter (Indices mapped based on 3rd, 2nd, 1st lists in data array)
    const isGhaib = formItem.class.includes('3rd Person');
    const isHadir = formItem.class.includes('2nd Person');
    const isMutakallim = formItem.class.includes('1st Person');

    if (personFilter === 'ghaib' && !isGhaib) return false;
    if (personFilter === 'hadir' && !isHadir) return false;
    if (personFilter === 'mutakallim' && !isMutakallim) return false;

    // 3. Gender Filter
    if (!isMutakallim) {
      const isFem = formItem.class.includes('Fem') || formItem.pronounEng.includes('(F)') || pronoun === 'هِيَ' || pronoun === 'هُنَّ' || pronoun === 'أَنْتِ' || pronoun === 'أَنْتُنَّ';
      const isMasc = !isFem;

      if (genderFilter === 'muzakkar' && !isMasc) return false;
      if (genderFilter === 'muannas' && !isFem) return false;
    }

    return true;
  };

  const visibleFormIdxs = verbList.map((c, idx) => filterForm(c, idx) ? idx : -1).filter(idx => idx !== -1);
  const activeFormIdx = visibleFormIdxs.includes(selectedFormIdx)
    ? selectedFormIdx
    : (visibleFormIdxs[0] ?? 0);

  const analyzedItem = verbList[activeFormIdx] || verbList[0];

  const handleCardClick = (globalIdx: number) => {
    setSelectedFormIdx(globalIdx);
    document.getElementById('amrnahi-analysis-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // Grouped counts for responsive layout
  const mutakallimForms = verbList.slice(12, 14);
  const hadirForms = verbList.slice(6, 12);
  const ghaibForms = verbList.slice(0, 6);

  const visibleMutakallimCount = mutakallimForms.filter((c, i) => filterForm(c, 12 + i)).length;
  const visibleHadirCount = hadirForms.filter((c, i) => filterForm(c, 6 + i)).length;
  const visibleGhaibCount = ghaibForms.filter((c, i) => filterForm(c, i)).length;

  const totalCols = (visibleMutakallimCount > 0 ? 1 : 0) + (visibleHadirCount > 0 ? 1 : 0) + (visibleGhaibCount > 0 ? 1 : 0);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-8" id="amrnahi-conjugator-container">
      
      {/* 1. Header with parameters switcher */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-800 border border-violet-100/60 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            Sega Morphing Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Comprehensive Verb Conjugation Dashboard (Amr & Nahi)
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Analyze the morphing rules of Imperatives (Amr / command) and Prohibitives (Nahi / forbids) formed via Jussive (Jazm) aspects.
          </p>
        </div>

        {/* Dynamic Selector controls */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">Paradigms Class</span>
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => { setConjugationType('amr'); setSelectedFormIdx(6); }}
                className={`px-3.5 py-1.5 font-bold text-[10.5px] rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  conjugationType === 'amr'
                    ? 'bg-violet-750 text-white shadow-xs border-b border-violet-950 bg-violet-800'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Command className="w-3 h-3" />
                Imperative (Amr / أَمْر)
              </button>
              <button
                onClick={() => { setConjugationType('nahy'); setSelectedFormIdx(6); }}
                className={`px-3.5 py-1.5 font-bold text-[10.5px] rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  conjugationType === 'nahy'
                    ? 'bg-violet-750 text-white shadow-xs border-b border-violet-950 bg-violet-800'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Prohibitive (Nahi / نَهْي)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Roots Selection card deck */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-violet-600" />
            Select Verb Root Category
          </label>
          <span className="text-[10px] text-slate-450 italic">Updates all formulas below</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {COMPLEX_ROOTS.map((r, idx) => (
            <button
              key={r.key}
              onClick={() => { setSelectedRootIdx(idx); setSelectedFormIdx(6); }}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                selectedRootIdx === idx
                  ? 'border-violet-600 bg-violet-50/20 shadow-xs ring-2 ring-violet-500/10'
                  : 'border-slate-150 hover:border-slate-300 hover:bg-slate-50/50 bg-white'
              }`}
            >
              <span className="font-serif text-lg font-black text-slate-800 tracking-wide">{r.letters}</span>
              <span className="text-[10px] text-slate-705 font-bold mt-1 line-clamp-1">{r.english.split('(')[0]}</span>
              <span className="text-[8px] text-slate-400 font-mono mt-0.5">{r.bab.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Selected Summary HUD card representing quick stats */}
      <div className="bg-slate-900 text-slate-100 rounded-3xl p-5 border border-slate-850 flex flex-col lg:flex-row items-stretch justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-[-20px] bottom-[-20px] w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-violet-500/15 border border-violet-500/30 text-violet-350 p-3 rounded-2xl flex items-center justify-center self-start text-violet-300">
            <BookOpen className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-black text-white">Root verb: [ {root.letters.replace(/ /g, ' - ')} ]</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700 font-medium">
                {root.bab}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Active paradigm is <span className="text-violet-300 font-bold">{conjugationType === 'amr' ? 'Imperative Command (الأَمْر)' : 'Prohibitive Restraint (النَّهْي)'}</span>. Currently showing verb derivations for <span className="text-violet-300 font-bold">"{root.baseEng}"</span>.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800 relative z-10 justify-between lg:justify-end">
          <div className="lg:pl-6 text-right shrink-0">
            <span className="block text-[9px] text-slate-450 uppercase tracking-widest font-black">FORM ASPECT TEMPLATE</span>
            <span className="text-xs text-slate-300 font-semibold block mt-0.5 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 font-serif">
              {conjugationType === 'amr' 
                ? `ا${root.amrAlifVow}${root.f}ْ${root.s}${root.mudariVow}${root.t}ْ` 
                : `لَا تَ${root.f}ْ${root.s}${root.mudariVow}${root.t}ْ`}
            </span>
          </div>
          <div className="lg:pl-6 text-right shrink-0">
            <span className="block text-[9px] text-slate-450 uppercase tracking-widest font-black font-sans">DIRECTIVE FOCUS (YOU / أَنْتَ)</span>
            <span className="font-serif text-xl font-extrabold text-violet-400 block mt-0.5" dir="rtl">
              {verbList[6]?.arabic}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Filters Control Panel */}
      <div className="bg-slate-50/80 p-4 sm:p-5 rounded-3xl border border-slate-150 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-150">
          <Filter className="w-4 h-4 text-violet-750" />
          <span className="text-xs font-bold text-slate-850 uppercase tracking-wider">Interactive Sega Filters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* A. Quantity Filter */}
          <div className="space-y-1.5 flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">1. Form Quantity (الْعَدَد)</span>
            <div className="flex flex-wrap gap-1 bg-slate-200/60 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All 14 Forms' },
                { id: 'singular', label: 'Singular (👤)' },
                { id: 'dual', label: 'Dual (👥)' },
                { id: 'plural', label: 'Plural (👤👤👤)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setNumberFilter(tab.id as any); setSelectedFormIdx(6); }}
                  className={`flex-1 text-center py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                    numberFilter === tab.id
                      ? 'bg-violet-800 text-white shadow-xs font-black'
                      : 'text-slate-500 hover:text-slate-850'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* B. Person Filter */}
          <div className="space-y-1.5 flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">2. Person State (الضَّمِائِر)</span>
            <div className="flex flex-wrap gap-1 bg-slate-200/60 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Persons' },
                { id: 'ghaib', label: "G̠ā'ib / غائب" },
                { id: 'hadir', label: 'Ḥāḍir / حاضر' },
                { id: 'mutakallim', label: 'Mutakallim / متكلم' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setPersonFilter(tab.id as any); setSelectedFormIdx(6); }}
                  className={`flex-1 text-center py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                    personFilter === tab.id
                      ? 'bg-violet-800 text-white shadow-xs font-black'
                      : 'text-slate-500 hover:text-slate-850'
                  }`}
                >
                  {tab.id === 'all' ? tab.label : tab.label.split(' / ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* C. Gender Filter */}
          <div className="space-y-1.5 flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">3. Gender State (الْجِنْس)</span>
            <div className="flex flex-wrap gap-1 bg-slate-200/60 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Genders' },
                { id: 'muzakkar', label: 'Muzakkar / مذكر' },
                { id: 'muannas', label: "Mu'annath / مؤنث" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setGenderFilter(tab.id as any); setSelectedFormIdx(6); }}
                  className={`flex-1 text-center py-1.5 px-2.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                    genderFilter === tab.id
                      ? 'bg-violet-800 text-white shadow-xs font-black'
                      : 'text-slate-500 hover:text-slate-850'
                  }`}
                >
                  {tab.id === 'all' ? tab.label : tab.label.split(' / ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active filters summary */}
        {(numberFilter !== 'all' || personFilter !== 'all' || genderFilter !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-150/50">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Active Filters:</span>
              {numberFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-violet-100">
                  {numberFilter === 'singular' ? 'Singular (👤)' : numberFilter === 'dual' ? 'Dual (👥)' : 'Plural (👤👤👤)'}
                </span>
              )}
              {personFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-violet-100">
                  {personFilter === 'ghaib' ? "3rd Person" : personFilter === 'hadir' ? '2nd Person' : '1st Person'}
                </span>
              )}
              {genderFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-violet-100">
                  {genderFilter === 'muzakkar' ? 'Masculine (Muzakkar)' : 'Feminine (Mu’annath)'}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setNumberFilter('all');
                setPersonFilter('all');
                setGenderFilter('all');
                setSelectedFormIdx(6);
              }}
              className="text-[10px] text-violet-750 hover:text-violet-900 font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* 5. Parallel visual layouts columns */}
      {totalCols > 0 ? (
        <div className={`grid grid-cols-1 ${
          totalCols === 3 ? 'lg:grid-cols-3' :
          totalCols === 2 ? 'lg:grid-cols-2 max-w-5xl mx-auto' :
          'max-w-2xl mx-auto'
        } gap-6`} id="amrnahi-conjugations-table">
          
          {/* Speaker Column */}
          {visibleMutakallimCount > 0 && (
            <div className="flex flex-col gap-4 bg-slate-50/40 p-5 rounded-3xl border border-slate-150/70" id="column-mutakallim">
              <div className="flex items-center justify-between border-b border-slate-150 pb-3 mb-1">
                <div>
                  <h3 className="text-xs font-black text-slate-800 flex items-center gap-1.5 leading-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    Speaker / 1st Person
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold font-sans">{visibleMutakallimCount} Segas</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black bg-indigo-50 text-indigo-700 border border-indigo-100 font-sans">
                  First Person
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {mutakallimForms.map((c, i) => {
                  const globalIdx = 12 + i;
                  if (!filterForm(c, globalIdx)) return null;
                  return (
                    <AmrNahiCard
                      key={globalIdx}
                      item={c}
                      type={conjugationType}
                      isSelected={selectedFormIdx === globalIdx}
                      onClick={() => handleCardClick(globalIdx)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Present / Addressed Column */}
          {visibleHadirCount > 0 && (
            <div className="flex flex-col gap-4 bg-violet-50/10 p-5 rounded-3xl border border-violet-100/50" id="column-hadir">
              <div className="flex items-center justify-between border-b border-violet-150 pb-3 mb-1">
                <div>
                  <h3 className="text-xs font-black text-violet-850 flex items-center gap-1.5 leading-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-violet-600"></span>
                    Addressed / 2nd Person (Ḥāḍir)
                  </h3>
                  <p className="text-[10px] text-violet-500 mt-1 uppercase tracking-wider font-semibold font-sans">{visibleHadirCount} Segas</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black bg-violet-100 text-violet-800 border border-violet-200 font-sans">
                  Real Command!
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {hadirForms.map((c, i) => {
                  const globalIdx = 6 + i;
                  if (!filterForm(c, globalIdx)) return null;
                  return (
                    <AmrNahiCard
                      key={globalIdx}
                      item={c}
                      type={conjugationType}
                      isSelected={selectedFormIdx === globalIdx}
                      onClick={() => handleCardClick(globalIdx)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Absent Column */}
          {visibleGhaibCount > 0 && (
            <div className="flex flex-col gap-4 bg-slate-50/40 p-5 rounded-3xl border border-slate-150/70" id="column-ghaib">
              <div className="flex items-center justify-between border-b border-slate-150 pb-3 mb-1">
                <div>
                  <h3 className="text-xs font-black text-slate-800 flex items-center gap-1.5 leading-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    Absent / 3rd Person (G̠ā’ib)
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold font-sans">{visibleGhaibCount} Segas</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black bg-blue-50 text-blue-700 border border-blue-105 font-sans">
                  Third Person
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {ghaibForms.map((c, i) => {
                  const globalIdx = i;
                  if (!filterForm(c, globalIdx)) return null;
                  return (
                    <AmrNahiCard
                      key={globalIdx}
                      item={c}
                      type={conjugationType}
                      isSelected={selectedFormIdx === globalIdx}
                      onClick={() => handleCardClick(globalIdx)}
                    />
                  );
                })}
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="text-center py-12 px-6 bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center space-y-3 font-sans">
          <AlertCircle className="w-8 h-8 text-slate-400" />
          <p className="text-sm font-bold text-slate-700">No command forms match the selected filters</p>
          <p className="text-xs text-slate-400">Reduce your quantity, gender, or person boundaries above.</p>
          <button
            onClick={() => {
              setNumberFilter('all');
              setPersonFilter('all');
              setGenderFilter('all');
              setSelectedFormIdx(6);
            }}
            className="mt-2 text-xs font-bold text-violet-800 bg-violet-50 hover:bg-violet-100 px-4 py-2 rounded-xl transition-all border border-violet-200"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* 6. Diagnostic panels */}
      <div 
        className="bg-slate-50/60 rounded-3xl p-6 sm:p-8 border border-slate-150 grid grid-cols-1 md:grid-cols-12 gap-8 items-center" 
        id="amrnahi-analysis-panel"
      >
        <div className="md:col-span-5 flex flex-col justify-center items-center text-center bg-white p-6 border border-slate-150/80 rounded-2xl shadow-2xs">
          <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-1 font-sans">Analyzer Target Card</span>
          <span className="px-3 py-1 bg-violet-50 text-violet-800 rounded-full text-xs font-bold border border-violet-100 mb-4 inline-block font-sans">
            {analyzedItem.pronoun === 'أَنَا' ? 'أَنَا (I [M/F])' :
             analyzedItem.pronoun === 'نَحْنُ' ? 'نَحْنُ (We [Dual & Plural, M/F])' :
             analyzedItem.pronounEng}
          </span>

          <div className="font-serif text-[42px] font-extrabold text-slate-800 bg-slate-50/85 border border-slate-100 py-6 px-10 rounded-2xl w-full leading-normal text-center" dir="rtl">
            {analyzedItem.arabic}
          </div>

          <p className="text-xs text-slate-400 font-mono mt-3">
            Pronunciation sound: <span className="font-bold text-slate-650">/{analyzedItem.translit}/</span>
          </p>
        </div>

        <div className="md:col-span-7 space-y-4 font-sans text-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-150">
            <Fingerprint className="w-5 h-5 text-violet-750" />
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Directive Sega Diagnostic HUD</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Demographics Target</span>
              <span className="font-semibold text-slate-800 block mt-0.5">{getDemographic(analyzedItem.pronounEng)}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block font-sans">Formative Alterations</span>
              <span className="font-semibold text-slate-800 block mt-0.5 font-sans">{analyzedItem.suffixRule}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Semantic Meaning Output</span>
              <span className="text-slate-650 block mt-0.5 leading-relaxed bg-white border border-slate-100 p-2.5 rounded-xl font-medium">
                When constructed as {conjugationType === 'amr' ? 'Imperative (Amr)' : 'Prohibitive (Nahi)'}, this command aspect yields:
                <span className="block mt-1.5 font-bold text-violet-700 font-serif text-sm">" {analyzedItem.meaning} "</span>
              </span>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 bg-slate-100 rounded-xl p-3 border border-slate-200/50 leading-relaxed leading-normal">
            <strong>Morphology Lesson:</strong>
            {analyzedItem.isDirect ? (
              <span className="block mt-1">
                <strong>Direct Command (Real Amr/Nahi):</strong> Formed directly from present tense by discarding the prefix 'تـ' and making the ending jussive (Jazm). Since the remaining word begins with a Sukun (e.g. نْـ), a helping Alif (ا) is added with appropriate vowels.
              </span>
            ) : (
              <span className="block mt-1">
                <strong>Indirect Command (Lām of Command):</strong> Formed by prepending the command particle 'لِـ' (Li-) directly to the Jussive present verb. This indirect construction essentially acts as "should / let" for the 3rd and 1st persons.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 7. NEW Grammatical Explanation on Direct vs Indirect command formats */}
      <div className="border border-violet-100 bg-violet-50/20 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-violet-100 pb-4">
          <div className="p-2 bg-violet-600 text-white rounded-xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Linguistic Analysis: Why is "Real" Amr/Nahi Only for 2nd Person (Ḥāḍir)?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Understanding Direct commands vs. Indirect requests using the Lām of Command.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-sans">
          
          <div className="space-y-4">
            <h4 className="font-extrabold text-slate-800 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-violet-600"></span>
              The Grammatical Principle & Reason
            </h4>
            <p className="leading-relaxed text-slate-650">
              In Classical Arabic, a <strong>direct verbal command (الأمر الحقيقي)</strong> and a <strong>direct prohibition (النهي الحقيقي)</strong> can logically only be formulated for an addressed audience who is present in front of you. 
            </p>
            <p className="leading-relaxed text-slate-650">
              Therefore, the <strong>true direct imperative forms</strong> operate solely on the <strong>2nd Person (الحاضر)</strong> pronouns (<span className="font-serif font-bold text-violet-700">أَنْتَ، أَنْتُمَا، أَنْتُمْ، أَنْتِ، أَنْتُنَّ</span>). Because they are present, you do not need an indirect prefix particle (like "let"); they receive the primary base command.
            </p>
            <div className="bg-white border border-slate-150 p-3.5 rounded-2xl space-y-1.5">
              <span className="font-bold text-slate-800 block text-[11px]">Linguistic Comparison:</span>
              <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Direct / Real (2nd Person)</span>
                  <span className="font-serif text-sm font-extrabold text-violet-700 block mt-1">اُنْصُرْ (Unsur!)</span>
                  <span className="text-[10px] text-slate-500 italic font-mono block">"Help!" (Direct Imperative)</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Indirect (3rd / 1st Person)</span>
                  <span className="font-serif text-sm font-extrabold text-amber-700 block mt-1">لِيَنْصُرْ (Liyansur)</span>
                  <span className="text-[10px] text-slate-500 italic font-mono block">"Let him help" (via Lām)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-extrabold text-slate-800 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              The Role of Indirect (Ghaib & Mutakallim)
            </h4>
            <p className="leading-relaxed text-slate-650">
              When we want to express a command, advice, or prohibition for an <strong>absent third person (الغائب)</strong> or <strong>first-person speaker (المتكلم)</strong>, we cannot "order" them directly. Instead, we express a wish, mandate, or suggestion.
            </p>
            <p className="leading-relaxed text-slate-650">
              To accomplish this, we utilize the <strong>"Lām of Command" (لام الأمر)</strong> prepended to the present Jussive verb. It is translated as "Let him..." or "He should...". These forms are still categorized in tables historically but operate on separate rules.
            </p>

            <table className="w-full text-[10.5px] border border-slate-200/60 rounded-xl overflow-hidden bg-white">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200/70">
                  <th className="px-3 py-2 text-left font-bold text-slate-700">Type / Person</th>
                  <th className="px-3 py-2 text-right font-bold text-slate-700">Arabic Example</th>
                  <th className="px-3 py-2 text-left font-bold text-slate-700">English Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="px-3 py-2 font-bold text-slate-800">Direct Amr (2nd P)</td>
                  <td className="px-3 py-2 text-right font-serif text-sm font-black text-violet-700">اِفْتَحْ</td>
                  <td className="px-3 py-2 text-slate-600">"Open!" (Direct order)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-bold text-slate-800">Indirect Amr (3rd P)</td>
                  <td className="px-3 py-2 text-right font-serif text-sm font-black text-amber-600">لِيَفْتَحْ</td>
                  <td className="px-3 py-2 text-slate-600">"Let him open" (Indirect request)</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-bold text-slate-800">Direct Nahi (2nd P)</td>
                  <td className="px-3 py-2 text-right font-serif text-sm font-black text-violet-700">لَا تَفْتَحْ</td>
                  <td className="px-3 py-2 text-slate-600">"Do not open! (Forbid)"</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-bold text-slate-800">Indirect Nahi (3rd P)</td>
                  <td className="px-3 py-2 text-right font-serif text-sm font-black text-amber-600">لَا يَفْتَحْ</td>
                  <td className="px-3 py-2 text-slate-600">"He must not open"</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  );
}
