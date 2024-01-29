import React, { useState } from 'react'
import { account } from '../appwrite/appwriteConfig'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userDetails } from '../functions/fetchData'

const Login = () => {

    const [showpass, setShowpass] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            await account.createEmailSession(user.email, user.password)
            navigate("/")
        } catch (error) { }
        finally {
            dispatch(userDetails())
        }
    }

    return (
        <div className="authContainer container">
            <h2 className='text-white text-center my-4'>Login</h2>
            {/* <form className='text-white d-flex flex-column align-items-center' action='#' method='POST'> */}
            <form className='text-white d-flex flex-column align-items-center'>
                <div className="mb-4 mx-5">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} id="email" name='email' aria-describedby="emailHelp" placeholder="Type your username" />
                </div>
                <div className="mb-4 mx-5 position-relative">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type={showpass ? "text" : "password"} className="form-control " value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} id="password" name='password' placeholder='Type your password' />
                    <i onClick={() => setShowpass(!showpass)} className={`fa-regular fa-eye${showpass ? "" : "-slash"} eyeLogo loginLink mb-1`}></i>
                    <Link className='text-light position-absolute text-decoration-none end-0 loginLink'>Forgot password?</Link>
                </div>
                <button onClick={loginUser} type="submit" className="btn btn-outline-success my-5" >Login</button>
            </form>

            <div className="text-center">
                <p>Or continue with</p>
                <div>
                    <i className="fa-brands fa-google mx-2 text-dark bg-light p-1 rounded-circle loginLink"></i>
                    <i className="fa-brands fa-facebook mx-2 text-dark bg-light p-1 rounded-circle loginLink"></i>
                    <i className="fa-brands fa-twitter mx-2 text-dark bg-light p-1 rounded-circle loginLink"></i>
                </div>
                <p className='my-4'>Don't have an account? <Link to="/signup" className='text-success text-decoration-none loginLink'>Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login