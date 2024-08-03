"use client"; // This is a client component 👈🏽
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import "./style.css";
import { useGetAllPackagesQuery } from "../../services/package/package";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Footer = dynamic(() => import("../componants/Footer"));

export default function Pricing() {
  const { data: packages } = useGetAllPackagesQuery();

  return (
    <>
      <Navbar />
      <section className="relative lg:py-24 py-16">
        <div className="container">
          <p className="mt-16 mb-12 text-5xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-64px font-bold">
            Pricing & Fees
          </p>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-[30px] gap-y-[50px]">
            {packages &&
              packages.map((item, index) => {
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
                    key={item._id}
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
                            {item.description}
                          </p>
                        </div>
                        <div className="px-5 mb-5">
                          <ul className="list-none description-height">
                            {item.features &&
                              item.features.map((subitem, subindex) => (
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
                            href={
                              item.redirectLink?.includes("payment")
                                ? `${item.redirectLink}?type=subscribe`
                                : item.redirectLink
                            }
                            className="mb-4 btn border border-customDarkBlue text-customDarkBlue group-hover:text-white group-hover:bg-customGreen group-hover:border-customGreen hover:border-customGreen rounded-md mt-auto transition duration-300"
                          >
                            {item.buttonName}
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
      </section>
      <Footer />
    </>
  );
}
