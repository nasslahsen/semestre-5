/* Révision du chapitre 3 : OPEN UP, objectifs, introduction, voix, corps, supports, conseils, dans des situations nouvelles. */
NIVEAU(ANG.niveau({
  id: "revision-presentation",
  carte: { etiquette: "Review", titre: "Effective presentation skills", texte: "OPEN UP. Four objectives. An attractive introduction. Be heard, breathe, vary your voice. Smile, eye contact, natural gestures. Simple visual aids. Keep it short, focused, relevant." },
  etapes: [
    { nom: "Advice for a friend", type: "paires",
      titre: "Your friend has problems during presentations. Match each problem with the advice.",
      gauche: ["She keeps her hands in her pockets", "Her slides are full of small text", "She talks for 40 minutes, no time left", "She starts by apologising"],
      droite: ["Keep time for questions", "Look organized, use a genuine opening", "Smooth and natural gestures", "Keep them simple, use large fonts"],
      bon: [2, 3, 0, 1],
      aides: ["Hands: body language.", "Slides: visual aids.", "Time: final tips.", "The start: introduction."],
      bravo: "Corps, supports, temps, introduction.",
      expliquer: "<p>Each problem has its own part of the course: that is how you organise a written answer.</p>" },
    { nom: "Which objective?", type: "choix",
      titre: "“Sign this petition today to get a new dialysis unit in our town.” What is the main objective?",
      options: [{ t: "Move to action", ok: true }, { t: "To entertain", aide: "There's nothing funny here." }, { t: "To inform", aide: "It doesn't only inform: it asks people to sign." }],
      bravo: "Move to action: the audience is asked to act.",
      expliquer: "<p>Verbs in the imperative (<i>sign, join, give</i>) often show this aim.</p>" },
    { nom: "Natural", type: "vf",
      titre: "True or false: in OPEN UP, N stands for “Nervous”.",
      vrai: false, aide: "Read the acronym again: the quality is positive.",
      bravo: "False: N = Natural.",
      expliquer: "<p>Organized, Passionate, Engaging, Natural, Understand your audience, Practice.</p>" },
    { nom: "Pitch", type: "choix",
      titre: "In “vary your voice (speed, pitch and volume)”, what is pitch?",
      options: [{ t: "How high or low your voice is", ok: true }, { t: "How fast you speak", aide: "That's speed." }, { t: "How loud you speak", aide: "That's volume." }],
      bravo: "Pitch = how high or low your voice is.",
      expliquer: "<p>Speed: how fast. Pitch: how high. Volume: how loud.</p>" },
    { nom: "Bored audience", type: "choix",
      titre: "“Have you ever fallen asleep or felt bored during someone's speech?” Which reason is linked to the course's advice?",
      options: [
        { t: "The speaker lectured, read his notes and never looked at us.", ok: true },
        { t: "The speaker smiled and used humor.", aide: "These are tips from the course, not reasons for boredom." },
        { t: "The speaker kept it short and focused.", aide: "That's exactly what you should do." }],
      bravo: "Lecturing with no eye contact and no energy: the opposite of “don't lecture” and “maintain eye contact”.",
      expliquer: "<p>A possible open question in the exam: give two reasons and link each one to a tip from the course.</p>" }
  ]
}));
