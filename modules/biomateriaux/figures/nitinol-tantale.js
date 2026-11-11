(function () {
  "use strict";
  var R = RM, C = R.C;
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- L'effet mémoire de forme simple sens ---------- */
  (function () {
    var f = R.figure("fig-memoire", {
      largeur: 960, hauteur: 500, titre: "Effet mémoire de forme simple sens d'un fil de NiTi",
      essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : la phase (réseau à gauche), la forme du fil, la température et la contrainte."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    // phase : A austénite, Mm martensite maclée, Mo martensite orientée ; forme : 0 droite, 1 pliée ; chaud ; charge
    var ET = [
      { ph: "A", fo: 0, ch: 1, q: 0, n: "austénite", d: "À chaud, l'austénite : la forme de départ, droite, est celle que l'alliage « mémorise »." },
      { ph: "Mm", fo: 0, ch: 0, q: 0, n: "refroidissement", d: "Refroidi sans contrainte, l'alliage devient martensite non orientée (maclée, auto-accommodante). La forme ne change pas." },
      { ph: "Mo", fo: 1, ch: 0, q: 1, n: "chargement", d: "Sous contrainte, les variantes de martensite qui accommodent le mieux la déformation progressent : on plie le fil facilement." },
      { ph: "Mo", fo: 1, ch: 0, q: 0, n: "déchargement", d: "La contrainte cesse : il reste une déformation permanente, car la martensite est stable à cette température." },
      { ph: "A", fo: 0, ch: 1, q: 0, n: "chauffage au-dessus de Af", d: "Chauffé sans contrainte au-dessus de Af, l'alliage redevient austénite : le fil reprend sa forme initiale." },
      { ph: "Mm", fo: 0, ch: 0, q: 0, n: "retour à l'ambiante", d: "En refroidissant, la martensite maclée se reforme, sans changer la forme : c'est l'effet simple sens." }
    ];
    // réseau : carré (austénite), en zigzag (martensite maclée), cisaillé dans un seul sens (martensite orientée)
    function reseau(x0, y0, ph) {
      for (var i = 0; i < 5; i++) for (var j = 0; j < 5; j++) {
        var dx = ph === "A" ? 0 : ph === "Mm" ? (j % 2 ? 12 : 0) : 12 * j - 24;
        R.el("circle", { cx: x0 + i * 34 + dx, cy: y0 + j * 34, r: 9, fill: i % 2 === j % 2 ? "#3b5bdb" : "#e5484d" }, g);
      }
    }
    function dessin(k) {
      R.vider(g);
      var e = ET[k];
      R.el("rect", { x: 40, y: 90, width: 250, height: 250, rx: 20, fill: "#fff", stroke: C.trait, "stroke-width": 3 }, g);
      reseau(98, 148, e.ph);
      T(g, e.ph === "A" ? "austénite" : e.ph === "Mm" ? "martensite maclée" : "martensite orientée", [165, 370], { taille: 20, gras: true, couleur: e.ph === "A" ? "#12a26b" : C.acc });
      // fil
      var pts = e.fo ? "380,300 480,300 560,180 660,180" : "380,240 660,240";
      R.el("polyline", { points: pts, fill: "none", stroke: "#5b6172", "stroke-width": 14, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
      T(g, "fil de NiTi", [520, 380], { taille: 18, couleur: C.doux });
      if (e.q) { R.fleche(g, [690, 120], [640, 170], { couleur: "#e5484d", epaisseur: 6, tete: 20 }); T(g, "contrainte", [740, 110], { taille: 18, gras: true, couleur: "#e5484d" }); }
      // thermomètre
      R.el("rect", { x: 830, y: 120, width: 34, height: 220, rx: 17, fill: "#fff", stroke: C.fonce, "stroke-width": 3 }, g);
      var hT = e.ch ? 190 : 60;
      R.el("rect", { x: 838, y: 332 - hT, width: 18, height: hT, rx: 9, fill: e.ch ? "#e5484d" : "#3b5bdb" }, g);
      R.ligne(g, [820, 200], [874, 200], { couleur: C.fonce, epaisseur: 2, tirets: "6 4" });
      T(g, "Af", [900, 200], { taille: 18, gras: true });
      T(g, e.ch ? "chaud" : "froid", [847, 370], { taille: 18, gras: true });
      T(g, (k + 1) + ". " + e.n, [480, 50], { taille: 24, gras: true, couleur: C.acc });
      zone.innerHTML = e.d;
    }
    var nav = R.etapes(f.reglages, ET.length - 1, ET.map(function (e) { return e.n; }), dessin);
    nav.aller(0);
  })();
})();
