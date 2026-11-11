(function () {
  "use strict";
  var R = RM;

  /* ---------- La carte mentale du module : le même arbre que la page « Arbre » (commun/js/arbre.js) ---------- */
  (function () {
    var f = R.figure("fig-arbre", {
      largeur: 960, hauteur: 560, titre: "Carte mentale du module : parties, chapitres, notions",
      essai: "<strong>Essaie</strong> : touche un chapitre, puis une notion. <strong>Observe</strong> : la branche s'allume, ce qu'il faut retenir s'affiche, et la notion s'ouvre dans le cours."
    });
    if (!f) return;
    var zone = R.h("div", null, "", f.direct), b = R.boutons(f.reglages);
    var grand = R.h("a", { "class": "btn-lien", href: "../arbre.html?sm=biomateriaux" }, "Voir l'arbre en grand", b);
    var ouvrir = R.bouton(b, "Ouvrir le chapitre", function () { if (ouvrir.dataset.url) location.href = ouvrir.dataset.url; });
    ouvrir.disabled = true;
    grand.style.cssText = "display:inline-flex;align-items:center;min-height:48px;padding:0 18px;border:2px solid #15171f;border-radius:12px;color:#15171f;text-decoration:none;font-weight:600";
    function lancer() {
      ARBRE.dessiner(f.svg, { mid: "biomateriaux", sm: "biomateriaux", base: "../", largeur: 960, hauteur: 560, surChoix: function (i) {
        zone.innerHTML = "<strong>" + i.titre + "</strong> : " + i.texte;
        ouvrir.disabled = !i.url; ouvrir.dataset.url = i.url || "";
      } });
    }
    if (window.ARBRE) lancer();
    else { var s = document.createElement("script"); s.src = PLATEFORME.racine + "commun/js/arbre.js"; s.onload = lancer; document.head.appendChild(s); }
  })();
})();
