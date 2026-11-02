(function () {
  "use strict";
  var R = RM, C = EMB.C;
  /* ---------- Un document JSON : objet, tableau, accès à une valeur ---------- */
  (function () {
    var f = R.figure("fig-json", {
      largeur: 960, hauteur: 440, titre: "Lire un document JSON",
      essai: "<strong>Essaie</strong> : choisis une valeur à lire. <strong>Observe</strong> : on atteint une valeur d'objet par son nom, une valeur de tableau par sa position, en commençant à 0."
    });
    var g = EMB.el("g", null, f.svg), choix = 0, b = R.boutons(f.reglages), btns = [];
    var L = ["{", '  "sensor": "gps",', '  "time": 1351824120,', '  "data": [', "    48.756080,", "    2.302038", "  ]", "}"];
    var A = [["doc[\"sensor\"]", 1, "\"gps\"", "String"], ["doc[\"time\"]", 2, "1351824120", "Number"], ["doc[\"data\"][0]", 4, "48.756080", "Number, dans un Array"], ["doc[\"data\"][1]", 5, "2.302038", "Number, dans un Array"], ["doc[\"data\"]", 3, "[48.756080, 2.302038]", "Array"]];
    A.forEach(function (a, i) { btns.push(R.bouton(b, a[0], function () { choix = i; dessiner(); })); });
    var zone = R.h("p", null, "", f.direct);
    function dessiner() {
      EMB.vider(g);
      btns.forEach(function (x, i) { x.classList.toggle("actif", i === choix); });
      var marques = {}; marques[A[choix][1]] = C.clair;
      if (choix === 4) { marques[3] = marques[4] = marques[5] = marques[6] = C.clair; }
      EMB.lignesCode(g, L, { x: 40, y: 40, l: 520, pas: 44, taille: 23, marques: marques });
      EMB.texte(g, A[choix][0], [760, 160], { taille: 24, mono: true, coul: C.acc });
      EMB.fleche(g, [760, 190], [760, 250], { ep: 4, coul: C.acc });
      EMB.texte(g, A[choix][2], [760, 285], { taille: 23, mono: true });
      EMB.texte(g, A[choix][3], [760, 330], { taille: 19, coul: C.doux });
      zone.textContent = A[choix][0] + " vaut " + A[choix][2] + " (" + A[choix][3] + ").";
    }
    dessiner();
  })();
})();
