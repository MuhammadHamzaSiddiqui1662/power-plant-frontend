"use client"; // This is a client component 👈🏽
import dynamic from 'next/dynamic';

const Navbar = dynamic(()=>import('../componants/Navbar'));
const Switcher = dynamic(()=>import('../componants/Switcher'));
const Footer = dynamic(()=>import('../componants/Footer'));
import {blogList} from "../componants/Data"
import BlogsPagination from "../componants/Blog-pagination";


export default function Sell(){
    return(
        <>
          <Navbar navClass="navbar-white" />
          <section
                style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover">
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="container">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Blogs & News</h3>
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
            {/* <section className="relative md:py-24 py-16" >
                <div className="container">

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]" >
                        {blogList.map((item, index) => (
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
                </div>
            </section> */}
            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <BlogsPagination itemsPerPage={9} items={blogList} gridClass={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]`} />
                </div>
            </section>
            <Footer />
            <Switcher />
        </>
    )
}