import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { login, getProfile } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {

        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await dispatch(login(formData));

        if (login.fulfilled.match(result)) {
            await dispatch(getProfile());
            navigate("/");
        }
    };

    return (
        <div className='bg-[#E7E1B1] min-h-screen'>
            <div className='flex justify-center items-center lg:justify-start lg:text-left pt-16 px-10'>
                <Link to="/">Home</Link> / <Link to="/login">Login</Link>
            </div>
            <div className='py-10 flex justify-center px-2'>
                <div className='bg-[#FBF5DD] rounded-lg shadow-md w-full lg:max-w-md py-6 px-4'>
                    <h1 className='text-2xl font-bold flex justify-center items-center text-center'>Login In With</h1>
                    <div className='flex gap-4 cursor-pointer justify-center items-center text-center flex-wrap pt-4 '>
                        <div className='flex text-center items-center gap-2 bg-white/40 px-4 py-3 rounded-md shadow-md '>
                            <FcGoogle className='text-2xl' />
                            <span className='text-xl'>GooGle</span>
                        </div>
                        <div className='flex text-center items-center gap-2 bg-white/40 px-4 py-3 rounded-md shadow-md'>
                            <FaApple className='text-2xl' />
                            <span className='text-xl'>Apple</span>
                        </div>
                    </div>
                    <form className='pt-4' onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <label className='text-md mb-2'>Email</label>
                            <input
                                type='text'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='Enter your email'
                                className='rounded-lg shadow-md border border-black px-6 py-3 outline-none'
                            />
                        </div>
                        <div className='flex flex-col pt-2'>
                            <label className='text-md mb-2'>Password</label>
                            <input
                                type='text'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Enter password here...'
                                className='rounded-lg shadow-md border border-black px-6 py-3 outline-none'
                            />
                        </div>

                        <div className='pt-4'>
                            <button
                                type='submit'
                                className='w-full font-semibold px-4 py-3 rounded-lg shadow-md flex justify-center items-center text-center bg-black text-white'>
                                {loading ? "Login..." : "Login"}</button>
                        </div>
                        <p className='pt-4 gap-2 cursor-pointer flex justify-center items-center text-center'>Don't Have An Account?
                            <Link
                                to="/register"
                                className='relative text-md font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100'
                            >
                                Create Account
                            </Link></p>

                    </form>
                </div>
            </div>
        </div>


    )
}

export default Login