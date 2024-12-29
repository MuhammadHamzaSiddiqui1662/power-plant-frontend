"use client"; // This is a client component 👈🏽
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
import "./style.css";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Footer = dynamic(() => import("../componants/Footer"));
const Uploader = dynamic(() => import("../componants/UploadImage"));
const ManageCertificates = dynamic(() =>
  import("../componants/ManageCertificates")
);
import ToastMessage from "../componants/Toast";
const ManageIPs = dynamic(() => import("../componants/ManageIPs"));
const ManageBrokers = dynamic(() => import("../componants/ManageBrokers"));
const CategorySelect = dynamic(() => import("../componants/CategorySelect"));

import { useDispatch, useSelector } from "react-redux";
import {
  useAddCertificateMutation,
  useDeleteCertificateMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../services/user/user";
import ButtonContained from "../../components/ButtonContained/ButtonContained";
import { setUser } from "../../lib/features/authSlice";

const transformIntoRowObjects = (interests) =>
  interests.map((interest) => ({ interest }));

const initialData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  about: "",
  interests: [],
};

export default function Profile() {
  const dispatch = useDispatch();
  const { user: _user, userType } = useSelector((state) => state.auth);
  const [data, setData] = useState({ ...initialData, ..._user });
  const [error, setError] = useState("");
  const { data: user, refetch } = useGetUserQuery(_user?._id);
  const [updateUser, { _error, isLoading: isUpdating }] =
    useUpdateUserMutation();
  const [addCertificate, { isLoading: addCertificateLoading }] =
    useAddCertificateMutation();
  const [deleteCertificate, { isLoading: deleteCertificateLoading }] =
    useDeleteCertificateMutation();
  const isLoading = useMemo(
    () => deleteCertificateLoading || addCertificateLoading,
    [deleteCertificateLoading, addCertificateLoading]
  );

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

  const handleInputChange = (event) => {
    setError("");
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCertificateUpload = async (file, interest) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("interest", interest);
    try {
      const { error } = await addCertificate(formData);

      if (error) {
        console.log("error", error);
        setError(
          error.shortMessage || error.message || "Failed to upload certificate"
        );
        ToastMessage({
          message: "Failed to upload certificate!",
          type: "error",
        });
        return;
      }

      ToastMessage({
        message: "Certificate uploaded successfully!",
        type: "success",
      });

      refetch();
    } catch (error) {
      console.error("Error uploading data:", error);
      setError(
        error.shortMessage || error.message || "Failed to upload certificate"
      );
      ToastMessage({ message: "Failed to upload certificate!", type: "error" });
    }
  };

  // certificate delete handler
  const handleCertificateDelete = async (id) => {
    try {
      const { error } = await deleteCertificate(id);
      ToastMessage({
        message: "Certificate deleted successfully!",
        type: "success",
      });
      refetch();
    } catch (error) {
      console.error("Error deleting certificate:", error);
      setError(
        error.shortMessage || error.message || "Failed to delete certificate"
      );
      ToastMessage({
        message: "Failed to delete certificate!",
        type: "error",
      });
    }
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

  const handleCategoryRemove = (value) => {
    setData((prev) => ({
      ...prev,
      interests: prev.interests.filter((interest) => interest !== value),
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
      const payload = await updateUser(formData).unwrap();
      dispatch(setUser(payload));
      refetch();

      ToastMessage({
        message: "User data updated successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error uploading data:", error);
      setError(error.shortMessage || error.message || "Failed to update data");
      ToastMessage({ message: "Failed to update data!", type: "error" });
    }
  };

  useEffect(() => {
    setData((prev) => ({ ...prev, ...user }));
  }, [user]);

  return (
    <>
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
                    onRemove={handleCategoryRemove}
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
            <div className="flex justify-center mb-4 gap-2">
              <img
                src={user?.imageUrl}
                alt="profile"
                className="w-28 object-cover"
              />
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
            <ButtonContained
              onClick={handleSave}
              isLoading={isUpdating}
              disabled={isUpdating}
              className="my-3 text-xl text-[32px] px-4"
            >
              Save Changes
            </ButtonContained>
          </div>
        </Grid>

        <Grid container className="mt-10 mb-16">
          {userType == 0 ? (
            <ManageIPs />
          ) : userType == 1 ? (
            <ManageBrokers />
          ) : (
            <Grid item xs={12}>
              <div className="mt-10">
                <p className="text-2xl text-customDarkBlue mb-3">
                  Upload Certificates (Upto 6 certificates per interest):
                </p>
                <ManageCertificates
                  columns={columns2}
                  certificates={data.certificates}
                  rows={transformIntoRowObjects(data.interests)}
                  onCertificateUpload={handleCertificateUpload}
                  onCertificateDelete={handleCertificateDelete}
                  isLoading={isLoading}
                />
              </div>
            </Grid>
          )}
        </Grid>
      </div>
      <Footer />
    </>
  );
}

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
