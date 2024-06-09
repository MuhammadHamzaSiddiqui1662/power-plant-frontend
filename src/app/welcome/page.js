"use client"; // This is a client component 👈🏽
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Grid } from "react-feather";
import "./style.css";
import { properties } from "../componants/Data";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Switcher = dynamic(() => import("../componants/Switcher"));
const Footer = dynamic(() => import("../componants/Footer"));
const Card = dynamic(() => import("../componants/Card"));

export default function Welcome() {
  return (
    <>
      <Navbar navClass="navbar-white" />
      <section className="relative mt-32">
        <div className="container">
          <p className="heading font-bold leading-none">Welcome!</p>
          <p className="text-customDarkBlue mt-3 mb-7 text-2xl sub-heading">
            A great platform to buy, sell your intellectual properties <br />
            without any hassle.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
