import { useState, Suspense, lazy, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Preload, Stats, useProgress } from "@react-three/drei";
import { HomePage } from "./HomePage";
import { Navbar } from "./NavbarOld";
// import { Loader } from "./Loading";
import { CameraControls } from "../common/CameraControls";

// const LazyHomepage = lazy(() => import("./HomePage"));
const LazyContentView = lazy(() => import("./catergories/ContentView"));

function Scene({ isLanding }) {
  const [position, setPosition] = useState({ x: 0, y: -0, z: 580 }); //{ x: 0, y: 10, z: 278 }); // y: 80, z: 150 });
  const [target, setTarget] = useState({ x: 0, y: 60, z: 0 });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(1);
  const [animation, setAnimation] = useState("static");
  const [showFloat, setShowFloat] = useState(false);
  const [test, setTest] = useState("");

  setTimeout(() => setAnimation("animate"), 25000);

  const videoIds = [
    "9vA8qX_p11w",
    "enJ6be4qLMs",
    "Bj6KLv7kv2Q",
    "rVzJDgDnKLI",
    "mAEM5q5YFtg",
  ];

  return (
    <>
      {/* {animation === "animate" ? (
        <>
          <div className={`animated-sky ${animation}`}></div>
          <div className={`animated-water ${animation}`}></div>
        </
      ) : null} */}

      {/* {go back to this and uncomment css: after} */}
      {<div className={`animated-sky ${animation}`}></div>}
      <div className="hovered-model-header">{test}</div>
      {<Header />}
      <Canvas
        camera={{
          fov: 24,
        }}
        frameloop="demand"
      >
        <Stats />

        <CameraControls position={position} target={target} />
        <Suspense fallback={null}>
          <HomePage
            position={position}
            target={target}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setPosition={setPosition}
            setTarget={setTarget}
            showFloat={showFloat}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setTest={setTest}
          />
        </Suspense>
        <Preload all />
        <AdaptiveDpr pixelated />
      </Canvas>
      <Navbar
        setPosition={setPosition}
        setTarget={setTarget}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      {selectedCategory ? (
        // <ContentView scrollRef={scrollRef} videoIds={videoIds} />
        <Suspense fallback={<div>Loading...</div>}>
          <LazyContentView
            videoIds={videoIds}
            setShowFloat={setShowFloat}
            selectedCategory={selectedCategory}
          />
        </Suspense>
      ) : null}
    </>
  );
}

export default Scene;

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header>
      <div className="hamburger-icon" id="icon" onClick={toggleNav}>
        <div className={isNavOpen ? "icon-1 a" : "icon-1"}></div>
        <div className={isNavOpen ? "icon-2 c" : "icon-2"}></div>
        <div className={isNavOpen ? "icon-3 b" : "icon-3"}></div>
        <div className="clear"></div>
      </div>

      <nav id="nav" className={isNavOpen ? "show" : ""}>
        <ul>
          <li>Medicine</li>
          <li>Customization</li>
          <li>Artifical Intelligence</li>
          <li>Military</li>
          <li>Industry</li>
          <li>Security</li>
        </ul>
      </nav>

      <div className="dark-blue" id="blue"></div>

      <section className="content">
        <h1>Hello We are animated!</h1>
        <p className="small">Lorem ipsum dolor sit amet</p>
      </section>
    </header>
  );
};
