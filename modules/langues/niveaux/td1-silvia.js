/* TD 1, exercice b : compléter les extraits de l'entretien de Silvia avec les expressions de l'encadré. Correction proposée (l'audio n'a pas été envoyé). */
NIVEAU(ANG.niveau({
  id: "td1-silvia",
  carte: { etiquette: "Exercise b", titre: "Silvia's interview", texte: "Box: attracted me to · dynamic place to work · from everything I've learnt · It's clear from · look at your website · well-established reputation · research into the market (example)\n\n1. Well, before applying for this position I did some research into the market and Futerra came out on top." },
  etapes: [
    { nom: "Extracts 2 to 4", type: "trous",
      titre: "Complete extracts 2 to 4 with the phrases in the box.",
      phrases: ["2. I had a [look at your website] and could see that you work with a variety of people…", "3. Well, it's really something that [attracted me to] Futerra.", "4. The Junior Consultant post combines these two areas at a company with a [well-established reputation]."],
      jetons: ["look at your website", "attracted me to", "well-established reputation", "dynamic place to work", "It's clear from", "from everything I've learnt"],
      aide: "« I had a … » appelle un nom (a look) ; « something that … Futerra » appelle un verbe ; « a company with a … » appelle un nom.",
      bravo: "Had a look at your website ; attracted me to ; a well-established reputation.",
      expliquer: "<p><b>Well-established reputation</b> : une réputation solide, installée depuis longtemps. <b>To attract someone to</b> : attirer quelqu'un vers.</p>" },
    { nom: "Extracts 5 to 7", type: "trous",
      titre: "Complete extracts 5 to 7.",
      phrases: ["5. You came across online as an exciting, [dynamic place to work].", "6. [It's clear from] your website that Futerra is quite a small company…", "7. I definitely feel, [from everything I've learnt] about Futerra, that this is the type of organisation I'd like to work for."],
      jetons: ["dynamic place to work", "It's clear from", "from everything I've learnt", "look at your website", "attracted me to", "well-established reputation"],
      aide: "« an exciting, … » appelle un nom ; la phrase 6 commence par une majuscule ; « … about Futerra » : tout ce que tu as appris sur elle.",
      bravo: "A dynamic place to work ; It's clear from ; from everything I've learnt.",
      expliquer: "<p><b>To come across as</b> : donner l'impression d'être. <i>You came across online as…</i> : en ligne, vous donnez l'image de…</p>" },
    { nom: "Which question?", type: "choix",
      titre: "Silvia is answering one question. Which one, and what type is it in Practice 1?",
      options: [
        { t: "“What do you know about our company?”, type b", ok: true },
        { t: "“How would your colleagues describe you?”, type a", aide: "Silvia ne parle pas d'elle : elle parle de Futerra." },
        { t: "“How do you typically approach new projects?”, type c", aide: "Elle ne décrit pas sa méthode de travail." }],
      bravo: "Elle montre qu'elle a fait ses recherches : type b.",
      expliquer: "<p>Ses phrases sont des modèles à réutiliser : <i>I did some research into the market</i>, <i>I had a look at your website</i>, <i>It's clear from your website that…</i></p>" },
    { nom: "Meaning", type: "choix",
      titre: "“Futerra came out on top.” What does Silvia mean?",
      options: [{ t: "Futerra was the best in her research", ok: true }, { t: "Futerra is located at the top of a building", aide: "Expression figurée, pas un lieu." }, { t: "Futerra is the biggest company in the world", aide: "Elle dit plus loin que Futerra est une petite entreprise." }],
      bravo: "To come out on top = arriver en tête.",
      expliquer: "<p>Utile pour un entretien : <i>I compared several companies and yours came out on top.</i></p>" }
  ]
}));
