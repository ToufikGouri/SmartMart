import React, { useEffect, useState } from 'react'
import { account } from '../appwrite/appwriteConfig'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const SignUp = () => {

    const navigate = useNavigate()
    const [showpass, setShowpass] = useState(false)
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const signupUser = async (e) => {
        e.preventDefault()

        const promise = account.create(
            uuidv4(),
            user.email,
            user.password,
            user.name
        );
        const myModal2 = new window.bootstrap.Modal(document.getElementById("exampleModal4"));
        myModal2.show();
    }



    return (
        <>
            {/* Modal for login */}
            <div className="modal fade" id="exampleModal4" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content" style={{ backgroundColor: "#212121" }}>
                        <div className="modal-header border-0">
                            {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Remove Item</h1> */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ filter: "invert(1)" }}></button>
                        </div>
                        <div className="modal-body mb-1 fs-5">
                            You'll need to login after creating account.
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => navigate("/login")} className="btn btn-primary" data-bs-dismiss="modal">Login</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container authContainer text-white" style={{ height: "595px" }}>

                <h2 className='text-center my-4'>Sign Up</h2>
                {/* <form className='text-white d-flex flex-column align-items-center' action='#' method='POST'> */}
                <form className='text-white d-flex flex-column align-items-center ' onSubmit={(e) => signupUser(e)}>
                    <div className="mb-2">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={(e) => setUser({ ...user, name: e.target.value })} required placeholder='Enter your name   (min 5 chars)' />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={(e) => setUser({ ...user, email: e.target.value })} required placeholder='Enter your email' />
                    </div>
                    <div className="mb-2 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type={showpass ? "text" : "password"} className="form-control" id="password" name='password' onChange={(e) => setUser({ ...user, password: e.target.value })} minLength={5} required placeholder='Enter your password   (min 8 chars)' />
                        <i onClick={() => setShowpass(!showpass)} className={`fa-regular fa-eye${showpass ? "" : "-slash"} eyeLogo loginLink mb-1`}></i>
                    </div>
                    <button type="submit" className={`btn btn-outline-success my-4 ${(user.name.length < 5 || user.password.length < 8 || user.email.length < 5) ? "disabled" : ""}`}>Submit</button>

                </form>

                <div className="text-center">
                    <p className='d-none'>Or Sign up with</p>
                    <div className='d-none'>
                        <i className="fa-brands fa-google mx-2 text-dark bg-light p-1 rounded-circle loginLink"></i>
                        <i className="fa-brands fa-facebook mx-2 text-dark bg-light p-1 rounded-circle loginLink"></i>
                        <i className="fa-brands fa-twitter mx-2 text-dark bg-light p-1 rounded-circle loginLink"></i>
                    </div>
                    <p className='my-2'>Already have an account? <Link to="/login" className='text-success text-decoration-none loginLink'>Login</Link> </p>
                </div>
            </div>
        </>
    )
}

export default SignUp