import { useProgress } from "@react-three/drei";
import { startTransition, useEffect, useRef, useState } from "react";

export function LandingComponent({ setIsLanding }) {
  const [navOpen, setNavOpen] = useState(false);

  const btnRef = useRef();

  const { progress } = useProgress();

  return navOpen ? null : (
    // <NavOpen handleNavClick={handleNavClick} toggleNavbar={toggleNavbar} />
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
      {/* <span>{`${progress} % loaded`}</span> */}

      <div
        // onClick={() => startTransition(() => setIsLanding(false))}
        className={`enter-btn`}
      >
        <img src="/in3dlogo.png" />
      </div>

      <div className="animation-container">
        <span className="animation-letter">I</span>
        <span className="animation-letter">n</span>
        <span className="animation-letter">3</span>
        <span className="animation-letter">D</span>
        <span className="animation-letter">-</span>
        <span className="animation-letter">T</span>
        <span className="animation-letter">e</span>
        <span className="animation-letter">c</span>
        <span className="animation-letter">h</span>
      </div>
    </div>
  );
}
