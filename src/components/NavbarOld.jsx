import React, { useContext } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "./nav/Button";
import { getCameraCoords } from "../common/getCameraCoords";
import AppContext from "../context/context";
import { t } from "../common/t";

export function Navbar({
  setCategorySelected,
  setSelectedIsland,
  setPosition,
  setTarget,
  selectedIsland,
}) {
  const appContext = useContext(AppContext);

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
              zIndex: 10,
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
                {t("Zoom out")}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );

  function NavExplorer({ toggleNavbar }) {
    const titles = [
      "artificialIntelligence",
      "security",
      "customization",
      "microsoft",
      "medicine",
      "military",
    ];

    const buttons = titles.map((name, idx) => {
      return (
        <Button
          idx={idx}
          name={t(name)}
          setPosition={setPosition}
          setTarget={setTarget}
          style={
            name == "artificialIntelligence" ? { textAlign: "center" } : null
          }
          setSelectedIsland={setSelectedIsland}
          selectedIsland={selectedIsland}
        />
      );
    });

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
          {/* <Button
            idx={4}
            name={"Artifical Intelligence"}
            setPosition={setPosition}
            setTarget={setTarget}
            style={{ textAlign: "center" }}
            setSelectedIsland={setSelectedIsland}
            selectedIsland={selectedIsland}
          />
          <Button
            idx={3}
            name={"Security"}
            setPosition={setPosition}
            setTarget={setTarget}
            setSelectedIsland={setSelectedIsland}
            selectedIsland={selectedIsland}
          />
          <Button
            idx={3}
            name={"Customization"}
            setPosition={setPosition}
            setTarget={setTarget}
            setSelectedIsland={setSelectedIsland}
            selectedIsland={selectedIsland}
          />

          <Button
            idx={4}
            name={"Microsoft"}
            setPosition={setPosition}
            setTarget={setTarget}
            setSelectedIsland={setSelectedIsland}
            selectedIsland={selectedIsland}
          />
          <Button
            idx={1}
            name={"Medicine"}
            setPosition={setPosition}
            setTarget={setTarget}
            setSelectedIsland={setSelectedIsland}
            selectedIsland={selectedIsland}
          />
          <Button
            idx={2}
            name={"Military"}
            setPosition={setPosition}
            setTarget={setTarget}
            setSelectedIsland={setSelectedIsland}
            selectedIsland={selectedIsland}
          /> */}
          {buttons}
        </div>

        <Button
          idx={5}
          name={"Back to full view"}
          style={{ marginTop: "1em", width: "70%" }}
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
