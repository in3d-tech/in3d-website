import { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  RoundedBox,
  Stats,
  Sky,
  Sparkles,
  Backdrop,
  Float,
  Ring,
  Stars,
  Html,
} from "@react-three/drei";
import { DoubleSide, TextureLoader } from "three";
import { Navbar } from "./components/Navbar";
// import { Card } from "./components/Card";
import { Moon } from "./components/Moon";
// import { Podium } from "./components/Podium";
import { Camera } from "./components/Camera";
// import { AboutNav } from "./components/AboutNav";
// import { ContactNav } from "./components/ContactNav";
// import { useControls } from "leva";
// import { TestComp } from "./components/TestComp";
import "semantic-ui-css/semantic.min.css";
import { SelectedCategory } from "./components/catergories/Main";
import { Loading } from "./components/Loading";
import { Button, Icon } from "semantic-ui-react";

function App() {
  const [rotate, setRotate] = useState(false);
  const [rotateCamera, setRotateCamera] = useState(false);
  const [showImageBox, setShowImageBox] = useState(true);
  const [isCardView, setIsCardView] = useState(false);
  const [selectedNav, setSelectedNav] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStatue, setSelectedStatue] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const [isLanding, setIsLanding] = useState(true);
  const [loadingAnimations, setLoadingAnimations] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aboutNav, setAboutNav] = useState(false);
  const [contactNav, setContactNav] = useState(false);
  const [moveCameraToModel, setMoveCameraToModel] = useState(null);
  const [catagorySelected, setCatagorySelected] = useState(false);

  const roundedBoxRef = useRef();

  const handleClick = () => {
    setIsVisible(false);
    setShowImageBox(true); // show the image box
    setRotateCamera(true);
    //roundedBoxRef.current.visible = false; // hide the rounded box
  };

  const texture = useLoader(TextureLoader, "../img/in3dlogo.png");
  const moonTexture = useLoader(TextureLoader, "../img/moon.png");
  const marsTexture = useLoader(TextureLoader, "../img/mars_texture.png");
  const in3dTexture = useLoader(TextureLoader, "../img/in3dlogo.png");

  if (isLanding) return <LandingComponent setIsLanding={setIsLanding} />;
  if (catagorySelected) {
    try {
      return (
        <Suspense fallback={<Loading />}>
          <SelectedCategory
            setCatagorySelected={setCatagorySelected}
            catagorySelected={catagorySelected}
          />
        </Suspense>
      );
    } catch (e) {
      console.log(e);
    }
  }
  // if (aboutNav) return <AboutNav setAboutNav={setAboutNav} />;
  // if (contactNav) return <ContactNav />;

  setTimeout(() => {
    setIsLoading(true);
  }, 5000);
  return (
    <div className="overlay-black" style={{ background: "black" }}>
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Moon moonTexture={moonTexture} DoubleSide={DoubleSide} />
        <perspectiveCamera />
        <Camera
          rotate={rotateCamera}
          setRotate={setRotateCamera}
          isCardView={isCardView}
          setIsCardView={setIsCardView}
          setIsVisible={setIsVisible}
          loadingAnimations={loadingAnimations}
          setLoadingAnimations={setLoadingAnimations}
          moveCameraToModel={moveCameraToModel}
          setMoveCameraToModel={setMoveCameraToModel}
        />
        <ambientLight intensity={0.5} />

        <Stars />
        <Sky sunPosition={[0.2, 0, 0]} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} />
        <OrbitControls enableRotate={isCardView ? false : true} />
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

        <Environment preset="dawn" />

        {/* <RoundedBox
          args={[10, 0.5, 10]}
          radius={1}
          smoothness={4}
          position={[0, -0.25, 0]}
          onClick={handleClick}
          ref={roundedBoxRef}
        >
          <meshStandardMaterial color="#6f6f6f" />
        </RoundedBox>
        {showImageBox && (
          <mesh position={[0, 4, 0]} rotation={[0, -Math.PI, 0]}>
            <planeGeometry args={[6, 4]} />
            <meshBasicMaterial
              side={DoubleSide}
              map={texture}
            ></meshBasicMaterial>
          </mesh>
        )}
        <Podium
          position={[0, 0.1, 0]}
          rotate={rotate}
          setRotate={setRotate}
          texture={in3dTexture}
          marsTexture={marsTexture}
          selectedStatue={selectedStatue}
          setSelectedStatue={setSelectedStatue}
          setMoveCameraToModel={setMoveCameraToModel}
        /> */}
        {/* {isVisible ? (
          <Card selectedNav={selectedNav} setSelectedNav={setSelectedNav} />
        ) : null} */}
        {/* <axesHelper args={[20]} />

        <gridHelper args={[40, 40, 40]} /> */}
        {/* <Stats /> */}
        {showNav ? (
          <Navbar
            setIsCardView={setIsCardView}
            setSelectedNav={setSelectedNav}
            setIsVisible={setIsVisible}
            selectedStatue={selectedStatue}
            setSelectedStatue={setSelectedStatue}
            setShowNav={setShowNav}
            setAboutNav={setAboutNav}
            setContactNav={setContactNav}
            showNav={showNav}
            setCatagorySelected={setCatagorySelected}
          />
        ) : !isLoading ? null : (
          <Html position={[-21, 13, 5]}>
            <div onClick={() => setShowNav(true)} className="btn btn-three">
              Explore
            </div>
          </Html>
        )}
      </Canvas>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "black",
        }}
      ></div>
    </div>
  );
}

export default App;

function LandingComponent({ setIsLanding }) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const btnRef = useRef();

  console.count("landing component render");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationComplete(true);
    }, 5000); // Adjust the duration as needed

    return () => clearTimeout(timeout);
  }, []);

  const handleMouseMove = (e) => {
    // const btn = e.target;
    // const rect = btn.getBoundingClientRect();
    // const x = e.clientX * 3 - rect.left;
    // btn.style.setProperty("--x", x + "deg");
  };

  return (
    <div className="landing-screen-wrapper">
      <div
        style={{
          border: "1px solid black",
          position: "absolute",
          top: "8em",
          width: "5em",
          textAlign: "center",
          // left: 30,
          right: "10em",
        }}
      >
        Explore our work
      </div>
      <div onClick={() => setIsLanding(false)} className={`enter-btn`}>
        <img src="../img/in3dlogo.png" />
        <div className="landing-screen-enter-btn">
          {/* <Button
            // className="landing-screen-actual-enter-btn"
            // ref={btnRef}
            // style={{
            //   // borderRadius: "50%",
            //   height: "4em",
            //   background: "rgba(128, 0, 0, 0.84)",
            //   color: "white",
            //   border: "1px solid black",
            // }}
            animated
          >
            <Button.Content visible>Go</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button> */}
          <a
            className="link-btn"
            href="#"
            ref={btnRef}
            onMouseMove={handleMouseMove}
          >
            <i className="link-smtng"></i>
            <i className="link-smtng"></i>
            <span className="link-span">ENTER</span>
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
{
  /* <script>
let btn=document.getElementsByClassName('link-btn');
btn.addEventListener('mousemove', e=> {
  let rect = e.target.getBoundingClientRect();
  let x = e.clientX * 3 - rect.left;
  btn.style.setProperty('--x', x + 'deg')
}
</script> */
}
