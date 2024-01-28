import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAll, addToCart } from '../functions/fetchData'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import PCcards from './PCcards'
import '../css/cPage.css'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Description = () => {

    const allData = useSelector(state => state.allData)
    const isLoading = useSelector(state => state.isLoading)
    const cartItems = useSelector(state => state.cartItems)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ position: "relative", bottom: "3px" }} className="bi bi-cart3" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" /></svg>

    const { id } = useParams()
    let productId = Number(id)  //Using Number instead of parseInt will save us from cases like "34af", as parseInt will still converts this value to a number but we don't want it in url parameter.

    useEffect(() => {
        if (productId < 1 || productId > 100 || !Number.isInteger(productId)) { navigate("/notfound"); return }//If id is less than 1 or greater than 100 or not a valid number or is not a integer like 12.3 etc cases then redirect to 404 page.
        dispatch(fetchAll())
    }, [])

    const randoms = []
    while (randoms.length < 5) {
        let val = Math.round(Math.random() * 95)
        if (randoms.includes(val)) {
            continue
        }
        randoms.push(val)
    }

    const data = Object.keys(allData).length > 1 && allData.products


    const product = data.length > 1 && data.filter((val) => val.id === productId)[0] //Fetching product by id, As it returns the arr with an single object we directly gets the only obj by [0]
    const category = data.length > 1 && data.filter((val, ind) => val.category === product.category)
    const randomData = data.length > 1 && data.filter((val, ind) => randoms.includes(ind))

    if (isLoading) {
        return <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh", width: "98vw" }}><Loading /></div>
    }

    // Slick Carousel 

    const PreviousBtn = (props) => {
        const { className, onClick } = props;
        return (
            <>
                <div className={`${className} d-flex align-items-center justify-content-center z-3`} onClick={onClick} >
                    <i className="fa-solid fa-chevron-left desPrev desBtn"></i>
                </div>
            </>
        )
    }

    const NextBtn = (props) => {
        const { className, onClick } = props;
        return (
            <>
                <div className={`${className} d-flex align-items-center justify-content-center z-3`} onClick={onClick} >
                    <i className="fa-solid fa-chevron-right desNext desBtn"></i>
                </div>
            </>
        )
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextBtn />,
        prevArrow: <PreviousBtn />
    };

    const cartHandle = (item) => {
        dispatch(addToCart(item));
        navigate("/cart")
    }

    return (
        <>
            <div>
                {data.length > 1 && <div>

                    <div className='text-capitalize d-flex flex-column align-items-center'>
                        <h2 className="my-4">About The {product.title} </h2>

                        {/* Heading Card */}

                        <div className='row mb-4 d-flex pOutParent'>
                            <div className="col-md-6 d-flex justify-content-center">
                                <div className="pOutImgParent pe-3 w-100">
                                    <Slider {...settings}>
                                        {product.images.map((val, ind) => {
                                            return <img key={ind} src={val} />
                                        })}
                                    </Slider>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex align-items-center">
                                <div className="pContent w-100">
                                    <h2>{product.title}</h2>
                                    <h5>Only From <span className='fs-3' style={{ color: "#00d900" }}>${product.price}</span></h5>
                                    <h6>{(product.description.length > 80 ? product.description.slice(0, 80) + "..." : product.description)}</h6>
                                    <h5>Huge Discounts Up To <span className='text-warning'>{Math.round(product.discountPercentage)}% OFF</span> </h5>
                                    <h5>Seller: {product.brand}</h5>
                                    <h5>Rating: {product.rating}⭐</h5>
                                    <div><button onClick={() => cartHandle(product)} className="btn btn-light my-2 atcBtn">{cartIcon} Add To Cart</button></div>
                                </div>
                            </div>
                        </div>

                        {/* Normal Cards */}

                        <p className='w-75 border my-5' />

                        <h2>You Might Also Like</h2>

                        <PCcards data={randomData} routeToCategory={true} />

                        <p className='w-75 border my-5' />

                        <h2>Products Related To {product.category}</h2>

                        <PCcards data={category} routeToCategory={true} />
                        {/* Handle the route page */}

                        <h3 className='m-3 text-center'>Can't Find The Item You are Looking For?</h3>
                        <h5 className='mb-5 text-center'><Link className='text-success text-decoration-none' to="/">Click Me</Link> To Go Home Page Or Search For Your Favourite Items. </h5>

                        <Footer />

                    </div>

                </div>}
            </div>
        </>
    )
}

export default Description


// 'id',
// 'title',
// 'description',
// 'price',
// 'discountPercentage',
// 'rating', 'stock', 'brand', 'category', 'thumbnail', 'images'