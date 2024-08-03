"use client"; // This is a client component 👈🏽
import React from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Footer = dynamic(() => import("../componants/Footer"));
const Progress = dynamic(() => import("../componants/Progress"));
const Card = dynamic(() => import("../componants/Card"));

import "./style.css";
import { properties } from "../componants/Data";
import { Avatar, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { UserType } from "../../types/user";
import { useRouter } from "next/navigation";
import { useGetAllQuery } from "../../services/ip/ip";

export default function Welcome() {
  const router = useRouter();
  const { user, userType } = useSelector((state) => state.auth);
  const { data: ips } = useGetAllQuery();

  console.log(user);
  return (
    <>
      <Navbar navClass="navbar-white" />
      <div className="mb-40">
        <Grid container>
          <Grid item xs={12}>
            <section className={`relative mt-32`}>
              <div className="container">
                <p className={`heading font-bold leading-none`}>Welcome!</p>
                <p className="text-customDarkBlue mt-3 mb-4 text-2xl sub-heading">
                  A great platform to buy, sell your intellectual properties{" "}
                  <br />
                  without any hassle.
                </p>
              </div>
            </section>
          </Grid>
        </Grid>

        <section>
          <Grid
            direction={{ xs: "column-reverse", sm: "row" }}
            container
            className="container"
          >
            <Grid item xs={12} sm={6} md={8}>
              <div className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 mt-8 gap-[20px] text-start">
                {ips &&
                  ips.map((ip, index) => (
                    <Card
                      key={ip._id}
                      name={ip.name}
                      id={ip._id}
                      description={ip.description}
                      year={ip.publishedDate}
                      categories={ip.categories}
                      price={ip.price}
                      patentNumber={ip.patentNumber}
                      image={ip.image}
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
                        <p className="text-xl sm:text-2xl name">{user?.name}</p>
                        <p className="designation">
                          {userType == UserType.Broker
                            ? "Broker"
                            : userType == UserType.Innvestor
                            ? "Investor"
                            : "Innovator"}
                        </p>
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
                      <p className="mx-2 text-2xl sm:text-2xl name">Interest</p>
                      <div
                        className="flex flex-col cursor-pointer"
                        onClick={() => router.push("/profile")}
                      >
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
                        <p key={i} className="mx-2">
                          {elem}
                        </p>
                      ))}
                      {user &&
                        user.interests.map((elem, i) => (
                          <p key={i} className="mx-2">
                            {elem}
                          </p>
                        ))}
                    </div>
                  </div>
                  <div className="avatar-div">
                    <div className="flex items-center justify-between avatar-text">
                      <p className="mx-2 text-2xl sm:text-2xl name">Brokers</p>
                      <div
                        className="flex flex-col cursor-pointer"
                        onClick={() => router.push("/profile")}
                      >
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
        </section>
      </div>

      <Footer />
    </>
  );
}
