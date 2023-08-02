import React, { useRef, useState, useMemo, useContext, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MagnifyingGlass from "../ornaments/MagnifyingGlass";
import { NavTopicSelection } from "./NavTopicSelection";
import AppContext from "../../context/context";
import { HorizontalSelectedContent } from "./HorizontalSelectedContent";

export function HorizontalNav() {
  const appContext = useContext(AppContext);

  const horizonalNavOpened = 2;
  const navClosed = 0;

  const toggleNavbar = () => {
    appContext.setNavState((prevState) =>
      prevState ? navClosed : horizonalNavOpened
    );

    // setNavbarVisible((prevState) => !prevState);
  };

  console.log({ context: appContext.navState });

  return (
    <>
      <div
        className={`horizontal-nav-wrapper ${
          appContext.navState == horizonalNavOpened
            ? "horizontal-nav-wrapper-open"
            : ""
        }`}
      >
        {appContext.navState == horizonalNavOpened ? (
          <div className="nav-open-content">
            <CloseIcon
              className="nav-close-icon"
              sx={{
                color: "white",
                fontSize: 60,
                position: "absolute",
                top: "1em",
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
            <div
              className="h-nav-in3d-icon"
              style={{ position: "absolute", top: "5em" }}
            >
              <img style={{ width: "10em" }} src="/img/in3dlogo.png" />
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
  const [selectedContent, setSelectedContent] = useState(null);
  const [allowClick, setAllowClick] = useState(false);
  const [hovered, setIsHovered] = useState(false);

  const contentRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (!allowClick) setAllowClick(true);
    }, [3000]);
  });

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
      return {
        background: 'url("/where-is-ai-used.jpg") no-repeat center / cover',
      };
    if (hovered == "Microsoft")
      return {
        background: 'url("/microsoft-ar.png") no-repeat center / cover',
      };
    if (hovered == "Military")
      return { background: 'url("/military-ar.jpg") no-repeat center / cover' };
    if (hovered == "Security")
      return {
        background: 'url("/security-vr.avif") no-repeat center / cover',
      };

    return { background: 'url("/another-med.jpg") no-repeat center / cover' };
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
      key={idx}
      setSelectedContent={setSelectedContent}
      allowClick={allowClick}
    />
  ));

  return selectedContent ? (
    <div>
      <HorizontalSelectedContent
        selectedContent={selectedContent}
        setSelectedContent={setSelectedContent}
        title={selectedContent}
      />
    </div>
  ) : (
    <div className="h-nav-open">
      <div className={`horizontal-nav-open-titles-wrapper`}>
        {hovered && <div className="ahhh" style={getbgImage()}></div>}
        <div className="h-nav-open-3d-icon h-nav-in3d-icon">
          <img
            style={{
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
        <div className="h-nav-bottom-section">
          {/* <div className="in-touch-btn"></div> */}{" "}
          {/* <div className="button-container"> */}
          <button className="button-52" role="button">
            Contact Us
          </button>
          {/* </div> */}
        </div>
      </div>

      {/* <NavTopicSelection contentRef={contentRef} /> */}
    </div>
  );
}
