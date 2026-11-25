/* Boss du chapitre 13 : le moniteur qui ne répond plus, diagnostiquer couche par couche. */
NIVEAU(SIS.rejouable({
  id: "boss-reseaux",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Le chemin du message", jouer: function (j, n) {
      j.titre("Une centrale de surveillance envoie une alarme au serveur. Touche, dans l'ordre, ce que traverse le message en partant de l'application de la centrale.");
      SIS.ordonner(j, n.g, ["Couche Internet du poste (IP)", "Application du serveur", "Application de la centrale", "Switch, puis routeur", "Couche transport du poste (TCP)"], [2, 4, 0, 3, 1], {
        aide: function (i, a, k) { return ["Le message naît dans l'application.", "Il descend d'abord au transport.", "Puis à la couche Internet.", "Il traverse les équipements du réseau.", "Il remonte jusqu'à l'application du serveur."][k]; },
        bravo: "Encapsulation à l'envoi, équipements au milieu, désencapsulation à l'arrivée." });
    } },
    { nom: "La bonne socket", jouer: function (j, n) {
      var A = SIS; A.vider(n.g);
      A.boite(n.g, 60, 120, 560, 110, { titre: "Serveur d'alarmes : 10.20.0.5", sous: "service à l'écoute sur le port 6000 (exemple ajouté)", taille: 24 });
      j.titre("Dans quelle plage tombe le port 6000 ?");
      j.choix([{ html: "Ports bien connus (0 – 1023)", aide: "6000 dépasse 1023." }, { html: "Ports réservés (1024 – 49 151)", juste: true }, { html: "Ports dynamiques (49 152 – 65 535)", aide: "6000 est loin sous 49 152." }], { colonnes: 1, ok: function () { j.bravo("Ports réservés : ceux des applications propriétaires, comme ce logiciel d'alarmes. La socket du serveur est 10.20.0.5:6000."); j.suite(); } });
    } },
    { nom: "Sans aide", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["moniteur", "reseau"], titre: "Le moniteur ne joint plus le serveur", sous: "il joint encore les postes de son étage" });
      j.titre("Le moniteur joint encore les postes de son étage, mais plus le serveur situé dans un autre réseau. Quel équipement suspecter d'abord ?");
      j.choix([{ html: "Le switch de l'étage", aide: "Le LAN de l'étage fonctionne : le switch fait son travail." }, { html: "La carte réseau du moniteur", aide: "Elle marche : il joint ses voisins." }, { html: "Le routeur (ou le switch de couche 3) entre les réseaux", juste: true }], { colonnes: 1, ok: function () { j.bravo("Ce qui relie à un autre réseau, c'est le routage : couche 3."); j.suite(); } });
    } }
  ]
}));
