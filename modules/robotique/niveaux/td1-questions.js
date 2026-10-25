/* Niveau : TD 1, partie 1, exercices 2 à 4. Précision et répétabilité, série ou parallèle, boucle percevoir-traiter-décider-agir. */
NIVEAU({
  id: "td1-questions",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { mode: "cibles", boucle: [null, null, null, null] };
    // quatre cibles : les cas A à D du cours
    var CAS = [
      { nom: "A", pts: [[3, 2], [-4, 3], [2, -5], [-2, -3], [5, 1]] },
      { nom: "B", pts: [[40, 34], [44, 30], [37, 29], [43, 36], [39, 32]] },
      { nom: "C", pts: [[24, -30], [-35, 18], [10, 38], [-28, -22], [33, 8]] },
      { nom: "D", pts: [[48, -36], [12, -60], [58, -8], [30, -50], [62, -42]] }
    ];
    n.dessin = function () {
      E.vider(g);
      if (n.mode === "cibles") {
        CAS.forEach(function (c, k) {
          var o = [180 + (k % 2) * 320, 160 + Math.floor(k / 2) * 280];
          [90, 60, 30].forEach(function (r, i) { E.s("circle", { cx: o[0], cy: o[1], r: r, fill: i === 2 ? "#fde7e6" : "#fff", stroke: "#c6cbd8", "stroke-width": 2 }, g); });
          D.rond(g, o, 5, { fill: C.encre, stroke: "none" });
          c.pts.forEach(function (p) { D.rond(g, [o[0] + p[0], o[1] - p[1]], 8, { fill: C.acc, stroke: "#fff", ep: 2 }); });
          D.texte(g, c.nom, [o[0] - 112, o[1] - 100], { taille: 24 });
        });
      } else {
        var noms = ["Percevoir", "Traiter", "Décider", "Agir"];
        noms.forEach(function (t, k) {
          var y = 90 + k * 115, v = n.boucle[k];
          E.s("rect", { x: 140, y: y, width: 400, height: 76, rx: 16, fill: v ? "#e3f7ee" : "#fff", stroke: v ? C.ok : "#c6cbd8", "stroke-width": 2.5 }, g);
          D.texte(g, (k + 1) + ". " + t, [340, y + 26], { taille: 19 });
          D.texte(g, v || "…", [340, y + 54], { taille: 16, coul: v ? C.doux : C.gris, gras: false });
          if (k < 3) D.fleche(g, [340, y + 78], [340, y + 112], C.acc, 3);
        });
        E.s("path", { d: "M540 512 C 640 512, 640 128, 540 128", fill: "none", stroke: C.acc, "stroke-width": 3, "stroke-dasharray": "8 6" }, g);
        D.texte(g, "rétroaction", [610, 320], { taille: 16, coul: C.acc });
      }
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Répétable, pas précis", jouer: function (j, n) {
      j.fig.astuce("Cinq poses du même mouvement ; le point noir est la position demandée.");
      j.titre("Exercice 2. Quel robot a une bonne répétabilité mais une mauvaise précision ?");
      j.choix([{ html: "A", aide: "A est groupé et centré : bonne précision et bonne répétabilité." }, { html: "B", juste: true }, { html: "C", aide: "C est dispersé : la répétabilité est faible." }, { html: "D", aide: "D est loin et dispersé : les deux sont faibles." }], { ok: function () {
        j.bravo("B : les poses sont groupées, mais toutes à côté de la cible.");
        j.expliquer("<p>Précision : l'écart entre la position atteinte et la position demandée. Répétabilité : la dispersion des positions quand on refait le même mouvement.</p>");
        j.suite();
      } });
    } },
    { nom: "Pourquoi c'est possible", jouer: function (j, n) {
      j.titre("Pourquoi un robot peut-il être très répétable et pourtant peu précis ?");
      j.choix([
        { html: "Parce que l'écart est le même à chaque fois : le robot refait exactement le même mouvement, qui arrive en P' au lieu de P", juste: true },
        { html: "Parce que la répétabilité est toujours moins bonne que la précision", aide: "C'est l'inverse dans le cas B : les poses sont groupées, mais décalées." },
        { html: "Parce que le robot ne fait jamais deux fois le même mouvement", aide: "Dans ce cas les poses seraient dispersées : la répétabilité serait mauvaise." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Un écart constant décale le groupe sans le disperser.");
        j.expliquer("<p>Le cours décrit ce cas : positions regroupées mais décalées de P, écart constant, point atteint P'. Répéter n'est pas viser juste.</p>");
        j.suite();
      } });
    } },
    { nom: "Série ou parallèle", jouer: function (j, n) {
      j.titre("Exercice 3. Tâche très rigide et très précise, dans un petit espace de travail. Quel robot, et pourquoi ?");
      j.choix([
        { html: "Parallèle : plusieurs chaînes portent ensemble l'effecteur, d'où rigidité, précision et répétabilité ; son espace de travail réduit n'est pas gênant ici", juste: true },
        { html: "Série : sa grande enveloppe de travail le rend plus précis", aide: "La grande enveloppe est un atout du sériel, mais la tâche demande surtout rigidité et précision, dans un petit espace." },
        { html: "Série : la chaîne ouverte est plus rigide", aide: "En chaîne ouverte, chaque segment porte les suivants : les jeux et les flexions s'accumulent." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Parallèle : chaîne fermée, rigide et précis.");
        j.expliquer("<p>Le cours : parallèles, très grande précision et répétabilité, rigidité, vitesse élevée, moins d'inertie mobile ; sériels, grande enveloppe de travail, dextérité, polyvalence. Le petit espace de travail est justement la limite du parallèle, et la tâche ne demande pas plus.</p>");
        j.suite();
      } });
    } },
    { nom: "La boucle", jouer: function (j, n) {
      n.mode = "boucle"; n.dessin();
      j.fig.astuce("Un robot saisit un objet sur un tapis roulant.");
      j.titre("Exercice 4. Place chaque action du robot dans la boucle.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:auto 1fr;gap:8px 12px;align-items:center;font-size:17px">' +
        ["Percevoir", "Traiter", "Décider", "Agir"].map(function (c, k) { return "<span>" + c + '</span><span class="trou" data-attendu="' + "cvpb"[k] + '" style="min-width:300px"></span>'; }).join("") + "</div>");
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "b", html: "le bras se déplace et la pince saisit l'objet" }, { id: "c", html: "la caméra et le capteur du tapis repèrent l'objet" }, { id: "p", html: "choisir où et quand le saisir" }, { id: "v", html: "le contrôleur calcule la position de l'objet" }],
        aide: "Les capteurs viennent en premier, les actionneurs en dernier.",
        ok: function () {
          n.boucle = ["caméra, capteur du tapis", "position de l'objet", "où et quand saisir", "bras et pince"]; n.dessin();
          j.bravo("Capteurs, commande, décision, actionneurs.");
          j.expliquer("<p>Rétroaction : après l'action, les capteurs mesurent de nouveau (l'objet est-il saisi ? le tapis a-t-il avancé ?) et la boucle recommence. C'est l'interaction avec l'environnement qui referme la boucle.</p>");
          j.suite();
        }
      });
    } }
  ]
});
