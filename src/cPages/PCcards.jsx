import React from 'react'
import { useNavigate } from 'react-router-dom';

import '../css/cPage.css'
import { useDispatch } from 'react-redux';
import { addToCart } from '../functions/fetchData';

const PCcards = ({ data, routeToCategory, query }) => {

    // If routeToCategory is true it indicates we are on the "Description page".
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ position: "relative", bottom: "3px" }} className="bi bi-cart3" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" /></svg>

    const redirectHandle = (id) => {
        if (routeToCategory === true) {
            navigate(`/category/${id}`)
        } else {
            navigate(`/description/${id}`)
        }
    }

    const cartHandle = (e, val) => {
        e.stopPropagation();
        dispatch(addToCart(val))
        navigate("/cart")
    }

    const slicer = query ? [0] : [1, 5];

    return (
        <div>
            {data.map((val) => {
                return <div key={val.id} className='d-flex flex-column align-items-center m-4'>
                    <div onClick={() => redirectHandle(val.id)} className='row pCard'> {/*It will be easy navigate from this card as this have classname for hover */}
                        <div className="col-md-6 d-flex justify-content-center">
                            <div className="pImgParent my-3">
                                <img src={val.images[3] || val.images[0]} alt="" />
                            </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                            <div className="pContent">
                                <h4>{val.title}</h4>
                                <h5>Starting From ${val.price}</h5>
                                <h6>{(val.description.length > 80 ? val.description.slice(0, 80) + "..." : val.description)}</h6>
                                <h6>Rating: {val.rating}⭐</h6>
                                <i className='d-block'>In Stock {val.stock}</i>
                                <button onClick={(e) => cartHandle(e, val)} className={`btn btn-light my-2 atcBtn d-${!routeToCategory && "none"}`}>{cartIcon} Add To Cart</button> {/*Read Logic at top to understand*/}
                            </div>
                        </div>
                    </div>
                </div>
            }).slice(...slicer)}
        </div>
    )
}

export default PCcards