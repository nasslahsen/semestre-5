/* Boss du chapitre 2 : une journée d'entretien, de la préparation à la dernière question, sans aide avant le premier essai. */
NIVEAU(ANG.niveau({
  id: "boss-entretien",
  carte: { etiquette: "Interview day", titre: "Junior biomedical engineer, Rabat", texte: "After a first phone call with HR, you are invited to an interview with three managers. The job: maintaining imaging equipment in a private hospital group." },
  etapes: [
    { nom: "The type", type: "choix",
      titre: "You will meet three managers at the same time. What type of interview is it, and what should you do?",
      options: [
        { t: "A panel interview: stay calm and keep eye contact with each of them", ok: true },
        { t: "A group interview: try to be the leader", aide: "Group = plusieurs candidats. Ici, plusieurs interviewers." },
        { t: "A screening interview: answer only about your degree", aide: "Le screening a déjà eu lieu : c'était l'appel des RH." }],
      bravo: "Panel interview : calme, rapport, regard pour chacun.",
      expliquer: "<p>Le premier appel des RH était le screening interview.</p>" },
    { nom: "The night before", type: "trier",
      titre: "The night before: sort your plan by technique.",
      cartes: [{ t: "Read about the hospital group's new MRI centre", bac: 0 }, { t: "Note the duties of the maintenance post", bac: 1 }, { t: "Revise how an MRI scanner works", bac: 2 }, { t: "List the hospitals and services of the group", bac: 0 },
        { t: "Check the skills required in the job offer", bac: 1 }, { t: "Revise the safety standards for imaging", bac: 2 }],
      bacs: [{ t: "Research the organization" }, { t: "Job analysis" }, { t: "Subject knowledge" }],
      aide: "L'entreprise, le poste, ou tes connaissances techniques ?",
      bravo: "Organisation, poste, connaissances : deux actions chacun.",
      expliquer: "<p>Ces trois techniques répondent aux questions « about the job » et « general knowledge ».</p>" },
    { nom: "The best answer", type: "choix",
      titre: "“Tell me about yourself.” Which answer gives the best impression?",
      options: [
        { t: "“I'm a biomedical engineering student. During my internship I repaired ultrasound probes, and I want to specialise in imaging.”", ok: true },
        { t: "“Well, I was born in Fes, I have two brothers, I like football…”", aide: "La question porte sur ton parcours utile pour le poste." },
        { t: "“It's all in my CV.”", aide: "Attitude négative et manque d'intérêt." }],
      bravo: "Parcours, exemple concret, objectif lié au poste.",
      expliquer: "<p>Formation, expérience concrète, objectif : trois phrases suffisent.</p>" },
    { nom: "Under pressure", type: "choix",
      titre: "Suddenly, one manager asks very fast questions without waiting for your answers. What is happening, and what is tested?",
      options: [
        { t: "A stress technique: they test how you handle adversity", ok: true },
        { t: "The manager is rude: you should leave", aide: "C'est volontaire : une technique décrite dans le cours." },
        { t: "They test your general knowledge", aide: "D'après le cours, on regarde comment tu réponds, pas quoi." }],
      bravo: "Stress interview : rester calme, répondre à une question à la fois.",
      expliquer: "<p>Questions <i>so quickly that the candidate doesn't have time to answer each one</i> : le but est de voir comment tu gères la pression.</p>" }
  ]
}));
