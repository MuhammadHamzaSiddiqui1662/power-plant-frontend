"use client"; // This is a client component 👈🏽
import dynamic from 'next/dynamic';
import Select from 'react-select'
import Link from 'next/link';
import * as Unicons from "@iconscout/react-unicons"
import { Linkedin, Facebook, Twitter, Instagram } from 'react-feather';

const Navbar = dynamic(()=>import('../componants/Navbar'));
const Switcher = dynamic(()=>import('../componants/Switcher'));
const Pagination = dynamic(()=>import('../componants/Pagination'));
import {propertiesDetails} from "../componants/Data";

const Houses = [
    { value: 'AF', label: 'Apartment' },
    { value: 'AZ', label: ' Offices' },
    { value: 'BS', label: 'Townhome' },
]
const minPrice = [
    { value: '1', label: '500' },
    { value: '2', label: '1000' },
    { value: '3', label: '2000' },
    { value: '4', label: '3000' },
    { value: '5', label: '4000' },
    { value: '5', label: '5000' },
    { value: '5', label: '6000' },
]
const maxPrice = [
    { value: '1', label: '500' },
    { value: '2', label: '1000' },
    { value: '3', label: '2000' },
    { value: '4', label: '3000' },
    { value: '5', label: '4000' },
    { value: '5', label: '5000' },
    { value: '5', label: '6000' },
]
export default function GridMap(){
    return(
        <>
        <Navbar topnavClass="bg-white dark:bg-slate-900"/>
        <section className="relative">
                <div className="container-fluid">
                    <div className="grid lg:grid-cols-2 md:grid-cols-2">
                        <div>
                            <div className="relative mt-12 md:p-8 py-8 px-3">
                                <div className="grid grid-cols-1">
                                    <form className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md dark:shadow-gray-700">
                                        <div className="registration-form text-dark text-start">
                                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                                <div>
                                                    <label className="form-label text-slate-900 dark:text-white font-medium">Search : <span className="text-red-600">*</span></label>
                                                    <div className="filter-search-form relative filter-border mt-2">
                                                        <Unicons.UilSearch className="icons" width={18}/>
                                                        <input name="name" type="text" id="job-keyword" className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" placeholder="Search your Keywords" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="buy-properties" className="form-label text-slate-900 dark:text-white font-medium">Select Categories:</label>                                                        
                                                    <div className="filter-search-form relative filter-border mt-2">
                                                        <Unicons.UilEstate className="icons" width={18}/>
                                                        <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={Houses} />

                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="buy-min-price" className="form-label text-slate-900 dark:text-white font-medium">Min Price :</label>                                                        
                                                    <div className="filter-search-form relative filter-border mt-2">
                                                        <Unicons.UilUsdCircle className="icons" width={18}/>
                                                        <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={minPrice} />

                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="buy-max-price" className="form-label text-slate-900 dark:text-white font-medium">Max Price :</label>                                                        
                                                    <div className="filter-search-form relative mt-2">
                                                        <Unicons.UilUsdCircle className="icons" width={18}/>
                                                        <Select className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0" options={maxPrice} />

                                                    </div>
                                                </div>

                                                <div className="lg:mt-6">
                                                    <input type="submit" id="search-buy" name="search" className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-12 rounded" value="Search" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <Pagination itemsPerPage={6} items={propertiesDetails} gridClass={`grid lg:grid-cols-2 grid-cols-1 mt-8 gap-[30px]`} />


                            </div>

                            <footer className="relative bg-neutral-900">
                                <div className="py-[30px] px-0">
                                    <div className="container text-center px-6">
                                        <div className="grid md:grid-cols-2 items-center gap-6">
                                            <div className="md:text-left text-center">
                                                <p className="mb-0 text-gray-300">© {(new Date().getFullYear())}{" "} Hously. Design & Develop with <i className="mdi mdi-heart text-red-600"></i> by <a rel="noreferrer" href="https://shreethemes.in/" target="_blank" className="text-reset">Shreethemes</a>.</p>
                                            </div>

                                            <ul className="list-none md:text-right text-center">
                                                <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm text-gray-400 hover:text-white border !border-gray-800 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"><Facebook className="h-4 w-4" /></Link></li>
                                                <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm text-gray-400 hover:text-white border !border-gray-800 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"><Instagram className="h-4 w-4" /></Link></li>
                                                <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm text-gray-400 hover:text-white border !border-gray-800 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"><Twitter className="h-4 w-4" /></Link></li>
                                                <li className="inline ms-1"><Link href="#" className="btn btn-icon btn-sm text-gray-400 hover:text-white border !border-gray-800 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"><Linkedin className="h-4 w-4" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </footer>

                        </div>

                        <div className="relative md:block hidden">
                            <div className="map border-0 fixed w-full leading-[0]">
                                <iframe title="grid-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin" style={{ border: 0 }} className="w-full h-screen" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Switcher />
        </>
    )
}