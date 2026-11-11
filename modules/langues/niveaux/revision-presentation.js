/* Révision du chapitre 3 : OPEN UP, objectifs, introduction, voix, corps, supports, conseils, dans des situations nouvelles. */
NIVEAU(ANG.niveau({
  id: "revision-presentation",
  carte: { etiquette: "Révision", titre: "Effective presentation skills", texte: "OPEN UP. Four objectives. An attractive introduction. Be heard, breathe, vary your voice. Smile, eye contact, natural gestures. Simple visual aids. Keep it short, focused, relevant." },
  etapes: [
    { nom: "Advice for a friend", type: "paires",
      titre: "Your friend has problems during presentations. Match each problem with the advice.",
      gauche: ["She keeps her hands in her pockets", "Her slides are full of small text", "She talks for 40 minutes, no time left", "She starts by apologising"],
      droite: ["Keep time for questions", "Look organized, use a genuine opening", "Smooth and natural gestures", "Keep them simple, use large fonts"],
      bon: [2, 3, 0, 1],
      aides: ["Les mains : langage du corps.", "Les diapositives : visual aids.", "Le temps : final tips.", "Le début : introduction."],
      bravo: "Corps, supports, temps, introduction.",
      expliquer: "<p>Chaque problème a sa rubrique dans le cours : c'est ainsi qu'on organise une réponse écrite.</p>" },
    { nom: "Which objective?", type: "choix",
      titre: "“Sign this petition today to get a new dialysis unit in our town.” What is the main objective?",
      options: [{ t: "Move to action", ok: true }, { t: "To entertain", aide: "Il n'y a rien de drôle ici." }, { t: "To inform", aide: "On ne fait pas qu'informer : on demande de signer." }],
      bravo: "Move to action : on demande au public d'agir.",
      expliquer: "<p>Les verbes à l'impératif (<i>sign, join, give</i>) signalent souvent ce but.</p>" },
    { nom: "Natural", type: "vf",
      titre: "True or false: in OPEN UP, N stands for “Nervous”.",
      vrai: false, aide: "Relis l'acronyme : la qualité est positive.",
      bravo: "False : N = Natural.",
      expliquer: "<p>Organized, Passionate, Engaging, Natural, Understand your audience, Practice.</p>" },
    { nom: "Pitch", type: "choix",
      titre: "In “vary your voice (speed, pitch and volume)”, what is pitch?",
      options: [{ t: "How high or low your voice is", ok: true }, { t: "How fast you speak", aide: "Ça, c'est speed." }, { t: "How loud you speak", aide: "Ça, c'est volume." }],
      bravo: "Pitch = la hauteur de la voix.",
      expliquer: "<p>Speed : vitesse. Pitch : hauteur. Volume : intensité.</p>" },
    { nom: "Bored audience", type: "choix",
      titre: "“Have you ever fallen asleep or felt bored during someone's speech?” Which reason is linked to the course's advice?",
      options: [
        { t: "The speaker lectured, read his notes and never looked at us.", ok: true },
        { t: "The speaker smiled and used humor.", aide: "Ce sont des conseils du cours, pas des causes d'ennui." },
        { t: "The speaker kept it short and focused.", aide: "C'est exactement ce qu'il faut faire." }],
      bravo: "Lecture sans regard ni énergie : l'inverse de « don't lecture » et « maintain eye contact ».",
      expliquer: "<p>Question ouverte possible à l'examen : donne deux raisons et relie chacune à un conseil du cours.</p>" }
  ]
}));
