"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ModalVideo from "react-modal-video";

import "../../../node_modules/react-modal-video/scss/modal-video.scss";

export default function About() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="container lg:mt-24 mt-16">
        <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
          <div className="md:col-span-5">
            <div className="relative">
              <Image
                src="/images/about.png"
                className="rounded-xl "
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                priority
              />
              <div className="absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center">
                <Link
                  href="#"
                  onClick={() => setOpen(true)}
                  data-type="youtube"
                  data-id="S_CGed6E610"
                  className="lightbox h-20 w-20 rounded-full shadow-md dark:shadow-gyay-700 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-green-600"
                >
                  <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="lg:ms-4">
              <h4 className="mb-6 md:text-3xl text-2xl lg:leading-normal leading-normal font-semibold">
                About Power Plant
              </h4>
              <p className="text-slate-400 max-w-xl">
                Power Plant aims to make the IP transactions market more
                transparent. It allows IP owners to profile their licensing,
                sales operations and technology transfer programmes, as well as
                provide details of specific rights that they are interested in
                transacting. It then allows IP buyers to search the resulting
                library of IP assets based on industry, technology and
                transaction type. Enquire below to find out more. It then allows
                IP buyers to search the resulting library of IP assets based on
                industry, technology and transaction type. Enquire below to find
                out more.
              </p>

              <div className="mt-4">
                <Link
                  href="#"
                  className="btn bg-green-600 hover:bg-green-700 text-white rounded-md mt-3"
                >
                  Learn More{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalVideo
        isOpen={isOpen}
        channel="youtube"
        videoId="S_CGed6E610"
        onClose={() => setOpen(false)}
      />
    </>
  );
}
