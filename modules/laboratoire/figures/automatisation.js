/* Figure : d'un automate isolé à un laboratoire automatisé ; la chaîne relie les postes. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-automatisation", {
    largeur: 960, hauteur: 540, titre: "Automate isolé ou laboratoire automatisé",
    essai: "<strong>Essaie</strong> : passe d'un mode à l'autre. <strong>Observe</strong> : dans le laboratoire automatisé, le technicien ne porte plus les tubes ; les machines sont reliées par un convoyeur et un logiciel."
  });
  var g = A.s("g", null, f.svg), mode = 0;
  var b = R.boutons(f.reglages), bts = [R.bouton(b, "Automates isolés", function () { mode = 0; dessiner(); }), R.bouton(b, "Laboratoire automatisé", function () { mode = 1; dessiner(); })];
  var zone = R.h("div", null, "", f.direct);
  var POSTES = [["Réception", "reception"], ["Centrifugeuse", "centrifugeuse"], ["Débouchage", "capsule"], ["Hématologie", "automate"], ["Biochimie", "chimie"], ["Stockage", "frigo"]];
  function dessiner() {
    bts.forEach(function (bt, i) { bt.classList.toggle("actif", i === mode); });
    A.vider(g);
    POSTES.forEach(function (p, i) {
      var x = 40 + (i % 3) * 300, y = i < 3 ? 60 : 320;
      A.boite(g, x, y, 240, 150, { fond: "#fff", bord: C.encre, ep: 3, rx: 16 });
      A.icone(g, p[1], [x + 120, y + 62], 70, C.jeu);
      A.texte(g, p[0], [x + 120, y + 128], { taille: 20, gras: 800 });
    });
    if (mode === 1) {
      A.chemin(g, [[160, 230], [160, 270], [760, 270], [760, 300]], { coul: C.v, ep: 10 });
      A.chemin(g, [[280, 135], [340, 135]], { coul: C.v, ep: 10 }); A.chemin(g, [[580, 135], [640, 135]], { coul: C.v, ep: 10 });
      A.chemin(g, [[640, 395], [580, 395]], { coul: C.v, ep: 10 }); A.chemin(g, [[340, 395], [280, 395]], { coul: C.v, ep: 10 });
      A.texte(g, "convoyeur + logiciel", [460, 250], { taille: 18, gras: 800, coul: C.v });
    } else {
      A.icone(g, "personne", [460, 265], 70, C.doux);
      A.texte(g, "le technicien porte les tubes", [460, 250 + 58], { taille: 17, gras: 700, coul: C.doux });
    }
    zone.innerHTML = mode ? "Un laboratoire automatisé intègre tout le système, de la réception au résultat, et englobe transport, chargement, évaluation des résultats et stockage." : "Chaque automate exécute une ou plusieurs étapes d'analyse ; entre deux, une personne déplace les tubes.";
  }
  dessiner();
})();
