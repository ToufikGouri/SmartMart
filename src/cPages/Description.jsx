import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAll } from '../functions/fetchData'
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
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        speed: 1200,
        // speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextBtn />,
        prevArrow: <PreviousBtn />
    };

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
                                <div className="pContent">
                                    <h2>{product.title}</h2>
                                    <h5>Only From <span className='fs-3' style={{ color: "#00d900" }}>${product.price}</span></h5>
                                    <h6>{(product.description.length > 80 ? product.description.slice(0, 80) + "..." : product.description)}</h6>
                                    <h5>Huge Discounts Up To <span className='text-warning'>{Math.round(product.discountPercentage)}% OFF</span> </h5>
                                    <h5>Seller: {product.brand}</h5>
                                    <h5>Rating: {product.rating}⭐</h5>
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

                        <h3 className='m-3'>Can't Find The Item You are Looking For?</h3>
                        <h5 className='mb-5'><Link className='text-success text-decoration-none' to="/">Click Me</Link> To Go Home Page Or Search For Your Favourite Items. </h5>

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