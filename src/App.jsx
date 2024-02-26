import { Suspense, lazy, useState } from "react";
import { Leva } from "leva";
import { LandingComponent } from "./components/landingScreen/LandingScreen";
import AppContext from "./context/context";
import { useTranslation } from "react-i18next";
import { ChangeLanguage } from "./components/ChangeLanguage";
import { useGLTF } from "@react-three/drei";
// import Scene from "./components/Scene";
import useWindowDimensions from "./common/useWindowDimensions";
const LazyScene = lazy(() => import("./components/Scene"));
const LazySceneMobile = lazy(() =>
  import("./components/mobileView/SceneMobile")
);

// export const LoaderComponent = () => {
//   const { active, progress, errors } = useProgress();

//   return (
//     <Html center>
//       <span>{`${progress} % loaded`}</span>
//     </Html>
//   );
// };

function App() {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [isLanding, setIsLanding] = useState(true);
  const [navState, setNavState] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [test, setTest] = useState(false);

  const { width, height } = useWindowDimensions();

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
          width={width}
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
            <Suspense fallback={null}>
              {isLanding ? null : <LazySceneMobile isLanding={isLanding} />}
            </Suspense>
          </AppContext.Provider>
        </div>
      )}
    </>
  );
}

export default App;

useGLTF.preload("/assets/medicine/medical_statue_8 (3).glb");
useGLTF.preload("/assets/platform/concept_hadashtex (1).glb");
useGLTF.preload("/assets/taasia/engener (1).glb");
useGLTF.preload("/assets/ai/ai_statue.glb");
useGLTF.preload("/assets/miscrosoft/microsoft_large.glb");
useGLTF.preload("/assets/military/soldier_statue.glb");
