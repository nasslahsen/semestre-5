/*
 * Module Biomatériaux, biomécanique et prothèses : ordre des pages. Couleurs, sous-modules et statut : registre.js.
 * chapitres[].sousModule : sous-module du registre auquel le chapitre appartient.
 * niveaux : pages du jeu, dans l'ordre (cours : true quand cours/<id>.html existe ;
 *           revision, boss : niveaux de fin de chapitre ; pret : niveau jouable).
 * cours : pages de cours (une par notion), sources des pages de chapitre.
 * chapitres[].ligne : la ligne courte sous le titre, sur la carte.
 * sections : le cours de chaque chapitre en sections (une idée chacune) ; chaque section réunit des pages de cours, dans l'ordre.
 */
PLATEFORME.parcours("biomateriaux", {
  // Documents reçus (titres seulement : les fichiers restent hors du dépôt) ; page « Mon suivi ».
  documents: {
    recus: [
      { sousModule: "biomateriaux", titre: "Support du cours « Biomatériaux et biocompatibilité »", couvre: "chapitres 1 à 7" },
      { sousModule: "biomateriaux", titre: "TD 1, exercices 1.1 à 1.6", couvre: "repris dans les exercices des chapitres" }
    ]
  },
  chapitres: [
    { id: 0, titre: "Les bases", sous: "Contrainte, déformation, module, masse volumique : ce qu'il faut avant les matériaux", ligne: "Contrainte, déformation, module, masse volumique", sousModule: "biomateriaux" },
    { id: 1, titre: "Biomatériaux et dispositifs médicaux", sous: "Définitions, classes de risque, vocabulaire, nouvelles générations, marché", ligne: "Définitions, classes de risque, vocabulaire, marché", sousModule: "biomateriaux" },
    { id: 2, titre: "Les familles de matériaux", sous: "Liaisons, métaux, céramiques, polymères organiques et composites", ligne: "Liaisons, métaux, céramiques, polymères", sousModule: "biomateriaux" },
    { id: 3, titre: "Structure et états des polymères", sous: "Macromolécules, masse moléculaire, Tg, cristallinité, histoire des plastiques", ligne: "Masse moléculaire, Tg, cristallinité", sousModule: "biomateriaux" },
    { id: 4, titre: "Élastomères et caoutchoucs", sous: "Caoutchouc naturel, élasticité caoutchoutique, vulcanisation, formulation", ligne: "Élasticité caoutchoutique, vulcanisation", sousModule: "biomateriaux" },
    { id: 5, titre: "Additifs, charges et renforts", sous: "Adjuvants, plastifiants, charges, verre, carbone et aramide", ligne: "Adjuvants, plastifiants, charges, fibres", sousModule: "biomateriaux" },
    { id: 6, titre: "Les matériaux composites", sous: "Renfort et matrice, loi des mélanges, module transversal, orientation des fibres", ligne: "Loi des mélanges, orientation des fibres", sousModule: "biomateriaux" },
    { id: 7, titre: "Procédés de fabrication des plastiques", sous: "Extrusion, injection, soufflage, rotomoulage, thermoformage, compression", ligne: "Extrusion, injection, soufflage, moulage", sousModule: "biomateriaux" }
  ],
  niveaux: [
    { id: "contrainte-deformation", chapitre: 0, titre: "Contrainte et déformation", cours: true, pret: true },
    { id: "courbe-traction", chapitre: 0, titre: "La courbe de traction", cours: true, pret: true },
    { id: "echelle-log", chapitre: 0, titre: "Modules et échelle logarithmique", cours: true, pret: true },
    { id: "masse-volumique", chapitre: 0, titre: "Masse volumique et mélanges", cours: true, pret: true },
    { id: "revision-bases", chapitre: 0, titre: "Révision : les bases", revision: true, pret: true },
    { id: "boss-bases", chapitre: 0, titre: "L'éprouvette de la prothèse", boss: true, pret: true },

    { id: "definitions-biomateriau", chapitre: 1, titre: "Qu'est-ce qu'un biomatériau ?", cours: true, pret: true },
    { id: "generations", chapitre: 1, titre: "Quatre générations de biomatériaux", cours: true, pret: true },
    { id: "dispositif-medical", chapitre: 1, titre: "Le dispositif médical", cours: true, pret: true },
    { id: "classes-risque", chapitre: 1, titre: "Classes de risque I, IIa, IIb, III", cours: true, pret: true },
    { id: "vocabulaire", chapitre: 1, titre: "Implant, prothèse, organe, greffe", cours: true, pret: true },
    { id: "ingenierie-tissulaire", chapitre: 1, titre: "Ingénierie tissulaire et médecine régénérative", cours: true, pret: true },
    { id: "nanomedecine", chapitre: 1, titre: "Nanomédecine", cours: true, pret: true },
    { id: "marche", chapitre: 1, titre: "Le marché des biomatériaux", cours: true, pret: true },
    { id: "revision-biomateriaux", chapitre: 1, titre: "Révision : biomatériaux et dispositifs", revision: true, pret: true },
    { id: "boss-biomateriaux", chapitre: 1, titre: "Le dossier du dispositif", boss: true, pret: true },

    { id: "liaisons", chapitre: 2, titre: "Liaisons et propriétés", cours: true, pret: true },
    { id: "metaux", chapitre: 2, titre: "Métaux et alliages", cours: true, pret: true },
    { id: "ceramiques", chapitre: 2, titre: "Céramiques", cours: true, pret: true },
    { id: "polymeres-organiques", chapitre: 2, titre: "Polymères organiques", cours: true, pret: true },
    { id: "comparer-familles", chapitre: 2, titre: "Comparer les familles", cours: true, pret: true },
    { id: "revision-familles", chapitre: 2, titre: "Révision : les familles", revision: true, pret: true },
    { id: "boss-familles", chapitre: 2, titre: "Le bon matériau pour chaque pièce", boss: true, pret: true },

    { id: "macromolecules", chapitre: 3, titre: "Forme des macromolécules", cours: true, pret: true },
    { id: "masse-moleculaire", chapitre: 3, titre: "Masse moléculaire et enchevêtrement", cours: true, pret: true },
    { id: "etats-amorphe", chapitre: 3, titre: "États d'un polymère amorphe", cours: true, pret: true },
    { id: "semi-cristallins", chapitre: 3, titre: "Polymères semi-cristallins", cours: true, pret: true },
    { id: "taux-cristallinite", chapitre: 3, titre: "Taux de cristallinité", cours: true, pret: true },
    { id: "historique-polymeres", chapitre: 3, titre: "Historique des polymères", cours: true, pret: true },
    { id: "revision-polymeres", chapitre: 3, titre: "Révision : les polymères", revision: true, pret: true },
    { id: "boss-polymeres", chapitre: 3, titre: "La plaque et les fibres", boss: true, pret: true },

    { id: "elastomeres", chapitre: 4, titre: "Qu'est-ce qu'un élastomère ?", cours: true, pret: true },
    { id: "elastomere-plastomere", chapitre: 4, titre: "Élastomère ou plastomère", cours: true, pret: true },
    { id: "vulcanisation", chapitre: 4, titre: "La vulcanisation", cours: true, pret: true },
    { id: "formulation", chapitre: 4, titre: "Formulation et caoutchoucs de synthèse", cours: true, pret: true },
    { id: "revision-elastomeres", chapitre: 4, titre: "Révision : les élastomères", revision: true, pret: true },
    { id: "boss-elastomeres", chapitre: 4, titre: "Le caoutchouc sur mesure", boss: true, pret: true },

    { id: "adjuvants", chapitre: 5, titre: "Les adjuvants", cours: true, pret: true },
    { id: "plastifiants", chapitre: 5, titre: "Plastifier un polymère", cours: true, pret: true },
    { id: "charges-renforts", chapitre: 5, titre: "Charges et renforts", cours: true, pret: true },
    { id: "fibres-renfort", chapitre: 5, titre: "Verre, carbone et aramide", cours: true, pret: true },
    { id: "revision-additifs", chapitre: 5, titre: "Révision : additifs et renforts", revision: true, pret: true },
    { id: "boss-additifs", chapitre: 5, titre: "Le PVC à la carte", boss: true, pret: true },

    { id: "composites", chapitre: 6, titre: "Renfort et matrice", cours: true, pret: true },
    { id: "isotrope-orthotrope", chapitre: 6, titre: "Isotrope ou orthotrope", cours: true, pret: true },
    { id: "loi-melanges", chapitre: 6, titre: "La loi des mélanges", cours: true, pret: true },
    { id: "module-transversal", chapitre: 6, titre: "Le module transversal", cours: true, pret: true },
    { id: "orientation-fibres", chapitre: 6, titre: "Orientation des fibres", cours: true, pret: true },
    { id: "revision-composites", chapitre: 6, titre: "Révision : les composites", revision: true, pret: true },
    { id: "boss-composites", chapitre: 6, titre: "La lame de prothèse", boss: true, pret: true },

    { id: "extrusion", chapitre: 7, titre: "L'extrusion et ses variantes", cours: true, pret: true },
    { id: "injection", chapitre: 7, titre: "Le moulage par injection", cours: true, pret: true },
    { id: "soufflage", chapitre: 7, titre: "Injection-soufflage et extrusion-soufflage", cours: true, pret: true },
    { id: "rotomoulage-thermoformage", chapitre: 7, titre: "Rotomoulage et thermoformage", cours: true, pret: true },
    { id: "compression", chapitre: 7, titre: "Compression et compression-transfert", cours: true, pret: true },
    { id: "choisir-procede", chapitre: 7, titre: "Choisir le procédé", cours: true, pret: true },
    { id: "revision-procedes", chapitre: 7, titre: "Révision : les procédés", revision: true, pret: true },
    { id: "boss-procedes", chapitre: 7, titre: "L'atelier du dispositif médical", boss: true, pret: true }
  ],
  // Le cours de chaque chapitre, en sections : une grande page par chapitre (chapitres/chapitre-<n>.html).
  sections: [
    { id: "traction", chapitre: 0, titre: "Contrainte, déformation et courbe de traction", notions: ["contrainte-deformation", "courbe-traction"] },
    { id: "echelle-log", chapitre: 0, titre: "Modules et échelle logarithmique", notions: ["echelle-log"] },
    { id: "masse-volumique", chapitre: 0, titre: "Masse volumique et mélanges", notions: ["masse-volumique"] },
    { id: "definitions-generations", chapitre: 1, titre: "Définitions et générations", notions: ["definitions-biomateriau", "generations"] },
    { id: "dispositif-classes", chapitre: 1, titre: "Le dispositif médical et ses classes", notions: ["dispositif-medical", "classes-risque"] },
    { id: "vocabulaire", chapitre: 1, titre: "Implant, prothèse, organe artificiel, greffe", notions: ["vocabulaire"] },
    { id: "regeneratif-nano", chapitre: 1, titre: "Ingénierie tissulaire et nanomédecine", notions: ["ingenierie-tissulaire", "nanomedecine"] },
    { id: "marche", chapitre: 1, titre: "Le marché des biomatériaux", notions: ["marche"] },
    { id: "liaisons", chapitre: 2, titre: "Organisation de la matière et liaisons", notions: ["liaisons"] },
    { id: "metaux-ceramiques", chapitre: 2, titre: "Métaux et céramiques", notions: ["metaux", "ceramiques"] },
    { id: "polymeres-familles", chapitre: 2, titre: "Polymères et familles comparées", notions: ["polymeres-organiques", "comparer-familles"] },
    { id: "macromolecules", chapitre: 3, titre: "Macromolécules et masse moléculaire", notions: ["macromolecules", "masse-moleculaire"] },
    { id: "amorphe-cristallin", chapitre: 3, titre: "États amorphe et semi-cristallin", notions: ["etats-amorphe", "semi-cristallins"] },
    { id: "cristallinite-histoire", chapitre: 3, titre: "Cristallinité et histoire des polymères", notions: ["taux-cristallinite", "historique-polymeres"] },
    { id: "elastomeres", chapitre: 4, titre: "Élastomères et caoutchouc naturel", notions: ["elastomeres"] },
    { id: "elasticite", chapitre: 4, titre: "Élastomère, plastomère et élasticité caoutchoutique", notions: ["elastomere-plastomere"] },
    { id: "vulcanisation-formulation", chapitre: 4, titre: "Vulcanisation et formulation", notions: ["vulcanisation", "formulation"] },
    { id: "adjuvants-plastifiants", chapitre: 5, titre: "Adjuvants et plastifiants", notions: ["adjuvants", "plastifiants"] },
    { id: "charges-renforts", chapitre: 5, titre: "Charges et renforts", notions: ["charges-renforts"] },
    { id: "fibres", chapitre: 5, titre: "Verre, carbone, aramide et autres renforts", notions: ["fibres-renfort"] },
    { id: "renfort-matrice", chapitre: 6, titre: "Renfort, matrice et anisotropie", notions: ["composites", "isotrope-orthotrope"] },
    { id: "melanges-transversal", chapitre: 6, titre: "Loi des mélanges et module transversal", notions: ["loi-melanges", "module-transversal"] },
    { id: "orientation", chapitre: 6, titre: "Orientation des fibres", notions: ["orientation-fibres"] },
    { id: "extrusion-injection", chapitre: 7, titre: "Extrusion et injection", notions: ["extrusion", "injection"] },
    { id: "soufflage-moulage", chapitre: 7, titre: "Soufflage, rotomoulage et thermoformage", notions: ["soufflage", "rotomoulage-thermoformage"] },
    { id: "compression-choix", chapitre: 7, titre: "Compression et choix du procédé", notions: ["compression", "choisir-procede"] }
  ],
  cours: [
    { chapitre: 0, id: "contrainte-deformation", titre: "Contrainte, déformation et module" },
    { chapitre: 0, id: "courbe-traction", titre: "La courbe de traction" },
    { chapitre: 0, id: "echelle-log", titre: "Modules et échelle logarithmique" },
    { chapitre: 0, id: "masse-volumique", titre: "Masse volumique et mélanges" },
    { chapitre: 1, id: "definitions-biomateriau", titre: "Définitions d'un biomatériau" },
    { chapitre: 1, id: "generations", titre: "Les générations de biomatériaux" },
    { chapitre: 1, id: "dispositif-medical", titre: "Le dispositif médical" },
    { chapitre: 1, id: "classes-risque", titre: "Classes de dispositifs médicaux" },
    { chapitre: 1, id: "vocabulaire", titre: "Implant, prothèse, organe artificiel, greffe" },
    { chapitre: 1, id: "ingenierie-tissulaire", titre: "Ingénierie tissulaire et médecine régénérative" },
    { chapitre: 1, id: "nanomedecine", titre: "Nanomédecine" },
    { chapitre: 1, id: "marche", titre: "Le marché des biomatériaux" },
    { chapitre: 2, id: "liaisons", titre: "Organisation de la matière et liaisons" },
    { chapitre: 2, id: "metaux", titre: "Métaux et alliages" },
    { chapitre: 2, id: "ceramiques", titre: "Céramiques" },
    { chapitre: 2, id: "polymeres-organiques", titre: "Polymères organiques" },
    { chapitre: 2, id: "comparer-familles", titre: "Les familles de matériaux comparées" },
    { chapitre: 3, id: "macromolecules", titre: "Forme des macromolécules et familles de plastiques" },
    { chapitre: 3, id: "masse-moleculaire", titre: "Masse moléculaire et enchevêtrement" },
    { chapitre: 3, id: "etats-amorphe", titre: "États d'un polymère amorphe" },
    { chapitre: 3, id: "semi-cristallins", titre: "Polymères semi-cristallins" },
    { chapitre: 3, id: "taux-cristallinite", titre: "Taux de cristallinité" },
    { chapitre: 3, id: "historique-polymeres", titre: "Historique des polymères" },
    { chapitre: 4, id: "elastomeres", titre: "Élastomères et caoutchouc naturel" },
    { chapitre: 4, id: "elastomere-plastomere", titre: "Élastomère, plastomère et élasticité caoutchoutique" },
    { chapitre: 4, id: "vulcanisation", titre: "La vulcanisation" },
    { chapitre: 4, id: "formulation", titre: "Formulation et caoutchoucs de synthèse" },
    { chapitre: 5, id: "adjuvants", titre: "Les adjuvants" },
    { chapitre: 5, id: "plastifiants", titre: "Les plastifiants" },
    { chapitre: 5, id: "charges-renforts", titre: "Charges et renforts" },
    { chapitre: 5, id: "fibres-renfort", titre: "Verre, carbone, aramide et autres renforts" },
    { chapitre: 6, id: "composites", titre: "Renfort et matrice" },
    { chapitre: 6, id: "isotrope-orthotrope", titre: "Matériau isotrope, monocouche orthotrope" },
    { chapitre: 6, id: "loi-melanges", titre: "Loi des mélanges et module longitudinal" },
    { chapitre: 6, id: "module-transversal", titre: "Module transversal et taux de fibres" },
    { chapitre: 6, id: "orientation-fibres", titre: "Orientation des fibres" },
    { chapitre: 7, id: "extrusion", titre: "L'extrusion et ses variantes" },
    { chapitre: 7, id: "injection", titre: "Le moulage par injection" },
    { chapitre: 7, id: "soufflage", titre: "Injection-soufflage et extrusion-soufflage" },
    { chapitre: 7, id: "rotomoulage-thermoformage", titre: "Rotomoulage et thermoformage" },
    { chapitre: 7, id: "compression", titre: "Compression et compression-transfert" },
    { chapitre: 7, id: "choisir-procede", titre: "Choisir le procédé" }
  ]
});
