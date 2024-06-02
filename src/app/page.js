"use client"; // This is a client component 👈🏽
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import Select from "react-select";

import * as Unicons from "@iconscout/react-unicons";
import "./style.css";
const Navbar = dynamic(() => import("./componants/Navbar"));
const Switcher = dynamic(() => import("./componants/Switcher"));
const Footer = dynamic(() => import("./componants/Footer"));
const About = dynamic(() => import("./componants/About"));
const Feature = dynamic(() => import("./componants/Feature"));
const Property = dynamic(() => import("./componants/Property"));
const Client = dynamic(() => import("./componants/Client"));
const GetInTuch = dynamic(() => import("./componants/Get-in-tuch"));

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
      {/* <section className="relative mt-32">
        <div className="flex flex-col items-center p-5">
          <p className="text-64px font-bold text-center leading-none">
            The Perfect Marketplace for IPs.
          </p>
          <p className="text-center mt-3">
            A great platform to buy, sell your intellectual properties without
            any hassle.
          </p>
        </div>
        <div className="md:mx-18 mx-14 relative">
          <div
            id="carousel"
            className="relative w-full overflow-hidden rounded-2xl shadow-md"
          >
            <input
              type="radio"
              name="carousel"
              id="carousel-1"
              checked
              className="hidden"
            />
            <input
              type="radio"
              name="carousel"
              id="carousel-2"
              className="hidden"
            />
            <input
              type="radio"
              name="carousel"
              id="carousel-3"
              className="hidden"
            />

            <div className="carousel-inner relative w-full">
              <div
                className="carousel-item absolute w-full h-full bg-no-repeat bg-center bg-cover"
                style="background-image: url('/images/bg/01.jpg')"
              ></div>
              <div
                className="carousel-item absolute w-full h-full bg-no-repeat bg-center bg-cover"
                style="background-image: url('/images/bg/02.jpg')"
              ></div>
              <div
                className="carousel-item absolute w-full h-full bg-no-repeat bg-center bg-cover"
                style="background-image: url('/images/bg/03.jpg')"
              ></div>
            </div>

            <div className="absolute inset-0 bg-black/60"></div>

            <div className="carousel-buttons absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-3">
              <label
                for="carousel-1"
                className="carousel-button bg-white w-4 h-4 rounded-full cursor-pointer"
              ></label>
              <label
                for="carousel-2"
                className="carousel-button bg-white w-4 h-4 rounded-full cursor-pointer"
              ></label>
              <label
                for="carousel-3"
                className="carousel-button bg-white w-4 h-4 rounded-full cursor-pointer"
              ></label>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="relative mt-32">
        <div className="flex flex-col items-center p-5">
          <p className="text-64px font-bold text-center leading-none">
            The Perfect Marketplace for IPs.
          </p>
          <p className="text-center mt-3 ">
            A great platform to buy, sell your intellectual properties without
            any hassle.
          </p>
        </div>
        <div className="md:mx-18 mx-14">
          <div
            style={{ backgroundImage: `url('/images/bg/01.jpg')` }}
            className="relative pt-48 pb-52 table w-full rounded-2xl shadow-md overflow-hidden  bg-no-repeat bg-center bg-cover"
            id="home"
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        </div>
      </section> */}
      {/* Hero End */}
      <section className="relative md:pb-24 pb-16">
        <div className="container">
          <div className="grid grid-cols-1 justify-center">
            <div className="relative -mt-32">
              <div className="grid grid-cols-1">
                {/* <ul
                  className="inline-block sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 rounded-t-xl border-b dark:border-gray-800"
                  id="myTab"
                  data-tabs-toggle="#StarterContent"
                  role="tablist"
                >
                  <li role="presentation" className="inline-block">
                    <button
                      onClick={() => handleTabClick(0)}
                      className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${
                        activeTabIndex === 0
                          ? "text-white bg-green-600"
                          : "hover:text-green-600"
                      }`}
                      id="buy-home-tab"
                      data-tabs-target="#buy-home"
                      type="button"
                      role="tab"
                      aria-controls="buy-home"
                      aria-selected="true"
                    >
                      Buy
                    </button>
                  </li>
                  <li role="presentation" className="inline-block">
                    <button
                      onClick={() => handleTabClick(1)}
                      className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${
                        activeTabIndex === 1
                          ? "text-white bg-green-600"
                          : "hover:text-green-600"
                      }`}
                      id="sell-home-tab"
                      data-tabs-target="#sell-home"
                      type="button"
                      role="tab"
                      aria-controls="sell-home"
                      aria-selected="false"
                    >
                      Sell
                    </button>
                  </li>
                  <li role="presentation" className="inline-block">
                    <button
                      onClick={() => handleTabClick(2)}
                      className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${
                        activeTabIndex === 2
                          ? "text-white bg-green-600"
                          : "hover:text-green-600"
                      }`}
                      id="rent-home-tab"
                      data-tabs-target="#rent-home"
                      type="button"
                      role="tab"
                      aria-controls="rent-home"
                      aria-selected="false"
                    >
                      Rent
                    </button>
                  </li>
                </ul> */}

                {/* <div id="StarterContent" className="p-6 bg-white dark:bg-slate-900 rounded-ss-none rounded-se-none md:rounded-se-xl rounded-xl shadow-md dark:shadow-gray-700">
                                    {activeTabIndex === 0 && (
                                        <div id="buy-home" role="tabpanel" aria-labelledby="buy-home-tab">
                                            <form action="#">
                                                <div className="registration-form text-dark text-start">
                                                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                                        <div>
                                                            <label className="form-label text-slate-900 dark:text-white font-medium">Search : <span className="text-red-600">*</span></label>
                                                            <div className="filter-search-form relative filter-border mt-2 ">
                                                                <Unicons.UilSearch  className="icons" width={18}/>
                                                                <input name="name" type="text" id="job-keyword" className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" placeholder="Search your Keywords" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-properties" className="form-label text-slate-900 dark:text-white font-medium">Select Categories:</label>                                                        
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <Unicons.UilEstate  className="icons" width={18}/>
                                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={Houses} />

                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-min-price" className="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <Unicons.UilUsdCircle  className="icons" width={18}/>
                                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={minPrice} />

                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-max-price" className="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                                            <div className="filter-search-form relative mt-2">
                                                                <Unicons.UilUsdCircle  className="icons" width={18}/>
                                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={maxPrice} />

                                                            </div>
                                                        </div>

                                                        <div className="lg:mt-6">
                                                            <input type="submit" id="search-buy" name="search" className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-12 rounded" value="Search" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                    {activeTabIndex === 1 && (
                                        <div id="sell-home" role="tabpanel" aria-labelledby="sell-home-tab">
                                            <form action="#">
                                            <div className="registration-form text-dark text-start">
                                                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                                        <div>
                                                            <label className="form-label text-slate-900 dark:text-white font-medium">Search : <span className="text-red-600">*</span></label>
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                
                                                                <Unicons.UilSearch  className="icons" width={18}/>
                                                                <input name="name" type="text" id="job-keyword" className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" placeholder="Search your Keywords" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-properties" className="form-label text-slate-900 dark:text-white font-medium">Select Categories:</label>                                                        
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <Unicons.UilEstate  className="icons" width={18}/>
                                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={Houses} />

                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-min-price" className="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <Unicons.UilUsdCircle  className="icons" width={18}/>
                                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={minPrice} />

                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-max-price" className="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                                            <div className="filter-search-form relative mt-2">
                                                                <Unicons.UilUsdCircle  className="icons" width={18}/>
                                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={maxPrice} />

                                                            </div>
                                                        </div>

                                                        <div className="lg:mt-6">
                                                            <input type="submit" id="search-buy" name="search" className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-12 rounded" value="Search" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                    {activeTabIndex === 2 && (
                                        <div id="rent-home" role="tabpanel" aria-labelledby="rent-home-tab">
                                            <form action="#">
                                            <div className="registration-form text-dark text-start">
                                                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                                        <div>
                                                            <label className="form-label text-slate-900 dark:text-white font-medium">Search : <span className="text-red-600">*</span></label>
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <Unicons.UilSearch  className="icons" width={18}/>
                                                                <input name="name" type="text" id="job-keyword" className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" placeholder="Search your Keywords" />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-properties" className="form-label text-slate-900 dark:text-white font-medium">Select Categories:</label>                                                        
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                <Unicons.UilEstate  className="icons" width={18}/>
                                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={Houses} />

                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-min-price" className="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                                            <div className="filter-search-form relative filter-border mt-2">
                                                                 <Unicons.UilUsdCircle  className="icons" width={18}/>
                                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={minPrice} />

                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label htmlFor="buy-max-price" className="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                                            <div className="filter-search-form relative mt-2">
                                                                 <Unicons.UilUsdCircle  className="icons" width={18}/>
                                                                <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={maxPrice} />

                                                            </div>
                                                        </div>

                                                        <div className="lg:mt-6">
                                                            <input type="submit" id="search-buy" name="search" className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-12 rounded" value="Search" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div> */}
              </div>
            </div>
          </div>
        </div>

        <About />
        <Feature />
        <Property />
        <Client />
        {/* <GetInTuch /> */}
      </section>
      <Footer />
      {/* <Switcher /> */}
    </>
  );
}
