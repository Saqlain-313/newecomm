import React from 'react'
import Navbar from '../component/Navbar'
import Hero from '../component/Hero'
import Arrival from '../Page/Arrival'
import Banner from '../component/Banner'
import Banner1 from '../component/Banner1'
import Footer from '../component/Footer'
import Banner2 from '../component/Banner2'
import Banner3 from '../component/Banner3'

const Home = () => {
    return (
        <div>
           
            <Hero />
            <Banner2 />
            <Arrival />
            <Banner />
            <Banner1 />
            <Banner3 />
            
        </div>
    )
}

export default Home