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
      aide: "Software or a technique is learnt in class; working in a team, adapting, presenting, solving: soft skills from the list.",
      bravo: "Two hard skills, four soft skills: the offer mostly asks for soft skills.",
      expliquer: "<p>Teamwork, flexibility, communication, problem solving: four of the seven soft skills employers look for in engineers.</p>" },
    { nom: "Support your answer", type: "choix",
      titre: "You write: “Soft-skills training helps engineering students get hired.” Which figure from the course supports this?",
      options: [
        { t: "70 % of students with soft-skills training found better employment opportunities.", ok: true },
        { t: "Hard skills contributed to only 30 % success in getting employment.", aide: "This figure is about hard skills, not soft-skills training." },
        { t: "96 % said communication skills are gateways to career success.", aide: "This is an opinion about communication, not the effect of training." }],
      bravo: "70 %: soft-skills training is linked to better jobs.",
      expliquer: "<p>To support a claim, quote the figure that measures exactly what you claim.</p>" },
    { nom: "Two definitions", type: "trous",
      titre: "Write the two definitions in one sentence.",
      phrases: ["Hard skills are [teachable] abilities that are easy to [quantify], while soft skills refer to a person's [EQ]."],
      jetons: ["teachable", "quantify", "EQ", "forget", "IQ", "salary"],
      aide: "Hard skills: teachable and measurable. Soft skills: the emotional intelligence quotient.",
      bravo: "Teachable, easy to quantify; EQ.",
      expliquer: "<p><i>While</i> contrasts two ideas in one sentence: handy for a comparison question.</p>" },
    { nom: "Why more than knowledge?", type: "choix",
      titre: "Why are multi-national companies looking for more than academic knowledge?",
      options: [
        { t: "Because they also expect thinking, presentation, negotiation and time management skills.", ok: true },
        { t: "Because engineering schools teach too many soft skills.", aide: "It's the opposite: schools focus on technical knowledge." },
        { t: "Because technical knowledge is useless.", aide: "The course doesn't say that: you need both." }],
      bravo: "They also expect thinking, presentation, negotiation and time management skills.",
      expliquer: "<p>The course doesn't reject hard skills: it says they are not enough.</p>" }
  ]
}));
