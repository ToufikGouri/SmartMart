import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


const PageNotFound = () => {

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {

    switch (location.pathname) {
      case "/": document.title = "SmartMart - Your home for online shopping"; break;
      case "/cart": document.title = "My Cart - SmartMart"; break;
      case "/feedback": document.title = "Feedback - SmartMart"; break;
      case "/login": document.title = "Login - SmartMart"; break;
      case "/signup": document.title = "Sign Up - SmartMart"; break;
      case "/category/:id": document.title = "Sign Up - SmartMart"; break;
      case "/signup": document.title = "Sign Up - SmartMart"; break;
      default: document.title = "Page not found - SmartMart"
    }

  }, [location.pathname])

  return (
    <>
      <div className='pnfParent text-center'>
        <div>
          <i className="fa-solid fa-4 "></i>
          <i className="fa-solid fa-magnifying-glass mx-2"></i>
          <i className="fa-solid fa-4 "></i>
        </div>

        <h3 className='mx-2'>The page you are looking for doesn't exist.</h3>
        <button onClick={() => navigate("/")} className="btn btn-light">Back to home</button>

      </div>
    </>
  )
}

export default PageNotFound