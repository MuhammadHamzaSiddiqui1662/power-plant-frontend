"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ipDetails } from "../../componants/Data";

import { Box, Chip, Grid, Rating, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";

const Navbar = dynamic(() => import("../../componants/Navbar"));
const Switcher = dynamic(() => import("../../componants/Switcher"));
const Footer = dynamic(() => import("../../componants/Footer"));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="text-customGrayColor"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
          {/* <Typography>{children}</Typography> */}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function PropertiesDetail(props) {
  console.log(props.params);
  const property = ipDetails.find(
    (user) => user?.id === parseInt(props?.params?.id || 0)
  );
  console.log(property);
  const formattedName = property?.name.replace(/:/g, ":<br />");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Navbar />
      <section className="relative mt-20">
        <div className="container-fluid">
          <div className="md:flex mt-4">
            <Image
              src="/images/ip/ip1.png"
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </div>

        <div className="container mt-10">
          <div className="md:flex ">
            <div className="lg:w-2/3 md:w-2/2 md:p-4 px-3">
              <h4
                className="lg:text-[44px] md:text-[28px] sm:text-[30px] xs:text-[30px] font-bold text-customDarkBlue"
                dangerouslySetInnerHTML={{ __html: formattedName }}
              />

              <ul className="mb-5 flex items-center list-none flex-wrap">
                <li className="flex items-center  mt-2">
                  <Chip
                    className="xs:text-[24px] lg:text-[16px] bg-green-500 text-customDarkBlue"
                    label={property.feature}
                  />
                </li>

                <li className="flex items-center  mt-2">
                  <Chip
                    variant="outlined"
                    className=" xs:text-[24px] lg:text-[16px] text-customGrayColor border mx-4"
                    label={`Patent# ${property.patentId}`}
                  />
                </li>

                <li className="flex items-center mt-2">
                  <Chip
                    variant="outlined"
                    className=" xs:text-[24px] lg:text-[16px] text-customGrayColor border"
                    label={`Patent# ${property.publishedOn}`}
                  />
                </li>
              </ul>

              <div className="mt-6">
                <p className="text-customGrayColor ">
                  Power Plant aims to make the IP transactions market more
                  transparent. It allows IP owners to profile their licensing,
                  sales operations and technology transfer programmes, as well
                  as provide details of specific rights that they are interested
                  in transacting. It then allows IP buyers to search the
                  resulting library of IP assets based on industry, technology
                  and transaction type. Enquire below to find out more. It then
                  allows IP buyers to search the resulting library of IP assets
                  based on industry, technology and transaction type. Enquire
                  below to find out more.
                </p>
                <p className="text-customGrayColor mt-4">
                  Power Plant aims to make the IP transactions market more
                  transparent. It allows IP owners to profile their licensing,
                  sales operations and technology transfer programmes, as well
                  as provide details of specific rights that they are interested
                  in transacting. It then allows IP buyers to search the
                  resulting library of IP assets based on industry.
                </p>
              </div>
            </div>

            <div className="lg:w-1/4 md:w-2/2 md:p-4 px-3 mt-8 md:mt-0">
              <div className="sticky top-20">
                <div className="rounded-md border border-customDarkBlue">
                  <div className="p-6">
                    <h5 className="text-2xl font-medium">Price</h5>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-4xl font-medium text-green-500">
                        $ {property?.price}
                      </span>

                      {/* <span className="bg-green-600/10 text-green-600 text-sm px-2.5 py-0.75 rounded h-6">
                        For Sale
                      </span> */}
                    </div>

                    <h5 className="text-2xl font-medium mt-4">Ratings</h5>

                    <div className="flex justify-between items-center mt-2">
                      <Rating
                        name="read-only"
                        value={property.rating}
                        readOnly
                        size="large"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 mb-8 sm:hidden block">
                  <Link
                    href="#"
                    className="mb-4 btn border border-customDarkBlue text-customDarkBlue hover:text-white hover:bg-green-600 hover:border-green-500 rounded-md mt-auto transition duration-300"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="px-3 lg:w-11/12 md:w-2/2 md:p-4 my-12">
            <div className="md:flex ">
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <div>
                    <img width="100%" src="/images/ip/ip2.png" />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div>
                    <img width="100%" src="/images/ip/ip3.png" />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div>
                    <img width="100%" src="/images/ip/ip4.png" />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div>
                    <img width="100%" src="/images/ip/ip5.png" />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div>
                    <img width="100%" src="/images/ip/ip2.png" />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div>
                    <img width="100%" src="/images/ip/ip3.png" />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div>
                    <img width="100%" src="/images/ip/ip4.png" />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div>
                    <img width="100%" src="/images/ip/ip5.png" />
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <div className="px-3">
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  scrollButtons="auto"
                  TabIndicatorProps={{ style: { backgroundColor: "green" } }}
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="fullWidth"
                >
                  {property.tabName &&
                    property.tabName.length &&
                    property.tabName.map((elem, index) => {
                      return (
                        <Tab
                          sx={{
                            "&.Mui-selected": { color: "#6BB955" },
                            color: "gray",
                          }}
                          label={elem.title}
                          {...a11yProps(0)}
                        />
                      );
                    })}
                </Tabs>
              </Box>

              <CustomTabPanel value={value} index={0}>
                <p className="mb-5">
                  {" "}
                  Power Plant aims to make the IP transactions market more
                  transparent. It allows IP owners to profile their licensing,
                  sales operations and technology transfer programmes, as well
                  as provide details of specific rights that they are interested
                  in transacting. It then allows IP buyers to search the
                  resulting library of IP assets based on industry, technology
                  and transaction type. Enquire below to find out more. It then
                  allows IP buyers to search the resulting library of IP assets
                  based on industry, technology and transaction type. Enquire
                  below to find out more.
                </p>
                <p className="mb-5">
                  {" "}
                  Power Plant aims to make the IP transactions market more
                  transparent. It allows IP owners to profile their licensing,
                  sales operations and technology transfer programmes, as well
                  as provide details of specific rights that they are interested
                  in transacting. It then allows IP buyers to search the
                  resulting library of IP assets based on industry, technology
                  and transaction type. Enquire below to find out more. It then
                  allows IP buyers to search the resulting library of IP assets
                  based on industry, technology and transaction type. Enquire
                  below to find out more. Power Plant aims to make the IP
                  transactions market more transparent. It allows IP owners to
                  profile their licensing, sales operations and technology
                  transfer programmes, as well as provide details of specific
                  rights that they are interested in transacting. It then allows
                  IP buyers to search the resulting library of IP assets based
                  on industry, technology and transaction type. Enquire below to
                  find out more. It then allows IP buyers to search the
                  resulting library of IP assets based on industry, technology
                  and transaction type. Enquire below to find out more.
                </p>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                Power Plant aims to make the IP transactions market more
                transparent. It allows IP owners to profile their licensing,
                sales operations and technology transfer programmes, as well as
                provide details of specific rights that they are interested in
                transacting. It then allows IP buyers to search the resulting
                library of IP assets based on industry, technology and
                transaction type. Enquire below to find out more. It then allows
                IP buyers to search the resulting library of IP assets based on
                industry, technology and transaction type. Enquire below to find
                out more.
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Power Plant aims to make the IP transactions market more
                transparent. It allows IP owners to profile their licensing,
                sales operations and technology transfer programmes, as well as
                provide details of specific rights that they are interested in
                transacting. It then allows IP buyers to search the resulting
                library of IP assets based on industry, technology and
                transaction type. Enquire below to find out more. It then allows
                IP buyers to search the resulting library of IP assets based on
                industry, technology and transaction type. Enquire below to find
                out more.
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                Power Plant aims to make the IP transactions market more
                transparent. It allows IP owners to profile their licensing,
                sales operations and technology transfer programmes, as well as
                provide details of specific rights that they are interested in
                transacting. It then allows IP buyers to search the resulting
                library of IP assets based on industry, technology and
                transaction type. Enquire below to find out more. It then allows
                IP buyers to search the resulting library of IP assets based on
                industry, technology and transaction type. Enquire below to find
                out more.
              </CustomTabPanel>
            </Box>
            <div className="mt-4 mb-8 flex justify-center">
              <Link
                href="#"
                className="mb-4 btn border border-customDarkBlue bg-customDarkBlue text-white border-customDarkBlue-500 rounded-md mt-auto transition duration-300"
              >
                Talk to Owner/Broker
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
