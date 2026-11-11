/* Niveau : céramiques résorbables. Remplacement par l'os, tissus endogènes, formules et ciments, taux de réussite, zones peu sollicitées. */
NIVEAU({
  id: "ceramiques-resorbables",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { t: 0 };
    n.dessin = function () {
      E.vider(g);
      E.s("rect", { x: 60, y: 110, width: 560, height: 420, rx: 36, fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      D.texte(g, "os du patient", [340, 140], { taille: 18, coul: "#8a6d3b" });
      var x0 = 150, y0 = 180;
      E.s("rect", { x: x0, y: y0, width: 380, height: 300, rx: 20, fill: "#fff", stroke: "#cbb893", "stroke-width": 2, "stroke-dasharray": "6 5" }, g);
      var no = 0, tot = 0;
      for (var i = 0; i < 12; i++) for (var k = 0; k < 9; k++) {
        var p = [x0 + 22 + i * 30.5, y0 + 22 + k * 32], bord = Math.min(i, 11 - i, k, 8 - k) / 4;
        tot++;
        if (bord < n.t * 1.15) { D.rond(g, p, 13, { fill: "#d9c39a" }); no++; } else D.rond(g, p, 11, { fill: C.jeu, op: 0.85 });
      }
      fig.chip("os neuf : " + Math.round(100 * no / tot) + " %");
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le comblement", jouer: function (j, n) {
      j.fig.astuce("Fais passer les semaines.");
      j.titre("On a comblé un défaut osseux avec du phosphate tricalcique poreux, dégradable en quelques semaines. Fais avancer le temps jusqu'à ce que l'os ait tout remplacé.");
      var fini = false;
      var gagne = function () {
        if (fini) return; fini = true; n.t = 1; n.dessin();
        j.bravo("Plus de céramique : de l'os neuf partout.");
        j.expliquer("<p>Une céramique <b>résorbable</b> se dégrade pendant l'implantation et est remplacée progressivement par les tissus endogènes ; la vitesse varie d'un matériau à l'autre. La plupart sont des variantes du phosphate de calcium.</p>");
        j.suite();
      };
      j.curseur({ nom: "Semaines", min: 0, max: 12, pas: 1, val: 0, change: function (v) { if (fini) return; n.t = v / 12; n.dessin(); if (v >= 12) gagne(); } });
      j.reponse(gagne);
    } },
    { nom: "Qui la remplace ?", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Par quoi une céramique résorbable est-elle remplacée ?");
      j.choix([
        { html: "Par les tissus endogènes, ceux du patient", juste: true },
        { html: "Par une deuxième céramique qu'on injecte plus tard", aide: "Le remplacement se fait tout seul, par le corps." },
        { html: "Par rien : il reste un trou", aide: "Le principe est justement que l'os repousse à sa place." }
      ], { colonnes: 1, ok: function () { j.bravo("Par l'os du patient."); j.suite(); } });
    } },
    { nom: "Formules et usages", jouer: function (j, n) {
      j.titre("Associe chaque description au bon matériau.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<span>\\(\\mathrm{Ca_{10}(PO_4)_6(OH)_2}\\), composition très proche de l\'os</span><span class="trou" data-attendu="h"></span>' +
        '<span>\\(\\mathrm{Ca_3(PO_4)_2}\\), phosphate de chaux osseuse</span><span class="trou" data-attendu="t"></span>' +
        '<span>injectable, ostéoconducteur</span><span class="trou" data-attendu="c"></span></div>');
      E.rendre(z);
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", html: "ciment phosphocalcique" }, { id: "h", html: "hydroxyapatite" }, { id: "t", html: "phosphate tricalcique" }],
        aide: "OH dans la formule : l'hydroxyapatite. Trois calciums : le phosphate tricalcique. Ce qu'on injecte : un ciment.",
        ok: function () { j.bravo("HAP, TCP, ciment phosphocalcique."); j.suite(); }
      });
    } },
    { nom: "Dix ans après", jouer: function (j, n) {
      j.titre("On pose 80 tiges fémorales revêtues d'hydroxyapatite par projection plasma. Avec 90 % de réussite à dix ans, combien de prothèses en place, et combien d'échecs ?");
      j.nombre({ avant: "\\text{en place},\\ \\text{échecs} =", cases: [{ attendu: 72, tol: 0 }, { attendu: 8, tol: 0 }], ligne: true,
        aide: function (k) { return k === 0 ? "0,90 × 80." : "80 moins les prothèses en place."; },
        ok: function () { j.bravo("72 en place, 8 échecs."); j.expliquer("<p>La surface microporeuse de ces revêtements permet une repousse osseuse par <b>épitaxie</b>, qui améliore l'intégration et la fixation de l'implant.</p>"); j.suite(); } });
    } },
    { nom: "Où les mettre ?", jouer: function (j, n) {
      j.titre("Pourquoi limite-t-on les céramiques résorbables massives à des zones peu sollicitées, comme en chirurgie maxillo-faciale ?");
      j.choix([
        { html: "Leurs propriétés mécaniques sont encore faibles et peu maîtrisées", juste: true },
        { html: "Elles sont toxiques pour les os longs", aide: "Elles sont très proches de l'os : pas de toxicité en cause." },
        { html: "Elles sont trop lourdes", aide: "La masse n'est pas le problème. Pense à ce qui casse sous la charge." }
      ], { colonnes: 1, ok: function () { j.bravo("Mécaniquement faibles."); j.expliquer("<p>Problèmes propres aux céramiques biorésorbables : mesurer et contrôler la biorésorption et son effet sur le tissu local, et la calcification.</p>"); j.suite(); } });
    } }
  ]
});
