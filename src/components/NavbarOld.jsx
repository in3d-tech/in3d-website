import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "./nav/Button";
// import useTimeout from "../common/useTimeout";

export function Navbar({ setCategorySelected, onChange, setSelectedIsland }) {
  const handleNavClick = (ref, label) => {
    setCategorySelected(label);
  };

  const [navbarVisible, setNavbarVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

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
      style={
        navbarVisible
          ? {
              position: "fixed",
              top: "0em",
              right: "0em",
              zIndex: 10,
              // height: "30em",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              // width: "100vw",
            }
          : {
              position: "fixed",
              top: "3em",
              right: "3em",
              // height: "30em",
            }
      }
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
          <div
            style={{
              color: "white",
              marginTop: "1em",
              textAlign: "center",
              height: "2em",
            }}
            onClick={() => {
              setSelectedIsland(null);
              onChange(5);
            }}
          >
            Zoom Out
          </div>
        </div>
      )}
    </div>
  );

  function NavExplorer({ toggleNavbar }) {
    return (
      <div
        className="nav-open-container"
        // onMouseOver={() => setHovered((prevState) => !prevState)}
      >
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
            fontSize: "2em",
          }}
        >
          Our Work With:
        </p>

        <div className="nav-explorer-btn-container">
          {/* <div className="nav-btns-wrapper"> */}
          {/* <div className="button" id="button-6">
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
            </div> */}
          <Button
            idx={0}
            name={"Artifical Intelligence"}
            color={"nav-expl-btn-green"}
            onChange={onChange}
            style={{ textAlign: "center" }}
            setSelectedIsland={setSelectedIsland}
            isGoBack
          />
          <Button
            idx={1}
            name={"Security"}
            color={"nav-expl-btn-red"}
            onChange={onChange}
            setSelectedIsland={setSelectedIsland}
            isGoBack
          />
          <Button
            idx={2}
            name={"Customization"}
            color={"nav-expl-btn-yellow"}
            onChange={onChange}
            setSelectedIsland={setSelectedIsland}
            isGoBack
          />
          {/* </div> */}
          {/* <div className="nav-btns-wrapper"> */}
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
            setSelectedIsland={setSelectedIsland}
            isGoBack
          />
          <Button
            idx={1}
            name={"Medicine"}
            color={"nav-expl-btn-red"}
            onChange={onChange}
            setSelectedIsland={setSelectedIsland}
          />
          <Button
            idx={2}
            name={"Military"}
            color={"nav-expl-btn-yellow"}
            onChange={onChange}
            setSelectedIsland={setSelectedIsland}
          />
          {/* </div> */}
        </div>

        <Button
          idx={5}
          name={"Back to full view"}
          style={{ marginTop: "1.5em", width: "70%" }}
          color={"nav-expl-btn-orange"}
          onChange={onChange}
          setSelectedIsland={setSelectedIsland}
          isGoBack
        />
      </div>
      // </div>
    );
  }
}
