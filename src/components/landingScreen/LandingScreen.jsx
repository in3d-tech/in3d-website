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
    }, 500); // This will start counting after 3 seconds

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
          zIndex: 50,
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

export function LandingComponent({ setIsLanding, onEnter, started, width }) {
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
      {width < 400 ? (
        <button
          onClick={onEnter}
          className={`enter-btn ${progressState ? "enter-btn--final" : ""}`}
          style={{
            opacity: `${progressState}%`,
            width: "100vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src="/in3dlogo.png"
            alt="3D logo"
            style={{ width: "100%", height: "100%" }}
          />
        </button>
      ) : (
        <button
          onClick={onEnter}
          className={`enter-btn ${progressState ? "enter-btn--final" : ""}`}
          style={{ opacity: `${progressState}%` }}
        >
          <img src="/in3dlogo.png" alt="3D logo" />
        </button>
      )}
      <CountingBox onEnter={onEnter} />
    </div>
  );
}
