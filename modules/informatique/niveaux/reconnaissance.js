/* Niveau : la phase de reconnaissance, passive (OSINT) ou active (séance 2, diapositive 3). */
NIVEAU(SIS.rejouable({
  id: "reconnaissance",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Passive ou active", jouer: function (j, n) {
      j.titre("Range chaque action : reconnaissance passive ou active ?");
      var c = [{ t: "Lire les profils LinkedIn des techniciens biomédicaux", bac: 0 }, { t: "Lancer un scan de ports sur le réseau", bac: 1 }, { t: "Analyser les enregistrements DNS publics", bac: 0 }, { t: "Passer OpenVAS sur les serveurs", bac: 1 }, { t: "Lire le site web de l'hôpital", bac: 0 }, { t: "Lancer Nessus sur une plage d'adresses", bac: 1 }];
      SIS.ranger(j, n.g, c, ["Passive (OSINT)", "Active"], {
        aide: function (i) { return c[i].bac === 0 ? "On lit seulement ce qui est déjà public : aucun paquet n'est envoyé à la cible." : "On envoie des paquets aux machines de la cible."; },
        bravo: "Passive : sources ouvertes. Active : Nmap, Nessus, OpenVAS." });
    } },
    { nom: "Le mot du cours", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["document", "reseau"], titre: "Cartographier la cible", sous: "entreprise, système, employés" });
      j.titre("Comment le cours appelle-t-il aussi la phase de reconnaissance ?");
      j.choix([{ html: "Footprinting", juste: true }, { html: "Exfiltration", aide: "C'est la fin d'une attaque, pas son début." }, { html: "Hardening", aide: "C'est un mot de la défense (durcissement)." }], { ok: function () { j.bravo("Footprinting : collecter un maximum d'informations pour cartographier la cible et trouver ses faiblesses."); j.suite(); } });
    } },
    { nom: "Qui le voit ?", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["serveur", "alerte"], titre: "L'IDS de l'hôpital", sous: "il surveille le trafic entrant" });
      j.titre("L'IDS de l'hôpital surveille son réseau. Laquelle de ces reconnaissances a une chance d'être repérée ?");
      j.choix([
        { html: "L'étude des comptes des infirmiers sur les réseaux sociaux", aide: "Ces informations sont hors du réseau de l'hôpital : rien ne passe par lui." },
        { html: "Un scan de ports lancé contre les serveurs", juste: true },
        { html: "La lecture des enregistrements DNS publics", aide: "On interroge des annuaires publics, pas les machines de l'hôpital." }
      ], { colonnes: 1, ok: function () { j.bravo("La reconnaissance active envoie des paquets : elle laisse des traces."); j.expliquer("La reconnaissance passive (OSINT) ne touche pas la cible : elle est invisible pour l'hôpital. Le scan actif est souvent le premier signal d'une attaque."); j.suite(); } });
    } }
  ]
}));
