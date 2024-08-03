"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import Select from "react-select";

import * as Unicons from "@iconscout/react-unicons";
import "./style.css";
import { properties } from "./componants/Data";
import Image from "next/image";
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
  const [activeTabIndex, setactiveTabIndex] = useState(0);

  const handleTabClick = (tabIndex) => {
    setactiveTabIndex(tabIndex);
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(currentIndex);
    // const interval = setInterval(() => {
    //   setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming there are 3 images
    // }, 5000);

    // return () => clearInterval(interval);
  }, [currentIndex]);

  const handleRadioChange = (index) => {
    console.log(index, "INDESISHEREE");
    setCurrentIndex(index);
  };
  // useEffect(() => {
  //   const carouselItems = document.querySelectorAll(".carousel-item");
  //   const radioButtons = document.querySelectorAll("input[name='carousel']");
  //   let currentIndex = 0;

  //   const showSlide = (index) => {
  //     carouselItems.forEach((item, i) => {
  //       item.classList.toggle("opacity-0", i !== index);
  //       item.classList.toggle("opacity-100", i === index);
  //     });
  //   };

  //   const autoSlide = () => {
  //     currentIndex = (currentIndex + 1) % carouselItems.length;
  //     radioButtons[currentIndex].checked = true;
  //     showSlide(currentIndex);
  //   };

  //   radioButtons.forEach((button, index) => {
  //     button.addEventListener("change", () => {
  //       currentIndex = index;
  //       showSlide(index);
  //     });
  //   });

  //   const interval = setInterval(autoSlide, 5000);

  //   showSlide(currentIndex);

  //   return () => clearInterval(interval);
  // }, []);
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
                // <div
                //   className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500"
                //   key={index}
                // >
                //   <div className="relative">
                //     <Image
                //       src={item.image}
                //       alt=""
                //       width={0}
                //       height={0}
                //       sizes="100vw"
                //       style={{ width: "100%", height: "auto" }}
                //       priority
                //     />

                //     <div className="absolute top-4 end-4">
                //       <Link
                //         href="#"
                //         className="btn btn-icon bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-full text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"
                //       >
                //         <i className="mdi mdi-heart mdi-18px"></i>
                //       </Link>
                //     </div>
                //   </div>

                //   <div className="p-6">
                //     <div className="pb-4">
                //       <Link
                //         href={`/details/${item.id}`}
                //         className="text-lg hover:text-customGreen font-medium ease-in-out duration-500"
                //       >
                //         {item.name}
                //       </Link>
                //     </div>
                //     <div style={{ height: "80px", overflow: "hidden" }}>
                //       <p
                //         className="font-medium ease-in-out duration-500"
                //         style={{
                //           display: "-webkit-box",
                //           WebkitBoxOrient: "vertical",
                //           WebkitLineClamp: 3,
                //           overflow: "hidden",
                //           textOverflow: "ellipsis",
                //         }}
                //       >
                //         Strategically cultivate your garden,is harvest plants,
                //         and sabotage others Strategically cultivate
                //       </p>
                //     </div>

                //     <ul className="pt-5 flex justify-between items-center list-none">
                //       <li>
                //         <span className="text-slate-400">Price</span>
                //         <p className="text-lg font-medium">${item.price}</p>
                //       </li>
                //       <li>
                //         <span className="text-slate-400">
                //           Year of Publication
                //         </span>
                //         <p className="text-lg font-medium">${item.price}</p>
                //       </li>
                //     </ul>
                //     <ul className="pt-6 flex justify-between items-center list-none">
                //       <li>
                //         <span className="text-slate-400">Patent#</span>
                //         <p className="text-lg font-medium">${item.price}</p>
                //       </li>
                //       <li style={{ width: "130px" }}>
                //         <span className="text-slate-400">Category</span>
                //         <p className="text-lg font-medium">${item.price}</p>
                //       </li>
                //     </ul>
                //   </div>
                // </div>
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
