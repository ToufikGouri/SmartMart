import React from 'react'
import '../css/Carousel.css'
import { useNavigate } from 'react-router-dom'

const SquareCard = ({ sqData, HeadingOne, HeadingTwo, HeadingThree }) => {

    const data1 = Object.values(sqData)[0]
    const data2 = Object.values(sqData)[1]
    const data3 = Object.values(sqData)[2]

    const navigate = useNavigate()
    

    return (
        <>
            <div>
                <div className="row text-capitalize">
                    <div className="col-md-4">
                        {data1 &&
                            <div>
                                <h4 className='ms-4'>{HeadingOne}</h4>
                                <div className='d-flex flex-wrap justify-content-center' style={{ backgroundColor: "#212121" }}>
                                    {data1.map((val) => {
                                        return <div onClick={()=> navigate(`/category/${val.id}`)} className='text-center text-capitalize sqCard m-2' key={val.id}>
                                            <div className='sqImgParent'> 
                                                <img src={val.images[1] || val.images[0]} alt="Image" loading='lazy' />
                                            </div>
                                            <h5 className='my-2'>{val.brand ?? val.title}</h5>
                                        </div>
                                    })}
                                </div>
                            </div>
                        }
                    </div>

                    <div className="col-md-4">
                        {data2 &&
                            <div>
                                <h4 className='ms-4'>{HeadingTwo}</h4>
                                <div className='d-flex flex-wrap justify-content-center' style={{ backgroundColor: "#212121" }}>
                                    {data2.map((val) => {
                                        return <div onClick={()=> navigate(`/category/${val.id}`)} className='text-center text-capitalize sqCard m-2' key={val.id}>
                                            <div className='sqImgParent'>
                                                <img src={val.images[1] || val.images[0]} alt="Image" loading='lazy' />
                                            </div>
                                            <h5 className='my-2'>{val.brand ?? val.title}</h5>
                                        </div>
                                    })}
                                </div>
                            </div>
                        }
                    </div>

                    <div className="col-md-4">
                        {data3 &&
                            <div>
                                <h4 className='ms-4'>{HeadingThree}</h4>
                                <div className='d-flex flex-wrap justify-content-center' style={{ backgroundColor: "#212121" }}>
                                    {data3.map((val) => {
                                        return <div onClick={()=> navigate(`/category/${val.id}`)} className='text-center text-capitalize sqCard m-2' key={val.id}>
                                            <div className='sqImgParent'>
                                                <img src={val.images[1] || val.images[0]} alt="Image" loading='lazy' />
                                            </div>
                                            <h5 className='my-2'>{val.brand ?? val.title}</h5>
                                        </div>
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SquareCard