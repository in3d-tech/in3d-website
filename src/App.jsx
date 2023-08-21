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
  const [position, setPosition] = useState({ x: -30, y: 90, z: 220 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const [selectedIsland, setSelectedIsland] = useState(null);
  const [navState, setNavState] = useState(0);
  const [tileHovered, setTileHovered] = useState(false);

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

  const TileModel = memo((props) => {
    const fbx = useFBX("/assets/Hexagon Tile long animation.fbx");
    // const fbx = useFBX("/assets/Hexagon Tile Scale.fbx");

    // clone the fbx model
    const fbxClone = useMemo(() => clone(fbx), [fbx]);

    const [mixer] = useState(() => new AnimationMixer(fbxClone));
    const [action] = useState(() => mixer.clipAction(fbxClone.animations[0]));

    useEffect(() => {
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.play();

      // Cleanup function to stop animation when component unmounts
      return () => action.stop();
    }, []); // Empty dependency array ensures this runs once on mount

    useFrame((state, delta) => mixer.update(delta));

    console.log({ fbxClone: fbxClone.uuid });

    return (
      <group>
        <primitive
          object={fbxClone}
          {...props}
          scale={10} //{30}
          position={[0, -6, 0]}
          rotation={[0, 0, 0]} //{[-0.1, -0.05, 3]} //{[Math.PI / 2, 0, 0]}
        />
      </group>
    );
  });

  // const positions = [
  //   [-60, 10, 10],
  //   [10, 10, 30], // medicine
  //   [-160, 10, 60], // mil
  //   [80, 10, 60],
  //   [120, 10, 110], //military
  //   [-120, 10, 20],
  // ];

  // const RaisedTile = memo((props) => {
  //   const fbx = useFBX("/assets/Hexagon Tile Scale.fbx");
  //   // const fbx = useFBX("/assets/Hexagon Tile Scale.fbx");

  //   // clone the fbx model
  //   const fbxClone = useMemo(() => clone(fbx), [fbx]);

  //   const [mixer] = useState(() => new AnimationMixer(fbxClone));
  //   const [action] = useState(() => mixer.clipAction(fbxClone.animations[0]));

  //   useEffect(() => {
  //     action.setLoop(THREE.LoopOnce);
  //     action.clampWhenFinished = true;
  //     action.play();

  //     // Cleanup function to stop animation when component unmounts
  //     return () => action.stop();
  //   }, []); // Empty dependency array ensures this runs once on mount

  //   useFrame((state, delta) => mixer.update(delta));

  //   console.log({ fbxClone: fbxClone.uuid });

  //   return (
  //     <group>
  //       <primitive
  //         object={fbxClone}
  //         {...props}
  //         scale={20} //{30}
  //         position={props.pos}
  //         // position={[0, 20, 0]}
  //         rotation={[0, 0, 0]} //{[-0.1, -0.05, 3]} //{[Math.PI / 2, 0, 0]}
  //       />
  //     </group>
  //   );
  // });

  // const things = positions.map((item, idx) => {
  //   return <RaisedTile pos={item} />;
  // });

  const videoIds = [
    "9vA8qX_p11w",
    "enJ6be4qLMs",
    "Bj6KLv7kv2Q",
    "rVzJDgDnKLI",
    "mAEM5q5YFtg",
  ];

  return isLanding ? (
    <LandingComponent setIsLanding={setIsLanding} />
  ) : (
    <div className="overlay-black scene-bg-image">
      <Leva collapsed />
      <AppContext.Provider value={{ navState, setNavState }}>
        <Canvas>
          <Suspense fallback={<LoaderComponent />}>
            {/* <Environment background preset="park" /> */}
            <Stars
              count={5000}
              depth={150}
              factor={4}
              saturation={5}
              radius={50}
              fade={true}
              speed={0.7}
            />
            {/* <Stars
              count={2000}
              depth={50}
              factor={4}
              saturation={5}
              radius={50}
              fade={true}
              speed={0.7}
            /> */}

            <Lights />

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
              clone={clone}
            />
            <Ocean position={[0, -10, 0]} />
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
        {selectedIsland && (
          <ContentView scrollRef={scrollRef} videoIds={videoIds} />
        )}
      </AppContext.Provider>
    </div>
  );
}

export default App;

useGLTF.preload("/assets/in3d-tank/tank island material to gltf .gltf");
useGLTF.preload("/assets/in3d-medical/Medical_Island.gltf");
