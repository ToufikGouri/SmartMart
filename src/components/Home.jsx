import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAll } from '../functions/fetchData'

const Home = () => {

    const dispatch = useDispatch();
    const data = useSelector(state => state)
    console.log(data);

    return (
        <>
            <h1>Home page</h1>
            <button onClick={()=> dispatch(fetchAll())} className="btn btn-outline-success">Click me</button>
        </>
    )
}

export default Home

// api docs: https://dummyjson.com/docs/products
// api (30 products): https://dummyjson.com/products
// api (all products): https://dummyjson.com/products?limit=0
// api (categories): https://dummyjson.com/products/categories

