import React from 'react'
import { useNavigate } from 'react-router-dom'

const Categories = ({ category, img, id }) => {

    const navigate = useNavigate()

    return (
        <>
            <div onClick={() => navigate(`/category/${id}`)} className='categoriesParent d-flex flex-column align-items-center mx-3'>
                <div>
                    <div className='categoryImg'>
                        <img src={img} alt="Product image" />
                    </div>
                </div>
                <div className="categoryName text-capitalize text-center">{category}</div>
            </div>
        </>
    )
}

export default Categories