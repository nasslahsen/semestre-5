/* Figure : le même champ vu avec différents systèmes de contraste. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-microscopes-types", {
    largeur: 960, hauteur: 540, titre: "Le même échantillon, plusieurs façons de voir",
    essai: "<strong>Essaie</strong> : change de microscope. <strong>Observe</strong> : l'échantillon ne change pas, c'est le contraste qui change ; chaque type fait ressortir autre chose."
  });
  var g = A.s("g", null, f.svg), t = 0;
  var T = [
    { n: "Fond clair", fond: "#fbf8f1", cel: "#7b4fb3", bord: "#4b2c78", d: "La lumière transmise entre dans l'objectif : sans coloration le contraste est faible, d'où les colorants. Le plus utilisé au laboratoire d'analyses médicales." },
    { n: "Fond noir", fond: "#101218", cel: "#f2f3f7", bord: "#ffffff", d: "Seule la lumière renvoyée par l'objet entre dans l'objectif : les cellules brillent sur fond noir. Contraste augmenté, pour observer le vivant." },
    { n: "Fluorescence", fond: "#05070c", cel: "#2bd46a", bord: "#7cf2a5", d: "Les molécules marquées émettent leur propre lumière : en immunologie (IFI). Il faut une chambre noire." },
    { n: "Contraste de phase", fond: "#8d939e", cel: "#5d636e", bord: "#e9ecf2", d: "Des différences d'épaisseur et d'indice deviennent des différences de gris : on voit des cellules transparentes sans les colorer." },
    { n: "Polarisant", fond: "#16181f", cel: null, d: "En lumière polarisée, les cristaux s'allument et prennent des couleurs : oxalate de calcium, acide urique, struvite, cystine." }
  ];
  var CEL = [[220, 170, 46], [390, 250, 52], [270, 360, 40], [480, 120, 38], [560, 330, 48], [150, 300, 34], [640, 210, 42]];
  var b = R.boutons(f.reglages), bts = T.map(function (x, i) { return R.bouton(b, x.n, function () { t = i; dessiner(); }); });
  var zone = R.h("div", null, "", f.direct);
  function dessiner() {
    bts.forEach(function (bt, i) { bt.classList.toggle("actif", i === t); });
    A.vider(g);
    var m = T[t];
    A.s("circle", { cx: 420, cy: 260, r: 250, fill: m.fond, stroke: C.encre, "stroke-width": 6 }, g);
    CEL.forEach(function (c, i) {
      if (m.cel) {
        A.s("circle", { cx: c[0] + 20, cy: c[1] + 10, r: c[2], fill: m.cel, stroke: m.bord, "stroke-width": t === 3 ? 6 : 3, opacity: t === 2 && i % 2 ? 0.15 : 1 }, g);
        A.s("circle", { cx: c[0] + 26, cy: c[1] + 4, r: c[2] * 0.35, fill: t === 0 ? "#3b1f63" : t === 1 ? "#c9ccd6" : t === 2 ? "#0b3" : "#3e434d", opacity: t === 2 && i % 2 ? 0.15 : 1 }, g);
      } else {
        var col = ["#ffd43b", "#74c0fc", "#ff8787", "#b197fc"][i % 4];
        A.s("polygon", { points: [c[0], c[1] - c[2], c[0] + c[2], c[1], c[0], c[1] + c[2], c[0] - c[2], c[1]].join(","), fill: col, opacity: 0.85 }, g);
      }
    });
    A.texte(g, m.n, [800, 260], { taille: 26, gras: 800, largeur: 220 });
    zone.innerHTML = "<strong>" + m.n + "</strong> : " + m.d;
  }
  dessiner();
})();
