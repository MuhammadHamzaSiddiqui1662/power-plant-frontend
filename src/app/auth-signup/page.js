"use client";
import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import "./style.css";
import { signUp } from "../../services/auth";

export default function Login() {
  const [tabValue, setTabValue] = useState(0);
  const [data, setData] = useState({
    displayName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [error, setError] = useState("");

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
    try {
      const session = await signUp(data);
      console.log("Session:", session);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="my-28">
        <div className="container-login z-3">
          <h5 className="my-6 text-4xl text-center">Signup</h5>
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
                          name="displayName"
                          value={data.displayName}
                          onChange={handleDataChange}
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
                          placeholder="0123456789"
                          name="phone"
                          value={data.phone}
                          onChange={handleDataChange}
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
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div className="mb-4">
                        <label
                          className="text-customDarkBlue font-medium"
                          htmlFor="phone"
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
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div className="mb-4">
                        <label
                          className="text-customDarkBlue font-medium"
                          htmlFor="Account"
                        >
                          Confirm Password:
                        </label>
                        <input
                          id="Account"
                          type="text"
                          className="form-input mt-2"
                          placeholder="Type your account number here"
                          name="confirmPassword"
                          value={data.accountNumber}
                          onChange={handleDataChange}
                        />
                      </div>
                    </Grid>
                    {tabValue == 1 && (
                      <Grid item xs={12} sm={6}>
                        <div className="mb-4">
                          <label
                            className="text-customDarkBlue font-medium"
                            htmlFor="Interest"
                          >
                            Interest:
                          </label>

                          <select
                            className="form-input mt-2"
                            name="cars"
                            id="cars"
                          >
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                          </select>
                        </div>
                      </Grid>
                    )}

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
                            <input
                              id="picture"
                              type="file"
                              className="form-input mt-2"
                              placeholder="Type here"
                            />
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
                            <input
                              multiple
                              id="idCard"
                              type="file"
                              className="form-input mt-2"
                              placeholder="Type here"
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
                    />
                    <label
                      className="form-check-label text-customDarkBlue"
                      htmlFor="RememberMe"
                    >
                      I accept Terms and Conditions
                    </label>
                  </div>
                  <div className="mb-5 flex justify-center">
                    <button
                      type="submit"
                      className="text-2xl btn bg-customGreen hover:bg-customGreen text-white rounded-md py-6 w-40 text-[32px]"
                    >
                      Sign up
                    </button>
                    {/* <Link
                      href="#"
                      className="text-2xl btn bg-customGreen hover:bg-customGreen text-white rounded-md py-6 w-40 text-[32px]"
                    >
                      Sign up
                    </Link> */}
                  </div>
                  <div className="text-center">
                    <span className="text-slate-400 me-2">
                      Already have an account?
                    </span>
                    <Link
                      href="/auth-login"
                      className="text-customGreen font-bold"
                    >
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
        </div>
      </section>
      <Footer />
    </>
  );
}
