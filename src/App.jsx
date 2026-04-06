import React from 'react';
import Navbar from './Pages/Navbar';
import Hero from './Pages/Hero';
import ManCategories from './Pages/ManCategories';
import WomenCategories from './Pages/WomenCategories';
// 1. Import the Footer!
import Footer from './Pages/Footer';
import Help from './Pages/Help';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';

const App = () => {
  return (
      // Added flex col to make sure footer pushes to the bottom
      <div className="relative min-h-screen flex flex-col bg-neutral-950 font-sans">

        <Navbar />

        {/* Content Area */}
        <div className="grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/man" element={<ManCategories />} />
            <Route path="/women" element={<WomenCategories/>} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            

          </Routes>
        </div>

        {/* 2. Add the Footer here, below the Routes! */}
        <Footer />

      </div>
  );
};

export default App;