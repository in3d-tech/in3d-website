import React from "react";
import { Button, Icon } from "semantic-ui-react";

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
            handleNavClick(e);
            //   handleCategoryClick(healingRef);
          }}
          className="nav-item"
        >
          {name}
        </i>
      </div>
      <ul className="inner-ul">
        <li className="inner-li">הולגרמות, דיוק, הנגשת נתונים</li>
        <li className="inner-li">כללית, איכילוב, שניידר</li>
        <li className="inner-li">שני רופאים בוחנים הולוגרמה בעזרת הולולנס</li>
      </ul>
    </li>
  );
}
