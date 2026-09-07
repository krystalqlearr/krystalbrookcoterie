"use client";

import { useEffect, useRef, useState } from "react";
import type * as THREE_NS from "three";

/** Warm the dynamic imports (module imports are cached), so a first mount that
 *  must appear within a beat — the work expand's 400ms gem — pays only renderer
 *  + PMREM setup, not a ~150kB fetch. Call on hover/focus of the trigger. */
export const preloadCrystalMark = () =>
  Promise.all([import("three"), import("three/addons/environments/RoomEnvironment.js")]);

/**
 * CrystalMark — the one small, quiet, high-tech detail the homepage keeps
 * after the full-screen "riding the current" spectacle was retired
 * (2026-09, quiet-luxury pivot — see docs/kbc-build-plan.md). A real
 * MeshPhysicalMaterial glass gem, icon-scale, idle-rotating beside the
 * wordmark — present, not performed. It reuses the exact geometry and
 * PBR-transmission setup validated in the parked
 * components/motion/CrystalShatterScene.tsx, stripped of everything that
 * made that a spectacle: no shatter, no particle current, no bloom, no
 * scroll tie. It's also the nearest existing seed for the future
 * per-client crystal-generator product.
 *
 * Decorative, not load-bearing: a WebGL failure renders nothing rather
 * than a fallback, and reduced motion holds the gem at a fixed angle
 * instead of removing it.
 *
 * Three.js is imported dynamically inside the effect, not at module scope,
 * so ~150kB of library never lands in the homepage's first-load bundle for
 * the sake of a 32px ornament — it arrives after mount, and the reserved
 * box below means its arrival shifts nothing.
 */

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Vec3 = [number, number, number];
type Face = [Vec3, Vec3, Vec3];
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
const vlen = (a: Vec3) => Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]) || 1e-6;
const norm = (a: Vec3): Vec3 => { const l = vlen(a); return [a[0]/l, a[1]/l, a[2]/l]; };
const faceNormal = (f: Face) => norm(cross(sub(f[1], f[0]), sub(f[2], f[0])));

// Same ordered hexagonal-bipyramid construction as HeroCrystal.tsx /
// CrystalShatterScene.tsx — ordered/symmetric geometry, not random
// stellation, per the validated standard (see feedback_crystal_visual_craft).
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

type Props = { className?: string };

export default function CrystalMark({ className = "" }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cancelled = false;
    let teardown: (() => void) | null = null;

    // Three.js loads after mount, never in the first-load bundle.
    (async () => {
      const [THREE, { RoomEnvironment }] = await Promise.all([
        import("three"),
        import("three/addons/environments/RoomEnvironment.js"),
      ]);
      if (cancelled) return;

      let renderer: THREE_NS.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        if (!renderer.getContext()) throw new Error("no context");
      } catch {
        setWebglFailed(true);
        return;
      }
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20);
      camera.position.set(0, 0, 3.4);
      const scene = new THREE.Scene();

      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      pmrem.dispose();

      const keyLight = new THREE.DirectionalLight(0xfff6ec, 0.55);
      keyLight.position.set(0.35, 0.82, 0.45).multiplyScalar(5);
      scene.add(keyLight);
      const fillLight = new THREE.AmbientLight(0xe8e2d4, 0.22);
      scene.add(fillLight);
      const flareLight = new THREE.PointLight(0xff2f97, 1.4, 6, 2);
      scene.add(flareLight);

      const faces = buildHexCrystal(20260901);
      const vertCount = faces.length * 3;
      const pos = new Float32Array(vertCount * 3);
      const nrm = new Float32Array(vertCount * 3);
      for (let i = 0; i < faces.length; i++) {
        const f = faces[i];
        const n = faceNormal(f);
        for (let v = 0; v < 3; v++) {
          const base = i * 9 + v * 3;
          pos[base] = f[v][0]; pos[base + 1] = f[v][1]; pos[base + 2] = f[v][2];
          nrm[base] = n[0]; nrm[base + 1] = n[1]; nrm[base + 2] = n[2];
        }
      }
      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geom.setAttribute("normal", new THREE.BufferAttribute(nrm, 3));
      const mat = new THREE.MeshPhysicalMaterial({
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
      const mesh = new THREE.Mesh(geom, mat);
      scene.add(mesh);

      const fit = () => {
        const rect = mount.getBoundingClientRect();
        const size = Math.max(1, Math.round(rect.width || rect.height || 32));
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        renderer.setPixelRatio(dpr);
        renderer.setSize(size, size, true);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      };
      fit();
      window.addEventListener("resize", fit);

      let raf = 0;
      const frame = () => {
        const t = performance.now() / 1000;
        mesh.rotation.y = reduce ? 0.6 : t * 0.22;
        mesh.rotation.x = reduce ? 0.18 : 0.18 + Math.sin(t * 0.15) * 0.14;
        const magAngle = t * 0.35;
        flareLight.position.set(Math.cos(magAngle) * 2.2, 0.9, Math.sin(magAngle) * 2.2);
        renderer.render(scene, camera);
        if (!reduce) raf = requestAnimationFrame(frame);
      };
      if (reduce) frame(); else raf = requestAnimationFrame(frame);

      teardown = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", fit);
        geom.dispose(); mat.dispose();
        scene.environment?.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, []);

  if (webglFailed) return null;

  return <div ref={mountRef} aria-hidden className={`inline-block ${className}`} />;
}
