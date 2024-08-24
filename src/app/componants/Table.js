import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6BB955",
    color: theme.palette.common.white,
    fontSize: 20,
    padding: "10px 0",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
    color: "#161C2D",
    "&:last-of-type": {
      color: "#8F98A5",
      cursor: "pointer",
      "&:hover": {
        //   backgroundColor: "#6BB955",
        color: "#6BB955",
      },
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "& td, & th": {
    border: 0,
  },
}));
const StyledTableContainer = styled(TableContainer)({
  border: "1px solid #6BB955",
  borderRadius: "4px",
  boxShadow: "none",
  borderRadius: "15px 15px 0px 0px",
});
function GeneralTable({ rows }) {
  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell size="small" align={"center"}>
              Brokers
            </StyledTableCell>
            <StyledTableCell size="small" align={"center"}>
              IPs
            </StyledTableCell>
            <StyledTableCell size="small" align={"center"}>
              View
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              <StyledTableCell align={"center"} style={{ width: "20%" }}>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align={"center"} style={{ width: "60%" }}>
                {row.ip}
              </StyledTableCell>
              <StyledTableCell align={"center"} style={{ width: "20%" }}>
                {row.id && (
                  <Link
                    href={`/profile/${row.id}?userType=2`}
                    onClick={row.handleClick}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Manage
                  </Link>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

GeneralTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "right", "center"]),
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GeneralTable;
