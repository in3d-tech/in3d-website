import React, { useRef, useState, useContext, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MagnifyingGlass from "../ornaments/MagnifyingGlass";
import AppContext from "../../context/context";
import { HorizontalSelectedContent } from "./HorizontalSelectedContent";
import { SelectedContextNew } from "../catergories/SelectedContentNew";
import { useTranslation } from "react-i18next";

export function HorizontalNav() {
  const [ar, setAr] = useState(false);
  const appContext = useContext(AppContext);

  const horizonalNavOpened = 2;
  const navClosed = 0;

  const toggleNavbar = (newState) => {
    appContext.setNavState((prevState) => {
      if (prevState == horizonalNavOpened) return null;
      return newState;
    });

    // setNavbarVisible((prevState) => !prevState);
  };

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
            <HorizontalNavOpen appContext={appContext} />
          </div>
        ) : (
          <>
            <div
              className="h-nav-in3d-icon"
              style={{ position: "absolute", top: "5em" }}
            >
              <img style={{ width: "10em" }} src="/in3dlogo.png" />
            </div>
            <MenuIcon
              className="nav-close-icon"
              sx={{ color: "white", fontSize: 50 }}
              onClick={() => {
                toggleNavbar(horizonalNavOpened);
              }}
            />
          </>
        )}
      </div>
    </>
  );
}

function HorizontalNavOpen({ appContext }) {
  const [selectedContent, setSelectedContent] = useState(null);
  const [allowClick, setAllowClick] = useState(false);
  const [hovered, setIsHovered] = useState(false);
  const { t } = useTranslation();
  const contentRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (!allowClick) setAllowClick(true);
    }, [2500]);
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
    const baseStyles = {
      height: "100%",
      width: "100vw",
      position: "absolute",
      animation: "zoomOut 0.8s ease-out forwards",
      // animation: "fadeIn 0.8s ease-out forwards",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: "-20",
    };
    let url;

    switch (hovered) {
      case "Customization":
        url = "/customization-img.png";
        break;
      case "Artifical Intelligence":
        url = "/where-is-ai-used.jpg";
        break;
      case "Microsoft":
        url = "/microsoft-ar.png";
        break;
      case "Military":
        url = "/military-ar.jpg";
        break;
      case "Security":
        url = "/security-vr.avif";
        break;
      case "Medicine":
        url = "/another-med.jpg";
        break;
      default:
        url = "/temp-5.jpg";
        break;
    }

    return {
      ...baseStyles,
      backgroundImage: `url(${url}`,
    };
  };

  const titles = [
    "artificialIntelligence",
    "security",
    "customization",
    "microsoft",
    "medicine",
    "military",
  ];

  const contentSelections = titles.map((title, idx) => (
    <MagnifyingGlass
      setIsHovered={setIsHovered}
      handleNavClick={handleNavClick}
      title={t(`${title}`)}
      hovered={hovered}
      delay={idx == 0 ? 1.3 : idx * 0.5}
      key={idx}
      setSelectedContent={setSelectedContent}
      allowClick={allowClick}
    />
  ));

  return selectedContent ? (
    <div>
      {/* <HorizontalSelectedContent
        setSelectedContent={setSelectedContent}
        title={selectedContent}
      /> */}
      <SelectedContextNew
        setSelectedContent={setSelectedContent}
        title={selectedContent}
      />
    </div>
  ) : (
    // <div
    //   className={`h-nav-selected-wrapper ${
    //     selectedContent //horizonalNavOpened
    //       ? "h-nav-wrapper-open"
    //       : ""
    //   }`}
    // ></div>
    // <div className="h-nav-open">
    <div className={`horizontal-nav-open-titles-wrapper`}>
      {hovered && <div className="hoverZoom" style={getbgImage()}></div>}
      {/* <div className="hoverZoom" style={getbgImage()}></div> */}

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

      <div className="h-nav-bottom-section">
        <button
          className="button-52"
          role="button"
          onClick={() => setSelectedContent("contact")}
        >
          Contact Us
        </button>
      </div>
    </div>
    // </div>
  );
}
