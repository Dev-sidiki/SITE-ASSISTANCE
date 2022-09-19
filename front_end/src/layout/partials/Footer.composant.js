import React from "react";
import logoDsi from "../../Assets/image/logoDsi.png";

// le composant qui contient le pied de page de notre site
const Footer = () => {
  return (
    <div>
      <div className="text-center copy-right text-dark">
        {/* logo */}
        <img src={logoDsi} alt="logo" width="50px" />
        {/* texte copyright */}
        &copy; DSI Socity all right reserved - 2022.
      </div>
    </div>
  );
};

export default Footer;
