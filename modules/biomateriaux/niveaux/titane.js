/* Niveau : titane et alliages. Module proche de l'os, stress-shielding (modèle ajouté), usure, alliages, couche de TiO2. */
NIVEAU({
  id: "titane",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { E: 230 };
    n.dessin = function () {
      E.vider(g);
      var part = 20 / (20 + n.E), dens = 0.35 + 0.65 * Math.min(1, part / 0.5);
      E.s("path", { d: "M140 120 Q200 90 260 120 L270 170 Q250 210 252 270 L260 540 L140 540 L148 270 Q150 210 130 170 Z", fill: "rgba(184,155,106," + dens.toFixed(2) + ")", stroke: "#8a6d3b", "stroke-width": 3 }, g);
      E.s("rect", { x: 182, y: 140, width: 36, height: 300, rx: 16, fill: "#c3c8d2", stroke: C.encre, "stroke-width": 3 }, g);
      D.fleche(g, [200, 50], [200, 130], C.encre, 6);
      D.texte(g, "poids", [250, 70], { taille: 18, ancre: "start" });
      D.texte(g, "os", [110, 360], { taille: 19, coul: "#8a6d3b" });
      var X0 = 330, W = 300;
      D.texte(g, "part portée par l'os", [X0 + W / 2, 200], { taille: 18, coul: C.doux, gras: false });
      E.s("rect", { x: X0, y: 230, width: W * part, height: 60, fill: "#b89b6a" }, g);
      E.s("rect", { x: X0 + W * part, y: 230, width: W * (1 - part), height: 60, fill: "#c3c8d2" }, g);
      E.s("rect", { x: X0, y: 230, width: W, height: 60, fill: "none", stroke: C.encre, "stroke-width": 2.5 }, g);
      D.texte(g, E.fmt(100 * part, 1) + " %", [X0 + W / 2, 330], { taille: 26, mono: true });
      D.texte(g, "tige : E = " + n.E + " GPa", [X0 + W / 2, 400], { taille: 20 });
      D.texte(g, "os : E = 20 GPa", [X0 + W / 2, 440], { taille: 18, coul: "#8a6d3b", gras: false });
      fig.chip("modèle ajouté : même section, même allongement");
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le module du titane", jouer: function (j, n) {
      j.fig.astuce("Règle le module de la tige.");
      j.titre("La tige est en CoCr. Remplace-la par du titane : règle son module sur celui du titane donné par le cours.");
      var fini = false;
      var gagne = function () {
        if (fini) return; fini = true; n.E = 110; n.dessin();
        j.bravo("100 à 110 GPa pour le titane.");
        j.expliquer("<p>Le titane a un module très bas, de 100 à 110 GPa, plus proche de celui de l'os (20 GPa) que l'acier inox (210 GPa). L'os travaille davantage : moins de <b>stress-shielding</b>, cette ostéoporose localisée autour d'une prothèse qui absorbe les contraintes.</p>");
        j.suite();
      };
      j.curseur({ nom: "E de la tige", min: 20, max: 240, pas: 5, val: 230, unite: " GPa", change: function (v) { if (fini) return; n.E = v; n.dessin(); if (v >= 100 && v <= 110) gagne(); } });
      j.reponse(gagne);
    } },
    { nom: "Avec du CoCr", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Même modèle, tige en CoCr (230 GPa). Quelle part de la charge l'os porte-t-il ?");
      j.nombre({ avant: "\\dfrac{E_{os}}{E_{os} + E_{tige}} =", apres: "\\%", cases: [{ attendu: 8, tol: 0.05 }], ligne: true,
        aide: function () { return "20 / (20 + 230), puis multiplie par 100."; },
        ok: function () { n.E = 230; n.dessin(); j.bravo("20 / 250 = 8 %."); j.expliquer("<p>Modèle ajouté (deux ressorts en parallèle, même section) : plus la tige est rigide, plus elle prend la charge, moins l'os est sollicité.</p>"); j.suite(); } });
    } },
    { nom: "Pas en friction", jouer: function (j, n) {
      j.titre("Pourquoi n'utilise-t-on plus le titane en couple de friction (tête contre cotyle) ?");
      j.choix([
        { html: "À cause de sa mauvaise résistance à l'usure", juste: true },
        { html: "Parce qu'il donne des artefacts d'IRM", aide: "Le titane n'est justement pas source d'artefact d'IRM." },
        { html: "Parce qu'il est trop lourd", aide: "Il est plus léger que l'inox et le CoCr." }
      ], { colonnes: 1, ok: function () { j.bravo("Mauvaise résistance à l'usure."); j.suite(); } });
    } },
    { nom: "Quel alliage ?", jouer: function (j, n) {
      j.titre("Associe chaque alliage de titane à son intérêt.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1.5fr;gap:8px;align-items:center;font-size:17px">' +
        '<b>TiAl6V4</b><span class="trou" data-attendu="v"></span><b>Ti-5Al-2,5Fe</b><span class="trou" data-attendu="p"></span><b>Ti-13Nb-13Zr</b><span class="trou" data-attendu="m"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "p", html: "électrodes de pacemaker" }, { id: "m", html: "module plus faible" }, { id: "v", html: "le plus utilisé, risque de vanadium" }],
        aide: "Le V de TiAl6V4 est le vanadium ; le cours cite la qualité du signal pour Ti-5Al-2,5Fe ; Ti-13Nb-13Zr a un module plus faible que le TA6V.",
        ok: function () { j.bravo("TA6V, pacemaker, module plus faible."); j.expliquer("<p>Ti-6Al-7Nb : propriétés semblables au TA6V, meilleure résistance à la corrosion. Ti-15Mo-3Nb : grande résistance, faible module, sans Al ni V.</p>"); j.suite(); }
      });
    } },
    { nom: "Ce qui le protège", jouer: function (j, n) {
      j.titre("Qu'est-ce qui protège un alliage de titane de la corrosion dans le corps ?");
      j.choix([
        { html: "Une couche passivante de TiO₂ qui se reforme quand elle est abîmée", juste: true },
        { html: "Un revêtement de nickel", aide: "Le nickel est le métal le plus allergène : on ne l'ajoute pas pour protéger." },
        { html: "Rien : le titane se corrode vite", aide: "Le cours dit qu'il résiste totalement aux fluides corporels." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Le TiO₂, une couche dynamique.");
        j.expliquer("<p>La couche résiste très bien aux ions chlorure et isole le métal ; son épaisseur et sa composition évoluent, et elle se reforme après une attaque chimique ou mécanique. Le titane est aussi capable d'<b>ostéo-intégration</b> : il se laisse coloniser par les cellules vivantes.</p>");
        j.suite();
      } });
    } }
  ]
});
