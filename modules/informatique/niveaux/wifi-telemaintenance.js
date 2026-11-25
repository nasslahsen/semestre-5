/* Niveau : attaques Wi-Fi (rogue AP, evil twin, WEP à WPA3) et télémaintenance (séance 2, diapositives 15 et 16). */
NIVEAU(SIS.rejouable({
  id: "wifi-telemaintenance",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Rogue AP ou evil twin", jouer: function (j, n) {
      j.titre("Range chaque situation : rogue AP ou evil twin ?");
      var c = [{ t: "Une borne perso branchée sur une prise du bureau", bac: 0 }, { t: "Un point d'accès « CHU-Patients » plus puissant que le vrai", bac: 1 }, { t: "Porte dérobée Wi-Fi vers le réseau filaire", bac: 0 }, { t: "Les téléphones s'y connectent seuls, même SSID", bac: 1 }];
      SIS.ranger(j, n.g, c, ["Rogue AP", "Evil twin"], { aide: function (i) { return c[i].bac ? "Même nom que le vrai Wi-Fi, signal plus fort." : "Un point d'accès non autorisé branché sur le réseau de l'hôpital."; }, bravo: "Rogue AP : branché sur le filaire. Evil twin : même SSID, plus fort." });
    } },
    { nom: "Du plus faible au plus sûr", jouer: function (j, n) {
      j.titre("Touche les protocoles Wi-Fi du plus faible au plus sûr.");
      SIS.ordonner(j, n.g, ["WPA2", "WEP", "WPA3", "WPA / WPA1 (TKIP)"], [1, 3, 0, 2], {
        aide: function (i, a, k) { return ["Le plus faible : cassé en quelques minutes.", "Puis l'ancien, avec TKIP.", "Puis la norme longtemps de confiance.", "Le plus récent."][k]; },
        bravo: "WEP, WPA, WPA2, WPA3." });
    } },
    { nom: "Quelle faille ?", jouer: function (j, n) {
      j.titre("Relie chaque protocole à la faille citée par le cours.");
      SIS.associer(j, n.g, ["WEP", "WPA / WPA1", "WPA2", "WPA3"], ["KRACK : réutilisation forcée d'une clé", "Canal auxiliaire : temps et mémoire du routeur", "Cassé en quelques minutes", "TKIP, aujourd'hui vulnérable"], [2, 3, 0, 1], {
        aide: function (i) { return ["Totalement obsolète.", "Son protocole de chiffrement a vieilli.", "Key Reinstallation Attacks.", "Même le plus robuste : on mesure ce que fait le routeur."][i]; },
        bravo: "Aucun protocole n'est parfait : on prend le meilleur disponible." });
    } },
    { nom: "La télémaintenance", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["cle", "pirate"], titre: "Identifiant VPN du fabricant", sous: "volé par hameçonnage chez un sous-traitant" });
      j.titre("L'identifiant VPN d'un fabricant est volé chez son sous-traitant. Pourquoi est-ce si grave pour l'hôpital ?");
      j.choix([{ html: "Parce que le VPN chiffre mal", aide: "Le chiffrement n'y est pour rien : l'identifiant est valide." }, { html: "Parce que cela ne concerne que le fabricant", aide: "L'accès mène au réseau biomédical de l'hôpital client." }, { html: "Parce qu'il donne un accès direct, et légitime en apparence, au réseau biomédical", juste: true }], { colonnes: 1, ok: function () { j.bravo("La télémaintenance est classée risque majeur : une surface d'attaque active, au-delà des murs."); j.suite(); } });
    } }
  ]
}));
