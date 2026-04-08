import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [shippingRate] = useState(120); // Flat shipping rate of ৳120
  const [isProcessing, setIsProcessing] = useState(false);

  // If the cart is empty, send them back to the home page
  useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      navigate('/');
    }
  }, [items, navigate, isProcessing]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate a network request to process the order
    setTimeout(() => {
      alert("Order placed successfully! Thank you for shopping with REYAL.");
      dispatch(clearCart());
      navigate('/');
    }, 1500);
  };

  if (items.length === 0) return null; // Prevents flashing the checkout UI before redirect

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-[0.15em] uppercase mb-10 border-b border-gray-800 pb-6">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Shipping Form */}
          <div className="lg:col-span-7">
            <h2 className="text-lg font-bold text-white tracking-widest uppercase mb-6">Shipping Information</h2>
            
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">FIRST NAME</label>
                  <input type="text" required className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">LAST NAME</label>
                  <input type="text" required className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">PHONE NUMBER</label>
                <input type="tel" required className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">FULL ADDRESS</label>
                <input type="text" placeholder="House/Flat No, Street, Area" required className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" required className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors" />
                  <input type="text" placeholder="Postal Code" required className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors" />
                </div>
              </div>

              <h2 className="text-lg font-bold text-white tracking-widest uppercase mt-4 mb-2">Payment Method</h2>
              <div className="bg-neutral-900 border border-gray-800 rounded-lg p-4 flex items-center gap-4">
                <input type="radio" id="cod" name="payment" defaultChecked className="accent-[#cc0000] w-4 h-4 cursor-pointer" />
                <label htmlFor="cod" className="text-sm font-bold tracking-widest text-white uppercase cursor-pointer">Cash on Delivery (COD)</label>
              </div>
            </form>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-900 border border-gray-800 rounded-xl p-6 sm:p-8 sticky top-32">
              <h2 className="text-lg font-bold text-white tracking-widest uppercase mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto hide-scroll">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="relative w-16 h-20 bg-black rounded overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute top-0 right-0 bg-gray-500/80 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-bl font-bold backdrop-blur-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-white text-xs font-bold tracking-wide uppercase">{item.name}</h3>
                      <p className="text-gray-400 text-[10px] font-bold tracking-widest">SIZE: {item.size}</p>
                    </div>
                    <p className="text-white text-sm font-bold tracking-widest shrink-0">
                      ৳ {item.totalPrice.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-800 pt-6 flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 tracking-widest font-bold">SUBTOTAL</span>
                  <span className="text-white font-bold tracking-widest">৳ {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 tracking-widest font-bold">SHIPPING</span>
                  <span className="text-white font-bold tracking-widest">৳ {shippingRate}</span>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-6 pt-6 flex justify-between items-center mb-8">
                <span className="text-base font-black text-white tracking-[0.2em] uppercase">Total</span>
                <span className="text-2xl font-black text-yellow-500 tracking-widest">
                  ৳ {(totalAmount + shippingRate).toLocaleString()}
                </span>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={isProcessing}
                className="w-full bg-[#cc0000] text-white font-black tracking-[0.2em] text-sm uppercase py-5 rounded-lg hover:bg-[#ff1a1a] transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>

        </div>
      </div>
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Checkout;