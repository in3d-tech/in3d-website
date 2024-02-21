import { useState, Suspense, lazy, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  AdaptiveDpr,
  OrbitControls,
  Preload,
  Stats,
  useProgress,
} from "@react-three/drei";
import { HomePage } from "./HomePage";
import { Navbar } from "./NavbarOld";
// import { ContentView } from "./catergories/ContentView";
// import { useHorizontalScroll } from "../common/useHorizontalScroll";
// import AssetLoader from "./ornaments/AssetLoader";
// import { Loader } from "./Loading";
// import { HorizontalNav } from "./nav/HorizontalNav";
import { MathUtils } from "three";
import { CameraControls } from "../common/CameraControls";

// const LazyHomepage = lazy(() => import("./HomePage"));
const LazyContentView = lazy(() => import("./catergories/ContentView"));

function Scene({ isLanding }) {
  const [position, setPosition] = useState({ x: 0, y: -0, z: 580 }); //{ x: 0, y: 10, z: 278 }); // y: 80, z: 150 });
  const [target, setTarget] = useState({ x: 0, y: 60, z: 0 });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [animation, setAnimation] = useState("static");
  const [showFloat, setShowFloat] = useState(false);

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
      <div className={`animated-sky ${animation}`}></div>
      <Canvas
        camera={{
          fov: 24,
        }}
        frameloop="demand"
      >
        <Stats />

        <CameraControls
          position={position}
          target={target}
          idx={selectedCategory}
        />
        <Suspense fallback={null}>
          <HomePage
            position={position}
            target={target}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setPosition={setPosition}
            setTarget={setTarget}
            showFloat={showFloat}
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
