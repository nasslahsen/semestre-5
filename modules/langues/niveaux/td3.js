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
      aides: ["“Exclusively”: the text says “not simply about making money”.", "Paragraph 2: “recognize problems and turn them into business opportunities”.", "Paragraph 3: “Many start-ups struggle to attract customers”.", "“Always”: paragraph 4, “does not necessarily mean inventing something completely new”.", "Paragraph 5: “Financial literacy is equally important”.", "Paragraph 5: “they treat it as a learning experience”.", "Paragraph 6: “contribute to national development”.", "Paragraph 6: “Governments can support this process”.", "Paragraph 6: “encourages young people to become economically independent”.", "“Every”: paragraph 7, “not every business idea becomes successful”."],
      bravo: "True: 2, 5, 6, 7, 9. False: 1, 3, 4, 8, 10.",
      expliquer: "<p>Suggested answer. The five false statements contain an absolute word or a reversal: <i>exclusively, easy, always, no responsibility, every</i>.</p>" },
    { nom: "Justify 1", type: "choix",
      titre: "Justify: “Entrepreneurship consists exclusively of making money.” False, because the text says:",
      options: [
        { t: "“Entrepreneurship is not simply about making money; it is also about finding practical solutions to everyday challenges.”", ok: true },
        { t: "“Entrepreneurs are individuals who are willing to take calculated risks.”", aide: "True in the text, but it doesn't talk about money." },
        { t: "“Business owners must understand budgeting, investment, costs, and profits.”", aide: "This sentence talks about money without saying it isn't the only aim." }],
      bravo: "Paragraphe 2.",
      expliquer: "<p>To justify = quote the sentence from the text that contradicts (or confirms) the statement, in quotation marks.</p>" },
    { nom: "Justify 4", type: "choix",
      titre: "Justify: “Innovation always requires inventing completely new products.” False, because:",
      options: [
        { t: "“Innovation does not necessarily mean inventing something completely new. It can also involve improving an existing product.”", ok: true },
        { t: "“Modern entrepreneurs increasingly rely on digital platforms.”", aide: "That says nothing about “completely new”." },
        { t: "“Another essential element of entrepreneurship is innovation.”", aide: "This sentence confirms that innovation matters, not what it is." }],
      bravo: "Paragraphe 4.",
      expliquer: "<p><b>Not necessarily</b>: not always. It's the exact opposite of <i>always</i>.</p>" },
    { nom: "Justify 8", type: "choix",
      titre: "Justify: “Governments have no responsibility for encouraging entrepreneurship.” False, because:",
      options: [
        { t: "“Governments can support this process by providing training programmes, financial assistance, business incubators, and simplified administrative procedures.”", ok: true },
        { t: "“Obtaining financial support from banks or investors can be particularly challenging.”", aide: "This sentence is about banks, not the government." },
        { t: "“Small and medium-sized enterprises create employment opportunities.”", aide: "It's about SMEs, not the role of the government." }],
      bravo: "Paragraphe 6.",
      expliquer: "<p>Vocabulary: <b>business incubators</b> (structures that help new companies start), <b>financial assistance</b> (money to help).</p>" }
  ]
}));
