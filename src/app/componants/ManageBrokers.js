"use client"; // This is a client component 👈🏽
import React, { useMemo } from "react";
import { Box, Grid } from "@mui/material";
import { useGetMyBrokersQuery } from "../../services/hiring/hiring";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Plus } from "react-feather";
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
    <>
      <Grid item xs={6} md={5} alignContent={"center"}>
        <p className="text-2xl text-customDarkBlue">Manage Bokers</p>
      </Grid>
      <Grid xs={6} md={5} style={{ textAlign: "end" }}>
        {/* <Link
          href="/upload-ip"
          className="btn btn-icon rounded-full border border-customGreen bg-transparent text-customGreen ml-auto"
        >
          <Plus className="h-4 w-4 stroke-[3] fill-current " />
        </Link> */}
      </Grid>
      <Grid item xs={12} md={10}>
        <div className="mt-3">
          <GeneralTable
            columns={columns}
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
