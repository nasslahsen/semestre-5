(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Une exigence par zone de la prothèse ---------- */
  (function () {
    var f = R.figure("fig-classes", {
      largeur: 960, hauteur: 520, titre: "Prothèse de hanche : une exigence par zone",
      essai: "<strong>Essaie</strong> : touche une zone de la prothèse. <strong>Observe</strong> : l'exigence principale et la famille de matériau qu'on y met souvent."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct), k = 0;
    var Z = [
      { n: "surface de contact", e: "résistance à l'usure", m: "céramique ou métal contre polyéthylène", p: [300, 150] },
      { n: "tige", e: "rigidité et résistance à la fatigue", m: "métal : alliage de titane, CoCr, inox", p: [262, 330] },
      { n: "contact avec l'os", e: "compatibilité avec le tissu, résistance à la corrosion", m: "surface traitée ou revêtue", p: [222, 450] }
    ];
    function dessin() {
      R.vider(g);
      // bassin et fémur schématiques
      R.el("path", { d: "M150 140 Q170 40 300 40 Q430 40 470 120 Q420 170 350 150 Q330 110 290 112 Q250 116 240 160 Z", fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      R.el("path", { d: "M215 230 Q240 200 280 214 L300 250 Q270 300 268 380 L270 500 L180 500 L186 380 Q178 290 215 230 Z", fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      // cotyle, tête, col et tige
      R.el("path", { d: "M242 152 A58 58 0 0 1 358 152 L340 152 A40 40 0 0 0 260 152 Z", fill: k === 0 ? C.acc : "#a9b0bc", stroke: C.fonce, "stroke-width": 3 }, g);
      R.el("circle", { cx: 300, cy: 160, r: 36, fill: k === 0 ? PLATEFORME.teinte(0.5) : "#efe3cc", stroke: C.fonce, "stroke-width": 3 }, g);
      R.el("path", { d: "M286 186 L310 200 Q262 260 258 330 L246 470 Q240 486 232 470 L222 330 Q222 250 270 186 Z", fill: k === 1 ? C.acc : "#c3c8d2", stroke: C.fonce, "stroke-width": 3 }, g);
      if (k === 2) R.el("path", { d: "M218 360 L226 470 Q232 490 246 470 L254 360", fill: "none", stroke: "#12a26b", "stroke-width": 9, "stroke-linecap": "round" }, g);
      Z.forEach(function (z, i) {
        var b = R.el("g", { style: "cursor:pointer" }, g);
        R.el("circle", { cx: z.p[0], cy: z.p[1], r: 34, fill: "transparent" }, b);
        R.el("circle", { cx: z.p[0], cy: z.p[1], r: i === k ? 13 : 10, fill: i === k ? "#fff" : C.acc, stroke: C.acc, "stroke-width": 4 }, b);
        b.addEventListener("click", function () { k = i; dessin(); });
      });
      var z = Z[k];
      R.ligne(g, [z.p[0] + 14, z.p[1]], [520, 150 + k * 0], { couleur: C.acc, epaisseur: 2.5, tirets: "6 5" });
      R.el("rect", { x: 520, y: 100, width: 410, height: 100, rx: 18, fill: PLATEFORME.teinte(0.15), stroke: C.acc, "stroke-width": 3 }, g);
      T(g, z.n, [725, 150], { taille: 26, gras: true });
      T(g, "exigence", [725, 250], { taille: 17, couleur: C.doux });
      var mots = z.e.split(", ");
      mots.forEach(function (m, i) { T(g, m, [725, 285 + i * 32], { taille: 21, gras: true }); });
      T(g, "souvent", [725, 380], { taille: 17, couleur: C.doux });
      T(g, z.m, [725, 412], { taille: 19 });
      zone.innerHTML = "<strong>" + z.n.charAt(0).toUpperCase() + z.n.slice(1) + "</strong> : " + z.e + ". Aucun matériau ne fait tout : on en met plusieurs dans le même implant.";
    }
    dessin();
  })();

  /* ---------- Relargage et corrosion galvanique ---------- */
  (function () {
    var f = R.figure("fig-ions", {
      largeur: 960, hauteur: 440, titre: "Deux implants métalliques dans le même os (allure)",
      essai: "<strong>Essaie</strong> : mets les deux implants en contact, puis fais passer le temps. <strong>Observe</strong> : en contact, l'un des deux se corrode plus vite et libère plus d'ions. Allure qualitative."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var contact = R.bascule(f.reglages, "Implants en contact", false, dessin);
    var cT = R.curseur(f.reglages, { nom: "Temps", min: 0, max: 10, pas: 1, val: 4, unite: " ans", surChange: dessin });
    function dessin() {
      R.vider(g);
      var c = contact.checked, t = cT.v / 10;
      R.el("rect", { x: 60, y: 60, width: 840, height: 320, rx: 40, fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      T(g, "os et fluides (milieu salé)", [480, 90], { taille: 18, couleur: "#8a6d3b" });
      var xa = c ? 400 : 330, xb = c ? 480 : 560;
      R.el("rect", { x: xa - 80, y: 150, width: 80, height: 180, rx: 12, fill: "#c3c8d2", stroke: C.fonce, "stroke-width": 3 }, g);
      R.el("rect", { x: xb, y: 150, width: 80, height: 180, rx: 12, fill: "#9fb2c9", stroke: C.fonce, "stroke-width": 3 }, g);
      T(g, "inox", [xa - 40, 240], { taille: 20, gras: true, halo: false });
      T(g, "titane", [xb + 40, 240], { taille: 20, gras: true, halo: false });
      var nb = Math.round((c ? 40 : 10) * t);
      for (var i = 0; i < nb; i++) {
        var a = i * 2.4, r = 30 + (i * 37) % 110;
        R.el("circle", { cx: xa - 40 + Math.cos(a) * (r + 40), cy: 240 + Math.sin(a) * r * 0.9, r: 6, fill: "#e5484d", opacity: 0.8 }, g);
      }
      T(g, "ions libérés", [160, 350], { taille: 17, couleur: "#e5484d", gras: true });
      zone.innerHTML = c ? "En contact, l'inox se corrode plus vite : <strong>corrosion galvanique</strong>. Les ions libérés forment des complexes métallo-protéiques, nuisent aux cellules voisines, et peuvent mener au descellement." : "Séparés, les deux métaux cohabitent dans le même os sans problème : le cours le dit, tant qu'ils ne se touchent pas.";
    }
    dessin();
  })();
})();
