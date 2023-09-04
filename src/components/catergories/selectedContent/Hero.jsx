import React, { useState } from "react";

function Hero({ setSelectedContent }) {
  const [isColoured, setIsColoured] = useState();
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
      <header className="hero__header">
        <h1 className="falling-title">John Doe</h1>
        <h2>Frontend Developer</h2>
        {/* <MyComponentMorph /> */}
        <button onClick={() => setSelectedContent(false)}>Close</button>
      </header>
    </div>
  );
}

export default Hero;
