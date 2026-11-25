/* Niveau : cloisonnement par VLAN, trunk, routage inter-VLAN, vulnérabilités et bonnes pratiques (séance 3, diapositives 6 et 7). */
NIVEAU(SIS.rejouable({
  id: "vlan",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Qui se voit ?", jouer: function (j, n) {
      var A = SIS, C = A.C; A.vider(n.g);
      A.boite(n.g, 60, 60, 240, 90, { titre: "Poste radio", sous: "VLAN 10, sur SW1", taille: 20, fond: C.accPale, bord: C.acc });
      A.boite(n.g, 380, 60, 240, 90, { titre: "PACS", sous: "VLAN 10, sur SW2", taille: 20, fond: C.accPale, bord: C.acc });
      A.boite(n.g, 220, 300, 240, 90, { titre: "Poste accueil", sous: "VLAN 20, sur SW1", taille: 20, fond: C.vPale, bord: C.v });
      j.titre("Sans routeur, quels postes peuvent communiquer directement ?");
      j.choix([{ html: "Le poste radio et le PACS (même VLAN, reliés par trunk)", juste: true }, { html: "Le poste radio et le poste d'accueil (même switch)", aide: "Même switch physique, mais deux réseaux logiques indépendants." }, { html: "Tous les trois", aide: "Les VLAN sont justement des réseaux séparés." }], { colonnes: 1, ok: function () { j.bravo("Le VLAN compte, pas le switch physique."); j.expliquer("Pour passer du VLAN 10 au VLAN 20, il faut un <b>routage inter-VLAN</b> : routeur ou switch de couche 3."); j.suite(); } });
    } },
    { nom: "Trunk ou inter-VLAN", jouer: function (j, n) {
      j.titre("Range chaque besoin : mode trunk ou routage inter-VLAN ?");
      var c = [{ t: "Relier SW1 et SW2 pour tous les VLAN", bac: 0 }, { t: "Laisser l'accueil interroger le DPI d'un autre VLAN", bac: 1 }, { t: "Un seul câble porte les VLAN 10, 20 et 30", bac: 0 }, { t: "Un switch de couche 3 filtre entre VLAN", bac: 1 }];
      SIS.ranger(j, n.g, c, ["Mode trunk", "Routage inter-VLAN"], { aide: function (i) { return c[i].bac ? "On fait passer du trafic d'un VLAN à un autre." : "On relie des commutateurs entre eux."; }, bravo: "Trunk entre switchs, routage entre VLAN." });
    } },
    { nom: "Les bonnes pratiques", jouer: function (j, n) {
      j.titre("Relie chaque bonne pratique à ce qu'elle empêche.");
      SIS.associer(j, n.g, ["Désactiver le DTP", "VLAN natif autre que 1", "Désactiver les ports inutilisés", "VLAN de gestion dédié"], ["Un intrus sur une prise libre", "L'accès à l'administration depuis le VLAN par défaut", "Un poste qui négocie un trunk", "Le double tagging"], [2, 3, 0, 1], {
        aide: function (i) { return ["Dynamic Trunking Protocol : négociation automatique.", "Le double tagging s'appuie sur le VLAN natif.", "Une prise active, c'est une entrée.", "Ne pas laisser l'administration sur le VLAN 1."][i]; },
        bravo: "DTP coupé, VLAN 1 évité, ports fermés, gestion à part." });
    } },
    { nom: "L'attaque", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["pirate", "reseau"], titre: "Deux étiquettes VLAN", sous: "sur une même trame" });
      j.titre("Un attaquant envoie des trames portant deux étiquettes VLAN pour atteindre un autre VLAN. Comment s'appelle cette technique ?");
      j.choix([{ html: "MAC flooding", aide: "Celle-là sature la table MAC." }, { html: "ARP spoofing", aide: "Celle-là trompe les caches ARP." }, { html: "Double tagging, une forme de VLAN hopping", juste: true }], { colonnes: 1, ok: function () { j.bravo("Double tagging : deux étiquettes pour contourner le switch."); j.suite(); } });
    } }
  ]
}));
