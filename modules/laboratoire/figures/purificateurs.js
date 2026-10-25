/* Figure : ce que chaque technologie de purification élimine, d'après le cours ; résistivité et conductivité. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-purificateurs", {
    largeur: 960, hauteur: 540, titre: "Ce que chaque technologie élimine",
    essai: "<strong>Essaie</strong> : touche une technologie. <strong>Observe</strong> : aucune n'élimine tout ; c'est pour cela qu'on les enchaîne."
  });
  var g = A.s("g", null, f.svg), sel = 3;
  var COL = ["Particules", "Ions", "Organiques", "Pyrogènes", "Microbes", "Gaz"];
  // 1 : élimine (d'après le cours), 0 : n'élimine pas (d'après le cours), null : le cours ne le dit pas
  var T = [
    { t: "Filtration", v: [1, 0, 0, 0, null, 0], d: "Filtres en profondeur et à membrane (souvent 0,2 µm) : les particules ; risque de colmatage." },
    { t: "Ultrafiltration", v: [1, 0, 0, 1, 1, 0], d: "En sortie de système : pyrogènes, nucléases, micro-organismes, particules." },
    { t: "Osmose inverse", v: [null, 1, null, 1, 1, 0], d: "Jusqu'à 99 % des contaminants, dont 90 à 95 % des ions ; pas les gaz dissous ; prétraitement requis." },
    { t: "Déionisation", v: [0, 1, 0, 0, 0, null], d: "Résines échangeuses d'ions : seule à atteindre la résistivité de l'eau de type 1, plus de 18 MΩ·cm." },
    { t: "EDI", v: [0, 1, 0, 0, 0, null], d: "Électrodéionisation : comme la déionisation, mais les résines sont régénérées en continu par un courant." },
    { t: "Adsorption", v: [0, 0, 1, null, null, null], d: "Charbon actif : matières organiques et chlore." },
    { t: "UV", v: [0, 0, 1, null, 1, null], d: "Oxyde les traces organiques et inactive les micro-organismes ; pas les ions, colloïdes ni particules." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    A.vider(g);
    var x0 = 230, w = 118, y0 = 70, h = 64;
    COL.forEach(function (c, k) { A.texte(g, c, [x0 + k * w + w / 2, 40], { taille: 17, gras: 800 }); });
    T.forEach(function (r, i) {
      var y = y0 + i * h, on = sel === i;
      A.boite(g, 10, y + 4, 210, h - 8, { fond: on ? C.jeu : "#fff", bord: on ? C.jeu : C.encre, ep: 2.5, rx: 10, titre: r.t, taille: 18, coul: on ? "#fff" : C.encre });
      r.v.forEach(function (v, k) {
        var cx = x0 + k * w + w / 2, cy = y + h / 2;
        A.s("rect", { x: x0 + k * w + 4, y: y + 4, width: w - 8, height: h - 8, rx: 8, fill: on ? C.jeuPale : C.fond }, g);
        if (v === 1) A.s("path", { d: "M" + (cx - 14) + " " + cy + " l10 11 l20 -22", fill: "none", stroke: C.ok, "stroke-width": 6, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
        else if (v === 0) A.s("path", { d: "M" + (cx - 11) + " " + (cy - 11) + " l22 22 M" + (cx + 11) + " " + (cy - 11) + " l-22 22", stroke: C.ko, "stroke-width": 5, "stroke-linecap": "round" }, g);
      });
      A.cible(g, 10, y, 920, h, function () { sel = i; dessiner(); });
    });
    zone.innerHTML = "<strong>" + T[sel].t + "</strong> : " + T[sel].d + " Case vide : le cours ne se prononce pas.";
  }
  dessiner();
})();
