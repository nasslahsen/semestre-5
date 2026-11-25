/* Figure : encapsulation d'une requête HTTP, couche par couche (TCP/IP), comme sur la diapositive. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-encap", {
    largeur: 960, hauteur: 460, titre: "Encapsulation, couche par couche",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : en descendant, chaque couche ajoute son en-tête ; à la réception, on refait le chemin à l'envers."
  });
  var L = [["Application", "HTTP"], ["Transport", "HTTP + TCP"], ["Internet", "HTTP + TCP + IPv4"], ["Accès réseau", "trame, puis bits"]];
  var nd = L.map(function (l, i) { return { x: 40 + i * 70, y: 30 + i * 100, w: 220, h: 76, t: l[0], taille: 19 }; });
  var g = A.s("g", null, f.svg);
  A.etapesFig(f, nd, [
    "<strong>Application</strong> : le navigateur prépare la requête HTTP.",
    "<strong>Transport</strong> : TCP ajoute son en-tête (ports source et destination) : HTTP + TCP.",
    "<strong>Internet</strong> : IPv4 ajoute les adresses IP : HTTP + TCP + IPv4.",
    "<strong>Accès réseau</strong> : la trame est construite et envoyée en bits sur le support. À la réception, on remonte : chaque couche retire son en-tête (désencapsulation)."
  ], { depart: "Avance pour descendre les couches.", devant: function (gg, k) {
    for (var i = 0; i < k; i++) {
      var y = 30 + i * 100, x = 300 + i * 70, w = 620 - i * 70;
      A.boite(gg, 300, y, 620, 76, { fond: C.fond, bord: C.trait, ep: 2, rx: 10 });
      A.boite(gg, x, y + 8, w - 10, 60, { titre: L[i][1], fond: i === k - 1 ? C.jeuPale : "#fff", bord: C.jeu, ep: 3, rx: 8, taille: 20, mono: true });
    }
    if (k >= 4) { A.s("path", { d: "M300 450 q 20 -24 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0", fill: "none", stroke: C.doux, "stroke-width": 3 }, gg); }
  } });
})();
