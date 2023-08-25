import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0" style={{ width: "90px", marginTop: 10 }}>
      <Tilt style={{ borderRadius: "20px 0" }} className="br2 shadow-2 Tilt" glareEnable="true">
        <div>
          <img src={brain} alt="Logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
