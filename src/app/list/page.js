"use client"; // This is a client component 👈🏽
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Select from "react-select";
import * as Unicons from "@iconscout/react-unicons";

const Navbar = dynamic(() => import("../componants/Navbar"));
const Switcher = dynamic(() => import("../componants/Switcher"));
const Footer = dynamic(() => import("../componants/Footer"));
const PaginationTwo = dynamic(() => import("../componants/Pagination-two"));
import { properties, propertiesDetails } from "../componants/Data";

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

export default function List() {
  return (
    <>
      <Navbar navClass="navbar-white" />
      <section className="relative table w-full pb-5 pt-32 lg:pt-36 bg-no-repeat bg-center bg-cover">
        <div className="container">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="text-5xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-64px md:leading-normal leading-normal font-bold text-customDarkblue">
              IPs Listing
            </h3>
          </div>
        </div>
      </section>

      <div className="container relative z-1">
        <div className="grid grid-cols-1">
          <form className="py-6 lg:px-24 bg-white dark:bg-slate-900">
            <div className="registration-form text-dark text-start pb-8">
              <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                <div>
                  <label className="form-label text-slate-900 dark:text-white font-medium">
                    Search : <span className="text-red-600">*</span>
                  </label>
                  <div className="filter-search-form relative filter-border mt-2">
                    <Unicons.UilSearch className="icons" width={18} />
                    <input
                      name="name"
                      type="text"
                      id="job-keyword"
                      className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                      placeholder="Search your Keywords"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="buy-properties"
                    className="form-label text-slate-900 dark:text-white font-medium"
                  >
                    Select Categories:
                  </label>
                  <div className="filter-search-form relative filter-border mt-2">
                    <Unicons.UilEstate className="icons" width={18} />
                    <Select
                      className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                      options={Houses}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="buy-min-price"
                    className="form-label text-slate-900 dark:text-white font-medium"
                  >
                    Min Price :
                  </label>
                  <div className="filter-search-form relative filter-border mt-2">
                    <Unicons.UilUsdCircle className="icons" width={18} />
                    <Select
                      className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                      options={minPrice}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="buy-max-price"
                    className="form-label text-slate-900 dark:text-white font-medium"
                  >
                    Max Price :
                  </label>
                  <div className="filter-search-form relative mt-2">
                    <Unicons.UilUsdCircle className="icons" width={18} />
                    <Select
                      className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                      options={maxPrice}
                    />
                  </div>
                </div>

                <div className="lg:mt-6">
                  <input
                    type="submit"
                    id="search-buy"
                    name="search"
                    className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-12 rounded"
                    value="Search"
                  />
                </div>
              </div>
            </div>

            <hr />
          </form>
        </div>
      </div>
      <section className="relative lg:py-10 py-10">
        <div className="container">
          <PaginationTwo
            itemsPerPage={6}
            items={properties}
            gridClass={`grid lg:grid-cols-3 grid-cols-1 gap-[30px]`}
            className="h-full w-full object-cover md:w-48"
          />
        </div>
      </section>
      <Footer />
      <Switcher />
    </>
  );
}
