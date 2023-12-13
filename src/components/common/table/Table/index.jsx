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

export function ReusableTable({
  rows,
  columns,
  type = "normal",
  selectedRows = [],
  setSelectedRows = () => {},
}) {
  const [totChecked, setTotChecked] = React.useState(false);

  const onRowSelect = (id) => {
    if (!!selectedRows.find((item) => item === id)) {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const onTotCheck = (e) => {
    if (e.target.checked) {
      setSelectedRows(rows.map((row) => row._id));
    } else {
      setSelectedRows([]);
    }
    setTotChecked(e.target.checked);
  };

  const isSelected = (id) => {
    return !!selectedRows.find((item) => item === id);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {type === "normal" ? (
              <>
                <TableCell width={20}>
                  <Checkbox checked={totChecked} onChange={onTotCheck} />
                </TableCell>
                <TableCell>ID</TableCell>
              </>
            ) : (
              <TableCell />
            )}
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
              checked={isSelected(row._id)}
              onCheck={() => onRowSelect(row._id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
