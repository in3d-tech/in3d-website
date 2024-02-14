import { Suspense, lazy, useState } from "react";
import { Leva } from "leva";
import { LandingComponent } from "./components/landingScreen/LandingScreen";
import AppContext from "./context/context";
import { useTranslation } from "react-i18next";
import { ChangeLanguage } from "./components/ChangeLanguage";
import { useGLTF } from "@react-three/drei";
// import Scene from "./components/Scene";

const LazyScene = lazy(() => import("./components/Scene"));
// const LazySceneMobile = lazy(() =>
//   import("./components/mobileView/SceneMobile")
// );

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
  const [test, setTest] = useState(false);

  // setTimeout(() => {
  //   setTest(false)
  // }, 20000)

  return (
    <>
      {/* <ChangeLanguage
        setCurrentLanguage={setCurrentLanguage}
        changeLanguage={changeLanguage}
        currentLanguage={currentLanguage}
      /> */}
      {/* {test ? (
        <div className="haha"></div>
      ) : (
        <>
          <div className="bg-top-static"></div>
          <div className="background-top"></div>
        </>
      )} */}
      {/* <div className="haha"></d
      iv> */}
      {isLanding ? (
        <LandingComponent
          onEnter={() => setIsLanding(false)}
          started={isLanding}
        />
      ) : (
        <div
          className={`overlay-black scene-bg-image ${
            isLanding ? "" : "open-fade-in"
          }`}
        >
          <Leva collapsed />
          <AppContext.Provider
            value={{ navState, setNavState, animate, setAnimate }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              {isLanding ? null : <LazyScene isLanding={isLanding} />}
            </Suspense>
          </AppContext.Provider>
        </div>
      )}
    </>
  );
}

export default App;

useGLTF.preload("/assets/medicine/medical_statue_large.glb");
useGLTF.preload("/assets/platform/concept_hadashtex (1).glb");
useGLTF.preload("/assets/taasia/engener (1).glb");
useGLTF.preload("/assets/ai/ai_statue (1).glb");
useGLTF.preload("/assets/miscrosoft/microsoft_large.glb");
