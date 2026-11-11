/*
 * Dessins et gestes du module Langues étrangères (anglais), partagés par les niveaux (jouer.html) et les pages de cours.
 * Base reprise du module Informatique médicale : boîtes, texte, relier deux à deux (paires), ranger dans des bacs (trier),
 * toucher dans l'ordre (trace), explorer et étapes pour les figures de cours.
 * En plus : une carte de texte (extrait, phrase, situation) et ANG.niveau, qui construit un niveau à partir de données :
 * étapes « choix », « vf » (True / False), « trous » (jetons à glisser dans une phrase), « trier », « paires ».
 * Indépendant de D (jeu) et de RM (cours) : chargé après eux, il marche dans les deux.
 */
(function (global) {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var P = global.PLATEFORME;

  var C = {
    encre: "#15171f", doux: "#5b6172", gris: "#9aa0ad", pale: "#eef0f5", trait: "#e3e6ee", fond: "#f6f7fa",
    ok: "#12a26b", okPale: "#e3f7ee", ko: "#e5484d", koPale: "#fdecec", acc: "#3b5bdb", accPale: "#e8edff",
    v: "#8b3fd9", vPale: "#f1e8fc", turq: "#0f8a9d", turqPale: "#e2f4f6", brun: "#b4541a", brunPale: "#fbeee6",
    jeu: P ? P.couleur() : "#5b6172", jeuPale: P ? P.clair() : "#eef0f5", jeuTexte: "#5b6172"
  };
  if (P && P.module) { var mm = P.module(P.courant); if (mm && mm.texte) C.jeuTexte = mm.texte; }
  // Couleurs des bacs de tri (jamais la couleur d'accent écrite en dur)
  var BACS = [
    { coul: C.acc, pale: C.accPale }, { coul: C.v, pale: C.vPale }, { coul: C.turq, pale: C.turqPale },
    { coul: C.brun, pale: C.brunPale }, { coul: C.ok, pale: C.okPale }
  ];

  /* ---------- SVG de base ---------- */
  function s(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var a in attrs || {}) if (attrs[a] !== undefined && attrs[a] !== null) e.setAttribute(a, attrs[a]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function vider(e) { while (e.firstChild) e.removeChild(e.firstChild); }

  // Coupe un texte en lignes d'environ « largeur » pixels.
  function couper(t, largeur, taille) {
    if (!largeur) return String(t).split("\n");
    var max = Math.max(4, Math.floor(largeur / (taille * 0.53))), lignes = [];
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

  // Texte centré verticalement sur p, sur une ou plusieurs lignes, avec un halo blanc.
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
      var ts = o.tailleSous || taille * 0.78, nT = couper(o.titre, w - 14, taille).length, nS = couper(o.sous, w - 14, ts).length;
      var hT = nT * taille * 1.22, hS = nS * ts * 1.22, haut = hT + hS + 4, y0 = cy - haut / 2;
      texte(gr, o.titre, [cx, y0 + hT / 2], { taille: taille, coul: o.coul, largeur: w - 14, halo: false, gras: o.gras || 700 });
      texte(gr, o.sous, [cx, y0 + hT + 4 + hS / 2], { taille: ts, coul: o.coulSous || C.doux, largeur: w - 14, halo: false, gras: 500 });
    } else if (o.titre) texte(gr, o.titre, [cx, cy], { taille: taille, coul: o.coul, largeur: w - 14, halo: false, gras: o.gras || 700, mono: o.mono });
    return gr;
  }

  function fleche(g, a, b, o) {
    o = o || {};
    var coul = o.coul || C.encre, ep = o.ep || 4, d = [b[0] - a[0], b[1] - a[1]], l = Math.hypot(d[0], d[1]);
    if (l < 2) return null;
    var u = [d[0] / l, d[1] / l], t = o.tete || 9 + ep * 1.8, w = t * 0.55, c = [b[0] - u[0] * t, b[1] - u[1] * t];
    var gr = s("g", { opacity: o.op }, g);
    s("line", { x1: a[0], y1: a[1], x2: c[0] + u[0], y2: c[1] + u[1], stroke: coul, "stroke-width": ep, "stroke-linecap": "round", "stroke-dasharray": o.tirets }, gr);
    s("polygon", { points: [b, [c[0] - u[1] * w, c[1] + u[0] * w], [c[0] + u[1] * w, c[1] - u[0] * w]].map(function (q) { return q[0].toFixed(1) + "," + q[1].toFixed(1); }).join(" "), fill: coul }, gr);
    if (o.double) { var a2 = fleche(gr, b, a, { coul: coul, ep: ep, tete: o.tete }); }
    return gr;
  }

  // Chemin à travers plusieurs points, flèche au bout.
  function chemin(g, pts, o) {
    o = o || {};
    var gr = s("g", { opacity: o.op }, g), coul = o.coul || C.encre, ep = o.ep || 5;
    if (pts.length < 2) return gr;
    var d = "M" + pts.slice(0, -1).map(function (p) { return p[0] + " " + p[1]; }).join(" L");
    var a = pts[pts.length - 2], b = pts[pts.length - 1];
    s("path", { d: d + " L" + a[0] + " " + a[1], fill: "none", stroke: coul, "stroke-width": ep, "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-dasharray": o.tirets }, gr);
    fleche(gr, a, b, { coul: coul, ep: ep, tirets: o.tirets });
    return gr;
  }

  // Zone tactile (doigt, stylet ou souris)
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

  // Point où le segment du centre de la boîte b vers q sort de la boîte.
  function bord(b, q, marge) {
    var c = [b.x + b.w / 2, b.y + b.h / 2], d = [q[0] - c[0], q[1] - c[1]], m = marge || 6;
    var tx = d[0] ? (b.w / 2 + m) / Math.abs(d[0]) : Infinity, ty = d[1] ? (b.h / 2 + m) / Math.abs(d[1]) : Infinity, t = Math.min(tx, ty, 1);
    return [c[0] + d[0] * t, c[1] + d[1] * t];
  }
  function relier(g, a, b, o) {
    var ca = [a.x + a.w / 2, a.y + a.h / 2], cb = [b.x + b.w / 2, b.y + b.h / 2];
    return fleche(g, bord(a, cb), bord(b, ca, 4), o);
  }

  // Tableau : colonnes de largeurs ws, lignes de hauteur h ; la ligne 0 est l'en-tête. Renvoie les cases {x, y, w, h}.
  function tableau(g, x, y, ws, h, lignes, o) {
    o = o || {};
    var cases = [], W = ws.reduce(function (a, b) { return a + b; }, 0), hs = lignes.map(function (_, i) { return (o.hs && o.hs[i]) || h; });
    var yy = y;
    lignes.forEach(function (l, i) {
      var xx = x;
      cases.push([]);
      l.forEach(function (t, k) {
        var st = o.style ? o.style(i, k) || {} : {};
        s("rect", { x: xx, y: yy, width: ws[k], height: hs[i], fill: st.fond || (i === 0 ? C.pale : "#fff"), stroke: st.bord || C.trait, "stroke-width": st.ep || 1.5 }, g);
        texte(g, t, [xx + (o.gauche && k === 0 && i > 0 ? 10 : ws[k] / 2), yy + hs[i] / 2], { taille: i === 0 ? (o.tailleTete || o.taille || 15) : (o.taille || 15), gras: i === 0 ? 700 : st.gras || 500, coul: st.coul || C.encre, halo: false, largeur: ws[k] - 12, ancre: o.gauche && k === 0 && i > 0 ? "start" : "middle", mono: st.mono });
        cases[i].push({ x: xx, y: yy, w: ws[k], h: hs[i] });
        xx += ws[k];
      });
      yy += hs[i];
    });
    s("rect", { x: x, y: y, width: W, height: yy - y, fill: "none", stroke: C.encre, "stroke-width": 2, rx: 2 }, g);
    return cases;
  }

  /* ---------- Relier deux à deux : toucher un élément à gauche, puis son partenaire à droite ----------
     cfg : g, gauche [textes], droite [textes], bon [indice à droite pour chaque élément de gauche],
           xg, wg, xd, wd, y0, h, pas (ou pasD pour la colonne de droite), taille, erreur(msg), info(msg), fin(), aide(i, k) */
  function paires(cfg) {
    var lie = cfg.gauche.map(function () { return -1; }), sel = -1, faux = -1, fini = false;
    var p = { lie: lie };
    function yG(i) { return cfg.y0 + i * cfg.pas; }
    function yD(k) { return (cfg.y0D === undefined ? cfg.y0 : cfg.y0D) + k * (cfg.pasD || cfg.pas); }
    var hD = cfg.hD || cfg.h;
    p.dessiner = function () {
      var g = cfg.g; vider(g);
      if (cfg.fond) cfg.fond(g);
      cfg.gauche.forEach(function (t, i) {
        var ok = lie[i] >= 0, on = sel === i;
        boite(g, cfg.xg, yG(i), cfg.wg, cfg.h, { fond: on ? C.acc : ok ? C.accPale : "#fff", bord: on || ok ? C.acc : C.trait, ep: on ? 3.5 : 2.5, rx: 10, titre: t, taille: cfg.taille || 17, coul: on ? "#fff" : C.encre });
        cible(g, cfg.xg, yG(i), cfg.wg, cfg.h, function () { if (fini || lie[i] >= 0) return; sel = i; faux = -1; p.dessiner(); });
      });
      cfg.droite.forEach(function (t, k) {
        var i = lie.indexOf(k), ok = i >= 0;
        boite(g, cfg.xd, yD(k), cfg.wd, hD, { fond: faux === k ? C.koPale : ok ? C.okPale : "#fff", bord: faux === k ? C.ko : ok ? C.ok : C.trait, ep: 2.5, rx: 10, titre: t, taille: cfg.tailleD || cfg.taille || 16, gras: 500 });
        cible(g, cfg.xd, yD(k), cfg.wd, hD, function () { p.toucher(k); });
      });
      lie.forEach(function (k, i) {
        if (k < 0) return;
        s("line", { x1: cfg.xg + cfg.wg, y1: yG(i) + cfg.h / 2, x2: cfg.xd, y2: yD(k) + hD / 2, stroke: C.ok, "stroke-width": 3.5, "stroke-linecap": "round" }, cfg.g);
      });
    };
    p.toucher = function (k) {
      if (fini) return;
      if (lie.indexOf(k) >= 0) return;
      if (sel < 0) { if (cfg.info) cfg.info("First tap an item on the left."); return; }
      if (cfg.bon[sel] !== k) { faux = k; var i = sel; sel = -1; p.dessiner(); if (cfg.erreur) cfg.erreur(cfg.aide ? cfg.aide(i, k) : "These two don't go together."); return; }
      lie[sel] = k; sel = -1; faux = -1; p.dessiner();
      if (lie.every(function (x) { return x >= 0; })) { fini = true; if (cfg.fin) cfg.fin(); }
    };
    p.resoudre = function () { lie.forEach(function (k, i) { if (k < 0 && !fini) { sel = i; p.toucher(cfg.bon[i]); } }); };
    p.dessiner();
    return p;
  }

  /* ---------- Toucher des étapes dans l'ordre ----------
     cfg : g, noeuds [{ t, sous?, x, y, w, h }], ordre [indices], coul, taille, erreur(msg), aide(i, attendu, k) -> msg, fin(), boucle, fleches */
  function trace(cfg) {
    var pris = [], fini = false, faux = -1, p = {};
    p.dessiner = function () {
      var g = cfg.g; vider(g);
      if (cfg.fond) cfg.fond(g);
      cfg.noeuds.forEach(function (nd, i) {
        var k = pris.indexOf(i), on = k >= 0;
        boite(g, nd.x, nd.y, nd.w, nd.h, { fond: faux === i ? C.koPale : on ? "#fff" : C.fond, bord: faux === i ? C.ko : on ? cfg.coul : C.trait, ep: on ? 3.5 : 2, rx: 12, titre: nd.t, sous: nd.sous, taille: cfg.taille || 16, coul: on ? C.encre : C.doux });
        if (on) {
          s("circle", { cx: nd.x + 4, cy: nd.y + 4, r: 14, fill: cfg.coul }, g);
          texte(g, String(k + 1), [nd.x + 4, nd.y + 4], { taille: 15, coul: "#fff", halo: false, gras: 800 });
        }
      });
      if (cfg.fleches !== false) for (var k = 1; k < pris.length; k++) relier(g, cfg.noeuds[pris[k - 1]], cfg.noeuds[pris[k]], { coul: cfg.coul, ep: 4.5 });
      if (fini && cfg.boucle) relier(g, cfg.noeuds[pris[pris.length - 1]], cfg.noeuds[pris[0]], { coul: cfg.coul, ep: 4.5, tirets: "10 7" });
      cfg.noeuds.forEach(function (nd, i) { cible(g, nd.x, nd.y, nd.w, nd.h, function () { p.toucher(i); }); });
    };
    p.toucher = function (i) {
      if (fini || pris.indexOf(i) >= 0) return;
      var attendu = cfg.ordre[pris.length];
      if (i !== attendu) { faux = i; p.dessiner(); if (cfg.erreur) cfg.erreur(cfg.aide ? cfg.aide(i, attendu, pris.length) : "Not this step yet."); return; }
      faux = -1; pris.push(i);
      if (pris.length === cfg.ordre.length) fini = true;
      p.dessiner();
      if (fini && cfg.fin) cfg.fin();
    };
    p.resoudre = function () { while (!fini) p.toucher(cfg.ordre[pris.length]); };
    p.dessiner();
    return p;
  }

  /* ---------- Ranger dans des bacs : toucher une carte, puis le bac qui lui va ----------
     cfg : g, cartes [{ t, bac }], bacs [{ t, sous? }], pos(i) -> {x, y, w, h} pour chaque carte,
           bacsPos(k) -> {x, y, w, h} (zone à toucher), dessinBac(g, k, faux) pour un bac dessiné autrement,
           couleurs(k) -> {coul, pale} pour la pastille des cartes rangées, taille, tailleBac, erreur, info, aide(i, k), fin(), fond(g) */
  function trier(cfg) {
    var dans = cfg.cartes.map(function () { return -1; }), sel = -1, faux = -1, fini = false, p = { dans: dans };
    p.dessiner = function () {
      var g = cfg.g; vider(g);
      if (cfg.fond) cfg.fond(g);
      cfg.bacs.forEach(function (b, k) {
        var r = cfg.bacsPos(k), st = BACS[k % BACS.length];
        if (cfg.dessinBac) cfg.dessinBac(g, k, faux === k);
        else boite(g, r.x, r.y, r.w, r.h, { fond: faux === k ? C.koPale : st.pale, bord: faux === k ? C.ko : st.coul, ep: 3, rx: 12, titre: b.t, sous: b.sous, taille: cfg.tailleBac || 17, coul: st.coul });
        cible(g, r.x, r.y, r.w, r.h, function () { p.toucher(k); });
      });
      cfg.cartes.forEach(function (c, i) {
        var r = cfg.pos(i), k = dans[i], on = sel === i, st = k >= 0 ? (cfg.couleurs ? cfg.couleurs(k) : BACS[k % BACS.length]) : null;
        boite(g, r.x, r.y, r.w, r.h, { fond: on ? C.encre : st ? st.pale : "#fff", bord: on ? C.encre : st ? st.coul : C.trait, ep: on ? 3 : 2.5, rx: 10, titre: c.t, taille: cfg.taille || 17, coul: on ? "#fff" : C.encre, gras: 600 });
        if (st) s("circle", { cx: r.x + r.w - 2, cy: r.y + 2, r: 9, fill: st.coul, stroke: "#fff", "stroke-width": 2 }, g);
        cible(g, r.x, r.y, r.w, r.h, function () { if (fini || dans[i] >= 0) return; sel = i; faux = -1; p.dessiner(); });
      });
    };
    p.toucher = function (k) {
      if (fini) return;
      if (sel < 0) { if (cfg.info) cfg.info("First tap a card, then the box it belongs to."); return; }
      var i = sel;
      if (cfg.cartes[i].bac !== k) { faux = k; sel = -1; p.dessiner(); if (cfg.erreur) cfg.erreur(cfg.aide ? cfg.aide(i, k) : "Not in this box."); return; }
      dans[i] = k; sel = -1; faux = -1; p.dessiner();
      if (dans.every(function (x) { return x >= 0; })) { fini = true; if (cfg.fin) cfg.fin(); }
    };
    p.resoudre = function () { cfg.cartes.forEach(function (c, i) { if (dans[i] < 0 && !fini) { sel = i; p.toucher(c.bac); } }); };
    p.dessiner();
    return p;
  }

  /* ---------- Repérer : toucher toutes les zones « bon », sans toucher les autres ----------
     cfg : g, zones [{ x, y, w, h, bon }], dessiner(g, etat) avec etat = { trouve: [bool], faux: indice },
           erreur, aide(i) -> msg, trouve(i) (appelé à chaque bonne zone), fin() */
  function reperer(cfg) {
    var etat = { trouve: cfg.zones.map(function () { return false; }), faux: -1 }, fini = false, p = { etat: etat };
    var nbBons = cfg.zones.filter(function (z) { return z.bon; }).length;
    p.dessiner = function () {
      var g = cfg.g; vider(g);
      cfg.dessiner(g, etat);
      cfg.zones.forEach(function (z, i) { cible(g, z.x, z.y, z.w, z.h, function () { p.toucher(i); }); });
    };
    p.toucher = function (i) {
      if (fini || etat.trouve[i]) return;
      var z = cfg.zones[i];
      if (!z.bon) { etat.faux = i; p.dessiner(); if (cfg.erreur) cfg.erreur(cfg.aide ? cfg.aide(i) : "Not here."); return; }
      etat.trouve[i] = true; etat.faux = -1; p.dessiner();
      if (cfg.trouve) cfg.trouve(i);
      if (etat.trouve.filter(Boolean).length === nbBons) { fini = true; if (cfg.fin) cfg.fin(); }
    };
    p.resoudre = function () { cfg.zones.forEach(function (z, i) { if (z.bon && !etat.trouve[i]) p.toucher(i); }); };
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

  /* ---------- Figures des pages de cours (avec RM) ----------
     explorer : des boîtes à toucher ; chaque boîte touchée s'allume et son texte s'affiche sous la figure.
       f : figure RM (svg, direct), items [{ x, y, w, h, t, sous, texte, coul, pale, taille, haut (titre en haut de la boîte) }], o : { fond(g), devant(g, choisi), debut, taille } */
  function explorer(f, items, o) {
    o = o || {};
    var g = s("g", null, f.svg), choisi = o.debut === undefined ? -1 : o.debut;
    function dessiner() {
      vider(g);
      if (o.fond) o.fond(g, choisi);
      items.forEach(function (it, i) {
        var on = i === choisi, st = { coul: it.coul || C.acc, pale: it.pale || C.accPale };
        boite(g, it.x, it.y, it.w, it.h, { titre: it.haut ? null : it.t, sous: it.haut ? null : it.sous, taille: it.taille || o.taille || 18, tailleSous: it.tailleSous, fond: on ? st.pale : it.fond || "#fff", bord: on ? st.coul : it.bord || C.encre, ep: on ? 4.5 : 2.5, coul: on ? st.coul : C.encre, rx: it.rx });
        if (it.haut) texte(g, it.t, [it.x + it.w / 2, it.y + 34], { taille: it.taille || o.taille || 18, gras: 800, coul: on ? st.coul : C.encre, halo: false, largeur: it.w - 16 });
      });
      if (o.devant) o.devant(g, choisi);
      items.forEach(function (it, i) { cible(g, it.x, it.y, it.w, it.h, function () { choisi = i; dessiner(); }); });
      f.direct.innerHTML = choisi >= 0 ? "<strong>" + items[choisi].t + "</strong> : " + items[choisi].texte : (o.invite || "Tap a box in the picture.");
    }
    dessiner();
    return { choisir: function (i) { choisi = i; dessiner(); }, g: g };
  }

  /* etapesFig : un chemin révélé étape par étape (boutons « Étape précédente / suivante »).
     f : figure RM, noeuds [{ x, y, w, h, t, sous }], textes [texte de chaque étape], o : { coul, fond(g, k), boucle, noms } */
  function etapesFig(f, noeuds, textes, o) {
    o = o || {};
    var g = s("g", null, f.svg), coul = o.coul || C.jeu, R = global.RM;
    function dessiner(k) {
      vider(g);
      if (o.fond) o.fond(g, k);
      for (var i = 1; i < Math.min(k, noeuds.length); i++) relier(g, noeuds[i - 1], noeuds[i], { coul: coul, ep: 4.5 });
      if (o.boucle && k >= noeuds.length) relier(g, noeuds[noeuds.length - 1], noeuds[0], { coul: coul, ep: 4.5, tirets: "10 7" });
      noeuds.forEach(function (nd, i) {
        var on = i < k, act = i === k - 1;
        boite(g, nd.x, nd.y, nd.w, nd.h, { titre: nd.t, sous: nd.sous, taille: nd.taille || o.taille || 18, tailleSous: nd.tailleSous, fond: act ? C.jeuPale : on ? "#fff" : C.fond, bord: on ? coul : C.trait, ep: act ? 4.5 : on ? 3 : 2, coul: on ? C.encre : C.gris });
        if (on) { s("circle", { cx: nd.x + 6, cy: nd.y + 6, r: 15, fill: coul }, g); texte(g, String(i + 1), [nd.x + 6, nd.y + 6], { taille: 15, coul: "#fff", halo: false, gras: 800 }); }
      });
      if (o.devant) o.devant(g, k);
      f.direct.innerHTML = k === 0 ? (o.depart || "Go step by step.") : textes[k - 1];
    }
    var et = R.etapes(f.reglages, noeuds.length, [""].concat(o.noms || noeuds.map(function (nd) { return nd.t; })), dessiner);
    et.aller(o.debut === undefined ? 0 : o.debut);
    return et;
  }


  /* ---------- Rejouer une étape depuis l'écran de fin ----------
     Le moteur garde le même état n pour tout le niveau. Quand on rejoue la première étape, le niveau a déjà
     été mené à son état final : on relance init sur un dessin effacé pour que l'étape reparte de zéro.
     Usage dans un niveau : NIVEAU(SIS.rejouable({ id, init, etapes })). */
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

  // Grille de cartes : n cartes en « col » colonnes dans le rectangle [x, y, w] (hauteur h par carte, écart e)
  function grille(n, col, x, y, w, h, e) {
    var lw = (w - (col - 1) * e) / col;
    return function (i) { return { x: x + (i % col) * (lw + e), y: y + Math.floor(i / col) * (h + e), w: lw, h: h }; };
  }


  /* ---------- Carte de texte : un extrait du document, une phrase, une situation ----------
     o : { etiquette, titre, texte (paragraphes séparés par une ligne vide), x, y, w, h, taille, italique } */
  function carte(g, o) {
    var x = o.x === undefined ? 20 : o.x, y = o.y === undefined ? 20 : o.y, w = o.w || 640, h = o.h || 560;
    s("rect", { x: x, y: y, width: w, height: h, rx: 22, fill: "#fff", stroke: C.trait, "stroke-width": 2.5 }, g);
    s("rect", { x: x, y: y + 18, width: 8, height: h - 36, rx: 4, fill: C.jeu }, g);
    var gx = x + 36, larg = w - 64, yy = y + 34;
    function bloc(t, taille, o2) {
      var lignes = couper(t, larg * (o2.gras >= 700 ? 0.98 : 1.12), taille), lh = taille * (o2.lh || 1.32);
      lignes.forEach(function (l, i) {
        var e = s("text", { x: gx, y: yy + i * lh, fill: o2.coul || C.encre, "font-size": taille, "font-weight": o2.gras || 500, "font-family": "Inter, sans-serif", "dominant-baseline": "central", "font-style": o2.italique ? "italic" : null }, g);
        e.textContent = l;
      });
      yy += lignes.length * lh;
    }
    if (o.etiquette) { bloc(o.etiquette, 16, { coul: C.jeuTexte, gras: 700 }); yy += 6; }
    if (o.titre) { bloc(o.titre, 24, { gras: 800, lh: 1.2 }); yy += 12; }
    if (o.texte) {
      var reste = y + h - 24 - yy, pars = String(o.texte).split(/\n\s*\n/), taille = o.taille || 25;
      // la plus grande taille (16 au moins) pour que le texte tienne dans la carte
      function hauteur(t) { return pars.reduce(function (a, p) { return a + couper(p, larg * 1.12, t).length * t * 1.38 + t * 0.6; }, 0); }
      while (taille > 16 && hauteur(taille) > reste) taille -= 0.5;
      pars.forEach(function (p) { bloc(p, taille, { lh: 1.38, italique: o.italique }); yy += taille * 0.6; });
    }
    return g;
  }

  /* ---------- Dispositions standard des gestes (reprises par les parcours de test) ---------- */
  var disposition = {
    // cartes à ranger : deux colonnes en haut ; bacs côte à côte en bas
    carte: function (i, nb) {
      var hc = nb > 10 ? 52 : nb > 8 ? 58 : nb > 6 ? 64 : 80;
      return grille(nb, 2, 20, 20, 640, hc, 12)(i);
    },
    bac: function (k, nb) { var bw = (640 - (nb - 1) * 14) / nb; return { x: 20 + k * (bw + 14), y: 430, w: bw, h: 150 }; },
    // paires : colonne de gauche, colonne de droite
    gauche: function (i, nb) { var pas = 560 / nb; return { x: 20, y: 20 + i * pas, w: 250, h: pas - 14 }; },
    droite: function (k, nb) { var pas = 560 / nb; return { x: 330, y: 20 + k * pas, w: 330, h: pas - 14 }; }
  };
  function centre(r) { return [r.x + r.w / 2, r.y + r.h / 2]; }

  /* ---------- Niveau construit à partir de données ----------
     def : { id, carte: { etiquette, titre, texte }, etapes: [étape] }
     étape : { nom, type, titre, consigne, carte (remplace celle du niveau), bravo, expliquer, ... }
       choix  : options [{ t, ok, aide }], colonnes
       vf     : vrai (booléen), aide (après une mauvaise réponse)
       trous  : phrases ["We have [little] time left."], jetons ["little", "a little", ...], aide
       trier  : cartes [{ t, bac }], bacs [{ t, sous }], aide(i, k) ou aides [texte par carte]
       paires : gauche [textes], droite [textes], bon [indice à droite pour chaque élément de gauche], aides [par élément de gauche] */
  function idJeton(e, mot) { return "m" + e.jetons.indexOf(mot); }
  function htmlTrous(e) {
    return e.phrases.map(function (p) {
      return "<p>" + p.replace(/\[([^\]]+)\]/g, function (_, mot) { return '<span class="trou" data-attendu="' + idJeton(e, mot) + '"></span>'; }) + "</p>";
    }).join("");
  }
  function jouerEtape(j, n, e, def) {
    vider(n.g);
    if (e.type !== "trier" && e.type !== "paires") { var c = e.carte || def.carte; if (c) carte(n.g, c); }
    function fin() { j.bravo(e.bravo); if (e.expliquer) j.expliquer(e.expliquer); j.suite(); }
    if (e.titre) j.titre(e.titre);
    if (e.consigne) j.consigne(e.consigne);
    var t;
    switch (e.type) {
      case "choix":
        j.choix(e.options.map(function (o) { return { html: o.t, juste: !!o.ok, aide: o.aide }; }), { colonnes: e.colonnes || 1, ok: fin });
        break;
      case "vf":
        j.choix([
          { html: "True", juste: e.vrai, aide: e.vrai ? null : e.aide },
          { html: "False", juste: !e.vrai, aide: e.vrai ? e.aide : null }
        ], { colonnes: 2, ok: fin });
        break;
      case "trous":
        // les jetons au-dessus des phrases : ils restent à l'écran même quand il y a plusieurs phrases
        var res = j.zone("reserve-jetons", "");
        var z = j.zone("", "<div style=\"font-size:18px;line-height:2.15\">" + htmlTrous(e) + "</div>");
        j.jetons({
          reserve: res,
          trous: [].slice.call(z.querySelectorAll(".trou")),
          jetons: e.jetons.map(function (m, k) { return { id: "m" + k, html: m }; }),
          aide: e.aide, ok: fin
        });
        break;
      case "options":
        jouerOptions(j, e, fin);
        break;
      case "trier":
        t = trier({
          g: n.g, cartes: e.cartes, bacs: e.bacs, taille: e.taille || 16, tailleBac: 18,
          pos: function (i) { return disposition.carte(i, e.cartes.length); },
          bacsPos: function (k) { return disposition.bac(k, e.bacs.length); },
          erreur: j.erreur, info: j.info,
          aide: function (i, k) { return e.aides ? e.aides[i] : e.aide || "Read the card again: what is it about?"; },
          fin: fin
        });
        j.reponse(function () { t.resoudre(); });
        break;
      case "paires":
        var nb = e.gauche.length, pas = 560 / nb;
        t = paires({
          g: n.g, gauche: e.gauche, droite: e.droite, bon: e.bon, taille: e.taille || 17, tailleD: e.tailleD || 16,
          xg: 20, wg: 250, xd: 330, wd: 330, y0: 20, h: pas - 14, pas: pas,
          erreur: j.erreur, info: j.info,
          aide: function (i) { return e.aides ? e.aides[i] : e.aide || "These two don't go together."; },
          fin: fin
        });
        j.reponse(function () { t.resoudre(); });
        break;
    }
  }

  /* Étape « options » : plusieurs phrases à trou, chacune avec ses boutons (little / a little / few / a few, make / do…).
     e.items [{ p: "We have ___ time left.", o: [options], bon: indice ou [indices acceptés], aide }] ; un seul « Vérifier » pour toutes. */
  function bonnes(it) { return [].concat(it.bon); }
  function jouerOptions(j, e, fin) {
    var etat = e.items.map(function () { return -1; }), fini = false, faux = [];
    var z = j.zone("options-phrases", "");
    var lignes = e.items.map(function (it, i) {
      var d = document.createElement("div"); d.style.cssText = "margin:0 0 12px;padding:8px 10px;border-radius:14px;border:2px solid transparent";
      var p = document.createElement("p"); p.style.cssText = "margin:0 0 6px;font-size:18px;line-height:1.4";
      p.innerHTML = '<b style="color:#5b6172">' + (it.n || i + 1) + ".</b> " + it.p.replace(/___/g, '<span class="opt-trou" style="display:inline-block;min-width:74px;border-bottom:2.5px solid #c6cbd8;text-align:center;font-weight:700">&nbsp;</span>');
      d.appendChild(p);
      var bs = document.createElement("div"); bs.className = "choix"; bs.style.cssText = "--col:" + it.o.length + ";margin:0;gap:8px";
      var boutons = it.o.map(function (t, k) {
        var b = document.createElement("button"); b.type = "button"; b.textContent = t; b.dataset.i = i; b.dataset.k = k;
        b.style.cssText = "min-height:50px;font-size:17px;border-radius:12px";
        b.addEventListener("click", function () { if (fini) return; etat[i] = k; faux = faux.filter(function (x) { return x !== i; }); maj(); });
        bs.appendChild(b); return b;
      });
      d.appendChild(bs); z.appendChild(d);
      return { d: d, p: p, boutons: boutons };
    });
    var v = document.createElement("button"); v.type = "button"; v.className = "btn bleu verifier-options"; v.textContent = "Check"; z.appendChild(v);
    function maj() {
      lignes.forEach(function (l, i) {
        var it = e.items[i], k = etat[i];
        l.boutons.forEach(function (b, kk) { b.classList.toggle("bon", fini && kk === k); b.style.borderColor = !fini && kk === k ? "#3b5bdb" : ""; b.style.background = !fini && kk === k ? "#e8edff" : ""; });
        var trous = l.p.querySelectorAll(".opt-trou"), mots = k >= 0 ? String(it.o[k]).split(" … ") : [];
        [].forEach.call(trous, function (tr, m) { tr.textContent = mots[m] || " "; });
        l.d.style.borderColor = faux.indexOf(i) >= 0 ? "#e5484d" : fini ? "#12a26b" : "transparent";
        l.d.style.background = faux.indexOf(i) >= 0 ? "#fdecec" : fini ? "#e3f7ee" : "";
      });
      v.disabled = fini || etat.some(function (k) { return k < 0; });
    }
    var r = j.reponse(function () { etat = e.items.map(function (it) { return bonnes(it)[0]; }); faux = []; maj(); v.click(); });
    v.addEventListener("click", function () {
      faux = [];
      e.items.forEach(function (it, i) { if (bonnes(it).indexOf(etat[i]) < 0) faux.push(i); });
      if (faux.length) { maj(); j.erreur(e.items[faux[0]].aide || e.aide || "The sentences in red are wrong: change your choice."); return; }
      fini = true; r.fait = true; v.remove(); maj(); fin();
    });
    maj();
  }

  function niveau(def) {
    var r = rejouable({
      id: def.id,
      init: function (fig) { return { g: s("g", null, fig.svg) }; },
      etapes: def.etapes.map(function (e) { return { nom: e.nom, jouer: function (j, n) { jouerEtape(j, n, e, def); } }; })
    });
    r.donnees = def; // lu par les parcours de test et tests/math.test.js
    return r;
  }

  /* ---------- Pages de réponses : chaque réponse cachée à sa place, un toucher la montre ----------
     <button class="rep">mot</button> dans un trou ou après une question ; class="rep bloc" pour une réponse longue. */
  if (typeof document !== "undefined") {
    var css = ".rep{display:inline-block;min-width:76px;min-height:38px;margin:2px 3px;padding:4px 12px;border:2px dashed var(--jeu);border-radius:10px;background:var(--jeu-pale);font:inherit;font-weight:600;color:inherit;cursor:pointer;vertical-align:middle;text-align:left}" +
      ".rep:not(.vu){color:transparent}.rep:not(.vu) *{visibility:hidden}.rep.vu{border-style:solid;border-color:#12a26b;background:#e3f7ee;cursor:default}" +
      ".rep.bloc{display:block;width:100%;margin:8px 0 4px;padding:10px 14px;font-weight:500}.rep.bloc:not(.vu){color:var(--jeu-texte);font-weight:600;text-align:center}" +
      ".rep.bloc:not(.vu)>span{display:none}.rep.bloc:not(.vu)::before{content:'Tap to see the answer'}" +
      "ol.questions>li{margin:0 0 14px;line-height:1.9}";
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest(".rep");
      if (b) b.classList.add("vu");
    });
  }

  var A = { rejouable: rejouable, C: C, BACS: BACS, s: s, vider: vider, couper: couper, texte: texte, boite: boite, fleche: fleche, chemin: chemin, toucher: toucher, cible: cible, tableau: tableau, paires: paires, trace: trace, trier: trier, reperer: reperer, relier: relier, bord: bord, animer: animer, grille: grille, explorer: explorer, etapesFig: etapesFig, carte: carte, disposition: disposition, centre: centre, niveau: niveau, htmlTrous: htmlTrous };
  if (typeof module !== "undefined" && module.exports) module.exports = A;
  global.ANG = A;
})(typeof window !== "undefined" ? window : globalThis);
