import React from "react";

// Le composant qui nous indique la page actuelle
// sur laquelle on navigue
const CurrentPage = ({ page }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {/* mise en valeur de la page courante */}
        <li className="breadcrumb-item active" aria-current="page">
          {page}
        </li>
      </ol>
    </nav>
  );
};

export default CurrentPage;
