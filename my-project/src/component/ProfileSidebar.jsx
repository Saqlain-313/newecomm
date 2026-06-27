// ProfileSidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    FiUser,
    FiMapPin,
    FiPackage,
    FiHeart,
    FiEdit,
    FiLogOut,
} from 'react-icons/fi';

const ProfileSidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());

        navigate('/login');
    };

    const { loading, error, user } = useSelector(
        (state) => state.auth
    );
    return (
        <div className="w-full lg:w-72 bg-[#FBF5DD] shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold border-b pb-3 mb-4">
                My Account
            </h2>

            <div className="flex flex-col gap-2">

                <Link
                    to=""
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
                >
                    <FiUser />
                    <span>Profile</span>
                </Link>

                <Link
                    to="address"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
                >
                    <FiMapPin />
                    <span>Address</span>
                </Link>

                <Link
                    to="orders"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
                >
                    <FiPackage />
                    <span>Orders</span>
                </Link>

                <Link
                    to="wishlist"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
                >
                    <FiHeart />
                    <span>Wishlist</span>
                </Link>

                <Link
                    to="editprofile"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
                >
                    <FiEdit />
                    <span>Edit Profile</span>
                </Link>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                >
                    <FiLogOut />
                    <span>Logout</span>
                </button>

            </div>
        </div>
    );
};

export default ProfileSidebar;