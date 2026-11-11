/* Révision du chapitre 10 (affiché 5) : valves, phosphate tricalcique, applications, revêtement, module du pyrocarbone. */
NIVEAU({
  id: "revision-bioceramiques",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { vus: {} };
    var L = [["alumine", "#e8e2d4"], ["zircone", "#f3efe6"], ["carbone", "#3a3d46"], ["TCP", "#d9c39a"], ["HAP", "#e9d5ad"]];
    n.dessin = function () {
      E.vider(g);
      D.texte(g, "l'étagère des biocéramiques", [340, 110], { taille: 19, coul: C.doux, gras: false });
      L.forEach(function (l, i) {
        var x = 120 + (i % 3) * 220 + (i >= 3 ? 110 : 0), y = 230 + Math.floor(i / 3) * 190, f = !!n.vus[l[0]];
        E.s("rect", { x: x - 80, y: y - 60, width: 160, height: 120, rx: 18, fill: l[1], stroke: f ? C.ok : C.encre, "stroke-width": f ? 6 : 3 }, g);
        D.texte(g, l[0], [x, y], { taille: 22, fond: false, coul: i === 2 ? "#fff" : C.encre });
      });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "La valve", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Un cardiologue cherche un matériau de disque de valve, en contact permanent avec le sang. Quelle biocéramique ?");
      j.choix([
        { html: "Le phosphate tricalcique", aide: "Il se résorbe en quelques semaines : une valve doit durer." },
        { html: "Le carbone pyrolytique", juste: true },
        { html: "L'alumine poreuse", aide: "Le cours associe les valves à un autre matériau, pour sa compatibilité avec le sang." }
      ], { colonnes: 1, ok: function () { ["carbone"].forEach(function (x) { n.vus[x] = 1; }); n.dessin(); j.bravo("Le carbone pyrolytique."); j.suite(); } });
    } },
    { nom: "Compter les atomes", jouer: function (j, n) {
      j.titre("Combien d'atomes de calcium et de groupes phosphate dans 3 unités de phosphate tricalcique \\(\\mathrm{Ca_3(PO_4)_2}\\) ?");
      j.nombre({ avant: "\\text{Ca},\\ \\mathrm{PO_4} =", cases: [{ attendu: 9, tol: 0 }, { attendu: 6, tol: 0 }], ligne: true,
        aide: function (k) { return k === 0 ? "3 Ca par unité, × 3." : "2 PO₄ par unité, × 3."; },
        ok: function () { ["TCP"].forEach(function (x) { n.vus[x] = 1; }); n.dessin(); j.bravo("9 Ca et 6 PO₄."); j.suite(); } });
    } },
    { nom: "Chaque usage sa céramique", jouer: function (j, n) {
      j.titre("Associe chaque usage à la biocéramique qui convient.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<span>couple de friction alumine-UHMWPE</span><span class="trou" data-attendu="a"></span>' +
        '<span>couronne dentaire d\'aspect naturel</span><span class="trou" data-attendu="z"></span>' +
        '<span>comblement qui disparaît en quelques semaines</span><span class="trou" data-attendu="t"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "t", html: "phosphate tricalcique" }, { id: "a", html: "alumine" }, { id: "z", html: "zircone" }],
        aide: "La zircone est citée pour les couronnes ; le TCP se dégrade en quelques semaines.",
        ok: function () { ["alumine", "zircone", "TCP"].forEach(function (x) { n.vus[x] = 1; }); n.dessin(); j.bravo("Alumine, zircone, TCP."); j.suite(); }
      });
    } },
    { nom: "Le revêtement de tige", jouer: function (j, n) {
      j.titre("Une tige en titane est recouverte d'hydroxyapatite par projection plasma. Quel est le but ?");
      j.choix([
        { html: "Améliorer l'intégration et la fixation : l'os repousse dans la surface microporeuse", juste: true },
        { html: "Rendre la tige plus rigide", aide: "Le revêtement est une fine couche : il agit sur la surface, pas sur la rigidité." },
        { html: "Protéger la tige des chocs", aide: "Une céramique ne résiste pas aux chocs." }
      ], { colonnes: 1, ok: function () { ["HAP"].forEach(function (x) { n.vus[x] = 1; }); n.dessin(); j.bravo("Repousse osseuse par épitaxie."); j.suite(); } });
    } },
    { nom: "Le pyrocarbone léger", jouer: function (j, n) {
      j.titre("Avec la courbe du cours (environ 17 GPa à 1,42 g/cm³ et 27,5 GPa à 1,85 g/cm³, en ligne droite), estime le module d'un pyrocarbone de densité 1,5 g/cm³.");
      j.nombre({ avant: "E \\approx", apres: "\\text{GPa}", cases: [{ attendu: 18.95, tol: 0.5 }], ligne: true,
        aide: function () { return "Pente : (27,5 − 17) / (1,85 − 1,42) ≈ 24,4 GPa par g/cm³. Ajoute 24,4 × (1,5 − 1,42) à 17."; },
        ok: function () { ["carbone"].forEach(function (x) { n.vus[x] = 1; }); n.dessin(); j.bravo("Environ 19 GPa."); j.suite(); } });
    } }
  ]
});
