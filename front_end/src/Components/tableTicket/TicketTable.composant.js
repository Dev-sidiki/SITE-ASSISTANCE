import React from "react";
import { Table } from "react-bootstrap";

// le composant qui affcihe la table des tickets
const TicketTable = () => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Sujet</th>
          <th>Statut</th>
          <th>Date d'ouverture</th>
        </tr>
      </thead>
      <tbody></tbody>
    </Table>
  );
};

export default TicketTable;
