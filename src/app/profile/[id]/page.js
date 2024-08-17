"use client";
import { Chip, Grid } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const Navbar = dynamic(() => import("../../componants/Navbar"));
const Switcher = dynamic(() => import("../../componants/Switcher"));
const Footer = dynamic(() => import("../../componants/Footer"));

import "./style.css";
import Card from "../../componants/Card";
import { useGetUserQuery } from "../../../services/user/user";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { useGetAllQuery } from "../../../services/ip/ip";
import { useCreateChatMutation } from "../../../services/chat/chat";
import { useRouter } from "next/navigation";
import { useGetMyBrokersQuery } from "../../../services/hiring/hiring";

export default function ViewProfile(props) {
  const loginUser = useSelector((state) => state.auth.user);
  const loginUserType = useSelector((state) => state.auth.userType);
  const userType =
    useSearchParams().get("userType") ||
    useSelector((state) => state.auth.userType);
  const { data: user } = useGetUserQuery(props?.params?.id);
  const { data: ips } = useGetAllQuery(`?userId=${props?.params?.id}`);
  const { data: myBrokers } = useGetMyBrokersQuery();
  const [createChat, { isLoading: isCreating }] = useCreateChatMutation();
  const router = useRouter();

  const getChatObject = (chat, _user, _type) => {
    if (_type == 0) {
      chat.innovator = _user._id;
    } else if (_type == 1) {
      chat.investor = _user._id;
    } else if (_type == 2) {
      chat.broker = _user._id;
    }
    return chat;
  };

  const createChatHandler = async () => {
    try {
      let chat = {};
      getChatObject(chat, loginUser, loginUserType);
      getChatObject(chat, user, userType);
      const { data: createChatgResponse, error } = await createChat(chat);
      if (error) return setError(error.message);
      console.log(createChatgResponse);
      router.replace(`/chat`);
    } catch (error) {
      console.log(`error --> ${error}`);
    }
  };

  const unHireHandler = async () => {};

  return (
    <>
      <Navbar />
      <Grid container className="container" spacing={3}>
        <Grid item xs={12}>
          <section className={`relative mt-40`}>
            <div className="container">
              <p className={`heading font-bold leading-none text-center mb-12`}>
                {userType == 0
                  ? "Innovator"
                  : userType == 1
                  ? "Investor"
                  : userType === 2
                  ? "Broker"
                  : ""}{" "}
                Profile
              </p>
            </div>
          </section>
        </Grid>
        <Grid item xs={4}>
          <div className="rounded-lg">
            <img width="100%" src="/images/certificate.png" />
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className="p-1">
            <p className="text-customDarkBlue text-3xl font-medium">
              {user?.name}
            </p>
            <p className="text-customGrayColor text-xl font-medium">
              {user?.interests[0]}
            </p>
            <p className="text-customGrayColor mt-2 mb-4 font-medium">
              {user?.about}
            </p>
            <p className="text-customDarkBlue text-3xl font-medium">
              Interests
            </p>

            {user && user?.interests && user?.interests.length > 0 ? (
              user?.interests.map((element, i) => (
                <Chip
                  key={i}
                  className="text-customDarkBlue me-3 mt-3 chips-blue font-normal"
                  label={element}
                />
              ))
            ) : (
              <div className="pt-2 pb-4">
                <p>No Interest added.</p>
              </div>
            )}
            {userType == 2 && (
              <>
                {" "}
                <div className="flex">
                  <p className="text-customDarkBlue text-3xl mt-7 font-medium">
                    Certificates
                  </p>
                </div>
                <Grid container className="mt-1">
                  {user && user.certificates && user.certificates.length > 0 ? (
                    user?.certificates.map((certificate) => (
                      <Grid item xs={3}>
                        <div className="p-2">
                          <img width="100%" src="/images/certificate.png" />
                        </div>
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <div className="py-2">
                        <p>No certificates uploaded.</p>
                      </div>
                    </Grid>
                  )}
                </Grid>
              </>
            )}

            <Grid container className="mt-5 mb-5">
              <Grid
                item
                xs={6}
                className="border-2 px-6 py-4 rounded-tl-lg rounded-bl-lg"
              >
                <p className="text-customDarkBlue text-2xl">
                  Successful Projects
                </p>
                <p className="text-customDarkBlue text-3xl mt-1">
                  {user?.successfulDeals || 0}
                </p>
              </Grid>
              <Grid
                item
                xs={6}
                className="border-2 border-l-0 px-6 py-4 rounded-tr-lg rounded-br-lg"
              >
                <p className="text-customDarkBlue text-2xl">
                  Projects In-Progress
                </p>
                <p className="text-customDarkBlue text-3xl mt-1">
                  {user?.dealsInProgress || 0}
                </p>
              </Grid>
              {userType == 0 && (
                <Grid item xs={12}>
                  <p className="text-customDarkBlue text-3xl font-medium mt-6">
                    Published IPs
                  </p>
                  <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-3 gap-[30px] text-start">
                    {ips && ips.length > 0 ? (
                      ips.map((item, index) => (
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
                      ))
                    ) : (
                      <div className="py-2">
                        <p>No published IPs from this user.</p>
                      </div>
                    )}
                  </div>
                </Grid>
              )}
              {userType == 2 && (
                <Grid item xs={12}>
                  <div className="flex justify-start mt-5">
                    <button
                      type="submit"
                      className="my-3 text-2xl btn bg-customGreen hover:bg-customGreen text-white rounded-md py-6 w-60 text-[32px]"
                      onClick={
                        myBrokers &&
                        myBrokers.length > 0 &&
                        myBrokers.some(
                          ({ broker }) => broker._id === props?.params?.id
                        )
                          ? unHireHandler
                          : createChatHandler
                      }
                    >
                      {myBrokers &&
                      myBrokers.length > 0 &&
                      myBrokers.some(
                        ({ broker }) => broker._id === props?.params?.id
                      )
                        ? "Un Hire"
                        : "Hire / Contact"}
                    </button>
                  </div>
                </Grid>
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
      <div className="mt-28">
        <Footer />
      </div>
      <Switcher />
    </>
  );
}
