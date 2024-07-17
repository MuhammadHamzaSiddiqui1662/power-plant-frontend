"use client"; // This is a client component 👈🏽
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import "./style.css";
import { useLoginMutation } from "../../services/auth/auth";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Footer = dynamic(() => import("../componants/Footer"));

export default function Pricing() {
  const [login, { data, isLoading, isError }] = useLoginMutation();
  return (
    <>
      <Navbar />
      <section className="relative lg:py-24 py-16">
        <div className="container">
          <p className="mt-16 mb-12 text-5xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-64px font-bold">
            Test Page
          </p>
          <div>{JSON.stringify(data)}</div>
          <button
            className="mb-4 btn border border-customDarkBlue text-customDarkBlue group-hover:text-white group-hover:bg-customGreen group-hover:border-customGreen hover:border-customGreen rounded-md mt-auto transition duration-300"
            onClick={() =>
              login({
                email: "tester1@test.com",
                password: "password",
              })
            }
          >
            login
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}
