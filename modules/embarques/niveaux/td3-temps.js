/* TD 3, contraintes temporelles : tmax, part du temps laissée à la boucle, durée moyenne de la boucle, routine trop longue. */
NIVEAU({
  id: "td3-temps",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { d: 1, T: 5 };
    n.dessin = function () {
      EMB.vider(g);
      var x0 = 40, W = 600, tmax = 30, X = function (t) { return x0 + t / tmax * W; };
      EMB.texte(g, "Interruption toutes les " + n.T + " ms, routine de " + EMB.virgule(n.d) + " ms", [340, 60], { taille: 18 });
      for (var t = 0; t < tmax; t += n.T) {
        EMB.fleche(g, [X(t), 110], [X(t), 160], { coul: EMB.C.ko, ep: 3 });
        EMB.el("rect", { x: X(t), y: 190, width: X(Math.min(n.d, n.T)) - X(0), height: 90, fill: EMB.C.acc }, g);
        EMB.el("rect", { x: X(t + Math.min(n.d, n.T)), y: 190, width: Math.max(0, X(n.T - n.d) - X(0)), height: 90, fill: EMB.C.clair }, g);
      }
      EMB.el("rect", { x: x0, y: 190, width: W, height: 90, fill: "none", stroke: EMB.C.encre, "stroke-width": 2 }, g);
      EMB.el("line", { x1: x0, y1: 330, x2: x0 + W, y2: 330, stroke: EMB.C.encre, "stroke-width": 2.5 }, g);
      for (var u = 0; u <= tmax; u += 5) EMB.texte(g, String(u), [X(u), 356], { taille: 16, mono: true, gras: false });
      EMB.texte(g, "t (ms)", [x0 + W, 390], { taille: 16, gras: false, ancre: "end" });
      EMB.el("rect", { x: x0, y: 440, width: 26, height: 22, fill: EMB.C.acc }, g);
      EMB.texte(g, "routine", [x0 + 36, 451], { taille: 17, ancre: "start", gras: false });
      EMB.el("rect", { x: x0 + 220, y: 440, width: 26, height: 22, fill: EMB.C.clair, stroke: EMB.C.encre, "stroke-width": 1 }, g);
      EMB.texte(g, "boucle principale (30 ms de calcul)", [x0 + 256, 451], { taille: 17, ancre: "start", gras: false });
    };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "tmax", jouer: function (j, n) {
      j.titre("Une boucle de 30 ms, une interruption toutes les 5 ms, bloquée pendant sa routine. Durée maximale de la routine ?");
      j.nombre({ avant: "t_{max} =", apres: "\\text{ms}", cases: [{ attendu: 5, tol: 0 }], ligne: true,
        aide: function () { return "La routine doit être finie avant l'interruption suivante."; },
        ok: function () {
          j.bravo("tmax = T = 5 ms.");
          j.suite();
        } });
    } },
    { nom: "Part de la boucle", jouer: function (j, n) {
      n.d = 1; n.dessin();
      j.titre("La routine dure 1 ms toutes les 5 ms. Quelle part du temps reste à la boucle principale ?");
      j.nombre({ avant: "\\text{part} =", apres: "\\%", cases: [{ attendu: 80, tol: 0.5 }], ligne: true,
        aide: function () { return "Part = 1 − t / T."; },
        ok: function () {
          j.bravo("1 − 1/5 = 0,8 : 80 % du temps.");
          j.suite();
        } });
    } },
    { nom: "Durée moyenne", jouer: function (j, n) {
      j.titre("La boucle a besoin de 30 ms de calcul. Combien de temps dure-t-elle en moyenne, avec cette routine ?");
      j.nombre({ avant: "t_{boucle} =", apres: "\\text{ms}", cases: [{ attendu: 37.5, tol: 0.1 }], ligne: true,
        aide: function () { return "Elle n'avance que 80 % du temps : 30 / 0,8."; },
        ok: function () {
          j.bravo("30 / 0,8 = 37,5 ms.");
          j.expliquer("<p>\\[t_{boucle} = \\frac{t_0}{1 - t / T}\\]</p>");
          j.suite();
        } });
    } },
    { nom: "Exactement tmax", jouer: function (j, n) {
      n.d = 5; n.dessin();
      j.titre("La routine dure exactement 5 ms. Que se passe-t-il ?");
      j.choix([
        { html: "La boucle ralentit de moitié", aide: "Regarde la figure : reste-t-il du temps clair entre deux routines ?" },
        { html: "La boucle principale ne s'exécute plus jamais", juste: true },
        { html: "Les interruptions sont perdues", aide: "Chacune se termine juste à temps pour la suivante : aucune n'est perdue." }
      ], { colonnes: 1, ok: function () {
        j.bravo("100 % du temps dans l'interruption : le système est figé.");
        j.suite();
      } });
    } },
    { nom: "Réarmement", jouer: function (j, n) {
      n.d = 7; n.dessin();
      j.titre("La routine dure 7 ms et réarme les interruptions pendant son exécution. Que se passe-t-il ?");
      j.choix([
        { html: "Les demandes en trop sont simplement perdues", aide: "C'est le cas sans réarmement. Ici, une nouvelle demande peut interrompre la routine en cours." },
        { html: "La boucle reprend entre deux routines", aide: "Avec 7 ms toutes les 5 ms, il ne reste jamais de temps libre." },
        { html: "Les routines s'imbriquent, la pile grossit jusqu'à déborder", juste: true }
      ], { colonnes: 1, ok: function () {
        j.bravo("Chaque routine interrompue laisse son contexte sur la pile, sans fin : le programme plante.");
        j.suite();
      } });
    } }
  ]
});
