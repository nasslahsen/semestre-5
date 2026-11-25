/* Figure : la chaîne 0-day du cours (faille cachée, exploit, attaque) sur une ligne de temps jusqu'au correctif. */
(function () {
  "use strict";
  var R = RM, A = SIS, C = A.C;
  var f = R.figure("fig-0day", {
    largeur: 960, hauteur: 400, titre: "De la faille cachée au correctif",
    essai: "<strong>Essaie</strong> : avance étape par étape. <strong>Observe</strong> : tant que le correctif n'est pas installé, la faille reste exploitable, qu'elle soit secrète ou publique."
  });
  var N = [["Faille 0-day", "cachée"], ["Exploit 0-day", "script du pirate"], ["Attaque 0-day", "l'éditeur ne sait rien"], ["Correctif publié", "faille connue"], ["Correctif installé", "faille fermée"]];
  var nd = N.map(function (p, i) { return { x: 20 + i * 188, y: 120, w: 168, h: 110, t: p[0], sous: p[1], taille: 19 }; });
  A.etapesFig(f, nd, [
    "<strong>Faille 0-day</strong> : une faiblesse existe dans le logiciel, mais personne ne la connaît, pas même l'éditeur.",
    "<strong>Exploit 0-day</strong> : un pirate la découvre et écrit le script qui l'exploite.",
    "<strong>Attaque 0-day</strong> : il attaque avant que l'éditeur ne soit au courant ; aucune défense par correctif n'est possible.",
    "<strong>Correctif publié</strong> : l'éditeur corrige. La faille devient publique : les systèmes non mis à jour sont maintenant des cibles faciles.",
    "<strong>Correctif installé</strong> : la faille est fermée sur ce système. Toute la période d'avant est la fenêtre d'exposition."
  ], { depart: "Avance pour suivre la vie d'une faille.", devant: function (g, k) {
    var x = 20 + Math.min(k, 4) * 188 + (k >= 5 ? 168 : 0);
    if (k > 0) { A.s("rect", { x: 20, y: 270, width: Math.max(0, (k >= 5 ? 4 : k) * 188 - 20), height: 26, rx: 8, fill: C.koPale, stroke: C.ko, "stroke-width": 2 }, g); A.texte(g, "fenêtre d'exposition", [Math.max(120, ((k >= 5 ? 4 : k) * 188) / 2 + 10), 320], { taille: 16, gras: 700, coul: C.ko }); }
  } });
})();
