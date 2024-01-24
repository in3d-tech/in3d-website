import { useProgress } from "@react-three/drei";
import { useRef, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export function LandingComponent({ setIsLanding, onEnter, started }) {
  const { progress } = useProgress();

  return (
    <div
      className={`loadingScreen ${!started ? "loadingScreen--started" : ""}`}
    >
      {/* // className="landing-screen-wrapper"> */}
      {/* <div className={"landing-screen-nav-btn"} onClick={onEnter}>
        {progress != 100
          ? `${(Math.round(progress * 100) / 100).toFixed(2)} % loaded`
          : "Temporary Enter Button"}
      </div> */}
      {progress < 100 ? (
        <div className="loader-wrapper">
          <div className="loader">
            {Array.from({ length: 20 }, (_, i) => (
              <span key={i} style={{ "--i": i + 1 }}></span>
            ))}
          </div>
        </div>
      ) : (
        <div className="btn-container">
          <button className="landing-button" onClick={onEnter}>
            <span className="text">Enter</span>
            <div className="icon-container">
              <div className="icon icon--left">
                <ArrowForwardIcon
                  className="arrow-icon"
                  sx={{ fontSize: 30 }}
                />
              </div>
              {/* <div className="icon icon--right"></div> */}
            </div>
          </button>
        </div>
        // <button
        //   className={`landing-screen-nav-btn ${
        //     progress < 100 ? "disable-btn" : ""
        //   }`}
        //   disabled={progress < 100}
        //   onClick={onEnter}
        //   aria-label="Navigate"
        // >
        //   {progress != 100
        //     ? `${(Math.round(progress * 100) / 100).toFixed(2)} % loaded`
        //     : "Enter Site"}
        // </button>
      )}
      <div className="loading-wrapper">
        <div className="loadingScreen__progress">
          <div
            className="loadingScreen__progress__value"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
      <button onClick={onEnter} className={`enter-btn`}>
        <img src="/in3dlogo.png" alt="3D logo" />
      </button>
      {/* <div className="animation-container">
        {["I", "n", "3", "D", "-", "T", "e", "c", "h"].map((letter, idx) => (
          <span className="animation-letter" key={idx}>
            {letter}
          </span>
        ))}
      </div> */}
    </div>
  );
}
