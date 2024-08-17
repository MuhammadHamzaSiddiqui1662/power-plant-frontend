"use client"; // This is a client component 👈🏽
import React, { useMemo } from "react";
import { Grid } from "@mui/material";
import { useGetMyBrokersQuery } from "../../services/hiring/hiring";
import dynamic from "next/dynamic";
const GeneralTable = dynamic(() => import("./Table"));

const formatRows = ({ broker, ip }) => ({
  id: broker._id,
  name: broker.name,
  ip: ip.name,
});

export default function ManageBrokers() {
  const { data: brokers } = useGetMyBrokersQuery();
  const rows = useMemo(
    () => brokers?.map((hiring) => formatRows(hiring)) || [],
    [brokers]
  );
  console.log(brokers);

  return (
    <>
      <Grid item xs={6} md={5} alignContent={"center"}>
        <p className="text-2xl text-customDarkBlue">Manage Bokers</p>
      </Grid>
      <Grid xs={6} md={5} style={{ textAlign: "end" }}></Grid>
      <Grid item xs={12} md={10}>
        <div className="mt-3">
          <GeneralTable
            rows={
              rows && rows.length > 0
                ? rows
                : [{ name: "", ip: "No hired brokers", manage: "" }]
            }
          />
        </div>
      </Grid>
    </>
  );
}
