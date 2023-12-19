"use client";
import { Center, Text3D, useHelper, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
export default function Scene() {
	const texture = useTexture("/neon.png");
	const smoke = useTexture("/smoke.png");
	const lightRef = useRef();
	const neonMeshRef = useRef();
	const audioRef = useRef(new Audio("Stereo Love.mp3"));
	const { camera,raycaster,pointer } = useThree();
	const isAudioPlayingRef = useRef(false); //

	// useHelper(lightRef, THREE.DirectionalLightHelper, "blue",{color:"red"});

	const SmokeParticle = ({ position }) => {
		const particleRef = useRef();

		useFrame((state, delta) => {
			particleRef.current.rotation.z += Math.random() * delta * 0.1;
		});

		return (
			<mesh ref={particleRef} position={position}>
				{/* Use Smoke Texture */}
				<planeGeometry args={[300, 300]} />
				<meshLambertMaterial
					depthWrite={false}
					color={0x00dddd}
					transparent
					map={smoke}
				/>
			</mesh>
		);
	};

	useFrame((state, delta) => {});

	 const handleNeonClick = () => {
			if (isAudioPlayingRef.current) {
				// If audio is playing, stop it
				audioRef.current.pause();
			} else {
				// If audio is not playing, start playing it on a loop
				audioRef.current.loop = true;
				audioRef.current.play();
			}

			isAudioPlayingRef.current = !isAudioPlayingRef.current;
		};

	useFrame((state, delta) => {
		raycaster.setFromCamera(pointer, camera);

		// Check if the ray intersects with the neon mesh
		const intersects = raycaster.intersectObjects([neonMeshRef.current]);
		// If the mouse is over the neon mesh, update cursor style
		if (intersects.length > 0) {
			document.body.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="%2300dddd" width="30px" height="30px" viewBox="0 0 10.04 10.04"><circle cx="5.02" cy="5.02" r="4.52"/></svg>') 10 10, auto`;

		} else {
			document.body.style.cursor = "auto";
		}

		// Continuous camera movement only when audio is playing
		if (isAudioPlayingRef.current) {
			camera.position.z = Math.random() * 10 + 1050
			camera.updateProjectionMatrix();
		}
	});

	return (
		<>
			<directionalLight ref={lightRef} position={[-1, 0, 1]} intensity={1} />

			<mesh ref={neonMeshRef} position-z={800} onClick={handleNeonClick}>
				<planeGeometry args={[300, 300]} />
				<meshLambertMaterial
					color="#fff"
					transparent
					blending={THREE.AdditiveBlending}
					map={texture}
					depthWrite={false}
				/>
			</mesh>
			<Center position={[0, -150, 800]}>
				
					<Text3D
						curveSegments={32}
						bevelEnabled
						bevelSize={0.04}
						bevelThickness={0.1}
						height={0.5}
						lineHeight={0.5}
						letterSpacing={-0.06}
						size={20}
						font="/Inter_Bold.json"
					>
						{`Click music`}
						<meshNormalMaterial />
					</Text3D>
				
			</Center>

			{Array.from({ length: 100 }).map((_, index) => (
				<SmokeParticle
					key={index}
					position={[
						Math.random() * 500 - 250,
						Math.random() * 500 - 250,
						Math.random() * 1000 - 100,
					]}
				/>
			))}
		</>
	);
}
