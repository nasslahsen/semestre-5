/* Figure : les sept couches OSI et leur correspondance avec les quatre couches TCP/IP. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-osi", {
    largeur: 960, hauteur: 560, titre: "Modèle OSI et modèle TCP/IP",
    essai: "<strong>Essaie</strong> : touche une couche OSI ou TCP/IP. <strong>Observe</strong> : chaque couche TCP/IP regroupe une ou plusieurs couches OSI."
  });
  var O = [["7. Application", "données", "point de contact avec les services réseaux (Telnet, FTP, HTTP, SMTP)."], ["6. Présentation", "données", "formatage, chiffrement, encodage (HTML, DOC, MP3, JPEG)."], ["5. Session", "données", "organisation de la session, points de contrôle (SIP, RTP)."], ["4. Transport", "segments", "transfert des segments, numéro de port, contrôle de réception (TCP, UDP, SSL, TLS)."], ["3. Réseau", "paquets", "routage des paquets entre les nœuds (IP, ARP)."], ["2. Liaison", "trames", "transfert des trames de nœud à nœud (Ethernet, PPP)."], ["1. Physique", "bits", "transmission des bits (multiplexage, modulation)."]];
  var T = [["Application", 0, 3, "regroupe les couches OSI 7, 6 et 5 : services, encodage, sessions entre applications."], ["Transport", 3, 1, "couche OSI 4 : établit, maintient et termine les sessions entre terminaux."], ["Internet", 4, 1, "couche OSI 3 : adresse les interfaces globalement et choisit les meilleurs chemins."], ["Accès au réseau", 5, 2, "couches OSI 2 et 1 : adresses MAC, encodage du signal, câblage, connecteurs."]];
  var h = 70, y0 = 30;
  var it = O.map(function (o, i) { return { x: 40, y: y0 + i * h + 4, w: 380, h: h - 8, t: o[0], sous: o[1], texte: o[2], taille: 20 }; });
  T.forEach(function (t) { it.push({ x: 560, y: y0 + t[1] * h + 4, w: 340, h: t[2] * h - 8, t: t[0], texte: t[3], coul: C.v, pale: C.vPale, taille: 22 }); });
  A.explorer(f, it, { fond: function (g) {
    A.texte(g, "OSI", [230, 14], { taille: 17, gras: 800, coul: C.doux });
    A.texte(g, "TCP/IP", [730, 14], { taille: 17, gras: 800, coul: C.doux });
    T.forEach(function (t) { var a = y0 + t[1] * h + 4, b = y0 + (t[1] + t[2]) * h - 4; A.s("path", { d: "M430 " + a + " H470 V" + b + " H430 M470 " + (a + b) / 2 + " H550", fill: "none", stroke: C.gris, "stroke-width": 3 }, g); });
  } });
})();
