/* Niveau : circuit de l'échantillon en sept étapes (1.4), transfert vers la salle d'analyse et règles d'or. */
NIVEAU(LABO.rejouable({
  id: "circuit",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Les sept étapes", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets le circuit de l'échantillon dans l'ordre, du patient au résultat.");
      j.consigne("Touche les sept étapes dans l'ordre.");
      var N = ["Analyse", "Réception et tri", "Prescription", "Validation et rendu", "Transport", "Préparation", "Prélèvement"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 19,
        fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 90, y: 18 + i * 82, w: 500, h: 64 }; }),
        ordre: [2, 6, 4, 1, 5, 0, 3],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) {
          return ["Tout commence par une demande d'examen.", "Il faut d'abord un échantillon.", "L'échantillon doit arriver au laboratoire.", "Au laboratoire, on vérifie et on enregistre avant tout.", "Avant la mesure, on prépare l'échantillon.", "Vient la mesure.", "Il reste à valider et à communiquer."][k];
        },
        fin: function () {
          j.bravo("Prescription, prélèvement, transport, réception et tri, préparation, analyse, validation et rendu.");
          j.expliquer("<p>Le circuit est un <b>processus linéaire</b> qui va du patient au résultat. Chaque étape reçoit l'échantillon de la précédente.</p>");
          j.suite();
        }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Quelle étape ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "reception", [340, 280], 220, A.C.jeu);
      j.titre("Vérifier la conformité du tube, l'enregistrer, l'orienter vers le bon secteur : c'est l'étape…");
      j.choix([
        { html: "Prélèvement", aide: "Au prélèvement, on identifie et on étiquette, sur le patient." },
        { html: "Réception et tri", juste: true },
        { html: "Préparation", aide: "La préparation, c'est centrifuger, aliquoter. La vérification vient avant." },
        { html: "Validation et rendu", aide: "La validation porte sur le résultat, à la fin." }
      ], { colonnes: 2, ok: function () { j.bravo("Réception et tri."); j.suite(); } });
    } },
    { nom: "Décomplémenter", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "centrifugeuse", [340, 280], 220, A.C.jeu);
      j.titre("Dans le cours, la décomplémentation « si nécessaire » fait partie de quelle étape ?");
      j.choix([
        { html: "Transport", aide: "Pendant le transport, on achemine, on ne traite pas l'échantillon." },
        { html: "Préparation", juste: true },
        { html: "Analyse", aide: "L'analyse est le passage sur l'automate. Ce qui est fait avant pour rendre l'échantillon prêt, c'est…" }
      ], { colonnes: 1, ok: function () {
        j.bravo("Préparation : centrifugation, aliquotage, décomplémentation si nécessaire.");
        j.suite();
      } });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.boite(n.g, 120, 200, 440, 160, { fond: C.fond, bord: C.encre, rx: 16 });
      [0, 1, 2].forEach(function (k) { A.s("g", { transform: "rotate(90 " + (230 + k * 110) + " 280)" }, n.g).appendChild(A.tube(A.s("g"), 215 + k * 110, 230, { bouchon: "sec", w: 30, h: 110, couches: [{ h: 0.6, coul: C.sang }] })); });
      A.texte(n.g, "sachet de transport", [340, 395], { taille: 18, coul: C.doux });
      j.titre("« J'ai couché les tubes dans le sachet pour qu'ils ne tombent pas, et je les envoie au laboratoire. » Quelle règle d'or n'est pas respectée ?");
      j.choix([
        { html: "La position verticale des tubes", juste: true },
        { html: "Le respect des délais", aide: "Rien n'indique un retard. Regarde comment les tubes sont posés." },
        { html: "L'intégrité de la chaîne", aide: "Le sachet est fermé et les tubes identifiés. Le problème est ailleurs." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Les tubes voyagent debout.");
        j.expliquer("<p>Position verticale : pour éviter le contact du sérum ou du plasma avec le bouchon et la formation de microcaillots. Les deux autres règles d'or : un délai le plus court possible (souvent moins de 2 heures pour les examens standards) et l'intégrité de la chaîne (triple emballage ou sachet étanche individuel, traçabilité par codes-barres).</p>");
        j.suite();
      } });
    } },
    { nom: "Trois transports", jouer: function (j, n) {
      var A = LABO; A.vider(n.g);
      ["personne", "capsule", "automate"].forEach(function (ic, k) { A.icone(n.g, ic, [130 + k * 210, 280], 120, A.C.jeu); });
      j.titre("Range chaque description sous le bon type de transport.");
      var res = j.zone("", "");
      var L = [["Pédestre", "p"], ["Pneumatique", "n"], ["Tapis ou guichet de tri", "t"]];
      var z = j.zone("", '<div style="display:grid;grid-template-columns:auto 1fr;gap:8px;align-items:center">' + L.map(function (x) { return "<b>" + x[0] + '</b><span class="trou" data-attendu="' + x[1] + '"></span>'; }).join("") + "</div>");
      j.jetons({
        reserve: res, trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "n", html: "cartouche dans des tuyaux à air comprimé" }, { id: "t", html: "convoyage direct vers les automates" }, { id: "p", html: "portoirs portés par un agent de liaison" }],
        aide: "Qui porte le tube ? Un humain, l'air, ou un convoyeur ?",
        ok: function () { j.bravo("Pédestre, pneumatique, tapis roulant ou guichet de tri automatisé."); j.suite(); }
      });
    } }
  ]
}));
