import React from "react";
import dynamic from "next/dynamic";
import * as Unicons from "@iconscout/react-unicons";
import CountUp from "../../components/CountUp/CountUp";
import { Hexagon } from "react-feather";

const Navbar = dynamic(() => import("../componants/Navbar"));
const Switcher = dynamic(() => import("../componants/Switcher"));
const Footer = dynamic(() => import("../componants/Footer"));
const Feature = dynamic(() => import("../componants/Feature"));
const About = dynamic(() => import("../componants/About"));
const GetInTuch = dynamic(() => import("../componants/Get-in-tuch"));
const Team = dynamic(() => import("../componants/Team"));
const ClientTwo = dynamic(() => import("../componants/Client-two"));

export default function Aboutus() {
  const featureData = [
    {
      title: "Comprehensive IP Library",
      description:
        "Power Plant offers an extensive and diverse library of IP assets. Innovators can profile their IP, detailing specific rights and interests, while buyers can search and filter based on industry, technology, and transaction type. This robust database ensures that both parties find what they need quickly and efficiently.",
      Icon: Unicons.UilEstate,
    },
    {
      title: "Innovator Support",
      description:
        "For innovators, Power Plant provides the tools necessary to publish and patent their intellectual property. Our platform simplifies the process, allowing you to focus on what you do best—innovating. Additionally, if time is a constraint, you can hire a broker to manage the transactions on your behalf, ensuring your IP is handled with the utmost professionalism.",
      Icon: Unicons.UilBag,
    },
    {
      title: "Investor Empowerment",
      description:
        "Investors benefit from Power Plant's transparent and organized marketplace. The ability to search for IP assets with detailed filters makes the investment process more strategic and informed. Our commitment to clarity and transparency ensures that investors can make confident decisions, knowing they have all the information they need.",
      Icon: Unicons.UilKeySkeleton,
    },
  ];
  return (
    <>
      <Navbar navClass="navbar-white" />
      <section className="relative table w-full py-30 lg:py-18 md:py-16 sm:py-16 bg-no-repeat bg-center bg-cover">
        <div className="absolute inset-0 bg-customGreen"></div>
        <div className="container">
          <div className="grid grid-cols-1 text-center mt-24">
            <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-bold text-white">
              About Us
            </h3>
          </div>
        </div>
      </section>

      <section className="relative md:pb-24 pb-16">
        <About />
        <Feature />
        <div></div>

        {/* What we Offer section */}
        <div className="container lg:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              What We Offer
            </h3>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            {featureData.map((item, index) => {
              const Icon = item.Icon;
              return (
                <div
                  className="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-transparent overflow-hidden text-center"
                  key={index}
                >
                  <div className="relative overflow-hidden text-transparent -m-3">
                    <Hexagon className="h-32 w-32 fill-green-600/5 mx-auto" />
                    <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-green-600 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                      <Icon height={36} width={36} />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h5 className="text-xl font-medium">{item.title}</h5>
                    <p className="text-slate-400 mt-3">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="my-10 flex justify-center">
          <Link
            href="#"
            className="btn bg-customGreen hover:bg-green-700 text-white text-center rounded-md mt-3"
          >
            Read More{" "}
          </Link>
        </div> */}
        </div>
        {/* What we Offer section ends */}
      </section>
      <section
        style={{ backgroundImage: "url('/images/bg/07.jpg')" }}
        className="relative py-24 bg-no-repeat bg-center bg-fixed bg-cover"
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container">
          <div className="grid lg:grid-cols-12 grid-cols-1 md:text-left text-center justify-center">
            <div className="lg:col-start-2 lg:col-span-10">
              <div className="grid md:grid-cols-3 grid-cols-1 items-center">
                <div className="counter-box text-center">
                  <h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">
                    <CountUp
                      start={1010}
                      className="counter-value"
                      end={1548}
                      duration={2.75}
                    />
                    +
                  </h1>
                  <h5 className="counter-head text-white text-lg font-medium">
                    IP's Listed
                  </h5>
                </div>

                <div className="counter-box text-center">
                  <h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">
                    <CountUp
                      start={2}
                      className="counter-value"
                      end={25}
                      duration={2.75}
                    />
                    +
                  </h1>
                  <h5 className="counter-head text-white text-lg font-medium">
                    Deals Done
                  </h5>
                </div>

                <div className="counter-box text-center">
                  <h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">
                    <CountUp
                      start={0}
                      className="counter-value"
                      end={9}
                      duration={2.75}
                    />
                    +
                  </h1>
                  <h5 className="counter-head text-white text-lg font-medium">
                    Brokers Available
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Team />
      </section>
      <section className="md:pb-24 pb-16">
        <ClientTwo />
        <GetInTuch />
      </section>

      <Footer />
    </>
  );
}
