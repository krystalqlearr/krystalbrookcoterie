"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * PARKED — not imported anywhere as of the 2026-09 quiet-luxury pivot; its
 * only consumer, components/Hero.tsx (Nucleation), is parked too. Kept as
 * raw material for the future per-client crystal generator. The live site's
 * crystal is now components/motion/CrystalMark.tsx — the same ordered
 * hex-bipyramid geometry, at icon scale, on a real PBR glass material.
 * See docs/kbc-build-plan.md, Phase 7.
 *
 * ---
 *
 * The real crystal — hand-rolled WebGL1, no library. It renders on a
 * transparent canvas directly over the milk page, centered on the visitor's
 * own seed point — not boxed into a bordered "viewport" card. The whole point
 * of Nucleation is that the page grows FROM where you were; a crystal sitting
 * in a separate dark diorama next to the text undercut exactly that.
 *
 * The geometry is an ordered hexagonal bipyramid — six-fold rotational
 * symmetry around one axis, growing in two deliberate stages (the belt
 * extends, then both pointed caps sharpen) — not random weighted stellation.
 * A procedural random-walk face-split reliably reads as a jagged, asymmetric
 * "shattered rock," no matter how it's lit; the brand's whole premise is
 * "Krystal = clarity, deliberate precision," and a chaotic-looking shape
 * undercuts that at the structural level, not the polish level.
 *
 * The material is light — a bone/stone body, not ink-dominant — with ink
 * only at grazing-angle edges (real cut-glass edge definition) and the
 * magenta flare kept as a rare, tight specular glint rather than a wash
 * across the whole surface (the site's "one flare element per view" rule,
 * applied to a single object instead of a whole page).
 *
 * `seedKey` drives a deterministic PRNG (mulberry32, same pattern as the
 * standalone Nucleation/Lattice prototypes), so a shared `?seed=ne` link
 * reproduces the exact same crystal, not just the same layout. `camYaw`
 * gives each of the five orientations a genuinely distinct starting angle.
 *
 * Reduced motion renders one static, fully-formed frame with no rotation and
 * no continuing growth.
 */
type Props = {
  active: boolean;
  seedKey: string;
  camYaw: number;
};

export default function HeroCrystal({ active, seedKey, camYaw }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    // premultipliedAlpha:false — the fragment shader outputs straight
    // (non-premultiplied) color+alpha; declaring the opposite here caused
    // wrong, over-brightened compositing wherever the canvas overlaps the
    // page at anything less than full alpha.
    const glContext = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: true });
    if (!glContext) return;
    const gl = glContext;

    let dims = fitCanvas();
    function fitCanvas() {
      const rect = stage!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.max(1, rect.width * dpr);
      canvas!.height = Math.max(1, rect.height * dpr);
      canvas!.style.width = `${rect.width}px`;
      canvas!.style.height = `${rect.height}px`;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      return { w: rect.width, h: rect.height };
    }
    const onResize = () => {
      dims = fitCanvas();
    };
    window.addEventListener("resize", onResize);

    // ---- Deterministic PRNG — same seedKey always grows the same crystal ----
    function hashSeed(str: string) {
      let h = 0;
      for (let i = 0; i < str.length; i++) {
        h = (h << 5) - h + str.charCodeAt(i);
        h |= 0;
      }
      return h >>> 0;
    }
    function mulberry32(a: number) {
      return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const seedNum = hashSeed(seedKey);

    // ---- Minimal column-major mat4 / vec3 helpers, no library --------------
    type Vec3 = [number, number, number];
    const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    const cross = (a: Vec3, b: Vec3): Vec3 => [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ];
    const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const len = (a: Vec3) => Math.sqrt(dot(a, a)) || 1e-6;
    const norm = (a: Vec3): Vec3 => {
      const l = len(a);
      return [a[0] / l, a[1] / l, a[2] / l];
    };

    function m4perspective(fovy: number, aspect: number, near: number, far: number) {
      const f = 1 / Math.tan(fovy / 2);
      const nf = 1 / (near - far);
      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, 2 * far * near * nf, 0,
      ]);
    }
    function m4mul(a: Float32Array, b: Float32Array) {
      const out = new Float32Array(16);
      for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 4; row++) {
          let s = 0;
          for (let k = 0; k < 4; k++) s += a[k * 4 + row] * b[col * 4 + k];
          out[col * 4 + row] = s;
        }
      }
      return out;
    }
    const m4rotY = (a: number) => {
      const c = Math.cos(a), s = Math.sin(a);
      return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
    };
    const m4rotX = (a: number) => {
      const c = Math.cos(a), s = Math.sin(a);
      return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
    };
    const m4translateZ = (z: number) =>
      new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, z, 1]);
    const m4toNormalMat3 = (m: Float32Array) =>
      new Float32Array([m[0], m[1], m[2], m[4], m[5], m[6], m[8], m[9], m[10]]);

    // ---- Ordered hexagonal-bipyramid geometry -------------------------------
    // Six-fold rotational symmetry around the Y axis; growth extends the belt
    // outward, then sharpens both pointed caps — two deliberate stages, not
    // an unordered accretion.
    type Face = [Vec3, Vec3, Vec3];
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const faceNormal = (f: Face) => norm(cross(sub(f[1], f[0]), sub(f[2], f[0])));

    function buildHexCrystal(beltT: number, capT: number, seed: number): Face[] {
      const rnd = mulberry32(seed);
      const R = 1.0;
      const beltHalf = lerp(0.03, 0.62, beltT);
      const capHeight = lerp(0.05, 0.98, capT);
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
      for (let i = 0; i < 6; i++) {
        const j = (i + 1) % 6;
        faces.push([topRing[i], topRing[j], apexTop]);
      }
      for (let i = 0; i < 6; i++) {
        const j = (i + 1) % 6;
        faces.push([botRing[j], botRing[i], apexBot]);
      }
      return faces;
    }

    // ---- Shaders — light bone/stone body, ink only at grazing edges, a ----
    // ---- rare tight magenta glint as the sole accent -----------------------
    const VS = `
      attribute vec3 aPosition; attribute vec3 aNormal;
      uniform mat4 uMVP; uniform mat4 uModel; uniform mat3 uNormalMatrix;
      varying vec3 vNormal; varying vec3 vWorldPos;
      void main() {
        vNormal = normalize(uNormalMatrix * aNormal);
        vWorldPos = (uModel * vec4(aPosition, 1.0)).xyz;
        gl_Position = uMVP * vec4(aPosition, 1.0);
      }
    `;
    const FS = `
      precision mediump float;
      varying vec3 vNormal; varying vec3 vWorldPos;
      uniform vec3 uMagentaDir; uniform vec3 uCameraPos;
      void main() {
        vec3 n = normalize(vNormal);
        vec3 viewDir = normalize(uCameraPos - vWorldPos);
        vec3 magDir = normalize(uMagentaDir);
        vec3 halfVec = normalize(magDir + viewDir);
        float magDiff = max(dot(n, magDir), 0.0);
        float spec = pow(max(dot(n, halfVec), 0.0), 70.0);
        float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 2.4);

        float key = max(dot(n, normalize(vec3(0.35, 0.82, 0.45))), 0.0);
        vec3 stone = vec3(0.878, 0.847, 0.780);
        vec3 bone = vec3(0.925, 0.898, 0.847);
        vec3 body = mix(stone, bone, key * 0.85 + 0.15);
        vec3 ink = vec3(0.137, 0.125, 0.106);
        vec3 withEdge = mix(body, ink, fresnel * 0.42);

        // Kept low enough that specular + glint can't sum with the body past
        // 1.0 on every channel at once — that's what was clipping the peak
        // highlight to flat white instead of a warm magenta flash.
        vec3 specular = vec3(1.0, 0.0, 0.5) * spec * 0.5;
        vec3 warmGlint = vec3(1.0, 0.55, 0.78) * pow(magDiff, 5.0) * 0.2;

        gl_FragColor = vec4(withEdge + specular + warmGlint, 1.0);
      }
    `;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        throw new Error(`Shader compile error: ${gl!.getShaderInfoLog(s)}`);
      }
      return s;
    }
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`);
    }
    gl.useProgram(program);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    const aNormal = gl.getAttribLocation(program, "aNormal");
    const uMVP = gl.getUniformLocation(program, "uMVP");
    const uModel = gl.getUniformLocation(program, "uModel");
    const uNormalMatrix = gl.getUniformLocation(program, "uNormalMatrix");
    const uMagentaDir = gl.getUniformLocation(program, "uMagentaDir");
    const uCameraPos = gl.getUniformLocation(program, "uCameraPos");
    const posBuffer = gl.createBuffer()!;
    const normBuffer = gl.createBuffer()!;
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    // Transparent clear — the canvas sits directly over the milk page, not
    // in its own dark box.
    gl.clearColor(0, 0, 0, 0);

    let vertCount = 0;
    function upload(faces: Face[]) {
      const positions = new Float32Array(faces.length * 9);
      const normals = new Float32Array(faces.length * 9);
      for (let i = 0; i < faces.length; i++) {
        const f = faces[i];
        const n = faceNormal(f);
        for (let v = 0; v < 3; v++) {
          const base = i * 9 + v * 3;
          positions[base] = f[v][0];
          positions[base + 1] = f[v][1];
          positions[base + 2] = f[v][2];
          normals[base] = n[0];
          normals[base + 1] = n[1];
          normals[base + 2] = n[2];
        }
      }
      gl!.bindBuffer(gl!.ARRAY_BUFFER, posBuffer);
      gl!.bufferData(gl!.ARRAY_BUFFER, positions, gl!.DYNAMIC_DRAW);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, normBuffer);
      gl!.bufferData(gl!.ARRAY_BUFFER, normals, gl!.DYNAMIC_DRAW);
      return faces.length * 3;
    }

    // Arrive already substantial (belt/cap partway grown), same "held shot
    // of something underway" intent as before — not a seed watching itself
    // be born from nothing.
    vertCount = upload(buildHexCrystal(0.25, 0, seedNum));

    // Growth completes over GROW_SECONDS, then holds at full geometry — the
    // camera keeps orbiting after, so it still never stops moving, just
    // stops changing shape once it's fully formed.
    const GROW_SECONDS = 8;
    function growthAt(t: number) {
      const g = reduce ? 1 : clamp(0.25 + 0.75 * (t / GROW_SECONDS), 0, 1);
      const beltT = clamp(g / 0.45, 0, 1);
      const capT = clamp((g - 0.35) / 0.65, 0, 1);
      return { beltT: easeInOutCubic(beltT), capT: easeInOutCubic(capT) };
    }

    // A camera that never actually stops moving — arrives from further back
    // and eases toward a resting distance it approaches but never quite
    // reaches. Reduced motion holds at the resting distance with no dolly.
    const CAM_START = 6.4;
    const CAM_FLOOR = 3.5;
    const CAM_TIMESCALE = 16;
    function camDistAt(t: number) {
      if (reduce) return CAM_FLOOR;
      return CAM_FLOOR + (CAM_START - CAM_FLOOR) * Math.exp(-t / CAM_TIMESCALE);
    }

    function drawFrame(t: number) {
      const camDist = camDistAt(t);
      const proj = m4perspective(Math.PI / 4, dims.w / dims.h, 0.1, 100);
      const view = m4translateZ(-camDist);
      const rotY = camYaw + (reduce ? 0.6 : t * 0.09);
      const rotX = reduce ? 0.3 : 0.3 + Math.sin(t * 0.07) * 0.1;
      const model = m4mul(m4rotY(rotY), m4rotX(rotX));
      const mv = m4mul(view, model);
      const mvp = m4mul(proj, mv);

      gl!.clear(gl!.COLOR_BUFFER_BIT | gl!.DEPTH_BUFFER_BIT);
      gl!.useProgram(program);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, posBuffer);
      gl!.enableVertexAttribArray(aPosition);
      gl!.vertexAttribPointer(aPosition, 3, gl!.FLOAT, false, 0, 0);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, normBuffer);
      gl!.enableVertexAttribArray(aNormal);
      gl!.vertexAttribPointer(aNormal, 3, gl!.FLOAT, false, 0, 0);

      gl!.uniformMatrix4fv(uMVP, false, mvp);
      gl!.uniformMatrix4fv(uModel, false, model);
      gl!.uniformMatrix3fv(uNormalMatrix, false, m4toNormalMat3(model));
      gl!.uniform3fv(uCameraPos, [0, 0, camDist]);
      const magAngle = camYaw + (reduce ? 0.6 : t * 0.35);
      gl!.uniform3fv(uMagentaDir, [Math.cos(magAngle) * 0.8, 0.5, Math.sin(magAngle) * 0.8]);
      if (vertCount > 0) gl!.drawArrays(gl!.TRIANGLES, 0, vertCount);
    }

    let raf = 0;
    if (reduce) {
      const { beltT, capT } = growthAt(GROW_SECONDS);
      vertCount = upload(buildHexCrystal(beltT, capT, seedNum));
      drawFrame(0);
    } else {
      let start: number | null = null;
      let lastRebuild = -1;
      const frame = (ts: number) => {
        if (start === null) start = ts;
        const t = (ts - start) / 1000;
        const bucket = Math.round(t * 30);
        if (bucket !== lastRebuild && t <= GROW_SECONDS + 0.5) {
          lastRebuild = bucket;
          const { beltT, capT } = growthAt(t);
          vertCount = upload(buildHexCrystal(beltT, capT, seedNum));
        }
        drawFrame(t);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active, seedKey, camYaw, reduce]);

  return (
    <div ref={stageRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
