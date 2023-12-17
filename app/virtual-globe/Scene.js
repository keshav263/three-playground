"use client";
import { Center, Text, Text3D, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
export default function Scene() {
	const texture = useTexture("/earth.jpeg");
	const [previousPointerPosition, setPreviousPointerPosition] = useState({
		x: window.innerWidth / 2,
		y: window.innerHeight / 2,
	});

	const globeRef = useRef();

	const textGroupRef = useRef();

	// useFrame((state, delta) => {
	// 	textGroupRef.current.rotation.y += delta * 0.05;
	// });

	useEffect(() => {
		const handleKeyDown = (event) => {
			const speed = 0.02; // Adjust the rotation speed as needed
			switch (event.key) {
				case "ArrowUp":
					globeRef.current.rotation.x += speed;
					break;
				case "ArrowDown":
					globeRef.current.rotation.x -= speed;
					break;
				case "ArrowLeft":
					globeRef.current.rotation.y += speed;
					break;
				case "ArrowRight":
					globeRef.current.rotation.y -= speed;
					break;
				default:
					break;
			}
		};

		// Add event listeners for keydown
		window.addEventListener("keydown", handleKeyDown);

		// Remove event listeners on component unmount
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		const handlePointerMove = (event) => {
			const { clientX, clientY } = event;

			const moveX = clientX - previousPointerPosition.x;
			const moveY = clientY - previousPointerPosition.y;

			// Invert the direction of rotation for the Y-axis
			globeRef.current.rotation.y += moveX * 0.0025;
			globeRef.current.rotation.x += moveY * 0.0025; // Invert the direction

			setPreviousPointerPosition({ x: clientX, y: clientY });
		};

		window.addEventListener("mousemove", handlePointerMove);

		return () => {
			window.removeEventListener("mousemove", handlePointerMove);
		};
	}, [previousPointerPosition]);

	const createTextGeometry = (text, size, height, curveSegments) => {
		const textGeometry = new THREE.BufferGeometry(text, {
			font: "/Inter_Bold.json", // Replace with the path to your font file
			size,
			height,
			curveSegments,
			bevelEnabled: true,
			bevelThickness: 0.1,
			bevelSize: 0.04,
			bevelSegments: 3,
		});

		// Center the text geometry
		textGeometry.center();

		return textGeometry;
	};

	useEffect(() => {
		const textGeometry = createTextGeometry(
			"Random Geomertyr",
			1, // Size of the text
			0.1, // Height of the text
			32 // Curve segments
		);

		const textMaterial = new THREE.MeshNormalMaterial();
		const textMesh = new THREE.Mesh(textGeometry, textMaterial);

		// Adjust the position of the text mesh to be on the surface of the sphere
		textMesh.position.set(0, 0, 15);

		// Add the text mesh to the text group
		textGroupRef.current.add(textMesh);
	}, []);

	return (
		<>
			{/* <pointLight color="#fff" position={[1, 1, 1]} /> */}
			<group position={[0, 0, -20]} ref={globeRef}>
				<mesh>
					<sphereGeometry args={[15, 50, 50]} />
					<meshBasicMaterial map={texture} />
				</mesh>
				<Center position={[0, 0, 15]}>
					<Text3D
						curveSegments={32}
						bevelEnabled
						bevelSize={0.04}
						bevelThickness={0.1}
						height={0.5}
						lineHeight={0.5}
						letterSpacing={-0.06}
						size={1.2}
						font="/Inter_Bold.json"
					>
						{"Virtual \n Globe"}
						<meshNormalMaterial />
					</Text3D>
				</Center>
			</group>
			<group ref={textGroupRef}></group>
		</>
	);
}
