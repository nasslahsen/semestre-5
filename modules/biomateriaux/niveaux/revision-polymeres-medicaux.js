/* Révision du chapitre 11 (affiché 7) : fluage d'un insert, loi de Hooke, applications, collagène humain, cycles de stérilisation. */
NIVEAU({
  id: "revision-polymeres-medicaux",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { t: 0 };
    n.dessin = function () {
      E.vider(g);
      // un insert en polyéthylène sous une tête : il s'enfonce avec le temps
      D.texte(g, "insert en polyéthylène sous charge constante", [340, 110], { taille: 18, coul: C.doux, gras: false });
      E.s("rect", { x: 160, y: 330 + 30 * n.t, width: 360, height: 140 - 30 * n.t, rx: 16, fill: PLATEFORME.teinte(0.45), stroke: C.encre, "stroke-width": 3 }, g);
      D.rond(g, [340, 250 + 30 * n.t], 80, { fill: "#e8e2d4", stroke: C.encre, ep: 3 });
      D.fleche(g, [340, 120 + 30 * n.t], [340, 165 + 30 * n.t], C.ko, 6);
      D.ligne(g, [140, 330], [540, 330], C.doux, 2, "6 5");
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "L'insert qui s'enfonce", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Sous une charge constante, un insert en polyéthylène continue à s'enfoncer lentement pendant des heures. Quel caractère du polymère cela montre-t-il ?");
      j.choix([
        { html: "Son caractère visqueux : la déformation évolue avec le temps sous charge constante", juste: true },
        { html: "Son caractère purement élastique", aide: "Un comportement élastique pur ne dépend pas du temps." },
        { html: "Une rupture fragile", aide: "Rien ne casse ici : la déformation augmente doucement." }
      ], { colonnes: 1, ok: function () { E.anime(1000, function (u) { n.t = u; n.dessin(); }); j.bravo("Viscoélastique : la part visqueuse."); j.suite(); } });
    } },
    { nom: "Quelle déformation ?", jouer: function (j, n) {
      j.titre("Un polymère vitreux de module E = 3 GPa subit σ = 15 MPa. Quelle déformation (loi de Hooke) ?");
      j.nombre({ avant: "\\varepsilon = \\dfrac{\\sigma}{E} =", cases: [{ attendu: 0.005, tol: 0.0001 }], ligne: true,
        aide: function () { return "15 / 3000."; },
        ok: function () { j.bravo("ε = 0,005."); j.suite(); } });
    } },
    { nom: "Le bon polymère implanté", jouer: function (j, n) {
      j.titre("Associe chaque application au polymère du tableau du cours.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<span>lentille intraoculaire, ciment orthopédique</span><span class="trou" data-attendu="m"></span>' +
        '<span>suture biodégradable</span><span class="trou" data-attendu="l"></span>' +
        '<span>implant vasculaire, chirurgie faciale</span><span class="trou" data-attendu="t"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "t", html: "PTFE" }, { id: "m", html: "PMMA" }, { id: "l", html: "acides polylactiques" }],
        aide: "Le PMMA des cockpits devenu lentille ; les acides polylactiques et polyglycoliques sont biodégradables ; le PTFE est le Téflon.",
        ok: function () { j.bravo("PMMA, PLA, PTFE."); j.suite(); }
      });
    } },
    { nom: "Collagène humain", jouer: function (j, n) {
      j.titre("Le collagène d'origine humaine est extrait de…");
      j.choix([
        { html: "Le placenta", juste: true },
        { html: "La peau de crabe", aide: "Du crabe, on tire la chitine." },
        { html: "Les algues", aide: "Des algues, on tire les fucanes." }
      ], { ok: function () { j.bravo("Le placenta humain (la peau pour le collagène animal)."); j.suite(); } });
    } },
    { nom: "Combien de jours ?", jouer: function (j, n) {
      j.titre("Un plateau d'instruments en PSU supporte plus de 1000 cycles de stérilisation à la vapeur. Stérilisé 4 fois par jour, combien de jours au minimum avant d'atteindre 1000 cycles ?");
      j.nombre({ avant: "\\text{jours} =", cases: [{ attendu: 250, tol: 0 }], ligne: true,
        aide: function () { return "1000 / 4."; },
        ok: function () { j.bravo("250 jours."); j.suite(); } });
    } }
  ]
});
