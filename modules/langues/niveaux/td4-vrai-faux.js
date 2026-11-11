/* TD 4, II. True or false (6 phrases) avec la correction des fausses. Correction proposée : la fiche n'a pas de corrigé. */
NIVEAU(ANG.niveau({
  id: "td4-vrai-faux",
  carte: { etiquette: "When Employees Give Something Extra", titre: "II. True or false", texte: "Six statements about Piggly-Wiggly Carolina and Delta Airlines. Check each one against the text." },
  etapes: [
    { nom: "Statements 1 to 6", type: "trier",
      titre: "Are these statements true or false?",
      cartes: [{ t: "1. Some American companies think Japanese workers are more productive.", bac: 0 }, { t: "2. Piggly-Wiggly approached a large corporation with a buy-out offer.", bac: 1 },
        { t: "3. The employees were relieved because the owners turned down the offer.", bac: 0 }, { t: "4. Executives wore overalls at the party.", bac: 1 },
        { t: "5. Piggly-Wiggly employees borrowed a truck from Delta's workers.", bac: 1 }, { t: "6. Delta workers got an 8 % raise even though Delta was losing money.", bac: 0 }],
      bacs: [{ t: "True" }, { t: "False" }], taille: 15,
      aides: ["Paragraph 1: “look at Japanese productivity with envy”.", "Paragraph 2: the large corporation approached Piggly-Wiggly.", "Paragraph 3: “The relieved employees…”.", "Paragraph 3: truckers in overalls, executives in coat and tie.", "Paragraph 4: they borrowed the idea, not a truck.", "Paragraph 4: a loss, and still an 8 % raise."],
      bravo: "True: 1, 3, 6. False: 2, 4, 5.",
      expliquer: "<p>Suggested answers. Statements 2 and 5 reverse or twist the text: check who does what in each sentence.</p>" },
    { nom: "Correct statement 2", type: "choix",
      titre: "Statement 2 is false. What does the text say?",
      options: [
        { t: "A large corporation approached Piggly-Wiggly with a buy-out offer.", ok: true },
        { t: "Piggly-Wiggly bought a large corporation.", aide: "Nobody bought anybody: the offer was refused." },
        { t: "Delta approached Piggly-Wiggly.", aide: "Delta only comes in for the idea of the gift." }],
      bravo: "Piggly-Wiggly “was approached by a large corporation”.",
      expliquer: "<p>The text uses the passive (<i>was approached by</i>): the subject of the sentence is not the one doing the action. That's the trap in statement 2.</p>" },
    { nom: "Correct statement 5", type: "choix",
      titre: "Statement 5 is false. What did Piggly-Wiggly employees borrow from Delta's workers?",
      options: [
        { t: "The idea of giving something to their company", ok: true },
        { t: "A tractor trailer", aide: "The truck was bought with the $40,000 they raised." },
        { t: "A plane", aide: "The plane was the Delta employees' gift to their company." }],
      bravo: "“The idea of giving something to their company had been borrowed from the people who worked at Delta”.",
      expliquer: "<p>The past perfect (<i>had been borrowed</i>) shows that Delta's idea came first.</p>" }
  ]
}));
