/* Boss du chapitre 8 (affiché 2) : le dossier d'une nouvelle cupule de hanche, de l'idée au suivi. */
NIVEAU({
  id: "boss-histoire",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { avance: 0 };
    n.dessin = function () {
      E.vider(g);
      // cupule en coupe : demi-anneau métallique et insert
      var H = [340, 330];
      function anneau(r1, r2) {
        var P = function (r, a) { return (H[0] + r * Math.cos(a)).toFixed(1) + " " + (H[1] - r * Math.sin(a)).toFixed(1); };
        return "M" + P(r2, 0) + " A" + r2 + " " + r2 + " 0 0 0 " + P(r2, Math.PI) + " L" + P(r1, Math.PI) + " A" + r1 + " " + r1 + " 0 0 1 " + P(r1, 0) + " Z";
      }
      E.s("path", { d: "M120 330 Q140 150 340 140 Q540 150 560 330 Z", fill: "#f4ead8", stroke: "#cbb893", "stroke-width": 3 }, g);
      E.s("path", { d: anneau(150, 180), fill: "#a9b0bc", stroke: C.encre, "stroke-width": 3 }, g);
      E.s("path", { d: anneau(110, 150), fill: n.avance >= 3 ? PLATEFORME.teinte(0.6) : "#fff", stroke: C.encre, "stroke-width": 3 }, g);
      if (n.avance >= 1) E.s("path", { d: anneau(180, 188), fill: C.jeu }, g);
      D.texte(g, "nouvelle cupule", [340, 400], { taille: 22 });
      var L = ["dossier", "domaine", "suivi", "exigences", "histoire"];
      L.forEach(function (l, i) { D.rond(g, [140 + i * 100, 480], 16, { fill: i < n.avance ? C.ok : "#fff", stroke: i < n.avance ? C.ok : C.encre, ep: 3 }); D.texte(g, l, [140 + i * 100, 520], { taille: 16, gras: false }); });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Le chemin réglementaire", jouer: function (j, n) {
      j.titre("Remets dans l'ordre le parcours de la cupule jusqu'au patient.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;text-align:center;font-size:16px"><b>1</b><b>2</b><b>3</b>' +
        '<span class="trou" data-attendu="b"></span><span class="trou" data-attendu="v"></span><span class="trou" data-attendu="h"></span><b>4</b><b>5</b><b>6</b>' +
        '<span class="trou" data-attendu="c"></span><span class="trou" data-attendu="s"></span><span class="trou" data-attendu="q"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "c", html: "commercialisation" }, { id: "h", html: "passage à l'homme" }, { id: "q", html: "comparaison à l'ancienne cupule" }, { id: "b", html: "bancs d'essais" }, { id: "s", html: "suivi des patients" }, { id: "v", html: "in vitro puis in vivo" }],
        aide: "Machines, puis vivant hors de l'homme, puis homme selon un protocole strict, puis vente, puis suivi ; la comparaison exploite les données du suivi.",
        ok: function () { n.avance = 1; n.dessin(); j.bravo("Bancs, in vitro, in vivo, homme, commercialisation, suivi."); j.suite(); }
      });
    } },
    { nom: "La bonne phrase", jouer: function (j, n) {
      j.titre("Laquelle de ces phrases sur la cupule est juste ?");
      j.choix([
        { html: "C'est un dispositif de chirurgie orthopédique, et ses matériaux sont des biomatériaux selon Chester", juste: true },
        { html: "C'est une orthèse, car elle soutient l'articulation", aide: "Elle remplace une partie de l'articulation : c'est une prothèse." },
        { html: "Ce n'est pas un biomatériau, car elle est synthétique", aide: "Chester ne demande pas d'être naturel : non vivant, en contact durable avec le vivant." }
      ], { colonnes: 1, ok: function () { n.avance = 2; n.dessin(); j.bravo("Prothèse articulaire, biomatériaux."); j.suite(); } });
    } },
    { nom: "Deux cupules", jouer: function (j, n) {
      j.titre("Exemple ajouté. Nouvelle cupule : 300 patients, 9 échecs. Ancienne : 500 patients, 25 échecs. Taux de survie de chacune ?");
      j.nombre({ avant: "\\text{nouvelle},\\ \\text{ancienne} =", apres: "\\%", cases: [{ attendu: 97, tol: 0.01 }, { attendu: 95, tol: 0.01 }], ligne: true,
        aide: function (k) { return k === 0 ? "(300 − 9) / 300 × 100." : "(500 − 25) / 500 × 100."; },
        ok: function () { n.avance = 3; n.dessin(); j.bravo("97 % contre 95 %."); j.expliquer("<p>Comparer avec un produit équivalent plus ancien fait partie de la seule vraie sécurité : implantation chez l'homme, suivi à long terme, recueil des données.</p>"); j.suite(); } });
    } },
    { nom: "Négative ou élargie ?", jouer: function (j, n) {
      j.titre("Le revêtement ne déclenche aucune inflammation, et en plus l'os vient s'y lier, comme on le souhaite pour une cupule. Quelle biocompatibilité ce second point illustre-t-il ?");
      j.choix([
        { html: "La biocompatibilité négative", aide: "La négative, c'est « ne pas nuire » : pas d'inflammation, pas de toxicité. Le second point va plus loin." },
        { html: "La biocompatibilité élargie", juste: true },
        { html: "Aucune : c'est de la biofonctionnalité mécanique", aide: "Il s'agit de la réponse de l'hôte, pas du travail mécanique." }
      ], { colonnes: 1, ok: function () { n.avance = 4; n.dessin(); j.bravo("Une réponse de l'hôte appropriée à cette application."); j.suite(); } });
    } },
    { nom: "Un peu d'histoire", jouer: function (j, n) {
      j.titre("La coque métallique de la cupule est en alliage de titane. Qu'est-ce que l'histoire du cours dit de ce choix ?");
      j.choix([
        { html: "Le titane, venu de l'aéronautique, entre en médecine en 1969 et ses alliages sortent gagnants des études de toxicité des années 70", juste: true },
        { html: "Le titane est le premier matériau de hanche réussi, dans les années 50", aide: "Dans les années 50, c'est l'acier inoxydable." },
        { html: "Le titane vient des cockpits d'avions anglais", aide: "Des cockpits, c'est le PMMA des lentilles." }
      ], { colonnes: 1, ok: function () { n.avance = 5; n.dessin(); j.bravo("Dossier complet."); j.suite(); } });
    } }
  ]
});
