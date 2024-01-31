import { Suspense, lazy, useState } from "react";
import { Leva } from "leva";
import { LandingComponent } from "./components/landingScreen/LandingScreen";
import AppContext from "./context/context";
import { useTranslation } from "react-i18next";
import { ChangeLanguage } from "./components/ChangeLanguage";

const LazyScene = lazy(() => import("./components/Scene"));

// export const LoaderComponent = () => {
//   const { active, progress, errors } = useProgress();

//   return (
//     <Html center>
//       <span>{`${progress} % loaded`}</span>
//     </Html>
//   );
// };

// -----------------------------------------------

// MODEL SIZES (all fbx)

// customize -> 25095 KB
// ai -> 6,750 KB
// microsoft -> 2,490 KB
// military -> 2,928 KB
// taasia -> 32,000 KB
// Medical -> 4958 KB
// -----------------------------------------------

// GTLTF MODELS
// DRACO LOADER

// optimize models
// optimize textures
// low level detail models? (texutres?)

// water webp png sequence

// bg_sky

// plant_final png sequence

// city

function App() {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);
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
        <div className="background-top"></div>
        <ChangeLanguage
          setCurrentLanguage={setCurrentLanguage}
          changeLanguage={changeLanguage}
          currentLanguage={currentLanguage}
        />
        <Leva collapsed />
        <AppContext.Provider
          value={{ navState, setNavState, animate, setAnimate }}
        >
          <Suspense fallback={<div>Loading...</div>}>
            {isLanding ? null : <LazyScene isLanding={isLanding} />}
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
