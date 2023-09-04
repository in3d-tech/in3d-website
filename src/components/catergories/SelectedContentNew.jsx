import { useState, useEffect, useRef, useLayoutEffect } from "react";
// import styled from "styled-components";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./selectedContent/Hero";
import ScrollSection from "./selectedContent/ScrollSection";
import Footer from "./selectedContent/Footer";
import { SideText } from "./selectedContent/SideText";

gsap.registerPlugin(ScrollTrigger);

export function SelectedContextNew({ setSelectedContent, title }) {
  const [textSection, setTextSection] = useState(false);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        background: "white",
      }}
    >
      <div
        style={{
          position: "fixed",
          right: "2em",
          top: "2em",
          width: "300px",
          height: "200px",
          background: "green",
          zIndex: 10000,
        }}
      >
        <button
          style={{ height: "70px", marginTop: "10em", width: "100px" }}
          onClick={() => setSelectedContent(false)}
        >
          Close
        </button>
      </div>
      {textSection ? (
        <SideText title={title} textSection={textSection} />
      ) : null}
      <Hero setSelectedContent={setSelectedContent} />
      <ScrollSection
        setSelectedContent={setSelectedContent}
        setTextSection={setTextSection}
      />
      <Footer />
    </div>
  );
}
