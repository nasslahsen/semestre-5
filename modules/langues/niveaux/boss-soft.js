/* Boss du chapitre 1 : une offre d'emploi d'ingénieur biomédical, lue avec les notions du chapitre. */
NIVEAU(ANG.niveau({
  id: "boss-soft",
  carte: { etiquette: "Job offer", titre: "Biomedical engineer, medical devices", texte: "We are looking for a graduate who masters CAD software and signal processing. You will work in a multicultural team, adapt quickly to new regulations, and present your results to hospital staff. Strong problem solving is a must." },
  etapes: [
    { nom: "Read the offer", type: "trier",
      titre: "Sort the requirements of the offer: hard skills or soft skills?",
      cartes: [{ t: "Masters CAD software", bac: 0 }, { t: "Works in a multicultural team", bac: 1 }, { t: "Signal processing", bac: 0 }, { t: "Adapts quickly to new regulations", bac: 1 },
        { t: "Presents results to hospital staff", bac: 1 }, { t: "Strong problem solving", bac: 1 }],
      bacs: [{ t: "Hard skills" }, { t: "Soft skills" }],
      aide: "Un logiciel ou une technique s'apprend en cours ; travailler en équipe, s'adapter, présenter, résoudre : des soft skills de la liste.",
      bravo: "Deux hard skills, quatre soft skills : l'offre demande surtout des soft skills.",
      expliquer: "<p>Teamwork, flexibility, communication, problem solving : quatre des sept soft skills recherchées chez un ingénieur.</p>" },
    { nom: "Support your answer", type: "choix",
      titre: "You write: “Soft-skills training helps engineering students get hired.” Which figure from the course supports this?",
      options: [
        { t: "70 % of students with soft-skills training found better employment opportunities.", ok: true },
        { t: "Hard skills contributed to only 30 % success in getting employment.", aide: "Ce chiffre parle des hard skills, pas de la formation aux soft skills." },
        { t: "96 % said communication skills are gateways to career success.", aide: "C'est une opinion sur la communication, pas l'effet d'une formation." }],
      bravo: "70 % : la formation aux soft skills est liée à de meilleurs emplois.",
      expliquer: "<p>Pour justifier, cite le chiffre qui mesure exactement ce que tu affirmes.</p>" },
    { nom: "Two definitions", type: "trous",
      titre: "Write the two definitions in one sentence.",
      phrases: ["Hard skills are [teachable] abilities that are easy to [quantify], while soft skills refer to a person's [EQ]."],
      jetons: ["teachable", "quantify", "EQ", "forget", "IQ", "salary"],
      aide: "Hard skills : enseignables et mesurables. Soft skills : le quotient d'intelligence émotionnelle.",
      bravo: "Teachable, easy to quantify ; EQ.",
      expliquer: "<p><i>While</i> sert à opposer deux idées dans une même phrase : pratique pour une question de comparaison.</p>" },
    { nom: "Why more than knowledge?", type: "choix",
      titre: "Why are multi-national companies looking for more than academic knowledge?",
      options: [
        { t: "Because they also expect thinking, presentation, negotiation and time management skills.", ok: true },
        { t: "Because engineering schools teach too many soft skills.", aide: "C'est l'inverse : les écoles insistent sur le technique." },
        { t: "Because technical knowledge is useless.", aide: "Le cours ne dit pas ça : il faut les deux." }],
      bravo: "Ils attendent aussi thinking, presentation, negotiation et time management skills.",
      expliquer: "<p>Le cours ne rejette pas les hard skills : il dit qu'elles ne suffisent pas.</p>" }
  ]
}));
