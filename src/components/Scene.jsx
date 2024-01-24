import { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Preload,
  Stats,
  Html,
  useProgress,
  useGLTF,
  useEnvironment,
  Environment,
  useFBX,
  Stars,
  Sparkles,
} from "@react-three/drei";
import { HomePage } from "./HomePage";
import { Navbar } from "./NavbarOld";
import { ContentView } from "./catergories/ContentView";
import { useHorizontalScroll } from "../common/useHorizontalScroll";

export function Scene({ isLanding }) {
  const [categorySelected, setCategorySelected] = useState(false);
  const [position, setPosition] = useState({ x: -9.5, y: 68, z: 278 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const [selectedIsland, setSelectedIsland] = useState(null);
  const [navState, setNavState] = useState(0);
  const [animate, setAnimate] = useState(false);

  const tankModel = useGLTF("/assets/new-tank/tanky future new.gltf");
  const scrollRef = useHorizontalScroll();
  const videoIds = [
    "9vA8qX_p11w",
    "enJ6be4qLMs",
    "Bj6KLv7kv2Q",
    "rVzJDgDnKLI",
    "mAEM5q5YFtg",
  ];
  return (
    <>
      <Canvas>
        <Stats />
        <Suspense fallback={null}>
          {!isLanding && (
            <HomePage
              position={position}
              setPosition={setPosition}
              target={target}
              selectedIsland={selectedIsland}
              setTarget={setTarget}
              tankModel={tankModel}
            />
          )}
        </Suspense>
        <Preload />
      </Canvas>
      <Navbar
        setCategorySelected={setCategorySelected}
        setPosition={setPosition}
        setTarget={setTarget}
        setSelectedIsland={setSelectedIsland}
        selectedIsland={selectedIsland}
      />
      {selectedIsland && (
        <ContentView scrollRef={scrollRef} videoIds={videoIds} />
      )}
    </>
  );
}
