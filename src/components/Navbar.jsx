import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Home.css'

const Navbar = () => {

    const cartIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ position: "relative", bottom: "3px" }} className="bi bi-cart3" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" /></svg>

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">SmartMart</Link>
                    <input className="form-control search me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link className="nav-link active" aria-current="page" to="/"><i className="fa-regular fa-circle-user mx-1"></i> Login</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/"><i className='mx-1'>{cartIcon}</i> Cart</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/"><i className="fa-solid fa-store  mx-1"></i> Become a seller</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar