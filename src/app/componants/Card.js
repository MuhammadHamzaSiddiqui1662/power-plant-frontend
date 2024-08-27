"use client"; // This is a client component 👈🏽
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Card({
  name,
  id,
  description,
  year,
  categories,
  price,
  patentNumber,
  image,
  key,
  isEdit = false,
}) {
  const { user } = useSelector((state) => state.auth);
  const currentIp = useSelector((state) => state.ip.currentIp);

  return (
    <>
      <div
        className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500"
        key={key}
      >
        <div className="relative">
          <Image
            src={"/images/ip/mainImg.webp"}
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto", maxHeight: 160 }}
            priority
          />
          {isEdit && (
            <div className="absolute top-4 end-4">
              <Link
                href={`/upload-ip?id=${id}`}
                className="btn btn-icon bg-white dark:bg-customGreen shadow dark:shadow-gray-700 rounded-full text-slate-100 dark:text-customGreen focus:text-customGreen dark:focus:text-red-600 hover:text-customGreen dark:hover:text-customGreen"
              >
                <i className="mdi mdi-lead-pencil mdi-18px text-customDarkBlue"></i>
              </Link>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="pb-3">
            <Link
              href={
                (user && user.subscriber) || id === currentIp._id
                  ? `/details/${id}`
                  : "/payment?type=subscribe"
              }
              className="text-lg hover:text-customGreen font-medium ease-in-out duration-500"
              style={{
                lineHeight: "0.5 !important",
              }}
            >
              {name}
            </Link>
          </div>
          <p
            className="text-sm ease-in-out duration-500"
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

          <ul className="pt-4 flex justify-between items-center list-none flex-wrap">
            <li>
              <span className="text-slate-400 text-sm">Price</span>
              <p className="text-md font-medium" style={{ lineHeight: 1 }}>
                ${price}
              </p>
            </li>
            {year && (
              <li>
                <span className="text-slate-400 text-sm">
                  Year of Publication
                </span>
                <p className="text-md font-medium" style={{ lineHeight: 1 }}>
                  {new Date(year).getFullYear()}
                </p>
              </li>
            )}
          </ul>
          <ul className="list-none">
            {patentNumber && (
              <li className="pt-2">
                <span className="text-slate-400 text-sm">Patent#</span>
                <p className="text-md font-medium" style={{ lineHeight: 1 }}>
                  {patentNumber}
                </p>
              </li>
            )}
            <li className="pt-3">
              <span className="text-slate-400 text-sm">Category</span>
              <p className="text-md font-medium" style={{ lineHeight: 1 }}>
                {categories?.join(", ")}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
