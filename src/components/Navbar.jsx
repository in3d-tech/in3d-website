import React, { useRef, useState, useMemo } from "react";
import { Html } from "@react-three/drei";
import { NavItem } from "./nav/NavItem";
import { About, Contact } from "./nav/AboutContact";
import { capitalizeFirstLetter } from "../common/capitzalize";
import CancelIcon from "@mui/icons-material/Cancel";

export function Navbar({ setSelectedNav, setCategorySelected }) {
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
    <Html center={false} fullscreen>
      <nav
        style={
          navbarVisible
            ? {
                width: "100vw",
                background: "black",
              }
            : {}
        }
        className={openInfoNav ? "open-info-nav" : ""}
      >
        {openInfoNav ? (
          <>
            {/* <div className="about-contact-nav">
              <div className="about-contact-nav-title">{openInfoNav}</div>
            </div> */}
            <div className="open-info-nav-extension">
              {/* <div className="about-contact-nav-title">{openInfoNav}</div> */}
              <h2 className="thing">
                {openInfoNav == "About" ? "About us" : "Send us a message!"}
              </h2>
              <CancelIcon
                className="nav-contact-cancel-icon"
                onClick={() => setOpenInfoNav("")}
              />
              {openInfoNav == "About" ? (
                <About openInfoNav={openInfoNav} />
              ) : (
                <Contact openInfoNav={openInfoNav} />
              )}
              {/* <button
                style={{ position: "absolute", right: "1em", bottom: "1em" }}
                onClick={() => setOpenInfoNav("")}
              >
                Close
              </button> */}
            </div>
          </>
        ) : (
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
                setCategorySelected={setCategorySelected}
              />
            ) : (
              <div>
                <div className="line"></div>
                <ul className="bottom-nav-list">
                  <li
                    className="bottom-nav-list-option"
                    onClick={() => setOpenInfoNav("About")}
                  >
                    About
                  </li>
                  <li
                    className="bottom-nav-list-option"
                    style={{ marginTop: "8px" }}
                    onClick={() => setOpenInfoNav("Contact Us")}
                  >
                    Contact
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>
    </Html>
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
      </div>
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
          <ul className="outer-ul">
            <NavItem
              handleNavClick={handleNavClick}
              name="רפואה"
              src={"../../img/health-img.jpg"}
            />
            <NavItem
              handleNavClick={handleNavClick}
              name={"תעשייה ביטחונית"}
              src={"../../img/taasia-b-icon.png"}
            />
            <NavItem
              handleNavClick={handleNavClick}
              name="תעשייה"
              src={"../../img/tassia-icon.png"}
            />
          </ul>
        </div>
        <div className="nav-open-list">
          <ul className="outer-ul">
            <NavItem handleNavClick={handleNavClick} name="מייקרוסופט" />
            <NavItem
              handleNavClick={handleNavClick}
              name="גופי ביטחון"
              src={"../../img/body-icon.png"}
            />
            <NavItem
              handleNavClick={handleNavClick}
              name="Customize"
              src={"../../img/customize-icon.png"}
            />
          </ul>
        </div>
      </div>
    </div>
  );
});
