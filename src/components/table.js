import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DenseTable(props) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 400, maxWidth: 1300 }}
      style={{ boxShadow: "0px 0px 3px 2px #aaaaaa" }}
    >
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            {props.columnList?.length > 0 &&
              props.columnList.map((column) => {
                return (
                  <TableCell>
                    <b>{column.label}</b>
                  </TableCell>
                );
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data && props.data.length > 0 ? (
            props.data.map((row) => (
              <TableRow
                key={row[props.key]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(row).map((keyName) => {
                  return <TableCell>{row[keyName]}</TableCell>;
                })}
              </TableRow>
            ))
          ) : (
            <div>No Data</div>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
