"use client"; // This is a client component 👈🏽
import * as React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Rating,
  Stack,
  Box,
  Avatar,
  Divider,
} from "@mui/material";
import Link from "next/link";

export default function BrokerCard({
  id,
  imgSrc,
  name,
  interests,
  ratings,
  dealsInProgress,
  successfulDeals,
}) {
  return (
    <Link
      href={`/profile/${id}?userType=2`}
      style={{ height: "100%", display: "block" }}
    >
      <Card
        sx={{
          border: "2px solid #8F98A5",
          borderRadius: "10px",
          height: "100%",
          textAlign: "center",
          paddingTop: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box mb={2} height={"100%"}>
          <div className="flex flex-col justify-center items-center">
            <Avatar sx={{ width: 100, height: 100 }} alt={name} src={imgSrc} />
            <p className="text-customDarkBlue mt-8 text-2xl sm:text-2xl">
              {name}
            </p>
            <p
              className="text-customDarkBlue mt-2"
              style={{ fontSize: "18px", color: "#808b96" }}
            >
              {interests && interests[0]}
            </p>
            <Stack spacing={1} marginTop={2}>
              <Rating name="ratings" precision={0.1} value={ratings} readOnly />
            </Stack>
          </div>
        </Box>
        <Divider
          orientation="horizontal"
          sx={{ border: "1px solid #8F98A5" }}
        />
        <CardContent
          sx={{
            p: 1,
            ":last-child": {
              p: 1,
            },
          }}
        >
          <Grid container mt={1} mb={0}>
            <Grid item xs={6} align="center">
              <Typography variant="body2">Success Deals</Typography>
              <Typography variant="h6">{successfulDeals || 0}</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              align="center"
              sx={{ borderLeft: "1px solid #8F98A5" }}
            >
              <Typography variant="body2">In Progress</Typography>
              <Typography variant="h6">{dealsInProgress || 0}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}
