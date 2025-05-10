import React from 'react'
import { useNavigate } from 'react-router-dom'

const CarouselItem = ({ id, title, discount, img, price, brand, isActive }) => {
    const navigate = useNavigate()

    return (
        <>
            <div onClick={() => navigate(`/category/${id}`)} className={`carousel-item ${isActive === 0 && "active"}`}>
                <div className='row'>
                    <div className="col-md-6 carouselCol-1 d-flex justify-content-center align-items-center">
                        <div className="cImgParent">
                            <img src={img} className="d-block" alt="..." loading='eager' />
                        </div>
                    </div>

                    <div className="col-md-6 carouselCol-2 text-capitalize d-flex justify-content-center align-items-center">
                        <div>
                            <h2>Hot Deals On {brand}</h2>
                            <h4>{title}</h4>
                            <h5>Up To <span className='text-warning'>{Math.round(discount)}% OFF</span></h5>
                            <h3>Starting From <span className="text-myGreen">${price}</span> <s className='text-secondary'>${price + 123}</s> </h3>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CarouselItem

