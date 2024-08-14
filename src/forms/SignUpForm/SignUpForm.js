"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { Alert, Box, Grid, Tab, Tabs } from "@mui/material";
import { useRegisterMutation } from "../../services/auth/auth";
import { useRouter } from "next/navigation";
import ButtonContained from "../../components/ButtonContained/ButtonContained";
import ToastMessage from "../../app/componants/Toast";
import { UserType } from "../../types/user";

const Uploader = dynamic(() => import("../../app/componants/UploadImage"));

const CategorySelect = dynamic(() =>
  import("../../app/componants/CategorySelect")
);

export default function SignUpForm() {
  const [tabValue, setTabValue] = useState(0);
  const [isAgreedOnTerms, setIsAgreedOnTerms] = useState(false);
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    interests: [],
  });
  const [files, setFiles] = useState({});

  const [error, setError] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const handleImageUpload = (file) => {
    setError("");
    console.log(file);
    setFiles((prevFiles) => ({
      ...prevFiles,
      image: file,
    }));
  };

  const handlePdfUpload = (file) => {
    setError("");
    console.log(file);
    setFiles((prevFiles) => ({
      ...prevFiles,
      pdf: file,
    }));
  };

  const handleFileUpload = (file, index) => {
    setError("");
    setFiles((prevFiles) => ({
      ...prevFiles,
      [`file${index}`]: file,
    }));
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setData((prev) => ({
      ...prev,
      interests: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDataChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword)
      return setError("Password and Confirm Password should be same!");
    if (data.interests.length < 3)
      return setError("Select atleast 3 interests");
    if (tabValue == UserType.Broker) {
      if (!files.image) return setError("Image is required!");
      if (!files.pdf) return setError("Identity Document is required!");
    }
    const { confirmPassword, ...requestBody } = {
      ...data,
      userType: tabValue,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(requestBody));
    if (files) {
      if (files.image) formData.append("image", files.image);
      if (files.pdf) formData.append("pdf", files.pdf);
    }
    try {
      const { data: responseData, error } = await register(formData);

      if (error) {
        console.log("error", error);
        return setError(error.data.message);
      }
      // Show success toast message
      ToastMessage({ message: "Signup successful!", type: "success" });

      console.log("Response:", responseData);
      localStorage.setItem("emailToVerify", data.email);
      router.replace(`/otp-verify?email=${data.email}&userType=${tabValue}`);
    } catch (error) {
      console.error(
        "Error uploading data:",
        error.shortMessage || error.message
      );
      setError(error.shortMessage || error.message);
    }
  };

  return (
    <>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            TabIndicatorProps={{ style: { backgroundColor: "green" } }}
            value={tabValue}
            onChange={handleTabChange}
            aria-label="login tabs"
            variant="fullWidth"
            scrollButtons="auto"
          >
            {["Innovator", "Investor", "Broker"].map((label, index) => (
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
            ))}
          </Tabs>
        </Box>
      </div>
      <div className="flex justify-center">
        <div className=" w-full m-auto p-6 bg-white dark:bg-slate-900 dark:shadow-gray-700 rounded-md">
          <Box className="p-6">
            <form
              className="ltr:text-left rtl:text-right grid grid-cols-1"
              onSubmit={handleSubmit}
            >
              <Grid container columnSpacing={5}>
                <Grid item xs={12}>
                  {error && (
                    <Alert
                      variant="outlined"
                      severity="error"
                      className="mb-4 mx-auto"
                      style={{ maxWidth: 300 }}
                    >
                      {error}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="mb-4">
                    <label
                      className="text-customDarkBlue font-medium"
                      htmlFor="Your Name"
                    >
                      Your Name:
                    </label>
                    <input
                      id="Your Name"
                      type="text"
                      className="form-input mt-2"
                      placeholder="Type your name here"
                      name="name"
                      value={data.name}
                      onChange={handleDataChange}
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="mb-4">
                    <label
                      className="text-customDarkBlue font-medium"
                      htmlFor="LoginEmail"
                    >
                      Email Address:
                    </label>
                    <input
                      id="LoginEmail"
                      type="text"
                      className="form-input mt-2"
                      placeholder="name@example.com"
                      name="email"
                      value={data.email}
                      onChange={handleDataChange}
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="mb-4">
                    <label
                      className="text-customDarkBlue font-medium"
                      htmlFor="phone"
                    >
                      Phone:
                    </label>
                    <input
                      id="phone"
                      type="text"
                      className="form-input mt-2"
                      placeholder="+1 234 567890"
                      name="phone"
                      value={data.phone}
                      onChange={handleDataChange}
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="mb-4">
                    <label
                      className="text-customDarkBlue font-medium"
                      htmlFor="address"
                    >
                      Address:
                    </label>
                    <input
                      id="address"
                      type="text"
                      className="form-input mt-2"
                      placeholder="Type your address here"
                      name="address"
                      value={data.address}
                      onChange={handleDataChange}
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="mb-4">
                    <label
                      className="text-customDarkBlue font-medium"
                      htmlFor="password"
                    >
                      Password:
                    </label>
                    <input
                      id="phone"
                      type="password"
                      className="form-input mt-2"
                      placeholder="Password:"
                      name="password"
                      value={data.password}
                      onChange={handleDataChange}
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="mb-4">
                    <label
                      className="text-customDarkBlue font-medium"
                      htmlFor="confirm-password"
                    >
                      Confirm Password:
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      className="form-input mt-2"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={data.confirmPassword}
                      onChange={handleDataChange}
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="mb-4">
                    <label
                      className="text-customDarkBlue font-medium"
                      htmlFor="Interest"
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

                {tabValue == 2 && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <div className="mb-4">
                        <label
                          className="text-customDarkBlue font-medium"
                          htmlFor="picture"
                        >
                          Upload Profile Picture:
                        </label>
                        <Uploader index={0} onFileUpload={handleImageUpload} />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div className="mb-4">
                        <label
                          className="text-customDarkBlue font-medium"
                          htmlFor="idCard"
                        >
                          Upload Identity Card:
                        </label>
                        <Uploader
                          index={1}
                          onFileUpload={handlePdfUpload}
                          pdfOnly={true}
                        />
                      </div>
                    </Grid>
                  </>
                )}
              </Grid>
              <div className="flex justify-center mt-3 mb-5">
                <input
                  className="form-checkbox text-green-600 rounded w-4 h-4 me-2 border border-inherit"
                  type="checkbox"
                  id="RememberMe"
                  checked={isAgreedOnTerms}
                  onChange={() => setIsAgreedOnTerms((prev) => !prev)}
                />
                <label
                  className="form-check-label text-customDarkBlue"
                  htmlFor="RememberMe"
                >
                  I accept Terms and Conditions
                </label>
              </div>
              <div className="mb-5 flex justify-center">
                <ButtonContained
                  type="submit"
                  isLoading={isLoading}
                  disabled={isLoading || !isAgreedOnTerms}
                  style={
                    isAgreedOnTerms
                      ? { cursor: "pointer" }
                      : { cursor: "not-allowed" }
                  }
                >
                  Sign Up
                </ButtonContained>
              </div>
              <div className="text-center">
                <span className="text-slate-400 me-2">
                  Already have an account?
                </span>
                <Link href="/auth-login" className="text-customGreen font-bold">
                  Sign in
                </Link>
              </div>
            </form>
            {/* {[0, 1, 2].map((index) => (
                  <CustomTabPanel key={index} value={value} index={index}>
                    <TabContent />
                  </CustomTabPanel>
                ))} */}
          </Box>
        </div>
      </div>
    </>
  );
}
