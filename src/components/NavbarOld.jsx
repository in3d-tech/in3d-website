import React, { useState } from "react";
import { Html } from "@react-three/drei";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "./nav/Button";
// import useTimeout from "../common/useTimeout";

export function Navbar({ setCategorySelected, onChange }) {
  const handleNavClick = (ref, label) => {
    setCategorySelected(label);
  };

  const [navbarVisible, setNavbarVisible] = useState(false);
  const [openInfoNav, setOpenInfoNav] = useState("");

  const delay = 2000;

  const toggleNavbar = () => {
    setNavbarVisible((prevState) => !prevState);
    if (!navbarVisible) {
      setTimeout(() => {
        console.log("hello world!!");
      }, 2000);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "2em",
        right: "2em",
        height: "30em",
      }}
    >
      {navbarVisible ? (
        <div className="nav-wrapper-open">
          <NavExplorer
            handleNavClick={handleNavClick}
            toggleNavbar={toggleNavbar}
          />
        </div>
      ) : (
        <div>
          <div className="outer">
            <div className="inner">
              <label
                onClick={() => {
                  toggleNavbar();
                }}
              >
                Explore
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function NavExplorer({ toggleNavbar }) {
    return (
      <div className="nav-open-container">
        {/* <div className="outer">
          <div className="inner">
            <label
              onClick={() => {
                toggleNavbar();
              }}
            >
              close
            </label>
          </div>
        </div> */}
        <CancelIcon
          className="nav-contact-cancel-icon"
          onClick={() => toggleNavbar()}
        />

        {/* <div> */}
        <div className="nav-open-lines-bg"></div>

        <p
          style={{
            color: "white",
            textAlign: "center",
            padding: "4px",
            fontFamily: "Gotham",
            fontSize: "1.5em",
          }}
        >
          Our Work With:
        </p>

        <div className="nav-explorer-btn-container">
          <div className="nav-btns-wrapper">
            <div className="button" id="button-6">
              <div id="spin"></div>
              <a href="#">Medicine</a>
            </div>
            <div className="button" id="button-6">
              <div id="spin"></div>
              <a href="#">Microsoft</a>
            </div>
            <div className="button" id="button-6">
              <div id="spin"></div>
              <a href="#">Military</a>
            </div>
            {/* <Button
                idx={0}
                name={"health"}
                color={"nav-expl-btn-green"}
                onChange={onChange}
              />
              <Button
                idx={1}
                name={"Microsoft"}
                color={"nav-expl-btn-red"}
                onChange={onChange}
              />
              <Button
                idx={2}
                name={"Army"}
                color={"nav-expl-btn-yellow"}
                onChange={onChange}
              /> */}
          </div>
          <div className="nav-btns-wrapper">
            {/* <Button
                idx={3}
                name={"Customization"}
                color={"nav-expl-btn-orange"}
                onChange={onChange}
              />
              <Button
                idx={3}
                name={"option 5"}
                color={"nav-expl-btn-orange"}
                onChange={onChange}
              />
              <Button
                idx={5}
                name={"option 6"}
                style={{ marginTop: "1.5em" }}
                color={"nav-expl-btn-orange"}
                onChange={onChange}
              /> */}
            <Button
              idx={0}
              name={"Microsoft"}
              color={"nav-expl-btn-green"}
              onChange={onChange}
            />
            <Button
              idx={1}
              name={"Medicine"}
              color={"nav-expl-btn-red"}
              onChange={onChange}
            />
            <Button
              idx={2}
              name={"Military"}
              color={"nav-expl-btn-yellow"}
              onChange={onChange}
            />
          </div>
        </div>

        <Button
          idx={5}
          name={"Back to full view"}
          style={{ marginTop: "1.5em", width: "70%" }}
          color={"nav-expl-btn-orange"}
          onChange={onChange}
        />
      </div>
      // </div>
    );
  }
}

// export const NavOpen = ({ handleNavClick, toggleNavbar }) => {
//   const [visibilty, setVisibility] = useState(false);
//   return (
//     <div className="nav-container-open">
//       {/* <div className="nav-open-line"></div> */}
//       <div className="nav-open-lines-bg"></div>
//       <div className="nav-full-wrapper"></div>
//       <div className="nav-open-inner-nav-wrapper">
//         <div
//           style={{
//             marginRight: "1em",
//             marginTop: "1em",
//           }}
//         >
//           <div className="outer">
//             <div className="inner">
//               <label
//                 onClick={() => {
//                   // setShowNav(false);
//                   toggleNavbar();
//                 }}
//               >
//                 Close
//               </label>
//             </div>
//           </div>
//         </div>
//         <div>
//           <h3 className="nav-open-header">
//             A look at some of our past and current projects
//           </h3>
//         </div>
//         <div style={{ width: "5%" }}></div>
//       </div>
//       <div
//         style={{
//           marginTop: "1%",
//           width: "90%",
//           borderBottom: "1px solid white",
//           justifySelf: "center",
//           alignSelf: "center",
//           opacity: 0.6,
//         }}
//       ></div>
//       <div className="nav-open-options">
//         <div className="nav-open-list">
//           <ul className="outer-ul">
//             <NavItem
//               handleNavClick={handleNavClick}
//               name="רפואה"
//               src={"../../img/health-img.jpg"}
//             />
//             <NavItem
//               handleNavClick={handleNavClick}
//               name={"תעשייה ביטחונית"}
//               src={"../../img/taasia-b-icon.png"}
//             />
//             <NavItem
//               handleNavClick={handleNavClick}
//               name="תעשייה"
//               src={"../../img/tassia-icon.png"}
//             />
//           </ul>
//         </div>
//         <div className="nav-open-list">
//           <ul className="outer-ul">
//             <NavItem handleNavClick={handleNavClick} name="מייקרוסופט" />
//             <NavItem
//               handleNavClick={handleNavClick}
//               name="גופי ביטחון"
//               src={"../../img/body-icon.png"}
//             />
//             <NavItem
//               handleNavClick={handleNavClick}
//               name="Customize"
//               src={"../../img/customize-icon.png"}
//             />
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// {openInfoNav ? (
//   <>
//     {/* <div className="about-contact-nav">
//       <div className="about-contact-nav-title">{openInfoNav}</div>
//     </div> */}
//     <div className="open-info-nav-extension">
//       {/* <div className="about-contact-nav-title">{openInfoNav}</div> */}
//       <h2 className="thing">
//         {openInfoNav == "About" ? "About us" : "Send us a message!"}
//       </h2>
//       <CancelIcon
//         className="nav-contact-cancel-icon"
//         onClick={() => setOpenInfoNav("")}
//       />
//       {openInfoNav == "About" ? (
//         <About openInfoNav={openInfoNav} />
//       ) : (
//         <Contact openInfoNav={openInfoNav} />
//       )}
//     </div>
//   </>
// ) : (
