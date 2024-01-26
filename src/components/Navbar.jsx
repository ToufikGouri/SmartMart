import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { cartItemCount, userDetails } from '../functions/fetchData'
import { account } from '../appwrite/appwriteConfig'

const Navbar = () => {

    const cartIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ position: "relative", bottom: "3px" }} className="bi bi-cart3" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" /></svg>
    const itemCount = useSelector(cartItemCount)
    const userData = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLogout, setIsLogout] = useState(false)

    const handleLogout = async () => {
        try {
            await account.deleteSession("current")
            navigate("/")
        } catch (error) {
            console.log(error);
        }
        setIsLogout(true)
    }


    useEffect(() => {
        if (!userData) {
            dispatch(userDetails())
            setIsLogout(true)
        }
    }, [isLogout])
    // console.log(userData);
    // Make reload and update the nav on each login or logout

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">SmartMart</Link>
                    {/*<i className="fa-solid fa-magnifying-glass searchIcon"></i>*/} <input className="form-control search me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ borderColor: "#8f8d8b" }}>
                        <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            {userData ?
                                (
                                    <li className="dropdown-center">
                                        <Link className="dropdown-toggle nav-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fa-regular fa-circle-user mx-1"></i> {userData.name}
                                        </Link>
                                        <ul className="dropdown-menu" style={{ backgroundColor: "#1c1c1c" }}>
                                            <li className="nav-item d-flex justify-content-center">
                                                <button onClick={handleLogout} className="btn btn-outline-light"><i className="fa-solid fa-right-from-bracket"></i> Log Out</button>
                                            </li>
                                        </ul>
                                    </li>
                                )
                                :
                                (
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link active" aria-current="page" to="/login"><i className="fa-regular fa-circle-user mx-1"></i> Login</Link>
                                    </li>
                                )}
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/cart"><i className='mx-1 position-relative'>{cartIcon}<span className={`navItemCount d-${itemCount === 0 && "none"}`}><span>{itemCount}</span></span></i> Cart </Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/feedback"><i className="fa-solid fa-store  mx-1"></i> Become a seller</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar