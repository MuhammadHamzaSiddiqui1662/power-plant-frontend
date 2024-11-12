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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CircularProgress } from "@mui/material";

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

function ManageCertificates({
  columns,
  rows,
  certificates,
  onCertificateUpload,
  onCertificateDelete,
  isLoading,
}) {
  return (
    <StyledTableContainer component={Paper}>
      <Table aria-label="customized table" className="relative">
        {/*loading wrapper */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center z-10">
            <CircularProgress size={20} />
          </div>
        )}
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
          {rows.map((row) => (
            <CertificatesRow
              key={row.interest}
              certificates={certificates}
              interest={row.interest}
              onCertificateUpload={onCertificateUpload}
              onCertificateDelete={onCertificateDelete}
            />
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

const CertificatesRow = ({
  certificates,
  interest,
  onCertificateUpload,
  onCertificateDelete,
}) => {
  const certificatesForInterest = certificates.filter(
    (certificate) => certificate.category === interest
  );
  return (
    <StyledTableRow>
      <StyledTableCell
        align={"center"}
        style={{ width: "16%" }}
        key={"interest"}
      >
        {interest}
      </StyledTableCell>
      {certificatesForInterest.map((certificate) => (
        <StyledTableCell
          key={certificate.imageUrl}
          align={"center"}
          style={{ width: "14%" }}
        >
          {/* image container with delete button on hover to delete that certificate */}
          <div className="flex justify-center relative group">
            <div className="absolute -top-3 right-0 hidden-local group-hover:block">
              <DeleteForeverIcon
                className="cursor-pointer"
                sx={{
                  color: "#f00",
                }}
                onClick={async () => {
                  await onCertificateDelete(certificate._id);
                }}
              />
            </div>
            <img
              src={certificate.imageUrl}
              alt={certificate.imageUrl}
              className="w-16 h-16"
            />
          </div>
        </StyledTableCell>
      ))}
      {certificatesForInterest.length < 6 && (
        <StyledTableCell
          align={"center"}
          style={{ width: "14%" }}
          key={"add"}
          // className={colIndex === columns.length - 1 ? "last-column" : ""}
        >
          <div className="flex justify-center">
            <Uploader
              isImageUploader={false}
              key={certificatesForInterest.length}
              index={0}
              onFileUpload={(file, index) =>
                onCertificateUpload(file, interest)
              }
            />
          </div>
        </StyledTableCell>
      )}
      {Array.from({ length: 5 - certificatesForInterest.length }).map(() => (
        <StyledTableCell
          align={"center"}
          style={{ width: "14%" }}
          key={"add"}
          // className={colIndex === columns.length - 1 ? "last-column" : ""}
        ></StyledTableCell>
      ))}
    </StyledTableRow>
  );
};
