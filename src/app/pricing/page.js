"use client"; // This is a client component 👈🏽
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import * as Unicons from "@iconscout/react-unicons";

import "./style.css";
import { Grid } from "@mui/material";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Switcher = dynamic(() => import("../componants/Switcher"));
const Footer = dynamic(() => import("../componants/Footer"));
const GetInTuch = dynamic(() => import("../componants/Get-in-tuch"));

export default function Pricing() {
  const pricingPlan = [
    {
      title: "Subscriber Fee",
      time: "per year",
      fearures: [
        "Unlock the full potential of our website with a subscription! Gain access to unlimited IPs (Intellectual Properties) and enjoy all the exclusive features and benefits for an entire year. Subscribe now and elevate your experience!",
      ],
      amount: 200,
      btnName: "Subscribe Now",
    },
    {
      title: "A price to file patents",
      time: "per innovation",

      fearures: [
        "Leave the complexities of patent filing to us.",
        "Safeguard your intellectual property with ease as we handle all the intricacies of the patent filing process. Protect your innovations hassle-free.",
      ],
      amount: 5000,
      btnName: "Secure my Patent",
    },
    {
      title: "Publishing Fee",
      time: "per innovation",
      fearures: [
        "Maximize the value of your intellectual property by showcasing it on our platform. Connect with legitimate investors and unlock the true potential of your IP. Publish now and take the first step towards realizing its worth.",
      ],
      amount: 20,
      btnName: "Publish my IP",
    },
    // {
    //   title: "Broker Fees Structure",
    //   time: "per innovation",
    //   fearures: [
    //     "Maximize the value of your intellectual property by showcasing it on our platform. Connect with legitimate investors and unlock the true potential of your IP. Publish now and take the first step towards realizing its worth.",
    //   ],
    //   amount: 20,
    //   btnName: "Hire a Broker",
    //   brokerPackages: [
    //     {
    //       title: "Broker IP deals for Businesses",
    //       amount: 3500,
    //       time: "per innovation",
    //     },
    //     {
    //       title: "Broker Subscription",
    //       amount: 20,
    //       time: "per innovation",
    //     },
    //   ],
    // },
  ];

  return (
    <>
      <Navbar />
      <section className="relative lg:py-24 py-16">
        <div className="container">
          <p className="mt-16 mb-12 text-5xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-64px font-bold">
            Pricing & Fees
          </p>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-[30px] gap-y-[50px]">
            {pricingPlan.map((item, index) => {
              return (
                <div
                  className={`group rounded-md border border-gray-300 hover:border-customGreen-500 ${
                    index === 1
                      ? "lg:col-span-2"
                      : index === 3
                      ? "lg:col-span-4 md:grid-cols-3"
                      : index === 2 || index === 3
                      ? "md:grid-cols-4"
                      : ""
                  } `}
                  key={index}
                >
                  {index != 3 ? (
                    <>
                      <div className="text-center px-5 mt-4">
                        <p className="pricing-title text-start text-customDarkBlue">
                          {item.title}
                        </p>
                        <p className="text-customDarkBlue text-start text-6xl md:text-6xl sm:text-5xl mt-6 group-hover:text-customGreen transition-colors duration-300">
                          $ {item.amount}
                        </p>
                        <p className="text-customDarkBlue text-start pricing-title">
                          {item.time}
                        </p>
                      </div>
                      <div className="px-5 mb-5">
                        <ul className="list-none description-height">
                          {item.fearures.map((subitem, subindex) => (
                            <li
                              className="flex items-center my-1 text-slate-400 dark:text-slate-300"
                              key={subindex}
                            >
                              <p
                                className={`text-customDarkBlue ${
                                  index == 1 ? "description-width" : ""
                                }`}
                              >
                                {subitem}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="#"
                          className="mb-4 btn border border-customDarkBlue text-customDarkBlue group-hover:text-white group-hover:bg-customGreen group-hover:border-customGreen hover:border-customGreen rounded-md mt-auto transition duration-300"
                        >
                          {item.btnName}
                        </Link>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* <GetInTuch /> */}
      </section>

      <Footer />
    </>
  );
}
