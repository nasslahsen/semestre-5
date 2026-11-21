// Page « Préparer l'examen » d'un module (modules/<id>/examen.html?sm=<sous-module>) : la même pour tous les modules.
// Remplit la barre et, dans <div id="par-chapitre"></div>, un tableau chapitre par chapitre du sous-module :
// la version courte (l'essentiel et ses questions d'examen, quand elle existe), la révision et le défi final.
// Ce qu'un professeur a annoncé pour l'examen reste écrit à la main dans la page, au-dessus.
(function () {
  "use strict";
  var P = PLATEFORME, mid = P.courant, M = P.module(mid);
  var sms = P.sousModules(mid).filter(function (x) { return P.chapitresDe(mid, x.id, "cours").length; });
  var demande = new URLSearchParams(location.search).get("sm");
  var sm = sms.filter(function (x) { return x.id === demande; })[0] || sms[0];
  if (!sm) return;
  P.reglerLangue(mid, sm.id);
  P.barre(document.getElementById("barre"), { carte: P.urlPlan(mid, sm.id) });
  function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  // l'étiquette au-dessus du titre : le nom du cours (sous-module), sinon celui du module
  var et = document.querySelector("[data-etiquette-examen]");
  if (et) et.textContent = P.nomSm(mid, sm.id) || M.titre;

  var zone = document.getElementById("par-chapitre");
  if (!zone) return;
  var court = M.court || [];
  var lignes = P.chapitresDe(mid, sm.id, "cours").map(function (ch) {
    var nv = (M.niveaux || []).filter(function (n) { return n.chapitre === ch.id && n.pret; });
    var rev = nv.filter(function (n) { return n.revision; })[0], boss = nv.filter(function (n) { return n.boss; })[0];
    var liens = [];
    if (court.indexOf(ch.id) >= 0) liens.push('<a href="court/chapitre-' + ch.id + '.html">' + P.t("Version courte") + "</a>");
    if (rev) liens.push('<a href="jouer.html#' + rev.id + '">' + P.t("Révision") + "</a>");
    if (boss) liens.push('<a href="jouer.html#' + boss.id + '">' + P.t("Défi final") + "</a>");
    return '<li><a class="ex-chap" href="chapitres/chapitre-' + ch.id + '.html"><small>' + esc(P.nomChapitre(mid, ch.id)) + "</small>" + esc(ch.titre) + "</a>" +
      '<span class="ex-liens">' + liens.join("") + "</span></li>";
  });
  zone.innerHTML = "<h2>" + P.t("Chapitre par chapitre") + "</h2>" +
    "<p>" + P.t("Pour chaque chapitre : l'essentiel et ses questions d'examen, puis la révision et le défi final, sans aide avant le premier essai.") + "</p>" +
    '<ol class="ex-chapitres">' + lignes.join("") + "</ol>";
})();
