import React, { useRef, useState, useMemo, useEffect } from "react";
import { Html } from "@react-three/drei";
import { NavItem } from "./nav/NavItem";
import { About, Contact } from "./nav/AboutContact";
import { capitalizeFirstLetter } from "../common/capitzalize";
import CancelIcon from "@mui/icons-material/Cancel";
// import useTimeout from "../common/useTimeout";

export function Navbar({ setSelectedNav, setCategorySelected }) {
  const healing = useRef();
  const taasiaSecurity = useRef();
  const taasia = useRef();
  const microsoft = useRef();
  const gofeiSecurity = useRef();
  const customize = useRef();

  const [navbarVisible, setNavbarVisible] = useState(false);
  const [openInfoNav, setOpenInfoNav] = useState("");
  // const [navVisibility, setNavVisibility] = useState(false);

  const delay = 2000;

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

  // useEffect(() => {
  //   if (openInfoNav) {
  //     useTimeout(() => setNavVisibility(true), 10000);
  //   }
  // }, [openInfoNav]);

  return (
    <Html center={false} fullscreen>
      <div className="new-nav-wrapper">
        <div className="hello-world-two">hello world!</div>
      </div>
      {/* <Html center={false} position={[0, -20, 0]}> */}
      <div className="new-about-contact-wrapper">
        <div className="new-nav-bottom-container">
          <div className="new-nav-bottom-btns">About</div>
          <div className="new-nav-bottom-btns">Contact</div>
        </div>
      </div>
      {/* </Html> */}
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
