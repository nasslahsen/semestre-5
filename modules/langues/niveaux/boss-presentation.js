/* Boss du chapitre 3 : préparer et donner la présentation d'un projet d'ingénieur, sans aide avant le premier essai. */
NIVEAU(ANG.niveau({
  id: "boss-presentation",
  carte: { etiquette: "Project presentation", titre: "A low-cost pulse oximeter", texte: "You have ten minutes to present your team's low-cost pulse oximeter to a jury of teachers and two doctors from the university hospital." },
  etapes: [
    { nom: "Build the introduction", type: "trous",
      titre: "Build your introduction with the course's advice.",
      phrases: ["Good morning. Thank you for being here. Today, my [objective] is to show you how our device measures oxygen for under 20 dollars.", "First, I'll explain how it [works]; then I'll show our test [results]."],
      jetons: ["objective", "works", "results", "salary", "holiday"],
      aide: "State your objective, then your plan.",
      bravo: "Objective stated, clear plan: you look organized.",
      expliquer: "<p>Announcing the plan (<i>First… then…</i>) shows that the presentation is organised.</p>" },
    { nom: "Know your audience", type: "choix",
      titre: "Two doctors are on the jury. What does “Understand your audience” mean here?",
      options: [
        { t: "Show the clinical use and the accuracy compared with hospital devices", ok: true },
        { t: "Explain what blood is and why oxygen matters", aide: "Doctors already know that." },
        { t: "Only show the electronic circuit in detail", aide: "That isn't what interests doctors most." }],
      bravo: "What matters to them: clinical use and accuracy.",
      expliquer: "<p>Adapting the content to the audience is the U in OPEN UP.</p>" },
    { nom: "During the talk", type: "trier",
      titre: "During the talk: do or don't?",
      cartes: [{ t: "Look at each member of the jury", bac: 0 }, { t: "Read every word on the slides", bac: 1 }, { t: "Vary your speed and pitch", bac: 0 }, { t: "Keep your hands in your pockets", bac: 1 },
        { t: "Show one clear graph in colour", bac: 0 }, { t: "Talk for twelve minutes, no questions", bac: 1 }],
      bacs: [{ t: "Do" }, { t: "Don't" }],
      aide: "Body language, voice, visual aids, time: one point of the course for each card.",
      bravo: "Eye contact, varied voice, a simple graph. No reading, no hands in pockets, time for questions.",
      expliquer: "<p>Ten minutes planned: finish at eight to keep time for questions.</p>" },
    { nom: "The final slide", type: "choix",
      titre: "Which final slide fits the course best?",
      options: [
        { t: "“Thank you for your attention. Any questions?”", ok: true },
        { t: "A slide with all the source code of the device", aide: "Too full: keep it simple, minimize." },
        { t: "No final slide: leave as soon as you finish", aide: "The course says: keep time for questions." }],
      bravo: "Just like the last slide of the course.",
      expliquer: "<p>The course presentation ends with exactly that: “Thank you for your attention… any questions?”.</p>" }
  ]
}));
