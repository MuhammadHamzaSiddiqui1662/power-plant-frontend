"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";
import { Box, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import "./style.css";
import { signIn } from "../../services/auth";

export default function Login() {
  const [tabValue, setTabValue] = useState(0);
  const [data, setData] = useState({
    email: "",
    password: "",
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
      const session = await signIn(data.email, data.password);
      console.log("Session:", session);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // const CustomTabPanel = ({ children, value, index, ...other }) => (
  //   <div
  //     role="tabpanel"
  //     hidden={value !== index}
  //     id={`tabpanel-${index}`}
  //     aria-labelledby={`tab-${index}`}
  //     {...other}
  //     className="text-customGrayColor"
  //   >
  //     {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  //   </div>
  // );

  // CustomTabPanel.propTypes = {
  //   children: PropTypes.node,
  //   index: PropTypes.number.isRequired,
  //   value: PropTypes.number.isRequired,
  // };

  // const TabContent = () => (
  //   <form className="ltr:text-left rtl:text-right grid grid-cols-1">
  //     <div className="mb-4">
  //       <label className="font-medium text-customDarkBlue" htmlFor="LoginEmail">
  //         Email Address:
  //       </label>
  //       <input
  //         id="LoginEmail"
  //         name="email"
  //         type="email"
  //         className="form-input mt-3"
  //         placeholder="name@example.com"
  //         value={data.email}
  //         onChange={handleDataChange}
  //       />
  //     </div>
  //     <div className="mb-4">
  //       <label
  //         className="font-medium text-customDarkBlue"
  //         htmlFor="LoginPassword"
  //       >
  //         Password:
  //       </label>
  //       <input
  //         id="LoginPassword"
  //         name="password"
  //         type="password"
  //         className="form-input mt-3"
  //         placeholder="Password:"
  //         value={data.password}
  //         onChange={handleDataChange}
  //       />
  //     </div>
  //     <div className="flex justify-between mb-4">
  //       <div className="inline-flex items-center">
  //         <input
  //           className="form-checkbox text-green-600 rounded w-4 h-4 me-2 border border-inherit"
  //           type="checkbox"
  //           id="RememberMe"
  //         />
  //         <label
  //           className="form-check-label text-customGrayColor"
  //           htmlFor="RememberMe"
  //         >
  //           Remember me
  //         </label>
  //       </div>
  //     </div>
  //     <div className="mb-4 flex justify-center">
  //       <Link className="text-2xl btn bg-customGreen hover:bg-customGreen text-white rounded-md py-6 w-40 text-[32px]">
  //         Login
  //       </Link>
  //     </div>
  //     <div className="text-center">
  //       <span className="text-customGrayColor me-2">
  //         Don't have an account?
  //       </span>
  //       <Link href="/auth-signup" className="text-customGreen font-bold">
  //         Sign Up
  //       </Link>
  //     </div>
  //   </form>
  // );

  return (
    <>
      <Navbar />
      <section className="my-28">
        <div className="container-login z-3">
          <h5 className="my-6 text-4xl text-center">Login</h5>
          <div className="">
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
            <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 dark:shadow-gray-700 rounded-md">
              {/* <Box>
                {[0, 1, 2].map((index) => (
                  <CustomTabPanel key={index} value={tabValue} index={index}>
                <TabContent />
                </CustomTabPanel>
                ))}
              </Box> */}
              <form
                className="ltr:text-left rtl:text-right grid grid-cols-1"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label
                    className="font-medium text-customDarkBlue"
                    htmlFor="LoginEmail"
                  >
                    Email Address:
                  </label>
                  <input
                    id="LoginEmail"
                    name="email"
                    type="email"
                    className="form-input mt-3"
                    placeholder="name@example.com"
                    value={data.email}
                    onChange={handleDataChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="font-medium text-customDarkBlue"
                    htmlFor="LoginPassword"
                  >
                    Password:
                  </label>
                  <input
                    id="LoginPassword"
                    name="password"
                    type="password"
                    className="form-input mt-3"
                    placeholder="Password:"
                    value={data.password}
                    onChange={handleDataChange}
                  />
                </div>
                <div className="flex justify-between mb-4">
                  <div className="inline-flex items-center">
                    <input
                      className="form-checkbox text-green-600 rounded w-4 h-4 me-2 border border-inherit"
                      type="checkbox"
                      id="RememberMe"
                    />
                    <label
                      className="form-check-label text-customGrayColor"
                      htmlFor="RememberMe"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="mb-4 flex justify-center">
                  <Link
                    href="#"
                    className="text-2xl btn bg-customGreen hover:bg-customGreen text-white rounded-md py-6 w-40 text-[32px]"
                  >
                    Login
                  </Link>
                </div>
                <div className="text-center">
                  <span className="text-customGrayColor me-2">
                    Don't have an account?
                  </span>
                  <Link
                    href="/auth-signup"
                    className="text-customGreen font-bold"
                  >
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
