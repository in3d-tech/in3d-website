import { useRef, useState, Suspense, lazy, useMemo, useEffect } from "react";
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
import { TextureLoader, AnimationMixer } from "three";
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
import { HorizontalNav } from "./components/nav/HorizontalNav";
import AppContext from "./context/context";

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
  const [moveCameraToModel, setMoveCameraToModel] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [position, setPosition] = useState({ x: -30, y: 70, z: 220 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const [selectedIsland, setSelectedIsland] = useState(null);
  const [navState, setNavState] = useState(0);
  const [tileHovered, setTileHovered] = useState(false);

  const cameraRef = useRef();
  const islandGroupRef = useRef();
  const scrollRef = useHorizontalScroll();

  const tl = useRef();
  const meshRef = useRef();

  // if (isLanding) return <LandingComponent setIsLanding={setIsLanding} />;

  const tankModel = useGLTF(
    "/assets/in3d-tank/tank island material to gltf .gltf"
  );

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

  // function Floor() {
  //   let hexagons = [];

  //   for (let i = -10; i < 10; i++) {
  //     for (let j = -10; j < 10; j++) {
  //       const offset = j % 2 === 0 ? 0 : 6 * Math.sqrt(3); // offset every other row
  //       hexagons.push(
  //         <TileModel
  //           key={`${i}-${j}`}
  //           position={[i * 20 + offset, 0, j * 20]} // adjust position values
  //         />
  //       );
  //     }
  //   }

  //   return <group>{hexagons}</group>;
  // }

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

  // function TileModel(props) {
  //   const fbx = useFBX("/assets/Hexagon Tile.fbx");

  //   // clone the fbx model
  //   const fbxClone = useMemo(() => clone(fbx), [fbx]);

  //   const mixer = useRef(new AnimationMixer(fbxClone));
  //   const action = mixer.current.clipAction(fbxClone.animations[0]);
  //   action.play();
  //   if (tileHovered) useFrame((state, delta) => mixer.current.update(delta));

  //   return (
  //     <primitive
  //       object={fbxClone}
  //       {...props}
  //       scale={23}
  //       onClick={() => setTileHovered(!tileHovered)}
  //       onMouseOver={() => console.log("sdfAS:DFLJd;sfj")}
  //     />
  //   );
  // }

  function TileModel(props) {
    const fbx = useFBX("/public/assets/Hex rotate.fbx");
    const texture = useLoader(
      TextureLoader,
      "/public/assets/hexagon-texture.png"
    );

    // clone the fbx model
    const fbxClone = useMemo(() => clone(fbx, texture), [fbx, texture]);

    const mixer = useRef(new AnimationMixer(fbxClone));
    const action = mixer.current.clipAction(fbxClone.animations[0]);
    action.play();
    useFrame((state, delta) => mixer.current.update(delta));

    return (
      <primitive
        object={fbxClone}
        {...props}
        scale={30}
        position={[0, -6, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    );
  }

  return isLanding ? (
    <LandingComponent setIsLanding={setIsLanding} />
  ) : (
    <div className="overlay-black scene-bg-image">
      <Leva collapsed />
      <AppContext.Provider value={{ navState, setNavState }}>
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
            {/* <Floor /> */}
            <TileModel />
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
            {/* <Ocean position={[0, -6, 0]} /> */}
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
      </AppContext.Provider>
    </div>
  );
}

export default App;

useGLTF.preload("/assets/in3d-tank/tank island material to gltf .gltf");
useGLTF.preload("/assets/in3d-medical/Medical_Island.gltf");
