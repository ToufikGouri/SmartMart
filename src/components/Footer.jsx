import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer>
                <ul className='text-center p-0'>
                    <li className='list-unstyled'> 2024-25 &copy; All Rights Reserved</li>
                    <li className='list-unstyled'>Developed with <i className="fa-solid fa-heart" style={{ color: "red" }}></i> by Toufik Gouri</li>
                    <li className='list-unstyled'><Link className='text-decoration-none' to="https://github.com/ToufikGouri">GitHub</Link></li>
                </ul> 
            </footer>
        </>
    )
}

export default Footer