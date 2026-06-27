import React, { useState } from 'react'
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import NewImage from './NewImage';
import { CiFilter } from "react-icons/ci";


const NewRender = () => {

    const [openItems, setOpenItems] = useState(false)
    const [selectedItems, setSelectedItems] = useState(30)

    const [openFeature, setOpenFeature] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState("Featured")

    const [openFilter, setOpenFilter] = useState(false)

    const itemOptions = [20, 25, 30, 35, 40]
    const itemOrders = [
        "Featured",
        "Most Relevant",
        "Best Selling",
        "Alphabatically A to Z",
        "Alphabatically Z to A",
        "Price, low to high",
        "price, high to low",
        "Date, old to new",
        "Date, new to old"
    ]

    return (
        <>
            <div className=''>

                <div className='bg-[#FBF5DD]'>

                    <div className='py-6 lg:flex flex-row justify-between px-6 items-center hidden '>

                        <div>
                            <h1>VIEW AS</h1>
                        </div>

                        <div className='lg:flex gap-4 flex-row'>

                            {/* Items Per Page */}
                            <div className='flex items-center gap-2 relative'>

                                <h1>ITEMS PER PAGE</h1>

                                <div
                                    onClick={() => setOpenItems(!openItems)}
                                    className='w-24 h-10 px-2 border border-black bg-white/60 flex justify-between items-center cursor-pointer'
                                >
                                    <span>{selectedItems}</span>

                                    <MdOutlineKeyboardArrowUp
                                        className={`text-xl transition-transform duration-300 ${openItems ? 'rotate-180' : ''
                                            }`}
                                    />
                                </div>

                                {/* Dropdown */}
                                {
                                    openItems && (
                                        <div className='absolute top-12 right-0 w-24 border border-black bg-white shadow-md z-50'>

                                            {
                                                itemOptions.map((item) => (
                                                    <div
                                                        key={item}
                                                        onClick={() => {
                                                            setSelectedItems(item)
                                                            setOpenItems(false)
                                                        }}
                                                        className='px-3 py-2 hover:bg-gray-200 cursor-pointer'
                                                    >
                                                        {item}
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    )
                                }

                            </div>

                            {/* Sort By */}

                            <div className='flex items-center gap-2 relative'>

                                <h1>SORT BY</h1>

                                <div
                                    onClick={() => setOpenFeature(!openFeature)}
                                    className='w-48 h-10 px-2 border border-black bg-white/60 flex justify-between items-center cursor-pointer'
                                >
                                    <span>{selectedOrder}</span>

                                    <MdOutlineKeyboardArrowUp
                                        className={`text-xl transition-transform duration-300 ${openFeature ? 'rotate-180' : ''
                                            }`}
                                    />
                                </div>

                                {
                                    openFeature && (
                                        <div className='absolute top-12 right-0 w-52 border border-black bg-white shadow-md z-50'>

                                            {
                                                itemOrders.map((item) => (
                                                    <div
                                                        key={item}
                                                        onClick={() => {
                                                            setSelectedOrder(item)
                                                            setOpenFeature(false)
                                                        }}
                                                        className='px-3 py-2 hover:bg-gray-200 cursor-pointer'
                                                    >
                                                        {item}
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    )
                                }

                            </div>
                        </div>

                    </div>
                    {/* Mobile Navbar */}
                    <div className='relative'>

                        {/* MOBILE TOP BAR */}
                        <div className='flex justify-between px-4 lg:hidden pt-6'>

                            {/* FILTER */}
                            <div
                                onClick={() => setOpenFilter(true)}
                                className='flex gap-2 items-center cursor-pointer'
                            >
                                <CiFilter className='text-2xl' />
                                <span className='text-md font-semibold'>Filter</span>
                            </div>

                            <div>
                                <span className='text-md font-semibold'>View As</span>
                            </div>

                            {/* SORT */}
                            <div
                                onClick={() => setOpenFeature(!openFeature)}
                                className='flex gap-2 items-center cursor-pointer'
                            >
                                <span className='text-md font-semibold'>Sort</span>

                                <MdOutlineKeyboardArrowUp
                                    className={`text-xl transition-transform duration-300 ${openFeature ? 'rotate-180' : ''
                                        }`}
                                />
                            </div>

                        </div>

                        {/* DROPDOWN */}
                        <div
                            className={`lg:hidden absolute right-4 top-16 w-52 border border-black bg-white shadow-md z-50
        transition-all duration-300 origin-bottom
        ${openFeature
                                    ? 'opacity-100 translate-y-0 scale-100'
                                    : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                                }
        `}
                        >
                            {itemOrders.map((item) => (
                                <div
                                    key={item}
                                    onClick={() => {
                                        setSelectedOrder(item)
                                        setOpenFeature(false)
                                    }}
                                    className='px-3 py-2 hover:bg-gray-200 cursor-pointer'
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    < NewImage />
                </div>


            </div>
        </>
    )
}

export default NewRender