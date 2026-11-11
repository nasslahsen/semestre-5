(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- D'où viennent les biomatériaux naturels ---------- */
  (function () {
    var f = R.figure("fig-naturels", {
      largeur: 960, hauteur: 500, titre: "Les biomatériaux naturels et leur origine",
      essai: "<strong>Essaie</strong> : touche une origine. <strong>Observe</strong> : le matériau qu'on en tire et ses usages."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct), k = 0;
    var O = [
      { o: "peau animale, placenta", m: "collagène", u: ["pansements hémostatiques", "peau artificielle", "implants oculaires"], p: [130, 130] },
      { o: "carapace de crabe", m: "chitine", u: ["fils de suture", "chirurgie reconstructive", "peau artificielle"], p: [330, 130] },
      { o: "algues marines", m: "fucanes", u: ["anticoagulants", "anticomplémentaires"], p: [130, 340] },
      { o: "plantes", m: "cellulose", u: ["membranes de dialyse", "ciment de hanche (à l'étude)"], p: [330, 340] },
      { o: "récif", m: "corail", u: ["orthopédie", "maxillo-facial", "recolonisé par l'os"], p: [230, 450] }
    ];
    function icone(b, i, p, sel) {
      var st = { stroke: sel ? C.acc : C.fonce, "stroke-width": sel ? 5 : 3 };
      if (i === 0) R.el("rect", Object.assign({ x: p[0] - 45, y: p[1] - 35, width: 90, height: 70, rx: 20, fill: "#f6d9c7" }, st), b);
      if (i === 1) { R.el("ellipse", Object.assign({ cx: p[0], cy: p[1], rx: 48, ry: 32, fill: "#f29e7a" }, st), b); R.ligne(b, [p[0] - 46, p[1] - 10], [p[0] - 70, p[1] - 34], { couleur: C.fonce, epaisseur: 3 }); R.ligne(b, [p[0] + 46, p[1] - 10], [p[0] + 70, p[1] - 34], { couleur: C.fonce, epaisseur: 3 }); }
      if (i === 2) R.el("path", Object.assign({ d: "M" + p[0] + " " + (p[1] + 40) + " q-30 -40 0 -80 q30 40 0 80 M" + (p[0] - 20) + " " + (p[1] + 40) + " q-40 -30 -20 -70 M" + (p[0] + 20) + " " + (p[1] + 40) + " q40 -30 20 -70", fill: "#b9e3c6" }, st), b);
      if (i === 3) R.el("path", Object.assign({ d: "M" + p[0] + " " + (p[1] + 40) + " L" + p[0] + " " + (p[1] - 10) + " M" + p[0] + " " + (p[1] - 10) + " q-50 -10 -40 -40 q30 0 40 40 q10 -40 40 -40 q10 30 -40 40", fill: "#cfe8b0" }, st), b);
      if (i === 4) R.el("path", Object.assign({ d: "M" + (p[0] - 50) + " " + (p[1] + 30) + " L" + (p[0] - 20) + " " + (p[1] - 20) + " L" + (p[0] - 5) + " " + (p[1] + 10) + " L" + (p[0] + 15) + " " + (p[1] - 35) + " L" + (p[0] + 50) + " " + (p[1] + 30) + " Z", fill: "#f7b2a6" }, st), b);
    }
    function dessin() {
      R.vider(g);
      O.forEach(function (x, i) {
        var b = R.el("g", { style: "cursor:pointer" }, g), sel = i === k;
        R.el("circle", { cx: x.p[0], cy: x.p[1], r: 62, fill: "transparent" }, b);
        icone(b, i, x.p, sel);
        b.addEventListener("click", function () { k = i; dessin(); });
      });
      var x = O[k];
      R.el("rect", { x: 480, y: 40, width: 450, height: 420, rx: 22, fill: "#fff", stroke: C.acc, "stroke-width": 3 }, g);
      T(g, x.m, [705, 100], { taille: 32, gras: true, couleur: C.acc });
      T(g, "origine : " + x.o, [705, 150], { taille: 19, couleur: C.doux });
      x.u.forEach(function (u, i) { R.el("rect", { x: 520, y: 200 + i * 75, width: 370, height: 56, rx: 14, fill: PLATEFORME.teinte(0.12) }, g); T(g, u, [705, 228 + i * 75], { taille: 20, halo: false }); });
      zone.innerHTML = "<strong>" + x.m.charAt(0).toUpperCase() + x.m.slice(1) + "</strong> (" + x.o + ") : " + x.u.join(", ") + ".";
    }
    dessin();
  })();
})();
