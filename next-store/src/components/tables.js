import { Table } from "react-bootstrap";

export function DataTable() {
  return (
    <Table striped bordered hover responsive="md">
        <thead>
            <tr>
                <th>Bill No.</th>
                <th>Customer Name</th>
                <th>Amount</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>1750</td>
                <td>{new Date().getDate()}</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>100</td>
                <td>{new Date().getDate()-1}</td>
            </tr>
            <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>{new Date().getDate()-2}</td>
            </tr>
        </tbody>
    </Table>
  );
}
