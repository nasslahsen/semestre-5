/* Révision du chapitre 15 : ports, DNS, 0-day, Wi-Fi et télémaintenance dans des situations nouvelles. */
NIVEAU(SIS.rejouable({
  id: "revision-couches47",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Quelle attaque ?", jouer: function (j, n) {
      j.titre("Relie chaque situation à l'attaque qui la décrit.");
      SIS.associer(j, n.g, ["Le portail tapé sans faute ouvre un faux site", "Les identifiants FTP sont lus sur le réseau", "Des milliers d'essais de mots de passe sur le port 22", "Les téléphones rejoignent un faux « CHU-Wifi »"],
        ["Evil twin", "Force brute sur SSH", "Empoisonnement du cache DNS", "Sniffing d'un protocole en clair"], [2, 3, 1, 0], {
        aide: function (i) { return ["Le nom est juste, l'adresse fausse.", "FTP transfère en texte clair.", "SSH est la cible des essais répétés.", "Même SSID, signal plus fort."][i]; },
        bravo: "DNS, sniffing, force brute, evil twin." });
    } },
    { nom: "Le bon Wi-Fi", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "cadenas"], titre: "Nouveau Wi-Fi des soignants", sous: "les bornes acceptent WEP, WPA2 et WPA3" });
      j.titre("Les nouvelles bornes acceptent WEP, WPA2 et WPA3. Lequel configurer pour le Wi-Fi des soignants ?");
      j.choix([{ html: "WEP, compatible avec tout", aide: "Cassé en quelques minutes." }, { html: "WPA2, la norme de confiance", aide: "Vulnérable à KRACK ; il y a mieux sur ces bornes." }, { html: "WPA3, le plus robuste disponible", juste: true }], { colonnes: 1, ok: function () { j.bravo("WPA3 : chiffrement individuel des sessions, meilleure résistance à la force brute."); j.suite(); } });
    } },
    { nom: "0-day ?", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["serveur", "alerte"], titre: "Faille SMB corrigée en 2017", sous: "serveur jamais mis à jour" });
      j.titre("Un rançongiciel exploite une faille SMB corrigée par l'éditeur depuis des années. Est-ce une attaque 0-day ?");
      j.choix([{ html: "Oui, car le serveur n'avait pas le correctif", aide: "0-day veut dire : l'éditeur ne connaît pas encore la faille." }, { html: "Non : c'est une vulnérabilité connue, non corrigée", juste: true }, { html: "Oui, toute faille SMB est 0-day", aide: "Ce qui compte, c'est si l'éditeur connaît la faille." }], { colonnes: 1, ok: function () { j.bravo("Les attaques des couches 3 à 7 s'appuient souvent sur des failles déjà connues et déjà corrigeables."); j.suite(); } });
    } },
    { nom: "Au-delà des murs", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["nuage", "reseau"], titre: "Le périmètre du réseau", sous: "jusqu'où va-t-il vraiment ?" });
      j.titre("Quelles deux portes étendent le réseau de l'hôpital au-delà de ses murs physiques, d'après la diapositive « À retenir » ?");
      j.choix([{ html: "Le Wi-Fi et la télémaintenance", juste: true }, { html: "Le switch et le routeur", aide: "Ils sont dans les locaux de l'hôpital." }, { html: "DNSSEC et le VPN", aide: "Ce sont des protections." }], { ok: function () { j.bravo("Wi-Fi et accès distants : des cibles privilégiées."); j.suite(); } });
    } }
  ]
}));
