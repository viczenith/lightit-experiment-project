import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export function Beaker({ position, onClick }) {
  const mesh = useRef();
  
  useFrame(() => {
    mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh 
      ref={mesh} 
      position={position}
      onClick={onClick}
      castShadow
    >
      <cylinderGeometry args={[0.5, 0.7, 1, 32]} />
      <meshStandardMaterial color="#e0e0e0" transparent opacity={0.8} />
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Beaker
      </Text>
    </mesh>
  );
}

export function BunsenBurner({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 32]} />
        <meshStandardMaterial color="#a0a0a0" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.2, 0.4]} />
        <meshStandardMaterial color="#808080" />
      </mesh>
      <Text
        position={[0, 1, 0]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Burner
      </Text>
    </group>
  );
}