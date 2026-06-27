import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import image1 from '../assets/images/sidebarimg.jpg';

import { getAllCategories } from '../redux/categorySlice';
import { getAllSubCategory } from '../redux/subCategorySlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({
    setSelectedCategory,
    setSelectedSubCategory
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { categories = [] } = useSelector((state) => state.category);
    const { subCategories = [] } = useSelector((state) => state.subCategory);

    const [openCategory, setOpenCategory] = useState(null);
    const [openPrice, setOpenPrice] = useState(true);
    const [openImage, setOpenImage] = useState(true);

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllSubCategory());
    }, [dispatch]);

    return (
        <div className='hidden lg:block'>
            <div className='px-2 lg:px-8 bg-[#FBF5DD] py-6'>

                {/* ================= CATEGORIES ================= */}
                <h2 className='text-xl font-semibold border-b pb-4 mb-2'>
                    Categories
                </h2>

                {/* All Products */}
                <div
                    onClick={() => {
                        setSelectedCategory(null);
                        setSelectedSubCategory(null);
                    }}
                    className='py-3 cursor-pointer font-semibold border-b border-gray-300 hover:text-red-500'
                >
                    All Products
                </div>

                {categories.map((category, index) => (
                    <div key={category._id}>

                        {/* Category Header */}
                        <div
                            onClick={() => {
                                setOpenCategory(
                                    openCategory === index ? null : index
                                );

                                setSelectedCategory(category._id);
                                setSelectedSubCategory(null);
                            }}
                            className='flex justify-between items-center border-b border-gray-300 py-4 cursor-pointer'
                        >
                            <span>
                                {category.name}
                            </span>

                            <MdOutlineKeyboardArrowUp
                                className={`text-xl transition-all duration-300 ${openCategory === index
                                        ? 'rotate-180'
                                        : ''
                                    }`}
                            />
                        </div>

                        {/* Subcategories */}
                        {openCategory === index && (
                            <div className='pl-4 py-2'>

                                {subCategories
                                    ?.filter((sub) => {

                                        const categoryId =
                                            typeof sub.categoryId === "object"
                                                ? sub.categoryId?._id
                                                : sub.categoryId;

                                        return categoryId === category._id;
                                    })
                                    .map((sub) => (
                                        <div
                                            key={sub._id}
                                            onClick={() => {
                                                setSelectedCategory(
                                                    category._id
                                                );

                                                setSelectedSubCategory(
                                                    sub._id
                                                );
                                            }}
                                            className='py-2 cursor-pointer hover:text-red-500 transition'
                                        >
                                            {sub.name}
                                        </div>
                                    ))}
                            </div>
                        )}

                    </div>
                ))}

                {/* ================= PRICE ================= */}
                <div
                    onClick={() => setOpenPrice(!openPrice)}
                    className='flex justify-between items-center border-b border-gray-300 py-4 cursor-pointer mt-4'
                >
                    <h1 className='text-md font-semibold'>
                        Price
                    </h1>

                    <MdOutlineKeyboardArrowUp
                        className={`text-2xl transition-all duration-300 ${openPrice ? 'rotate-180' : ''
                            }`}
                    />
                </div>

                {openPrice && (
                    <>
                        <div className='pt-4 flex justify-between gap-2'>
                            <div className='w-24 h-10 bg-white flex justify-between items-center px-4'>
                                <span>₹</span>
                                <span>0</span>
                            </div>

                            <span className='flex items-center'>to</span>

                            <div className='w-24 h-10 bg-white flex justify-between items-center px-4'>
                                <span>₹</span>
                                <span>5000</span>
                            </div>
                        </div>

                        <div className='pt-4'>
                            <button className='w-full py-2 bg-black text-white font-semibold'>
                                Apply
                            </button>
                        </div>
                    </>
                )}

                {/* ================= IMAGE ================= */}
                <div className='pt-6'>
                    <div
                        onClick={() => setOpenImage(!openImage)}
                        className='flex justify-between items-center border-b border-gray-300 py-4 cursor-pointer'
                    >
                        <h1 className='text-md font-semibold'>
                            Image
                        </h1>

                        <MdOutlineKeyboardArrowUp
                            className={`text-2xl transition-all duration-300 ${openImage ? 'rotate-180' : ''
                                }`}
                        />
                    </div>

                    {openImage && (
                        <div className='pt-4'>
                            <img
                                src={image1}
                                alt='sidebar'
                                className='w-full rounded-lg'
                            />
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Sidebar;