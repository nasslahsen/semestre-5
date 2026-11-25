/* Niveau : hub, switch, routeur, switch multicouche (séance 2, diapositives 8 et 9). */
NIVEAU(SIS.rejouable({
  id: "equipements-reseau",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Quelle couche ?", jouer: function (j, n) {
      j.titre("Relie chaque équipement à sa couche OSI.");
      SIS.associer(j, n.g, ["Hub", "Switch", "Routeur", "Switch multicouche"], ["2 (liaison)", "2 et 3", "1 (physique)", "3 (réseau)"], [2, 0, 3, 1], {
        aide: function (i) { return ["Il diffuse tout, sans rien comprendre.", "Il apprend les adresses MAC.", "Il route les paquets IP.", "Il commute et il route."][i]; },
        bravo: "Hub 1, switch 2, routeur 3, multicouche 2 et 3." });
    } },
    { nom: "Quelle table ?", jouer: function (j, n) {
      j.titre("Range chaque élément : switch ou routeur ?");
      var c = [{ t: "Table d'adresses MAC", bac: 0 }, { t: "Table de routage", bac: 1 }, { t: "Relie le LAN à Internet", bac: 1 }, { t: "Multiprise intelligente du LAN", bac: 0 }, { t: "OSPF, RIP", bac: 1 }, { t: "Apprend les MAC", bac: 0 }];
      SIS.ranger(j, n.g, c, ["Switch", "Routeur"], { aide: function (i) { return c[i].bac ? "On parle d'adresses IP et d'autres réseaux." : "On reste dans le réseau local, avec les adresses MAC."; }, bravo: "Switch : MAC, LAN. Routeur : routage, autres réseaux." });
    } },
    { nom: "Le cœur de réseau", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "engrenage"], titre: "Cœur de réseau du CHU", sous: "VLAN par service, routage entre eux, ACL" });
      j.titre("Le CHU veut, dans un même boîtier, commuter vite, router entre les VLAN des services et filtrer avec des ACL. Que choisir ?");
      j.choix([{ html: "Un hub", aide: "Obsolète, aucune intelligence." }, { html: "Un switch de couche 2", aide: "Il ne route pas entre VLAN." }, { html: "Un switch multicouche", juste: true }], { ok: function () { j.bravo("Commutation L2 et L3, routage inter-VLAN, ACL : le switch multicouche."); j.suite(); } });
    } }
  ]
}));
