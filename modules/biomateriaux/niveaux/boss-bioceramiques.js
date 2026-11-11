/* Boss du chapitre 10 (affiché 5) : l'atelier des céramiques d'une prothèse totale de hanche. */
NIVEAU({
  id: "boss-bioceramiques",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { ok: false };
    var cx = 340;
    function anneau(r1, r2, y) {
      var P = function (r, a) { return (cx + r * Math.cos(a)).toFixed(1) + " " + (y - r * Math.sin(a)).toFixed(1); };
      return "M" + P(r2, 0) + " A" + r2 + " " + r2 + " 0 0 0 " + P(r2, Math.PI) + " L" + P(r1, Math.PI) + " A" + r1 + " " + r1 + " 0 0 1 " + P(r1, 0) + " Z";
    }
    n.dessin = function () {
      E.vider(g);
      var o = n.ok;
      E.s("path", { d: anneau(78, 98, 230), fill: o ? "#9fb2c9" : "#fff", stroke: C.encre, "stroke-width": 3 }, g);
      E.s("path", { d: anneau(58, 78, 230), fill: o ? PLATEFORME.teinte(0.6) : "#fff", stroke: C.encre, "stroke-width": 3 }, g);
      D.rond(g, [cx, 235], 52, { fill: o ? "#e8e2d4" : "#fff", stroke: C.encre, ep: 3 });
      E.s("path", { d: "M328 285 L352 285 L372 345 Q350 405 350 560 L322 560 Q318 405 304 345 Z", fill: o ? "#c3c8d2" : "#fff", stroke: C.encre, "stroke-width": 3 }, g);
      if (o) [["cupule : titane", 120], ["insert : UHMWPE", 175], ["tête : alumine", 245], ["tige : titane", 450]].forEach(function (l) { D.texte(g, l[0], [460, l[1]], { taille: 18, ancre: "start" }); });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Assembler", jouer: function (j, n) {
      j.titre("Choisis un matériau pour chaque pièce : une tête céramique frotte sur un insert en polyéthylène, dans une prothèse métallique.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<b>cupule</b><span class="trou" data-attendu="m"></span><b>insert</b><span class="trou" data-attendu="u"></span><b>tête</b><span class="trou" data-attendu="a"></span><b>tige</b><span class="trou" data-attendu="m"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "a", html: "alumine" }, { id: "m", html: "titane" }, { id: "u", html: "UHMWPE" }, { id: "m", html: "titane" }],
        aide: "Cupule et tige sont métalliques ; l'insert est le polyéthylène ; la tête est la céramique.",
        ok: function () { n.ok = true; n.dessin(); j.bravo("Titane, UHMWPE, alumine, titane."); j.suite(); }
      });
    } },
    { nom: "Le lot de poudre", jouer: function (j, n) {
      j.titre("Le fournisseur livre 1200 g de poudre d'alumine. Pour respecter l'ASTM, combien d'alumine pure au minimum, et au plus combien de SiO₂ et d'oxydes alcalins ?");
      j.nombre({ avant: "m_{Al_2O_3} \\geq,\\ m_{imp} <", apres: "\\text{g}", cases: [{ attendu: 1194, tol: 0.05 }, { attendu: 1.2, tol: 0.005 }], ligne: true,
        aide: function (k) { return k === 0 ? "99,5 % de 1200 g." : "0,1 % de 1200 g."; },
        ok: function () { j.bravo("1194 g et 1,2 g."); j.suite(); } });
    } },
    { nom: "Le four", jouer: function (j, n) {
      j.titre("Pour une tête en zircone, un technicien propose de fritter à 2700 °C pour aller plus vite. Qu'en penses-tu ?");
      j.choix([
        { html: "Impossible : 2700 °C dépasse la fusion de la zircone (2953 K, soit 2680 °C), la poudre fondrait", juste: true },
        { html: "Bonne idée : la zircone fond à 2953 °C", aide: "Attention à l'unité : 2953 K, et non °C. Convertis." },
        { html: "Sans importance : on ne fritte pas la zircone", aide: "Le cours dit bien : fabrication par frittage." }
      ], { colonnes: 1, ok: function () { j.bravo("2953 − 273 = 2680 °C."); j.suite(); } });
    } },
    { nom: "La série de tiges", jouer: function (j, n) {
      j.titre("La clinique pose 120 tiges revêtues d'hydroxyapatite. Avec 90 % de réussite à dix ans, combien d'échecs faut-il prévoir ?");
      j.nombre({ avant: "\\text{échecs} =", cases: [{ attendu: 12, tol: 0 }], ligne: true,
        aide: function () { return "10 % de 120."; },
        ok: function () { j.bravo("12 échecs."); j.suite(); } });
    } },
    { nom: "Le patient sportif", jouer: function (j, n) {
      j.titre("Un patient jeune, rugbyman, demande une tête en alumine. Quel risque propre aux céramiques faut-il lui expliquer ?");
      j.choix([
        { html: "Une céramique est non résiliente : un choc violent peut la casser net", juste: true },
        { html: "L'alumine s'use beaucoup plus vite que le métal", aide: "Au contraire : alumine-alumine et alumine-UHMWPE font mieux que métal-UHMWPE." },
        { html: "L'alumine relargue des ions toxiques", aide: "Les biocéramiques sont non toxiques, inertes in vivo." }
      ], { colonnes: 1, ok: function () { j.bravo("Dure et inusable, mais fragile."); j.suite(); } });
    } }
  ]
});
