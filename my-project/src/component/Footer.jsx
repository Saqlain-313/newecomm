import React from 'react'
import { TiSocialFacebook } from "react-icons/ti";
import { RiInstagramFill, RiTiktokFill } from "react-icons/ri";
import { PiXLogoDuotone } from "react-icons/pi";
import { FaPinterest } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import image1 from '../assets/images/pay1.svg'
import image2 from '../assets/images/pay4.svg'
import image3 from '../assets/images/pay5.svg'
import image4 from '../assets/images/pay6.svg'
import image5 from '../assets/images/pay2.svg'
import image6 from '../assets/images/pay3.svg'
import image7 from '../assets/images/pay7.svg'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Footer = () => {
     useEffect(() => {
    
            window.scrollTo(0, 0)
    
        }, [])
    return (

        <footer className='bg-[#0D530E] px-6 lg:px-20 py-10 text-white'>

            {/* NEWSLETTER SECTION */}
            <div className='flex flex-col lg:flex-row justify-between items-center gap-6 rounded-2xl py-10 px-6 lg:px-10 bg-[#d4c897]'>

                {/* LEFT CONTENT */}
                <div className='flex flex-col gap-2 text-center lg:text-left'>

                    <h1 className='text-black text-3xl font-bold'>
                        Sale Up to 20% OFF
                    </h1>

                    <p className='text-gray-800 text-lg'>
                        Join our newsletter and get exclusive offers
                    </p>

                </div>

                {/* RIGHT INPUT SECTION */}
                <div className='flex w-full lg:w-auto'>

                    <input
                        type='email'
                        placeholder='Enter your email...'
                        className='px-5 py-3 border border-black outline-none
                         w-full lg:w-[320px] text-black rounded-l-md'
                    />

                    <button className='px-6 py-3 bg-black text-white
                    hover:bg-gray-800 transition-all duration-300 rounded-r-md'>

                        Submit

                    </button>

                </div>
            </div>

            {/* FOOTER CONTENT */}
            <div className='flex flex-col  lg:flex-row  pt-10 gap-10 lg:gap-10 pb-10 '>

                {/* BRAND */}
                <div className='w-full lg:max-w-[20%] '>

                    <h1 className='text-3xl text-black font-bold'>
                       <Link to="/"> GLAMOROUS</Link>
                    </h1>

                    <p className='pt-4 text-sm leading-7 text-white/90 text-[#d4c897]'>
                        Glamorous offers trendy fashion, premium quality,
                        and exceptional shopping experiences.
                    </p>

                    <div className='pt-5 space-y-2 text-sm'>

                        <h2 className='font-semibold text-base text-[#d4c897]'>
                            Address
                        </h2>

                        <p className='text-white/80 leading-6 text-[#d4c897]'>
                            123 Fashion Street,
                            New Delhi, India
                        </p>

                    </div>

                    {/* SOCIAL ICONS */}
                    <div className='flex items-center gap-4 pt-5 text-2xl'>

                        <TiSocialFacebook className='cursor-pointer hover:text-white text-[#d4c897] transition-all duration-300' />

                        <RiInstagramFill className='cursor-pointer hover:text-white text-[#d4c897] transition-all duration-300' />

                        <PiXLogoDuotone className='cursor-pointer hover:text-white text-[#d4c897] transition-all duration-300' />

                        <FaPinterest className='cursor-pointer hover:text-white text-[#d4c897] transition-all duration-300' />

                        <RiTiktokFill className='cursor-pointer hover:text-white text-[#d4c897] transition-all duration-300' />

                    </div>

                </div>

                {/* SHOP */}
                <div>

                    <h1 className='text-lg font-bold text-[#d4c897] '>
                        SHOP
                    </h1>

                    <ul className='space-y-3 text-sm pt-4 cursor-pointer whitespace-nowrap'>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            New Arrival
                        </li>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            Collection
                        </li>

                        <li className='hover:text-white text-[#d4c897] trelative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            Best Seller
                        </li>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            <Link to='/brands'>Brands</Link>
                        </li>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            <Link to='/giftcards'>Gift Cards</Link>
                        </li>

                    </ul>

                </div>

                {/* SERVICES */}
                <div>

                    <h1 className='text-lg font-bold text-[#d4c897]'>
                        Services
                    </h1>

                    <ul className='space-y-3 text-sm pt-4 cursor-pointer whitespace-nowrap'>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            <Link to='/faq'>FAQ's</Link>
                        </li>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            <Link to='/shipping'>Shipping & Returns</Link>
                        </li>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            Track Order
                        </li>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            <Link to='/contact'>Contact Us</Link>
                        </li>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            <Link to='/delivery'>Delivery</Link>
                        </li>

                    </ul>

                </div>

                {/* COMPANY */}
                <div>

                    <h1 className='text-lg font-bold text-[#d4c897]'>
                        Company
                    </h1>

                    <ul className='space-y-3 text-sm pt-4 cursor-pointer whitespace-nowrap'>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            <Link to="/about">About</Link>
                        </li>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            <Link to="/carrer">Career</Link>
                        </li>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            <Link to='/press'>Press</Link>
                        </li>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            <Link to="/privacypolicy">Privacy Policy</Link>
                        </li>

                    </ul>

                </div>

                {/* POLICY */}
                <div>

                    <h1 className='text-lg font-bold whitespace-nowrap text-[#d4c897]'>
                        Consumer Policy
                    </h1>

                    <ul className='space-y-3 text-sm pt-4 cursor-pointer'>

                        <Link to='/return' className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            Cancellation & Return
                        </Link>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            <Link to='/termoffuse'>Terms of Use</Link>
                        </li>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                            <Link to='/security'>Security</Link>
                        </li>

                        <li className='hover:text-white text-[#d4c897] relative w-fit after:absolute
                        after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white 
                        after:transition-all after:duration-300 hover:after:w-full'>
                           <Link to='/payment'> Payment</Link>
                        </li>

                    </ul>

                </div>

                {/* CONTACT INFO */}
                <div>

                    <h1 className='text-lg font-bold text-[#d4c897]'>
                        Contact Info
                    </h1>

                    <ul className='pt-4 space-y-5 text-sm'>

                        <li className='flex items-center gap-4'>

                            <FaPhoneVolume className='text-lg text-[#d4c897]' />

                            <p className='text-[#d4c897]'>
                                +91 89402 20232
                            </p>

                        </li>

                        <li className='flex items-center gap-4 text-[#d4c897]'>

                            <IoMailSharp className='text-lg' />

                            <p className='text-[#d4c897]'>
                                glamorous@gmail.com
                            </p>

                        </li>

                        <li className='flex items-start gap-4'>

                            <GrLocation className='text-lg mt-1 text-[#d4c897]' />

                            <p className='max-w-[220px] leading-6 text-[#d4c897]'>
                                123 Fashion Street,
                                New Delhi, India
                            </p>

                        </li>

                    </ul>

                </div>

            </div>

            {/* DIVIDER */}
            <div className='border-t border-white/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/70'>

                <p>
                    All Rights Reserved.
                </p>

                <p>© 2026 GLAMOROUS.</p>

                <div className='flex gap-2 flex-wrap justify-center items-center'>
                    <img src={image1} alt='pay' />
                    <img src={image2} alt='pay' />
                    <img src={image3} alt='pay' />
                    <img src={image1} alt='pay' />
                    <img src={image4} alt='pay' />
                    <img src={image5} alt='pay' />
                    <img src={image6} alt='pay' />
                </div>

            </div>

        </footer>
    )
}

export default Footer