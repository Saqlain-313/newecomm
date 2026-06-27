import React from 'react'
import { ShoesBagImage } from '../store/ShoeBagImage'
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { MdCurrencyRupee } from "react-icons/md";
import image1 from '../assets/banner44/rr.jpg'

const NewImage = () => {

    const navigate = useNavigate();

    const ProductCard = ({ item }) => (
        <div
            key={item.id}
            className='group relative overflow-hidden shadow-md rounded-md'
        >

            {/* Image Section */}
            <div className='relative overflow-hidden bg-white'>

                <img
                    src={item.image}
                    alt={item.description}
                    onClick={() => navigate(`/product/${item.id}`)}
                    className='w-full h-[250px] object-center transition-transform duration-500 group-hover:scale-110 cursor-pointer'
                />

                <div className='absolute top-4 right-[-50px] flex flex-col gap-3 transition-all duration-500 group-hover:right-4'>

                    <div className='bg-white p-2 rounded-full shadow cursor-pointer'>
                        <FaRegHeart />
                    </div>

                    <div className='bg-white p-2 rounded-full shadow cursor-pointer'>
                        <FiEye />
                    </div>

                </div>

            </div>

            {/* Content Section */}
            <div className='p-4 flex flex-col'>

            <h1 className='text-md font-bold tracking-wide line-clamp-1'>
                {item.heading}
            </h1>

                <h2 className='text-gray-800 text-md tracking-wide line-clamp-1'>
                    {item.description}
                </h2>

                <h3 className='text-sm'>
                    {item.chat}
                </h3>

                <p className='text-[#0D530E] text-xl font-semibold'>
                    {item.discount}
                </p>

                <div className='flex items-center gap-2'>

                    <p className='text-red-600 font-semibold line-through text-lg flex items-center'>
                        <MdCurrencyRupee />
                        {item.oldprice}
                    </p>

                    <p className='font-semibold text-xl text-blue-700 flex items-center'>
                        <MdCurrencyRupee />
                        {item.price}
                    </p>

                </div>

                <p className='text-sm text-gray-500'>
                    {item.comment}
                </p>

                {/* Sizes */}
                <div className='pt-2'>
                    <ul className='flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500'>

                        <li className='bg-slate-200 rounded-full px-3 py-[6px] cursor-pointer hover:bg-black hover:text-white'>
                            S
                        </li>

                        <li className='bg-slate-200 rounded-full px-3 py-[6px] cursor-pointer hover:bg-black hover:text-white'>
                            M
                        </li>

                        <li className='bg-slate-200 rounded-full px-3 py-[6px] cursor-pointer hover:bg-black hover:text-white'>
                            L
                        </li>

                        <li className='bg-slate-200 rounded-full px-3 py-[6px] cursor-pointer hover:bg-black hover:text-white'>
                            XL
                        </li>

                    </ul>
                </div>

            </div>

        </div>
    )

    return (

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-2 lg:p-4 bg-[#FBF5DD]'>

            {/* First 6 Products */}
            {
                ShoesBagImage.slice(0, 8).map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))
            }

            {/* Banner */}
            <div className='col-span-1 sm:col-span-2 lg:col-span-4 overflow-hidden rounded-md bg-white'>

                <img
                    src={image1}
                    alt='banner'
                    className='w-full h-[300px] object-cover object-center'
                />

            </div>

            {/* Remaining Products */}
            {
                ShoesBagImage.slice(4).map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))
            }

        </div>
    )
}

export default NewImage