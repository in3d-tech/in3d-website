import React, { useRef, useState, useMemo, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
// import { NavItem } from "./nav/NavItem";
// import { About, Contact } from "./nav/AboutContact";
// import { capitalizeFirstLetter } from "../common/capitzalize";
import CloseIcon from "@mui/icons-material/Close";
import MagnifyingGlass from "../ornaments/MagnifyingGlass";
import { NavTopicSelection } from "./NavTopicSelection";

export function HorizontalNav({ setSelectedNav, setCategorySelected }) {
  const healing = useRef();
  const taasiaSecurity = useRef();
  const taasia = useRef();
  const microsoft = useRef();
  const gofeiSecurity = useRef();
  const customize = useRef();

  const handleNavClick = (ref, label) => {
    console.log({ label });
    setSelectedNav(label);
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
    setCategorySelected(label);
  };

  const [navbarVisible, setNavbarVisible] = useState(false);
  const [openInfoNav, setOpenInfoNav] = useState("");

  const delay = 2000;

  console.count();
  const toggleNavbar = () => {
    setNavbarVisible((prevState) => !prevState);
    if (!navbarVisible) {
      setTimeout(() => {
        console.log("hello world!!");
      }, 2000);
    }
  };
  const handleCategoryClick = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inLine: "nearest",
      });
    }
  };
  return (
    <>
      <div
        // style={
        //   navbarVisible
        //     ? {
        //         width: "100vw",
        //         background: "black",
        //         height: "100vh",
        //       }
        //     : {}
        // }
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
            {/* <div>
        <div className="outer">
          <div className="inner">
            <label
              onClick={() => {
                toggleNavbar();
              }}
            >
              Open
            </label>
          </div>
        </div>
      </div> */}
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

export const NavOpen = React.memo(({ handleNavClick, toggleNavbar }) => {
  return (
    <div className="nav-container-open">
      {/* <div className="nav-open-line"></div> */}
      <div className="nav-open-lines-bg"></div>
      <div className="nav-full-wrapper"></div>
      <div className="nav-open-inner-nav-wrapper">
        <div
          style={{
            marginRight: "1em",
            marginTop: "1em",
          }}
        >
          <div className="outer">
            <div className="inner">
              <label
                onClick={() => {
                  // setShowNav(false);
                  toggleNavbar();
                }}
              >
                Close
              </label>
            </div>
          </div>
        </div>
        <div>
          <h3 className="nav-open-header">
            A look at some of our past and current projects
          </h3>
        </div>
        <div style={{ width: "5%" }}></div>
      </div>{" "}
      <div
        style={{
          marginTop: "1%",
          width: "90%",
          borderBottom: "1px solid white",
          justifySelf: "center",
          alignSelf: "center",
          opacity: 0.6,
        }}
      ></div>
      <div className="nav-open-options">
        <div className="nav-open-list">
          {/* <NavItem
            handleNavClick={handleNavClick}
            name="רפואה"
            src={"../../img/health-img.jpg"}
          /> */}
        </div>
      </div>
    </div>
  );
});

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
