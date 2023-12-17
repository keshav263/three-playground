"use client ";
import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

export default function BoxScene() {
	const boxRef = useRef();

	useFrame((state, delta, frame) => {
		// boxRef.current.rotation.y -= delta;
	});
	return (
		<>
			<directionalLight color="red" position={[0, 0, 5]} />
			<mesh ref={boxRef}>
				<boxGeometry />
				<meshStandardMaterial />
			</mesh>
		</>
	);
}
