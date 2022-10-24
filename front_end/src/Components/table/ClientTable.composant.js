import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { timestampParser } from "../../utils/dateParser";
import { getAllUsers, deleteUser } from "../../Actions/userAction";
import { Col, Row, Alert } from "react-bootstrap";
// le composant qui affiche la table des tickets
const ClientTable = () => {
  const dispatch = useDispatch();

  // variable qui affiche le message d'ajout d'un ticket
  const [deleteSuccess, SetDeleteSuccess] = useState();
  //on recupere les données du ticket du user connecté
  const { SearchListeClient, isLoading, listeClients } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    // on affiche la liste des client des que nous somme sur la page
    if (!listeClients.length) {
      dispatch(getAllUsers());
    }
  }, [dispatch, listeClients, isLoading]);

  // en cas de chargment des données
  if (isLoading) return <h3>Loading ...</h3>;

  return (
    <div>
      <Row>
        <Col>
          {/* affichage de message de succès si ticket ajouté */}
          {deleteSuccess && <Alert variant={"success"}>{deleteSuccess}</Alert>}
        </Col>
      </Row>
      <Table striped bordered hover>
        {/* entete de la table */}
        <thead>
          <tr>
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
          {SearchListeClient && SearchListeClient.length > 0 ? (
            SearchListeClient.map((row) => (
              <tr key={row._id}>
                {/* <td>{row._id}</td> */}
                <td>{row.nom}</td>
                <td>{row.statut}</td>
                <td>{row.createdAt && timestampParser(row.createdAt)}</td>
                <td>
                  <div
                    className="text-center"
                    onClick={() =>
                      dispatch(deleteUser()) &&
                      SetDeleteSuccess("utilisateur à été supprimé")
                    }
                  >
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
    </div>
  );
};

export default ClientTable;
