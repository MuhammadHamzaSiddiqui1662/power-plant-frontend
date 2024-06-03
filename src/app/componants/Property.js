"use client"; // This is a client component 👈🏽
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { properties } from "./Data";

import * as Unicons from "@iconscout/react-unicons";

export default function Property() {
  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
        {properties.map((item, index) => (
          <div
            className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500"
            key={index}
          >
            <div className="relative">
              <Image
                src={item.image}
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                priority
              />

              <div className="absolute top-4 end-4">
                <Link
                  href="#"
                  className="btn btn-icon bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-full text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"
                >
                  <i className="mdi mdi-heart mdi-18px"></i>
                </Link>
              </div>
            </div>

            <div className="p-6">
              <div className="pb-4">
                <Link
                  href={`/details/${item.id}`}
                  className="text-lg hover:text-customGreen font-medium ease-in-out duration-500"
                >
                  {item.name}
                </Link>
              </div>
              <div style={{ height: "80px", overflow: "hidden" }}>
                <p
                  className="font-medium ease-in-out duration-500"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Strategically cultivate your garden,is harvest plants, and
                  sabotage others Strategically cultivate
                </p>
              </div>

              <ul className="pt-5 flex justify-between items-center list-none">
                <li>
                  <span className="text-slate-400">Price</span>
                  <p className="text-lg font-medium">${item.price}</p>
                </li>
                <li>
                  <span className="text-slate-400">Year of Publication</span>
                  <p className="text-lg font-medium">${item.price}</p>
                </li>
              </ul>
              <ul className="pt-6 flex justify-between items-center list-none">
                <li>
                  <span className="text-slate-400">Patent#</span>
                  <p className="text-lg font-medium">${item.price}</p>
                </li>
                <li style={{ width: "130px" }}>
                  <span className="text-slate-400">Category</span>
                  <p className="text-lg font-medium">${item.price}</p>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
