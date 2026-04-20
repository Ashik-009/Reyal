import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TrackOrders = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 px-6 lg:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[0.15em] uppercase mb-12 text-center">
          Track Your Orders
        </h1>
        
        <div className="space-y-8 text-sm sm:text-base text-gray-400 leading-relaxed tracking-wide">
          <p>
            Waiting for your new wardrobe upgrade? You can easily keep an eye on your order's journey from our warehouse to your doorstep.
          </p>
          
          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">For Registered Users</h2>
          <p>
            If you placed your order while logged into your REYAL account, simply navigate to your <Link to="/profile" className="text-yellow-500 hover:text-white transition-colors">Account Dashboard</Link>. There, you can view your complete order history and check the real-time status (Pending, Processing, Shipped, or Delivered).
          </p>

          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Guest Checkout</h2>
          <p>
            If you checked out as a guest, please keep your Order ID handy. This ID was displayed on your screen after a successful checkout. If you need a status update, contact our customer support team with your Order ID, and we will provide you with the exact location of your package.
          </p>

          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Need Immediate Help?</h2>
          <p>
            If your order has exceeded the estimated delivery time, please reach out to our dispatch team immediately:
            <br /><br />
            <strong>Hotline:</strong> +88 0195 33 00 373<br />
            <strong>Email:</strong> customer@reyal.com.bd
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrders;