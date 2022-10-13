import React from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { timestampParser } from "../../utils/dateParser";

// le composant qui affiche la table des tickets
const ClientTable = () => {
  //   on recupere les données du ticket du user connecté
  const { listeClients, isLoading } = useSelector((state) => state.userReducer);
  console.log(listeClients);

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
            <center>Nom</center>
          </th>
          <th>
            <center>Statut </center>
          </th>
          <th>
            <center>Date d'inscription </center>
          </th>
          <th>
            <center>Suppression </center>
          </th>
        </tr>
      </thead>
      {/* le contenu des tables(les differents tickets) */}
      <tbody>
        {listeClients && listeClients.length > 0 ? (
          listeClients.map((row) => (
            <tr key={row._id}>
              {/* <td>{row._id}</td> */}
              <td>{row.nom}</td>
              <td>{row.statut}</td>
              <td>{row.createdAt && timestampParser(row.createdAt)}</td>
              <td>
                <div className="text-center">
                  {" "}
                  <DeleteIcon />
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            {/* message si la liste des ticket est vide */}
            <td colSpan="4" className="text-center">
              Vous ne disposez pas de clients pour ce service{" "}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ClientTable;
