/* Niveau : organisation spatiale d'un LBM et principaux secteurs (1.3), aliquotage. */
NIVEAU(LABO.rejouable({
  id: "secteurs",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { pl: { P: function (v) { return v; } } };
    n.g = g;
    n.aliquotes = 0;
    n.dessinAliquotes = function (k) {
      A.vider(g);
      A.tube(g, 90, 180, { bouchon: "sec", w: 60, h: 260, couches: [{ h: 0.45, coul: C.sang }, { h: 0.4, coul: C.plasma }], etiquette: "tube primaire" });
      A.texte(g, "2 mL de sérum", [120, 140], { taille: 18, gras: 700 });
      for (var i = 0; i < 4; i++) {
        A.tube(g, 290 + i * 90, 300, { bouchon: C.gris, w: 44, h: 140, couches: i < k ? [{ h: 0.55, coul: C.plasma }] : [], etiquette: "aliquote " + (i + 1), taille: 15 });
      }
      if (k) A.fleche(g, [170, 330], [270, 370], { coul: C.jeu, ep: 4 });
    };
    return n;
  },
  etapes: [
    { nom: "Le trajet du tube", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Le plan d'un laboratoire suit une logique de flux. Trace le trajet d'un tube, de son arrivée à l'analyse.");
      j.consigne("Touche les secteurs dans l'ordre où le tube les traverse.");
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 18,
        noeuds: [
          { t: "Aire analytique", x: 380, y: 420, w: 270, h: 110 },
          { t: "Unité de réception", x: 30, y: 60, w: 270, h: 110 },
          { t: "Aires clinico-administratives", x: 380, y: 60, w: 270, h: 110 },
          { t: "Aire pré-analytique", x: 30, y: 420, w: 270, h: 110 },
          { t: "Soutien au personnel", x: 205, y: 240, w: 270, h: 110 }
        ],
        ordre: [1, 3, 0],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return k === 0 ? "Par où entre le tube dans le laboratoire ?" : k === 1 ? "Avant d'être analysé, le tube est trié, centrifugé, aliquoté." : "Il reste l'endroit où l'on mesure."; },
        fin: function () {
          j.bravo("Réception, pré-analytique, analytique.");
          j.expliquer("<p>Les échantillons circulent d'un secteur à l'autre dans un ordre précis : <b>unité de réception</b> (station pneumatique pour les échantillons internes, guichet pour les externes), <b>aire pré-analytique</b> (tri, distribution, centrifugation, aliquotage, conservation), <b>aire analytique</b> (toutes les spécialités).</p>");
          j.suite();
        }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Chaque activité, son secteur", jouer: function (j, n) {
      var A = LABO;
      j.titre("Dans quel secteur se passe chaque activité ?");
      j.consigne("Touche une activité à gauche, puis son secteur à droite.");
      var p = A.paires({
        g: n.g, gauche: ["Arrivée par station pneumatique", "Centrifugation et aliquotage", "Automate d'hématologie", "Revêtir et retirer les EPI", "Bureau du biologiste"],
        droite: ["Aire analytique", "Aires clinico-administratives", "Unité de réception", "Soutien au personnel", "Aire pré-analytique"],
        bon: [2, 4, 0, 3, 1], xg: 20, wg: 300, xd: 380, wd: 280, y0: 50, h: 88, pas: 108, taille: 17,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["La station pneumatique équipe le guichet d'arrivée.", "Préparer l'échantillon avant de l'analyser.", "C'est une mesure : là où sont les spécialités.", "Les espaces pour les EPI propres et souillés font partie du soutien au personnel.", "Les activités administratives sont en retrait des paillasses."][i]; },
        fin: function () { j.bravo("Cinq activités à leur place."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Les bureaux", jouer: function (j, n) {
      var A = LABO; A.vider(n.g);
      A.icone(n.g, "document", [340, 260], 160, A.C.jeu);
      j.titre("Où le cours place-t-il les aires clinico-administratives ?");
      j.choix([
        { html: "Au centre, pour être près de tous les secteurs", aide: "Être au centre obligerait à traverser les paillasses. Que dit le cours ?" },
        { html: "En retrait, dans un secteur où l'on n'a pas à traverser les laboratoires", juste: true },
        { html: "Dans l'aire pré-analytique", aide: "L'aire pré-analytique est un lieu de travail sur les échantillons, pas un bureau." }
      ], { colonnes: 1, ok: function () {
        j.bravo("En retrait, sans traverser les laboratoires.");
        j.suite();
      } });
    } },
    { nom: "Aliquoter", jouer: function (j, n) {
      n.dessinAliquotes(0);
      j.titre("On aliquote 2 mL de sérum en 4 aliquotes égales. Quel volume met-on dans chacune ?");
      j.nombre({ avant: "V_{\\text{aliquote}} =", apres: "\\mu\\text{L}", cases: [{ attendu: 500, tol: 0.5 }],
        aide: function () { return "Des portions égales : divise le volume total, en microlitres (1 mL = 1000 µL), par le nombre d'aliquotes."; },
        ok: function () {
          n.dessinAliquotes(4);
          j.bravo("4 aliquotes de 500 µL.");
          j.expliquer("<p>L'<b>aliquotage</b> consiste à diviser un échantillon (ou un réactif) en plusieurs portions égales, plus petites et représentatives : les <b>aliquotes</b>. Il se fait dans l'aire pré-analytique.</p>");
          j.suite();
        } });
    } },
    { nom: "Les congélateurs à azote", jouer: function (j, n) {
      var A = LABO; A.vider(n.g);
      A.icone(n.g, "frigo", [240, 260], 150, A.C.froid); A.icone(n.g, "danger", [440, 260], 120, A.C.ko);
      j.titre("Les rangements et dépôts accueillent des congélateurs à azote. À quoi le cours demande-t-il de faire attention en les plaçant ?");
      j.choix([
        { html: "Au bruit, à la chaleur, à l'humidité et aux risques d'explosion", juste: true },
        { html: "Uniquement à la distance avec la réception", aide: "La distance compte (réduire les déplacements), mais le cours cite d'autres contraintes, liées aux appareils eux-mêmes." },
        { html: "À l'éclairage naturel", aide: "Le cours ne parle pas d'éclairage ici. Pense à ce que produisent un congélateur et l'azote." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Bruit, chaleur, humidité, risques d'explosion.");
        j.expliquer("<p>Les rangements et dépôts sont placés pour l'efficience (moins de déplacements du personnel), en tenant compte du bruit, de la chaleur, de l'humidité et des risques d'explosion (congélateurs à azote).</p>");
        j.suite();
      } });
    } }
  ]
}));
