import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import CardImage from '../Images/Pay-online.png'
import Cashondelivery from '../Images/COD-removebg-preview.png'
import Bkash from '../Images/bkash-logo.png'

const Checkout = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // 🚚 Delivery States
  const [shippingFee, setShippingFee] = useState(60); 
  const [deliveryMethod, setDeliveryMethod] = useState('Inside Dhaka - Regular Delivery');
  
  // 💳 NEW: Payment & Agreement States
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryOptions = [
    { id: 'regular-dhaka', name: 'Inside Dhaka - Regular Delivery', fee: 60, time: 'Delivery within 72 Hours' },
    { id: 'express-dhaka', name: 'Inside Dhaka - Express Delivery', fee: 150, time: 'Delivery within 24 Hours' },
    { id: 'regular-outside', name: 'Outside Dhaka - Regular Delivery', fee: 120, time: 'Delivery within 3-7 Days' },
  ];

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postalCode: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      navigate('/');
    }
  }, [items, navigate, isProcessing]);

  useEffect(() => {
    const token = localStorage.getItem('reyal_token');
    if (token) {
      fetch('http://localhost:5000/api/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          const nameParts = data.fullName ? data.fullName.split(' ') : [''];
          setFormData(prev => ({
            ...prev,
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            email: data.email || '',
            phone: data.mobile || ''
          }));
        }
      })
      .catch(err => console.log("Proceeding as guest."));
    }
  }, []);

  // 🔀 UPDATED: Split Logic for COD vs Online Payment
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    // Safety check just in case HTML validation fails
    if (!agreedToTerms) {
      toast.error('You must agree to the Terms & Conditions to proceed.');
      return;
    }

    setIsProcessing(true);
    const toastId = toast.loading(paymentMethod === 'Cash on Delivery' ? 'Securely placing your order...' : `Redirecting to ${paymentMethod}...`);

    try {
      const orderData = {
        customerInfo: formData,
        orderItems: items,
        subtotal: totalAmount,
        shippingFee: shippingFee,
        totalAmount: totalAmount + shippingFee, 
        paymentMethod: paymentMethod, 
        status: 'Pending',
      };

      const token = localStorage.getItem('reyal_token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      if (paymentMethod === 'Cash on Delivery') {
        // --- 🚚 COD FLOW (Saves immediately) ---
        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Failed to place order');

        toast.success(`Order placed successfully! ID: ${data._id.slice(-8)}`, { id: toastId });
        
        dispatch(clearCart());
        navigate('/');

      } else {
        // --- 💳 ONLINE PAYMENT FLOW (bKash or Card Gateway) ---
        
        // 1. Tell the backend to initialize a payment session
        // Both options go to the same aggregator!
        const endpoint = 'http://localhost:5000/api/payment/sslcommerz/create';

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(orderData), // Send the order details to hold in cache
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to initialize payment');

        // 2. Redirect the user to the secure payment URL provided by your backend
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl; 
        } else {
          throw new Error('No payment URL received from gateway.');
        }
      }

    } catch (error) {
      console.error("Error submitting order: ", error);
      toast.error(error.message || "Failed to process request. Please try again.", { id: toastId });
      setIsProcessing(false); // Only reset if it failed, so they don't double click during redirect
    }
  };

  if (items.length === 0) return null; 

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 px-6 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-[0.15em] uppercase mb-10 border-b border-gray-800 pb-6">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Shipping & Payment Form */}
          <div className="lg:col-span-7">
            <h2 className="text-lg font-bold text-white tracking-widest uppercase mb-6">Shipping Information</h2>
            
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
              {/* --- Address Fields --- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">FIRST NAME</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">LAST NAME</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">EMAIL ADDRESS</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">PHONE NUMBER</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-400 mb-2">FULL ADDRESS</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="House/Flat No, Street, Area" required className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" required className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors" />
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} placeholder="Postal Code" required className="w-full bg-black/50 border border-gray-800 focus:border-yellow-500 text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors" />
                </div>
              </div>

              {/* 🚚 SELECT DELIVERY OPTION */}
              <div className="mt-4 border-t border-gray-800 pt-8">
                <h3 className="text-xs font-black tracking-[0.2em] text-white uppercase mb-6">Select Delivery Option</h3>
                <div className="flex flex-col gap-4">
                  {deliveryOptions.map((option) => (
                    <label key={option.id} className={`flex items-start gap-4 p-5 rounded-xl border cursor-pointer transition-all duration-300 ${shippingFee === option.fee ? 'border-[#cc0000] bg-[#cc0000]/5' : 'border-gray-800 bg-black/30 hover:border-gray-600'}`}>
                      <input type="radio" name="deliveryOption" value={option.fee} checked={shippingFee === option.fee} onChange={() => { setShippingFee(option.fee); setDeliveryMethod(option.name); }} className="mt-1 w-4 h-4 accent-[#cc0000] cursor-pointer shrink-0" />
                      <div className="flex flex-col">
                        <p className="text-sm font-bold text-white tracking-wide">{option.name} : <span className="text-[#cc0000]">Tk. {option.fee}</span></p>
                        <p className="text-[10px] text-gray-500 tracking-widest font-bold mt-1.5 uppercase">({option.time})</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 💳 PAYMENT OPTIONS */}
              <div className="mt-4 border-t border-gray-800 pt-8">
                <h3 className="text-xs font-black tracking-[0.2em] text-white uppercase mb-6">Payment Option</h3>
                
                {/* Checkbox for Terms */}
                <div className="flex items-start gap-3 mb-6">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#cc0000] cursor-pointer shrink-0" 
                  />
                  <label htmlFor="terms" className="text-sm font-bold text-gray-300 cursor-pointer leading-relaxed">
                    I agree to the{' '}
                    <Link 
                      to="/terms" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#cc0000] hover:underline hover:text-red-400"
                      >
                      Terms & Conditions
                    </Link>
                    ,{' '}
                    <Link 
                      to="/privacy" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#cc0000] hover:underline hover:text-red-400"
                      >
                      Privacy Policy
                    </Link>
                    {' '}&{' '}
                    <Link 
                      to="/refunds" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#cc0000] hover:underline hover:text-red-400"
                      >
                      Refund & Return Policy
                    </Link>
                  </label>
                </div>

                {/* Payment Selection Box */}
                <div className="flex flex-col border border-gray-800 rounded-xl overflow-hidden bg-black/30">
                  
                  {/* Option 1: bKash */}
                  <label className={`flex items-center justify-between p-5 border-b border-gray-800 cursor-pointer transition-colors ${paymentMethod === 'bKash' ? 'bg-[#cc0000]/10' : 'hover:bg-white/5'}`}>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" value="bKash" checked={paymentMethod === 'bKash'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 accent-[#cc0000] cursor-pointer" />
                      <span className="text-sm font-bold tracking-widest text-white uppercase">bKash</span>
                    </div>
                    <div>
                      <img src={Bkash} className="h-6 w-auto bg-white px-1 rounded-sm object-contain" />
                    </div>
                    
                  </label>

                  {/* Option 2: Pay Online */}
                  <label className={`flex items-center justify-between p-5 border-b border-gray-800 cursor-pointer transition-colors ${paymentMethod === 'Pay Online' ? 'bg-[#cc0000]/10' : 'hover:bg-white/5'}`}>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" value="Pay Online" checked={paymentMethod === 'Pay Online'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 accent-[#cc0000] cursor-pointer" />
                      <span className="text-sm font-bold tracking-widest text-white uppercase">Pay Online</span>
                    </div>
                    <div>
                      <img src={CardImage} className="h-6 w-auto bg-white px-1 rounded-sm object-contain" />
                    </div>
                  </label>

                  {/* Option 3: Cash on Delivery */}
                  <label className={`flex items-center justify-between p-5 cursor-pointer transition-colors ${paymentMethod === 'Cash on Delivery' ? 'bg-[#cc0000]/10' : 'hover:bg-white/5'}`}>
                    <div className="flex items-center gap-4">
                      <input type="radio" name="payment" value="Cash on Delivery" checked={paymentMethod === 'Cash on Delivery'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4 accent-[#cc0000] cursor-pointer" />
                      <span className="text-sm font-bold tracking-widest text-white uppercase">Cash on Delivery</span>
                    </div>
                     <div>
                      <img src={Cashondelivery} className="h-6 w-auto bg-white px-1 rounded-sm object-contain" />
                    </div>
                  </label>

                </div>
              </div>

            </form>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-900 border border-gray-800 rounded-xl p-6 sm:p-8 sticky top-32">
              <h2 className="text-lg font-bold text-white tracking-widest uppercase mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-4 mb-6 max-h-75 overflow-y-auto hide-scroll">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="relative w-16 h-20 bg-black rounded overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute top-0 right-0 bg-gray-500/80 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-bl font-bold backdrop-blur-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="grow">
                      <h3 className="text-white text-xs font-bold tracking-wide uppercase">{item.name}</h3>
                      <p className="text-gray-400 text-[10px] font-bold tracking-widest">SIZE: {item.size}</p>
                    </div>
                    <p className="text-white text-sm font-bold tracking-widest shrink-0">
                      ৳ {item.totalPrice?.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-800 pt-6 flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 tracking-widest font-bold">SUBTOTAL</span>
                  <span className="text-white font-bold tracking-widest">৳ {totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 tracking-widest font-bold">SHIPPING</span>
                  <span className="text-white font-bold tracking-widest">৳ {shippingFee}</span>
                </div>
              </div>

              <div className="border-t border-gray-800 mt-6 pt-6 flex justify-between items-center mb-8">
                <span className="text-base font-black text-white tracking-[0.2em] uppercase">Total</span>
                <span className="text-2xl font-black text-yellow-500 tracking-widest">
                  ৳ {(totalAmount + shippingFee).toLocaleString()}
                </span>
              </div>

              {/* 🛑 ENFORCED: Button is disabled until they agree to the terms */}
              <button 
                type="submit" 
                form="checkout-form"
                disabled={isProcessing || !agreedToTerms}
                className="w-full bg-[#cc0000] text-white font-black tracking-[0.2em] text-sm uppercase py-5 rounded-lg hover:bg-[#ff1a1a] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
              
              {!agreedToTerms && (
                <p className="text-[#cc0000] text-center text-[10px] font-bold tracking-widest mt-4 uppercase">
                  * Please agree to the terms to proceed
                </p>
              )}
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