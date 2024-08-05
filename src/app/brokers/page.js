"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Footer = dynamic(() => import("../componants/Footer"));
const BrokerCard = dynamic(() => import("../componants/BrokerCard"));
const Switcher = dynamic(() => import("../componants/Switcher"));
const PaginationTwo = dynamic(() => import("../componants/Pagination-two"));
const CategorySelect = dynamic(() => import("../componants/CategorySelect"));
import "./style.css";
import { Grid } from "@mui/material";
import { useGetBrokersQuery } from "../../services/user/user";
import { FormControl, OutlinedInput } from "@mui/material";
import { useGetAllQuery, useGetIpQuery } from "../../services/ip/ip";

const calculateRating = (reviews) =>
  reviews.reduce(
    (prev, curr) =>
      prev +
      (curr.priceNegotiation +
        curr.responsiveness +
        curr.communication +
        curr.technicalSkills +
        curr.behaviour) /
        5,
    [0]
  );

const generateFilterQuery = (filterQuery) => {
  const matchStage = [];

  if (filterQuery.categories.length > 0) {
    matchStage.push(
      filterQuery.categories.reduce(
        (prev, curr) => prev + `categories=${curr}&`,
        ""
      )
    );
  }

  if (filterQuery.min !== "") matchStage.push(`min=${filterQuery.min}`);

  if (filterQuery.max !== "") matchStage.push(`max=${filterQuery.max}`);

  const result =
    matchStage.length > 0
      ? matchStage.reduce((prev, curr) => `${prev}${curr}&`, "?")
      : "";

  return result;
};

export default function Welcome() {
  const [filters, setFilters] = useState({
    search: "",
    categories: [],
    min: "",
    max: "",
  });
  const [filterQuery, setFilterQuery] = useState("");
  const { data: brokers } = useGetBrokersQuery(filterQuery);

  const handleInputChange = (event) => {
    console.log("input change", event);
    setFilters((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilters((prev) => ({
      ...prev,
      categories: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSearch = () => {
    console.log(filterQuery);
    setFilterQuery(generateFilterQuery(filters));
  };

  return (
    <div>
      <Navbar navClass="navbar-white" />
      <section className="relative table w-full pb-5 pt-32 lg:pt-36 bg-no-repeat bg-center bg-cover">
        <div className="container">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="text-5xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-64px md:leading-normal leading-normal font-bold text-customDarkblue">
              Brokers
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
                  <div className="filter-search-form relative filter-border mt-2 px-2 py-3">
                    {/* <Unicons.UilSearch className="icons" width={18} />
                    <input
                      name="name"
                      type="text"
                      id="job-keyword"
                      className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                      placeholder="Search your Keywords"
                    /> */}
                    <FormControl size="small" fullWidth={true}>
                      <OutlinedInput
                        placeholder="Search your Keywords"
                        name="search"
                        value={filters.search}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="buy-properties"
                    className="form-label text-slate-900 dark:text-white font-medium"
                  >
                    Select Categories:
                  </label>
                  <div className="filter-search-form relative filter-border mt-2 px-2 py-3">
                    <CategorySelect
                      categories={filters.categories}
                      onChange={handleCategoryChange}
                      fullWidth={true}
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
                  <div className="filter-search-form relative filter-border mt-2 px-2 py-3">
                    {/* <Unicons.UilUsdCircle className="icons" width={18} />
                    <Select
                      className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                      options={minPrice}
                    /> */}
                    <FormControl size="small" fullWidth>
                      <OutlinedInput
                        type="number"
                        placeholder="Min Price"
                        name="min"
                        value={filters.min}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="buy-max-price"
                    className="form-label text-slate-900 dark:text-white font-medium"
                  >
                    Max Price :
                  </label>
                  <div className="filter-search-form relative mt-2 px-2 py-3">
                    {/* <Unicons.UilUsdCircle className="icons" width={18} />
                    <Select
                      className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                      options={maxPrice}
                    /> */}
                    <FormControl size="small" fullWidth>
                      <OutlinedInput
                        type="number"
                        placeholder="Max Price"
                        name="max"
                        value={filters.max}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </div>
                </div>

                <div className="lg:mt-6">
                  <input
                    id="search-buy"
                    name="search"
                    className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-12 rounded"
                    value="Search"
                    onClick={handleSearch}
                  />
                </div>
              </div>
            </div>

            <hr />
          </form>
        </div>
      </div>

      <div className="mb-40">
        <section>
          <Grid container className="container">
            {brokers &&
              brokers.length > 0 &&
              brokers?.map((element) => (
                <Grid key={element._id} item xs={12} sm={6} md={4}>
                  <BrokerCard
                    name={element.name}
                    imgSrc={element.imageUrl}
                    interests={element.interests}
                    ratings={calculateRating(element.reviewsAsBorker)}
                    dealsInProgress={element.dealsInProgress}
                    successfulDeals={element.successfulDeals}
                  />
                </Grid>
              ))}
          </Grid>
        </section>
      </div>

      <Footer />
    </div>
  );
}
