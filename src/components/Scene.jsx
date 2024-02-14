import { useState, Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Preload, Stats, useProgress } from "@react-three/drei";
import { HomePage } from "./HomePage";
import { Navbar } from "./NavbarOld";
// import { ContentView } from "./catergories/ContentView";
import { useHorizontalScroll } from "../common/useHorizontalScroll";
// import AssetLoader from "./ornaments/AssetLoader";
// import { Loader } from "./Loading";
// import { HorizontalNav } from "./nav/HorizontalNav";
import { MathUtils } from "three";
// const LazyHomepage = lazy(() => import("./HomePage"));
const LazyContentView = lazy(() => import("./catergories/ContentView"));

function Scene({ isLanding }) {
  const [position, setPosition] = useState({ x: 0, y: 10, z: 278 }); // y: 80, z: 150 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [animation, setAnimation] = useState("static");
  // position: [0, 10, 278],
  // rotation: [MathUtils.degToRad(-5), 0, 0],
  // const tankModel = useGLTF("/assets/new-tank/tanky future new.gltf");

  setTimeout(() => setAnimation("animate"), 25000);

  const scrollRef = useHorizontalScroll();
  const { progress } = useProgress();

  const videoIds = [
    "9vA8qX_p11w",
    "enJ6be4qLMs",
    "Bj6KLv7kv2Q",
    "rVzJDgDnKLI",
    "mAEM5q5YFtg",
  ];

  return (
    <>
      {/* <AssetLoader /> */}
      {/* <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          left: "70%",
          top: "10%",
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid yellow",
        }}
      >
        {progress < 100 ? (
          <div className={"landing-screen-nav-btn"}>
            {progress != 100
              ? `${(Math.round(progress * 100) / 100).toFixed(2)} % loaded`
              : "Temporary Enter Button"}
          </div>
        ) : null}
        {progress < 100 ? (
          <div className="loader-wrapper">
            <div className="loader">
              {Array.from({ length: 20 }, (_, i) => (
                <span key={i} style={{ "--i": i + 1 }}></span>
              ))}
            </div>
          </div>
        ) : null}
      </div> */}

      {/* {animation === "animate" ? (
        <>
          <div className={`animated-sky ${animation}`}></div>
          <div className={`animated-water ${animation}`}></div>
        </>
      ) : null} */}
      <Canvas
        orthographic
        camera={{
          zoom: 6,
          position: [0, 10, 278],
          rotation: [MathUtils.degToRad(-5), 0, 0],
        }}
        frameloop="demand"
      >
        {/* <Canvas frameloop="demand"> */}
        <Stats />
        <Suspense fallback={null}>
          <HomePage
            position={position}
            target={target}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setPosition={setPosition}
            setTarget={setTarget}
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
      {selectedCategory ||
        (selectedCategory == 0 && (
          // <ContentView scrollRef={scrollRef} videoIds={videoIds} />
          <Suspense fallback={<div>Loading...</div>}>
            <LazyContentView scrollRef={scrollRef} videoIds={videoIds} />
          </Suspense>
        ))}
      {/* {isLanding ? null : <HorizontalNav />} */}
    </>
  );
}

export default Scene;
