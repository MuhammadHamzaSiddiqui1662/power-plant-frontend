"use client"; // This is a client component 👈🏽
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Unicons from "@iconscout/react-unicons"

export default function Pagination({gridClass,itemsPerPage, items}) {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (event) => {
        const newPage = Number(event.target.value);
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = items.slice(startIndex, endIndex);

    const numPages = Math.ceil(items.length / itemsPerPage);
    const pageButtons = Array.from({ length: numPages }, (_, i) => i + 1).map(
        (pageNum) => (
            <button
                className={`${currentPage === pageNum ? "active" : ""} w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 hover:text-white bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600 `} 
                key={pageNum}
                value={pageNum}
                onClick={handlePageClick}
                disabled={currentPage === pageNum}
            >
                {pageNum}
            </button>
        )
    );

   

    return (
        <>
          <div className={gridClass}>
                {currentItems.map((item, index) => (
                    <div key={index} className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
                        <div className="relative">
                            <Image src={item.image} alt="" width={0} height={0} sizes='100vw' style={{width:"100%", height:"auto"}}/>

                            <div className="absolute top-4 end-4">
                                <Link href="#" className="btn btn-icon bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-full text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"><i className="mdi mdi-heart mdi-18px"></i></Link>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="pb-6">
                                <Link href={`/property-detail/${item.id}`} className="text-lg hover:text-green-600 font-medium ease-in-out duration-500">{item.name}</Link>
                            </div>

                            <ul className="py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none">
                                <li className="flex items-center me-4">
                                    <Unicons.UilCompressArrows width={20}  className="me-2 text-green-600"/>
                                    <span>{item.square}sqf</span>
                                </li>

                                <li className="flex items-center me-4">
                                    <Unicons.UilBedDouble width={20}  className="me-2 text-green-600"/>
                                    <span>{item.beds} Beds</span>
                                </li>

                                <li className="flex items-center">
                                    <Unicons.UilBath width={20}  className="me-2 text-green-600"/>
                                    <span>{item.baths} Baths</span>
                                </li>
                            </ul>

                            <ul className="pt-6 flex justify-between items-center list-none">
                                <li>
                                    <span className="text-slate-400">Price</span>
                                    <p className="text-lg font-medium">${item.price}</p>
                                </li>

                                <li>
                                    <span className="text-slate-400">Rating</span>
                                    <ul className="text-lg font-medium text-amber-400 list-none">
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1"><i className="mdi mdi-star"></i></li>
                                        <li className="inline ms-1 text-black dark:text-white">{item.rating}(30)</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
          </div>
          <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                <div className="md:col-span-12 text-center">
                    <nav>
                        <ul className="inline-flex items-center -space-x-px pagination-active">
                            <li><Link href="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"><Unicons.UilAngleLeft width={18}/></Link></li>
                            <li>
                                {pageButtons}
                            </li>
                            <li><Link href="#" className="w-10 h-10 inline-flex justify-center items-center mx-1 rounded-full text-slate-400 bg-white dark:bg-slate-900 hover:text-white shadow-sm dark:shadow-gray-700 hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"><Unicons.UilAngleRight width={18}/></Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );

}

