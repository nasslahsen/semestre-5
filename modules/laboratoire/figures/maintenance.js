/* Figure : une année d'un appareil ; les interventions préventives planifiées, les pannes et leur correction. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-maintenance", {
    largeur: 960, hauteur: 540, titre: "Une panne, de la détection au contrôle de qualité",
    essai: "<strong>Essaie</strong> : avance dans l'intervention. <strong>Observe</strong> : la réparation n'est terminée qu'après le contrôle de qualité, et tout est consigné."
  });
  var g = A.s("g", null, f.svg);
  var E = [
    { t: "Détection", s: "codes d'erreur, alarmes", d: "L'automate signale la panne par un code d'erreur ou une alarme." },
    { t: "Diagnostic", s: "journaux (logs)", d: "On lit les journaux pour trouver la cause." },
    { t: "Intervention", s: "pièces, recalibration", d: "On remplace la pièce en cause et on recalibre." },
    { t: "Vérification", s: "contrôle de qualité", d: "Le contrôle de qualité confirme que l'appareil mesure de nouveau juste." },
    { t: "Traçabilité", s: "historique", d: "L'intervention entre dans l'historique complet de l'appareil." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner(k) {
    A.vider(g);
    E.forEach(function (e, i) {
      var x = 30 + i * 182, on = k === i + 1, vu = k >= i + 1;
      A.boite(g, x, 170, 160, 170, { fond: on ? C.jeu : vu ? C.jeuPale : "#fff", bord: vu ? C.jeu : C.trait, ep: 3, rx: 16, titre: e.t, sous: e.s, taille: 20, coul: on ? "#fff" : vu ? C.encre : C.gris, coulSous: on ? "#fff" : C.doux });
      if (i < E.length - 1) A.fleche(g, [x + 162, 255], [x + 180, 255], { coul: k > i + 1 ? C.jeu : C.trait, ep: 4 });
    });
    A.texte(g, "maintenance corrective", [480, 120], { taille: 24, gras: 800, coul: C.ko });
    if (k >= 4) A.texte(g, "appareil remis en service", [480, 410], { taille: 22, gras: 800, coul: C.ok });
    zone.innerHTML = k ? "<strong>" + E[k - 1].t + "</strong> : " + E[k - 1].d : "Une alarme vient de sonner. Avance pour suivre l'intervention.";
  }
  var e = R.etapes(f.reglages, 5, ["", "détection", "diagnostic", "intervention", "vérification", "traçabilité"], dessiner);
  e.aller(0);
})();
