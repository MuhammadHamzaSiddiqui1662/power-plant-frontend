"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Footer = dynamic(() => import("../componants/Footer"));
const Progress = dynamic(() => import("../componants/Progress"));
const BrokerCard = dynamic(() => import("../componants/BrokerCard"));
const Card = dynamic(() => import("../componants/Card"));
import Select from "react-select";

import "./style.css";
import { properties } from "../componants/Data";
import { Avatar, Grid } from "@mui/material";

export default function Welcome() {
  const [isBroker, setIsBroker] = useState(true);
  return (
    <>
      <Navbar navClass="navbar-white" />
      <div className="mb-40">
        <Grid container>
          <Grid item xs={12}>
            <section className={`relative ${isBroker ? "mt-40" : "mt-32"}`}>
              <div className="container">
                <p
                  className={`heading font-bold leading-none ${
                    isBroker ? "text-center" : ""
                  }`}
                >
                  {isBroker ? "Welcome back, Broker!" : "Welcome!"}
                </p>
                {isBroker ? (
                  <div className="flex justify-center">
                    <p className="px-2 desc-width text-customDarkBlue mt-8 mb-4 text-xl sub-heading text-center">
                      Your dashboard awaits, displaying the profiles of all the
                      Owners and Organizations you represent. Here, you have the
                      flexibility to select the profile you wish to advocate
                      for, ensuring you can seamlessly switch between clients as
                      needed. Empowered with this intuitive interface, you can
                      continue to serve your clients with efficiency and
                      dedication, forging valuable connections and securing
                      lucrative opportunities with every login.
                    </p>
                  </div>
                ) : (
                  <p className="text-customDarkBlue mt-3 mb-4 text-2xl sub-heading">
                    A great platform to buy, sell your intellectual properties{" "}
                    <br />
                    without any hassle.
                  </p>
                )}
              </div>
            </section>
          </Grid>
        </Grid>

        <section>
          {isBroker ? (
            <Grid container className="container">
              {brokersCard.map((element) => (
                <Grid key={element._id} item xs={12} sm={6} md={3}>
                  <BrokerCard name={element.name} imgSrc={element.imgSrc} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid
              direction={{ xs: "column-reverse", sm: "row" }}
              container
              className="container"
            >
              <Grid item xs={12} sm={6} md={8}>
                <div className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 mt-8 gap-[20px] text-start">
                  {properties.map((item, index) => (
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
                    />
                  ))}
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Grid container>
                  <Grid item xs={12}>
                    <div className="avatar-div mb-5">
                      <div className="flex items-center  avatar-text mb-14">
                        <div className="mx-2">
                          <Avatar
                            sx={{ width: 56, height: 56 }}
                            alt="Remy Sharp"
                            src="/images/client/01.jpg"
                          />
                        </div>
                        <div className="flex flex-col flex-wrap">
                          <p className="text-xl sm:text-2xl name">
                            Kirsten Dunst
                          </p>
                          <p className="designation">Investor</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-customGreen text-xl sm:text-2xl ">
                          Complete your profile
                        </p>
                        <Progress value={100} />
                      </div>
                    </div>
                    <div className="avatar-div mb-5">
                      <div className="flex items-center justify-between avatar-text">
                        <p className="mx-2 text-2xl sm:text-2xl name">
                          Interest
                        </p>
                        <div className="flex flex-col">
                          <p
                            href="#"
                            className="btn btn-icon bg-white dark:bg-customGreen shadow dark:shadow-gray-700 rounded-full text-slate-100 dark:text-customGreen focus:text-customGreen dark:focus:text-red-600 hover:text-customGreen dark:hover:text-customGreen"
                          >
                            <i className="mdi mdi-lead-pencil mdi-18px text-customDarkBlue"></i>
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        {[
                          "Bikes",
                          "Journalism",
                          "Civil Engineering",
                          "Mechanical Engineering",
                        ].map((elem, i) => (
                          <p key={i} className="mx-2">
                            {elem}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="avatar-div">
                      <div className="flex items-center justify-between avatar-text">
                        <p className="mx-2 text-2xl sm:text-2xl name">
                          Brokers
                        </p>
                        <div className="flex flex-col">
                          <p className="btn btn-icon bg-white dark:bg-customGreen shadow dark:shadow-gray-700 rounded-full text-slate-100 dark:text-customGreen focus:text-customGreen dark:focus:text-red-600 hover:text-customGreen dark:hover:text-customGreen">
                            <i className="mdi mdi-lead-pencil mdi-18px text-customDarkBlue"></i>
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        {[
                          "Bikes",
                          "Journalism",
                          "Civil Engineering",
                          "Mechanical Engineering",
                        ].map((elem, i) => (
                          <div
                            key={i}
                            className="flex items-center avatar-text mt-4"
                          >
                            <div className="mx-2">
                              <Avatar
                                sx={{ width: 20, height: 20 }}
                                alt="Remy Sharp"
                                src="/images/client/01.jpg"
                              />
                            </div>
                            <p className="text-base sm:text-sm md:text-lg lg:text-lg xl:text-2xl 2xl:text-2xl name">
                              Kirsten Dunst
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}
const brokersCard = [
  {
    _id: "1",
    name: "Swanz",
    imgSrc: "/images/client/01.jpg",
  },
  {
    _id: "2",
    name: "Cover",
    imgSrc: "/images/client/01.jpg",
  },
  {
    _id: "3",
    name: "Passtravel",
    imgSrc: "/images/client/01.jpg",
  },
  {
    _id: "4",
    name: "Camy",
    imgSrc: "/images/client/01.jpg",
  },
  {
    _id: "5",
    name: "Swanz",
    imgSrc: "/images/client/01.jpg",
  },
  {
    _id: "6",
    name: "Cover",
    imgSrc: "/images/client/01.jpg",
  },
  {
    _id: "7",
    name: "Passtravel",
    imgSrc: "/images/client/01.jpg",
  },
  {
    _id: "8",
    name: "Camy",
    imgSrc: "/images/client/01.jpg",
  },
];
