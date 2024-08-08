"use client"; // This is a client component 👈🏽
import React from "react";
import { Hexagon } from "react-feather";
import * as Unicons from "@iconscout/react-unicons";
import Link from "next/link";

export default function Feature() {
  const featureData = [
    {
      title: "Search for IPs",
      description:
        "Browse a comprehensive library of intellectual property assets by industry, technology, and transaction type to find the perfect match for your needs.",
      Icon: Unicons.UilEstate,
    },
    {
      title: "Contact Innovator or Hire Broker",
      description:
        "Reach out directly to the innovator for more details or hire a professional broker to manage the transaction on your behalf.",
      Icon: Unicons.UilBag,
    },
    {
      title: "Close the Deal",
      description:
        "Finalize the transaction with clear and transparent processes, ensuring a smooth and efficient deal closure.",
      Icon: Unicons.UilKeySkeleton,
    },
  ];
  return (
    <>
      <div className="container lg:mt-24 mt-16">
        <div className="grid grid-cols-1 pb-8 text-center">
          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
            How It Works
          </h3>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
          {featureData.map((item, index) => {
            const Icon = item.Icon;
            return (
              <div
                className="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-transparent overflow-hidden text-center"
                key={index}
              >
                <div className="relative overflow-hidden text-transparent -m-3">
                  <Hexagon className="h-32 w-32 fill-green-600/5 mx-auto" />
                  <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-green-600 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                    <Icon height={36} width={36} />
                  </div>
                </div>

                <div className="mt-6">
                  <h5 className="text-xl font-medium">{item.title}</h5>
                  <p className="text-slate-400 mt-3">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="my-10 flex justify-center">
          <Link
            href="#"
            className="btn bg-customGreen hover:bg-green-700 text-white text-center rounded-md mt-3"
          >
            Read More{" "}
          </Link>
        </div> */}
      </div>
    </>
  );
}
