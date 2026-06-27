import React, { useEffect, useState } from 'react'
import Sidebar from '../component/Sidebar'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { getAllProduct } from '../redux/productSlice';
import { useSelector, useDispatch } from 'react-redux';

import {
    getWishlist,
    addToWishlist,
    removeWishlistByProduct
} from '../redux/wishlistSlice';
const AllProduct = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { products } = useSelector(
        (state) => state.product
    );

    const { wishlistItems = [] } = useSelector(
        (state) => state.wishlist
    );

    useEffect(() => {
         console.log("ALL PRODUCT PAGE MOUNTED");
        dispatch(getAllProduct());
        dispatch(getWishlist());
    }, [dispatch]);

    const isInWishlist = (productId) => {
        return wishlistItems.some(
            (item) => item.productId?._id === productId
        );
    };

    const filteredProducts = products.filter(
        (product) => {

            const categoryId =
                typeof product.category === "object"
                    ? product.category?._id
                    : product.category;

            const subCategoryId =
                typeof product.subCategory === "object"
                    ? product.subCategory?._id
                    : product.subCategory;

            if (
                selectedCategory &&
                categoryId !== selectedCategory
            ) {
                return false;
            }

            if (
                selectedSubCategory &&
                subCategoryId !== selectedSubCategory
            ) {
                return false;
            }

            return true;
        }
    );

    return (
        <div className='bg-[#E7E1B1]'>
            <div className='flex flex-col lg:flex-row px-2 lg:px-6 gap-4 py-6'>
                {/* Left side content section */}
                <div className='w-full lg:w-[300px] shrink-0'>
                    <Sidebar
                        setSelectedCategory={setSelectedCategory}
                        setSelectedSubCategory={setSelectedSubCategory}
                    />
                </div>
                {/* Right side Content Section */}
                <div className='flex-1 bg-[#FBF5DD]'>

                    {/* Heading */}
                    <div className='px-4 pt-4'>
                        <h2 className='text-2xl font-bold'>
                            {selectedSubCategory
                                ? "Sub Category Products"
                                : selectedCategory
                                    ? "Category Products"
                                    : "All Products"}
                        </h2>

                        {/* Product Count */}
                        <p className='text-gray-600 mt-1'>
                            {filteredProducts.length} Products Found
                        </p>
                    </div>

                    {/* Empty State */}
                    {filteredProducts.length === 0 ? (
                        <div className='flex justify-center items-center py-20'>
                            <h2 className='text-xl font-semibold text-gray-500'>
                                No Products Found
                            </h2>
                        </div>
                    ) : (

                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4'>
                            {
                                filteredProducts.map((item) => (
                                    <div
                                        key={item._id}
                                        className='bg-white/50 rounded-lg shadow-sm relative group'>
                                        <img
                                            src={item.image}
                                            alt='image'
                                            onClick={() => navigate(`/product/${item._id}`)}
                                            className='w-full  h-[300px] object-center rounded-md cursor-pointer'
                                        />
                                        <div
                                            className='absolute top-4 right-2 flex flex-col gap-3 opacity-0
             group-hover:opacity-100 translate-x-10 group-hover:translate-x-0
             transition-all duration-500'
                                        >

                                            <button
                                                onClick={async () => {

                                                    if (isInWishlist(item._id)) {

                                                        await dispatch(
                                                            removeWishlistByProduct(item._id)
                                                        );

                                                    } else {

                                                        await dispatch(
                                                            addToWishlist({
                                                                productId: item._id
                                                            })
                                                        );

                                                    }

                                                    dispatch(getWishlist()); // refresh wishlist
                                                }}
                                                className='w-10 h-10 flex justify-center items-center rounded-full
    shadow-sm bg-white text-black transition-all duration-300'
                                            >
                                                {
                                                    isInWishlist(item._id)
                                                        ? <FaHeart className='text-red-500' />
                                                        : <FaRegHeart />
                                                }
                                            </button>

                                            <button
                                                className='w-10 h-10 flex justify-center items-center rounded-full
                   shadow-sm bg-white text-black transition-all duration-300'
                                            >
                                                <FiEye />
                                            </button>

                                        </div>
                                        <div className='px-2'>
                                            <h1 className='text-md font-bold tracking-wide line-clamp-1'>
                                                {item.name}
                                            </h1>
                                            <p className='text-md tracking-wide line-clamp-1'>
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-wrap px-2 ">
                                            <span className="text-green-600 font-bold text-lg">
                                                ₹{item.price}
                                            </span>

                                            <span className="text-gray-500 line-through">
                                                ₹{item.oldPrice}
                                            </span>

                                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                                                {item.discount}% OFF
                                            </span>
                                        </div>
                                         <p className='text-gray-500 px-2 '>
                                            {item.rating}
                                        </p>
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
                    )}
                </div>
            </div>
        </div>
    )
}

export default AllProduct