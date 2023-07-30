import {
  useRef,
  useState,
  useEffect,
  Suspense,
  startTransition,
  lazy,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  Preload,
  Stats,
  Html,
  useProgress,
  useGLTF,
  useEnvironment,
  Environment,
  Clone,
  ScrollControls,
  useFBX,
} from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import { Navbar } from "./components/NavbarOld";
import { Camera } from "./components/Camera";
import { Loading } from "./components/Loading";
import { Ocean } from "./components/ornaments/Water";
import { CameraControls } from "./common/CameraControls";
import { Lights } from "./components/ornaments/Lights";
import { Leva } from "leva";
import { useHorizontalScroll } from "./common/useHorizontalScroll";
import YouTube from "react-youtube";
import { LandingComponent } from "./components/landingScreen/LandingScreen";
import { MappedModels } from "./common/Models";
import { ContentView } from "./components/catergories/ContentView";
import { SelectedCategory } from "./components/catergories/Main";
import { HorizontalNav } from "./components/nav/HorizontalNav";

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
  const [moveCameraToModel, setMoveCameraToModel] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [position, setPosition] = useState({ x: -30, y: 70, z: 195 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const [selectedIsland, setSelectedIsland] = useState(null);

  const cameraRef = useRef();
  const islandGroupRef = useRef();
  const scrollRef = useHorizontalScroll();

  const tl = useRef();
  const meshRef = useRef();

  if (isLanding)
    return (
      <LandingComponent
        setIsLanding={setIsLanding}
        setCategorySelected={setCategorySelected}
      />
    );

  const modelURL = "http://localhost:3080/in3d-tank/in3d-tank.gltf";

  // const in3dTexture = useLoader(TextureLoader, "/in3dlogo.png");

  // const shipModel = useGLTF("../assets/in3d-island/Island test .gltf");
  const tankModel = useGLTF(
    "/assets/in3d-tank/tank island material to gltf .gltf"
  );
  // const medicalModel = useGLTF("../assets/in3d-medical/Medical_Island.gltf");

  const envMap = useEnvironment({
    files: [
      "/static/images/right",

      "/static/images/left",
      "/static/images/top",
      "/static/images/bottom",
      "/static/images/front",
      "/static/images/back",
    ].map((n) => `${n}.png`),
  });

  return (
    <div className="overlay-black scene-bg-image">
      <Leva collapsed />
      <Canvas>
        <Suspense fallback={<LoaderComponent />}>
          <Lights />
          {/* <Environment map={envMap} background /> */}
          <Preload />
          <Camera
            cameraRef={cameraRef}
            tl={tl}
            islandGroupRef={islandGroupRef}
          />
          <CameraControls
            position={position}
            target={target}
            idx={selectedIsland}
          />
          <MappedModels
            position={position}
            setPosition={setPosition}
            setTarget={setTarget}
            target={target}
            selectedIsland={selectedIsland}
            tankModel={tankModel}
            islandGroupRef={islandGroupRef}
            meshRef={meshRef}
          />
          <Ocean position={[0, -6, 0]} />
        </Suspense>
      </Canvas>
      <HorizontalNav />
      <Navbar
        setCategorySelected={setCategorySelected}
        setPosition={setPosition}
        setTarget={setTarget}
        setSelectedIsland={setSelectedIsland}
        selectedIsland={selectedIsland}
      />
      {selectedIsland && <ContentView scrollRef={scrollRef} />}
    </div>
  );
}

export default App;

useGLTF.preload("/assets/in3d-tank/tank island material to gltf .gltf");
useGLTF.preload("/assets/in3d-medical/Medical_Island.gltf");
