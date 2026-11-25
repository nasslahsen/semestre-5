/* Niveau : modèles OSI et TCP/IP (séance 2, diapositive 5). */
NIVEAU(SIS.rejouable({
  id: "osi-tcpip",
  init: function (fig) { return { g: SIS.s("g", null, fig.svg) }; },
  etapes: [
    { nom: "Empiler les couches", jouer: function (j, n) {
      j.titre("Touche les sept couches OSI de la 7 (en haut) à la 1 (en bas).");
      SIS.ordonner(j, n.g, ["Réseau", "Application", "Liaison", "Session", "Physique", "Transport", "Présentation"], [1, 6, 3, 5, 0, 2, 4], {
        aide: function (i, a, k) { return ["En haut : le point de contact avec les services réseaux.", "Juste en dessous : formatage, chiffrement, encodage.", "Puis l'organisation de la session.", "Puis les segments et les ports.", "Puis le routage des paquets.", "Puis les trames de nœud à nœud.", "Tout en bas : les bits."][k]; },
        bravo: "Application, présentation, session, transport, réseau, liaison, physique." });
    } },
    { nom: "Unités de données", jouer: function (j, n) {
      j.titre("Relie chaque couche à son unité de données.");
      SIS.associer(j, n.g, ["4. Transport", "3. Réseau", "2. Liaison", "1. Physique"], ["Trames", "Bits", "Segments", "Paquets"], [2, 3, 0, 1], {
        aide: function (i) { return ["Avec le numéro de port : le segment.", "Le routeur route des...", "On transfère des ... de nœud à nœud.", "Le plus petit élément transmis."][i]; },
        bravo: "Segments, paquets, trames, bits." });
    } },
    { nom: "Où vit ce protocole ?", jouer: function (j, n) {
      j.titre("Range chaque protocole dans sa couche OSI (d'après le tableau du cours).");
      var c = [{ t: "HTTP", bac: 0 }, { t: "TCP", bac: 1 }, { t: "IP", bac: 2 }, { t: "SMTP", bac: 0 }, { t: "UDP", bac: 1 }, { t: "ARP", bac: 2 }];
      SIS.ranger(j, n.g, c, ["7. Application", "4. Transport", "3. Réseau"], { aide: function (i) { return ["Point de contact avec les services : le web.", "Segments, ports, contrôle de réception.", "Routage des paquets."][c[i].bac]; }, bravo: "HTTP, SMTP en 7 ; TCP, UDP en 4 ; IP, ARP en 3." });
    } },
    { nom: "Quatre couches", jouer: function (j, n) {
      SIS.scene(n.g, { icones: ["reseau", "document"], titre: "Modèle TCP/IP", sous: "application, transport, Internet, accès au réseau" });
      j.titre("Dans le modèle TCP/IP, quelles couches OSI la couche « Application » regroupe-t-elle ?");
      j.choix([{ html: "7, 6 et 5", juste: true }, { html: "7 seulement", aide: "Le modèle TCP/IP n'a que quatre couches : la couche Application en absorbe plusieurs." }, { html: "7, 6, 5 et 4", aide: "La couche 4 garde son nom : transport." }], { ok: function () { j.bravo("Application (7, 6, 5), transport (4), Internet (3), accès au réseau (2, 1)."); j.suite(); } });
    } }
  ]
}));
