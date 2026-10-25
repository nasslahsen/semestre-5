/*
 * MODÈLE de module : copier le dossier modules/_modele/ en modules/<id>/, remplacer "_modele" par <id>
 * ici et dans <html data-module="..."> de chaque page, puis inscrire le module dans registre.js.
 * Voir CLAUDE.md, sections « Structure d'un module » et « Construire un module ».
 *
 * Carte (index.html) : un nœud par chapitre. Page d'un chapitre (chapitres/chapitre-<n>.html, générée par
 * node outils/regrouper.js <id>) : le cours d'un trait, section après section, les exercices de chaque notion en option.
 * chapitres : dans l'ordre ; sousModule = id d'un sous-module du registre ; ligne = la ligne courte sous le titre, sur la carte.
 * niveaux : notions dans l'ordre d'apprentissage. cours: true quand cours/<id>.html existe (toujours, sauf TD).
 *           Chaque chapitre finit par un niveau revision: true puis un niveau boss: true.
 * sections : le cours de chaque chapitre en 3 à 5 sections (une idée chacune) ; chaque section réunit des pages de cours.
 * cours : pages de cours (une par notion), sources des pages de chapitre.
 */
PLATEFORME.parcours("_modele", {
  titre: "Module modèle",
  sousModules: [{ id: "sm1", titre: "Sous-module 1" }],
  chapitres: [
    { id: 1, titre: "Premier chapitre", sous: "Une ligne qui dit ce que couvre le chapitre", ligne: "Ce que couvre le chapitre", sousModule: "sm1" }
  ],
  niveaux: [
    { id: "exemple", chapitre: 1, titre: "Niveau exemple", cours: true, pret: true }
  ],
  sections: [
    { id: "exemple", chapitre: 1, titre: "Section exemple", notions: ["exemple"] }
  ],
  cours: [
    { chapitre: 1, id: "exemple", titre: "Page de cours exemple" }
  ]
});
