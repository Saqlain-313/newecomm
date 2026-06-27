import React from 'react'
import { SkirtImage } from '../store/SkirtImage';
import { useNavigate  } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";

import image1 from '../assets/images/skirt/bannerskirt.png'
import image2 from '../assets/images/skirt/bannerskirt1.png'


const KinittedSkirt = () => {
    const navigate = useNavigate();
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {
                SkirtImage.slice(0, 4).map((item) => (
                    <div key={item.id} className='rounded-lg group relative shadow-sm  bg-white/50'>
                        <img
                            src={item.image}
                            alt='cardigansimage'
                            onClick={() => navigate(`/product/${item.id}`)}
                            className='w-full h-[300px] object-cover object-center rounded-md cursor-pointer'
                        />
                        <div className='absolute top-4 right-2 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-500'>
                            <button className='w-10 h-10 rounded-full shadow-sm flex justify-center items-center
                                            bg-white text-black transition-all duration-300'>
                                <FaRegHeart />
                            </button>
                            <button className='w-10 h-10 rounded-full shadow-sm flex items-center justify-center bg-white text-black transition-all duration-300'>
                                <FiEye />
                            </button>
                        </div>
                        <div className='pt-2 px-2'>
                            <h1 className='text-md font-bold tracking-wide line-clamp-1'>
                                {item.heading}
                            </h1>
                            <p className='text-md text-gray-800 tracking-wide line-clamp-1'>
                                {item.description}
                            </p>
                        </div>
                        <div className='flex gap-2 px-2'>
                            <p className='flex items-center text-blue-700 font-semibold text-lg'>
                                <MdCurrencyRupee />
                                {item.price}
                            </p>
                            <p className='flex items-center line-through text-red-500 text-lg font-semibold'>
                                <MdCurrencyRupee />
                                {item.oldprice}
                            </p>
                            <p className='text-[#0D530E] text-lg font-semibold'>
                                {item.discount}
                            </p>
                        </div>
                        <p className='px-2 text-gray-500'>
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
            <div className='col-span-1 sm:col-span-2 lg:col-span-4 overflow-hidden rounded-lg'>
                <img src={image1} alt='banner'
                    className='w-full h-[300px] lg:h-[300px] object-center'
                />

            </div>
             {
                SkirtImage.slice(4, 8).map((item) => (
                    <div key={item.id} className='rounded-lg group relative shadow-sm  bg-white/50'>
                        <img
                            src={item.image}
                            alt='cardigansimage'
                            onClick={() => navigate(`/product/${item.id}`)}
                            className='w-full h-[300px] object-cover object-center rounded-md cursor-pointer'
                        />
                        <div className='absolute top-4 right-2 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-500'>
                            <button className='w-10 h-10 rounded-full shadow-sm flex justify-center items-center
                                            bg-white text-black transition-all duration-300'>
                                <FaRegHeart />
                            </button>
                            <button className='w-10 h-10 rounded-full shadow-sm flex items-center justify-center bg-white text-black transition-all duration-300'>
                                <FiEye />
                            </button>
                        </div>
                        <div className='pt-2 px-2'>
                            <h1 className='text-md font-bold tracking-wide line-clamp-1'>
                                {item.heading}
                            </h1>
                            <p className='text-md text-gray-800 tracking-wide line-clamp-1'>
                                {item.description}
                            </p>
                        </div>
                        <div className='flex gap-2 px-2'>
                            <p className='flex items-center text-blue-700 font-semibold text-lg'>
                                <MdCurrencyRupee />
                                {item.price}
                            </p>
                            <p className='flex items-center line-through text-red-500 text-lg font-semibold'>
                                <MdCurrencyRupee />
                                {item.oldprice}
                            </p>
                            <p className='text-[#0D530E]  text-lg font-semibold'>
                                {item.discount}
                            </p>
                        </div>
                        <p className='px-2 text-gray-500'>
                            {item.comment}
                        </p>
                        <div className='px-2'>

                            <ul className='flex items-center gap-2 py-2  flex-wrap text-sm opacity-0 group-hover:opacity-100 transition-all duration-500'>

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
             <div className='col-span-1 sm:col-span-2 lg:col-span-4 overflow-hidden rounded-lg'>
                <img src={image2} alt='banner'
                    className='w-full h-[250px] lg:h-[300px] object-center'
                />

            </div>
            {
                SkirtImage.slice(8, 12).map((item) => (
                    <div key={item.id} className='rounded-lg group relative shadow-sm bg-white/50'>
                        <img
                            src={item.image}
                            alt='cardigansimage'
                            onClick={() => navigate(`/product/${item.id}`)}
                            className='w-full h-[300px] object-cove object-center rounded-md cursor-pointer'
                        />
                        <div className='absolute top-4 right-2 flex flex-col gap-3 opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-500'>
                            <button className='w-10 h-10 rounded-full shadow-sm flex justify-center items-center
                                            bg-white text-black transition-all duration-300'>
                                <FaRegHeart />
                            </button>
                            <button className='w-10 h-10 rounded-full shadow-sm flex items-center justify-center bg-white text-black transition-all duration-300'>
                                <FiEye />
                            </button>
                        </div>

                        <div className='pt-2 px-2'>
                            <h1 className='text-md font-bold tracking-wide line-clamp-1'>
                                {item.heading}
                            </h1>
                            <p className='text-md text-gray-800 tracking-wide line-clamp-1'>
                                {item.description}
                            </p>
                        </div>
                        <div className='flex gap-2 px-2'>
                            <p className='flex items-center text-blue-700 font-semibold text-md'>
                                <MdCurrencyRupee />
                                {item.price}
                            </p>
                            <p className='flex items-center line-through text-red-500 text-md font-semibold'>
                                <MdCurrencyRupee />
                                {item.oldprice}
                            </p>
                            <p className='text-[#0D530E] text-md font-semibold'>
                                {item.discount}
                            </p>
                        </div>
                        <p className='px-2 text-gray-500'>
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
    )
}

export default KinittedSkirt