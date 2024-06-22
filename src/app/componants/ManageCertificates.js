"use-client";
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
import dynamic from "next/dynamic";

const Uploader = dynamic(() => import("../componants/UploadImage"));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 20,
    border: "1px solid green",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
    color: "#161C2D",
    "&:last-of-type": {
      color: "#8F98A5",
      cursor: "pointer",
      "&:hover": {
        color: "#6BB955",
      },
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  "& td, & th": {
    border: "1px solid green",
  },
}));
const StyledTableContainer = styled(TableContainer)({
  boxShadow: "none",
});

function ManageCertificates({ columns, rows }) {
  const [files, setFiles] = React.useState([]);

  const handleFileUpload = (file, index) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = file;
      return newFiles;
    });
  };
  const [uploaders, setUploaders] = React.useState([
    {
      key: 0,
      component: (
        <Uploader
          isImageUploader={false}
          key={0}
          index={0}
          onFileUpload={handleFileUpload}
        />
      ),
    },
  ]);

  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead className="w-24 h-24">
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell key={column.id} align={column.align || "left"}>
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ width: column.width }}
                  className={
                    colIndex === columns.length - 1 ? "last-column" : ""
                  }
                >
                  {column.id === "Certifcate" ? ( // Check if column id is "ip"
                    <div className="flex justify-center">
                      {uploaders.map((uploader) => uploader.component)}
                    </div> // Render UploaderComponent for "ip" column
                  ) : (
                    row[column.id]
                  )}
                </StyledTableCell>
              ))}
              {/* {columns.map((column, colIndex) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ width: column.width }}
                  className={
                    colIndex === columns.length - 1 ? "last-column" : ""
                  }
                >
                  {row[column.id]}
                </StyledTableCell>
              ))} */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

ManageCertificates.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "right", "center"]),
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ManageCertificates;
