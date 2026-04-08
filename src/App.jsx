import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Import ALL your pages here
import Navbar from './Pages/Navbar';
import Hero from './Pages/Hero';
import Help from './Pages/Help';
import Login from './Pages/Login'; 
import ForgotPassword from './Pages/ForgotPassword';
import Footer from './Pages/Footer';

// The new dynamic product pages!
import NewArrivals from './Pages/NewArrivals';
import CategoryPage from './Pages/CategoryPage';
import ProductDetail from './Pages/ProductDetail';
import CartDrawer from './Pages/CartDrawer';
import Checkout from './Pages/Checkout';

// I left these commented out just in case you still have them, 
// but you shouldn't need them now that we have CategoryPage!
// import ManCategories from './Pages/ManCategories';
// import WomenCategories from './Pages/WomenCategories';

const App = () => {
  const location = useLocation();

    return (
      <div className="relative min-h-screen flex flex-col bg-neutral-950 font-sans">
        
        <Navbar />
        <CartDrawer />

        <div className="grow">
          <Routes>
            {/* Standard Pages */}
            <Route path="/" element={<Hero />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/collections/:categoryName" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>

        {location.pathname !== '/' && <Footer />}

      </div>
  );
};

export default App;