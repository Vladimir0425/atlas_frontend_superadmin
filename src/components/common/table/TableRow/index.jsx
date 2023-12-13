import * as React from "react";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export function ReusuableRow(props) {
  const { row, columns, checked, onCheck, type = "checkable" } = props;
  const [expanded, setExpanded] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        {type === "normal" ? (
          <>
            <TableCell>
              <Checkbox
                checked={checked}
                onChange={onCheck}
                inputProps={{
                  "aria-label": "Row Selector",
                }}
              />
            </TableCell>
            <TableCell>{row.id}</TableCell>
          </>
        ) : (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setExpanded(!expanded)}
            >
              {checked ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {columns.map((column, index) => (
          <TableCell
            key={column.name}
            scope="row"
            className="truncate max-w-[100px] sm:max-w-[200px] md:max-w-[400px] lg:max-w-[500px]"
          >
            {row[column.name]}
          </TableCell>
        ))}
      </TableRow>
    </React.Fragment>
  );
}
