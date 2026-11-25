/* Niveau du TD 1 (CHU Atlas), atelier 1 : AMDEC du circuit de chimiothérapie.
   Criticité C = G × O × D, seuil 100, barrières et preuves. Cotations du modèle de l'enseignant (fiche de synthèse remplie). */
NIVEAU(SIS.rejouable({
  id: "td1-amdec",
  init: function (fig) {
    var A = SIS, g = A.s("g", null, fig.svg);
    var n = { g: g };
    n.cinq = function (noms, place) { return noms.map(function (e, i) { var c = place[i]; return { t: e[0], sous: e[1], x: c === 4 ? 185 : 20 + (c % 2) * 330, y: 40 + Math.floor(c / 2) * 180, w: 310, h: 110 }; }); };
    n.notes = function (vals, sous) {
      A.vider(g);
      ["G", "O", "D"].forEach(function (t, k) {
        A.boite(g, 30 + k * 220, 120, 180, 180, { titre: t + " = " + vals[k], sous: sous[k], taille: 34, tailleSous: 16, fond: "#fff" });
      });
      A.texte(g, "cotation du modèle de l'enseignant", [340, 360], { taille: 15, coul: A.C.doux, gras: 500 });
    };
    return n;
  },
  etapes: [
    { nom: "La ligne de l'identité", jouer: function (j, n) {
      n.notes([10, 3, 5], ["mauvais patient : le plus grave", "identités provisoires", "un doublon ne se voit pas seul"]);
      j.titre("Ligne 2 : une identité provisoire n'est jamais rapprochée du dossier. Calcule sa criticité.");
      j.nombre({ cases: [{ attendu: 150 }], avant: "C = G \\times O \\times D =", aide: function () { return "Multiplie les trois notes : 10 × 3, puis × 5."; }, ok: function () {
        j.bravo("\\(C = 10 \\times 3 \\times 5 = 150\\).");
        j.expliquer("<p>La <b>criticité</b> combine trois notes de 1 à 10 : gravité, occurrence et détectabilité. Une ligne est prioritaire si \\(C \\geq 100\\) (seuil fixé pour l'exercice). Dans le modèle, l'identité est la ligne la plus critique.</p>");
        j.suite();
      } });
    } },
    { nom: "Une gravité plus faible", jouer: function (j, n) {
      n.notes([6, 4, 5], ["chaîne de traçabilité rompue", "", ""]);
      j.titre("Ligne 6 : une administration n'est pas tracée dans le dossier. Le modèle lui donne G = 6, bien moins que l'identité (10). Pourquoi ?");
      j.choix([
        { html: "L'effet est une chaîne de traçabilité rompue : le patient a bien reçu la bonne poche", juste: true },
        { html: "Parce que l'erreur est rare", aide: "La rareté, c'est l'occurrence O. G mesure la gravité de l'effet." },
        { html: "Parce qu'on la détecte toujours", aide: "La détection, c'est D. G mesure la gravité de l'effet." }
      ], { colonnes: 1, ok: function () {
        j.bravo("G mesure l'effet : ici, la trace manque, le soin a été fait.");
        j.expliquer("<p>Sur l'échelle du TD, G = 1 : aucune conséquence, G = 10 : décès ou atteinte grave. Avec O = 4 et D = 5, la ligne atteint quand même \\(6 \\times 4 \\times 5 = 120\\).</p>");
        j.suite();
      } });
    } },
    { nom: "Classer les lignes", jouer: function (j, n) {
      var A = SIS, C = A.C;
      j.titre("Cinq lignes dépassent 100 dans le modèle. Touche-les de la plus critique à la moins critique.");
      var nd = n.cinq([["Identité provisoire", "C = 150"], ["Étiquette erronée", "C = 128"], ["Administration non tracée", "C = 120"], ["Prescription mal transcrite", "C = 108"], ["Contamination du personnel", "C = 105"]], [3, 0, 4, 2, 1]);
      var tr = A.trace({ g: n.g, noeuds: nd, ordre: [0, 1, 2, 3, 4], coul: C.ko, taille: 19, erreur: j.erreur,
        aide: function (i, att, k) { return "Cherche la plus grande criticité parmi celles qui restent."; },
        fin: function () { j.bravo("150, 128, 120, 108, 105."); j.suite(); } });
      j.reponse(function () { tr.resoudre(); });
    } },
    { nom: "Trois, pas cinq", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["document", "pilule"], titre: "Cinq lignes au-dessus de 100", sous: "l'énoncé demande d'en retenir trois" });
      j.titre("On retient les trois plus critiques. Que fait le modèle des deux autres (prescription 108, contamination 105) ?");
      j.choix([
        { html: "On les oublie : elles ne sont pas dans les trois", aide: "Elles dépassent quand même le seuil de 100." },
        { html: "On les suit, et on les traite dans les exigences de sécurité", juste: true },
        { html: "On recote pour qu'elles passent sous 100", aide: "On ne change pas une cotation pour arranger le classement." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Suivies, et traitées dans les exigences de sécurité.");
        j.suite();
      } });
    } },
    { nom: "Une barrière par risque", jouer: function (j, n) {
      var A = SIS;
      j.titre("Relie chaque risque retenu à sa barrière dans le modèle.");
      var p = A.paires({
        g: n.g, xg: 20, wg: 250, xd: 320, wd: 340, y0: 60, pas: 170, h: 140, taille: 19, tailleD: 16,
        gauche: ["Identité provisoire", "Étiquette erronée", "Administration non tracée"],
        droite: ["Lecture du bracelet et de la poche au lit", "Bracelet, double vérification d'identité avant préparation, rapprochement sous 48 h", "Étiquettes de secours pré-imprimées, contrôle à deux, imprimante de secours"],
        bon: [1, 2, 0],
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["Le risque naît à l'identité : vérifie-la, puis rapproche vite.", "Le problème vient de la panne d'imprimante : prévois le secours.", "La trace manque au lit : lis le bracelet et la poche au moment du soin."][i]; },
        fin: function () { j.bravo("Chaque barrière agit sur la cause, avant que l'erreur arrive au patient."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Une preuve, pas une promesse", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["document", "serveur"], titre: "Barrière sur l'identité", sous: "que demander au fournisseur ?" });
      j.titre("Pour la barrière sur l'identité, quelle preuve le modèle exige-t-il du fournisseur ?");
      j.choix([
        { html: "Des tests avec identités fictives avant la signature", juste: true },
        { html: "Une lettre du fournisseur qui affirme que son logiciel gère les identités provisoires", aide: "Une affirmation n'est pas une preuve : on ne peut pas la vérifier." },
        { html: "La liste des hôpitaux clients du fournisseur", aide: "Ces hôpitaux n'ont peut-être pas le même DPI. Ça ne démontre rien sur ton système." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Une preuve se vérifie : un test, avant de signer.");
        j.expliquer("<p>Les deux autres preuves du modèle : <b>mode dégradé testé et stock de secours</b> pour l'étiquette, <b>scénario démontré à la recette</b> pour l'administration.</p>");
        j.suite();
      } });
    } }
  ]
}));
