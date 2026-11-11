/* TD 1, application 1.5 : les adjuvants du PVC (gonfler, renforcer, plastifier). */
NIVEAU({
  id: "td1-pvc",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { k: 1 };
    n.dessin = function () {
      E.vider(g);
      var s = 120 * Math.cbrt(n.k);
      E.s("rect", { x: 340 - s / 2, y: 320 - s / 2, width: s, height: s, rx: 12, fill: PLATEFORME.teinte(0.3), stroke: C.jeu, "stroke-width": 4 }, g);
      D.texte(g, "PVC : 1,45 g/cm³, Tg = 90 °C", [340, 110], { taille: 19, gras: false, coul: C.doux });
      if (n.k > 1) D.texte(g, "volume × " + E.fmt(n.k, 2), [340, 540], { taille: 20, coul: C.jeu });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Alléger", jouer: function (j, n) {
      j.titre("On veut passer le PVC de 1,45 à 0,3 g/cm³ sans changer sa masse. Par combien faut-il multiplier son volume ?");
      j.nombre({ avant: "\\dfrac{V_2}{V_1} = \\dfrac{\\rho_1}{\\rho_2} =", cases: [{ attendu: 4.83, tol: 0.01 }], ligne: true,
        aide: function () { return "ρ = m/V avec m constante : 1,45 / 0,3."; },
        ok: function () { E.anime(900, function (u) { n.k = 1 + u * 3.83; n.dessin(); }); j.bravo("Environ 4,83 fois : on le gonfle."); j.suite(); } });
    } },
    { nom: "Trois adjuvants", jouer: function (j, n) {
      j.titre("Associe chaque objectif à ce qu'on ajoute au PVC.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<b>densité 0,3 g/cm³</b><span class="trou" data-attendu="g"></span><b>beaucoup plus rigide</b><span class="trou" data-attendu="r"></span><b>Tg plus basse</b><span class="trou" data-attendu="p"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "p", html: "un plastifiant" }, { id: "g", html: "le gonfler" }, { id: "r", html: "fibres ou charges" }],
        aide: "Plus léger : plus de volume. Plus rigide : renforcer. Baisser Tg : écarter les chaînes avec un plastifiant.",
        ok: function () { j.bravo("Gonfler, renforcer, plastifier."); j.suite(); }
      });
    } }
  ]
});
