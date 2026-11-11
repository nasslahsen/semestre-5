(function () {
  "use strict";
  var R = RM, C = R.C, OK = "#12a26b", KO = "#e5484d";
  function T(g, s, p, o) { o = o || {}; o.italique = false; return R.texte(g, s, p, o); }

  /* ---------- Les trois critères de Chester ---------- */
  (function () {
    var f = R.figure("fig-criteres", {
      largeur: 960, hauteur: 480, titre: "Les trois critères de Chester appliqués à quelques objets",
      essai: "<strong>Essaie</strong> : touche un objet. <strong>Observe</strong> : les trois critères. Il faut trois « oui » pour un biomatériau."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct), k = 0;
    var OBJ = [
      { n: "tige de hanche", c: [1, 1, 1], v: "biomatériau" },
      { n: "comprimé", c: [1, 0, 1], v: "produit pharmaceutique : exclu par la durée" },
      { n: "autogreffe de peau", c: [1, 1, 0], v: "greffe : exclue car vivante" },
      { n: "valve cardiaque", c: [1, 1, 1], v: "biomatériau" },
      { n: "cathéter central", c: [1, 1, 1], v: "biomatériau" },
      { n: "lentille journalière", c: [1, 0, 1], v: "souvent exclue : contact trop bref" }
    ];
    var CR = ["contact avec le vivant", "plus de quelques heures", "non vivant"];
    function dessin() {
      R.vider(g);
      OBJ.forEach(function (o, i) {
        var x = 30 + (i % 2) * 210, y = 40 + Math.floor(i / 2) * 140, sel = i === k;
        var b = R.el("g", { style: "cursor:pointer" }, g);
        R.el("rect", { x: x, y: y, width: 190, height: 110, rx: 18, fill: sel ? PLATEFORME.teinte(0.15) : "#fff", stroke: sel ? C.acc : C.fonce, "stroke-width": sel ? 5 : 2 }, b);
        var mots = o.n.split(" "), l1 = mots.slice(0, Math.ceil(mots.length / 2)).join(" "), l2 = mots.slice(Math.ceil(mots.length / 2)).join(" ");
        T(b, l1, [x + 95, y + (l2 ? 42 : 55)], { taille: 19, gras: true, halo: false });
        if (l2) T(b, l2, [x + 95, y + 70], { taille: 19, gras: true, halo: false });
        b.addEventListener("click", function () { k = i; dessin(); });
      });
      var o = OBJ[k], tous = o.c.every(function (v) { return v; });
      CR.forEach(function (c, i) {
        var y = 80 + i * 100;
        T(g, (i + 1) + ". " + c, [500, y], { taille: 20, ancre: "start" });
        R.el("circle", { cx: 890, cy: y, r: 28, fill: o.c[i] ? "#e3f7ee" : "#fde8e8", stroke: o.c[i] ? OK : KO, "stroke-width": 3 }, g);
        T(g, o.c[i] ? "oui" : "non", [890, y + 1], { taille: 18, gras: true, couleur: o.c[i] ? OK : KO, halo: false });
      });
      R.el("rect", { x: 480, y: 370, width: 450, height: 80, rx: 18, fill: tous ? "#e3f7ee" : "#f4f5f8", stroke: tous ? OK : C.doux, "stroke-width": 3 }, g);
      T(g, tous ? "biomatériau" : "pas un biomatériau", [705, 410], { taille: 24, gras: true, couleur: tous ? OK : C.doux });
      zone.innerHTML = "<strong>" + o.n.charAt(0).toUpperCase() + o.n.slice(1) + "</strong> : " + o.v + ".";
    }
    dessin();
  })();

  /* ---------- Dans le temps : deux directions ---------- */
  (function () {
    var f = R.figure("fig-temps", {
      largeur: 960, hauteur: 440, titre: "Le corps agit sur le matériau, le matériau agit sur le corps",
      essai: "<strong>Essaie</strong> : choisis une direction. <strong>Observe</strong> : ce qui peut arriver, en vert ce qui est favorable, en rouge ce qui ne l'est pas."
    });
    var g = R.el("g", null, f.svg), zone = R.h("div", null, "", f.direct), sens = 0;
    var b = R.boutons(f.reglages);
    R.bouton(b, "Le biomatériau se dégrade", function () { sens = 0; dessin(); });
    R.bouton(b, "Le biomatériau modifie l'hôte", function () { sens = 1; dessin(); });
    var L = [
      [["corrosion des métaux", 0], ["vieillissement des plastiques", 0], ["débris, fissures, fractures", 0]],
      [["adaptation tissulaire aux contraintes", 1], ["réactions inflammatoires", 0], ["mort cellulaire", 0], ["toxicité locale ou générale", 0]]
    ];
    function dessin() {
      R.vider(g);
      R.el("rect", { x: 40, y: 120, width: 220, height: 200, rx: 30, fill: "#f3ead8", stroke: "#b89b6a", "stroke-width": 3 }, g);
      T(g, "hôte", [150, 150], { taille: 20, gras: true, couleur: "#8a6d3b" });
      R.el("rect", { x: 100, y: 180, width: 100, height: 110, rx: 14, fill: "#c3c8d2", stroke: C.fonce, "stroke-width": 3 }, g);
      T(g, "implant", [150, 236], { taille: 17, gras: true, halo: false });
      R.fleche(g, sens ? [205, 210] : [290, 250], sens ? [290, 210] : [205, 250], { couleur: C.acc, epaisseur: 6, tete: 22 });
      T(g, sens ? "le matériau agit sur le corps" : "le corps agit sur le matériau", [600, 60], { taille: 22, gras: true, couleur: C.acc });
      L[sens].forEach(function (e, i) {
        var y = 130 + i * 72, coul = e[1] ? OK : KO;
        R.el("rect", { x: 330, y: y - 28, width: 580, height: 56, rx: 14, fill: e[1] ? "#e3f7ee" : "#fde8e8", stroke: coul, "stroke-width": 2.5 }, g);
        T(g, e[0], [620, y], { taille: 20, halo: false });
      });
      zone.innerHTML = sens ? "Positivement : l'os s'adapte au nouveau régime des contraintes. Négativement : inflammation, mort cellulaire, toxicité." : "Le biomatériau va se dégrader : corrosion, vieillissement, détérioration mécanique.";
    }
    dessin();
  })();
})();
