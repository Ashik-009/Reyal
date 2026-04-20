import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Import ALL your pages here
import Navbar from './Pages/Navbar'
import Help from './Pages/Help';
import Login from './Pages/Login'; 
import ForgotPassword from './Pages/ForgotPassword';

import Footer from './Pages/Footer';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refunds from './pages/Refunds';
import IntellectualProperty from './pages/IntellectualProperty';

import HowToOrder from './pages/HowToOrder';
import BillingPayments from './pages/BillingPayments';
import TrackOrders from './pages/TrackOrders';
import Replacement from './pages/Replacement';

// The new dynamic product pages!
import NewArrivals from './Pages/NewArrivals';
import CategoryPage from './Pages/CategoryPage';
import ProductDetail from './Pages/ProductDetail';
import CartDrawer from './Pages/CartDrawer';
import Checkout from './Pages/Checkout';
import Profile from './Pages/Profile';
import HomeHero from './Pages/HomeHero';
import Shop from './Pages/Shop';

// 🔍 NEW: Import the Search Results Page
import SearchResults from './Pages/SearchResults';

const App = () => {
  const location = useLocation();

    return (
      <div className="relative min-h-screen flex flex-col bg-neutral-950 font-sans">
        
        <Navbar />
        <CartDrawer />

        <div className="grow">
          <Routes>
            {/* Standard Pages */}
            <Route path="/" element={<HomeHero />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/collections/:categoryName" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shop" element={<Shop />} />

            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refunds" element={<Refunds />} />
            <Route path="/intellectual-property" element={<IntellectualProperty />} />

            <Route path="/how-to-order" element={<HowToOrder />} />
            <Route path="/billing-payments" element={<BillingPayments />} />
            <Route path="/track-orders" element={<TrackOrders />} />
            <Route path="/replacement-policy" element={<Replacement />} />
            
            {/* 🔍 NEW: Search Results Route */}
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>

        {location.pathname !== '/' && <Footer />}

      </div>
  );
};

export default App;