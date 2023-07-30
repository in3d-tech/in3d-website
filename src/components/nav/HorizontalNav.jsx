import React, { useRef, useState, useMemo, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
// import { NavItem } from "./nav/NavItem";
// import { About, Contact } from "./nav/AboutContact";
// import { capitalizeFirstLetter } from "../common/capitzalize";
import CloseIcon from "@mui/icons-material/Close";
import MagnifyingGlass from "../ornaments/MagnifyingGlass";
import { NavTopicSelection } from "./NavTopicSelection";

export function HorizontalNav({ setSelectedNav, setCategorySelected }) {
  const [navbarVisible, setNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setNavbarVisible((prevState) => !prevState);
    if (!navbarVisible) {
      setTimeout(() => {
        console.log("hello world!!");
      }, 2000);
    }
  };

  return (
    <>
      <div
        className={`horizontal-nav-wrapper ${
          navbarVisible ? "horizontal-nav-wrapper-open" : ""
        }`}
      >
        {navbarVisible ? (
          <div className="nav-open-content">
            <CloseIcon
              className="nav-close-icon"
              sx={{
                color: "white",
                fontSize: 50,
                position: "absolute",
                top: "4em",
                right: "1em",
              }}
              onClick={() => {
                toggleNavbar();
              }}
            />
            <HorizontalNavOpen />
          </div>
        ) : (
          <>
            <div style={{ position: "absolute", top: "5em" }}>
              <img style={{ width: "100%" }} src="/img/in3dlogo.png" />
            </div>
            <MenuIcon
              className="nav-close-icon"
              sx={{ color: "white", fontSize: 50 }}
              onClick={() => {
                toggleNavbar();
              }}
            />
          </>
        )}
      </div>
    </>
  );
}

function HorizontalNavOpen() {
  const contentRef = useRef();

  const [hovered, setIsHovered] = useState(false);

  const handleNavClick = (ref, label) => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  const getbgImage = () => {
    if (hovered == "Customization")
      return { background: 'url("/customization-img.png") no-repeat center' };
    if (hovered == "Artifical Intelligence")
      return { background: 'url("/where-is-ai-used.jpg") no-repeat center' };

    return { background: 'url("/another-med.jpg") no-repeat center' };
  };

  const titles = [
    "Artifical Intelligence",
    "Security",
    "Customization",
    "Microsoft",
    "Medicine",
    "Military",
  ];

  const contentSelections = titles.map((title, idx) => (
    <MagnifyingGlass
      setIsHovered={setIsHovered}
      handleNavClick={handleNavClick}
      title={title}
      hovered={hovered}
      delay={idx == 0 ? 1.3 : idx * 0.5}
    />
  ));

  return (
    <div className="h-nav-open">
      <div className={`horizontal-nav-open-titles-wrapper`}>
        {hovered && <div className="ahhh" style={getbgImage()}></div>}
        <div>
          <img
            style={{
              position: "absolute",
              top: "2em",
              left: 0,
              width: "12em",
            }}
            src="/in3dlogo.png"
          />
        </div>
        <div className="horizontal-nav-open-titles-container">
          {contentSelections}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "10em",
            borderBottom: "1px solid rgb(255, 255, 255, 0.6)",
            width: "80vw",
            marginTop: "3em",
          }}
        ></div>
      </div>

      <NavTopicSelection contentRef={contentRef} />
    </div>
  );
}
