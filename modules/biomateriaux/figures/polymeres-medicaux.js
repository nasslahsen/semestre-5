(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Fiches des polymères médicaux ---------- */
  (function () {
    var f = R.figure("fig-fiches", {
      largeur: 960, hauteur: 520, titre: "Fiches des polymères médicaux du cours",
      essai: "<strong>Essaie</strong> : touche un polymère. <strong>Observe</strong> : son profil et où on le trouve. Dans le corps ou en dehors ?"
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct), k = 0;
    var P = [
      { n: "UHMWPE", p: ["faible frottement", "usure, chocs, abrasion", "très biocompatible"], a: "cotyles de hanche, plateaux tibiaux", dedans: true },
      { n: "PEEK", p: ["léger et solide", "radio-opaque", "stable à chaud"], a: "implants rachidiens, traumatologie, couronnes", dedans: true },
      { n: "PC", p: ["transparent", "robuste", "résiste à la stérilisation"], a: "voir le sang et les fluides dans un appareil", dedans: false },
      { n: "PEI", p: ["rigide, ambré", "tient 180 °C", "autoclave et gamma"], a: "poignées d'instruments, boîtiers", dedans: false },
      { n: "PSU", p: ["ambré, rigide à chaud", "résiste aux chocs", "plus de 1000 cycles vapeur"], a: "boîtiers de filtres, plateaux d'instruments", dedans: false },
      { n: "silicone", p: ["souple à rigide", "−55 °C à 210 °C", "hydrophobe"], a: "implants mammaires, pacemaker (isolant)", dedans: true },
      { n: "PTFE", p: ["superlubrifiant", "Téflon"], a: "implants vasculaires, chirurgie faciale", dedans: true },
      { n: "PMMA", p: ["transparent", "venu des cockpits"], a: "lentilles intraoculaires, ciment orthopédique", dedans: true }
    ];
    function dessin() {
      R.vider(g);
      P.forEach(function (x, i) {
        var bx = 30 + (i % 2) * 175, by = 30 + Math.floor(i / 2) * 120, sel = i === k, b = R.el("g", { style: "cursor:pointer" }, g);
        R.el("rect", { x: bx, y: by, width: 160, height: 100, rx: 16, fill: sel ? PLATEFORME.teinte(0.2) : "#fff", stroke: sel ? C.acc : C.fonce, "stroke-width": sel ? 5 : 2 }, b);
        T(b, x.n, [bx + 80, by + 52], { taille: 22, gras: true, halo: false });
        b.addEventListener("click", function () { k = i; dessin(); });
      });
      var x = P[k];
      R.el("rect", { x: 420, y: 30, width: 510, height: 460, rx: 22, fill: "#fff", stroke: C.acc, "stroke-width": 3 }, g);
      T(g, x.n, [675, 80], { taille: 30, gras: true, couleur: C.acc });
      x.p.forEach(function (q, i) { R.el("circle", { cx: 470, cy: 150 + i * 50, r: 7, fill: C.acc }, g); T(g, q, [490, 150 + i * 50], { taille: 21, ancre: "start" }); });
      T(g, "où on le trouve", [675, 330], { taille: 17, couleur: C.doux });
      var mots = x.a.split(", ");
      mots.forEach(function (m, i) { T(g, m, [675, 365 + i * 32], { taille: 20, gras: true }); });
      R.el("rect", { x: 560, y: 440, width: 230, height: 36, rx: 18, fill: x.dedans ? "#e3f7ee" : "#f4f5f8" }, g);
      T(g, x.dedans ? "implanté" : "hors du corps", [675, 459], { taille: 17, gras: true, couleur: x.dedans ? "#12a26b" : C.doux, halo: false });
      zone.innerHTML = "<strong>" + x.n + "</strong> : " + x.p.join(", ") + ". " + x.a.charAt(0).toUpperCase() + x.a.slice(1) + ".";
    }
    dessin();
  })();
})();
