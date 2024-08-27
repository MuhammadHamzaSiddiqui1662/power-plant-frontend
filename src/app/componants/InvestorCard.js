"use client"; // This is a client component 👈🏽
import { Avatar } from "@mui/material";
import React from "react";

export default function InvestorCard({ imgSrc, name, current, ...props }) {
  return (
    <div
      className="cursor-pointer"
      style={{
        border: "1px solid #8F98A5",
        padding: "2rem",
        margin: "12px",
      }}
      {...props}
    >
      <div className="flex flex-col justify-center items-center">
        <Avatar sx={{ width: 90, height: 90 }} alt="Remy Sharp" src={imgSrc} />
        <p className="text-customDarkBlue mt-8 text-2xl sm:text-2xl">{name}</p>
        {current && (
          <p
            className="leading-3 text-[12px] px-2 py-1 border rounded"
            style={{
              color: "#6BB955",
              borderColor: "#6BB955",
            }}
          >
            Current
          </p>
        )}
      </div>
    </div>
  );
}
