import { getCameraCoords } from "../../common/getCameraCoords";
import useTimeout from "../../common/useTimeout";

const test = false;

export function Button({
  idx,
  name,
  style,
  color,
  onChange,
  setSelectedIsland,
  isGoBack,
  setTarget,
  setPosition,
  selectedIsland,
}) {
  return (
    // <button
    //   onClick={() => onChange(idx)}
    //   className={`nav-expl-btn ${color}`}
    //   style={style ? style : null}
    // >
    //   <span className="nav-expl-span">{name}</span>\
    //   <i className="nav-expl-i"></i>
    // </button>
    <div
      className="button"
      id="button-6"
      onClick={() => {
        setSelectedIsland(null);
        getCameraCoords({ idx, setPosition, setTarget });
        // useTimeout(() => setSelectedIsland(true), 2000);
        if (!isGoBack) {
          setSelectedIsland(idx);
        }
      }}
      style={style ? style : null}
    >
      <div
        id="spin"
        style={
          selectedIsland == idx
            ? {
                width: "200%",
                height: "500%",
                opacity: 1,
                left: "-70px",
                top: "-70px",
                background: "#bfc0c0",
                transform: "rotate(80deg)",
              }
            : null
        }
      ></div>
      <a style={selectedIsland == idx ? { color: "#2d3142" } : null} href="#">
        {name}
      </a>
    </div>
  );
}
