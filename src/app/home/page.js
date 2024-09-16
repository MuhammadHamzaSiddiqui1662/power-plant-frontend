"use client"; // This is a client component 👈🏽
import React from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../componants/Navbar"));
const Footer = dynamic(() => import("../componants/Footer"));
const Progress = dynamic(() => import("../componants/Progress"));
const Card = dynamic(() => import("../componants/Card"));
const MyIpsPreview = dynamic(() => import("../componants/MyIpsPreview"));
const MyBrokersPreview = dynamic(() =>
  import("../componants/MyBrokersPreview")
);
const MyInvestorsPreview = dynamic(() =>
  import("../componants/MyInvestorsPreview")
);

import "./style.css";
import { Avatar, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { UserType } from "../../types/user";
import { useRouter } from "next/navigation";
import { useGetAllQuery } from "../../services/ip/ip";
import Link from "next/link";

const generateFilterQuery = (interests = []) => {
  return interests.length > 0
    ? interests.reduce((prev, curr) => prev + `categories=${curr}&`, "?")
    : "";
};

export default function Welcome() {
  const router = useRouter();
  const { user, userType } = useSelector((state) => state.auth);
  const { currentInvestor } = useSelector((state) => state.hiring);
  const { data: ips } = useGetAllQuery(
    generateFilterQuery(
      userType === UserType.Broker && currentInvestor
        ? currentInvestor?.intersts
        : user?.interests
    )
  );

  return (
    <>
      <Navbar navClass="navbar-white" />
      <div className="mb-40">
        <Grid container>
          <Grid item xs={12}>
            <section className={`relative mt-32`}>
              <div className="container">
                <p className={`heading font-bold leading-none`}>Welcome!</p>
                <p className="text-customDarkBlue mt-3 mb-4 text-2xl sub-heading">
                  A great platform to buy, sell your intellectual properties{" "}
                  <br />
                  without any hassle.
                </p>
              </div>
            </section>
          </Grid>
        </Grid>

        <section>
          <Grid
            direction={{ xs: "column-reverse", sm: "row" }}
            container
            className="container"
          >
            <Grid item xs={12} sm={6} md={8}>
              <div
                className={`grid lg:grid-cols-${
                  ips && ips.length > 0 ? 3 : 1
                } md:grid-cols-1 grid-cols-1 mt-8 gap-[20px] text-start`}
              >
                {ips && ips.length > 0 ? (
                  ips.map((ip, index) => (
                    <Card
                      key={ip._id}
                      name={ip.name}
                      id={ip._id}
                      description={ip.description}
                      year={ip.publishedDate}
                      categories={ip.categories}
                      price={ip.price}
                      patentNumber={ip.patentNumber}
                      image={ip.image}
                    />
                  ))
                ) : (
                  <div>
                    <p>
                      No IPs matches{" "}
                      {userType === UserType.Broker && currentInvestor
                        ? "current investor's"
                        : "your"}{" "}
                      interest.
                    </p>
                    <p>
                      Visit{" "}
                      <Link
                        href={"/list"}
                        className="text-customGreen underline"
                      >
                        IP Listing
                      </Link>{" "}
                      page to veiw all IPs or{" "}
                      <Link
                        href={"/list"}
                        className="text-customGreen underline"
                      >
                        edit
                      </Link>{" "}
                      your interests.
                    </p>
                  </div>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Grid container>
                <Grid item xs={12}>
                  <div className="avatar-div mb-5">
                    <div className="flex items-center  avatar-text mb-14">
                      <div className="mx-2">
                        <Avatar
                          sx={{ width: 56, height: 56 }}
                          alt="Remy Sharp"
                          src="/images/client/01.jpg"
                        />
                      </div>
                      <div className="flex flex-col flex-wrap">
                        <p className="text-xl sm:text-2xl name">{user?.name}</p>
                        <p className="designation">
                          {userType == UserType.Broker
                            ? "Broker"
                            : userType == UserType.Innvestor
                            ? "Investor"
                            : "Innovator"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-customGreen text-xl sm:text-2xl ">
                        Complete your profile
                      </p>
                      <Progress value={100} />
                    </div>
                  </div>
                  {userType === UserType.Broker && currentInvestor ? (
                    <div className="avatar-div mb-5">
                      <div className="flex items-center justify-between avatar-text">
                        <p className="mx-2 text-2xl sm:text-2xl name">
                          Investor's Interest
                        </p>
                      </div>
                      <div className="mt-3">
                        {currentInvestor &&
                        currentInvestor.interests &&
                        currentInvestor.interests.length > 0 ? (
                          currentInvestor.interests?.map((elem, i) => (
                            <p key={i} className="mx-2">
                              {elem}
                            </p>
                          ))
                        ) : (
                          <p className="mx-2">No interest selected yet.</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="avatar-div mb-5">
                      <div className="flex items-center justify-between avatar-text">
                        <p className="mx-2 text-2xl sm:text-2xl name">
                          Your Interests
                        </p>
                        <div
                          className="flex flex-col cursor-pointer"
                          onClick={() => router.push("/profile")}
                        >
                          <p className="btn btn-icon bg-white dark:bg-customGreen shadow dark:shadow-gray-700 rounded-full text-slate-100 dark:text-customGreen focus:text-customGreen dark:focus:text-red-600 hover:text-customGreen dark:hover:text-customGreen">
                            <i className="mdi mdi-lead-pencil mdi-18px text-customDarkBlue"></i>
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        {user && user.interests && user.interests.length > 0 ? (
                          user.interests?.map((elem, i) => (
                            <p key={i} className="mx-2">
                              {elem}
                            </p>
                          ))
                        ) : (
                          <p className="mx-2">No interest selected yet.</p>
                        )}
                      </div>
                    </div>
                  )}
                  {userType == UserType.Innovator && <MyIpsPreview />}
                  {userType == UserType.Innvestor && <MyBrokersPreview />}
                  {userType == UserType.Broker && <MyInvestorsPreview />}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </section>
      </div>
      <Footer />
    </>
  );
}
