/*
 * Dessins propres au module Technologies de laboratoire, partagés par les niveaux (jouer.html) et les pages de cours.
 * Boîtes étiquetées, flèches, chemins, pictogrammes d'appareils de laboratoire, tubes de prélèvement, petits calculs.
 * Indépendant de D (jeu) et de RM (cours) : chargé après eux, il marche dans les deux.
 * Les calculs (LABO.calc) sont purs et testés par tests/math.test.js.
 */
(function (global) {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var P = global.PLATEFORME;

  var C = {
    encre: "#15171f", doux: "#5b6172", gris: "#9aa0ad", pale: "#eef0f5", trait: "#e3e6ee", fond: "#f6f7fa",
    ok: "#12a26b", okPale: "#e3f7ee", ko: "#e5484d", koPale: "#fdecec", acc: "#3b5bdb", accPale: "#e8edff",
    v: "#8b3fd9", vPale: "#f1e8fc", froid: "#1c7ed6", froidPale: "#e3f0fb", chaud: "#e8590c", chaudPale: "#fdeee3",
    sang: "#c92a2a", plasma: "#f2c94c",
    jeu: P ? P.couleur() : "#D9730D", jeuPale: P ? P.clair() : "#FADEC9"
  };
  // Couleur du bouchon d'un tube de prélèvement selon son additif (convention usuelle des tubes sous vide)
  var BOUCHONS = {
    hemoc: { nom: "Hémoculture", court: "hémoculture", coul: "#4b5563" },
    sec: { nom: "Tube sec (sérum)", court: "sec", coul: "#c92a2a" },
    citrate: { nom: "Citrate", court: "citrate", coul: "#74c0fc" },
    heparine: { nom: "Héparine", court: "héparine", coul: "#2f9e44" },
    edta: { nom: "EDTA", court: "EDTA", coul: "#9c36b5" },
    fluorure: { nom: "Fluorure / oxalate", court: "fluorure", coul: "#868e96" }
  };

  /* ---------- SVG de base ---------- */
  function s(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var a in attrs || {}) if (attrs[a] !== undefined && attrs[a] !== null) e.setAttribute(a, attrs[a]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function vider(e) { while (e.firstChild) e.removeChild(e.firstChild); }

  // Coupe un texte en lignes d'environ « largeur » pixels (largeur moyenne d'un caractère : 0,55 × taille).
  function couper(t, largeur, taille) {
    if (!largeur) return String(t).split("\n");
    var max = Math.max(4, Math.floor(largeur / (taille * 0.56))), lignes = [];
    String(t).split("\n").forEach(function (par) {
      var l = "";
      par.split(" ").forEach(function (m) {
        if (!l) l = m;
        else if ((l + " " + m).length <= max) l += " " + m;
        else { lignes.push(l); l = m; }
      });
      lignes.push(l);
    });
    return lignes;
  }

  // Texte centré verticalement sur p, sur une ou plusieurs lignes, avec un halo blanc pour rester lisible.
  function texte(g, t, p, o) {
    o = o || {};
    var taille = o.taille || 18, lh = (o.lh || 1.22) * taille, lignes = couper(t, o.largeur, taille);
    var e = s("text", {
      x: p[0], y: p[1], fill: o.coul || C.encre, "font-size": taille, "font-weight": o.gras === false ? 500 : o.gras || 600,
      "text-anchor": o.ancre || "middle", "font-family": o.mono ? "JetBrains Mono, monospace" : "Inter, sans-serif",
      "font-style": o.italique ? "italic" : null, opacity: o.op
    }, g);
    if (o.halo !== false) { e.setAttribute("paint-order", "stroke"); e.setAttribute("stroke", o.haloCoul || "#fff"); e.setAttribute("stroke-width", o.haloEp || 5); e.setAttribute("stroke-linejoin", "round"); }
    var y0 = p[1] - (lignes.length - 1) * lh / 2;
    lignes.forEach(function (l, i) {
      var ts = s("tspan", { x: p[0], y: y0 + i * lh, "dominant-baseline": "central" }, e);
      ts.textContent = l;
    });
    return e;
  }

  // Boîte arrondie avec un titre (et un sous-titre) centrés.
  function boite(g, x, y, w, h, o) {
    o = o || {};
    var gr = s("g", { opacity: o.op }, g);
    gr.rect = s("rect", { x: x, y: y, width: w, height: h, rx: o.rx === undefined ? 14 : o.rx, fill: o.fond || "#fff", stroke: o.bord || C.encre, "stroke-width": o.ep === undefined ? 2.5 : o.ep, "stroke-dasharray": o.tirets }, gr);
    var cx = x + w / 2, cy = y + h / 2, taille = o.taille || 17;
    if (o.titre && o.sous) {
      // titre et sous-titre empilés, centrés ensemble, même sur plusieurs lignes
      var ts = taille * 0.78, nT = couper(o.titre, w - 14, taille).length, nS = couper(o.sous, w - 14, ts).length;
      var hT = nT * taille * 1.22, hS = nS * ts * 1.22, haut = hT + hS + 4, y0 = cy - haut / 2;
      texte(gr, o.titre, [cx, y0 + hT / 2], { taille: taille, coul: o.coul, largeur: w - 14, halo: false, gras: o.gras || 700 });
      texte(gr, o.sous, [cx, y0 + hT + 4 + hS / 2], { taille: ts, coul: o.coulSous || C.doux, largeur: w - 14, halo: false, gras: 500 });
    } else if (o.titre) texte(gr, o.titre, [cx, cy], { taille: taille, coul: o.coul, largeur: w - 14, halo: false, gras: o.gras || 700 });
    return gr;
  }

  function fleche(g, a, b, o) {
    o = o || {};
    var coul = o.coul || C.encre, ep = o.ep || 4, d = [b[0] - a[0], b[1] - a[1]], l = Math.hypot(d[0], d[1]);
    if (l < 2) return null;
    var u = [d[0] / l, d[1] / l], t = o.tete || 9 + ep * 1.8, w = (o.tete || 9 + ep * 1.8) * 0.55, c = [b[0] - u[0] * t, b[1] - u[1] * t];
    var gr = s("g", { opacity: o.op }, g);
    s("line", { x1: a[0], y1: a[1], x2: c[0] + u[0], y2: c[1] + u[1], stroke: coul, "stroke-width": ep, "stroke-linecap": "round", "stroke-dasharray": o.tirets }, gr);
    s("polygon", { points: [b, [c[0] - u[1] * w, c[1] + u[0] * w], [c[0] + u[1] * w, c[1] - u[0] * w]].map(function (q) { return q[0].toFixed(1) + "," + q[1].toFixed(1); }).join(" "), fill: coul }, gr);
    return gr;
  }

  // Chemin à travers plusieurs points, flèche au bout (et petites flèches à mi-segment si o.relais).
  function chemin(g, pts, o) {
    o = o || {};
    var gr = s("g", { opacity: o.op }, g), coul = o.coul || C.encre, ep = o.ep || 5;
    if (pts.length < 2) return gr;
    var d = "M" + pts.slice(0, -1).map(function (p) { return p[0] + " " + p[1]; }).join(" L");
    var a = pts[pts.length - 2], b = pts[pts.length - 1];
    s("path", { d: d + " L" + a[0] + " " + a[1], fill: "none", stroke: coul, "stroke-width": ep, "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-dasharray": o.tirets }, gr);
    fleche(gr, a, b, { coul: coul, ep: ep, tirets: o.tirets });
    if (o.relais) for (var i = 0; i < pts.length - 2; i++) {
      var p = pts[i], q = pts[i + 1], m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], L = Math.hypot(q[0] - p[0], q[1] - p[1]);
      if (L > 50) fleche(gr, [m[0] - (q[0] - p[0]) / L * 8, m[1] - (q[1] - p[1]) / L * 8], [m[0] + (q[0] - p[0]) / L * 10, m[1] + (q[1] - p[1]) / L * 10], { coul: coul, ep: ep, tete: 16 });
    }
    return gr;
  }

  // Zone tactile : un geste « toucher » (doigt, stylet ou souris), avec une cible d'au moins 48 px.
  function toucher(el, f) {
    el.style.cursor = "pointer";
    el.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
    el.addEventListener("click", function (e) { e.stopPropagation(); f(e); });
    return el;
  }
  function cible(g, x, y, w, h, f) {
    var r = s("rect", { x: x, y: y, width: w, height: h, fill: "transparent" }, g);
    return toucher(r, f);
  }

  /* ---------- Pictogrammes (traits épais, une couleur) ---------- */
  // nom, centre c, taille sz (côté du carré), couleur
  function icone(g, nom, c, sz, coul) {
    coul = coul || C.encre;
    var k = (sz || 40) / 40, gr = s("g", { transform: "translate(" + c[0] + " " + c[1] + ") scale(" + k + ")" }, g);
    var tr = { fill: "none", stroke: coul, "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round" };
    var pl = { fill: coul };
    function p(d, a) { return s("path", Object.assign({ d: d }, a || tr), gr); }
    switch (nom) {
      case "tube":
        p("M-6 -18 H6 M-5 -18 V12 A5 5 0 0 0 5 12 V-18"); p("M-5 2 H5 V12 A5 5 0 0 1 -5 12 Z", pl); break;
      case "personne":
        s("circle", Object.assign({ cx: 0, cy: -11, r: 7 }, pl), gr); p("M-13 17 V8 Q-13 -1 0 -1 Q13 -1 13 8 V17 Z", pl); break;
      case "medecin": // ordonnance
        p("M-12 -17 H8 L14 -11 V17 H-12 Z M-6 -6 H8 M-6 1 H8 M-6 8 H3"); break;
      case "aiguille":
        p("M-16 16 L4 -4 M0 -8 L8 0 M4 -12 L12 -4 M10 -14 L16 -8 M-16 16 L-12 8"); break;
      case "camion":
        p("M-18 -8 H6 V10 H-18 Z M6 -2 H13 L18 4 V10 H6"); s("circle", Object.assign({ cx: -10, cy: 12, r: 4 }, pl), gr); s("circle", Object.assign({ cx: 11, cy: 12, r: 4 }, pl), gr); break;
      case "reception": // guichet / plateau
        p("M-18 4 H18 M-14 4 V16 M14 4 V16 M-10 4 V-6 H10 V4"); p("M-6 -6 V-14 M0 -6 V-16 M6 -6 V-12"); break;
      case "centrifugeuse":
        s("circle", Object.assign({ cx: 0, cy: 0, r: 15 }, tr), gr); s("circle", Object.assign({ cx: 0, cy: 0, r: 3 }, pl), gr);
        [0, 90, 180, 270].forEach(function (a) { var r = a * Math.PI / 180; s("circle", Object.assign({ cx: 9 * Math.cos(r), cy: 9 * Math.sin(r), r: 3 }, pl), gr); }); break;
      case "automate":
        p("M-18 -14 H18 V14 H-18 Z M-18 -4 H18"); p("M-12 -10 H-4 M8 -10 H12"); p("M-10 2 V10 M-4 2 V10 M2 2 V10 M8 2 V10"); break;
      case "valider": // résultat validé
        p("M-14 -17 H14 V17 H-14 Z"); p("M-7 0 L-2 6 L8 -7"); break;
      case "frigo":
        p("M-12 -18 H12 V18 H-12 Z M-12 -4 H12 M-7 -12 V-8 M-7 2 V8"); break;
      case "flocon":
        p("M0 -17 V17 M-15 -8 L15 8 M-15 8 L15 -8 M-4 -13 L0 -9 L4 -13 M-4 13 L0 9 L4 13"); break;
      case "thermo":
        p("M-3 6 V-14 A3 3 0 0 1 3 -14 V6 A7 7 0 1 1 -3 6 Z"); s("circle", Object.assign({ cx: 0, cy: 11, r: 3.5 }, pl), gr); break;
      case "danger": // risque biologique simplifié
        s("circle", Object.assign({ cx: 0, cy: 0, r: 4 }, pl), gr);
        [0, 120, 240].forEach(function (a) { s("circle", { cx: 0, cy: -9, r: 7, fill: "none", stroke: coul, "stroke-width": 3, transform: "rotate(" + a + ")" }, gr); }); break;
      case "chimie": // flacon
        p("M-5 -17 H5 M-3 -17 V-6 L-14 14 H14 L3 -6 V-17"); p("M-10 6 H10", Object.assign({}, tr, { "stroke-width": 2 })); break;
      case "eclair":
        p("M3 -18 L-10 3 H0 L-4 18 L10 -4 H0 Z", pl); break;
      case "feu":
        p("M0 18 C-12 18 -15 8 -11 0 C-8 -6 -5 -8 -4 -16 C2 -11 4 -6 3 -1 C6 -3 7 -6 7 -8 C13 -1 14 8 9 13 C7 16 4 18 0 18 Z"); break;
      case "gant":
        p("M-8 18 V-2 L-14 -8 M-8 -2 V-14 M-2 -4 V-17 M4 -4 V-15 M10 -2 V-11 M-8 18 H10 V-2"); break;
      case "lunettes":
        s("circle", Object.assign({ cx: -9, cy: 2, r: 7 }, tr), gr); s("circle", Object.assign({ cx: 9, cy: 2, r: 7 }, tr), gr); p("M-2 0 Q0 -3 2 0 M-16 0 L-19 -6 M16 0 L19 -6"); break;
      case "masque":
        p("M-16 -6 Q0 -12 16 -6 V4 Q0 16 -16 4 Z M-10 -2 H10 M-10 4 H10"); break;
      case "blouse":
        p("M-8 -17 L0 -10 L8 -17 L16 -10 V17 H-16 V-10 Z M0 -10 V17"); break;
      case "cle":
        p("M-14 14 L3 -3 M8 -16 A8 8 0 1 0 15 -9 L9 -9 L8 -15 Z"); break;
      case "horloge":
        s("circle", Object.assign({ cx: 0, cy: 0, r: 16 }, tr), gr); p("M0 -9 V0 L7 5"); break;
      case "ordi":
        p("M-17 -13 H17 V9 H-17 Z M-6 17 H6 M0 9 V17"); break;
      case "codebarre":
        [-14, -10, -8, -3, 0, 4, 9, 11, 15].forEach(function (x, i) { s("rect", Object.assign({ x: x, y: -14, width: i % 3 ? 2 : 3, height: 28 }, pl), gr); }); break;
      case "robot":
        p("M-14 -6 H14 V12 H-14 Z M0 -6 V-14 M-6 -14 H6"); s("circle", Object.assign({ cx: -6, cy: 2, r: 3 }, pl), gr); s("circle", Object.assign({ cx: 6, cy: 2, r: 3 }, pl), gr); p("M-10 12 V17 M10 12 V17"); break;
      case "capsule":
        p("M-8 -17 H8 A8 8 0 0 1 8 17 H-8 A8 8 0 0 1 -8 -17 Z M-8 -8 H8 M-8 8 H8"); break;
      case "microscope":
        p("M-4 -18 L4 -18 M0 -18 V-6 M-6 -6 H6 L2 2 H-2 Z M-14 6 H6 M-12 17 H14 M4 17 Q14 10 8 -2"); break;
      case "lampe":
        p("M-7 4 A9 9 0 1 1 7 4 V9 H-7 Z M-5 13 H5 M-3 17 H3"); break;
      case "oeil":
        p("M-18 0 Q0 -14 18 0 Q0 14 -18 0 Z"); s("circle", Object.assign({ cx: 0, cy: 0, r: 5 }, pl), gr); break;
      case "eau":
      case "goutte":
        p("M0 -17 Q13 0 13 6 A13 13 0 0 1 -13 6 Q-13 0 0 -17 Z"); break;
      case "bouclier":
        p("M0 -17 L14 -11 V0 Q14 12 0 18 Q-14 12 -14 0 V-11 Z M-6 0 L-1 5 L7 -5"); break;
      case "document":
        p("M-12 -17 H8 L14 -11 V17 H-12 Z M8 -17 V-11 H14 M-6 -2 H8 M-6 5 H8 M-6 12 H3"); break;
      case "aimant":
        p("M-12 -16 V2 A12 12 0 0 0 12 2 V-16 H5 V2 A5 5 0 0 1 -5 2 V-16 Z"); break;
      default:
        s("circle", { r: 14, fill: "none", stroke: coul, "stroke-width": 3 }, gr);
    }
    return gr;
  }

  // Tube de prélèvement vertical : bouchon coloré, niveau de remplissage, couches éventuelles (de bas en haut).
  // o : { bouchon (clé de BOUCHONS ou couleur), couches: [{ h (0..1), coul }], h, w, etiquette }
  function tube(g, x, y, o) {
    o = o || {};
    var w = o.w || 34, h = o.h || 130, gr = s("g", { opacity: o.op }, g), b = BOUCHONS[o.bouchon], cb = b ? b.coul : o.bouchon || C.gris;
    var corps = "M" + x + " " + y + " V" + (y + h - w / 2) + " A" + (w / 2) + " " + (w / 2) + " 0 0 0 " + (x + w) + " " + (y + h - w / 2) + " V" + y;
    var bas = y + h, cumul = 0;
    var clip = "tube" + Math.round(Math.random() * 1e9);
    var cp = s("clipPath", { id: clip }, gr); s("path", { d: corps + " Z" }, cp);
    (o.couches || []).forEach(function (c) {
      var hh = c.h * (h - 6);
      s("rect", { x: x, y: bas - cumul - hh, width: w, height: hh + 1, fill: c.coul, "clip-path": "url(#" + clip + ")" }, gr);
      cumul += hh;
    });
    s("path", { d: corps, fill: "none", stroke: C.encre, "stroke-width": 2.5, "stroke-linejoin": "round" }, gr);
    s("rect", { x: x - 4, y: y - 18, width: w + 8, height: 20, rx: 4, fill: cb, stroke: C.encre, "stroke-width": 2 }, gr);
    if (o.etiquette) texte(gr, o.etiquette, [x + w / 2, bas + 20], { taille: o.taille || 16, coul: o.coulTexte || C.encre });
    return gr;
  }

  /* ---------- Appariement sur la figure : toucher un élément à gauche, puis son partenaire à droite ----------
     cfg : g, gauche [textes], droite [textes], bon [indice à droite pour chaque élément de gauche],
           xg, wg, xd, wd, y0, h, pas, taille, erreur(msg), info(msg), fin(), aide(i, k) -> message */
  function paires(cfg) {
    var lie = cfg.gauche.map(function () { return -1; }), sel = -1, faux = -1, fini = false;
    var p = { lie: lie };
    function yG(i) { return cfg.y0 + i * cfg.pas; }
    p.dessiner = function () {
      var g = cfg.g; vider(g);
      if (cfg.fond) cfg.fond(g);
      cfg.gauche.forEach(function (t, i) {
        var ok = lie[i] >= 0, on = sel === i;
        boite(g, cfg.xg, yG(i), cfg.wg, cfg.h, { fond: on ? C.jeu : ok ? C.jeuPale : "#fff", bord: on || ok ? C.jeu : C.trait, ep: on ? 3.5 : 2.5, rx: 10, titre: t, taille: cfg.taille || 16, coul: on ? "#fff" : C.encre });
        cible(g, cfg.xg, yG(i), cfg.wg, cfg.h, function () { if (fini || lie[i] >= 0) return; sel = i; faux = -1; p.dessiner(); });
      });
      cfg.droite.forEach(function (t, k) {
        var i = lie.indexOf(k), ok = i >= 0;
        boite(g, cfg.xd, yG(k), cfg.wd, cfg.h, { fond: faux === k ? C.koPale : ok ? C.okPale : "#fff", bord: faux === k ? C.ko : ok ? C.ok : C.trait, ep: 2.5, rx: 10, titre: t, taille: cfg.tailleD || cfg.taille || 16, gras: 500 });
        cible(g, cfg.xd, yG(k), cfg.wd, cfg.h, function () { p.toucher(k); });
      });
      lie.forEach(function (k, i) {
        if (k < 0) return;
        s("line", { x1: cfg.xg + cfg.wg, y1: yG(i) + cfg.h / 2, x2: cfg.xd, y2: yG(k) + cfg.h / 2, stroke: C.ok, "stroke-width": 3.5, "stroke-linecap": "round" }, cfg.g);
      });
    };
    p.toucher = function (k) {
      if (fini) return;
      if (lie.indexOf(k) >= 0) return;
      if (sel < 0) { if (cfg.info) cfg.info("Touche d'abord un élément à gauche."); return; }
      if (cfg.bon[sel] !== k) { faux = k; var i = sel; sel = -1; p.dessiner(); if (cfg.erreur) cfg.erreur(cfg.aide ? cfg.aide(i, k) : "Ces deux-là ne vont pas ensemble."); return; }
      lie[sel] = k; sel = -1; faux = -1; p.dessiner();
      if (lie.every(function (x) { return x >= 0; })) { fini = true; if (cfg.fin) cfg.fin(); }
    };
    // pour « Voir la réponse » : relie tout ce qui reste
    p.resoudre = function () { lie.forEach(function (k, i) { if (k < 0 && !fini) { sel = i; p.toucher(cfg.bon[i]); } }); };
    p.dessiner();
    return p;
  }


  // Point où le segment du centre de la boîte b vers q sort de la boîte (pour que les flèches partent du bord).
  function bord(b, q, marge) {
    var c = [b.x + b.w / 2, b.y + b.h / 2], d = [q[0] - c[0], q[1] - c[1]], m = marge || 6;
    var tx = d[0] ? (b.w / 2 + m) / Math.abs(d[0]) : Infinity, ty = d[1] ? (b.h / 2 + m) / Math.abs(d[1]) : Infinity, t = Math.min(tx, ty, 1);
    return [c[0] + d[0] * t, c[1] + d[1] * t];
  }
  function relier(g, a, b, o) {
    var ca = [a.x + a.w / 2, a.y + a.h / 2], cb = [b.x + b.w / 2, b.y + b.h / 2];
    return fleche(g, bord(a, cb), bord(b, ca, 4), o);
  }

  /* ---------- Tracer un flux : toucher les étapes dans l'ordre ----------
     cfg : g, noeuds [{ t, x, y, w, h }], ordre [indices], coul, taille, erreur(msg), aide(i, attendu) -> msg, fin(), boucle,
           fleches (false : seulement les numéros, quand les étapes sont empilées et qu'une flèche traverserait les autres) */
  function trace(cfg) {
    var pris = [], fini = false, faux = -1, p = {};
    p.dessiner = function () {
      var g = cfg.g; vider(g);
      if (cfg.fond) cfg.fond(g);
      cfg.noeuds.forEach(function (nd, i) {
        var k = pris.indexOf(i), on = k >= 0;
        boite(g, nd.x, nd.y, nd.w, nd.h, { fond: faux === i ? C.koPale : on ? "#fff" : C.fond, bord: faux === i ? C.ko : on ? cfg.coul : C.trait, ep: on ? 3.5 : 2, rx: 12, titre: nd.t, taille: cfg.taille || 16, coul: on ? C.encre : C.doux });
        if (on) {
          s("circle", { cx: nd.x + 6, cy: nd.y + 6, r: 17, fill: cfg.coul }, g);
          texte(g, String(k + 1), [nd.x + 6, nd.y + 6], { taille: 18, coul: "#fff", halo: false, gras: 800 });
        }
      });
      if (cfg.fleches !== false) for (var k = 1; k < pris.length; k++) relier(g, cfg.noeuds[pris[k - 1]], cfg.noeuds[pris[k]], { coul: cfg.coul, ep: 5 });
      if (fini && cfg.boucle) relier(g, cfg.noeuds[pris[pris.length - 1]], cfg.noeuds[pris[0]], { coul: cfg.coul, ep: 5, tirets: "10 7" });
      // zones de toucher en dernier : une flèche qui traverse une étape ne doit pas bloquer le doigt
      cfg.noeuds.forEach(function (nd, i) { cible(g, nd.x, nd.y, nd.w, nd.h, function () { p.toucher(i); }); });
    };
    p.toucher = function (i) {
      if (fini || pris.indexOf(i) >= 0) return;
      var attendu = cfg.ordre[pris.length];
      if (i !== attendu) { faux = i; p.dessiner(); if (cfg.erreur) cfg.erreur(cfg.aide ? cfg.aide(i, attendu, pris.length) : "Pas encore cette étape."); return; }
      faux = -1; pris.push(i);
      if (pris.length === cfg.ordre.length) fini = true;
      p.dessiner();
      if (fini && cfg.fin) cfg.fin();
    };
    p.resoudre = function () { while (!fini) p.toucher(cfg.ordre[pris.length]); };
    p.dessiner();
    return p;
  }


  // Animation bornée dans le temps (jamais en boucle) : f(t) avec t de 0 à 1, puis fin().
  function animer(duree, f, fin) {
    var t0 = null, arret = false;
    function pas(t) {
      if (arret) return;
      if (t0 === null) t0 = t;
      var u = Math.min(1, (t - t0) / duree);
      f(u);
      if (u < 1) requestAnimationFrame(pas); else if (fin) fin();
    }
    requestAnimationFrame(pas);
    return { arreter: function () { arret = true; } };
  }

  /* ---------- Calculs (testés dans tests/math.test.js) ---------- */
  var calc = {
    // Centrifugation : force centrifuge relative (× g) = 1,118 × 10⁻⁵ × r (cm) × N² (tr/min), et l'inverse
    rcf: function (r, N) { return 1.118e-5 * r * N * N; },
    rpmPour: function (g, r) { return Math.sqrt(g / (1.118e-5 * r)); },
    // Spectrophotométrie : T = It / I0, A = log10(1 / T) = ε × l × c
    transmittance: function (I0, It) { return It / I0; },
    absorbance: function (T) { return Math.log10(1 / T); },
    transDepuisA: function (A) { return Math.pow(10, -A); },
    beer: function (eps, l, c) { return eps * l * c; },
    concentration: function (A, eps, l) { return A / (eps * l); },
    // Étalonnage à un étalon (même méthode, même trajet) : c = A × c_étalon / A_étalon
    parEtalon: function (A, Aet, cet) { return A * cet / Aet; },
    // Longueur d'onde (nm) d'une fréquence (Hz) : λ = c / ν, c = 3 × 10⁸ m/s
    lambdaNm: function (nu) { return 3e8 / nu * 1e9; },
    // Nernst : pente en mV par décade de concentration, à la température T (K), ion de charge n
    penteNernst: function (T, n) { return 1000 * 8.314 * T * Math.LN10 / (n * 96485); },
    deltaE: function (rapport, T, n) { return calc.penteNernst(T, n) * Math.log10(rapport); },
    // Hémogramme : indices calculés (unités du cours)
    hematocrite: function (gr, vgm) { return gr * vgm / 10; },     // Ht (%) = GR (10¹²/L) × VGM (fL) / 10
    tcmh: function (hb, gr) { return hb * 10 / gr; },              // TCMH (pg) = Hb (g/dL) × 10 / GR (10¹²/L)
    ccmh: function (hb, ht) { return hb * 100 / ht; },             // CCMH (g/dL) = Hb (g/dL) × 100 / Ht (%)
    idr: function (et, vgm) { return et / vgm * 100; },            // IDR (%) = écart-type du VGM / VGM × 100
    // Coïncidence dans l'orifice : N corrigé = N mesuré × e^(N mesuré × τ)
    coincidence: function (N, tau) { return N * Math.exp(N * tau); },
    // Classe d'une impulsion selon son volume (fL), seuils du cours
    classeVolume: function (v) { return v >= 2 && v < 20 ? "PLT" : v >= 20 && v < 35 ? "bruit" : v >= 35 && v <= 360 ? "GR" : "hors"; },
    // Hémostase : INR = (TP patient / TP témoin)^ISI ; Clauss : log C = a log t + b
    inr: function (tp, tem, isi) { return Math.pow(tp / tem, isi); },
    clauss: function (t, a, b) { return Math.pow(10, a * Math.log10(t) + b); },
    // Eau : résistivité (MΩ·cm) et conductivité (µS/cm) sont inverses
    resistivite: function (cond) { return 1 / cond; },
    conductivite: function (rho) { return 1 / rho; },
    // Microscope : grossissement total = grossissement de l'objectif × grossissement de l'oculaire
    grossissement: function (obj, oc) { return obj * oc; },
    // Contrôle de qualité : écart à la moyenne en nombre d'écarts-types
    z: function (x, m, s) { return (x - m) / s; },
    // Minuteur d'une centrifugeuse : écart relatif (%) entre temps mesuré et temps programmé
    ecartPct: function (mesure, prog) { return (mesure - prog) / prog * 100; },
    // Congélateur : limites d'alarme à ± 10 % de la température de fonctionnement
    alarmes: function (T) { return [T * 1.1, T * 0.9].sort(function (a, b) { return a - b; }); }
  };


  /* ---------- Rejouer une étape depuis l'écran de fin ----------
     Le moteur garde le même état n pour tout le niveau. Quand on rejoue la première étape, le niveau a déjà
     été mené à son état final : on relance init sur un dessin effacé pour que l'étape reparte de zéro.
     Usage dans un niveau : NIVEAU(LABO.rejouable({ id, init, etapes })). */
  function rejouable(def) {
    var fig, base = 0, vue = false, h = { cur: null, pl: { P: function (v) { return v; } } };
    function lancer() { h.cur = def.init(fig) || {}; if (h.cur.pl) h.pl = h.cur.pl; }
    return Object.assign({}, def, {
      init: function (f) { fig = f; base = f.svg.childNodes.length; lancer(); return h; },
      etapes: def.etapes.map(function (e, k) {
        return { nom: e.nom, jouer: function (j) {
          if (k === 0 && vue) { while (fig.svg.childNodes.length > base) fig.svg.removeChild(fig.svg.lastChild); lancer(); }
          if (k === 0) vue = true;
          e.jouer(j, h.cur);
        } };
      })
    });
  }

  var A = { rejouable: rejouable, C: C, BOUCHONS: BOUCHONS, s: s, vider: vider, couper: couper, texte: texte, boite: boite, fleche: fleche, chemin: chemin, toucher: toucher, cible: cible, icone: icone, tube: tube, paires: paires, trace: trace, relier: relier, bord: bord, animer: animer, calc: calc };
  if (typeof module !== "undefined" && module.exports) module.exports = A;
  global.LABO = A;
})(typeof window !== "undefined" ? window : globalThis);
