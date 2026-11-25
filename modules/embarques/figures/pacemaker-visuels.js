// Projet pacemaker : détection à seuil (période réfractaire) et stimulation à la demande (VVI).
// Chaque figure ne se dessine que si sa place est sur la page.
(function () {
  "use strict";
  var R = RM, C = EMB.C, el = EMB.el, tx = EMB.texte, vg = EMB.virgule;
  function place(id) { return document.getElementById(id); }

  // ECG simulé (codes ADC 12 bits) : onde R crochetée (deux sommets), onde T à 300 ms ; t en ms depuis l'onde R
  function battement(u) {
    var base = 1240;
    function bosse(c, l, h) { var z = (u - c) / l; return h * Math.exp(-z * z); }
    return base + bosse(10, 6, 1960) - bosse(25, 6, 500) + bosse(40, 6, 1660) + bosse(300, 45, 860) + bosse(-150, 25, 260);
  }

  /* ---------- Questions 13 et 14 : seuil et période réfractaire ---------- */
  if (place("fig-pacemaker-detection")) (function () {
    var f = R.figure("fig-pacemaker-detection", { largeur: 960, hauteur: 540, titre: "Détection des ondes R sur un ECG simulé à 75 bpm",
      essai: "<strong>Essaie</strong> : mets la période réfractaire à 0, puis baisse le seuil vers 2000. <strong>Observe</strong> : sans période réfractaire, l'onde R à deux sommets compte double ; avec un seuil trop bas et une période réfractaire courte, l'onde T est prise pour un battement. La fréquence affichée devient fausse.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cs = R.curseur(f.reglages, { nom: "Seuil", min: 1500, max: 3400, pas: 50, val: 2500, surChange: dessiner });
    var cr = R.curseur(f.reglages, { nom: "Réfractaire", min: 0, max: 400, pas: 10, val: 250, unite: " ms", surChange: dessiner });
    var x0 = 70, W = 860, y0 = 450, H = 380, TMAX = 2400, RR = 800, HYS = 200;
    function X(t) { return x0 + t / TMAX * W; }
    function Y(c) { return y0 - c / 4095 * H; }
    function signal(t) { var u = ((t - 200) % RR + RR) % RR; if (u > RR - 200) u -= RR; return battement(u); }
    function dessiner() {
      EMB.vider(g);
      var seuil = cs.v, refr = cr.v;
      el("line", { x1: x0, y1: y0, x2: x0 + W, y2: y0, stroke: C.encre, "stroke-width": 2.5 }, g);
      el("line", { x1: x0, y1: y0, x2: x0, y2: y0 - H - 10, stroke: C.encre, "stroke-width": 2.5 }, g);
      for (var u = 0; u <= TMAX; u += 400) {
        el("line", { x1: X(u), y1: y0, x2: X(u), y2: y0 + 8, stroke: C.encre, "stroke-width": 2 }, g);
        tx(g, String(u), [X(u), y0 + 28], { taille: 16, mono: true, gras: false });
      }
      tx(g, "t (ms)", [x0 + W, y0 + 56], { taille: 16, ancre: "end", gras: false });
      tx(g, "code ADC", [x0 + 8, 40], { taille: 16, ancre: "start", gras: false });
      // détection, échantillon toutes les 2 ms
      var dern = -1e9, au = false, det = [], d = "";
      for (var t = 0; t <= TMAX; t += 2) {
        var v = signal(t);
        d += (d ? " L" : "M") + X(t).toFixed(1) + " " + Y(v).toFixed(1);
        if (t - dern < refr) continue;
        if (!au && v > seuil) { au = true; det.push(t); dern = t; }
        else if (au && v < seuil - HYS) au = false;
      }
      // périodes réfractaires
      det.forEach(function (t) { el("rect", { x: X(t), y: y0 - H, width: Math.max(1, X(t + refr) - X(t)), height: H, fill: C.clair, opacity: 0.55 }, g); });
      el("path", { d: d, fill: "none", stroke: C.encre, "stroke-width": 3 }, g);
      el("line", { x1: x0, y1: Y(seuil), x2: x0 + W, y2: Y(seuil), stroke: C.acc, "stroke-width": 2.5, "stroke-dasharray": "10 6" }, g);
      tx(g, "seuil " + seuil, [x0 + W - 4, Y(seuil) - 18], { taille: 16, ancre: "end", coul: C.acc });
      det.forEach(function (t) {
        el("circle", { cx: X(t), cy: Y(seuil), r: 8, fill: C.ko, stroke: "#fff", "stroke-width": 2 }, g);
        EMB.fleche(g, [X(t), 72], [X(t), 104], { coul: C.ko, ep: 3 });
      });
      tx(g, "détections", [x0 + 8, 60], { taille: 16, ancre: "start", gras: false, coul: C.ko });
      var n = det.length, rr = n > 1 ? (det[n - 1] - det[0]) / (n - 1) : 0;
      R.rendre(zone, n + "\\ \\text{détections en 2,4 s (3 ondes R)} \\quad RR_{moyen} = " + (rr ? R.tc(rr, 0) + "\\ \\text{ms} \\;\\to\\; f_C = " + R.tc(60000 / rr, 0) + "\\ \\text{bpm}" : "\\text{?}"));
    }
    dessiner();
  })();

  /* ---------- Questions 17 à 20 : stimulation à la demande ---------- */
  if (place("fig-pacemaker-vvi")) (function () {
    var f = R.figure("fig-pacemaker-vvi", { largeur: 960, hauteur: 540, titre: "Stimulation à la demande : un cœur qui fait une pause",
      essai: "<strong>Essaie</strong> : change la fréquence cible. <strong>Observe</strong> : après chaque battement, détecté ou stimulé, un intervalle d'échappement commence (bande colorée). Un battement propre qui arrive avant sa fin l'arrête : pas de stimulation. Sinon, une impulsion part à la fin de l'intervalle.", direct: true });
    var g = el("g", null, f.svg), zone = R.h("div", null, "", f.direct);
    var cf = R.curseur(f.reglages, { nom: "Cible", min: 40, max: 100, pas: 5, val: 60, unite: " bpm", surChange: dessiner });
    var propres = [200, 1000, 1800, 5200, 6000], x0 = 60, W = 860, TMAX = 6400;
    function X(t) { return x0 + t / TMAX * W; }
    function dessiner() {
      EMB.vider(g);
      var Tech = 60000 / cf.v, evts = [], ignores = [], dern = null, i = 0;
      // simulation : battements propres détectés ; stimulation si l'intervalle s'écoule (période réfractaire 250 ms après une stimulation)
      for (var t = 0; t <= TMAX; t += 1) {
        if (i < propres.length && t === propres[i]) {
          if (dern === null || t - dern.t >= 250) { evts.push({ t: t, k: "R" }); dern = evts[evts.length - 1]; } else ignores.push(t);
          i++;
        } else if (dern && t - dern.t >= Tech) { evts.push({ t: t, k: "S" }); dern = evts[evts.length - 1]; }
      }
      // intervalles d'échappement
      evts.forEach(function (e, k) {
        var fin = Math.min(e.t + Tech, k + 1 < evts.length ? evts[k + 1].t : e.t + Tech, TMAX);
        el("rect", { x: X(e.t), y: 260, width: Math.max(1, X(fin) - X(e.t)), height: 36, fill: C.clair }, g);
        if (e.t + Tech <= TMAX) el("line", { x1: X(e.t + Tech), y1: 252, x2: X(e.t + Tech), y2: 304, stroke: C.acc, "stroke-width": 2, "stroke-dasharray": "4 4" }, g);
      });
      tx(g, "intervalle d'échappement", [x0, 236], { taille: 16, ancre: "start", gras: false });
      // ligne ECG : battements propres (pics) et stimulations (impulsion)
      tx(g, "ECG", [x0, 70], { taille: 16, ancre: "start", gras: false });
      el("line", { x1: x0, y1: 170, x2: x0 + W, y2: 170, stroke: C.gris, "stroke-width": 2 }, g);
      evts.forEach(function (e) {
        var x = X(e.t);
        if (e.k === "R") {
          el("path", { d: "M" + (x - 10) + " 170 L" + (x - 4) + " 180 L" + x + " 95 L" + (x + 5) + " 190 L" + (x + 11) + " 170", fill: "none", stroke: C.encre, "stroke-width": 3, "stroke-linejoin": "round" }, g);
        } else {
          el("path", { d: "M" + x + " 200 V90", stroke: C.ko, "stroke-width": 4 }, g);
          el("path", { d: "M" + (x + 3) + " 170 Q" + (x + 20) + " 120 " + (x + 34) + " 170", fill: "none", stroke: C.ko, "stroke-width": 3 }, g);
        }
      });
      // battements propres tombés pendant la période réfractaire d'une stimulation : vus, mais ignorés
      ignores.forEach(function (t) {
        var x = X(t);
        el("path", { d: "M" + (x - 10) + " 170 L" + (x - 4) + " 180 L" + x + " 95 L" + (x + 5) + " 190 L" + (x + 11) + " 170", fill: "none", stroke: C.gris, "stroke-width": 3, "stroke-linejoin": "round" }, g);
      });
      // axe du temps
      el("line", { x1: x0, y1: 350, x2: x0 + W, y2: 350, stroke: C.encre, "stroke-width": 2.5 }, g);
      for (var u = 0; u <= TMAX; u += 1000) {
        el("line", { x1: X(u), y1: 350, x2: X(u), y2: 360, stroke: C.encre, "stroke-width": 2 }, g);
        tx(g, vg(u / 1000), [X(u), 380], { taille: 16, mono: true, gras: false });
      }
      tx(g, "t (s)", [x0 + W, 410], { taille: 16, ancre: "end", gras: false });
      // légende
      el("path", { d: "M" + x0 + " 470 l6 10 l4 -40 l5 50 l6 -20", fill: "none", stroke: C.encre, "stroke-width": 3 }, g);
      tx(g, "battement propre détecté", [x0 + 36, 470], { taille: 16, ancre: "start", gras: false });
      el("path", { d: "M" + (x0 + 330) + " 490 V445", stroke: C.ko, "stroke-width": 4 }, g);
      tx(g, "stimulation", [x0 + 346, 470], { taille: 16, ancre: "start", gras: false, coul: C.ko });
      if (ignores.length) tx(g, "en gris : pendant la période réfractaire, ignoré", [x0, 520], { taille: 16, ancre: "start", gras: false, coul: C.doux });
      var ns = evts.filter(function (e) { return e.k === "S"; }).length;
      R.rendre(zone, "T_{ech} = \\frac{60\\,000}{" + cf.v + "} = " + R.tc(Tech, 0) + "\\ \\text{ms} \\qquad " + ns + "\\ \\text{stimulation" + (ns > 1 ? "s" : "") + "}");
    }
    dessiner();
  })();
})();
