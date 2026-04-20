import React, { useEffect } from 'react';

const HowToOrder = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 px-6 lg:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[0.15em] uppercase mb-12 text-center">
          How To Order
        </h1>
        
        <div className="space-y-8 text-sm sm:text-base text-gray-400 leading-relaxed tracking-wide">
          <p>
            Ordering your favorite pieces from REYAL is designed to be seamless, secure, and fast. Follow these simple steps to complete your purchase.
          </p>
          
          <div className="space-y-6 mt-8">
            <div>
              <h3 className="text-white font-bold tracking-widest uppercase mb-2">1. Explore & Select</h3>
              <p>Browse our collections through the Shop menu. Once you find a product you love, select your preferred size and click the "Add to Cart" button.</p>
            </div>
            
            <div>
              <h3 className="text-white font-bold tracking-widest uppercase mb-2">2. Review Your Cart</h3>
              <p>Click the shopping bag icon in the top right corner of the screen to review your selected items. You can adjust quantities or remove items before proceeding.</p>
            </div>
            
            <div>
              <h3 className="text-white font-bold tracking-widest uppercase mb-2">3. Checkout Securely</h3>
              <p>Click "Checkout" and enter your shipping details. If you have a REYAL account, log in for a faster checkout experience. Select your preferred shipping method (Inside or Outside Dhaka).</p>
            </div>
            
            <div>
              <h3 className="text-white font-bold tracking-widest uppercase mb-2">4. Payment & Confirmation</h3>
              <p>Choose between Cash on Delivery or Pay Online (via SSLCommerz). Once your order is placed, you will receive an Order ID on your screen and a confirmation notification.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToOrder;