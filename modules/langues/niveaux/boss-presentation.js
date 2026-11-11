/* Boss du chapitre 3 : préparer et donner la présentation d'un projet d'ingénieur, sans aide avant le premier essai. */
NIVEAU(ANG.niveau({
  id: "boss-presentation",
  carte: { etiquette: "Project presentation", titre: "A low-cost pulse oximeter", texte: "You have ten minutes to present your team's low-cost pulse oximeter to a jury of teachers and two doctors from the university hospital." },
  etapes: [
    { nom: "Build the introduction", type: "trous",
      titre: "Build your introduction with the course's advice.",
      phrases: ["Good morning. Thank you for being here. Today, my [objective] is to show you how our device measures oxygen for under 20 dollars.", "First, I'll explain how it [works]; then I'll show our test [results]."],
      jetons: ["objective", "works", "results", "salary", "holiday"],
      aide: "Annonce ton objectif, puis ton plan.",
      bravo: "Objectif annoncé, plan clair : tu as l'air organized.",
      expliquer: "<p>Annoncer le plan (<i>First… then…</i>) montre que la présentation est organisée.</p>" },
    { nom: "Know your audience", type: "choix",
      titre: "Two doctors are on the jury. What does “Understand your audience” mean here?",
      options: [
        { t: "Show the clinical use and the accuracy compared with hospital devices", ok: true },
        { t: "Explain what blood is and why oxygen matters", aide: "Des médecins le savent déjà." },
        { t: "Only show the electronic circuit in detail", aide: "Ce n'est pas ce qui intéresse le plus des médecins." }],
      bravo: "Ce qui compte pour eux : l'usage clinique et la précision.",
      expliquer: "<p>Adapter le contenu au public, c'est la lettre U de OPEN UP.</p>" },
    { nom: "During the talk", type: "trier",
      titre: "During the talk: do or don't?",
      cartes: [{ t: "Look at each member of the jury", bac: 0 }, { t: "Read every word on the slides", bac: 1 }, { t: "Vary your speed and pitch", bac: 0 }, { t: "Keep your hands in your pockets", bac: 1 },
        { t: "Show one clear graph in colour", bac: 0 }, { t: "Talk for twelve minutes, no questions", bac: 1 }],
      bacs: [{ t: "Do" }, { t: "Don't" }],
      aide: "Body language, voix, supports, temps : un point du cours pour chaque carte.",
      bravo: "Regard, voix variée, graphique simple. Pas de lecture, pas de mains en poche, du temps pour les questions.",
      expliquer: "<p>Dix minutes annoncées : finir à huit pour garder du temps aux questions.</p>" },
    { nom: "The final slide", type: "choix",
      titre: "Which final slide fits the course best?",
      options: [
        { t: "“Thank you for your attention. Any questions?”", ok: true },
        { t: "A slide with all the source code of the device", aide: "Trop chargé : keep it simple, minimize." },
        { t: "No final slide: leave as soon as you finish", aide: "Le cours dit : keep time for questions." }],
      bravo: "Comme la dernière diapositive du cours.",
      expliquer: "<p>La présentation du cours finit justement par « Thank you for your attention… any questions? ».</p>" }
  ]
}));
