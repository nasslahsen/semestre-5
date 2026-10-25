/* Révision du chapitre 8 : cycle de vie, maintenance, métrologie, infrastructure, criticité, dans des situations nouvelles. */
NIVEAU(LABO.rejouable({
  id: "revision-equipements",
  init: function (fig) {
    var A = LABO, g = A.s("g", null, fig.svg);
    return { g: g, pl: { P: function (v) { return v; } } };
  },
  etapes: [
    { nom: "Un nouveau congélateur", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "frigo", [340, 260], 220, A.C.froid);
      j.titre("Un congélateur −80 °C vient d'être installé. Avant d'y mettre des échantillons, quelle étape vient juste après l'installation ?");
      j.choix([
        { html: "La qualification : vérifier qu'il est correctement installé", juste: true },
        { html: "La mise en service immédiate", aide: "Il faut d'abord vérifier l'installation, puis les performances." },
        { html: "Le décommissionnement de l'ancien", aide: "Ce n'est pas l'étape suivante dans la vie du nouvel appareil." }
      ], { colonnes: 1, ok: function () { j.bravo("Qualification, puis vérification des performances, puis mise en service."); j.suite(); } });
    } },
    { nom: "Une sonde de température", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "thermo", [340, 260], 200, A.C.jeu);
      j.titre("La sonde de ce congélateur affiche −80 °C. Comment être sûr qu'elle dit vrai ?");
      j.choix([
        { html: "La comparer à une référence : étalonnage, vérification, traçabilité, enregistrement", juste: true },
        { html: "Se fier à l'affichage, puisqu'il est stable", aide: "Fonctionnement n'est pas performance métrologique." }
      ], { colonnes: 1, ok: function () { j.bravo("La température est une grandeur critique : on l'étalonne et on trace."); j.suite(); } });
    } },
    { nom: "Un contrôle trop haut", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "document", [340, 260], 200, A.C.jeu);
      j.titre("Un contrôle de moyenne 140 et d'écart-type 2 donne 147. À combien d'écarts-types de la moyenne ?");
      j.nombre({ avant: "z =", cases: [{ attendu: 3.5, tol: 0.005 }],
        aide: function () { return "z = (valeur − moyenne) / écart-type."; },
        ok: function () { j.bravo("z = 3,5 : au-delà de 3s, la série est rejetée."); j.suite(); } });
    } },
    { nom: "Une coupure", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "eclair", [340, 260], 200, A.C.ko);
      j.titre("Une coupure de courant de quelques secondes éteint l'analyseur en pleine série. Quel élément de l'infrastructure aurait évité l'arrêt ?");
      j.choix([
        { html: "Un onduleur (UPS)", juste: true },
        { html: "Le traitement de l'air (HVAC)", aide: "Il règle la température et l'humidité, pas l'alimentation." },
        { html: "La détection incendie", aide: "Elle n'alimente rien." }
      ], { colonnes: 1, ok: function () { j.bravo("L'onduleur tient le temps de la coupure ; le groupe électrogène prend le relais si elle dure."); j.suite(); } });
    } },
    { nom: "Réparé, et après ?", jouer: function (j, n) {
      var A = LABO, C = A.C;
      j.titre("Remets dans l'ordre ce qu'on fait quand l'analyseur de la réanimation tombe en panne.");
      j.consigne("Touche les étapes dans l'ordre.");
      var N = ["Contrôle de qualité avant de reprendre", "Basculer sur le plan B (secours)", "Réparer : pièce, recalibration", "Détecter la panne (alarme)"];
      var t = A.trace({
        g: n.g, coul: C.jeu, taille: 21, fleches: false,
        noeuds: N.map(function (x, i) { return { t: x, x: 90, y: 50 + i * 130, w: 500, h: 100 }; }),
        ordre: [3, 1, 2, 0],
        erreur: function (m) { j.erreur(m); },
        aide: function (i, att, k) { return ["D'abord, savoir qu'il y a un problème.", "Les patients de réanimation ne peuvent pas attendre.", "Puis on répare.", "On ne reprend qu'après avoir prouvé qu'il mesure juste."][k]; },
        fin: function () { j.bravo("Détection, plan B, réparation, contrôle de qualité ; et l'incident est tracé."); j.suite(); }
      });
      j.reponse(function () { t.resoudre(); });
    } }
  ]
}));
