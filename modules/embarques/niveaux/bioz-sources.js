/* Bio-impédance, questions 18 à 22 : mesure à 2 et 4 points, Howland classique et symétrique, source simplifiée. */
NIVEAU({
  id: "bioz-sources",
  init: function (fig) {
    var g = E.s("g", null, fig.svg), n = { act: {} };
    var B = [
      { id: "src", x: 40, y: 40, w: 260, h: 80, t: "Source de courant" },
      { id: "volt", x: 380, y: 40, w: 260, h: 80, t: "Voltmètre" },
      { id: "el1", x: 40, y: 250, w: 130, h: 80, t: "ZEL" },
      { id: "bio", x: 275, y: 250, w: 130, h: 80, t: "ZBIO" },
      { id: "el2", x: 510, y: 250, w: 130, h: 80, t: "ZEL" },
      { id: "how", x: 40, y: 450, w: 600, h: 80, t: "Howland : IL indépendant de ZL ?" }
    ];
    var L = [["src", "el1"], ["el1", "bio"], ["bio", "el2"], ["volt", "bio"]];
    n.dessin = function () { EMB.scene(g, B, L, n.act); };
    n.dessin();
    return n;
  },
  etapes: [
    { nom: "Deux points", jouer: function (j, n) {
      n.act = { el1: true, bio: true, el2: true }; n.dessin();
      j.titre("Mesure à 2 points : \\(Z_{BIO} = 300\\ \\Omega\\), chaque contact \\(Z_{EL} = 800\\ \\Omega\\). Quelle impédance mesure-t-on ?");
      j.nombre({ avant: "Z_{mes} =", apres: "\\Omega", cases: [{ attendu: 1900, tol: 0 }], ligne: true,
        aide: function () { return "Le courant traverse les deux contacts et le tissu : Zmes = ZBIO + 2 ZEL."; },
        ok: function () { j.bravo("300 + 2 × 800 = 1 900 Ω : plus de six fois trop."); j.suite(); } });
    } },
    { nom: "Quatre points", jouer: function (j, n) {
      n.act = { volt: true, bio: true }; n.dessin();
      j.titre("Pourquoi la mesure à 4 points élimine-t-elle les contacts ?");
      j.choix([
        { html: "Les électrodes de mesure ne sont traversées par presque aucun courant : pas de chute de tension dans leurs contacts", juste: true },
        { html: "Avec 4 électrodes, les contacts s'annulent deux à deux", aide: "Ce n'est pas une compensation : regarde quel courant traverse les électrodes du voltmètre." },
        { html: "On injecte un courant plus fort", aide: "Le courant ne change pas. La différence est dans la séparation injection et mesure." }
      ], { colonnes: 1, ok: function () { j.bravo("Injection par l'extérieur, mesure par l'intérieur sans courant : Zmes = ZBIO."); j.suite(); } });
    } },
    { nom: "Condition de Howland", jouer: function (j, n) {
      n.act = { how: true }; n.dessin();
      j.titre("Howland classique : \\(R_1 = R_5 = 10\\) kΩ, \\(R_3 = 1\\) kΩ, \\(R_4 = 9\\) kΩ. Quelle \\(R_2\\) pour une vraie source de courant ?");
      j.nombre({ avant: "R_2 =", apres: "\\text{k}\\Omega", cases: [{ attendu: 10, tol: 0 }], ligne: true,
        aide: function () { return "Condition : R2 / R1 = (R3 + R4) / R5."; },
        ok: function () { j.bravo("R2 = 10 × (1 + 9) / 10 = 10 kΩ."); j.suite(); } });
    } },
    { nom: "Le courant", jouer: function (j, n) {
      j.titre("Avec ces valeurs, \\(V_N - V_P = 0{,}2\\) V. Quel courant \\(I_L\\) ?");
      j.nombre({ avant: "I_L =", apres: "\\text{mA}", cases: [{ attendu: 0.2, tol: 0.001 }], ligne: true,
        aide: function () { return "IL = R2 / (R1 R3) × (VN − VP)."; },
        ok: function () { j.bravo("10 k / (10 k × 1 k) × 0,2 = 0,2 mA, quelle que soit la charge."); j.suite(); } });
    } },
    { nom: "Symétrique", jouer: function (j, n) {
      j.titre("Howland symétrique, \\(R = 10\\) kΩ et \\(R_S = 1\\) kΩ. Quelle \\(R_P\\) ?");
      j.nombre({ avant: "R_P =", apres: "\\text{k}\\Omega", cases: [{ attendu: 11, tol: 0 }], ligne: true,
        aide: function () { return "Condition : RP = R + RS."; },
        ok: function () { j.bravo("10 + 1 = 11 kΩ ; alors |IL| = VIN / RS."); j.suite(); } });
    } },
    { nom: "Masse virtuelle", jouer: function (j, n) {
      n.act = { src: true }; n.dessin();
      j.titre("Source simplifiée (figure 10) : \\(V_{IN} = 0{,}3\\) V, \\(R_1 = 600\\ \\Omega\\). Quel courant dans la charge ?");
      j.nombre({ avant: "I_{OUT} =", apres: "\\text{mA}", cases: [{ attendu: 0.5, tol: 0.001 }], ligne: true,
        aide: function () { return "L'entrée − est à 0 V : IOUT = VIN / R1."; },
        ok: function () { j.bravo("0,3 / 600 = 0,5 mA."); j.suite(); } });
    } }
  ]
});
