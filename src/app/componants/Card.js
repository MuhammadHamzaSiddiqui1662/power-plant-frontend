"use client"; // This is a client component 👈🏽
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Card({
  name,
  id,
  description,
  year,
  category,
  price,
  patentNo,
  image,
  key,
  isEdit = true,
}) {
  return (
    <>
      <div
        className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500"
        key={key}
      >
        <div className="relative">
          <Image
            src={image}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            priority
          />
          {isEdit && (
            <div className="absolute top-4 end-4">
              <Link
                href="#"
                className="btn btn-icon bg-white dark:bg-customGreen shadow dark:shadow-gray-700 rounded-full text-slate-100 dark:text-customGreen focus:text-customGreen dark:focus:text-red-600 hover:text-customGreen dark:hover:text-customGreen"
              >
                <i className="mdi mdi-lead-pencil mdi-18px text-customDarkBlue"></i>
              </Link>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="pb-4">
            <Link
              href={`/details/${id}`}
              className="text-lg hover:text-customGreen font-medium ease-in-out duration-500"
            >
              {name}
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
              {description}
            </p>
          </div>

          <ul className="pt-5 flex justify-between items-center list-none flex-wrap">
            <li>
              <span className="text-slate-400">Price</span>
              <p className="text-lg font-medium">${price}</p>
            </li>
            <li>
              <span className="text-slate-400">Year of Publication</span>
              <p className="text-lg font-medium">{year}</p>
            </li>
          </ul>
          <ul className="pt-6 flex justify-between items-center list-none flex-wrap">
            <li>
              <span className="text-slate-400">Patent#</span>
              <p className="text-lg font-medium">{patentNo}</p>
            </li>
            <li style={{ width: "130px" }}>
              <span className="text-slate-400">Category</span>
              <p className="text-lg font-medium">{category}</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
