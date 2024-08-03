"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import Link from "next/link";
import * as Unicons from '@iconscout/react-unicons'

const Navbar = dynamic(()=>import('../componants/Navbar'));
const Switcher = dynamic(()=>import('../componants/Switcher'));
const Footer = dynamic(()=>import('../componants/Footer'));


export default function Terms(){
    const [activeIndex, setActiveIndex] = useState(0);

    const sections = [
        {
            title: 'What is Power Plant?',
            content: 'Power Plant is a platform designed to facilitate the transparent and efficient transaction of intellectual property (IP) assets. It allows IP owners to profile their assets and connect with potential buyers or investors.'
        },
        {
            title: 'How do I create an account?',
            content: 'To create an account, click on the "Sign Up" button on our homepage, fill in the required information, and follow the instructions to verify your email address.'
        },
        {
            title: 'Are there any fees for using Power Plant?',
            content: 'While browsing and searching for IP assets is free, certain services such as publishing IP assets or hiring a broker may require a fee. Please refer to our pricing page for detailed information.'
        },
        {
            title: 'How do I contact an innovator or hire a broker?',
            content: 'Once you find an IP asset you are interested in, you can contact the innovator directly through their profile page or use our platform to hire a broker to assist you with the transaction.'
        },
        {
            title: 'How is my personal information protected?',
            content: 'We take your privacy seriously and have implemented measures to protect your personal information. Please review our Privacy Policy to learn more about how we collect, use, and protect your data.'
        },
        {
            title: 'What happens if I forget my password?',
            content: 'If you forget your password, click on the "Forgot Password" link on the login page and follow the instructions to reset your password.'
        },
        {
            title: 'Can I delete my account?',
            content: 'Yes, you can delete your account at any time by contacting our customer support. Please note that once your account is deleted, all your data will be permanently removed.'
        },
        {
            title: 'How do I report a problem or provide feedback?',
            content: 'If you encounter any issues or have suggestions for improvement, please contact our customer support team through the "Contact Us" page. We value your feedback and strive to improve our services.'
        }
    ]
    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(0);
        } else {
            setActiveIndex(index);
        }
    }
    return(
        <>
          <Navbar navClass="navbar-white" />
          <section
                style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover">
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="container">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Terms & Services</h3>
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
                                <p className="text-slate-400">Welcome to Power Plant. These Terms and Services govern your use of our website and services. By accessing or using our platform, you agree to comply with these terms. If you do not agree with any part of these terms, please do not use our services.</p>

                                <h5 className="text-xl font-medium mb-4 mt-8">Use of Services :</h5>
                                <p className="text-slate-400"><b>Eligibility:</b> You must be at least 18 years old to use our services. By using our platform, you represent and warrant that you meet this age requirement.</p>
                                <p className="text-slate-400"><b>Account Registration:</b> To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
                                <p className="text-slate-400"><b>Prohibited Activities:</b> You agree not to engage in any unlawful or harmful activities on our platform, including but not limited to, distributing malware, spamming, or infringing on the intellectual property rights of others.</p>
                                <p className="text-slate-400"><b>Intellectual Property:</b> All content on Power Plant, including text, graphics, logos, and software, is the property of Power Plant or its content suppliers and is protected by intellectual property laws. You may not use any content without our prior written consent.</p>
                                <p className="text-slate-400"><b>Payments and Fees:</b> Certain services may require payment. All fees are non-refundable unless otherwise stated. By providing payment information, you represent and warrant that you are authorized to use the payment method.</p>
                                <p className="text-slate-400"><b>Privacy:</b> Your use of our services is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information. Please review our Privacy Policy for more details.</p>
                                <p className="text-slate-400"><b>Limitation of Liability:</b> Power Plant shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services. Our total liability to you for any claim arising from your use of the services shall not exceed the amount paid by you to Power Plant for the services in question.</p>
                                <p className="text-slate-400"><b>Termination:</b> We reserve the right to terminate or suspend your account and access to our services at our sole discretion, without notice, for conduct that we believe violates these Terms and Services or is harmful to other users or our business interests.</p>
                                <p className="text-slate-400"><b>Changes to Terms:</b> We may update these Terms and Services from time to time. We will notify you of any changes by posting the new terms on our website. Your continued use of our services after any such changes constitutes your acceptance of the new Terms and Services.</p>
                                <p className="text-slate-400"><b>Governing Law:</b> These Terms and Services shall be governed by and construed in accordance with the laws, without regard to its conflict of law principles.</p>
                                <p className="text-slate-400"><b>Contact Us:</b> If you have any questions about these Terms and Services, please contact us at:
                                                                                                            ●	Email: contact@powerplant.com
                                                                                                            ●	Address: Power Plant, [Plot-4, Northwest Freeway,Suite 420,Berlin, Germany]
                                                                                                            </p>

                                {/* <h5 className="text-xl font-medium mb-4 mt-8">Restrictions :</h5>
                                <p className="text-slate-400">You are specifically restricted from all of the following :</p>
                                <ul className="list-none text-slate-400 mt-3">
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={16}  className=" text-green-600 align-middle me-2"/> <span>Digital Marketing Solutions for Tomorrow</span></li>
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={16}  className=" text-green-600 align-middle me-2"/> <span>Our Talented & Experienced Marketing Agency</span></li>
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={16}  className=" text-green-600 align-middle me-2"/> <span>Create your own skin to match your brand</span></li>
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={16}  className=" text-green-600 align-middle me-2"/> <span>Digital Marketing Solutions for Tomorrow</span></li>
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={16}  className=" text-green-600 align-middle me-2"/> <span>Our Talented & Experienced Marketing Agency</span></li>
                                    <li className="flex mt-2"><Unicons.UilArrowRight width={16}  className=" text-green-600 align-middle me-2"/> <span>Create your own skin to match your brand</span></li>
                                </ul> */}

                                <h5 className="text-xl font-medium mt-8">Users Question & Answer :</h5>

                                <div id="accordion-collapse" data-accordion="collapse" className="mt-6">
                                    {sections.map((section, index) => (
                                        <div key={index}

                                            className="relative shadow dark:shadow-gray-700 rounded-md overflow-hidden mt-4">
                                            <h2 className="text-base font-medium" id="accordion-collapse-heading-1">
                                                <button type="button" onClick={() => toggleAccordion(index)}
                                                    className={`flex justify-between items-center p-5 w-full font-medium text-left ${activeIndex === index ? 'bg-gray-50 dark:bg-slate-800 text-green-600' : ''}`}>
                                                    <span>{section.title}</span>
                                                    <svg className="w-4 h-4 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                                    </svg>
                                                </button>
                                            </h2>
                                            {activeIndex === index && (
                                                <div id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
                                                    <div className="p-5">
                                                        <p className="text-slate-400 dark:text-gray-400"> {section.content}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>


                                    ))}
                                </div>

                                <div className="mt-6">
                                    <Link href="#" className="btn bg-green-600 hover:bg-green-700 text-white rounded-md">Accept</Link>
                                    <Link href="#" className="btn bg-transparent hover:bg-green-600 border border-green-600 text-green-600 hover:text-white rounded-md ms-2">Decline</Link>
                                </div>
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