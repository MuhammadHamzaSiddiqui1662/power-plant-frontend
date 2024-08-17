"use client"; // This is a client component 👈🏽
import React, { useMemo, useState } from "react";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { useGetMyIpsQuery } from "../../services/ip/ip";
import Link from "next/link";
import { Plus } from "react-feather";
import Card from "./Card";
import { IpStatus } from "../../types/ip";

export default function ManageIPs() {
  const { data: ips } = useGetMyIpsQuery();
  const [tabValue, setTabValue] = useState(IpStatus.Published);
  const filteredIps = useMemo(
    () => ips?.filter((ip) => ip?.status == tabValue) || [],
    [tabValue, ips]
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Grid item xs={6}>
        <p className={`text-3xl font-semibold leading-none`}>Manage IPs</p>
      </Grid>
      <Grid xs={6} style={{ textAlign: "end" }}>
        <Link
          href="/upload-ip"
          className="btn btn-icon rounded-full border border-customGreen bg-transparent text-customGreen ml-auto"
        >
          <Plus className="h-4 w-4 stroke-[3] fill-current " />
        </Link>
      </Grid>
      <Grid item xs={12}>
        <div className="mt-1">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              TabIndicatorProps={{
                style: { backgroundColor: "green" },
              }}
              value={tabValue}
              onChange={handleTabChange}
              aria-label="login tabs"
              variant="fullWidth"
              scrollButtons="auto"
            >
              {[
                IpStatus.Published,
                IpStatus.InActive,
                IpStatus.AppliedForPatent,
                IpStatus.Pending,
                IpStatus.Draft,
              ].map((label, index) => (
                <Tab
                  key={label}
                  value={label}
                  sx={{
                    "&.Mui-selected": { color: "#6BB955" },
                    color: "gray",
                  }}
                  label={label}
                  id={`tab-${index}`}
                  aria-controls={`tabpanel-${index}`}
                />
              ))}
            </Tabs>
          </Box>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[50px] text-start">
          {filteredIps.length > 0 ? (
            filteredIps.map((item, index) => (
              <Card
                key={index}
                name={item.name}
                id={item._id}
                description={item.description}
                year={item.publishedDate}
                categories={item.categories}
                price={item.price}
                patentNumber={item.patentNumber}
                image={item.mainImg}
                isEdit={true}
              />
            ))
          ) : (
            <p>No {tabValue} Ips.</p>
          )}
        </div>
      </Grid>
    </>
  );
}
