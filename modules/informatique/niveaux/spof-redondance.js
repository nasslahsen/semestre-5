/* Niveau : supprimer les points uniques de défaillance (séance 3, diapositive 27). */
NIVEAU(SIS.rejouable({
  id: "spof-redondance",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Quel niveau ?", jouer: function (j, n) {
      j.titre("Range chaque mesure dans son niveau.");
      var c = [{ t: "Pare-feu actif/passif (VRRP, HSRP)", bac: 0 }, { t: "Agrégation LACP", bac: 1 }, { t: "DNS et DHCP en doublon", bac: 2 }, { t: "Deux opérateurs, chemins distincts", bac: 1 }, { t: "Cœur de réseau en paire (MLAG)", bac: 0 }, { t: "PACS en cluster", bac: 2 }];
      SIS.ranger(j, n.g, c, ["Équipements", "Liens", "Services"], { aide: function (i) { return ["Doubler un boîtier.", "Doubler un câble ou une liaison.", "Doubler un service ou une application."][c[i].bac]; }, bravo: "Équipements, liens, services : on double à chaque niveau." });
    } },
    { nom: "La tranchée", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "reseau"], titre: "Deux opérateurs", sous: "leurs deux fibres passent dans la même tranchée" });
      j.titre("L'hôpital a deux opérateurs, mais leurs fibres passent dans la même tranchée. Le SPOF est-il supprimé ?");
      j.choix([{ html: "Oui, il y a deux opérateurs", aide: "Un seul coup de pelleteuse coupe les deux." }, { html: "Non : le cours exige des cheminements physiques différents", juste: true }, { html: "Oui, si on ajoute LACP", aide: "L'agrégation ne change pas le trajet des fibres." }], { colonnes: 1, ok: function () { j.bravo("Doubler ne sert que si les deux chemins ne tombent pas ensemble."); j.suite(); } });
    } },
    { nom: "Détecter vite", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["horloge", "reseau"], titre: "Un lien coupé", sous: "combien de temps pour le savoir ?" });
      j.titre("Quel protocole le cours cite-t-il pour détecter une panne de lien en moins d'une seconde ?");
      j.choix([{ html: "BFD", juste: true }, { html: "DTP", aide: "C'est la négociation des trunks, à désactiver." }, { html: "TFTP", aide: "C'est un transfert de fichiers, interdit pour l'administration." }], { ok: function () { j.bravo("BFD, avec OSPF/BGP à convergence rapide."); j.suite(); } });
    } },
    { nom: "Combien de pannes ?", jouer: function (j, n) {
      var A = SIS; A.vider(n.g);
      ["Pare-feu", "Cœur", "Lien", "PACS"].forEach(function (t, i) { A.boite(n.g, 20 + i * 165, 220, 145, 90, { titre: t, sous: i === 1 ? "en paire" : "unique", taille: 20 }); });
      A.texte(n.g, "chemin du poste au PACS (exemple ajouté)", [340, 380], { taille: 16 });
      j.titre("Sur ce chemin, seul le cœur de réseau est doublé. Combien de SPOF reste-t-il ?");
      j.nombre({ cases: [{ attendu: 3 }], avant: "\\text{SPOF restants} :", aide: function () { return "Compte les maillons uniques."; }, ok: function () { j.bravo("Trois : pare-feu, lien et PACS. Chacun peut encore tout arrêter."); j.suite(); } });
    } }
  ]
}));
