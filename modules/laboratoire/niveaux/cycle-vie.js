/* Niveau : cycle de vie d'un équipement (chapitre 8) : étapes, principe directeur, ISO 15189, textes de référence. */
NIVEAU(LABO.rejouable({
  id: "cycle-vie",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Les huit étapes", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets dans l'ordre la vie d'un équipement de laboratoire.");
      j.consigne("Touche les étapes dans l'ordre.");
      var N = ["Mise en service", "Sélection", "Décommissionnement", "Qualification", "Besoin (URS)", "Maintenance et métrologie", "Installation", "Vérification des performances"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 20, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 140, y: 14 + i * 66, w: 400, h: 54 }; }),
        ordre: [4, 1, 6, 3, 7, 0, 5, 2],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["Tout part d'un besoin écrit.", "On choisit l'appareil.", "On le pose dans le laboratoire.", "On vérifie qu'il est bien installé.", "On vérifie qu'il mesure juste.", "Il entre en routine.", "Pendant des années, on l'entretient.", "Un jour, on le retire."][k]; },
        fin: function () { j.bravo("Besoin, sélection, installation, qualification, performances, service, maintenance, retrait."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } },
    { nom: "Le principe directeur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "automate", [340, 260], 220, A.C.jeu);
      j.titre("Complète le principe directeur du cours, dans l'ordre.");
      var res = j.zone("", "");
      var z = j.zone("", '<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center"><span class="trou" data-attendu="a"></span>→<span class="trou" data-attendu="i"></span>→<span class="trou" data-attendu="f"></span>→<span class="trou" data-attendu="p"></span>→<span class="trou" data-attendu="m"></span></div>');
      j.jetons({
        reserve: res, trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "p", html: "performant" }, { id: "m", html: "maintenu" }, { id: "a", html: "adapté" }, { id: "f", html: "fonctionnel" }, { id: "i", html: "correctement installé" }],
        aide: "On le choisit d'abord adapté au besoin ; il doit marcher avant de mesurer juste ; on finit par le garder dans cet état.",
        ok: function () { j.bravo("Adapté, correctement installé, fonctionnel, performant, maintenu ; et tracé."); j.suite(); }
      });
    } },
    { nom: "Qualification ou performances ?", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "cle", [340, 260], 200, A.C.jeu);
      j.titre("Après l'installation, on vérifie que l'appareil est correctement installé. Comment s'appelle cette étape ?");
      j.choix([
        { html: "La qualification", juste: true },
        { html: "La vérification des performances", aide: "Elle vient après : on vérifie alors qu'il mesure juste." },
        { html: "La mise en service", aide: "Elle ne vient qu'une fois l'appareil qualifié et ses performances vérifiées." }
      ], { colonnes: 1, ok: function () { j.bravo("La qualification, puis la vérification des performances."); j.suite(); } });
    } },
    { nom: "Ce que demande l'ISO 15189", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 260], 200, A.C.jeu);
      j.titre("Côté biomédical, l'ISO 15189 demande plusieurs choses. Laquelle n'en fait pas partie ?");
      j.choix([
        { html: "L'historique complet des interventions", aide: "Il en fait partie." },
        { html: "La métrologie et l'étalonnage", aide: "Ils en font partie." },
        { html: "Le choix systématique du fournisseur le moins cher", juste: true },
        { html: "La maintenance préventive et corrective", aide: "Elle en fait partie." }
      ], { colonnes: 1, ok: function () { j.bravo("La norme parle de qualité et de compétence, pas de prix."); j.suite(); } });
    } },
    { nom: "Trois textes", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [200, 260], 140, A.C.jeu); A.icone(n.g, "document", [340, 260], 140, A.C.acc); A.icone(n.g, "document", [480, 260], 140, A.C.v);
      j.titre("ISO 15189, GBEA, réglementation marocaine : que retient le cours de leur valeur juridique ?");
      j.choix([
        { html: "Ils sont équivalents : respecter l'un suffit", aide: "Le cours insiste au contraire sur une différence." },
        { html: "Une norme, un référentiel de bonnes pratiques et une obligation réglementaire ne sont pas juridiquement équivalents", juste: true },
        { html: "Seule la norme ISO compte", aide: "La réglementation fixe des exigences légales." }
      ], { colonnes: 1, ok: function () { j.bravo("Pas juridiquement équivalents."); j.suite(); } });
    } }
  ]
}));
