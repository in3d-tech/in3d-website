import { Suspense, lazy, useState } from "react";
// import { useProgress } from "@react-three/drei";
import { Leva } from "leva";
import { LandingComponent } from "./components/landingScreen/LandingScreen";
import AppContext from "./context/context";
import { useTranslation } from "react-i18next";

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
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [isLanding, setIsLanding] = useState(true);
  const [navState, setNavState] = useState(0);
  const [animate, setAnimate] = useState(false);

  const handleChangeLanguage = () => {
    console.log("inside handle-change");
    const newLanguage = currentLanguage === "en" ? "he" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
    setTimeout(
      () => console.log("OUR CURRENT LANFGUAGE: ", currentLanguage),
      5000
    );
  };

  return (
    <>
      <div
        className={`overlay-black scene-bg-image ${
          isLanding ? "" : "open-fade-in"
        }`}
      >
        <div className="background-top"></div>
        <div
          style={{
            // width: "300px",
            height: "200px",
            position: "absolute",
            bottom: 0,
            zIndex: 500,
          }}
        >
          <img
            className="language-flag"
            alt="can"
            onClick={handleChangeLanguage}
            src="/assets/images/flag-canada.webp"
            style={{
              width: "40px",
              height: "40px",
              opacity: currentLanguage == "en" ? 1 : 0.4,
            }}
          />
          <img
            className="language-flag"
            alt="he"
            onClick={handleChangeLanguage}
            src="/assets/images/israel-flag.webp"
            style={{
              width: "40px",
              height: "40px",
              marginLeft: "10px",
              opacity: currentLanguage == "he" ? 1 : 0.4,
            }}
          />
        </div>
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
            {/* {isLanding ? null : <HorizontalNav />} */}
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
