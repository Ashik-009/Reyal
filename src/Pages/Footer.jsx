import React from 'react';
import { Link } from 'react-router-dom';

// 💳 IMPORT YOUR SSL IMAGE HERE (Make sure the path matches your project structure!)
import sslImage from '../Images/SSL image.png';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-gray-400 py-16 px-6 lg:px-12 border-t border-white/10 font-sans mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

        {/* Column 1: OUR COMPANY */}
        <div>
          <h4 className="text-white text-sm font-bold tracking-[0.2em] uppercase mb-6">Our Company</h4>
          <ul className="flex flex-col gap-3">
            <li><Link to="/about" className="text-[11px] sm:text-xs tracking-wider hover:text-yellow-500 transition-colors">About Reyal</Link></li>
            <li><Link to="/terms" className="text-[11px] sm:text-xs tracking-wider hover:text-yellow-500 transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="text-[11px] sm:text-xs tracking-wider hover:text-yellow-500 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/refunds" className="text-[11px] sm:text-xs tracking-wider hover:text-yellow-500 transition-colors">Refund & Return Policy</Link></li>
            <li><Link to="/intellectual-property" className="text-[11px] sm:text-xs tracking-wider hover:text-yellow-500 transition-colors">Intellectual Property Claims</Link></li>
          </ul>
        </div>

        {/* Column 2: CUSTOMER SERVICE */}
        <div>
          <h4 className="text-white text-sm font-bold tracking-[0.2em] uppercase mb-6">Customer Service</h4>
          <ul className="flex flex-col gap-3">
            <li><Link to="/how-to-order" className="text-[11px] sm:text-xs tracking-wider hover:text-yellow-500 transition-colors">How to order</Link></li>
            <li><Link to="/billing-payments" className="text-[11px] sm:text-xs tracking-wider hover:text-yellow-500 transition-colors">Billing & Payments</Link></li>
            <li><Link to="/track-orders" className="text-[11px] sm:text-xs tracking-wider hover:text-yellow-500 transition-colors">Track Your Orders</Link></li>
            <li><Link to="/replacement-policy" className="text-[11px] sm:text-xs tracking-wider hover:text-yellow-500 transition-colors">Replacement Policy</Link></li>
          </ul>
        </div>

        {/* Column 3: CONNECT WITH US */}
        <div>
          <h4 className="text-white text-sm font-bold tracking-[0.2em] uppercase mb-6">Connect With Us</h4>
          <ul className="flex flex-col gap-3">
            <li><a href="https://www.facebook.com/ReyaalBD" className="text-[11px] sm:text-xs tracking-wider hover:text-yellow-500 transition-colors">Facebook</a></li>
            <li><a href="#" className="text-[11px] sm:text-xs tracking-wider hover:text-yellow-500 transition-colors">Twitter</a></li>
            <li><a href="https://www.instagram.com/reyal.bd/" className="text-[11px] sm:text-xs tracking-wider hover:text-yellow-500 transition-colors">Instagram</a></li>
            <li><a href="#" className="text-[11px] sm:text-xs tracking-wider hover:text-yellow-500 transition-colors">YouTube</a></li>
          </ul>
        </div>

        {/* Column 4: CONTACT US */}
        <div>
          <h4 className="text-white text-sm font-bold tracking-[0.2em] uppercase mb-6">Contact Us</h4>
          <div className="flex flex-col gap-4 text-[11px] sm:text-xs tracking-wider leading-relaxed">
            <div>
              <strong className="text-white block mb-1 tracking-[0.2em]">REYAL</strong>
              <p>Nurjahan Road, Mohammadpur, Dhaka-1207</p>
            </div>

            <div>
              <strong className="text-white block mb-1">HOTLINE NO.:</strong>
              <p>+88 0171 00 00 000</p>
              <p>+88 0172 00 00 000</p>
              <p>+88 0173 00 00 000</p>
              <p>+88 0174 00 00 000</p>
            </div>

            <div>
              <strong className="text-white block mb-1">TNT NO.:</strong>
              <p>+88 02 800 8005</p>
            </div>

            <div>
              <strong className="text-white block mb-1">MAIL US:</strong>
              <a href="mailto:customer@reyal.com.bd" className="block hover:text-yellow-500 transition-colors">customer@reyal.shop</a>
              <a href="mailto:online@reyal.com.bd" className="block hover:text-yellow-500 transition-colors">online@reyal.shop</a>
            </div>
          </div>
        </div>

      </div>

      {/* 💳 NEW: SECURE PAYMENT GATEWAYS SECTION */}
      <div className="max-w-7xl mx-auto mt-16 pt-10 border-t border-white/10 flex justify-center">
        <div className="bg-white/95 py-4 px-6 sm:px-10 rounded-xl w-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-300">
          <img 
            src={sslImage} 
            alt="Secure Payment Gateways Verified by SSLCommerz" 
            className="w-full max-w-5xl h-auto object-contain mix-blend-multiply" 
          />
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-8 flex justify-center items-center">
        <p className="text-[10px] tracking-widest text-gray-500 uppercase">© {new Date().getFullYear()} <b>REYAL</b> All Rights Reserved.</p>
      </div>
      <div className="max-w-7xl mx-auto mt-2 flex justify-center items-center">
        <p className="text-[10px] tracking-widest text-gray-500">Desinged & Developed by <b>@F.TradePRO<sup>TM</sup> </b> </p>
      </div>
    </footer>
  );
};

export default Footer;