/* Niveau : étude comparative des métaux et surfaces. Modules, masses, pénétration du polyéthylène, traitements de surface. */
NIVEAU({
  id: "comparer-metaux",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { vue: "module" };
    var V = {
      module: { t: "module (GPa)", max: 250, L: [["os", 20], ["Nitinol", 48], ["Ti-6Al-4V", 110], ["316L", 200], ["Co-Cr-Mo", 230]] },
      densite: { t: "densité (g/cm³)", max: 18, L: [["Ti-Cp", 4.5], ["316L", 7.9], ["Co-Cr-Mo", 8.3], ["tantale", 16.6]] },
      pe: { t: "pénétration du PEhd (mm/an)", max: 0.2, L: [["zircone", 0.05], ["alumine", 0.1], ["CoCr", 0.15]] }
    };
    n.dessin = function () {
      E.vider(g);
      var v = V[n.vue], X0 = 190, W = 400, pas = 380 / v.L.length;
      D.texte(g, v.t, [X0 + W / 2, 110], { taille: 19, coul: C.doux, gras: false });
      D.ligne(g, [X0, 140], [X0, 150 + v.L.length * pas], C.encre, 3);
      v.L.forEach(function (l, i) {
        var y = 150 + i * pas, w = l[1] / v.max * W;
        D.texte(g, l[0], [X0 - 14, y + pas * 0.35], { ancre: "end", taille: 19 });
        E.s("rect", { x: X0, y: y, width: w, height: pas * 0.7, rx: 8, fill: l[0] === "os" ? "#b89b6a" : /Ti/.test(l[0]) ? C.jeu : "#8e97a6" }, g);
        D.texte(g, E.fmt(l[1], l[1] < 1 ? 2 : l[1] % 1 ? 1 : 0), [X0 + w + 12, y + pas * 0.35], { ancre: "start", taille: 18, mono: true });
      });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Du plus souple au plus rigide", jouer: function (j, n) {
      j.fig.astuce("L'os est vers 20 GPa.");
      n.vue = "module"; n.dessin();
      j.titre("Range ces métaux du module le plus faible au plus élevé.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;text-align:center;font-size:16px"><b>le plus souple</b><b></b><b></b><b>le plus rigide</b>' +
        '<span class="trou" data-attendu="n"></span><span class="trou" data-attendu="t"></span><span class="trou" data-attendu="ta"></span><span class="trou" data-attendu="c"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", html: "Co-Cr-Mo" }, { id: "ta", html: "tantale" }, { id: "n", html: "Nitinol" }, { id: "t", html: "Ti-Cp" }],
        aide: "Valeurs du tableau : Nitinol au moins 48, Ti-Cp 100, tantale 190, Co-Cr-Mo 230 GPa.",
        ok: function () { j.bravo("48, 100, 190, 230 GPa."); j.suite(); }
      });
    } },
    { nom: "Deux plaques", jouer: function (j, n) {
      n.vue = "densite"; n.dessin();
      j.fig.astuce("");
      j.titre("Une plaque occupe 25 cm³. Quelle est sa masse en Ti-Cp (4,5 g/cm³) ? Et en tantale massif (16,6 g/cm³) ?");
      j.nombre({ avant: "m_{Ti},\\ m_{Ta} =", apres: "\\text{g}", cases: [{ attendu: 112.5, tol: 0.05 }, { attendu: 415, tol: 0.05 }], ligne: true,
        aide: function (k) { return k === 0 ? "m = ρ × V = 4,5 × 25." : "16,6 × 25."; },
        ok: function () { j.bravo("112,5 g contre 415 g."); j.expliquer("<p>La densité élevée du tantale le limite à quelques applications (fils, clips, agrafes) ; sous forme poreuse, il devient intéressant.</p>"); j.suite(); } });
    } },
    { nom: "Le couple le plus doux", jouer: function (j, n) {
      n.vue = "pe"; n.dessin();
      j.titre("D'après le tableau de S. Terver, quelle tête pénètre le moins un insert en polyéthylène haute densité ?");
      j.choix([
        { html: "CoCr", aide: "CoCr / PEhd : 0,15 mm/an. Il y a mieux." },
        { html: "Alumine", aide: "Alumine / PEhd : 0,1 mm/an. Il y a encore mieux." },
        { html: "Zircone", juste: true }
      ], { ok: function () { j.bravo("Zircone / PEhd : 0,05 mm/an."); j.suite(); } });
    } },
    { nom: "Quinze ans", jouer: function (j, n) {
      j.titre("Une tête en alumine pénètre son insert en PEhd de 0,1 mm/an. Quelle pénétration après 15 ans ?");
      j.nombre({ avant: "p =", apres: "\\text{mm}", cases: [{ attendu: 1.5, tol: 0.001 }], ligne: true,
        aide: function () { return "0,1 mm/an × 15 ans."; },
        ok: function () { j.bravo("1,5 mm."); j.expliquer("<p>Aucun consensus sur le couple : États-Unis surtout PE très hautement réticulé et tête métallique ; France surtout PE conventionnel et tête céramique ; Corée, 70 % céramique-céramique.</p>"); j.suite(); } });
    } },
    { nom: "Les surfaces", jouer: function (j, n) {
      j.titre("Associe chaque traitement de surface à sa famille.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:center;font-size:17px">' +
        '<span>sablage</span><span class="trou" data-attendu="m"></span><span>oxydation anodique</span><span class="trou" data-attendu="c"></span>' +
        '<span>projection plasma</span><span class="trou" data-attendu="r"></span><span>silanisation</span><span class="trou" data-attendu="e"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "e", html: "enrobage chimique" }, { id: "r", html: "revêtement physique" }, { id: "m", html: "finition mécanique" }, { id: "c", html: "finition chimique" }],
        aide: "Sabler, c'est frotter ; l'oxydation anodique est une réaction chimique ; le plasma projette une couche ; la silanisation greffe des molécules.",
        ok: function () { j.bravo("Mécanique, chimique, revêtement, enrobage."); j.expliquer("<p>La surface joue un rôle majeur dans la réponse biologique. Les métaux ont une énergie de surface élevée : des matières organiques s'y adsorbent, d'où une couche oxydée et contaminée qu'on traite.</p>"); j.suite(); }
      });
    } }
  ]
});
