/* Niveau : alliages cobalt-chrome. Alliage forgeable des tiges, rôle des éléments, écrouissage, usure des couples, forgeage à chaud. */
NIVEAU({
  id: "cobalt-chrome",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { etat: "recuit", ans: 0 };
    n.dessin = function () {
      E.vider(g);
      // à gauche : limite élastique et rupture, recuit ou écroui
      var O = [80, 520], H = 340, max = 1100, v = n.etat === "recuit" ? [300, 800] : [650, 1000];
      D.texte(g, "Co20Cr35Ni10Mo, " + n.etat, [200, 110], { taille: 19, coul: C.doux, gras: false });
      D.ligne(g, O, [O[0] + 260, O[1]], C.encre, 3);
      [["limite", v[0], "#8e97a6"], ["rupture", v[1], C.jeu]].forEach(function (b, i) {
        var h = b[1] / max * H, x = O[0] + 30 + i * 120;
        E.s("rect", { x: x, y: O[1] - h, width: 80, height: h, rx: 8, fill: b[2] }, g);
        D.texte(g, String(b[1]), [x + 40, O[1] - h - 20], { taille: 19, mono: true });
        D.texte(g, b[0], [x + 40, O[1] + 26], { taille: 17, gras: false });
      });
      D.texte(g, "MPa", [O[0] + 10, O[1] - H - 20], { taille: 16, gras: false, coul: C.doux });
      // à droite : usure cumulée (µm) de deux couples, n.ans années
      var X = 400;
      D.texte(g, n.ans ? "usure en " + n.ans + " ans" : "usure cumulée", [520, 110], { taille: 19, coul: C.doux, gras: false });
      [["métal-métal", 4.2, C.jeu], ["métal-PE", 300, "#3b5bdb"]].forEach(function (b, i) {
        var u = b[1] * n.ans, h = Math.min(340, u / 3000 * 340), x = X + i * 130;
        E.s("rect", { x: x, y: 520 - Math.max(3, h), width: 80, height: Math.max(3, h), rx: 8, fill: b[2] }, g);
        D.texte(g, b[0], [x + 40, 546], { taille: 16, gras: false });
        if (n.ans) D.texte(g, E.fmt(u, u < 100 ? 1 : 0) + " µm", [x + 40, 520 - Math.max(3, h) - 20], { taille: 17, mono: true });
      });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "La tige de hanche", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("Parmi les deux alliages Co-Cr fréquents, lequel choisir pour une tige de hanche lourdement chargée, difficile à remplacer ?");
      j.choix([
        { html: "Le coulable Co-Cr-Mo (F75)", aide: "Le coulable sert surtout en dentaire et pour les implants articulaires. Le cours insiste sur la fatigue de l'autre." },
        { html: "Le forgeable Co-Ni-Cr-Mo (F562)", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("Le forgeable F562 : excellente résistance à la fatigue.");
        j.expliquer("<p>Quatre alliages Co-Cr sont recommandés (F75, F90, F562, F563) ; deux sont fréquents : le coulable <b>F75</b> et le forgeable <b>F562</b>. Le second convient aux applications qui exigent une longue durée de vie sans rupture sous charge statique ou cyclique.</p>");
        j.suite();
      } });
    } },
    { nom: "Chaque élément son rôle", jouer: function (j, n) {
      j.titre("Associe chaque élément à son rôle dans l'alliage.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:1fr 1.6fr;gap:8px;align-items:center;font-size:17px">' +
        '<b>cobalt</b><span class="trou" data-attendu="b"></span><b>chrome</b><span class="trou" data-attendu="o"></span><b>molybdène</b><span class="trou" data-attendu="g"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "g", html: "grains fins" }, { id: "b", html: "base, plus de 60 %" }, { id: "o", html: "couche d'oxyde compacte" }],
        aide: "Le chrome protège la surface ; le molybdène agit sur la taille des grains ; le cobalt est l'élément majoritaire.",
        ok: function () { j.bravo("Base, oxyde protecteur, grains fins."); j.suite(); }
      });
    } },
    { nom: "Écrouir", jouer: function (j, n) {
      j.titre("On écrouit à froid l'alliage recuit. De combien de MPa montent la limite élastique et la résistance à la rupture ?");
      j.nombre({ avant: "\\Delta R_e,\\ \\Delta R_r =", apres: "\\text{MPa}", cases: [{ attendu: 350, tol: 0 }, { attendu: 200, tol: 0 }], ligne: true,
        aide: function (k) { return k === 0 ? "Limite élastique : 650 écroui, 300 recuit." : "Rupture : 1000 écroui, 800 recuit."; },
        ok: function () {
          n.etat = "écroui à froid"; n.dessin();
          j.bravo("+350 MPa et +200 MPa.");
          j.expliquer("<p>L'écrouissage à froid augmente considérablement la résistance mécanique ; le module reste \\(2{,}35 \\cdot 10^5\\) MPa et la déformation minimale passe de 40 à 20 %. L'alliage est plus rigide et plus résistant que l'acier inoxydable.</p>");
          j.suite();
        } });
    } },
    { nom: "Huit ans d'usure", jouer: function (j, n) {
      j.titre("En 8 ans, quelle usure pour une prothèse métal sur métal à 4,2 µm/an ? Et pour un couple métal-polyéthylène à 300 µm/an ?");
      j.nombre({ avant: "u_{MM},\\ u_{MP} =", apres: "\\mu\\text{m}", cases: [{ attendu: 33.6, tol: 0.05 }, { attendu: 2400, tol: 0.5 }], ligne: true,
        aide: function (k) { return k === 0 ? "4,2 × 8." : "300 × 8."; },
        ok: function () {
          E.anime(900, function (u) { n.ans = Math.round(8 * u); n.dessin(); });
          j.bravo("33,6 µm contre 2400 µm.");
          j.expliquer("<p>La faible usure des prothèses métal sur métal en CoCrMo vient de sa dureté et de sa ténacité (McKee-Farrar : 4,2 µm/an). Le couple métal-polyéthylène conventionnel, standard pendant près de quatre décennies, s'use de 100 à 400 µm/an.</p>");
          j.suite();
        } });
    } },
    { nom: "Trouve l'erreur", jouer: function (j, n) {
      j.titre("Un camarade écrit : « Pour une grande tige de hanche en Co-Ni-Cr-Mo, on façonne l'alliage à froid. » Où est l'erreur ?");
      j.choix([
        { html: "Seul le forgeage à chaud est possible pour une pièce de cette taille", juste: true },
        { html: "Le Co-Ni-Cr-Mo ne sert pas pour les tiges", aide: "Si : c'est même son application principale." },
        { html: "Il fallait dire « coulé à froid »", aide: "On coule un métal fondu, donc chaud ; et le cours parle de forgeage pour cet alliage." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Très difficile à façonner à froid : forgeage à chaud.");
        j.expliquer("<p>Autres points à retenir : module de 220 à 234 GPa, plus que l'inox ; artefacts d'IRM ; in vitro, les particules de Co et de Ni sont toxiques pour les cellules, celles de Cr et de Co-Cr sont bien acceptées.</p>");
        j.suite();
      } });
    } }
  ]
});
