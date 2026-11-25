/* Niveau : le modèle de Purdue (séance 3, diapositives 20 et 21). */
NIVEAU(SIS.rejouable({
  id: "purdue",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Empiler les niveaux", jouer: function (j, n) {
      j.titre("Touche les niveaux du modèle de Purdue du plus haut (5) au plus bas (0).");
      SIS.ordonner(j, n.g, ["Supervisory control (SCADA, IHM)", "Enterprise / corporate IT", "Physical process (capteurs)", "DMZ industrielle (3.5)", "Basic control (PLC, RTU)", "Enterprise network", "Manufacturing operations"], [1, 5, 3, 6, 0, 4, 2], {
        aide: function (i, a, k) { return ["Tout en haut : ERP, annuaire, applications d'entreprise.", "Puis le réseau d'entreprise : web, courriel, DNS.", "Puis la frontière : la DMZ industrielle.", "Puis les opérations : poste, historian.", "Puis la supervision.", "Puis le contrôle de base : automates.", "Tout en bas : le processus physique."][k]; },
        bravo: "5, 4, 3.5, 3, 2, 1, 0." });
    } },
    { nom: "IT ou OT ?", jouer: function (j, n) {
      j.titre("Range chaque équipement : réseau IT ou réseau OT ?");
      var c = [{ t: "Serveur de courriel", bac: 0 }, { t: "Automate (PLC)", bac: 1 }, { t: "ERP", bac: 0 }, { t: "SCADA", bac: 1 }, { t: "Capteurs, actionneurs", bac: 1 }, { t: "Serveur DNS", bac: 0 }];
      SIS.ranger(j, n.g, c, ["IT (niveaux 4, 5)", "OT (niveaux 0 à 3)"], { aide: function (i) { return c[i].bac ? "Il pilote ou mesure un processus physique." : "Informatique d'entreprise."; }, bravo: "IT : entreprise. OT : contrôle des opérations." });
    } },
    { nom: "Le but", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["document", "engrenage"], titre: "Un courriel piégé", sous: "et l'automate du traitement d'air" });
      j.titre("Quel est le but principal du modèle de Purdue ?");
      j.choix([{ html: "Accélérer la production", aide: "C'est un modèle de sécurité réseau." }, { html: "Mettre un antivirus sur chaque automate", aide: "Les automates n'en ont souvent pas : on les isole." }, { html: "La segmentation : un virus de l'IT ne doit pas atteindre l'OT", juste: true }], { colonnes: 1, ok: function () { j.bravo("Isoler l'OT, des frontières strictes, et les données qui remontent quand même."); j.suite(); } });
    } },
    { nom: "Appliquer", jouer: function (j, n) {
      j.titre("Relie chaque mesure du cours à ce qu'elle apporte.");
      SIS.associer(j, n.g, ["Pare-feu industriels à chaque frontière", "IDMZ stricte", "DPI (Deep Packet Inspection)", "Accès distants sécurisés"], ["Inspecter le contenu des protocoles industriels", "Contrôler la télémaintenance", "Filtrer le passage d'un niveau à l'autre", "Zone tampon entre IT et OT"], [2, 3, 0, 1], {
        aide: function (i) { return ["Une barrière à chaque passage de niveau.", "Le niveau 3.5.", "Regarder dans les paquets.", "Les fabricants qui se connectent de l'extérieur."][i]; },
        bravo: "Pare-feu, IDMZ, DPI, télémaintenance." });
    } }
  ]
}));
