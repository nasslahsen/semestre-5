/* Niveau : choisir et valider. Ordre des outils de choix, cellules d'essai, la seule vraie sécurité, cahier des charges, taux de survie. */
NIVEAU({
  id: "choisir-valider",
  init: function (fig) {
    var C = D.C, svg = fig.svg, g = E.s("g", null, svg);
    var n = { k: -1, marque: -1, libre: true };
    var ET = ["calculs", "machines", "cellules", "animaux", "homme", "suivi"];
    n.pos = function (i) { return [80 + i * 104, i % 2 ? 360 : 260]; };
    n.dessin = function () {
      E.vider(g);
      D.texte(g, "du calcul au patient", [340, 140], { taille: 19, coul: C.doux, gras: false });
      ET.forEach(function (e, i) { if (i) D.ligne(g, n.pos(i - 1), n.pos(i), i <= n.k ? C.jeu : C.pale, 6); });
      ET.forEach(function (e, i) {
        var p = n.pos(i), fait = i <= n.k, m = i === n.marque;
        D.rond(g, p, m ? 34 : 26, { fill: fait ? C.jeu : "#fff", stroke: m ? D.C.acc : fait ? C.jeu : C.encre, ep: m ? 6 : 4 });
        D.texte(g, String(i + 1), [p[0], p[1] + 1], { taille: 19, fond: false, coul: fait ? "#fff" : C.encre });
        D.texte(g, e, [p[0], p[1] + (i % 2 ? 60 : -60)], { taille: 18 });
      });
    };
    svg.addEventListener("click", function (ev) {
      if (!n.libre || !n.surClic) return;
      var p = E.point(svg, ev);
      ET.forEach(function (e, i) { var q = n.pos(i); if (Math.hypot(p[0] - q[0], p[1] - q[1]) < 40) n.surClic(i); });
    });
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "L'ordre des outils", jouer: function (j, n) {
      j.fig.astuce("On va du plus sûr au plus risqué.");
      j.titre("Range les essais d'un nouveau biomatériau dans l'ordre.");
      var z = j.zone("", '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;text-align:center;font-size:16px"><b>1</b><b>2</b><b>3</b><b>4</b><b>5</b>' +
        '<span class="trou" data-attendu="s"></span><span class="trou" data-attendu="m"></span><span class="trou" data-attendu="c"></span><span class="trou" data-attendu="a"></span><span class="trou" data-attendu="h"></span></div>');
      j.jetons({
        trous: [].slice.call(z.querySelectorAll(".trou")),
        jetons: [{ id: "a", html: "modèles animaux" }, { id: "h", html: "études chez l'homme" }, { id: "s", html: "simulations" }, { id: "c", html: "cultures cellulaires" }, { id: "m", html: "bancs d'essais" }],
        aide: "D'abord ce qui ne demande rien de fabriquer (calculs), puis les machines, puis le vivant, du plus petit (cellules) au patient.",
        ok: function () {
          E.anime(900, function (u) { n.k = Math.round(u * 4); n.dessin(); });
          j.bravo("Calculs, essais mécaniques, puis biologiques.");
          j.expliquer("<p>Outils de choix : 1. <b>calculs et simulations</b> (contraintes, déformations, interfaces) ; 2. <b>essais mécaniques</b> (rupture, bancs d'usure et d'écoulement, simulateurs articulaires et vasculaires) ; 3. <b>biologiques</b> (cultures cellulaires, modèles animaux, études chez l'homme).</p>");
          j.suite();
        }
      });
    } },
    { nom: "Quelles cellules ?", jouer: function (j, n) {
      j.fig.astuce("");
      j.titre("On veut savoir si un revêtement favorise la formation d'os. Quelles cellules cultive-t-on dessus ?");
      j.choix([
        { html: "Des fibroblastes", aide: "Les fibroblastes soutiennent le tissu conjonctif, comme le derme." },
        { html: "Des cellules endothéliales", aide: "Elles contrôlent le tonus des vaisseaux : utiles pour une prothèse vasculaire." },
        { html: "Des ostéoblastes", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("Les ostéoblastes fabriquent l'os.");
        j.expliquer("<p>L'<b>ostéoblaste</b> synthétise et minéralise la matrice osseuse, pendant la croissance, le renouvellement et la réparation de l'os.</p>");
        j.suite();
      } });
    } },
    { nom: "La seule vraie sécurité", jouer: function (j, n) {
      n.k = 5; n.libre = true; n.dessin();
      j.fig.astuce("Touche une étape du chemin.");
      j.titre("Le cours parle d'« une seule vraie sécurité ». Touche l'étape qui la donne.");
      var gagne = function () {
        n.libre = false; n.marque = 5; n.dessin();
        j.bravo("Le suivi à long terme chez l'homme.");
        j.expliquer("<p>Une seule vraie sécurité : l'implantation chez l'homme, le <b>suivi à long terme</b> et le recueil des données (résultats, échecs, survie), en comparant avec un produit équivalent plus ancien.</p>");
        j.suite();
      };
      n.surClic = function (i) {
        if (i === 5) gagne();
        else { n.marque = i; n.dessin(); j.erreur(i === 4 ? "Presque : poser l'implant ne suffit pas. Il faut voir ce qu'il devient sur des années." : "Calculs, machines, cellules et animaux préparent le terrain, mais ne remplacent pas le corps humain sur la durée."); }
      };
      j.reponse(gagne);
    } },
    { nom: "L'intrus", jouer: function (j, n) {
      n.surClic = null;
      j.fig.astuce("");
      j.titre("Quel point n'est pas dans le cahier des charges d'un biomatériau ?");
      j.choix([
        { html: "Stérilisable", aide: "C'est le premier point du cahier des charges." },
        { html: "Le plus rigide possible", juste: true },
        { html: "Absence de réaction immunitaire", aide: "Il y est, avec l'absence de risque infectieux." },
        { html: "Moindre coût", aide: "Il y est, avec une fabrication et un stockage faciles." }
      ], { colonnes: 1, ok: function () {
        j.bravo("La rigidité dépend de l'application.");
        j.expliquer("<p>Les autres points : pas de risque infectieux, pas de toxicité, fabrication et stockage faciles.</p>");
        j.suite();
      } });
    } },
    { nom: "Le taux de survie", jouer: function (j, n) {
      j.titre("Exemple ajouté. On suit 250 prothèses pendant 10 ans : 15 échecs. Quel est le taux de survie à 10 ans ?");
      j.nombre({ avant: "\\text{survie} =", apres: "\\%", cases: [{ attendu: 94, tol: 0.01 }], ligne: true,
        aide: function () { return "Prothèses encore en place : 250 − 15. Divise par 250, puis multiplie par 100."; },
        ok: function () {
          j.bravo("235 / 250 = 94 %.");
          j.expliquer("<p>Le recueil des données du suivi (résultats, échecs, survie) permet la comparaison avec un produit équivalent plus ancien. Le marquage passe par un <b>organisme notifié</b>, avec une procédure qualité et une procédure de suivi.</p>");
          j.suite();
        } });
    } }
  ]
});
