import {
  useRef,
  useState,
  Suspense,
  lazy,
  useMemo,
  useEffect,
  memo,
} from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
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
import * as THREE from "three";
import { TextureLoader, AnimationMixer } from "three";
import { Navbar } from "./components/NavbarOld";
import { Camera } from "./components/Camera";
import { Ocean } from "./components/ornaments/Water";
import { CameraControls } from "./common/CameraControls";
import { Lights } from "./components/ornaments/Lights";
import { Leva } from "leva";
import { useHorizontalScroll } from "./common/useHorizontalScroll";
import YouTube from "react-youtube";
import { LandingComponent } from "./components/landingScreen/LandingScreen";
import { MappedModels } from "./common/Models";
import { ContentView } from "./components/catergories/ContentView";
import { HorizontalNav } from "./components/nav/HorizontalNav";
import AppContext from "./context/context";
import { HomePage } from "./components/HomePage";

// import { AnimationMixer } from "three-stdlib";

export const LoaderComponent = () => {
  const { active, progress, errors } = useProgress();

  return (
    <Html center>
      <span>{`${progress} % loaded`}</span>
    </Html>
  );
};

function App() {
  const [isLanding, setIsLanding] = useState(true);
  const [categorySelected, setCategorySelected] = useState(false);
  const [position, setPosition] = useState({ x: -9.5, y: 68, z: 278 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const [selectedIsland, setSelectedIsland] = useState(null);
  const [navState, setNavState] = useState(0);
  const [animate, setAnimate] = useState(false);

  const cameraRef = useRef();
  const islandGroupRef = useRef();
  const scrollRef = useHorizontalScroll();
  const tl = useRef();
  const meshRef = useRef();

  // const tankModel = useGLTF(
  //   "/assets/in3d-tank/tank island material to gltf .gltf"
  // );

  const tankModel = useGLTF("/assets/new-tank/tanky future new.gltf");

  function clone(fbx, texture) {
    const clone = fbx.clone(true);
    clone.traverse((node) => {
      if (node.isMesh) {
        node.geometry = node.geometry.clone();
        node.material = node.material.clone();
        node.material.map = texture;
      }
    });
    return clone;
  }

  const videoIds = [
    "9vA8qX_p11w",
    "enJ6be4qLMs",
    "Bj6KLv7kv2Q",
    "rVzJDgDnKLI",
    "mAEM5q5YFtg",
  ];

  return (
    <>
      <div
        className={`overlay-black scene-bg-image ${
          isLanding ? "" : "open-fade-in"
        }`}
      >
        <Leva collapsed />
        <AppContext.Provider
          value={{ navState, setNavState, animate, setAnimate }}
        >
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
          <HorizontalNav />
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
        </AppContext.Provider>
      </div>
      {isLanding && (
        <LandingComponent
          onEnter={() => setIsLanding(false)}
          started={isLanding}
        />
      )}
    </>
  );
}

export default App;

useGLTF.preload("/assets/new-tank/tanky future new.gltf");
useGLTF.preload("/assets/in3d-medical/Medical_Island.gltf");
