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
      aides: ["The text: some jobs disappear, others appear.", "“Critical thinkers … examine evidence”.", "“Creativity is not limited to artistic activities”.", "“People from different cultures, professions, and geographical locations”.", "“Adaptable individuals are willing to … acquire new knowledge”.", "Watch out for “exclusively”: the text also talks about other people's feelings.", "Watch out for “only”: “not simply a list of technical abilities”.", "“Schools, universities, employers, and governments all have a role to play”."],
      bravo: "True: 2, 4, 5, 8. False: 1, 3, 6, 7.",
      expliquer: "<p>Absolute words (<i>no, only, exclusively</i>) often signal a false statement: check them in the text.</p>" },
    { nom: "Correct statement 3", type: "choix",
      titre: "Correct the false statement: “Creativity is useful only in artistic professions.”",
      options: [
        { t: "Creativity is important not only in artistic professions but also in science, business, engineering, education, and entrepreneurship.", ok: true },
        { t: "Creativity is useful in no profession.", aide: "Your correction must use the text, not say the absolute opposite." },
        { t: "Creativity is useful only in engineering.", aide: "The text names several fields, not just one." }],
      bravo: "Correction from the answer key.",
      expliquer: "<p>To correct a false statement: keep the subject, replace the mistake with what the text says. <i>Not only… but also…</i> is ideal.</p>" },
    { nom: "Correct statement 6", type: "choix",
      titre: "Correct the false statement: “Emotional intelligence refers exclusively to controlling one's own emotions.”",
      options: [
        { t: "Emotional intelligence involves understanding one's own emotions and understanding the feelings of others.", ok: true },
        { t: "Emotional intelligence refers exclusively to the feelings of others.", aide: "Still “exclusively”: the text talks about both." },
        { t: "Emotional intelligence has nothing to do with emotions.", aide: "The text defines it precisely through emotions." }],
      bravo: "Your own emotions and other people's.",
      expliquer: "<p>Paragraph 6: <i>understand their own emotions … respond appropriately to the feelings of others</i>.</p>" },
    { nom: "Correct statement 7", type: "choix",
      titre: "Correct the false statement: “Technical skills are the only abilities necessary for future professional success.”",
      options: [
        { t: "The text emphasizes the importance of intellectual, social, emotional, and technological skills.", ok: true },
        { t: "Technical skills are not necessary at all.", aide: "The text doesn't reject technical skills." },
        { t: "Only emotional skills are necessary.", aide: "You are replacing one “only” with another: still false." }],
      bravo: "Correction from the answer key.",
      expliquer: "<p>The final paragraph: <i>a combination of intellectual, social, emotional, and technological capacities</i>.</p>" }
  ]
}));
