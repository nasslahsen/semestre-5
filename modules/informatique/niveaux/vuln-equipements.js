/* Niveau : vulnérabilités des équipements réseau et attaques des couches 2 et 3 (séance 2, diapositive 9). */
NIVEAU(SIS.rejouable({
  id: "vuln-equipements",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Quatre faiblesses", jouer: function (j, n) {
      j.titre("Relie chaque constat d'audit à la vulnérabilité du cours.");
      SIS.associer(j, n.g, ["Le switch accepte admin / admin", "Le firmware date de 2017, CVE connues", "L'interface web du routeur répond depuis Internet", "Telnet et SNMP v1 sont activés"],
        ["Services de gestion exposés", "Configuration par défaut non sécurisée", "Identifiants par défaut", "Firmware obsolète"], [2, 3, 0, 1], {
        aide: function (i) { return ["Le mot de passe d'usine.", "Des failles connues sans correctif.", "L'administration est joignable de l'extérieur.", "Des protocoles non chiffrés laissés actifs."][i]; },
        bravo: "Identifiants d'usine, firmware non corrigé, gestion exposée, protocoles en clair." });
    } },
    { nom: "Switch ou routeur ?", jouer: function (j, n) {
      j.titre("Range chaque attaque selon l'équipement qu'elle vise.");
      var c = [{ t: "ARP spoofing", bac: 0 }, { t: "IP spoofing", bac: 1 }, { t: "MAC flooding", bac: 0 }, { t: "ICMP flood", bac: 1 }, { t: "VLAN hopping", bac: 0 }, { t: "Détournement DNS du routeur", bac: 1 }];
      SIS.ranger(j, n.g, c, ["Switch (couche 2)", "Routeur (couche 3)"], { aide: function (i) { return c[i].bac ? "On joue sur les adresses IP, ICMP ou les réglages du routeur." : "On joue sur les trames : MAC, ARP, VLAN."; }, bravo: "Couche 2 : ARP, MAC, VLAN. Couche 3 : IP, ICMP, DNS du routeur." });
    } },
    { nom: "La table pleine", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "alerte"], titre: "Table MAC saturée", sous: "des milliers de fausses adresses en une minute" });
      j.titre("Un poste envoie des milliers de trames avec de fausses adresses MAC, jusqu'à remplir la table du switch. Quelle attaque ?");
      j.choix([{ html: "VLAN hopping", aide: "Ici, rien ne change de VLAN." }, { html: "MAC flooding", juste: true }, { html: "IP spoofing", aide: "C'est l'adresse MAC qui est fausse, et c'est la table du switch qui sature." }], { ok: function () { j.bravo("MAC flooding : saturation de la table MAC."); j.suite(); } });
    } },
    { nom: "Il suffit d'être là", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["pirate", "reseau"], titre: "Une prise libre dans le couloir", sous: "ou un Wi-Fi mal isolé" });
      j.titre("Que faut-il, d'après le cours, pour mener la plupart des attaques de couche 2 ?");
      j.choix([{ html: "Le mot de passe administrateur du switch", aide: "Justement non : pas besoin de casser un mot de passe." }, { html: "Être présent sur le bon segment réseau", juste: true }, { html: "Un accès depuis Internet", aide: "Les trames de couche 2 ne traversent pas les routeurs." }], { colonnes: 1, ok: function () { j.bravo("Une présence sur le bon segment suffit, y compris par un Wi-Fi mal isolé."); j.suite(); } });
    } }
  ]
}));
