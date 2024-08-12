"use client"; // This is a client component 👈🏽
import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as Unicons from "@iconscout/react-unicons";
import {
  MapPin,
  Mail,
  Phone,
  Dribbble,
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  ShoppingCart,
} from "react-feather";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-slate-900 dark:bg-slate-800 ">
        <div className="container">
          <div className="grid grid-cols-1">
            <div className="pt-20">
              {/* <!-- Subscribe --> */}
              <div className="w-full">
                {/* <div className="relative -top-40 bg-white dark:bg-slate-900 lg:px-8 px-6 py-10 rounded-xl shadow-lg dark:shadow-gray-700 overflow-hidden">
                  <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-[30px]">
                    <div className="ltr:md:text-left rtl:md:text-right text-center z-1">
                      <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-medium text-black dark:text-white">
                        Subscribe to Newsletter!
                      </h3>
                      <p className="text-slate-400 max-w-xl mx-auto">
                        Subscribe to get latest updates and information.
                      </p>
                    </div>

                    <div className="subcribe-form z-1">
                      <form className="relative max-w-lg md:ms-auto">
                        <input
                          type="email"
                          id="subcribe"
                          name="email"
                          className="rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-700"
                          placeholder="Enter your email :"
                        />
                        <button
                          type="submit"
                          className="btn bg-green-600 hover:bg-green-700 text-white rounded-full"
                        >
                          Subscribe
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="absolute -top-5 -start-5">
                    <Unicons.UilEnvelope
                      width={150}
                      height={150}
                      className=" text-black/5 dark:text-white/5 ltr:-rotate-45 rtl:rotate-45"
                    />
                  </div>

                  <div className="absolute -bottom-5 -end-5">
                    <Unicons.UilPen
                      width={150}
                      height={150}
                      className=" text-black/5 dark:text-white/5 rtl:-rotate-90"
                    />
                  </div>
                </div> */}

                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px] ">
                  <div className="lg:col-span-4 md:col-span-12">
                    <Link href="#" className="text-[22px] focus:outline-none">
                      <Image
                        src="/images/logo.png"
                        alt=""
                        width={98}
                        height={28}
                      />
                    </Link>
                    <p className="mt-6 text-gray-300">
                      A great platform to buy, sell your intellectual properties
                      without any hassle.
                    </p>
                  </div>

                  <div className="lg:col-span-2 md:col-span-4 my-12">
                    <h5 className="tracking-[1px] text-gray-100 font-semibold">
                      Company
                    </h5>
                    <ul className="list-none footer-list mt-6">
                      <li>
                        <Link
                          href="/aboutus"
                          className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                        >
                          <Unicons.UilAngleRight width={18} className="me-1" />{" "}
                          <span>About us</span>{" "}
                        </Link>
                      </li>
                      {/* <li class="mt-[10px]">
                        <Link
                          href="/features"
                          className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                        >
                          <Unicons.UilAngleRight width={18} className="me-1" />{" "}
                          <span>Blog</span>{" "}
                        </Link>
                      </li> */}
                      <li class="mt-[10px]">
                        <Link
                          href="https://power-plant-frontend.vercel.app/list"
                          className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                        >
                          <Unicons.UilAngleRight width={18} className="me-1" />{" "}
                          <span>IP Collection</span>{" "}
                        </Link>
                      </li>
                      <li class="mt-[10px]">
                        <Link
                          href="https://power-plant-frontend.vercel.app/auth-login"
                          className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                        >
                          <Unicons.UilAngleRight width={18} className="me-1" />{" "}
                          <span>Login</span>{" "}
                        </Link>
                      </li>
                      <li class="mt-[10px]">
                        <Link
                          href="https://power-plant-frontend.vercel.app/auth-signup"
                          className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                        >
                          <Unicons.UilAngleRight width={18} className="me-1" />{" "}
                          <span>Signup</span>{" "}
                        </Link>
                      </li>
                      {/* <li class="mt-[10px]">
                        <Link
                          href="https://power-plant-frontend.vercel.app/auth-login"
                          className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                        >
                          <Unicons.UilAngleRight width={18} className="me-1" />{" "}
                          <span>Login</span>{" "}
                        </Link>
                      </li> */}
                    </ul>
                  </div>

                  <div className="lg:col-span-3 md:col-span-4 my-12">
                    <h5 className="tracking-[1px] text-gray-100 font-semibold">
                      Usefull Links
                    </h5>
                    <ul className="list-none footer-list mt-6">
                      <li>
                        <Link
                          href="/terms"
                          className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                        >
                          <Unicons.UilAngleRight width={18} className="me-1" />{" "}
                          <span>Terms of Services</span>{" "}
                        </Link>
                      </li>
                      <li class="mt-[10px]">
                        <Link
                          href="/privacy"
                          className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                        >
                          <Unicons.UilAngleRight width={18} className="me-1" />{" "}
                          <span>Privacy Policy</span>{" "}
                        </Link>
                      </li>
                      {/* <li class="mt-[10px]">
                        <Link
                          href="/grid"
                          className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                        >
                          <Unicons.UilAngleRight width={18} className="me-1" />{" "}
                          <span>Listing</span>{" "}
                        </Link>
                      </li> */}
                      <li class="mt-[10px]">
                        <Link
                          href="/contact"
                          className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                        >
                          <Unicons.UilAngleRight width={18} className="me-1" />{" "}
                          <span> Contact</span>{" "}
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="lg:col-span-3 md:col-span-4 my-12">
                    <h5 className="tracking-[1px] text-gray-100 font-semibold">
                      Contact Details
                    </h5>
                    <div className="flex mt-6">
                      <MapPin className="w-5 h-5 text-green-600 me-3"></MapPin>
                      <div className="">
                        <h6 className="text-gray-300 mb-2">
                          Plot-4, Northwest Freeway, <br /> Suite 420,
                          <br /> Berlin, Germany
                        </h6>
                        {/* <Link
                          href="https://www.google.com/maps/search/Plot-4,+Northwest+Freeway,+Suite+420,+Berlin,+Germany/@52.5068022,13.0944055,10z?entry=ttu"
                          data-type="iframe"
                          className="text-green-600 hover:text-green-700 duration-500 ease-in-out lightbox"
                        >
                          View on Google map
                        </Link> */}
                      </div>
                    </div>

                    <div className="flex mt-6">
                      <Mail className="w-5 h-5 text-green-600 me-3"></Mail>
                      <div className="">
                        <Link
                          href="mailto:contact@powerplant.com"
                          className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out"
                        >
                          contact@powerplant.com
                        </Link>
                      </div>
                    </div>

                    <div className="flex mt-6">
                      <Phone className="w-5 h-5 text-green-600 me-3"></Phone>
                      <div className="">
                        <Link
                          href="tel:(406) 555-0120"
                          className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out"
                        >
                          (406) 555-0120
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Subscribe --> */}
            </div>
          </div>
        </div>
        <div className="py-[30px] px-0 border-t border-gray-800 dark:border-gray-700">
          <div className="container text-center">
            <div className="grid md:grid-cols-4 items-center gap-6">
              <div className="ltr:md:text-left rtl:md:text-right text-center col-span-3">
                <p className="mb-0 text-gray-300">
                  {/* ©{new Date().getFullYear()} Hously. Design & Develop with{" "} */}
                  Powerplant 2024. All Rights Reserved.
                  {/* <i className="mdi mdi-heart text-red-600"></i> by{" "}
                  <Link
                    href="https://shreethemes.in/"
                    target="_blank"
                    className="text-reset"
                  >
                    Shreethemes
                  </Link>
                  . */}
                </p>
              </div>

              <ul className="list-none ltr:md:text-left rtl:md:text-left text-center">
                <li className="inline ms-1">
                  <Link
                    href="https://www.facebook.com/shreethemes"
                    target="_blank"
                    className="btn btn-icon btn-md text-customGrayColor hover:text-green-600 border border-gray-800 dark:border-gray-700 rounded-full me-1 hover:border-green-600 dark:hover:border-green-600 hover:bg-white dark:hover:bg-green-600"
                  >
                    <Facebook className="h-4 w-4 fill-current" />
                  </Link>
                </li>
                <li className="inline ms-1">
                  <Link
                    href="https://www.instagram.com/shreethemes/"
                    target="_blank"
                    className="btn btn-icon btn-md text-gray-400 hover:text-green-600 border border-gray-800 dark:border-gray-700 rounded-full me-1 hover:border-green-600 dark:hover:border-green-600 hover:bg-white dark:hover:bg-green-600"
                  >
                    <Instagram className="h-4 w-4 fill"></Instagram>
                  </Link>
                </li>
                <li className="inline ms-1">
                  <Link
                    href="https://twitter.com/shreethemes"
                    target="_blank"
                    className="btn btn-icon btn-md text-customGrayColor hover:text-green-600 border border-gray-800 dark:border-gray-700 rounded-full me-1 hover:border-green-600 dark:hover:border-green-600 hover:bg-white dark:hover:bg-green-600"
                  >
                    <Twitter className="h-4 w-4 fill-current"></Twitter>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
