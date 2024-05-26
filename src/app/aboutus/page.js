"use client"; // This is a client component 👈🏽
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import CountUp from "react-countup";

const Navbar = dynamic(() => import("../componants/Navbar"));
const Switcher = dynamic(() => import("../componants/Switcher"));
const Footer = dynamic(() => import("../componants/Footer"));
const Feature = dynamic(() => import("../componants/Feature"));
const About = dynamic(() => import("../componants/About"));
const GetInTuch = dynamic(() => import("../componants/Get-in-tuch"));
const Team = dynamic(() => import("../componants/Team"));
const ClientTwo = dynamic(() => import("../componants/Client-two"));

export default function Aboutus() {
  return (
    <>
      <Navbar navClass="navbar-white" />
      <section
        style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
        className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover"
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="container">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">
              About Us
            </h3>
          </div>
        </div>
      </section>
      <div className="relative">
        <div className="shape overflow-hidden z-1 text-white dark:text-slate-900">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <section className="relative md:pb-24 pb-16">
        <About />
        <Feature />
      </section>
      <section
        style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
        className="relative py-24 bg-no-repeat bg-center bg-fixed bg-cover"
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container">
          <div className="grid lg:grid-cols-12 grid-cols-1 md:text-left text-center justify-center">
            <div className="lg:col-start-2 lg:col-span-10">
              <div className="grid md:grid-cols-3 grid-cols-1 items-center">
                <div className="counter-box text-center">
                  <h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">
                    <CountUp
                      start={1010}
                      className="counter-value"
                      end={1548}
                      duration={2.75}
                    />
                    +
                  </h1>
                  <h5 className="counter-head text-white text-lg font-medium">
                    Properties Sell
                  </h5>
                </div>

                <div className="counter-box text-center">
                  <h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">
                    <CountUp
                      start={2}
                      className="counter-value"
                      end={25}
                      duration={2.75}
                    />
                    +
                  </h1>
                  <h5 className="counter-head text-white text-lg font-medium">
                    Award Gained
                  </h5>
                </div>

                <div className="counter-box text-center">
                  <h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">
                    <CountUp
                      start={0}
                      className="counter-value"
                      end={9}
                      duration={2.75}
                    />
                    +
                  </h1>
                  <h5 className="counter-head text-white text-lg font-medium">
                    Years Experience
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Team />
      </section>
      <section className="md:pb-24 pb-16">
        <ClientTwo />
        <GetInTuch />
      </section>

      <Footer />
      <Switcher />
    </>
  );
}
