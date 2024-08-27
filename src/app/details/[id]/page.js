"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Box, Chip, Grid, Rating, Tab, Tabs } from "@mui/material";
import PropTypes from "prop-types";
import { setCurrentIp } from "../../../lib/features/ipSlice";
import { useGetIpQuery } from "../../../services/ip/ip";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useCreateChatMutation } from "../../../services/chat/chat";
import { getChatObject } from "../../../utils";
import { UserType } from "../../../types/user";
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
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, userType, accessToken } = useSelector((state) => state.auth);
  const { currentIp } = useSelector((state) => state.ip);
  const [value, setValue] = useState(0);
  const { data: ipDetails, isLoading } = useGetIpQuery(props?.params?.id);
  const innovatorsRating = useMemo(
    () =>
      ipDetails && ipDetails.userId && ipDetails.userId.reviewsAsInnovator
        ? ipDetails.userId.reviewsAsInnovator.length > 0
        : 0,
    [ipDetails]
  );
  const sections = useMemo(
    () =>
      ipDetails && ipDetails.sections
        ? [
          { title: "Abstract", content: ipDetails.abstract },
          ...ipDetails.sections,
        ]
        : [],
    [ipDetails]
  );
  const [createChat, { isLoading: isCreating }] = useCreateChatMutation();

  console.log("ipDetails", ipDetails);
  console.log("innovatorsRating", innovatorsRating);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleContact = async () => {
    try {
      let chat = {};
      getChatObject(chat, ipDetails.userId._id, UserType.Innovator);
      getChatObject(chat, user._id, userType);
      chat.ip = props.params.id;
      const { data: createChatResponse, error } = await createChat(chat);
      if (error) return setError(error.message);
      router.replace(`/chat?chatId=${createChatResponse._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!accessToken) router.replace("/auth-login");
    else if (user && !user.subscriber && props?.params?.id !== currentIp._id)
      router.replace("/payment?type=subscribe");
  }, [user, accessToken]);

  return (
    <>
      <Navbar />
      {isLoading || !ipDetails ? (
        <></>
      ) : (
        <section className="relative mt-20">
          <div className="container-fluid">
            <div className="md:flex mt-4">
              <Image
                src="/images/ip/mainImg.webp"
                alt=""
                width={0}
                height={500}
                sizes="100vw"
                style={{ width: "100%", height: 500 }}
                priority
                className="object-cover overflow-hidden"
              />
            </div>
          </div>

          <div className="container mt-10">
            <div className="md:flex ">
              <div className="lg:w-2/3 md:w-2/2 md:p-4 px-3">
                <h4 className="lg:text-[44px] md:text-[28px] sm:text-[30px] xs:text-[30px] font-bold text-customDarkBlue leading-tight">
                  {ipDetails.name}
                </h4>

                <ul className="mb-5 flex items-center list-none flex-wrap">
                  {ipDetails.categories &&
                    ipDetails.categories.length > 0 &&
                    ipDetails.categories.map((category) => (
                      <li
                        className="flex items-center mt-2 mr-4"
                        key={category}
                      >
                        <Chip
                          className="xs:text-[24px] lg:text-[16px] bg-green-500 text-customDarkBlue"
                          label={category}
                        />
                      </li>
                    ))}
                  {ipDetails.patentNumber ? (
                    <>
                      <li className="flex items-center mt-2 mr-4">
                        <Chip
                          variant="outlined"
                          className=" xs:text-[24px] lg:text-[16px] text-customGrayColor border"
                          label={`Patent# ${ipDetails.patentNumber}`}
                        />
                      </li>

                      <li className="flex items-center mt-2 mr-4">
                        <Chip
                          variant="outlined"
                          className=" xs:text-[24px] lg:text-[16px] text-customGrayColor border"
                          label={`Published On ${ipDetails.publishedDate}`}
                        />
                      </li>
                    </>
                  ) : (
                    <li className="flex items-center mt-2 mr-4">
                      <Chip
                        variant="outlined"
                        className=" xs:text-[24px] lg:text-[16px] text-customGrayColor border"
                        label={`Not Patented`}
                      />
                    </li>
                  )}
                </ul>

                <div className="mt-6">
                  <p className="text-customGrayColor ">
                    {ipDetails.description}
                  </p>
                </div>
              </div>

              <div className="lg:w-1/4 md:w-2/2 md:p-4 px-3 mt-8 md:mt-0">
                <div className="sticky top-20">
                  <div className="rounded-md border border-customDarkBlue">
                    <div className="p-6">
                      <h5 className="text-2xl font-medium">Price</h5>

                      <div className="flex justify-between items-center mt-2">
                        <span
                          className="text-4xl font-medium"
                          style={{ color: "#6BB955" }}
                        >
                          $ {ipDetails?.price}
                        </span>
                      </div>

                      <h5 className="text-2xl font-medium mt-4">
                        Innovator's Ratings
                      </h5>

                      {innovatorsRating ? (
                        <div className="flex justify-between items-center mt-2">
                          <Rating
                            name="read-only"
                            value={innovatorsRating}
                            readOnly
                            size="large"
                            precision={0.1}
                          />
                        </div>
                      ) : (
                        <p className="leading-tight mt-2">
                          No one rated this innovator yet.
                        </p>
                      )}
                    </div>
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
                    {sections.length &&
                      sections.map((section, index) => {
                        return (
                          <Tab
                            key={index}
                            sx={{
                              "&.Mui-selected": { color: "#6BB955" },
                              color: "gray",
                            }}
                            label={section.title}
                            {...a11yProps(0)}
                          />
                        );
                      })}
                  </Tabs>
                </Box>
                {sections.length &&
                  sections.map((section, index) => {
                    return (
                      <CustomTabPanel value={value} index={index}>
                        <p className="mb-5">{section.content}</p>
                      </CustomTabPanel>
                    );
                  })}
              </Box>
              {ipDetails.userId !== user._id &&
                userType !== UserType.Innovator && (
                  <>
                    <div className="mt-4 mb-8 flex justify-center">
                      <button
                        type="submit"
                        className={`mb-4 btn bg-customDarkBlue hover:bg-customDarkBlue border border-customDarkBlue border-customDarkBlue-500 text-white rounded-md w-60 text-[32px] transition duration-300`}
                        onClick={handleContact}
                      >
                        Contact
                      </button>
                    </div>
                    {userType !== 2 && (
                      <>
                        <h3 className="text-3xl text-center">
                          Not an expert, hire a broker instead.
                        </h3>
                        <div className="mt-4 mb-8 flex justify-center">
                          <Link
                            href={`/brokers`}
                            className="mb-4 btn border bg-customGreen text-white rounded-md mt-auto transition duration-300 w-60"
                            onClick={() => dispatch(setCurrentIp(ipDetails))}
                          >
                            Hire a Broker
                          </Link>
                        </div>
                      </>
                    )}
                  </>
                )}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
