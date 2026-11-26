/* Bio-impédance, questions 23 à 25 : condensateurs de liaison, pas de continu dans le patient, noms des commandes. */
NIVEAU({
  id: "bioz-max",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "src", x: 40, y: 240, w: 180, h: 100, t: "Source\nMAX30009" },
      { id: "c1", x: 290, y: 120, w: 120, h: 80, t: "47 nF" },
      { id: "c2", x: 290, y: 380, w: 120, h: 80, t: "47 nF" },
      { id: "pied", x: 480, y: 240, w: 160, h: 100, t: "Électrodes\npied" }
    ];
    var L = [["src", "c1"], ["src", "c2"], ["c1", "pied"], ["c2", "pied"]];
    n.dessin = function () { EMB.scene(g, B, L, n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Rôle", jouer: function (j, n) {
      n.act = { c1: true, c2: true }; n.dessin();
      j.titre("Question 25 : à quoi servent les deux condensateurs de 47 nF en série vers les électrodes ?");
      j.choix([
        { html: "Bloquer toute composante continue, laisser passer l'alternatif", juste: true },
        { html: "Stocker de l'énergie pour la source", aide: "Ils sont en série sur le chemin du courant : que bloque un condensateur en série ?" },
        { html: "Filtrer les hautes fréquences", aide: "En série, un condensateur laisse passer les hautes fréquences et bloque les basses, jusqu'au continu." }
      ], { colonnes: 1, ok: function () { j.bravo("Condensateurs de liaison : pas de courant continu dans le patient."); j.suite(); } });
    } },
    { nom: "Impédance", jouer: function (j, n) {
      j.titre("Que vaut l'impédance d'un condensateur de 47 nF à 100 kHz ?");
      j.nombre({ avant: "|Z_C| =", apres: "\\Omega", cases: [{ attendu: 33.9, tol: 0.3 }], ligne: true,
        aide: function () { return "|ZC| = 1 / (2π f C)."; },
        ok: function () { j.bravo("1 / (2π × 10⁵ × 47 × 10⁻⁹) ≈ 33,9 Ω : négligeable face au tissu."); j.suite(); } });
    } },
    { nom: "Pourquoi", jouer: function (j, n) {
      n.act = { pied: true }; n.dessin();
      j.titre("Pourquoi ne veut-on aucun courant continu dans le pied ?");
      j.choix([
        { html: "Il ne transporte pas d'information", aide: "Ce n'est pas la raison principale : pense à ce qu'il fait sous les électrodes." },
        { html: "Il provoque une électrolyse sous les électrodes (brûlures) et les polarise", juste: true },
        { html: "Il fait chauffer le circuit", aide: "Pense au patient et aux électrodes, pas au circuit." }
      ], { colonnes: 1, ok: function () { j.bravo("Sécurité du patient et mesure propre."); j.suite(); } });
    } },
    { nom: "DC_RESTORE", jouer: function (j, n) {
      n.act = { src: true }; n.dessin();
      j.titre("Question 24 : que suggère le nom <code>BIOZ_DC_RESTORE</code> ?");
      j.choix([
        { html: "Ramener le niveau continu du signal à sa valeur de repos", juste: true },
        { html: "Couper l'alimentation de la partie bio-impédance", aide: "Découpe le nom : DC (continu) et RESTORE (restaurer)." },
        { html: "Augmenter le courant injecté", aide: "Découpe le nom : DC (continu) et RESTORE (restaurer)." }
      ], { colonnes: 1, ok: function () { j.bravo("Il efface la charge continue accumulée, pour garder un courant centré sur zéro."); j.suite(); } });
    } }
  ]
});
