import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import '../css/Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { cartItemCount, userDetails } from '../functions/fetchData'
import { account } from '../appwrite/appwriteConfig'
import SmartMart_Text from "../SmartMart_Text.png"
import PageNotFound from './PageNotFound'

const Navbar = () => {

    const cartIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ position: "relative", bottom: "3px" }} className="bi bi-cart3" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" /></svg>
    const itemCount = useSelector(cartItemCount)
    const userData = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [query, setQuery] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')

    const handleLogout = async () => {
        try {
            await account.deleteSession("current")
            navigate("/")
            dispatch(userDetails())
        } catch (error) { }
    }

    const searchHandle = async () => {
        const value = searchQuery.trim()

        if (value.length > 0) {
            setQuery({ q: value })
            navigate(`/search?q=${value}`)
        }
        // setSearchQuery('')
    }

    useEffect(() => {
        if (!userData) {
            dispatch(userDetails())
        }

    }, [dispatch, userData])

    return (
        <>
            {/* Modal for logout */}
            <div className="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ backgroundColor: "#212121" }}>
                        <div className="modal-header border-0">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Log Out</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ filter: "invert(1)" }}></button>
                        </div>
                        <div className="modal-body mb-1">
                            Are you sure you want to log out?
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={handleLogout} type="button" className="btn btn-primary" data-bs-dismiss="modal">Log Out</button>
                        </div>
                    </div>
                </div>
            </div>  <div className='d-none'><PageNotFound /></div>   {/* Find a better way */}

            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fa-solid fa-ellipsis-vertical text-light fs-6"></i>
                        </button>
                        <Link className="navbar-brand" to="/"><img src={SmartMart_Text} alt="SmartMart_Text.png" style={{ height: "25px" }} /></Link>
                    </div>
                    <input className="form-control search me-2" type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && searchHandle()} placeholder="Search" aria-label="Search" />
                    <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            {userData ?
                                <li className="dropdown-center">
                                    <Link className="dropdown-toggle nav-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-regular fa-circle-user mx-1"></i> {userData.name}
                                    </Link>
                                    <ul className="dropdown-menu" style={{ backgroundColor: "#1c1c1c" }}>
                                        <li className="nav-item d-flex logoutBtn justify-content-center">
                                            <button data-bs-toggle="modal" data-bs-target="#exampleModal3" className="btn btn-outline-light"><i className="fa-solid fa-right-from-bracket"></i> Log Out</button>
                                        </li>
                                    </ul>
                                </li>
                                :
                                <li className="nav-item mx-2">
                                    <Link className="nav-link active" aria-current="page" to="/login"><i className="fa-regular fa-circle-user mx-1"></i> Login</Link>
                                </li>
                            }
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/cart"><i className='mx-1 position-relative'>{cartIcon}<span className={`navItemCount d-${itemCount === 0 && "none"}`}><span>{itemCount}</span></span></i> Cart </Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/feedback"><i className="fa-solid fa-comment-dots mx-1"></i> Feedback</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar