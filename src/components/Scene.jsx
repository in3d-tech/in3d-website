import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload, Stats, useProgress } from "@react-three/drei";
import { HomePage } from "./HomePage";
import { Navbar } from "./NavbarOld";
import { ContentView } from "./catergories/ContentView";
import { useHorizontalScroll } from "../common/useHorizontalScroll";

function Scene({ isLanding }) {
  const [categorySelected, setCategorySelected] = useState(false);
  const [position, setPosition] = useState({ x: -9.5, y: 68, z: 278 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const [selectedIsland, setSelectedIsland] = useState(null);

  // const tankModel = useGLTF("/assets/new-tank/tanky future new.gltf");
  const scrollRef = useHorizontalScroll();
  const videoIds = [
    "9vA8qX_p11w",
    "enJ6be4qLMs",
    "Bj6KLv7kv2Q",
    "rVzJDgDnKLI",
    "mAEM5q5YFtg",
  ];

  const { progress } = useProgress();

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          border: "1px solid red",
          left: "50%",
          top: "10%",
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={"landing-screen-nav-btn"}>
          {progress != 100
            ? `${(Math.round(progress * 100) / 100).toFixed(2)} % loaded`
            : "Temporary Enter Button"}
        </div>

        {progress < 100 ? (
          <div className="loader-wrapper">
            <div className="loader">
              {Array.from({ length: 20 }, (_, i) => (
                <span key={i} style={{ "--i": i + 1 }}></span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      <Canvas>
        <Stats />
        <Suspense fallback={null}>
          {!isLanding && (
            <HomePage
              position={position}
              target={target}
              selectedIsland={selectedIsland}
            />
          )}
        </Suspense>
        <Preload />
      </Canvas>
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
    </>
  );
}

export default Scene;
