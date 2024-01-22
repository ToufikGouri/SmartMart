import React from 'react'
import '../css/cPage.css'

const PCcards = ({ data }) => {
    return (
        <div>
            {data.map((val) => {
                return <div key={val.id} className='d-flex flex-column align-items-center m-4'>
                    <div className='row pCard'>
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
                                <i>In Stock {val.stock}</i>
                            </div>
                        </div>
                    </div>
                </div>
            }).slice(1, 5)}
        </div>
    )
}

export default PCcards