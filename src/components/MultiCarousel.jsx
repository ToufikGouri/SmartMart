import React from 'react'
import Slider from "react-slick";
import '../css/Carousel.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MultiCarousel = ({ multiData }) => {

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
        prevArrow: <PreviousBtn />
    };

    // console.log(allData.products && allData.products.filter((val) => {
    //     return val.id <= 8 || (val.id > 60 && val.id < 65)
    // }));
    // 0 SmartPhones,1 Laptops MEN Watches 12

    // 8 Women dresses, 16 Sunglasses, 10 Men shirts (In actual using,Mixed some neighbours too )

    return (
        <>
            <div style={{ width: "95vw" }}>
                <Slider {...settings}>
                    {multiData && multiData.map((val) => {

                        const content = Math.round(Math.random() * 2) /*To get random Content for each card */
                        
                        return (
                            <div className='text-center text-capitalize eCard' key={val.id}>
                                <div className='eImgParent'>
                                    <img src={val.images[1] || val.images[0]} alt="Image" />
                                </div>
                                <h5 className='fw-light my-2'>{val.category}</h5>
                                {
                                    (content === 0) && <h6>From ${val.price}</h6> ||
                                    (content === 1) && <h6>Up To {Math.round(val.discountPercentage)}% OFF</h6> ||
                                    (content === 2) && <h6>Great Deals On {val.brand}</h6>
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