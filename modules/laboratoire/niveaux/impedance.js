/* Niveau : comptage par impédance (4.2) : amplitude et volume, seuils, coïncidence, section de l'orifice, limites. */
NIVEAU(LABO.rejouable({
  id: "impedance",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "PLT", "bruit", "GR"], ST = { PLT: { t: "plaquette", f: C.vPale, b: C.v }, bruit: { t: "bruit", f: C.fond, b: C.doux }, GR: { t: "globule rouge", f: C.koPale, b: C.sang } };
    n.ITEMS = [["8 fL", "PLT"], ["28 fL", "bruit"], ["92 fL", "GR"], ["17 fL", "PLT"], ["240 fL", "GR"], ["22 fL", "bruit"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 40 + Math.floor(i / 2) * 180, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 150, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: "impulsion de " + it.t, sous: st ? st.t : "à classer", taille: 22, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 150, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Ce que dit le pic", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("line", { x1: 60, y1: 440, x2: 620, y2: 440, stroke: C.encre, "stroke-width": 3 }, n.g);
      [[150, 300], [300, 120], [450, 380]].forEach(function (p) { A.s("path", { d: "M" + (p[0] - 30) + " 440 Q" + p[0] + " " + (2 * p[1] - 440) + " " + (p[0] + 30) + " 440", fill: "none", stroke: C.jeu, "stroke-width": 5 }, n.g); });
      j.titre("Chaque pic correspond au passage d'une cellule dans l'orifice. À quoi la hauteur du pic est-elle proportionnelle ?");
      j.choix([
        { html: "Au volume de la cellule", juste: true },
        { html: "À sa vitesse de passage", aide: "La vitesse joue sur la durée du pic, pas sur ce que mesure le principe de Coulter." },
        { html: "À sa teneur en hémoglobine", aide: "L'hémoglobine se dose à part, par spectrophotométrie après lyse." }
      ], { colonnes: 1, ok: function () { j.bravo("Au volume : ΔZ est proportionnelle à V cellule."); j.suite(); } });
    } },
    { nom: "Trier les impulsions", jouer: function (j, n) {
      n.classer();
      j.titre("Les discriminateurs rangent chaque impulsion selon le volume. Classe-les comme l'automate.");
      j.consigne("Touche une case pour changer sa population.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("2 à 20 fL plaquettes, 20 à 35 fL bruit, 35 à 360 fL globules rouges.");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Les seuils sont à 20 fL et à 35 fL."); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "Les coïncidences", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 200, y: 200, width: 280, height: 40, fill: C.encre }, n.g); A.s("rect", { x: 200, y: 300, width: 280, height: 40, fill: C.encre }, n.g);
      A.s("circle", { cx: 320, cy: 270, r: 22, fill: C.sang }, n.g); A.s("circle", { cx: 360, cy: 270, r: 22, fill: C.sang }, n.g);
      A.texte(n.g, "N mesuré = 50 000 /s · τ = 2 µs", [340, 440], { taille: 24, gras: 800 });
      j.titre("Deux cellules passées ensemble comptent pour une. Quel est le nombre corrigé ?");
      j.nombre({ avant: "N_{\\text{corrigé}} \\approx", apres: "/\\text{s}", cases: [{ attendu: 55258.5, tol: 3 }],
        aide: function () { return "N corrigé = N mesuré × e^(N mesuré × τ), avec τ en secondes : 2 µs = 2 × 10⁻⁶ s."; },
        ok: function () { j.bravo("Environ 55 259 par seconde."); j.expliquer("<p>\\(50\\,000 \\times e^{50\\,000 \\times 2 \\times 10^{-6}} = 50\\,000 \\times e^{0{,}1} \\approx 55\\,259\\).</p>"); j.suite(); } });
    } },
    { nom: "Un orifice plus large", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g); A.icone(n.g, "eclair", [340, 220], 180, C.jeu);
      A.texte(n.g, "ΔZ = ρ · V / A² · k", [340, 420], { taille: 32, gras: 800 });
      j.titre("Un constructeur double la section A de l'orifice, sans rien changer d'autre. Que devient l'impulsion d'une même cellule ?");
      j.choix([
        { html: "Elle double", aide: "A est au dénominateur." },
        { html: "Elle est divisée par 2", aide: "Regarde l'exposant de A." },
        { html: "Elle est divisée par 4", juste: true }
      ], { colonnes: 3, ok: function () { j.bravo("Divisée par 4 : A est au carré, au dénominateur."); j.suite(); } });
    } },
    { nom: "Les limites", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      [[260, 250], [290, 270], [270, 290], [300, 240], [310, 290]].forEach(function (p) { A.s("circle", { cx: p[0], cy: p[1], r: 18, fill: C.v, stroke: C.encre, "stroke-width": 2 }, n.g); });
      A.texte(n.g, "agrégat de plaquettes", [290, 380], { taille: 22, gras: 800 });
      j.titre("Les plaquettes d'un tube se sont collées en amas. Pourquoi l'impédance s'y trompe-t-elle ?");
      j.choix([
        { html: "Un amas passe en une seule impulsion, trop grosse pour une plaquette", juste: true },
        { html: "Les amas ne conduisent pas le courant", aide: "Aucune cellule ne le conduit bien : c'est justement ce qui crée l'impulsion." },
        { html: "L'impédance a besoin d'un colorant", aide: "Au contraire, elle est indépendante de la coloration." }
      ], { colonnes: 1, ok: function () { j.bravo("L'amas sort de la fenêtre des plaquettes : PLT faussement bas."); j.expliquer("<p>Limites de l'impédance : sensible aux agrégats plaquettaires, aux microcytes et aux fragments ; ne différencie pas finement les GB.</p>"); j.suite(); } });
    } }
  ]
}));
