"use client";

import { Component, Suspense, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Center,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

interface ModelViewerProps {
  /** URL tới file STL (object URL hoặc URL từ server). Bỏ trống → mô hình mẫu */
  url?: string;
  color?: string;
}

/** Kích thước lớn nhất của mô hình sau khi chuẩn hoá (đơn vị scene) */
const TARGET_SIZE = 2;

function PlaceholderModel() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Center>
      <mesh ref={meshRef} castShadow receiveShadow>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#F97316" roughness={0.4} metalness={0.1} />
      </mesh>
    </Center>
  );
}

function StlModel({ url, color }: { url: string; color: string }) {
  const geometry = useLoader(STLLoader, url);

  // Chuẩn hoá để mọi mô hình (1mm hay 300mm) đều vừa khung nhìn
  const scale = useMemo(() => {
    geometry.computeBoundingBox();
    geometry.computeVertexNormals();
    const size = new THREE.Vector3();
    geometry.boundingBox?.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return TARGET_SIZE / maxDim;
  }, [geometry]);

  return (
    <Center>
      {/* STL dùng trục Z hướng lên, three.js dùng trục Y */}
      <mesh
        geometry={geometry}
        scale={scale}
        rotation={[-Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      </mesh>
    </Center>
  );
}

/** Nếu file lỗi không đọc được thì hiển thị mô hình mẫu thay vì làm sập trang */
class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; resetKey?: string },
  { hasError: boolean; resetKey?: string }
> {
  state = { hasError: false, resetKey: this.props.resetKey };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  static getDerivedStateFromProps(
    props: { resetKey?: string },
    state: { hasError: boolean; resetKey?: string }
  ) {
    // Đổi file → thử render lại
    if (props.resetKey !== state.resetKey) {
      return { hasError: false, resetKey: props.resetKey };
    }
    return null;
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export function ModelViewer({ url, color = "#F97316" }: ModelViewerProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[3, 2, 3]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <ModelErrorBoundary fallback={<PlaceholderModel />} resetKey={url}>
          <Suspense fallback={null}>
            {url ? <StlModel url={url} color={color} /> : <PlaceholderModel />}
          </Suspense>
        </ModelErrorBoundary>
        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN,
          }}
        />
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.2, 0]}
          receiveShadow
        >
          <planeGeometry args={[10, 10]} />
          <shadowMaterial transparent opacity={0.2} />
        </mesh>
      </Canvas>
    </div>
  );
}
