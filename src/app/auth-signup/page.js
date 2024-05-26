import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";

const Switcher = dynamic(() => import("../componants/Switcher"));
export default function Login() {
  return (
    <>
      <Navbar />
      <section className="my-28">
        {/* <div
                    style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                    className="absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover">
                </div> */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-2"></div> */}
        <div className="container z-3">
          <div className="flex justify-center">
            <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 rounded-md">
              <Link href="/">
                <Image
                  src="/images/pp-logo.png"
                  className="mx-auto mb-8"
                  alt=""
                  width={100}
                  height={100}
                />
              </Link>
              <h5 className="my-6 text-4xl text-center">Signup</h5>
              <form className="ltr:text-left rtl:text-right">
                <div className="grid grid-cols-1">
                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="RegisterName">
                      Your Name:
                    </label>
                    <input
                      id="RegisterName"
                      type="text"
                      className="form-input mt-3"
                      placeholder="Harry"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginEmail">
                      Email Address:
                    </label>
                    <input
                      id="LoginEmail"
                      type="email"
                      className="form-input mt-3"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginPassword">
                      Password:
                    </label>
                    <input
                      id="LoginPassword"
                      type="password"
                      className="form-input mt-3"
                      placeholder="Password:"
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center w-full mb-0">
                      <input
                        className="form-checkbox text-green-600 rounded w-4 h-4 me-2 border border-inherit"
                        type="checkbox"
                        value=""
                        id="AcceptT&C"
                      />
                      <label
                        className="form-check-label text-slate-400"
                        htmlFor="AcceptT&C"
                      >
                        I Accept{" "}
                        <Link href="#" className="text-green-600">
                          Terms And Condition
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Link
                      href="#"
                      className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full"
                    >
                      Register
                    </Link>
                  </div>

                  <div className="text-center">
                    <span className="text-slate-400 me-2">
                      Already have an account ?{" "}
                    </span>{" "}
                    <Link
                      href="/auth-login"
                      className="text-black dark:text-white font-bold"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Switcher />
    </>
  );
}
