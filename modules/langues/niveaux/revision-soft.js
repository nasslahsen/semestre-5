/* Révision du chapitre 1 : hard et soft skills, autres noms, compétences recherchées, chiffres, dans des situations nouvelles. */
NIVEAU(ANG.niveau({
  id: "revision-soft",
  carte: { etiquette: "Révision", titre: "Soft skills for engineers", texte: "Hard skills: teachable, easy to quantify.\n\nSoft skills: EQ, people skills, transferable skills.\n\nEmployers want both, and people skills weigh more in the long term." },
  etapes: [
    { nom: "A new list", type: "trier",
      titre: "An internship report lists these skills. Hard skill or soft skill?",
      cartes: [{ t: "Designing a circuit board", bac: 0 }, { t: "Adaptability", bac: 1 }, { t: "Integrity", bac: 1 }, { t: "Statistics with Excel", bac: 0 },
        { t: "Initiative", bac: 1 }, { t: "3D printing a prototype", bac: 0 }],
      bacs: [{ t: "Hard skills" }, { t: "Soft skills" }],
      aide: "Se demander : est-ce que ça s'apprend dans un manuel et se mesure facilement ?",
      bravo: "Hard : circuit, statistiques, impression 3D. Soft : adaptability, integrity, initiative.",
      expliquer: "<p>Adaptability, integrity et initiative sont toutes dans la liste de Peggy Klaus.</p>" },
    { nom: "The recruiter", type: "choix",
      titre: "A recruiter says: “We need an engineer who can explain technical results to doctors and nurses.” Which essential soft skill is this?",
      carte: { etiquette: "Situation", titre: "The recruiter's need", texte: "The engineer will work in a hospital and must explain test results on medical devices to doctors and nurses." },
      options: [{ t: "Communication skills", ok: true }, { t: "Analytical skills", aide: "Analyser les résultats, c'est avant. Ici il faut les expliquer à d'autres." }, { t: "Flexibility", aide: "La flexibilité, c'est s'adapter au changement." }],
      bravo: "Communication skills.",
      expliquer: "<p>96 % des personnes interrogées voient la communication et les interpersonal skills comme <i>the gateways to achieve career success</i>.</p>" },
    { nom: "Klaus's figure", type: "vf",
      titre: "True or false: according to Peggy Klaus, 25 percent of long-term job success depends on technical knowledge.",
      vrai: true, aide: "Peggy Klaus : 75 % people skills, et le reste ?",
      bravo: "True : 75 % people skills, 25 % technical knowledge.",
      expliquer: "<p>Ne confonds pas avec l'enquête en Inde, où les hard skills comptent pour 30 % dans l'embauche.</p>" },
    { nom: "Another name", type: "choix",
      titre: "Which expression is another name for soft skills in the course?",
      options: [{ t: "Employable skills", ok: true }, { t: "Academic skills", aide: "Le savoir académique fait partie des hard skills." }, { t: "Quantifiable skills", aide: "« Easy to quantify » décrit les hard skills." }],
      bravo: "Employable skills.",
      expliquer: "<p>Les sept noms : people, interpersonal, transferable, life, employable, personality development skills, behavioral competencies.</p>" },
    { nom: "Find the mistake", type: "choix",
      titre: "A student wrote: “Hard skills are difficult to quantify and refer to EQ.” What is wrong?",
      options: [
        { t: "Hard skills are easy to quantify, and EQ refers to soft skills.", ok: true },
        { t: "Nothing, the sentence is correct.", aide: "Compare avec la définition : deux mots sont inversés." },
        { t: "Only “EQ” should be “IQ”.", aide: "Il y a deux erreurs, pas une : regarde aussi « difficult »." }],
      bravo: "Deux erreurs : easy to quantify, et EQ va avec les soft skills.",
      expliquer: "<p>Version correcte : <i>Hard skills are teachable abilities that are easy to quantify. Soft skills refer to EQ, the emotional intelligence quotient.</i></p>" }
  ]
}));
