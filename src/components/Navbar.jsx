import React, { useRef, useState, useMemo } from "react";
import { Html } from "@react-three/drei";
import { NavItem } from "./nav/NavItem";

export function Navbar({
  setSelectedNav,
  setContactNav,
  setAboutNav,
  setCatagorySelected,
}) {
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
    setCatagorySelected(true);
  };

  const [navbarVisible, setNavbarVisible] = useState(false);

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

  const navItems = [
    { label: "רפואה", ref: useRef < HTMLDivElement > null },
    { label: "תעשייה ביטחונית", ref: useRef < HTMLDivElement > null },
    { label: "תעשייה", ref: useRef < HTMLDivElement > null },
    { label: "מייקרוסופט", ref: useRef < HTMLDivElement > null },
    { label: "גופי ביטחון", ref: useRef < HTMLDivElement > null },
    { label: "Customize", ref: useRef < HTMLDivElement > null },
  ];

  return (
    <Html center={false} fullscreen className="nav-container">
      <nav
        style={
          navbarVisible
            ? {
                width: "100vw",
                background: "black",
              }
            : {}
        }
      >
        <div className={navbarVisible ? "nav-wrapper-open" : "nav-wrapper"}>
          {!navbarVisible && (
            <div>
              {" "}
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
            </div>
          )}
          {navbarVisible ? (
            <NavOpen
              handleNavClick={handleNavClick}
              healingRef={healing}
              taasiaSecurityRef={taasiaSecurity}
              taasiaRef={taasia}
              microsoftRef={microsoft}
              gofeiSecurityRef={gofeiSecurity}
              customizeRef={customize}
              handleCategoryClick={handleCategoryClick}
              toggleNavbar={toggleNavbar}
              setCatagorySelected={setCatagorySelected}
            />
          ) : (
            <div>
              <div className="line"></div>
              <ul
                style={{
                  width: "100px",
                  textAlign: "center",
                }}
              >
                <li onClick={() => setAboutNav(true)}>About</li>
                <li onClick={() => setContactNav(true)}>Contact</li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </Html>
  );
}

const NavOpen = React.memo(
  ({
    handleNavClick,
    healingRef,
    taasiaSecurityRef,
    taasiaRef,
    microsoftRef,
    gofeiSecurityRef,
    customizeRef,
    handleCategoryClick,
    toggleNavbar,
  }) => {
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
              Take look at some of our past and current projects
            </h3>
          </div>
          <div style={{ width: "5%" }}></div>
        </div>
        <div
          style={{
            marginTop: "1%",
            width: "90%",
            borderBottom: "1px solid white",
            justifySelf: "center",
            alignSelf: "center",
            opacity: 0.9,
          }}
        ></div>
        <div className="nav-open-options">
          <div className="nav-open-list">
            <ul className="outer-ul">
              <NavItem
                handleNavClick={handleNavClick}
                name="רפואה"
                src={"../../img/health-img.jpg"}
              />
              <NavItem
                handleNavClick={handleNavClick}
                name={"תעשייה ביטחונית"}
              />
              <NavItem handleNavClick={handleNavClick} name="תעשייה" />
            </ul>
          </div>
          <div className="nav-open-list">
            <ul className="outer-ul">
              <NavItem handleNavClick={handleNavClick} name="מייקרוסופט" />
              <NavItem handleNavClick={handleNavClick} name="גופי ביטחון" />
              <NavItem handleNavClick={handleNavClick} name="Customize" />
            </ul>
          </div>
        </div>
      </div>
    );
  }
);
