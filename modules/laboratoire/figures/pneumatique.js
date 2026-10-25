/* Figure : une cartouche traverse le réseau ; l'aiguillage choisit la ligne ; freinage par coussin d'air à l'arrivée. */
(function () {
  "use strict";
  var R = RM, A = LABO, C = A.C;

  var f = R.figure("fig-pneumatique", {
    largeur: 960, hauteur: 540, titre: "Un envoi par le réseau pneumatique",
    essai: "<strong>Essaie</strong> : avance pas à pas. <strong>Observe</strong> : l'aiguillage choisit la ligne ; à l'arrivée, la vanne se ferme et l'air piégé freine la cartouche avant les amortisseurs."
  });
  var g = A.s("g", null, f.svg);
  var E = [
    { t: "Envoi", d: "La cartouche hermétique est chargée, la destination choisie ; la trappe se verrouille." },
    { t: "Aiguillage", d: "L'automate positionne l'aiguillage vers la ligne du laboratoire et démarre la turbine." },
    { t: "Transit", d: "La cartouche file dans le tube, autour de 5,5 m/s ; les capteurs et la RFID la suivent." },
    { t: "Coussin d'air", d: "La vanne d'échappement se ferme : l'air piégé se comprime et freine la cartouche." },
    { t: "Réception", d: "Amortisseurs en élastomère, arrêt validé, turbine coupée ; la cartouche glisse dans le bac, un voyant s'allume." }
  ];
  var zone = R.h("div", null, "", f.direct);
  function dessiner(k) {
    A.vider(g);
    // réseau : départ en bas à gauche, aiguillage au centre, deux lignes
    A.chemin(g, [[110, 430], [110, 120], [430, 120]], { coul: C.trait, ep: 26 });
    A.chemin(g, [[430, 120], [800, 120], [800, 330]], { coul: k >= 2 ? C.jeuPale : C.trait, ep: 26 });
    A.chemin(g, [[430, 120], [430, 330]], { coul: C.trait, ep: 26 });
    A.boite(g, 40, 420, 140, 90, { fond: k === 1 ? C.jeuPale : "#fff", bord: C.encre, ep: 3, rx: 12, titre: "Réanimation", taille: 18 });
    A.boite(g, 360, 330, 140, 90, { fond: "#fff", bord: C.encre, ep: 3, rx: 12, titre: "Pharmacie", taille: 18 });
    A.boite(g, 720, 330, 160, 150, { fond: k >= 4 ? C.jeuPale : "#fff", bord: C.encre, ep: 3, rx: 12 });
    A.texte(g, "Laboratoire", [800, 500], { taille: 18, gras: 800 });
    A.s("circle", { cx: 430, cy: 120, r: 30, fill: k === 2 ? C.jeu : "#fff", stroke: C.encre, "stroke-width": 3 }, g);
    A.texte(g, "aiguillage", [430, 70], { taille: 17, gras: 800 });
    // position de la cartouche
    var pos = [null, [110, 400], [300, 120], [700, 120], [800, 300], [800, 440]][k];
    if (pos) A.s("rect", { x: pos[0] - 18, y: pos[1] - 28, width: 36, height: 56, rx: 12, fill: C.ko, stroke: C.encre, "stroke-width": 3 }, g);
    if (k === 4) {
      for (var i = 0; i < 4; i++) A.s("line", { x1: 780 + i * 12, y1: 340, x2: 780 + i * 12, y2: 380, stroke: C.froid, "stroke-width": 3 }, g);
      A.texte(g, "air comprimé", [640, 370], { taille: 17, gras: 800, coul: C.froid });
      A.s("rect", { x: 760, y: 470, width: 80, height: 12, fill: C.encre }, g);
      A.texte(g, "vanne fermée", [640, 470], { taille: 17, gras: 800, coul: C.encre });
    }
    if (k === 5) A.s("rect", { x: 740, y: 466, width: 120, height: 10, rx: 4, fill: "#8a8f9c" }, g);
    zone.innerHTML = k ? "<strong>" + E[k - 1].t + "</strong> : " + E[k - 1].d : "Avance pour envoyer un prélèvement urgent de la réanimation au laboratoire.";
  }
  var e = R.etapes(f.reglages, 5, ["", "envoi", "aiguillage", "transit", "freinage", "réception"], dessiner);
  e.aller(0);
})();
