import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Sky,
  Sparkles,
  Backdrop,
  Float,
  Ring,
  Stars,
} from "@react-three/drei";
import { CubeTextureLoader, DoubleSide, TextureLoader, FogExp2 } from "three";
import { NavOpen, Navbar } from "./components/NavbarOld";
import { Moon } from "./components/Moon";
import { Camera } from "./components/Camera";
import { SelectedCategory } from "./components/catergories/Main";
import { Loading } from "./components/Loading";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function App() {
  const [rotateCamera, setRotateCamera] = useState(false);
  const [selectedNav, setSelectedNav] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [isLanding, setIsLanding] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [moveCameraToModel, setMoveCameraToModel] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);

  const texture = useLoader(TextureLoader, "../img/in3dlogo.png");
  const moonTexture = useLoader(TextureLoader, "../img/moon.png");

  const shipModel = useLoader(
    GLTFLoader,
    "../assets/in3d-island/Island test .gltf"
  );

  console.count("app load");

  if (isLanding)
    return (
      <LandingComponent
        setIsLanding={setIsLanding}
        setSelectedNav={setSelectedNav}
        setCategorySelected={setCategorySelected}
      />
    );
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

  function SkyBox() {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    const texture = loader.load([
      "/images/right.png", //front
      "/images/left.png", // back -right
      "/images/top.png", //top - right
      "/images/bottom.png", //bottom
      "/images/front.png", // left
      "/images/back.png", //right -- right
    ]);

    // Set the scene background property to the resulting texture.
    scene.fog = new FogExp2("#545454", 0.005);
    scene.background = texture;
    return null;
  }

  // const skybox = useCubeTexture(
  //   ["back.png", "bottom.png", "front.png", "left.png", "right.png", "top.png"],
  //   { path: "/assets/in3d-skybox" }
  // );

  return (
    <div className="overlay-black">
      <Canvas
      // style={{
      //   position: "absolute",
      //   top: 0,
      //   left: 0,
      //   width: "100%",
      //   height: "100%",
      // }}
      >
        <Moon moonTexture={moonTexture} DoubleSide={DoubleSide} />
        <perspectiveCamera />
        <Camera
          moveCameraToModel={moveCameraToModel}
          setMoveCameraToModel={setMoveCameraToModel}
        />
        <ambientLight intensity={0.5} />

        {/* <Stars /> */}
        {/* <Sky sunPosition={[0.2, 0, 0]} /> */}
        <SkyBox />

        <ambientLight intensity={1.2} />
        <spotLight
          position={[0, 25, 0]}
          angle={1.3}
          penumbra={1}
          castShadow
          intensity={2}
          shadow-bias={-0.0001}
        />
        {/* <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} /> */}
        <OrbitControls />
        <Sparkles size={2} color={"#fff"} scale={[10, 10, 10]}></Sparkles>
        <mesh rotation={[0, -Math.PI, 0]}>
          <Backdrop
            receiveShadow
            floor={20.5} // Stretches the floor segment, 0.25 by default
            segments={100} // Mesh-resolution, 20 by default
            scale={[50, 30, 10]}
            position={[4, -20, -60]}
          >
            <meshStandardMaterial color="#0a1a1f" transparent opacity={0.7} />
          </Backdrop>
        </mesh>
        <primitive
          object={shipModel.scene}
          position={[-1.2, -5, -2]}
          children-0-castShadow
          rotation={[0, Math.PI, 0]}
          scale={[1.5, 1.5, 1.5]}
        />

        <Float
          speed={4} // Animation speed, defaults to 1
          rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
          floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <Ring
            scale={3.5}
            position-z={-10}
            position-y={-10}
            args={[0, 0.95, 60]}
            rotateY={Math.PI}
            rotateX={Math.PI}
            receiveShadow
          >
            <meshStandardMaterial color="#2a3a3f" map={texture} />
          </Ring>
        </Float>

        <Navbar
          setSelectedNav={setSelectedNav}
          setCategorySelected={setCategorySelected}
        />
      </Canvas>
    </div>
  );
}

export default App;

function LandingComponent({
  setIsLanding,
  setSelectedNav,
  setCategorySelected,
}) {
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
    setSelectedNav(label);
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
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
      <div onClick={() => setIsLanding(false)} className={`enter-btn`}>
        <img src="../img/in3dlogo.png" />
        <div className="landing-screen-enter-btn">
          <a className="link-btn" href="#" ref={btnRef}>
            <i className="link-smtng"></i>
            <i className="link-smtng"></i>
            <span className="link-span">Explore</span>
          </a>
        </div>
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
