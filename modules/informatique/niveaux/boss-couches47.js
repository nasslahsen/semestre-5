/* Boss du chapitre 15 : la borne du service de cardiologie. */
NIVEAU(SIS.rejouable({
  id: "boss-couches47",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Le diagnostic", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "personne"], titre: "Borne « CARDIO-PLUS » en WEP", sous: "branchée par un agent sur une prise du service" });
      j.titre("Un agent de cardiologie a branché sa propre borne Wi-Fi, en WEP, sur une prise du service « pour améliorer le signal ». Qu'est-ce, du point de vue de la sécurité ?");
      j.choix([{ html: "Un evil twin malveillant", aide: "Elle n'imite pas le Wi-Fi officiel, et l'agent n'a pas voulu nuire." }, { html: "Rien de grave, l'agent est de bonne foi", aide: "L'intention ne change pas la porte ouverte." }, { html: "Un rogue AP : une porte dérobée Wi-Fi vers le réseau filaire, même sans intention malveillante", juste: true }], { colonnes: 1, ok: function () { j.bravo("Rogue AP, et en WEP : cassé en quelques minutes."); j.suite(); } });
    } },
    { nom: "Ce que l'intrus enchaîne", jouer: function (j, n) {
      j.titre("Un intrus sur le parking exploite cette borne. Remets ses actions dans l'ordre.");
      SIS.ordonner(j, n.g, ["Il scanne les ports du réseau interne", "Il casse la clé WEP", "Il exploite un SMB non corrigé (445)", "Il est sur le segment de la cardiologie"], [1, 3, 0, 2], {
        aide: function (i, a, k) { return ["D'abord entrer dans le Wi-Fi.", "Il se retrouve alors sur le réseau filaire du service.", "Il cherche les services ouverts.", "Il exploite la faille trouvée."][k]; },
        bravo: "Wi-Fi cassé, présence sur le segment, scan, exploitation." });
    } },
    { nom: "Les mesures", jouer: function (j, n) {
      j.titre("Range chaque mesure : efficace contre ce scénario, ou hors sujet ?");
      var c = [{ t: "Désactiver les prises réseau inutilisées", bac: 0 }, { t: "Interdire les bornes non autorisées", bac: 0 }, { t: "Installer le correctif SMB", bac: 0 }, { t: "Changer de résolveur DNS", bac: 1 }, { t: "Vider le cache DNS des postes", bac: 1 }, { t: "Wi-Fi officiel en WPA3", bac: 0 }];
      SIS.ranger(j, n.g, c, ["Efficace ici", "Hors sujet"], { aide: function (i) { return c[i].bac ? "Le DNS n'intervient pas dans ce scénario." : "Cette mesure ferme une étape de l'attaque."; }, bravo: "On ferme chaque maillon : prise, borne, faille, Wi-Fi." });
    } },
    { nom: "Sans aide", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["document", "bouclier"], titre: "Rapport au RSSI", sous: "une phrase pour conclure" });
      j.titre("Quelle conclusion de la séance 2 ce cas illustre-t-il le mieux ?");
      j.choix([{ html: "Seuls les attaquants experts peuvent attaquer un hôpital", aide: "Une borne WEP et un SMB non corrigé : rien d'expert." }, { html: "Les attaques de couche 2 et les failles connues suffisent quand le Wi-Fi étend le réseau hors des murs", juste: true }, { html: "Le chiffrement rend toute attaque impossible", aide: "WEP est chiffré... et cassé." }], { colonnes: 1, ok: function () { j.bravo("Présence sur le segment, faille déjà corrigeable, périmètre étendu : tout y est."); j.suite(); } });
    } }
  ]
}));
