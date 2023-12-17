"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import styles from "./page.module.css";
import { Environment, OrbitControls } from "@react-three/drei";
import BoxScene from "../components/BoxScene";
import SphereScene from "../components/SphereScene";
export default function page() {
	return (
		<div className={styles.container}>
			<Canvas>
				<Environment
					files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr"
					ground={{ height: 2, radius: 20, scale: 20 }}
				/>

				<OrbitControls />
				<BoxScene />
				<SphereScene />
			</Canvas>
		</div>
	);
}
