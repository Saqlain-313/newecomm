import React from 'react'
import { useState } from 'react'
import { getAllSubCategory } from '../redux/subCategorySlice';
import { IoBagAddOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdKeyboardArrowRight } from "react-icons/md";
import { LuCircleUserRound } from "react-icons/lu";
import { LuUserRoundPlus } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../redux/categorySlice';

const MobileNavbar = () => {

    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.category);
    const { subCategories } = useSelector((state) => state.subCategory);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getAllSubCategory());
    }, [dispatch]);

    const [openSidebar, setOpenSidebar] = useState(false)
    const [activeMenu, setActiveMenu] = useState(null)


    return (
        <div>

            {/* MOBILE NAVBAR */}
            <div className='lg:hidden flex justify-between items-center px-4 py-3 bg-[#FBF5DD]'>

                <IoReorderThreeOutline
                    onClick={() => setOpenSidebar(true)}
                    className='text-3xl cursor-pointer'
                />

                <Link
                    to="/"
                    className="text-2xl font-bold"
                    onClick={() => setOpenSidebar(false)}
                >
                    GLAMOROUS
                </Link>

                <div className='flex gap-4 text-2xl'>

                    <IoSearchOutline className='cursor-pointer' />

                    <IoBagAddOutline className='cursor-pointer' />

                </div>

            </div>

            {/* OVERLAY */}
            {
                openSidebar && (
                    <div
                        onClick={() => {
                            setOpenSidebar(false)
                            setActiveMenu(null)
                        }}
                        className='fixed inset-0 bg-black/40 z-40'
                    ></div>
                )
            }

            {/* MAIN SIDEBAR */}
            <div
                className={`fixed top-0 left-0 h-screen w-[300px] bg-white z-50 shadow-xl overflow-y-auto transition-all duration-300
                ${openSidebar ? 'translate-x-0' : '-translate-x-full'}
            `}
            >

                {/* TOP */}
                <div className='flex justify-between items-center p-5 border-b'>

                    <h1 className='text-xl font-bold'>
                        Menu
                    </h1>

                    <RxCross2
                        onClick={() => {
                            setOpenSidebar(false)
                            setActiveMenu(null)
                        
                        }}
                        className='text-2xl cursor-pointer'
                    />

                </div>

                {/* MENU */}
                <ul className="flex flex-col border-b">

                    {categories.map((category) => (

                        <li
                            key={category._id}
                            onClick={() => setActiveMenu(category)}
                            className="cursor-pointer px-6 py-4 border-b flex justify-between items-center hover:bg-gray-100"
                        >

                            <span>{category.name}</span>

                            <MdKeyboardArrowRight />

                        </li>

                    ))}

                </ul>

                {/* EXTRA MENU */}
               {!user && (
    <>
        <div className='flex gap-4 items-center border-b p-4'>
            <LuCircleUserRound className='text-2xl' />
            <h1 className='text-md'>
                <Link
                    to="/login"
                    onClick={() => setOpenSidebar(false)}
                >
                    Sign In
                </Link>
            </h1>
        </div>

        <div className='flex gap-4 items-center border-b p-4'>
            <LuUserRoundPlus className='text-2xl' />
            <h1 className='text-md'>
                <Link
                    to="/register"
                    onClick={() => setOpenSidebar(false)}
                >
                    Create an Account
                </Link>
            </h1>
        </div>
    </>
)}

                <div className='flex gap-4 items-center border-b p-4'>
                    <FaRegHeart className='text-2xl' />
                    <h1 className='text-md'>My Wish List</h1>
                </div>

            </div>

            {/* FIRST SUBMENU */}
            {
                activeMenu && (

                    <div
                        className={`fixed top-0 left-0 h-screen w-[300px] bg-white z-[60]
                        overflow-y-auto transition-all duration-300
                        ${activeMenu ? 'translate-x-0' : '-translate-x-full'}
                    `}
                    >

                        {/* TOP */}
                        <div className='flex items-center gap-4 p-5 border-b'>

                            <button
                                onClick={() => setActiveMenu(null)}
                                className='text-2xl'
                            >
                                ←
                            </button>

                            <h1 className='text-xl font-bold'>
                                {activeMenu.name}
                            </h1>

                        </div>

                        {/* SUBMENU */}
                        <ul className='p-5 space-y-4'>

                            {subCategories
                                .filter(
                                    (sub) =>
                                        (typeof sub.categoryId === "object"
                                            ? sub.categoryId._id
                                            : sub.categoryId) === activeMenu._id
                                )
                                .map((sub) => (

                                    <li
                                        key={sub._id}
                                        className="border-b pb-3"
                                    >

                                        <Link
                                            to={`/products/subcategory/${sub._id}`}
                                            onClick={() => {
                                                setOpenSidebar(false);
                                                setActiveMenu(null);
                                            }}
                                        >
                                            {sub.name}
                                        </Link>

                                    </li>

                                ))}

                        </ul>

                    </div>

                )
            }
        </div>
    )
}

export default MobileNavbar