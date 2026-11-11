/* TD 3, « Entrepreneurship: Turning Ideas into Opportunities », Exercise 1 (True or False, justify). Correction proposée : le document n'a pas de corrigé. */
NIVEAU(ANG.niveau({
  id: "td3",
  carte: { etiquette: "Entrepreneurship", titre: "Exercise 1: True or False", texte: "Read the text carefully and decide whether the following statements are True or False. Justify your answers with evidence from the text." },
  etapes: [
    { nom: "Statements 1 to 10", type: "trier",
      titre: "True or False? Sort the ten statements.",
      cartes: [{ t: "1. Entrepreneurship consists exclusively of making money.", bac: 1 }, { t: "2. Entrepreneurs turn problems into business opportunities.", bac: 0 },
        { t: "3. Start-ups usually find it easy to attract customers at first.", bac: 1 }, { t: "4. Innovation always requires inventing completely new products.", bac: 1 },
        { t: "5. Financial literacy is an important skill for business owners.", bac: 0 }, { t: "6. Entrepreneurs consider failure an opportunity to learn.", bac: 0 },
        { t: "7. SMEs contribute to national economic development.", bac: 0 }, { t: "8. Governments have no responsibility for encouraging entrepreneurship.", bac: 1 },
        { t: "9. It can help young people become economically independent.", bac: 0 }, { t: "10. Every entrepreneurial project eventually becomes successful.", bac: 1 }],
      bacs: [{ t: "True" }, { t: "False" }], taille: 15,
      aides: ["« Exclusively » : le texte dit « not simply about making money ».", "Paragraphe 2 : « recognize problems and turn them into business opportunities ».", "Paragraphe 3 : « Many start-ups struggle to attract customers ».", "« Always » : paragraphe 4, « does not necessarily mean inventing something completely new ».", "Paragraphe 5 : « Financial literacy is equally important ».", "Paragraphe 5 : « they treat it as a learning experience ».", "Paragraphe 6 : « contribute to national development ».", "Paragraphe 6 : « Governments can support this process ».", "Paragraphe 6 : « encourages young people to become economically independent ».", "« Every » : paragraphe 7, « not every business idea becomes successful »."],
      bravo: "True : 2, 5, 6, 7, 9. False : 1, 3, 4, 8, 10.",
      expliquer: "<p>Correction proposée. Les cinq phrases fausses contiennent un mot absolu ou une inversion : <i>exclusively, easy, always, no responsibility, every</i>.</p>" },
    { nom: "Justify 1", type: "choix",
      titre: "Justify: “Entrepreneurship consists exclusively of making money.” False, because the text says:",
      options: [
        { t: "“Entrepreneurship is not simply about making money; it is also about finding practical solutions to everyday challenges.”", ok: true },
        { t: "“Entrepreneurs are individuals who are willing to take calculated risks.”", aide: "Vrai dans le texte, mais ça ne parle pas d'argent." },
        { t: "“Business owners must understand budgeting, investment, costs, and profits.”", aide: "Cette phrase parle d'argent sans dire que ce n'est pas le seul but." }],
      bravo: "Paragraphe 2.",
      expliquer: "<p>Justifier = citer la phrase du texte qui contredit (ou confirme) l'affirmation, entre guillemets.</p>" },
    { nom: "Justify 4", type: "choix",
      titre: "Justify: “Innovation always requires inventing completely new products.” False, because:",
      options: [
        { t: "“Innovation does not necessarily mean inventing something completely new. It can also involve improving an existing product.”", ok: true },
        { t: "“Modern entrepreneurs increasingly rely on digital platforms.”", aide: "Ça ne dit rien sur « completely new »." },
        { t: "“Another essential element of entrepreneurship is innovation.”", aide: "Cette phrase confirme que l'innovation compte, pas ce qu'elle est." }],
      bravo: "Paragraphe 4.",
      expliquer: "<p><b>Not necessarily</b> : pas forcément. C'est l'opposé exact de <i>always</i>.</p>" },
    { nom: "Justify 8", type: "choix",
      titre: "Justify: “Governments have no responsibility for encouraging entrepreneurship.” False, because:",
      options: [
        { t: "“Governments can support this process by providing training programmes, financial assistance, business incubators, and simplified administrative procedures.”", ok: true },
        { t: "“Obtaining financial support from banks or investors can be particularly challenging.”", aide: "Cette phrase parle des banques, pas de l'État." },
        { t: "“Small and medium-sized enterprises create employment opportunities.”", aide: "Elle parle des PME, pas du rôle de l'État." }],
      bravo: "Paragraphe 6.",
      expliquer: "<p>Vocabulaire : <b>business incubators</b> (incubateurs d'entreprises), <b>financial assistance</b> (aide financière).</p>" }
  ]
}));
