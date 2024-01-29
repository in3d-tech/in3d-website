import { Suspense, lazy, useState } from "react";
// import { useProgress } from "@react-three/drei";
import { Leva } from "leva";
import { LandingComponent } from "./components/landingScreen/LandingScreen";
import { HorizontalNav } from "./components/nav/HorizontalNav";
import AppContext from "./context/context";

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
          <Suspense
            fallback={
              <div>
                <h1>LOADING!!!</h1>
              </div>
            }
          >
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
