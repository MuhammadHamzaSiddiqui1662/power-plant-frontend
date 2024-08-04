"use client"; // This is a client component 👈🏽
import { Avatar } from "@mui/material";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function BrokerCard({
  imgSrc,
  name,
  interests,
  ratings,
  dealsInProgress,
  successfulDeals,
}) {
  return (
    <div
      style={{
        border: "1px solid #8F98A5",
        borderRadius: "10px",
        padding: "2rem",
        margin: "12px",
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <Avatar sx={{ width: 90, height: 90 }} alt="Remy Sharp" src={imgSrc} />
        <p className="text-customDarkBlue mt-8 text-2xl sm:text-2xl">{name}</p>
        <p
          className="text-customDarkBlue mt-2 text-2xl sm:text-2xl"
          style={{ fontSize: "12px", color: "#808b96" }}
        >
          {interests}
        </p>
        <Stack spacing={1} marginTop={1}>
          <Rating name="ratings" precision={0.5}>
            {ratings}
          </Rating>
        </Stack>
      </div>
      <div className="grid grid-row-5 text-center mt-8">
        <div
          className="grid grid-row-1"
          style={{ border: "1px solid #8F98A5", borderRadius: "8px" }}
        >
          <p className="text-customDarkBlue mt-1" style={{ fontSize: "20px" }}>
            Success Deals:
            {successfulDeals}
          </p>
        </div>
        <div
          className="grid lg: grid-row-1"
          style={{ border: "1px solid #8F98A5", borderRadius: "8px" }}
        >
          <p className="text-customDarkBlue mt-1 " style={{ fontSize: "20px" }}>
            In Progress:
            {dealsInProgress}
          </p>
        </div>
      </div>
    </div>
  );
}
