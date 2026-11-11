/* TD 2, Vocabulary, Exercises 1 (find words in the text) et 2 (matching) : réponses de l'answer key du document. */
NIVEAU(ANG.niveau({
  id: "td2-vocabulaire",
  carte: { etiquette: "The Skills of the Future", titre: "Vocabulary", texte: "Find words in the text that mean… Every word appears in the text: unprecedented, automation, transferable, misleading, creativity, innovation, adaptability, obsolete, empathy, lifelong learning." },
  etapes: [
    { nom: "Find words 1 to 5", type: "trous",
      titre: "Exercise 1: find words in the text that mean… (1 to 5)",
      phrases: ["1. happening very quickly and significantly: [unprecedented]", "2. the use of machines to perform tasks: [automation]", "3. able to be used in different situations: [transferable]", "4. information that is intended to deceive people: [misleading]", "5. the ability to produce new and original ideas: [creativity]"],
      jetons: ["unprecedented", "automation", "transferable", "misleading", "creativity", "reliable", "expertise"],
      aide: "Reliable est l'inverse de misleading ; expertise, c'est un savoir très développé.",
      bravo: "Unprecedented, automation, transferable, misleading, creativity.",
      expliquer: "<p><b>To deceive</b> : tromper, d'où <b>misleading</b>, trompeur.</p>" },
    { nom: "Find words 6 to 10", type: "trous",
      titre: "Exercise 1: find words in the text that mean… (6 to 10)",
      phrases: ["6. a new or improved idea, method, or product: [innovation]", "7. the ability to change according to circumstances: [adaptability]", "8. becoming no longer useful or necessary: [obsolete]", "9. the ability to understand another person's feelings: [empathy]", "10. the ability to continue learning throughout one's life: [lifelong learning]"],
      jetons: ["innovation", "adaptability", "obsolete", "empathy", "lifelong learning", "assumption", "evidence"],
      aide: "Assumption = ce qu'on croit sans preuve ; evidence = la preuve.",
      bravo: "Innovation, adaptability, obsolete, empathy, lifelong learning.",
      expliquer: "<p>Faux ami : <b>evidence</b> veut dire « preuve(s) », pas « évidence ».</p>" },
    { nom: "Matching", type: "paires",
      titre: "Exercise 2: match the words with their definitions.",
      gauche: ["1. unprecedented", "2. assumption", "3. evidence", "4. innovation", "5. adaptability", "6. empathy", "7. obsolete", "8. expertise"],
      droite: ["a. understanding another person's feelings", "b. the ability to change easily", "c. something accepted as true without proof", "d. something that provides proof", "e. never having happened before", "f. a new idea, method, or approach", "g. no longer useful: something newer exists", "h. highly developed knowledge or skill"],
      bon: [4, 2, 3, 5, 1, 0, 6, 7], taille: 16, tailleD: 15,
      aides: ["Un rythme jamais vu avant.", "Une supposition : on la croit vraie sans preuve.", "Evidence = preuve.", "Quelque chose de nouveau.", "Changer facilement.", "Comprendre les sentiments de l'autre.", "Dépassé, remplacé par plus récent.", "Un savoir-faire très poussé."],
      bravo: "1-e, 2-c, 3-d, 4-f, 5-b, 6-a, 7-g, 8-h.",
      expliquer: "<p>Answer key : 1-e, 2-c, 3-d, 4-f, 5-b, 6-a, 7-g, 8-h.</p>" }
  ]
}));
