"use client"; // This is a client component 👈🏽
import { Avatar, Tooltip } from "@mui/material";
import React from "react";

export default function InvestorCard({ imgSrc, name, ip, current, ...props }) {
  return (
    <div
      className="cursor-pointer"
      style={{
        border: "1px solid #8F98A5",
        padding: "2rem",
        margin: "12px",
        height: "100%",
      }}
      {...props}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <Avatar sx={{ width: 90, height: 90 }} alt="Remy Sharp" src={imgSrc} />
        <p className="text-customDarkBlue mt-8 mb-2 text-2xl sm:text-2xl line-clamp-1">
          <Tooltip title={name} placement="bottom">
            {name}
          </Tooltip>
        </p>
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
        <p className="text-customDarkBlue mt-auto text-center line-clamp-2">
          <Tooltip title={ip} placement="top">
            {ip}
          </Tooltip>
        </p>
      </div>
    </div>
  );
}
