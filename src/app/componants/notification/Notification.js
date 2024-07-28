import * as React from "react";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import Image from "next/image";
export default function NotificationMenu({ open, setOpen }) {
  return (
    <Paper
      sx={{
        width: 430,
        position: "absolute",
        borderRadius: 5,
        maxHeight: 460,
        overflowY: "auto",
        scrollbarWidth: "thin",
        display: `${open ? "block" : "none"}`,
      }}
    >
      <p className="px-8 pt-5 pb-4 font-medium text-xl">Notifications</p>
      <Grid container sx={{ padding: 2, cursor: "pointer" }}>
        <Grid xs={2}>
          <div className="">
            <Image
              src="/images/property/3.jpg"
              className="h-16 rounded-md shadow dark:shadow-gray-800"
              alt=""
              width={200}
              height={200}
            />
          </div>
        </Grid>
        <Grid xs={10}>
          <div className="ps-4">
            <p className="font-medium">
              12 images uploaded to your patent#33656
            </p>
            <p className="text-customGrayColor">2h ago</p>
          </div>
        </Grid>
      </Grid>
      <hr />
      <Grid container sx={{ padding: 2, cursor: "pointer" }}>
        <Grid xs={2}>
          <div className="">
            <Image
              src="/images/property/3.jpg"
              className="h-16 rounded-md shadow dark:shadow-gray-800"
              alt=""
              width={200}
              height={200}
            />
          </div>
        </Grid>
        <Grid xs={10}>
          <div className="ps-4">
            <p className="font-medium">
              12 images uploaded to your patent#33656
            </p>
            <p className="text-customGrayColor">2h ago</p>
          </div>
        </Grid>
      </Grid>
      <hr />
      <Grid container sx={{ padding: 2, cursor: "pointer" }}>
        <Grid xs={2}>
          <div className="">
            <Image
              src="/images/property/3.jpg"
              className="h-16 rounded-md shadow dark:shadow-gray-800"
              alt=""
              width={200}
              height={200}
            />
          </div>
        </Grid>
        <Grid xs={10}>
          <div className="ps-4">
            <p className="font-medium">
              12 images uploaded to your patent#33656
            </p>
            <p className="text-customGrayColor">2h ago</p>
          </div>
        </Grid>
      </Grid>
      <hr />
      <Grid container sx={{ padding: 2, cursor: "pointer" }}>
        <Grid xs={2}>
          <div className="">
            <Image
              src="/images/property/3.jpg"
              className="h-16 rounded-md shadow dark:shadow-gray-800"
              alt=""
              width={200}
              height={200}
            />
          </div>
        </Grid>
        <Grid xs={10}>
          <div className="ps-4">
            <p className="font-medium">
              12 images uploaded to your patent#33656
            </p>
            <p className="text-customGrayColor">2h ago</p>
          </div>
        </Grid>
      </Grid>
      <hr />
    </Paper>
  );
}
