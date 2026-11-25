/*
 * Vues 3D du sous-module « Éléments mécaniques » (three.js, servi localement : commun/vendor/three).
 * M3D.vue(f, o) pose une scène 3D sous le dessin SVG d'une figure R.figure : le SVG reste par-dessus,
 * transparent, pour les étiquettes et les gestes. On tourne la pièce au doigt (glisser), on touche une
 * pièce pour la nommer. Le rendu se fait à la demande (pas de boucle permanente).
 * Pièces : revolution (profil tourné, coupe en quart avec hachures), roulements de chaque famille,
 * arbre, clavette, vis filetée, écrou, ressort, anneau élastique, engrenage, rails et patins.
 * Unités de scène : le millimètre. Axe de révolution des pièces : y (three.js), puis on oriente le groupe.
 * Couleur d'accent : celle du module (PLATEFORME.couleur()), jamais écrite en dur.
 */
window.M3D = (function () {
  "use strict";
  var T = window.THREE;
  var ACC = window.PLATEFORME ? PLATEFORME.couleur() : "#D44C47";
  var COUL = {
    acier: "#c3c9d3", acierFonce: "#8a93a3", bronze: "#c08a4a", laiton: "#d4b04c", alu: "#d9dde4",
    noir: "#3b3f4a", bleu: "#4a78c2", vert: "#5aa36f", plastique: "#2f3440", polymere: "#3f6fd1",
    rouge: "#c9473f", jaune: "#e2b93b", violet: "#8b3fd9", acc: ACC, encre: "#15171f", ok: "#12a26b", interaction: "#3b5bdb"
  };

  /* ---------- Matériaux ---------- */
  var cacheMat = {};
  function mat(c, o) {
    o = o || {};
    var cle = c + JSON.stringify(o);
    if (cacheMat[cle] && !o.unique) return cacheMat[cle];
    var m = new T.MeshStandardMaterial({
      color: COUL[c] || c, metalness: o.metal === undefined ? 0.25 : o.metal, roughness: o.rugo === undefined ? 0.42 : o.rugo,
      side: T.DoubleSide, transparent: !!o.transparent || o.opacite !== undefined, opacity: o.opacite === undefined ? 1 : o.opacite,
      depthWrite: o.opacite === undefined || o.opacite > 0.6, polygonOffset: !!o.decale, polygonOffsetFactor: o.decale ? -1 : 0
    });
    if (!o.unique) cacheMat[cle] = m;
    return m;
  }
  // Hachures de coupe (comme sur un dessin technique), dans la teinte de la pièce
  var cacheHach = {};
  function matCoupe(c) {
    var coul = COUL[c] || c;
    if (cacheHach[coul]) return cacheHach[coul];
    var cv = document.createElement("canvas"); cv.width = cv.height = 64;
    var x = cv.getContext("2d");
    x.fillStyle = "#ffffff"; x.fillRect(0, 0, 64, 64);
    x.globalAlpha = 0.28; x.fillStyle = coul; x.fillRect(0, 0, 64, 64); x.globalAlpha = 1;
    x.strokeStyle = new T.Color(coul).multiplyScalar(0.55).getStyle(); x.lineWidth = 6;
    for (var k = -64; k <= 128; k += 32) { x.beginPath(); x.moveTo(k, 64); x.lineTo(k + 64, 0); x.stroke(); }
    var tx = new T.CanvasTexture(cv); tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(0.16, 0.16);
    var m = new T.MeshStandardMaterial({ map: tx, metalness: 0, roughness: 0.9, side: T.DoubleSide, polygonOffset: true, polygonOffsetFactor: 1 });
    cacheHach[coul] = m;
    return m;
  }

  /* ---------- Vue : scène, caméra, rendu à la demande, gestes ---------- */
  function vue(f, o) {
    o = o || {};
    var svg = f.svg, vb = svg.viewBox.baseVal, W = vb.width, H = vb.height;
    var porte = document.createElement("div");
    porte.className = "m3d";
    svg.parentNode.insertBefore(porte, svg);
    porte.appendChild(svg);
    svg.classList.add("sur-3d");
    var renderer;
    try { renderer = new T.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true }); }
    catch (e) { porte.classList.add("sans-3d"); return null; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0xffffff, 1);
    var cv = renderer.domElement;
    porte.insertBefore(cv, svg);

    var scene = new T.Scene();
    var cam = new T.PerspectiveCamera(o.fov || 28, W / H, 1, 20000);
    scene.add(new T.HemisphereLight(0xffffff, 0x7a7f8c, 0.8));
    var l1 = new T.DirectionalLight(0xffffff, 0.75); l1.position.set(1, 1.6, 1.2); scene.add(l1);
    var l2 = new T.DirectionalLight(0xffffff, 0.3); l2.position.set(-1.2, 0.4, -0.8); scene.add(l2);
    var monde = new T.Group(); scene.add(monde);

    var V = {
      T: T, scene: scene, monde: monde, camera: cam, svg: svg, W: W, H: H,
      cible: new T.Vector3().fromArray(o.cible || [0, 0, 0]),
      dist: o.distance || 400, az: o.az === undefined ? 0.7 : o.az, el: o.el === undefined ? 0.35 : o.el,
      pieces: [], etiquettes: [], calque: null, apres: []
    };
    V.calque = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svg.appendChild(V.calque);

    function placerCamera() {
      var c = Math.cos(V.el);
      cam.position.set(V.cible.x + V.dist * c * Math.sin(V.az), V.cible.y + V.dist * Math.sin(V.el), V.cible.z + V.dist * c * Math.cos(V.az));
      cam.lookAt(V.cible);
      l1.position.copy(cam.position).add(new T.Vector3(V.dist * 0.4, V.dist * 0.8, 0));
    }
    var attente = false;
    function dessiner() {
      attente = false;
      placerCamera();
      renderer.render(scene, cam);
      majEtiquettes();
      V.apres.forEach(function (fn) { fn(); });
    }
    V.rendre = function () { if (!attente) { attente = true; requestAnimationFrame(dessiner); } };
    V.rendreTout = dessiner;

    // Taille : le canevas suit exactement le dessin SVG (même rapport largeur / hauteur)
    function caler() {
      var w = svg.clientWidth || svg.getBoundingClientRect().width, h = svg.clientHeight || svg.getBoundingClientRect().height;
      if (!w || !h) return;
      cv.style.left = svg.offsetLeft + "px"; cv.style.top = svg.offsetTop + "px";
      cv.style.width = w + "px"; cv.style.height = h + "px";
      renderer.setSize(w, h, false);
      cam.aspect = W / H; cam.updateProjectionMatrix();
      dessiner();
    }
    if (window.ResizeObserver) new ResizeObserver(caler).observe(svg);
    window.addEventListener("load", caler);
    setTimeout(caler, 0);

    // Projection d'un point 3D (repère du monde) vers le viewBox du SVG
    V.ecran = function (p) {
      var v = (p.isVector3 ? p.clone() : new T.Vector3().fromArray(p)).project(cam);
      return [(v.x + 1) / 2 * W, (1 - v.y) / 2 * H, v.z];
    };
    // Étiquette : texte (SVG) relié par un trait à un point 3D. o.dx, o.dy : décalage du texte en px du viewBox.
    V.etiquette = function (txt, point, eo) {
      eo = eo || {};
      var e = { txt: txt, point: point, o: eo, visible: true };
      V.etiquettes.push(e);
      V.rendre();
      return e;
    };
    V.effacerEtiquettes = function () { V.etiquettes = []; V.rendre(); };
    function majEtiquettes() {
      while (V.calque.firstChild) V.calque.removeChild(V.calque.firstChild);
      V.etiquettes.forEach(function (e) {
        if (!e.visible) return;
        var pt = typeof e.point === "function" ? e.point() : e.point;
        if (!pt) return;
        if (pt.isObject3D) { pt.updateWorldMatrix(true, false); pt = new T.Vector3().setFromMatrixPosition(pt.matrixWorld); }
        var p = V.ecran(pt), dx = e.o.dx || 0, dy = e.o.dy || 0, q = [p[0] + dx, p[1] + dy];
        if (e.o.fixe) q = e.o.fixe;
        var coul = e.o.couleur || COUL.encre;
        if (dx || dy || e.o.fixe) {
          RM.el("line", { x1: p[0], y1: p[1], x2: q[0], y2: q[1], stroke: coul, "stroke-width": 2 }, V.calque);
          RM.el("circle", { cx: p[0], cy: p[1], r: 4.5, fill: coul, stroke: "#fff", "stroke-width": 1.5 }, V.calque);
        }
        var ancre = e.o.ancre || (dx > 4 ? "start" : dx < -4 ? "end" : "middle");
        var t = RM.texte(V.calque, e.txt, [q[0] + (ancre === "start" ? 6 : ancre === "end" ? -6 : 0), q[1]], { italique: false, gras: true, taille: e.o.taille || 18, couleur: coul, ancre: ancre, ind: e.o.ind });
        t.style.pointerEvents = "none";
      });
    }

    // Pièces que l'on peut toucher
    V.piece = function (obj, info) {
      obj.userData.piece = info;
      V.pieces.push(obj);
      return obj;
    };
    var rayon = new T.Raycaster(), surToucher = null;
    V.surToucher = function (fn) { surToucher = fn; };
    function toucher(ev) {
      var r = svg.getBoundingClientRect();
      var ndc = new T.Vector2((ev.clientX - r.left) / r.width * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
      placerCamera();
      rayon.setFromCamera(ndc, cam);
      var vis = V.pieces.filter(function (p) { var v = true; p.traverseAncestors(function (a) { if (!a.visible) v = false; }); return v && p.visible; });
      var hits = rayon.intersectObjects(vis, true);
      for (var k = 0; k < hits.length; k++) {
        var x = hits[k].object;
        while (x && !x.userData.piece) x = x.parent;
        if (x && surToucher) { surToucher(x.userData.piece, x); return; }
      }
      if (surToucher) surToucher(null, null);
    }

    // Gestes : glisser fait tourner la vue (au doigt : départ horizontal, la page défile en vertical) ; toucher nomme.
    var dernier = null, depart = null, bouge = 0;
    svg.style.touchAction = "pan-y";
    svg.addEventListener("pointerdown", function (ev) {
      if (ev.target.closest && ev.target.closest(".poignee")) return;
      dernier = [ev.clientX, ev.clientY]; depart = dernier; bouge = 0;
      try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* rien */ }
    });
    svg.addEventListener("pointermove", function (ev) {
      if (!dernier || o.fixe) return;
      var dx = ev.clientX - dernier[0], dy = ev.clientY - dernier[1];
      bouge += Math.abs(dx) + Math.abs(dy);
      var k = 3.2 / (svg.clientWidth || 600);
      V.az -= dx * k;
      V.el = Math.max(o.elMin === undefined ? -0.15 : o.elMin, Math.min(1.45, V.el + dy * k));
      dernier = [ev.clientX, ev.clientY];
      V.rendre();
    });
    function fin(ev) {
      if (dernier && bouge < 10 && ev.type === "pointerup") toucher(ev);
      dernier = null;
    }
    svg.addEventListener("pointerup", fin);
    svg.addEventListener("pointercancel", fin);

    // Animation de durée finie (jamais en boucle) : fn(u) avec u de 0 à 1
    var animEnCours = null;
    V.animer = function (duree, fn, finFn) {
      var t0 = performance.now(), jeton = {};
      animEnCours = jeton;
      function pas(t) {
        if (animEnCours !== jeton) return;
        var u = Math.min(1, (t - t0) / duree);
        fn(u);
        dessiner();
        if (u < 1) requestAnimationFrame(pas); else { animEnCours = null; if (finFn) finFn(); }
      }
      requestAnimationFrame(pas);
    };
    V.arreter = function () { animEnCours = null; };
    V.vue = function (az, el, dist) { V.az = az; V.el = el; if (dist) V.dist = dist; V.rendre(); };
    V.ajouter = function (obj, sans) { if (!sans && o.contour !== false) contours(obj); monde.add(obj); V.rendre(); return obj; };
    V.vider = function () {
      while (monde.children.length) monde.remove(monde.children[0]);
      V.pieces = []; V.etiquettes = []; V.rendre();
    };
    return V;
  }

  // Contours sombres (arêtes vives) : lecture d'un dessin technique. Pas sur les billes, fils et filets.
  var matTrait = new T.LineBasicMaterial({ color: 0x2a2e38, transparent: true, opacity: 0.55 });
  function contours(obj) {
    var l = [];
    obj.traverse(function (m) {
      if (!m.isMesh || m.userData.contour || m.userData.sansContour) return;
      var t = m.geometry.type;
      if (t === "SphereGeometry" || t === "TubeGeometry" || t === "TorusGeometry" || t === "ConeGeometry" || (t === "BufferGeometry" && !m.userData.contourOk)) return;
      if (m.material && m.material.opacity < 0.6) return;
      l.push(m);
    });
    l.forEach(function (m) {
      var e = new T.LineSegments(new T.EdgesGeometry(m.geometry, 32), matTrait);
      e.userData.contour = true; e.raycast = function () {};
      m.add(e); m.userData.contour = true;
    });
    return obj;
  }

  /* ---------- Géométries de base ---------- */
  function maille(geo, m) { return new T.Mesh(geo, m); }
  // Découpe d'un profil fermé en bandes lisses (coupées aux angles vifs) pour un ombrage net
  function bandes(pts) {
    var n = pts.length, res = [], cur = [pts[0]];
    function dir(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; }
    for (var i = 1; i <= n; i++) {
      var p = pts[i % n];
      cur.push(p);
      if (i < n) {
        var d1 = dir(pts[i - 1], pts[i]), d2 = dir(pts[i], pts[(i + 1) % n]);
        if (d1[0] * d2[0] + d1[1] * d2[1] < 0.9) { res.push(cur); cur = [p]; }
      }
    }
    if (cur.length > 1) res.push(cur);
    return res;
  }
  // Pièce de révolution : profil fermé [[r, y], ...] tourné autour de y.
  // o.coupe : angle (rad) du secteur retiré (vue en coupe, faces de coupe hachurées) ; o.seg : finesse.
  function revolution(profil, c, o) {
    o = o || {};
    var g = new T.Group(), seg = o.seg || 72, cut = o.coupe || 0;
    var m = o.mat || mat(c, o);
    bandes(profil).forEach(function (b) {
      var pts = b.map(function (p) { return new T.Vector2(Math.max(p[0], 0.0001), p[1]); });
      var geo = new T.LatheGeometry(pts, seg, cut, Math.PI * 2 - cut);
      g.add(maille(geo, m));
    });
    if (cut > 0) {
      var sh = new T.Shape(profil.map(function (p) { return new T.Vector2(p[0], p[1]); }));
      var mc = matCoupe(c);
      [cut, 0].forEach(function (phi) {
        var cap = maille(new T.ShapeGeometry(sh), mc);
        cap.rotation.y = phi - Math.PI / 2;
        g.add(cap);
      });
    }
    return g;
  }
  // Arc de cercle échantillonné (profil) : centre, rayon, angles en rad
  function arc(c, r, a0, a1, n) {
    var l = [];
    n = n || 10;
    for (var k = 0; k <= n; k++) { var a = a0 + (a1 - a0) * k / n; l.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); }
    return l;
  }
  function cylindre(r, h, c, o) {
    o = o || {};
    return maille(new T.CylinderGeometry(r, o.r2 === undefined ? r : o.r2, h, o.seg || 48, 1, !!o.ouvert), o.mat || mat(c, o));
  }
  function boite(lx, ly, lz, c, o) { return maille(new T.BoxGeometry(lx, ly, lz), (o && o.mat) || mat(c, o)); }
  function bille(r, c, o) { return maille(new T.SphereGeometry(r, 24, 16), (o && o.mat) || mat(c || "acier", Object.assign({ metal: 0.55, rugo: 0.25 }, o || {}))); }
  // Prisme : forme 2D (liste de points ou T.Shape) extrudée selon z, centrée en z
  function prisme(forme, ep, c, o) {
    o = o || {};
    var sh = forme instanceof T.Shape ? forme : new T.Shape(forme.map(function (p) { return new T.Vector2(p[0], p[1]); }));
    (o.trous || []).forEach(function (t) { sh.holes.push(t instanceof T.Path ? t : new T.Path(t.map(function (p) { return new T.Vector2(p[0], p[1]); }))); });
    var geo = new T.ExtrudeGeometry(sh, { depth: ep, bevelEnabled: !!o.biseau, bevelSize: o.biseau || 0, bevelThickness: o.biseau || 0, bevelSegments: 2, curveSegments: o.seg || 32 });
    geo.translate(0, 0, -ep / 2);
    return maille(geo, o.mat || mat(c, o));
  }
  function cercle(r, n, cx, cy, sens) {
    var l = [];
    n = n || 48;
    for (var k = 0; k < n; k++) { var a = (sens < 0 ? -1 : 1) * k / n * Math.PI * 2; l.push([(cx || 0) + r * Math.cos(a), (cy || 0) + r * Math.sin(a)]); }
    return l;
  }
  // Stade (oblong) de longueur l et largeur b, centré
  function stade(l, b, n) {
    var r = b / 2, d = l / 2 - r, pts = [];
    n = n || 14;
    for (var k = 0; k <= n; k++) { var a = -Math.PI / 2 + Math.PI * k / n; pts.push([d + r * Math.cos(a), r * Math.sin(a)]); }
    for (k = 0; k <= n; k++) { a = Math.PI / 2 + Math.PI * k / n; pts.push([-d + r * Math.cos(a), r * Math.sin(a)]); }
    return pts;
  }
  // Flèche 3D (effort, mouvement) de p0 vers p1
  function fleche(p0, p1, c, o) {
    o = o || {};
    var a = new T.Vector3().fromArray(p0), b = new T.Vector3().fromArray(p1), d = b.clone().sub(a), L = d.length();
    var g = new T.Group(), r = o.r || Math.max(1.6, L * 0.035), tete = Math.min(L * 0.38, r * 5);
    var m = mat(c || "acc", { metal: 0, rugo: 0.6 });
    var corps = cylindre(r, L - tete, null, { mat: m, seg: 16 }); corps.position.y = (L - tete) / 2; g.add(corps);
    var cone = maille(new T.ConeGeometry(r * 2.4, tete, 20), m); cone.position.y = L - tete / 2; g.add(cone);
    g.position.copy(a);
    g.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize());
    return g;
  }
  // Flèche courbe (rotation) autour de l'axe y, rayon r, à la hauteur y
  function flecheRotation(r, y, c, o) {
    o = o || {};
    var g = new T.Group(), m = mat(c || "acc", { metal: 0, rugo: 0.6 }), ep = o.ep || Math.max(1.5, r * 0.06);
    var a0 = o.a0 || 0.3, a1 = o.a1 || 4.6;
    var tore = maille(new T.TorusGeometry(r, ep, 10, 48, a1 - a0), m);
    tore.rotation.x = Math.PI / 2; tore.rotation.z = a0;
    g.add(tore);
    var cone = maille(new T.ConeGeometry(ep * 2.6, ep * 6, 16), m);
    var a = a0 + (a1 - a0);
    cone.position.set(r * Math.cos(a), 0, -r * Math.sin(a));
    cone.rotation.y = a; cone.rotation.x = Math.PI / 2;
    if (o.inverse) cone.rotation.x = -Math.PI / 2;
    g.add(cone);
    g.position.y = y;
    return g;
  }

  /* ---------- Roulements ---------- */
  // Roulement d'axe y, centré. o.type : billes | oblique | deux-rangees | rotule | rouleaux | coniques | aiguilles | butee | butee-double
  // o.d, o.D, o.B : alésage, diamètre extérieur, largeur (mm). o.coupe : secteur retiré. Renvoie un groupe avec .parts
  function roulement(o) {
    o = Object.assign({ type: "billes", d: 25, D: 52, B: 15, coupe: 0 }, o || {});
    var ri = o.d / 2, ro = o.D / 2, hB = o.B / 2, e = ro - ri, rm = (ri + ro) / 2, cut = o.coupe;
    var g = new T.Group(), parts = { elements: [] }, mEl = mat("acier", { metal: 0.6, rugo: 0.22 });
    var mBague = mat("acier", { metal: 0.45, rugo: 0.3 });
    var opt = { coupe: cut, mat: mBague };
    function cage(rc, hc, epc, yc) {
      var p = [[rc - epc, yc - hc], [rc + epc, yc - hc], [rc + epc, yc + hc], [rc - epc, yc + hc]];
      return revolution(p, "laiton", { coupe: cut, metal: 0.35, rugo: 0.4 });
    }
    function placer(n, rayon, y, fabrique, decal) {
      var grp = new T.Group();
      for (var k = 0; k < n; k++) {
        var a = (k + (decal || 0) + (o.balleEn !== undefined ? (o.balleEn / (Math.PI * 2) * n) % 1 : 0)) / n * Math.PI * 2;
        if (cut > 0 && a > 0.12 && a < cut - 0.12) continue;   // pas d'élément roulant dans le secteur retiré
        var el = fabrique(a);
        el.position.set(rayon * Math.sin(a), y, rayon * Math.cos(a));
        grp.add(el);
        parts.elements.push(el);
      }
      return grp;
    }
    var t = o.type, bi, be, el, cg;
    if (t === "billes" || t === "oblique") {
      var rb = 0.29 * e, rg = rb * 1.04, rIs = rm - 0.62 * rb, rOs = rm + 0.62 * rb;
      var t0 = Math.acos((rm - rIs) / rg);
      bi = [[ri, -hB], [rIs, -hB]].concat(arc([rm, 0], rg, Math.PI + t0, Math.PI - t0, 12)).concat([[rIs, hB], [ri, hB]]);
      if (t === "billes") {
        be = [[ro, hB], [rOs, hB]].concat(arc([rm, 0], rg, t0, -t0, 12)).concat([[rOs, -hB], [ro, -hB]]);
      } else {
        // contact oblique : épaulement haut d'un côté, bas de l'autre
        be = [[ro, hB], [rOs + 0.15 * rb, hB]].concat(arc([rm, 0], rg, t0 * 0.9, -0.05, 10)).concat([[rm + rg * 0.995, -hB], [ro, -hB]]);
        bi = [[ri, -hB], [rIs - 0.1 * rb, -hB]].concat(arc([rm, 0], rg, Math.PI + t0 * 0.9, Math.PI + 0.05, 8)).concat([[rm - rg * 0.995, hB], [ri, hB]]);
      }
      parts.bagueInt = revolution(bi, null, opt); parts.bagueExt = revolution(be, null, opt);
      var nb = Math.max(7, Math.floor(Math.PI * rm / (rb * 1.32)));
      parts.billes = placer(nb, rm, 0, function () { return bille(rb, null, { mat: mEl }); });
      parts.cage = cage(rm, rb * 0.95, rb * 0.16, 0);
    } else if (t === "deux-rangees" || t === "rotule") {
      var rb2 = 0.21 * e, y2 = Math.min(hB * 0.48, rb2 * 1.15), rg2 = rb2 * 1.04;
      var rIs2 = rm - 0.6 * rb2, t2 = Math.acos(Math.min(0.99, (rm - rIs2) / rg2));
      bi = [[ri, -hB], [rIs2, -hB]].concat(arc([rm, -y2], rg2, Math.PI + t2, Math.PI, 6)).concat(arc([rm, y2], rg2, Math.PI, Math.PI - t2, 6)).concat([[rIs2, hB], [ri, hB]]);
      if (t === "rotule") {
        var Rs = Math.hypot(rm + rb2, y2);
        be = [[ro, hB]].concat(arc([0, 0], Rs, Math.asin(Math.min(0.95, hB / Rs)), -Math.asin(Math.min(0.95, hB / Rs)), 16)).concat([[ro, -hB]]);
      } else {
        var rOs2 = rm + 0.6 * rb2;
        be = [[ro, hB], [rOs2, hB]].concat(arc([rm, y2], rg2, t2, 0, 6)).concat(arc([rm, -y2], rg2, 0, -t2, 6)).concat([[rOs2, -hB], [ro, -hB]]);
      }
      parts.bagueInt = revolution(bi, null, opt); parts.bagueExt = revolution(be, null, opt);
      var nb2 = Math.max(8, Math.floor(Math.PI * rm / (rb2 * 1.3)));
      parts.billes = new T.Group();
      parts.billes.add(placer(nb2, rm, -y2, function () { return bille(rb2, null, { mat: mEl }); }));
      parts.billes.add(placer(nb2, rm, y2, function () { return bille(rb2, null, { mat: mEl }); }, 0.5));
      parts.cage = cage(rm, hB * 0.9, rb2 * 0.12, 0);
    } else if (t === "rouleaux" || t === "aiguilles") {
      var rr = t === "aiguilles" ? 0.17 * e : 0.27 * e, Lr = o.B * (t === "aiguilles" ? 0.78 : 0.62);
      var rI = rm - rr, rO = rm + rr;
      bi = [[ri, -hB], [rI, -hB], [rI, hB], [ri, hB]];
      be = t === "aiguilles" ? [[ro, hB], [rO, hB], [rO, -hB], [ro, -hB]] :
        [[ro, hB], [rO - rr * 0.55, hB], [rO - rr * 0.55, Lr / 2 + 0.6], [rO, Lr / 2 + 0.6], [rO, -Lr / 2 - 0.6], [rO - rr * 0.55, -Lr / 2 - 0.6], [rO - rr * 0.55, -hB], [ro, -hB]];
      parts.bagueInt = revolution(bi, null, opt); parts.bagueExt = revolution(be, null, opt);
      var nr = Math.max(8, Math.floor(Math.PI * rm / (rr * 1.18)));
      parts.billes = placer(nr, rm, 0, function () { return cylindre(rr, Lr, null, { mat: mEl, seg: 20 }); });
      parts.cage = cage(rm, Lr / 2 + 1, rr * 0.18, 0);
    } else if (t === "coniques") {
      var al = 0.24, rrc = 0.25 * e, Lc = o.B * 0.62, ta = Math.tan(al);
      // chemins coniques : bague intérieure (cône) et cuvette, rouleaux inclinés de al
      var rI1 = rm - rrc / Math.cos(al) - hB * ta, rI2 = rm - rrc / Math.cos(al) + hB * ta;
      var rO1 = rm + rrc / Math.cos(al) - hB * ta, rO2 = rm + rrc / Math.cos(al) + hB * ta;
      bi = [[ri, -hB], [rI1 - rrc * 0.5, -hB], [rI1 - rrc * 0.5, -hB + 2], [rI1, -hB + 2], [rI2, hB], [ri, hB]];
      be = [[ro, hB], [rO2, hB], [rO1, -hB], [ro, -hB]];
      parts.bagueInt = revolution(bi, null, opt); parts.bagueExt = revolution(be, null, opt);
      var nc = Math.max(8, Math.floor(Math.PI * rm / (rrc * 1.25)));
      parts.billes = placer(nc, rm, 0, function (a) {
        var cont = new T.Group(), r = cylindre(rrc * 1.08, Lc, null, { mat: mEl, r2: rrc * 0.92, seg: 20 });
        r.rotation.x = al;
        cont.add(r);
        cont.rotation.y = a;
        return cont;
      });
      parts.cage = cage(rm, Lc / 2 + 1, rrc * 0.15, 0);
    } else if (t === "butee" || t === "butee-double") {
      var rbB = 0.22 * e, hw = Math.max(1.6, (o.B - 2 * rbB) / 2), gap = rbB * 0.55;
      function rondelle(haut) {
        var y0 = haut ? gap : -gap - hw, y1 = haut ? gap + hw : -gap, sg = haut ? 1 : -1, yf = haut ? y0 : y1;
        var rgB = rbB * 1.04, w = Math.sqrt(rgB * rgB - gap * gap), gorge = [];
        for (var k = 0; k <= 12; k++) { var x = rm - w + 2 * w * k / 12; gorge.push([x, sg * Math.sqrt(Math.max(0, rgB * rgB - (x - rm) * (x - rm)))]); }
        var a1 = haut ? ri : ri + 0.8, a2 = haut ? ro - 0.8 : ro, yb = haut ? y1 : y0;
        return revolution([[a1, yb], [a1, yf]].concat(gorge).concat([[a2, yf], [a2, yb]]), null, opt);
      }
      parts.bagueInt = rondelle(true);    // rondelle arbre (au-dessus)
      parts.bagueExt = rondelle(false);   // rondelle logement (en dessous)
      var nbB = Math.max(8, Math.floor(Math.PI * rm / (rbB * 1.3)));
      parts.billes = placer(nbB, rm, 0, function () { return bille(rbB, null, { mat: mEl }); });
      parts.cage = cage(rm, rbB * 0.25, rbB * 0.7, 0);
    }
    g.add(parts.bagueExt); g.add(parts.bagueInt); g.add(parts.billes); if (parts.cage) g.add(parts.cage);
    g.userData.parts = parts;
    g.parts = parts;
    return g;
  }

  /* ---------- Vis, écrou, ressort, anneau, clavette, engrenage ---------- */
  // Tige filetée d'axe y, de y0 à y1 : filet triangulaire (surface paramétrée), rayon extérieur r, pas p
  function filet(r, p, y0, y1, c, o) {
    o = o || {};
    var h = 0.6 * p, nU = 40, nV = Math.max(8, Math.round((y1 - y0) / p * 16));
    var pos = [], idx = [];
    for (var j = 0; j <= nV; j++) {
      var y = y0 + (y1 - y0) * j / nV;
      for (var i = 0; i <= nU; i++) {
        var a = i / nU * Math.PI * 2;
        var ph = ((y / p - a / (Math.PI * 2)) % 1 + 1) % 1;
        var prof = Math.abs(ph - 0.5) * 2;                     // 0 au fond, 1 au sommet
        var rr = r - h + h * Math.min(1, prof * 1.15);
        pos.push(rr * Math.cos(a), y, -rr * Math.sin(a));
      }
    }
    for (j = 0; j < nV; j++) for (var i2 = 0; i2 < nU; i2++) {
      var k = j * (nU + 1) + i2;
      idx.push(k, k + 1, k + nU + 1, k + 1, k + nU + 2, k + nU + 1);
    }
    var geo = new T.BufferGeometry();
    geo.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx); geo.computeVertexNormals();
    var g = new T.Group();
    g.add(maille(geo, o.mat || mat(c || "acier", { metal: 0.5, rugo: 0.3 })));
    // bouts fermés
    [y0, y1].forEach(function (y) { var d = cylindre(r - h, 0.4, null, { mat: o.mat || mat(c || "acier", { metal: 0.5, rugo: 0.3 }) }); d.position.y = y; g.add(d); });
    return g;
  }
  function hexagone(s, rot) {
    var l = [];
    for (var k = 0; k < 6; k++) { var a = (rot || 0) + k * Math.PI / 3; l.push([s * Math.cos(a), s * Math.sin(a)]); }
    return l;
  }
  // Vis à tête hexagonale d'axe y : tête en haut (y = 0 sous la tête), tige vers le bas, longueur L, diamètre d
  function vis(d, L, o) {
    o = o || {};
    var g = new T.Group(), m = mat(o.c || "acier", { metal: 0.5, rugo: 0.3 });
    var s = d * 0.92, ht = d * 0.65;
    var tete = prisme(hexagone(s, 0), ht, null, { mat: m, biseau: 0.4 });
    tete.rotation.x = Math.PI / 2; tete.position.y = ht / 2;
    g.add(tete);
    var lisse = o.lisse || 0;
    if (lisse > 0) { var tl = cylindre(d / 2, lisse, null, { mat: m }); tl.position.y = -lisse / 2; g.add(tl); }
    g.add(filet(d / 2, o.pas || d * 0.17, -L, -lisse, null, { mat: m }));
    g.userData.tete = tete;
    return g;
  }
  function ecrou(d, o) {
    o = o || {};
    var s = d * 0.92, ht = d * 0.8;
    var n = prisme(hexagone(s, Math.PI / 6), ht, o.c || "acier", { trous: [cercle(d / 2 * 0.86, 32, 0, 0, -1)], biseau: 0.4, metal: 0.5, rugo: 0.3 });
    n.rotation.x = Math.PI / 2;
    var g = new T.Group(); g.add(n);
    return g;
  }
  // Ressort hélicoïdal d'axe y, de y = 0 à y = L ; Dm diamètre moyen, dfil diamètre du fil, n spires
  function ressort(o) {
    o = Object.assign({ Dm: 30, dfil: 3, n: 8, L: 80, crochets: false, c: "acier" }, o || {});
    var R = o.Dm / 2, pts = [], N = Math.round(o.n * 28), L = o.L;
    for (var k = 0; k <= N; k++) {
      var u = k / N, a = u * o.n * Math.PI * 2;
      // spires d'extrémité rapprochées (bases dressées) pour un ressort de compression
      var y = o.crochets ? u * L : (u < 0.06 ? 0 + u / 0.06 * o.dfil * 0.5 : u > 0.94 ? L - (1 - u) / 0.06 * o.dfil * 0.5 : o.dfil * 0.5 + (u - 0.06) / 0.88 * (L - o.dfil));
      pts.push(new T.Vector3(R * Math.cos(a), y, -R * Math.sin(a)));
    }
    if (o.crochets) {
      // boucles de traction aux deux bouts
      var hb = function (y, s) { var l = []; for (var j = 1; j <= 16; j++) { var b = j / 16 * Math.PI * 1.6; l.push(new T.Vector3(R * Math.cos(b) * 0.95, y + s * (R * Math.sin(b) * 0.95 + R * 0.05), 0)); } return l; };
      pts = hb(0, -1).reverse().concat(pts).concat(hb(L, 1));
    }
    var courbe = new T.CatmullRomCurve3(pts);
    var geo = new T.TubeGeometry(courbe, Math.min(1400, pts.length * 2), o.dfil / 2, 10, false);
    return maille(geo, o.mat || mat(o.c, { metal: 0.5, rugo: 0.3 }));
  }
  // Anneau élastique (circlip) : couronne ouverte avec deux oreilles percées, dans le plan xz, axe y
  function circlip(rIn, rOut, ep, o) {
    o = o || {};
    var ouv = o.ouverture || 0.55, pts = [], n = 64, k, a;
    var a0 = Math.PI / 2 + ouv / 2, a1 = Math.PI / 2 - ouv / 2 + Math.PI * 2;
    for (k = 0; k <= n; k++) { a = a0 + (a1 - a0) * k / n; pts.push([rOut * Math.cos(a), rOut * Math.sin(a)]); }
    for (k = n; k >= 0; k--) { a = a0 + (a1 - a0) * k / n; pts.push([rIn * Math.cos(a), rIn * Math.sin(a)]); }
    var m = mat(o.c || "noir", { metal: 0.4, rugo: 0.35 });
    var g = new T.Group(), anneau = prisme(pts, ep, null, { mat: m });
    g.add(anneau);
    // oreilles percées : vers l'extérieur pour un anneau d'arbre, vers l'intérieur pour un anneau d'alésage
    var lo = (rOut - rIn) * 1.25, rc = o.interieur ? rIn - lo * 0.35 : rOut + lo * 0.35;
    [a0 + 0.12, a1 - 0.12].forEach(function (aa) {
      var cx = rc * Math.cos(aa), cy = rc * Math.sin(aa);
      var or = prisme(cercle(lo * 0.85, 28, cx, cy), ep, null, { mat: m, trous: [cercle(lo * 0.38, 20, cx, cy, -1)] });
      g.add(or);
    });
    g.children.forEach(function (c) { c.rotation.x = Math.PI / 2; });
    return g;
  }
  // Clavette parallèle forme A (bouts ronds) : longueur L (axe y), largeur b (x), hauteur h (z)
  function clavette(L, b, h, o) {
    o = o || {};
    var m = prisme(stade(L, b), h, o.c || "acc", { metal: 0.3, rugo: 0.4, biseau: 0.3 });
    m.rotation.z = Math.PI / 2;
    var g = new T.Group(); g.add(m);
    return g;
  }
  // Clavette disque (Woodruff) : demi-disque de rayon R, épaisseur b
  function clavetteDisque(R, b, o) {
    o = o || {};
    var pts = [];
    for (var k = 0; k <= 30; k++) { var a = Math.PI + Math.PI * k / 30; pts.push([R * Math.cos(a), R * 0.25 + R * Math.sin(a)]); }
    var m = prisme(pts, b, o.c || "acc", { metal: 0.3, rugo: 0.4 });
    var g = new T.Group(); g.add(m);
    return g;
  }
  // Section d'arbre avec rainure (rayon r, rainure de largeur b et de profondeur t en haut, côté +x)
  function sectionRainuree(r, b, t, n) {
    var pts = [], hb = b / 2, a0 = Math.asin(hb / r);
    n = n || 64;
    for (var k = 0; k <= n; k++) { var a = a0 + (Math.PI * 2 - 2 * a0) * k / n; pts.push([r * Math.cos(a), r * Math.sin(a)]); }
    pts.push([r - t, -hb], [r - t, hb]);
    return pts;
  }
  // Arbre d'axe y : tronçons [[y0, y1, r], ...] et éventuelle rainure {y0, y1, b, t}
  function arbre(troncons, o) {
    o = o || {};
    var g = new T.Group(), m = o.mat || mat(o.c || "acier", { metal: 0.45, rugo: 0.32 });
    troncons.forEach(function (tr) {
      var y0 = tr[0], y1 = tr[1], r = tr[2], rn = o.rainure;
      if (rn && rn.y0 >= y0 && rn.y1 <= y1) {
        var p = [[y0, rn.y0], [rn.y1, y1]];
        p.forEach(function (s) { if (s[1] - s[0] > 0.01) { var c = cylindre(r, s[1] - s[0], null, { mat: m, seg: 64 }); c.position.y = (s[0] + s[1]) / 2; g.add(c); } });
        var pr = prisme(sectionRainuree(r, rn.b, rn.t), rn.y1 - rn.y0, null, { mat: m });
        pr.rotation.x = -Math.PI / 2; pr.position.y = (rn.y0 + rn.y1) / 2;
        g.add(pr);
      } else {
        var c = cylindre(r, y1 - y0, null, { mat: m, seg: 64 }); c.position.y = (y0 + y1) / 2; g.add(c);
      }
    });
    return g;
  }
  // Engrenage droit d'axe y : module m, Z dents, épaisseur b, alésage
  function engrenage(o) {
    o = Object.assign({ m: 2, Z: 24, b: 10, alesage: 6, c: "acier", rot: 0 }, o || {});
    var r = MECA.contourRoue([0, 0], { m: o.m, Z: o.Z, rot: o.rot });
    var pts = r.pts.map(function (p) { return [p[0], -p[1]]; });
    var trous = o.alesage ? [cercle(o.alesage, 40, 0, 0, -1)] : [];
    if (o.rainure && o.alesage) trous = [sectionRainuree(o.alesage, o.rainure.b, -o.rainure.t).reverse()];
    var mm = prisme(pts, o.b, o.c, { trous: trous, metal: 0.4, rugo: 0.35, seg: 40 });
    mm.rotation.x = -Math.PI / 2;
    var g = new T.Group(); g.add(mm);
    g.userData.rp = r.rp; g.userData.ra = r.ra;
    return g;
  }

  // Couronne à denture intérieure d'axe y : module m, Z dents, rayon extérieur ext, épaisseur b
  function couronne(o) {
    o = Object.assign({ m: 2, Z: 36, b: 10, c: "acier", rot: 0 }, o || {});
    var m = o.m, Z = o.Z, rp = m * Z / 2, ri = rp - m, re = rp + 1.25 * m, ext = o.ext || re + 3 * m, l = [], dp = Math.PI / Z;
    for (var k = 0; k < Z; k++) {
      var t = o.rot + k * 2 * Math.PI / Z;
      [[re, t - 0.42 * dp], [re, t + 0.42 * dp], [ri, t + dp - 0.28 * dp], [ri, t + dp + 0.28 * dp]].forEach(function (q) { l.push([q[0] * Math.cos(q[1]), q[0] * Math.sin(q[1])]); });
    }
    var mm = prisme(cercle(ext, 72), o.b, o.c, { trous: [l.reverse()], metal: 0.4, rugo: 0.35 });
    mm.rotation.x = -Math.PI / 2;
    var g = new T.Group(); g.add(mm);
    return g;
  }

  /* ---------- Guidages linéaires ---------- */
  // Billes qui circulent dans un circuit oblong (dans le plan xz local) : longueur droite L, demi-écart e
  // u : avance (mm) le long du circuit. Renvoie {groupe, placer(u)}
  function circuitBilles(L, e, rb, o) {
    o = o || {};
    var per = 2 * L + 2 * Math.PI * e, n = Math.floor(per / (rb * 2.05)), grp = new T.Group(), billes = [];
    var m = mat("acier", { metal: 0.6, rugo: 0.22 }), mCharge = o.matCharge || m;
    for (var k = 0; k < n; k++) { var b = bille(rb, null, { mat: m }); grp.add(b); billes.push(b); }
    function point(s) {
      s = ((s % per) + per) % per;
      if (s < L) return [-L / 2 + s, -e, true];
      s -= L;
      if (s < Math.PI * e) { var a = -Math.PI / 2 + s / e; return [L / 2 + e * Math.cos(a), e * Math.sin(a), false]; }
      s -= Math.PI * e;
      if (s < L) return [L / 2 - s, e, false];
      s -= L;
      var b2 = Math.PI / 2 + s / e;
      return [-L / 2 + e * Math.cos(b2), e * Math.sin(b2), false];
    }
    function placer(u) {
      billes.forEach(function (b, k) {
        var p = point(u + k * per / n);
        b.position.set(p[0], 0, p[1]);
        b.material = p[2] ? mCharge : m;
      });
    }
    placer(0);
    return { groupe: grp, placer: placer, n: n };
  }

  /* ---------- Figure de cours en 3D ---------- */
  // Monte R.figure + la vue 3D. o : titre, essai, vue (options de vue), info (texte de départ sous le dessin).
  // Toucher une pièce l'allume et écrit son nom et son rôle sous le dessin (o.toucher pour faire autrement).
  function figure(id, o) {
    var f = RM.figure(id, { largeur: o.largeur || 960, hauteur: o.hauteur || 540, titre: o.titre, essai: o.essai, directCote: o.directCote });
    if (!f) return null;
    var V = vue(f, o.vue || {});
    if (!V) { f.essai.innerHTML = "Cette vue 3D demande WebGL, que ce navigateur n'a pas."; return null; }
    V.f = f;
    var info = RM.h("p", { "class": "m3d-info" }, o.info || "", f.direct);
    V.info = function (html) { info.innerHTML = html; };
    var allume = [];
    V.eteindre = function () {
      allume.forEach(function (m) { m.material = m.userData.mat0; });
      allume = []; V.rendre();
    };
    V.allumer = function (obj, coul) {
      V.eteindre();
      if (!obj) return;
      obj.traverse(function (m) {
        if (!m.isMesh) return;
        m.userData.mat0 = m.material;
        var c = m.material.clone();
        if (c.emissive) { c.emissive = new T.Color(coul || ACC); c.emissiveIntensity = 0.55; }
        m.material = c;
        allume.push(m);
      });
      V.rendre();
    };
    V.surToucher(function (p, obj) {
      if (o.toucher) { o.toucher(p, obj); return; }
      if (!p) { V.eteindre(); V.info(o.info || ""); return; }
      V.allumer(obj);
      V.info("<strong>" + p.nom + "</strong>" + (p.role ? " : " + p.role : ""));
    });
    return V;
  }
  // Curseur « Éclaté » : fn(u) avec u de 0 (monté) à 1 (éclaté)
  function eclate(V, fn, nom) {
    var c = RM.curseur(V.f.reglages, { nom: nom || "Éclaté", min: 0, max: 1, pas: 0.01, val: 0, dec: 0, unite: "" });
    c.input.parentNode.querySelector("output").style.display = "none";
    c.surChange(function () { fn(c.v); V.rendre(); });
    return c;
  }
  // Rangée de boutons à choix unique : noms, fn(k) ; renvoie {choisir(k)}
  function choix(V, noms, fn, depart) {
    var b = RM.boutons(V.f.reglages), bt = [];
    function choisir(k) { bt.forEach(function (x, i) { x.classList.toggle("actif", i === k); }); fn(k); V.rendre(); }
    noms.forEach(function (n, k) { bt.push(RM.bouton(b, n, function () { choisir(k); })); });
    if (depart !== null) choisir(depart || 0);
    return { choisir: choisir, boutons: bt };
  }

  return {
    figure: figure, eclate: eclate, choix: choix,
    T: T, COUL: COUL, ACC: ACC, mat: mat, contours: contours, matCoupe: matCoupe, vue: vue,
    revolution: revolution, arc: arc, cylindre: cylindre, boite: boite, bille: bille, prisme: prisme, cercle: cercle, stade: stade,
    fleche: fleche, flecheRotation: flecheRotation, roulement: roulement,
    filet: filet, vis: vis, ecrou: ecrou, hexagone: hexagone, ressort: ressort, circlip: circlip,
    clavette: clavette, clavetteDisque: clavetteDisque, sectionRainuree: sectionRainuree, arbre: arbre, engrenage: engrenage, couronne: couronne,
    circuitBilles: circuitBilles
  };
})();
