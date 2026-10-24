/*
 * Module Technologies de laboratoire d'analyses médicales : ordre des pages. Couleurs et statut : registre.js.
 * Source : le support du cours (Pr. EL BERGUI), modules/laboratoire/sources/ (jamais publié).
 * Les chapitres gardent la numérotation du cours. Le chapitre VI (microbiologie et biologie moléculaire) n'a que son titre
 * dans le support : il n'est pas construit.
 * niveaux : pages du jeu, dans l'ordre (cours : true quand cours/<id>.html existe ;
 *           revision, boss : niveaux de fin de chapitre ; pret : niveau jouable).
 * cours : pages de cours (une par notion), sources des pages de chapitre.
 * chapitres[].ligne : la ligne courte sous le titre, sur la carte.
 * sections : le cours de chaque chapitre en sections (une idée chacune) ; chaque section réunit des pages de cours, dans l'ordre.
 */
PLATEFORME.parcours("laboratoire", {
  chapitres: [
    { id: 1, titre: "Le laboratoire médical", sous: "Missions, types, secteurs, circuit de l'échantillon, trois phases, biosécurité", ligne: "Missions, secteurs, circuit, phases, biosécurité" },
    { id: 2, titre: "Échantillons et phase pré-analytique", sous: "Types d'échantillons, prélèvement, identification, conservation, centrifugation, erreurs", ligne: "Prélever, identifier, conserver, centrifuger" }
  ],
  niveaux: [
    { id: "lbm", chapitre: 1, titre: "Missions et types de laboratoires", cours: true, pret: true },
    { id: "secteurs", chapitre: 1, titre: "Les secteurs du laboratoire", cours: true, pret: true },
    { id: "circuit", chapitre: 1, titre: "Le circuit de l'échantillon", cours: true, pret: true },
    { id: "phases", chapitre: 1, titre: "Les trois phases", cours: true, pret: true },
    { id: "biosecurite", chapitre: 1, titre: "Biosécurité et équipements", cours: true, pret: true },
    { id: "revision-laboratoire", chapitre: 1, titre: "Révision : le laboratoire", revision: true, pret: true },
    { id: "boss-laboratoire", chapitre: 1, titre: "Une matinée au laboratoire", boss: true, pret: true },
    { id: "echantillons", chapitre: 2, titre: "Les types d'échantillons", cours: true, pret: true },
    { id: "prelevement", chapitre: 2, titre: "Le prélèvement", cours: true, pret: true },
    { id: "identification", chapitre: 2, titre: "Identification et traçabilité", cours: true, pret: true },
    { id: "conservation", chapitre: 2, titre: "Conservation et transport", cours: true, pret: true },
    { id: "froid", chapitre: 2, titre: "Réfrigérateurs et congélateurs", cours: true, pret: true },
    { id: "centrifugation", chapitre: 2, titre: "Centrifuger un échantillon", cours: true, pret: true },
    { id: "centrifugeuse", chapitre: 2, titre: "La centrifugeuse", cours: true, pret: true },
    { id: "erreurs-preanalytiques", chapitre: 2, titre: "Les erreurs pré-analytiques", cours: true, pret: true },
    { id: "revision-echantillons", chapitre: 2, titre: "Révision : les échantillons", revision: true, pret: true },
    { id: "boss-echantillons", chapitre: 2, titre: "Un échantillon de bout en bout", boss: true, pret: true }
  ],
  sections: [
    { id: "laboratoire", chapitre: 1, titre: "Le laboratoire et son organisation", notions: ["lbm", "secteurs"] },
    { id: "patient-resultat", chapitre: 1, titre: "Du patient au résultat", notions: ["circuit", "phases"] },
    { id: "biosecurite", chapitre: 1, titre: "Biosécurité", notions: ["biosecurite"] },
    { id: "echantillons-prelevement", chapitre: 2, titre: "Échantillons et prélèvement", notions: ["echantillons", "prelevement"] },
    { id: "identification", chapitre: 2, titre: "Identifier et tracer", notions: ["identification"] },
    { id: "conserver", chapitre: 2, titre: "Conserver et transporter", notions: ["conservation", "froid"] },
    { id: "centrifuger", chapitre: 2, titre: "Centrifuger", notions: ["centrifugation", "centrifugeuse"] },
    { id: "erreurs", chapitre: 2, titre: "Les erreurs pré-analytiques", notions: ["erreurs-preanalytiques"] }
  ],
  cours: [
    { chapitre: 1, id: "lbm", titre: "Définition, missions et types de laboratoires" },
    { chapitre: 1, id: "secteurs", titre: "Organisation et secteurs du laboratoire" },
    { chapitre: 1, id: "circuit", titre: "Le circuit de l'échantillon biologique" },
    { chapitre: 1, id: "phases", titre: "Phases pré-analytique, analytique et post-analytique" },
    { chapitre: 1, id: "biosecurite", titre: "Biosécurité et risques liés aux équipements" },
    { chapitre: 2, id: "echantillons", titre: "Principaux types d'échantillons biologiques" },
    { chapitre: 2, id: "prelevement", titre: "Principes généraux de prélèvement" },
    { chapitre: 2, id: "identification", titre: "Identification et traçabilité des échantillons" },
    { chapitre: 2, id: "conservation", titre: "Conservation et transport des échantillons" },
    { chapitre: 2, id: "froid", titre: "Réfrigérateurs et congélateurs" },
    { chapitre: 2, id: "centrifugation", titre: "Centrifugation et préparation des échantillons" },
    { chapitre: 2, id: "centrifugeuse", titre: "La centrifugeuse : principe, rotors et maintenance" },
    { chapitre: 2, id: "erreurs-preanalytiques", titre: "Sources d'erreurs pré-analytiques" }
  ]
});
