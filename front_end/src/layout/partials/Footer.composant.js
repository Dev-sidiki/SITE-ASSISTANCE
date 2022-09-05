import React from "react";
import logoDsi from "../../Assets/image/logoDsi.png";

const Footer = () => {
  return (
    <div>
      <div className="text-center copy-right text-dark">
        <img src={logoDsi} alt="logo" width="50px" />
        &copy; DSI Socity all right reserved - 2022.
      </div>
    </div>
  );
};

export default Footer;
