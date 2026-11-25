/* Figure : un découpage d'hôpital (exemple ajouté) qui applique les règles du cours. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-regles", {
    largeur: 960, hauteur: 440, titre: "Un réseau hospitalier cloisonné (exemple ajouté)",
    essai: "<strong>Essaie</strong> : touche chaque zone. <strong>Observe</strong> : à quelle règle du cours elle répond."
  });
  var it = [
    { x: 30, y: 40, w: 280, h: 110, t: "DMZ", sous: "portail patient, mail", coul: C.brun, pale: C.brunPale, texte: "niveau d'accès : ce qui doit être joignable depuis Internet (règle 3)." },
    { x: 340, y: 40, w: 280, h: 110, t: "Bureautique", sous: "postes administratifs", texte: "réseau interne de criticité moyenne (règles 2 et 3)." },
    { x: 650, y: 40, w: 280, h: 110, t: "Biomédical", sous: "moniteurs, pompes", coul: C.v, pale: C.vPale, texte: "équipements qu'on ne peut pas corriger facilement : isolés selon l'analyse des risques (règle 1)." },
    { x: 180, y: 200, w: 280, h: 110, t: "Critique", sous: "DPI, PACS", coul: C.ko, pale: C.koPale, texte: "informations les plus critiques : leur propre zone (règle 2)." },
    { x: 500, y: 200, w: 280, h: 110, t: "Administration", sous: "gestion des équipements", coul: C.acc, pale: C.accPale, texte: "zone dédiée à l'administration du réseau, séparée des autres (règle 4)." },
    { x: 280, y: 345, w: 400, h: 70, t: "Nouvelle aile", sous: "à cloisonner dès le départ", coul: C.ok, pale: C.okPale, texte: "toute extension intègre le cloisonnement dès sa conception (règle 5)." }
  ];
  it.forEach(function (x) { x.taille = 21; });
  A.explorer(f, it, {});
})();
