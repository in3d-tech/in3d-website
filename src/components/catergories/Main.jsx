import { useEffect, useState, useRef, useMemo } from "react";
import {
  RoundedBox,
  ScrollControls,
  Scroll,
  Environment,
  Sparkles,
  Backdrop,
  Float,
  Ring,
  Html,
  OrbitControls,
  PerspectiveCamera,
  Wireframe,
} from "@react-three/drei";
import { Robot } from "./Robot";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  TextureLoader,
  DoubleSide,
  BoxGeometry,
  MeshBasicMaterial,
  Vector3,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Helix, Slider } from "./Slider";
import {
  getSliderPosition,
  intervalSliderPositions,
} from "./logic/getSliderPosition";
import React from "react";
import baffle from "baffle";
import { CategoryCamera } from "./CategoryCamera";

export function SelectedCategory({ setCategorySelected, categorySelected }) {
  const [scrollState, setScrollState] = useState({
    isScrolling: false,
    clientX: 0,
    ScrollX: 0,
  });
  const scrollRef = useRef();
  const point1 = new Vector3(-1.2, 4.4, -4.4);
  const point2 = new Vector3(2.8, 5, -2);

  const distance = point1.distanceTo(point2);
  console.log("Distance:", distance);

  // const secondScrollRef = useRef({
  //   isScrolling: false,
  //   clientX: 0,
  //   ScrollX: 0,
  // });
  // useEffect(() => {
  //   const target = baffle(".title");
  //   target.set({
  //     characters: "░M░i░c░r░o░s░o░s░o░f░t░",
  //     speed: 100,
  //   });
  //   target.start();
  //   target.reveal(1000, 1000);
  // });
  const texture = useLoader(TextureLoader, "/img/in3dlogo.png");

  const geom = useMemo(() => new BoxGeometry(0.3, 0.3, 0.3), []);
  const mat = useMemo(() => new MeshBasicMaterial(), []);
  // mat.wireframe = true;

  // lookg into why I cant change other properties

  const verticiesArr = new Array(10).fill(1);
  const boxes = verticiesArr.map((box, index) => {
    const { position, prevPosition } = getSliderPosition(index);

    return (
      <mesh
        material={mat}
        geometry={geom}
        position={position}
        onClick={(e) => {
          console.log(e.object);
          console.log({ position, prevPosition });
          console.log(
            new Vector3(position).distanceTo(new Vector3(prevPosition))
          );
        }}
        key={index}
      >
        {/* <boxGeometry args={[0.5, 0.5, 0.5]} /> */}
        {/* <meshBasicMaterial color={"lime"} wireframe /> */}
      </mesh>
    );
  });

  const intermediaryBoxes = new Array(18).fill(1).map((item, index) => {
    const position = intervalSliderPositions[index];
    // console.log({ position });
    return (
      <mesh
        material={mat}
        geometry={geom}
        position={position}
        onClick={(e) => {
          console.log(e.object);
        }}
        key={index}
      >
        {/* <boxGeometry args={[0.5, 0.5, 0.5]} /> */}
        {/* <meshBasicMaterial color={"lime"} wireframe /> */}
      </mesh>
    );
  });

  // const onMouseDown = (e) => {
  //   // console.log("PPPPPPPPPPPPPPPP");
  //   setScrollState({ ...scrollState, isScrolling: true, clientX: e.clientX });
  // };

  // const onMouseUp = () => {
  //   // console.log("XXXXXXXXXXXX");
  //   setScrollState({ ...scrollState, isScrolling: false });
  // };

  // const onMouseMove = (e) => {
  //   const { clientX, scrollX, isScrolling } = scrollState;
  //   if (
  //     isScrolling &&
  //     clientXFinal != e.clientX &&
  //     scrollXFinal != scrollX + e.clientX - clientX
  //   ) {
  //     scrollRef.current.scrollLeft = scrollX + e.clientX - clientX;
  //     const scrollXFinal = scrollX + e.clientX - clientX;
  //     const clientXFinal = e.clientX;
  //     setScrollState({
  //       ...scrollState,
  //       ScrollX: scrollXFinal,
  //       ClientX: clientXFinal,
  //     });
  //   }
  // };

  const arrayOfSliders = new Array(20).fill(" ");

  const mappedSliders = arrayOfSliders.map((item, idx) => {
    const sliderPosition = getSliderPosition(idx, arrayOfSliders.length);
    return (
      <Slider
        texture={texture}
        sp={sliderPosition}
        index={idx}
        key={idx}
        name={`${2 - idx}`}
        id={idx}
        numberOfSliders={arrayOfSliders.length}
      />
    );
  });

  return (
    <div
      className="overlay-black"
      style={{ height: "100vh" }}
      ref={scrollRef}
      // onMouseDown={(e) => onMouseDown(e)}
      // onMouseUp={(e) => onMouseUp(e)}
      // onMouseMove={(e) => onMouseMove(e)}
    >
      <Canvas>
        <color attach="background" args={["#333333"]} />
        <CategoryCamera />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[0, 25, 0]}
          angle={1.3}
          penumbra={1}
          castShadow
          intensity={2}
          shadow-bias={-0.0001}
        />
        <OrbitControls />
        {/* <mesh position={[0, 3, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color={"lime"} wireframe />
        </mesh> */}
        {boxes}
        {/* {intermediaryBoxes} */}
        <gridHelper />
        <axesHelper />
        <Html position={[-10, 0, 5]}>
          <div
            onClick={() => {
              // setShowNav(true);
              setCategorySelected(false);
            }}
            className="btn btn-three"
          >
            Back
          </div>
        </Html>
        <Environment preset="warehouse" />
        {/* <mesh rotation={[0, -Math.PI / 3, 0]}>
          <planeGeometry args={[3.3, 1.7, 10]} />
          <meshBasicMaterial
            side={DoubleSide}
            // map={props.texture}
            opacity={0}
          ></meshBasicMaterial>
        </mesh> */}
        <Helix />
        <ScrollControls pages={6} damping={0.1}>
          {mappedSliders}
          {intermediaryBoxes}
          <Robot scale={0.8} categorySelected={categorySelected} />

          {/* <Sparkles size={2} color={"#fff"} scale={[10, 10, 10]}></Sparkles>
          <Backdrop
            receiveShadow
            floor={20.5} // Stretches the floor segment, 0.25 by default
            segments={100} // Mesh-resolution, 20 by default
            scale={[50, 30, 10]}
            position={[4, -10, 0]}
          >
            <meshStandardMaterial color="#0a1a1f" transparent opacity={0.4} />
          </Backdrop> */}

          {/* <Float
            speed={4} // Animation speed, defaults to 1
            rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
            floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            floatingRange={[1, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
          >
            <Ring
              scale={3.5}
              position-z={-2.5}
              position-y={-1}
              args={[0, 0.95, 60]}
              receiveShadow
            >
              <meshStandardMaterial color="#2a3a3f" map={texture} />
            </Ring>
          </Float> */}

          <Scroll></Scroll>
          {/* <Scroll html>
            <h1
              className="title"
              style={{
                color: "#cdcbca",
                position: "absolute",
                top: `80vh`,
                left: "50vw",
                fontSize: "13em",
                transform: `translate(-50%,-50%)`,
              }}
            >
              {categorySelected}
            </h1>

            <div className="row" style={{ position: "absolute", top: `132vh` }}>
              <h2>Preparing for the Future.</h2>
              <p style={{ maxWidth: "400px" }}>
                At In3D-Tech we work with the latest technologies, taking steps
                forward in innovation, creativity and technology. Fill in for
                information here, where it will look awesome!
              </p>
              <button>Read more</button>
            </div>

            <div className="row" style={{ position: "absolute", top: `230vh` }}>
              <div
                className="col"
                style={{ position: "absolute", right: `40px`, width: "540px" }}
              >
                <h2 style={{ maxWidth: "440px" }}>Tech-Savvy Side</h2>
                <p style={{ maxWidth: "440px" }}>
                  Some people say space is the final frontier, but here we push
                  the boundaries of what's possible here on earth. With our
                  record breaking leaps in lot's of things, this is the place to
                  create more in the future
                </p>
                <button>Read more</button>
              </div>
            </div>

            <h2
              style={{
                position: "absolute",
                top: "350vh",
                left: "50%",
                transform: `translate(-50%,-50%)`,
              }}
            >
              Cutting-Edge of Grooming
            </h2>

            <button
              style={{
                position: "absolute",
                top: `590vh`,
                left: "50%",
                transform: `translate(-50%,-50%)`,
              }}
            >
              Contact Us!
            </button>
          </Scroll> */}
        </ScrollControls>
      </Canvas>
    </div>
  );
}
