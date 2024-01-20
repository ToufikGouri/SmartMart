import React from 'react'

const Categories = ({ category, img }) => {
    return (
        <>
            <div className='categoriesParent d-flex flex-column align-items-center mx-3'>
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