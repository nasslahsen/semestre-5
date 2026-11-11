/* Boss du chapitre 9 (affiché 4) : concevoir et poser une prothèse de hanche métallique. */
NIVEAU({
  id: "boss-metalliques",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { fait: {} };
    n.dessin = function () {
      E.vider(g);
      var f = n.fait;
      E.s("path", { d: "M170 200 Q190 90 330 90 Q470 90 510 180 Q460 230 390 210 Q370 166 330 168 Q290 170 280 214 Z", fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      E.s("path", { d: "M250 290 Q276 260 318 274 L338 310 Q308 360 306 440 L310 580 L214 580 L220 440 Q212 350 250 290 Z", fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      E.s("path", { d: "M262 206 A68 68 0 0 1 398 206 L386 206 A56 56 0 0 0 274 206 Z", fill: f.insert ? PLATEFORME.teinte(0.6) : "#fff", stroke: C.encre, "stroke-width": 3 }, g);
      D.rond(g, [330, 214], 38, { fill: f.tete ? "#a9b0bc" : "#fff", stroke: C.encre, ep: 3 });
      E.s("path", { d: "M316 242 L342 258 Q296 320 292 400 L280 548 Q274 566 266 548 L256 400 Q256 310 300 242 Z", fill: f.tige ? "#9fb2c9" : "#fff", stroke: C.encre, "stroke-width": 3 }, g);
      if (f.tige) D.texte(g, "Ti-6Al-4V", [470, 400], { taille: 18, ancre: "start" });
      if (f.tete) D.texte(g, "Co-Cr-Mo", [470, 280], { taille: 18, ancre: "start" });
      if (f.insert) D.texte(g, "polyéthylène", [470, 150], { taille: 18, ancre: "start" });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Les matériaux", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Choisis le matériau de chaque pièce : une tige qui laisse travailler l'os, une tête dure qui s'use peu, un insert qui glisse.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<b>tige</b><span class="trou" data-attendu="t"></span><b>tête</b><span class="trou" data-attendu="c"></span><b>insert</b><span class="trou" data-attendu="p"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "p", html: "polyéthylène" }, { id: "t", html: "Ti-6Al-4V" }, { id: "c", html: "Co-Cr-Mo" }],
        aide: "Le titane a le module le plus proche de l'os mais s'use mal ; le CoCr est dur ; le polyéthylène est le partenaire de frottement classique.",
        ok: function () { n.fait = { tige: 1, tete: 1, insert: 1 }; n.dessin(); j.bravo("Titane, cobalt-chrome, polyéthylène."); j.suite(); }
      });
    } },
    { nom: "La masse des tiges", jouer: function (j, n) {
      j.titre("La tige occupe 45 cm³. Quelle est sa masse en Ti-6Al-4V (4,4 g/cm³), et quelle serait-elle en Co-Cr-Mo (8,3 g/cm³) ?");
      j.nombre({ avant: "m_{Ti},\\ m_{CoCr} =", apres: "\\text{g}", cases: [{ attendu: 198, tol: 0.05 }, { attendu: 373.5, tol: 0.05 }], ligne: true,
        aide: function (k) { return k === 0 ? "4,4 × 45." : "8,3 × 45."; },
        ok: function () { j.bravo("198 g contre 373,5 g."); j.suite(); } });
    } },
    { nom: "La part de l'os", jouer: function (j, n) {
      j.titre("On hésite avec une tige en titane non allié (Ti-Cp, 100 GPa). Avec le modèle ajouté, quelle part de la charge l'os porterait-il ?");
      j.nombre({ avant: "\\dfrac{E_{os}}{E_{os} + E_{tige}} =", apres: "\\%", cases: [{ attendu: 16.67, tol: 0.05 }], ligne: true,
        aide: function () { return "E de l'os : 20 GPa."; },
        ok: function () { j.bravo("20 / 120 ≈ 16,7 %."); j.suite(); } });
    } },
    { nom: "La durée de l'insert", jouer: function (j, n) {
      j.titre("Une tête CoCr pénètre l'insert en PEhd de 0,15 mm/an. Au bout de combien d'années la pénétration atteint-elle 3 mm ?");
      j.nombre({ avant: "t =", apres: "\\text{ans}", cases: [{ attendu: 20, tol: 0.01 }], ligne: true,
        aide: function () { return "3 / 0,15."; },
        ok: function () { j.bravo("20 ans."); j.expliquer("<p>Avec une tête en zircone (0,05 mm/an), il faudrait \\(3 / 0{,}05 = 60\\) ans.</p>"); j.suite(); } });
    } },
    { nom: "La fracture voisine", jouer: function (j, n) {
      j.titre("Des années plus tard, le patient se casse le fémur sous la tige en titane. L'interne propose une plaque en 316L vissée au contact de la tige. Que réponds-tu ?");
      j.choix([
        { html: "Non : inox et titane en contact direct, c'est la corrosion galvanique ; il faut qu'ils ne se touchent pas", juste: true },
        { html: "Oui : deux métaux dans le même os, c'est toujours interdit, donc on ne fait rien", aide: "Le cours dit le contraire : plusieurs métaux dans le même os, pas de problème tant qu'ils ne se touchent pas." },
        { html: "Oui, sans précaution : l'inox ne se corrode jamais", aide: "Le 316L peut se corroder in vivo, et surtout il ne doit pas toucher le titane." }
      ], { colonnes: 1, ok: function () { j.bravo("Pas de contact direct entre métaux différents."); j.suite(); } });
    } }
  ]
});
