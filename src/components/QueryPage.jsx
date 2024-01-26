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
    const [query, setQuery] = useSearchParams()
    const searchResult = query.get('q')

    useEffect(() => {
        setIsLoading(true);
        ; (async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/search?q=${searchResult}`)
                setSearchData(response.data.products)
            } catch (error) { } finally { setIsLoading(false) }
        })()
    }, [searchResult])

    if (isLoading) {
        return <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh", width: "98vw" }}><Loading /> </div>
    }

    return (
        <>
            {searchData.length > 0 ? <div className='text-capitalize d-flex flex-column align-items-center'>
                <h3 className='my-3'>Showing {searchData.length} results for "{searchResult}" </h3>

                <PCcards data={searchData} query={true} />

                <div className={searchData.length === 1 && `position-fixed bottom-0`}><Footer /></div>
            </div> : <div className=' d-flex flex-column align-items-center'>
                <h3 className='my-4'>Could not found results for "{searchResult}" </h3>

                <div className='position-fixed bottom-0'> <Footer /> </div>
            </div>}
        </>
    )
}

export default QueryPage