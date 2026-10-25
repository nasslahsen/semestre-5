/* Niveau : infrastructure et sécurité technique (chapitre 8) : réseaux, référentiels, EPI, risques. */
NIVEAU(LABO.rejouable({
  id: "infrastructure",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Les réseaux", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque réseau à ce qu'il faut y maîtriser.");
      j.consigne("Touche un réseau, puis son point à maîtriser.");
      var p = A.paires({
        g: n.g, gauche: ["Électricité", "Réfrigération", "HVAC", "Eau"],
        droite: ["Qualité, traitement, surveillance continue", "Onduleur et groupe électrogène", "Température, humidité, pression", "Alarmes de dérive"],
        bon: [1, 3, 2, 0], xg: 20, wg: 240, xd: 320, wd: 340, y0: 60, h: 104, pas: 134, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["Ce qui prend le relais en cas de coupure.", "Ce qui prévient si le froid ne tient plus.", "Le traitement de l'air de la salle.", "Pense au chapitre sur l'eau pure."][i]; },
        fin: function () { j.bravo("Secours électrique, alarmes du froid, air, eau."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Les référentiels", jouer: function (j, n) {
      var A = LABO;
      j.titre("Relie chaque référentiel à son objet.");
      j.consigne("Touche un référentiel, puis son objet.");
      var p = A.paires({
        g: n.g, gauche: ["ISO 15190", "ISO 35001", "IEC 61010", "ISO 22870"],
        droite: ["Sécurité des équipements de laboratoire", "Biologie délocalisée (POCT)", "Sécurité des laboratoires médicaux", "Management du biorisque"],
        bon: [2, 3, 0, 1], xg: 20, wg: 200, xd: 280, wd: 380, y0: 60, h: 104, pas: 134, taille: 19,
        erreur: function (m) { j.erreur(m); },
        aide: function (i) { return ["La voisine de l'ISO 15189, pour la sécurité.", "Le biorisque.", "Une norme IEC : électrotechnique, donc les équipements.", "Les examens au plus près du patient."][i]; },
        fin: function () { j.bravo("15190 sécurité, 35001 biorisque, 61010 équipements, 22870 POCT."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "La dernière barrière", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "gant", [220, 260], 160, C.jeu); A.icone(n.g, "lunettes", [460, 260], 160, C.jeu);
      j.titre("Que dit le cours de l'équipement de protection individuelle (gants, lunettes, blouse) ?");
      j.choix([
        { html: "C'est la principale protection du personnel", aide: "Le cours le place à la fin, pas au début." },
        { html: "C'est une barrière finale : la sécurité doit être conçue dans le système", juste: true },
        { html: "Il rend inutiles les normes de sécurité", aide: "Les référentiels de sécurité restent indispensables." }
      ], { colonnes: 1, ok: function () { j.bravo("L'EPI est la dernière barrière ; la sécurité se conçoit en amont."); j.suite(); } });
    } },
    { nom: "Les risques", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "danger", [340, 260], 200, A.C.ko);
      j.titre("Lequel de ces risques ne fait pas partie de la liste des risques à maîtriser donnée par le cours ?");
      j.choix([
        { html: "Le risque informatique", aide: "Il est cité." },
        { html: "Le risque radiologique", aide: "Il est cité." },
        { html: "Le risque commercial", juste: true },
        { html: "Le risque incendie", aide: "Il est cité." }
      ], { colonnes: 1, ok: function () { j.bravo("Biologique, chimique, électrique, incendie, radiologique, informatique."); j.suite(); } });
    } }
  ]
}));
