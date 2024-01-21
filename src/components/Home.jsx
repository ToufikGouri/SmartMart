import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAll, fetchCategories } from '../functions/fetchData'
import Loading from './Loading';
import Categories from './Categories';
import Carousel from './Carousel';
import '../css/Home.css'
import Electronics from './MultiCarousel';
import MultiCarousel from './MultiCarousel';

const Home = () => {

    const dispatch = useDispatch();
    const data = useSelector(state => state)
    const { allData, categories } = data;
    console.log("My data", data);

    // getting category vise 0-5-10..95-99
    const allCategories = (Object.keys(allData).length > 1) && allData.products.map(val => [val.category, val.images[0]]).filter((val, ind) => ind % 5 === 0)
    const allElectronics = allCategories.length > 1 && allData.products.filter((val) => val.id <= 8 || (val.id > 60 && val.id < 65))
    const allFashion = allCategories.length > 1 && allData.products.filter((val) => (val.id >= 41 && val.id < 45) || (val.id >= 76 && val.id < 84))

    useEffect(() => {
        dispatch(fetchAll())
        dispatch(fetchCategories())
    }, [])

    if (data.isLoading) {
        return <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh", width: "98vw" }}><Loading /></div>
    }


    return (
        <>
            <div className="container homeContainer d-flex flex-column jusify-content-center align-items-center">
                <h2 className='my-2'>Top Categories For You</h2>

                <div className="homeCategories d-flex flex-wrap justify-content-center my-2">
                    {allCategories.length > 1 && allCategories.map((val, ind) => {
                        return <Categories key={ind} category={val[0]} img={val[1]} />
                    }).slice(0, 8)}
                </div>

                <Carousel allData={allData} />

                <div className='my-4'>
                    <h4 className='ms-2'>Best Of Electronics</h4>
                    <MultiCarousel multiData={allElectronics} />
                </div>

                <div className='my-4'>
                    <h4 className='ms-2'>Top Fashion Of The Week</h4>
                    <MultiCarousel multiData={allFashion} />
                </div>


            </div>
        </>
    )
}

export default Home

// api docs: https://dummyjson.com/docs/products
// api (30 products): https://dummyjson.com/products
// api (all products): https://dummyjson.com/products?limit=0
// api (categories): https://dummyjson.com/products/categories

