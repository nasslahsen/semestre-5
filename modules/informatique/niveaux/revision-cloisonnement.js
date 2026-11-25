/* Révision du chapitre 16 : conception, VLAN, DMZ et règles dans des situations nouvelles. */
NIVEAU(SIS.rejouable({
  id: "revision-cloisonnement",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "VLAN ou DMZ ?", jouer: function (j, n) {
      j.titre("Range chaque besoin : se règle-t-il plutôt avec des VLAN ou avec une DMZ ?");
      var c = [{ t: "Séparer les pompes et les postes bureautiques sur les mêmes switchs", bac: 0 }, { t: "Publier le portail patient sur Internet", bac: 1 }, { t: "Isoler le labo de l'accueil sans recâbler", bac: 0 }, { t: "Héberger le serveur mail public", bac: 1 }];
      SIS.ranger(j, n.g, c, ["VLAN", "DMZ"], { aide: function (i) { return c[i].bac ? "Un service exposé à Internet, en zone tampon." : "Des réseaux logiques sur un même réseau physique interne."; }, bravo: "VLAN pour séparer à l'intérieur, DMZ pour exposer sans ouvrir le LAN." });
    } },
    { nom: "Le VLAN 1", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "alerte"], titre: "Tout est resté sur le VLAN 1", sous: "VLAN natif et VLAN de gestion" });
      j.titre("L'audit trouve le VLAN natif et le VLAN de gestion laissés sur le VLAN 1. Pourquoi le cours l'interdit-il ?");
      j.choix([{ html: "Parce que le VLAN 1 est plus lent", aide: "Ce n'est pas une question de vitesse." }, { html: "Parce que ce réglage par défaut facilite le saut de VLAN et l'accès à l'administration", juste: true }, { html: "Parce qu'il est réservé au Wi-Fi", aide: "Le VLAN 1 est simplement le VLAN par défaut." }], { colonnes: 1, ok: function () { j.bravo("Ne jamais garder le VLAN 1 par défaut, ni pour le natif ni pour la gestion."); j.suite(); } });
    } },
    { nom: "Deux pare-feu", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["serveur", "base"], titre: "Serveur web et base", sous: "dans la même zone, derrière un seul pare-feu" });
      j.titre("Le serveur web public et la base des patients sont dans la même zone derrière un seul pare-feu. Que gagne-t-on en ajoutant une DMZ ?");
      j.choix([{ html: "Le web piraté ne donne plus un accès direct à la base : un second pare-feu l'en sépare", juste: true }, { html: "Rien, un pare-feu suffit", aide: "Si le web tombe, l'attaquant est déjà à côté de la base." }, { html: "Le site devient plus rapide", aide: "La DMZ est une mesure de sécurité." }], { colonnes: 1, ok: function () { j.bravo("Isoler le réseau interne pour limiter l'impact d'une intrusion."); j.suite(); } });
    } }
  ]
}));
