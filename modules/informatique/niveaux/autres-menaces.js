/* Niveau : autres menaces de sécurité du réseau hospitalier (séance 2, diapositive 17). */
NIVEAU(SIS.rejouable({
  id: "autres-menaces",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Quel manque ?", jouer: function (j, n) {
      j.titre("Relie chaque constat au manque de la liste du cours.");
      SIS.associer(j, n.g, ["Le local réseau n'est jamais fermé à clé", "Personne ne sait quand appliquer les mises à jour", "Les mots de passe transitent en clair", "Le réseau s'est agrandi au fil des achats, sans plan"],
        ["Mécanismes de cryptographie", "Conception aléatoire des réseaux", "Sécurité physique des équipements", "Politique des correctifs et mises à jour"], [2, 3, 0, 1], {
        aide: function (i) { return ["Accès physique aux équipements.", "Aucune règle pour les correctifs.", "Rien n'est chiffré.", "Aucune mesure de sécurité dans la conception."][i]; },
        bravo: "Physique, correctifs, cryptographie, conception." });
    } },
    { nom: "Organisation ou technique ?", jouer: function (j, n) {
      j.titre("Range chaque manque : est-ce une politique ou une procédure qui manque, ou un réglage technique ?");
      var c = [{ t: "Pas d'analyse des risques", bac: 0 }, { t: "Équipements mal configurés", bac: 1 }, { t: "Pas de procédure de gestion des accès", bac: 0 }, { t: "Pas de cryptographie", bac: 1 }, { t: "Pas de politique de sécurité de l'information", bac: 0 }];
      SIS.ranger(j, n.g, c, ["Politique, procédure", "Réglage technique"], { aide: function (i) { return c[i].bac ? "Cela se règle sur les équipements." : "Cela s'écrit et s'organise avant de toucher aux machines."; }, bravo: "Beaucoup de menaces viennent d'abord de l'organisation." });
    } },
    { nom: "Sans attaquant", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "alerte"], titre: "Aucune attaque en cours", sous: "et pourtant le réseau est fragile" });
      j.titre("Quel point commun ont ces neuf menaces ?");
      j.choix([{ html: "Ce sont toutes des attaques de couche 2", aide: "Plusieurs sont des politiques, pas des attaques." }, { html: "Ce sont des manques qui rendent le réseau vulnérable avant même qu'un attaquant n'agisse", juste: true }, { html: "Elles ne concernent que le Wi-Fi", aide: "Sécurité physique, correctifs, conception... bien au-delà du Wi-Fi." }], { colonnes: 1, ok: function () { j.bravo("Ce sont des vulnérabilités d'organisation et de conception."); j.suite(); } });
    } }
  ]
}));
