(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Le fil du module : la prothèse de hanche ---------- */
  (function () {
    var f = R.figure("fig-fil", {
      largeur: 960, hauteur: 520, titre: "Le fil du module : la prothèse totale de hanche, partie par partie",
      essai: "<strong>Essaie</strong> : passe d'une partie du module à l'autre. <strong>Observe</strong> : le morceau de la prothèse qu'elle éclaire, et les chapitres qui en parlent."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct), k = 0;
    var P = [
      { n: "1. Le biomatériau", ch: ["1. Biomatériaux et dispositifs médicaux", "2. Histoire, exigences et applications"], q: "C'est quoi, cet objet, et que doit-il supporter dans le corps ?" },
      { n: "2. Comparer des matériaux", ch: ["3. Les bases de mécanique", "4. Les familles de matériaux"], q: "Quelle force, quelle déformation, quelle rigidité ?" },
      { n: "3. Les matériaux d'implant", ch: ["5. Métaux", "6. Biocéramiques", "7. Structure des polymères", "8. Polymères biomédicaux"], q: "Quel matériau pour la tige, la tête, l'insert ?" },
      { n: "4. Travailler les polymères", ch: ["9. Élastomères", "10. Additifs et renforts", "11. Composites", "12. Procédés"], q: "Comment modifier et fabriquer la pièce en plastique ?" }
    ];
    var b = R.boutons(f.reglages);
    P.forEach(function (p, i) { R.bouton(b, "Partie " + (i + 1), function () { k = i; dessin(); }); });
    function anneau(cx, cy, r1, r2) {
      var Pt = function (r, a) { return (cx + r * Math.cos(a)).toFixed(1) + " " + (cy - r * Math.sin(a)).toFixed(1); };
      return "M" + Pt(r2, 0.1) + " A" + r2 + " " + r2 + " 0 0 0 " + Pt(r2, Math.PI - 0.1) + " L" + Pt(r1, Math.PI - 0.1) + " A" + r1 + " " + r1 + " 0 0 1 " + Pt(r1, 0.1) + " Z";
    }
    function dessin() {
      R.vider(g);
      var cx = 230, cy = 150, a = C.acc, gris = "#c3c8d2";
      // bassin et fémur
      R.el("path", { d: "M70 140 Q90 40 230 40 Q370 40 410 120 Q360 170 290 150 Q270 110 230 112 Q190 116 180 160 Z", fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      R.el("path", { d: "M150 230 Q176 200 218 214 L238 250 Q208 300 206 380 L210 500 L114 500 L120 380 Q112 290 150 230 Z", fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      var tous = k === 0;
      R.el("path", { d: anneau(cx, cy, 52, 70), fill: tous || k === 2 ? a : gris, stroke: C.fonce, "stroke-width": 3 }, g);
      R.el("path", { d: anneau(cx, cy, 38, 52), fill: k === 3 || tous ? PLATEFORME.teinte(0.7) : k === 2 ? "#f2f2f2" : "#fff", stroke: C.fonce, "stroke-width": 3 }, g);
      R.el("circle", { cx: cx, cy: cy + 6, r: 36, fill: tous || k === 2 ? "#efe3cc" : "#fff", stroke: C.fonce, "stroke-width": 3 }, g);
      R.el("path", { d: "M216 182 L242 198 Q196 260 192 340 L180 470 Q174 488 166 470 L156 340 Q156 250 200 182 Z", fill: tous || k === 2 ? "#9fb2c9" : gris, stroke: C.fonce, "stroke-width": 3 }, g);
      if (k === 1) {
        R.fleche(g, [cx, 20], [cx, 96], { couleur: "#e5484d", epaisseur: 6, tete: 20 });
        T(g, "F", [cx + 26, 40], { taille: 24, gras: true, couleur: "#e5484d" });
        T(g, "σ = F / S₀", [330, 330], { taille: 22, gras: true, couleur: a, ancre: "start" });
        T(g, "σ = E ε", [330, 370], { taille: 22, gras: true, couleur: a, ancre: "start" });
      }
      if (k === 2) {
        [["tige : titane", 330, 360], ["tête : céramique", 330, 230], ["insert : UHMWPE", 330, 175], ["cupule : métal", 330, 120]].forEach(function (l) { T(g, l[0], [l[1], l[2]], { taille: 18, gras: true, ancre: "start" }); });
      }
      if (k === 3) T(g, "insert en polymère : moulé, renforcé", [300, 175], { taille: 18, gras: true, ancre: "start", couleur: a });
      if (k === 0) T(g, "dispositif médical, classe III", [250, 300], { taille: 18, gras: true, ancre: "start", couleur: a });
      // à droite : la partie, sa question, ses chapitres
      var p = P[k];
      R.el("rect", { x: 560, y: 30, width: 380, height: 70, rx: 18, fill: PLATEFORME.teinte(0.15), stroke: a, "stroke-width": 3 }, g);
      T(g, p.n, [750, 65], { taille: 22, gras: true });
      p.ch.forEach(function (c, i) {
        R.el("rect", { x: 565, y: 230 + i * 62, width: 370, height: 50, rx: 12, fill: "#fff", stroke: C.fonce, "stroke-width": 2 }, g);
        T(g, c, [750, 256 + i * 62], { taille: 17, halo: false });
      });
      var mots = p.q.split(" "), l1 = [], l2 = [];
      mots.forEach(function (m) { (l1.join(" ").length < 30 ? l1 : l2).push(m); });
      T(g, l1.join(" "), [750, 145], { taille: 18, couleur: C.doux });
      T(g, l2.join(" "), [750, 172], { taille: 18, couleur: C.doux });
      zone.innerHTML = "<strong>" + p.n + "</strong> : " + p.q;
    }
    dessin();
  })();
})();
