"use client";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const TinySlider = dynamic(() => import("tiny-slider-react"), { ssr: false });

import "tiny-slider/dist/tiny-slider.css";

const settings = {
  controls: false,
  mouseDrag: true,
  loop: true,
  rewind: true,
  autoplay: true,
  autoplayButtonOutput: false,
  autoplayTimeout: 3000,
  navPosition: "bottom",
  speed: 400,
  gutter: 12,

  responsive: {
    992: {
      items: 3,
    },

    767: {
      items: 2,
    },

    320: {
      items: 1,
    },
  },
};

export default function ClientTwo() {
  const review = [
    {
      id: "1",
      profile: "/images/client/01.jpg",
      name: "Dr. Sarah Thompson",
      designation: "Biomedical Innovator",
      description:
        "Power Plant has revolutionized the way I manage and monetize my intellectual property. The platform is user-friendly, and the ability to profile my IP and make it visible to potential buyers has significantly increased my opportunities. The transparency and ease of transaction have made this my go-to platform for all IP-related activities.",
    },
    {
      id: "2",
      profile: "/images/client/02.jpg",
      name: "John Patel",
      designation: "Renewable Energy Innovator",
      description:
        'As an innovator, finding a reliable and efficient platform to publish and patent my work was crucial. Power Plant exceeded my expectations by providing a seamless experience. The added feature of hiring a broker saved me time and ensured my IP was handled professionally. I highly recommend Power Plant to fellow innovators.',
    },
    {
      id: "3",
      profile: "/images/client/03.jpg",
      name: "Emily Davis",
      designation: "Venture Capitalist",
      description:
        "Power Plant has been a game-changer for me as an investor. The ability to search for IP assets by industry, technology, and transaction type has made my investment decisions more informed and strategic. The platform's transparency and comprehensive library of IP assets have made it an indispensable tool in my investment portfolio.",
    },
    {
      id: "4",
      profile: "/images/client/04.jpg",
      name: "Michael Chen",
      designation: "Angel Investor",
      description: "The level of detail and organization on Power Plant is impressive. It has made the process of finding and investing in promising IP assets straightforward and efficient. The platform's dedication to transparency in the IP transactions market is commendable, and it has quickly become my preferred resource for IP investments.",
    },
  ];

  return (
    <>
      <div className="container lg:mt-24 mt-16">
        <div className="grid grid-cols-1 pb-8 text-center">
          <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
            What Our Client Say ?
          </h3>

        </div>

        <div className="flex justify-center relative mt-8">
          <div className="relative w-full">
            <div className="tiny-three-item">
              <TinySlider settings={settings}>
                {review.map((el, index) => (
                  <div className="tiny-slide" key={index}>
                    <div className="text-center mx-3">
                      <p className="text-lg text-slate-400 italic">
                        {" "}
                        {el.description}{" "}
                      </p>

                      <div className="text-center mt-5">
                        <ul className="text-xl font-medium text-amber-400 list-none mb-2">
                          <li className="inline ms-1">
                            <i className="mdi mdi-star"></i>
                          </li>
                          <li className="inline ms-1">
                            <i className="mdi mdi-star"></i>
                          </li>
                          <li className="inline ms-1">
                            <i className="mdi mdi-star"></i>
                          </li>
                          <li className="inline ms-1">
                            <i className="mdi mdi-star"></i>
                          </li>
                          <li className="inline ms-1">
                            <i className="mdi mdi-star"></i>
                          </li>
                        </ul>

                        <Image
                          src={el.profile}
                          className="h-14 w-14 rounded-full shadow-md dark:shadow-gray-700 mx-auto"
                          alt=""
                          width={56}
                          height={56}
                          priority
                        />
                        <h6 className="mt-2 fw-semibold">{el.name}</h6>
                        <span className="text-slate-400 text-sm">
                          {el.designation}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </TinySlider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
