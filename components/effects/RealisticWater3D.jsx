'use client';

/**
 * RealisticWater3D
 * -----------------
 * True 3D water using react-three-fiber + a custom GLSL shader
 * (procedural gerstner-ish waves + fresnel specular). No external
 * texture assets needed, so nothing extra to host/optimize.
 *
 * ⚠️ Use this ONLY in the hero (one instance per page). It's the
 * "real 3D" tier — heavier than WaveBackground, so gate it behind
 * a dynamic import with ssr:false and lazy-mount below the fold guard.
 *
 * Install:
 *   npm i three @react-three/fiber @react-three/drei
 *
 * Usage (in your Hero component, e.g. app/components/Hero.jsx):
 *   import dynamic from 'next/dynamic';
 *   const RealisticWater3D = dynamic(
 *     () => import('@/components/effects/RealisticWater3D'),
 *     { ssr: false }
 *   );
 *   ...
 *   <div className="absolute inset-0 -z-10">
 *     <RealisticWater3D />
 *   </div>
 */

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color } from 'three';

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  // cheap layered sine waves = "gerstner-lite"
  float wave(vec2 pos, float freq, float amp, float speed, vec2 dir) {
    return sin(dot(pos, dir) * freq + uTime * speed) * amp;
  }

  void main() {
    vUv = uv;
    vec3 p = position;

    float e = 0.0;
    e += wave(p.xy, 1.2, 0.18, 0.6, vec2(1.0, 0.4));
    e += wave(p.xy, 2.1, 0.10, 1.1, vec2(-0.6, 1.0));
    e += wave(p.xy, 4.0, 0.05, 1.8, vec2(0.8, 0.6));

    p.z += e;
    vElevation = e;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorDeep;
  uniform vec3 uColorShallow;
  uniform vec3 uColorFoam;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // depth-based color blend for that river-water gradient
    float mixFactor = smoothstep(-0.15, 0.2, vElevation);
    vec3 color = mix(uColorDeep, uColorShallow, mixFactor);

    // crest foam highlight
    float foam = smoothstep(0.16, 0.24, vElevation);
    color = mix(color, uColorFoam, foam * 0.6);

    // fake fresnel-ish rim light using uv edges for extra "wet" sheen
    float rim = pow(1.0 - abs(vUv.y - 0.5) * 2.0, 3.0) * 0.08;
    color += rim;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function WaterPlane({ colors }) {
  const materialRef = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorDeep: { value: colors.deep },
      uColorShallow: { value: colors.shallow },
      uColorFoam: { value: colors.foam },
    }),
    [colors]
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2.4, 0, 0]} position={[0, -0.4, 0]}>
      <planeGeometry args={[12, 8, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function RealisticWater3D({
  deep = '#0b3d5c',
  shallow = '#3fa9d9',
  foam = '#e8f6ff',
}) {
  const colors = useMemo(() => {
    return {
      deep: new Color(deep),
      shallow: new Color(shallow),
      foam: new Color(foam),
    };
  }, [deep, shallow, foam]);

  return (
    <Canvas
      camera={{ position: [0, 1.6, 4.2], fov: 55 }}
      dpr={[1, 1.5]} // cap DPR — big perf win on retina/mobile
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <WaterPlane colors={colors} />
      </Suspense>
    </Canvas>
  );
}
