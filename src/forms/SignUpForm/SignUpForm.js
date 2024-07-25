"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import { Box, Grid, Tab, Tabs } from "@mui/material";
import { useRegisterMutation } from "../../services/auth/auth";
import { useRouter } from "next/navigation";
import ButtonContained from "../../components/ButtonContained/ButtonContained";

export default function SignUpForm() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [register, { isLoading, status }] = useRegisterMutation();
  const router = useRouter();

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
    const { email } = data;
    console.log("submit");
    try {
      const { confirmPassword, ...requestBody } = data;
      const { data: responseData, error } = await register(requestBody);
      if (error) throw error;
      console.log("Session:", responseData);
      router.replace(`/otp-verify?email=${email}`);
    } catch (error) {
      console.error(error);
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
                      placeholder="Onfirm Password"
                      name="confirmPassword"
                      value={data.confirmPassword}
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

                      <select className="form-input mt-2" name="cars" id="cars">
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
                <ButtonContained isLoading={isLoading} disabled={isLoading} />
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
