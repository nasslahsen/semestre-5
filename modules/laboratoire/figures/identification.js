/* Figure : une étiquette d'échantillon et ses mentions ; une mention manquante et le tube est rejeté. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-identification", {
    largeur: 960, hauteur: 540, titre: "Les mentions d'un échantillon et la règle absolue",
    essai: "<strong>Essaie</strong> : touche une mention pour l'effacer. <strong>Observe</strong> : il suffit d'une mention manquante pour que le tube ne soit plus relié sans ambiguïté à son patient."
  });
  var g = A.s("g", null, f.svg);
  var M = [
    { t: "Nom de naissance : BENALI", c: "patient" }, { t: "Prénom : Salma", c: "patient" }, { t: "Né(e) le 14/03/1990", c: "patient" }, { t: "Sexe : F", c: "patient" }, { t: "N° unique : 00 4521 873", c: "patient" },
    { t: "Préleveur : Y. Amrani, infirmier", c: "preleveur" }, { t: "RPPS : 10 0012 3456", c: "preleveur" },
    { t: "Examen : ionogramme", c: "echantillon" }, { t: "Prélevé le 07/10 à 8 h 12", c: "echantillon" }, { t: "À jeun", c: "echantillon" }
  ];
  var COUL = { patient: C.jeu, preleveur: C.acc, echantillon: C.v }, NOM = { patient: "Patient", preleveur: "Préleveur", echantillon: "Échantillon" };
  var efface = {};
  var b = R.boutons(f.reglages);
  R.bouton(b, "Tout remettre", function () { efface = {}; dessiner(); });
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    A.vider(g);
    var manque = Object.keys(efface).length;
    A.boite(g, 30, 30, 600, 480, { fond: "#fff", bord: manque ? C.ko : C.encre, ep: manque ? 4 : 3, rx: 16 });
    A.icone(g, "codebarre", [540, 92], 90, C.encre);
    M.forEach(function (m, i) {
      var y = 60 + i * 44;
      A.s("rect", { x: 50, y: y, width: 8, height: 32, rx: 3, fill: COUL[m.c] }, g);
      A.texte(g, efface[i] ? "…" : m.t, [72, y + 16], { taille: 20, ancre: "start", gras: efface[i] ? 500 : 600, coul: efface[i] ? C.gris : C.encre, halo: false });
      A.cible(g, 50, y - 4, 420, 42, function () { if (efface[i]) delete efface[i]; else efface[i] = 1; dessiner(); });
    });
    ["patient", "preleveur", "echantillon"].forEach(function (c, k) {
      A.s("rect", { x: 680, y: 60 + k * 50, width: 26, height: 26, rx: 5, fill: COUL[c] }, g);
      A.texte(g, NOM[c], [720, 73 + k * 50], { taille: 20, ancre: "start", halo: false });
    });
    A.boite(g, 670, 260, 260, 150, { fond: manque ? C.koPale : C.okPale, bord: manque ? C.ko : C.ok, ep: 3, rx: 16, titre: manque ? "Non conforme" : "Conforme", sous: manque ? "rejet et nouveau prélèvement" : "peut être analysé", taille: 24 });
    zone.innerHTML = manque ? "Une mention manque : l'échantillon ne peut en aucun cas être analysé. Il est détruit selon la procédure, et un nouveau prélèvement est demandé." :
      "Toutes les mentions sont là : patient, préleveur, échantillon.";
  }
  dessiner();
})();
