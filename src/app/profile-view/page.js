"use client";
import { Chip, Grid } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const Navbar = dynamic(() => import("../componants/Navbar"));
const Switcher = dynamic(() => import("../componants/Switcher"));
const Footer = dynamic(() => import("../componants/Footer"));

import "./style.css";
import { properties } from "../componants/Data";
import Card from "../componants/Card";
export default function ViewProfile(props) {
  // return <>hello</>
  const [user, setUser] = useState(1);
  return (
    <>
      <Navbar />
      <Grid container className="container" spacing={3}>
        <Grid item xs={12}>
          <section className={`relative mt-40`}>
            <div className="container">
              <p className={`heading font-bold leading-none text-center mb-12`}>
                {user == 0
                  ? "Innovator"
                  : user == 1
                  ? "Investor"
                  : user === 2
                  ? "Broker"
                  : ""}{" "}
                Profile
              </p>
            </div>
          </section>
        </Grid>
        <Grid item xs={4}>
          <div className="rounded-lg">
            <img width="100%" src="/images/certificate.png" />
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className="p-1">
            <p className="text-customDarkBlue text-3xl font-medium">
              Steve Aoki
            </p>
            <p className="text-customGrayColor text-xl font-medium">
              Chemical Engineer | Mechanical Engineer
            </p>
            <p className="text-customGrayColor mt-2 mb-4 font-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="text-customDarkBlue text-3xl font-medium">
              Interests
            </p>

            {[
              "Wood",
              "Chemical Engineering",
              "Mechanical Engineering",
              "Garden",
              "Food",
              "Library",
              "Comics",
              "Wood",
              "Chemical Engineering",
              "Mechanical Engineering",
              "Garden",
            ].map((element, i) => (
              <Chip
                key={i}
                className="text-customDarkBlue me-3 mt-3 chips-blue font-normal"
                label={element}
              />
            ))}
            {user === 2 && (
              <>
                {" "}
                <div className="flex">
                  <p className="text-customDarkBlue text-3xl mt-7 font-medium">
                    Certificates
                  </p>
                </div>
                <Grid container className="mt-1">
                  <Grid item xs={3}>
                    <div className="p-2">
                      <img width="100%" src="/images/certificate.png" />
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className="p-2">
                      <img width="100%" src="/images/certificate.png" />
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className="p-2">
                      <img width="100%" src="/images/certificate.png" />
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <div className="p-2">
                      <img width="100%" src="/images/certificate.png" />
                    </div>
                  </Grid>
                </Grid>
              </>
            )}

            <Grid container className="mt-5 mb-5">
              <Grid
                item
                xs={6}
                className="border-2 px-6 py-4 rounded-tl-lg rounded-bl-lg"
              >
                <p className="text-customDarkBlue text-2xl">
                  Successful Projects
                </p>
                <p className="text-customDarkBlue text-3xl mt-1">5</p>
              </Grid>
              <Grid
                item
                xs={6}
                className="border-2 border-l-0 px-6 py-4 rounded-tr-lg rounded-br-lg"
              >
                <p className="text-customDarkBlue text-2xl">
                  Projects In-Progress
                </p>
                <p className="text-customDarkBlue text-3xl mt-1">3</p>
              </Grid>
              {user == 0 && (
                <Grid item xs={12}>
                  <p className="text-customDarkBlue text-3xl font-medium mt-6">
                    Published IPs
                  </p>
                  <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-3 gap-[30px] text-start">
                    {properties.slice(0, 2).map((item, index) => (
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
              )}
              {user === 2 && (
                <Grid item xs={12}>
                  <div className="flex justify-start mt-5">
                    <button
                      type="submit"
                      className="my-3 text-2xl btn bg-customGreen hover:bg-customGreen text-white rounded-md py-6 w-60 text-[32px]"
                    >
                      Hire / Contact
                    </button>
                  </div>
                </Grid>
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
      <div className="mt-28">
        <Footer />
      </div>
      <Switcher />
    </>
  );
}
