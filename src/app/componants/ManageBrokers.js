"use client"; // This is a client component 👈🏽
import React, { useMemo } from "react";
import { Box, Grid } from "@mui/material";
import { useGetMyBrokersQuery } from "../../services/hiring/hiring";
import dynamic from "next/dynamic";
const GeneralTable = dynamic(() => import("./Table"));

const formatRows = ({ broker, ip }) => ({
  name: broker.name,
  ip: ip.name,
  manage: "Manage",
});

export default function ManageBrokers() {
  const { data: brokers } = useGetMyBrokersQuery();
  const rows = useMemo(
    () => brokers?.map((hiring) => formatRows(hiring)) || [],
    [brokers]
  );
  console.log(brokers);

  return (
    <Grid item xs={12} md={10}>
      <div className="mt-10">
        <p className="text-2xl text-customDarkBlue mb-3">Manage Bokers</p>
        <GeneralTable
          columns={columns}
          rows={
            rows ? rows : [{ name: "", ip: "No hired brokers", manage: "" }]
          }
        />
      </div>
    </Grid>
  );
}

const columns = [
  {
    id: "name",
    label: "Brokers",
    align: "center",
    width: "20%",
    linking: "/aboutus",
  },
  {
    id: "ip",
    label: "IPs",
    align: "center",
    width: "60%",
    linking: "/aboutus",
  },
  {
    id: "manage",
    label: "Brokers",
    align: "center",
    width: "20%",
    linking: "/aboutus",
  },
];
