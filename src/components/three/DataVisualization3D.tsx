"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 75;
const SPHERE_RADIUS = 2;
const LINK_DISTANCE = 1.15;

/** Deterministic pseudo-random for stable geometry across renders. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Evenly distributed points on a sphere (Fibonacci lattice). */
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ),
    );
  }
  return points;
}

function Network() {
  const groupRef = useRef<THREE.Group>(null);
  const tiltRef = useRef({ x: 0, y: 0 });
  const { invalidate, gl } = useThree();

  const { nodePositions, linePositions } = useMemo(() => {
    const nodes = fibonacciSphere(NODE_COUNT, SPHERE_RADIUS);
    const rand = mulberry32(42);
    // Slight organic jitter so it doesn't look perfectly mechanical.
    for (const n of nodes) {
      n.x += (rand() - 0.5) * 0.12;
      n.y += (rand() - 0.5) * 0.12;
      n.z += (rand() - 0.5) * 0.12;
    }
    const nodePositions = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      nodePositions[i * 3] = n.x;
      nodePositions[i * 3 + 1] = n.y;
      nodePositions[i * 3 + 2] = n.z;
    });

    const lineVerts: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < LINK_DISTANCE) {
          lineVerts.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z,
          );
        }
      }
    }
    return {
      nodePositions,
      linePositions: new Float32Array(lineVerts),
    };
  }, []);

  // Explicit disposal on unmount (R3F disposes declaratively-created
  // objects, but the memoized buffers are ours to clean up).
  useEffect(() => {
    return () => {
      nodePositions.fill(0);
      linePositions.fill(0);
    };
  }, [nodePositions, linePositions]);

  useEffect(() => {
    const canvas = gl.domElement;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      tiltRef.current.x = ny * 0.25;
      tiltRef.current.y = nx * 0.35;
    }
    function onLeave() {
      tiltRef.current.x = 0;
      tiltRef.current.y = 0;
    }
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [gl]);

  useFrame((_, delta) => {
    // Pause when the tab is hidden: with frameloop="demand" this stops
    // the render loop entirely until the tab is visible again.
    if (document.hidden) return;
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y += delta * 0.12; // slow rotation
    // Gentle pointer tilt (lerped).
    g.rotation.x += (tiltRef.current.x - g.rotation.x) * 0.04;
    g.rotation.z += (tiltRef.current.y * 0.4 - g.rotation.z) * 0.04;
    invalidate();
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.055} color="#22d3ee" sizeAttenuation transparent opacity={0.95} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.28} />
      </lineSegments>
    </group>
  );
}

/**
 * Single 3D element for the hero: a slowly rotating network of nodes on a
 * sphere with thin connecting lines. Demand-driven frame loop, capped DPR,
 * basic materials only — no post-processing.
 */
export function DataVisualization3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      aria-hidden="true"
    >
      <Network />
    </Canvas>
  );
}
