/*
 * Arbre d'un module : racine, parties, chapitres, notions. Données : module.js, champ `arbre[<sous-module>]`.
 * ARBRE.dessiner(svg, { mid, sm, base, largeur, hauteur, surChoix }) : dessine dans un <svg> (viewBox largeur × hauteur).
 * base : chemin vers le dossier du module depuis la page (« » à la racine du module, « ../ » depuis cours/ ou chapitres/).
 * Toucher un chapitre l'allume et montre ses notions ; le toucher encore ouvre sa page ; toucher une notion ouvre son passage.
 * surChoix(info) : { titre, texte, url, libelle, cartes } pour la bande sous l'arbre (à retenir, ouverture, cartes de révision).
 */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  function el(tag, a, p) { var e = document.createElementNS(NS, tag); for (var k in a) if (a[k] !== undefined && a[k] !== null) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
  function texte(g, s, x, y, o) {
    var t = el("text", { x: x, y: y, "font-size": o.taille, "font-weight": o.gras ? 700 : 500, fill: o.couleur || "#15171f", "text-anchor": o.ancre || "middle",
      "dominant-baseline": "middle", "font-family": "Inter, sans-serif", style: "pointer-events:none" }, g);
    t.textContent = s; return t;
  }
  function dessiner(svg, o) {
    var P = window.PLATEFORME, MOD = P.module(o.mid), A = MOD.arbre && MOD.arbre[o.sm];
    if (!A) return null;
    var W = o.largeur, H = o.hauteur, acc = P.couleur(), pale = function (a) { return P.teinte(a); };
    var CH = A.chapitres, n = CH.length, pas = (H - 20) / n, f = Math.max(15, Math.min(20, pas * 0.42));
    var xR = 6, wR = W * 0.125, xP = W * 0.155, wP = W * 0.2, xC = W * 0.385, wC = W * 0.295, xF = W * 0.715, wF = W - W * 0.715 - 6;
    var hC = Math.min(pas - 6, 42), g = el("g", {}, svg), selC = -1, selP = -1;
    var r = P.reprendre(o.mid, o.sm), conseille = r ? r.chapitre : null;
    var y = function (i) { return 10 + pas * (i + 0.5); };
    var parts = A.parties.map(function (p, k) {
      var l = CH.map(function (c, i) { return c.partie === k ? y(i) : null; }).filter(function (v) { return v !== null; });
      return l.length ? (l[0] + l[l.length - 1]) / 2 : null;
    });
    var yRoot = H / 2;
    function url(c, page) { return o.base + "chapitres/chapitre-" + c.id + ".html" + (page ? "#n-" + page : ""); }
    function lien(a, b, actif) {
      var mx = (a[0] + b[0]) / 2;
      el("path", { d: "M" + a[0] + " " + a[1] + " C" + mx + " " + a[1] + " " + mx + " " + b[1] + " " + b[0] + " " + b[1], fill: "none", stroke: actif ? acc : "#d6d9e0", "stroke-width": actif ? 4 : 2.5 }, g);
    }
    function etat(c) { try { return P.chapitre(o.mid, c.id).etat; } catch (e) { return ""; } }
    function informer() {
      if (!o.surChoix) return;
      if (selC >= 0) { var c = CH[selC]; o.surChoix({ titre: (c.partie < 0 ? "" : P.nomChapitre(o.mid, c.id) + " · ") + c.court, texte: c.retenir, url: url(c), libelle: "Ouvrir le chapitre", cartes: c.cartes || [] }); }
      else if (selP >= 0) o.surChoix({ titre: (selP + 1) + ". " + A.parties[selP].titre.join(" "), texte: A.parties[selP].question, url: null });
      else o.surChoix({ titre: A.racine, texte: "Tout le module sur une image. Touche un chapitre pour voir ce qu'il faut en retenir, puis une notion pour l'ouvrir. Faits en vert, conseillé en bleu.", url: null });
    }
    function dessin() {
      while (g.firstChild) g.removeChild(g.firstChild);
      var pAct = selC >= 0 ? CH[selC].partie : selP;
      // liens racine → parties, parties → chapitres (la vue d'ensemble part directement de la racine)
      A.parties.forEach(function (p, k) { if (parts[k] !== null) lien([xR + wR, yRoot], [xP, parts[k]], k === pAct); });
      CH.forEach(function (c, i) {
        if (c.partie < 0) lien([xR + wR, yRoot], [xC, y(i)], i === selC);
        else lien([xP + wP, parts[c.partie]], [xC, y(i)], i === selC || (selC < 0 && c.partie === selP));
      });
      // racine
      var bR = el("g", { style: "cursor:pointer" }, g);
      el("rect", { x: xR, y: yRoot - 28, width: wR, height: 56, rx: 28, fill: acc }, bR);
      texte(bR, A.racine, xR + wR / 2, yRoot + 1, { taille: f, gras: true, couleur: "#fff" });
      bR.addEventListener("click", function () { selC = -1; selP = -1; dessin(); });
      // parties
      A.parties.forEach(function (p, k) {
        if (parts[k] === null) return;
        var yy = parts[k], a = k === pAct, b = el("g", { style: "cursor:pointer" }, g), h2 = f * 1.25;
        el("rect", { x: xP, y: yy - h2 - 6, width: wP, height: 2 * h2 + 12, rx: 14, fill: a ? pale(0.2) : "#fff", stroke: a ? acc : "#15171f", "stroke-width": a ? 3 : 2 }, b);
        texte(b, (k + 1) + ". " + p.titre[0], xP + wP / 2, yy - h2 / 2, { taille: f, gras: true });
        texte(b, p.titre[1], xP + wP / 2, yy + h2 / 2, { taille: f, gras: true });
        b.addEventListener("click", function () { selP = k; selC = -1; dessin(); });
      });
      // chapitres
      CH.forEach(function (c, i) {
        var yy = y(i), a = i === selC, e = etat(c), b = el("g", { style: "cursor:pointer" }, g);
        var bord = a ? acc : e === "fait" ? "#12a26b" : c.id === conseille ? "#3b5bdb" : "#9aa0ad";
        el("rect", { x: xC, y: yy - hC / 2, width: wC, height: hC, rx: 10, fill: a ? acc : "#fff", stroke: bord, "stroke-width": a || e === "fait" || c.id === conseille ? 3 : 2 }, b);
        var num = c.partie < 0 ? "0" : String(P.numero(o.mid, c.id));
        texte(b, /^TD/.test(num) ? c.court : num + ". " + c.court, xC + 12, yy + 1, { taille: f, gras: a, ancre: "start", couleur: a ? "#fff" : "#15171f" });
        // chapitre fait : une coche verte dessinée
        if (e === "fait" && !a) el("path", { d: "M" + (xC + wC - 26) + " " + yy + " l6 7 l12 -14", fill: "none", stroke: "#12a26b", "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" }, b);
        b.addEventListener("click", function () { if (selC === i) { location.href = url(c); return; } selC = i; selP = -1; dessin(); });
      });
      // notions du chapitre allumé
      if (selC >= 0) {
        var c = CH[selC], m = c.notions.length, h = Math.min(pas * 1.05, 48), y0 = Math.max(12, Math.min(H - 12 - m * h, y(selC) - (m - 1) * h / 2 - h / 2));
        c.notions.forEach(function (nt, k) {
          var yy = y0 + k * h + h / 2, b = el("g", { style: "cursor:pointer" }, g);
          lien([xC + wC, y(selC)], [xF, yy], true);
          el("rect", { x: xF, y: yy - h / 2 + 4, width: wF, height: h - 8, rx: (h - 8) / 2, fill: pale(0.12), stroke: acc, "stroke-width": 1.5 }, b);
          texte(b, nt[0], xF + wF / 2, yy + 1, { taille: f, couleur: "#15171f" });
          b.addEventListener("click", function () { location.href = url(c, nt[1]); });
        });
      } else {
        texte(g, selP >= 0 ? "touche un chapitre" : "touche une branche", xF + wF / 2, H / 2 - f * 0.7, { taille: f, couleur: "#5b6172" });
        texte(g, "pour voir ses notions", xF + wF / 2, H / 2 + f * 0.7, { taille: f, couleur: "#5b6172" });
      }
      informer();
    }
    dessin();
    return { choisir: function (id) { CH.forEach(function (c, i) { if (c.id === id) { selC = i; selP = -1; } }); dessin(); } };
  }
  window.ARBRE = { dessiner: dessiner };
})();
