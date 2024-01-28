import React, { useState } from 'react'
import '../css/Cart.css'
import CartLogo from '../CartLogo.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer'
import { addToCart, cartItemCount, removeAll, removeFromCart } from '../functions/fetchData'
import Loading from '../components/Loading'

const Cart = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cartItems);
    const isLoading = useSelector(state => state.isLoading);
    const [addAlert, setAddAlert] = useState(false)
    const [removeAlert, setRemoveAlert] = useState(false)
    const [itemToRemove, setItemToRemove] = useState(null)
    const itemCount = useSelector(cartItemCount)

    const addHandle = (item) => {
        dispatch(addToCart(item));

        setAddAlert(true)
        setTimeout(() => { setAddAlert(false) }, 800);
    }
    const removeHandle = (item) => {
        if (item.quantity > 1) {
            dispatch(removeFromCart(item));

            setRemoveAlert(true)
            setTimeout(() => { setRemoveAlert(false) }, 800);
        }
    }
    const removeAllHandle = (item) => {
        dispatch(removeAll(item));

        setRemoveAlert(true)
        setTimeout(() => { setRemoveAlert(false) }, 800);
    }

    const totalPrice = itemCount > 0 && cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    const totalDiscount = itemCount > 0 && Math.round(totalPrice / 4)

    if (isLoading) {
        return <div className='d-flex justify-content-center align-items-center' style={{ height: "90vh", width: "98vw" }}><Loading /></div>
    }

    return (
        <>
            {/* Modal */}

            {/* For place order */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ backgroundColor: "#212121" }}>
                        <div className="modal-header border-0">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">This Feature Is Coming Soon <i className="fa-regular fa-face-laugh-beam fs-4 mx-1"></i> </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ filter: "invert(1)" }}></button>
                        </div>
                        <div className="modal-body mb-1">
                            Till then please explore the website & have fun <i className="fa-regular fa-face-smile-beam fs-5 mx-1"></i>
                        </div>
                        <div className="modal-footer border-0">
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                            <button type="button" className="btn btn-primary px-4 py-2" data-bs-dismiss="modal">Okay</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* For remove all items */}
            <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ backgroundColor: "#212121" }}>
                        <div className="modal-header border-0">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Remove Item</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ filter: "invert(1)" }}></button>
                        </div>
                        <div className="modal-body mb-1">
                            Are you sure you want to remove this item?
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={() => removeAllHandle(itemToRemove)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Remove</button>
                        </div>
                    </div>
                </div>
            </div>

            {cartItems.length < 1 ? (
                // If cart in empty
                <div>
                    <div className='cartEmptyParent'>
                        <div className="cartEmptyImg">
                            <img src={CartLogo} alt="" />
                        </div>
                        <h2>Your Cart Is Empty</h2>
                        <h4>Add Items To It Now</h4>
                        <button onClick={() => navigate("/")} className="btn btn-light">Shop Now</button>
                    </div>
                </div>
            ) :
                // If cart has products
                (
                    <div>
                        <div className='position-sticky top-0' style={{ height: "50px" }}>
                            <div className={`myAlert d-${addAlert ? "" : "none"}`}>Item Added Successfully <i className="fa-regular fa-circle-check mx-2"></i></div>
                            <div className={`myAlert d-${removeAlert ? "" : "none"} bg-secondary`}>Item Removed Successfully <i className="fa-regular fa-circle-check mx-2"></i></div>
                        </div>

                        <div className="row my-2 mx-0"> {/*Row gets x margin by default in bootstrap keep m-0*/}

                            <div className="col-md-8">
                                {cartItems.map((val, ind) => {
                                    return <div key={ind} className='d-flex flex-column align-items-center'>
                                        <div className='row cartCard'>
                                            <div className="col-md-6 d-flex justify-content-center">
                                                <div className="cartImgParent my-3">
                                                    <img src={val.images[3] || val.images[0]} alt="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 d-flex align-items-center">
                                                <div className="cartContent">
                                                    <h4 className='text-capitalize'>{val.title}</h4>
                                                    <h6 className='text-capitalize'>Seller: {val.brand}</h6>
                                                    <h5>Price ${val.price * val.quantity} <span className="text-myGreen fs-6">{Math.round9 = (val.discountPercentage)}% OFF</span></h5>
                                                    {val.stock < 51 ? <h6 className='text-info'>Hurry Up Only {val.stock} Left !!</h6> : <i className='d-block'>In Stock {val.stock}</i>}

                                                    <div className='cartCardBtn my-3'>
                                                        <div className='d-flex align-items-center'>
                                                            <i onClick={() => removeHandle(val)} className={`fa-solid fa-circle-minus fs-4 text-${val.quantity === 1 && "secondary"}`}></i>
                                                            <div className='mx-3'> {val.quantity} </div>
                                                            <i onClick={() => addHandle(val)} className="fa-solid fa-circle-plus fs-4"></i>

                                                        </div>
                                                        <button onClick={() => setItemToRemove(val)} type='button' className="btn removeBtn btn-outline-light" data-bs-toggle="modal" data-bs-target="#exampleModal2">Remove All</button>
                                                    </div>

                                                    <i>Delivery by {val.date}</i> {/*Fun fact: This "by" & price section last two lines are the only non-capitalize word in whole website*/}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}
                                <div className="d-flex justify-content-end align-items-center mb-3 placeOrderBtn">
                                    <button type='button' className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">PLACE ORDER</button>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="priceSection">
                                    <h3>PRICE DETAILS</h3>

                                    <hr />
                                    <div className='fs-5 x'>Price ({itemCount} items) <span>${totalPrice}</span></div>
                                    <div className='fs-5 x'>Discount <span>-${totalDiscount}</span></div>
                                    <div className='fs-5 x'>Delivery Charges <span><s>$40</s> <span className='text-myGreen'>Free</span></span></div>

                                    <hr />

                                    <h3 className='x'>Total Amount <span>${totalPrice - totalDiscount}</span> </h3>

                                    <hr />

                                    <div className='text-myGreen fs-5'>You will save <span className='fs-4'>${totalDiscount}</span> on this order</div>

                                    <div className='lh-base d-flex'><i className="fa-solid fa-shield-halved fs-4 me-2"></i> Safe and Secure Payments. Easy returns.100% Authentic products.</div>
                                </div>

                            </div>
                        </div>


                    </div>
                )}

            <div className={`${cartItems.length < 3 ? "footerAdjust" : " "}`}> <Footer /></div>
        </>
    )
}

export default Cart