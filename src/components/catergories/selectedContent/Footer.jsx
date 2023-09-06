import React from "react";
import { ContactTwo } from "../../nav/ContactTwo";
function Footer() {
  return (
    <div style={{ width: "100vw", height: "60vh" }}>
      {/* <footer className="footer"> */}
      <button onClick={() => console.log("ashhhhhh")}>PRESS ME!</button>
      <ContactTwo />
      {/* </footer> */}
    </div>
  );
}

export default Footer;
