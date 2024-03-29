import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../css/cPage.css'
import PCcards from '../cPages/PCcards'
import Loading from './Loading'
import Footer from './Footer'

const QueryPage = () => {

    // https://dummyjson.com/products/search?q=phone

    const [isLoading, setIsLoading] = useState(false)
    const [searchData, setSearchData] = useState([])
    const [initialData, setInitialData] = useState([])
    const [sortActive, setsortActive] = useState('initial')
    const [query, setQuery] = useSearchParams()
    const searchResult = query.get('q')

    useEffect(() => {
        setIsLoading(true);
        ; (async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/search?q=${searchResult}`)
                setSearchData(response.data.products)
                setInitialData(response.data.products)
            } catch (error) { } finally { setIsLoading(false) }
        })()
    }, [searchResult, setSearchData])

    if (isLoading) {
        return <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh", width: "98vw" }}><Loading /> </div>
    }

    return (
        <>
            {searchData.length > 0 ? <div className='text-capitalize d-flex flex-column align-items-center'>
                <h3 className='my-3'>Showing {searchData.length} Results For "{searchResult}" </h3>

                <h5 className='sortParent d-flex justify-content-between mt-3' style={{ width: "60vw" }}> <div><i className="fa-solid fa-arrow-right-arrow-left fa-fw" style={{ transform: "rotate(90deg)" }}></i> Sort by</div>
                    <div className={`sortby ${sortActive === "initial" ? "sortActive" : ''} `} onClick={() => { setSearchData([...initialData]); setsortActive("initial") }}>Relevance</div>
                    <div className={`sortby ${sortActive === "rating" ? "sortActive" : ''} `} onClick={() => { setSearchData([...searchData].sort((a, b) => b.rating - a.rating)); setsortActive("rating") }}>Rating</div>
                    <div className={`sortby ${sortActive === "low" ? "sortActive" : ''} `} onClick={() => { setSearchData([...searchData].sort((a, b) => a.price - b.price)); setsortActive("low") }}>Price <i className="fa-solid fa-arrow-down-short-wide"></i></div>
                    <div className={`sortby ${sortActive === "high" ? "sortActive" : ''} `} onClick={() => { setSearchData([...searchData].sort((a, b) => b.price - a.price)); setsortActive("high") }}>Price <i className="fa-solid fa-arrow-up-wide-short"></i></div>
                </h5>
                <PCcards data={searchData} query={true} />

                <div className={searchData.length === 1 ? `position-fixed bottom-0` : ''}><Footer /></div>
            </div> : <div className=' d-flex flex-column align-items-center'>
                <h3 className='my-4'>Could not found results for "{searchResult}" </h3>

                <div className='position-fixed bottom-0'> <Footer /> </div>
            </div>}
        </>
    )
}

export default QueryPage