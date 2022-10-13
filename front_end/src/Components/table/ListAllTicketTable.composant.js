import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { timestampParser } from "../../utils/dateParser";

// le composant qui affiche la table des tickets
const ListAllTicketTable = () => {
  //   on recupere les données du ticket du user connecté
  const { searchListeAllTickets, isLoading } = useSelector(
    (state) => state.ticketReducer
  );
  // console.log(searchListeTicketsClients);

  // en cas de chargment des données
  if (isLoading) return <h3>Loading ...</h3>;

  return (
    <Table striped bordered hover>
      {/* entete de la table */}
      <thead>
        <tr>
          {/* <th>id</th> */}

          <th>
            {" "}
            <center>Sujet</center>
          </th>
          <th>
            <center>Statut </center>
          </th>
          <th>
            <center>Date d'ouverture </center>
          </th>
          <th>
            {" "}
            <center>Voir detail </center>
          </th>
        </tr>
      </thead>
      {/* le contenu des tables(les differents tickets) */}
      <tbody>
        {searchListeAllTickets && searchListeAllTickets.length > 0 ? (
          searchListeAllTickets.map((row) => (
            <tr key={row._id}>
              {/* <td>{row._id}</td> */}
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

export default ListAllTicketTable;
