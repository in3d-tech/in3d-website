import { useRef, useState, useEffect, Suspense, startTransition } from "react";
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
} from "@react-three/drei";
import { TextureLoader } from "three";
import { Navbar } from "./components/NavbarOld";
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
  const [position, setPosition] = useState({ x: -60, y: 90, z: 260 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const [selectedIsland, setSelectedIsland] = useState(null);

  const cameraRef = useRef();
  const islandGroupRef = useRef();

  const tl = useRef();
  const meshRef = useRef();

  // if (isLanding)
  //   return (
  //     <LandingComponent
  //       setIsLanding={setIsLanding}
  //       setCategorySelected={setCategorySelected}
  //     />
  //   );

  const in3dTexture = useLoader(TextureLoader, "/in3dlogo.png");

  // const shipModel = useGLTF("../assets/in3d-island/Island test .gltf");
  const tankModel = useGLTF(
    "/assets/in3d-tank/tank island material to gltf .gltf"
  );
  // const medicalModel = useGLTF("../assets/in3d-medical/Medical_Island.gltf");

  const positions = [
    [30, 20, -100],
    [0, 10, 0], // medicine
    [-100, 20, 60],
    [140, 20, 10],
    [80, 20, 110], //military
    [-120, 20, -70],
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
    const medicalModel = useGLTF("/assets/in3d-medical/Medical_Island.gltf");
    if (medicalModel.materials)
      medicalModel.materials.Medical_Hearty.transparent = true;
    return (
      <>
        <Clone
          ref={meshRef}
          object={medicalModel.scene}
          scale={2.5}
          position={position}
          onClick={(e) => onChange(1)}
          rotation={[0, Math.PI * 1.85, 0]}
          onPointerOver={(e) => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            document.body.style.cursor = "auto";
          }}
          // visible={!selectedIsland || selectedIsland == 1 ? true : false}
        />
        {/* <RotatingThing
          position={position} //{[2, 50, -2]}
          color="blue"
          intensity={2}
          distance={80}
          orbitalSpeed={1}
        /> */}
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
              visible={true}
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
            {selectedIsland && (
              <RotatingThing
                position={position} //{[2, 50, -2]}
                color="blue"
                intensity={2}
                distance={80}
                orbitalSpeed={1.5}
              />
            )}
          </group>
        )}
      </>
    );
  }

  const RotatingThing = ({
    position,
    color,
    intensity,
    orbitalOffset = 0,
    orbitalSpeed = 1,
  }) => {
    const ref = useRef();
    useFrame(() => {
      let date = 0; //Date.now() * orbitalSpeed * 0.0004 + orbitalOffset;
      ref.current.position.set(
        Math.cos(date) * 40 + position[0],
        20, //Math.sin(date) * 20 + position[1],
        Math.sin(date) * 30 + position[2]
      );
    });
    // const texture = useTexture("in3dlogo.png");
    return (
      <group position={position} ref={ref} rotation={[0, Math.PI / 2.4, 0]}>
        <sprite>
          <boxGeometry args={[0.01, 15, 15]} />
          <meshBasicMaterial map={in3dTexture} visible={true} opacity={1} />
        </sprite>
        {/* 
        <pointLight
          color={color}
          intensity={intensity}
          decay={2}
          distance={20}
        /> */}
      </group>
    );
  };

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
      position = { x: -14, y: 24, z: 68 }; // { x: 30, y: 10, z: 34 };
      target = { x: 30, y: 24, z: 33 };
    } else if (idx === 2) {
      position = { x: -150, y: 26, z: 18 };
      target = { x: -110, y: 20, z: 140 };
    } else if (idx === 3) {
      position = { x: 160, y: 25, z: -61 };
      target = { x: 0, y: 5, z: 10 };
    } else if (idx === 4) {
      position = { x: 0, y: 0, z: 0 };
      target = { x: 0, y: 0, z: 0 };
    } else if (idx === 5) {
      position = { x: -60, y: 90, z: 260 };
      target = { x: 0, y: 0, z: 0 };
    }
    setPosition(position);
    setTarget(target);
  }

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

  const graphicSlides = [1, 2, 3, 4, 5, 6, 7, 8];

  const thingy = graphicSlides.map((slide, idx) => {
    return (
      <div key={idx} className="slide">
        <img
          className="slide-content"
          src={"/img/in3dlogo.png"}
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0) 50%, rgba(0,0,0,0.65) 50%)",
          }}
        />
      </div>
    );
  });

  return (
    <div className="overlay-black scene-bg-image">
      <Canvas>
        <Suspense fallback={<LoaderComponent />}>
          <Lights />
          {/* <Environment map={envMap} background /> */}
          <Preload />
          {/* <perspectiveCamera /> */}
          <Camera
            cameraRef={cameraRef}
            tl={tl}
            islandGroupRef={islandGroupRef}
          />
          {/* <OrbitControls /> */}
          <CameraControls position={position} target={target} />
          <group dispose={null} ref={islandGroupRef}>
            {positions.map((p, i) => (
              <Model key={i} position={p} idx={i} />
            ))}
          </group>

          {/* <Ocean position={[0, -6, 0]} /> */}
          <Stats />
        </Suspense>
      </Canvas>
      <Navbar
        setCategorySelected={setCategorySelected}
        onChange={onChange}
        setSelectedIsland={setSelectedIsland}
      />
      {selectedIsland && (
        <div className="category-graphics-view">
          <div className="grid-container">{thingy}</div>
        </div>
      )}
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

  return navOpen ? null : (
    // <NavOpen handleNavClick={handleNavClick} toggleNavbar={toggleNavbar} />
    <div className="landing-screen-wrapper">
      <div
        className={
          newClass ? "landing-screen-nav-open" : "landing-screen-nav-btn"
        }
        onClick={() => {
          // setNewClass((prevState) => !prevState);
          startTransition(() => setIsLanding(false));
          // toggleNav);
        }}
      >
        Temporary Enter Button
        {/* Quick Explore */}
      </div>
      <div
        onClick={() => startTransition(() => setIsLanding(false))}
        className={`enter-btn`}
      >
        <img src="/in3dlogo.png" />
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

useGLTF.preload("/assets/in3d-tank/tank island material to gltf .gltf");
useGLTF.preload("/assets/in3d-medical/Medical_Island.gltf");
