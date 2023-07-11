import {
  useRef,
  useState,
  useEffect,
  Suspense,
  startTransition,
  useLayoutEffect,
} from "react";
import {
  Canvas,
  useFrame,
  useLoader,
  useThree,
  extend,
} from "@react-three/fiber";
import {
  OrbitControls,
  Stars,
  Preload,
  Stats,
  Html,
  useProgress,
  useFBX,
  useTexture,
  useAnimations,
  useGLTF,
  ScrollControls,
} from "@react-three/drei";
import {
  CubeTextureLoader,
  DoubleSide,
  TextureLoader,
  FogExp2,
  MeshLambertMaterial,
  MeshBasicMaterial,
  MeshStandardMaterial,
  CustomToneMapping,
  BoxGeometry,
  PerspectiveCamera,
} from "three";
import { NavOpen, Navbar } from "./components/NavbarOld";
import { Moon } from "./components/Moon";
import { Camera } from "./components/Camera";
import { SelectedCategory } from "./components/catergories/Main";
import { Loading } from "./components/Loading";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Ocean } from "./components/ornaments/Water";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
extend({ ScrollTrigger });

function moveCamera(cameraRef) {
  const proxy = { scroll: 0 };
  const ctx = document.body.getElementsByTagName("canvas")[0];

  gsap.to(proxy, {
    scroll: 1,
    scrollTrigger: {
      trigger: ctx,
      scrub: true,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const { progress } = self;
        const xCoordinate = progress * 100;
        gsap.to(cameraRef.current.position, {
          x: xCoordinate,
          duration: 0.5,
          ease: "power1.inOut",
        });
      },
    },
  });
}

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

  const cameraRef = useRef();
  const islandGroupRef = useRef();

  const tl = useRef();
  useEffect(() => {
    if (!isLanding)
      gsap.to(cameraRef.current?.position, {
        scrollTrigger: {
          start: "top top", // when the top of the element hits the top of the viewport
          end: "bottom bottom", // end after scrolling 500px beyond the start
          scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
          trigger: window,
          invalidateOnRefresh: true,
          markers: true,
        },
        x: (index) => positions[index][0], // function taking the index, returning the corresponding position
        y: (index) => positions[index][1],
        z: (index) => positions[index][2],
        duration: 2,
        ease: "power1.inOut",
      });
  }, [isLanding]);
  if (isLanding)
    return (
      <LandingComponent
        setIsLanding={setIsLanding}
        setCategorySelected={setCategorySelected}
      />
    );

  const moonTexture = useLoader(TextureLoader, "../img/moon.png");

  const shipModel = useGLTF("../assets/in3d-island/Island test .gltf");
  gsap.registerPlugin(ScrollTrigger);

  const positions = [
    [30, 20, -200],
    [0, 20, 0],
    [80, 20, 110],
    [140, 20, -60],
    [-100, 20, 140],
  ];

  function Model({ position, idx }) {
    const [isHovered, setIsHovered] = useState(false);

    // const clone = shipModel.scene.clone();
    const [shipClone, setShipClone] = useState(null);
    const [selectedIsland, setSelectedIsland] = useState(null);

    useEffect(() => {
      if (shipModel.scene) {
        setShipClone(shipModel.scene.clone());
      }
    }, [shipModel]);

    return (
      <>
        {isHovered && <pointLight color={"red"} position={position} />}
        {shipClone && (
          <group>
            <primitive
              object={shipClone}
              position={position}
              children-0-castShadow
              rotation={[0, Math.PI, 0]}
              scale={[0.6, 0.7, 0.7]}
              onPointerOver={(e) => {
                setIsHovered(true);
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "auto";
                setIsHovered(false);
              }}
            />
            <mesh position={[position[0], position[1] + 13, position[2]]}>
              <boxGeometry args={[8, 8, 8]} />
              <meshBasicMaterial color={"orange"} />
            </mesh>
            {selectedIsland && (
              <Camera
                isFromIslands
                selectedIsland={selectedIsland}
                position={[0, 0, 0]}
                setSelectedIsland={setSelectedIsland}
                cameraRef={cameraRef}
              />
            )}
          </group>
        )}
      </>
    );
  }

  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const textureBox = loader.load(
    [
      "/images/right.png", //front
      "/images/left.png", // back
      "/images/top.png", //top
      "/images/bottom.png", //bottom
      "/images/front.png", // left
      "/images/back.png", //right
    ],
    function (gltf) {},
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
    }
  );

  function SkyBox({ shipModel }) {
    const { scene } = useThree();
    // scene.fog = new FogExp2("#545454", 0.005);
    scene.background = shipModel;

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

  function CameraHelper() {
    const camera = new PerspectiveCamera();
    return (
      <group>
        <cameraHelper args={[camera]} />
      </group>
    );
  }

  return (
    <div className="overlay-black">
      <Canvas>
        <Suspense fallback={<LoaderComponent />}>
          <SkyBox shipModel={textureBox} />
          <Preload />
          <Moon moonTexture={moonTexture} DoubleSide={DoubleSide} />
          <perspectiveCamera />
          <Camera
            moveCameraToModel={moveCameraToModel}
            setMoveCameraToModel={setMoveCameraToModel}
            cameraRef={cameraRef}
            tl={tl}
            islandGroupRef={islandGroupRef}
          />
          <CameraHelper />
          {/* <ambientLight intensity={0.5} /> */}

          {/* <Stars /> */}
          {/* <Sky sunPosition={[0.2, 0, 0]} /> */}

          <spotLight
            position={[0, 25, 0]}
            angle={1.3}
            penumbra={1}
            castShadow
            intensity={2}
            shadow-bias={-0.0001}
          />
          {/* <pointLight position={[5, 10, 0]} intensity={1.4} /> */}
          <directionalLight position={[-5, 10, 0]} intensity={0.6} />

          {/* <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} /> */}

          <OrbitControls />

          <ScrollControls pages={6} damping={0.1}>
            <group dispose={null} ref={islandGroupRef}>
              {positions.map((p, i) => (
                <Model key={i} position={p} idx={i} />
              ))}
            </group>
          </ScrollControls>

          <Ocean position={[0, -6, 0]} />
          <Stats />

          <Navbar setCategorySelected={setCategorySelected} />
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
        {/* <div className="landing-screen-enter-btn">
          <a className="link-btn" href="#" ref={btnRef}>
            <i className="link-smtng"></i>
            <i className="link-smtng"></i>
            <span className="link-span">Explore</span>
          </a>
        </div> */}
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
