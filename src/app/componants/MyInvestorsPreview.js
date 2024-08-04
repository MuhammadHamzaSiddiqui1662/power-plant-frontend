"use client"; // This is a client component 👈🏽
import React from "react";
import { Avatar } from "@mui/material";
import { useGetMyInvestorsQuery } from "../../services/hiring/hiring";

export default function MyInvestorsPreview() {
  const { data: investors } = useGetMyInvestorsQuery();

  return (
    <div className="avatar-div">
      <div className="flex items-center justify-between avatar-text">
        <p className="mx-2 text-2xl sm:text-2xl name">Investors</p>
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
        {investors && investors.length > 0 ? (
          investors.map((investor, i) => (
            <div key={i} className="flex items-center avatar-text mt-4">
              <div className="mx-2">
                <Avatar
                  sx={{ width: 20, height: 20 }}
                  alt="Remy Sharp"
                  src="/images/client/01.jpg"
                />
              </div>
              <p className="text-base sm:text-sm md:text-lg lg:text-lg xl:text-2xl 2xl:text-2xl name">
                {investor.investor.name}
              </p>
            </div>
          ))
        ) : (
          <p className="text-base sm:text-sm md:text-lg lg:text-lg xl:text-2xl 2xl:text-2xl name mx-2">
            No one hired you yet.
          </p>
        )}
      </div>
    </div>
  );
}
