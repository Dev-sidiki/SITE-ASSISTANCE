import React from "react";
import AdminHeader from "./partials/AdminHeader.composant.js";
import Footer from "./partials/Footer.composant.js";

// le composant qui fait une mise page des diffrente page de notre site
const AdminDefaultLayout = ({ children }) => {
  return (
    <div className="default-layout">
      {/* l'entet */}
      <header className="header mb-2">
        <AdminHeader />
      </header>
      {/* le contenu */}
      <main className="main">{children}</main>
      {/* le pied de page */}
      <footer className="footer bg-secondary">
        <Footer />
      </footer>
    </div>
  );
};

export default AdminDefaultLayout;
