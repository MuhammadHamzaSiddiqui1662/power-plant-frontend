"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Link from "next/link";
import * as Unicons from '@iconscout/react-unicons'

const Navbar = dynamic(()=>import('../componants/Navbar'));
const Switcher = dynamic(()=>import('../componants/Switcher'));
const Footer = dynamic(()=>import('../componants/Footer'));


export default function Privacy(){
    return(
        <>
          <Navbar navClass="navbar-white" />
          <section
                style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover">
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="container">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Privacy & Policy</h3>
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
            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <div className="md:flex justify-center">
                        <div className="md:w-3/4">
                        <div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                                <h5 className="text-xl font-medium mb-4">Introduction :</h5>
                                <p className="text-slate-400">Welcome to Power Plant. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information when you use our website and services.</p>
                               
                                <h5 className="text-xl font-medium mb-4 mt-8">Information We Collect :</h5>
                                <ul className="list-unstyled text-slate-400 mt-4">
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/><b>Personal Information:</b> When you register on our platform, we collect personal information such as your name, email address, phone number, and company details.</li>
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/><b>Usage Data:</b> We collect information on how you access and use the platform, including your IP address, browser type, and pages visited.</li>
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/><b>Cookies and Tracking Technologies:</b> We use cookies and similar tracking technologies to monitor activity on our website and store certain information.</li>
                                </ul>

                                <h5 className="text-xl font-medium mb-4 mt-8">How We Use Your Information :</h5>
                                <ul className="list-unstyled text-slate-400 mt-4">
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/><b>To Provide and Maintain Our Service: </b> We use your information to deliver and improve our services, manage your account, and provide customer support.</li>
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/><b>To Communicate with You: </b> We may use your personal information to contact you with newsletters, marketing or promotional materials, and other information that may be of interest to you.</li>
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/><b>To Improve Our Services: </b>  Usage data helps us understand how users interact with our platform, enabling us to enhance user experience and develop new features.</li>
                                </ul>

                                <h5 className="text-xl font-medium mb-4 mt-8">Sharing Your Information :</h5>
                                <ul className="list-unstyled text-slate-400 mt-4">
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/><b>With Service Providers: </b> We may share your personal information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, and email delivery.</li>
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/><b>For Legal Reasons:  </b> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/><b>Business Transfers:  </b> If Power Plant is involved in a merger, acquisition, or asset sale, your personal information may be transferred as part of that transaction.</li>
                                </ul>

                                <h5 className="text-xl font-medium mb-4">Data Security :</h5>
                                <p className="text-slate-400">We take appropriate measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
                               
                                <h5 className="text-xl font-medium mb-4 mt-8">Your Data Protection Rights :</h5>
                                <ul className="list-unstyled text-slate-400 mt-4">
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/><b>Access and Update: </b> You have the right to access and update your personal information at any time through your account settings.</li>
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/><b>Deletion: </b> You can request the deletion of your personal information, subject to certain legal obligations.</li>
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/><b>Objection: </b> You have the right to object to the processing of your personal information under certain circumstances.</li>
                                </ul>


                                <h5 className="text-xl font-medium mb-4 mt-8">Third-Party Links :</h5>
                                <ul className="list-unstyled text-slate-400 mt-4">
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/> Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of these external sites.</li>
                                </ul>


                                <h5 className="text-xl font-medium mb-4 mt-8">Changes to This Privacy Policy :</h5>
                                <ul className="list-unstyled text-slate-400 mt-4">
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes.</li>
                                </ul>

                                <h5 className="text-xl font-medium mb-4 mt-8">Contact Us :</h5>
                                <ul className="list-unstyled text-slate-400 mt-4">
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/>If you have any questions about this Privacy Policy, please contact us at:
                                                                                                                                                    ●	Email: contact@powerplant.com
                                                                                                                                                    ●	Address: Power Plant, Plot-4, Northwest Freeway, Suite 420, Berlin, Germany
                                    </li>
                                </ul>
                                

                                <h5 className="text-xl font-medium mb-4 mt-8">Consent :</h5>
                                <ul className="list-unstyled text-slate-400 mt-4">
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={18} className="text-green-600 align-middle me-2"/>By using our website and services, you consent to the terms of this Privacy Policy.
                                                Thank you for trusting Power Plant with your personal information. We are committed to safeguarding your privacy and ensuring the security of your data.
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
    )
}