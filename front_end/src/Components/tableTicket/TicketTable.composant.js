import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { timestampParser } from "../../utils/dateParser";

// le composant qui affiche la table des tickets
const TicketTable = () => {
  //   on recupere les données du ticket du user connecté
  const { searchListeTickets, isLoading } = useSelector(
    (state) => state.ticketReducer
  );
  // console.log(searchListeTickets);

  // en cas de chargment des données
  if (isLoading) return <h3>Loading ...</h3>;

  return (
    <Table striped bordered hover>
      {/* entete de la table */}
      <thead>
        <tr>
          <th>id</th>
          <th>Sujet</th>
          <th>Statut</th>
          <th>Date d'ouverture</th>
          <th>Voir detail</th>
        </tr>
      </thead>
      {/* le contenu des tables(les differents tickets) */}
      <tbody>
        {searchListeTickets && searchListeTickets.length > 0 ? (
          searchListeTickets.map((row) => (
            <tr key={row._id}>
              <td>{row._id}</td>
              <td>{row.sujet}</td>
              <td>{row.statut}</td>
              <td>{row.createdAt && timestampParser(row.createdAt)}</td>
              <td>
                <Link to={`/ticket/${row._id}`}>
                  {" "}
                  <VisibilityIcon />
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            {/* message si la liste des ticket est vide */}
            <td colSpan="4" className="text-center">
              Vous ne disposez pas de ticket en ce moment{" "}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TicketTable;
