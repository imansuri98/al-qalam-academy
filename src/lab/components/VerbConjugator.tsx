"use client";
import React, { useState } from 'react';
import { Sparkles, BookOpen, AlertCircle, Info, Landmark, HelpCircle, Layers, Fingerprint, RefreshCcw, Search, Eye, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Conjugation {
  pronoun: string;
  arabic: string;
  meaning: string;
  changeType: string;
  transliteration: string;
  demographic: string; // e.g. "1st Person Singular Common"
}

const ROOTS = [
  { letters: 'ن ص ر', english: 'To Help (Nasara)', bab: 'Bab Nasara (A → U)', pastBase: 'نَصَرَ', presentBase: 'يَنْصُرُ', baseEng: 'help' },
  { letters: 'ف ت ح', english: 'To Open (Fataha)', bab: 'Bab Fataha (A → A)', pastBase: 'فَتَحَ', presentBase: 'يَفْتَحُ', baseEng: 'open' },
  { letters: 'ض ر ب', english: 'To Hit (Daraba)', bab: 'Bab Daraba (A → I)', pastBase: 'ضَرَبَ', presentBase: 'يَضْرِبُ', baseEng: 'strike' },
  { letters: 'س م ع', english: 'To Hear (Sami\'a)', bab: 'Bab Sami\'a (I → A)', pastBase: 'سَمِعَ', presentBase: 'يَسْمَعُ', baseEng: 'hear' },
  { letters: 'ك ر م', english: 'To Be Noble (Karuma)', bab: 'Bab Karuma (U → U)', pastBase: 'كَرُمَ', presentBase: 'يَكْرُمُ', baseEng: 'noble' },
  { letters: 'ح س ب', english: 'To Reckon (Hasiba)', bab: 'Bab Hasiba (I → I)', pastBase: 'حسَبَ', presentBase: 'يَحْسِبُ', baseEng: 'reckon' },
];

const getVerbMeaning = (
  pronounKey: string,
  rootLetters: string,
  tense: 'Madi' | 'Mudari',
  mode: 'musbat' | 'manfi',
  voice: 'maroof' | 'majhool'
): string => {
  const isNoble = rootLetters === 'ك ر م';
  const mapping: Record<string, { base: string; past: string; presS: string; presP: string; passBase: string; passPast: string; passPresS: string; passPresP: string }> = {
    'ن ص ر': {
      base: 'help', past: 'helped', presS: 'helps / will help', presP: 'help / will help',
      passBase: 'be helped', passPast: 'was helped', passPresS: 'is helped / will be helped', passPresP: 'are helped / will be helped'
    },
    'ف ت ح': {
      base: 'open', past: 'opened', presS: 'opens / will open', presP: 'open / will open',
      passBase: 'be opened', passPast: 'was opened', passPresS: 'is opened / will be opened', passPresP: 'are opened / will be opened'
    },
    'ض ر ب': {
      base: 'hit', past: 'hit', presS: 'hits / will hit', presP: 'hit / will hit',
      passBase: 'be hit', passPast: 'was hit', passPresS: 'is hit / will be hit', passPresP: 'are hit / will be hit'
    },
    'س م ع': {
      base: 'hear', past: 'heard', presS: 'hears / will hear', presP: 'hear / will hear',
      passBase: 'be heard', passPast: 'was heard', passPresS: 'is heard / will be heard', passPresP: 'are heard / will be heard'
    },
    'ك ر م': {
      base: 'noble', past: 'was noble', presS: 'is / will be noble', presP: 'are / will be noble',
      passBase: 'noble', passPast: 'was honored', passPresS: 'is honored / will be honored', passPresP: 'are honored / will be honored'
    },
    'ح س ب': {
      base: 'reckon', past: 'reckoned', presS: 'reckons / will reckon', presP: 'reckon / will reckon',
      passBase: 'be reckoned', passPast: 'was reckoned', passPresS: 'is reckoned / will be reckoned', passPresP: 'are reckoned / will be reckoned'
    }
  };

  const v = mapping[rootLetters] || {
    base: 'do', past: 'did', presS: 'does', presP: 'do',
    passBase: 'be done', passPast: 'was done', passPresS: 'is done', passPresP: 'are done'
  };

  const pron = pronounKey.split(' ')[0];
  const isF = pronounKey.includes('F') || pronounKey.includes('women');
  const isM = pronounKey.includes('M') || pronounKey.includes('men');

  let subj = 'He';
  let isPluralOrYou = false;

  if (pron === 'هُمَا' && isM) { subj = 'They two men'; isPluralOrYou = true; }
  else if (pron === 'هُمَا' && isF) { subj = 'They two women'; isPluralOrYou = true; }
  else if (pron === 'هُمْ') { subj = 'They men'; isPluralOrYou = true; }
  else if (pron === 'هِيَ') { subj = 'She'; }
  else if (pron === 'هُنَّ') { subj = 'They women'; isPluralOrYou = true; }
  else if (pron === 'أَنْتَ') { subj = 'You (man)'; isPluralOrYou = true; }
  else if (pron === 'أَنْتِ') { subj = 'You (woman)'; isPluralOrYou = true; }
  else if (pron === 'أَنْتُمَا' && isM) { subj = 'You two men'; isPluralOrYou = true; }
  else if (pron === 'أَنْتُمَا' && isF) { subj = 'You two women'; isPluralOrYou = true; }
  else if (pron === 'أَنْتُمَا') { subj = 'You two'; isPluralOrYou = true; }
  else if (pron === 'أَنْتُمْ') { subj = 'You all men'; isPluralOrYou = true; }
  else if (pron === 'أَنْتُنَّ') { subj = 'You all women'; isPluralOrYou = true; }
  else if (pron === 'أَنَا') { subj = 'I (M/F)'; }
  else if (pron === 'نَحْنُ') { subj = 'We (Dual & Plural, M/F)'; isPluralOrYou = true; }

  if (voice === 'maroof') {
    if (tense === 'Madi') {
      if (mode === 'musbat') {
        if (isNoble) {
          if (pron === 'أَنَا') return 'I (M/F) was noble';
          if (pron === 'أَنْتَ' || pron === 'أَنْتِ') return 'You were noble';
          if (pron === 'أَنْتُمَا' || pron === 'أَنْتُمْ' || pron === 'أَنْتُنَّ') return `${subj} were noble`;
          if (pron === 'نَحْنُ') return 'We (Dual & Plural, M/F) were noble';
          return `${subj} was noble`;
        }
        return `${subj} ${v.past}`;
      } else {
        if (isNoble) {
          if (pron === 'أَنَا') return 'I (M/F) was not noble';
          if (pron === 'أَنْتَ' || pron === 'أَنْتِ' || pron === 'أَنْتُمَا' || pron === 'أَنْتُمْ' || pron === 'أَنْتُنَّ') return `${subj} were not noble`;
          if (pron === 'نَحْنُ') return 'We (Dual & Plural, M/F) were not noble';
          return `${subj} was not noble`;
        }
        return `${subj} did not ${v.base}`;
      }
    } else {
      if (mode === 'musbat') {
        if (isNoble) {
          if (pron === 'أَنَا') return 'I (M/F) am / will be noble';
          if (pron === 'أَنْتَ' || pron === 'أَنْتِ' || pron === 'أَنْتُمَا' || pron === 'أَنْتُمْ' || pron === 'أَنْتُنَّ' || pron === 'هُمَا' || pron === 'هُمْ' || pron === 'هُنَّ' || pron === 'نَحْنُ') return `${subj} are / will be noble`;
          return `${subj} is / will be noble`;
        }
        const isSing = ['هُوَ', 'هِيَ', 'أَنْتَ', 'أَنْتِ', 'أَنَا'].includes(pron);
        const actionForm = isSing ? (pron === 'أَنَا' ? v.presP : v.presS) : v.presP;
        return `${subj} ${actionForm}`;
      } else {
        if (isNoble) {
          if (pron === 'أَنَا') return 'I (M/F) am not / will not be noble';
          if (pron === 'أَنْتَ' || pron === 'أَنْتِ' || pron === 'أَنْتُمَا' || pron === 'أَنْتُمْ' || pron === 'أَنْتُنَّ' || pron === 'هُمَا' || pron === 'هُمْ' || pron === 'هُنَّ' || pron === 'نَحْنُ') return `${subj} are not / will not be noble`;
          return `${subj} is not / will not be noble`;
        }
        const isSingThird = ['هُوَ', 'هِيَ'].includes(pron);
        const doesDo = isSingThird ? 'does not' : 'do not';
        return `${subj} ${doesDo} ${v.base} / will not ${v.base}`;
      }
    }
  } else {
    // Passive Voice (Majhool)
    if (tense === 'Madi') {
      if (mode === 'musbat') {
        if (pron === 'أَنَا') return 'I (M/F) was ' + (rootLetters === 'ك ر م' ? 'honored' : v.past);
        const wasWere = isPluralOrYou ? 'were' : 'was';
        const vPastVal = rootLetters === 'ك ر م' ? 'honored' : v.past;
        return `${subj} ${wasWere} ${vPastVal}`;
      } else {
        if (pron === 'أَنَا') return 'I (M/F) was not ' + (rootLetters === 'ك ر م' ? 'honored' : v.past);
        const wasWere = isPluralOrYou ? 'were not' : 'was not';
        const vPastVal = rootLetters === 'ك ر م' ? 'honored' : v.past;
        return `${subj} ${wasWere} ${vPastVal}`;
      }
    } else {
      if (mode === 'musbat') {
        if (pron === 'أَنَا') return 'I (M/F) am / will be ' + (rootLetters === 'ك ر م' ? 'honored' : v.past);
        const isAre = isPluralOrYou ? 'are' : 'is';
        const isAre2 = isPluralOrYou ? 'will be' : 'will be';
        const vPastVal = rootLetters === 'ك ر م' ? 'honored' : v.past;
        return `${subj} ${isAre} / ${isAre2} ${vPastVal}`;
      } else {
        if (pron === 'أَنَا') return 'I (M/F) am not / will not be ' + (rootLetters === 'ك ر م' ? 'honored' : v.past);
        const isAreNeg = isPluralOrYou ? 'are not' : 'is not';
        const isAreNeg2 = isPluralOrYou ? 'will not be' : 'will not be';
        const vPastVal = rootLetters === 'ك ر م' ? 'honored' : v.past;
        return `${subj} ${isAreNeg} / ${isAreNeg2} ${vPastVal}`;
      }
    }
  }
};

const getDemographic = (pronoun: string): string => {
  if (pronoun.includes('هُوَ')) return '3rd Person Singular Masculine (غائب مفرد مذكر)';
  if (pronoun.includes('هُمَا (They Two M)')) return '3rd Person Dual Masculine (غائب تثنية مذكر)';
  if (pronoun.includes('هُمْ')) return '3rd Person Plural Masculine (غائب جمع مذكر)';
  if (pronoun.includes('هِيَ')) return '3rd Person Singular Feminine (غائب مفرد مؤنث)';
  if (pronoun.includes('هُمَا (They Two F)')) return '3rd Person Dual Feminine (غائب تثنية مؤنث)';
  if (pronoun.includes('هُنَّ')) return '3rd Person Plural Feminine (غائب جمع مؤنث)';
  if (pronoun.includes('أَنْتَ')) return '2nd Person Singular Masculine (مخاطب مفرد مذكر)';
  if (pronoun.includes('أَنْتُمَا (You Two M)')) return '2nd Person Dual Masculine (مخاطب تثنية مذكر)';
  if (pronoun.includes('أَنْتُمْ')) return '2nd Person Plural Masculine (مخاطب جمع مذكر)';
  if (pronoun.includes('أَنْتِ')) return '2nd Person Singular Feminine (مخاطب مفرد مؤنث)';
  if (pronoun.includes('أَنْتُمَا (You Two F)')) return '2nd Person Dual Feminine (مخاطب تثنية مؤنث)';
  if (pronoun.includes('أَنْتُنَّ')) return '2nd Person Plural Feminine (مخاطب جمع مؤنث)';
  if (pronoun.includes('أَنَا')) return '1st Person Singular Common (متكلم مفرد)';
  if (pronoun.includes('نَحْنُ')) return '1st Person Dual & Plural Common (متكلم تثنية وجمع)';
  return 'Classical Arabic Personal Pronoun (ضمير)';
};

interface ConjugationCardProps {
  c: Conjugation;
  isSelected: boolean;
  onClick: () => void;
  key?: number;
}

const ConjugationCard = ({ c, isSelected, onClick }: ConjugationCardProps) => (
  <motion.button
    whileHover={{ y: -2 }}
    onClick={onClick}
    className={`w-full flex flex-col justify-between p-4 rounded-2xl border text-left transition-all bg-white cursor-pointer select-none ${
      isSelected
        ? 'border-emerald-600 bg-emerald-50/15 shadow-sm ring-2 ring-emerald-500/10'
        : 'border-slate-150 hover:border-slate-300 hover:shadow-xs hover:bg-slate-50/10'
    }`}
  >
    <div className="flex justify-between items-start mb-2 w-full gap-2">
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
        isSelected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
      }`}>
        {c.pronoun}
      </span>
      <span className="text-[8px] px-1.5 py-0.5 rounded-sm font-mono font-bold text-emerald-700 bg-emerald-100/30 leading-none shrink-0 border border-emerald-100/50">
        {c.changeType}
      </span>
    </div>

    <div className="text-right my-1.5 w-full">
      <span className="font-serif text-2xl font-black block leading-snug tracking-wide text-slate-800" dir="rtl">
        {c.arabic}
      </span>
      <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
        /{c.transliteration}/
      </span>
    </div>

    <div className="border-t border-slate-100 pt-2 mt-1.5 w-full">
      <span className="text-[11px] font-semibold text-slate-700 block truncate">
        Meaning: <span className="text-slate-500 font-normal italic">{c.meaning}</span>
      </span>
    </div>
  </motion.button>
);

export default function VerbConjugator() {
  const [selectedRootIdx, setSelectedRootIdx] = useState(0);
  const [tense, setTense] = useState<'Madi' | 'Mudari'>('Madi');
  const [mode, setMode] = useState<'musbat' | 'manfi'>('musbat');
  const [voice, setVoice] = useState<'maroof' | 'majhool'>('maroof');
  const [selectedFormIdx, setSelectedFormIdx] = useState<number>(0);
  const [numberFilter, setNumberFilter] = useState<'all' | 'singular' | 'dual' | 'plural'>('all');
  const [personFilter, setPersonFilter] = useState<'all' | 'ghaib' | 'hadir' | 'mutakallim'>('all');
  const [genderFilter, setGenderFilter] = useState<'all' | 'muzakkar' | 'muannas'>('all');

  const root = ROOTS[selectedRootIdx];

  const getLatinLetters = (letters: string) => {
    if (letters === 'ن ص ر') return { f: 'n', s: 's', t: 'r' };
    if (letters === 'ف ت ح') return { f: 'f', s: 't', t: 'h' };
    if (letters === 'ض ر ب') return { f: 'd', s: 'r', t: 'b' };
    if (letters === 'س م ع') return { f: 's', s: 'm', t: "a'" };
    if (letters === 'ك ر م') return { f: 'k', s: 'r', t: 'm' };
    if (letters === 'ح س ب') return { f: 'h', s: 's', t: 'b' };
    return { f: 'x', s: 'y', t: 'z' };
  };

  const getPastConjugations = (letters: string, modeType: 'musbat' | 'manfi', voiceType: 'maroof' | 'majhool'): Conjugation[] => {
    const l = letters.split(' ');
    const f = l[0];
    const s = l[1];
    const t = l[2];
    const lat = getLatinLetters(letters);

    const midVow = voiceType === 'majhool' 
      ? 'ِ' 
      : ((letters === 'س م ع' || letters === 'ح س ب') ? 'ِ' : (letters === 'ك ر م' ? 'ُ' : 'َ'));
    
    const midLat = voiceType === 'majhool' 
      ? 'i' 
      : ((letters === 'س م ع' || letters === 'ح س ب') ? 'i' : (letters === 'ك ر م' ? 'u' : 'a'));

    const firstVow = voiceType === 'majhool' ? 'ُ' : 'َ';
    const firstLat = voiceType === 'majhool' ? 'u' : 'a';

    const base = `${f}${firstVow}${s}${midVow}${t}`;

    const list = [
      // Ghaib (3rd Person)
      { pronoun: 'هُوَ (He)', arabic: `${base}َ`, changeType: 'Base Form', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}a` },
      { pronoun: 'هُمَا (They Two M)', arabic: `${base}َا`, changeType: 'Added َا', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}aa` },
      { pronoun: 'هُمْ (They Plural M)', arabic: `${f}${firstVow}${s}${midVow}${t}ُوا`, changeType: 'Added ُوا', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}oo` },
      { pronoun: 'هِيَ (She)', arabic: `${f}${firstVow}${s}${midVow}${t}َتْ`, changeType: 'Added َتْ', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}at` },
      { pronoun: 'هُمَا (They Two F)', arabic: `${f}${firstVow}${s}${midVow}${t}َتَا`, changeType: 'Added َتَا', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}ataa` },
      { pronoun: 'هُنَّ (They Plural F)', arabic: `${f}${firstVow}${s}${midVow}${t}ْنَ`, changeType: 'Added نَ', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}na` },
      // Hadir (2nd Person)
      { pronoun: 'أَنْتَ (You M)', arabic: `${f}${firstVow}${s}${midVow}${t}ْتَ`, changeType: 'Added ْتَ', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}ta` },
      { pronoun: 'أَنْتُمَا (You Two M)', arabic: `${f}${firstVow}${s}${midVow}${t}ْتُمَا`, changeType: 'Added ْتُمَا', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}tuma` },
      { pronoun: 'أَنْتُمْ (You Plural M)', arabic: `${f}${firstVow}${s}${midVow}${t}ْتُمْ`, changeType: 'Added ْتُمْ', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}tum` },
      { pronoun: 'أَنْتِ (You F)', arabic: `${f}${firstVow}${s}${midVow}${t}ْتِ`, changeType: 'Added ْتِ', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}ti` },
      { pronoun: 'أَنْتُمَا (You Two F)', arabic: `${f}${firstVow}${s}${midVow}${t}ْتُمَا`, changeType: 'Added ْتُمَا', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}tuma` },
      { pronoun: 'أَنْتُنَّ (You Plural F)', arabic: `${f}${firstVow}${s}${midVow}${t}ْتُنَّ`, changeType: 'Added ْتُنَّ', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}tun` },
      // Mutakallim (1st Person)
      { pronoun: 'أَنَا (I [M/F])', arabic: `${f}${firstVow}${s}${midVow}${t}ْتُ`, changeType: 'Added ْتُ', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}tu` },
      { pronoun: 'نَحْنُ (We [Dual & Plural, M/F] 👥/👤👤👤)', arabic: `${f}${firstVow}${s}${midVow}${t}ْنَا`, changeType: 'Added ْنَا', transliteration: `${lat.f}${firstLat}${lat.s}${midLat}${lat.t}naa` }
    ];

    return list.map(item => {
      const isNeg = modeType === 'manfi';
      return {
        ...item,
        arabic: isNeg ? `مَا ${item.arabic}` : item.arabic,
        transliteration: isNeg ? `mā ${item.transliteration}` : item.transliteration,
        changeType: isNeg ? `مَا + ${item.changeType}` : item.changeType,
        meaning: getVerbMeaning(item.pronoun, letters, 'Madi', modeType, voiceType),
        demographic: getDemographic(item.pronoun)
      };
    });
  };

  const getPresentConjugations = (letters: string, modeType: 'musbat' | 'manfi', voiceType: 'maroof' | 'majhool'): Conjugation[] => {
    const l = letters.split(' ');
    const f = l[0];
    const s = l[1];
    const t = l[2];
    const lat = getLatinLetters(letters);

    let midVow = 'ُ';
    let midLatin = 'u';
    if (voiceType === 'majhool') {
      midVow = 'َ';
      midLatin = 'a';
    } else {
      if (letters === 'ف ت ح' || letters === 'س م ع') {
        midVow = 'َ';
        midLatin = 'a';
      }
      if (letters === 'ض ر ب' || letters === 'ح س ب') {
        midVow = 'ِ';
        midLatin = 'i';
      }
    }

    const prefVow = voiceType === 'majhool' ? 'ُ' : 'َ';
    const prefLat = voiceType === 'majhool' ? 'u' : 'a';

    const list = [
      // Ghaib (3rd Person)
      { pronoun: 'هُوَ (He)', arabic: `ي${prefVow}${f}ْ${s}${midVow}${t}ُ`, changeType: 'Prefix يـَ + suffix ُ', transliteration: `y${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}u` },
      { pronoun: 'هُمَا (They Two M)', arabic: `ي${prefVow}${f}ْ${s}${midVow}${t}َانِ`, changeType: 'Prefix يـَ + suffix َانِ', transliteration: `y${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}aani` },
      { pronoun: 'هُمْ (They Plural M)', arabic: `ي${prefVow}${f}ْ${s}${midVow}${t}ُونَ`, changeType: 'Prefix يـَ + suffix ُونَ', transliteration: `y${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}oona` },
      { pronoun: 'هِيَ (She)', arabic: `ت${prefVow}${f}ْ${s}${midVow}${t}ُ`, changeType: 'Prefix تـَ + suffix ُ', transliteration: `t${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}u` },
      { pronoun: 'هُمَا (They Two F)', arabic: `ت${prefVow}${f}ْ${s}${midVow}${t}َانِ`, changeType: 'Prefix تـَ + suffix َانِ', transliteration: `t${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}aani` },
      { pronoun: 'هُنَّ (They Plural F)', arabic: `ي${prefVow}${f}ْ${s}${midVow}${t}ْنَ`, changeType: 'Prefix يـَ + suffix ْنَا', transliteration: `y${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}na` },
      // Hadir (2nd Person)
      { pronoun: 'أَنْتَ (You M)', arabic: `ت${prefVow}${f}ْ${s}${midVow}${t}ُ`, changeType: 'Prefix تـَ + suffix ُ', transliteration: `t${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}u` },
      { pronoun: 'أَنْتُمَا (You Two M)', arabic: `ت${prefVow}${f}ْ${s}${midVow}${t}َانِ`, changeType: 'Prefix تـَ + suffix َانِ', transliteration: `t${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}aani` },
      { pronoun: 'أَنْتُمْ (You Plural M)', arabic: `ت${prefVow}${f}ْ${s}${midVow}${t}ُونَ`, changeType: 'Prefix تـَ + suffix ُونَ', transliteration: `t${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}oona` },
      { pronoun: 'أَنْتِ (You F)', arabic: `ت${prefVow}${f}ْ${s}${midVow}${t}ِينَ`, changeType: 'Prefix تـَ + suffix ِينَ', transliteration: `t${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}eena` },
      { pronoun: 'أَنْتُمَا (You Two F)', arabic: `ت${prefVow}${f}ْ${s}${midVow}${t}َانِ`, changeType: 'Prefix تـَ + suffix َانِ', transliteration: `t${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}aani` },
      { pronoun: 'أَنْتُنَّ (You Plural F)', arabic: `ت${prefVow}${f}ْ${s}${midVow}${t}ْنَ`, changeType: 'Prefix تـَ + suffix ْنَا', transliteration: `t${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}na` },
      // Mutakallim (1st Person)
      { pronoun: 'أَنَا (I [M/F])', arabic: `أ${prefVow}${f}ْ${s}${midVow}${t}ُ`, changeType: 'Prefix أ + suffix ُ', transliteration: `${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}u` },
      { pronoun: 'نَحْنُ (We [Dual & Plural, M/F] 👥/👤👤👤)', arabic: `ن${prefVow}${f}ْ${s}${midVow}${t}ُ`, changeType: 'Prefix نـَ + suffix ُ', transliteration: `n${prefLat}${lat.f}${lat.s}${midLatin}${lat.t}u` }
    ];

    return list.map(item => {
      const isNeg = modeType === 'manfi';
      const changeDesc = voiceType === 'majhool' 
        ? item.changeType.replace('يـَ', 'يـُ').replace('تـَ', 'تـُ').replace('نـَ', 'نـُ').replace('أ', 'أُ')
        : item.changeType;
      return {
        ...item,
        arabic: isNeg ? `لَا ${item.arabic}` : item.arabic,
        transliteration: isNeg ? `lā ${item.transliteration}` : item.transliteration,
        changeType: isNeg ? `لَا + ${changeDesc}` : changeDesc,
        meaning: getVerbMeaning(item.pronoun, letters, 'Mudari', modeType, voiceType),
        demographic: getDemographic(item.pronoun)
      };
    });
  };

  const conjugations = tense === 'Madi' 
    ? getPastConjugations(root.letters, mode, voice) 
    : getPresentConjugations(root.letters, mode, voice);

  // Helper lists representing the 3 grouped columns in traditional Arabic tables (we keep Mutakallim left, Hadir mid, Ghaib right)
  const ghaibForms = conjugations.slice(0, 6);
  const hadirForms = conjugations.slice(6, 12);
  const mutakallimForms = conjugations.slice(12, 14);

  // Number, Person, and Gender Filters Logic (Checking pronoun types to narrow down visual grid density)
  const filterForm = (formItem: Conjugation, indexInOriginal: number) => {
    const pronoun = formItem.pronoun;
    const isDual = pronoun.includes('Two') || pronoun.includes('هُمَا') || pronoun.includes('أَنْتُمَا') || pronoun.includes('نَحْنُ') || pronoun.includes('Dual');
    const isPlural = pronoun.includes('Plural') || pronoun.includes('هُمْ') || pronoun.includes('هُنَّ') || pronoun.includes('أَنْتُمْ') || pronoun.includes('أَنْتُنَّ') || pronoun.includes('We') || pronoun.includes('نَحْنُ');
    const isSingular = !isDual && !isPlural;

    // 1. Quantity Filter
    if (numberFilter === 'singular' && !isSingular) return false;
    if (numberFilter === 'dual' && !isDual) return false;
    if (numberFilter === 'plural' && !isPlural) return false;

    // 2. Person Filter (ghaib: index < 6, hadir: 6-11, mutakallim: 12-13)
    if (personFilter === 'ghaib' && !(indexInOriginal < 6)) return false;
    if (personFilter === 'hadir' && !(indexInOriginal >= 6 && indexInOriginal < 12)) return false;
    if (personFilter === 'mutakallim' && !(indexInOriginal >= 12)) return false;

    // 3. Gender Filter (Muzakkar vs Mu’annath)
    // 1st Person (أَنَا and نَحْنُ) is Common (shared for both Masculine and Feminine), so they always pass
    const isMutakallim = indexInOriginal >= 12;
    if (!isMutakallim) {
      const isFem = pronoun.includes('F') || pronoun.includes('women') || pronoun.includes('هِيَ') || pronoun.includes('هُنَّ') || pronoun.includes('أَنْتِ') || pronoun.includes('أَنْتُنَّ');
      const isMasc = !isFem; // The rest are masculine
      
      if (genderFilter === 'muzakkar' && !isMasc) return false;
      if (genderFilter === 'muannas' && !isFem) return false;
    }

    return true;
  };

  // Safe Dynamic Counts and Fallback for Analyzed Target Conjugation
  const visibleConjugationIdxs = conjugations.map((c, idx) => filterForm(c, idx) ? idx : -1).filter(idx => idx !== -1);
  const activeFormIdx = visibleConjugationIdxs.includes(selectedFormIdx) 
    ? selectedFormIdx 
    : (visibleConjugationIdxs[0] ?? 0);
  const analyzedConjugation = conjugations[activeFormIdx] || conjugations[0];

  const visibleMutakallimCount = mutakallimForms.filter((c, i) => filterForm(c, 12 + i)).length;
  const visibleHadirCount = hadirForms.filter((c, i) => filterForm(c, 6 + i)).length;
  const visibleGhaibCount = ghaibForms.filter((c, i) => filterForm(c, i)).length;

  const totalCols = (visibleMutakallimCount > 0 ? 1 : 0) + (visibleHadirCount > 0 ? 1 : 0) + (visibleGhaibCount > 0 ? 1 : 0);

  // Safe Index Finder to select mapped cards correctly
  const handleCardClick = (globalIdx: number) => {
    setSelectedFormIdx(globalIdx);
    document.getElementById('analysis-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-8" id="conjugator-container">
      
      {/* Visual Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-100/60 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Sega Morphing Engine
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Comprehensive Verb Conjugation Dashboard
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Witness how 3-letter triliteral root letters combine with prefix markers and structural suffixes across the 14 morphological paradigms (Segas).
          </p>
        </div>

        {/* Triple parameters modern switcher bar */}
        <div className="flex flex-wrap gap-2.5 items-center">
          
          {/* TENSE SELECTOR */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">Tense (الزَّمَان)</span>
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-205/70">
              <button
                onClick={() => { setTense('Madi'); setSelectedFormIdx(0); }}
                className={`px-3 py-1.5 font-bold text-[10.5px] rounded-lg transition-all cursor-pointer ${
                  tense === 'Madi'
                    ? 'bg-emerald-800 text-white shadow-xs border-b border-emerald-950'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Past (Māḍī / مَاضِي)
              </button>
              <button
                onClick={() => { setTense('Mudari'); setSelectedFormIdx(0); }}
                className={`px-3 py-1.5 font-bold text-[10.5px] rounded-lg transition-all cursor-pointer ${
                  tense === 'Mudari'
                    ? 'bg-emerald-800 text-white shadow-xs border-b border-emerald-950'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Present (Muḍāri‘ / مُضَارِع)
              </button>
            </div>
          </div>

          {/* MODE SELECTOR (Musbat vs Manfi) */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">Statement (الإِثْبَات)</span>
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-205/70">
              <button
                onClick={() => setMode('musbat')}
                className={`px-3 py-1.5 font-bold text-[10.5px] rounded-lg transition-all cursor-pointer ${
                  mode === 'musbat'
                    ? 'bg-emerald-800 text-white shadow-xs border-b border-emerald-950'
                    : 'text-slate-500 hover:text-emerald-700'
                }`}
              >
                Positive (Musbat)
              </button>
              <button
                onClick={() => setMode('manfi')}
                className={`px-3 py-1.5 font-bold text-[10.5px] rounded-lg transition-all cursor-pointer ${
                  mode === 'manfi'
                    ? 'bg-emerald-800 text-white shadow-xs border-b border-emerald-950'
                    : 'text-slate-500 hover:text-emerald-750'
                }`}
              >
                Negative (Manfī)
              </button>
            </div>
          </div>

          {/* VOICE SELECTOR (Maroof vs Majhool) */}
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">Voice (البِنَاء)</span>
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-205/70">
              <button
                onClick={() => setVoice('maroof')}
                className={`px-3 py-1.5 font-bold text-[10.5px] rounded-lg transition-all cursor-pointer ${
                  voice === 'maroof'
                    ? 'bg-emerald-800 text-white shadow-xs border-b border-emerald-950'
                    : 'text-slate-500 hover:text-emerald-850'
                }`}
              >
                Active (Ma‘rūf)
              </button>
              <button
                onClick={() => setVoice('majhool')}
                className={`px-3 py-1.5 font-bold text-[10.5px] rounded-lg transition-all cursor-pointer ${
                  voice === 'majhool'
                    ? 'bg-emerald-800 text-white shadow-xs border-b border-emerald-950'
                    : 'text-slate-500 hover:text-emerald-850'
                }`}
              >
                Passive (Majhūl)
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Interactive Root Selection Card Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            Select Verb Root Category
          </label>
          <span className="text-[10px] text-slate-450 italic">Updates all formulas below</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {ROOTS.map((r, idx) => (
            <button
              key={r.letters}
              onClick={() => { setSelectedRootIdx(idx); setSelectedFormIdx(0); }}
              className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                selectedRootIdx === idx
                  ? 'border-emerald-600 bg-emerald-50/20 shadow-xs ring-2 ring-emerald-500/10'
                  : 'border-slate-150 hover:border-slate-300 hover:bg-slate-50/50 bg-white'
              }`}
            >
              <span className="font-serif text-xl font-black text-slate-800 tracking-wide">{r.letters}</span>
              <span className="text-[11px] text-slate-705 font-bold mt-1">{r.english.split(' ')[0]} {r.english.split(' ')[1]}</span>
              <span className="text-[9px] text-slate-400 font-mono mt-0.5 mt-auto">{r.bab.split(' ')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Selected Summary HUD card representing quick stats */}
      <div className="bg-slate-900 text-slate-100 rounded-3xl p-5 border border-slate-850 flex flex-col lg:flex-row items-stretch justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-[-20px] bottom-[-20px] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 p-3 rounded-2xl flex items-center justify-center self-start">
            <BookOpen className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-black text-white">Root verb: [ {root.letters.replace(/ /g, ' - ')} ]</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700 font-medium">
                {root.bab}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Currently visualizing the Arabic <span className="text-emerald-350 font-bold">{tense === 'Madi' ? 'Past (مَاضِي)' : 'Present (مُضَارِع)'}</span> conjugation in the <span className="text-emerald-350 font-bold">{mode === 'musbat' ? 'Positive' : 'Negative'}</span> active form representing <span className="text-emerald-350 font-bold">"{root.baseEng}"</span>.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800 relative z-10 justify-between lg:justify-end">
          <div className="lg:pl-6 text-right shrink-0">
            <span className="block text-[9px] text-slate-450 uppercase tracking-widest font-black">ACTIVE VERB TEMPLATE</span>
            <span className="text-xs text-slate-300 font-semibold block mt-0.5">
              {tense === 'Madi' ? `Madi Base: ${root.pastBase}` : `Mudari Base: ${root.presentBase}`}
            </span>
          </div>
          <div className="lg:pl-6 text-right shrink-0">
            <span className="block text-[9px] text-slate-450 uppercase tracking-widest font-black">MASCOT SINGULAR (HE)</span>
            <span className="font-serif text-xl font-extrabold text-emerald-400 block mt-0.5" dir="rtl">
              {conjugations[0]?.arabic}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Advanced Responsive Sega Filters Control Panel */}
      <div className="bg-slate-50/85 p-4 sm:p-5 rounded-3xl border border-slate-150 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-150">
          <Filter className="w-4 h-4 text-emerald-700" />
          <span className="text-xs font-bold text-slate-850 uppercase tracking-wider">Advanced Sega Interactive Filters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* A. Quantity Filter */}
          <div className="space-y-1.5 flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">1. Form Quantity (الْعَدَد)</span>
            <div className="flex flex-wrap gap-1 bg-slate-200/60 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All 14 Forms' },
                { id: 'singular', label: 'Singular Forms (👤)' },
                { id: 'dual', label: 'Dual Forms (👥)' },
                { id: 'plural', label: 'Plural Forms (👤👤👤)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setNumberFilter(tab.id as any); setSelectedFormIdx(0); }}
                  className={`flex-1 text-center py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                    numberFilter === tab.id
                      ? 'bg-emerald-800 text-white shadow-xs font-extrabold'
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
                  onClick={() => { setPersonFilter(tab.id as any); setSelectedFormIdx(0); }}
                  className={`flex-1 text-center py-1.5 px-2 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                    personFilter === tab.id
                      ? 'bg-emerald-800 text-white shadow-xs font-extrabold'
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
                  onClick={() => { setGenderFilter(tab.id as any); setSelectedFormIdx(0); }}
                  className={`flex-1 text-center py-1.5 px-2.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                    genderFilter === tab.id
                      ? 'bg-emerald-800 text-white shadow-xs font-extrabold'
                      : 'text-slate-500 hover:text-slate-850'
                  }`}
                >
                  {tab.id === 'all' ? tab.label : tab.label.split(' / ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clear active filter badge if any is active */}
        {(numberFilter !== 'all' || personFilter !== 'all' || genderFilter !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-150/50">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Active Filters:</span>
              {numberFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                  {numberFilter === 'singular' ? 'Singular (👤)' : numberFilter === 'dual' ? 'Dual (👥)' : 'Plural (👤👤👤)'}
                </span>
              )}
              {personFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                  {personFilter === 'ghaib' ? "3rd Person (G̠ā'ib)" : personFilter === 'hadir' ? '2nd Person (Ḥāḍir)' : '1st Person (Mutakallim)'}
                </span>
              )}
              {genderFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                  {genderFilter === 'muzakkar' ? 'Masculine (Muzakkar)' : 'Feminine (Mu’annath)'}
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setNumberFilter('all');
                setPersonFilter('all');
                setGenderFilter('all');
                setSelectedFormIdx(0);
              }}
              className="text-[10px] text-emerald-750 hover:text-emerald-900 font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* 5. Mapped Table / 3 Columns Layout */}
      {totalCols > 0 ? (
        <div className={`grid grid-cols-1 ${
          totalCols === 3 ? 'lg:grid-cols-3' :
          totalCols === 2 ? 'lg:grid-cols-2 max-w-5xl mx-auto' :
          'max-w-2xl mx-auto'
        } gap-6`} id="conjugations-table">
          
          {/* COLUMN 1: Mutakallim (1st Person / Speaker / متكلم) (2 forms) */}
          {visibleMutakallimCount > 0 && (
            <div className="flex flex-col gap-4 bg-slate-50/40 p-5 rounded-3xl border border-slate-150/70" id="column-mutakallim">
              <div className="flex items-center justify-between border-b border-slate-150 pb-3 mb-1">
                <div>
                  <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5 leading-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    Speaker / 1st Person (Mutakallim)
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">{visibleMutakallimCount} Segas (متكلم)</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black bg-indigo-50 text-indigo-700 border border-indigo-100">
                  First Person
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {mutakallimForms.map((c, i) => {
                  const globalIdx = 12 + i;
                  const matchesFilter = filterForm(c, globalIdx);
                  if (!matchesFilter) return null;

                  return (
                    <ConjugationCard
                      key={globalIdx}
                      c={c}
                      isSelected={selectedFormIdx === globalIdx}
                      onClick={() => handleCardClick(globalIdx)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* COLUMN 2: Hadir (2nd Person / Present / حاضر) (6 forms) */}
          {visibleHadirCount > 0 && (
            <div className="flex flex-col gap-4 bg-slate-50/40 p-5 rounded-3xl border border-slate-150/70" id="column-hadir">
              <div className="flex items-center justify-between border-b border-slate-150 pb-3 mb-1">
                <div>
                  <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5 leading-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Present / 2nd Person (Ḥāḍir)
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">{visibleHadirCount} Segas (حاضر)</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black bg-emerald-50 text-emerald-800 border border-emerald-100">
                  Second Person
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {hadirForms.map((c, i) => {
                  const globalIdx = 6 + i;
                  const matchesFilter = filterForm(c, globalIdx);
                  if (!matchesFilter) return null;

                  return (
                    <ConjugationCard
                      key={globalIdx}
                      c={c}
                      isSelected={selectedFormIdx === globalIdx}
                      onClick={() => handleCardClick(globalIdx)}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* COLUMN 3: Ghaib (3rd Person / Absent / غائب) (6 forms) */}
          {visibleGhaibCount > 0 && (
            <div className="flex flex-col gap-4 bg-slate-50/40 p-5 rounded-3xl border border-slate-150/70" id="column-ghaib">
              <div className="flex items-center justify-between border-b border-slate-150 pb-3 mb-1">
                <div>
                  <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5 leading-none">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    Absent / 3rd Person (G̠ā’ib)
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">{visibleGhaibCount} Segas (غائب)</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black bg-blue-50 text-blue-700 border border-blue-105">
                  Third Person
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {ghaibForms.map((c, i) => {
                  const globalIdx = i;
                  const matchesFilter = filterForm(c, globalIdx);
                  if (!matchesFilter) return null;

                  return (
                    <ConjugationCard
                      key={globalIdx}
                      c={c}
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
        <div className="text-center py-12 px-6 bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center space-y-3">
          <AlertCircle className="w-8 h-8 text-slate-400" />
          <p className="text-sm font-bold text-slate-700">No conjugations match the selected filters</p>
          <p className="text-xs text-slate-400">Try adjusting your quantity, person, or gender settings above.</p>
          <button
            onClick={() => {
              setNumberFilter('all');
              setPersonFilter('all');
              setGenderFilter('all');
              setSelectedFormIdx(0);
            }}
            className="mt-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 font-sans px-4 py-2 rounded-xl transition-all border border-emerald-200"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* 6. Dynamic Morphological analyzer and breakdowns */}
      <div 
        className="bg-slate-50/60 rounded-3xl p-6 sm:p-8 border border-slate-150 grid grid-cols-1 md:grid-cols-12 gap-8 items-center" 
        id="analysis-panel"
      >
        
        {/* Visual representation layout of selected word */}
        <div className="md:col-span-5 flex flex-col justify-center items-center text-center bg-white p-6 border border-slate-150/80 rounded-2xl shadow-2xs">
          <span className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-1">Active Analyzer Target</span>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-100 mb-4 inline-block">
            {analyzedConjugation.pronoun}
          </span>

          <motion.div 
            key={analyzedConjugation.arabic}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-serif text-[42px] font-extrabold text-slate-800 bg-slate-50/85 border border-slate-100 py-6 px-10 rounded-2xl w-full select-all leading-normal" 
            dir="rtl"
          >
            {analyzedConjugation.arabic}
          </motion.div>

          <p className="text-xs text-slate-400 font-mono mt-3">
            Transliteration sound: <span className="font-bold text-slate-650">/{analyzedConjugation.transliteration}/</span>
          </p>
        </div>

        {/* Sega diagnostic specs lists */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-150">
            <Fingerprint className="w-5 h-5 text-emerald-700" />
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider">Detailed Sega Diagnostic HUD</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Demographics Target</span>
              <span className="font-semibold text-slate-800 block mt-0.5">{analyzedConjugation.demographic}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Affixes Changes Made</span>
              <span className="font-semibold text-slate-800 block mt-0.5 font-sans">{analyzedConjugation.changeType}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Semantic Output</span>
              <span className="text-slate-600 block mt-0.5 leading-relaxed bg-white border border-slate-100 p-2.5 rounded-xl font-medium">
                When constructed as <span className="text-emerald-800 font-bold">{tense === 'Madi' ? 'Past' : 'Present'}</span>, this Sega resolves precisely as:
                <span className="block mt-1.5 font-bold text-emerald-700">" {analyzedConjugation.meaning} "</span>
              </span>
            </div>
          </div>

          <div className="text-[10.5px] text-amber-800 bg-amber-50 rounded-xl p-3 border border-amber-100/50 leading-relaxed font-sans">
            <strong>Formula Breakdown:</strong> Arabic verbs are dynamic. By choosing a root verb, the rules categories are computed instantly. Look at the vowel diacritics above; prefixes shape the aspect, suffixes specify the actor!
          </div>
        </div>

      </div>

      {/* 7. Beautiful Cheat sheet Golden Rules footer */}
      <div className="flex gap-3.5 items-start bg-emerald-950 text-emerald-100/90 rounded-2xl p-5 border border-emerald-900 shadow-xs relative overflow-hidden">
        <div className="absolute right-[-10px] top-[-10px] w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <AlertCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
        <div className="space-y-1.5 relative z-10">
          <h4 className="text-xs font-black text-white uppercase tracking-wider">THE GOLDEN MORPHOLOGY CHEAT SHEET</h4>
          <p className="text-[11px] leading-relaxed font-sans">
            Look closely at the endings and prefixes. The root letters <span className="font-mono font-bold text-emerald-300">({root.letters.replace(/ /g, '-')})</span> stay exactly the same.
            {tense === 'Madi' && mode === 'musbat' && voice === 'maroof' && ' Active Past tense verbs (Māḍī Ma‘rūf) are modified exclusively at the endings with specific person/number suffix attachments.'}
            {tense === 'Madi' && mode === 'manfi' && voice === 'maroof' && ' Negative Active Past tense verbs (Māḍī Manfī Ma‘rūf) are preceded by the negative particle "Mā" (مَا) meaning "did not" do an action.'}
            {tense === 'Madi' && mode === 'musbat' && voice === 'majhool' && ' Passive Past tense verbs (Māḍī Majhūl) use a Ḍamma (ـُ) on the first letter, Kasra (ـِ) on the second letter, and passive suffix endings.'}
            {tense === 'Madi' && mode === 'manfi' && voice === 'majhool' && ' Negative Passive Past tense verbs (Māḍī Manfī Majhūl) are preceded by particle helper "Mā" (مَا) meaning "was not ...".'}
            {tense === 'Mudari' && mode === 'musbat' && voice === 'maroof' && ' Active Present tense (Muḍāri‘ Ma‘rūf) are modified at the front (Prefix يَـ/تَـ/أَ/نَـ) and ending based on bāb class.'}
            {tense === 'Mudari' && mode === 'manfi' && voice === 'maroof' && ' Negative Active Present tense (Muḍāri‘ Manfī Ma‘rūf) are preceded by the negative particle "Lā" (لَا) meaning "does not / will not".'}
            {tense === 'Mudari' && mode === 'musbat' && voice === 'majhool' && ' Passive Present tense (Muḍāri‘ Majhūl) use a Ḍamma (ـُ) on prefix and Fatḥa (ـَ) on the second-to-last root letter.'}
            {tense === 'Mudari' && mode === 'manfi' && voice === 'majhool' && ' Negative Passive Present tense (Muḍāri‘ Manfī Majhūl) are preceded by "Lā" (لَا) with meaning "is not ... / will not be ...".'}
            {root.letters === 'ك ر م' && voice === 'majhool' && ' Note: Bab Karuma represents intransitive qualities ("to be noble") and scholastic passive forms represent being treated/honored nobly.'}
          </p>
        </div>
      </div>

    </div>
  );
}
