"use client"; // This is a client component 👈🏽
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = dynamic(()=>import('../componants/Navbar'));
const Switcher = dynamic(()=>import('../componants/Switcher'));
const Footer = dynamic(()=>import('../componants/Footer'));

import * as Unicons from "@iconscout/react-unicons"

import { GitHub, Gitlab, Linkedin, Youtube, Facebook, Instagram, Twitter, User, Mail, MessageCircle } from "react-feather";

import { blogList } from '../componants/Data';
import BlogsPagination from '../componants/Blog-pagination';

export default function BlogsideBar(){
    return(
        <>
          <Navbar navClass="navbar-white" />
          <section
                style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover">
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="container">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Sell Faster Save Thousands.</h3>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <section className="relative md:py-24 py-16" >
                <div className="container">
                    <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-8 md:order-1 order-2">

                            {/* <div className="grid lg:grid-cols-2 grid-cols-1 gap-[30px]" >
                                {blogList.map((item, index) => (
                                    <div key={index} className="group relative h-fit hover:-mt-[5px] overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-gray-700 transition-all duration-500">
                                        <div className="relative overflow-hidden">
                                            <Image src={item.image} className="" alt="" width={0} height={0} sizes='100vw' style={{width:"100%", height:"auto"}} />
                                            <div className="absolute end-4 top-4">
                                                <span className="bg-green-600 text-white text-[14px] px-2.5 py-1 font-medium rounded-full h-5">{item.type}</span>
                                            </div>
                                        </div>

                                        <div className="relative p-6">
                                            <div className="">
                                                <div className="flex justify-between mb-4">
                                                    <span className="text-slate-400 text-sm flex items-center"><Unicons.UilCalender width={16} className="text-slate-900 dark:text-white me-2"/><span>{item.date}</span></span>
                                                    <span className="text-slate-400 text-sm ms-3 flex items-center"><Unicons.UilClock width={16} className="text-slate-900 dark:text-white me-2"/><span>5 min read</span></span>
                                                </div>

                                                <Link href={`/blog-detail/${item.id}`} className="title text-xl font-medium hover:text-green-600 duration-500 ease-in-out">{item.title}</Link>

                                                <div className="mt-3">
                                                     <Link href={`/blog-detail/${item.id}`} className="btn btn-link hover:text-green-600 after:bg-green-600 duration-500 ease-in-out inline-flex items-center"><span>Read More</span><Unicons.UilArrowRight width={16}/></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div> */}
                             <BlogsPagination itemsPerPage={9} items={blogList} gridClass={`grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-[30px]`} />

                        </div>
                        <div className="lg:col-span-4 md:order-2 order-1">
                            <div className="sticky top-20">
                                <form>
                                    <div>
                                        <label htmlFor="searchname" className="font-medium text-lg">Search Properties</label>
                                        <div className="relative mt-2">
                                            <i className="uil uil-search text-lg absolute top-[8px] start-3"></i>
                                            <input name="search" id="searchname" type="text" className="form-input border border-slate-100 dark:border-slate-800 ps-10" placeholder="Search" />
                                        </div>
                                    </div>
                                </form>

                                <h5 className="font-medium text-lg mt-[30px]">Recent post</h5>
                                <div className="flex items-center mt-4">
                                    <Image src="/images/property/6.jpg" className="h-16 rounded-md shadow dark:shadow-gray-800" alt="" width={96} height={56} />

                                    <div className="ms-3">
                                        <Link href="#" className="font-medium hover:text-green-600">10 Things You About Real Estate</Link>
                                        <p className="text-sm text-slate-400">2nd March 2023</p>
                                    </div>
                                </div>

                                <div className="flex items-center mt-4">
                                    <Image src="/images/property/3.jpg" className="h-16 rounded-md shadow dark:shadow-gray-800" alt="" width={96} height={56} />

                                    <div className="ms-3">
                                        <Link href="#" className="font-medium hover:text-green-600">Why We Love Real Estate</Link>
                                        <p className="text-sm text-slate-400">2nd March 2023</p>
                                    </div>
                                </div>

                                <div className="flex items-center mt-4">
                                    <Image src="/images/property/5.jpg" className="h-16 rounded-md shadow dark:shadow-gray-800" alt="" width={96} height={56} />

                                    <div className="ms-3">
                                        <Link href="#" className="font-medium hover:text-green-600">110 Quick Tips About Real Estate</Link>
                                        <p className="text-sm text-slate-400">2nd March 2023</p>
                                    </div>
                                </div>

                                <h5 className="font-medium text-lg mt-[30px]">Social sites</h5>
                                <ul className="list-none mt-4">
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><Facebook className="h-4 w-4" /> </Link></li>
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><Instagram className="h-4 w-4" /> </Link></li>
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><Twitter className="h-4 w-4" /></Link></li>
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><Linkedin className="h-4 w-4" /></Link></li>
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><GitHub className="h-4 w-4" /> </Link></li>
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><Youtube className="h-4 w-4" /></Link></li>
                                    <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-green-600 hover:text-white hover:bg-green-600"><Gitlab className="h-4 w-4" /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Switcher />
        </>
    )
}