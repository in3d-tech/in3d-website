import { useProgress } from "@react-three/drei";
import { startTransition, useEffect, useRef, useState } from "react";

export function LandingComponent({ setIsLanding, setCategorySelected }) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [newClass, setNewClass] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const btnRef = useRef();

  const { progress } = useProgress();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimationComplete(true);
    }, 5000); // Adjust the duration as needed

    return () => clearTimeout(timeout);
  }, []);

  const toggleNavbar = () => {
    console.log({ newClass });
    setNewClass((prevState) => !prevState);

    setTimeout(
      () => setNavOpen((prevState) => !prevState),
      navOpen ? 100 : 800
    );
  };

  const handleNavClick = (ref, label) => {
    setCategorySelected(label);
  };

  return navOpen ? null : (
    // <NavOpen handleNavClick={handleNavClick} toggleNavbar={toggleNavbar} />
    <div className="landing-screen-wrapper">
      <div
        className={
          newClass ? "landing-screen-nav-open" : "landing-screen-nav-btn"
        }
        onClick={() => {
          // setNewClass((prevState) => !prevState);
          startTransition(() => setIsLanding(false));
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
