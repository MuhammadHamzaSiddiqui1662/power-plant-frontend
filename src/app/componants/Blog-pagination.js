"use client"; // This is a client component 👈🏽
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Unicons from "@iconscout/react-unicons"

export default function BlogsPagination({gridClass,itemsPerPage, items}) {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (event) => {
        const newPage = Number(event.target.value);
        setCurrentPage(newPage);
        window.scrollTo(0, 0);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = items.slice(startIndex, endIndex);
    console.log('currentpage',currentPage);

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
                            <div key={index} className="group relative h-fit hover:-mt-[5px] overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow dark:shadow-gray-700 transition-all duration-500">
                                <div className="relative overflow-hidden">
                                    <Image src={item.image} className="" alt="" width={0} height={0} sizes="100vw" style={{width:"100%", height:"auto"}} />
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

