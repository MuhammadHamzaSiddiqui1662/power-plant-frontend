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
const CategorySelect = dynamic(() => import("../componants/CategorySelect"));

import { Plus } from "react-feather";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../services/user/user";

const initialData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  about: "",
  interests: [],
};

export default function Profile() {
  const [tabValue, setTabValue] = useState(0);
  const [selectedNames, setSelectedNames] = React.useState([]);
  const [role, setRole] = useState(0);
  const { user, userType } = useSelector((state) => state.auth);
  const [data, setData] = useState({ ...initialData, ...user });
  const [error, setError] = useState("");
  const [updateUser, { _error }] = useUpdateUserMutation();
  const { refetch } = useGetUserQuery(user._id);

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

  const handleInputChange = (event) => {
    setError("");
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setError("");
    setData((prev) => ({
      ...prev,
      interests: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleCancel = () => {
    setError("");
    setData({ ...initialData, ...user });
  };

  const handleSave = async () => {
    const formData = new FormData();
    const updateData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      about: data.about,
      interests: data.interests,
    };
    if (data._id) updateData._id = data._id;
    formData.append("data", JSON.stringify(updateData));
    if (files[0]) formData.append("image", files[0]);

    try {
      const { error } = await updateUser(formData);
      if (error) {
        console.log("error", error);
        return setError(
          error.shortMessage || error.message || "Faild to update Ip"
        );
      }
      console.log("Response:", response);
      refetch();
    } catch (error) {
      console.error("Error uploading data:", error);
      setError(error.shortMessage || error.message || "Faild to update Ip");
    }
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
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={data.name}
                    onChange={handleInputChange}
                    className="form-input mt-1"
                    placeholder="Enter First Name"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    className="font-medium text-customDarkBlue"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    readOnly
                    className="form-input mt-1"
                    placeholder="Enter Email"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    className="font-medium text-customDarkBlue"
                    htmlFor="phone"
                  >
                    Phone:
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={data.phone}
                    onChange={handleInputChange}
                    className="form-input mt-1"
                    placeholder="Enter Phone no"
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                  <label
                    className="font-medium text-customDarkBlue"
                    htmlFor="address"
                  >
                    Address:
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={data.address}
                    onChange={handleInputChange}
                    className="form-input mt-1"
                    placeholder="Enter Address"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div>
                  <label
                    className="font-medium text-customDarkBlue"
                    htmlFor="about"
                  >
                    About:
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    value={data.about}
                    onChange={handleInputChange}
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
                  <CategorySelect
                    categories={data.interests}
                    onChange={handleCategoryChange}
                    fullWidth={true}
                  />
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
        <Grid xs={12} sm={6}>
          <div className="flex mt-6 mb-10">
            <button
              type="reset"
              className="my-3 text-xl btn btn-outlined text-customDarkBlue rounded-md py-6 w-40 text-[32px] px-0 me-5"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="my-3 text-xl btn bg-customGreen hover:bg-customGreen text-white rounded-md py-6 w-40 px-0 text-[32px]"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </Grid>

        <Grid container className="mt-10 mb-16">
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
                      isEdit={true}
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
