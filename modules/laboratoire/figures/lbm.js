/* Figure : les quatre missions du laboratoire, placées sur le parcours d'un patient et sur la population. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-missions", {
    largeur: 960, hauteur: 540, titre: "Les missions du laboratoire au fil du parcours d'un patient",
    essai: "<strong>Essaie</strong> : choisis une mission. <strong>Observe</strong> : chacune répond à un moment différent ; la même analyse peut servir l'une ou l'autre selon la raison de la demande."
  });
  var g = A.s("g", null, f.svg), choix = null;
  var M = {
    depistage: { t: "Prévention et dépistage", x: 40, w: 270, y: 120, h: 210, ex: "Détecter une maladie à un stade précoce, avant les symptômes.", icone: "personne" },
    diagnostic: { t: "Diagnostic", x: 345, w: 270, y: 120, h: 210, ex: "Confirmer ou infirmer une pathologie suspectée.", icone: "medecin" },
    suivi: { t: "Suivi thérapeutique", x: 650, w: 270, y: 120, h: 210, ex: "Surveiller l'évolution de la maladie et l'efficacité du traitement.", icone: "horloge" },
    sante: { t: "Santé publique", x: 40, w: 880, y: 400, h: 110, ex: "Participer à la vigilance sanitaire : épidémies, intoxications.", icone: "bouclier" }
  };
  var b = R.boutons(f.reglages), bts = {};
  Object.keys(M).forEach(function (k) { bts[k] = R.bouton(b, M[k].t, function () { choix = k; dessiner(); }); });
  var zone = R.h("div", null, "", f.direct);

  function dessiner() {
    A.vider(g);
    Object.keys(bts).forEach(function (k) { bts[k].classList.toggle("actif", k === choix); });
    A.texte(g, "Un patient", [480, 40], { taille: 22, gras: 800 });
    A.fleche(g, [60, 80], [910, 80], { coul: C.gris, ep: 4 });
    [["en bonne santé", 175], ["symptômes", 480], ["sous traitement", 785]].forEach(function (e) { A.texte(g, e[0], [e[1], 100], { taille: 16, coul: C.doux, gras: 500 }); });
    A.texte(g, "Toute une population", [480, 372], { taille: 22, gras: 800 });
    Object.keys(M).forEach(function (k) {
      var m = M[k], on = choix === k, off = choix && !on;
      A.boite(g, m.x, m.y, m.w, m.h, { fond: on ? C.jeuPale : "#fff", bord: on ? C.jeu : C.trait, ep: on ? 4 : 2.5, rx: 18, op: off ? 0.45 : 1 });
      A.icone(g, m.icone, [m.x + m.w / 2, m.y + (k === "sante" ? 36 : 76)], k === "sante" ? 44 : 70, on ? C.jeu : C.doux);
      A.texte(g, m.t, [m.x + m.w / 2, m.y + (k === "sante" ? 82 : 160)], { taille: 22, gras: 800, largeur: m.w - 30, op: off ? 0.6 : 1 });
      A.cible(g, m.x, m.y, m.w, m.h, function () { choix = k; dessiner(); });
    });
    zone.innerHTML = choix ? "<strong>" + M[choix].t + "</strong> : " + M[choix].ex :
      "Quatre missions : dépister, diagnostiquer, suivre un traitement, veiller sur la santé publique.";
  }
  dessiner();
})();
