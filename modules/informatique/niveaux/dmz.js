/* Niveau : cloisonnement par DMZ (séance 3, diapositive 8). */
NIVEAU(SIS.rejouable({
  id: "dmz",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Où placer ?", jouer: function (j, n) {
      j.titre("Range chaque serveur dans sa zone.");
      var c = [{ t: "Portail de prise de rendez-vous", bac: 1 }, { t: "Base du DPI", bac: 2 }, { t: "Serveur mail public", bac: 1 }, { t: "Stockage PACS", bac: 2 }, { t: "DNS public de l'hôpital", bac: 1 }, { t: "Navigateur d'un patient", bac: 0 }];
      SIS.ranger(j, n.g, c, ["Public", "DMZ", "Privé"], { aide: function (i) { return ["C'est le côté Internet, non fiable.", "Il doit être joignable depuis Internet : service public.", "Données sensibles : jamais joignables d'Internet."][c[i].bac]; }, bravo: "Services publics en DMZ, données dans le privé." });
    } },
    { nom: "Combien de barrières ?", jouer: function (j, n) {
      var A = SIS, C = A.C; A.vider(n.g);
      ["Public", "DMZ", "Privé"].forEach(function (t, i) { A.boite(n.g, 20 + i * 225, 120, 190, 260, { titre: t, taille: 24 }); });
      [215, 440].forEach(function (x) { A.boite(n.g, x - 4, 200, 18, 100, { fond: C.koPale, bord: C.ko, rx: 4 }); });
      j.titre("Le portail en DMZ est piraté. Combien de pare-feu restent entre l'attaquant et la base de données, sur le schéma du cours ?");
      j.nombre({ cases: [{ attendu: 1 }], avant: "\\text{pare-feu restants} :", aide: function () { return "Il a déjà franchi celui entre Public et DMZ."; }, ok: function () { j.bravo("Encore un : celui entre la DMZ et le réseau privé."); j.suite(); } });
    } },
    { nom: "Le rôle", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["nuage", "serveur"], titre: "Zone démilitarisée", sous: "entre Internet et le LAN" });
      j.titre("Quels sont les deux rôles de la DMZ selon le cours ?");
      j.choix([{ html: "Accélérer Internet et sauvegarder les données", aide: "Ce n'est pas une question de vitesse." }, { html: "Héberger les services publics et isoler le réseau interne", juste: true }, { html: "Remplacer le pare-feu et l'antivirus", aide: "Elle s'appuie sur des pare-feu, elle ne les remplace pas." }], { colonnes: 1, ok: function () { j.bravo("Une zone tampon : web, mail, DNS, et le LAN reste à l'abri."); j.suite(); } });
    } }
  ]
}));
