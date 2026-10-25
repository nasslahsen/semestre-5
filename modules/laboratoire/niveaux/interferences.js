/* Niveau : contrôle de qualité et interférences (4.6, 4.11) : effets des interférences, règles de validation, CQ, rôle du biologiste. */
NIVEAU(LABO.rejouable({
  id: "interferences",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Quel effet ?", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque interférence à son effet sur l'hémogramme.");
      j.consigne("Touche une interférence, puis son effet.");
      var p = A.paires({
        g: n.g, gauche: ["Agrégats plaquettaires", "Hyperlipémie", "Fragments de GR", "Dilution par la perfusion"],
        droite: ["Tous les paramètres ↓", "PLT ↑", "PLT ↓ et GB ↑", "Hb ↑"],
        bon: [2, 3, 1, 0], xg: 20, wg: 300, xd: 380, wd: 280, y0: 60, h: 104, pas: 134, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Un amas de plaquettes a la taille d'un globule blanc.", "Un plasma laiteux trouble la cuve de l'hémoglobine.", "Un morceau de GR a la taille d'une plaquette.", "Le sang est mélangé au liquide de la perfusion."][i]; },
        fin: function () { j.bravo("Chaque effet s'explique par le principe de mesure."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Une règle de validation", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.boite(n.g, 140, 200, 400, 140, { fond: "#fff", bord: C.encre, ep: 3, rx: 16 });
      A.texte(n.g, "PLT  38 × 10⁹/L", [340, 270], { taille: 34, gras: 800, coul: C.ko });
      j.titre("L'automate rend des plaquettes à 38 × 10⁹/L. Que demande la règle de validation du cours ?");
      j.choix([
        { html: "Valider et transmettre : l'automate est calibré", aide: "Sous un certain seuil, une valeur basse doit être vérifiée par un autre moyen." },
        { html: "Un contrôle sur lame", juste: true },
        { html: "Refaire la calibration de l'automate", aide: "Le problème peut venir de l'échantillon, pas de l'appareil." }
      ], { colonnes: 1, ok: function () { j.bravo("PLT < 50 × 10⁹/L : contrôle sur lame."); j.expliquer("<p>Sur la lame, on cherche par exemple des agrégats plaquettaires, qui font baisser faussement le compte.</p>"); j.suite(); } });
    } },
    { nom: "Les contrôles", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.tube(n.g, 200, 160, { bouchon: C.gris, w: 90, h: 280, couches: [{ h: 0.7, coul: C.sang }], etiquette: "normal" });
      A.tube(n.g, 390, 160, { bouchon: C.gris, w: 90, h: 280, couches: [{ h: 0.7, coul: "#8f1d1d" }], etiquette: "pathologique" });
      j.titre("Combien de niveaux de contrôles sanguins faut-il au minimum pour le contrôle de qualité interne ?");
      j.nombre({ avant: "\\text{au moins}", apres: "\\text{niveaux}", cases: [{ attendu: 2, tol: 0 }],
        aide: function () { return "Un niveau normal et un niveau…"; },
        ok: function () { j.bravo("2 niveaux : normal et pathologique."); j.expliquer("<p>S'y ajoutent les contrôles électroniques des canaux, les règles de Westgard contre les dérives et le graphique de Levey-Jennings.</p>"); j.suite(); } });
    } },
    { nom: "Une hémoglobine trop haute", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.tube(n.g, 290, 130, { bouchon: "edta", w: 100, h: 320, couches: [{ h: 0.4, coul: C.sang }, { h: 0.4, coul: "#f3ead2" }] });
      A.texte(n.g, "plasma laiteux", [340, 500], { taille: 22, gras: 800 });
      j.titre("Le plasma de ce tube est laiteux, et l'hémoglobine sort étonnamment haute. Pourquoi ?");
      j.choix([
        { html: "La turbidité augmente l'absorbance mesurée", juste: true },
        { html: "Les lipides contiennent de l'hémoglobine", aide: "L'hémoglobine est dans les globules rouges. Pense à la façon dont elle est dosée." },
        { html: "Les lipides font éclater les plaquettes", aide: "Les plaquettes ne changent rien au dosage de l'hémoglobine." }
      ], { colonnes: 1, ok: function () { j.bravo("Hyperlipémie : turbidité, absorbance augmentée, Hb ↑."); j.suite(); } });
    } },
    { nom: "Qui décide ?", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "automate", [200, 260], 200, C.doux); A.icone(n.g, "personne", [480, 260], 200, C.jeu);
      j.titre("L'automate a levé une alarme sur un résultat. D'après la conclusion du cours, qui décide de la suite ?");
      j.choix([
        { html: "L'automate, qui a détecté l'anomalie", aide: "L'automate détecte et alerte ; il ne décide pas." },
        { html: "Le biologiste, qui valide et décide", juste: true }
      ], { colonnes: 2, ok: function () { j.bravo("L'automate alerte, le biologiste décide."); j.expliquer("<p>« L'automate est un outil au service du diagnostic ; le biologiste en reste le garant. »</p>"); j.suite(); } });
    } }
  ]
}));
