import React from 'react'
import Slider from "react-slick";
import '../css/Carousel.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const MultiCarousel = ({ multiData }) => {

    const navigate = useNavigate()
    const slidesTS = 6

    const PreviousBtn = (props) => {
        const { className, onClick, currentSlide } = props;
        return (
            <>
                {currentSlide !== 0 &&
                    <div className={`${className} d-flex align-items-center justify-content-center z-3`} onClick={onClick} >
                        <i className="fa-solid fa-chevron-left electBtn" style={{ left: "15px" }}></i>
                    </div>}
            </>
        )
    }

    const NextBtn = (props) => {
        const { className, onClick, currentSlide, slideCount } = props;
        return (
            <>
                {currentSlide !== slideCount - slidesTS &&
                    <div className={`${className} d-flex align-items-center justify-content-center z-3`} onClick={onClick} >
                        <i className="fa-solid fa-chevron-right electBtn" style={{ right: "15px" }}></i>
                    </div>}
            </>
        )
    }

    // To make infinite slides just remove the logic from the btns and set infinite to True

    const settings = {
        dots: false,
        infinite: false,
        speed: 800,
        slidesToShow: slidesTS,
        slidesToScroll: 3,
        nextArrow: <NextBtn />,
        prevArrow: <PreviousBtn />,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,
                }
            },
            
        ]
    };

    // 0 SmartPhones,1 Laptops MEN Watches 12

    // 8 Women dresses, 16 Sunglasses, 10 Men shirts (In actual using,Mixed some neighbours too )

    return (
        <>
            <div className='ecardParent' style={{ width: "95vw" }}>
                <Slider {...settings}>
                    {multiData && multiData.map((val) => {

                        const content = Math.round(Math.random() * 2) /*To get random Text Content for each card */
                        return (
                            <div onClick={() => navigate(`/category/${val.id}`)} className='text-center text-capitalize eCard' key={val.id}>
                                <div className='eImgParent'>
                                    <img src={val.images[1] || val.images[0]} alt="Image" />
                                </div>
                                <h5 className='fw-light my-2'>{val.category}</h5>
                                {
                                    (content === 0) && <h6>From <span className='text-myGreen'>${val.price}</span></h6> ||
                                    (content === 1) && <h6>Up To <span className='text-warning'>{Math.round(val.discountPercentage)}% OFF</span></h6> ||
                                    (content === 2) && <h6>Great Deals On {(val.brand).slice(0,5)}...</h6>
                                }
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </>
    )
}

export default MultiCarousel