/* Niveau : attaque par inondation ICMP, DoS et DDoS (séance 2, diapositives 11 et 12). */
NIVEAU(SIS.rejouable({
  id: "icmp-flood",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "DoS ou DDoS", jouer: function (j, n) {
      j.titre("Range chaque situation : déni de service simple ou distribué ?");
      var c = [{ t: "Un seul PC envoie des pings en rafale", bac: 0 }, { t: "2 000 caméras piratées pinguent le serveur", bac: 1 }, { t: "Un script sur un portable sature la cible", bac: 0 }, { t: "Un réseau de machines zombies inonde le lien", bac: 1 }];
      SIS.ranger(j, n.g, c, ["DoS (une source)", "DDoS (plusieurs)"], { aide: function (i) { return c[i].bac ? "Le trafic vient de nombreux appareils." : "Une seule machine attaque."; }, bravo: "Plusieurs appareils : DDoS." });
    } },
    { nom: "Trois raisons", jouer: function (j, n) {
      var A = SIS; A.vider(n.g);
      A.boite(n.g, 60, 60, 560, 90, { titre: "1. Sans connexion (stateless)", taille: 22 });
      A.boite(n.g, 60, 180, 560, 90, { titre: "2. Réponse obligatoire (Echo Request / Reply)", taille: 22 });
      A.boite(n.g, 60, 300, 560, 90, { titre: "3. ?", taille: 22 });
      j.titre("Le cours donne trois raisons qui facilitent l'inondation ICMP. Laquelle manque ?");
      j.choix([{ html: "Absence d'authentification de la source", juste: true }, { html: "ICMP est chiffré", aide: "S'il était chiffré, ce ne serait pas une facilité pour l'attaquant." }, { html: "ICMP passe par le port 80", aide: "ICMP n'utilise pas de port." }], { colonnes: 1, ok: function () { j.bravo("Pas d'authentification de la source : on ne sait pas qui envoie, l'adresse peut même être falsifiée."); j.suite(); } });
    } },
    { nom: "Saturer le lien", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["pirate", "serveur"], titre: "Lien de 1 000 Mb/s", sous: "chaque machine envoie 50 Mb/s de pings (exemple ajouté)" });
      j.titre("Le lien du serveur fait 1 000 Mb/s, chaque machine piratée envoie 50 Mb/s de pings. À partir de combien de machines le lien est-il saturé ?");
      j.nombre({ cases: [{ attendu: 20 }], avant: "n = \\dfrac{1\\,000}{50} =", apres: "\\text{ machines}", aide: function () { return "Divise la capacité du lien par le débit d'une machine."; }, ok: function () { j.bravo("20 machines suffisent : une DDoS n'a pas besoin d'un très gros réseau de zombies."); j.suite(); } });
    } },
    { nom: "Se protéger", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["bouclier", "serveur"], titre: "Protéger le serveur de télémétrie", sous: "contre le ping flood" });
      j.titre("Quelles mesures le cours propose-t-il contre l'inondation ICMP ?");
      j.choix([{ html: "Activer le DHCP Snooping", aide: "C'est une parade contre l'ARP spoofing." }, { html: "Passer au WPA3", aide: "C'est pour le Wi-Fi." }, { html: "Limiter ou désactiver les réponses ICMP, et utiliser des solutions anti-DDoS", juste: true }], { colonnes: 1, ok: function () { j.bravo("Limiter ICMP, anti-DDoS : on protège la disponibilité."); j.suite(); } });
    } }
  ]
}));
