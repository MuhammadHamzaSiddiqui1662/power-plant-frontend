"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import Select from "react-select";

import * as Unicons from "@iconscout/react-unicons";
import "./style.css";
import { properties } from "./componants/Data";
import Image from "next/image";
import { useGetAllQuery } from "../services/ip/ip";
const Navbar = dynamic(() => import("./componants/Navbar"));
const Switcher = dynamic(() => import("./componants/Switcher"));
const Footer = dynamic(() => import("./componants/Footer"));
const About = dynamic(() => import("./componants/About"));
const Feature = dynamic(() => import("./componants/Feature"));
const Property = dynamic(() => import("./componants/Property"));
const Client = dynamic(() => import("./componants/Client"));
const GetInTuch = dynamic(() => import("./componants/Get-in-tuch"));
const Card = dynamic(() => import("./componants/Card"));

const Houses = [
  { value: "AF", label: "Apartment" },
  { value: "AZ", label: " Offices" },
  { value: "BS", label: "Townhome" },
];
const minPrice = [
  { value: "1", label: "500" },
  { value: "2", label: "1000" },
  { value: "3", label: "2000" },
  { value: "4", label: "3000" },
  { value: "5", label: "4000" },
  { value: "5", label: "5000" },
  { value: "5", label: "6000" },
];
const maxPrice = [
  { value: "1", label: "500" },
  { value: "2", label: "1000" },
  { value: "3", label: "2000" },
  { value: "4", label: "3000" },
  { value: "5", label: "4000" },
  { value: "5", label: "5000" },
  { value: "5", label: "6000" },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data } = useGetAllQuery();

  useEffect(() => {
    setCurrentIndex(currentIndex);
  }, [currentIndex]);

  const handleRadioChange = (index) => {
    console.log(index, "INDESISHEREE");
    setCurrentIndex(index);
  };

  return (
    <>
      <Navbar />
      {/* Hero Start  */}
      <section className="relative mt-32">
        <div className="flex flex-col items-center p-5">
          <p className="heading font-bold text-center leading-none">
            The Perfect Marketplace for IPs.
          </p>
          <p className="text-center mt-3 mb-7 text-2xl sub-heading">
            A great platform to buy, sell your intellectual properties without
            any hassle.
          </p>
        </div>
        <div className="carousel-mar relative" style={{ zIndex: 80 }}>
          <div
            id="carousel"
            className="relative w-full overflow-hidden rounded-2xl shadow-md"
          >
            <input
              type="radio"
              name="carousel"
              id="carousel-1"
              className="hidden"
              checked={currentIndex === 0}
              onChange={() => handleRadioChange(0)}
            />
            <input
              type="radio"
              name="carousel"
              id="carousel-2"
              className="hidden"
              checked={currentIndex === 1}
              onChange={() => handleRadioChange(1)}
            />
            <input
              type="radio"
              name="carousel"
              id="carousel-3"
              className="hidden"
              checked={currentIndex === 2}
              onChange={() => handleRadioChange(2)}
            />

            <div className="carousel-inner relative w-full">
              <div
                className={`carousel-item absolute w-full h-full bg-no-repeat bg-center bg-cover ${
                  currentIndex === 0 ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundImage: "url('/images/bg/06.png')" }}
              ></div>
              <div
                className={`carousel-item absolute w-full h-full bg-no-repeat bg-center bg-cover ${
                  currentIndex === 1 ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundImage: "url('/images/bg/06.png')" }}
              ></div>
              <div
                className={`carousel-item absolute w-full h-full bg-no-repeat bg-center bg-cover ${
                  currentIndex === 2 ? "opacity-100" : "opacity-0"
                }`}
                style={{ backgroundImage: "url('/images/bg/06.png')" }}
              ></div>
            </div>

            {/* <div className="absolute inset-0 bg-black/60"></div> */}

            <div className="carousel-buttons absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-3">
              <label
                htmlFor="carousel-1"
                className={`carousel-button w-4 h-4 rounded-full cursor-pointer ${
                  currentIndex == 0 ? "selected" : ""
                }`}
              ></label>
              <label
                htmlFor="carousel-2"
                className={`carousel-button w-4 h-4 rounded-full cursor-pointer ${
                  currentIndex == 1 ? "selected" : ""
                }`}
              ></label>
              <label
                htmlFor="carousel-3"
                className={`carousel-button w-4 h-4 rounded-full cursor-pointer ${
                  currentIndex == 2 ? "selected" : ""
                }`}
              ></label>
            </div>
          </div>
        </div>
      </section>

      {/* Hero End */}
      <section className="relative md:pb-24 pb-16">
        <About />
        <Feature />
        <div className="container lg:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              Featured IP
            </h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px] text-start">
              {data &&
                data.length > 0 &&
                data
                  .slice(0, 6)
                  .map((item, index) => (
                    <Card
                      key={item._id}
                      name={item.name}
                      id={item._id}
                      description={item.description}
                      year={item.publishedDate}
                      categories={item.categories}
                      price={item.price}
                      patentNumber={item.patentNumber}
                      image={item.image}
                    />
                  ))}
            </div>
          </div>
        </div>
        <Client />
      </section>
      <Footer />
    </>
  );
}
