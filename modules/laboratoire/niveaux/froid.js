/* Niveau : réfrigérateurs et congélateurs : cycle de compression, rôles des éléments, alarmes, joint, choix de l'appareil. */
NIVEAU(LABO.rejouable({
  id: "froid",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Le cycle", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Le réfrigérant tourne en boucle. Suis-le, en partant de l'élément qui absorbe la chaleur de l'enceinte.");
      j.consigne("Touche les quatre éléments dans l'ordre du cycle.");
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 21, boucle: true,
        noeuds: [{ t: "Condenseur", x: 440, y: 230, w: 210, h: 120 }, { t: "Détendeur", x: 235, y: 40, w: 210, h: 120 }, { t: "Évaporateur", x: 30, y: 230, w: 210, h: 120 }, { t: "Compresseur", x: 235, y: 420, w: 210, h: 120 }],
        ordre: [2, 3, 0, 1],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["Dans l'enceinte, le réfrigérant s'évapore en absorbant la chaleur.", "La vapeur à basse pression est aspirée et comprimée.", "À haute pression, le réfrigérant rend sa chaleur à la pièce et se liquéfie.", "Il reste à faire chuter la pression avant de revenir dans l'enceinte."][k]; },
        fin: function () {
          j.bravo("Évaporateur, compresseur, condenseur, détendeur, et on recommence.");
          j.expliquer("<p>Le cycle de compression déplace la chaleur de l'enceinte vers la pièce. L'évaporateur absorbe la chaleur (le réfrigérant devient vapeur) ; le compresseur passe la vapeur de basse à haute pression ; le condenseur cède la chaleur (le réfrigérant redevient liquide) ; le détendeur fait chuter la pression.</p>");
          j.suite();
        }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Les autres éléments", jouer: function (j, n) {
      var A = LABO;
      j.titre("Autour du circuit, d'autres éléments le protègent. Relie chacun à son rôle.");
      j.consigne("Touche un élément, puis son rôle.");
      var p = A.paires({
        g: n.g, gauche: ["Filtre", "Collecteur de liquide", "Isolation thermique", "Protection thermique"],
        droite: ["Ralentit l'entrée de la chaleur de la pièce", "Coupe le compresseur en cas de surcharge", "Retient l'humidité et les impuretés", "Ne laisse entrer que la vapeur dans le compresseur"],
        bon: [2, 3, 0, 1], xg: 20, wg: 240, xd: 320, wd: 340, y0: 60, h: 104, pas: 134, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Un filtre retient ce qui ne doit pas circuler.", "Il collecte ce qui reste liquide, pour protéger le compresseur.", "Mousse de polyuréthane, laine de verre : contre la chaleur extérieure.", "Une sécurité électrique du compresseur."][i]; },
        fin: function () { j.bravo("Filtre, collecteur, isolation, protection thermique."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Régler les alarmes", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.icone(n.g, "frigo", [200, 280], 220, C.froid);
      A.texte(n.g, "−80 °C", [440, 260], { taille: 48, gras: 800, coul: C.froid });
      A.texte(n.g, "température de fonctionnement", [440, 320], { taille: 18, coul: C.doux, gras: 500 });
      j.titre("Un congélateur ultra-basse température fonctionne à −80 °C. Ses limites d'alarme s'écartent de 10 % de cette température. Où se déclenchent-elles ?");
      j.zone("", "<p>Première case : l'alarme basse (la plus froide). Seconde case : l'alarme haute.</p>");
      j.nombre({ avant: "\\text{alarmes} :", apres: "^\\circ\\text{C}", cases: [{ attendu: -88, tol: 0.05 }, { attendu: -72, tol: 0.05 }], ligne: true,
        aide: function (k) { return "10 % de 80, c'est 8 degrés. L'alarme basse est plus froide que −80 °C, l'alarme haute moins froide. Pense au signe moins."; },
        ok: function () {
          j.bravo("−88 °C et −72 °C.");
          j.expliquer("<p>Les limites d'alarme ne s'écartent en général pas de plus de 10 % de la température de fonctionnement. D'autres alarmes signalent un défaut d'alimentation, une baisse de tension, une température ambiante excessive, un dépassement de la limite inférieure.</p>");
          j.suite();
        } });
    } },
    { nom: "Le test du papier", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 160, y: 80, width: 360, height: 440, rx: 14, fill: "#fff", stroke: C.encre, "stroke-width": 4 }, n.g);
      A.s("rect", { x: 500, y: 240, width: 120, height: 60, fill: "#fff", stroke: C.doux, "stroke-width": 2 }, n.g);
      A.fleche(n.g, [520, 270], [640, 270], { coul: C.jeu, ep: 4 });
      A.texte(n.g, "le papier glisse sans résister", [340, 560], { taille: 20, gras: 700 });
      j.titre("On glisse une bande de papier de 5 cm entre le joint et le châssis, on ferme, on tire : le papier sort sans aucune résistance. Que faire ?");
      j.choix([
        { html: "Rien : le papier n'a pas déchiré", aide: "Le cours dit que le papier doit opposer une résistance." },
        { html: "Remplacer le joint", juste: true },
        { html: "Baisser la consigne de température pour compenser", aide: "Cela ferait travailler davantage le compresseur sans réparer la fuite." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Pas de résistance : le joint doit être remplacé.");
        j.expliquer("<p>Le test se fait une fois par trimestre, tous les 10 cm sur la totalité du joint. Un joint en mauvais état laisse entrer l'humidité (givre sur l'évaporateur), allonge le travail du compresseur, modifie la température et augmente le coût de fonctionnement.</p>");
        j.suite();
      } });
    } },
    { nom: "Quel appareil ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "danger", [340, 260], 200, A.C.ko);
      j.titre("Le laboratoire doit conserver des souches virales. Quel appareil le cours recommande-t-il ?");
      j.choix([
        { html: "Un réfrigérateur pour banque de sang, 2 à 8 °C", aide: "Celui-là sert au sang total." },
        { html: "Un congélateur basse température, −15 à −35 °C", aide: "Pour des souches, le cours demande plus froid." },
        { html: "Un congélateur ultra-basse température, −60 à −86 °C", juste: true }
      ], { colonnes: 1, ok: function () { j.bravo("Ultra-basse température pour les souches virales ou microbiennes."); j.suite(); } });
    } }
  ]
}));
