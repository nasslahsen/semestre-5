/* Défi du chapitre 7 : le trajet d'un tube dans un hôpital automatisé, sans aide avant le premier essai. */
NIVEAU(LABO.rejouable({
  id: "boss-automatisation",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "De la prescription au dossier", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets dans l'ordre le parcours d'un bilan, dans un hôpital entièrement automatisé.");
      j.consigne("Touche les étapes dans l'ordre.");
      var N = ["Le trieur lit le tube et l'envoie à la centrifugeuse", "Le résultat validé arrive dans le dossier", "Le médecin prescrit dans le SIH", "La cartouche part par le pneumatique", "L'étiqueteuse prépare le tube au code-barres", "L'automate mesure, le biologiste valide"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 19, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 70, y: 30 + i * 92, w: 540, h: 74 }; }),
        ordre: [2, 4, 3, 0, 5, 1],
        erreur: function (m) { j.erreur(m); },
        aide: function () { return "Pense au circuit : prescription, identification, transport, préparation, analyse, retour."; },
        fin: function () { j.bravo("SIH, étiqueteuse, pneumatique, trieur, analyse et validation, retour au SIH."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Une cartouche à 5,5 m/s", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "horloge", [340, 240], 200, A.C.jeu);
      j.titre("La station du laboratoire est à 440 m de la réanimation. À 5,5 m/s, combien de secondes dure le trajet ?");
      j.nombre({ avant: "t =", apres: "\\text{s}", cases: [{ attendu: 80, tol: 0.5 }],
        aide: function () { return "Temps = distance / vitesse."; },
        ok: function () { j.bravo("80 secondes."); j.suite(); } });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 260], 200, A.C.jeu);
      j.titre("Le cahier de maintenance de l'étiqueteuse contient une erreur. Laquelle ?");
      j.choix([
        { html: "« Tête d'impression nettoyée à l'alcool isopropylique. »", aide: "C'est l'entretien quotidien prévu." },
        { html: "« Rouleaux en caoutchouc lubrifiés à l'huile fine. »", juste: true },
        { html: "« Capteurs photoélectriques dépoussiérés à la soufflette. »", aide: "C'est l'entretien hebdomadaire." },
        { html: "« Tests de dépose après calibration des capteurs. »", aide: "C'est bien prévu, chaque mois ou trimestre." }
      ], { colonnes: 1, ok: function () { j.bravo("On ne lubrifie jamais la tête d'impression ni les rouleaux en caoutchouc."); j.suite(); } });
    } },
    { nom: "Automate ou laboratoire automatisé ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "automate", [340, 260], 220, A.C.jeu);
      j.titre("Un laboratoire possède un trieur autonome qui range les tubes dans des portoirs ; un technicien porte ensuite les portoirs aux analyseurs. Est-ce un laboratoire automatisé au sens du cours ?");
      j.choix([
        { html: "Oui : il a un automate de tri", aide: "Un automate isolé fait une ou plusieurs étapes ; le laboratoire automatisé relie tout le circuit." },
        { html: "Non : les machines ne sont pas reliées de la réception à la validation", juste: true }
      ], { colonnes: 1, ok: function () { j.bravo("Sans convoyeurs ni logiciel qui relient tout, ce sont des automates isolés."); j.suite(); } });
    } }
  ]
}));
