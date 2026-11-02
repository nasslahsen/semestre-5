(function () {
  "use strict";
  var R = RM, C = EMB.C;
  /* ---------- Un channel à 8 fields, et l'URL d'écriture ---------- */
  (function () {
    var f = R.figure("fig-thingspeak", {
      largeur: 960, hauteur: 460, titre: "Écrire dans un channel",
      essai: "<strong>Essaie</strong> : choisis un field et règle la valeur. <strong>Observe</strong> : l'URL d'écriture change avec eux ; chaque écriture ajoute une entrée datée."
    });
    var g = EMB.el("g", null, f.svg), champ = 1, b = R.boutons(f.reglages), btns = [], entrees = [];
    [1, 2, 3, 5].forEach(function (k) { btns.push([k, R.bouton(b, "field" + k, function () { champ = k; dessiner(); })]); });
    var cv = R.curseur(f.reglages, { nom: "valeur", min: 0, max: 120, pas: 5, val: 70 });
    cv.surChange(dessiner);
    var envoyer = R.bouton(R.boutons(f.reglages), "Écrire", function () { entrees.push([champ, cv.v]); if (entrees.length > 6) entrees.shift(); dessiner(); });
    var zone = R.h("p", null, "", f.direct);
    function dessiner() {
      EMB.vider(g);
      btns.forEach(function (x) { x[1].classList.toggle("actif", x[0] === champ); });
      EMB.texte(g, "Channel « ESP32 Lab », ID 0000000", [480, 30], { taille: 21 });
      for (var k = 1; k <= 8; k++) {
        var x = 30 + (k - 1) * 113;
        EMB.bloc(g, x, 60, 104, 54, "field" + k, { taille: 17, actif: k === champ, mono: true });
        entrees.forEach(function (e, i) { if (e[0] === k) EMB.texte(g, String(e[1]), [x + 52, 150 + i * 40], { taille: 19, mono: true, coul: C.acc }); });
      }
      if (!entrees.length) EMB.texte(g, "Touche Écrire : chaque écriture ajoute une entrée.", [480, 250], { taille: 20, coul: C.doux });
      entrees.forEach(function (e, i) { EMB.texte(g, "entrée " + (i + 1), [-5 + 30, 150 + i * 40], { taille: 15, coul: C.doux, ancre: "start" }); });
      EMB.texte(g, "GET api.thingspeak.com/update?api_key=CLE_WRITE&field" + champ + "=" + cv.v, [480, 420], { taille: 20, mono: true, coul: C.acc });
      zone.textContent = "Requête : https://api.thingspeak.com/update?api_key=TA_CLE_WRITE&field" + champ + "=" + cv.v + " ; le serveur répond par le numéro de l'entrée.";
    }
    dessiner();
  })();
})();
