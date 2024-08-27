"use client"; // This is a client component 👈🏽
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Footer = dynamic(() => import("../componants/Footer"));
const InvestorCard = dynamic(() => import("../componants/InvestorCard"));

import "./style.css";
import { Grid } from "@mui/material";
import { useGetMyInvestorsQuery } from "../../services/hiring/hiring";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentInvestor } from "../../lib/features/hiringSlice";
import { setCurrentIp } from "../../lib/features/ipSlice";
import { useRouter } from "next/navigation";

export default function Welcome() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, accessToken } = useSelector((state) => state.auth);
  const { currentInvestor } = useSelector((state) => state.hiring);
  const { data: investors } = useGetMyInvestorsQuery();

  const handleSelectInvestor = (hiring) => {
    dispatch(setCurrentInvestor(hiring.investor));
    dispatch(setCurrentIp(hiring.ip));
    router.replace("/home");
  };

  useEffect(() => {
    if (!accessToken) return router.replace("/auth-login");
    if (investors && investors.length == 0) return router.replace("/home");
  }, [accessToken, investors]);

  return (
    <>
      <Navbar navClass="navbar-white" />
      <div className="mb-40">
        <Grid container>
          <Grid item xs={12}>
            <section className={`relative mt-40`}>
              <div className="container">
                <p className={`heading font-bold leading-none text-center`}>
                  Welcome back, {user?.name}!
                </p>
                <div className="flex justify-center">
                  <p className="px-2 desc-width text-customDarkBlue mt-8 mb-4 text-xl sub-heading text-center">
                    Your dashboard awaits, displaying the profiles of all the
                    Owners and Organizations you represent. Here, you have the
                    flexibility to select the profile you wish to advocate for,
                    ensuring you can seamlessly switch between clients as
                    needed. Empowered with this intuitive interface, you can
                    continue to serve your clients with efficiency and
                    dedication, forging valuable connections and securing
                    lucrative opportunities with every login.
                  </p>
                </div>
              </div>
            </section>
          </Grid>
        </Grid>

        <section>
          <Grid container className="container">
            {investors &&
              investors.length > 0 &&
              investors?.map((investor) => (
                <Grid key={investor._id} item xs={12} sm={6} md={3}>
                  <InvestorCard
                    name={investor.investor.name}
                    imgSrc={
                      "/images/client/01.jpg" || investor.investor.imageUrl
                    }
                    current={investor.investor._id === currentInvestor._id}
                    onClick={() => handleSelectInvestor(investor)}
                  />
                </Grid>
              ))}
          </Grid>
        </section>
      </div>
      <Footer />
    </>
  );
}
