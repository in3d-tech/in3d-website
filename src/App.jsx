import { Suspense, lazy, useState, useEffect } from "react";
import { Leva } from "leva";
import { LandingComponent } from "./components/landingScreen/LandingScreen";
import AppContext from "./context/context";
import { useTranslation } from "react-i18next";
import { ChangeLanguage } from "./components/ChangeLanguage";
// import Scene from "./components/Scene";

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
  // const [isLoading, setIsLoading] = useState(true);
  // const [downloadedAssets, setDownloadedAssets] = useState([]);

  // const totalImages = 240;

  // useEffect(() => {
  //   const imageUrls = Array.from({ length: totalImages }, (_, i) => {
  //     // If the numbering starts from 1, use `i + 1`. Use `i` if it starts from 0.
  //     const number = (i + 1).toString().padStart(5, "0");
  //     return `/assets/background/water_webp/water_00001_${number}.webp`;
  //   });

  //   Promise.all(
  //     imageUrls.map(
  //       (imageUrl) =>
  //         fetch(imageUrl)
  //           .then((response) => {
  //             if (response.ok) {
  //               console.log("IN THE OK RESPONSE");
  //               return response.blob();
  //             }
  //             throw new Error(
  //               `Image download failed with HTTP status ${response.status}`
  //             );
  //           })
  //           .then(() => imageUrl) // When the image is loaded, return its URL
  //     )
  //   )
  //     .then((loadedImages) => {
  //       console.log(" I THNK IT WWORJED?");
  //       setDownloadedAssets(loadedImages);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Image download failed:", error);
  //     });
  // }, []);

  return (
    <>
      <ChangeLanguage
        setCurrentLanguage={setCurrentLanguage}
        changeLanguage={changeLanguage}
        currentLanguage={currentLanguage}
      />
      <div className="bg-top-static"></div>
      <div className="background-top"></div>
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
              {/* // <Scene isLanding={isLanding} /> */}
            </Suspense>
          </AppContext.Provider>
        </div>
      )}
    </>
  );
}

export default App;
