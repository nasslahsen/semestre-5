/* Niveau : fonctionnement du DNS et empoisonnement du cache (séance 2, diapositive 13). */
NIVEAU(SIS.rejouable({
  id: "dns-empoisonnement",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "La résolution", jouer: function (j, n) {
      j.titre("Le client demande l'adresse d'un site jamais visité. Touche, dans l'ordre, qui le résolveur interroge.");
      SIS.ordonner(j, n.g, ["Serveur TLD (premier niveau)", "Serveur racine", "Serveur de noms du domaine", "Réponse au client, gardée en cache"], [1, 0, 2, 3], {
        aide: function (i, a, k) { return ["On part du sommet de l'arbre des noms.", "Puis le domaine de premier niveau (.ma, .com).", "Puis le serveur qui connaît le domaine.", "Enfin la réponse, mise en cache."][k]; },
        bravo: "Racine, TLD, domaine, puis cache." });
    } },
    { nom: "Le port du DNS", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["ecran", "serveur"], titre: "hôpital.santé.ma ?", sous: "→ 142.250.179.196" });
      j.titre("Quel port et quel protocole le DNS utilise-t-il d'abord ?");
      j.choix([{ html: "TCP 80", aide: "C'est le web (HTTP)." }, { html: "UDP 25", aide: "25, c'est SMTP." }, { html: "UDP 53 (et TCP)", juste: true }], { ok: function () { j.bravo("UDP port 53, et TCP."); j.suite(); } });
    } },
    { nom: "Le cache empoisonné", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["serveur", "pirate"], titre: "Le résolveur a gardé une fausse réponse", sous: "portail.chu.ma → adresse de l'attaquant" });
      j.titre("Le résolveur de l'hôpital a mis en cache une fausse adresse pour le portail. Qui est touché ?");
      j.choix([{ html: "Seulement le premier qui a posé la question", aide: "La réponse est gardée en cache et resservie." }, { html: "Tous les utilisateurs de ce résolveur, tant que la fausse réponse reste en cache", juste: true }, { html: "Personne, le navigateur détecte toujours l'erreur", aide: "Le nom tapé est juste : rien ne paraît anormal." }], { colonnes: 1, ok: function () { j.bravo("Une fausse réponse en cache sert tout le monde : c'est ce qui rend l'attaque efficace."); j.suite(); } });
    } },
    { nom: "Qui fait quoi ?", jouer: function (j, n) {
      j.titre("Range chaque solution : pour les administrateurs ou pour les utilisateurs finaux ?");
      var c = [{ t: "Activer DNSSEC", bac: 0 }, { t: "ipconfig /flushdns", bac: 1 }, { t: "Mettre à jour les serveurs DNS", bac: 0 }, { t: "Utiliser un VPN", bac: 1 }, { t: "Résolveur 1.1.1.1 ou 8.8.8.8", bac: 1 }];
      SIS.ranger(j, n.g, c, ["Administrateurs", "Utilisateurs finaux"], { aide: function (i) { return c[i].bac ? "Une action qu'on fait sur son propre poste." : "Une action sur les serveurs DNS."; }, bravo: "Serveurs : DNSSEC, mises à jour. Poste : vider le cache, VPN, résolveur sûr." });
    } }
  ]
}));
