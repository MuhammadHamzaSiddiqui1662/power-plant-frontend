"use client"; // This is a client component 👈🏽
import React from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Footer = dynamic(() => import("../componants/Footer"));
const InvestorCard = dynamic(() => import("../componants/InvestorCard"));

import "./style.css";
import { Grid } from "@mui/material";
import { useGetInvestorsQuery } from "../../services/user/user";

export default function Welcome() {
  const { data: investor } = useGetInvestorsQuery();

  return (
    <>
      <Navbar navClass="navbar-white" />
      <div className="mb-40">
        <Grid container>
          <Grid item xs={12}>
            <section className={`relative mt-40`}>
              <div className="container">
                <p className={`heading font-bold leading-none text-center`}>
                  Welcome back, Investor!
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
            {investorCard.map((element) => (
              <Grid key={element._id} item xs={12} sm={6} md={3}>
                <InvestorCard name={element.name} imgSrc={element.imgSrc} />
              </Grid>
            ))}
            {investor &&
              investor.length > 0 &&
              investor?.map((element) => (
                <Grid key={element._id} item xs={12} sm={6} md={3}>
                  <InvestorCard name={element.name} imgSrc={element.imageUrl} />
                </Grid>
              ))}
          </Grid>
        </section>
      </div>

      <Footer />
    </>
  );
}
const investorCard = [
  {
    _id: "1",
    name: "Swanz",
    imgSrc: "/images/client/01.jpg",
    interests: [0],
    ratings: 3,
    dealsInProgress: 2,
    successfulDeals: 7,
  },
  {
    _id: "2",
    name: "Cover",
    imgSrc: "/images/client/01.jpg",
    interests: [0],
    ratings: 5,
    dealsInProgress: 1,
    successfulDeals: 10,
  },
  {
    _id: "3",
    name: "Passtravel",
    imgSrc: "/images/client/01.jpg",
    interests: [0],
    ratings: 4,
    dealsInProgress: 2,
    successfulDeals: 11,
  },
  {
    _id: "4",
    name: "Camy",
    imgSrc: "/images/client/01.jpg",
    interests: [0],
    ratings: 4,
    dealsInProgress: 3,
    successfulDeals: 6,
  },
  {
    _id: "5",
    name: "Swanz",
    imgSrc: "/images/client/01.jpg",
    interests: [0],
    ratings: 2,
    dealsInProgress: 1,
    successfulDeals: 8,
  },
  {
    _id: "6",
    name: "Cover",
    imgSrc: "/images/client/01.jpg",
    interests: [0],
    ratings: 5,
    dealsInProgress: 4,
    successfulDeals: 9,
  },
  {
    _id: "7",
    name: "Passtravel",
    imgSrc: "/images/client/01.jpg",
    interests: [0],
    ratings: 4,
    dealsInProgress: 6,
    successfulDeals: 7,
  },
  {
    _id: "8",
    name: "Camy",
    imgSrc: "/images/client/01.jpg",
    interests: [0],
    ratings: 5,
    dealsInProgress: 3,
    successfulDeals: 10,
  },
];
