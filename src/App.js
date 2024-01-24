import Cart from './cPages/Cart';
import Description from './cPages/Description';
import ProductCategories from './cPages/ProductCategories';
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
          <Route path='*' element={<div>404: Page not found</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
