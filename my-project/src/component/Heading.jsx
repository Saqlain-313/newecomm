import React from 'react'
import { Link } from 'react-router-dom'

const Heading = ({
    title,
    description,
    currentPage,
    currentPath
}) => {
    return (
        <div>
            <div className='flex justify-center items-center gap-2 pt-8'>
                <Link to="/">Home</Link> /
                <Link to={currentPath}>{currentPage}</Link>
            </div>

            <h1 className='flex justify-center items-center text-2xl font-bold pt-4'>
                {title}
            </h1>

            <p className='hidden lg:flex items-center text-center pt-4 leading-8 px-20'>
                {description}
            </p>
        </div>
    )
}

export default Heading