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
    { id: 1, titre: "Le laboratoire médical", sous: "Missions, types, secteurs, circuit de l'échantillon, trois phases, biosécurité", ligne: "Missions, secteurs, circuit, phases, biosécurité" }
  ],
  niveaux: [
    { id: "lbm", chapitre: 1, titre: "Missions et types de laboratoires", cours: true, pret: true },
    { id: "secteurs", chapitre: 1, titre: "Les secteurs du laboratoire", cours: true, pret: true },
    { id: "circuit", chapitre: 1, titre: "Le circuit de l'échantillon", cours: true, pret: true },
    { id: "phases", chapitre: 1, titre: "Les trois phases", cours: true, pret: true },
    { id: "biosecurite", chapitre: 1, titre: "Biosécurité et équipements", cours: true, pret: true },
    { id: "revision-laboratoire", chapitre: 1, titre: "Révision : le laboratoire", revision: true, pret: true },
    { id: "boss-laboratoire", chapitre: 1, titre: "Une matinée au laboratoire", boss: true, pret: true }
  ],
  sections: [
    { id: "laboratoire", chapitre: 1, titre: "Le laboratoire et son organisation", notions: ["lbm", "secteurs"] },
    { id: "patient-resultat", chapitre: 1, titre: "Du patient au résultat", notions: ["circuit", "phases"] },
    { id: "biosecurite", chapitre: 1, titre: "Biosécurité", notions: ["biosecurite"] }
  ],
  cours: [
    { chapitre: 1, id: "lbm", titre: "Définition, missions et types de laboratoires" },
    { chapitre: 1, id: "secteurs", titre: "Organisation et secteurs du laboratoire" },
    { chapitre: 1, id: "circuit", titre: "Le circuit de l'échantillon biologique" },
    { chapitre: 1, id: "phases", titre: "Phases pré-analytique, analytique et post-analytique" },
    { chapitre: 1, id: "biosecurite", titre: "Biosécurité et risques liés aux équipements" }
  ]
});
