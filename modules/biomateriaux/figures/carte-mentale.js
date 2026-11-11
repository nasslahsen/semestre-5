(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- La carte mentale du module ---------- */
  (function () {
    var f = R.figure("fig-arbre", {
      largeur: 960, hauteur: 560, titre: "Carte mentale du module : parties, chapitres, notions",
      essai: "<strong>Essaie</strong> : touche un chapitre. <strong>Observe</strong> : sa branche s'allume, ses notions apparaissent à droite, et les idées à retenir s'affichent sous la carte."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var PARTIES = [["Le", "biomatériau"], ["Comparer des", "matériaux"], ["Matériaux", "d'implant"], ["Travailler les", "polymères"]];
    // chapitre : numéro affiché, id de la page de chapitre, partie, titre court, notions, à retenir
    var CH = [
      [1, 1, 0, "Biomatériaux et DM", ["définitions", "4 générations", "dispositif médical", "classes I à III", "implant, prothèse, greffe", "ingénierie tissulaire", "nanomédecine", "marché"], "Un dispositif médical agit sans voie pharmacologique. Classes I à III selon le caractère invasif, la durée, la partie du corps. Une greffe est vivante, un implant non."],
      [2, 8, 0, "Histoire et exigences", ["historique", "critères de Chester", "choisir et valider", "domaines d'application"], "Trois critères : contact avec le vivant, plus de quelques heures, non vivant. On exige biocompatibilité et biofonctionnalité."],
      [3, 0, 1, "Bases de mécanique", ["contrainte, déformation", "courbe de traction", "échelle log des modules", "masse volumique"], "σ = F/S₀, ε = Δl/l₀, σ = E ε : le module E est la rigidité. La ténacité est l'aire sous la courbe."],
      [4, 2, 1, "Familles de matériaux", ["liaisons", "métaux", "céramiques", "polymères", "comparer les familles"], "Les propriétés viennent des liaisons : métal ductile et conducteur, céramique dure et fragile, polymère souple."],
      [5, 9, 2, "Métaux d'implant", ["problèmes des métaux", "inox 316L", "cobalt-chrome", "titane", "NiTi et tantale", "comparaison, surfaces"], "Inox 316L : temporaire. Cobalt-chrome : dur, s'use peu. Titane : proche de l'os, moins de stress-shielding."],
      [6, 10, 2, "Biocéramiques", ["inertes ou résorbables", "alumine et zircone", "carbone pyrolytique", "céramiques résorbables"], "Dures et inusables mais fragiles. Alumine, zircone : têtes de hanche. Hydroxyapatite : remplacée par l'os."],
      [7, 3, 2, "Structure des polymères", ["macromolécules", "masse moléculaire", "états amorphes, Tg", "semi-cristallins, Tf", "taux de cristallinité", "historique"], "Sous Tg : vitreux, rigide ; au-dessus : caoutchouteux. Un semi-cristallin reste opaque jusqu'à Tf. ρ = ρc X + ρa (1 − X)."],
      [8, 11, 2, "Polymères biomédicaux", ["viscoélasticité", "polymères médicaux", "matériaux naturels"], "Un polymère est ressort et amortisseur à la fois. UHMWPE : inserts. PEEK : rachis. Collagène : hémostatique."],
      [9, 4, 3, "Élastomères", ["élastomères", "élasticité caoutchoutique", "vulcanisation", "formulation"], "Un élastomère s'étire beaucoup et revient. La vulcanisation crée des ponts entre les chaînes."],
      [10, 5, 3, "Additifs et renforts", ["adjuvants", "plastifiants", "charges et renforts", "verre, carbone, aramide"], "Plastifiant : plus souple, Tg plus basse. Plus une charge est allongée, plus elle rigidifie."],
      [11, 6, 3, "Composites", ["renfort et matrice", "isotrope, orthotrope", "loi des mélanges", "module transversal", "orientation des fibres"], "Dans le sens des fibres, les fibres travaillent : E_CL = E_f φ_f + E_m φ_m. Toujours E_CL > E_CT."],
      [12, 7, 3, "Procédés", ["extrusion", "injection", "soufflage", "rotomoulage, thermoformage", "compression", "choisir le procédé"], "Chaque procédé a son indice : section constante, point d'injection, découpe au pourtour, bavure."]
    ];
    var sel = -1;
    var yCh = function (i) { return 34 + i * 41; };
    var xR = 8, xP = 150, xC = 385, xF = 690;
    var bOuvrir;
    function partieY(p) { var l = CH.map(function (c, i) { return c[2] === p ? yCh(i) : null; }).filter(function (y) { return y !== null; }); return (l[0] + l[l.length - 1]) / 2; }
    function courbe(a, b, actif) {
      var mx = (a[0] + b[0]) / 2;
      R.el("path", { d: "M" + a[0] + " " + a[1] + " C" + mx + " " + a[1] + " " + mx + " " + b[1] + " " + b[0] + " " + b[1], fill: "none", stroke: actif ? C.acc : "#d6d9e0", "stroke-width": actif ? 4 : 2.5 }, g);
    }
    function dessin() {
      R.vider(g);
      var pSel = sel >= 0 ? CH[sel][2] : -1, yRoot = 280;
      // liens
      PARTIES.forEach(function (p, k) { courbe([xR + 128, yRoot], [xP, partieY(k)], k === pSel); });
      CH.forEach(function (c, i) { courbe([xP + 200, partieY(c[2])], [xC, yCh(i)], i === sel); });
      // racine
      R.el("rect", { x: xR, y: yRoot - 28, width: 128, height: 56, rx: 28, fill: C.acc }, g);
      T(g, "Biomatériaux", [xR + 64, yRoot + 1], { taille: 18, gras: true, couleur: "#fff", halo: false });
      // parties
      PARTIES.forEach(function (p, k) {
        var y = partieY(k), a = k === pSel;
        R.el("rect", { x: xP, y: y - 30, width: 200, height: 60, rx: 14, fill: a ? PLATEFORME.teinte(0.2) : "#fff", stroke: a ? C.acc : C.fonce, "stroke-width": a ? 3 : 2 }, g);
        T(g, (k + 1) + ". " + p[0], [xP + 100, y - 11], { taille: 18, gras: true, halo: false });
        T(g, p[1], [xP + 100, y + 13], { taille: 18, gras: true, halo: false });
      });
      // chapitres
      CH.forEach(function (c, i) {
        var y = yCh(i), a = i === sel, b = R.el("g", { style: "cursor:pointer" }, g);
        R.el("rect", { x: xC, y: y - 19, width: 268, height: 38, rx: 10, fill: a ? C.acc : "#fff", stroke: a ? C.acc : "#9aa0ad", "stroke-width": 2 }, b);
        T(b, c[0] + ". " + c[3], [xC + 12, y + 1], { taille: 18, gras: a, ancre: "start", couleur: a ? "#fff" : C.fonce, halo: false });
        b.addEventListener("click", function () { sel = i; dessin(); });
      });
      // notions du chapitre choisi
      if (sel < 0) {
        T(g, "touche un chapitre", [xF + 131, 270], { taille: 19, couleur: C.doux });
        T(g, "pour voir ses notions", [xF + 131, 298], { taille: 19, couleur: C.doux });
        zone.innerHTML = "Le module en une image : 4 parties, 12 chapitres. Touche un chapitre pour voir ses notions et ce qu'il faut en retenir.";
        if (bOuvrir) bOuvrir.disabled = true;
        return;
      }
      var c = CH[sel], n = c[4].length, h = 40, y0 = Math.max(24, Math.min(560 - 24 - n * h, yCh(sel) - (n - 1) * h / 2));
      c[4].forEach(function (t, k) {
        var y = y0 + k * h + 18;
        courbe([xC + 268, yCh(sel)], [xF, y], true);
        R.el("rect", { x: xF, y: y - 17, width: 262, height: 34, rx: 17, fill: PLATEFORME.teinte(0.12), stroke: C.acc, "stroke-width": 1.5 }, g);
        T(g, t, [xF + 131, y + 1], { taille: 18, halo: false });
      });
      zone.innerHTML = "<strong>Chapitre " + c[0] + " à retenir</strong> : " + c[5];
      if (bOuvrir) bOuvrir.disabled = false;
    }
    var b = R.boutons(f.reglages);
    bOuvrir = R.bouton(b, "Ouvrir ce chapitre", function () {
      if (sel < 0) return;
      var dans = /\/chapitres\//.test(location.pathname);
      location.href = (dans ? "" : "../chapitres/") + "chapitre-" + CH[sel][1] + ".html";
    });
    dessin();
  })();
})();
