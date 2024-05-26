"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { Search } from "react-feather";

const Navbar = dynamic(()=>import('../componants/Navbar'));
const Footer = dynamic(()=>import('../componants/Footer'));
const Switcher = dynamic(()=>import('../componants/Switcher'));
const About = dynamic(()=>import('../componants/About'));
const PropertyTwo = dynamic(()=>import('../componants/Property-two'));
const Client = dynamic(()=>import('../componants/Client'));
const Feature = dynamic(()=>import('../componants/Feature'));
const GetInTuch = dynamic(()=>import('../componants/Get-in-tuch'));

import ModalVideo from "react-modal-video";
import "../../../node_modules/react-modal-video/scss/modal-video.scss";

export default function IndexFive(){
    const [isOpen, setOpen] = useState(false)
    const listingData = [
        {
            image:"/images/property/residential.jpg",
            title:'Residential',
            noOfListing:46
        },
        {
            image:"/images/property/land.jpg",
            title:'Land',
            noOfListing:124
        },
        {
            image:"/images/property/commercial.jpg",
            title:'Commercial',
            noOfListing:265
        },
        {
            image:"/images/property/investment.jpg",
            title:'Industrial',
            noOfListing:452
        },
        {
            image:"/images/property/industrial.jpg",
            title:'Investment',
            noOfListing:12
        },
    ]
    return(
        <>
         <Navbar/>
         <section className="relative md:pt-44 pt-36 bg-gradient-to-b from-slate-50 dark:from-slate-800 to-transparent">
                <div className="container">
                    <div className="grid grid-cols-1">
                        <div className="text-center">
                            <h1 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">Are you ready to find your dream home</h1>
                            <p className="text-slate-400 mx-auto text-xl max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>

                            <div className="subcribe-form relative z-1 mt-8">
                                <form className="relative max-w-2xl mx-auto">
                                    <Search className="w-5 h-5 absolute top-[47%] -translate-y-1/2 start-4" />
                                    <input type="name" id="search_name" name="name" className="rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 ps-12" placeholder="City, Address, Zip :" />
                                    <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white rounded-full">Search</button>
                                </form>
                            </div>
                        </div>
                        <div className="relative -mt-[25px]">
                            <Image src="/images/bg/05.jpg" className="rounded-xl shadow-md dark:shadow-gray-700" alt="" width={0} height={0} sizes="100vw" style={{width:"100%" , height:"auto"}} priority />
                            <div className="absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center">
                                <Link href="#" onClick={() => setOpen(true)} data-type="youtube" data-id="S_CGed6E610" className="lightbox h-20 w-20 rounded-full shadow-md dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-green-600">
                                    <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative md:py-24 py-16">
                <div className="container">
                    <div className="grid grid-cols-1 pb-8">
                        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">Listing Categories</h3>

                        <p className="text-slate-400 max-w-xl">A great plateform to buy, sell and rent your properties without any agent or commisions.</p>
                    </div>

                    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 mt-8 md:gap-[30px] gap-3">
                        {listingData.map((item,index)=>{
                            return(
                                <div className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500" key={index}>
                                <Image src={item.image} alt="" width={0} height={0} sizes="100vw" style={{width:"100%", height:"auto"}} priority />
                                <div className="p-4">
                                    <Link href="#" className="text-xl font-medium hover:text-green-600">{item.title}</Link>
                                    <p className="text-slate-400 text-sm mt-1">{item.noOfListing} Listings</p>
                                </div>
                            </div>
                            )
                        })}
               
                    </div>
                </div>

                {/* Hero End */}
                <About />
                <Feature />
                <PropertyTwo />
                <Client />
               <GetInTuch/>
            </section>
            <Footer />
            <Switcher />
            <ModalVideo
                channel="youtube"
                isOpen={isOpen}
                videoId="S_CGed6E610"
                onClose={() => setOpen(false)}
            />
        </>
    )
}