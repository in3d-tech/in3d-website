import React, { useContext } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "./nav/Button";
import { getCameraCoords } from "../common/getCameraCoords";
import AppContext from "../context/context";
import { t } from "../common/t";

export function Navbar({
  setSelectedCategory,
  setPosition,
  setTarget,
  selectedCategory,
}) {
  const appContext = useContext(AppContext);

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
          <NavExplorer toggleNavbar={toggleNavbar} />
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
                  setSelectedCategory(null);
                  getCameraCoords({ setTarget, setPosition, idx: "out" });
                }}
              >
                {t("back")}
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
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          toggleNavbar={toggleNavbar}
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
            // setSelectedCategory(null);
            toggleNavbar();
          }}
        />

        <div className="nav-open-lines-bg"></div>

        <ul className="nav-explorer-btn-container">{buttons}</ul>

        <Button
          idx={5}
          name={t("backToFullView")}
          style={{ marginTop: "1em", width: "70%" }}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          setPosition={setPosition}
          setTarget={setTarget}
          isGoBack
          toggleNavbar={toggleNavbar}
        />
      </div>
    );
  }
}
