"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import "./style.css";
import { properties } from "../componants/Data";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Switcher = dynamic(() => import("../componants/Switcher"));
const Footer = dynamic(() => import("../componants/Footer"));
const Uploader = dynamic(() => import("../componants/UploadImage"));
const Card = dynamic(() => import("../componants/Card"));
const MultipleSelectChip = dynamic(() => import("../componants/ChipSelector"));
const GeneralTable = dynamic(() => import("../componants/Table"));
const ManageCertificates = dynamic(() =>
  import("../componants/ManageCertificates")
);
import { Plus } from "react-feather";
import Link from "next/link";

export default function Profile() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedNames, setSelectedNames] = React.useState([]);
  const [role, setRole] = useState(1);

  const [files, setFiles] = useState([]);

  const handleFileUpload = (file, index) => {
    console.log(files, index, "HREOSNADKNASJDNASD");
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = file;
      return newFiles;
    });
  };
  const [uploaders, setUploaders] = useState([
    {
      key: 0,
      component: <Uploader key={0} index={0} onFileUpload={handleFileUpload} />,
    },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <>
      {console.log(files, "HREEEMYFILESSSSSSSS")}
      <Navbar navClass="navbar-white" />
      <Grid container>
        <Grid item xs={12}>
          <section className={`relative mt-32`}>
            <div className="container">
              <p className={`heading font-bold leading-none`}>My Profile</p>
            </div>
          </section>
        </Grid>
      </Grid>
      <div className="container">
        <Grid container direction={{ xs: "column-reverse", sm: "row" }}>
          <Grid item xs={12} sm={7}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <div>
                  <label
                    className="font-medium text-customDarkBlue"
                    htmlFor="FirstName"
                  >
                    First Name:
                  </label>
                  <input
                    id="FirstName"
                    name="lirstName"
                    type="text"
                    className="form-input mt-1"
                    placeholder="Enter First Name"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    className="font-medium text-customDarkBlue"
                    htmlFor="LastName"
                  >
                    Last Name:
                  </label>
                  <input
                    id="LastName"
                    name="lastName"
                    type="text"
                    className="form-input mt-1"
                    placeholder="Enter Last Name"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    className="font-medium text-customDarkBlue"
                    htmlFor="Email"
                  >
                    Email:
                  </label>
                  <input
                    id="Email"
                    name="email"
                    type="email"
                    className="form-input mt-1"
                    placeholder="Enter Email"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    className="font-medium text-customDarkBlue"
                    htmlFor="Phone"
                  >
                    Phone:
                  </label>
                  <input
                    id="Phone"
                    name="phone"
                    type="text"
                    className="form-input mt-1"
                    placeholder="Enter Phone no"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <label
                    className="font-medium text-customDarkBlue"
                    htmlFor="About"
                  >
                    About:
                  </label>
                  <textarea
                    name="about"
                    id="About"
                    className="form-input h-28"
                    placeholder="Write here"
                  ></textarea>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <label
                    className="font-medium text-customDarkBlue"
                    htmlFor="About"
                  >
                    Interests:
                  </label>
                  <div>
                    <MultipleSelectChip
                      options={["Engineering", "Nuclear Physics"]}
                      selectedValues={selectedNames}
                      onChange={setSelectedNames}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={5}>
            <label
              className="font-medium flex justify-center text-customDarkBlue"
              htmlFor="FirstName"
            >
              Upload Profile Picture:
            </label>
            <div className="flex justify-center mb-4">
              {uploaders.map((uploader) => uploader.component)}
            </div>
          </Grid>
        </Grid>

        <Grid container className="mt-10">
          {role == 0 ? (
            <>
              <Grid item xs={6}>
                <p className={`text-3xl font-semibold leading-none`}>
                  Manage IPs
                </p>
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
                      {["Active", "Saved", "Inactive", "Drafts"].map(
                        (label, index) => (
                          <Tab
                            key={label}
                            sx={{
                              "&.Mui-selected": { color: "#6BB955" },
                              color: "gray",
                            }}
                            label={label}
                            id={`tab-${index}`}
                            aria-controls={`tabpanel-${index}`}
                          />
                        )
                      )}
                    </Tabs>
                  </Box>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[50px] text-start">
                  {properties.slice(0, 3).map((item, index) => (
                    <Card
                      key={index}
                      name={item.name}
                      id={item.id}
                      description={item.description}
                      year={item.year}
                      category={item.category}
                      price={item.price}
                      patentNo={item.patentNo}
                      image={item.image}
                    />
                  ))}
                </div>
              </Grid>
            </>
          ) : role === 1 ? (
            <Grid item xs={12} md={10}>
              <div className="mt-10">
                <p className="text-2xl text-customDarkBlue mb-3">
                  Manage Bokers
                </p>
                <GeneralTable columns={columns} rows={rows} />
              </div>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <div className="mt-10">
                <p className="text-2xl text-customDarkBlue mb-3">
                  Upload Certificates (Upto 6 certificates per interest):
                </p>
                <ManageCertificates columns={columns2} rows={rows2} />
              </div>
            </Grid>
          )}
          <Grid xs={12} sm={6}>
            <div className="flex mt-10 mb-16">
              <button
                type="reset"
                className="my-3 text-xl btn btn-outlined text-customDarkBlue rounded-md py-6 w-40 text-[32px] px-0 me-5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="my-3 text-xl btn bg-customGreen hover:bg-customGreen text-white rounded-md py-6 w-40 px-0 text-[32px]"
              >
                Save Changes
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
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
    width: "20%",
    linking: "/aboutus",
  },
  {
    id: "manage",
    label: "Brokers",
    align: "center",
    width: "60%",
    linking: "/aboutus",
  },
];

const rows2 = [
  { interest: "Engineering" },
  {
    interest: "Nuclear Physics",
  },
];
const columns2 = [
  {
    id: "interest",
    label: "Interests",
    align: "center",
    width: "16%",
  },
  {
    id: "Certifcate",
    label: "Certifcate1",
    align: "center",
    width: "14%",
  },
  {
    id: "Certifcate",
    label: "Certifcate2",
    align: "center",
    width: "14%",
  },
  {
    id: "Certifcate",
    label: "Certifcate3",
    align: "center",
    width: "14%",
  },
  {
    id: "Certifcate",
    label: "Certifcate4",
    align: "center",
    width: "14%",
  },
  {
    id: "Certifcate",
    label: "Certifcate5",
    align: "center",
    width: "14%",
  },
  {
    id: "Certifcate",
    label: "Certifcate6",
    align: "center",
    width: "14%",
  },
];

const rows = [
  { name: "Philip", ip: "Abc, Acg", manage: "Manage" },
  {
    name: "Arlene",
    ip: "Nails  ",
    manage: "Manage",
  },
];
