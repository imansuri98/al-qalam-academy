export interface ConjugationItem {
  pronoun: string;
  pronounEng: string;
  arabic: string;
  translit: string;
  meaning: string;
  class: string;
  countType: 'Singular' | 'Dual' | 'Plural';
}

export const verbConjugationData: Record<
  string, // 'kataba' | 'nasara' | 'zahaba' | 'jalasa'
  Record<
    string, // 'madi' | 'mudari' | 'amr' | 'nahy'
    ConjugationItem[]
  >
> = {
  kataba: {
    madi: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'كَتَبَ', translit: 'kataba', meaning: 'He wrote', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'كَتَبَا', translit: 'katabaa', meaning: 'They two (M) wrote', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'كَتَبُوا', translit: 'kataboo', meaning: 'They all (M) wrote', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'كَتَبَتْ', translit: 'katabat', meaning: 'She wrote', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'كَتَبَتَا', translit: 'katabataa', meaning: 'They two (F) wrote', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'كَتَبْنَ', translit: 'katabna', meaning: 'They all (F) wrote', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'كَتَبْتَ', translit: 'katabta', meaning: 'You (M) wrote', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'كَتَبْتُمَا', translit: 'katabtumaa', meaning: 'You two (M) wrote', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'كَتَبْتُمْ', translit: 'katabtum', meaning: 'You all (M) wrote', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'كَتَبْتِ', translit: 'katabti', meaning: 'You (F) wrote', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'كَتَبْتُمَا', translit: 'katabtumaa', meaning: 'You two (F) wrote', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'كَتَبْتُنَّ', translit: 'katabtunna', meaning: 'You all (F) wrote', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'كَتَبْتُ', translit: 'katabtu', meaning: 'I wrote', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'كَتَبْنَا', translit: 'katabnaa', meaning: 'We wrote', class: '1st Person (Common)', countType: 'Plural' }
    ],
    mudari: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'يَكْتُبُ', translit: 'yaktubu', meaning: 'He writes', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'يَكْتُبَانِ', translit: 'yaktubaani', meaning: 'They two (M) write', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'يَكْتُبُونَ', translit: 'yaktuboona', meaning: 'They all (M) write', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'تَكْتُبُ', translit: 'taktubu', meaning: 'She writes', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'تَكْتُبَانِ', translit: 'taktubaani', meaning: 'They two (F) write', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'يَكْتُبْنَ', translit: 'yaktubna', meaning: 'They all (F) write', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'تَكْتُبُ', translit: 'taktubu', meaning: 'You (M) write', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'تَكْتُبَانِ', translit: 'taktubaani', meaning: 'You two (M) write', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'تَكْتُبُونَ', translit: 'taktuboone', meaning: 'You all (M) write', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'تَكْتُبِينَ', translit: 'taktubeena', meaning: 'You (F) write', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'تَكْتُبَانِ', translit: 'taktubaani', meaning: 'You two (F) write', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'تَكْتُبْنَ', translit: 'taktubna', meaning: 'You all (F) write', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'أَكْتُبُ', translit: 'aktubu', meaning: 'I write', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'نَكْتُبُ', translit: 'naktubu', meaning: 'We write', class: '1st Person (Common)', countType: 'Plural' }
    ],
    amr: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'لِيَكْتُبْ', translit: 'liyaktub', meaning: 'Let him write', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لِيَكْتُبَا', translit: 'liyaktubaa', meaning: 'Let them two (M) write', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'لِيَكْتُبُوا', translit: 'liyaktuboo', meaning: 'Let them all (M) write', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'لِتَكْتُبْ', translit: 'litaktub', meaning: 'Let her write', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لِتَكْتُبَا', translit: 'litaktubaa', meaning: 'Let them two (F) write', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'لِيَكْتُبْنَ', translit: 'liyaktubna', meaning: 'Let them all (F) write', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'أُكْتُبْ', translit: 'uktub', meaning: 'Write! (M Sing)', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'أُكْتُبَا', translit: 'uktubaa', meaning: 'Write! (M Dual)', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'أُكْتُبُوا', translit: 'uktuboo', meaning: 'Write! (M Plur)', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'أُكْتُبِي', translit: 'uktubee', meaning: 'Write! (F Sing)', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'أُكْتُبَا', translit: 'uktubaa', meaning: 'Write! (F Dual)', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'أُكْتُبْنَ', translit: 'uktubna', meaning: 'Write! (F Plur)', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'لِأَكْتُبْ', translit: 'li-aktub', meaning: 'Let me write', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'لِنَكْتُبْ', translit: 'linaktub', meaning: 'Let us write', class: '1st Person (Common)', countType: 'Plural' }
    ],
    nahy: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'لَا يَكْتُبْ', translit: 'laa yaktub', meaning: 'He must not write', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لَا يَكْتُبَا', translit: 'laa yaktubaa', meaning: 'They two (M) must not write', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'لَا يَكْتُبُوا', translit: 'laa yaktuboo', meaning: 'They all (M) must not write', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'لَا تَكْتُبْ', translit: 'laa taktub', meaning: 'She must not write', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لَا تَكْتُبَا', translit: 'laa taktubaa', meaning: 'They two (F) must not write', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'لَا يَكْتُبْنَ', translit: 'laa yaktubna', meaning: 'They all (F) must not write', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'لَا تَكْتُبْ', translit: 'laa taktub', meaning: 'Do not write! (M Sing)', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'لَا تَكْتُبَا', translit: 'laa taktubaa', meaning: 'Do not write! (M Dual)', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'لَا تَكْتُبُوا', translit: 'laa taktuboo', meaning: 'Do not write! (M Plur)', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'لَا تَكْتُبِي', translit: 'laa taktubee', meaning: 'Do not write! (F Sing)', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'لَا تَكْتُبَا', translit: 'laa taktubaa', meaning: 'Do not write! (F Dual)', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'لَا تَكْتُبْنَ', translit: 'laa taktubna', meaning: 'Do not write! (F Plur)', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'لَا أَكْتُبْ', translit: 'laa aktub', meaning: 'I must not write', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'لَا نَكْتُبْ', translit: 'laa naktub', meaning: 'We must not write', class: '1st Person (Common)', countType: 'Plural' }
    ]
  },
  nasara: {
    madi: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'نَصَرَ', translit: 'nasara', meaning: 'He helped', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'نَصَرَا', translit: 'nasaraa', meaning: 'They two (M) helped', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'نَصَرُوا', translit: 'nasaroo', meaning: 'They all (M) helped', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'نَصَرَتْ', translit: 'nasarat', meaning: 'She helped', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'نَصَرَتَا', translit: 'nasarataa', meaning: 'They two (F) helped', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'نَصَرْنَ', translit: 'nasarna', meaning: 'They all (F) helped', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'نَصَرْتَ', translit: 'nasarta', meaning: 'You (M) helped', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'نَصَرْتُمَا', translit: 'nasartumaa', meaning: 'You two (M) helped', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'نَصَرْتُمْ', translit: 'nasartum', meaning: 'You all (M) helped', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'نَصَرْتِ', translit: 'nasarti', meaning: 'You (F) helped', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'نَصَرْتُمَا', translit: 'nasartumaa', meaning: 'You two (F) helped', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'نَصَرْتُنَّ', translit: 'nasartunna', meaning: 'You all (F) helped', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'نَصَرْتُ', translit: 'nasartu', meaning: 'I helped', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'نَصَرْنَا', translit: 'nasarnaa', meaning: 'We helped', class: '1st Person (Common)', countType: 'Plural' }
    ],
    mudari: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'يَنْصُرُ', translit: 'yansuru', meaning: 'He helps', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'يَنْصُرَانِ', translit: 'yansuraani', meaning: 'They two (M) help', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'يَنْصُرُونَ', translit: 'yansuroona', meaning: 'They all (M) help', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'تَنْصُرُ', translit: 'tansuru', meaning: 'She helps', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'تَنْصُرَانِ', translit: 'tansuraani', meaning: 'They two (F) help', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'يَنْصُرْنَ', translit: 'yansurna', meaning: 'They all (F) help', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'تَنْصُرُ', translit: 'tansuru', meaning: 'You (M) help', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'تَنْصُرَانِ', translit: 'tansuraani', meaning: 'You two (M) help', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'تَنْصُرُونَ', translit: 'tansuroone', meaning: 'You all (M) help', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'تَنْصُرِينَ', translit: 'tansureena', meaning: 'You (F) help', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'تَنْصُرَانِ', translit: 'tansuraani', meaning: 'You two (F) help', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'تَنْصُرْنَ', translit: 'tansurna', meaning: 'You all (F) help', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'أَنْصُرُ', translit: 'ansuru', meaning: 'I help', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'نَنْصُرُ', translit: 'nansuru', meaning: 'We help', class: '1st Person (Common)', countType: 'Plural' }
    ],
    amr: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'لِيَنْصُرْ', translit: 'liyansur', meaning: 'Let him help', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لِيَنْصُرَا', translit: 'liyansuraa', meaning: 'Let them two (M) help', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'لِيَنْصُرُوا', translit: 'liyansuroo', meaning: 'Let them all (M) help', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'لِتَنْصُرْ', translit: 'litansur', meaning: 'Let her help', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لِتَنْصُرَا', translit: 'litansuraa', meaning: 'Let them two (F) help', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'لِيَنْصُرْنَ', translit: 'liyansurna', meaning: 'Let them all (F) help', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'اُنْصُرْ', translit: 'unsur', meaning: 'Help! (M Sing)', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'اُنْصُرَا', translit: 'unsuraa', meaning: 'Help! (M Dual)', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'اُنْصُرُوا', translit: 'unsuroo', meaning: 'Help! (M Plur)', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'اُنْصُرِي', translit: 'unsuree', meaning: 'Help! (F Sing)', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'اُنْصُرَا', translit: 'unsuraa', meaning: 'Help! (F Dual)', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'اُنْصُرْنَ', translit: 'unsurna', meaning: 'Help! (F Plur)', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'لِأَنْصُرْ', translit: 'li-ansur', meaning: 'Let me help', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'لِنَنْصُرْ', translit: 'linansur', meaning: 'Let us help', class: '1st Person (Common)', countType: 'Plural' }
    ],
    nahy: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'لَا يَنْصُرْ', translit: 'laa yansur', meaning: 'He must not help', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لَا يَنْصُرَا', translit: 'laa yansuraa', meaning: 'They two (M) must not help', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'لَا يَنْصُرُوا', translit: 'laa yansuroo', meaning: 'They all (M) must not help', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'لَا تَنْصُرْ', translit: 'laa tansur', meaning: 'She must not help', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لَا تَنْصُرَا', translit: 'laa tansuraa', meaning: 'They two (F) must not help', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'لَا يَنْصُرْنَ', translit: 'laa yansurna', meaning: 'They all (F) must not help', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'لَا تَنْصُرْ', translit: 'laa tansur', meaning: 'Do not help! (M Sing)', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'لَا تَنْصُرَا', translit: 'laa tansuraa', meaning: 'Do not help! (M Dual)', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'لَا تَنْصُرُوا', translit: 'laa tansuroo', meaning: 'Do not help! (M Plur)', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'لَا تَنْصُرِي', translit: 'laa tansuree', meaning: 'Do not help! (F Sing)', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'لَا تَنْصُرَا', translit: 'laa tansuraa', meaning: 'Do not help! (F Dual)', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'لَا تَنْصُرْنَ', translit: 'laa tansurna', meaning: 'Do not help! (F Plur)', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'لَا أَنْصُرْ', translit: 'laa ansur', meaning: 'I must not help', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'لَا نَنْصُرْ', translit: 'laa nansur', meaning: 'We must not help', class: '1st Person (Common)', countType: 'Plural' }
    ]
  },
  zahaba: {
    madi: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'ذَهَبَ', translit: 'zahaba', meaning: 'He went', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'ذَهَبَا', translit: 'zahabaa', meaning: 'They two (M) went', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'ذَهَبُوا', translit: 'zahaboo', meaning: 'They all (M) went', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'ذَهَبَتْ', translit: 'zahabat', meaning: 'She went', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'ذَهَبَتَا', translit: 'zahabataa', meaning: 'They two (F) went', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'ذَهَبْنَ', translit: 'zahabna', meaning: 'They all (F) went', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'ذَهَبْتَ', translit: 'zahabta', meaning: 'You (M) went', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'ذَهَبْتُمَا', translit: 'zahabtumaa', meaning: 'You two (M) went', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'ذَهَبْتُمْ', translit: 'zahabtum', meaning: 'You all (M) went', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'ذَهَبْتِ', translit: 'zahabti', meaning: 'You (F) went', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'ذَهَبْتُمَا', translit: 'zahabtumaa', meaning: 'You two (F) went', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'ذَهَبْتُنَّ', translit: 'zahabtunna', meaning: 'You all (F) went', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'ذَهَبْتُ', translit: 'zahabtu', meaning: 'I went', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'ذَهَبْنَا', translit: 'zahabnaa', meaning: 'We went', class: '1st Person (Common)', countType: 'Plural' }
    ],
    mudari: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'يَذْهَبُ', translit: 'yazhabu', meaning: 'He goes', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'يَذْهَبَانِ', translit: 'yazhabaani', meaning: 'They two (M) go', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'يَذْهَبُونَ', translit: 'yazhaboone', meaning: 'They all (M) go', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'تَذْهَبُ', translit: 'tazhabu', meaning: 'She goes', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'تَذْهَبَانِ', translit: 'tazhabaani', meaning: 'They two (F) go', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'يَذْهَبْنَ', translit: 'yazhabna', meaning: 'They all (F) go', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'تَذْهَبُ', translit: 'tazhabu', meaning: 'You (M) go', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'تَذْهَبَانِ', translit: 'tazhabaani', meaning: 'You two (M) go', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'تَذْهَبُونَ', translit: 'tazhaboone', meaning: 'You all (M) go', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'تَذْهَبِينَ', translit: 'tazhabeena', meaning: 'You (F) go', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'تَذْهَبَانِ', translit: 'tazhabaani', meaning: 'You two (F) go', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'تَذْهَبْنَ', translit: 'tazhabna', meaning: 'You all (F) go', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'أَذْهَبُ', translit: 'azhabu', meaning: 'I go', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'نَذْهَبُ', translit: 'nazhabu', meaning: 'We go', class: '1st Person (Common)', countType: 'Plural' }
    ],
    amr: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'لِيَذْهَبْ', translit: 'liyazhab', meaning: 'Let him go', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لِيَذْهَبَا', translit: 'liyazhabaa', meaning: 'Let them two (M) go', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'لِيَذْهَبُوا', translit: 'liyazhaboo', meaning: 'Let them all (M) go', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'لِتَذْهَبْ', translit: 'litazhab', meaning: 'Let her go', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لِتَذْهَبَا', translit: 'litazhabaa', meaning: 'Let them two (F) go', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'لِيَذْهَبْنَ', translit: 'liyazhabna', meaning: 'Let them all (F) go', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'اِذْهَبْ', translit: 'izhab', meaning: 'Go! (M Sing)', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'اِذْهَبَا', translit: 'izhabaa', meaning: 'Go! (M Dual)', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'اِذْهَبُوا', translit: 'izhaboo', meaning: 'Go! (M Plur)', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'اِذْهَبِي', translit: 'izhabee', meaning: 'Go! (F Sing)', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'اِذْهَبَا', translit: 'izhabaa', meaning: 'Go! (F Dual)', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'اِذْهَبْنَ', translit: 'izhabna', meaning: 'Go! (F Plur)', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'لِأَذْهَبْ', translit: 'li-azhab', meaning: 'Let me go', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'لِنَذْهَبْ', translit: 'linazhab', meaning: 'Let us go', class: '1st Person (Common)', countType: 'Plural' }
    ],
    nahy: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'لَا يَذْهَبْ', translit: 'laa yazhab', meaning: 'He must not go', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لَا يَذْهَبَا', translit: 'laa yazhabaa', meaning: 'They two (M) must not go', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'لَا يَذْهَبُوا', translit: 'laa yazhaboo', meaning: 'They all (M) must not go', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'لَا تَذْهَبْ', translit: 'laa tazhab', meaning: 'She must not go', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لَا تَذْهَبَا', translit: 'laa tazhabaa', meaning: 'They two (F) must not go', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'لَا يَذْهَبْنَ', translit: 'laa yazhabna', meaning: 'They all (F) must not go', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'لَا تَذْهَبْ', translit: 'laa tazhab', meaning: 'Do not go! (M Sing)', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'لَا تَذْهَبَا', translit: 'laa tazhabaa', meaning: 'Do not go! (M Dual)', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'لَا تَذْهَبُوا', translit: 'laa tazhaboo', meaning: 'Do not go! (M Plur)', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'لَا تَذْهَبِي', translit: 'laa tazhabee', meaning: 'Do not go! (F Sing)', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'لَا تَذْهَبَا', translit: 'laa tazhabaa', meaning: 'Do not go! (F Dual)', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'لَا تَذْهَبْنَ', translit: 'laa tazhabna', meaning: 'Do not go! (F Plur)', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'لَا أَذْهَبْ', translit: 'laa azhab', meaning: 'I must not go', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'لَا نَذْهَبْ', translit: 'laa nazhab', meaning: 'We must not go', class: '1st Person (Common)', countType: 'Plural' }
    ]
  },
  jalasa: {
    madi: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'جَلَسَ', translit: 'jalasa', meaning: 'He sat', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'جَلَسَا', translit: 'jalasaa', meaning: 'They two (M) sat', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'جَلَسُوا', translit: 'jalasoo', meaning: 'They all (M) sat', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'جَلَسَتْ', translit: 'jalasat', meaning: 'She sat', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'جَلَسَتَا', translit: 'jalasataa', meaning: 'They two (F) sat', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'جَلَسْنَ', translit: 'jalasna', meaning: 'They all (F) sat', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'جَلَسْتَ', translit: 'jalasta', meaning: 'You (M) sat', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'جَلَسْتُمَا', translit: 'jalastumaa', meaning: 'You two (M) sat', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'جَلَسْتُمْ', translit: 'jalastum', meaning: 'You all (M) sat', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'جَلَسْتِ', translit: 'jalasti', meaning: 'You (F) sat', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'جَلَسْتُمَا', translit: 'jalastumaa', meaning: 'You two (F) sat', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'جَلَسْتُنَّ', translit: 'jalastunna', meaning: 'You all (F) sat', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'جَلَسْتُ', translit: 'jalastu', meaning: 'I sat', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'جَلَسْنَا', translit: 'jalasnaa', meaning: 'We sat', class: '1st Person (Common)', countType: 'Plural' }
    ],
    mudari: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'يَجْلِسُ', translit: 'yajlisu', meaning: 'He sits', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'يَجْلِسَانِ', translit: 'yajlisaani', meaning: 'They two (M) sit', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'يَجْلِسُونَ', translit: 'yajlisoone', meaning: 'They all (M) sit', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'تَجْلِسُ', translit: 'tajlisu', meaning: 'She sits', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'تَجْلِسَانِ', translit: 'tajlisaani', meaning: 'They two (F) sit', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'يَجْلِسْنَ', translit: 'yajlisna', meaning: 'They all (F) sit', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'تَجْلِسُ', translit: 'tajlisu', meaning: 'You (M) sit', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'تَجْلِسَانِ', translit: 'tajlisaani', meaning: 'You two (M) sit', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'تَجْلِسُونَ', translit: 'tajlisoone', meaning: 'You all (M) sit', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'تَجْلِسِينَ', translit: 'tajliseena', meaning: 'You (F) sit', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'تَجْلِسَانِ', translit: 'tajlisaani', meaning: 'You two (F) sit', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'يَجْلِسْنَ', translit: 'yajlisna', meaning: 'You all (F) sit', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'أَجْلِسُ', translit: 'ajlisu', meaning: 'I sit', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'نَجْلِسُ', translit: 'najlisu', meaning: 'We sit', class: '1st Person (Common)', countType: 'Plural' }
    ],
    amr: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'لِيَجْلِسْ', translit: 'liyajlis', meaning: 'Let him sit', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لِيَجْلِسَا', translit: 'liyajlisaa', meaning: 'Let them two (M) sit', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'لِيَجْلِسُوا', translit: 'liyajlisoo', meaning: 'Let them all (M) sit', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'لِتَجْلِسْ', translit: 'litajlis', meaning: 'Let her sit', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لِتَجْلِسَا', translit: 'litajlisaa', meaning: 'Let them two (F) sit', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'لِيَجْلِسْنَ', translit: 'liyajlisna', meaning: 'Let them all (F) sit', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'اِجْلِسْ', translit: 'ijlis', meaning: 'Sit! (M Sing)', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'اِجْلِسَا', translit: 'ijlisaa', meaning: 'Sit! (M Dual)', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'اِجْلِسُوا', translit: 'ijlisoo', meaning: 'Sit! (M Plur)', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'اِجْلِسِي', translit: 'ijlisee', meaning: 'Sit! (F Sing)', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'اِجْلِسَا', translit: 'ijlisaa', meaning: 'Sit! (F Dual)', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'اِجْلِسْنَ', translit: 'ijlisna', meaning: 'Sit! (F Plur)', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'لِأَجْلِسْ', translit: 'li-ajlis', meaning: 'Let me sit', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'لِنَجْلِسْ', translit: 'linajlis', meaning: 'Let us sit', class: '1st Person (Common)', countType: 'Plural' }
    ],
    nahy: [
      { pronoun: 'هُوَ', pronounEng: 'Huwa (He)', arabic: 'لَا يَجْلِسْ', translit: 'laa yajlis', meaning: 'He must not sit', class: '3rd Person (Masc)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لَا يَجْلِسَا', translit: 'laa yajlisaa', meaning: 'They two (M) must not sit', class: '3rd Person (Masc)', countType: 'Dual' },
      { pronoun: 'هُمْ', pronounEng: 'Hum (They All)', arabic: 'لَا يَجْلِسُوا', translit: 'laa yajlisoo', meaning: 'They all (M) must not sit', class: '3rd Person (Masc)', countType: 'Plural' },
      { pronoun: 'هِيَ', pronounEng: 'Hiya (She)', arabic: 'لَا تَجْلِسْ', translit: 'laa tajlis', meaning: 'She must not sit', class: '3rd Person (Fem)', countType: 'Singular' },
      { pronoun: 'هُمَا', pronounEng: 'Huma (They Two)', arabic: 'لَا تَجْلِسَا', translit: 'laa tajlisaa', meaning: 'They two (F) must not sit', class: '3rd Person (Fem)', countType: 'Dual' },
      { pronoun: 'هُنَّ', pronounEng: 'Hunna (They All)', arabic: 'لَا يَجْلِسْنَ', translit: 'laa yajlisna', meaning: 'They all (F) must not sit', class: '3rd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنْتَ', pronounEng: 'Anta (You)', arabic: 'لَا تَجْلِسْ', translit: 'laa tajlis', meaning: 'Do not sit! (M Sing)', class: '2nd Person (Masc)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'لَا تَجْلِسَا', translit: 'laa tajlisaa', meaning: 'Do not sit! (M Dual)', class: '2nd Person (Masc)', countType: 'Dual' },
      { pronoun: 'أَنْتُمْ', pronounEng: 'Antum (You All)', arabic: 'لَا تَجْلِسُوا', translit: 'laa tajlisoo', meaning: 'Do not sit! (M Plur)', class: '2nd Person (Masc)', countType: 'Plural' },
      { pronoun: 'أَنْتِ', pronounEng: 'Anti (You)', arabic: 'لَا تَجْلِسِي', translit: 'laa tajlisee', meaning: 'Do not sit! (F Sing)', class: '2nd Person (Fem)', countType: 'Singular' },
      { pronoun: 'أَنْتُمَا', pronounEng: 'Antuma (You Two)', arabic: 'لَا تَجْلِسَا', translit: 'laa tajlisaa', meaning: 'Do not sit! (F Dual)', class: '2nd Person (Fem)', countType: 'Dual' },
      { pronoun: 'أَنْتُنَّ', pronounEng: 'Antunna (You All)', arabic: 'لَا تَجْلِسْنَ', translit: 'laa tajlisna', meaning: 'Do not sit! (F Plur)', class: '2nd Person (Fem)', countType: 'Plural' },
      { pronoun: 'أَنَا', pronounEng: 'Ana (I)', arabic: 'لَا أَجْلِسْ', translit: 'laa ajlis', meaning: 'I must not sit', class: '1st Person (Common)', countType: 'Singular' },
      { pronoun: 'نَحْنُ', pronounEng: 'Nahnu (We)', arabic: 'لَا نَجْلِسْ', translit: 'laa najlis', meaning: 'We must not sit', class: '1st Person (Common)', countType: 'Plural' }
    ]
  }
};
