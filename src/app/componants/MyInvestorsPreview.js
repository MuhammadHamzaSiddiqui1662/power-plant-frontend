"use client"; // This is a client component 👈🏽
import React, { useMemo } from "react";
import { Avatar } from "@mui/material";
import { useGetMyInvestorsQuery } from "../../services/hiring/hiring";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function MyInvestorsPreview() {
  const router = useRouter();
  const { currentInvestor } = useSelector((state) => state.hiring);
  const { data } = useGetMyInvestorsQuery();
  const investors = useMemo(() => {
    return data?.reduce((acc, current) => {
      const x = acc.find((item) => item.investor._id === current.investor._id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
  }, [data]);

  return (
    <div className="avatar-div">
      <div className="flex items-center justify-between avatar-text">
        <p className="mx-2 text-2xl sm:text-2xl name">Investors</p>
        <div
          className="flex flex-col cursor-pointer"
          onClick={() => router.push("/investors")}
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
                  src={investor.investor.imageUrl}
                  alt={investor.investor.name}
                />
              </div>
              <p className="text-base sm:text-sm md:text-lg lg:text-lg xl:text-2xl 2xl:text-2xl name w-full">
                {investor.investor.name}
              </p>
              {currentInvestor &&
                investor.investor._id === currentInvestor._id && (
                  <p
                    className="leading-3 text-[12px] px-2 py-1 border rounded"
                    style={{
                      color: "#6BB955",
                      borderColor: "#6BB955",
                    }}
                  >
                    Current
                  </p>
                )}
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
