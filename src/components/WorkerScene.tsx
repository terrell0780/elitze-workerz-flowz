import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Matrix texture generator (animated via offset) ─── */
function useMatrixTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 512;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.font = '14px monospace';
    const chars = '01アカサタナハマヤラワABCDEF<>{}[]$#'.split('');
    for (let x = 0; x < c.width; x += 12) {
      for (let y = 0; y < c.height; y += 16) {
        const v = Math.random();
        ctx.fillStyle =
          v > 0.96
            ? 'rgba(220,255,240,1)'
            : v > 0.5
            ? `rgba(0,255,140,${0.25 + Math.random() * 0.5})`
            : `rgba(180,100,255,${0.2 + Math.random() * 0.4})`;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);
}

/* ─── CRT screen face texture ─── */
function useCRTTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 384;
    const ctx = c.getContext('2d')!;
    const grd = ctx.createRadialGradient(256, 192, 40, 256, 192, 300);
    grd.addColorStop(0, '#0a1a14');
    grd.addColorStop(1, '#000');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = 'rgba(0,255,150,0.05)';
    for (let y = 0; y < c.height; y += 3) ctx.fillRect(0, y, c.width, 1);
    ctx.fillStyle = '#7CFFB0';
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 22;
    ctx.font = 'bold 54px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Elitze', 256, 195);
    ctx.shadowBlur = 8;
    ctx.font = '18px monospace';
    ctx.fillStyle = '#00ff88';
    ctx.fillText('● ONLINE  ·  24/7', 256, 245);
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0,255,140,0.45)';
    ctx.font = '13px monospace';
    ctx.fillText('> hermes.run()', 256, 55);
    ctx.fillText('exec → audit → learn', 256, 325);
    return new THREE.CanvasTexture(c);
  }, []);
}

/* ─── Background silhouette worker (glass-matrix) ─── */
function BackgroundWorker({
  position,
  scale = 1,
  phase = 0,
}: {
  position: [number, number, number];
  scale?: number;
  phase?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const tex = useMatrixTexture();

  useFrame((s) => {
    if (!ref.current) return;
    ref.current.position.y =
      position[1] + Math.sin(s.clock.elapsedTime * 0.5 + phase) * 0.03;
    // scroll matrix texture
    tex.offset.y -= 0.003;
  });

  const glassMat = (
    <meshStandardMaterial
      map={tex}
      emissiveMap={tex}
      emissive={new THREE.Color('#00ff88')}
      emissiveIntensity={0.35}
      color="#080818"
      roughness={0.25}
      metalness={0.6}
      transparent
      opacity={0.88}
    />
  );

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Head */}
      <mesh position={[0, 1.65, 0]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        {glassMat}
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.14, 16]} />
        {glassMat}
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.95, 0]}>
        <capsuleGeometry args={[0.28, 0.7, 8, 16]} />
        {glassMat}
      </mesh>
      {/* Shoulders */}
      <mesh position={[-0.42, 1.22, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        {glassMat}
      </mesh>
      <mesh position={[0.42, 1.22, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        {glassMat}
      </mesh>
      {/* Arms crossed */}
      <mesh position={[-0.32, 0.95, 0.12]} rotation={[0.1, 0, 0.35]}>
        <capsuleGeometry args={[0.08, 0.55, 8, 16]} />
        {glassMat}
      </mesh>
      <mesh position={[0.32, 0.95, 0.12]} rotation={[0.1, 0, -0.35]}>
        <capsuleGeometry args={[0.08, 0.55, 8, 16]} />
        {glassMat}
      </mesh>
      {/* Hips */}
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[0.52, 0.22, 0.3]} />
        {glassMat}
      </mesh>
      {/* Legs */}
      <mesh position={[-0.15, -0.15, 0]}>
        <capsuleGeometry args={[0.1, 0.8, 8, 16]} />
        {glassMat}
      </mesh>
      <mesh position={[0.15, -0.15, 0]}>
        <capsuleGeometry args={[0.1, 0.8, 8, 16]} />
        {glassMat}
      </mesh>
      {/* Shoes */}
      <mesh position={[-0.15, -0.62, 0.05]}>
        <boxGeometry args={[0.16, 0.07, 0.26]} />
        <meshStandardMaterial color="#020205" emissive="#00ff88" emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0.15, -0.62, 0.05]}>
        <boxGeometry args={[0.16, 0.07, 0.26]} />
        <meshStandardMaterial color="#020205" emissive="#00ff88" emissiveIntensity={0.08} />
      </mesh>
    </group>
  );
}

/* ─── Foreground CRT-Head Worker (detailed suit) ─── */
function ForegroundWorker() {
  const headRef = useRef<THREE.Group>(null);
  const crtTex = useCRTTexture();

  useFrame((s) => {
    if (!headRef.current) return;
    headRef.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.35) * 0.12;
    headRef.current.position.y = 1.78 + Math.sin(s.clock.elapsedTime * 0.6) * 0.015;
  });

  const suitMat = (
    <meshPhysicalMaterial
      color="#0c0e1a"
      roughness={0.45}
      metalness={0.15}
      clearcoat={0.3}
      clearcoatRoughness={0.4}
    />
  );
  const shirtMat = <meshStandardMaterial color="#d8dce6" roughness={0.5} />;
  const tieMat = (
    <meshPhysicalMaterial color="#151828" roughness={0.35} metalness={0.25} clearcoat={0.2} />
  );
  const skinMat = <meshStandardMaterial color="#3d2815" roughness={0.75} />;
  const shoeMat = (
    <meshPhysicalMaterial color="#050508" roughness={0.25} metalness={0.35} clearcoat={0.5} />
  );

  return (
    <group position={[0, -0.55, 0]}>
      {/* ── CRT HEAD ── */}
      <group ref={headRef} position={[0, 1.78, 0]}>
        {/* Main monitor body */}
        <mesh castShadow>
          <boxGeometry args={[0.88, 0.72, 0.72]} />
          <meshStandardMaterial color="#12121a" roughness={0.45} metalness={0.3} />
        </mesh>
        {/* Bezel */}
        <mesh position={[0, 0, 0.365]}>
          <boxGeometry args={[0.82, 0.66, 0.02]} />
          <meshStandardMaterial color="#08080f" roughness={0.35} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0, 0.38]}>
          <planeGeometry args={[0.68, 0.52]} />
          <meshBasicMaterial map={crtTex} toneMapped={false} />
        </mesh>
        {/* Screen glow light */}
        <pointLight position={[0, 0, 0.55]} color="#00ff88" intensity={1.4} distance={2.2} />
        {/* Back bulge (CRT tube) */}
        <mesh position={[0, 0, -0.25]}>
          <sphereGeometry args={[0.38, 24, 24]} />
          <meshStandardMaterial color="#0e0e16" roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Vents top */}
        {[-0.28, -0.14, 0, 0.14, 0.28].map((x) => (
          <mesh key={x} position={[x, 0.37, 0]}>
            <boxGeometry args={[0.07, 0.004, 0.55]} />
            <meshStandardMaterial color="#000" />
          </mesh>
        ))}
        {/* Power LED */}
        <mesh position={[0.34, -0.3, 0.38]}>
          <sphereGeometry args={[0.011, 8, 8]} />
          <meshBasicMaterial color="#ff2a2a" toneMapped={false} />
        </mesh>
        {/* Stand / neck connector */}
        <mesh position={[0, -0.42, 0]}>
          <cylinderGeometry args={[0.12, 0.18, 0.14, 16]} />
          <meshStandardMaterial color="#0a0a12" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      {/* ── NECK ── */}
      <mesh position={[0, 1.38, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.16, 16]} />
        {skinMat}
      </mesh>

      {/* ── TORSO / SUIT ── */}
      {/* Main torso */}
      <mesh position={[0, 0.88, 0]} castShadow>
        <capsuleGeometry args={[0.4, 0.85, 8, 20]} />
        {suitMat}
      </mesh>
      {/* Shoulders */}
      <mesh position={[-0.46, 1.18, 0]} castShadow>
        <sphereGeometry args={[0.16, 20, 20]} />
        {suitMat}
      </mesh>
      <mesh position={[0.46, 1.18, 0]} castShadow>
        <sphereGeometry args={[0.16, 20, 20]} />
        {suitMat}
      </mesh>
      {/* Lapels */}
      <mesh position={[-0.14, 1.06, 0.33]} rotation={[0, 0, 0.22]}>
        <boxGeometry args={[0.12, 0.45, 0.025]} />
        {suitMat}
      </mesh>
      <mesh position={[0.14, 1.06, 0.33]} rotation={[0, 0, -0.22]}>
        <boxGeometry args={[0.12, 0.45, 0.025]} />
        {suitMat}
      </mesh>
      {/* Shirt visible */}
      <mesh position={[0, 1.06, 0.35]}>
        <boxGeometry args={[0.13, 0.48, 0.015]} />
        {shirtMat}
      </mesh>
      {/* Tie */}
      <mesh position={[0, 0.96, 0.37]}>
        <boxGeometry args={[0.07, 0.58, 0.018]} />
        {tieMat}
      </mesh>
      {/* Tie knot */}
      <mesh position={[0, 1.24, 0.37]}>
        <boxGeometry args={[0.09, 0.09, 0.035]} />
        {tieMat}
      </mesh>
      {/* Suit buttons */}
      {[0.82, 0.62].map((y) => (
        <mesh key={y} position={[0, y, 0.38]}>
          <sphereGeometry args={[0.018, 12, 12]} />
          <meshPhysicalMaterial color="#1a1a2e" roughness={0.2} metalness={0.6} />
        </mesh>
      ))}

      {/* ── LEFT ARM (holding clipboard) ── */}
      <mesh position={[-0.52, 0.88, 0.05]} rotation={[0.15, 0, 0.18]}>
        <capsuleGeometry args={[0.1, 0.52, 8, 16]} />
        {suitMat}
      </mesh>
      <mesh position={[-0.46, 0.5, 0.42]} rotation={[1.25, 0, 0.12]}>
        <capsuleGeometry args={[0.085, 0.5, 8, 16]} />
        {suitMat}
      </mesh>
      {/* Hand */}
      <mesh position={[-0.4, 0.5, 0.76]}>
        <sphereGeometry args={[0.075, 14, 14]} />
        {skinMat}
      </mesh>

      {/* ── RIGHT ARM (with pen) ── */}
      <mesh position={[0.52, 0.88, 0.05]} rotation={[0.35, 0, -0.18]}>
        <capsuleGeometry args={[0.1, 0.52, 8, 16]} />
        {suitMat}
      </mesh>
      <mesh position={[0.42, 0.52, 0.48]} rotation={[1.35, 0, -0.18]}>
        <capsuleGeometry args={[0.085, 0.5, 8, 16]} />
        {suitMat}
      </mesh>
      <mesh position={[0.32, 0.52, 0.8]}>
        <sphereGeometry args={[0.075, 14, 14]} />
        {skinMat}
      </mesh>
      {/* Pen */}
      <mesh position={[0.26, 0.57, 0.9]} rotation={[0.3, 0, 0.55]}>
        <cylinderGeometry args={[0.011, 0.011, 0.18, 8]} />
        <meshPhysicalMaterial color="#111" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* ── CLIPBOARD ── */}
      <group position={[-0.04, 0.48, 0.9]} rotation={[1.15, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.44, 0.56, 0.018]} />
          <meshStandardMaterial color="#2d2212" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.02, 0.01]}>
          <planeGeometry args={[0.38, 0.49]} />
          <meshStandardMaterial color="#ece6d4" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.26, 0.015]}>
          <boxGeometry args={[0.13, 0.045, 0.018]} />
          <meshPhysicalMaterial color="#777" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Ruled lines on paper */}
        {[0.14, 0.04, -0.06, -0.16].map((y) => (
          <mesh key={y} position={[0, y, 0.015]}>
            <planeGeometry args={[0.3, 0.004]} />
            <meshBasicMaterial color="#555" />
          </mesh>
        ))}
      </group>

      {/* ── PANTS ── */}
      <mesh position={[-0.16, -0.02, 0]}>
        <capsuleGeometry args={[0.13, 0.82, 8, 16]} />
        {suitMat}
      </mesh>
      <mesh position={[0.16, -0.02, 0]}>
        <capsuleGeometry args={[0.13, 0.82, 8, 16]} />
        {suitMat}
      </mesh>

      {/* ── SHOES ── */}
      <mesh position={[-0.16, -0.52, 0.08]}>
        <boxGeometry args={[0.2, 0.09, 0.32]} />
        {shoeMat}
      </mesh>
      <mesh position={[0.16, -0.52, 0.08]}>
        <boxGeometry args={[0.2, 0.09, 0.32]} />
        {shoeMat}
      </mesh>
    </group>
  );
}

/* ─── Matrix rain particle system ─── */
function MatrixRainParticles() {
  const count = 400;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { positions, speeds, colors } = useMemo(() => {
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    const c = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00ff88'),
      new THREE.Color('#00ff88'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#00cc66'),
    ];
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = Math.random() * 6 - 1;
      p[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
      s[i] = 0.5 + Math.random() * 2.5;
      const col = palette[Math.floor(Math.random() * palette.length)];
      c[i * 3] = col.r;
      c[i * 3 + 1] = col.g;
      c[i * 3 + 2] = col.b;
    }
    return { positions: p, speeds: s, colors: c };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const _color = useMemo(() => new THREE.Color(), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= speeds[i] * delta * 1.5;
      if (positions[i * 3 + 1] < -2) {
        positions[i * 3 + 1] = 5;
        positions[i * 3] = (Math.random() - 0.5) * 10;
      }
      dummy.position.set(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );
      dummy.scale.setScalar(0.04 + Math.random() * 0.02);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      _color.setRGB(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]);
      meshRef.current!.setColorAt(i, _color);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        vertexColors
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/* ─── Floor ─── */
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.12, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshPhysicalMaterial
        color="#030308"
        roughness={0.15}
        metalness={0.4}
        clearcoat={0.6}
        clearcoatRoughness={0.2}
      />
    </mesh>
  );
}

/* ─── Main exported scene ─── */
export function WorkerScene() {
  return (
    <div className="w-full h-[560px] md:h-[640px] relative select-none">
      {/* Ambient glow orbs behind canvas */}
      <div className="absolute inset-10 rounded-full bg-purple-600/25 blur-[120px]" />
      <div className="absolute inset-16 rounded-full bg-emerald-500/20 blur-[90px]" />

      <Canvas
        shadows
        camera={{ position: [0, 0.3, 4.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000005']} />
        <fog attach="fog" args={['#000005', 6, 16]} />

        {/* ── Lighting ── */}
        <ambientLight intensity={0.08} />
        {/* Purple rim from left */}
        <pointLight position={[-4, 2.5, 1]} intensity={4} color="#a855f7" distance={12} />
        {/* Green rim from right */}
        <pointLight position={[4, 2.5, 1]} intensity={4} color="#00ff88" distance={12} />
        {/* Key fill from above-front */}
        <pointLight position={[0, 4, 3]} intensity={1.5} color="#e0e0ff" distance={10} />
        {/* Backlight */}
        <pointLight position={[0, 2, -3]} intensity={2} color="#4c1d95" distance={10} />
        <directionalLight position={[0, 6, 4]} intensity={0.3} castShadow />

        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-emerald-400/60 tracking-[0.3em] uppercase pointer-events-none">
        Elitze · 24/7 Autonomous Execution
      </div>
    </div>
  );
}

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.12) * 0.06;
  });

  return (
    <group ref={groupRef}>
      {/* Background row of matrix workers */}
      <BackgroundWorker position={[-2.5, -0.45, -1.6]} scale={0.88} phase={0.5} />
      <BackgroundWorker position={[-1.45, -0.45, -1.3]} scale={0.92} phase={1.2} />
      <BackgroundWorker position={[1.45, -0.45, -1.3]} scale={0.92} phase={1.9} />
      <BackgroundWorker position={[2.5, -0.45, -1.6]} scale={0.88} phase={2.6} />

      {/* Foreground CRT worker */}
      <ForegroundWorker />

      {/* Matrix rain particles */}
      <MatrixRainParticles />

      <Floor />
    </group>
  );
}
