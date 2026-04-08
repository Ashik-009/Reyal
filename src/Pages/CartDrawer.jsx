import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart, removeItem } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const dispatch = useDispatch();
  // Grab all the cart data from Redux
  const { items, totalQuantity, totalAmount, isCartOpen } = useSelector((state) => state.cart);

  return (
    <>
      {/* Dark Background Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-500 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
        onClick={() => dispatch(toggleCart())}
      ></div>

      {/* The Actual Drawer */}
      <div className={`fixed top-0 right-0 h-dvh w-full sm:w-112.5 bg-neutral-950 border-l border-white/10 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Drawer Header */}
        <div className="flex-none flex items-center justify-between p-6 sm:p-8 border-b border-gray-800">
          <h2 className="text-xl font-black tracking-[0.15em] text-white uppercase">
            Your Cart ({totalQuantity})
          </h2>
          <button onClick={() => dispatch(toggleCart())} className="text-gray-400 hover:text-yellow-500 transition-colors focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Drawer Body (Scrollable Items) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 hide-scroll">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <p className="text-gray-500 tracking-widest uppercase text-sm font-bold">Your cart is empty.</p>
              <button onClick={() => dispatch(toggleCart())} className="text-xs font-bold tracking-widest text-white border-b border-white hover:text-yellow-500 hover:border-yellow-500 pb-1 transition-colors uppercase">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4 bg-neutral-900 p-3 rounded-xl border border-white/5">
                  
                  {/* Item Image */}
                  <div className="w-24 h-32 shrink-0 bg-black rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Item Details */}
                  <div className="flex flex-col justify-between py-1 grow">
                    <div>
                      <h3 className="text-white text-xs font-bold tracking-wide uppercase leading-snug">{item.name}</h3>
                      <p className="text-gray-400 text-[10px] font-bold tracking-widest mt-1">SIZE: {item.size}</p>
                      <p className="text-gray-400 text-[10px] font-bold tracking-widest mt-1">QTY: {item.quantity}</p>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <p className="text-yellow-500 text-sm font-bold tracking-widest">
                        ৳ {item.totalPrice.toLocaleString()}
                      </p>
                      <button 
                        onClick={() => dispatch(removeItem({ id: item.id, size: item.size }))}
                        className="text-[10px] font-bold tracking-widest text-gray-500 hover:text-[#cc0000] uppercase transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer (Checkout) */}
        {items.length > 0 && (
          <div className="flex-none p-6 sm:p-8 border-t border-gray-800 bg-neutral-950">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-bold tracking-[0.2em] text-gray-400 uppercase">Subtotal</span>
              <span className="text-xl font-black text-white tracking-widest">৳ {totalAmount.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-gray-500 tracking-widest uppercase text-center mb-6">Shipping & taxes calculated at checkout</p>
            <Link 
              to="/checkout" 
              onClick={() => dispatch(toggleCart())}
              className="w-full block text-center bg-[#cc0000] text-white font-black tracking-[0.2em] text-sm uppercase py-5 rounded-lg hover:bg-[#ff1a1a] transition-colors"
            >
              Checkout
            </Link>
          </div>
        )}

      </div>

      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default CartDrawer;