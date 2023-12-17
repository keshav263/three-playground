"use client";
import { Canvas } from "@react-three/fiber";
import React from "react";
import styles from "./page.module.css";
import { OrbitControls, useTexture } from "@react-three/drei";
import Scene from "./Scene";
export default function page() {
	return (
		<div className={styles.container}>
			<Canvas>
				<OrbitControls />
				<Scene />
			</Canvas>
		</div>
	);
}
