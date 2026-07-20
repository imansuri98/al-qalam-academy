"use client";
import React, { useState } from 'react';
import { Chapter } from '../types';
import { Sparkles, Info, HelpCircle, CheckCircle2, RefreshCw, Layers, ArrowLeftRight, UserCheck, AlertTriangle } from 'lucide-react';
import { verbConjugationData, ConjugationItem } from '../verbConjugationData';

interface ChapterFocusLabProps {
  chapter: Chapter;
}

export default function ChapterFocusLab({ chapter }: ChapterFocusLabProps) {
  const [xp, setXp] = useState(0);
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'info' | 'warn' | '' }>({ text: '', type: '' });

  // Chapter 1: Gender Conversion State
  const [gWord, setGWord] = useState('طَالِبٌ'); // male student
  const [isFeminine, setIsFeminine] = useState(false);

  // Chapter 2: Numbers state
  const [numWord, setNumWord] = useState<'muslim' | 'car' | 'book'>('muslim');
  const [numberState, setNumberState] = useState<'singular' | 'dual' | 'plural'>('singular');

  // Chapter 3: Ishara pointing words state
  const [isharaGender, setIsharaGender] = useState<'masc' | 'fem'>('masc');
  const [isharaCount, setIsharaCount] = useState<'sing' | 'dual' | 'plur'>('sing');
  const [isharaDist, setIsharaDist] = useState<'near' | 'far'>('near');
  const [isharaNounType, setIsharaNounType] = useState<'human' | 'nonhuman'>('human');

  // Chapter 4: Pronouns (Dhamā’ir) possessive suffix state
  const [pronounNoun, setPronounNoun] = useState<'house' | 'pen' | 'book'>('house');
  const [pronounIndex, setPronounIndex] = useState(0); // index in separate pronouns
  const [dhamirTab, setDhamirTab] = useState<'sentence' | 'possessive'>('sentence');
  const [pronounSentenceNoun, setPronounSentenceNoun] = useState<'muslim' | 'student' | 'teacher'>('muslim');

  // Chapter 5: Marifa/Nakira state
  const [mnWord, setMnWord] = useState<'masjid' | 'kitab' | 'bait'>('masjid');
  const [mnState, setMnState] = useState<'nakira' | 'marifa'>('nakira');

  // Chapter 6: Mubtada-Khabar sentence agreement puzzle state
  const [mubtada, setMubtada] = useState<'zaid' | 'fatima' | 'teacher_m' | 'teacher_f'>('zaid');
  const [khabar, setKhabar] = useState<'pious_m' | 'pious_f' | 'happy_m' | 'happy_f'>('pious_m');

  // Chapter 7: Mudaf-Mudaf Ilaih Owner-Owned builder state
  const [owned, setOwned] = useState<'kitab' | 'key' | 'bait'>('kitab');
  const [owner, setOwner] = useState<'allah' | 'zaid' | 'teacher'>('zaid');

  // Chapter 8: Mausuf-Sifat Adjective Agreement state
  const [mNoun, setMNoun] = useState<'boy' | 'girl' | 'books'>('boy');
  const [mDef, setMDef] = useState<boolean>(false);
  const [mCase, setMCase] = useState<'nom' | 'acc' | 'gen'>('nom');

  // Chapter 9: Counting rules
  const [countGender, setCountGender] = useState<'masc' | 'fem'>('masc');
  const [countNumber, setCountNumber] = useState<number>(3);

  // Chapter 10-18: Conjugator verbs mapping
  const [verbRoot, setVerbRoot] = useState<'kataba' | 'nasara' | 'zahaba' | 'jalasa'>('kataba');
  const [verbTense, setVerbTense] = useState<'madi' | 'mudari' | 'amr' | 'nahy'>('madi');
  const [verbSubj, setVerbSubj] = useState<'he' | 'she' | 'you_m' | 'you_f' | 'i' | 'we'>('he');
  const [selectedSeegaIdx, setSelectedSeegaIdx] = useState<number>(0);

  // Chapter 19-21: Particle cases
  const [selectedParticle, setSelectedParticle] = useState<'fi' | 'ala' | 'min' | 'inna' | 'wa'>('fi');
  const [targetWord, setTargetWord] = useState<'bait' | 'masjid' | 'zaid'>('bait');

  // Stepper state for Chapter 17 Amr Command derivation
  const [amrStep, setAmrStep] = useState(0);

  // States for Chapter 11 Jumlah Fi'liyyah Assembler
  const [vVerb, setVVerb] = useState<'khalaqa' | 'nasara' | 'daraba'>('khalaqa');
  const [vSubject, setVSubject] = useState<'allah' | 'zaid' | 'teacher'>('allah');
  const [vObject, setVObject] = useState<'insan' | 'amr' | 'student'>('insan');

  // States for Chapter 12 Visible Agent singulariser
  const [vaSubjectGender, setVaSubjectGender] = useState<'masc' | 'fem'>('masc');
  const [vaSubjectPlurality, setVaSubjectPlurality] = useState<'sing' | 'dual' | 'plur'>('sing');

  // States for Chapter 13 Hidden Agent Pronoun scanner
  const [scannedVerb, setScannedVerb] = useState<'zahaba' | 'zahabat' | 'zahaboo' | 'zahabna'>('zahaba');

  // States for Chapter 14 Prefix Mudari Attacher
  const [mudariSubject, setMudariSubject] = useState<'he' | 'she' | 'you_m' | 'i' | 'we'>('he');

  // States for Chapter 15 Particle Mood Shifter
  const [msParticle, setMsParticle] = useState<'none' | 'lan' | 'lam'>('none');

  // States for Chapter 16 Bab Middle-Vowel Selector
  const [activeBab, setActiveBab] = useState<number>(0);

  // States for Chapter 18 Nahy Operator Board
  const [nahyProhibition, setNahyProhibition] = useState<boolean>(true);

  // States for Chapter 20 Atf Conjunction Connector
  const [atfConjunction, setAtfConjunction] = useState<'wa' | 'fa' | 'thumma'>('wa');
  const [atfCase, setAtfCase] = useState<'nominative' | 'accusative' | 'genitive'>('nominative');

  // Show reward XP on successful conversion
  const triggerSuccess = (text: string) => {
    setMsg({ text, type: 'success' });
    setXp(prev => prev + 15);
    setTimeout(() => {
      setMsg(prev => prev.text === text ? { text: '', type: '' } : prev);
    }, 4500);
  };

  const cleanSpace = (str: string) => str.replace(/ /g, '-');

  const getAnatomyBreakdown = (item: ConjugationItem, tense: string, root: string) => {
    const rootsMap: Record<string, string> = {
      kataba: 'ك - ت - ب (To Write)',
      nasara: 'ن - ص - ر (To Help)',
      zahaba: 'ذ - هـ - ب (To Go)',
      jalasa: 'ج - ل - س (To Sit)'
    };
    const activeLetters = rootsMap[root] || rootsMap.kataba;

    let prefix = '—';
    let suffix = '—';
    let ruleDesc = '';

    if (tense === 'madi') {
      prefix = '—';
      if (item.pronoun === 'هُوَ') suffix = 'None (Base verb)';
      else if (item.pronoun === 'هُمَا' && item.class.includes('Masc')) suffix = 'ـَا (Alif of Dual)';
      else if (item.pronoun === 'هُمْ') suffix = 'ـُوا (Waw of Plural & silent Alif)';
      else if (item.pronoun === 'هِيَ') suffix = 'ـَتْ (Ta of Femininity)';
      else if (item.pronoun === 'هُمَا' && item.class.includes('Fem')) suffix = 'ـَتَا (Feminine Ta + Dual Alif)';
      else if (item.pronoun === 'هُنَّ') suffix = 'ـْنَ (Noon of Plural Female)';
      else if (item.pronoun === 'أَنْتَ') suffix = 'ـْتَ (Tā of 2nd Person Male Singular)';
      else if (item.pronoun === 'أَنْتُمَا') suffix = 'ـْتُمَا (Tumaa of 2nd Person Dual)';
      else if (item.pronoun === 'أَنْتُمْ') suffix = 'ـْتُمْ (Tum of 2nd Person Male Plural)';
      else if (item.pronoun === 'أَنْتِ') suffix = 'ـْتِ (Tee of 2nd Person Female Singular)';
      else if (item.pronoun === 'أَنْتُنَّ') suffix = 'ـْتُنَّ (Tunna of 2nd Person Female Plural)';
      else if (item.pronoun === 'أَنَا') suffix = 'ـْتُ (Too of 1st Person Singular)';
      else if (item.pronoun === 'نَحْنُ') suffix = 'ـْنَا (Naa of 1st Person Plural)';

      ruleDesc = `Past Tense (Māḍī) conjugations are formed strictly by appending suffix pronoun attachments to the end of the 3-letter active root. Note how the third root letter gets a silent Sukoon when attaching suffixes starting with Consonants!`;
    } else if (tense === 'mudari') {
      if (item.pronoun === 'هُوَ' || (item.pronoun === 'هُمَا' && item.class.includes('Masc')) || item.pronoun === 'هُمْ' || item.pronoun === 'هُنَّ') {
        prefix = 'يَـ (Yaa)';
      } else if (item.pronoun === 'أَنَا') {
        prefix = 'أَ (Hamza)';
      } else if (item.pronoun === 'نَحْنُ') {
        prefix = 'نَـ (Noon)';
      } else {
        prefix = 'تَـ (Taa)';
      }

      if (item.pronoun === 'هُمَا' || item.pronoun === 'أَنْتُمَا') suffix = 'ـَانِ (Alif of Dual + Noon of state)';
      else if (item.pronoun === 'هُمْ' || item.pronoun === 'أَنْتُمْ') suffix = 'ـُونَ (Waw of Plural + Noon of state)';
      else if (item.pronoun === 'هُنَّ' || item.pronoun === 'أَنْتُنَّ') suffix = 'ـْنَ (Noon of Plural Female)';
      else if (item.pronoun === 'أَنْتِ') suffix = 'ـِينَ (Yaa of 2nd Person Fem + Noon of state)';
      else suffix = 'None (Standard Damma ending)';

      ruleDesc = `Present Tense (Muḍāri‘) forms utilize both a front prefix (from the أَتَيْنَ set) and a trailing suffix to denote number and gender. Nouns ending in Noon (ن) are in the standard indicative (Marfoo‘) state!`;
    } else if (tense === 'amr') {
      if (item.pronoun.match(/أَنْت/)) {
        prefix = root === 'kataba' || root === 'nasara' ? 'أُ (Helping Hamza with Damma)' : 'اِ (Helping Hamza with Kasra)';
        if (item.pronoun === 'أَنْتَ') suffix = 'ـْ (Silent Sukoon)';
        else if (item.pronoun === 'أَنْتُمَا') suffix = 'ـَا (Aani suffix - Noon dropped in Jussive)';
        else if (item.pronoun === 'أَنْتُمْ') suffix = 'ـُوا (Oona suffix - Noon dropped in Jussive)';
        else if (item.pronoun === 'أَنْتِ') suffix = 'ـِي (Eena suffix - Noon dropped in Jussive)';
        else if (item.pronoun === 'أَنْتُنَّ') suffix = 'ـْنَ (Noon of Femininity)';
        ruleDesc = `Direct Imperatives (for 2nd Person) are built by dropping the present prefix 'Tā', adding a helping Hamzatul Wasl, and putting the ending into the Jussive state (Sukoon or dropping of Noon).`;
      } else {
        prefix = 'لِـ (Lām of Command)';
        if (item.pronoun === 'هُوَ' || item.pronoun === 'هِيَ' || item.pronoun === 'أَنَا' || item.pronoun === 'نَحْنُ') suffix = 'ـْ (Silent Sukoon Jussive)';
        else if (item.pronoun === 'هُنَّ') suffix = 'ـْنَ (Noon of Femininity)';
        else suffix = '— (Noon dropped in Jussive)';
        ruleDesc = `Indirect Command (for 1st and 3rd Person) is formed by prepending the 'Lām al-Amr' (لِـ) with a kasrah to the present tense verb, pulling the ending into Jussive (Majzoom).`;
      }
    } else if (tense === 'nahy') {
      if (item.pronoun === 'هُوَ' || (item.pronoun === 'هُمَا' && item.class.includes('Masc')) || item.pronoun === 'هُمْ' || item.pronoun === 'هُنَّ') {
        prefix = 'لَا (La of Prohibition) + يَـ';
      } else if (item.pronoun === 'أَنَا') {
        prefix = 'لَا (La of Prohibition) + أَ';
      } else if (item.pronoun === 'نَحْنُ') {
        prefix = 'لَا (La of Prohibition) + نَـ';
      } else {
        prefix = 'لَا (La of Prohibition) + تَـ';
      }

      if (item.pronoun === 'هُوَ' || item.pronoun === 'هِيَ' || item.pronoun === 'أَنْتَ' || item.pronoun === 'أَنَا' || item.pronoun === 'نَحْنُ') suffix = 'ـْ (Silent Sukoon Jussive)';
      else if (item.pronoun === 'هُنَّ' || item.pronoun === 'أَنْتُنَّ') suffix = 'ـْنَ (Noon of Femininity)';
      else suffix = '— (Noon dropped in Jussive)';

      ruleDesc = `Prohibition (Do not!) is formed by placing 'Lā al-Nāhiyah' (لَا) before the present tense, driving the verb into its Jussive (Majzoom) state: final Damma becomes Sukoon, and flexible ending Noons are dropped.`;
    }

    return { prefix, activeLetters, suffix, ruleDesc };
  };

  const renderVerbConjugationLab = () => {
    const list = verbConjugationData[verbRoot]?.[verbTense] || [];
    const activeItem = list[selectedSeegaIdx] || list[0] || {} as any;
    const anatomy = getAnatomyBreakdown(activeItem, verbTense, verbRoot);

    const rootsMap: Record<string, string> = {
      kataba: 'To Write',
      nasara: 'To Help',
      zahaba: 'To Go',
      jalasa: 'To Sit'
    };

    const tensesMap: Record<string, string> = {
      madi: 'Māḍī (Past Tense)',
      mudari: 'Muḍāri‘ (Present)',
      amr: 'Al-Amr (Imperative)',
      nahy: 'An-Nahy (Prohibition)'
    };

    return (
      <div className="space-y-6">
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-150 shadow-sm flex flex-col xl:flex-row gap-5 justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-md text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Live Interactive Verb Lab
            </span>
            <h3 className="text-base font-bold text-slate-800 font-sans">Master 14-Seega Conjugator Dashboard</h3>
            <p className="text-xs text-slate-500 max-w-2xl font-sans mt-0.5">
              Select any root verb and grammatical tense/operator. Click on any of the 14 standard seega forms in the grid to view its morphological anatomy!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 self-start xl:self-center">
            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-455 font-sans">Active Verb Root</label>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                {Object.entries(rootsMap).map(([k, label]) => (
                  <button
                    key={k}
                    onClick={() => {
                      setVerbRoot(k as any);
                      triggerSuccess(`Switched active verb root to "${label}" !`);
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all ${verbRoot === k ? 'bg-white shadow text-slate-900 border border-slate-200/50' : 'text-slate-505 hover:text-slate-800'}`}
                  >
                    {k === 'kataba' ? 'كَتَبَ' : k === 'nasara' ? 'نَصَرَ' : k === 'zahaba' ? 'ذَهَبَ' : 'جَلَسَ'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-455 font-sans">Active Tense/Operator</label>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                {Object.entries(tensesMap).map(([t, label]) => (
                  <button
                    key={t}
                    onClick={() => {
                      setVerbTense(t as any);
                      triggerSuccess(`Switched conjugation tense to "${label}" !`);
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all ${verbTense === t ? 'bg-slate-850 text-white shadow' : 'text-slate-505 hover:text-slate-850'}`}
                  >
                    {t === 'madi' ? 'Māḍī' : t === 'mudari' ? 'Muḍāri‘' : t === 'amr' ? 'Amr' : 'Nahy'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-5">
            {['3rd Person (Absent)', '2nd Person (Addressed)', '1st Person (Speaker)'].map((groupLabel) => {
              const groupLabelShort = groupLabel.includes('3rd') ? '3rd Person (Absent - الغائب)' : groupLabel.includes('2nd') ? '2nd Person (Addressed - الحاضر)' : '1st Person (Speaker - المتكلم)';
              
              const groupItems = list.filter((item) => {
                if (groupLabel.includes('3rd')) return item.class.includes('3rd');
                if (groupLabel.includes('2nd')) return item.class.includes('2nd');
                return item.class.includes('1st');
              });

              return (
                <div key={groupLabel} className="bg-white border border-slate-150 rounded-2xl p-4 shadow-2xs space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <span className="text-xs font-black uppercase text-slate-450 tracking-wider font-sans">{groupLabelShort}</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-55/65 px-2 py-0.5 rounded-full">{groupItems.length} Seegas</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {groupItems.map((item) => {
                      const absoluteIndex = list.findIndex(li => li.pronoun === item.pronoun && li.class === item.class);
                      const isSelected = selectedSeegaIdx === absoluteIndex;

                      return (
                        <button
                          key={`${item.pronoun}-${item.class}`}
                          onClick={() => {
                            setSelectedSeegaIdx(absoluteIndex);
                            triggerSuccess(`Selected ${item.pronoun} seega: ${item.arabic}!`);
                          }}
                          className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50/45 border-emerald-400 shadow-xs ring-1 ring-emerald-300'
                              : 'bg-slate-50/50 border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-xs bg-slate-200 py-0.5 px-2 rounded-md text-slate-705">{item.pronoun}</span>
                              <span className="text-[10px] text-slate-450 font-medium font-sans">({item.pronounEng.split(' ')[0]})</span>
                            </div>
                            <span className="block text-[10px] font-mono font-medium text-slate-400 capitalize mt-0.5">
                              {item.class.replace('Person', '').replace('(', '').replace(')', '').trim()} • {item.countType}
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="font-serif text-2xl font-bold block text-slate-850 leading-none">
                              {item.arabic}
                            </span>
                            <span className="block text-[9.5px] text-slate-450 font-semibold font-mono mt-1">
                              /{item.translit}/
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-md">
              <div className="pb-3 border-b border-slate-800 mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-400 font-mono">SEÉGA ANATOMY INSPECTOR</span>
                  <h4 className="text-sm font-bold text-slate-100 mt-0.5">Morphological Breakdown</h4>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center my-4 space-y-2">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Selected Seega Conjugation</span>
                <span className="font-serif text-4xl font-extrabold block text-emerald-400 tracking-wide select-all leading-normal py-1">
                  {activeItem.arabic}
                </span>
                <span className="text-xs text-slate-300 block font-mono">Pronunciation: <strong className="font-sans">/{activeItem.translit}/</strong></span>
                <div className="inline-block bg-slate-805 px-3 py-1 rounded text-[11px] text-amber-300 font-semibold mt-1">
                  Meaning: "{activeItem.meaning}"
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-12 gap-2 border-b border-slate-800/60 pb-2">
                  <span className="col-span-4 text-slate-450 font-bold uppercase text-[10px] font-mono">Pronoun</span>
                  <span className="col-span-8 text-slate-200 font-extrabold">{activeItem.pronoun} ({activeItem.pronounEng})</span>
                </div>

                <div className="grid grid-cols-12 gap-2 border-b border-slate-800/60 pb-2">
                  <span className="col-span-4 text-slate-450 font-bold uppercase text-[10px] font-mono">Root Letters</span>
                  <span className="col-span-8 font-serif text-sm font-black text-emerald-400 tracking-wider">
                    {anatomy.activeLetters}
                  </span>
                </div>

                <div className="grid grid-cols-12 gap-2 border-b border-slate-800/60 pb-2">
                  <span className="col-span-4 text-slate-450 font-bold uppercase text-[10px] font-mono">Prefix Added</span>
                  <span className="col-span-8 text-slate-200 font-medium">{anatomy.prefix}</span>
                </div>

                <div className="grid grid-cols-12 gap-2 border-b border-slate-800/60 pb-2">
                  <span className="col-span-4 text-slate-450 font-bold uppercase text-[10px] font-mono">Suffix Added</span>
                  <span className="col-span-8 text-slate-200 font-medium">{anatomy.suffix}</span>
                </div>

                <div className="grid grid-cols-12 gap-2 pb-1">
                  <span className="col-span-4 text-slate-450 font-bold uppercase text-[10px] font-mono">Classification</span>
                  <span className="col-span-8 text-slate-200 font-mono text-[10px]">
                    {activeItem.class} • {activeItem.countType}
                  </span>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-800 rounded-xl p-3.5 mt-5 text-[11px] text-slate-300 leading-relaxed font-sans">
                <strong className="text-amber-400 text-xs block mb-1">💡 Darul Uloom Morphological Rule:</strong>
                {anatomy.ruleDesc}
              </div>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 text-emerald-950">
              <div className="flex items-center gap-2 mb-1.5">
                <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-emerald-900">Interactive Classroom Tip</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Try switching between Māḍī, Muḍāri‘, Amr, and Nahy while keeping the same verb selected to view how root letters shift endings from general nominative (Damma) into commanding jussive forms!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Master selector of focus modules by active slug
  const renderFocusLabContent = () => {
    const slug = chapter.slug;

    if (slug === 'fil-the-verb' || slug === 'what-is-mudari' || slug === 'al-amr-command' || slug === 'an-nahy-negative') {
      return renderVerbConjugationLab();
    }

    // CHAPTER 1: muzakkar-and-muannas
    if (slug === 'muzakkar-and-muannas') {
      const isWordFeminine = isFeminine;
      const maleForms: Record<string, string> = {
        'طَالِبٌ': 'طَالِبَةٌ',
        'مُعَلِّمٌ': 'مُعَلِّمَةٌ',
        'مُسْلِمٌ': 'مُسْلِمَةٌ',
        'صَادِقٌ': 'صَادِقَةٌ',
        'كَاتِبٌ': 'كَاتِبَةٌ'
      };
      const phoneticMale: Record<string, string> = {
        'طَالِبٌ': 'Taalibun',
        'مُعَلِّمٌ': 'Mu\'allimun',
        'مُسْلِمٌ': 'Muslimun',
        'صَادِقٌ': 'Saadiqun',
        'كَاتِبٌ': 'Kaatibun'
      };
      const phoneticFemale: Record<string, string> = {
        'طَالِبٌ': 'Taalibatun',
        'مُعَلِّمٌ': 'Mu\'allimatun',
        'مُسْلِمٌ': 'Muslimatun',
        'صَادِقٌ': 'Saadiqatun',
        'كَاتِبٌ': 'Kaatibatun'
      };

      const baseWord = gWord;
      const currentArabic = isWordFeminine ? (maleForms[baseWord] || baseWord) : baseWord;
      const currentPhonetics = isWordFeminine ? (phoneticFemale[baseWord] || '') : (phoneticMale[baseWord] || '');

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-100 flex flex-col md:flex-row gap-5 justify-between">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block">GRAMMAR WORKBENCH</span>
              <h3 className="text-base font-bold text-slate-800 font-sans">The Ta Marbuta (ة) Attacher</h3>
              <p className="text-xs text-slate-500 max-w-lg">
                Select a masculine noun to see how the famous feminine identifier — <strong className="font-serif text-slate-800">Ta Marbuta (ة)</strong> — attaches to the end, while transforming the previous letter’s vowel sound into a Fatha.
              </p>
            </div>
            <div className="flex gap-2 shrink-0 self-start md:self-center">
              {['طَالِبٌ', 'مُعَلِّمٌ', 'مُسْلِمٌ', 'صَادِقٌ'].map((w) => (
                <button
                  key={w}
                  onClick={() => {
                    setGWord(w);
                    triggerSuccess(`Selected ${w === 'طَالِبٌ' ? 'Student' : w === 'مُعَلِّمٌ' ? 'Teacher' : w === 'مُسْلِمٌ' ? 'Muslim' : 'Truthful'}! Now toggle gender state!`);
                  }}
                  className={`px-3 py-2 text-xs rounded-lg font-bold border transition-all cursor-pointer ${
                    gWord === w ? 'bg-emerald-50 text-emerald-800 border-emerald-400' : 'bg-white text-slate-600 border-slate-100'
                  }`}
                >
                  <span className="font-serif text-sm block">{w}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Display Screen */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-sm min-h-[180px]">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold">Active Vocalisation</span>
              <div className="inline-block bg-white/5 border border-white/10 px-8 py-5 rounded-2xl">
                <span className="font-serif text-4xl sm:text-5xl font-black block tracking-wide select-all text-emerald-400 transition-all transform duration-300">
                  {currentArabic}
                </span>
                <span className="text-xs text-slate-300 block mt-2 font-mono">/{currentPhonetics}/</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-slate-850 px-2.5 py-1 rounded-md text-slate-400 border border-slate-800">
                  Gender: <strong className={isWordFeminine ? "text-emerald-400" : "text-sky-400"}>{isWordFeminine ? "Feminine (Muannas)" : "Masculine (Muzakkar)"}</strong>
                </span>
              </div>
            </div>

            {/* Interaction Box */}
            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-xs">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">1. Select Destination Gender</h4>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => {
                      setIsFeminine(false);
                      triggerSuccess('Restored to standard masculine root structure!');
                    }}
                    className={`flex-1 py-2 font-bold text-xs rounded-lg transition-all cursor-pointer ${
                      !isWordFeminine ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Masculine (Muzakkar)
                  </button>
                  <button
                    onClick={() => {
                      setIsFeminine(true);
                      triggerSuccess('Successfully appended Ta Marbuta! Middle vowel changed to Fatha.');
                    }}
                    className={`flex-1 py-2 font-bold text-xs rounded-lg transition-all cursor-pointer ${
                      isWordFeminine ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-emerald-700'
                    }`}
                  >
                    Feminine (Muannas) ♀
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 text-amber-900">
                <h5 className="text-[10px] font-black uppercase tracking-wider mb-1 text-amber-800 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-amber-600" />
                  Irregular Exceptions Explorer
                </h5>
                <p className="text-[11px] text-amber-800 leading-relaxed font-sans">
                  Be careful! Words like <span className="font-serif font-black text-sm text-slate-800">أُمٌّ</span> (Mother), <span className="font-serif font-black text-sm text-slate-800">شَمْسٌ</span> (Sun), and <span className="font-serif font-black text-sm text-slate-800">أَرْضٌ</span> (Earth) do NOT have a Ta Marbuta but are treated as <span className="font-bold">Feminine</span> by usage!
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 2: numbers-in-arabic
    if (slug === 'numbers-in-arabic') {
      const data: Record<string, { base: string; eng: string; dual: string; plur: string; type: string }> = {
        muslim: { base: 'مُسْلِمٌ', eng: 'Muslim Man', dual: 'مُسْلِمَانِ', plur: 'مُسْلِمُونَ', type: 'Sound Masculine Plural (ـُونَ)' },
        car: { base: 'سَيَّارَةٌ', eng: 'Car', dual: 'سَيَّارَتَانِ', plur: 'سَيَّارَاتٌ', type: 'Sound Feminine Plural (ـَاتٌ)' },
        book: { base: 'كِتَابٌ', eng: 'Book', dual: 'كِتَابَانِ', plur: 'كُتُبٌ', type: 'Broken Irregular Plural (Imperfect)' }
      };

      const selected = data[numWord];
      let currentArabic = selected.base;
      if (numberState === 'dual') currentArabic = selected.dual;
      if (numberState === 'plural') currentArabic = selected.plur;

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-100 flex flex-col md:flex-row gap-5 justify-between">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block">GRAMMAR WORKBENCH</span>
              <h3 className="text-base font-bold text-slate-800 font-sans">Sufix Dual & Plural Modulator</h3>
              <p className="text-xs text-slate-500 max-w-lg">
                Observe the suffix rules. Dual endings append <strong className="font-serif text-slate-800">ـَانِ</strong>. Sound plurals append <strong className="font-serif text-slate-800">ـُونَ</strong> for males or <strong className="font-serif text-slate-800">ـَاتٌ</strong> for females. Broken plurals shift in inner vowels.
              </p>
            </div>
            <div className="flex gap-2 shrink-0 self-start md:self-center">
              <button
                onClick={() => { setNumWord('muslim'); triggerSuccess('Selected "Muslim" - sound masculine pattern!'); }}
                className={`px-3 py-2 text-xs rounded-lg font-bold border transition-all cursor-pointer ${
                  numWord === 'muslim' ? 'bg-emerald-50 text-emerald-800 border-emerald-400' : 'bg-white text-slate-600 border-slate-100'
                }`}
              >
                مُسْلِمٌ (Muslim)
              </button>
              <button
                onClick={() => { setNumWord('car'); triggerSuccess('Selected "Car" - sound feminine pattern!'); }}
                className={`px-3 py-2 text-xs rounded-lg font-bold border transition-all cursor-pointer ${
                  numWord === 'car' ? 'bg-emerald-50 text-emerald-800 border-emerald-400' : 'bg-white text-slate-600 border-slate-100'
                }`}
              >
                سَيَّارَةٌ (Car)
              </button>
              <button
                onClick={() => { setNumWord('book'); triggerSuccess('Selected "Book" - broken plural pattern!'); }}
                className={`px-3 py-2 text-xs rounded-lg font-bold border transition-all cursor-pointer ${
                  numWord === 'book' ? 'bg-emerald-50 text-emerald-800 border-emerald-400' : 'bg-white text-slate-600 border-slate-100'
                }`}
              >
                كِتَابٌ (Book)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 min-h-[180px]">
              <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-extrabold font-mono">Live Ending Output</span>
              <div className="inline-block bg-white/5 border border-white/10 px-8 py-5 rounded-2xl">
                <span className="font-serif text-4.5xl font-black block tracking-wide text-emerald-400">
                  {currentArabic}
                </span>
                <span className="text-xs text-slate-300 block mt-2">
                  Meaning: <strong className="text-white">{numberState === 'singular' ? selected.eng : numberState === 'dual' ? `Two ${selected.eng}s` : `Multiple ${selected.eng}s`}</strong>
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Suffix Category: {numberState === 'plural' ? selected.type : numberState === 'dual' ? 'Dual (Katha Ending)' : 'Base Singular'}</p>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">2. Choose Multiplicity state</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => { setNumberState('singular'); triggerSuccess('Selected Singular form!'); }}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      numberState === 'singular' ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-600 border-slate-100'
                    }`}
                  >
                    Singular (Mufrad)
                  </button>
                  <button
                    onClick={() => { setNumberState('dual'); triggerSuccess('Selected Dual form! Added aani suffix.'); }}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      numberState === 'dual' ? 'bg-emerald-700 text-white' : 'bg-slate-50 text-slate-600 border-slate-100'
                    }`}
                  >
                    Dual (Tathniyah)
                  </button>
                  <button
                    onClick={() => { setNumberState('plural'); triggerSuccess('Selected Plural form!'); }}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      numberState === 'plural' ? 'bg-teal-700 text-white' : 'bg-slate-50 text-slate-600 border-slate-100'
                    }`}
                  >
                    Plural (Jam‘)
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-xs text-slate-600 leading-relaxed font-sans">
                <strong>Grammar Secret:</strong> Unlike English which only has singular & plural, Arabic has a dedicated <strong>Dual state</strong> for exactly 2 objects, utilizing a non-collapsing vocal vowel case ending!
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 3: ism-e-ishara
    if (slug === 'ism-e-ishara') {
      // Pointer calculation (taking non-human plural rule into account!)
      let ishara = 'هَذَا';
      let translit = 'haadhaa';
      let pronounTypeEng = ''; 
      let isNonHumanPluralOverride = false;

      if (isharaNounType === 'nonhuman' && isharaCount === 'plur') {
        isNonHumanPluralOverride = true;
        if (isharaDist === 'near') {
          ishara = 'هَذِهِ';
          translit = 'haadihi';
          pronounTypeEng = 'Singular Feminine pointer (هَذِهِ) acting as "These" for Non-Human Plural';
        } else {
          ishara = 'تِلْكَ';
          translit = 'tilka';
          pronounTypeEng = 'Singular Feminine pointer (تِلْكَ) acting as "Those" for Non-Human Plural';
        }
      } else {
        if (isharaDist === 'near') {
          if (isharaGender === 'masc') {
            if (isharaCount === 'sing') { ishara = 'هَذَا'; translit = 'haadhaa'; pronounTypeEng = 'Near Singular Masculine'; }
            else if (isharaCount === 'dual') { ishara = 'هَذَانِ'; translit = 'haadhaani'; pronounTypeEng = 'Near Dual Masculine'; }
            else { ishara = 'هَؤُلَاءِ'; translit = 'haa-ulaa-i'; pronounTypeEng = 'Near Plural Masculine'; }
          } else {
            if (isharaCount === 'sing') { ishara = 'هَذِهِ'; translit = 'haadihi'; pronounTypeEng = 'Near Singular Feminine'; }
            else if (isharaCount === 'dual') { ishara = 'هَاتَانِ'; translit = 'haataani'; pronounTypeEng = 'Near Dual Feminine'; }
            else { ishara = 'هَؤُلَاءِ'; translit = 'haa-ulaa-i'; pronounTypeEng = 'Near Plural Feminine'; }
          }
        } else {
          if (isharaGender === 'masc') {
            if (isharaCount === 'sing') { ishara = 'ذَلِكَ'; translit = 'daalika'; pronounTypeEng = 'Far Singular Masculine'; }
            else if (isharaCount === 'dual') { ishara = 'ذَانِكَ'; translit = 'daanika'; pronounTypeEng = 'Far Dual Masculine'; }
            else { ishara = 'أُولَئِكَ'; translit = 'ulaa-ika'; pronounTypeEng = 'Far Plural Masculine'; }
          } else {
            if (isharaCount === 'sing') { ishara = 'تِلْكَ'; translit = 'tilka'; pronounTypeEng = 'Far Singular Feminine'; }
            else if (isharaCount === 'dual') { ishara = 'تَاْنِكَ'; translit = 'taanika'; pronounTypeEng = 'Far Dual Feminine'; }
            else { ishara = 'أُولَئِكَ'; translit = 'ulaa-ika'; pronounTypeEng = 'Far Plural Feminine'; }
          }
        }
      }

      // Calculate Musharun Ilaih (the pointed noun)
      let mushar = '';
      let musharTranslit = '';
      let musharEng = '';
      let phraseMeaning = '';

      if (isharaNounType === 'human') {
        if (isharaGender === 'masc') {
          musharEng = isharaCount === 'sing' ? 'the student' : isharaCount === 'dual' ? 'the two students' : 'the students';
          if (isharaCount === 'sing') { mushar = 'الطَّالِبُ'; musharTranslit = 'at-taalibu'; }
          else if (isharaCount === 'dual') { mushar = 'الطَّالِبَانِ'; musharTranslit = 'at-taalibaani'; }
          else { mushar = 'الطُّلَّابُ'; musharTranslit = 'at-tullaabu'; }
        } else {
          musharEng = isharaCount === 'sing' ? 'the female student' : isharaCount === 'dual' ? 'the two female students' : 'the female students';
          if (isharaCount === 'sing') { mushar = 'الطَّالِبَةُ'; musharTranslit = 'at-taalibatu'; }
          else if (isharaCount === 'dual') { mushar = 'الطَّالِبَتَانِ'; musharTranslit = 'at-taalibataani'; }
          else { mushar = 'الطَّالِبَاتُ'; musharTranslit = 'at-taalibaatu'; }
        }
      } else { // nonhuman
        if (isharaGender === 'masc') {
          musharEng = isharaCount === 'sing' ? 'the book' : isharaCount === 'dual' ? 'the two books' : 'the books';
          if (isharaCount === 'sing') { mushar = 'الْكِتَابُ'; musharTranslit = 'al-kitaabu'; }
          else if (isharaCount === 'dual') { mushar = 'الْكِتَابَانِ'; musharTranslit = 'al-kitaabaani'; }
          else { mushar = 'الْكُتُبُ'; musharTranslit = 'al-kutubu'; }
        } else {
          musharEng = isharaCount === 'sing' ? 'the school' : isharaCount === 'dual' ? 'the two schools' : 'the schools';
          if (isharaCount === 'sing') { mushar = 'الْمَدْرَسَةُ'; musharTranslit = 'al-madrasatu'; }
          else if (isharaCount === 'dual') { mushar = 'الْمَدْرَسَتَانِ'; musharTranslit = 'al-madrasataani'; }
          else { mushar = 'الْمَدَارِسُ'; musharTranslit = 'al-madaarisu'; }
        }
      }

      // Compute phrase meaning: Pointing word + "the noun"
      const distWord = isharaDist === 'near' ? 'This' : 'That';
      const distPlurWord = isharaDist === 'near' ? 'These' : 'Those';
      if (isharaCount === 'sing') {
        phraseMeaning = `${distWord} ${musharEng.replace('the ', '')}`;
      } else if (isharaCount === 'dual') {
        phraseMeaning = `${distPlurWord} two ${musharEng.replace('the two ', '')}`;
      } else {
        phraseMeaning = `${distPlurWord} ${musharEng.replace('the ', '')}`;
      }

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-1">INTERACTIVE LAB</span>
            <h3 className="text-base font-bold text-slate-800">Ism-e-Ishāra & Mushārun Ilayh Dashboard</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
              Form elegant demonstrative phrases (Murakkab-e-Ishārī). Pair an <strong>Ism-e-Ishāra</strong> (pointer) with its correct matching definite <strong>Mushārun Ilayh</strong> (the object pointed to)!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Control Panel */}
            <div className="lg:col-span-4 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">1. Pointer Distance</label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => { setIsharaDist('near'); triggerSuccess('Selected Near Pointer (This/These)'); }} className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${isharaDist === 'near' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>Near (هٰذَا...)</button>
                  <button onClick={() => { setIsharaDist('far'); triggerSuccess('Selected Far Pointer (That/Those)'); }} className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${isharaDist === 'far' ? 'bg-white shadow-sm text-emerald-800' : 'text-slate-500 hover:text-slate-700'}`}>Far (ذٰلِكَ...)</button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">2. Vowel-Case Gender</label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => { setIsharaGender('masc'); triggerSuccess('Set gender to Masculine!'); }} className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${isharaGender === 'masc' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500/80 hover:text-slate-700'}`}>Masculine</button>
                  <button onClick={() => { setIsharaGender('fem'); triggerSuccess('Set gender to Feminine!'); }} className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${isharaGender === 'fem' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500/80 hover:text-slate-700'}`}>Feminine</button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">3. Number (Multiplicity)</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => { setIsharaCount('sing'); triggerSuccess('Selected Singular form!'); }} className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${isharaCount === 'sing' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>1 (Sing)</button>
                  <button onClick={() => { setIsharaCount('dual'); triggerSuccess('Selected Dual form!'); }} className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${isharaCount === 'dual' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>2 (Dual)</button>
                  <button onClick={() => { setIsharaCount('plur'); triggerSuccess('Selected Plural form!'); }} className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${isharaCount === 'plur' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>3+ (Plur)</button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">4. Mushārun Ilayh Noun Category</label>
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button onClick={() => { setIsharaNounType('human'); triggerSuccess('Merged with Human nouns (e.g. Student)!'); }} className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${isharaNounType === 'human' ? 'bg-slate-850 text-white shadow' : 'text-slate-505 hover:text-slate-800'}`}>
                    Human ({isharaGender === 'masc' ? 'الطَّالِبُ' : 'الطَّالِبَةُ'})
                  </button>
                  <button onClick={() => { setIsharaNounType('nonhuman'); triggerSuccess('Merged with Non-Human nouns (e.g. Book/School)!'); }} className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${isharaNounType === 'nonhuman' ? 'bg-slate-850 text-white shadow' : 'text-slate-505 hover:text-slate-800'}`}>
                    Non-Human ({isharaGender === 'masc' ? 'الْكِتَابُ' : 'الْمَدْرَسَةُ'})
                  </button>
                </div>
              </div>
            </div>

            {/* Live Result Panel */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-lg">
              <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-4">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono font-bold">Interactive Phrase Composer</span>
                  <h4 className="text-xs font-sans text-slate-300 mt-1">Combining the Demonstrative & Noun</h4>
                </div>
                <span className="text-[10px] text-amber-300 bg-white/5 px-2.5 py-1 rounded border border-white/10 font-mono">
                  {pronounTypeEng}
                </span>
              </div>

              {/* Formula Visualisation */}
              <div className="grid grid-cols-1 sm:grid-cols-5 items-center gap-4 text-center my-4 py-2">
                {/* Ism-e-Ishara */}
                <div className="sm:col-span-1.5 bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[9px] text-slate-400 font-mono block">Ism-e-Ishāra</span>
                  <span className="font-serif text-3xl font-extrabold block text-slate-200 mt-1 leading-normal">
                    {ishara}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block mt-1">/{translit}/</span>
                </div>

                <div className="text-xl font-bold text-slate-500 font-mono sm:col-span-0.5 shrink-0">+</div>

                {/* Musharun Ilaih */}
                <div className="sm:col-span-1.5 bg-white/5 border border-white/10 p-3 rounded-xl">
                  <span className="text-[9px] text-slate-400 font-mono block">Mushārun Ilayh</span>
                  <span className="font-serif text-3xl font-extrabold block text-slate-200 mt-1 leading-normal">
                    {mushar}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block mt-1">/{musharTranslit}/</span>
                </div>

                <div className="text-xl font-bold text-emerald-500 font-mono sm:col-span-0.5 shrink-0">=</div>

                {/* Combined Murakkab */}
                <div className="sm:col-span-1.5 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl ring-1 ring-emerald-500/30">
                  <span className="text-[10px] text-emerald-400 font-mono block font-bold">Murakkab-e-Ishārī</span>
                  <span className="font-serif text-3xl font-black block text-emerald-300 mt-1 leading-normal">
                    {ishara} {mushar}
                  </span>
                  <span className="text-xs text-emerald-200 font-bold block mt-1">
                    "{phraseMeaning}"
                  </span>
                </div>
              </div>

              {/* Grammar Guidelines / Special rules */}
              <div className="bg-slate-850 border border-slate-800 rounded-xl p-4 mt-4 text-xs text-slate-300 leading-relaxed font-sans">
                {isNonHumanPluralOverride ? (
                  <div className="space-y-1.5">
                    <strong className="text-amber-400 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4 text-amber-400 animate-bounce" />
                      GOLDEN RULE SHIFT: Non-Human Plural Exception (جَمْع غَيْر عاقِل)
                    </strong>
                    <p className="font-sans text-[11px] text-slate-200">
                      We pointed to the plural noun <strong className="text-white font-serif text-base">{mushar}</strong> (Books/Schools). Human plurals use the plural pointer <strong className="text-white font-serif">{isharaGender === 'masc' ? 'هَؤُلَاءِ' : 'هَؤُلَاءِ'}</strong>, but <strong>Non-Human Plurals are treated grammatically as Singular Feminine (مفرد مؤنث)</strong>! Therefore, the pointer elegantly shifted to <strong className="text-amber-300 font-serif text-sm">{ishara}</strong>!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <strong className="text-emerald-400">💡 Darul Uloom Syntax Guideline:</strong>
                    <p className="font-sans text-[11px] text-slate-250">
                      To build a pointing phrase (This Book, That Student), the <strong>Mushārun Ilayh</strong> must always carry the definite prefix <strong>Al- (الـ)</strong>. If Al- was omitted, it would instead form a full sentence: "{ishara} {mushar.replace('ال', '')}" meaning "This is a {musharEng.replace('the ', '')}". Try pointing to other nouns!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 4: dhama-ir-pronouns
    if (slug === 'dhama-ir-pronouns') {
      const separatePronouns = [
        { arab: 'هُوَ', eng: 'He (Singular M)', attached: 'ـهُ', suffix: 'hu', title: '3rd Person (Absent)', category: 'Singular Masculine' },
        { arab: 'هُمَا', eng: 'They Two (Dual M)', attached: 'ـهُمَا', suffix: 'humaa', title: '3rd Person (Absent)', category: 'Dual Masculine' },
        { arab: 'هُمْ', eng: 'They All (Plural M)', attached: 'ـهُمْ', suffix: 'hum', title: '3rd Person (Absent)', category: 'Plural Masculine' },
        { arab: 'هِيَ', eng: 'She (Singular F)', attached: 'ـهَا', suffix: 'haa', title: '3rd Person (Absent)', category: 'Singular Feminine' },
        { arab: 'هُمَا', eng: 'They Two (Dual F)', attached: 'ـهُمَا', suffix: 'humaa', title: '3rd Person (Absent)', category: 'Dual Feminine' },
        { arab: 'هُنَّ', eng: 'They All (Plural F)', attached: 'ـهُنَّ', suffix: 'hunna', title: '3rd Person (Absent)', category: 'Plural Feminine' },
        { arab: 'أَنْتَ', eng: 'You (Singular M)', attached: 'ـكَ', suffix: 'ka', title: '2nd Person (Addressed)', category: 'Singular Masculine' },
        { arab: 'أَنْتُمَا', eng: 'You Two (Dual M)', attached: 'ـكُمَا', suffix: 'kumaa', title: '2nd Person (Addressed)', category: 'Dual Masculine' },
        { arab: 'أَنْتُمْ', eng: 'You All (Plural M)', attached: 'ـكُمْ', suffix: 'kum', title: '2nd Person (Addressed)', category: 'Plural Masculine' },
        { arab: 'أَنْتِ', eng: 'You (Singular F)', attached: 'ـكِ', suffix: 'ki', title: '2nd Person (Addressed)', category: 'Singular Feminine' },
        { arab: 'أَنْتُمَا', eng: 'You Two (Dual F)', attached: 'ـكُمَا', suffix: 'kumaa', title: '2nd Person (Addressed)', category: 'Dual Feminine' },
        { arab: 'أَنْتُنَّ', eng: 'You All (Plural F)', attached: 'ـكُنَّ', suffix: 'kunna', title: '2nd Person (Addressed)', category: 'Plural Feminine' },
        { arab: 'أَنَا', eng: 'I (Singular M/F)', attached: 'ـي', suffix: 'ee', title: '1st Person (Speaker)', category: 'Singular Common' },
        { arab: 'نَحْنُ', eng: 'We (Dual/Plural M/F)', attached: 'ـنَا', suffix: 'naa', title: '1st Person (Speaker)', category: 'Plural Common' }
      ];

      const activePronoun = separatePronouns[pronounIndex] || separatePronouns[0];

      // TAB 1: Nominal Sentence Builder (Mubtada-Khabar) Helper Logic
      const getSentenceConjugation = (noun: 'muslim' | 'student' | 'teacher', index: number) => {
        if (noun === 'muslim') {
          if (index === 0 || index === 6 || index === 12) {
            return { arabic: 'مُسْلِمٌ', translit: 'muslimun', english: 'a Muslim' };
          }
          if (index === 1 || index === 7) {
            return { arabic: 'مُسْلِمَانِ', translit: 'muslimaani', english: 'two Muslims' };
          }
          if (index === 2 || index === 8 || index === 13) {
            return { arabic: 'مُسْلِمُونَ', translit: 'muslimoona', english: 'Muslims' };
          }
          if (index === 3 || index === 9) {
            return { arabic: 'مُسْلِمَةٌ', translit: 'muslimatun', english: 'a Muslim (female)' };
          }
          if (index === 4 || index === 10) {
            return { arabic: 'مُسْلِمَتَانِ', translit: 'muslimataani', english: 'two Muslims (female)' };
          }
          if (index === 5 || index === 11) {
            return { arabic: 'مُسْلِمَاتٌ', translit: 'muslimaatun', english: 'Muslims (female)' };
          }
        } else if (noun === 'student') {
          if (index === 0 || index === 6 || index === 12) {
            return { arabic: 'طَالِبٌ', translit: 'taalibun', english: 'a student' };
          }
          if (index === 1 || index === 7) {
            return { arabic: 'طَالِبَانِ', translit: 'taalibaani', english: 'two students' };
          }
          if (index === 2 || index === 8 || index === 13) {
            return { arabic: 'طُلَّابٌ', translit: 'tullaabun', english: 'students (broken plural)' };
          }
          if (index === 3 || index === 9) {
            return { arabic: 'طَالِبَةٌ', translit: 'taalibatun', english: 'a student (female)' };
          }
          if (index === 4 || index === 10) {
            return { arabic: 'طَالِبَتَانِ', translit: 'taalibataani', english: 'two students (female)' };
          }
          if (index === 5 || index === 11) {
            return { arabic: 'طَالِبَاتٌ', translit: 'taalibaatun', english: 'students (female)' };
          }
        } else { // teacher
          if (index === 0 || index === 6 || index === 12) {
            return { arabic: 'مُعَلِّمٌ', translit: 'mu\'allimun', english: 'a teacher' };
          }
          if (index === 1 || index === 7) {
            return { arabic: 'مُعَلِّمَانِ', translit: 'mu\'allimaani', english: 'two teachers' };
          }
          if (index === 2 || index === 8 || index === 13) {
            return { arabic: 'مُعَلِّمُونَ', translit: 'mu\'allimoona', english: 'teachers' };
          }
          if (index === 3 || index === 9) {
            return { arabic: 'مُعَلِّمَةٌ', translit: 'mu\'allimatun', english: 'a teacher (female)' };
          }
          if (index === 4 || index === 10) {
            return { arabic: 'مُعَلِّمَتَانِ', translit: 'mu\'allimataani', english: 'two teachers (female)' };
          }
          if (index === 5 || index === 11) {
            return { arabic: 'مُعَلِّمَاتٌ', translit: 'mu\'allimaatun', english: 'teachers (female)' };
          }
        }
        return { arabic: 'مُسْلِمٌ', translit: 'muslimun', english: 'a Muslim' };
      };

      const activeSentenceUnit = getSentenceConjugation(pronounSentenceNoun, pronounIndex);

      // TAB 2: Possessive Suffix Merger (Dhamir Muttasil) Logic
      const nounsMap: Record<string, { root: string; label: string }> = {
        house: { root: 'بَيْت', label: 'House' },
        pen: { root: 'قَلَم', label: 'Pen' },
        book: { root: 'كِتَاب', label: 'Book' }
      };

      const selectedNoun = nounsMap[pronounNoun];

      // Form attached string
      let resultingArabic = '';
      if (activePronoun.arab === 'أَنَا') {
        resultingArabic = `${selectedNoun.root}ِي`;
      } else {
        const cleanSuff = activePronoun.attached.replace('ـ', '');
        resultingArabic = `${selectedNoun.root}ُ${cleanSuff}`;
      }

      const activePossessiveMeaning = `${activePronoun.arab === 'أَنَا' ? 'My' : activePronoun.arab === 'نَحْنُ' ? 'Our' : activePronoun.eng.includes('You') ? 'Your' : activePronoun.eng.includes('She') ? 'Her' : activePronoun.eng.includes('He') ? 'His' : 'Their'} ${selectedNoun.label}`;

      return (
        <div className="space-y-6 animate-fade-in">
          {/* Header Dashboard & Sub-tabs */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-650 block mb-0.5">Dhamā’ir Master Laboratory</span>
              <h3 className="text-base font-bold text-slate-800">Pronoun Sentence & Possessive Modulator</h3>
              <p className="text-xs text-slate-500 max-w-md">
                Witness both Separate Detached Pronouns (Munfaṣil) and Suffix Attached Pronouns (Muttaṣil) side by side!
              </p>
            </div>
            
            {/* Top Navigation Mode Tab */}
            <div className="flex bg-slate-200/70 p-1 rounded-xl shrink-0">
              <button
                onClick={() => { setDhamirTab('sentence'); triggerSuccess('Swapped to Nominal Sentence Builder Mode!'); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  dhamirTab === 'sentence' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Sentence Builder (Detached)
              </button>
              <button
                onClick={() => { setDhamirTab('possessive'); triggerSuccess('Swapped to Possessive Suffix Splicer Mode!'); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  dhamirTab === 'possessive' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Possessive Merger (Attached)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Pronoun Selector Column */}
            <div className="lg:col-span-5 space-y-3">
              <div className="bg-amber-50/75 border border-amber-100 rounded-xl p-3 text-amber-900 text-xs">
                <span className="font-extrabold uppercase text-[10px] text-amber-800 tracking-wider block mb-1">SELECT PROTAGONIST PRONOUN</span>
                Toggle any of the 14 foundational Quranic pronouns below to automatically update the interactive board!
              </div>

              <div className="max-h-[380px] overflow-y-auto pr-1 space-y-1 bg-slate-50 p-2 rounded-xl border border-slate-100 scrollbar-thin">
                {separatePronouns.map((p, idx) => {
                  const isMatch = pronounIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => { 
                        setPronounIndex(idx); 
                        triggerSuccess(`Selected Pronoun ${p.arab} (${p.eng.split(' ')[0]})`); 
                      }}
                      className={`w-full flex items-center justify-between p-2.5 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                        isMatch
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold'
                          : 'bg-white text-slate-650 border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base font-black text-slate-800">{p.arab}</span>
                        <span className="text-[10px] text-slate-400">({p.eng.split(' ')[0]})</span>
                      </div>
                      <div className="text-right">
                        <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest">{p.title}</span>
                        <span className="block text-[10px] text-emerald-600 font-bold">Suffix: {p.attached}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Screen Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              
              {/* --- TAB 1: NOMINAL SENTENCE BUILDER --- */}
              {dhamirTab === 'sentence' && (
                <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-sm space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 font-mono">STEP 1: CHOOSE PREDICATE NOUN</span>
                      <span className="text-xs text-slate-400 font-serif">Mubtada & Khabar Concept</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => { setPronounSentenceNoun('muslim'); triggerSuccess('Selected Predicate: Muslim (مُسْلِم)'); }}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          pronounSentenceNoun === 'muslim' ? 'bg-slate-850 text-white border-slate-900' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Muslim (مُسْلِمٌ)
                      </button>
                      <button
                        onClick={() => { setPronounSentenceNoun('student'); triggerSuccess('Selected Predicate: Student (طَالِب)'); }}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          pronounSentenceNoun === 'student' ? 'bg-slate-850 text-white border-slate-900' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Student (طَالِبٌ)
                      </button>
                      <button
                        onClick={() => { setPronounSentenceNoun('teacher'); triggerSuccess('Selected Predicate: Teacher (مُعَلِّم)'); }}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          pronounSentenceNoun === 'teacher' ? 'bg-slate-850 text-white border-slate-900' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Teacher (مُعَلِّمٌ)
                      </button>
                    </div>
                  </div>

                  {/* Rendering Board */}
                  <div className="bg-slate-900 text-white p-5 rounded-2xl text-center space-y-4 my-2">
                    <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-mono font-black">NOMINAL SENTENCE OUTPUT (JUM’LAH ISMIYYAH)</span>
                    
                    <div className="grid grid-cols-7 items-center justify-center font-serif text-center relative py-2">
                      <div className="col-span-3 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                        <span className="text-[9px] text-slate-400 font-sans block uppercase tracking-widest">Subject (Mubtada)</span>
                        <span className="text-3xl font-black text-slate-100 block leading-normal mt-1">{activePronoun.arab}</span>
                        <span className="text-[10px] text-emerald-400 font-sans block font-semibold">/{activePronoun.suffix}/</span>
                      </div>
                      
                      <div className="col-span-1 text-slate-500 font-bold font-sans text-xl">+</div>

                      <div className="col-span-3 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                        <span className="text-[9px] text-slate-400 font-sans block uppercase tracking-widest">Predicate (Khabar)</span>
                        <span className="text-3xl font-black text-slate-100 block leading-normal mt-1">{activeSentenceUnit.arabic}</span>
                        <span className="text-[10px] text-yellow-400 font-sans block font-semibold">/{activeSentenceUnit.translit}/</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 space-y-1">
                      <span className="text-[9px] text-slate-400 uppercase tracking-widest block font-mono">COMPLETE NOMINAL TRANSLATION</span>
                      <h3 className="font-serif text-3.5xl text-emerald-400 font-bold select-all leading-normal">
                        {activePronoun.arab} {activeSentenceUnit.arabic}
                      </h3>
                      <p className="text-xs text-slate-300 font-sans font-medium">
                        "{activePronoun.arab === 'أَنَا' ? 'I am' : activePronoun.arab === 'نَحْنُ' ? 'We are' : activePronoun.eng.split(' ')[0] + ' is/are'} {activeSentenceUnit.english.replace('a ', '')}"
                      </p>
                    </div>
                  </div>

                  {/* Grammar lessons explaining هُوَ مُسْلِمٌ vs نَحْنُ مُسْلِمُونَ */}
                  <div className="bg-slate-50 border border-slate-150 rounded-xl p-3.5 text-[11px] text-slate-700 leading-relaxed font-sans">
                    <strong className="text-emerald-800 font-bold block mb-1">💡 Agreement Check (Mubtada-Khabar Match):</strong>
                    Notice how changing from <strong className="text-slate-950 font-serif">هُوَ مُسْلِمٌ</strong> (He is a Muslim) to <strong className="text-slate-950 font-serif">نَحْنُ مُسْلِمُونَ</strong> (We are Muslims) causes the predicate <strong className="text-emerald-700 font-bold font-serif">مُسْلِمٌ</strong> to append the sound masculine plural suffix <strong className="text-emerald-700 font-bold font-serif">ـُونَ</strong> automatically to match the number of the pronoun speaker!
                  </div>
                </div>
              )}

              {/* --- TAB 2: POSSESSIVE ATTACHED MERGER --- */}
              {dhamirTab === 'possessive' && (
                <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-sm space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 font-mono">STEP 1: CHOOSE SUBJECT NOUN</span>
                      <span className="text-xs text-slate-400 font-serif">Noun + Attached Suffix</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => { setPronounNoun('house'); triggerSuccess('Selected Possession Base: House (بَيْت)'); }}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          pronounNoun === 'house' ? 'bg-emerald-50 text-emerald-800 border-emerald-400' : 'bg-slate-50 text-slate-650 hover:bg-slate-100'
                        }`}
                      >
                        House (بَيْتٌ)
                      </button>
                      <button
                        onClick={() => { setPronounNoun('pen'); triggerSuccess('Selected Possession Base: Pen (قَلَم)'); }}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          pronounNoun === 'pen' ? 'bg-emerald-50 text-emerald-800 border-emerald-400' : 'bg-slate-50 text-slate-650 hover:bg-slate-100'
                        }`}
                      >
                        Pen (قَلَمٌ)
                      </button>
                      <button
                        onClick={() => { setPronounNoun('book'); triggerSuccess('Selected Possession Base: Book (كِتَاب)'); }}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          pronounNoun === 'book' ? 'bg-emerald-50 text-emerald-800 border-emerald-400' : 'bg-slate-50 text-slate-650 hover:bg-slate-100'
                        }`}
                      >
                        Book (كِتَابٌ)
                      </button>
                    </div>
                  </div>

                  {/* Possessive Board Output */}
                  <div className="bg-slate-900 text-white p-5 rounded-2xl text-center space-y-4 my-2">
                    <span className="text-[9px] uppercase tracking-widest text-amber-400 font-mono font-black">POSSESSIVE PRONOUN MERGER BOARD</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Separate pronoun */}
                      <div className="bg-white/5 border border-white/10 p-3 rounded-xl">
                        <span className="text-[9px] text-slate-400 block font-mono">Dhamīr Munfaṣil (Detached)</span>
                        <span className="font-serif text-2.5xl font-extrabold block text-slate-100 mt-1 leading-normal">
                          {activePronoun.arab}
                        </span>
                        <span className="text-[10px] text-slate-400 block">"{activePronoun.eng.split(' ')[0]}" form</span>
                      </div>
                      
                      {/* Attached Merger */}
                      <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl ring-1 ring-emerald-500/20">
                        <span className="text-[9px] text-emerald-400 block font-mono font-bold">Dhamīr Muttaṣil (Attached Merger)</span>
                        <span className="font-serif text-2.5xl font-black block text-emerald-300 mt-1 leading-normal select-all">
                          {resultingArabic}
                        </span>
                        <span className="text-[11px] text-emerald-100 font-semibold block">"{activePossessiveMeaning}"</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 font-sans text-xs text-slate-400">
                      Vowel Splicer: <strong className="text-white font-serif text-base">{selectedNoun.root}</strong> + Suffix <strong className="text-amber-400 font-serif text-base">{activePronoun.attached}</strong> = <strong className="text-emerald-400 font-serif text-base">{resultingArabic}</strong>
                    </div>
                  </div>

                  {/* Possession Rules Detail */}
                  <div className="bg-slate-50 border border-slate-150 rounded-xl p-3.5 text-[11px] text-slate-700 leading-relaxed font-sans">
                    <strong className="text-amber-800 font-bold block mb-1">💡 Possessive Merger Rule (بَيْتُهُ to بَيْتُنَا):</strong>
                    When mapping to <strong className="text-slate-950 font-serif">He (هُوَ)</strong>, the noun marries the attached suffix tail to form <strong className="text-slate-950 font-serif">بَيْتُهُ</strong> (His house). When mapping to <strong className="text-slate-950 font-serif">We (نَحْنُ)</strong>, it marries the attached tail to form <strong className="text-slate-950 font-serif">بَيْتُنَا</strong> (Our house). Notice how the noun drops its ending nominative Tanween (ُُ ) into a single Damma (ُ )!
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 5: marifa-and-nakira
    if (slug === 'marifa-and-nakira') {
      const data: Record<string, { root: string; eng: string; definite: string; translitDef: string; translitIndef: string }> = {
        masjid: { root: 'مَسْجِدٌ', definite: 'الْمَسْجِدُ', eng: 'Mosque', translitIndef: 'masjidun', translitDef: 'al-masjidu' },
        kitab: { root: 'كِتَابٌ', definite: 'الْكِتَابُ', eng: 'Book', translitIndef: 'kitabun', translitDef: 'al-kitabu' },
        bait: { root: 'بَيْتٌ', definite: 'الْبَيْتُ', eng: 'House', translitIndef: 'baitun', translitDef: 'al-baitu' }
      };

      const wordData = data[mnWord];
      const isDef = mnState === 'marifa';

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 flex justify-between items-center flex-col sm:flex-row gap-4">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">AL-AZHAR STANDARD DESIGN</span>
              <h3 className="text-base font-bold text-slate-800">Definiteness Suffix Vowel Vanisher</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
                Witness the rigid rule: Appending "Al" (ال) automatically strips the Tanween down to a single vowel instantly!
              </p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
              {['masjid', 'kitab', 'bait'].map((k) => (
                <button
                  key={k}
                  onClick={() => { setMnWord(k as any); triggerSuccess(`Selected Noun! Now try toggling Tanween and definite state.`); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${mnWord === k ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                >
                  {k === 'masjid' ? 'Mosque' : k === 'kitab' ? 'Book' : 'House'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[180px]">
              <span className="text-[10px] uppercase text-emerald-400 font-mono tracking-widest mb-3">Live Result</span>
              <div className="inline-block bg-white/5 border border-white/10 px-8 py-5 rounded-2xl">
                <span className="font-serif text-5.5xl font-black block text-emerald-400">
                  {isDef ? wordData.definite : wordData.root}
                </span>
                <span className="text-xs text-slate-305 block font-mono mt-1">/{isDef ? wordData.translitDef : wordData.translitIndef}/</span>
              </div>
              <p className="text-xs text-slate-200 mt-3 font-semibold">
                Meaning: {isDef ? `The ${wordData.eng}` : `A ${wordData.eng}`}
              </p>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-2xs">
              <div>
                <h4 className="text-xs font-bold text-slate-450 uppercase tracking-widest mb-2.5">Toggle Definiteness State</h4>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => { setMnState('nakira'); triggerSuccess('Restored Indefinite Tanween!'); }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${!isDef ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}
                  >
                    Indefinite (Nakira - Tanween)
                  </button>
                  <button
                    onClick={() => { setMnState('marifa'); triggerSuccess('Definite State: Prepended "Al-" and stripped Tanween to a single Damma!'); }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${isDef ? 'bg-white text-emerald-800 shadow' : 'text-slate-500'}`}
                  >
                    Definite [ ال ] (Ma‘rifa)
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-amber-850 text-xs">
                ⚠️ <span className="font-bold">Golden Rule:</span> Tanween and Al (ال) are absolute opposites. You CANNOT have "الْمَسْجِدٌ" with both. It is a major grammatical infraction!
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 6: mubtada-and-khabar
    if (slug === 'mubtada-and-khabar') {
      const subjects = {
        zaid: { ar: 'زَيْدٌ', eng: 'Zaid', gender: 'masc' },
        fatima: { ar: 'فَاطِمَةُ', eng: 'Fatima', gender: 'fem' },
        teacher_m: { ar: 'الْمُعَلِّمُ', eng: 'The teacher (M)', gender: 'masc' },
        teacher_f: { ar: 'الْمُعَلِّمَةُ', eng: 'The teacher (F)', gender: 'fem' }
      };

      const predicates = {
        pious_m: { ar: 'صَالِحٌ', eng: 'righteous (M)', gender: 'masc' },
        pious_f: { ar: 'صَالِحَةٌ', eng: 'righteous (F)', gender: 'fem' },
        happy_m: { ar: 'سَعِيدٌ', eng: 'happy (M)', gender: 'masc' },
        happy_f: { ar: 'سَعِيدَةٌ', eng: 'happy (F)', gender: 'fem' }
      };

      const activeSubj = subjects[mubtada];
      const activePred = predicates[khabar];
      const isGenderMatch = activeSubj.gender === activePred.gender;

      const sentenceText = `${activeSubj.ar} ${activePred.ar}`;
      const englishTranslation = `${activeSubj.eng} is ${activePred.eng.replace(/ \(M\)| \(F\)/, '')}.`;

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-100">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">NOMINAL CLAUSE BUILDER</span>
            <h3 className="text-base font-bold text-slate-800">Construct Jumla Ismiyyah Sentences</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
              Pair a Subject (<strong className="font-serif">Mubtada</strong>) with a Predicate (<strong className="font-serif">Khabar</strong>) to assemble a full nominal sentence! Note the rigid gender agreement constraint.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">1. Select Subject (Mubtada)</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(subjects).map(([k, s]) => (
                    <button
                      key={k}
                      onClick={() => { setMubtada(k as any); }}
                      className={`p-2.5 text-center border rounded-xl font-semibold text-xs cursor-pointer transition-all ${
                        mubtada === k ? 'border-indigo-500 bg-indigo-50/20 text-indigo-900 font-bold' : 'border-slate-100 bg-white text-slate-600'
                      }`}
                    >
                      <span className="block font-serif text-sm font-black">{s.ar}</span>
                      <span className="text-[10px] text-slate-400">({s.eng})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">2. Select Predicate (Khabar)</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(predicates).map(([k, p]) => (
                    <button
                      key={k}
                      onClick={() => { setKhabar(k as any); }}
                      className={`p-2.5 text-center border rounded-xl font-semibold text-xs cursor-pointer transition-all ${
                        khabar === k ? 'border-indigo-500 bg-indigo-50/20 text-indigo-900' : 'border-slate-100 bg-white text-slate-600'
                      }`}
                    >
                      <span className="block font-serif text-sm font-black">{p.ar}</span>
                      <span className="text-[10px] text-slate-400">({p.eng})</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl min-h-[290px]">
              <div className="text-center py-4 space-y-4">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Assembled Phrase State</span>
                <div className="inline-block bg-white border border-slate-100 p-6 rounded-2xl shadow-xs">
                  <span className={`font-serif text-4.5xl font-black block tracking-wide select-all leading-normal ${isGenderMatch ? 'text-emerald-700' : 'text-red-700 hover:scale-[1.01] transition-transform'}`}>
                    {sentenceText}
                  </span>
                  {isGenderMatch && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full font-bold mt-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Meaning: "{englishTranslation}"
                    </span>
                  )}
                </div>
              </div>

              {!isGenderMatch ? (
                <div className="bg-red-50 border border-red-100 text-red-900 rounded-xl p-4 flex gap-3 text-xs leading-relaxed max-w-md mx-auto">
                  <AlertTriangle className="w-5 h-5 text-red-650 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-red-800 mb-0.5">Agreement Error! (Mismatched Gender)</span>
                    Select a predicate structured as <strong>{activeSubj.gender === 'masc' ? 'Masculine' : 'Feminine'}</strong> to align with the subject {activeSubj.ar}.
                    <button
                      onClick={() => {
                        const companionKey = activeSubj.gender === 'masc' ? (khabar === 'pious_f' ? 'pious_m' : 'happy_m') : (khabar === 'pious_m' ? 'pious_f' : 'happy_f');
                        setKhabar(companionKey as any);
                        triggerSuccess('Automatically corrected gender alignment! Sentence is now grammatically valid.');
                      }}
                      className="block underline font-bold mt-1 text-red-750 text-[11px] cursor-pointer"
                    >
                      Click to Auto-Fix Gender Match
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-50/60 border border-emerald-100 text-emerald-900 text-[11px] leading-relaxed rounded-xl p-3.5 max-w-md mx-auto">
                  💡 <strong>Analysis:</strong> In a perfect Nominal Clause, both Subject & Predicate remain in the <strong>Nominative Case (ending in Damma)</strong> and they must perfectly match in Gender!
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 7: mudaf-and-mudaf-ilaih
    if (slug === 'mudaf-and-mudaf-ilaih') {
      const ownedData = {
        kitab: { root: 'كِتَاب', eng: 'Book' },
        key: { root: 'مِفْتَاح', eng: 'Key' },
        bait: { root: 'بَيْت', eng: 'House' }
      };

      const ownerData = {
        allah: { noun: 'الله', eng: 'Allah', suffix: 'ِ' },
        zaid: { noun: 'زَيْد', eng: 'Zaid', suffix: 'ٍ' },
        teacher: { noun: 'الْمُعَلِّم', eng: 'Teacher', suffix: 'ِ' }
      };

      const o = ownedData[owned];
      const w = ownerData[owner];

      const compoundString = `${o.root}ُ ${w.noun}${w.suffix}`;
      const translation = `${o.eng} of ${w.eng}`;

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">POSSESSION DUO LAB</span>
            <h3 className="text-base font-bold text-slate-800">The Ownership Constructor (Idāfah)</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
              Connect the Owned Item (<strong className="font-serif">Mudaf</strong>) and Owner (<strong className="font-serif">Mudaf Ilaih</strong>) to see the vowel changes. Mudaf loses its Tanween, while Mudaf Ilaih always shifts to the Genitive (Majroor/Kasrah) case!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">1. Select Owned Item (Mudaf)</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(ownedData).map(([k, v]) => (
                    <button key={k} onClick={() => { setOwned(k as any); triggerSuccess('Owned item set! Stripped of Al- and Tabween.'); }} className={`p-2.5 text-center border rounded-xl font-bold text-xs cursor-pointer ${owned === k ? 'border-emerald-500 bg-emerald-50/25 text-emerald-900' : 'border-slate-100 bg-white shadow-2xs'}`}>
                      <span className="block font-serif text-sm font-black">{v.root}</span>
                      <span className="text-[9px] text-slate-400">{v.eng}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">2. Select Owner (Mudaf Ilaih)</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(ownerData).map(([k, v]) => (
                    <button key={k} onClick={() => { setOwner(k as any); triggerSuccess('Owner item set! Vowel pulled down into genitive Kasrah.'); }} className={`p-2.5 text-center border rounded-xl font-bold text-xs cursor-pointer ${owner === k ? 'border-emerald-500 bg-emerald-50/25 text-emerald-950 col-span-1' : 'border-slate-100 bg-white'}`}>
                      <span className="block font-serif text-sm font-black">{v.noun}</span>
                      <span className="text-[9px] text-slate-440">{v.eng}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-7 bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between text-center min-h-[260px]">
              <div>
                <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono font-black block">Constructed Phrase</span>
                <div className="inline-block bg-white/5 border border-white/10 px-8 py-5 rounded-2xl my-4">
                  <span className="font-serif text-4.5xl font-black block tracking-wide text-emerald-400 leading-normal">
                    {compoundString}
                  </span>
                  <span className="text-xs bg-slate-800 px-3 py-1 rounded-md text-slate-205 mt-2 inline-block font-sans">
                    Owner of items: "{translation}"
                  </span>
                </div>
              </div>

              <div className="bg-slate-850 p-3 rounded-lg border border-slate-850/50 text-[11px] text-slate-350 leading-relaxed max-w-md mx-auto font-sans">
                💡 <strong>Ownership Rule:</strong> Notice that the owned noun <strong className="text-white font-serif">{o.root}</strong> drops its Tanween and takes only a single Damma (<span className="text-emerald-400">{o.root}ُ</span>). The owner <strong className="text-white font-serif">{w.noun}</strong> takes a Kasra/double Kasra ending (<span className="text-emerald-400 font-serif">{w.suffix}</span>).
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 8: mausuf-and-sifat
    if (slug === 'mausuf-and-sifat') {
      const nounDetails = {
        boy: { root: 'وَلَدٌ', clean: 'وَلَد', fem: false, eng: 'Boy' },
        girl: { root: 'بِنْتٌ', clean: 'بِنْت', fem: true, eng: 'Girl' },
        books: { root: 'كُتُبٌ', clean: 'كُتُب', fem: true, eng: 'Books (Feminine by broken non-human rule!)' }
      };

      const selected = nounDetails[mNoun];
      const isDefAnd = mDef;
      const tCase = mCase;

      // Construct noun string and adjective string based on active toggles
      let nounAr = selected.clean;
      let adjAr = selected.fem ? 'صَالِحَة' : 'صَالِح';

      // 1. Definiteness suffix states
      if (isDefAnd) {
        nounAr = `ال${nounAr}`;
        adjAr = `ال${adjAr}`;
      }

      // 2. Case suffix marks
      let suf = '';
      if (tCase === 'nom') {
        suf = isDefAnd ? 'ُ' : 'ٌ';
      } else if (tCase === 'acc') {
        // Accusative of indefinite adds supportive Alif for standard male nouns
        suf = isDefAnd ? 'َ' : (selected.clean === 'وَلَد' ? 'ًا' : 'ًا');
        if (!isDefAnd && selected.clean === 'بِنْت') {
          suf = 'ًا'; // actually bintan ends in an alif
        }
      } else {
        suf = isDefAnd ? 'ِ' : 'ٍ';
      }

      // Append suffix marks
      const finalNounArabic = `${nounAr}${suf}`;
      const finalAdjArabic = `${adjAr}${suf}`;

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">SHADOW DEMONSTRATOR</span>
              <h3 className="text-base font-bold text-slate-800">Adjective Agreement Matcher (Mausūf & Ṣifah)</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
                In classical Arabic, the adjective (Ṣifah) acts like a perfect shadow. Choose the properties of the nouns and watch the adjectives copy all 4 properties in real-time!
              </p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-center">
              {['boy', 'girl', 'books'].map((k) => (
                <button
                  key={k}
                  onClick={() => { setMNoun(k as any); triggerSuccess(`Set noun to ${k === 'boy' ? 'Boy' : k === 'girl' ? 'Girl' : 'Books (Non-human plural)'}!`); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${mNoun === k ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                >
                  {k === 'boy' ? 'Boy (Masculine)' : k === 'girl' ? 'Girl (Feminine)' : 'Books (Fem Singular Plural)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Definiteness State</label>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => { setMDef(false); triggerSuccess('Both items became Indefinite!'); }} className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${!isDefAnd ? 'bg-white text-slate-800 shadow' : 'text-slate-500'}`}>Indefinite (Nakira)</button>
                  <button onClick={() => { setMDef(true); triggerSuccess('Both items took AL- definite marker!'); }} className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${isDefAnd ? 'bg-white text-emerald-800 shadow' : 'text-slate-500'}`}>Definite (Ma‘rifa)</button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Ending Case (Harakah)</label>
                <div className="space-y-1 bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => { setMCase('nom'); triggerSuccess('Set case to Nominative (Ends in Damma/un)!'); }} className={`w-full py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${tCase === 'nom' ? 'bg-white text-slate-800 shadow' : 'text-slate-500'}`}>Nominative (Damma)</button>
                  <button onClick={() => { setMCase('acc'); triggerSuccess('Set case to Accusative (Ends in Fatha/an)!'); }} className={`w-full py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${tCase === 'acc' ? 'bg-white text-slate-800 shadow' : 'text-slate-500'}`}>Accusative (Fatha)</button>
                  <button onClick={() => { setMCase('gen'); triggerSuccess('Set case to Genitive (Ends in Kasra/in)!'); }} className={`w-full py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${tCase === 'gen' ? 'bg-white text-slate-800 shadow' : 'text-slate-500'}`}>Genitive (Kasra)</button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-slate-900 text-white rounded-2xl p-6 text-center flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase block mb-1">LIVE AGREEMENT COUPLING</span>
                <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-5 rounded-2xl my-3">
                  <div className="text-center">
                    <span className="font-serif text-3.5xl font-black block text-emerald-300 tracking-wide leading-normal">
                      {finalNounArabic}
                    </span>
                    <span className="text-[9px] uppercase font-black text-slate-400 font-mono tracking-wider">Mausūf (Noun)</span>
                  </div>
                  <div className="text-xl text-emerald-500 select-none">←</div>
                  <div className="text-center">
                    <span className="font-serif text-3.5xl font-black block text-emerald-300 tracking-wide leading-normal">
                      {finalAdjArabic}
                    </span>
                    <span className="text-[9px] uppercase font-black text-slate-400 font-mono tracking-wider">Ṣifah (Adjective)</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-900/65 p-3 rounded-xl text-xs text-slate-300 font-sans">
                💡 <strong>Agreement Checked:</strong> 
                <span className="text-emerald-400 ml-1 font-semibold">Gender ({selected.fem ? 'Feminine' : 'Masculine'}) | Count (Singular/Plural) | Definiteness ({isDefAnd ? 'Definite' : 'Indefinite'}) | Case ({tCase.toUpperCase()})</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 9: Counting Rules 1-10 and 11-19
    if (slug === 'arabic-numbers' || slug === 'nine') {
      const numbersAr = [
        { digits: 1, masc: 'وَاحِدٌ', fem: 'وَاحِدَةٌ', countMasc: 'رَجُلٌ وَاحِدٌ', countFem: 'بِنْتٌ وَاحِدَةٌ', rule: 'Matches Gender (Noun first, count adjective follows!)' },
        { digits: 2, masc: 'اِثْنَانِ', fem: 'اِثْنَتَانِ', countMasc: 'رَجُلَانِ اِثْنَانِ', countFem: 'بِنْتَانِ اِثْنَتَانِ', rule: 'Matches Gender (Dual noun takes count suffix)' },
        { digits: 3, masc: 'ثَلَاثَةٌ', fem: 'ثَلَاثٌ', countMasc: 'ثَلَاثَةُ رِجَالٍ', countFem: 'ثَلَاثُ بَنَاتٍ', rule: 'Reverse gender rule: feminine count word, plural owner is genitive majroor' },
        { digits: 5, masc: 'خَمْسَةٌ', fem: 'خَمْسٌ', countMasc: 'خَمْسَةُ رِجَالٍ', countFem: 'خَمْسُ بَنَاتٍ', rule: 'Reverse gender rule: feminine count word, plural owner is genitive majroor' },
        { digits: 10, masc: 'عَشَرَةٌ', fem: 'عَشْرٌ', countMasc: 'عَشَرَةُ رِجَالٍ', countFem: 'عَشْرُ بَنَاتٍ', rule: 'Reverse gender rule: feminine count word, plural owner is genitive majroor' },
        { digits: 11, masc: 'أَحَدَ عَشَرَ', fem: 'إِحْدَى عَشْرَةَ', countMasc: 'أَحَدَ عَشَرَ رَجُلًا', countFem: 'إِحْدَى عَشْرَةَ بِنْتًا', rule: 'Complete agreement! Part 1 and Part 2 agree with the singular accusative item (ending in Fathatain).' },
        { digits: 12, masc: 'اِثْنَا عَشَرَ', fem: 'اِثْنَتَا عَشْرَةَ', countMasc: 'اِثْنَا عَشَرَ رَجُلًا', countFem: 'اِثْنَتَا عَشْرَةَ بِنْتًا', rule: 'Complete agreement! Part 1 and Part 2 agree with the singular accusative item (ending in Fathatain).' },
        { digits: 13, masc: 'ثَلَاثَةَ عَشَرَ', fem: 'ثَلَاثَ عَشْرَةَ', countMasc: 'ثَلَاثَةَ عَشَرَ رَجُلًا', countFem: 'ثَلَاثَ عَشْرَةَ بِنْتًا', rule: 'Part 1 reverses gender, Part 2 agrees with noun gender.' },
        { digits: 19, masc: 'تِسْعَةَ عَشَرَ', fem: 'تِسْعَ عَشْرَةَ', countMasc: 'تِسْعَةَ عَشَرَ رَجُلًا', countFem: 'تِسْعَ عَشْرَةَ بِنْتًا', rule: 'Part 1 reverses gender, Part 2 agrees with noun gender.' }
      ];

      const currentNum = numbersAr.find(n => n.digits === countNumber) || numbersAr[0];
      const activePhrase = countGender === 'masc' ? currentNum.countMasc : currentNum.countFem;
      const countRep = countGender === 'masc' ? currentNum.masc : currentNum.fem;

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">COUNT CONTROLLERS RULES</span>
              <h3 className="text-base font-bold text-slate-800">Reverse Gender Counting Generator</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
                Witness an eccentric rule in Quranic Arabic: numbers 1-2 match their gender with the item, counts 3-10 use <strong>Reverse Gender polarity</strong>, and 11-19 combine matching and reverse rules!
              </p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-center">
              <button onClick={() => setCountGender('masc')} className={`px-2.5 py-1 text-xs font-bold rounded-lg cursor-pointer ${countGender === 'masc' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}>Count Men (رِجَال)</button>
              <button onClick={() => setCountGender('fem')} className={`px-2.5 py-1 text-xs font-bold rounded-lg cursor-pointer ${countGender === 'fem' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}>Count Girls (بَنَات)</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Quantifier Count</span>
              <div className="grid grid-cols-5 sm:grid-cols-9 gap-1 bg-slate-100 p-1.5 rounded-xl">
                {[1, 2, 3, 5, 10, 11, 12, 13, 19].map(n => (
                  <button key={n} onClick={() => { setCountNumber(n); triggerSuccess(`Updated quantity count to ${n}!`); }} className={`p-2 py-2 text-xs font-extrabold font-mono rounded-lg cursor-pointer transition-all ${countNumber === n ? 'bg-slate-800 text-white shadow' : 'text-slate-500'}`}>{n}</button>
                ))}
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-650 leading-relaxed font-sans">
                <strong>Crucial Takeaway:</strong>
                <ul className="list-disc pl-4 space-y-1 mt-1 font-sans">
                  <li><strong>1 &amp; 2:</strong> Match gender exactly with the noun.</li>
                  <li><strong>3 to 10:</strong> Reverse gender polarity (under Mudaf rule)! Plural genitive count.</li>
                  <li><strong>11 to 19:</strong> Part 1 &amp; 2 combinations, taking a singular accusative (Fathatain) noun.</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between text-center min-h-[190px]">
              <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase block">Resulting Count Expression</span>
              <div className="inline-block bg-white/5 border border-white/10 px-6 py-4 rounded-xl my-2">
                <span className="font-serif text-3xl font-black block tracking-wide text-emerald-400 leading-normal">
                  {activePhrase}
                </span>
                <span className="text-xs text-slate-350 block mt-1 font-mono">Count Word applied: {countRep}</span>
              </div>
              <span className="block text-xs text-amber-300 font-medium italic mt-2 bg-slate-800/60 p-2 rounded">
                Rule: {currentNum.rule}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 10: fil-the-verb (Past Tense Noun conjugators)
    if (slug === 'fil-the-verb') {
      const conjugatedData: Record<string, Record<string, { ar: string; suff: string; eng: string }>> = {
        jalasa: {
          he: { ar: 'جَلَسَ', suff: 'None (Base form)', eng: 'He sat' },
          she: { ar: 'جَلَسَتْ', suff: 'تْ (Feminine Ta)', eng: 'She sat' },
          you_m: { ar: 'جَلَسْتَ', suff: 'تَ (Addressed Male)', eng: 'You (Masculine) sat' },
          you_f: { ar: 'جَلَسْتِ', suff: 'تِ (Addressed Female)', eng: 'You (Feminine) sat' },
          i: { ar: 'جَلَسْتُ', suff: 'تُ (First Person)', eng: 'I sat' },
          we: { ar: 'جَلَسْنَا', suff: 'نَا (Plural Speakers)', eng: 'We sat' }
        },
        zahaba: {
          he: { ar: 'ذَهَبَ', suff: 'None (Base form)', eng: 'He went' },
          she: { ar: 'ذَهَبَتْ', suff: 'تْ (Feminine Ta)', eng: 'She went' },
          you_m: { ar: 'ذَهَبْتَ', suff: 'تَ (Addressed Male)', eng: 'You (Masculine) went' },
          you_f: { ar: 'ذَهَبْتِ', suff: 'تِ (Addressed Female)', eng: 'You (Feminine) went' },
          i: { ar: 'ذَهَبْتُ', suff: 'تُ (First Person)', eng: 'I went' },
          we: { ar: 'ذَهَبْنَا', suff: 'نَا (Plural Speakers)', eng: 'We went' }
        },
        akala: {
          he: { ar: 'أَكَلَ', suff: 'None (Base form)', eng: 'He ate' },
          she: { ar: 'أَكَلَتْ', suff: 'تْ (Feminine Ta)', eng: 'She ate' },
          you_m: { ar: 'أَكَلْتَ', suff: 'تَ (Addressed Male)', eng: 'You (Masculine) ate' },
          you_f: { ar: 'أَكَلْتِ', suff: 'تِ (Addressed Female)', eng: 'You (Feminine) ate' },
          i: { ar: 'أَكَلْتُ', suff: 'تُ (First Person)', eng: 'I ate' },
          we: { ar: 'أَكَلْنَا', suff: 'نَا (Plural Speakers)', eng: 'We ate' }
        }
      };

      const rootNames = { jalasa: 'To Sit', zahaba: 'To Go', akala: 'To Eat' };
      const currentRoot = conjugatedData[verbRoot as 'jalasa' | 'zahaba' | 'akala'] || conjugatedData.jalasa;
      const currentVal = currentRoot[verbSubj] || currentRoot.he;

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">MĀḌĪ ROOT MIXER</span>
              <h3 className="text-base font-bold text-slate-800">The Past Tense Suffix Attacher</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
                Select a three-letter past verb root (Māḍī) and append pronouns directly to the suffix tail. Watch letters connect and voweled changes!
              </p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-center">
              {Object.entries(rootNames).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setVerbRoot(key as any); triggerSuccess(`Loaded verb root for "${label}"!`); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${verbRoot === key ? 'bg-white shadow text-slate-900' : 'text-slate-505'}`}
                >
                  {key === 'jalasa' ? 'جَلَسَ' : key === 'zahaba' ? 'ذَهَبَ' : 'أَكَلَ'} ({label})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Choose Pronoun Subject</span>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl">
                {['he', 'she', 'you_m', 'you_f', 'i', 'we'].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setVerbSubj(s as any); triggerSuccess(`Configured pronoun subject to ${s.toUpperCase()}!`); }}
                    className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${verbSubj === s ? 'bg-slate-850 text-white shadow' : 'text-slate-505'}`}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="bg-amber-50 rounded-xl border border-amber-100 p-3.5 text-xs text-amber-900 leading-relaxed font-sans">
                💡 <strong>Pronoun Tail Mechanics:</strong> When suffixes starting with a vowel-bearing consonant (like <em>tā</em> or <em>nā</em>) are attached, the third letter of the root loses its fatha vowel and stands on a silent <strong>Sukoon</strong>!
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between text-center min-h-[190px]">
              <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase block">CONJUGATED PAST VERB</span>
              <div className="inline-block bg-white/5 border border-white/10 px-8 py-5 rounded-xl my-2">
                <span className="font-serif text-4.5xl font-black block tracking-wide text-emerald-400 leading-normal">
                  {currentVal.ar}
                </span>
                <span className="text-xs text-slate-350 block mt-1">Meaning: "{currentVal.eng}"</span>
              </div>
              <span className="block text-[10px] text-emerald-200 mt-1 font-mono font-bold">
                Suffix Tail: {currentVal.suff}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 11: fi-l-fa-il-maf-ool-bihi (sentence elements matching)
    if (slug === 'fi-l-fa-il-maf-ool-bihi') {
      const verbsObj = {
        khalaqa: { ar: 'خَلَقَ', eng: 'created' },
        nasara: { ar: 'نَصَرَ', eng: 'helped' },
        daraba: { ar: 'ضَرَبَ', eng: 'struck' }
      };
      const subjectsObj = {
        allah: { ar: 'اللهُ', eng: 'Allah', suf: 'Damma [ ُ ]' },
        zaid: { ar: 'زَيْدٌ', eng: 'Zaid', suf: 'Tanween Damma [ ٌ ]' },
        teacher: { ar: 'الْمُعَلِّمُ', eng: 'the teacher', suf: 'Damma [ ُ ]' }
      };
      const objectsObj = {
        insan: { ar: 'الْإِنْسَانَ', eng: 'the human', suf: 'Fatha [ َ ]' },
        amr: { ar: 'عَمْرًا', eng: 'Amr', suf: 'Tanween Fatha [ ً ]' },
        student: { ar: 'طَالِبًا', eng: 'a student', suf: 'Tanween Fatha [ ً ]' }
      };

      const selectedVerb = verbsObj[vVerb] || verbsObj.khalaqa;
      const selectedSubj = subjectsObj[vSubject] || subjectsObj.allah;
      const selectedObj = objectsObj[vObject] || objectsObj.insan;

      const sentence = `${selectedVerb.ar} ${selectedSubj.ar} ${selectedObj.ar}`;
      const meaningMessage = `${selectedSubj.eng.charAt(0).toUpperCase() + selectedSubj.eng.slice(1)} ${selectedVerb.eng} ${selectedObj.eng}.`;

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">Jumla Fi’liyyah Dashboard</span>
            <h3 className="text-base font-bold text-slate-800">Verbal Sentence Case Assembler</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
              Connect components of a verbal clause: <strong>Fi'l (Verb)</strong> + <strong>Fā'il (Subject/Agent)</strong> + <strong>Maf'ūl Bihi (Direct Object)</strong>. Watch their ending case vows update!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">1. Select Verb (Fi'l)</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-105 p-1 rounded-xl">
                  {Object.entries(verbsObj).map(([k, v]) => (
                    <button key={k} onClick={() => { setVVerb(k as any); triggerSuccess(`Verb: ${v.ar}!`); }} className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer ${vVerb === k ? 'bg-white shadow text-slate-900 font-extrabold' : 'text-slate-500'}`}>{v.ar}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">2. Select Subject (Fā'il - Nominative 💚)</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-105 p-1 rounded-xl">
                  {Object.entries(subjectsObj).map(([k, s]) => (
                    <button key={k} onClick={() => { setVSubject(k as any); triggerSuccess(`Subject set to: ${s.ar}`); }} className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer ${vSubject === k ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 shadow' : 'text-slate-500'}`}>{s.ar}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">3. Select Object (Maf'ūl Bihi - Accusative 💙)</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-105 p-1 rounded-xl">
                  {Object.entries(objectsObj).map(([k, o]) => (
                    <button key={k} onClick={() => { setVObject(k as any); triggerSuccess(`Object set to: ${o.ar}`); }} className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer ${vObject === k ? 'bg-sky-50 text-sky-900 border border-sky-305 shadow' : 'text-slate-505'}`}>{o.ar}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between text-center min-h-[300px]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-extrabold block mb-2">ASSEMBLED VERBAL CLAUSE</span>
                <div className="inline-block bg-white/5 border border-white/10 px-8 py-5 rounded-2xl my-3">
                  <span className="font-serif text-3.5xl font-black block tracking-wide select-all text-emerald-300 leading-normal">
                    {sentence}
                  </span>
                  <p className="text-xs text-slate-205 mt-2 font-semibold">Meaning: "{meaningMessage}"</p>
                </div>
              </div>

              <div className="bg-slate-850 p-3.5 border border-slate-800 rounded-xl text-left text-[11px] text-slate-350 space-y-1 font-sans">
                <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-black">Grammar Role Mapping:</span>
                <p>💚 <strong>Subject / Fā'il:</strong> <span className="font-serif font-black text-white">{selectedSubj.ar}</span> represents the actor performing the verb, and must reside in the <strong>Nominative Case (Marfū‘)</strong> with suffix vowel: {selectedSubj.suf}.</p>
                <p>💙 <strong>Direct Object:</strong> <span className="font-serif font-black text-white">{selectedObj.ar}</span> represents the target receiving the action, and resides in the <strong>Accusative Case (Mansūb)</strong> with suffix vowel: {selectedObj.suf}.</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 12: visible-fa-il
    if (slug === 'visible-fa-il') {
      const parentSubjects = {
        masc: {
          sing: { ar: 'الطَّالِبُ', eng: 'The male student (Singular)', verb: 'ذَهَبَ' },
          dual: { ar: 'الطَّالِبَانِ', eng: 'The two male students (Dual)', verb: 'ذَهَبَ' },
          plur: { ar: 'الطَّلَابُ', eng: 'The male students (Plural)', verb: 'ذَهَبَ' }
        },
        fem: {
          sing: { ar: 'الطَّالِبَةُ', eng: 'The female student (Singular)', verb: 'ذَهَبَتْ' },
          dual: { ar: 'الطَّالِبَتَانِ', eng: 'The two female students (Dual)', verb: 'ذَهَبَتْ' },
          plur: { ar: 'الطَّالِبَاتُ', eng: 'The female students (Plural)', verb: 'ذَهَبَتْ' }
        }
      };

      const selected = parentSubjects[vaSubjectGender][vaSubjectPlurality];
      const visualClauseFile = `${selected.verb} ${selected.ar}`;
      const translationInfo = `The student(s) went.`;

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">THE RIGID SINGULAR VERB RULE</span>
              <h3 className="text-base font-bold text-slate-800">Visible Subject Alignment (فَاعِل ظَاهِر)</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
                Observe this: When the doer of the verb is explicitly named in the sentence (visible noun), the verb <strong>MUST stay singular</strong>, whether the doer is singular, dual, or plural!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">1. Select Gender of Doer</label>
                <div className="flex bg-slate-105 p-1 rounded-xl">
                  <button onClick={() => { setVaSubjectGender('masc'); triggerSuccess('Set doer gender to Masculine!'); }} className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${vaSubjectGender === 'masc' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Masculine Nouns</button>
                  <button onClick={() => { setVaSubjectGender('fem'); triggerSuccess('Set doer gender to Feminine!'); }} className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${vaSubjectGender === 'fem' ? 'bg-white shadow text-emerald-800' : 'text-slate-500'}`}>Feminine Nouns</button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">2. Toggle Doer Plurality</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-105 p-1 rounded-xl">
                  {['sing', 'dual', 'plur'].map(p => (
                    <button key={p} onClick={() => { setVaSubjectPlurality(p as any); triggerSuccess(`Set quantity state: ${p === 'sing' ? 'Singular' : p === 'dual' ? 'Dual' : 'Plural'}!`); }} className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer ${vaSubjectPlurality === p ? 'bg-slate-800 text-white shadow' : 'text-slate-500'}`}>
                      {p === 'sing' ? '1 (Singular)' : p === 'dual' ? '2 (Dual)' : '3+ (Plural)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-900 leading-relaxed font-sans">
                💡 <strong>Verb Behavior:</strong> The verb remains singular <strong className="font-serif">{selected.verb}</strong> even when performance covers dual or plural. It does NOT follow plural changes as it does in English!
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between text-center min-h-[190px]">
              <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase block">PRODUCED CLAUSE MATCH</span>
              <div className="inline-block bg-white/5 border border-white/10 px-8 py-5 rounded-xl my-3">
                <span className="font-serif text-4.5xl font-black block tracking-wide select-all text-emerald-300 leading-normal animate-pulse">
                  {visualClauseFile}
                </span>
                <span className="text-xs text-slate-350 block mt-2">"{translationInfo}"</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Agent state: {selected.eng}</p>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 13: hidden-fa-il
    if (slug === 'hidden-fa-il') {
      const verbsMapDetect = {
        zahaba: { ar: 'ذَهَبَ', eng: 'He went', hidden: 'هُوَ (He)', type: 'Mustatir (Hidden Pronoun)' },
        zahabat: { ar: 'ذَهَبَتْ', eng: 'She went', hidden: 'هِيَ (She)', type: 'Mustatir (Hidden Pronoun)' },
        zahaboo: { ar: 'ذَهَبُوا', eng: 'They all went', hidden: 'الوَاو (The attached waw pronoun of plural doers)', type: 'Bāriz (Physical overt pronoun suffix)' },
        zahabna: { ar: 'ذَهَبْنَا', eng: 'We went', hidden: 'نَا (Attached pronoun representing speakers)', type: 'Bāriz (Physical overt pronoun suffix)' }
      };

      const scanResultOutput = verbsMapDetect[scannedVerb as 'zahaba' | 'zahabat' | 'zahaboo' | 'zahabna'] || verbsMapDetect.zahaba;

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">X-RAY GRAMMAR RADAR</span>
            <h3 className="text-base font-bold text-slate-800">Hidden vs Explicit Doer Detector</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
              Every verb in Classical Arabic requires a doer (Fā'il). Scan a verb conjugation structure to inspect whether the actor pronoun is visible/attached (<em>Bāriz</em>) or hidden inside (<em>Mustatir</em>)!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Choose Conjugated Verb to Scan</span>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(verbsMapDetect).map(([k, item]) => (
                  <button
                    key={k}
                    onClick={() => { setScannedVerb(k as any); triggerSuccess(`Scanning particle properties of verb form "${item.ar}"`); }}
                    className={`p-3 text-center border rounded-xl font-bold text-xs cursor-pointer ${scannedVerb === k ? 'border-emerald-500 bg-emerald-50/20 text-emerald-900 shadow-sm' : 'border-slate-100 bg-white shadow-2xs'}`}
                  >
                    <span className="block font-serif text-lg font-black mb-1">{item.ar}</span>
                    <span className="block text-[10px] text-slate-400 font-sans">"{item.eng}"</span>
                  </button>
                ))}
              </div>
              <div className="p-3 bg-slate-50 border border-slate-120 rounded-xl text-xs text-slate-650 leading-relaxed font-sans">
                💡 <strong>Doer Concept:</strong> If no visible human/noun subject is provided in the sentence structure, the verb contains its own internal actor!
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 text-center flex flex-col justify-between min-h-[200px]">
              <div>
                <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase block">X-RAY ANALYSIS RESULTS</span>
                <div className="inline-block bg-white/5 border border-white/10 px-8 py-5 rounded-xl my-4">
                  <span className="font-serif text-4.5xl font-black block text-emerald-300 leading-normal animate-pulse">
                    {scanResultOutput.ar}
                  </span>
                  <span className="text-xs text-slate-350 block mt-1">Conjugation: "{scanResultOutput.eng}"</span>
                </div>
              </div>

              <div className="bg-emerald-950/50 border border-emerald-900 p-3.5 rounded-xl text-xs text-emerald-250">
                🔍 <strong>Detected Actor (Fā'il):</strong> {scanResultOutput.hidden}
                <span className="block text-[9px] uppercase tracking-wider text-emerald-400 font-bold mt-1 font-sans">Class: {scanResultOutput.type}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 14: what-is-mudari (Muḍāri‘ Prefixes)
    if (slug === 'what-is-mudari') {
      const subjectMapMudari = {
        he: { ar: 'هُوَ (He)', prefix: 'يَـ (Yaa)', verb: 'يَكْتُبُ', translit: 'yaktubu', meaning: 'He writes' },
        she: { ar: 'هِيَ (She)', prefix: 'تَـ (Taa)', verb: 'تَكْتُبُ', translit: 'taktubu', meaning: 'She writes' },
        you_m: { ar: 'أَنْتَ (You - M)', prefix: 'تَـ (Taa)', verb: 'تَكْتُبُ', translit: 'taktubu', meaning: 'You (Masculine) write' },
        i: { ar: 'أَنَا (I)', prefix: 'أَ (Hamza)', verb: 'أَكْتُبُ', translit: 'aktubu', meaning: 'I write' },
        we: { ar: 'نَحْنُ (We)', prefix: 'نَـ (Noon)', verb: 'نَكْتُبُ', translit: 'naktubu', meaning: 'We write' }
      };

      const activeMud = subjectMapMudari[mudariSubject] || subjectMapMudari.he;

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">THE PRESENT TENSE COMPILER</span>
              <h3 className="text-base font-bold text-slate-800">The "Atay Na" (أَتَيْنَ) Prefix Workbench</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
                Present tense verbs (Muḍāri‘) are formed by attaching specific prefix characters to the front of three-letter roots. Examine vowel states below!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Select Person Subject Pronoun</span>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(subjectMapMudari).map(([k, val]) => (
                  <button
                    key={k}
                    onClick={() => { setMudariSubject(k as any); triggerSuccess(`Prefix attached for pronoun ${k.toUpperCase()}!`); }}
                    className={`p-3 text-left border rounded-xl font-bold text-xs cursor-pointer ${mudariSubject === k ? 'border-emerald-500 bg-emerald-50/20 text-emerald-950 shadow-sm' : 'border-slate-100 bg-white'}`}
                  >
                    <span className="block text-[9px] uppercase text-slate-400 mb-0.5">{k.replace('_', ' ')}</span>
                    <span className="font-serif text-sm font-black text-slate-800 block">Personal Pronoun: {val.ar}</span>
                  </button>
                ))}
              </div>
              <div className="bg-amber-50 rounded-xl border border-amber-100 p-3 text-xs text-amber-900 leading-relaxed font-sans">
                💡 <strong>The "Atayna" Prefix Rule:</strong> All present tense active verbal forms begin with one of four keys: <strong>أ (Hamza), ت (Taa), ي (Yaa), ن (Noon)</strong>!
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 text-center flex flex-col justify-between min-h-[220px]">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-extrabold block">PRODUCED MUḌĀRI‘ FORM</span>
              <div className="inline-block bg-white/5 border border-white/10 px-8 py-5 rounded-xl my-4">
                <span className="font-serif text-4.5xl font-black block tracking-wide text-emerald-400 leading-normal select-all">
                  {activeMud.verb}
                </span>
                <span className="text-xs text-slate-350 block mt-1 font-mono">/{activeMud.translit}/</span>
              </div>
              <div className="bg-emerald-950/45 p-3 border border-emerald-900 rounded-xl text-left text-xs font-sans text-emerald-250">
                <p>👉 <strong>Prefix attached:</strong> <span className="font-serif font-black">{activeMud.prefix}</span></p>
                <p className="mt-1">👉 <strong>Word meaning:</strong> "{activeMud.meaning}"</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 15: how-mudari-changes
    if (slug === 'how-mudari-changes') {
      let verbOutResult = 'يَكْتُبُ';
      let tagDetail = 'Marfū‘ Mood (Nominative - ends in standard Damma)';
      let descriptionMessage = 'Normal present state of a verb in Arabic has nothing preceding or modifying it.';

      if (msParticle === 'lan') {
        verbOutResult = 'لَنْ يَكْتُبَ';
        tagDetail = 'Mansūb Mood (Subjunctive - ends in Fatha 💙)';
        descriptionMessage = 'The subjunctive particle "Lan" (Never) modifies the verb’s end vowel to a Fatha.';
      } else if (msParticle === 'lam') {
        verbOutResult = 'لَمْ يَكْتُبْ';
        tagDetail = 'Majzūm Mood (Jussive - ends in silent Sukoon 🖤)';
        descriptionMessage = 'The jussive particle "Lam" (Did not) strips the end vowel down to a quiet, unvoiced Sukoon.';
      }

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5 font-sans">MUḌĀRI’ MOOD SWAPPER</span>
            <h3 className="text-base font-bold text-slate-800">Present Verb Ending Shifter (Subjunctive & Jussive)</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
              Standard present verbs end in Damma. But prepend a modifying prefix particle type, and watch the trailing vowel shift to Fatha or silent Sukoon instantly!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Select Preceding Modifier</span>
              <div className="space-y-1.5 bg-slate-100 p-1.5 rounded-xl">
                <button
                  onClick={() => { setMsParticle('none'); triggerSuccess('Restored to standard nominative Damma!'); }}
                  className={`w-full p-2.5 text-xs font-bold text-left rounded-lg cursor-pointer transition-all ${msParticle === 'none' ? 'bg-white shadow text-slate-850 font-black' : 'text-slate-505'}`}
                >
                  None (Normal Present Verb: يَكْتُبُ / He Writes)
                </button>
                <button
                  onClick={() => { setMsParticle('lan'); triggerSuccess('Applied Lan Subjunctive: End vowel changed to Fatha!'); }}
                  className={`w-full p-2.5 text-xs font-bold text-left rounded-lg cursor-pointer transition-all ${msParticle === 'lan' ? 'bg-white shadow text-emerald-805 font-black' : 'text-slate-505'}`}
                >
                  لَنْ (Lan - Subjunctive: "Will never...")
                </button>
                <button
                  onClick={() => { setMsParticle('lam'); triggerSuccess('Applied Lam Jussive: End vowel shifted to Sukoon!'); }}
                  className={`w-full p-2.5 text-xs font-bold text-left rounded-lg cursor-pointer transition-all ${msParticle === 'lam' ? 'bg-white shadow text-cyan-850 font-black' : 'text-slate-505'}`}
                >
                  لَمْ (Lam - Jussive: "Did not...")
                </button>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3.5 text-xs text-indigo-900 leading-relaxed font-sans">
                ℹ️ <strong>Quranic Importance:</strong> Scanning these trailing vowel markers (Ref, Nasb, and Jazm) lets the reader identify emphasis patterns, conditional structures, and negation depths.
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-850 text-white rounded-2xl p-6 text-center flex flex-col justify-between min-h-[220px]">
              <span className="text-[10px] text-emerald-400 tracking-widest uppercase block">RESULTING VERB STATE</span>
              <div className="inline-block bg-white/5 border border-white/10 px-8 py-5 rounded-xl my-4">
                <span className="font-serif text-4.5xl font-black block text-emerald-400 leading-normal">
                  {verbOutResult}
                </span>
                <span className="text-xs text-indigo-300 block mt-1 font-bold">{tagDetail}</span>
              </div>
              <p className="text-xs text-slate-350 font-sans max-w-sm mx-auto">{descriptionMessage}</p>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 16: secret-of-six-babs
    if (slug === 'secret-of-six-babs') {
      const babsList = [
        { id: 1, title: 'Bab Nasara-Yansuru (Fatha-Damma)', madi: 'نَصَرَ (Na-Sa-Ra)', mudari: 'يَنْصُرُ (Yan-Su-Ru)', vowelShift: 'Fatha ➔ Damma', shiftAr: 'ـَ ➔ ـُ', example: 'كَتَبَ ➔ يَكْتُبُ (to write)' },
        { id: 2, title: 'Bab Daraba-Yadribu (Fatha-Kasra)', madi: 'ضَرَبَ (Da-Ra-Ba)', mudari: 'يَضْرِبُ (Yad-Ri-Bu)', vowelShift: 'Fatha ➔ Kasra', shiftAr: 'ـَ ➔  ـِ', example: 'جَلَسَ ➔ يَجْلِسُ (to sit)' },
        { id: 3, title: 'Bab Fataha-Yaftahu (Fatha-Fatha)', madi: 'فَتَحَ (Fa-Ta-Ha)', mudari: 'يَفْتَحُ (Yaf-Ta-Hu)', vowelShift: 'Fatha ➔ Fatha', shiftAr: 'ـَ ➔  ـَ', example: 'جَعَلَ ➔ يَجْعَلُ (to make)' },
        { id: 4, title: 'Bab Sami’a-Yasma’u (Kasra-Fatha)', madi: 'سَمِعَ (Sa-Mi-’A)', mudari: 'يَسْمَعُ (Yas-Ma-’U)', vowelShift: 'Kasra ➔ Fatha', shiftAr: 'ـِ ➔  ـَ', example: 'عَلِمَ ➔ يَعْلَمُ (to know)' },
        { id: 5, title: 'Bab Karuma-Yakrumu (Damma-Damma)', madi: 'كَرُمَ (Ka-Ru-Ma)', mudari: 'يَكْرُمُ (Yak-Ru-Mu)', vowelShift: 'Damma ➔ Damma', shiftAr: 'ـُ ➔  ـُ', example: 'شَرُفَ ➔ يَشْرُفُ (to be noble)' },
        { id: 6, title: 'Bab Hasiba-Yahsibu (Kasra-Kasra)', madi: 'حَسِبَ (Ha-Si-Ba)', mudari: 'يَحْسِبُ (Yah-Si-Bu)', vowelShift: 'Kasra ➔ Kasra', shiftAr: 'ـِ ➔  ـِ', example: 'وَرِثَ ➔ يَرِثُ (to inherit)' }
      ];

      const currentClassBab = babsList[activeBab] || babsList[0];

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">MIDDLE VOWEL SYSTEM</span>
            <h3 className="text-base font-bold text-slate-800">The 6 Verbs Bāb Classifications (أَبْوَاب)</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
              Classical Arabic verb roots are cataloged into 6 standard categories (<em>Bāb</em>) based on how the middle letter vowel (Ayn Kalimah) changes between Past (Madi) and Present (Mudari) states.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 h-[320px] overflow-y-auto pr-1 space-y-1 bg-slate-50 p-2 rounded-xl border border-slate-100 scrollbar-thin">
              {babsList.map((b, idx) => (
                <button key={b.id} onClick={() => { setActiveBab(idx); triggerSuccess(`Active: ${b.title}!`); }} className={`w-full text-left p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${activeBab === idx ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-extrabold' : 'bg-white border-slate-100 text-slate-650'}`}>
                  {b.title}
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-slate-900 text-white rounded-2xl p-6 text-center flex flex-col justify-between min-h-[320px]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-extrabold block mb-3">VOWEL SHIFT MAPPING</span>
                <div className="flex gap-4 items-center justify-center">
                  <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl flex-1 text-center">
                    <span className="block text-[8px] uppercase tracking-widest text-slate-400">Past Mode</span>
                    <span className="font-serif text-xl font-bold text-white block mt-1">{currentClassBab.madi}</span>
                  </div>
                  <span className="text-emerald-400 font-black text-xl">➔</span>
                  <div className="bg-emerald-950/20 border border-emerald-500/20 px-4 py-3 rounded-xl flex-1 text-center">
                    <span className="block text-[8px] uppercase tracking-widest text-emerald-400">Present Mode</span>
                    <span className="font-serif text-xl font-bold text-emerald-300 block mt-1">{currentClassBab.mudari}</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-850 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1 text-center">
                <p>🌀 <strong>Middle Vowel Transition:</strong> <span className="font-serif text-emerald-400 font-black tracking-widest">{currentClassBab.vowelShift}</span> ({currentClassBab.shiftAr})</p>
                <p className="text-[11px] text-slate-400 font-sans mt-1">🔥 <strong>Other Example Verbs:</strong> <strong className="font-serif text-emerald-300">{currentClassBab.example}</strong></p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 17: al-amr-command
    if (slug === 'al-amr-command' || slug === 'nine' || slug === 'what-is-mudari') {
      const derivationTSteps = [
        { title: '1. Take 2nd Person Present Verb', desc: 'Imperatives are formulated from 2nd person (addressee) active forms. Let’s take: "You write"', arabic: 'تَكْتُبُ', translit: 'taktubu', highlights: 'Prefix "Tā" indicates second person.' },
        { title: '2. Strip Front Prefix', desc: 'Erase the present tense indicator prefix letter "Tā-" at the front entirely.', arabic: 'كْتُبُ', translit: '-ktubu', highlights: 'The verb now starts with a silent letter with a Sukoon (كْ), which is impossible to pronounce aloud!' },
        { title: '3. Insert Helping Hamza', desc: 'As the word cannot be pronounced, insert a helper "Hamzatul Wasl" at the front. Vowel is Damma (أُ) if middle letter has Damma, else Kasra (اِ).', arabic: 'أُكْتُبُ', translit: 'uktubu', highlights: 'Since the middle letter "Tā" has Damma (تُ), the helper Hamza takes a Damma vowel.' },
        { title: '4. Make Ending Jussive', desc: 'Put a solid silent Sukoon on the final letter (or drop "Nun" endings for dual/plural targets).', arabic: 'أُكْتُبْ', translit: 'uk-tub!', highlights: 'Finished! You have derived: "Write! (command verb)"' }
      ];

      const stepDFileElementObj = derivationTSteps[amrStep];

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">Imperative Derivation Stepper</span>
            <h3 className="text-base font-bold text-slate-800">Al-Amr (Imperative Command) Maker</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
              Watch how classical scholars mathematically derive the command form "Amr" out of standard present tense statements step-by-step!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 justify-between flex flex-col">
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-widest font-black text-emerald-600">{stepDFileElementObj.title}</h4>
                <p className="text-xs text-slate-650 leading-relaxed font-sans">{stepDFileElementObj.desc}</p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed font-sans">
                  ⭐ {stepDFileElementObj.highlights}
                </div>
              </div>

              <div className="flex gap-2">
                <button disabled={amrStep === 0} onClick={() => setAmrStep(prev => prev - 1)} className="flex-1 py-2 text-xs font-bold border border-slate-150 rounded-xl disabled:opacity-40 cursor-pointer hover:bg-slate-50">Back</button>
                <button disabled={amrStep === 3} onClick={() => { setAmrStep(prev => prev + 1); triggerSuccess(`Advanced to Step ${amrStep + 2}!`); }} className="flex-1 py-2 text-xs font-bold bg-slate-850 text-white rounded-xl disabled:opacity-40 cursor-pointer hover:bg-slate-750">Next Step ➔</button>
                <button onClick={() => { setAmrStep(0); triggerSuccess('Reset command derivation machine!'); }} className="px-3 py-2 text-xs font-bold border border-slate-150 rounded-xl cursor-pointer hover:bg-slate-50">Reset</button>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-850 text-white rounded-2xl p-6 text-center flex flex-col justify-center min-h-[200px]">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-extrabold block">DERIVATION COMPILER VIEW</span>
              <div className="inline-block bg-white/5 border border-white/10 px-8 py-5 rounded-xl my-4">
                <span className="font-serif text-5xl font-black block tracking-wide text-emerald-400 leading-normal">
                  {stepDFileElementObj.arabic}
                </span>
                <span className="text-xs text-slate-350 block mt-1 font-mono">/{stepDFileElementObj.translit}/</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 18: an-nahy-negative
    if (slug === 'an-nahy-negative') {
      const verbTextResult = nahyProhibition ? 'لَا تَذْهَبْ' : 'لَا تَذْهَبُ';
      const transliterationVal = nahyProhibition ? 'laa taz-hab' : 'laa taz-habu';
      const indicatorHeader = nahyProhibition ? 'Forbidding Command (Lā al-Nāhiyah 🛑)' : 'General Negation (Lā al-Nāfiyah ℹ️)';
      const ruleDetailMsg = nahyProhibition
        ? 'Prepend "La" of Prohibition (Prohibits action) + forces the verb to Jussive/Majzoom ending with a silent Sukoon.'
        : 'Prepend "La" of Negation (Simple factual statement) + preserves the verb’s default Nominative Damma ending.';

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">Negative Operator Board</span>
              <h3 className="text-base font-bold text-slate-800">Forbidding Prohibition vs Statement Negation</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
                Contrast two distinct types of "Lā" in Arabic: Command Prohibition ("Do not go!") versus factual Negation ("You do not go.").
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider font-sans">Toggle Type of Lā</span>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button onClick={() => { setNahyProhibition(true); triggerSuccess('Set to Prohibition! End vowel pulled into silent Sukoon.'); }} className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${nahyProhibition ? 'bg-white shadow text-red-800 font-extrabold' : 'text-slate-500'}`}>🛑 Forbidding Prohibition</button>
                <button onClick={() => { setNahyProhibition(false); triggerSuccess('Set to basic Negation fact! End vowel preserved as Damma.'); }} className={`flex-1 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${!nahyProhibition ? 'bg-white shadow text-slate-800 font-extrabold' : 'text-slate-505'}`}>ℹ️ Fact Declaration</button>
              </div>
              <div className="bg-amber-50 rounded-xl border border-amber-100 p-3.5 text-xs text-amber-900 leading-relaxed font-sans font-medium">
                ⚠️ <strong>Ahmad’s Advice:</strong> Mixing these up on core tests can change the meaning of crucial classical command structures. Sukoon endings reflect absolute instructions!
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 text-center flex flex-col justify-between min-h-[200px]">
              <span className="text-[10px] text-emerald-400 tracking-widest uppercase block">PRODUCED CLAUSE MATCH FORM</span>
              <div className="inline-block bg-white/5 border border-white/10 px-8 py-4 rounded-xl my-2">
                <span className={`font-serif text-4.5xl font-black block tracking-wide leading-normal ${nahyProhibition ? 'text-emerald-400' : 'text-indigo-305'}`}>
                  {verbTextResult}
                </span>
                <span className="text-xs text-slate-350 block mt-1 font-mono">/{transliterationVal}/</span>
              </div>
              <div className="bg-slate-850 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                ⭐ <strong>{indicatorHeader}</strong>: "{nahyProhibition ? 'Do not go!' : 'You do not go.'}"
                <p className="text-[10px] text-slate-400 font-sans mt-1">{ruleDetailMsg}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 19: what-is-a-harf
    if (slug === 'what-is-a-harf' || slug === 'huruf-al-jarr' || slug === 'special-rules-of-huruf') {
      const transitionsList = {
        fi: { ar: 'فِي', eng: 'In', output: targetWord === 'bait' ? 'فِي الْبَيْتِ' : targetWord === 'masjid' ? 'فِي الْمَسْجِدِ' : 'فِي زَيْدٍ' },
        ala: { ar: 'عَلَى', eng: 'On', output: targetWord === 'bait' ? 'عَلَى الْبَيْتِ' : targetWord === 'masjid' ? 'عَلَى الْمَسْجِدِ' : 'عَلَى زَيْدٍ' },
        min: { ar: 'مِنْ', eng: 'From', output: targetWord === 'bait' ? 'مِنَ الْبَيْتِ' : targetWord === 'masjid' ? 'مِنَ الْمَسْجِدِ' : 'مِنْ زَيْدٍ' }
      };

      const selectedPrepDetails = transitionsList[selectedParticle as 'fi' | 'ala' | 'min'] || transitionsList.fi;

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">Preposition Pull Dashboard</span>
              <h3 className="text-base font-bold text-slate-800">The Power of Prepositions (Ḥurūf al-Jarr)</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
                In classical Arabic, prepositions behave like gravity. Select a preposition and a noun, and see how they pull the trailing vowel down into a Kasra (genitive) case!
              </p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-center">
              {['fi', 'ala', 'min'].map((p) => (
                <button key={p} onClick={() => { setSelectedParticle(p as any); triggerSuccess(`Active Preposition: ${p === 'fi' ? 'Fi' : p === 'ala' ? 'Ala' : 'Min'}!`); }} className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer ${selectedParticle === p ? 'bg-white shadow text-slate-900 font-extrabold' : 'text-slate-500'}`}>
                  {p === 'fi' ? 'فِي (In)' : p === 'ala' ? 'عَلَى (On)' : 'مِنْ (From)'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-4">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Select Target Noun</span>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                <button onClick={() => setTargetWord('bait')} className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer ${targetWord === 'bait' ? 'bg-white shadow text-slate-850' : 'text-slate-505'}`}>الْبَيْتُ</button>
                <button onClick={() => setTargetWord('masjid')} className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer ${targetWord === 'masjid' ? 'bg-white shadow text-slate-850' : 'text-slate-505'}`}>الْمَسْجِدُ</button>
                <button onClick={() => setTargetWord('zaid')} className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer ${targetWord === 'zaid' ? 'bg-white shadow text-slate-850' : 'text-slate-505'}`}>زَيْدٌ</button>
              </div>
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-900">
                💡 <strong>Preposition Pull (Majroor):</strong> Notice how the noun's default end Damma immediately converts to a genitive Kasrah sound (<em className="font-serif">i or in</em>) under preposition power!
              </div>
            </div>

            <div className="lg:col-span-8 bg-slate-900 border border-slate-850 text-white rounded-2xl p-6 text-center flex flex-col justify-between min-h-[220px]">
              <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase block">PRODUCED PREPOSITIONAL CLAUSE</span>
              <div className="inline-block bg-white/5 border border-white/10 px-8 py-5 rounded-xl my-4">
                <span className="font-serif text-4.5xl font-black block tracking-wide text-emerald-400 leading-normal">
                  {selectedPrepDetails.output}
                </span>
                <span className="text-xs text-slate-355 block mt-2">Meaning: "{selectedPrepDetails.eng} the house/mosque/Zaid"</span>
              </div>
              <p className="text-xs text-slate-450 leading-relaxed max-w-md mx-auto">
                Prepositions are indeclinable particles (Mabni) that never change their own vowels, but they pull any subsequent noun into the genitive case.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 20: huruf-al-atf
    if (slug === 'huruf-al-atf') {
      const conjunctions = {
        wa: { ar: 'وَ', eng: 'and (concurrence)' },
        fa: { ar: 'فَـ', eng: 'and then, immediately' },
        thumma: { ar: 'ثُمَّ', eng: 'and afterward, with delay' }
      };

      const selectedConjArr = conjunctions[atfConjunction as 'wa' | 'fa' | 'thumma'] || conjunctions.wa;

      let clauseArStr = 'خَرَجَ زَيْدٌ وَخَالِدٌ';
      let parseDetailMsg = 'Both names share the Nominative (Damma) case because they are both performers of the verb.';
      let translationMetStr = `Zaid ${selectedConjArr.eng} Khalid went out.`;

      if (atfCase === 'accusative') {
        clauseArStr = `رَأَيْتُ زَيْدًا ${selectedConjArr.ar === 'فَـ' ? 'فَخَالِدًا' : selectedConjArr.ar + ' خَالِدًا'}`;
        parseDetailMsg = 'Both names copy the Accusative Case (Fatha with supportive Alif) because they represent direct objects.';
        translationMetStr = `I saw Zaid ${selectedConjArr.eng} Khalid.`;
      } else if (atfCase === 'genitive') {
        clauseArStr = `مَرَرْتُ بِزَيْدٍ ${selectedConjArr.ar === 'فَـ' ? 'فَخَالِدٍ' : selectedConjArr.ar + ' خَالِدٍ'}`;
        parseDetailMsg = 'Both names share the Genitive Case (Kasra) because the preposition "Bi" on the first copies transitively to the second.';
        translationMetStr = `I passed by Zaid ${selectedConjArr.eng} Khalid.`;
      }

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5">Copier Conjunction Board</span>
            <h3 className="text-base font-bold text-slate-800">Conjunction Case Endings Copier (َعَطْف)</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
              Learn how Classical Arabic conjunctions (<em>Ḥurūf al-Atf</em>) act like copy machines, transmitting the case ending (Damma, Fatha, or Kasra) of the first noun onto the second!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">1. Select Conjunction (Harf Atf)</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
                  {Object.entries(conjunctions).map(([k, v]) => (
                    <button key={k} onClick={() => { setAtfConjunction(k as any); triggerSuccess(`Active Conjunction: ${v.ar} (${v.eng})!`); }} className={`py-1.5 text-xs font-bold rounded-lg cursor-pointer ${atfConjunction === k ? 'bg-white shadow text-slate-900 font-extrabold' : 'text-slate-500'}`}>{v.ar}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">2. Select Case Scenario</label>
                <div className="space-y-1 bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => { setAtfCase('nominative'); triggerSuccess('Set to Nominative Case!'); }} className={`w-full py-1.5 text-xs text-left px-2 font-bold rounded-lg cursor-pointer ${atfCase === 'nominative' ? 'bg-white shadow text-slate-800 font-extrabold' : 'text-slate-505'}`}>💚 Nominative (Damma ending)</button>
                  <button onClick={() => { setAtfCase('accusative'); triggerSuccess('Set to Accusative Case!'); }} className={`w-full py-1.5 text-xs text-left px-2 font-bold rounded-lg cursor-pointer ${atfCase === 'accusative' ? 'bg-white shadow text-indigo-900 font-extrabold' : 'text-slate-505'}`}>💙 Accusative (Fatha ending)</button>
                  <button onClick={() => { setAtfCase('genitive'); triggerSuccess('Set to Genitive Case!'); }} className={`w-full py-1.5 text-xs text-left px-2 font-bold rounded-lg cursor-pointer ${atfCase === 'genitive' ? 'bg-white shadow text-slate-800 font-extrabold' : 'text-slate-505'}`}>🤎 Genitive (Kasra ending)</button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 text-center flex flex-col justify-between min-h-[260px]">
              <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase block">PRODUCED TRANSITIVE CLAUSE</span>
              <div className="inline-block bg-white/5 border border-white/10 px-8 py-4 rounded-xl my-4">
                <span className="font-serif text-4.5xl font-black block tracking-wide text-emerald-400 leading-normal">
                  {clauseArStr}
                </span>
                <span className="text-xs text-slate-350 block mt-2">Meaning: "{translationMetStr}"</span>
              </div>
              <div className="bg-emerald-950/40 p-3 border border-emerald-900 rounded-xl text-xs text-left text-emerald-205 leading-relaxed font-sans">
                👉 <strong>Grammar Copy Effect:</strong> {parseDetailMsg}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // CHAPTER 21: inna-and-its-sisters
    if (slug === 'inna-and-its-sisters') {
      const sistersGroupDetails = {
        inna: { ar: 'إِنَّ', eng: 'Indeed', effect: 'Converts Mubtada to Accusative (Fatha)' },
        anna: { ar: 'أَنَّ', eng: 'That', effect: 'Converts Mubtada to Accusative (Fatha)' },
        kaanna: { ar: 'كَأَنَّ', eng: 'As if', effect: 'Converts Mubtada to Accusative (Fatha)' },
        lakinna: { ar: 'لَكِنَّ', eng: 'But', effect: 'Converts Mubtada to Accusative (Fatha)' }
      };

      const selectedSisStrObj = sistersGroupDetails[selectedParticle as 'inna' | 'anna' | 'kaanna' | 'lakinna'] || sistersGroupDetails.inna;
      const subjectsSisArrMap = {
        bait: { base: 'الْبَيْتُ جَمِيلٌ (The house is beautiful)', modified: 'الْبَيْتَ جَمِيلٌ', eng: 'Indeed the house is beautiful' },
        masjid: { base: 'الْمَسْجِدُ كَبِيرٌ (The mosque is big)', modified: 'الْمَسْجِدَ كَبِيرٌ', eng: 'Indeed the mosque is big' },
        zaid: { base: 'زَيْدٌ صَالِحٌ (Zaid is righteous)', modified: 'زَيْدًا صَالِحٌ', eng: 'Indeed Zaid is righteous' }
      };

      const activeSubjectModel = subjectsSisArrMap[targetWord as 'bait' | 'masjid' | 'zaid'] || subjectsSisArrMap.bait;
      const combinedOutputArVal = `${selectedSisStrObj.ar} ${activeSubjectModel.modified}`;
      const translatedStatementStr = `${selectedSisStrObj.eng} ${activeSubjectModel.eng.toLowerCase().replace('indeed ', '')}`;

      return (
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 flex flex-col md:flex-row justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-emerald-600 block mb-0.5 font-sans">Accusative Shift Board</span>
              <h3 className="text-base font-bold text-slate-800">Inna & Sisters Laboratory (إِنَّ وَأَخَوَاتُهَا)</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xl font-sans">
                Witness the transformation: Prepend any sister of <em>Inna</em> to a nominal sentence, and see the subject's default Damma convert immediately into a Fatha, while the predicate stays Marfu'!
              </p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-center">
              {Object.entries(sistersGroupDetails).map(([k, s]) => (
                <button key={k} onClick={() => { setSelectedParticle(k as any); triggerSuccess(`Active Modifier: ${s.ar} (${s.eng})!`); }} className={`px-2.5 py-1 text-xs font-bold rounded-lg cursor-pointer ${selectedParticle === k ? 'bg-white shadow text-slate-900 font-extrabold' : 'text-slate-500'}`}>
                  {s.ar}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 space-y-4">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Select Target Nominal Clause</span>
              <div className="space-y-1.5">
                {Object.entries(subjectsSisArrMap).map(([k, s]) => (
                  <button key={k} onClick={() => { setTargetWord(k as any); triggerSuccess(`Loaded baseline Nominal Sentence: ${s.base}`); }} className={`w-full py-2.5 text-xs text-left px-3 border rounded-xl font-bold cursor-pointer ${targetWord === k ? 'border-emerald-500 bg-emerald-50/20 text-emerald-950 font-black shadow-3xs' : 'border-slate-100 bg-white'}`}>
                    <span className="block font-serif text-sm font-black mb-0.5">{s.base.split(' (')[0]}</span>
                    <span className="font-sans text-[10px] text-slate-450">Base: "{s.base.split(' (')[1].replace(')', '')}"</span>
                  </button>
                ))}
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-900 leading-relaxed font-sans">
                🚨 <strong>The Sisterhood Impact:</strong> Inna overrides nominal balance, casting the subject into Accusative (called <em>Ism Inna</em>), while leaving the predicate (called <em>Khabar Inna</em>) unchanged!
              </div>
            </div>

            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 text-center flex flex-col justify-between min-h-[260px]">
              <span className="text-[10px] text-emerald-400 tracking-widest uppercase block">PRODUCED CLAUSE</span>
              <div className="inline-block bg-white/5 border border-white/10 px-8 py-5 rounded-xl my-4">
                <span className="font-serif text-4.5xl font-black block tracking-wide text-emerald-400 leading-normal">
                  {combinedOutputArVal}
                </span>
                <span className="text-xs text-slate-350 block mt-2">Meaning: "{translatedStatementStr}"</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto font-sans">
                ⭐ <strong>Active Sister effect:</strong> {selectedSisStrObj.effect}.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Default Fallback
    return (
      <div className="bg-white border border-slate-150 border-dashed rounded-2xl p-8 text-center space-y-4">
        <Layers className="w-10 h-10 text-emerald-600 mx-auto opacity-70" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-700">Custom Active Workbench: {chapter.title}</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Unlock active sandbox learning! Take specialized interactive examples to master this section's core Darul Uloom standard criteria.
          </p>
        </div>
        <span className="inline-block px-3 py-1 bg-slate-50 border border-slate-100 rounded-md text-[10px] text-slate-450 font-mono font-bold uppercase">
          Section Code: {chapter.slug}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6" id="focus-lab-main">
      {/* Exercise Points Counter Ticker to keep lessons highly engaging */}
      <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2.5 rounded-xl border border-white/10">
            <Sparkles className="w-6 h-6 text-emerald-300 animate-pulse" />
          </div>
          <div>
            <h2 className="text-md sm:text-lg font-black font-serif tracking-tight leading-tight">🕌 {chapter.title} Focus Lab</h2>
            <p className="text-xs text-emerald-100 mt-0.5 max-w-sm sm:max-w-md">
              Complete conversion tests and interact with word states to earn Academy XP!
            </p>
          </div>
        </div>

        <div className="bg-white/15 border border-white/20 px-4 py-2 rounded-xl text-center">
          <span className="block text-[8px] sm:text-[9px] uppercase tracking-widest text-emerald-300 font-bold font-mono">Lab Experience</span>
          <span className="block text-sm sm:text-base font-black text-white font-mono animate-bounce">{xp} XP</span>
        </div>
      </div>

      {msg.text && (
        <div className="p-3 bg-emerald-50 text-emerald-850 border border-emerald-120 text-xs rounded-xl font-medium animate-bounce flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          {msg.text}
        </div>
      )}

      {/* Main Focus Lab Content Area */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs">
        {renderFocusLabContent()}
      </div>
    </div>
  );
}
