/* Niveau : aciers inoxydables. Seuil de chrome, nuances 302/316/316L, implants temporaires, corrosion galvanique, composition d'une plaque. */
NIVEAU({
  id: "aciers-inox",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { mode: "jauge", cr: 6, libre: true, marque: null };
    n.vis = [[220, "inox"], [340, "inox"], [460, "titane"]];
    n.dessin = function () {
      E.vider(g);
      if (n.mode === "jauge") {
        var O = [200, 520], H = 380, max = 20, h = n.cr / max * H;
        D.texte(g, "chrome dans l'acier", [340, 100], { taille: 19, coul: C.doux, gras: false });
        E.s("rect", { x: O[0], y: O[1] - H, width: 140, height: H, rx: 14, fill: "#fff", stroke: C.encre, "stroke-width": 3 }, g);
        E.s("rect", { x: O[0], y: O[1] - h, width: 140, height: h, rx: 14, fill: n.cr >= 11 ? C.ok : C.jeu }, g);
        [0, 5, 10, 15, 20].forEach(function (q) { var y = O[1] - q / max * H; D.ligne(g, [O[0] - 10, y], [O[0], y], C.encre, 2); D.texte(g, q + " %", [O[0] - 44, y], { taille: 16, gras: false }); });
        D.texte(g, Math.round(n.cr) + " %", [O[0] + 70, O[1] - h - 24], { taille: 22 });
        // surface : rouille ou couche d'oxyde
        E.s("rect", { x: 420, y: 250, width: 160, height: 120, rx: 10, fill: "#c3c8d2", stroke: C.encre, "stroke-width": 3 }, g);
        if (n.cr >= 11) E.s("rect", { x: 414, y: 244, width: 172, height: 132, rx: 14, fill: "none", stroke: C.ok, "stroke-width": 6 }, g);
        else for (var i = 0; i < 9; i++) D.rond(g, [440 + (i * 47) % 130, 270 + (i * 31) % 90], 9, { fill: "#b5651d", op: 0.8 });
        D.texte(g, n.cr >= 11 ? "couche protectrice" : "corrosion", [500, 410], { taille: 18, coul: n.cr >= 11 ? C.ok : "#b5651d" });
      } else {
        // une plaque de fixation et trois vis
        E.s("rect", { x: 120, y: 200, width: 440, height: 300, rx: 30, fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
        D.texte(g, "os fracturé", [340, 470], { taille: 18, coul: "#8a6d3b" });
        E.s("rect", { x: 160, y: 250, width: 360, height: 40, rx: 12, fill: "#c3c8d2", stroke: C.encre, "stroke-width": 3 }, g);
        D.texte(g, "plaque en 316L", [340, 230], { taille: 18 });
        n.vis.forEach(function (v) {
          var m = n.marque === v[0];
          E.s("rect", { x: v[0] - 14, y: 236, width: 28, height: 170, rx: 6, fill: v[1] === "titane" ? "#9fb2c9" : "#c3c8d2", stroke: m ? D.C.acc : C.encre, "stroke-width": m ? 6 : 3 }, g);
          D.texte(g, v[1], [v[0], 430], { taille: 17 });
        });
      }
    };
    svg.addEventListener("click", function (ev) {
      if (!n.libre || !n.surClic) return;
      var p = E.point(svg, ev);
      n.vis.forEach(function (v) { if (Math.abs(p[0] - v[0]) < 40 && p[1] > 220 && p[1] < 420) n.surClic(v[0]); });
    });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le seuil du chrome", jouer: function (j, n) {
      j.fig.astuce("Règle le curseur.");
      j.titre("Ajoute du chrome jusqu'à la concentration minimale efficace qui rend l'acier inoxydable.");
      var fini = false;
      var gagne = function () {
        if (fini) return; fini = true; n.cr = 11; n.dessin();
        j.bravo("11 % de chrome au minimum.");
        j.expliquer("<p>La concentration minimale efficace du chrome est de <b>11 %</b>. Le chrome et ses alliages peuvent être <b>passivés</b> par de l'acide nitrique à 30 % : on élimine le fer libre de la surface et on la recouvre d'une couche d'oxyde anti-corrosion.</p>");
        j.suite();
      };
      j.curseur({ nom: "Chrome", min: 0, max: 20, pas: 1, val: 6, unite: " %", change: function (v) { if (fini) return; n.cr = v; n.dessin(); if (v >= 11) gagne(); } });
      j.reponse(gagne);
    } },
    { nom: "Trois nuances", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Associe chaque nuance d'acier inoxydable à ce qui la caractérise.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1.4fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<span>18 % de chrome, 8 % de nickel</span><span class="trou" data-attendu="a"></span>' +
        '<span>un peu de molybdène en plus</span><span class="trou" data-attendu="b"></span>' +
        '<span>carbone ramené à 0,03 % au plus</span><span class="trou" data-attendu="c"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", html: "316L" }, { id: "a", html: "302 (18-8)" }, { id: "b", html: "316" }],
        aide: "Le « L » de 316L veut dire faible teneur en carbone. Le 316 est le 18-8 avec du molybdène.",
        ok: function () { j.bravo("302, 316, 316L."); j.expliquer("<p>En 1950, le carbone de l'inox 316 passe de 0,08 % à 0,03 % au maximum : meilleure résistance à la corrosion en milieu salé, moins d'hypersensibilité. Le 316L est le plus recommandé pour les implants.</p>"); j.suite(); }
      });
    } },
    { nom: "Temporaire", jouer: function (j, n) {
      j.titre("Pourquoi le 316L n'est-il approprié que pour des implants temporaires (plaques, vis, clous) ?");
      j.choix([
        { html: "Il peut se corroder in vivo là où les contraintes sont fortes et l'oxygène manque, sous les vis par exemple", juste: true },
        { html: "Il est magnétique", aide: "Le 316L est non magnétique (il donne quand même des artefacts d'IRM)." },
        { html: "On ne peut pas le durcir", aide: "On le durcit par écrouissage, pas par traitement thermique." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Contraintes élevées et manque d'oxygène.");
        j.expliquer("<p>Anodisation, passivation et nitruration améliorent la résistance à la corrosion, à l'usure et à la fatigue du 316L.</p>");
        j.suite();
      } });
    } },
    { nom: "La vis de trop", jouer: function (j, n) {
      n.mode = "plaque"; n.libre = true; n.marque = null; n.dessin();
      j.fig.astuce("Touche une vis.");
      j.titre("Sur cette plaque en 316L, une des vis pose problème. Touche-la.");
      var gagne = function () {
        n.libre = false; n.marque = 460; n.dessin();
        j.bravo("La vis en titane, au contact direct de l'inox.");
        j.expliquer("<p>Il faut éviter le contact direct d'un implant en inox avec du titane, un alliage de titane ou un alliage de cobalt : <b>corrosion galvanique</b>. Plusieurs métaux dans le même os ne posent pas de problème tant qu'ils ne se touchent pas.</p>");
        j.suite();
      };
      n.surClic = function (x) {
        if (x === 460) gagne();
        else { n.marque = x; n.dessin(); j.erreur("Une vis en inox sur une plaque en inox : même métal. Cherche deux métaux différents qui se touchent."); }
      };
      j.reponse(gagne);
    } },
    { nom: "Dans une plaque", jouer: function (j, n) {
      n.surClic = null;
      j.fig.astuce("");
      j.titre("Une plaque en 316L pèse 80 g et contient 17,5 % de chrome. Quelle masse de chrome ? Et au plus quelle masse de carbone (0,03 %) ?");
      j.nombre({ avant: "m_{Cr},\\ m_{C} =", apres: "\\text{g}", cases: [{ attendu: 14, tol: 0.01 }, { attendu: 0.024, tol: 0.0005 }], ligne: true,
        aide: function (k) { return k === 0 ? "0,175 × 80." : "0,03 % = 0,0003 : 0,0003 × 80."; },
        ok: function () { j.bravo("14 g de chrome, au plus 0,024 g de carbone."); j.suite(); } });
    } }
  ]
});
