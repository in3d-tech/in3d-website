import { Suspense, lazy, useRef, useState } from "react";
import { Html, useProgress, useGLTF } from "@react-three/drei";
import { Navbar } from "./components/NavbarOld";
import { Leva } from "leva";
// import { useHorizontalScroll } from "./common/useHorizontalScroll";
import YouTube from "react-youtube";
import { LandingComponent } from "./components/landingScreen/LandingScreen";
import { ContentView } from "./components/catergories/ContentView";
import { HorizontalNav } from "./components/nav/HorizontalNav";
import AppContext from "./context/context";

// import { AnimationMixer } from "three-stdlib";

const LazyScene = lazy(() => import("./components/Scene"));

// export const LoaderComponent = () => {
//   const { active, progress, errors } = useProgress();

//   return (
//     <Html center>
//       <span>{`${progress} % loaded`}</span>
//     </Html>
//   );
// };

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
          <Suspense fallback={null}>
            {isLanding ? null : <LazyScene isLanding={isLanding} />}
            {isLanding ? null : <HorizontalNav />}
          </Suspense>
        </AppContext.Provider>
      </div>
      {isLanding ? (
        <LandingComponent
          onEnter={() => setIsLanding(false)}
          started={isLanding}
        />
      ) : null}
    </>
  );
}

export default App;

// useGLTF.preload("/assets/in3d-ai/Ai_FBX.fbx");
// useGLTF.preload("/assets/medical-model-new/Medical_Statue.fbx");
