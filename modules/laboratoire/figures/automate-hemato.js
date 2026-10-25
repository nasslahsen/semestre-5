/* Figure : architecture fonctionnelle d'un automate d'hématologie, module par module. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-automate-hemato", {
    largeur: 960, hauteur: 540, titre: "Architecture d'un automate d'hématologie",
    essai: "<strong>Essaie</strong> : avance de module en module. <strong>Observe</strong> : le sang devient un signal, le signal des chiffres, les chiffres un compte rendu transmis."
  });
  var g = A.s("g", null, f.svg);
  var M = [
    { t: "Aspiration", x: 40, y: 80, d: "Aiguille, sonde capacitive, détection de niveau : le sang est prélevé dans le tube." },
    { t: "Dilution", x: 350, y: 80, d: "Pompes péristaltiques, vannes, seringues : les dilutions sont préparées." },
    { t: "Mesure", x: 660, y: 80, d: "Chambre de Coulter, laser, photomultiplicateurs : les cellules sont analysées." },
    { t: "Acquisition", x: 660, y: 300, d: "Amplificateurs, convertisseur analogique-numérique, microprocesseur : le signal devient des nombres." },
    { t: "Contrôle qualité", x: 350, y: 300, d: "Contrôles internes et calibration vérifient la mesure." },
    { t: "Gestion des données", x: 40, y: 300, d: "Logiciel, base de données, alarmes : calcul des indices et stockage." },
    { t: "Interface LIS", x: 350, y: 450, d: "HL7, ASTM, middleware : les résultats partent vers le système informatique du laboratoire." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner(k) {
    A.vider(g);
    for (var i = 0; i < M.length - 1; i++) {
      var a = M[i], b = M[i + 1];
      A.relier(g, { x: a.x, y: a.y, w: 260, h: 120 }, { x: b.x, y: b.y, w: 260, h: i + 1 === 6 ? 80 : 120 }, { coul: k > i + 1 ? C.jeu : C.trait, ep: 5 });
    }
    M.forEach(function (m, i) {
      var on = k === i + 1, vu = k >= i + 1;
      A.boite(g, m.x, m.y, 260, i === 6 ? 80 : 120, { fond: on ? C.jeuPale : "#fff", bord: on ? C.jeu : vu ? C.encre : C.trait, ep: on ? 4.5 : 2.5, rx: 14, titre: m.t, taille: 22, coul: vu ? C.encre : C.gris });
    });
    zone.innerHTML = k ? "<strong>" + M[k - 1].t + "</strong> : " + M[k - 1].d : "Avance pour suivre l'échantillon dans l'automate.";
  }
  var e = R.etapes(f.reglages, 7, ["", "aspiration", "dilution", "mesure", "acquisition", "contrôle", "données", "LIS"], dessiner);
  e.aller(0);
})();
