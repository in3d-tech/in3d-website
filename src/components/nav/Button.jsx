import { getCameraCoords } from "../../common/getCameraCoords";
// import useTimeout from "../../common/useTimeout";

const test = false;

export function Button({
  idx,
  name,
  style,
  setSelectedCategory,
  isGoBack,
  setTarget,
  setPosition,
  selectedCategory,
  toggleNavbar,
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
    <li
      key={idx}
      className="button"
      id="button-6"
      onClick={() => {
        setSelectedCategory(null);
        getCameraCoords({ idx, setPosition, setTarget });
        // useTimeout(() => setSelectedCategory(true), 2000);
        if (!isGoBack) {
          setSelectedCategory(idx);
        }
        toggleNavbar();
      }}
      style={style ? style : null}
    >
      <div
        id="spin"
        style={
          selectedCategory == idx
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
      <a style={selectedCategory == idx ? { color: "#2d3142" } : null} href="#">
        {name}
      </a>
    </li>
  );
}
