import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to the top of the page when it loads
    window.scrollTo(0, 0);
    setLoading(true);

    // Fetch the master database
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        // FILTER MAGIC: Only grab items where "isNew" is true!
        const newItems = data.filter(item => item.isNew === true);
        setProducts(newItems);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 px-6 lg:px-12 font-sans">
      
      {/* Header & Breadcrumbs */}
      <div className="max-w-400 mx-auto mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[0.15em] uppercase mb-4">
          NEW ARRIVALS
        </h1>
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
          <Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">New Arrivals</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-400 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16">
        
        {loading ? (
          <p className="text-white text-center col-span-full">Loading New Arrivals...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col cursor-pointer">
              
              <div className="relative aspect-3/4 w-full overflow-hidden bg-neutral-900 rounded-lg mb-4">
                {/* Primary Image */}
                <img 
                  src={product.image1} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" 
                />
                {/* Hover Image */}
                <img 
                  src={product.image2} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
                />
                
                {/* 'New' Badge - Hardcoded here since everything on this page is new! */}
                <div className="absolute top-3 left-3 bg-white text-black text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-sm">
                  New
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <h3 className="text-white text-xs sm:text-sm font-medium tracking-wide group-hover:text-yellow-500 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-xs font-bold tracking-widest mt-1">
                  {product.price}
                </p>
              </div>

            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-500 tracking-widest uppercase">No new arrivals found right now.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default NewArrivals;