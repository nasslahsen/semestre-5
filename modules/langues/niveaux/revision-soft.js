/* Révision du chapitre 1 : hard et soft skills, autres noms, compétences recherchées, chiffres, dans des situations nouvelles. */
NIVEAU(ANG.niveau({
  id: "revision-soft",
  carte: { etiquette: "Review", titre: "Soft skills for engineers", texte: "Hard skills: teachable, easy to quantify.\n\nSoft skills: EQ, people skills, transferable skills.\n\nEmployers want both, and people skills weigh more in the long term." },
  etapes: [
    { nom: "A new list", type: "trier",
      titre: "An internship report lists these skills. Hard skill or soft skill?",
      cartes: [{ t: "Designing a circuit board", bac: 0 }, { t: "Adaptability", bac: 1 }, { t: "Integrity", bac: 1 }, { t: "Statistics with Excel", bac: 0 },
        { t: "Initiative", bac: 1 }, { t: "3D printing a prototype", bac: 0 }],
      bacs: [{ t: "Hard skills" }, { t: "Soft skills" }],
      aide: "Ask yourself: can you learn it from a manual and measure it easily?",
      bravo: "Hard: circuit board, statistics, 3D printing. Soft: adaptability, integrity, initiative.",
      expliquer: "<p>Adaptability, integrity and initiative are all in Peggy Klaus's list.</p>" },
    { nom: "The recruiter", type: "choix",
      titre: "A recruiter says: “We need an engineer who can explain technical results to doctors and nurses.” Which essential soft skill is this?",
      carte: { etiquette: "Situation", titre: "The recruiter's need", texte: "The engineer will work in a hospital and must explain test results on medical devices to doctors and nurses." },
      options: [{ t: "Communication skills", ok: true }, { t: "Analytical skills", aide: "Analysing the results comes before. Here you must explain them to other people." }, { t: "Flexibility", aide: "Flexibility means adapting to change." }],
      bravo: "Communication skills.",
      expliquer: "<p>96 % of respondents see communication and interpersonal skills as <i>the gateways to achieve career success</i>.</p>" },
    { nom: "Klaus's figure", type: "vf",
      titre: "True or false: according to Peggy Klaus, 25 percent of long-term job success depends on technical knowledge.",
      vrai: true, aide: "Peggy Klaus: 75 % people skills, and the rest?",
      bravo: "True: 75 % people skills, 25 % technical knowledge.",
      expliquer: "<p>Don't mix it up with the survey in India, where hard skills count for 30 % in getting hired.</p>" },
    { nom: "Another name", type: "choix",
      titre: "Which expression is another name for soft skills in the course?",
      options: [{ t: "Employable skills", ok: true }, { t: "Academic skills", aide: "Academic knowledge is part of hard skills." }, { t: "Quantifiable skills", aide: "“Easy to quantify” describes hard skills." }],
      bravo: "Employable skills.",
      expliquer: "<p>The seven names: people, interpersonal, transferable, life, employable, personality development skills, behavioral competencies.</p>" },
    { nom: "Find the mistake", type: "choix",
      titre: "A student wrote: “Hard skills are difficult to quantify and refer to EQ.” What is wrong?",
      options: [
        { t: "Hard skills are easy to quantify, and EQ refers to soft skills.", ok: true },
        { t: "Nothing, the sentence is correct.", aide: "Compare with the definition: two things are swapped." },
        { t: "Only “EQ” should be “IQ”.", aide: "There are two mistakes, not one: look at “difficult” too." }],
      bravo: "Two mistakes: hard skills are easy to quantify, and EQ goes with soft skills.",
      expliquer: "<p>Correct version: <i>Hard skills are teachable abilities that are easy to quantify. Soft skills refer to EQ, the emotional intelligence quotient.</i></p>" }
  ]
}));
