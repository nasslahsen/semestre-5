/* Niveau du TD 1 (CHU Atlas), atelier 1 : AMDEC du circuit de chimiothérapie.
   Criticité C = G × O × D, seuil 100, barrières et preuves. Cotations proposées (exemple ajouté). */
NIVEAU(SIS.rejouable({
  id: "td1-amdec",
  init: function (fig) {
    var A = SIS, g = A.s("g", null, fig.svg);
    var n = { g: g };
    n.LIGNES = [
      ["1", "Dose ou protocole mal transcrit", 9, 4, 4],
      ["2", "Identité provisoire non rapprochée", 9, 5, 6],
      ["3", "Erreur de produit à la préparation", 9, 3, 3],
      ["4", "Étiquette erronée ou manuscrite", 10, 3, 7],
      ["5", "Programmation erronée de la pompe", 9, 4, 5],
      ["6", "Administration non tracée", 4, 6, 3],
      ["7", "Contamination du personnel", 7, 2, 6]
    ];
    n.notes = function (vals, sous) {
      A.vider(g);
      ["G", "O", "D"].forEach(function (t, k) {
        A.boite(g, 30 + k * 220, 120, 180, 180, { titre: t + " = " + vals[k], sous: sous[k], taille: 34, tailleSous: 16, fond: "#fff" });
      });
      A.texte(g, "cotation proposée : exemple ajouté", [340, 360], { taille: 15, coul: A.C.doux, gras: 500 });
    };
    return n;
  },
  etapes: [
    { nom: "La ligne de l'identité", jouer: function (j, n) {
      n.notes([9, 5, 6], ["erreur de patient : grave", "identités provisoires courantes à l'arrivée", "un doublon ne se voit pas tout seul"]);
      j.titre("Ligne 2 : un patient arrive avec une identité provisoire, jamais rapprochée de son dossier. Calcule sa criticité.");
      j.nombre({ cases: [{ attendu: 270 }], avant: "C = G \\times O \\times D =", aide: function () { return "Multiplie les trois notes : 9 × 5, puis × 6."; }, ok: function () {
        j.bravo("\\(C = 9 \\times 5 \\times 6 = 270\\).");
        j.expliquer("<p>La <b>criticité</b> combine trois notes de 1 à 10 : gravité, occurrence et détectabilité. Une ligne est prioritaire si \\(C \\geq 100\\) (seuil fixé pour l'exercice).</p>");
        j.suite();
      } });
    } },
    { nom: "Une erreur invisible", jouer: function (j, n) {
      n.notes([10, 3, "?"], ["poche au mauvais patient", "panne d'imprimante rare", "à toi de juger"]);
      j.titre("Ligne 4 : l'imprimante est en panne, l'étiquette de la poche est écrite à la main. Quelle note de détectabilité ?");
      j.choix([
        { html: "D faible (2) : l'erreur est rare, donc on la voit", aide: "La rareté, c'est l'occurrence. D répond à une autre question : verrait-on l'erreur avant qu'elle touche le patient ?" },
        { html: "D élevé (7) : une étiquette manuscrite fausse ressemble à une vraie", juste: true },
        { html: "D faible (2) : la poche est contrôlée à la pharmacie", aide: "L'erreur peut naître après ce contrôle, au moment où on écrit l'étiquette. Rien ne la repère ensuite." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Plus une erreur passe inaperçue, plus D est haut.");
        j.expliquer("<p>Sur l'échelle du TD, D = 1 veut dire détection quasi certaine avant l'effet, D = 10 non détectable. C'est l'inverse de l'intuition : une bonne détection fait baisser la criticité.</p>");
        j.suite();
      } });
    } },
    { nom: "Au-dessus du seuil", jouer: function (j, n) {
      var A = SIS, C = A.C, H = 62, Y0 = 40;
      var zones = n.LIGNES.map(function (l, i) { return { x: 15, y: Y0 + H * (i + 1), w: 650, h: H, bon: l[2] * l[3] * l[4] >= 100 }; });
      j.titre("Voici les sept lignes cotées. Touche toutes celles dont la criticité atteint 100.");
      var r = A.reperer({ g: n.g, zones: zones,
        dessiner: function (g2, e) {
          var lignes = [["N°", "Mode de défaillance", "G", "O", "D"]].concat(n.LIGNES.map(function (l) { return [l[0], l[1], String(l[2]), String(l[3]), String(l[4])]; }));
          A.tableau(g2, 15, Y0, [60, 380, 70, 70, 70], H, lignes, { taille: 17, style: function (i) { if (i === 0) return null; return e.trouve[i - 1] ? { fond: C.okPale } : e.faux === i - 1 ? { fond: C.koPale } : null; } });
        },
        erreur: j.erreur,
        aide: function (i) { var l = n.LIGNES[i]; return "Ligne " + l[0] + " : " + l[2] + " × " + l[3] + " × " + l[4] + " = " + (l[2] * l[3] * l[4]) + ", sous le seuil."; },
        fin: function () {
          j.bravo("Quatre lignes : 2 (270), 4 (210), 5 (180) et 1 (144).");
          j.suite();
        } });
      j.reponse(function () { r.resoudre(); });
    } },
    { nom: "Trois, pas quatre", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["document", "pilule"], titre: "Quatre lignes au-dessus de 100", sous: "l'énoncé demande d'en retenir trois" });
      j.titre("Il faut en retenir trois. Laquelle laisses-tu, et avec quelle justification ?");
      j.choix([
        { html: "L'identité (270) : c'est un problème du SIH, pas du circuit", aide: "L'identité est la ligne la plus critique, et le lien avec le SIH fait partie du projet." },
        { html: "La pompe (180) : c'est le travail des infirmiers", aide: "Une barrière technique (scan, limites de débit) peut être exigée du fournisseur. La pompe est plus critique que la prescription." },
        { html: "La prescription (144) : chaque ordonnance est déjà validée par le pharmacien", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("On garde les trois plus critiques, et on dit ce qui couvre déjà la quatrième.");
        j.suite();
      } });
    } },
    { nom: "Une barrière par risque", jouer: function (j, n) {
      var A = SIS;
      j.titre("Relie chaque risque retenu à la barrière qui l'arrête avant le patient.");
      var p = A.paires({
        g: n.g, xg: 20, wg: 250, xd: 320, wd: 340, y0: 60, pas: 170, h: 140, taille: 19, tailleD: 16,
        gauche: ["Identité provisoire", "Étiquette manuscrite", "Programmation de la pompe"],
        droite: ["Scan patient-poche-pompe au chevet, limites de débit et de volume", "Prescription bloquée tant que l'identité n'est pas rapprochée", "Étiquette produite par le système, imprimante de secours"],
        bon: [1, 2, 0],
        erreur: j.erreur, info: j.info,
        aide: function (i) { return ["Le risque naît avant la prescription : bloque-la tant que le dossier est flou.", "Le problème est l'écriture à la main : supprime-la.", "L'erreur est une saisie sur la pompe : fais vérifier par un scan et des limites."][i]; },
        fin: function () { j.bravo("Chaque barrière agit sur la cause, avant que l'erreur arrive au patient."); j.suite(); }
      });
      j.reponse(function () { p.resoudre(); });
    } },
    { nom: "Une preuve, pas une promesse", jouer: function (j, n) {
      var A = SIS;
      A.vider(n.g);
      A.scene(n.g, { icones: ["document", "serveur"], titre: "Interface identité-DPI", sous: "que demander au fournisseur ?" });
      j.titre("Pour la barrière sur l'identité, quelle preuve exiges-tu du fournisseur ?");
      j.choix([
        { html: "Un rapport de tests sur le DPI du CHU avec des identités fictives (doublon, fusion), avant signature", juste: true },
        { html: "Une lettre du fournisseur qui affirme que son interface gère les identités provisoires", aide: "Une affirmation n'est pas une preuve : on ne peut pas la vérifier." },
        { html: "La liste des hôpitaux clients du fournisseur", aide: "Ces hôpitaux n'ont peut-être pas le même DPI. Ça ne démontre rien sur ton interface." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Une preuve se vérifie : un test, sur ton système, avant de signer.");
        j.expliquer("<p>Règle de travail du TD : on raisonne en <b>exigences</b> (ce que le système doit garantir) et en <b>preuves</b> (comment le fournisseur le démontre).</p>");
        j.suite();
      } });
    } }
  ]
}));
