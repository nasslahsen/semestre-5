/* Niveau : la centrifugeuse (2.5) : forces, rotors, maintenance préventive, contrôle du minuteur, sécurité. */
NIVEAU(LABO.rejouable({
  id: "centrifugeuse",
  init: function (fig) {
    var A = LABO, C = A.C, g = A.s("g", null, fig.svg);
    var n = { g: g, libre: true, faux: {}, pl: { P: function (v) { return v; } } };
    var T = [null, "mois", "an"], ST = { mois: { t: "chaque mois", f: C.jeuPale, b: C.jeu }, an: { t: "chaque année", f: C.accPale, b: C.acc } };
    n.ITEMS = [["Verrouillage du couvercle", "mois"], ["Exactitude du minuteur", "an"], ["Joints d'étanchéité", "mois"], ["Système de freinage", "an"], ["Lubrifier les connexions du rotor", "mois"], ["Cartes électroniques", "an"]]
      .map(function (x) { return { t: x[0], z: x[1], choix: null }; });
    n.classer = function () {
      A.vider(g);
      n.ITEMS.forEach(function (it, i) {
        var x = 30 + (i % 2) * 320, y = 40 + Math.floor(i / 2) * 180, st = it.choix ? ST[it.choix] : null;
        A.boite(g, x, y, 300, 150, { fond: st ? st.f : "#fff", bord: n.faux[i] ? C.ko : st ? st.b : C.trait, ep: n.faux[i] ? 4 : 2.5, rx: 14, titre: it.t, sous: st ? st.t : "à classer", taille: 20, coulSous: st ? st.b : C.gris });
        A.cible(g, x, y, 300, 150, function () { if (!n.libre) return; it.choix = T[(T.indexOf(it.choix) + 1) % T.length]; delete n.faux[i]; n.classer(); });
      });
    };
    return n;
  },
  etapes: [
    { nom: "Le bon rotor", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "centrifugeuse", [340, 280], 260, A.C.jeu);
      j.titre("Pour une séparation par densité où l'on veut la résolution maximale des zones, quel rotor le cours indique-t-il ?");
      j.choix([
        { html: "Rotor à angle fixe", aide: "L'angle fixe est le rotor d'usage courant : il raccourcit le trajet et le temps." },
        { html: "Rotor à godets oscillants", juste: true },
        { html: "Rotor à tubes verticaux", aide: "Les tubes verticaux servent quand un temps de centrifugation court est important." }
      ], { colonnes: 1, ok: function () {
        j.bravo("Godets oscillants : résolution maximale des zones.");
        j.expliquer("<p>Angle fixe : usage courant, plus rapide. Tubes verticaux : temps court. Quasi verticaux : gradients où certains éléments ne participent pas.</p>");
        j.suite();
      } });
    } },
    { nom: "Le minuteur", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.icone(n.g, "horloge", [340, 200], 180, C.jeu);
      A.texte(n.g, "programmé : 10 min", [340, 360], { taille: 24, gras: 700 });
      A.texte(n.g, "chronométré : 10 min 54 s", [340, 410], { taille: 24, gras: 700, coul: C.jeu });
      j.titre("Contrôle annuel : on programme 10 minutes, on chronomètre 10 min 54 s. Quel est l'écart, en pourcentage du temps programmé ?");
      j.nombre({ avant: "\\text{écart} =", apres: "\\%", cases: [{ attendu: 9, tol: 0.05 }],
        aide: function () { return "Mets tout en secondes : 600 s programmées, 654 s mesurées. Écart = (mesuré − programmé) / programmé × 100."; },
        ok: function () {
          j.bravo("9 % : dans la tolérance de ± 10 %.");
          j.expliquer("<p>Le temps mesuré ne doit pas varier de plus de ± 10 % par rapport au temps programmé. Ici, \\(\\frac{654 - 600}{600} = 9\\,\\%\\) : le minuteur est conforme.</p>");
          j.suite();
        } });
    } },
    { nom: "Chaque mois, chaque année", jouer: function (j, n) {
      n.classer();
      j.titre("La maintenance préventive a deux rythmes. Classe chaque contrôle.");
      j.consigne("Touche une case pour choisir : chaque mois, ou chaque année.");
      var bt = E.h("button", "btn bleu", "Vérifier", j.el); bt.type = "button";
      function gagner() {
        n.libre = false; bt.remove(); n.classer();
        j.bravo("Le mécanique chaque mois, les commandes et l'électronique chaque année.");
        j.expliquer("<p>Chaque mois : propreté, compartiment du rotor, connexions et ajustements du rotor (lubrifiés), verrouillage et sécurité du couvercle, joints. Chaque année : cartes électroniques, commandes (vitesse, durée, température, alarmes), température au thermomètre électronique, minuteur à ± 10 %, freinage.</p>");
        j.suite();
      }
      bt.addEventListener("click", function () {
        var faux = 0;
        n.ITEMS.forEach(function (it, i) { if (it.choix !== it.z) { n.faux[i] = true; faux++; } });
        n.classer();
        if (faux) { j.erreur(faux + (faux > 1 ? " cases sont mal classées." : " case est mal classée.") + " Les contrôles qui demandent des instruments (chronomètre, thermomètre) ou touchent à l'électronique reviennent une fois par an."); return; }
        gagner();
      });
      j.reponse(function () { n.ITEMS.forEach(function (it) { it.choix = it.z; }); n.faux = {}; gagner(); });
    } },
    { nom: "Flotter ou couler", jouer: function (j, n) {
      var A = LABO, C = A.C; A.vider(n.g);
      A.s("rect", { x: 260, y: 220, width: 160, height: 160, rx: 10, fill: C.jeuPale, stroke: C.jeu, "stroke-width": 4 }, n.g);
      A.fleche(n.g, [340, 300], [340, 500], { coul: C.encre, ep: 5 }); A.texte(n.g, "Fp", [380, 470], { taille: 26, gras: 800 });
      A.fleche(n.g, [340, 300], [340, 110], { coul: C.acc, ep: 5 }); A.texte(n.g, "Fa", [380, 140], { taille: 26, gras: 800, coul: C.acc });
      j.titre("Une particule est soumise à la pesanteur \\(F_p\\) et à la poussée d'Archimède \\(F_a\\). D'après le cours, quand flotte-t-elle ?");
      j.choix([
        { tex: "F_a > F_p", juste: true },
        { tex: "F_a < F_p", aide: "Si la pesanteur l'emporte, la particule coule." },
        { tex: "F_a = 0", aide: "La poussée d'Archimède ne dépend que du volume : elle n'est jamais nulle pour une particule immergée." }
      ], { colonnes: 3, ok: function () {
        j.bravo("Elle flotte si la poussée l'emporte sur la pesanteur.");
        j.expliquer("<p>Pour un même volume, \\(F_p\\) dépend de la densité, pas \\(F_a\\). Dans la centrifugeuse, c'est la force centrifuge \\(F_c = M\\omega^2 R\\) qui sépare les composés selon leur densité.</p>");
        j.suite();
      } });
    } },
    { nom: "Sécurité", jouer: function (j, n) {
      var A = LABO; A.vider(n.g); A.icone(n.g, "centrifugeuse", [340, 280], 240, A.C.ko);
      j.titre("Le cycle est fini mais le rotor tourne encore. Un collègue pressé veut ouvrir le couvercle et ralentir le rotor avec la main gantée. Que dit le cours ?");
      j.choix([
        { html: "C'est possible avec des gants épais", aide: "Aucun gant ne rend ce geste acceptable." },
        { html: "Jamais : ne pas ouvrir une centrifugeuse en marche, ni freiner le rotor à la main", juste: true },
        { html: "C'est possible si la centrifugeuse n'est pas réfrigérée", aide: "La règle ne dépend pas du modèle." }
      ], { colonnes: 1, ok: function () { j.bravo("Jamais ouvrir en marche, jamais freiner à la main."); j.suite(); } });
    } }
  ]
}));
