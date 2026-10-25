/* Défi du chapitre 8 : un parc d'équipements à gérer, sans aide avant le premier essai. */
NIVEAU(LABO.rejouable({
  id: "boss-equipements",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Le cycle complet", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "automate", [340, 260], 220, A.C.jeu);
      j.titre("Complète le principe directeur, dans l'ordre.");
      var res = j.zone("", "");
      var z = j.zone("", '<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center"><span class="trou" data-attendu="a"></span>→<span class="trou" data-attendu="i"></span>→<span class="trou" data-attendu="f"></span>→<span class="trou" data-attendu="p"></span>→<span class="trou" data-attendu="m"></span></div>');
      j.jetons({
        reserve: res, trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "f", html: "fonctionnel" }, { id: "a", html: "adapté" }, { id: "m", html: "maintenu" }, { id: "i", html: "correctement installé" }, { id: "p", html: "performant" }],
        aide: "Du choix de l'appareil à son entretien.",
        ok: function () { j.bravo("Adapté, installé, fonctionnel, performant, maintenu."); j.suite(); }
      });
    } },
    { nom: "Deux contrôles", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 260], 200, A.C.jeu);
      j.titre("Moyenne 6,2, écart-type 0,3. Les contrôles du jour donnent 5,6 puis 7,25. Calcule les deux écarts.");
      j.nombre({ avant: "z_1,\\ z_2 :", cases: [{ attendu: -2, tol: 0.005 }, { attendu: 3.5, tol: 0.005 }], ligne: true,
        aide: function () { return "z = (valeur − moyenne) / écart-type ; attention au signe."; },
        ok: function () { j.bravo("−2 puis 3,5 : le second dépasse 3s, la série est rejetée."); j.suite(); } });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 260], 200, A.C.jeu);
      j.titre("Le responsable qualité relit une procédure. Une phrase est fausse : laquelle ?");
      j.choix([
        { html: "« Toute intervention est enregistrée dans l'historique de l'appareil. »", aide: "C'est ce que demande l'ISO 15189." },
        { html: "« Après une réparation, l'appareil reprend les patients dès qu'il s'allume. »", juste: true },
        { html: "« Les analyseurs délocalisés restent sous la responsabilité qualité du laboratoire. »", aide: "C'est exactement la formule du cours." },
        { html: "« Les gants et lunettes sont la dernière barrière de sécurité. »", aide: "C'est le principe de l'EPI." }
      ], { colonnes: 1, ok: function () { j.bravo("Fonctionnement n'est pas performance : contrôle de qualité d'abord."); j.suite(); } });
    } },
    { nom: "Qui passe en premier ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "danger", [340, 260], 200, A.C.ko);
      j.titre("Trois pannes le même matin, un seul technicien. Laquelle traiter en premier ?");
      j.choix([
        { html: "L'agitateur chauffant de la salle de préparation", aide: "Impact clinique faible : il peut attendre." },
        { html: "L'analyseur de gaz du sang qui sert la réanimation, sans appareil de secours", juste: true },
        { html: "Le microscope de formation des stagiaires", aide: "Pas d'impact direct sur la prise en charge des patients." }
      ], { colonnes: 1, ok: function () { j.bravo("Impact clinique fort, pas de secours : priorité absolue."); j.suite(); } });
    } }
  ]
}));
