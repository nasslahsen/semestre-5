/* Figure : le DM entre la GMAO et le dossier patient : ce que gère la GMAO, et les trois incidents des DM communicants (S3-S4, diapo 11). */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-gmao", { largeur: 960, hauteur: 440, titre: "Un DM, deux liens avec le SIH",
    essai: "<strong>Essaie</strong> : touche chaque bloc. <strong>Observe</strong> : à gauche, la GMAO suit l'appareil ; à droite, ses données arrivent dans le dossier du patient, avec trois façons de se tromper." });
  var items = [
    { x: 20, y: 40, w: 250, h: 75, t: "Inventaire des DM", texte: "la GMAO recense chaque appareil du parc, avec son service." },
    { x: 20, y: 130, w: 250, h: 75, t: "Maintenance", sous: "préventive et corrective", texte: "maintenance préventive (planifiée) et corrective (après une panne)." },
    { x: 20, y: 220, w: 250, h: 75, t: "Traçabilité des interventions", texte: "chaque intervention sur l'appareil est enregistrée." },
    { x: 20, y: 310, w: 250, h: 75, t: "Lien service et patient", texte: "on sait où est l'appareil et sur quels patients il a servi. Indicateurs : disponibilité, délai d'intervention, coût de maintenance, cycle de vie." },
    { x: 690, y: 40, w: 250, h: 100, t: "Mauvais rattachement", sous: "appareil associé au mauvais patient", texte: "exemple du cours : un moniteur reste associé à un lit, mais pas au bon patient après un changement de chambre.", coul: C.ko, pale: C.koPale },
    { x: 690, y: 160, w: 250, h: 100, t: "Horodatage erroné", sous: "heure de l'appareil décalée", texte: "l'heure de l'appareil est décalée de celle du SIH : les mesures sont rangées au mauvais moment.", coul: C.ko, pale: C.koPale },
    { x: 690, y: 280, w: 250, h: 100, t: "Valeur aberrante", sous: "intégrée sans contrôle", texte: "une valeur aberrante entre dans le dossier sans contrôle.", coul: C.ko, pale: C.koPale }
  ];
  A.explorer(f, items, { taille: 17, fond: function (g) {
    A.icone(g, "moniteur", [480, 200], 110, C.encre);
    A.texte(g, "DM communicant", [480, 290], { taille: 17, gras: 700 });
    A.texte(g, "moniteur, pompe, ventilateur, automate, imagerie", [480, 320], { taille: 15, coul: C.doux, largeur: 300 });
    A.texte(g, "GMAO", [145, 410], { taille: 18, gras: 800, coul: C.turq });
    A.texte(g, "Dossier patient", [815, 410], { taille: 18, gras: 800, coul: C.ko });
    A.fleche(g, [400, 200], [285, 200], { ep: 4, coul: C.turq });
    A.fleche(g, [560, 200], [675, 200], { ep: 4, coul: C.ko });
  }, invite: "Touche un bloc." });
})();
