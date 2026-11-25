/* Niveau : bagues lisses autolubrifiantes. Principe du film lubrifiant, trois types, intérêt en milieu médical. */
NIVEAU({
  id: "bagues-lisses",
  init: function (fig) {
    var C = D.C, g = E.s("g", null, fig.svg);
    var n = { type: 0 };
    // coupe longitudinale : axe au centre, bague au-dessus et au-dessous
    n.dessin = function () {
      E.vider(g);
      var x0 = 110, x1 = 570, y = 300;
      E.s("rect", { x: 40, y: y - 60, width: 600, height: 120, rx: 10, fill: "#dfe3ea", stroke: C.encre, "stroke-width": 2.5 }, g);
      D.texte(g, "axe", [600, y], { taille: 18 });
      [-1, 1].forEach(function (s) {
        var yb = s < 0 ? y - 60 - 70 : y + 60;
        var coul = n.type === 0 ? "#4a78c2" : "#c08a4a";
        E.s("rect", { x: x0, y: yb, width: x1 - x0, height: 70, fill: coul, stroke: C.encre, "stroke-width": 2.5 }, g);
        if (n.type === 0) E.s("rect", { x: x0, y: s < 0 ? y - 60 - 14 : y + 60, width: x1 - x0, height: 14, fill: "#6b5a46", stroke: C.encre, "stroke-width": 1.5 }, g);
        if (n.type === 1) for (var k = 0; k < 7; k++) E.s("circle", { cx: x0 + 35 + k * 65, cy: yb + 35, r: 16, fill: "#2b2b2e" }, g);
        if (n.type === 2) for (var q = 0; q < 70; q++) E.s("circle", { cx: x0 + 8 + ((q * 37) % 440), cy: yb + 6 + ((q * 23) % 58), r: 3, fill: "#6b4a25", opacity: 0.7 }, g);
      });
      // film lubrifiant
      E.s("line", { x1: x0, y1: y - 58, x2: x1, y2: y - 58, stroke: C.jeu, "stroke-width": 4 }, g);
      E.s("line", { x1: x0, y1: y + 58, x2: x1, y2: y + 58, stroke: C.jeu, "stroke-width": 4 }, g);
      D.texte(g, "film lubrifiant", [x0 + 120, y - 30], { taille: 17, coul: C.jeu });
      D.texte(g, ["revêtement polymère (PTFE)", "inserts solides (graphite)", "bronze fritté (poreux)"][n.type], [340, 70], { taille: 20, gras: true });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le principe", jouer: function (j, n) {
      n.type = 0; n.dessin();
      j.fig.astuce("Coupe d'une bague autolubrifiante sur son axe.");
      j.titre("Sur quoi repose le fonctionnement d'une bague autolubrifiante ?");
      j.choix([
        { html: "Le transfert d'un film lubrifiant de la bague vers l'axe : pas de contact métal contre métal", juste: true },
        { html: "Des billes qui roulent entre la bague et l'axe", aide: "Une bague lisse n'a aucun élément roulant : elle glisse." },
        { html: "Un graisseur qui envoie de la graisse à chaque cycle", aide: "Justement, elle s'en passe : le lubrifiant est déjà dans le matériau." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Un film lubrifiant passe de la bague à l'axe.");
        j.expliquer("<p>Le film empêche tout contact direct métal contre métal lors du déplacement. Le lubrifiant (graphite, PTFE ou huile dans du bronze fritté) est intégré au matériau : <b>pas d'entretien</b>.</p>");
        j.suite();
      } });
    } },
    { nom: "Le graphite", jouer: function (j, n) {
      n.type = 1; n.dessin();
      j.fig.astuce("Regarde les pastilles noires dans le bronze.");
      j.titre("L'axe frotte sur des pastilles noires et étale continuellement leur matière sur la zone de contact. Quel type de bague ?");
      j.choix([
        { html: "Revêtement polymère", aide: "Le polymère est une couche continue, pas des pastilles." },
        { html: "Inserts solides", juste: true },
        { html: "Bronze fritté", aide: "Le fritté contient de l'huile dans ses pores, pas des pastilles solides." }
      ], { ok: function () {
        j.bravo("Bague à inserts solides : du graphite dans du bronze.");
        j.expliquer("<p>Des dépôts de <b>lubrifiant solide</b>, souvent du graphite, sont incrustés dans la paroi en bronze. L'axe vient frotter ces pastilles et étale le graphite.</p>");
        j.suite();
      } });
    } },
    { nom: "L'huile qui remonte", jouer: function (j, n) {
      n.type = 2; n.dessin();
      j.fig.astuce("Bronze fritté : un métal plein de petits trous.");
      j.titre("Pourquoi une bague en bronze fritté lubrifie-t-elle davantage quand elle travaille ?");
      j.choix([
        { html: "La chaleur et le mouvement font dilater l'huile des pores, qui remonte à la surface", juste: true },
        { html: "Le bronze fond légèrement au contact de l'axe", aide: "Rien ne fond : le métal sert d'éponge pour un liquide." },
        { html: "L'axe arrache des pastilles de graphite", aide: "Ça, ce sont les inserts solides. Ici, le matériau est imprégné d'huile." }
      ], { colonnes: 1, ok: function () {
        j.bravo("L'huile se dilate et remonte.");
        j.expliquer("<p>Le bronze fritté est fabriqué avec des <b>micro-pores</b>, comme une éponge, imprégnés d'huile. Sous l'effet de la chaleur et du mouvement, l'huile se dilate et remonte à la surface pour lubrifier.</p>");
        j.suite();
      } });
    } },
    { nom: "Au bloc opératoire", jouer: function (j, n) {
      n.type = 0; n.dessin();
      j.fig.astuce("Revêtement polymère : PTFE dans une armature métallique.");
      j.titre("Pourquoi ces bagues conviennent-elles aux applications soumises à des normes d'hygiène strictes, comme le médical ?");
      j.choix([
        { html: "Ni fuite ni projection de lubrifiant", juste: true },
        { html: "Elles sont stérilisées à chaque cycle", aide: "Le cours parle de propreté de fonctionnement, pas de stérilisation." },
        { html: "Elles tournent plus vite que les roulements", aide: "La vitesse n'est pas l'argument : regarde ce qui pourrait salir l'environnement." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Propreté de fonctionnement.");
        j.expliquer("<p>Il n'y a ni fuite ni projection : ces bagues conviennent aux industries alimentaire, pharmaceutique et au médical. Elles gardent aussi un <b>frottement faible et constant</b>, dès le démarrage.</p>");
        j.suite();
      } });
    } }
  ]
});
