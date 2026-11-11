/*
 * Module Langues étrangères 5 : ordre des pages. Couleurs, sous-modules et statut : registre.js.
 * Sous-module Anglais : trois cours en diapositives (soft skills, entretien d'embauche, présentations) et des fiches
 * d'entraînement (textes à lire, questions d'entretien, grammaire), rangées dans l'espace TD.
 * Les exercices et les textes restent en anglais, comme à l'examen ; les explications sont en français.
 * chapitres[].sousModule : sous-module du registre auquel le chapitre appartient.
 * niveaux : pages du jeu, dans l'ordre (cours : true quand cours/<id>.html existe ;
 *           revision, boss : niveaux de fin de chapitre ; pret : niveau jouable).
 * cours : pages de cours (une par notion), sources des pages de chapitre.
 * sections : le cours de chaque chapitre en sections (une idée chacune) ; chaque section réunit des pages de cours, dans l'ordre.
 */
PLATEFORME.parcours("langues", {
  // Documents reçus (titres seulement : les fichiers restent hors du dépôt) ; page « Mon suivi ».
  documents: {
    recus: [
      { sousModule: "anglais", titre: "Soft Skills for Engineers (diapositives)", couvre: "chapitre 1" },
      { sousModule: "anglais", titre: "Job Interview Skills (diapositives)", couvre: "chapitre 2" },
      { sousModule: "anglais", titre: "Effective Presentation Skills (diapositives)", couvre: "chapitre 3" },
      { sousModule: "anglais", titre: "Interview Questions – Practice", couvre: "TD 1, sans corrigé (correction proposée)" },
      { sousModule: "anglais", titre: "The Skills of the Future (texte, exercices et answer key)", couvre: "TD 2, avec le corrigé du document" },
      { sousModule: "anglais", titre: "Entrepreneurship: Turning Ideas into Opportunities", couvre: "TD 3, sans corrigé (correction proposée)" },
      { sousModule: "anglais", titre: "When Employees Give Something Extra", couvre: "TD 4, sans corrigé (correction proposée)" },
      { sousModule: "anglais", titre: "Little, a little, few, a few (Q004, avec key)", couvre: "TD 5, avec le corrigé de la fiche" },
      { sousModule: "anglais", titre: "Make or Do", couvre: "TD 5, sans corrigé (correction proposée)" }
    ],
    manque: [
      "Anglais : les enregistrements audio des extraits de Silvia et d'Alejandro (TD 1), et le corrigé des fiches Interview Questions, Entrepreneurship, When Employees Give Something Extra et Make or Do."
    ]
  },
  chapitres: [
    { id: 1, titre: "Soft skills for engineers", sous: "Hard skills et soft skills, ce qu'elles couvrent, ce que veulent les employeurs", ligne: "Hard skills, soft skills, ce que veulent les employeurs", sousModule: "anglais" },
    { id: 2, titre: "Job interview skills", sous: "Définition, préparation, types d'entretien, questions types, mauvaise impression", ligne: "Préparer, types d'entretien, questions types", sousModule: "anglais" },
    { id: 3, titre: "Effective presentation skills", sous: "OPEN UP, objectifs, introduction, voix, langage du corps, supports visuels", ligne: "OPEN UP, introduction, voix, corps, supports", sousModule: "anglais" },
    { id: 4, td: true, numero: "TD 1", titre: "TD 1 : interview questions", sous: "Trois types de questions, les extraits de Silvia et d'Alejandro", ligne: "Types de questions, Silvia, Alejandro", sousModule: "anglais" },
    { id: 5, td: true, numero: "TD 2", titre: "TD 2 : the skills of the future", sous: "Compréhension, QCM, vocabulaire, formation des mots, synonymes", ligne: "Compréhension, vocabulaire, formation des mots", sousModule: "anglais" },
    { id: 6, td: true, numero: "TD 3", titre: "TD 3 : entrepreneurship", sous: "Vrai ou faux justifié, QCM", ligne: "Vrai ou faux justifié, QCM", sousModule: "anglais" },
    { id: 7, td: true, numero: "TD 4", titre: "TD 4 : when employees give something extra", sous: "Vocabulaire, vrai ou faux, questions", ligne: "Vocabulaire, vrai ou faux, questions", sousModule: "anglais" },
    { id: 8, td: true, numero: "TD 5", titre: "TD 5 : grammar and vocabulary", sous: "Little, a little, few, a few ; make ou do", ligne: "Little, a little, few, a few ; make ou do", sousModule: "anglais" }
  ],
  niveaux: [
    { id: "soft-hard", chapitre: 1, titre: "Hard skills or soft skills?", cours: true, pret: true },
    { id: "soft-exemples", chapitre: 1, titre: "What soft skills cover", cours: true, pret: true },
    { id: "soft-enquete", chapitre: 1, titre: "Why employers want them", cours: true, pret: true },
    { id: "revision-soft", chapitre: 1, titre: "Révision : soft skills", revision: true, pret: true },
    { id: "boss-soft", chapitre: 1, titre: "The engineering job offer", boss: true, pret: true },

    { id: "entretien-definition", chapitre: 2, titre: "What a job interview is", cours: true, pret: true },
    { id: "entretien-preparation", chapitre: 2, titre: "Six ways to prepare", cours: true, pret: true },
    { id: "entretien-types", chapitre: 2, titre: "Five types of interview", cours: true, pret: true },
    { id: "entretien-questions", chapitre: 2, titre: "Typical questions, bad impressions", cours: true, pret: true },
    { id: "revision-entretien", chapitre: 2, titre: "Révision : job interviews", revision: true, pret: true },
    { id: "boss-entretien", chapitre: 2, titre: "Interview day", boss: true, pret: true },

    { id: "presentation-openup", chapitre: 3, titre: "OPEN UP and the four objectives", cours: true, pret: true },
    { id: "presentation-debut", chapitre: 3, titre: "A strong start: introduction and voice", cours: true, pret: true },
    { id: "presentation-corps", chapitre: 3, titre: "Body language, visual aids, final tips", cours: true, pret: true },
    { id: "revision-presentation", chapitre: 3, titre: "Révision : presentations", revision: true, pret: true },
    { id: "boss-presentation", chapitre: 3, titre: "The project presentation", boss: true, pret: true },

    { id: "td1", chapitre: 4, titre: "Practice 1 : three types of questions", cours: true, pret: true },
    { id: "td1-silvia", chapitre: 4, titre: "Exercise b : Silvia's extracts", pret: true },
    { id: "td1-alejandro", chapitre: 4, titre: "Exercise e : Alejandro's answers", pret: true },
    { id: "td1-organiser", chapitre: 4, titre: "Exercise f : organising an answer", pret: true },

    { id: "td2", chapitre: 5, titre: "Comprehension : questions 1 to 5", cours: true, pret: true },
    { id: "td2-questions", chapitre: 5, titre: "Comprehension : questions 6 to 10", pret: true },
    { id: "td2-vrai-faux", chapitre: 5, titre: "Exercise 2 : true or false", pret: true },
    { id: "td2-qcm", chapitre: 5, titre: "Exercise 3 : multiple choice", pret: true },
    { id: "td2-vocabulaire", chapitre: 5, titre: "Find the words, match the definitions", pret: true },
    { id: "td2-formation", chapitre: 5, titre: "Fill in the blanks, word formation", pret: true },
    { id: "td2-synonymes", chapitre: 5, titre: "Synonyms, antonyms, words in context", pret: true },

    { id: "td3", chapitre: 6, titre: "Exercise 1 : true or false, justify", cours: true, pret: true },
    { id: "td3-qcm", chapitre: 6, titre: "Exercise 2 : multiple choice 1 to 4", pret: true },
    { id: "td3-qcm-2", chapitre: 6, titre: "Exercise 2 : multiple choice 5 to 8", pret: true },

    { id: "td4", chapitre: 7, titre: "I. Vocabulary", cours: true, pret: true },
    { id: "td4-vrai-faux", chapitre: 7, titre: "II. True or false", pret: true },
    { id: "td4-questions", chapitre: 7, titre: "III. Answer the questions", pret: true },

    { id: "td5", chapitre: 8, titre: "Little, a little, few, a few", cours: true, pret: true },
    { id: "td5-make-do-a", chapitre: 8, titre: "Make or do : part A", pret: true },
    { id: "td5-make-do-b", chapitre: 8, titre: "Make or do : part B", pret: true },
    { id: "td5-make-do-c", chapitre: 8, titre: "Make or do : part C", pret: true }
  ],
  sections: [
    { id: "soft-hard", chapitre: 1, titre: "Hard skills and soft skills", notions: ["soft-hard"] },
    { id: "soft-exemples", chapitre: 1, titre: "What soft skills cover", notions: ["soft-exemples"] },
    { id: "soft-enquete", chapitre: 1, titre: "Why employers want them", notions: ["soft-enquete"] },

    { id: "entretien-definition", chapitre: 2, titre: "What a job interview is", notions: ["entretien-definition"] },
    { id: "entretien-preparation", chapitre: 2, titre: "Pre-interview preparation", notions: ["entretien-preparation"] },
    { id: "entretien-types", chapitre: 2, titre: "Types of interviews", notions: ["entretien-types"] },
    { id: "entretien-questions", chapitre: 2, titre: "Typical questions and bad impressions", notions: ["entretien-questions"] },

    { id: "presentation-openup", chapitre: 3, titre: "The exceptional presenter", notions: ["presentation-openup"] },
    { id: "presentation-debut", chapitre: 3, titre: "Introduction and voice", notions: ["presentation-debut"] },
    { id: "presentation-corps", chapitre: 3, titre: "Body language, visual aids, final tips", notions: ["presentation-corps"] },

    { id: "td1", chapitre: 4, titre: "TD 1 : où chercher chaque réponse", notions: ["td1"] },
    { id: "td1-corrige", chapitre: 4, titre: "TD 1 : énoncé et correction", notions: ["td1-corrige"] },
    { id: "td2", chapitre: 5, titre: "TD 2 : le texte", notions: ["td2"] },
    { id: "td2-corrige", chapitre: 5, titre: "TD 2 : énoncé et corrigé", notions: ["td2-corrige"] },
    { id: "td3", chapitre: 6, titre: "TD 3 : le texte", notions: ["td3"] },
    { id: "td3-corrige", chapitre: 6, titre: "TD 3 : énoncé et correction", notions: ["td3-corrige"] },
    { id: "td4", chapitre: 7, titre: "TD 4 : le texte", notions: ["td4"] },
    { id: "td4-corrige", chapitre: 7, titre: "TD 4 : énoncé et correction", notions: ["td4-corrige"] },
    { id: "td5", chapitre: 8, titre: "TD 5 : les règles", notions: ["td5"] },
    { id: "td5-corrige", chapitre: 8, titre: "TD 5 : énoncé et correction", notions: ["td5-corrige"] }
  ],
  cours: [
    { chapitre: 1, id: "soft-hard", titre: "Hard skills and soft skills" },
    { chapitre: 1, id: "soft-exemples", titre: "What soft skills cover" },
    { chapitre: 1, id: "soft-enquete", titre: "Why employers want soft skills" },
    { chapitre: 2, id: "entretien-definition", titre: "What a job interview is" },
    { chapitre: 2, id: "entretien-preparation", titre: "Pre-interview preparation techniques" },
    { chapitre: 2, id: "entretien-types", titre: "Types of interviews" },
    { chapitre: 2, id: "entretien-questions", titre: "Typical questions and bad impressions" },
    { chapitre: 3, id: "presentation-openup", titre: "The exceptional presenter: OPEN UP" },
    { chapitre: 3, id: "presentation-debut", titre: "Introduction and voice" },
    { chapitre: 3, id: "presentation-corps", titre: "Body language, visual aids, final tips" },
    { chapitre: 4, id: "td1", titre: "TD 1 : interview questions" },
    { chapitre: 4, id: "td1-corrige", titre: "TD 1 : énoncé et correction" },
    { chapitre: 5, id: "td2", titre: "TD 2 : the skills of the future" },
    { chapitre: 5, id: "td2-corrige", titre: "TD 2 : énoncé et corrigé" },
    { chapitre: 6, id: "td3", titre: "TD 3 : entrepreneurship" },
    { chapitre: 6, id: "td3-corrige", titre: "TD 3 : énoncé et correction" },
    { chapitre: 7, id: "td4", titre: "TD 4 : when employees give something extra" },
    { chapitre: 7, id: "td4-corrige", titre: "TD 4 : énoncé et correction" },
    { chapitre: 8, id: "td5", titre: "TD 5 : little, few, make, do" },
    { chapitre: 8, id: "td5-corrige", titre: "TD 5 : énoncé et correction" }
  ]
});
