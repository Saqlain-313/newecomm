import React from 'react'
import Heading from '../component/Heading'
import Sidebar from '../component/Sidebar'
import { Coat } from '../store/Coat'
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/images/coat/banner.png'

const StylishCoat = () => {

    const navigate = useNavigate();

    return (
        <div className='bg-[#E7E1B1]'>
            <div>
                <Heading
                    title={"COATS"}
                    currentPage={"COATS"}
                    currentPath={"/sylishcoat"}
                    description="Who said staying warm can’t be stylish? Add the perfect final touch to your outfit with our collection of on-trend coats and jackets. Tie your look together with a chic longline coat or get the luxe look with a faux fur finish. Whether you’re opting for ultimate warmth with our puffer jackets or looking for a light layer with an oversized blazer, we have everything you need to face the great outdoors."
                />
            </div>
            {/* Main Layout Section */}
            <div className='flex flex-col lg:flex-row px-2 lg:px-6 gap-4 py-6'>
                {/* Left side content section */}
                <div className='w-full lg:w-[300px] shrink-0'>
                    <Sidebar />
                </div>
                {/* Right side Content Section */}
                <div className='flex-1 bg-[#FBF5DD]'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4'>
                        {
                            Coat.slice(0, 8).map((item) => (
                                <div
                                    key={item.id}
                                    className='bg-white/50 rounded-lg shadow-sm relative group'>
                                    <img
                                        src={item.image}
                                        alt='image'
                                        onClick={() => navigate(`/product/${item.id}`)}
                                        className='w-full h-[300px] object-center rounded-md cursor-pointer'
                                    />
                                    <div className='absolute top-4 right-2 flex flex-col gap-3 opacity-0
                                               group-hover:opacity-100 translate-x-10 group-hover:translate-x-0
                                               transition-all duration-500'>
                                        <button className='w-10 h-10 flex justify-center items-center rounded-full 
                                               shadow-sm bg-white text-black transition-all duration-300 '>
                                            <FaRegHeart />
                                        </button>
                                        <button className='w-10 h-10 flex justify-center items-center rounded-full 
                                               shadow-sm bg-white text-black transition-all duration-300 '>
                                            <FiEye />
                                        </button>
                                    </div>
                                    <div className='px-2'>
                                        <h1 className='text-md font-bold tracking-wide line-clamp-1'>
                                            {item.heading}
                                        </h1>
                                        <p className='text-md tracking-wide line-clamp-1'>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className='flex gap-2 px-2'>
                                        <p className='flex items-center text-lg font-semibold text-blue-700'>
                                            <MdCurrencyRupee />
                                            {item.price}
                                        </p>
                                        <p className='flex items-center line-through text-md font-semibold text-red-600  '>
                                            <MdCurrencyRupee />
                                            {item.oldprice}
                                        </p>
                                        <p className='text-[#0D530E] text-lg font-semibold'>
                                            {item.discount}
                                        </p>
                                    </div>
                                    <p className='text-gray-500 px-2'>
                                        {item.comment}
                                    </p>
                                    <div className='px-2'>

                                        <ul className='flex items-center gap-2 py-2 flex-wrap text-sm opacity-0 group-hover:opacity-100 transition-all duration-500'>

                                            {item.sizes.map((size, index) => (
                                                <li
                                                    key={index}
                                                    className='bg-slate-200 rounded-full px-2 py-[4px] cursor-pointer hover:bg-black hover:text-white'
                                                >
                                                    {size}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                        <div className='col-span-1 sm:col-span-2 lg:col-span-4 rounded-lg'>
                            <img src={image1} alt='banner'
                                className='w-full sm:h-[250px] lg:h-[300px] object-center rounded-lg'
                            />
                        </div>
                        {
                            Coat.slice(8, 16).map((item) => (
                                <div
                                    key={item.id}
                                    className='bg-white/50 rounded-lg shadow-sm relative group'>
                                    <img
                                        src={item.image}
                                        alt='image'
                                        onClick={() => navigate(`/product/${item.id}`)}
                                        className='w-full h-[300px] object-center rounded-md cursor-pointer'
                                    />
                                    <div className='absolute top-4 right-2 flex flex-col gap-3 opacity-0
                                               group-hover:opacity-100 translate-x-10 group-hover:translate-x-0
                                               transition-all duration-500'>
                                        <button className='w-10 h-10 flex justify-center items-center rounded-full 
                                               shadow-sm bg-white text-black transition-all duration-300 '>
                                            <FaRegHeart />
                                        </button>
                                        <button className='w-10 h-10 flex justify-center items-center rounded-full 
                                               shadow-sm bg-white text-black transition-all duration-300 '>
                                            <FiEye />
                                        </button>
                                    </div>
                                    <div className='px-2'>
                                        <h1 className='text-md font-bold tracking-wide line-clamp-1'>
                                            {item.heading}
                                        </h1>
                                        <p className='text-md tracking-wide line-clamp-1'>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className='flex gap-2 px-2'>
                                        <p className='flex items-center text-lg font-semibold text-blue-700'>
                                            <MdCurrencyRupee />
                                            {item.price}
                                        </p>
                                        <p className='flex items-center line-through text-md font-semibold text-red-600  '>
                                            <MdCurrencyRupee />
                                            {item.oldprice}
                                        </p>
                                        <p className='text-[#0D530E] text-lg font-semibold'>
                                            {item.discount}
                                        </p>
                                    </div>
                                    <p className='text-gray-500 px-2'>
                                        {item.comment}
                                    </p>
                                    <div className='px-2'>

                                        <ul className='flex items-center gap-2 py-2 flex-wrap text-sm opacity-0 group-hover:opacity-100 transition-all duration-500'>

                                            {item.sizes.map((size, index) => (
                                                <li
                                                    key={index}
                                                    className='bg-slate-200 rounded-full px-2 py-[4px] cursor-pointer hover:bg-black hover:text-white'
                                                >
                                                    {size}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StylishCoat