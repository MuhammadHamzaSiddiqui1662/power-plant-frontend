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
import ButtonContained from "../../components/ButtonContained/ButtonContained";

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

  const handleSearch = (e) => {
    e.preventDefault();
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
          <form
            className="py-6 lg:px-24 bg-white dark:bg-slate-900"
            onSubmit={handleSearch}
          >
            <div className="registration-form text-dark text-start pb-8">
              <div className="flex lg:gap-0 gap-6">
                <div className="flex-auto w-100">
                  <label
                    htmlFor="buy-properties"
                    className="form-label text-slate-900 dark:text-white font-medium"
                  >
                    Select Categories:
                  </label>
                  <div className="filter-search-form relative mt-2 px-2 py-3 flex gap-2">
                    <CategorySelect
                      categories={filters.categories}
                      onChange={handleCategoryChange}
                      fullWidth={true}
                    />
                    <ButtonContained type="submit" size="small">
                      Search
                    </ButtonContained>
                  </div>
                </div>
              </div>
            </div>
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
                    id={element._id}
                    name={element.name}
                    imgSrc={
                      "https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ" ||
                      element.imageUrl
                    }
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
