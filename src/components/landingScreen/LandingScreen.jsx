import { useProgress } from "@react-three/drei";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { t } from "../../common/t";
import { useEffect, useState } from "react";

export function CountingBox({ onEnter }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < 100) {
            return prevCount + 1;
          }

          clearInterval(interval);
          return prevCount;
        });
      }, 50); // Adjust this as per your need
    }, 5500); // This will start counting after 3 seconds

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

  const loaderStyles = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const containerStyles = {
    background: "rgba(255, 255, 255, 0)",
    backdropFilter: "blur(8px)",
    position: "absolute",
    width: "140px",
    height: "55px",
    zIndex: 20,
    borderRadius: "0 0 10px 10px",
    border: "1px solid rgba(255, 255, 255, 0.274)",
    borderTop: "none",
    boxShadow: "0 15px 20px rgba(0, 0, 0, 0.082)",
  };

  const dotStyles = {
    background: "rgb(228, 228, 228)",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    zIndex: -1,
    animation: "anim 2s infinite linear",
    transform: "translateY(5px)",
    margin: "0.2em",
  };

  return (
    <>
      <div onClick={onEnter} className="counting-box">
        <span className="counting-text">{`${count}%`}</span>
      </div>
      <div
        style={{
          zIndex: 50000000,
          // background: "black",
          marginTop: "40em",
        }}
      >
        {/* <div style={loaderStyles}>
          <div style={containerStyles} />
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              style={{ ...dotStyles, animationDelay: `calc(-0.3s * ${index})` }}
            />
          ))}
        </div> */}
      </div>
    </>
  );
}

const LoadingAnimation = ({ progress }) => {
  return (
    <div className="loading-animation-container">
      <div
        className="loading-bg loading-bar"
        style={{ height: `${progress}%` }}
      ></div>
      <div
        className="loading-bg loading-bar2"
        style={{ opacity: `${progress}%` }}
      ></div>
      <div
        className="loading-bg loading-bar3"
        style={{ opacity: `${progress}%` }}
      ></div>
    </div>
  );
};

export function LandingComponent({ setIsLanding, onEnter, started }) {
  const { progress } = useProgress();
  const [progressState, setProgressState] = useState(0);
  const [final, setFinal] = useState(false);

  useEffect(() => {
    if (progressState < 100) {
      const interval = setInterval(() => {
        setProgressState(progressState + 1);
      }, 10);

      return () => clearInterval(interval);
    } else {
      setFinal(true);
    }
  }, [progressState]);

  if (!started)
    return <div className="loader-wrapper">{/* loader content */}</div>;

  return (
    <div className={`loadingScreen ${final ? "loadingScreen--started" : ""}`}>
      {/* ...rest of your content */}
      <LoadingAnimation progress={progressState} />
      {/* <div className={`enter-btn ${final ? "enter-btn--final" : ""}`} /> */}
      <button
        onClick={onEnter}
        className={`enter-btn ${progressState ? "enter-btn--final" : ""}`}
        style={{ opacity: `${progressState}%` }}
      >
        <img src="/in3dlogo.png" alt="3D logo" />
      </button>
      <CountingBox onEnter={onEnter} />
    </div>
  );
}

// export function LandingComponent({ setIsLanding, onEnter, started }) {
//   const { progress } = useProgress();

//   const [progressState, setProgressState] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (progressState < 100) {
//         setProgressState(progressState + 1);
//       } else {
//         clearInterval(interval);
//       }
//     }, 10); // Adjust the interval for smoother animation
//     return () => clearInterval(interval);
//   }, [progressState]);

//   return (
//     <div
//       className={`loadingScreen ${!started ? "loadingScreen--started" : ""}`}
//     >
//       {/* // className="landing-screen-wrapper"> */}
//       {/* <div className={"landing-screen-nav-btn"} onClick={onEnter}>
//         {progress != 100
//           ? `${(Math.round(progress * 100) / 100).toFixed(2)} % loaded`
//           : "Temporary Enter Button"}
//       </div> */}
//       {progress > 100 ? (
//         <div className="loader-wrapper">
//           <div className="loader">
//             {Array.from({ length: 20 }, (_, i) => (
//               <span key={i} style={{ "--i": i + 1 }}></span>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="btn-container">
//           {/* <button className="landing-button" onClick={onEnter}>
//             <span className="text">{t("enter")}</span>
//             <div className="icon-container">
//               <div className="icon icon--left">
//                 <ArrowForwardIcon
//                   className="arrow-icon"
//                   sx={{ fontSize: 30 }}
//                 />
//               </div>
//             </div>
//           </button> */}
//         </div>
//         // <button
//         //   className={`landing-screen-nav-btn ${
//         //     progress < 100 ? "disable-btn" : ""
//         //   }`}
//         //   disabled={progress < 100}
//         //   onClick={onEnter}
//         //   aria-label="Navigate"
//         // >
//         //   {progress != 100
//         //     ? `${(Math.round(progress * 100) / 100).toFixed(2)} % loaded`
//         //     : "Enter Site"}
//         // </button>
//       )}
//       <LoadingAnimation progress={progressState} />

//       <div className="loading-wrapper">
//         <div className="loadingScreen__progress">
//           <div
//             className="loadingScreen__progress__value"
//             style={{
//               width: `${progress}%`,
//             }}
//           />
//         </div>
//       </div>
//       <button
//         onClick={onEnter}
//         className={`enter-btn ${progressState ? "enter-btn--final" : ""}`}
//         style={{ opacity: `${progressState}%` }}
//       >
//         <img src="/in3dlogo.png" alt="3D logo" />
//       </button>
//     </div>
//   );
// }
