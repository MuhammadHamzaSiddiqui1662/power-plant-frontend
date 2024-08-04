"use client"; // This is a client component 👈🏽
import React from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Footer = dynamic(() => import("../componants/Footer"));
const BrokerCard = dynamic(() => import("../componants/BrokerCard"));

import "./style.css";
import { Grid } from "@mui/material";
import { useGetBrokersQuery } from "../../services/user/user";

export default function Welcome() {
  const { data: brokers } = useGetBrokersQuery();

  return (
    <>
      <Navbar navClass="navbar-white" />
      <div className="mb-40">
        <Grid container>
          <Grid item xs={12}>
            <section className={`relative mt-40`}>
              <div className="container">
                <p className={`heading font-bold leading-none text-center`}>
                  Welcome back, Broker!
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
            {brokersCard.map((element) => (
              <Grid key={element._id} item xs={12} sm={6} md={3}>
                <BrokerCard
                  name={element.name}
                  imgSrc={element.imgSrc}
                  interests={element.interests}
                  ratings={element.ratings}
                  dealsInProgress={element.dealsInProgress}
                  successfulDeals={element.successfulDeals}
                />
                <Grid item xs={12} sm={6} md={3}></Grid>
              </Grid>
            ))}
            {brokers &&
              brokers.length > 0 &&
              brokers?.map((element) => (
                <Grid key={element._id} item xs={12} sm={6} md={3}>
                  <BrokerCard
                    name={element.name}
                    imgSrc={element.imageUrl}
                    interests={element.interests}
                    ratings={element.ratings}
                    dealsInProgress={element.dealsInProgress}
                    successfulDeals={element.successfulDeals}
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
const brokersCard = [
  {
    _id: "1",
    name: "Steve Aoki",
    imgSrc: "/images/client/01.jpg",
    interests: "Chemical Engineer",
    successfulDeals: "7",
    dealsInProgress: "2",
  },
  {
    _id: "2",
    name: "Steve Aoki",
    imgSrc: "/images/client/01.jpg",
    interests: "Chemical Engineer",
    successfulDeals: "8",
    dealsInProgress: "1",
  },
  {
    _id: "3",
    name: "Steve Aoki",
    imgSrc: "/images/client/01.jpg",
    interests: "Chemical Engineer",
    successfulDeals: "8",
    dealsInProgress: "2",
  },
  {
    _id: "4",
    name: "Steve Aoki",
    imgSrc: "/images/client/01.jpg",
    interests: "Chemical Engineer",
    successfulDeals: "7",
    dealsInProgress: "3",
  },
  {
    _id: "5",
    name: "Steve Aoki",
    imgSrc: "/images/client/01.jpg",
    interests: "Chemical Engineer",
    successfulDeals: "9",
    dealsInProgress: "1",
  },
  {
    _id: "6",
    name: "Steve Aoki",
    imgSrc: "/images/client/01.jpg",
    interests: "Chemical Engineer",
    successfulDeals: "5",
    dealsInProgress: "4",
  },
  {
    _id: "7",
    name: "Steve Aoki",
    imgSrc: "/images/client/01.jpg",
    interests: "Chemical Engineer",
    successfulDeals: "8",
    dealsInProgress: "6",
  },
  {
    _id: "8",
    name: "Steve Aoki",
    imgSrc: "/images/client/01.jpg",
    interests: "Chemical Engineer",
    successfulDeals: "10",
    dealsInProgress: "3",
  },
];
