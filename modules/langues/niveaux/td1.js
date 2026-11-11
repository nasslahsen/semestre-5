/* TD 1, Practice 1 : classer douze questions d'entretien en trois types (a, b, c). Correction proposée : la fiche n'a pas de corrigé. */
NIVEAU(ANG.niveau({
  id: "td1",
  carte: { etiquette: "Interview Questions – Practice", titre: "Three types of questions", texte: "a. Questions that require you to talk about yourself, your ambitions, your personality, your hobbies and interests.\n\nb. Questions that require you to prove you have researched the job and company you have applied to work with.\n\nc. Questions that require you to demonstrate you have the skills and experience required for the job." },
  etapes: [
    { nom: "Questions 1 to 6", type: "trier",
      titre: "Write the type of question (a, b or c) next to each question: questions 1 to 6.",
      cartes: [{ t: "1. Can you tell us something about yourself?", bac: 0 }, { t: "2. What experience do you have that is relevant for this position?", bac: 2 },
        { t: "3. What did you learn during your time at university?", bac: 2 }, { t: "4. What do you see as your strengths?", bac: 0 },
        { t: "5. What do you think about our website?", bac: 1 }, { t: "6. What attracted you to the position?", bac: 1 }],
      bacs: [{ t: "a", sous: "yourself" }, { t: "b", sous: "research" }, { t: "c", sous: "skills, experience" }],
      aides: ["Parler de toi : c'est la définition même du type a.", "« Experience relevant for this position » : prouver qu'on a l'expérience demandée.", "Ce qu'on a appris : les compétences acquises (Alejandro y répond par ses compétences).", "Tes points forts : ta personnalité (type a). Correction proposée : on pourrait aussi y voir c.", "Pour parler du site, il faut l'avoir regardé : recherche sur l'entreprise.", "Ce qui t'attire dans le poste : tu montres que tu connais le poste."],
      bravo: "1 a, 2 c, 3 c, 4 a, 5 b, 6 b.",
      expliquer: "<p>Correction proposée (pas de corrigé sur la fiche). Les questions 3 et 4 peuvent se discuter : 3 se range en c si tu réponds par tes compétences, 4 en a si tu parles de ta personnalité.</p>" },
    { nom: "Questions 7 to 12", type: "trier",
      titre: "Now questions 7 to 12.",
      cartes: [{ t: "7. How would your colleagues describe you?", bac: 0 }, { t: "8. What sorts of projects did you work on in your last position?", bac: 2 },
        { t: "9. What university did you attend and why did you choose it?", bac: 0 }, { t: "10. How do you typically approach new projects?", bac: 2 },
        { t: "11. What do you know about our company?", bac: 1 }, { t: "12. Where do you see yourself in five years' time?", bac: 0 }],
      bacs: [{ t: "a", sous: "yourself" }, { t: "b", sous: "research" }, { t: "c", sous: "skills, experience" }],
      aides: ["Comment les autres te voient : ta personnalité.", "Les projets de ton dernier poste : ton expérience.", "Ton parcours et tes choix : toi.", "Ta méthode de travail : une compétence.", "Ce que tu sais de l'entreprise : ta recherche.", "Tes ambitions : le type a cite « your ambitions »."],
      bravo: "7 a, 8 c, 9 a, 10 c, 11 b, 12 a.",
      expliquer: "<p>Les questions b (5, 6, 11) se préparent avec la technique <i>research the organization</i> du chapitre 2.</p>" },
    { nom: "Why type b?", type: "choix",
      titre: "Why is “What do you think about our website?” a type b question?",
      options: [
        { t: "Because you can only answer it if you have researched the company", ok: true },
        { t: "Because it is about your personality", aide: "Ça, c'est le type a." },
        { t: "Because it tests your technical skills", aide: "Ça, c'est le type c." }],
      bravo: "Il faut avoir regardé le site : preuve de recherche.",
      expliquer: "<p>C'est ce que fait Silvia dans l'exercice b : <i>I had a look at your website…</i></p>" },
    { nom: "Ambitions", type: "vf",
      titre: "True or false: “Where do you see yourself in five years' time?” asks about your ambitions, so it is type a.",
      vrai: true, aide: "Relis la définition du type a.",
      bravo: "True : « your ambitions » est dans la définition du type a.",
      expliquer: "<p>Le cours du chapitre 2 a la même question : <i>How do you see your career developing (5 years)?</i></p>" }
  ]
}));
