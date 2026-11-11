(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Du calcul au patient ---------- */
  (function () {
    var f = R.figure("fig-chemin", {
      largeur: 960, hauteur: 460, titre: "Le chemin d'un biomatériau, du calcul au suivi des patients",
      essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : on va du plus sûr au plus risqué ; le vivant n'arrive qu'après les calculs et les machines."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var ET = [
      { n: "calculs", f: "1", d: "Calculs et simulations : contraintes, déformations, interfaces, simulation des milieux vivants." },
      { n: "essais mécaniques", f: "2", d: "Tests à la rupture, bancs d'essais (usure, écoulements), simulateurs articulaires et vasculaires." },
      { n: "cellules", f: "3", d: "Cultures cellulaires : fibroblastes, ostéoblastes, cellules endothéliales (in vitro)." },
      { n: "animaux", f: "3", d: "Modèles animaux (in vivo)." },
      { n: "organisme notifié", f: "L", d: "Le marquage passe par un organisme notifié, qui examine les tests sur bancs, in vitro et in vivo." },
      { n: "homme", f: "3", d: "Passage à l'homme selon un protocole très strict ; suivi clinique et radiologique." },
      { n: "commercialisation", f: "L", d: "Commercialisation, avec une procédure qualité." },
      { n: "suivi", f: "L", d: "Procédure de suivi : recueil des résultats, échecs, survie ; comparaison avec un produit plus ancien. La seule vraie sécurité." }
    ];
    var nav;
    function dessin(k) {
      R.vider(g);
      ET.forEach(function (e, i) {
        var x = 70 + i * 117, y = i % 2 ? 250 : 170, fait = i <= k;
        if (i) R.ligne(g, [70 + (i - 1) * 117, (i - 1) % 2 ? 250 : 170], [x, y], { couleur: i <= k ? C.acc : "#d0d4dc", epaisseur: 5 });
      });
      ET.forEach(function (e, i) {
        var x = 70 + i * 117, y = i % 2 ? 250 : 170, fait = i <= k, b = R.el("g", { style: "cursor:pointer" }, g);
        R.el("circle", { cx: x, cy: y, r: i === k ? 30 : 22, fill: fait ? (i === k ? C.acc : PLATEFORME.teinte(0.35)) : "#fff", stroke: fait ? C.acc : C.fonce, "stroke-width": 4 }, b);
        T(b, String(i + 1), [x, y + 1], { taille: 18, gras: true, couleur: i === k ? "#fff" : C.fonce, halo: false });
        var mots = e.n.split(" ");
        mots.forEach(function (m, j) { T(b, m, [x, (i % 2 ? y + 52 : y - 52 - (mots.length - 1) * 22) + j * 22], { taille: 17, gras: i === k }); });
        b.addEventListener("click", function () { nav.aller(i); });
      });
      // risque et coût qui montent
      R.fleche(g, [70, 400], [890, 400], { couleur: C.doux, epaisseur: 3 });
      T(g, "du plus sûr au plus risqué (et au plus coûteux)", [480, 428], { taille: 17, couleur: C.doux });
      zone.innerHTML = "<strong>Étape " + (k + 1) + "</strong> : " + ET[k].d;
    }
    nav = R.etapes(f.reglages, ET.length - 1, ET.map(function (e) { return e.n; }), dessin);
    nav.aller(0);
  })();
})();
