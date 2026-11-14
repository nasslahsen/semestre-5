/*
 * Schémas en blocs reliés par des flèches (arbres, classements, enchaînements), pour les pages de cours et de révision.
 * Une page pose <div class="schema" id="sc-..."></div> ; le module définit window.SCHEMAS (modules/<id>/schemas.js) :
 *   SCHEMAS["sc-..."] = { titre, cols: [[{ id, t (titre), s (sous-titre, \n pour aller à la ligne), k ("", "doux", "fort", "neutre"), note }], ...],
 *                         liens: [["de", "vers"], ...], vgap, gap } ; un bloc avec href devient un lien
 *   ou une fonction (boite, S) qui dessine elle-même (courbes) avec S.el, S.svg(boite, titre, hauteur).
 * Les colonnes vont de gauche à droite ; les blocs d'une colonne sont centrés ; les couleurs suivent le module (--jeu-texte, --jeu-pale).
 */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg", W = 1000;
  function el(n, a, p) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  // coupe un texte en lignes d'au plus « max » caractères (les \n forcent un retour)
  function couper(t, max) {
    var out = [];
    String(t || "").split("\n").forEach(function (par) {
      var l = "";
      // un mot trop long se coupe après ses traits d'union (« caoutchouc- / liquide »)
      var mots = [];
      par.split(" ").forEach(function (m) { if (m.length > max && m.indexOf("-") > 0) m.split(/(?<=-)/).forEach(function (x) { mots.push(x); }); else mots.push(m); });
      mots.forEach(function (m) { var sep = /-$/.test(l) ? "" : " "; if (l && (l + sep + m).length > max) { out.push(l); l = m; } else l = l ? l + sep + m : m; });
      if (l) out.push(l);
    });
    return out;
  }
  var STYLE = {
    "":     { fond: "#f5f6fa", bord: "var(--jeu-texte)", titre: "#15171f", sous: "#3d4250" },
    doux:   { fond: "var(--jeu-pale)", bord: "var(--jeu-texte)", titre: "#15171f", sous: "#3d4250" },
    fort:   { fond: "var(--jeu-texte)", bord: "var(--jeu-texte)", titre: "#ffffff", sous: "#ffffff" },
    neutre: { fond: "#ffffff", bord: "#b6bac4", titre: "#4a4f5c", sous: "#5b6172" }
  };

  // Schéma en colonnes : chaque colonne est une liste de blocs { id, t, s, k, note } ; liens [de, vers, étiquette].
  // Les blocs d'une colonne sont centrés ; les colonnes de même longueur (la plus longue) partagent leurs hauteurs de rangée.
  function dessiner(boite, d) {
    var id = boite.id;
    if (d.titre) { var tt = document.createElement("p"); tt.className = "schema-titre"; tt.textContent = d.titre; boite.appendChild(tt); }
    var n = d.cols.length, gap = d.gap || (n >= 5 ? 44 : 60), haut = d.haut || 0;
    var cw = (W - 20 - gap * (n - 1)) / n;
    var maxT = Math.floor((cw - 22) / 9.6), maxS = Math.floor((cw - 22) / 7.9);
    var blocs = {}, maxN = 0;
    d.cols.forEach(function (c) { maxN = Math.max(maxN, c.length); });
    d.cols.forEach(function (c, i) {
      c.forEach(function (bl, j) {
        bl.lt = couper(bl.t, maxT); bl.ls = couper(bl.s, maxS);
        bl.h = 18 + bl.lt.length * 22 + bl.ls.length * 20 + (bl.ls.length ? 4 : 0) + 6;
        bl.col = i; bl.rang = j; bl.x = 10 + i * (cw + gap); bl.w = cw;
        if (bl.id) blocs[bl.id] = bl;
      });
    });
    var rangs = [];
    d.cols.forEach(function (c) { if (c.length === maxN) c.forEach(function (bl, j) { rangs[j] = Math.max(rangs[j] || 0, bl.h); }); });
    var vg = d.vgap || 22, notes = 0;
    d.cols.forEach(function (c) { c.forEach(function (bl) { if (bl.note) notes = 24; }); });
    function hauteurCol(c) { return c.reduce(function (s, bl, j) { return s + (c.length === maxN ? rangs[j] : bl.h); }, 0) + vg * (c.length - 1); }
    var H = 0; d.cols.forEach(function (c) { H = Math.max(H, hauteurCol(c)); });
    d.cols.forEach(function (c) {
      var y = haut + 8 + (H - hauteurCol(c)) / 2;
      c.forEach(function (bl, j) { if (c.length === maxN) bl.h = rangs[j]; bl.y = y; y += bl.h + vg; });
    });
    var svg = el("svg", { viewBox: "0 0 " + W + " " + (H + haut + 18 + notes), role: "img", "aria-label": d.titre || "schéma" }, boite);
    var defs = el("defs", {}, svg), mk = el("marker", { id: "fl-" + id, viewBox: "0 0 10 10", refX: 9, refY: 5, markerWidth: 9, markerHeight: 9, orient: "auto-start-reverse" }, defs);
    el("path", { d: "M0,0 L10,5 L0,10 L3,5 z", style: "fill:var(--jeu-texte)" }, mk);
    (d.liens || []).forEach(function (l) {
      var a = blocs[l[0]], c = blocs[l[1]];
      var x1 = a.x + a.w, y1 = a.y + a.h / 2, x2 = c.x - 2, y2 = c.y + c.h / 2, mx = x1 + (c.x - x1) / 2;
      var dd = Math.abs(y1 - y2) < 1 ? "M" + x1 + "," + y1 + " H" + x2 : "M" + x1 + "," + y1 + " H" + mx + " V" + y2 + " H" + x2;
      el("path", { d: dd, fill: "none", "stroke-width": 2.5, style: "stroke:var(--jeu-texte)", "marker-end": "url(#fl-" + id + ")" }, svg);
      if (l[2]) { var tx = el("text", { x: x1 + 6, y: y1 - 8, "font-size": 14, fill: "#5b6172" }, svg); tx.textContent = l[2]; }
    });
    d.cols.forEach(function (c) {
      c.forEach(function (bl) {
        var st = STYLE[bl.k || ""], dest = svg;
        // un bloc avec href est un lien (ex. : les chapitres de l'arbre du module)
        if (bl.href) { dest = el("a", { href: bl.href, "aria-label": bl.t }, svg); dest.style.cursor = "pointer"; }
        el("rect", { x: bl.x, y: bl.y, width: bl.w, height: bl.h, rx: 10, "stroke-width": 2.2, style: "fill:" + st.fond + ";stroke:" + st.bord }, dest);
        var tot = bl.lt.length * 22 + bl.ls.length * 20 + (bl.ls.length ? 4 : 0), y = bl.y + (bl.h - tot) / 2 + 16;
        bl.lt.forEach(function (l) { var t = el("text", { x: bl.x + bl.w / 2, y: y, "text-anchor": "middle", "font-size": 17, "font-weight": 700, style: "fill:" + st.titre }, dest); t.textContent = l; y += 22; });
        if (bl.ls.length) y += 4;
        bl.ls.forEach(function (l) { var t = el("text", { x: bl.x + bl.w / 2, y: y - 2, "text-anchor": "middle", "font-size": 15, style: "fill:" + st.sous }, dest); t.textContent = l; y += 20; });
        if (bl.note) { var t = el("text", { x: bl.x + bl.w / 2, y: bl.y + bl.h + 19, "text-anchor": "middle", "font-size": 14, fill: "#5b6172" }, svg); t.textContent = bl.note; }
      });
    });
    return svg;
  }


  function svgLibre(boite, titre, h) {
    if (titre) { var tt = document.createElement("p"); tt.className = "schema-titre"; tt.textContent = titre; boite.appendChild(tt); }
    return el("svg", { viewBox: "0 0 1000 " + h, role: "img", "aria-label": titre || "schéma" }, boite);
  }
  var S = { el: el, svg: svgLibre, dessiner: dessiner };
  window.SCHEMA = S;
  function tout() {
    var defs = window.SCHEMAS || {};
    Array.prototype.forEach.call(document.querySelectorAll(".schema[id]"), function (boite) {
      var d = defs[boite.id];
      if (!d || boite.firstChild) return;
      if (typeof d === "function") d(boite, S); else dessiner(boite, d);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tout); else tout();
})();
