import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchAll } from '../functions/fetchData';
import Loading from '../components/Loading';
import '../css/cPage.css'

import PCcards from './PCcards';
import Footer from '../components/Footer'

const ProductCategories = () => {

  const allData = useSelector(state => state.allData)
  const isLoading = useSelector(state => state.isLoading)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  let productId = Number(id)  //Using Number instead of parseInt will save us from cases like "34af", as parseInt will still converts this value to a number but we don't want it in url parameter.

  useEffect(() => {
    if (productId < 0 || productId >= 100 || !Number.isInteger(productId)) { navigate("/notfound"); return }//If id is less than 1 or greater than 100 or not a valid number or is not a integer like 12.3 etc cases then redirect to 404 page.
    dispatch(fetchAll())
  }, [])

  if (productId !== 0) {
    productId--
  }

  const randoms = []
  while (randoms.length < 5) {
    let val = Math.round(Math.random() * 95)
    if (randoms.includes(val)) {
      continue
    }
    randoms.push(val)
  }

  const data = Object.keys(allData).length > 1 && allData.products


  const category = data.length > 1 && data.filter((val, ind) => val.category === data[productId].category)
  const randomData = data.length > 1 && data.filter((val, ind) => randoms.includes(ind))

  const topCarouselData = data.length > 1 && category[0]

  if (isLoading) {
    return <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh", width: "98vw" }}><Loading /></div>
  }

  return (
    <>
      <div>
        {data.length > 1 &&
          <div className='text-capitalize d-flex flex-column align-items-center'>
            <h2 className='my-4'>Products related To {topCarouselData.category}</h2>

            {/* Heading Card */}
            <div onClick={() => navigate(`/description/${topCarouselData.id}`)} className='row mb-4 pOutParent'>
              <div className="col-md-6 d-flex justify-content-center">
                <div className="pOutImgParent">
                  <img src={topCarouselData.images[3] || topCarouselData.images[0]} alt="" />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div className="pContent">
                  <h4>{topCarouselData.title}</h4>
                  <h5>Only From <span style={{ color: "#00d900" }}>${topCarouselData.price}</span></h5>
                  <h6>{(topCarouselData.description.length > 80 ? topCarouselData.description.slice(0, 80) + "..." : topCarouselData.description)}</h6>
                  <h5>Huge Discounts Up To <span className='text-warning'>{Math.round(topCarouselData.discountPercentage)}% OFF</span> </h5>
                  <i>In Stock {topCarouselData.stock}</i>
                </div>
              </div>
            </div>

            {/* Normal Cards */}
            <PCcards data={category} />

            <p className='w-75 border' />

            <h2>You Might Also Like</h2>

            <PCcards data={randomData} />

            {/* Generate fake reviews page too
              use chatgpt or https://usetrust.io/free-ai-testimonial-generator-tool/
              just on the keyword of product and company name leave ${} and get random data from
              product details
            */}

            <h3 className='m-3'>Can't Find The Item You are Looking For?</h3>
            <h5 className='mb-5'><Link className='text-success text-decoration-none' to="/">Click Me</Link> To Go Home Page Or Search For Your Favourite Items. </h5>

            <Footer />

          </div>
        }
      </div>
    </>
  )
}

export default ProductCategories 