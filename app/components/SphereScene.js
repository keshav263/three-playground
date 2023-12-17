"use client ";
import { Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

export default function SphereScene() {
	const boxRef = useRef();

	useFrame((state, delta, frame) => {
		// boxRef.current.rotation.y -= delta;
	});
	return (
		<>
			<directionalLight color="blue" position={[0, 0, 5]} />
			<mesh ref={boxRef} position={[-2, 0, 0]}>
				<sphereGeometry />
				<Sparkles count={100} scale={2} size={6} speed={0.4} />

				<meshPhysicalMaterial />
			</mesh>
		</>
	);
}
