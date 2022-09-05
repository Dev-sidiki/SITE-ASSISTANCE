import React from "react";
import Header from "./partials/Header.composant.js";
import Footer from "./partials/Footer.composant.js";

const DefaultLayout = ({ children }) => {
  return (
    <div className="default-layout">
      <header className="header mb-2">
        <Header />
      </header>

      <main className="main">{children}</main>

      <footer className="footer bg-secondary fixed-bottom">
        <Footer />
      </footer>
    </div>
  );
};

export default DefaultLayout;
