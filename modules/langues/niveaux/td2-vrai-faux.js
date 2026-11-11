/* TD 2, Comprehension, Exercise 2 (True or False, corriger les fausses) : réponses de l'answer key du document. */
NIVEAU(ANG.niveau({
  id: "td2-vrai-faux",
  carte: { etiquette: "The Skills of the Future", titre: "Exercise 2: True or False", texte: "Write True or False. Correct the false statements." },
  etapes: [
    { nom: "Statements 1 to 8", type: "trier",
      titre: "Write True or False for each statement.",
      cartes: [{ t: "1. Automation is expected to have no effect on employment.", bac: 1 }, { t: "2. Critical thinking involves examining evidence before reaching conclusions.", bac: 0 },
        { t: "3. Creativity is useful only in artistic professions.", bac: 1 }, { t: "4. Workplaces may include people from different cultures and locations.", bac: 0 },
        { t: "5. Adaptable workers are willing to acquire new knowledge.", bac: 0 }, { t: "6. Emotional intelligence refers exclusively to controlling one's own emotions.", bac: 1 },
        { t: "7. Technical skills are the only abilities necessary for future success.", bac: 1 }, { t: "8. Several institutions should contribute to preparing people for the future.", bac: 0 }],
      bacs: [{ t: "True" }, { t: "False" }],
      taille: 15,
      aides: ["Le texte : des métiers disparaissent, d'autres apparaissent.", "« Critical thinkers … examine evidence ».", "« Creativity is not limited to artistic activities ».", "« People from different cultures, professions, and geographical locations ».", "« Adaptable individuals are willing to … acquire new knowledge ».", "Méfie-toi de « exclusively » : le texte parle aussi des émotions des autres.", "Méfie-toi de « only » : « not simply a list of technical abilities ».", "« Schools, universities, employers, and governments all have a role to play »."],
      bravo: "True : 2, 4, 5, 8. False : 1, 3, 6, 7.",
      expliquer: "<p>Les mots absolus (<i>no, only, exclusively</i>) signalent souvent une phrase fausse : vérifie-les dans le texte.</p>" },
    { nom: "Correct statement 3", type: "choix",
      titre: "Correct the false statement: “Creativity is useful only in artistic professions.”",
      options: [
        { t: "Creativity is important not only in artistic professions but also in science, business, engineering, education, and entrepreneurship.", ok: true },
        { t: "Creativity is useful in no profession.", aide: "Ta correction doit reprendre le texte, pas dire l'inverse absolu." },
        { t: "Creativity is useful only in engineering.", aide: "Le texte cite plusieurs domaines, pas un seul." }],
      bravo: "Correction de l'answer key.",
      expliquer: "<p>Corriger une phrase fausse : garder le sujet, remplacer l'erreur par ce que dit le texte. <i>Not only… but also…</i> est idéal.</p>" },
    { nom: "Correct statement 6", type: "choix",
      titre: "Correct the false statement: “Emotional intelligence refers exclusively to controlling one's own emotions.”",
      options: [
        { t: "Emotional intelligence involves understanding one's own emotions and understanding the feelings of others.", ok: true },
        { t: "Emotional intelligence refers exclusively to the feelings of others.", aide: "Toujours « exclusively » : le texte parle des deux." },
        { t: "Emotional intelligence has nothing to do with emotions.", aide: "Le texte la définit justement par les émotions." }],
      bravo: "Ses émotions et celles des autres.",
      expliquer: "<p>Le paragraphe 6 : <i>understand their own emotions … respond appropriately to the feelings of others</i>.</p>" },
    { nom: "Correct statement 7", type: "choix",
      titre: "Correct the false statement: “Technical skills are the only abilities necessary for future professional success.”",
      options: [
        { t: "The text emphasizes the importance of intellectual, social, emotional, and technological skills.", ok: true },
        { t: "Technical skills are not necessary at all.", aide: "Le texte ne rejette pas les compétences techniques." },
        { t: "Only emotional skills are necessary.", aide: "On remplace un « only » par un autre : toujours faux." }],
      bravo: "Correction de l'answer key.",
      expliquer: "<p>Le paragraphe final : <i>a combination of intellectual, social, emotional, and technological capacities</i>.</p>" }
  ]
}));
