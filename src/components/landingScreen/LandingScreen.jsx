import { useProgress } from "@react-three/drei";
import { useRef, useState } from "react";

export function LandingComponent({ setIsLanding }) {
  const [navOpen, setNavOpen] = useState(false);

  const { progress } = useProgress();

  return navOpen ? null : (
    <div className="landing-screen-wrapper">
      <div
        className={"landing-screen-nav-btn"}
        onClick={() => {
          // setNewClass((prevState) => !prevState);
          setIsLanding(false);
          // toggleNav);
        }}
      >
        {/* Temporary Enter Button */}
        {progress != 100
          ? `${(Math.round(progress * 100) / 100).toFixed(2)} % loaded`
          : "Temporary Enter Button"}
        {/* Quick Explore */}
      </div>

      <button
        className={"landing-screen-nav-btn"}
        onClick={() => {
          setIsLanding(false);
        }}
        aria-label="Navigate"
      >
        {progress != 100
          ? `${(Math.round(progress * 100) / 100).toFixed(2)} % loaded`
          : "Enter Site"}
      </button>

      <button onClick={() => setIsLanding(false)} className={`enter-btn`}>
        <img src="/in3dlogo.png" alt="3D logo" />
      </button>
      <div className="animation-container">
        {["I", "n", "3", "D", "-", "T", "e", "c", "h"].map((letter, i) => (
          <span className="animation-letter" key={i}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
