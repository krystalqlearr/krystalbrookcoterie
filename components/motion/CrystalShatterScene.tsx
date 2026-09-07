"use client";

/* eslint-disable @typescript-eslint/no-unused-vars -- PARKED reference file
   (imported by nothing): its palette constants document the retired material and
   the magenta-era stops, and are kept on purpose even where unused. Without this,
   `next build` lints them as errors and a clean-clone (Vercel) build fails. */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/**
 * PARKED — not imported anywhere as of the 2026-09 quiet-luxury pivot.
 *
 * A rotating refractive crystal that shattered into an underwater current
 * on scroll. It worked, but a shattering crystal reads as effort, and the
 * site's direction is now restraint — so this was retired before it ever
 * shipped, along with CurrentScene.tsx. Kept, not deleted: the glass
 * material and hex-bipyramid geometry here are the validated seed for the
 * future per-client crystal generator, and components/motion/CrystalMark.tsx
 * already reuses them at icon scale. See docs/kbc-build-plan.md, Phase 7.
 */

const MILK = "#FAF7F0";
const INK = "#23201B";
const FLARE = "#FF0080";
const FLARE_DEEP = "#A8004F";
const MOCHA = "#9A8264";

function hexToRgb01(hex: string): [number, number, number] {
  const v = parseInt(hex.replace("#", ""), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
}
const COL_INK = hexToRgb01(INK);
const COL_FLARE = hexToRgb01(FLARE);
const COL_FLARE_DEEP = hexToRgb01(FLARE_DEEP);
const COL_MOCHA = hexToRgb01(MOCHA);

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }
function smoothstep(a: number, b: number, x: number) {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}
function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---- Ordered hexagonal-bipyramid crystal — same construction as
// HeroCrystal.tsx, ported to a Three.js BufferGeometry. Ordered/symmetric
// geometry, not random stellation, per the validated standard. ----
type Vec3 = [number, number, number];
type Face = [Vec3, Vec3, Vec3];
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
const vlen = (a: Vec3) => Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]) || 1e-6;
const norm = (a: Vec3): Vec3 => { const l = vlen(a); return [a[0]/l, a[1]/l, a[2]/l]; };
const faceNormal = (f: Face) => norm(cross(sub(f[1], f[0]), sub(f[2], f[0])));

function buildHexCrystal(seed: number): Face[] {
  const rnd = mulberry32(seed);
  const R = 1.0;
  const beltHalf = 0.62, capHeight = 0.98;
  const topY = beltHalf, botY = -beltHalf;
  const apexTop: Vec3 = [0, topY + capHeight, 0];
  const apexBot: Vec3 = [0, botY - capHeight, 0];
  const topRing: Vec3[] = [], botRing: Vec3[] = [];
  for (let k = 0; k < 6; k++) {
    const a = (k * Math.PI) / 3 + Math.PI / 6;
    const jr = R * (1 + (rnd() - 0.5) * 0.05);
    const ja = a + (rnd() - 0.5) * 0.02;
    topRing.push([Math.cos(ja) * jr, topY, Math.sin(ja) * jr]);
    botRing.push([Math.cos(ja) * jr, botY, Math.sin(ja) * jr]);
  }
  const faces: Face[] = [];
  for (let i = 0; i < 6; i++) {
    const j = (i + 1) % 6;
    faces.push([botRing[i], botRing[j], topRing[j]]);
    faces.push([botRing[i], topRing[j], topRing[i]]);
  }
  for (let i = 0; i < 6; i++) { const j = (i + 1) % 6; faces.push([topRing[i], topRing[j], apexTop]); }
  for (let i = 0; i < 6; i++) { const j = (i + 1) % 6; faces.push([botRing[j], botRing[i], apexBot]); }
  return faces;
}

const CRYSTAL_VERT = `
  attribute vec3 aNormal;
  attribute float aFaceSeed;
  attribute vec3 aCentroid;
  attribute vec3 aExplodeDir;
  attribute vec3 aSpin;
  attribute float aSpeedMul;
  uniform float uShatter;
  uniform mat4 uModel;
  uniform mat3 uNormalMatrix;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vAlpha;
  void main() {
    float onset = aFaceSeed * 0.35;
    float localT = clamp((uShatter - onset) / max(0.001, 1.0 - onset), 0.0, 1.0);

    // Each face tumbles around its own centroid as it flies — a real
    // shattering fragment spins, it doesn't just slide outward flat.
    vec3 local = position - aCentroid;
    float angle = localT * (2.2 + length(aSpin) * 4.0);
    vec3 axis = normalize(aSpin + vec3(0.0001));
    float s = sin(angle), c = cos(angle);
    vec3 rotatedLocal = local * c + cross(axis, local) * s + axis * dot(axis, local) * (1.0 - c);
    vec3 rotatedNormal = aNormal * c + cross(axis, aNormal) * s + axis * dot(axis, aNormal) * (1.0 - c);

    // Chaotic scatter direction (face normal + per-face jitter, precomputed
    // on the CPU) with per-face speed variance — a real explosion, not a
    // tidy radial bloom where every shard travels at the same rate.
    float travel = localT * (3.6 * aSpeedMul);
    vec3 pos = aCentroid + rotatedLocal + aExplodeDir * travel;
    pos.y -= localT * localT * 2.8;

    float shardGate = smoothstep(0.0, 0.05, uShatter);
    vAlpha = shardGate * (1.0 - smoothstep(0.55, 1.0, localT));
    vNormal = normalize(uNormalMatrix * rotatedNormal);
    vec4 world = uModel * vec4(pos, 1.0);
    vWorldPos = world.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;
const CRYSTAL_FRAG = `
  precision mediump float;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vAlpha;
  uniform vec3 uMagentaDir;
  uniform vec3 uCameraPos;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 viewDir = normalize(uCameraPos - vWorldPos);
    vec3 magDir = normalize(uMagentaDir);
    vec3 halfVec = normalize(magDir + viewDir);
    float magDiff = max(dot(n, magDir), 0.0);
    float spec = pow(max(dot(n, halfVec), 0.0), 70.0);
    float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 6.0);
    float key = max(dot(n, normalize(vec3(0.35, 0.82, 0.45))), 0.0);
    vec3 stone = vec3(0.878, 0.847, 0.780);
    vec3 bone = vec3(0.925, 0.898, 0.847);
    vec3 body = mix(stone, bone, key * 0.92 + 0.08);
    vec3 ink = vec3(0.137, 0.125, 0.106);
    vec3 withEdge = mix(body, ink, fresnel * 0.4);
    float glintStrength = clamp(spec * 0.85 + pow(magDiff, 28.0) * 0.3, 0.0, 1.0);
    vec3 glintColor = vec3(1.0, 0.25, 0.6);
    vec3 withGlint = mix(withEdge, glintColor, glintStrength);
    gl_FragColor = vec4(withGlint, vAlpha);
  }
`;

const PARTICLE_VERT = `
  attribute float aSize; attribute float aAlpha; attribute vec3 aColor;
  varying vec3 vColor; varying float vAlpha;
  void main() {
    vColor = aColor; vAlpha = aAlpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    float dist = -mvPosition.z;
    gl_PointSize = clamp(aSize * (9.0 / max(dist, 0.1)), 1.0, 16.0);
  }
`;
const PARTICLE_FRAG = `
  precision mediump float;
  varying vec3 vColor; varying float vAlpha;
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
  uniform float uReveal;
  void main() { gl_FragColor = vec4(uGColor, vGAlpha * uReveal); }
`;
const CAUSTICS_VERT = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const CAUSTICS_FRAG = `
  precision mediump float;
  varying vec2 vUv;
  uniform float uProg;
  uniform vec3 uColor;
  uniform float uReveal;
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
    float alpha = net * edgeFade * 0.16 * uReveal;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

type Particle = { x: number; y: number; z: number; baseSize: number };

export default function CrystalShatterScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rideRef = useRef<HTMLDivElement | null>(null);
  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    const ride = rideRef.current;
    if (!mount || !ride) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      if (!renderer.getContext()) throw new Error("no context");
    } catch {
      setWebglFailed(true);
      return;
    }
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const scene = new THREE.Scene();

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.5, 0.45, 0.6);
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

    // ---- Crystal ----
    const faces = buildHexCrystal(20260901);
    const cVertCount = faces.length * 3;
    const cPos = new Float32Array(cVertCount * 3);
    const cNorm = new Float32Array(cVertCount * 3);
    const cSeed = new Float32Array(cVertCount);
    const cCentroid = new Float32Array(cVertCount * 3);
    const cExplodeDir = new Float32Array(cVertCount * 3);
    const cSpin = new Float32Array(cVertCount * 3);
    const cSpeedMul = new Float32Array(cVertCount);
    const rndSeed = mulberry32(777);
    for (let i = 0; i < faces.length; i++) {
      const f = faces[i];
      const n = faceNormal(f);
      const fs = rndSeed();
      const cx = (f[0][0] + f[1][0] + f[2][0]) / 3;
      const cy = (f[0][1] + f[1][1] + f[2][1]) / 3;
      const cz = (f[0][2] + f[1][2] + f[2][2]) / 3;
      // Chaotic scatter direction: face normal biased by a random jitter,
      // not a pure radial bloom — reads as a real explosion.
      let ex = n[0] + (rndSeed() - 0.5) * 1.8;
      let ey = n[1] + (rndSeed() - 0.5) * 1.8;
      let ez = n[2] + (rndSeed() - 0.5) * 1.8;
      const el = Math.sqrt(ex * ex + ey * ey + ez * ez) || 1e-6;
      ex /= el; ey /= el; ez /= el;
      let ax = rndSeed() - 0.5, ay = rndSeed() - 0.5, az = rndSeed() - 0.5;
      const al = Math.sqrt(ax * ax + ay * ay + az * az) || 1e-6;
      ax /= al; ay /= al; az /= al;
      const spinMag = 0.5 + rndSeed() * 1.1;
      const speedMul = 0.7 + rndSeed() * 1.3;
      for (let v = 0; v < 3; v++) {
        const base = i * 9 + v * 3;
        cPos[base] = f[v][0]; cPos[base + 1] = f[v][1]; cPos[base + 2] = f[v][2];
        cNorm[base] = n[0]; cNorm[base + 1] = n[1]; cNorm[base + 2] = n[2];
        cSeed[i * 3 + v] = fs;
        cCentroid[base] = cx; cCentroid[base + 1] = cy; cCentroid[base + 2] = cz;
        cExplodeDir[base] = ex; cExplodeDir[base + 1] = ey; cExplodeDir[base + 2] = ez;
        cSpin[base] = ax * spinMag; cSpin[base + 1] = ay * spinMag; cSpin[base + 2] = az * spinMag;
        cSpeedMul[i * 3 + v] = speedMul;
      }
    }
    const crystalGeom = new THREE.BufferGeometry();
    crystalGeom.setAttribute("position", new THREE.BufferAttribute(cPos, 3));
    crystalGeom.setAttribute("aNormal", new THREE.BufferAttribute(cNorm, 3));
    crystalGeom.setAttribute("aFaceSeed", new THREE.BufferAttribute(cSeed, 1));
    crystalGeom.setAttribute("aCentroid", new THREE.BufferAttribute(cCentroid, 3));
    crystalGeom.setAttribute("aExplodeDir", new THREE.BufferAttribute(cExplodeDir, 3));
    crystalGeom.setAttribute("aSpin", new THREE.BufferAttribute(cSpin, 3));
    crystalGeom.setAttribute("aSpeedMul", new THREE.BufferAttribute(cSpeedMul, 1));
    const crystalMat = new THREE.ShaderMaterial({
      vertexShader: CRYSTAL_VERT,
      fragmentShader: CRYSTAL_FRAG,
      uniforms: {
        uShatter: { value: 0 },
        uModel: { value: new THREE.Matrix4() },
        uNormalMatrix: { value: new THREE.Matrix3() },
        uMagentaDir: { value: new THREE.Vector3(0.6, 0.5, 0.6) },
        uCameraPos: { value: new THREE.Vector3() },
      },
      transparent: true,
      depthWrite: true,
      side: THREE.BackSide,
    });
    const crystalMesh = new THREE.Mesh(crystalGeom, crystalMat);
    scene.add(crystalMesh);

    // ---- Glass crystal — the intact, pre-shatter read. A real PBR
    // MeshPhysicalMaterial (transmission + ior + roughness) so light
    // genuinely refracts through the gem, rather than the flat-shaded
    // custom material the shard mesh above uses once it's flying apart.
    // Crossfades out as the shatter mesh crossfades in (see render()). ----
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const keyLight = new THREE.DirectionalLight(0xfff6ec, 0.55);
    keyLight.position.set(0.35, 0.82, 0.45).multiplyScalar(5);
    scene.add(keyLight);
    const fillLight = new THREE.AmbientLight(0xe8e2d4, 0.22);
    scene.add(fillLight);
    const flareLight = new THREE.PointLight(0xff2f97, 1.8, 8, 2);
    scene.add(flareLight);

    const glassGeom = new THREE.BufferGeometry();
    glassGeom.setAttribute("position", new THREE.BufferAttribute(cPos.slice(), 3));
    glassGeom.setAttribute("normal", new THREE.BufferAttribute(cNorm.slice(), 3));
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0.92, 0.89, 0.82),
      metalness: 0,
      roughness: 0.16,
      transmission: 1,
      thickness: 1.6,
      ior: 1.9,
      clearcoat: 0.3,
      clearcoatRoughness: 0.25,
      envMapIntensity: 0.6,
      attenuationColor: new THREE.Color(0.96, 0.9, 0.86),
      attenuationDistance: 2.5,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const glassMesh = new THREE.Mesh(glassGeom, glassMat);
    scene.add(glassMesh);

    // ---- Underwater backdrop: particles + wave grid + caustics, hidden
    // until the shatter reveals them (uReveal ramps 0→1 with uShatter). ----
    const BOUNDS = { x: 5.5, y: 3.2, zNear: 1, zFar: 9 };
    const CAMERA_Z = BOUNDS.zFar + 1;

    const N = 700;
    const rnd = mulberry32(20260901);
    const particles: Particle[] = [];
    function spawn(p: Particle) {
      p.x = (rnd() - 0.5) * BOUNDS.x * 2;
      p.y = (rnd() - 0.5) * BOUNDS.y * 2;
      p.z = BOUNDS.zNear + rnd() * (BOUNDS.zFar - BOUNDS.zNear);
      p.baseSize = 1.6 + rnd() * 3.0;
    }
    for (let i = 0; i < N; i++) { const p = {} as Particle; spawn(p); particles.push(p); }
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
      vertexShader: PARTICLE_VERT, fragmentShader: PARTICLE_FRAG,
      transparent: true, depthWrite: false, blending: THREE.NormalBlending,
    });
    const points = new THREE.Points(particleGeom, particleMat);
    scene.add(points);

    const GRID = { halfWidth: 6.2, y: -1.4, z0: 1, z1: 7.0, spacing: 0.85, flowSpeed: 6.0, rails: 7, segX: 10, segZ: 12, waveAmpA: 0.6, waveAmpB: 0.32 };
    const gridCrossCount = Math.ceil((GRID.z1 - GRID.z0) / GRID.spacing) + 2;
    const gridVertCount = gridCrossCount * GRID.segX * 2 + GRID.rails * GRID.segZ * 2;
    const gridPosArr = new Float32Array(gridVertCount * 3);
    const gridAlphaArr = new Float32Array(gridVertCount);
    const gridGeom = new THREE.BufferGeometry();
    gridGeom.setAttribute("position", new THREE.BufferAttribute(gridPosArr, 3));
    gridGeom.setAttribute("gAlpha", new THREE.BufferAttribute(gridAlphaArr, 1));
    const gridMat = new THREE.ShaderMaterial({
      vertexShader: GRID_VERT, fragmentShader: GRID_FRAG,
      uniforms: { uGColor: { value: new THREE.Vector3(...COL_INK) }, uReveal: { value: 0 } },
      transparent: true, depthWrite: false,
    });
    const gridLines = new THREE.LineSegments(gridGeom, gridMat);
    scene.add(gridLines);

    function waveY(x: number, z: number, prog: number) {
      const a = GRID.waveAmpA * Math.sin(x * 0.3 + z * 0.23 + prog * 1.5);
      const b = GRID.waveAmpB * Math.sin(x * 0.52 - z * 0.37 + prog * 2.0);
      return a + b;
    }
    function buildGrid(prog: number) {
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
          const y0 = GRID.y + waveY(x0, z, prog), y1 = GRID.y + waveY(x1, z, prog);
          gridPosArr[vi*3]=x0; gridPosArr[vi*3+1]=y0; gridPosArr[vi*3+2]=z; gridAlphaArr[vi]=a; vi++;
          gridPosArr[vi*3]=x1; gridPosArr[vi*3+1]=y1; gridPosArr[vi*3+2]=z; gridAlphaArr[vi]=a; vi++;
        }
      }
      for (let r = 0; r < GRID.rails; r++) {
        const x = -GRID.halfWidth + (r / (GRID.rails - 1)) * GRID.halfWidth * 2;
        for (let tI = 0; tI < GRID.segZ; tI++) {
          const z0v = GRID.z0 + (tI / GRID.segZ) * span, z1v = GRID.z0 + ((tI + 1) / GRID.segZ) * span;
          const depthT0 = (z0v - GRID.z0) / span, depthT1 = (z1v - GRID.z0) / span;
          const a0 = 0.08 + 0.3 * depthT0, a1 = 0.08 + 0.3 * depthT1;
          const y0 = GRID.y + waveY(x, z0v, prog), y1 = GRID.y + waveY(x, z1v, prog);
          gridPosArr[vi*3]=x; gridPosArr[vi*3+1]=y0; gridPosArr[vi*3+2]=z0v; gridAlphaArr[vi]=a0; vi++;
          gridPosArr[vi*3]=x; gridPosArr[vi*3+1]=y1; gridPosArr[vi*3+2]=z1v; gridAlphaArr[vi]=a1; vi++;
        }
      }
      gridGeom.attributes.position.needsUpdate = true;
      gridGeom.attributes.gAlpha.needsUpdate = true;
    }

    const causticsGeom = new THREE.PlaneGeometry(GRID.halfWidth * 2, GRID.z1 - GRID.z0, 1, 1);
    causticsGeom.rotateX(-Math.PI / 2);
    const causticsMat = new THREE.ShaderMaterial({
      vertexShader: CAUSTICS_VERT, fragmentShader: CAUSTICS_FRAG,
      uniforms: { uProg: { value: 0 }, uColor: { value: new THREE.Vector3(...COL_MOCHA) }, uReveal: { value: 0 } },
      transparent: true, depthWrite: false,
    });
    const causticsMesh = new THREE.Mesh(causticsGeom, causticsMat);
    causticsMesh.position.set(0, GRID.y - 0.08, GRID.z0 + (GRID.z1 - GRID.z0) / 2);
    scene.add(causticsMesh);

    // ---- Scroll ----
    let rawProgress = 0;
    let smoothProgress = 0;
    const st = ScrollTrigger.create({
      trigger: ride, start: "top top", end: "bottom bottom",
      onUpdate: (self) => { rawProgress = self.progress; },
    });

    // Phases: 0–0.22 intact + rotating; 0.22–0.55 shatter; 0.55–1 revealed current.
    const SHATTER_START = 0.22, SHATTER_END = 0.55;

    function render() {
      const hint = hintRef.current;
      if (hint) hint.style.opacity = rawProgress < 0.02 ? "1" : "0";

      smoothProgress += (rawProgress - smoothProgress) * (reduce ? 1 : 0.1);
      const t = performance.now() / 1000;

      const shatter = smoothstep(SHATTER_START, SHATTER_END, rawProgress);
      const reveal = smoothstep(SHATTER_START + 0.03, SHATTER_END, rawProgress);
      (crystalMat.uniforms.uShatter as { value: number }).value = shatter;
      (gridMat.uniforms.uReveal as { value: number }).value = reveal;
      (causticsMat.uniforms.uReveal as { value: number }).value = reveal;

      if (wordmarkRef.current) {
        wordmarkRef.current.style.opacity = String(1 - smoothstep(0, SHATTER_START * 0.7, rawProgress));
      }

      // Idle rotation always running (this IS the "suspended, rotating" read)
      // — the one deliberate exception to "everything ties to scroll" this
      // session has made, matching a product-hero render's own convention.
      const idleSpin = reduce ? 0 : t * 0.18;
      crystalMesh.rotation.y = idleSpin;
      crystalMesh.rotation.x = 0.18 + Math.sin(t * 0.13) * 0.16;
      crystalMesh.position.z = lerp(0, -2.2, shatter);
      crystalMesh.updateMatrixWorld();
      (crystalMat.uniforms.uModel!.value as THREE.Matrix4).copy(crystalMesh.matrixWorld);
      (crystalMat.uniforms.uNormalMatrix!.value as THREE.Matrix3).getNormalMatrix(crystalMesh.matrixWorld);
      (crystalMat.uniforms.uCameraPos!.value as THREE.Vector3).copy(camera.position);
      const magAngle = t * 0.3;
      (crystalMat.uniforms.uMagentaDir!.value as THREE.Vector3).set(Math.cos(magAngle) * 0.8, 0.5, Math.sin(magAngle) * 0.8);

      // Glass crystal — same idle spin, crossfades out right as the shard
      // mesh crossfades in, so the intact "real 3D refraction" read hands
      // off to the "genuine explosion" read with no double-drawn overlap.
      glassMesh.rotation.y = idleSpin;
      glassMesh.rotation.x = 0.18 + Math.sin(t * 0.13) * 0.16;
      const glassFade = 1 - smoothstep(SHATTER_START - 0.02, SHATTER_START + 0.08, rawProgress);
      glassMat.opacity = glassFade;
      glassMesh.visible = glassFade > 0.01;
      flareLight.position.set(Math.cos(magAngle) * 2.4, 1.0, Math.sin(magAngle) * 2.4);

      if (reveal > 0.01) {
        for (let i = 0; i < N; i++) {
          const p = particles[i];
          p.x += Math.sin(p.z * 0.32 + smoothProgress * 1.6) * 0.0009;
          p.y += Math.cos(p.z * 0.27 + smoothProgress * 1.4) * 0.0007;
          p.z -= 0.003;
          if (p.z < BOUNDS.zNear || p.x < -BOUNDS.x || p.x > BOUNDS.x || p.y < -BOUNDS.y || p.y > BOUNDS.y) {
            spawn(p); p.z = BOUNDS.zFar;
          }
          const base = i * 3;
          posArr[base] = p.x; posArr[base+1] = p.y; posArr[base+2] = p.z;
          colorArr[base] = COL_INK[0]; colorArr[base+1] = COL_INK[1]; colorArr[base+2] = COL_INK[2];
          sizeArr[i] = p.baseSize;
          const depthFade = smoothstep(BOUNDS.zFar, BOUNDS.zFar - 1.5, p.z) * smoothstep(BOUNDS.zNear, BOUNDS.zNear + 0.6, p.z);
          alphaArr[i] = 0.35 * clamp(depthFade, 0.15, 1) * reveal;
        }
        particleGeom.attributes.position.needsUpdate = true;
        (particleGeom.attributes.aColor as THREE.BufferAttribute).needsUpdate = true;
        (particleGeom.attributes.aSize as THREE.BufferAttribute).needsUpdate = true;
        (particleGeom.attributes.aAlpha as THREE.BufferAttribute).needsUpdate = true;
        buildGrid(smoothProgress);
        (causticsMat.uniforms.uProg as { value: number }).value = smoothProgress;
      }

      camera.position.set(0, 0, lerp(5.4, CAMERA_Z, reveal));
      camera.lookAt(0, lerp(0, 0, reveal), 0);
    }

    let raf = 0;
    function frame() { render(); composer.render(); if (!reduce) raf = requestAnimationFrame(frame); }
    if (reduce) { rawProgress = 1; smoothProgress = 1; render(); composer.render(); } else { raf = requestAnimationFrame(frame); }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", fit);
      st.kill();
      crystalGeom.dispose(); crystalMat.dispose();
      glassGeom.dispose(); glassMat.dispose();
      scene.environment?.dispose();
      particleGeom.dispose(); particleMat.dispose();
      gridGeom.dispose(); gridMat.dispose();
      causticsGeom.dispose(); causticsMat.dispose();
      bloomPass.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  if (webglFailed) {
    return (
      <div className="flex min-h-[100svh] flex-col items-center justify-center gap-4 bg-milk px-6 text-center">
        <div className="lowercase tracking-[0.02em] text-ink/70">krystal brook coterie</div>
      </div>
    );
  }

  return (
    <div ref={rideRef} className="relative bg-milk" style={{ height: reducedMotion ? "auto" : "400vh" }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-milk">
        <div ref={mountRef} className="absolute inset-0" />
        <div
          ref={wordmarkRef}
          className="pointer-events-none absolute bottom-[14%] left-0 right-0 text-center text-[13px] font-normal lowercase tracking-[0.06em] text-ink/55"
        >
          krystal brook coterie
        </div>
        <div ref={hintRef} className="pointer-events-none absolute bottom-[5%] left-0 right-0 text-center text-[11px] uppercase tracking-[0.13em] text-ink/40 transition-opacity duration-500">
          scroll to break the surface
        </div>
      </div>
    </div>
  );
}
