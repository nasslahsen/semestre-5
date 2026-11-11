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
      aides: ["Paragraphe 1 : « look at Japanese productivity with envy ».", "Paragraphe 2 : c'est la grande entreprise qui a approché Piggly-Wiggly.", "Paragraphe 3 : « The relieved employees… ».", "Paragraphe 3 : truckers in overalls, executives in coat and tie.", "Paragraphe 4 : ils ont emprunté l'idée, pas un camion.", "Paragraphe 4 : une perte, et quand même 8 % d'augmentation."],
      bravo: "True : 1, 3, 6. False : 2, 4, 5.",
      expliquer: "<p>Correction proposée. Les phrases 2 et 5 inversent ou déforment le texte : lis le sujet et l'objet de chaque verbe.</p>" },
    { nom: "Correct statement 2", type: "choix",
      titre: "Statement 2 is false. What does the text say?",
      options: [
        { t: "A large corporation approached Piggly-Wiggly with a buy-out offer.", ok: true },
        { t: "Piggly-Wiggly bought a large corporation.", aide: "Personne n'a acheté personne : l'offre a été refusée." },
        { t: "Delta approached Piggly-Wiggly.", aide: "Delta n'intervient qu'à propos de l'idée du cadeau." }],
      bravo: "Piggly-Wiggly « was approached by a large corporation ».",
      expliquer: "<p>Le texte est au passif (<i>was approached by</i>) : le sujet grammatical n'est pas celui qui agit. C'est le piège de la phrase 2.</p>" },
    { nom: "Correct statement 5", type: "choix",
      titre: "Statement 5 is false. What did Piggly-Wiggly employees borrow from Delta's workers?",
      options: [
        { t: "The idea of giving something to their company", ok: true },
        { t: "A tractor trailer", aide: "Le camion a été acheté avec les 40 000 dollars collectés." },
        { t: "A plane", aide: "L'avion, c'est le cadeau des employés de Delta à leur compagnie." }],
      bravo: "« The idea of giving something to their company had been borrowed from the people who worked at Delta ».",
      expliquer: "<p>Le plus-que-parfait (<i>had been borrowed</i>) montre que l'idée de Delta est antérieure.</p>" }
  ]
}));
