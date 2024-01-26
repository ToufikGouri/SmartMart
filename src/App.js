import Cart from './cPages/Cart';
import CheckDatabase from './cPages/CheckDatabase';
import Description from './cPages/Description';
import FeedBack from './cPages/FeedBack';
import Login from './cPages/Login';
import ProductCategories from './cPages/ProductCategories';
import Profile from './cPages/Profile';
import SignUp from './cPages/SignUp';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:id' element={<ProductCategories />} />
          <Route path='/description/:id' element={<Description />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/feedback' element={<FeedBack />} />
          <Route path='/check' element={<CheckDatabase />} />
          <Route path='*' element={<div>404: Page not found</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
