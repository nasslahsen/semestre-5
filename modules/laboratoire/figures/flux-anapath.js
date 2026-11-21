/* Figure : le flux de travail du laboratoire d'anapath en dix postes et trois phases, avec l'équipement de chaque poste. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-flux-anapath", {
    largeur: 960, hauteur: 540, titre: "Du flacon au compte rendu",
    essai: "<strong>Essaie</strong> : avance poste par poste. <strong>Observe</strong> : quatre postes de préparation, quatre d'analyse, deux après ; chaque poste a son appareil."
  });
  var g = A.s("g", null, f.svg);
  var PH = { p: { t: "préparation", c: C.froid, f: C.froidPale }, a: { t: "analytique", c: C.jeu, f: C.jeuPale }, s: { t: "post-analytique", c: C.ok, f: C.okPale } };
  var E = [
    { t: "Réception", ph: "p", d: "Numéro d'identification unique, suivi dans le LIS. Étiquetage, impression laser des cassettes." },
    { t: "Fixation", ph: "p", d: "Formol tamponné, tout de suite. Distributeur de formol, armoire ventilée." },
    { t: "Macroscopie", ph: "p", d: "Description à l'œil nu, découpe des zones d'intérêt en cassettes. Table de macroscopie." },
    { t: "Déshydratation, inclusion", ph: "p", d: "L'eau remplacée par la paraffine, puis le bloc. Automate d'imprégnation, station d'enrobage." },
    { t: "Coupe", ph: "a", d: "Tranches de 3 à 5 µm sur lames de verre. Microtome ; cryostat pour l'examen extemporané." },
    { t: "Coloration", ph: "a", d: "H&E (ou HES), ou techniques spéciales. Automate de coloration, colleuse de lames, automate d'IHC." },
    { t: "Montage, numérisation", ph: "a", d: "Lamelle de protection, ou lame scannée. Scanner de lames." },
    { t: "Examen", ph: "a", d: "Le pathologiste lit les lames et pose le diagnostic. Microscope ou écran." },
    { t: "Compte rendu", ph: "s", d: "Rapport final validé, transmis au clinicien ou au chirurgien." },
    { t: "Archivage", ph: "s", d: "Lames et blocs conservés longtemps, images archivées. Armoires ventilées." }
  ];
  function pos(i) { return i < 5 ? [22 + i * 186, 120] : [22 + (i - 5) * 186, 340]; }
  var zone = R.h("div", null, "", f.direct);
  function dessiner(k) {
    A.vider(g);
    ["p", "a", "s"].forEach(function (cle, j) {
      A.s("rect", { x: 30 + j * 300, y: 30, width: 26, height: 26, rx: 6, fill: PH[cle].f, stroke: PH[cle].c, "stroke-width": 3 }, g);
      A.texte(g, PH[cle].t, [66 + j * 300, 43], { taille: 19, ancre: "start", coul: PH[cle].c, gras: 700 });
    });
    E.forEach(function (e, i) {
      var p = pos(i), on = i === k - 1, fait = i < k - 1, ph = PH[e.ph];
      if (i > 0 && i !== 5) { var q = pos(i - 1); A.fleche(g, [q[0] + 172, q[1] + 75], [p[0] - 2, p[1] + 75], { coul: i < k ? ph.c : C.trait, ep: 4 }); }
      if (i === 5) A.chemin(g, [[pos(4)[0] + 85, 272], [pos(4)[0] + 85, 306], [p[0] + 85, 306], [p[0] + 85, p[1] - 4]], { coul: i < k ? ph.c : C.trait, ep: 4 });
      A.boite(g, p[0], p[1], 170, 150, { fond: on ? ph.f : "#fff", bord: on || fait ? ph.c : C.trait, ep: on ? 4.5 : 2.5, rx: 16 });
      A.texte(g, String(i + 1), [p[0] + 85, p[1] + 40], { taille: 26, gras: 800, mono: true, coul: on || fait ? ph.c : C.gris });
      A.texte(g, e.t, [p[0] + 85, p[1] + 100], { taille: 18, gras: 700, largeur: 152, coul: on || fait ? C.encre : C.doux });
    });
    zone.innerHTML = k ? "<strong>" + k + ". " + E[k - 1].t + "</strong> (" + PH[E[k - 1].ph].t + ") : " + E[k - 1].d : "Dix postes, de l'arrivée du prélèvement au compte rendu archivé.";
  }
  var e = R.etapes(f.reglages, 10, [""].concat(E.map(function (x) { return x.t.toLowerCase(); })), dessiner);
  e.aller(0);
})();
