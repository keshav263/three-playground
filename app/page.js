"use client";
import {
	Center,
	Environment,
	Html,
	OrbitControls,
	Sparkles,
	Text3D,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
export default function Home() {
	const router = useRouter();
	return (
		<main className={styles.main}>
			<Canvas>
				<Environment files="/env/alpha mayoris.hdr" background />
				<OrbitControls enableZoom={false} enableRotate={false} />
				{/* <ambientLight intensity={1} />
				<directionalLight color="red" position={[0, 0, 5]} />
				<mesh>
					<boxGeometry />
					<meshStandardMaterial side={THREE.DoubleSide} color="red" />
				</mesh> */}
				<Center top rotation={[-0.5, 0, 0]}>
					<Text3D
						// position={[0, 0, 0]}
						curveSegments={32}
						bevelEnabled
						bevelSize={0.04}
						bevelThickness={0.1}
						height={0.5}
						lineHeight={0.5}
						letterSpacing={-0.06}
						size={0.8}
						font="/Inter_Bold.json"
					>
						{`Threejs \n Playground`}
						<meshNormalMaterial />
					</Text3D>
				</Center>
				<Html position={[0, -0.5, 0]}>
					<div className={styles.buttonContainer}>
						<button
							onClick={() => {
								router.push("/virtual-globe");
							}}
							className={styles.button}
						>
							Globe
						</button>

						<button
							onClick={() => {
								router.push("/realistic-graphic");
							}}
							className={styles.button}
						>
							Realistic Graphic
						</button>
						<button
							onClick={() => {
								router.push("/text-animation");
							}}
							className={styles.button}
						>
							Text Animation
						</button>
					</div>
				</Html>
			</Canvas>
		</main>
	);
}
