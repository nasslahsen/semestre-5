(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Les biomatériaux dans le corps ---------- */
  (function () {
    var f = R.figure("fig-corps", {
      largeur: 960, hauteur: 560, titre: "Les domaines d'application, organe par organe",
      essai: "<strong>Essaie</strong> : touche un point du corps. <strong>Observe</strong> : la spécialité médicale et ses dispositifs."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct), k = 2;
    var Z = [
      { n: "Ophtalmologie", p: [230, 70], d: ["lentilles", "implants", "coussinets de récupération", "produits visqueux"] },
      { n: "Odontologie", p: [258, 112], d: ["implants dentaires", "restauration, comblement", "orthodontie", "parodonte et pulpe"] },
      { n: "Cardiovasculaire", p: [270, 200], d: ["valves cardiaques", "stents, stimulateurs", "prothèses vasculaires", "cœur artificiel"] },
      { n: "Chirurgie esthétique", p: [215, 190], d: ["implants mammaires", "gel de silicone", "sérum physiologique"] },
      { n: "Endocrinologie", p: [240, 232], d: ["pompes à insuline", "libération contrôlée", "biocapteurs", "pancréas artificiel"] },
      { n: "Urologie, néphrologie", p: [282, 274], d: ["dialyseurs", "dialyse péritonéale", "rein artificiel portable"] },
      { n: "Orthopédie", p: [215, 335], d: ["prothèses de hanche, genou", "vis, plaques, clous", "ligaments artificiels", "comblement osseux"] },
      { n: "Chirurgie générale", p: [345, 260], d: ["drains", "peau artificielle", "colles tissulaires", "produits de contraste"] }
    ];
    function corps(gg) {
      var st = { fill: "#f6efe6", stroke: "#b89b6a", "stroke-width": 3 };
      R.el("circle", Object.assign({ cx: 250, cy: 85, r: 45 }, st), gg);
      R.el("rect", Object.assign({ x: 185, y: 140, width: 130, height: 190, rx: 40 }, st), gg);
      R.el("rect", Object.assign({ x: 140, y: 150, width: 38, height: 170, rx: 19 }, st), gg);
      R.el("rect", Object.assign({ x: 322, y: 150, width: 38, height: 170, rx: 19 }, st), gg);
      R.el("rect", Object.assign({ x: 192, y: 320, width: 50, height: 215, rx: 24 }, st), gg);
      R.el("rect", Object.assign({ x: 258, y: 320, width: 50, height: 215, rx: 24 }, st), gg);
      // cœur, reins, pancréas
      R.el("path", { d: "M270 190 q-10 -14 -22 -4 q-10 10 4 24 l18 16 l18 -16 q14 -14 4 -24 q-12 -10 -22 4z", fill: "#f4c2c2", stroke: "#c0504d", "stroke-width": 2 }, gg);
      R.el("ellipse", { cx: 222, cy: 268, rx: 9, ry: 16, fill: "#e9c7a6", stroke: "#a87b4f", "stroke-width": 2 }, gg);
      R.el("ellipse", { cx: 278, cy: 268, rx: 9, ry: 16, fill: "#e9c7a6", stroke: "#a87b4f", "stroke-width": 2 }, gg);
    }
    function dessin() {
      R.vider(g); corps(g);
      Z.forEach(function (z, i) {
        var b = R.el("g", { style: "cursor:pointer" }, g), sel = i === k;
        R.el("circle", { cx: z.p[0], cy: z.p[1], r: 30, fill: "transparent" }, b);
        R.el("circle", { cx: z.p[0], cy: z.p[1], r: sel ? 15 : 11, fill: sel ? C.acc : "#fff", stroke: C.acc, "stroke-width": 4 }, b);
        b.addEventListener("click", function () { k = i; dessin(); });
      });
      var z = Z[k];
      R.ligne(g, [z.p[0] + 16, z.p[1]], [470, 120], { couleur: C.acc, epaisseur: 2.5, tirets: "6 5" });
      R.el("rect", { x: 470, y: 70, width: 460, height: 80, rx: 18, fill: PLATEFORME.teinte(0.15), stroke: C.acc, "stroke-width": 3 }, g);
      T(g, z.n, [700, 110], { taille: 26, gras: true });
      z.d.forEach(function (d, i) {
        R.el("rect", { x: 490, y: 180 + i * 80, width: 420, height: 62, rx: 14, fill: "#fff", stroke: C.fonce, "stroke-width": 2 }, g);
        T(g, d, [700, 211 + i * 80], { taille: 20, halo: false });
      });
      zone.innerHTML = "<strong>" + z.n + "</strong> : " + z.d.join(", ") + ".";
    }
    dessin();
  })();
})();
