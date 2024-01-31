import React, { useState, useContext } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "./nav/Button";
import { getCameraCoords } from "../common/getCameraCoords";
import AppContext from "../context/context";
import { useTranslation } from "react-i18next";

export function Navbar({
  setCategorySelected,
  setSelectedIsland,
  setPosition,
  setTarget,
  selectedIsland,
}) {
  const appContext = useContext(AppContext);

  const { t } = useTranslation();

  const handleNavClick = (ref, label) => {
    setCategorySelected(label);
  };

  const navOpened = 1;
  const navClosed = 0;

  const toggleNavbar = () => {
    appContext.setNavState((prevNavState) =>
      prevNavState ? navClosed : navOpened
    );
    // setNavbarVisible((prevState) => !prevState);
  };

  return (
    <div
      style={
        appContext.navState == navOpened
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
      {appContext.navState == navOpened ? (
        <div className="nav-wrapper-open">
          <NavExplorer
            handleNavClick={handleNavClick}
            toggleNavbar={toggleNavbar}
          />
        </div>
      ) : (
        <div>
          {!appContext.navState && (
            <>
              <div className="outer">
                <div className="inner">
                  <label
                    onClick={() => {
                      toggleNavbar();
                    }}
                  >
                    {t("explore")}
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
            </>
          )}
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
        <CancelIcon
          className="nav-contact-cancel-icon"
          onClick={() => {
            setSelectedIsland(null);
            toggleNavbar();
          }}
        />

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
    );
  }
}
