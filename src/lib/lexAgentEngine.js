/*
 * Lex Agent hero background (seed CCRAZQ).
 * Ported from the standalone lex-agent-bg-CCRAZQ.html export: the engine body below is
 * the original, with `setRunning` added so the page can stop rendering off-screen.
 */
import * as THREE from 'three';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

export function createLexAgentEngine(container, initialConfig, opts) {
  return createEngine(THREE, { LineSegments2, LineSegmentsGeometry, LineMaterial }, container, initialConfig, opts);
}

function createEngine(THREE, X, container, initialConfig, opts) {
  'use strict';
  opts = opts || {};
  const LineSegments2 = X.LineSegments2, LineSegmentsGeometry = X.LineSegmentsGeometry, LineMaterial = X.LineMaterial;
  const TAU = Math.PI * 2, D2R = Math.PI / 180;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const sat = (v) => clamp(v, 0, 1);
  const smooth = (v) => { v = sat(v); return v * v * (3 - 2 * v); };
  const easeOut = (v) => 1 - Math.pow(1 - sat(v), 3);
  const fract = (v) => v - Math.floor(v);
  const num = (v, d) => (typeof v === 'number' && isFinite(v) ? v : d);
  const bump = (f, a, b, e) => smooth((f - a) / e) * (1 - smooth((f - b + e) / e));
  const pad = (n, k) => String(n).padStart(k, '0');

  let cfg = JSON.parse(JSON.stringify(initialConfig || {}));

  function hashStr(s) { s = String(s); let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  let salt = hashStr(cfg.seed || 'LEX');
  // deterministic noise in [0,1) from integers, salted by the seed
  function rnd(a, b, c) {
    let h = (salt ^ Math.imul((a | 0) + 0x9e37, 0x85ebca77) ^ Math.imul((b | 0) + 0x632b, 0xc2b2ae3d) ^ Math.imul((c | 0) + 0x1b87, 0x27d4eb2f)) >>> 0;
    h ^= h >>> 16; h = Math.imul(h, 0x7feb352d); h ^= h >>> 15; h = Math.imul(h, 0x846ca68b); h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }

  const FONTS = {
    serif: '"Cormorant Garamond", "EB Garamond", Georgia, serif',
    sans: '"Be Vietnam Pro", system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
  };
  const ROLES = ['TRA CỨU LUẬT', 'ĐỐI CHIẾU ĐIỀU KHOẢN', 'SOẠN THẢO', 'KIỂM TRA TUÂN THỦ', 'TÓM TẮT ÁN LỆ', 'RÀ SOÁT HỢP ĐỒNG', 'ĐÁNH GIÁ RỦI RO', 'TRÍCH DẪN NGUỒN', 'PHÂN TÍCH CHỨNG CỨ', 'THẨM ĐỊNH'];
  const SHORT = ['TRA CỨU', 'ĐỐI CHIẾU', 'SOẠN THẢO', 'TUÂN THỦ', 'ÁN LỆ', 'HỢP ĐỒNG', 'RỦI RO', 'TRÍCH DẪN', 'CHỨNG CỨ', 'THẨM ĐỊNH'];
  const CODES = ['BLDS 2015', 'BLHS 2015', 'BLTTDS 2015', 'LUẬT DN 2020', 'BLLĐ 2019', 'LUẬT ĐẤT ĐAI 2024', 'NĐ 13/2023', 'LUẬT TM 2005', 'HIẾN PHÁP 2013'];
  const CODE_S = ['BLDS', 'BLHS', 'BLTTDS', 'LDN', 'BLLĐ', 'LĐĐ', 'NĐ13', 'LTM', 'HP'];
  const OK = ['✓ KHỚP', '✓ HỢP LỆ', '✓ CĂN CỨ', '✓ ĐÃ DẪN'];
  const WARN = ['! XUNG ĐỘT', '! RÀ SOÁT', '! THIẾU CĂN CỨ'];
  const SYMBOL_NAME = { scales: 'CÂN CÔNG LÝ', temple: 'TÒA ÁN', gavel: 'BÚA PHÁN QUYẾT', book: 'BỘ LUẬT', seal: 'CON DẤU', nucleus: 'LÕI AI' };
  const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

  /* ---------------- renderer / scene ---------------- */
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  const DPR = Math.min(window.devicePixelRatio || 1, opts.maxDpr || 2);
  renderer.setPixelRatio(DPR);
  const canvas = renderer.domElement;
  canvas.style.cssText = 'display:block;width:100%;height:100%';
  container.appendChild(canvas);
  const ov = document.createElement('canvas');
  ov.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;display:block';
  ov.setAttribute('aria-hidden', 'true');
  container.appendChild(ov);
  const ox = ov.getContext('2d');

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0);
  scene.fog = new THREE.Fog(0, 10, 60);
  const persp = new THREE.PerspectiveCamera(30, 1, 0.05, 400);
  const ortho = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.05, 400);
  let camera = persp;
  const hemi = new THREE.HemisphereLight(0xffffff, 0x000000, 1.5);
  const keyL = new THREE.DirectionalLight(0xffffff, 2.4);
  keyL.position.set(3, 6, 4);
  const rimL = new THREE.DirectionalLight(0xffffff, 1.4);
  rimL.position.set(-4, 2.5, -5);
  scene.add(hemi, keyL, rimL);
  const root = new THREE.Group();
  scene.add(root);

  /* ---------------- colour + material registry ---------------- */
  const COL = { bg: new THREE.Color(), ink: new THREE.Color(), acc: new THREE.Color() };
  const WHITE = new THREE.Color(1, 1, 1);
  let INKA = 0.9, LW = 1.3, STYLE = 'line';
  let VW = 1, VH = 1;
  let LMS = [], MMS = [], masks = [];

  function readColors() {
    const C = cfg.color || {};
    COL.bg.set(C.bg || '#0b1220');
    COL.ink.set(C.ink || '#e8e2d0');
    COL.acc.set(C.accent || '#c9a24a');
    INKA = clamp(num(C.inkAlpha, 0.9), 0.1, 1);
    LW = clamp(num((cfg.core || {}).lineWidth, 1.3), 0.3, 5);
    scene.background.copy(COL.bg);
    scene.fog.color.copy(COL.bg);
    hemi.color.copy(COL.ink);
    hemi.groundColor.copy(COL.bg);
    rimL.color.copy(COL.acc);
  }
  function paintLine(e) {
    e.m.color.copy(e.role === 'acc' ? COL.acc : e.role === 'white' ? WHITE : COL.ink);
    e.m.linewidth = (e.role === 'floor' ? 1 : LW) * e.w;
    if (e.dyn) return;
    if (e.role === 'floor') e.m.opacity = clamp(num((cfg.scene || {}).floorAlpha, 0.14), 0, 1);
    else e.m.opacity = e.a * (e.role === 'acc' ? 1 : INKA);
  }
  function lmat(role, w, a, dyn, extra) {
    const m = new LineMaterial(Object.assign({ color: 0xffffff, linewidth: 1, transparent: true, opacity: 1, depthWrite: false, fog: true }, extra || {}));
    m.resolution.set(VW, VH);
    const e = { m, role, w: w == null ? 1 : w, a: a == null ? 1 : a, dyn: !!dyn };
    LMS.push(e);
    paintLine(e);
    return m;
  }
  function paintMesh(e) {
    const m = e.m;
    if (e.role === 'fill') m.color.copy(COL.bg);
    else if (e.role === 'card') m.color.copy(COL.bg).lerp(COL.ink, 0.04);
    else if (e.role === 'solid') m.color.copy(COL.ink).lerp(COL.bg, 0.3);
    else if (e.role === 'solidAcc') { m.color.copy(COL.acc); m.emissive.copy(COL.acc).multiplyScalar(0.15); }
    else if (e.role === 'mask') { m.color.copy(COL.ink); m.opacity = e.a * INKA; }
    else if (e.role === 'maskAcc') { m.color.copy(COL.acc); m.opacity = e.a; }
  }
  function mmat(role, o) {
    o = o || {};
    let m;
    if (role === 'fill' || role === 'card') {
      m = new THREE.MeshBasicMaterial({ polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1, side: THREE.DoubleSide });
    } else if (role === 'solid' || role === 'solidAcc') {
      m = new THREE.MeshStandardMaterial({
        metalness: role === 'solid' ? 0.35 : 0.55, roughness: role === 'solid' ? 0.42 : 0.3, flatShading: true,
        polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1, side: THREE.DoubleSide,
      });
    } else {
      m = new THREE.MeshBasicMaterial({ map: o.map, transparent: true, depthWrite: false, side: o.side || THREE.FrontSide });
    }
    const e = { m, role, a: o.a == null ? 0.85 : o.a };
    MMS.push(e);
    paintMesh(e);
    return m;
  }
  function paintAll() {
    readColors();
    LMS.forEach(paintLine);
    MMS.forEach(paintMesh);
  }

  /* ---------------- textures ---------------- */
  function discTex(soft) {
    const cv = document.createElement('canvas');
    cv.width = cv.height = 64;
    const c = cv.getContext('2d');
    const g = c.createRadialGradient(32, 32, 0, 32, 32, 32);
    if (soft) { g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(0.35, 'rgba(255,255,255,0.35)'); g.addColorStop(1, 'rgba(255,255,255,0)'); }
    else { g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.5, 'rgba(255,255,255,1)'); g.addColorStop(0.68, 'rgba(255,255,255,0.25)'); g.addColorStop(1, 'rgba(255,255,255,0)'); }
    c.fillStyle = g;
    c.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }
  const DOT = discTex(false), HALO = discTex(true);
  const noise = (() => {
    const cv = document.createElement('canvas');
    cv.width = cv.height = 128;
    const c = cv.getContext('2d');
    const img = c.createImageData(128, 128);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() < 0.5 ? 0 : 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = Math.floor(Math.random() * 70);
    }
    c.putImageData(img, 0, 0);
    return cv;
  })();
  let noisePat = null;

  function fontFam() { return FONTS[(cfg.color || {}).font] || FONTS.serif; }
  function maskTex(w, h, draw) {
    const cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    const e = { tex, cv, draw };
    masks.push(e);
    redrawMask(e);
    return tex;
  }
  function redrawMask(e) {
    const c = e.cv.getContext('2d');
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.clearRect(0, 0, e.cv.width, e.cv.height);
    c.fillStyle = '#fff';
    c.strokeStyle = '#fff';
    c.globalAlpha = 1;
    e.draw(c, e.cv.width, e.cv.height);
    e.tex.needsUpdate = true;
  }
  // greeked statute text: code line, "ĐIỀU n", a rule, numbered paragraphs of bars
  function drawStatute(c, w, h, id, opt) {
    opt = opt || {};
    const p = w * 0.1;
    let y = p;
    const code = CODES[Math.floor(rnd(id, 2, 3) * CODES.length)];
    const art = 1 + Math.floor(rnd(id, 3, 4) * 680);
    if (opt.chapter) {
      c.globalAlpha = 0.65;
      c.font = '600 ' + Math.round(w * 0.05) + 'px ' + FONTS.mono;
      c.fillText('CHƯƠNG ' + ROMAN[Math.floor(rnd(id, 5, 6) * ROMAN.length)], p, y + w * 0.05);
      y += w * 0.09;
    }
    if (opt.head !== false) {
      c.globalAlpha = 0.7;
      c.font = '600 ' + Math.round(w * 0.05) + 'px ' + FONTS.mono;
      c.fillText(code, p, y + w * 0.05);
      y += w * 0.1;
      c.globalAlpha = 1;
      c.font = '700 ' + Math.round(w * 0.12) + 'px ' + fontFam();
      c.fillText('ĐIỀU ' + art, p, y + w * 0.1);
      y += w * 0.16;
      c.fillRect(p, y, w - 2 * p, Math.max(2, w * 0.008));
      y += w * 0.07;
    }
    const lh = w * 0.058, bar = Math.max(2, w * 0.016);
    let para = 0, k = 0;
    while (y < h - p * 1.7) {
      const startPara = k === 0;
      const left = startPara ? p + w * 0.07 : p;
      if (startPara) {
        c.globalAlpha = 0.8;
        c.fillRect(p, y - bar * 0.5, w * 0.035, bar * 2);
      }
      const last = k >= 3 + Math.floor(rnd(id, para, 9) * 3);
      const len = (w - p - left) * (last ? 0.3 + rnd(id, para, k) * 0.4 : 0.82 + rnd(id, para, k + 20) * 0.18);
      c.globalAlpha = 0.5;
      c.fillRect(left, y, len, bar);
      y += lh;
      k++;
      if (last) { y += lh * 0.55; k = 0; para++; }
    }
    if (opt.mark !== false) {
      c.globalAlpha = 0.85;
      c.font = '700 ' + Math.round(w * 0.12) + 'px ' + FONTS.serif;
      c.textAlign = 'right';
      c.fillText('§', w - p * 0.8, h - p * 0.55);
      c.textAlign = 'left';
    }
    c.globalAlpha = 1;
  }
  function drawSealFace(c, w) {
    const cx = w / 2, R = w / 2;
    c.lineWidth = Math.max(2, w * 0.007);
    c.beginPath(); c.arc(cx, cx, R * 0.6, 0, TAU); c.stroke();
    c.lineWidth = Math.max(1, w * 0.003);
    c.beginPath(); c.arc(cx, cx, R * 0.57, 0, TAU); c.stroke();
    const motto = String((cfg.frame || {}).motto || 'DURA LEX, SED LEX').toUpperCase().trim() || 'LEX';
    const txt = motto + '  ✦  ';
    const fs = Math.round(w * 0.06);
    c.font = '600 ' + fs + 'px ' + fontFam();
    const rr = R * 0.74;
    const circ = TAU * rr;
    const chars = Array.from(txt);
    const widths = chars.map((ch) => c.measureText(ch).width + fs * 0.14);
    const unit = widths.reduce((a, b) => a + b, 0);
    const reps = Math.max(1, Math.floor(circ / unit));
    const scaleK = circ / (unit * reps);
    let a = -Math.PI / 2;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    for (let r = 0; r < reps; r++) {
      for (let i = 0; i < chars.length; i++) {
        const da = (widths[i] * scaleK) / rr;
        c.save();
        c.translate(cx + Math.cos(a + da / 2) * rr, cx + Math.sin(a + da / 2) * rr);
        c.rotate(a + da / 2 + Math.PI / 2);
        c.fillText(chars[i], 0, 0);
        c.restore();
        a += da;
      }
    }
    c.font = '700 ' + Math.round(w * 0.46) + 'px ' + FONTS.serif;
    c.fillText('§', cx, cx + w * 0.02);
    c.textAlign = 'left';
    c.textBaseline = 'alphabetic';
  }

  /* ---------------- geometry helpers ---------------- */
  function segs(arr, mat) {
    const g = new LineSegmentsGeometry();
    g.setPositions(arr instanceof Float32Array ? arr : new Float32Array(arr));
    const o = new LineSegments2(g, mat);
    o.userData.n = arr.length / 6;
    return o;
  }
  function edgeArr(geo, thr) {
    const eg = new THREE.EdgesGeometry(geo, thr == null ? 24 : thr);
    const a = eg.attributes.position.array.slice();
    eg.dispose();
    return a;
  }
  function circleArr(r, n, y, out) {
    out = out || [];
    for (let i = 0; i < n; i++) {
      const t0 = (i / n) * TAU, t1 = ((i + 1) / n) * TAU;
      out.push(Math.cos(t0) * r, y, Math.sin(t0) * r, Math.cos(t1) * r, y, Math.sin(t1) * r);
    }
    return out;
  }
  function circleXY(r, n, z, cx, cy, out) {
    out = out || [];
    cx = cx || 0; cy = cy || 0;
    for (let i = 0; i < n; i++) {
      const t0 = (i / n) * TAU, t1 = ((i + 1) / n) * TAU;
      out.push(cx + Math.cos(t0) * r, cy + Math.sin(t0) * r, z, cx + Math.cos(t1) * r, cy + Math.sin(t1) * r, z);
    }
    return out;
  }
  let MAT = null;
  // a solid part: fill (hides what is behind it) + crisp edges
  function part(parent, geo, o) {
    o = o || {};
    const acc = o.role === 'acc';
    const solid = STYLE === 'solid';
    const g = new THREE.Group();
    if (o.fill !== false) g.add(new THREE.Mesh(geo, solid ? (acc ? MAT.solidAcc : MAT.solid) : MAT.fill));
    const em = solid ? (acc ? MAT.accSoft : MAT.faint) : acc ? MAT.acc : o.soft ? MAT.soft : MAT.ink;
    g.add(segs(edgeArr(geo, o.thr), em));
    if (o.pos) g.position.set(o.pos[0], o.pos[1], o.pos[2]);
    if (o.rot) g.rotation.set(o.rot[0], o.rot[1], o.rot[2]);
    parent.add(g);
    return g;
  }

  /* ---------------- core symbols (local units, base at y = 0) ---------------- */
  function buildScales(g, D) {
    part(g, new THREE.CylinderGeometry(0.44, 0.48, 0.07, 48), { pos: [0, 0.035, 0], thr: 30 });
    part(g, new THREE.CylinderGeometry(0.28, 0.32, 0.07, 48), { pos: [0, 0.105, 0], thr: 30 });
    part(g, new THREE.CylinderGeometry(0.036, 0.05, 1.5, 8), { pos: [0, 0.89, 0], thr: 1 });
    if (D > 0.35) {
      part(g, new THREE.CylinderGeometry(0.075, 0.075, 0.05, 24), { pos: [0, 0.6, 0], thr: 30 });
      part(g, new THREE.CylinderGeometry(0.065, 0.065, 0.04, 24), { pos: [0, 1.3, 0], thr: 30 });
    }
    part(g, new THREE.OctahedronGeometry(0.07, 0), { pos: [0, 1.72, 0], role: 'acc', thr: 1 });
    const beam = new THREE.Group();
    beam.position.set(0, 1.62, 0);
    g.add(beam);
    part(beam, new THREE.BoxGeometry(1.72, 0.032, 0.05), { thr: 30 });
    if (D > 0.5) part(beam, new THREE.BoxGeometry(0.14, 0.09, 0.06), { thr: 30 });
    for (const s of [-1, 1]) part(beam, new THREE.SphereGeometry(0.034, 12, 8), { pos: [s * 0.86, 0, 0], thr: 45 });
    const pans = [];
    for (const s of [-1, 1]) {
      const pan = new THREE.Group();
      g.add(pan);
      const bowl = new THREE.LatheGeometry([new THREE.Vector2(0.001, -0.07), new THREE.Vector2(0.14, -0.064), new THREE.Vector2(0.25, -0.038), new THREE.Vector2(0.3, 0)], 40);
      part(pan, bowl, { pos: [0, -0.74, 0], thr: 18 });
      const arr = [];
      for (let k = 0; k < 3; k++) {
        const a = (k / 3) * TAU + Math.PI / 2;
        arr.push(0, 0, 0, Math.cos(a) * 0.29, -0.74, Math.sin(a) * 0.29);
      }
      pan.add(segs(arr, MAT.soft));
      pans.push({ g: pan, s });
    }
    return {
      top: 1.79, r: 1.2, anchor: [0, 1.62, 0],
      update(st) {
        beam.rotation.z = st.beam;
        for (const p of pans) p.g.position.set(Math.cos(st.beam) * 0.86 * p.s, 1.62 + Math.sin(st.beam) * 0.86 * p.s, 0);
      },
    };
  }

  function buildTemple(g, D, cols) {
    const n = clamp(Math.round(cols), 2, 10);
    const m = Math.max(2, Math.round(n * 0.75));
    const gap = clamp(1.4 / (n - 1), 0.18, 0.5);
    const W = (n - 1) * gap, Dp = (m - 1) * gap;
    const cr = clamp(gap * 0.2, 0.035, 0.065);
    let y = 0;
    for (let k = 0; k < 3; k++) {
      const e = 0.34 - k * 0.09;
      part(g, new THREE.BoxGeometry(W + e, 0.05, Dp + e), { pos: [0, y + 0.025, 0], thr: 30 });
      y += 0.05;
    }
    const colH = 1.0;
    const colGeo = new THREE.CylinderGeometry(cr, cr * 1.12, colH, 12, 1);
    const capGeo = new THREE.BoxGeometry(cr * 3, 0.04, cr * 3);
    const proto = new THREE.Group();
    part(proto, colGeo, { pos: [0, y + colH / 2, 0], thr: 1 });
    part(proto, capGeo, { pos: [0, y + colH - 0.02, 0], thr: 30 });
    if (D > 0.3) part(proto, new THREE.BoxGeometry(cr * 2.8, 0.03, cr * 2.8), { pos: [0, y + 0.015, 0], thr: 30 });
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (i > 0 && i < n - 1 && j > 0 && j < m - 1) continue;
        const c = proto.clone();
        c.position.set(-W / 2 + i * gap, 0, -Dp / 2 + j * gap);
        g.add(c);
      }
    }
    if (Dp > 0.3 && W > 0.3) part(g, new THREE.BoxGeometry(W * 0.56, colH * 0.94, Dp * 0.58), { pos: [0, y + colH * 0.47, 0], thr: 30 });
    y += colH;
    const entH = 0.14;
    part(g, new THREE.BoxGeometry(W + 0.16, entH, Dp + 0.16), { pos: [0, y + entH / 2, 0], thr: 30 });
    if (D > 0.6) {
      const arr = [];
      const steps = Math.max(2, Math.round((W + 0.16) / (gap / 2)));
      for (let k = 1; k < steps; k++) {
        const x = -(W + 0.16) / 2 + (k * (W + 0.16)) / steps;
        for (const z of [(Dp + 0.16) / 2 + 0.001, -(Dp + 0.16) / 2 - 0.001]) arr.push(x, y + 0.03, z, x, y + entH - 0.03, z);
      }
      g.add(segs(arr, MAT.faint));
    }
    y += entH;
    if (D > 0.4) {
      part(g, new THREE.BoxGeometry(W + 0.24, 0.035, Dp + 0.24), { pos: [0, y + 0.0175, 0], thr: 30 });
      y += 0.035;
    }
    const hw = (W + 0.24) / 2, ph = 0.14 + W * 0.1;
    const shape = new THREE.Shape();
    shape.moveTo(-hw, 0); shape.lineTo(hw, 0); shape.lineTo(0, ph); shape.closePath();
    const depth = Dp + 0.24;
    const ped = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
    ped.translate(0, 0, -depth / 2);
    part(g, ped, { pos: [0, y, 0], thr: 20 });
    for (const s of [1, -1]) {
      const ring = new THREE.RingGeometry(0.04, 0.065, 28);
      part(g, ring, { pos: [0, y + ph * 0.36, s * (depth / 2 + 0.003)], rot: [0, s > 0 ? 0 : Math.PI, 0], role: 'acc', fill: false });
    }
    y += ph;
    return { top: y, r: Math.hypot(W / 2 + 0.2, Dp / 2 + 0.2), anchor: [0, y - ph * 0.6, 0], update() {} };
  }

  function buildGavel(g0, D) {
    const K = 1.4;
    const g = new THREE.Group();
    g.scale.setScalar(K);
    g0.add(g);
    const sx = -0.32;
    part(g, new THREE.CylinderGeometry(0.5, 0.54, 0.12, 56), { pos: [sx, 0.06, 0], thr: 30 });
    let topY = 0.12;
    if (D > 0.3) { part(g, new THREE.CylinderGeometry(0.4, 0.44, 0.04, 56), { pos: [sx, 0.14, 0], thr: 30 }); topY = 0.16; }
    const hr = 0.13;
    const pivot = new THREE.Group();
    pivot.position.set(sx + 1.25, topY + hr + 0.16, 0);
    g.add(pivot);
    const L = Math.hypot(1.25, 0.16), rest = Math.atan2(0.16, 1.25);
    const arm = new THREE.Group();
    pivot.add(arm);
    part(arm, new THREE.CylinderGeometry(hr, hr, 0.5, 16), { pos: [-L, 0, 0], rot: [Math.PI / 2, 0, 0], thr: 1 });
    if (D > 0.4) for (const z of [-0.17, 0.17]) part(arm, new THREE.CylinderGeometry(hr + 0.013, hr + 0.013, 0.04, 28), { pos: [-L, 0, z], rot: [Math.PI / 2, 0, 0], thr: 20 });
    const hl = L - 0.12;
    part(arm, new THREE.CylinderGeometry(0.028, 0.036, hl, 8), { pos: [-L + 0.12 + hl / 2, 0, 0], rot: [0, 0, Math.PI / 2], thr: 1 });
    part(arm, new THREE.SphereGeometry(0.045, 14, 10), { pos: [0.02, 0, 0], thr: 45 });
    const faces = [];
    for (const z of [-0.252, 0.252]) circleXY(0.09, 32, z, -L, 0, faces);
    arm.add(segs(faces, MAT.acc));
    return {
      top: 1.36 * K, r: 1.05 * K, anchor: [sx * K, (topY + 0.05) * K, 0],
      update(st) { arm.rotation.z = rest - st.lift * 50 * D2R; },
    };
  }

  function buildBook(g0, D) {
    const K = 1.2;
    const g = new THREE.Group();
    g.scale.setScalar(K);
    g0.add(g);
    part(g, new THREE.CylinderGeometry(0.34, 0.38, 0.06, 40), { pos: [0, 0.03, 0], thr: 30 });
    part(g, new THREE.CylinderGeometry(0.045, 0.06, 0.92, 8), { pos: [0, 0.52, 0], thr: 1 });
    if (D > 0.4) part(g, new THREE.CylinderGeometry(0.09, 0.09, 0.05, 24), { pos: [0, 0.3, 0], thr: 30 });
    const desk = new THREE.Group();
    desk.position.set(0, 1.0, 0);
    desk.rotation.x = 0.3;
    g.add(desk);
    part(desk, new THREE.BoxGeometry(1.5, 0.04, 1.0), { thr: 30 });
    if (D > 0.55) part(desk, new THREE.BoxGeometry(1.5, 0.05, 0.04), { pos: [0, 0.04, 0.5], thr: 30 });
    const pw = 0.66, pd = 0.9;
    for (const s of [-1, 1]) {
      const half = new THREE.Group();
      half.position.set(0, 0.02, 0);
      half.rotation.z = s * 0.06;
      desk.add(half);
      part(half, new THREE.BoxGeometry(pw + 0.03, 0.02, pd + 0.04), { pos: [(s * (pw + 0.03)) / 2, 0.01, 0], thr: 30 });
      part(half, new THREE.BoxGeometry(pw, 0.06, pd), { pos: [(s * pw) / 2, 0.05, 0], thr: 30 });
      const id = 300 + (s > 0 ? 1 : 0);
      const tex = maskTex(256, 350, (c, w, h) => drawStatute(c, w, h, id, { chapter: s < 0, head: s < 0, mark: s > 0 }));
      const mp = new THREE.Mesh(new THREE.PlaneGeometry(pw * 0.9, pd * 0.9), mmat('mask', { map: tex, a: 0.8 }));
      mp.rotation.x = -Math.PI / 2;
      mp.position.set((s * pw) / 2, 0.082, 0);
      half.add(mp);
    }
    const leaf = new THREE.Group();
    leaf.position.set(0, 0.085, 0);
    desk.add(leaf);
    const sheet = new THREE.Group();
    sheet.position.set(pw / 2, 0, 0);
    leaf.add(sheet);
    const pg = new THREE.PlaneGeometry(pw * 0.98, pd * 0.98);
    const fillM = new THREE.Mesh(pg, STYLE === 'solid' ? MAT.solid : MAT.fill);
    fillM.rotation.x = -Math.PI / 2;
    sheet.add(fillM);
    const ea = edgeArr(pg, 10);
    const eo = segs(ea, STYLE === 'solid' ? MAT.faint : MAT.soft);
    eo.rotation.x = -Math.PI / 2;
    sheet.add(eo);
    const texA = maskTex(256, 350, (c, w, h) => drawStatute(c, w, h, 310, { head: false }));
    const texB = maskTex(256, 350, (c, w, h) => drawStatute(c, w, h, 311, { head: true }));
    for (const s of [1, -1]) {
      const mp = new THREE.Mesh(new THREE.PlaneGeometry(pw * 0.88, pd * 0.88), mmat('mask', { map: s > 0 ? texA : texB, a: 0.8 }));
      mp.rotation.x = s > 0 ? -Math.PI / 2 : Math.PI / 2;
      mp.position.y = s * 0.002;
      sheet.add(mp);
    }
    leaf.visible = false;
    return {
      top: 1.32 * K, r: 0.86 * K, anchor: [0, 1.05 * K, 0],
      update(st) {
        const f = st.flip;
        leaf.visible = f > 0.001 && f < 0.999;
        leaf.rotation.z = 0.06 + f * (Math.PI - 0.12);
        leaf.position.y = 0.085 + Math.sin(f * Math.PI) * 0.04;
      },
    };
  }

  function buildSeal(g, D) {
    part(g, new THREE.BoxGeometry(0.92, 0.1, 0.38), { pos: [0, 0.05, 0], thr: 30 });
    if (D > 0.35) part(g, new THREE.BoxGeometry(0.7, 0.05, 0.3), { pos: [0, 0.125, 0], thr: 30 });
    const R = 0.8, th = 0.1;
    const spin = new THREE.Group();
    spin.position.set(0, (D > 0.35 ? 0.15 : 0.1) + R + 0.01, 0);
    g.add(spin);
    part(spin, new THREE.CylinderGeometry(R, R, th, 80), { rot: [Math.PI / 2, 0, 0], thr: 30 });
    const arr = [];
    for (const z of [th / 2 + 0.002, -th / 2 - 0.002]) {
      circleXY(R * 0.9, 96, z, 0, 0, arr);
      for (let i = 0; i < 72; i++) {
        const a = (i / 72) * TAU, r1 = R * (i % 6 === 0 ? 0.955 : 0.93);
        arr.push(Math.cos(a) * R * 0.9, Math.sin(a) * R * 0.9, z, Math.cos(a) * r1, Math.sin(a) * r1, z);
      }
    }
    spin.add(segs(arr, MAT.soft));
    const tex = maskTex(512, 512, (c, w) => drawSealFace(c, w));
    tex.userData.seal = true;
    for (const s of [1, -1]) {
      const mp = new THREE.Mesh(new THREE.PlaneGeometry(R * 2 * 0.92, R * 2 * 0.92), mmat('maskAcc', { map: tex, a: 0.95 }));
      mp.position.z = s * (th / 2 + 0.004);
      if (s < 0) mp.rotation.y = Math.PI;
      spin.add(mp);
    }
    return {
      top: spin.position.y + R, r: 0.86, anchor: [0, spin.position.y, 0],
      update(st) { spin.rotation.y = st.sealAng; },
    };
  }

  function buildNucleus(g, D) {
    const c = new THREE.Group();
    c.position.set(0, 1.05, 0);
    g.add(c);
    g.add(segs([0, 0.0, 0, 0, 0.2, 0], MAT.soft));
    const outer = new THREE.Group();
    c.add(outer);
    outer.add(segs(edgeArr(new THREE.IcosahedronGeometry(0.82, D > 0.55 ? 1 : 0), 1), MAT.soft));
    const inner = part(c, new THREE.OctahedronGeometry(0.36, 0), { role: 'acc', thr: 1 });
    const gimbals = [];
    for (let k = 0; k < (D > 0.3 ? 3 : 2); k++) {
      const gg = new THREE.Group();
      gg.rotation.set(0.5 + k * 0.9, k * 1.1, 0);
      const ring = segs(circleArr(1.0 + k * 0.06, 120, 0), MAT.faint);
      gg.add(ring);
      c.add(gg);
      gimbals.push(gg);
    }
    return {
      top: 2.0, r: 1.12, anchor: [0, 1.05, 0], hubIsCore: true,
      update(st) {
        outer.rotation.y = st.T * 0.25;
        outer.rotation.x = Math.sin(st.T * 0.2) * 0.3;
        inner.rotation.y = -st.T * 0.9;
        inner.rotation.z = st.T * 0.4;
        gimbals.forEach((gg, k) => { gg.rotation.y += st.dt * (0.3 + k * 0.2) * (k % 2 ? -1 : 1); });
      },
    };
  }

  /* ---------------- build ---------------- */
  let built = null;
  let needsBuild = true, revealOn = true, revealT = 0, sSig = '', cSig = '', tSig = '';
  let T = 0, paused = false;
  let logArr = [], counters = { tasks: 0, cites: 0, verdicts: 0, consensus: 0.95 };
  let spring = { a: 0, v: 0 }, lastRes = -10, vDone = -1, vT = -10, docAng = 0, autoAz = 0;
  const pings = [];

  function clearRoot() {
    root.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
    });
    root.clear();
    masks.forEach((e) => e.tex.dispose());
    LMS = []; MMS = []; masks = [];
    pings.length = 0;
  }

  function structSig(c) {
    const K = c.core || {}, A = c.agents || {}, S = c.scene || {};
    return JSON.stringify([K.symbol, K.style, Math.round(num(K.columns, 6)), Math.round(num(K.detail, 0.6) * 10), !!K.plinth, !!K.hub,
      Math.round(num(A.count, 6)), Math.round(num(A.rings, 3)), A.shape, Math.round(num(A.docs, 14)), S.floor]);
  }

  function assignRoles() {
    if (!built) return;
    const order = ROLES.map((r, i) => ({ i, k: rnd(i, 77, 1) })).sort((a, b) => a.k - b.k).map((o) => o.i);
    built.agents.forEach((a, i) => { const r = order[i % order.length]; a.role = ROLES[r]; a.short = SHORT[r]; });
  }

  function build() {
    needsBuild = false;
    clearRoot();
    readColors();
    const K = cfg.core || {}, A = cfg.agents || {}, S = cfg.scene || {};
    STYLE = K.style === 'solid' ? 'solid' : 'line';
    const D = clamp(num(K.detail, 0.6), 0, 1);
    MAT = {
      fill: mmat('fill'), card: mmat('card'), solid: mmat('solid'), solidAcc: mmat('solidAcc'),
      ink: lmat('ink', 1, 1), soft: lmat('ink', 0.85, 0.45), faint: lmat('ink', 0.8, 0.22),
      acc: lmat('acc', 1.15, 1), accSoft: lmat('acc', 1, 0.55),
    };
    const b = { agents: [], rings: [], docs: [] };

    // core
    b.coreRoot = new THREE.Group();
    root.add(b.coreRoot);
    const symG = new THREE.Group();
    b.coreRoot.add(symG);
    const sym = K.symbol;
    b.sym = sym === 'temple' ? buildTemple(symG, D, num(K.columns, 6))
      : sym === 'gavel' ? buildGavel(symG, D)
        : sym === 'book' ? buildBook(symG, D)
          : sym === 'seal' ? buildSeal(symG, D)
            : sym === 'nucleus' ? buildNucleus(symG, D)
              : buildScales(symG, D);
    b.PL = 0;
    if (K.plinth) {
      const pr = Math.max(1.15, b.sym.r + 0.14);
      b.PL = 0.16;
      part(b.coreRoot, new THREE.CylinderGeometry(pr, pr + 0.04, 0.1, 80), { pos: [0, 0.11, 0], thr: 30 });
      part(b.coreRoot, new THREE.CylinderGeometry(pr + 0.17, pr + 0.21, 0.06, 80), { pos: [0, 0.03, 0], thr: 30 });
      const arr = [];
      for (let i = 0; i < 72; i++) {
        const a = (i / 72) * TAU, r0 = pr - 0.16, r1 = pr - (i % 6 === 0 ? 0.03 : 0.08);
        arr.push(Math.cos(a) * r0, 0.162, Math.sin(a) * r0, Math.cos(a) * r1, 0.162, Math.sin(a) * r1);
      }
      b.coreRoot.add(segs(arr, MAT.faint));
      b.plinthR = pr + 0.21;
    } else b.plinthR = b.sym.r;
    symG.position.y = b.PL;
    // hub: the orchestrator node the agents report to
    b.hubL = new THREE.Vector3();
    if (b.sym.hubIsCore || !K.hub) b.hubL.set(b.sym.anchor[0], b.PL + b.sym.anchor[1], b.sym.anchor[2]);
    else {
      const hy = b.PL + b.sym.top + 0.4;
      b.hubL.set(0, hy, 0);
      const hub = part(b.coreRoot, new THREE.OctahedronGeometry(0.085, 0), { pos: [0, hy, 0], role: 'acc', thr: 1 });
      b.hubNode = hub;
      const stem = segs([0, b.PL + b.sym.top + 0.06, 0, 0, hy - 0.11, 0], lmat('ink', 0.8, 0.4, false, { dashed: true, dashSize: 0.04, gapSize: 0.035 }));
      stem.computeLineDistances();
      b.coreRoot.add(stem);
    }

    // floor
    b.floorMat = lmat('floor', 1, 1);
    if (S.floor === 'polar' || S.floor === 'grid') {
      const arr = [];
      if (S.floor === 'polar') {
        for (let i = 1; i <= 12; i++) circleArr(i / 12, 48 + i * 10, 0, arr);
        for (let k = 0; k < 24; k++) {
          const a = (k / 24) * TAU;
          arr.push(Math.cos(a) * 0.17, 0, Math.sin(a) * 0.17, Math.cos(a), 0, Math.sin(a));
        }
      } else {
        const lines = [];
        for (let i = -12; i <= 12; i++) {
          const x = i / 12, hz = Math.sqrt(Math.max(0, 1 - x * x));
          lines.push({ d: Math.abs(x), a: [x, 0, -hz, x, 0, hz] }, { d: Math.abs(x), a: [-hz, 0, x, hz, 0, x] });
        }
        lines.sort((p, q) => p.d - q.d).forEach((l) => arr.push.apply(arr, l.a));
      }
      b.floor = segs(arr, b.floorMat);
      b.floor.position.y = 0.002;
      root.add(b.floor);
    }

    // armillary rings
    const nR = clamp(Math.round(num(A.rings, 3)), 1, 4);
    const ringMat = lmat('ink', 0.9, 0.5), tickMat = lmat('ink', 0.8, 0.32);
    for (let k = 0; k < nR; k++) {
      const g = new THREE.Group();
      g.matrixAutoUpdate = false;
      const line = segs(circleArr(1, 180, 0), ringMat);
      const ta = [];
      for (let i = 0; i < 72; i++) {
        const a = (i / 72) * TAU, l = i % 6 === 0 ? 0.05 : 0.022;
        ta.push(Math.cos(a), 0, Math.sin(a), Math.cos(a) * (1 + l), 0, Math.sin(a) * (1 + l));
      }
      const ticks = segs(ta, tickMat);
      g.add(line, ticks);
      root.add(g);
      b.rings.push({ g, line, ticks });
    }

    // agents
    const nA = clamp(Math.round(num(A.count, 6)), 0, 12);
    const shape = A.shape;
    const ag = shape === 'cube' ? new THREE.BoxGeometry(0.16, 0.16, 0.16)
      : shape === 'tetra' ? new THREE.TetrahedronGeometry(0.14, 0)
        : shape === 'ico' ? new THREE.IcosahedronGeometry(0.12, 0)
          : new THREE.OctahedronGeometry(0.13, 0);
    const agEdges = edgeArr(ag, 1);
    const perRing = Math.ceil(nA / nR);
    for (let i = 0; i < nA; i++) {
      const ring = i % nR, q = Math.floor(i / nR);
      const g = new THREE.Group();
      const em = lmat('ink', 1.1, 1, true);
      const solidM = STYLE === 'solid' ? mmat('solidAcc') : null;
      g.add(new THREE.Mesh(ag, solidM || MAT.fill));
      g.add(segs(agEdges, em));
      root.add(g);
      b.agents.push({
        g, em, solidM, ring, theta: (q / perRing) * TAU + ring * 0.9 + rnd(i, 1, 1) * 0.35,
        dir: ring % 2 ? -1 : 1, off: fract(i * 0.6180339 + rnd(i, 2, 2) * 0.15), done: -1,
        id: 'A-' + pad(i + 1, 2), role: '', pos: new THREE.Vector3(), glow: 0, work: 0, act: 0, appear: 0, spinX: rnd(i, 3, 3) * TAU,
      });
    }

    // statute cards
    const nD = clamp(Math.round(num(A.docs, 14)), 0, 24);
    const cw = 0.42, ch = 0.56;
    const cardGeo = new THREE.PlaneGeometry(cw, ch);
    const border = [];
    const rect = (w2, h2, z, out) => { out.push(-w2, -h2, z, w2, -h2, z, w2, -h2, z, w2, h2, z, w2, h2, z, -w2, h2, z, -w2, h2, z, -w2, -h2, z); return out; };
    rect(cw / 2, ch / 2, 0, border);
    const hlArr = rect(cw / 2 + 0.03, ch / 2 + 0.03, 0, []);
    for (let j = 0; j < nD; j++) {
      const g = new THREE.Group();
      g.add(new THREE.Mesh(cardGeo, MAT.card));
      const tex = maskTex(256, 342, (c, w, h) => drawStatute(c, w, h, j));
      const mp = new THREE.Mesh(cardGeo, mmat('mask', { map: tex, a: 0.85 }));
      mp.position.z = 0.003;
      g.add(mp);
      g.add(segs(border, MAT.soft));
      const hm = lmat('acc', 1.1, 1, true);
      hm.opacity = 0;
      const ho = segs(hlArr, hm);
      g.add(ho);
      root.add(g);
      b.docs.push({ g, hm, ho, pos: new THREE.Vector3(), hl: 0, appear: 0 });
    }

    // live links (hub → agent, agent → card): fat segments whose colour fakes alpha against the background
    const nSeg = Math.max(1, nA * 2);
    const lg = new LineSegmentsGeometry();
    lg.setPositions(new Float32Array(nSeg * 6));
    lg.setColors(new Float32Array(nSeg * 6));
    b.linkMat = lmat('white', 0.9, 1, true, { vertexColors: true, transparent: false });
    b.links = new LineSegments2(lg, b.linkMat);
    b.links.frustumCulled = false;
    b.linkPos = lg.attributes.instanceStart.data;
    b.linkCol = lg.attributes.instanceColorStart.data;
    root.add(b.links);

    const mkPoints = (n, tex, size) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
      geo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 4), 4));
      const mat = new THREE.PointsMaterial({ size, map: tex, vertexColors: true, transparent: true, depthWrite: false, sizeAttenuation: true, fog: true });
      const p = new THREE.Points(geo, mat);
      p.frustumCulled = false;
      root.add(p);
      return p;
    };
    b.pulses = mkPoints(Math.max(1, nA * 4), DOT, 0.075);
    b.halos = mkPoints(nA + 1, HALO, 0.55);

    // analysis scan + pings
    b.scanMats = [lmat('acc', 1, 1, true), lmat('acc', 0.8, 1, true)];
    b.scan = b.scanMats.map((m) => { const o = segs(circleArr(1, 120, 0), m); root.add(o); return o; });
    for (let k = 0; k < 8; k++) {
      const m = lmat('acc', 1, 1, true);
      const o = segs(circleArr(1, 140, 0), m);
      o.visible = false;
      root.add(o);
      pings.push({ o, m, t0: -10, dur: 1, r0: 0, r1: 1, y: 0, x: 0, z: 0, a: 1 });
    }

    built = b;
    assignRoles();
    if (revealOn) {
      revealT = 0;
      logArr = [];
      counters = { tasks: 0, cites: 0, verdicts: 0, consensus: 0.95 };
      pushLog([[clock(), 'dim'], ['KHỞI TẠO', 'acc'], [nA + ' AGENT · ' + nD + ' VĂN BẢN', 'ink'], [SYMBOL_NAME[sym] || SYMBOL_NAME.scales, 'ink2']]);
    } else revealT = 1e6;
    vDone = Math.floor(T / Math.max(3, num(S.verdict, 12)));
    b.agents.forEach((a) => { a.done = Math.floor(T / Math.max(2, num(A.cycle, 7)) + a.off); });
    tSig = texSig();
    cSig = colorSig();
    paintAll();
    resize();
  }

  /* ---------------- log + events ---------------- */
  function clock() {
    const s = 9 * 3600 + 14 * 60 + Math.floor(T);
    return pad(Math.floor(s / 3600) % 24, 2) + ':' + pad(Math.floor(s / 60) % 60, 2) + ':' + pad(s % 60, 2);
  }
  function pushLog(segsArr, kind) {
    logArr.push({ t: T, segs: segsArr, kind: kind || 'line', n: segsArr.reduce((a, s) => a + s[0].length + 2, 0) });
    if (logArr.length > 40) logArr.shift();
  }
  function spawnPing(x, y, z, r0, r1, dur, a, delay) {
    let p = pings.find((q) => T - q.t0 > q.dur + 0.05) || pings[0];
    Object.assign(p, { t0: T + (delay || 0), dur, r0, r1, x, y, z, a });
  }
  function onResult(i, k) {
    const b = built, a = b.agents[i];
    const warn = rnd(i, k, 11) < 0.1;
    const code = CODE_S[Math.floor(rnd(i, k, 12) * CODE_S.length)];
    const art = 1 + Math.floor(rnd(i, k, 13) * 680);
    const conf = warn ? 0.52 + rnd(i, k, 15) * 0.2 : 0.86 + rnd(i, k, 15) * 0.13;
    const status = warn ? WARN[Math.floor(rnd(i, k, 16) * WARN.length)] : OK[Math.floor(rnd(i, k, 16) * OK.length)] + ' ' + conf.toFixed(2);
    pushLog([[clock(), 'dim'], [a.id, warn ? 'acc' : 'ink'], [a.short, 'ink2'], [code + ' Đ.' + art, 'ink'], [status, warn ? 'acc' : 'ink']]);
    counters.tasks++;
    counters.cites += 1 + Math.floor(rnd(i, k, 17) * 3);
    counters.consensus = counters.consensus * 0.85 + conf * 0.15;
    const bal = num((cfg.core || {}).balance, 8) * D2R;
    spring.v += (rnd(i, k, 18) < 0.5 ? -1 : 1) * bal * 3.4;
    lastRes = T;
    spawnPing(hubW.x, hubW.y, hubW.z, 0.05, 0.42, 0.9, 0.85);
  }
  function onVerdict() {
    const b = built;
    counters.verdicts++;
    const nA = b.agents.length;
    const agree = nA ? Math.max(1, nA - (rnd(counters.verdicts, 3, 9) < 0.25 ? 1 : 0)) : 0;
    pushLog([[clock(), 'dim'], ['PHÁN QUYẾT #' + pad(counters.verdicts, 3), 'acc'], ['ĐỒNG THUẬN ' + agree + '/' + nA, 'ink'], ['CÓ HIỆU LỰC', 'acc']], 'verdict');
    vT = T;
    const s = clamp(num((cfg.core || {}).scale, 1), 0.3, 2.5);
    const Rd = num((cfg.agents || {}).docRadius, 4);
    spawnPing(0, 0.004, 0, b.plinthR * s, Math.max(Rd * 1.08, b.plinthR * s + 1), 2.4, 0.7);
    spawnPing(0, 0.004, 0, b.plinthR * s, Math.max(Rd * 0.8, b.plinthR * s + 0.6), 2.0, 0.45, 0.25);
  }

  /* ---------------- camera ---------------- */
  let dragging = false, lastX = 0, lastY = 0, lastPT = 0, dragAng = 0, dragVel = 0, dragEl = 0;
  let ptrX = 0, ptrY = 0, tgtX = 0, tgtY = 0;
  const inset = { l: 0, r: 0, t: 0, b: 0 }, insetGoal = { r: 0, t: 0, b: 0 };
  const lay = { logWide: false, logCompact: false, logW: 0, m: 16 };
  const hubW = new THREE.Vector3(), tmpV = new THREE.Vector3(), tmpV2 = new THREE.Vector3();
  let camDist = 10, sceneR = 4;

  function layout() {
    const F = cfg.frame || {};
    const fw = VW - insetGoal.r, fh = VH - insetGoal.t - insetGoal.b;
    lay.m = clamp(Math.min(fw, fh) * 0.035, 12, 28);
    lay.logWide = F.log !== false && fw >= 980 && fh >= 420;
    lay.logCompact = F.log !== false && !lay.logWide && fh >= 340;
    lay.logW = lay.logWide ? clamp(fw * 0.28, 280, 360) : 0;
    return {
      l: lay.logWide ? lay.logW + lay.m : 0,
      b: insetGoal.b + (lay.logCompact ? 3 * 14 + 30 : 0),
    };
  }

  function updateCamera(dt, sdt) {
    const S = cfg.scene || {}, A = cfg.agents || {}, K = cfg.core || {};
    const goal = layout();
    const ik = dt <= 0 ? 1 : Math.min(1, dt * 6);
    const gl = { l: goal.l, r: insetGoal.r, t: insetGoal.t, b: goal.b };
    for (const key of ['l', 'r', 't', 'b']) {
      inset[key] += (gl[key] - inset[key]) * ik;
      if (Math.abs(gl[key] - inset[key]) < 0.5) inset[key] = gl[key];
    }
    const w = VW, h = VH;
    const vw = Math.max(w * 0.3, w - inset.l - inset.r), vh = Math.max(h * 0.35, h - inset.t - inset.b);
    const aspect = vw / vh;
    const b = built;
    const s = clamp(num(K.scale, 1), 0.3, 2.5);
    const R0 = num(A.radius, 2.5), spr = num(A.spread, 0.3), nR = b ? b.rings.length : 3;
    const ringMax = R0 * (1 + (nR > 1 ? spr * 0.5 : 0));
    const tilt = Math.abs(num(A.tilt, 22)) * D2R;
    const nD = b ? b.docs.length : 0;
    const coreTop = b ? (b.PL + b.sym.top) * s : 2;
    const ringY = b ? (b.PL + b.sym.top * 0.52) * s : 1;
    const Rh = Math.max(ringMax + 0.15, nD ? num(A.docRadius, 4) + 0.3 : 0, b ? b.plinthR * s : 1.3);
    const top = Math.max(coreTop + (b && b.hubNode ? 0.5 * s : 0.15), ringY + ringMax * Math.sin(tilt) + 0.2);
    const bottom = Math.min(0, ringY - ringMax * Math.sin(tilt) - 0.2);
    sceneR = Rh;

    if (!dragging) {
      dragAng += dragVel * dt;
      dragVel *= Math.pow(0.06, dt);
      dragEl *= Math.pow(0.5, dt);
    }
    const k = Math.min(1, dt * 3);
    ptrX += (tgtX - ptrX) * k;
    ptrY += (tgtY - ptrY) * k;
    autoAz += num(S.autoRotate, 3) * D2R * sdt;
    const mouse = num(S.mouse, 0.4);
    const e0 = clamp(num(S.elevation, 14), -10, 80) * D2R;
    const az = autoAz + dragAng + ptrX * mouse * 0.28 + 0.45;
    const el = clamp(e0 + ptrY * mouse * 0.08 + dragEl, -0.3, 1.45);
    const vExt = ((top - bottom) * Math.cos(el) + 2 * Rh * Math.abs(Math.sin(el))) / 2;
    const zoom = Math.max(0.2, num(S.zoom, 1));
    const ortho_ = S.camera === 'ortho';
    // perspective magnifies the near rim of the floor; aim a little lower so the mass sits mid-frame
    const cy = (top + bottom) / 2 - (ortho_ ? 0 : Rh * Math.sin(el) * 0.4);
    camera = ortho_ ? ortho : persp;
    let dist;
    if (ortho_) {
      const halfH = (Math.max(vExt, Rh / aspect) * 1.1) / zoom;
      ortho.left = -halfH * aspect; ortho.right = halfH * aspect; ortho.top = halfH; ortho.bottom = -halfH;
      dist = 40;
      ortho.near = 0.1; ortho.far = 120;
    } else {
      const fov = clamp(num(S.fov, 30), 10, 90);
      persp.fov = fov;
      persp.aspect = aspect;
      const tanV = Math.tan((fov * Math.PI) / 360);
      dist = (Math.max(vExt / tanV, Rh / (tanV * aspect)) * 1.04 + Rh * Math.cos(el) * 0.3) / zoom;
      persp.near = Math.max(0.05, dist * 0.02);
      persp.far = dist + Rh * 12;
    }
    camDist = dist;
    camera.position.set(Math.sin(az) * Math.cos(el) * dist, cy + Math.sin(el) * dist, Math.cos(az) * Math.cos(el) * dist);
    camera.lookAt(0, cy, 0);
    if (inset.l + inset.r + inset.t + inset.b > 0.5) camera.setViewOffset(vw, vh, -inset.l, -inset.t, w, h);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
    const fog = clamp(num(S.fog, 0.5), 0, 1);
    scene.fog.near = fog <= 0.001 ? 1e4 : Math.max(0.1, dist - Rh * 0.35);
    scene.fog.far = fog <= 0.001 ? 2e4 : dist + Rh * lerp(6, 1.25, fog);
    if (b) {
      b.pulses.material.size = ortho_ ? 5.5 : 0.075;
      b.halos.material.size = ortho_ ? 34 : 0.55;
    }
  }

  /* ---------------- per-frame scene ---------------- */
  const local = new THREE.Vector3();
  function setSeg(buf, cbuf, i, a, b2, col, alpha) {
    const p = buf.array, c = cbuf.array, o = i * 6;
    p[o] = a.x; p[o + 1] = a.y; p[o + 2] = a.z; p[o + 3] = b2.x; p[o + 4] = b2.y; p[o + 5] = b2.z;
    const al = sat(alpha);
    const r = COL.bg.r + (col.r - COL.bg.r) * al, g = COL.bg.g + (col.g - COL.bg.g) * al, bl = COL.bg.b + (col.b - COL.bg.b) * al;
    c[o] = c[o + 3] = r; c[o + 1] = c[o + 4] = g; c[o + 2] = c[o + 5] = bl;
  }
  const FAR = new THREE.Vector3(0, -500, 0);
  const tmpCol = new THREE.Color();

  function updateScene(dt, sdt) {
    const b = built;
    if (!b) return;
    const K = cfg.core || {}, A = cfg.agents || {}, S = cfg.scene || {};
    const s = clamp(num(K.scale, 1), 0.3, 2.5);
    const buildDur = Math.max(0, num(S.build, 2.4));
    const B = buildDur <= 0.01 ? 1 : sat(revealT / buildDur);
    b.B = B;

    // core + its moving parts
    const grow = Math.max(0.001, easeOut((B - 0.05) / 0.45));
    b.coreRoot.scale.set(s, s * grow, s);
    const bal = num(K.balance, 8) * D2R;
    if (sdt > 0) {
      const steps = Math.ceil(sdt / 0.016);
      const h = sdt / steps;
      for (let i = 0; i < steps; i++) {
        spring.v += (-16 * spring.a - 2.8 * spring.v) * h;
        spring.a += spring.v * h;
      }
      spring.a = clamp(spring.a, -Math.max(bal, 0.001) * 2.5, Math.max(bal, 0.001) * 2.5);
    }
    const V = Math.max(3, num(S.verdict, 12));
    const uV = T / V, kV = Math.floor(uV), pV = uV - kV;
    let lift = 0;
    if (pV > 0.82 && pV <= 0.93) lift = smooth((pV - 0.82) / 0.11);
    else if (pV > 0.93 && pV <= 0.975) lift = 1;
    else if (pV > 0.975) lift = 1 - Math.pow((pV - 0.975) / 0.025, 2);
    else if (pV < 0.06) lift = Math.sin((pV / 0.06) * Math.PI) * 0.1;
    const pB = fract(T / (V / 2));
    const flip = pB < 0.16 ? smooth(pB / 0.16) : 0;
    const sealAng = T * num(K.spin, 10) * D2R + Math.PI * (kV + smooth(pV / 0.08));
    b.sym.update({ T, dt: sdt, beam: spring.a + Math.sin(T * 0.7) * bal * 0.12, lift, flip, sealAng });
    b.coreRoot.updateMatrixWorld(true);
    hubW.copy(b.hubL).applyMatrix4(b.coreRoot.matrixWorld);
    if (b.hubNode) {
      b.hubNode.rotation.y = T * 1.2;
      b.hubNode.scale.setScalar(1 + 0.5 * Math.exp(-(T - lastRes) * 6));
    }

    // verdict
    if (kV !== vDone) {
      vDone = kV;
      if (B >= 0.75) onVerdict();
    }
    const vFlash = Math.exp(-Math.max(0, T - vT) * 2.2);

    // floor
    const nD = b.docs.length;
    const Rd = num(A.docRadius, 4);
    const R0 = num(A.radius, 2.5), spr = num(A.spread, 0.3), nR = b.rings.length;
    const Rf = Math.max(Rd, R0 * (1 + spr)) * 1.55;
    if (b.floor) {
      b.floor.scale.set(Rf, 1, Rf);
      b.floor.geometry.instanceCount = Math.floor(b.floor.userData.n * smooth(B / 0.4));
    }

    // rings
    const ringY = (b.PL + b.sym.top * 0.52) * s * grow;
    const tilt = num(A.tilt, 22) * D2R;
    const ringR = smooth((B - 0.2) / 0.4);
    b.rings.forEach((r, k) => {
      const Rk = R0 * (1 + (nR > 1 ? spr * (k / (nR - 1) - 0.5) : 0));
      const tk = tilt * (k % 2 ? -1 : 1) * (nR > 1 ? 0.55 + (0.45 * k) / (nR - 1) : 1);
      r.g.position.set(0, ringY, 0);
      r.g.rotation.set(tk, (k * Math.PI) / nR + 0.4, 0, 'YXZ');
      r.g.scale.setScalar(Rk);
      r.g.updateMatrix();
      r.line.geometry.instanceCount = Math.floor(r.line.userData.n * ringR);
      r.ticks.geometry.instanceCount = Math.floor(r.ticks.userData.n * smooth((B - 0.35) / 0.35));
      r.R = Rk;
    });

    // agents: phases first (cards need the highlight)
    const cyc = Math.max(2, num(A.cycle, 7));
    const orbit = num(A.orbit, 9) * D2R;
    const links = clamp(num(A.links, 0.6), 0, 1);
    const retr = A.retrieval !== false;
    const size = clamp(num(A.size, 1), 0.2, 3);
    for (const d of b.docs) d.tgt = 0;
    const nA = b.agents.length;
    b.agents.forEach((a, i) => {
      const u = T / cyc + a.off, k = Math.floor(u), f = u - k;
      a.f = f; a.k = k;
      a.work = smooth((f - 0.14) / 0.06) * (1 - smooth((f - 0.56) / 0.06));
      a.act = Math.max(bump(f, 0, 0.16, 0.03), bump(f, 0.6, 0.8, 0.03));
      a.doc = nD ? Math.floor(rnd(i, k, 7) * nD) : -1;
      if (a.doc >= 0 && retr) b.docs[a.doc].tgt = Math.max(b.docs[a.doc].tgt, a.work);
      if (f >= 0.78 && a.done !== k) {
        a.done = k;
        if (B >= 0.75) onResult(i, k);
      }
    });

    // cards
    docAng -= orbit * 0.12 * sdt;
    b.docs.forEach((d, j) => {
      const phi = (j / nD) * TAU + docAng;
      d.appear = easeOut((B - 0.3 - (j / Math.max(1, nD)) * 0.35) / 0.2);
      d.hl = d.tgt;
      const y = 0.42 + Math.sin(T * 0.7 + j * 1.7) * 0.012 + d.hl * 0.1;
      d.g.position.set(Math.cos(phi) * Rd, y, Math.sin(phi) * Rd);
      d.g.rotation.y = Math.PI / 2 - phi;
      d.g.scale.setScalar(Math.max(0.001, d.appear));
      d.hm.opacity = d.hl;
      d.ho.visible = d.hl > 0.01;
      d.pos.copy(d.g.position);
    });

    // agents: positions, links, pulses
    const lp = b.linkPos, lc = b.linkCol;
    const pp = b.pulses.geometry.attributes.position.array, pc = b.pulses.geometry.attributes.color.array;
    const hp = b.halos.geometry.attributes.position.array, hc = b.halos.geometry.attributes.color.array;
    const ac = COL.acc;
    b.agents.forEach((a, i) => {
      const r = b.rings[a.ring];
      a.theta += orbit * a.dir * (1 + a.ring * 0.15) * sdt;
      local.set(Math.cos(a.theta), 0, Math.sin(a.theta)).applyMatrix4(r.g.matrix);
      a.pos.copy(local);
      a.appear = easeOut((B - 0.5 - (i / Math.max(1, nA)) * 0.3) / 0.2);
      a.glow = Math.max(a.work, a.act * 0.75, vFlash * 0.6);
      a.g.position.copy(a.pos);
      a.spinX += sdt * (0.5 + a.glow * 2.4);
      a.g.rotation.set(a.spinX * 0.6, a.spinX, 0);
      a.g.scale.setScalar(Math.max(0.001, a.appear) * size * (1 + a.glow * 0.18));
      a.em.color.copy(COL.ink).lerp(ac, sat(a.glow * 1.3));
      a.em.opacity = (0.6 + 0.4 * a.glow) * (a.glow > 0.3 ? 1 : INKA);
      if (a.solidM) a.solidM.emissive.copy(ac).multiplyScalar(0.1 + a.glow * 0.5);
      const vis = a.appear > 0.05 ? 1 : 0;
      // hub → agent
      const la = links * vis * (0.32 + 0.68 * Math.max(a.act, vFlash * 0.8));
      tmpCol.copy(COL.ink).lerp(ac, sat(Math.max(a.act, vFlash) * 1.2));
      setSeg(lp, lc, i * 2, hubW, a.pos, tmpCol, la);
      // agent → card
      const d = a.doc >= 0 ? b.docs[a.doc] : null;
      if (d && retr && a.work > 0.001 && vis) setSeg(lp, lc, i * 2 + 1, a.pos, d.pos, ac, a.work * Math.max(0.35, links));
      else setSeg(lp, lc, i * 2 + 1, FAR, FAR, ac, 0);
      // pulses: 0 = dispatch / return, 1-3 = retrieval
      const f = a.f;
      let o = i * 4;
      let px = FAR, al = 0;
      if (f < 0.14) { tmpV.copy(hubW).lerp(a.pos, smooth(f / 0.14)); px = tmpV; al = 1; }
      else if (f >= 0.62 && f < 0.78) { tmpV.copy(a.pos).lerp(hubW, smooth((f - 0.62) / 0.16)); px = tmpV; al = 1; }
      writePt(pp, pc, o, px, ac, al * vis);
      for (let q = 0; q < 3; q++) {
        o++;
        if (d && retr && a.work > 0.01 && vis) {
          const t = fract((f - 0.14) / 0.14 + q / 3);
          tmpV2.copy(d.pos).lerp(a.pos, t);
          writePt(pp, pc, o, tmpV2, ac, a.work * Math.sin(t * Math.PI));
        } else writePt(pp, pc, o, FAR, ac, 0);
      }
      writePt(hp, hc, i, a.pos, ac, a.glow * 0.5 * vis);
    });
    writePt(hp, hc, nA, hubW, ac, (0.25 + 0.75 * Math.max(Math.exp(-(T - lastRes) * 5), vFlash)) * smooth((B - 0.4) / 0.3));
    lp.needsUpdate = true;
    lc.needsUpdate = true;
    b.pulses.geometry.attributes.position.needsUpdate = true;
    b.pulses.geometry.attributes.color.needsUpdate = true;
    b.halos.geometry.attributes.position.needsUpdate = true;
    b.halos.geometry.attributes.color.needsUpdate = true;

    // scan ring sweeping the core
    const scanOn = K.scan !== false && B > 0.4;
    const y0 = b.PL * s, y1 = (b.PL + b.sym.top) * s * grow;
    const sr = (b.sym.r * 1.08 + 0.06) * s;
    b.scan.forEach((o, k) => {
      o.visible = scanOn;
      if (!scanOn) return;
      const ph = (T - k * 0.22) / 5.5;
      o.position.set(0, y0 + (0.5 - 0.5 * Math.cos(ph * TAU)) * (y1 - y0), 0);
      o.scale.setScalar(sr);
      b.scanMats[k].opacity = (k ? 0.22 : 0.7) * smooth((B - 0.4) / 0.3);
    });

    // pings
    for (const p of pings) {
      const age = (T - p.t0) / p.dur;
      if (age < 0 || age >= 1) { p.o.visible = false; continue; }
      p.o.visible = true;
      p.o.position.set(p.x, p.y, p.z);
      p.o.scale.setScalar(lerp(p.r0, p.r1, easeOut(age)));
      p.m.opacity = Math.pow(1 - age, 1.6) * p.a;
    }
  }
  function writePt(pa, ca, i, v, col, a) {
    pa[i * 3] = v.x; pa[i * 3 + 1] = v.y; pa[i * 3 + 2] = v.z;
    ca[i * 4] = col.r; ca[i * 4 + 1] = col.g; ca[i * 4 + 2] = col.b; ca[i * 4 + 3] = sat(a);
  }

  /* ---------------- overlay ---------------- */
  const wCache = new Map();
  function textW(t) {
    const key = ox.font + '|' + t;
    let v = wCache.get(key);
    if (v === undefined) { v = ox.measureText(t).width; if (wCache.size > 600) wCache.clear(); wCache.set(key, v); }
    return v;
  }
  function spacedW(t, sp) { let w = 0; const ch = Array.from(t); for (const c of ch) w += textW(c); return w + sp * Math.max(0, ch.length - 1); }
  function spaced(t, x, y, sp, align) {
    const ch = Array.from(t);
    const tw = spacedW(t, sp);
    let cx = align === 'center' ? x - tw / 2 : align === 'right' ? x - tw : x;
    ox.textAlign = 'left';
    for (const c of ch) { ox.fillText(c, cx, y); cx += textW(c) + sp; }
    return tw;
  }
  function hRule(y, x0, x1, gaps) {
    let x = x0;
    const gs = gaps.filter((g) => g && g[1] > x0 && g[0] < x1).sort((a, b) => a[0] - b[0]);
    ox.beginPath();
    for (const g of gs) {
      if (g[0] > x) { ox.moveTo(x, y); ox.lineTo(g[0], y); }
      x = Math.max(x, g[1]);
    }
    if (x < x1) { ox.moveTo(x, y); ox.lineTo(x1, y); }
    ox.stroke();
  }
  function rgbStr(hex) { const n = parseInt(String(hex || '#000').replace('#', '').slice(0, 6), 16) || 0; return ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255); }

  function drawOverlay() {
    const w = VW, h = VH;
    ox.setTransform(DPR, 0, 0, DPR, 0, 0);
    ox.clearRect(0, 0, w, h);
    const b = built;
    if (!b) return;
    const F = cfg.frame || {}, C = cfg.color || {};
    const ink = C.ink || '#e8e2d0', acc = C.accent || '#c9a24a';
    const fx1 = w - inset.r, fy0 = inset.t, fy1 = h - insetGoal.b;
    const fw = fx1, fh = fy1 - fy0;
    const m = lay.m;
    const bx = m, by = fy0 + m, bw = fw - 2 * m, bh = fh - 2 * m;
    const rev = smooth((b.B - 0.12) / 0.45);
    const disp = fontFam(), mono = FONTS.mono;
    ox.textBaseline = 'middle';
    ox.lineWidth = 1;

    // agent labels: corner brackets + id, role while working
    if (F.labels !== false) {
      ox.font = '500 9.5px ' + mono;
      for (const a of b.agents) {
        if (a.appear < 0.6) continue;
        tmpV.copy(a.pos).project(camera);
        if (tmpV.z > 1 || tmpV.z < -1) continue;
        const x = ((tmpV.x + 1) / 2) * w, y = ((1 - tmpV.y) / 2) * h;
        if (x < inset.l + 4 || x > fx1 - 4 || y < fy0 + 4 || y > h - inset.b - 4) continue;
        const dd = camera.position.distanceTo(a.pos);
        const dk = clamp(1 - (dd - (camDist - sceneR)) / (2 * sceneR), 0, 1);
        const al = (0.32 + 0.55 * a.glow) * (0.45 + 0.55 * dk) * rev * smooth((a.appear - 0.6) / 0.4);
        const hot = a.glow > 0.35;
        ox.strokeStyle = hot ? acc : ink;
        ox.fillStyle = hot ? acc : ink;
        ox.globalAlpha = al;
        const r = 8 + a.glow * 3, l = 3.5;
        ox.beginPath();
        for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
          ox.moveTo(x + sx * r, y + sy * (r - l)); ox.lineTo(x + sx * r, y + sy * r); ox.lineTo(x + sx * (r - l), y + sy * r);
        }
        ox.stroke();
        // flip the label to the left when it would run past the frame
        const tw = Math.max(ox.measureText(a.id).width, a.work > 0.05 ? ox.measureText(a.role).width : 0);
        const flip = x + r + 5 + tw > fx1 - 6;
        ox.textAlign = flip ? 'right' : 'left';
        const tx = flip ? x - r - 5 : x + r + 5;
        ox.fillText(a.id, tx, y - (a.work > 0.05 ? 5 : 0));
        if (a.work > 0.05) {
          ox.globalAlpha = al * a.work;
          ox.fillStyle = acc;
          ox.fillText(a.role, tx, y + 7);
        }
      }
    }

    // frame
    const capOn = F.caption !== false && String(F.motto || '').trim();
    const gapsTop = [], gapsBot = [];
    const capFs = Math.round(clamp(fw * 0.011, 10, 13));
    const capFont = '600 ' + capFs + 'px ' + disp;
    const capTxt = String(F.motto || '').toUpperCase().trim();
    const capSp = capFs * 0.32;
    let capW = 0;
    const capX = lay.logWide ? inset.l + (bx + bw - inset.l) / 2 : bx + bw / 2;
    if (capOn) { ox.font = capFont; capW = spacedW(capTxt, capSp); gapsTop.push([capX - capW / 2 - 12, capX + capW / 2 + 12]); }
    const hudFont = '500 9.5px ' + mono, hudSp = 1.2;
    let hudL = '', hudR = '', hudLW = 0, hudRW = 0;
    if (F.hud !== false) {
      ox.font = hudFont;
      hudL = 'AGENT ' + pad(b.agents.length, 2) + ' · TÁC VỤ ' + pad(counters.tasks, 4) + ' · TRÍCH DẪN ' + pad(counters.cites, 4);
      hudR = 'ĐỒNG THUẬN ' + counters.consensus.toFixed(2) + ' · PHÁN QUYẾT #' + pad(counters.verdicts, 3);
      hudLW = spacedW(hudL, hudSp); hudRW = spacedW(hudR, hudSp);
      if (hudLW + hudRW + 80 > bw) { hudL = 'TÁC VỤ ' + pad(counters.tasks, 4); hudLW = spacedW(hudL, hudSp); }
      if (hudLW + hudRW + 80 > bw) { hudR = '#' + pad(counters.verdicts, 3); hudRW = spacedW(hudR, hudSp); }
      gapsBot.push([bx + 18, bx + 18 + hudLW + 20], [bx + bw - 18 - hudRW - 20, bx + bw - 18]);
    }
    if (F.border !== false) {
      ox.strokeStyle = ink;
      ox.globalAlpha = 0.3 * rev * INKA;
      hRule(by + 0.5, bx, bx + bw, gapsTop);
      hRule(by + bh - 0.5, bx, bx + bw, gapsBot);
      ox.beginPath(); ox.moveTo(bx + 0.5, by); ox.lineTo(bx + 0.5, by + bh); ox.moveTo(bx + bw - 0.5, by); ox.lineTo(bx + bw - 0.5, by + bh); ox.stroke();
      ox.globalAlpha = 0.14 * rev * INKA;
      hRule(by + 4.5, bx + 4, bx + bw - 4, gapsTop);
      hRule(by + bh - 4.5, bx + 4, bx + bw - 4, gapsBot);
      ox.beginPath(); ox.moveTo(bx + 4.5, by + 4); ox.lineTo(bx + 4.5, by + bh - 4); ox.moveTo(bx + bw - 4.5, by + 4); ox.lineTo(bx + bw - 4.5, by + bh - 4); ox.stroke();
      // registration crosses at the corners
      ox.globalAlpha = 0.5 * rev * INKA;
      ox.beginPath();
      for (const cx of [bx, bx + bw]) for (const cy of [by, by + bh]) { ox.moveTo(cx - 5, cy); ox.lineTo(cx + 5, cy); ox.moveTo(cx, cy - 5); ox.lineTo(cx, cy + 5); }
      ox.stroke();
    }
    if (capOn) {
      ox.font = capFont;
      ox.fillStyle = ink;
      ox.globalAlpha = 0.85 * rev * INKA;
      spaced(capTxt, capX, by + 2, capSp, 'center');
      ox.fillStyle = acc;
      ox.globalAlpha = rev;
      ox.fillRect(capX - capW / 2 - 8, by - 1.5, 3, 3);
      ox.fillRect(capX + capW / 2 + 5, by - 1.5, 3, 3);
    }
    if (F.hud !== false) {
      ox.font = hudFont;
      ox.fillStyle = ink;
      ox.globalAlpha = 0.6 * rev * INKA;
      spaced(hudL, bx + 28, by + bh, hudSp, 'left');
      spaced(hudR, bx + bw - 28, by + bh, hudSp, 'right');
    }

    // agent log
    if ((lay.logWide || lay.logCompact) && logArr.length) {
      const wide = lay.logWide;
      const n = wide ? clamp(Math.round(num(F.logLines, 8)), 3, 16) : 3;
      const lh = wide ? 16 : 14, fs = wide ? 10 : 9.5;
      const lx = bx + 16, lw = wide ? lay.logW - 22 : bw - 32;
      const ly1 = by + bh - (F.hud !== false ? 22 : 16);
      ox.font = '500 ' + fs + 'px ' + mono;
      ox.textAlign = 'left';
      const shown = Math.min(n, logArr.length);
      if (wide) {
        const hy = ly1 - n * lh - 6;
        ox.font = '600 9.5px ' + mono;
        ox.fillStyle = ink;
        ox.globalAlpha = 0.55 * rev * INKA;
        spaced('NHẬT KÝ AGENT', lx, hy, 1.6, 'left');
        ox.fillStyle = acc;
        ox.globalAlpha = rev * (0.45 + 0.55 * (fract(T * 0.8) < 0.5 ? 1 : 0.25));
        ox.beginPath(); ox.arc(lx + lw - 3, hy, 2.6, 0, TAU); ox.fill();
        ox.fillStyle = ink;
        ox.globalAlpha = 0.45 * rev * INKA;
        spaced('TRỰC TIẾP', lx + lw - 11, hy, 1.4, 'right');
        ox.strokeStyle = ink;
        ox.globalAlpha = 0.2 * rev * INKA;
        ox.beginPath(); ox.moveTo(lx, hy + 8.5); ox.lineTo(lx + lw, hy + 8.5); ox.stroke();
        ox.font = '500 ' + fs + 'px ' + mono;
      }
      for (let idx = 0; idx < shown; idx++) {
        const e = logArr[logArr.length - 1 - idx];
        const y = ly1 - idx * lh;
        const fade = (1 - idx / (n + 1)) * rev;
        let chars = idx === 0 ? Math.floor((T - e.t) * 90) : 1e9;
        let x = lx;
        const gapW = textW(' ') * 1.6;
        for (let si = 0; si < e.segs.length && chars > 0; si++) {
          const sg = e.segs[si];
          if (sg[1] === 'ink2' && !wide) continue;
          let t = sg[0];
          if (chars < t.length) t = t.slice(0, chars);
          chars -= sg[0].length + 2;
          let tw = textW(t);
          const room = lx + lw - x;
          if (tw > room) {
            while (t.length > 1 && textW(t + '…') > room) t = t.slice(0, -1);
            t += '…';
            tw = textW(t);
            chars = 0;
          }
          const k = sg[1];
          ox.fillStyle = k === 'acc' ? acc : ink;
          ox.globalAlpha = fade * (k === 'dim' ? 0.42 : k === 'ink2' ? 0.62 : k === 'acc' ? 1 : 0.85) * (k === 'acc' ? 1 : INKA);
          ox.fillText(t, x, y);
          x += tw + gapW;
          if (x > lx + lw) break;
        }
        if (idx === 0 && fract(T * 1.2) < 0.55) {
          ox.fillStyle = acc;
          ox.globalAlpha = fade;
          ox.fillRect(Math.min(x - gapW + 2, lx + lw), y - fs * 0.45, fs * 0.55, fs * 0.9);
        }
      }
    }

    // vignette + grain
    const vig = clamp(num(C.vignette, 0.45), 0, 1);
    if (vig > 0.001) {
      const cx = inset.l + (fx1 - inset.l) / 2, cy = (fy0 + h - inset.b) / 2;
      const R = Math.hypot(w, h) * 0.6;
      const g = ox.createRadialGradient(cx, cy, R * 0.35, cx, cy, R);
      const dark = lumHex(C.bg) < 0.35;
      const rgb = dark ? '0,0,0' : rgbStr(C.bg);
      g.addColorStop(0, 'rgba(' + rgb + ',0)');
      g.addColorStop(1, 'rgba(' + rgb + ',' + (vig * (dark ? 0.75 : 0.9)) + ')');
      ox.globalAlpha = 1;
      ox.fillStyle = g;
      ox.fillRect(0, 0, w, h);
    }
    const grain = clamp(num(C.grain, 0.04), 0, 0.5);
    if (grain > 0.001) {
      if (!noisePat) noisePat = ox.createPattern(noise, 'repeat');
      ox.globalAlpha = grain * 2.2;
      ox.fillStyle = noisePat;
      ox.fillRect(0, 0, w, h);
    }
    ox.globalAlpha = 1;
  }
  function lumHex(hex) {
    const n = parseInt(String(hex || '#000').replace('#', '').slice(0, 6), 16) || 0;
    const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }

  /* ---------------- loop ---------------- */
  function colorSig() {
    const C = cfg.color || {}, K = cfg.core || {}, S = cfg.scene || {};
    return [C.bg, C.ink, C.accent, C.inkAlpha, K.lineWidth, S.floorAlpha].join('|');
  }
  function texSig() { const C = cfg.color || {}, F = cfg.frame || {}; return [C.font, F.motto, cfg.seed].join('|'); }

  function step(dt) {
    if (needsBuild) build();
    const ts = texSig();
    if (ts !== tSig) { tSig = ts; salt = hashStr(cfg.seed || 'LEX'); assignRoles(); masks.forEach(redrawMask); }
    const cs = colorSig();
    if (cs !== cSig) { cSig = cs; paintAll(); }
    const sdt = paused ? 0 : dt * clamp(num((cfg.scene || {}).speed, 1), 0, 5);
    T += sdt;
    revealT += dt;
    updateCamera(dt, sdt);
    updateScene(dt, sdt);
    renderer.render(scene, camera);
    drawOverlay();
  }
  let raf = 0, last = performance.now();
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.1, Math.max(0, (now - last) / 1000));
    last = now;
    step(dt);
  }

  function resize() {
    VW = container.clientWidth || 1;
    VH = container.clientHeight || 1;
    renderer.setSize(VW, VH, false);
    ov.width = Math.round(VW * DPR);
    ov.height = Math.round(VH * DPR);
    noisePat = null;
    LMS.forEach((e) => e.m.resolution.set(VW, VH));
  }
  const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
  if (ro) ro.observe(container); else window.addEventListener('resize', resize);

  /* ---------------- pointer ---------------- */
  const onMove = (e) => {
    const w = window.innerWidth || 1, h = window.innerHeight || 1;
    tgtX = (e.clientX / w) * 2 - 1;
    tgtY = (e.clientY / h) * 2 - 1;
    if (dragging) {
      const now = performance.now();
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      const da = -dx * 0.006;
      dragAng += da;
      dragVel = lerp(dragVel, da / (Math.max(8, now - lastPT) / 1000), 0.6);
      dragEl = clamp(dragEl + dy * 0.003, -0.4, 0.9);
      lastX = e.clientX; lastY = e.clientY; lastPT = now;
    }
  };
  const onDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging = true; dragVel = 0;
    lastX = e.clientX; lastY = e.clientY; lastPT = performance.now();
    try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
  };
  const onUp = () => { dragging = false; };
  const ptrTarget = opts.pointerTarget || window;
  ptrTarget.addEventListener('pointermove', onMove, { passive: true });
  if (opts.interactive !== false) {
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  }

  /* ---------------- config ---------------- */
  function setConfig(next, o) {
    cfg = JSON.parse(JSON.stringify(next || {}));
    salt = hashStr(cfg.seed || 'LEX');
    const sig = structSig(cfg);
    const want = !!(o && o.rebuild);
    if (sig !== sSig || want) { sSig = sig; needsBuild = true; revealOn = want || !built; }
  }

  if (document.fonts && document.fonts.load) {
    Promise.all([
      document.fonts.load('700 40px "Cormorant Garamond"'), document.fonts.load('600 20px "Be Vietnam Pro"'), document.fonts.load('500 12px "JetBrains Mono"'),
    ]).then(() => { wCache.clear(); masks.forEach(redrawMask); }).catch(() => {});
  }

  resize();
  setConfig(cfg, { rebuild: true });
  raf = requestAnimationFrame(frame);

  return {
    setConfig,
    getConfig: () => JSON.parse(JSON.stringify(cfg)),
    rebuild: () => { needsBuild = true; revealOn = true; },
    setPaused: (p) => { paused = !!p; },
    isPaused: () => paused,
    // stop drawing entirely (e.g. while the canvas is scrolled out of view)
    setRunning: (on) => {
      if (on && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
      else if (!on && raf) { cancelAnimationFrame(raf); raf = 0; }
    },
    // px of the canvas covered by UI; the shot is framed in what is left
    setInsets: (o) => {
      o = o || {};
      insetGoal.r = Math.max(0, num(o.right, 0));
      insetGoal.t = Math.max(0, num(o.top, 0));
      insetGoal.b = Math.max(0, num(o.bottom, 0));
    },
    snapshot: () => {
      const keep = Object.assign({}, insetGoal);
      Object.assign(insetGoal, { r: 0, t: 0, b: 0 });
      step(0);
      const out = document.createElement('canvas');
      out.width = canvas.width; out.height = canvas.height;
      const c = out.getContext('2d');
      c.drawImage(canvas, 0, 0);
      c.drawImage(ov, 0, 0, out.width, out.height);
      const url = out.toDataURL('image/png');
      Object.assign(insetGoal, keep);
      step(0);
      return url;
    },
    resetView: () => { dragAng = 0; dragVel = 0; dragEl = 0; },
    canvas,
    dispose: () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect(); else window.removeEventListener('resize', resize);
      ptrTarget.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      clearRoot();
      DOT.dispose(); HALO.dispose();
      renderer.dispose();
      canvas.remove();
      ov.remove();
    },
  };
}
