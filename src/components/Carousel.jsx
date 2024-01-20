import React from 'react'
import "../css/Carousel.css"
import CarouselItem from './CarouselItem'

const Carousel = ({ allData }) => {

    const randoms = []
    while (randoms.length < 3) {
        let val = Math.round(Math.random() * 50)
        if (randoms.includes(val)) {
            continue
        }
        randoms.push(val)
    }

    return (
        <>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">

                    {/* To get new items line by line 0-5-10..95-99 */}
                    {/* {allData.products && allData.products.filter((val, ind) => ind % 5 === 0).map((val) => { */}

                    {/* To get random product each time */}
                    
                    {allData.products && allData.products.filter((val, ind) => randoms.includes(ind)).map((val,index) => {
                        return <CarouselItem key={val.id} title={val.title} discount={val.discountPercentage} img={val.thumbnail} price={val.price} brand={val.brand} isActive={index}/>
                    }).slice(0, 3)}

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Carousel