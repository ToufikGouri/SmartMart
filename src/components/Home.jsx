import React, { useEffect } from 'react'
import '../css/Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAll, fetchCategories } from '../functions/fetchData'

// Components
import Loading from './Loading';
import Categories from './Categories';
import Carousel from './Carousel';
import MultiCarousel from './MultiCarousel';
import SquareCard from './SquareCard';
import Footer from './Footer';

const Home = () => {

    const dispatch = useDispatch();
    const data = useSelector(state => state)
    const { allData, categories } = data;
    console.log("My data", data);

    // getting category vise 0-5-10..95-99
    const allCategories = (Object.keys(allData).length > 1) && allData.products.map(val => [val.category, val.images[0]]).filter((val, ind) => ind % 5 === 0)
    const allElectronics = allCategories.length > 1 && allData.products.filter((val) => val.id <= 8 || (val.id > 60 && val.id < 65))
    const allFashion = allCategories.length > 1 && allData.products.filter((val) => (val.id >= 41 && val.id < 45) || (val.id >= 76 && val.id < 84))
    const menFashion = allCategories.length > 1 && allData.products.filter((val) => val.id >= 52 && val.id < 64)

    // sqrCard data
    const sqData1 = allCategories.length > 1 && allData.products.filter((val) => val.id >= 89 && val.id < 93) //H1=(89,90,91,92)
    const sqData2 = allCategories.length > 1 && allData.products.filter((val) => val.id >= 29 && val.id < 33) //H2-(29,30,31,32) 
    const sqData3 = allCategories.length > 1 && allData.products.filter((val) => (val.id === 35) || (val.id === 45) || (val.id === 55) || (val.id === 65)) //H3-(Random 4)

    const sqData4 = allCategories.length > 1 && allData.products.filter((val) => val.id > 96) //H4-(97,98,99,100)
    const sqData5 = allCategories.length > 1 && allData.products.filter((val) => (val.id === 68) || (val.id === 78) || (val.id === 88) || (val.id === 98)) //H5-(Random 4)
    const sqData6 = allCategories.length > 1 && allData.products.filter((val) => val.id >= 11 && val.id < 15) //H6-(11,12,13,14) 

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

                <div className="my-4"> {/* H1=(89,90,91,92) H2-(29,30,31,32) H3-(Random 4) */}
                    <SquareCard sqData={{ sqData1, sqData2, sqData3 }} HeadingOne={"Must-have Electronics & Appliance"} HeadingTwo={"Home Decor & Furnishings"} HeadingThree={"End of Season Bestsellers"} />
                </div>

                <div className='my-4'>
                    <h4 className='ms-2'>Mens's Exclusive Items</h4>
                    <MultiCarousel multiData={menFashion} />
                </div>

                <div className="my-4"> {/* H4-(97,98,99,100) H5-(Random 4) H3-(Random 4) */}
                    <SquareCard sqData={{ sqData4, sqData5, sqData6 }} HeadingOne={"Best Selling Lights"} HeadingTwo={"Offers on Nation's Favorites"} HeadingThree={"Top Perfumes For You"} />
                </div>

                <Footer />

            </div>
        </>
    )
}

export default Home

// api docs: https://dummyjson.com/docs/products
// api (30 products): https://dummyjson.com/products
// api (all products): https://dummyjson.com/products?limit=0
// api (categories): https://dummyjson.com/products/categories

