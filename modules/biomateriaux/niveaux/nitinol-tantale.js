/* Niveau : NiTi à mémoire de forme et tantale. Étapes de l'effet simple sens, superélasticité, chauffage au-dessus de Af, 8 % et 5 J/g, tantale poreux. */
NIVEAU({
  id: "nitinol-tantale",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { phase: "Mo", plie: true, chaud: false, libre: true };
    n.dessin = function () {
      E.vider(g);
      // réseau d'atomes
      E.s("rect", { x: 60, y: 110, width: 230, height: 230, rx: 18, fill: "#fff", stroke: C.pale, "stroke-width": 3 }, g);
      for (var i = 0; i < 5; i++) for (var k = 0; k < 5; k++) {
        var dx = n.phase === "A" ? 0 : n.phase === "Mm" ? (k % 2 ? 12 : 0) : 12 * k - 24;
        D.rond(g, [112 + i * 32 + dx, 162 + k * 32], 8, { fill: i % 2 === k % 2 ? "#3b5bdb" : "#e5484d" });
      }
      D.texte(g, n.phase === "A" ? "austénite" : n.phase === "Mm" ? "martensite maclée" : "martensite orientée", [175, 370], { taille: 19, coul: n.phase === "A" ? C.ok : C.jeu });
      // fil
      E.s("polyline", { points: n.plie ? "350,300 440,300 510,190 600,190" : "350,250 600,250", fill: "none", stroke: "#5b6172", "stroke-width": 14, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
      D.texte(g, "fil de NiTi", [475, 360], { taille: 18, coul: C.doux, gras: false });
      // élément chauffant à toucher
      var ch = n.chaud;
      E.s("rect", { x: 380, y: 430, width: 200, height: 70, rx: 18, fill: ch ? "#fde8e8" : "#fff", stroke: ch ? C.ko : C.encre, "stroke-width": 4 }, g);
      D.texte(g, ch ? "chauffé au-dessus de Af" : "chauffer", [480, 466], { taille: 19, coul: ch ? C.ko : C.encre });
    };
    svg.addEventListener("click", function (ev) {
      if (!n.libre || !n.surClic) return;
      var p = E.point(svg, ev);
      if (p[0] > 380 && p[0] < 580 && p[1] > 420 && p[1] < 510) n.surClic();
    });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Les étapes", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Remets dans l'ordre l'effet mémoire de forme simple sens, à partir de la martensite.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;text-align:center;font-size:16px"><b>1</b><b>2</b><b>3</b><b>4</b>' +
        '<span class="trou" data-attendu="d"></span><span class="trou" data-attendu="r"></span><span class="trou" data-attendu="c"></span><span class="trou" data-attendu="f"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", html: "chauffer au-dessus de Af" }, { id: "f", html: "forme initiale retrouvée" }, { id: "d", html: "déformer la martensite" }, { id: "r", html: "relâcher : la déformation reste" }],
        aide: "On déforme d'abord à froid ; la martensite étant stable, la déformation reste au relâchement ; il faut chauffer pour retrouver l'austénite et la forme.",
        ok: function () { j.bravo("Déformer, relâcher, chauffer, retrouver."); j.expliquer("<p>L'<b>effet mémoire de forme</b> : un échantillon déformé à l'état martensitique retrouve sa forme initiale à l'état austénitique, par chauffage au-dessus de la température « austénite finish » \\(A_f\\).</p>"); j.suite(); }
      });
    } },
    { nom: "Chauffer", jouer: function (j, n) {
      n.libre = true;
      j.fig.astuce("Touche l'élément chauffant.");
      j.titre("Le fil a été plié à froid et relâché : il reste plié. Fais-lui retrouver sa forme.");
      var gagne = function () {
        n.libre = false; n.chaud = true; n.phase = "A"; n.dessin();
        E.anime(700, function (u) { if (u > 0.5) { n.plie = false; n.dessin(); } });
        j.bravo("Au-dessus de Af, il redevient austénite et droit.");
        j.expliquer("<p>Au retour à température ambiante, sans contrainte, la martensite maclée se reforme sans changer la forme : c'est l'effet <b>simple sens</b>. Dans l'effet <b>double sens</b>, l'austénite devient martensite orientée par simple refroidissement : la pièce change de forme dans les deux sens.</p>");
        j.suite();
      };
      n.surClic = gagne;
      j.reponse(gagne);
    } },
    { nom: "Les lunettes", jouer: function (j, n) {
      n.surClic = null;
      j.fig.astuce("");
      j.titre("Une monture de lunettes en NiTi, tordue à température ambiante, reprend sa forme dès qu'on la lâche. Quel effet ?");
      j.choix([
        { html: "L'effet superélastique", juste: true },
        { html: "L'effet mémoire simple sens", aide: "Pour le simple sens, il faut chauffer au-dessus de Af. Ici, on ne chauffe pas." },
        { html: "L'effet double sens", aide: "Le double sens se déclenche par la température, pas par le relâchement." }
      ], { colonnes: 1, ok: function () { j.bravo("Superélastique : isotherme, l'énergie est stockée puis rendue."); j.suite(); } });
    } },
    { nom: "Mouvement et travail", jouer: function (j, n) {
      j.titre("En mémoire de forme libre, un fil de 30 mm change de longueur de 8 % au plus. De combien ? Et un actionneur de 3 g fournit au plus combien de joules (5 J/g) ?");
      j.nombre({ avant: "\\Delta L,\\ W =", cases: [{ attendu: 2.4, tol: 0.01 }, { attendu: 15, tol: 0.01 }], ligne: true,
        aide: function (k) { return k === 0 ? "0,08 × 30 mm." : "5 J/g × 3 g."; },
        ok: function () { j.bravo("2,4 mm et 15 J."); j.expliquer("<p>Quatre catégories : mémoire libre (jusqu'à 8 %), mémoire sous contrainte (efforts importants), actionneurs (jusqu'à 5 J par gramme), superélasticité.</p>"); j.suite(); } });
    } },
    { nom: "Le tantale poreux", jouer: function (j, n) {
      j.titre("Pourquoi le tantale poreux est-il intéressant pour une arthroplastie sans ciment ?");
      j.choix([
        { html: "Porosité (75 à 85 %) et faible rigidité comme l'os spongieux : moins de stress-shielding", juste: true },
        { html: "Il est encore plus rigide que le tantale massif", aide: "Les pores retirent de la matière : la rigidité baisse (2,5 à 3,9 GPa)." },
        { html: "Il fond à basse température", aide: "Le tantale est réfractaire : il fond à 3017 °C." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Comme l'os spongieux.");
        j.expliquer("<p>Tantale : oxyde \\(\\mathrm{Ta_2O_5}\\) stable en surface. Massif : fils, clips, agrafes. Poreux : mise en charge immédiate.</p>");
        j.suite();
      } });
    } }
  ]
});
