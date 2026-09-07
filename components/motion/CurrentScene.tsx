"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

/**
 * PARKED — not imported anywhere as of the 2026-09 quiet-luxury pivot.
 *
 * The full-bleed "riding the current" engine: a particle current, a
 * wave-morphing grid, caustics, bloom, and scroll-driven content waypoints
 * that the homepage was built around. It works; it's just the wrong
 * register. The site's direction is now restraint — a page that doesn't
 * perform — so this was retired from app/page.tsx rather than tuned down.
 * Kept, not deleted: the waypoint/scroll orchestration is sound and
 * reusable if a future page ever earns a moment this large.
 * See docs/kbc-build-plan.md, Phase 7.
 */

// Real KBC tokens (tailwind.config.ts is the source of truth — kept in sync
// here because GLSL/Three.js color uniforms can't reference CSS variables
// directly; HeroCrystal.tsx uses the same accepted pattern).
const MILK = "#FAF7F0";
const RIVER = "#0F2A2D";
const INK = "#23201B";
const BONE = "#EBE5D8";
const FLARE = "#FF0080";
const FLARE_DEEP = "#A8004F";
const FLARE_LIFT = "#FF7ABF";
const MOCHA = "#9A8264"; // imagery/atmosphere haze only, per CLAUDE.md — the caustics tint

function hexToRgb01(hex: string): [number, number, number] {
  const v = parseInt(hex.replace("#", ""), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}

const COL_MILK = hexToRgb01(MILK);
const COL_RIVER = hexToRgb01(RIVER);
const COL_INK = hexToRgb01(INK);
const COL_BONE = hexToRgb01(BONE);
const COL_FLARE = hexToRgb01(FLARE);
const COL_FLARE_DEEP = hexToRgb01(FLARE_DEEP);
const COL_FLARE_LIFT = hexToRgb01(FLARE_LIFT);
const COL_MOCHA = hexToRgb01(MOCHA);

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
function smoothstep(a: number, b: number, x: number) {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PARTICLE_VERT = `
  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float dist = -mvPosition.z;
    gl_PointSize = clamp(aSize * (9.0 / max(dist, 0.1)), 1.0, 14.0);
  }
`;
const PARTICLE_FRAG = `
  precision mediump float;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 p = gl_PointCoord - vec2(0.5);
    float d = length(p) * 2.0;
    float falloff = pow(smoothstep(1.0, 0.0, d), 1.6);
    gl_FragColor = vec4(vColor, falloff * vAlpha);
  }
`;
const GRID_VERT = `
  attribute float gAlpha;
  varying float vGAlpha;
  void main() {
    vGAlpha = gAlpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const GRID_FRAG = `
  precision mediump float;
  varying float vGAlpha;
  uniform vec3 uGColor;
  void main() { gl_FragColor = vec4(uGColor, vGAlpha); }
`;

// Caustics — the riverbed floor glow: the light-net pattern sunlight makes
// on a surface beneath moving water. Purely ambient, scroll-driven (not
// real-time autoplay), tinted mocha per its documented "atmosphere haze
// only" role — never the flare, so it never competes with the one
// magenta accent per view.
const CAUSTICS_VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const CAUSTICS_FRAG = `
  precision mediump float;
  varying vec2 vUv;
  uniform float uProg;
  uniform vec3 uColor;
  float causticNet(vec2 uv, float t) {
    float v = 0.0;
    v += sin(uv.x * 9.0 + t * 1.3);
    v += sin(uv.y * 7.0 - t * 1.1);
    v += sin((uv.x + uv.y) * 6.0 + t * 0.8);
    v += sin(length(uv - 0.5) * 11.0 - t * 1.6);
    v = v * 0.25 + 0.5;
    return pow(max(v, 0.0), 5.0);
  }
  void main() {
    float edgeFade = smoothstep(0.0, 0.22, vUv.y) * smoothstep(1.0, 0.72, vUv.y)
                    * smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
    float net = causticNet(vUv * 3.0, uProg * 6.0);
    float alpha = net * edgeFade * 0.16;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

type Particle = {
  x: number; y: number; z: number; baseSize: number;
  jx: number; jy: number; jz: number;
  clickDelay: number; clickSpeedMul: number;
};

/** A single gather moment's config, passed in by the page that mounts this. */
export type CurrentWaypointConfig = {
  progressAt: number; depthSpan: number;
  gx: number; gy: number; gz: number; settle: boolean;
  dark: boolean; // river-dark section — particles/grid invert to bone/flare-lift nearby
  content: React.ReactNode;
};

type WaypointRuntime = CurrentWaypointConfig & { el: HTMLElement | null };

/**
 * The current — the site's signature 3D motif. A reusable, mountable-more-
 * than-once sequence: pass the waypoints that belong to THIS stretch of the
 * page (e.g. one instance for Proof band → Positioning → Selected-work
 * teaser, a second instance later for Proof/Glowtoure → Closing CTA), with
 * real flat sections (the work grid, service pricing, etc.) rendered
 * normally in between by the page itself — not every section compresses
 * into a single gather moment, and dense content (pricing, case studies)
 * needs to stay real and functional, not abbreviated.
 */
export default function CurrentScene({
  waypoints,
  heightVh = 500,
}: {
  waypoints: CurrentWaypointConfig[];
  heightVh?: number;
}) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rideRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const wpElRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Reduced motion gets a completely different render path (see the return
  // below), not just a frozen frame of the 3D one — the depth blur/scale/
  // translateZ IS the parallax CLAUDE.md's accessibility rules rule out, and
  // freezing the sequence at its last waypoint would hide every earlier one,
  // including whichever waypoint carries the page's real h1. Checked before
  // paint so a reduced-motion visitor never sees the 3D version flash first.
  const [reducedMotion, setReducedMotion] = useState(false);
  // WebGL can fail for real reasons — blocked by privacy settings, unsupported
  // on an old device, killed by the browser under memory pressure. This page
  // carries the real h1 and primary CTAs now, so a WebGL failure can't be
  // allowed to take them down with it; it falls back to the same static,
  // fully-content-visible render path reduced motion uses.
  const [webglFailed, setWebglFailed] = useState(false);
  useLayoutEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    const ride = rideRef.current;
    if (!mount || !ride) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    // ---- Renderer / camera ----
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      if (!renderer.getContext()) throw new Error("WebGL context unavailable");
    } catch {
      setWebglFailed(true);
      return;
    }
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const BOUNDS = { x: 5.5, y: 3.2, zNear: 1, zFar: 9 };
    const CAMERA_Z = BOUNDS.zFar + 1;
    const FOV_DEG = (Math.PI / 3.4) * (180 / Math.PI);

    const camera = new THREE.PerspectiveCamera(FOV_DEG, 1, 0.1, 20);
    camera.position.set(0, 0, CAMERA_Z);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    // Bloom is what turns "cluster of bright dots" into "energy glow" — soft
    // light bleed where flare-colored particles overlap. Threshold sits well
    // above ink's luminance so ambient dust stays crisp/non-glowing and only
    // the energized (gathering/click) particles ever bloom.
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.55, 0.45, 0.55);
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    function fit() {
      const rect = mount!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(rect.width, rect.height, true);
      composer.setPixelRatio(dpr);
      composer.setSize(rect.width, rect.height);
      camera.aspect = rect.width / Math.max(1, rect.height);
      camera.updateProjectionMatrix();
    }
    fit();
    window.addEventListener("resize", fit);

    // ---- Particle field ----
    const N = 950;
    const rnd = mulberry32(20260830);
    const particles: Particle[] = [];

    function spawn(p: Particle) {
      p.x = (rnd() - 0.5) * BOUNDS.x * 2;
      p.y = (rnd() - 0.5) * BOUNDS.y * 2;
      p.z = BOUNDS.zNear + rnd() * (BOUNDS.zFar - BOUNDS.zNear);
      p.baseSize = 1.8 + rnd() * 3.0;
      const jTheta = rnd() * Math.PI * 2;
      const jCosPhi = rnd() * 2 - 1;
      const jSinPhi = Math.sqrt(Math.max(0, 1 - jCosPhi * jCosPhi));
      const jR = 0.3 * Math.cbrt(rnd());
      p.jx = jR * jSinPhi * Math.cos(jTheta);
      p.jy = jR * jSinPhi * Math.sin(jTheta);
      p.jz = jR * jCosPhi;
      p.clickDelay = rnd();
      p.clickSpeedMul = 0.5 + rnd() * 0.9;
    }
    for (let i = 0; i < N; i++) {
      const p = {} as Particle;
      spawn(p);
      particles.push(p);
    }

    const posArr = new Float32Array(N * 3);
    const colorArr = new Float32Array(N * 3);
    const sizeArr = new Float32Array(N);
    const alphaArr = new Float32Array(N);

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
    particleGeom.setAttribute("aColor", new THREE.BufferAttribute(colorArr, 3));
    particleGeom.setAttribute("aSize", new THREE.BufferAttribute(sizeArr, 1));
    particleGeom.setAttribute("aAlpha", new THREE.BufferAttribute(alphaArr, 1));
    const particleMat = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const points = new THREE.Points(particleGeom, particleMat);
    scene.add(points);

    // ---- Wave grid ----
    const GRID = {
      halfWidth: 6.2, y: -1.4, z0: 1, z1: 7.0, spacing: 0.75, flowSpeed: 6.0, rails: 7,
      segX: 12, segZ: 14,
      waveAmpA: 0.62, waveAmpB: 0.34,
    };
    const gridCrossCount = Math.ceil((GRID.z1 - GRID.z0) / GRID.spacing) + 2;
    const gridVertCount = gridCrossCount * GRID.segX * 2 + GRID.rails * GRID.segZ * 2;
    const gridPosArr = new Float32Array(gridVertCount * 3);
    const gridAlphaArr = new Float32Array(gridVertCount);

    const gridGeom = new THREE.BufferGeometry();
    gridGeom.setAttribute("position", new THREE.BufferAttribute(gridPosArr, 3));
    gridGeom.setAttribute("gAlpha", new THREE.BufferAttribute(gridAlphaArr, 1));
    const gridMat = new THREE.ShaderMaterial({
      vertexShader: GRID_VERT,
      fragmentShader: GRID_FRAG,
      uniforms: { uGColor: { value: new THREE.Vector3(...COL_INK) } },
      transparent: true,
      depthWrite: false,
    });
    const gridLines = new THREE.LineSegments(gridGeom, gridMat);
    scene.add(gridLines);

    // ---- Caustics: the riverbed floor glow, lying flat just under the grid ----
    const causticsGeom = new THREE.PlaneGeometry(GRID.halfWidth * 2, GRID.z1 - GRID.z0, 1, 1);
    causticsGeom.rotateX(-Math.PI / 2);
    const causticsMat = new THREE.ShaderMaterial({
      vertexShader: CAUSTICS_VERT,
      fragmentShader: CAUSTICS_FRAG,
      uniforms: {
        uProg: { value: 0 },
        uColor: { value: new THREE.Vector3(...COL_MOCHA) },
      },
      transparent: true,
      depthWrite: false,
    });
    const causticsMesh = new THREE.Mesh(causticsGeom, causticsMat);
    causticsMesh.position.set(0, GRID.y - 0.08, GRID.z0 + (GRID.z1 - GRID.z0) / 2);
    scene.add(causticsMesh);

    type Ripple = { x: number; z: number; t0: number };
    let ripples: Ripple[] = [];
    const RIPPLE_LIFE = 1.8, RIPPLE_SPAWN_GAP = 0.11;
    let lastRippleSpawnT = -10;

    function waveY(x: number, z: number, prog: number) {
      const a = GRID.waveAmpA * Math.sin(x * 0.3 + z * 0.23 + prog * 1.5);
      const b = GRID.waveAmpB * Math.sin(x * 0.52 - z * 0.37 + prog * 2.0);
      return a + b;
    }
    function rippleY(x: number, z: number, t: number) {
      let sum = 0;
      for (const r of ripples) {
        const age = t - r.t0;
        if (age < 0 || age > RIPPLE_LIFE) continue;
        const d = Math.hypot(x - r.x, z - r.z);
        sum += Math.sin(d * 5.0 - age * 7.5) * Math.exp(-age * 2.0) * Math.exp(-d * 0.4) * 0.5;
      }
      return sum;
    }
    function buildGrid(prog: number, t: number) {
      const span = GRID.z1 - GRID.z0;
      let vi = 0;
      for (let i = 0; i < gridCrossCount; i++) {
        let raw = (i * GRID.spacing - prog * GRID.flowSpeed) % span;
        if (raw < 0) raw += span;
        const z = GRID.z0 + raw;
        const depthT = raw / span;
        const a = 0.4 * smoothstep(0, 0.08, depthT) * (0.4 + 0.6 * depthT);
        for (let s = 0; s < GRID.segX; s++) {
          const x0 = -GRID.halfWidth + (s / GRID.segX) * GRID.halfWidth * 2;
          const x1 = -GRID.halfWidth + ((s + 1) / GRID.segX) * GRID.halfWidth * 2;
          const y0 = GRID.y + waveY(x0, z, prog) + rippleY(x0, z, t);
          const y1 = GRID.y + waveY(x1, z, prog) + rippleY(x1, z, t);
          gridPosArr[vi * 3] = x0; gridPosArr[vi * 3 + 1] = y0; gridPosArr[vi * 3 + 2] = z; gridAlphaArr[vi] = a; vi++;
          gridPosArr[vi * 3] = x1; gridPosArr[vi * 3 + 1] = y1; gridPosArr[vi * 3 + 2] = z; gridAlphaArr[vi] = a; vi++;
        }
      }
      for (let r = 0; r < GRID.rails; r++) {
        const x = -GRID.halfWidth + (r / (GRID.rails - 1)) * GRID.halfWidth * 2;
        for (let tI = 0; tI < GRID.segZ; tI++) {
          const z0v = GRID.z0 + (tI / GRID.segZ) * span;
          const z1v = GRID.z0 + ((tI + 1) / GRID.segZ) * span;
          const depthT0 = (z0v - GRID.z0) / span;
          const depthT1 = (z1v - GRID.z0) / span;
          const a0 = 0.08 + 0.3 * depthT0;
          const a1 = 0.08 + 0.3 * depthT1;
          const y0 = GRID.y + waveY(x, z0v, prog) + rippleY(x, z0v, t);
          const y1 = GRID.y + waveY(x, z1v, prog) + rippleY(x, z1v, t);
          gridPosArr[vi * 3] = x; gridPosArr[vi * 3 + 1] = y0; gridPosArr[vi * 3 + 2] = z0v; gridAlphaArr[vi] = a0; vi++;
          gridPosArr[vi * 3] = x; gridPosArr[vi * 3 + 1] = y1; gridPosArr[vi * 3 + 2] = z1v; gridAlphaArr[vi] = a1; vi++;
        }
      }
      gridGeom.attributes.position.needsUpdate = true;
      gridGeom.attributes.gAlpha.needsUpdate = true;
    }

    // ---- Waypoints — supplied by the page, this instance just runs them ----
    const WAYPOINTS: WaypointRuntime[] = waypoints.map((wp, i) => ({
      ...wp,
      el: wpElRefs.current[i] ?? null,
    }));

    // ---- Cursor: ripples + click-attract, same math as the validated prototype ----
    const REF_Z = 4.5;
    const mouse = { ndcX: 0, ndcY: 0, worldX: 0, worldY: 0, lastMoveT: -10 };
    let clickPulse: { x: number; y: number; z: number; t0: number } | null = null;
    // Slower and more patient than the first pass: a longer stagger window
    // and a lower base rate so the gather reads as unhurried, not a snap.
    const CLICK_LIFE = 3.2, CLICK_DELAY_WINDOW = 1.3, CLICK_BASE_RATE = 0.032;

    function updateMouseWorld() {
      const halfFovY = (Math.PI / 3.4) / 2;
      const dist = CAMERA_Z - REF_Z;
      const rect = mount!.getBoundingClientRect();
      mouse.worldX = mouse.ndcX * dist * Math.tan(halfFovY) * (rect.width / Math.max(1, rect.height));
      mouse.worldY = mouse.ndcY * dist * Math.tan(halfFovY);
    }
    function onPointerMove(e: PointerEvent) {
      const rect = mount!.getBoundingClientRect();
      mouse.ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      updateMouseWorld();
      mouse.lastMoveT = performance.now() / 1000;
    }
    function onPointerDown(e: PointerEvent) {
      onPointerMove(e);
      clickPulse = { x: mouse.worldX, y: mouse.worldY, z: REF_Z, t0: performance.now() / 1000 };
    }
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerdown", onPointerDown);

    // ---- Scroll: ScrollTrigger drives raw progress; a manual ease drives the
    // "glide" feel for ambient flow; gather/waypoint timing stays on raw
    // progress so it reliably hits full strength as you scroll through. ----
    let rawProgress = 0;
    let smoothProgress = 0;
    let lastRawProgress = 0;

    const st = ScrollTrigger.create({
      trigger: ride,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        rawProgress = self.progress;
      },
    });

    function render() {
      const hint = hintRef.current;
      if (hint) hint.style.opacity = rawProgress < 0.02 ? "1" : "0";

      const prevSmooth = smoothProgress;
      smoothProgress += (rawProgress - smoothProgress) * (reduce ? 1 : 0.1);
      const deltaProgress = smoothProgress - prevSmooth;
      const flowAdvance = deltaProgress * 22.0;

      const scrollDelta = Math.abs(rawProgress - lastRawProgress);
      lastRawProgress = rawProgress;
      const t = performance.now() / 1000;
      const scrollIdle = scrollDelta < 0.0004;
      const cursorRecentlyMoved = t - mouse.lastMoveT < 0.25;
      if (!reduce && scrollIdle && cursorRecentlyMoved && t - lastRippleSpawnT > RIPPLE_SPAWN_GAP) {
        const screenYFrac = clamp((mouse.ndcY + 1) / 2, 0, 1);
        const rippleZ = lerp(GRID.z1, GRID.z0, clamp(screenYFrac / 0.5, 0, 1));
        const rippleX = clamp(mouse.ndcX * GRID.halfWidth, -GRID.halfWidth, GRID.halfWidth);
        ripples.push({ x: rippleX, z: rippleZ, t0: t });
        if (ripples.length > 10) ripples.shift();
        lastRippleSpawnT = t;
      }
      if (ripples.length) ripples = ripples.filter((r) => t - r.t0 < RIPPLE_LIFE);

      const clickActive = !!clickPulse && t - clickPulse.t0 < CLICK_LIFE;
      if (clickPulse && !clickActive) clickPulse = null;

      // How much of the scene is currently inside a river-dark waypoint's
      // window — mirrors the site's own light/dark inversion pair (ink→bone,
      // flare-deep→flare-lift) so particles and the grid don't go dark-on-dark.
      let darkMix = 0;
      for (const wp of WAYPOINTS) {
        if (!wp.dark) continue;
        const localP = rawProgress - wp.progressAt;
        const half = wp.depthSpan / 2;
        const arcApproach = 1 - smoothstep(0, half * 2.2, Math.abs(localP));
        // A settling dark waypoint (the closing CTA) hands off straight into
        // the real dark footer — stay dark through to the end of the ride
        // rather than fading back to milk right before it.
        const arc = wp.settle ? (localP <= 0 ? arcApproach : 1) : arcApproach;
        darkMix = Math.max(darkMix, arc);
      }
      const ambientCol: [number, number, number] = [
        lerp(COL_INK[0], COL_BONE[0], darkMix),
        lerp(COL_INK[1], COL_BONE[1], darkMix),
        lerp(COL_INK[2], COL_BONE[2], darkMix),
      ];
      const deepFlareCol: [number, number, number] = [
        lerp(COL_FLARE_DEEP[0], COL_FLARE_LIFT[0], darkMix),
        lerp(COL_FLARE_DEEP[1], COL_FLARE_LIFT[1], darkMix),
        lerp(COL_FLARE_DEEP[2], COL_FLARE_LIFT[2], darkMix),
      ];
      (gridMat.uniforms.uGColor.value as THREE.Vector3).set(ambientCol[0], ambientCol[1], ambientCol[2]);

      // The section itself goes dark here, same as SectionShell's real
      // `tone="dark"` — not just a floating chip — so the bone-tinted dust
      // above still reads against something dark, not the milk page.
      if (stageRef.current) {
        const bg: [number, number, number] = [
          lerp(COL_MILK[0], COL_RIVER[0], darkMix),
          lerp(COL_MILK[1], COL_RIVER[1], darkMix),
          lerp(COL_MILK[2], COL_RIVER[2], darkMix),
        ];
        stageRef.current.style.backgroundColor = `rgb(${Math.round(bg[0] * 255)}, ${Math.round(bg[1] * 255)}, ${Math.round(bg[2] * 255)})`;
      }

      for (let i = 0; i < N; i++) {
        const p = particles[i];
        p.x += Math.sin(p.z * 0.32 + smoothProgress * 1.6) * 0.0009;
        p.y += Math.cos(p.z * 0.27 + smoothProgress * 1.4) * 0.0007;
        p.z -= flowAdvance + 0.0004;

        let pull = 0, gx = 0, gy = 0, gz = 0, energized = 0, pullRate = 0.09;
        for (const wp of WAYPOINTS) {
          const localP = rawProgress - wp.progressAt;
          const half = wp.depthSpan / 2;
          if (Math.abs(localP) > half * 2.2) continue;
          const dx = p.x - wp.gx, dy = p.y - wp.gy, dz = p.z - wp.gz;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const proximity = smoothstep(2.8, 0.3, d);
          const arc = 1 - smoothstep(0, half * 2.2, Math.abs(localP));
          const strength = arc * proximity;
          if (strength > pull) { pull = strength; gx = wp.gx; gy = wp.gy; gz = wp.gz; pullRate = 0.09; }
          energized = Math.max(energized, arc * proximity);
        }

        if (clickActive && clickPulse) {
          const age = t - clickPulse.t0;
          const localAge = age - p.clickDelay * CLICK_DELAY_WINDOW;
          if (localAge > 0) {
            const dcx = p.x - clickPulse.x, dcy = p.y - clickPulse.y, dcz = p.z - clickPulse.z;
            const dc = Math.sqrt(dcx * dcx + dcy * dcy + dcz * dcz);
            // Narrower catchment than a waypoint gather — a small, considered
            // cluster of light, not a wide net sweeping in a crowd.
            const proxC = smoothstep(2.1, 0.3, dc);
            const lifeLeft = Math.max(0.1, CLICK_LIFE - p.clickDelay * CLICK_DELAY_WINDOW);
            const arcC = 1 - smoothstep(0, lifeLeft, localAge);
            const strengthC = proxC * arcC;
            if (strengthC > pull) { pull = strengthC; gx = clickPulse.x; gy = clickPulse.y; gz = clickPulse.z; pullRate = CLICK_BASE_RATE * p.clickSpeedMul; }
            energized = Math.max(energized, Math.min(1, proxC * arcC * 1.4));
          }
        }

        if (pull > 0.001) {
          p.x = lerp(p.x, gx + p.jx, pull * pullRate);
          p.y = lerp(p.y, gy + p.jy, pull * pullRate);
          p.z = lerp(p.z, gz + p.jz, pull * pullRate);
        }

        if (p.z < BOUNDS.zNear || p.x < -BOUNDS.x || p.x > BOUNDS.x || p.y < -BOUNDS.y || p.y > BOUNDS.y) {
          spawn(p);
          p.z = BOUNDS.zFar;
        }

        const base = i * 3;
        posArr[base] = p.x; posArr[base + 1] = p.y; posArr[base + 2] = p.z;
        const target = energized > 0.6 ? COL_FLARE : deepFlareCol;
        const col = energized > 0.05
          ? [lerp(ambientCol[0], target[0], energized), lerp(ambientCol[1], target[1], energized), lerp(ambientCol[2], target[2], energized)]
          : ambientCol;
        colorArr[base] = col[0]; colorArr[base + 1] = col[1]; colorArr[base + 2] = col[2];
        sizeArr[i] = p.baseSize * (1 + energized * 0.9);
        const depthFade = smoothstep(BOUNDS.zFar, BOUNDS.zFar - 1.5, p.z) * smoothstep(BOUNDS.zNear, BOUNDS.zNear + 0.6, p.z);
        alphaArr[i] = (0.35 + energized * 0.5) * clamp(depthFade, 0.15, 1);
      }
      particleGeom.attributes.position.needsUpdate = true;
      (particleGeom.attributes.aColor as THREE.BufferAttribute).needsUpdate = true;
      (particleGeom.attributes.aSize as THREE.BufferAttribute).needsUpdate = true;
      (particleGeom.attributes.aAlpha as THREE.BufferAttribute).needsUpdate = true;

      buildGrid(smoothProgress, t);
      (causticsMat.uniforms.uProg as { value: number }).value = smoothProgress;

      for (const wp of WAYPOINTS) {
        if (!wp.el) continue;
        const localP2 = rawProgress - wp.progressAt;
        const half2 = wp.depthSpan / 2;
        const arcApproach = 1 - smoothstep(half2 * 0.15, half2 * 2.0, Math.abs(localP2));
        // Settle means STAY arrived — full scale, zero blur, full opacity —
        // not just a pinned depth while everything else quietly fades again.
        const arcT = wp.settle ? (localP2 <= 0 ? arcApproach : 1) : arcApproach;
        const depthPx = wp.settle
          ? lerp(-420, 0, smoothstep(-half2 * 1.8, 0, localP2))
          : lerp(420, -420, smoothstep(-half2 * 1.8, half2 * 1.8, localP2));
        const scale = lerp(0.72, 1.0, smoothstep(0.3, 1, arcT));
        const blurPx = lerp(14, 0, smoothstep(0.4, 1, arcT));
        const op = smoothstep(0, 0.35, arcT);
        wp.el.style.transform = `translate(-50%,-50%) translateZ(${(-depthPx).toFixed(1)}px) scale(${scale.toFixed(3)})`;
        wp.el.style.left = "50%";
        wp.el.style.filter = `blur(${blurPx.toFixed(2)}px)`;
        wp.el.style.opacity = String(clamp(op, 0, 1));
      }
    }

    let raf = 0;
    function frame() {
      render();
      composer.render();
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    if (reduce) {
      rawProgress = 1;
      smoothProgress = 1;
      render();
      composer.render();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerdown", onPointerDown);
      st.kill();
      particleGeom.dispose();
      particleMat.dispose();
      gridGeom.dispose();
      gridMat.dispose();
      causticsGeom.dispose();
      causticsMat.dispose();
      bloomPass.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reduced motion: every waypoint's real content, all at once, in normal
  // document flow — no absolute overlap, no 3D transform, nothing to freeze
  // mid-animation. This is the ONLY render path a reduced-motion visitor
  // ever sees (decided before first paint), so the page's real heading and
  // real CTAs are never at risk of landing on a waypoint that a frozen
  // scroll-position would have hidden.
  if (reducedMotion || webglFailed) {
    return (
      <div className="flex flex-col">
        {waypoints.map((wp, i) => (
          <div
            key={i}
            className={`flex flex-col items-center px-6 py-20 text-center ${wp.dark ? "bg-river" : ""}`}
          >
            {wp.content}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={rideRef} className="relative" style={{ height: `${heightVh}vh` }}>
      <div ref={stageRef} className="sticky top-0 h-[100svh] overflow-hidden" style={{ perspective: "900px", perspectiveOrigin: "50% 50%" }}>
        <div ref={mountRef} className="absolute inset-0" />

        {waypoints.map((wp, i) => (
          <div
            key={i}
            ref={(el) => {
              wpElRefs.current[i] = el;
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {wp.content}
          </div>
        ))}

        <div ref={hintRef} className="type-meta pointer-events-none absolute bottom-[4%] left-0 right-0 text-center text-ink/45 transition-opacity duration-500">
          Scroll ↓
        </div>
      </div>
    </div>
  );
}
