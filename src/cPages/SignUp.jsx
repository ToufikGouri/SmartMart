import React, { useState } from 'react'
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

        promise.then(
            function (response) {
                console.log(response);
                navigate("/")   //Success
            },
            function (error) {
                console.log(error);    //Failed
            }
        )

    }


    return (
        <div className="container authContainer text-white" style={{ height: "595px" }}>
            <h2 className='text-center my-4'>Sign Up</h2>
            {/* <form className='text-white d-flex flex-column align-items-center' action='#' method='POST'> */}
            <form className='text-white d-flex flex-column align-items-center'>
                <div className="mb-2">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={(e) => setUser({ ...user, name: e.target.value })} required placeholder='Enter your name' />
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={(e) => setUser({ ...user, email: e.target.value })} required placeholder='Enter your email' />
                </div>
                <div className="mb-2 position-relative">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type={showpass ? "text" : "password"} className="form-control" id="password" name='password' onChange={(e) => setUser({ ...user, password: e.target.value })} minLength={5} required placeholder='Enter your password' />
                    <i onClick={() => setShowpass(!showpass)} className={`fa-regular fa-eye${showpass ? "" : "-slash"} eyeLogo loginLink mb-1`}></i>
                </div>
                <button onClick={signupUser} type="submit" className="btn btn-outline-success my-4">Submit</button>
            </form>

            <div className="text-center">
                <p>Or Sign up with</p>
                <div>
                    <i className="fa-brands fa-google mx-2 text-dark bg-light p-1 rounded-circle loginLink"></i>
                    <i className="fa-brands fa-facebook mx-2 text-dark bg-light p-1 rounded-circle loginLink"></i>
                    <i className="fa-brands fa-twitter mx-2 text-dark bg-light p-1 rounded-circle loginLink"></i>
                </div>
                <p className='my-2'>Already have an account? <Link to="/login" className='text-success text-decoration-none loginLink'>Login</Link> </p>
            </div>
        </div>
    )
}

export default SignUp