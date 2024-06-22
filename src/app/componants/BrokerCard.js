"use client"; // This is a client component 👈🏽
import { Avatar } from "@mui/material";
import React from "react";

export default function BrokerCard({ imgSrc, name }) {
  return (
    <div
      style={{
        border: "1px solid #8F98A5",
        padding: "2rem",
        margin: "12px",
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <Avatar sx={{ width: 90, height: 90 }} alt="Remy Sharp" src={imgSrc} />
        <p className="text-customDarkBlue mt-8 text-2xl sm:text-2xl">{name}</p>
      </div>
    </div>
  );
}
