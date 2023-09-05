import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero({ setSelectedContent, title }) {
  const [isColoured, setIsColoured] = useState();
  const titleRef = useRef();

  useEffect(() => {
    // Create a GSAP timeline for the initial falling animation
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { y: "-100%" }, // Start from the top (-100%)
      { y: "0%", ease: "power2.out", duration: 2 } // End at the original position
    );

    // Add a scroll-triggered animation that moves the title upward
    gsap.to(titleRef.current, {
      y: "-30%", // Adjust this value to control how far upwards the title moves
      ease: "none",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom", // The animation starts when the top of the title hits the bottom of the viewport
        end: "+=100%", // The animation ends when the scroll has moved down the height of the viewport
        scrub: true, // Smooths out the animation and "locks" it to the scrollbar
      },
    });
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        background: 'url("/another-med.jpg") no-repeat center',
        backgroundSize: "cover",
        filter: `grayscale(${isColoured ? "0%" : "100%"})`,
        animation: "fadeInHalf 1s",
        transition: "filter 1s ease",
      }}
      onMouseOver={() => setIsColoured(true)}
      onMouseOut={() => setIsColoured(false)}
    >
      <div
        style={{
          position: "absolute",
          fontSize: "8em",
          left: "50%",
          top: "50%",
        }}
        className="falling-title" // Add a class name to target the title element
      >
        {title}
      </div>
      <header className="hero__header">
        {/* <h1 className="falling-title">John Doe</h1>
        <h2>Frontend Developer</h2> */}
        {/* <MyComponentMorph /> */}
      </header>
    </div>
  );
}

export default Hero;
