"use client"; // This is a client component 👈🏽
import React from "react";
import { useGetMyIpsQuery } from "../../services/ip/ip";
import { useRouter } from "next/navigation";
import { IpStatus } from "../../types/ip";

export default function MyIpsPreview() {
  const router = useRouter();
  const { data: ips } = useGetMyIpsQuery();

  return (
    <div className="avatar-div">
      <div className="flex items-center justify-between avatar-text">
        <p className="mx-2 text-2xl sm:text-2xl name">My IPs</p>
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
        {ips && ips.length > 0 ? (
          ips
            ?.filter((ip) => ip.status == IpStatus.Published)
            .map((ip, i) => (
              <p key={i} className="mx-2">
                - {ip.name}
              </p>
            ))
        ) : (
          <p className="mx-2">No interest selected yet.</p>
        )}
      </div>
    </div>
  );
}
