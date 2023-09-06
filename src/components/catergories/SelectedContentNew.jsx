import { useState, useEffect, useRef, useLayoutEffect } from "react";
// import styled from "styled-components";

import Hero from "./selectedContent/Hero";
import ScrollSection from "./selectedContent/ScrollSection";
import Footer from "./selectedContent/Footer";
import { SideText } from "./selectedContent/SideText";
import CloseIcon from "@mui/icons-material/Close";

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
      <div>
        <CloseIcon
          // ref={closeBtnRef}
          className="nav-close-icon"
          sx={{
            // color: "black",
            fontSize: 60,
            position: "fixed",
            top: "1em",
            right: "1em",
            zIndex: 1,
          }}
          onClick={() => {
            setSelectedContent(false);
          }}
        />
      </div>

      {textSection ? (
        <SideText title={title} textSection={textSection} />
      ) : null}
      <Hero setSelectedContent={setSelectedContent} title={title} />
      <ScrollSection
        setSelectedContent={setSelectedContent}
        setTextSection={setTextSection}
      />
      <Footer />
    </div>
  );
}
