"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";
import { Alert, Box, Tab, Tabs } from "@mui/material";
import "./style.css";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "../../services/auth/auth";
import { useDispatch } from "react-redux";
import { setUserType } from "../../lib/features/authSlice";
import ButtonContained from "../../components/ButtonContained/ButtonContained";
import { UserType } from "../../types/user";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();

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
      const { error } = await login(data);
      console.log("error --->", error);
      if (error) return setError(error.data.message);
      dispatch(setUserType(tabValue));
      router.replace(tabValue == UserType.Broker ? "/investors" : "/home");
    } catch (error) {
      console.log("error: ", error);
    }
  };

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
              <Box className="p-6">
                <form
                  className="ltr:text-left rtl:text-right grid grid-cols-1"
                  onSubmit={handleSubmit}
                >
                  {error && (
                    <Alert variant="outlined" severity="error" className="mb-4">
                      {error}
                    </Alert>
                  )}
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
                    <ButtonContained
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      Login
                    </ButtonContained>
                  </div>
                  <div className="text-center">
                    <span className="text-customGrayColor me-2">
                      {`Don't have an account?`}
                    </span>
                    <Link
                      href="/auth-signup"
                      className="text-customGreen font-bold"
                    >
                      Sign Up
                    </Link>
                  </div>
                </form>
              </Box>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
