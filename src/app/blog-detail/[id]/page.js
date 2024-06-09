"use client"; // This is a client component 👈🏽
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import * as Unicons from "@iconscout/react-unicons";

const Navbar = dynamic(() => import("../../componants/Navbar"));
const Switcher = dynamic(() => import("../../componants/Switcher"));
const Footer = dynamic(() => import("../../componants/Footer"));
import {
  GitHub,
  Gitlab,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
  Twitter,
  User,
  Mail,
  MessageCircle,
} from "react-feather";

import { blogList } from "../../componants/Data";

export default function BlogDetails(props) {
  const data = blogList.find((user) => user.id === parseInt(props.params.id));

  return (
    <>
      <Navbar navClass="navbar-white" />
      <section
        style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
        className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover"
      >
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="container">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white mb-3">
              Skills That You Can Learn In The Real Estate Market
            </h3>

            <ul className="list-none mt-6">
              <li className="inline-block text-white/50 mx-5">
                {" "}
                <span className="text-white block">Author :</span>{" "}
                <span className="block">Calvin Carlo</span>
              </li>
              <li className="inline-block text-white/50 mx-5">
                {" "}
                <span className="text-white block">Date :</span>{" "}
                <span className="block">3rd March, 2023</span>
              </li>
              <li className="inline-block text-white/50 mx-5">
                {" "}
                <span className="text-white block">Time :</span>{" "}
                <span className="block">8 Min Read</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className="relative">
        <div className="shape overflow-hidden z-1 text-white dark:text-slate-900">
          <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <section className="relative md:py-24 py-16">
        <div className="container">
          <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-[30px]">
            <div className="lg:col-span-8 md:order-1 order-2">
              <div className="relative overflow-hidden rounded-xl shadow dark:shadow-gray-800">
                <Image
                  src={data?.image}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />

                <div className="p-6">
                  <p className="text-slate-400">
                    The most well-known dummy text is the Lorem Ipsum, which is
                    said to have originated in the 16th century. Lorem Ipsum is
                    composed in a pseudo-Latin language which more or less
                    corresponds to proper Latin. It contains a series of real
                    Latin words. This ancient dummy text is also
                    incomprehensible, but it imitates the rhythm of most
                    European languages in Latin script.
                  </p>
                  <p className="text-slate-400 italic border-x-4 border-green-600 rounded-ss-xl rounded-ee-xl mt-3 p-3">
                    {" "}
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which dont
                    look even slightly believable.{" "}
                  </p>
                  <p className="text-slate-400 mt-3">
                    The advantage of its Latin origin and the relative
                    meaninglessness of Lorum Ipsum is that the text does not
                    attract attention to itself or distract the viewers
                    attention from the layout.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-md shadow dark:shadow-gray-800 mt-8">
                <h5 className="text-lg font-semibold">Leave A Comment:</h5>

                <form className="mt-8">
                  <div className="grid lg:grid-cols-12 lg:gap-6">
                    <div className="lg:col-span-6 mb-5">
                      <div className="text-left">
                        <label htmlFor="name" className="font-semibold">
                          Your Name:
                        </label>
                        <div className="form-icon relative mt-2">
                          <User className="w-4 h-4 absolute top-3 start-4" />
                          <input
                            name="name"
                            id="name"
                            type="text"
                            className="form-input ps-11"
                            placeholder="Name :"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-6 mb-5">
                      <div className="text-left">
                        <label htmlFor="email" className="font-semibold">
                          Your Email:
                        </label>
                        <div className="form-icon relative mt-2">
                          <Mail className="w-4 h-4 absolute top-3 start-4" />
                          <input
                            name="email"
                            id="email"
                            type="email"
                            className="form-input ps-11"
                            placeholder="Email :"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1">
                    <div className="mb-5">
                      <div className="text-left">
                        <label htmlFor="comments" className="font-semibold">
                          Your Comment:
                        </label>
                        <div className="form-icon relative mt-2">
                          <MessageCircle className="w-4 h-4 absolute top-3 start-4" />
                          <textarea
                            name="comments"
                            id="comments"
                            className="form-input ps-11 h-28"
                            placeholder="Message :"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    id="submit"
                    name="send"
                    className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md w-full"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-4 md:order-2 order-1">
              <div className="sticky top-20">
                <form>
                  <div>
                    <label htmlFor="searchname" className="font-medium text-lg">
                      Search Properties
                    </label>
                    <div className="relative mt-2">
                      <Unicons.UilSearch
                        className="text-lg absolute top-[8px] start-3"
                        width={18}
                      />
                      <input
                        name="search"
                        id="searchname"
                        type="text"
                        className="form-input border border-slate-100 dark:border-slate-800 ps-10"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                </form>

                <h5 className="font-medium text-lg mt-[30px]">Recent post</h5>
                <div className="flex items-center mt-4">
                  <Image
                    src="/images/property/6.jpg"
                    className="h-16 rounded-md shadow dark:shadow-gray-800"
                    alt=""
                    width={96}
                    height={64}
                  />

                  <div className="ms-3">
                    <Link href="#" className="font-medium hover:text-green-600">
                      10 Things You About Real Estate
                    </Link>
                    <p className="text-sm text-slate-400">2nd March 2023</p>
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <Image
                    src="/images/property/7.jpg"
                    className="h-16 rounded-md shadow dark:shadow-gray-800"
                    alt=""
                    width={96}
                    height={64}
                  />

                  <div className="ms-3">
                    <Link href="#" className="font-medium hover:text-green-600">
                      Why We Love Real Estate
                    </Link>
                    <p className="text-sm text-slate-400">2nd March 2023</p>
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <Image
                    src="/images/property/6.jpg"
                    className="h-16 rounded-md shadow dark:shadow-gray-800"
                    alt=""
                    width={96}
                    height={64}
                  />

                  <div className="ms-3">
                    <Link href="#" className="font-medium hover:text-green-600">
                      110 Quick Tips About Real Estate
                    </Link>
                    <p className="text-sm text-slate-400">2nd March 2023</p>
                  </div>
                </div>

                <h5 className="font-medium text-lg mt-[30px]">Social sites</h5>
                <ul className="list-none mt-4">
                  <li className="inline ms-1">
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"
                    >
                      <Facebook className="h-4 w-4"></Facebook>
                    </Link>
                  </li>
                  <li className="inline ms-1">
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"
                    >
                      <Instagram className="h-4 w-4"></Instagram>
                    </Link>
                  </li>
                  <li className="inline ms-1">
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"
                    >
                      <Twitter className="h-4 w-4"></Twitter>
                    </Link>
                  </li>
                  <li className="inline ms-1">
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"
                    >
                      <Linkedin className="h-4 w-4"></Linkedin>
                    </Link>
                  </li>
                  <li className="inline ms-1">
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"
                    >
                      <GitHub className="h-4 w-4"></GitHub>
                    </Link>
                  </li>
                  <li className="inline ms-1">
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"
                    >
                      <Youtube className="h-4 w-4"></Youtube>
                    </Link>
                  </li>
                  <li className="inline ms-1">
                    <Link
                      href="#"
                      className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"
                    >
                      <Gitlab className="h-4 w-4"></Gitlab>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Switcher />
    </>
  );
}
