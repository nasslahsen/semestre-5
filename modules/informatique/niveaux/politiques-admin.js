/* Niveau : politiques d'administration réseau et outils (séance 3, diapositives 23 et 24). */
NIVEAU(SIS.rejouable({
  id: "politiques-admin",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Autorisé ou interdit", jouer: function (j, n) {
      j.titre("Range chaque protocole d'administration : autorisé ou interdit par la politique du cours ?");
      var c = [{ t: "SSH", bac: 0 }, { t: "Telnet", bac: 1 }, { t: "SNMPv3", bac: 0 }, { t: "TFTP", bac: 1 }, { t: "HTTPS", bac: 0 }, { t: "SNMP v2c", bac: 1 }];
      SIS.ranger(j, n.g, c, ["Autorisé", "Interdit"], { aide: function (i) { return c[i].bac ? "Ce protocole passe en clair." : "Ce protocole est chiffré."; }, bravo: "Uniquement des protocoles chiffrés." });
    } },
    { nom: "Quel domaine ?", jouer: function (j, n) {
      j.titre("Relie chaque exigence au domaine de la politique.");
      SIS.associer(j, n.g, ["Aucun compte partagé, MFA, bastion", "Syslog vers le SIEM, source NTP interne", "Plan de retour arrière, trace de qui a changé quoi", "Coffre-fort de secrets, PKI", "Délai maximal de correction par gravité"], ["Gestion des changements", "Secrets et identités", "Accès d'administration", "Correctifs et vulnérabilités", "Journalisation et temps"], [2, 4, 0, 1, 3], {
        aide: function (i) { return ["Qui peut administrer, et comment.", "Des journaux à la même heure.", "Un changement réversible et tracé.", "Pas de mot de passe en clair.", "Classement selon la criticité."][i]; },
        bravo: "Accès, journaux, changements, secrets, correctifs." });
    } },
    { nom: "Le bon outil", jouer: function (j, n) {
      j.titre("Relie chaque besoin à l'outil cité par le cours.");
      SIS.associer(j, n.g, ["Authentifier les administrateurs", "Superviser en SNMPv3", "Sauvegarder les configurations", "Chercher les vulnérabilités"], ["Ansible", "OpenVAS, Nessus", "FreeRADIUS (serveur AAA)", "Zabbix, Centreon"], [2, 3, 0, 1], {
        aide: function (i) { return ["Un serveur AAA.", "Un outil de supervision.", "Automatiser et auditer les configurations.", "Des scanners."][i]; },
        bravo: "AAA, supervision, configuration, vulnérabilités." });
    } },
    { nom: "L'horloge", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["horloge", "document"], titre: "Journaux décalés de 7 minutes", sous: "entre le pare-feu et le switch" });
      j.titre("Les journaux du pare-feu et du switch ont 7 minutes d'écart. Pourquoi la politique exige-t-elle une source NTP interne unique ?");
      j.choix([{ html: "Pour économiser de l'espace disque", aide: "Pense à l'enquête après un incident." }, { html: "Pour pouvoir remettre les événements dans l'ordre et reconstituer une attaque", juste: true }, { html: "Pour chiffrer les journaux", aide: "NTP donne l'heure, il ne chiffre pas." }], { colonnes: 1, ok: function () { j.bravo("Une horloge unique, sinon l'enchaînement des journaux devient illisible."); j.suite(); } });
    } }
  ]
}));
