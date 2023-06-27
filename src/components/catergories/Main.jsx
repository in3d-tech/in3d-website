import { useEffect, useState } from "react";
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
} from "@react-three/drei";
import { Robot } from "./Robot";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader, DoubleSide } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Helix, Slider } from "./Slider";
import { getSliderPosition } from "./logic/getSliderPosition";
import React from "react";

export function SelectedCategory({ setCatagorySelected }) {
  const texture = useLoader(TextureLoader, "/img/in3dlogo.png");

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
    <div className="overlay-black" style={{ height: "100vh" }}>
      <Canvas>
        <color attach="background" args={["#333333"]} />
        <ambientLight intensity={0.2} />
        <spotLight
          position={[0, 25, 0]}
          angle={1.3}
          penumbra={1}
          castShadow
          intensity={2}
          shadow-bias={-0.0001}
        />
        {/* <OrbitControls /> */}
        <gridHelper />
        <axesHelper />
        <Html position={[-10, 0, 5]}>
          <div
            onClick={() => {
              // setShowNav(true);
              setCatagorySelected(false);
            }}
            className="btn btn-three"
          >
            Back
          </div>
        </Html>
        {/* <Environment preset="warehouse" /> */}
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

          <Robot scale={0.8} />

          <Sparkles size={2} color={"#fff"} scale={[10, 10, 10]}></Sparkles>
          <Backdrop
            receiveShadow
            floor={20.5} // Stretches the floor segment, 0.25 by default
            segments={100} // Mesh-resolution, 20 by default
            scale={[50, 30, 10]}
            position={[4, -10, 0]}
          >
            <meshStandardMaterial color="#0a1a1f" transparent opacity={0.4} />
          </Backdrop>

          <Float
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
          </Float>

          <Scroll></Scroll>
          <Scroll html>
            <h1
              className="title"
              style={{
                color: "#cdcbca",
                position: "absolute",
                top: `65vh`,
                left: "50%",
                fontSize: "13em",
                transform: `translate(-50%,-50%)`,
              }}
            >
              Microsoft
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
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
