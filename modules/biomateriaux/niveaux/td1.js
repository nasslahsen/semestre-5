/* TD 1, application 1.1 : la plaque semi-cristalline (zones de la courbe, masse, volume après chauffage et trempe). */
NIVEAU({
  id: "td1",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { marque: null, libre: true, ep: 1 };
    var X0 = 80, W = 540, Y0 = 470, H = 300, Tg = 100, Tf = 200;
    function x(t) { return X0 + t / 260 * W; }
    function y(l) { return Y0 - (l - 5.5) / 4.5 * H; }
    function logE(t) { return t < Tg ? 9.48 : t < Tf ? 6 + 3.3 * Math.sqrt(0.5) - 0.3 * (t - Tg) / (Tf - Tg) : 6; }
    n.zones = { vitreux: [50, 9.48], deux: [150, logE(150)], fondu: [230, 6] };
    n.dessin = function () {
      E.vider(g);
      D.fleche(g, [X0, Y0], [X0 + W + 30, Y0], C.encre, 3); D.fleche(g, [X0, Y0], [X0, Y0 - H - 30], C.encre, 3);
      D.texte(g, "log Er", [X0 + 10, Y0 - H - 45], { taille: 18, ancre: "start", gras: false });
      [[Tg, "Tg = 100 °C"], [Tf, "Tf = 200 °C"]].forEach(function (q) { D.ligne(g, [x(q[0]), Y0], [x(q[0]), Y0 - H], C.doux, 2, "6 5"); D.texte(g, q[1], [x(q[0]), Y0 + 26], { taille: 16 }); });
      var pts = [];
      for (var t = 0; t <= 260; t += 2) pts.push(x(t).toFixed(1) + "," + y(logE(t)).toFixed(1));
      E.s("polyline", { points: pts.join(" "), fill: "none", stroke: C.jeu, "stroke-width": 5 }, g);
      Object.keys(n.zones).forEach(function (k) { var z = n.zones[k], m = n.marque === k; D.rond(g, [x(z[0]), y(z[1])], m ? 16 : 12, { fill: m ? D.C.acc : "#fff", stroke: D.C.acc, ep: 4 }); });
      fig.chip("plaque 10 × 10 × 0,1 cm, X = 50 %");
    };
    n.x = x; n.y = y;
    svg.addEventListener("click", function (ev) {
      if (!n.libre || !n.surClic) return;
      var p = E.point(svg, ev);
      Object.keys(n.zones).forEach(function (k) { var z = n.zones[k]; if (Math.hypot(p[0] - x(z[0]), p[1] - y(z[1])) < 34) n.surClic(k); });
    });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Les zones de la courbe", jouer: function (j, n) {
      j.fig.astuce("Touche un des trois points de la courbe.");
      j.titre("Touche le point où le polymère est un « composite » : cristaux dispersés dans une phase amorphe caoutchouteuse.");
      var gagne = function () {
        n.libre = false; n.marque = "deux"; n.dessin();
        j.bravo("Entre Tg et Tf.");
        j.expliquer("<p>Sous \\(T_g\\) : vitreux, environ 3 GPa (\\(\\log E_r \\approx 9{,}48\\)). Entre \\(T_g\\) et \\(T_f\\) : la phase amorphe est caoutchouteuse, les cristaux tiennent, le module baisse lentement. Au-dessus de \\(T_f\\) : tout est amorphe caoutchouteux, plateau vers 1 MPa grâce à la très haute masse moléculaire.</p>");
        j.suite();
      };
      n.surClic = function (k) {
        if (k === "deux") gagne();
        else { n.marque = k; n.dessin(); j.erreur(k === "vitreux" ? "Sous Tg, la phase amorphe est encore vitreuse." : "Au-dessus de Tf, il n'y a plus de cristaux."); }
      };
      j.reponse(gagne);
    } },
    { nom: "La masse de la plaque", jouer: function (j, n) {
      n.surClic = null;
      j.fig.astuce("");
      j.titre("Densités : amorphe 1 g/cm³, cristallin 1,2 g/cm³, X = 0,5. Quelle est la densité de la plaque, puis sa masse ?");
      j.nombre({ avant: "\\rho,\\ m =", cases: [{ attendu: 1.1, tol: 0.001 }, { attendu: 11, tol: 0.01 }], ligne: true,
        aide: function (k) { return k === 0 ? "ρ = ρc X + ρa (1 − X)." : "V = 10 × 10 × 0,1 cm³, puis m = ρ V."; },
        ok: function () { j.bravo("1,1 g/cm³ et 11 g."); j.expliquer("<p>\\[\\rho = \\rho_c X + \\rho_a (1 - X)\\]</p>"); j.suite(); } });
    } },
    { nom: "Chauffée à 150 °C", jouer: function (j, n) {
      j.titre("La plaque est chauffée à 150 °C puis refroidie instantanément. Quel est son volume ?");
      j.nombre({ avant: "V =", apres: "\\text{cm}^3", cases: [{ attendu: 10, tol: 0.01 }], ligne: true,
        aide: function () { return "150 °C est sous Tf = 200 °C : les cristaux fondent-ils ?"; },
        ok: function () { j.bravo("10 cm³ : l'état ne change pas."); j.suite(); } });
    } },
    { nom: "Chauffée à 250 °C", jouer: function (j, n) {
      j.titre("Chauffée à 250 °C, elle fond ; refroidie instantanément, elle ne recristallise pas. Quel est son volume ?");
      j.nombre({ avant: "V =", apres: "\\text{cm}^3", cases: [{ attendu: 11, tol: 0.01 }], ligne: true,
        aide: function () { return "La masse reste 11 g ; sans cristaux, ρ = ρa = 1 g/cm³."; },
        ok: function () { j.bravo("11 cm³."); j.expliquer("<p>Même masse, densité plus faible : le volume augmente.</p>"); j.suite(); } });
    } }
  ]
});
