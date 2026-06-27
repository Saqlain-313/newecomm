import React from 'react'
import { BannerSlide } from '../store/BannerSlide'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Navigation, Pagination, Autoplay } from 'swiper/modules'

const Banner2 = () => {
    return (
        <div className='w-full bg-[#E7E1B1] py-6'>

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
            >

                {
                    BannerSlide.map((item, index) => (
                        <SwiperSlide key={index}>

                            <div className='relative w-full h-[250px] sm:h-[400px] lg:h-[400px]'>

                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt="banner"
                                    className='w-full h-full object-cover'
                                />

                                {/* Overlay */}
                                <div className='absolute inset-0  flex items-center'>

                                    <div className='px-6 lg:px-20 text-white space-y-4'>

                                        {/* <h2 className='text-2xl sm:text-4xl lg:text-5xl font-bold'>
                                            {item.title}
                                        </h2>

                                        <p className='text-sm sm:text-lg max-w-[500px]'>
                                            {item.description}
                                        </p> */}

                                        <button className='bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-[#0D530E] hover:text-white transition-all duration-300'>
                                            Shop Now
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </SwiperSlide>
                    ))
                }

            </Swiper>

        </div>
    )
}

export default Banner2