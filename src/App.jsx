import { useRef, useState, useEffect, Suspense, startTransition } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  Stats,
  Html,
  useProgress,
  useFBX,
  useTexture,
  useAnimations,
  useGLTF,
  useEnvironment,
  Environment,
  Clone,
  Backdrop,
} from "@react-three/drei";
import { TextureLoader, FogExp2 } from "three";
import { Navbar } from "./components/NavbarOld";
// import { Moon } from "./components/Moon";
import { Camera } from "./components/Camera";
import { SelectedCategory } from "./components/catergories/Main";
import { Loading } from "./components/Loading";
import { Ocean } from "./components/ornaments/Water";
import { CameraControls } from "./common/CameraControls";
import { Lights } from "./components/ornaments/Lights";

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
  const [position, setPosition] = useState({ x: 266, y: 112, z: -5 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });

  const cameraRef = useRef();
  const islandGroupRef = useRef();

  const tl = useRef();

  if (isLanding)
    return (
      <LandingComponent
        setIsLanding={setIsLanding}
        setCategorySelected={setCategorySelected}
      />
    );

  // const moonTexture = useLoader(TextureLoader, "../img/moon.png");
  // const in3dTexture = useLoader(TextureLoader, "../img/in3dlogo.png");

  // const shipModel = useGLTF("../assets/in3d-island/Island test .gltf");
  const tankModel = useGLTF(
    "../assets/in3d-tank/tank island material to gltf .gltf"
  );
  // const medicalModel = useGLTF("../assets/in3d-medical/Medical_Island.gltf");

  const positions = [
    [30, 20, -200],
    [0, 10, 0],
    [80, 20, 110],
    [140, 20, -60],
    [-100, 20, 140],
    [-70, 20, -90],
  ];

  // function TankModel({ position, idx }) {
  //   const { scene } = useGLTF(
  //     "../assets/in3d-tank/tank island material to gltf .gltf"
  //   );
  //   return (
  //     <>
  //       {/* <spotLight intensity={1.5} color={"blue"} position={position} /> */}
  //       <Clone
  //         object={scene}
  //         scale={2.5}
  //         position={position}
  //         onClick={() => onChange(idx)}
  //         rotation={[0, Math.PI * 1.85, 0]}
  //       />
  //     </>
  //   );
  // }
  function MedicalModel({ position, idx }) {
    const thing = useGLTF("../assets/in3d-medical/Medical_Island.gltf");
    console.log(thing);
    thing.materials.Medical_Hearty.transparent = true;
    return (
      <>
        {/* <spotLight intensity={1.5} color={"blue"} position={position} /> */}
        <Clone
          object={thing.scene}
          scale={2.5}
          position={position}
          onClick={(e) => console.log(e)}
          rotation={[0, Math.PI * 1.85, 0]}
        />
      </>
    );
  }

  function Model({ position, idx }) {
    const [isHovered, setIsHovered] = useState(false);
    const [shipClone, setShipClone] = useState(null);
    const [selectedIsland, setSelectedIsland] = useState(null);

    useEffect(() => {
      if (tankModel.scene) {
        setShipClone(tankModel.scene.clone());
      }
    }, [tankModel]);

    if (idx == 1) {
      return <MedicalModel position={position} idx={idx} />;
    }

    return (
      <>
        {/* {isHovered && (
          <pointLight color={"red"} intensity={0.5} position={position} />
        )} */}
        {shipClone && (
          <group>
            <primitive
              object={shipClone}
              position={position}
              children-0-castShadow
              rotation={[0, Math.PI, 0]}
              scale={[2.5, 2.5, 2.5]}
              onClick={() => {
                console.log(idx);
                // onChange(idx);
              }}
              onPointerOver={(e) => {
                setIsHovered(true);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto";
                setIsHovered(false);
              }}
            />
            {selectedIsland && <Camera />}
            {/* {selectedIsland && (
              <RotatingThing
                position={position} //{[2, 50, -2]}
                color="blue"
                intensity={2}
                distance={80}
                orbitalSpeed={1.5}
              />
            )} */}
          </group>
        )}
      </>
    );
  }

  // const RotatingThing = ({
  //   position,
  //   color,
  //   intensity,
  //   orbitalOffset = 0,
  //   orbitalSpeed = 1,
  // }) => {
  //   const ref = useRef();
  //   useFrame(() => {
  //     let date = Date.now() * orbitalSpeed * 0.0007 + orbitalOffset;
  //     ref.current.position.set(
  //       Math.cos(date) * 40 + position[0],
  //       0, //Math.sin(date) * 20 + position[1],
  //       Math.sin(date) * 30 + position[2]
  //     );
  //   });
  //   // const texture = useTexture("in3dlogo.png");
  //   return (
  //     <group position={position} ref={ref} rotation={[0, Math.PI / 1.4, 0]}>
  //       <sprite>
  //         <boxGeometry args={[0.01, 15, 15]} />
  //         <meshBasicMaterial map={in3dTexture} visible={true} />
  //       </sprite>

  //       <pointLight
  //         color={color}
  //         intensity={intensity}
  //         decay={2}
  //         distance={20}
  //       />
  //     </group>
  //   );
  // };

  function BasicFog() {
    const { scene } = useThree();
    scene.fog = new FogExp2("#545454", 0.005);

    return null;
  }

  if (categorySelected) {
    try {
      return (
        <Suspense fallback={<Loading />}>
          <SelectedCategory
            setCategorySelected={setCategorySelected}
            categorySelected={categorySelected}
          />
        </Suspense>
      );
    } catch (e) {
      console.log(e);
    }
  }

  function onChange(idx = 0) {
    let position = { x: 24.6, y: 25.4, z: -222 };
    let target = { x: 0, y: 0, z: 0 };
    if (idx === 1) {
      position = { x: -22.4, y: 19, z: -37 };
      target = { x: 0, y: 10, z: 0 };
    } else if (idx === 2) {
      position = { x: 5, y: 20, z: 45 };
      target = { x: 0, y: 7, z: 10 };
    } else if (idx === 3) {
      position = { x: 160, y: 25, z: -61 };
      target = { x: 0, y: 5, z: 10 };
    } else if (idx === 4) {
      position = { x: 0, y: 0, z: 0 };
      target = { x: 0, y: 0, z: 0 };
    } else if (idx === 5) {
      position = { x: 266, y: 112, z: -5 };
      target = { x: 0, y: 0, z: 0 };
    }
    setPosition(position);
    setTarget(target);
  }

  const envMap = useEnvironment({
    files: [
      "/images/right",
      "/images/left",
      "/images/top",
      "/images/bottom",
      "/images/front",
      "/images/back",
    ].map((n) => `${n}.png`),
  });

  return (
    <div className="overlay-black">
      <Canvas>
        <Suspense fallback={<LoaderComponent />}>
          <Lights />
          {/* <BasicFog /> */}
          <Environment map={envMap} background />
          <Preload />
          {/* <Moon moonTexture={moonTexture} DoubleSide={DoubleSide} /> */}
          <perspectiveCamera />
          <Camera
            cameraRef={cameraRef}
            tl={tl}
            islandGroupRef={islandGroupRef}
          />

          {/* <Backdrop
            receiveShadow
            floor={20.5} // Stretches the floor segment, 0.25 by default
            segments={100} // Mesh-resolution, 20 by default
            scale={[900, 100, 600]}
            position={[4, -10, 0]}
          >
            <meshStandardMaterial color="#0a1a1f" opacity={1} />
          </Backdrop> */}
          {/* <OrbitControls /> */}
          <CameraControls position={position} target={target} />
          <group dispose={null} ref={islandGroupRef}>
            {positions.map((p, i) => (
              <Model key={i} position={p} idx={i} />
            ))}
          </group>

          {/* <Ocean position={[0, -6, 0]} /> */}
          <Stats />

          <Navbar
            setCategorySelected={setCategorySelected}
            onChange={onChange}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;

function LandingComponent({ setIsLanding, setCategorySelected }) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [newClass, setNewClass] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const btnRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationComplete(true);
    }, 5000); // Adjust the duration as needed

    return () => clearTimeout(timeout);
  }, []);

  const toggleNavbar = () => {
    console.log({ newClass });
    setNewClass((prevState) => !prevState);

    setTimeout(
      () => setNavOpen((prevState) => !prevState),
      navOpen ? 100 : 800
    );
  };

  const handleNavClick = (ref, label) => {
    setCategorySelected(label);
  };

  return navOpen ? (
    <NavOpen handleNavClick={handleNavClick} toggleNavbar={toggleNavbar} />
  ) : (
    <div className="landing-screen-wrapper">
      <div
        className={
          newClass ? "landing-screen-nav-open" : "landing-screen-nav-btn"
        }
        onClick={() => {
          // setNewClass((prevState) => !prevState);

          toggleNavbar();
        }}
      >
        Quick Explore
      </div>
      <div
        onClick={() => startTransition(() => setIsLanding(false))}
        className={`enter-btn`}
      >
        <img src="../img/in3dlogo.png" />
      </div>
      <div className="animation-container">
        <span className="animation-letter">I</span>
        <span className="animation-letter">n</span>
        <span className="animation-letter">3</span>
        <span className="animation-letter">D</span>
        <span className="animation-letter">-</span>
        <span className="animation-letter">T</span>
        <span className="animation-letter">e</span>
        <span className="animation-letter">c</span>
        <span className="animation-letter">h</span>
      </div>
    </div>
  );
}

useGLTF.preload("../assets/in3d-island/Island test .gltf");

function SuzanneFBX({ position }) {
  let fbx = useFBX("/assets/in3d-medical-model/DNA_01.fbx");
  const { nodes, materials, animations } = fbx;
  const { actions } = useAnimations(animations, fbx);
  console.log({ fbx });
  let fbxTexture = useTexture(
    "/assets/in3d-medical-model/DNA Strand_baseColor.png"
    // "/assets/in3d-medical-model/DNA Strand_normal.png",
    // "/assets/in3d-medical-model/DNA Strand_occlusionRoughnessMetallic.png"
  );
  fbx.traverse((child) => {
    if (child.isMesh) {
      child.material.map = fbxTexture;
    }
  });
  console.log({ nodes });
  console.log({ materials });
  console.log({ animations });
  return null;
  return (
    <group position={position} dispose={null}>
      {/* Once the model is loaded, start animation */}
      <primitive
        onClick={() => {
          console.log({ nodes });
          console.log({ animations });
          console.log({ materials });
        }}
        object={nodes}
        // material={materials["Texture.Material"]}
      />
    </group>
  );
}
