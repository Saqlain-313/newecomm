import React from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardArrowRight } from "react-icons/md";

const DropdownItem = ({ item }) => {

    return (

        <li className='relative group text-md text-white cursor-pointer'>

            {/* NAVBAR TITLE */}
            <div className='font-bold'>

                {item.title}

            </div>

            {/* DROPDOWN */}
            {
                item.submenu && (

                    <div className='absolute top-full mt-3 left-0 min-w-60 bg-white shadow-lg rounded-md
                    opacity-0 invisible translate-y-3
                    group-hover:opacity-100
                    group-hover:visible
                    group-hover:translate-y-0
                    transition-all duration-300 z-50'>

                        <ul className='p-3 space-y-3 text-black'>

                            {
                                item.submenu.map((subItem, index) => (

                                    typeof subItem === "string" ? (

                                        !subItem.startsWith("Go To") && (

                                            <li
                                                key={index}
                                                className='hover:text-green-700 cursor-pointer'
                                            >

                                                {subItem}

                                            </li>

                                        )

                                    ) : subItem.submenu ? (

                                        <li
                                            key={index}
                                            className='relative group/sub'
                                        >

                                            {/* SUBMENU TITLE */}
                                            <div className='flex justify-between items-center hover:text-green-700 cursor-pointer'>

                                                {subItem.title}

                                                <MdKeyboardArrowRight className='text-xl' />

                                            </div>

                                            {/* NESTED DROPDOWN */}
                                            <div className='absolute top-0 left-full ml-1 min-w-60 bg-white shadow-lg rounded-md
                                            opacity-0 invisible translate-x-3
                                            group-hover/sub:opacity-100
                                            group-hover/sub:visible
                                            group-hover/sub:translate-x-0
                                            transition-all duration-300'>

                                                <ul className='p-3 space-y-3 text-black'>

                                                    {
                                                        subItem.submenu.map((nestedItem, nestedIndex) => (

                                                            typeof nestedItem === "string" ? (

                                                                !nestedItem.startsWith("Go To") && (

                                                                    <li
                                                                        key={nestedIndex}
                                                                        className='hover:text-green-700 cursor-pointer'
                                                                    >

                                                                        {nestedItem}

                                                                    </li>

                                                                )

                                                            ) : (

                                                                <li key={nestedIndex}>

                                                                    <Link
                                                                        to={nestedItem.path}
                                                                        className='hover:text-green-700 block'
                                                                    >

                                                                        {nestedItem.name}

                                                                    </Link>

                                                                </li>

                                                            )

                                                        ))
                                                    }

                                                </ul>

                                            </div>

                                        </li>

                                    ) : (

                                        !subItem.name.startsWith("Go To") && (

                                            <li key={index}>

                                                <Link
                                                    to={subItem.path}
                                                    className='hover:text-green-700 block'
                                                >

                                                    {subItem.name}

                                                </Link>

                                            </li>

                                        )

                                    )

                                ))
                            }

                        </ul>

                    </div>

                )
            }

        </li>

    )
}

export default DropdownItem