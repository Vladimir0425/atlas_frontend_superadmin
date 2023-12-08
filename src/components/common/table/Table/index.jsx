import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import { ReusuableRow } from "../TableRow";

export function ReusableTable({ rows, columns, type = "normal" }) {
  const [totChecked, setTotChecked] = React.useState(false);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              {type === "normal" ? (
                "ID"
              ) : type === "checkable" ? (
                <Checkbox checked={totChecked} />
              ) : (
                <></>
              )}
            </TableCell>
            {columns.map((column) => (
              <TableCell key={column.name}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <ReusuableRow
              key={row._id}
              row={{ ...row, id: index + 1 }}
              columns={columns}
              type={type}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
