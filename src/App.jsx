import { useRef, useState } from "react";
import { Html, useProgress, useGLTF } from "@react-three/drei";
import { Navbar } from "./components/NavbarOld";
import { Leva } from "leva";
// import { useHorizontalScroll } from "./common/useHorizontalScroll";
import YouTube from "react-youtube";
import { LandingComponent } from "./components/landingScreen/LandingScreen";
import { ContentView } from "./components/catergories/ContentView";
import { HorizontalNav } from "./components/nav/HorizontalNav";
import AppContext from "./context/context";
import { Scene } from "./components/Scene";

// import { AnimationMixer } from "three-stdlib";

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
  const [navState, setNavState] = useState(0);
  const [animate, setAnimate] = useState(false);

  return (
    <>
      <div
        className={`overlay-black scene-bg-image ${
          isLanding ? "" : "open-fade-in"
        }`}
      >
        <Leva collapsed />
        <AppContext.Provider
          value={{ navState, setNavState, animate, setAnimate }}
        >
          <Scene isLanding={isLanding} />
          <HorizontalNav />
        </AppContext.Provider>
      </div>
      {isLanding && (
        <LandingComponent
          onEnter={() => setIsLanding(false)}
          started={isLanding}
        />
      )}
    </>
  );
}

export default App;

useGLTF.preload("/assets/new-tank/tanky future new.gltf");
useGLTF.preload("/assets/in3d-medical/Medical_Island.gltf");
