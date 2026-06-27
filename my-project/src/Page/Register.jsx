import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { register } from '../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const Register = () => {

  const dispatch = useDispatch();

  const { loading, user, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <div className='bg-[#E7E1B1] min-h-screen'>

      <div className='pt-16 px-10 flex lg:justify-start justify-center lg:text left items-center'>
        <Link to="/">Home</Link> / <Link to="/register">Create an Account</Link>
      </div>

      <div className='flex justify-center py-16 px-2'>

        <div className='bg-[#FBF5DD] rounded-lg shadow-lg py-10 w-full max-w-xl'>

          <div className='flex flex-col justify-center items-center text-center'>
            <h1 className='text-3xl font-bold text-black/80'>
              Create Account
            </h1>

            <p>Please register below to create an account</p>
          </div>
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

          <form onSubmit={handleSubmit} >

            <div className='flex flex-col px-8 pt-6'>
              <label className='text-md mb-2'>Full Name</label>

              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='enter your name'
                className='px-6 py-3 border rounded-lg border-black outline-none'
              />
            </div>

            <div className='flex flex-col px-8 pt-4'>
              <label className='text-md mb-2'>Email Address</label>

              <input
                type='text'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='enter your email address'
                className='px-6 py-3 border rounded-lg border-black outline-none'
              />
            </div>

            <div className='flex flex-col px-8 pt-4'>
              <label className='text-md mb-2'>Password</label>

              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='*************'
                className='px-6 py-3 border rounded-lg border-black outline-none'
              />
            </div>
            {error && (
              <p className="text-red-500 text-center mt-2">
                {error}
              </p>
            )}

            {loading && (
              <p className="text-blue-500 text-center mt-2">
                Registering...
              </p>
            )}

            <div className='flex items-center  gap-4 px-8 pt-4'>
              <input type='checkbox' className='' />

              <p>Subscribe to email marketing</p>
            </div>

            <div className='w-full pt-4 px-8'>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 w-full rounded-lg bg-black text-white disabled:bg-gray-500"
              >
                {loading ? "Creating Account..." : "Create an Account"}
              </button>
            </div>

            <p className='pt-4 flex gap-2 cursor-pointer justify-center items-center text-center'>Already Have An Account?
              <Link to="/login" className='relative text-md font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100'>Log In</Link></p>

            <div>

            </div>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Register