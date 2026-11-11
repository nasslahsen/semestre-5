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
      aides: ["Talking about yourself: that is the definition of type a.", "“Experience relevant for this position”: proving you have the experience required.", "What you learnt: the skills you gained (Alejandro answers it with his skills).", "Your strengths: your personality (type a). Suggested answer: it could also be c.", "To talk about the website, you must have looked at it: research on the company.", "What attracts you to the post: you show that you know the post."],
      bravo: "1 a, 2 c, 3 c, 4 a, 5 b, 6 b.",
      expliquer: "<p>Suggested answer (the sheet has no key). Questions 3 and 4 can be discussed: 3 is c if you answer with your skills, 4 is a if you talk about your personality.</p>" },
    { nom: "Questions 7 to 12", type: "trier",
      titre: "Now questions 7 to 12.",
      cartes: [{ t: "7. How would your colleagues describe you?", bac: 0 }, { t: "8. What sorts of projects did you work on in your last position?", bac: 2 },
        { t: "9. What university did you attend and why did you choose it?", bac: 0 }, { t: "10. How do you typically approach new projects?", bac: 2 },
        { t: "11. What do you know about our company?", bac: 1 }, { t: "12. Where do you see yourself in five years' time?", bac: 0 }],
      bacs: [{ t: "a", sous: "yourself" }, { t: "b", sous: "research" }, { t: "c", sous: "skills, experience" }],
      aides: ["How others see you: your personality.", "The projects in your last post: your experience.", "Your background and your choices: you.", "Your way of working: a skill.", "What you know about the company: your research.", "Your ambitions: type a mentions “your ambitions”."],
      bravo: "7 a, 8 c, 9 a, 10 c, 11 b, 12 a.",
      expliquer: "<p>You prepare the b questions (5, 6, 11) with the technique <i>research the organization</i> from chapter 2.</p>" },
    { nom: "Why type b?", type: "choix",
      titre: "Why is “What do you think about our website?” a type b question?",
      options: [
        { t: "Because you can only answer it if you have researched the company", ok: true },
        { t: "Because it is about your personality", aide: "That's type a." },
        { t: "Because it tests your technical skills", aide: "That's type c." }],
      bravo: "You must have looked at the website: proof of research.",
      expliquer: "<p>That's what Silvia does in exercise b: <i>I had a look at your website…</i></p>" },
    { nom: "Ambitions", type: "vf",
      titre: "True or false: “Where do you see yourself in five years' time?” asks about your ambitions, so it is type a.",
      vrai: true, aide: "Read the definition of type a again.",
      bravo: "True: “your ambitions” is in the definition of type a.",
      expliquer: "<p>Chapter 2 has the same question: <i>How do you see your career developing (5 years)?</i></p>" }
  ]
}));
