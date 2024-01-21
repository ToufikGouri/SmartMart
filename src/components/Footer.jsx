import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer>
                <ul className='d-flex justify-content-center text-center'>
                    <li className='list-unstyled mx-2'> 2024 &copy; All Rights Reserved</li>
                    <li className='list-unstyled mx-2'>Developed with <i className="fa-solid fa-heart" style={{color: "red"}}></i> by Toufik Gouri</li>
                    <li className='list-unstyled mx-2'><Link className='text-decoration-none' to={"https://github.com/ToufikGouri"}>GitHub</Link></li>
                </ul>
            </footer>
        </>
    )
}

export default Footer