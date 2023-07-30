import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "./nav/Button";
import { getCameraCoords } from "../common/getCameraCoords";
// import useTimeout from "../common/useTimeout";

export function Navbar({
  setCategorySelected,
  setSelectedIsland,
  setPosition,
  setTarget,
  selectedIsland,
}) {
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
            }
          : {
              position: "fixed",
              top: "3em",
              right: "3em",
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
              getCameraCoords({ idx: 5, setTarget, setPosition });
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

        <div className="nav-explorer-btn-container">
          <Button
            idx={4}
            name={"Artifical Intelligence"}
            color={"nav-expl-btn-green"}
            setPosition={setPosition}
            setTarget={setTarget}
            style={{ textAlign: "center" }}
            setSelectedIsland={setSelectedIsland}
            selectedIsland={selectedIsland}
          />
          <Button
            idx={3}
            name={"Security"}
            color={"nav-expl-btn-red"}
            setPosition={setPosition}
            setTarget={setTarget}
            setSelectedIsland={setSelectedIsland}
            selectedIsland={selectedIsland}
          />
          <Button
            idx={3}
            name={"Customization"}
            color={"nav-expl-btn-yellow"}
            setPosition={setPosition}
            setTarget={setTarget}
            setSelectedIsland={setSelectedIsland}
            selectedIsland={selectedIsland}
          />

          <Button
            idx={4}
            name={"Microsoft"}
            color={"nav-expl-btn-green"}
            setPosition={setPosition}
            setTarget={setTarget}
            setSelectedIsland={setSelectedIsland}
            selectedIsland={selectedIsland}
          />
          <Button
            idx={1}
            name={"Medicine"}
            color={"nav-expl-btn-red"}
            setPosition={setPosition}
            setTarget={setTarget}
            setSelectedIsland={setSelectedIsland}
            selectedIsland={selectedIsland}
          />
          <Button
            idx={2}
            name={"Military"}
            color={"nav-expl-btn-yellow"}
            setPosition={setPosition}
            setTarget={setTarget}
            setSelectedIsland={setSelectedIsland}
            selectedIsland={selectedIsland}
          />
          {/* </div> */}
        </div>

        <Button
          idx={5}
          name={"Back to full view"}
          style={{ marginTop: "1em", width: "70%" }}
          color={"nav-expl-btn-orange"}
          setSelectedIsland={setSelectedIsland}
          selectedIsland={selectedIsland}
          setPosition={setPosition}
          setTarget={setTarget}
          isGoBack
        />
      </div>
      // </div>
    );
  }
}

{
  /* <Button
                idx={3}
                name={"Customization"}
                color={"nav-expl-btn-orange"}
            setPosition={setPosition}
        setTarget={setTarget}              />
              <Button
                idx={3}
                name={"option 5"}
                color={"nav-expl-btn-orange"}
            setPosition={setPosition}
        setTarget={setTarget}              />
              <Button
                idx={5}
                name={"option 6"}
                style={{ marginTop: "1.5em" }}
                color={"nav-expl-btn-orange"}
            setPosition={setPosition}
        setTarget={setTarget}              /> */
}
