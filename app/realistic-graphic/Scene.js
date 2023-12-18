"use client";
import { useHelper, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
export default function Scene() {
	const radius = 1;
	const lightref = useRef();
	const anotherLightRef = useRef();

	useFrame((state, delta) => {
		lightref.current.intensity = 0 + Math.random() * 300;
		anotherLightRef.current.intensity = 550 + Math.random() * 100;
	});

	const texture = useTexture("/texture.jpeg");
	const metalTexture = useTexture("/metal-texture.jpeg");
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(6, 6);

	// useHelper(lightref, THREE.SpotLightHelper, "green");
	// useHelper(anotherLightRef, THREE.SpotLightHelper, "red");
	return (
		<>
			{/* <spotLight position={[3, 2, -50]} intensity={100000} color="#fff" /> */}
			<spotLight
				ref={lightref}
				castShadow
				position={[6, 8, -20]}
				intensity={500}
				color="rgb(145, 200, 255)"
			/>
			<spotLight
				ref={anotherLightRef}
				castShadow
				position={[-12, 6, -1]}
				intensity={500}
				color="rgb(255, 220, 180)"
			/>

			<mesh castShadow>
				<sphereGeometry args={[radius, 24, 24]} />
				<meshStandardMaterial
					roughnessMap={metalTexture}
					bumpMap={metalTexture}
					bumpScale={0.01}
					roughness={0.75}
					metalness={0.25}
					color="#fff"
				/>
			</mesh>
			<mesh receiveShadow position={[0, -radius, 0]} rotation-x={Math.PI / 2}>
				<planeGeometry args={[50, 50]} />
				<meshStandardMaterial
					map={texture}
					bumpMap={texture}
					bumpScale={0.1}
					roughness={0.65}
					metalness={0.75}
					side={THREE.DoubleSide}
					color="#fff"
				/>
			</mesh>
			{/* <axesHelper args={[20]} /> */}
		</>
	);
}
