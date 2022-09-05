import React from "react";

// Le composant qui nous indique la page actuelle
// sur laquelle on navigue
const CurrentPage = ({ page }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">
          {page}
        </li>
      </ol>
    </nav>
  );
};

export default CurrentPage;
