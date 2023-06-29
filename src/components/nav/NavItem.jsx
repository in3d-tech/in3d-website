import React from "react";

export function NavItem({ handleNavClick, name, src }) {
  return (
    <li
      className="outer-li"
      style={{
        alignContent: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="nav-open-category-wrapper">
        <img
          src={src ? src : "../../../img/Microsoft_logo.svg.png"}
          style={{ height: "50%", width: "9%" }}
        />
        <i
          onClick={(e) => {
            handleNavClick(e, name);
          }}
          className="nav-item"
        >
          {name}
        </i>
      </div>
      <ul className="inner-ul">
        <li className="inner-li">- health benifits</li>
        <li className="inner-li">- general work</li>
        <li className="inner-li">- hololens </li>
      </ul>
    </li>
  );
}
