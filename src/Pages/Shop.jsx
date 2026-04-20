import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch ALL products from the database
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        // Optional: Reverse the array so the newest products show up first!
        setProducts(data.reverse());
      })
      .catch(err => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white tracking-widest text-sm uppercase">
        Loading Collection...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 px-6 lg:px-12 pb-20 font-sans">
      
      {/* Page Header */}
      <div className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-widest uppercase mb-2">
            Shop All
          </h1>
          <p className="text-gray-400 tracking-widest text-xs uppercase font-bold">
            The Complete Collection
          </p>
        </div>
        <span className="text-yellow-500 font-black tracking-widest text-xs uppercase">
          {products.length} Items
        </span>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="border border-white/10 rounded-xl p-12 text-center">
          <p className="text-gray-500 tracking-widest text-sm uppercase font-bold">Inventory is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {products.map(product => {
            const totalStock = product.sizes ? product.sizes.reduce((sum, item) => sum + item.stock, 0) : 0;
            const isOutOfStock = totalStock === 0;

            return (
              <Link key={product._id} to={`/product/${product._id}`} className="group cursor-pointer relative">
                
                {/* Out of Stock Badge */}
                {isOutOfStock && (
                  <div className="absolute top-2 left-2 z-10 bg-black/80 backdrop-blur-sm text-[#cc0000] text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-sm border border-[#cc0000]/30">
                    Sold Out
                  </div>
                )}
                
                {/* New Arrival Badge */}
                {product.isNewArrival && !isOutOfStock && (
                  <div className="absolute top-2 left-2 z-10 bg-white text-black text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-sm">
                    New
                  </div>
                )}

                {/* Dual Image Container */}
                <div className="relative aspect-3/4 bg-neutral-900 overflow-hidden mb-4">
                  <img 
                    src={product.image1} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <img 
                    src={product.image2 || product.image1} 
                    alt={`${product.name} hover`} 
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 transform group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-gray-300 group-hover:text-white transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-yellow-500 font-bold tracking-widest text-sm">
                    ৳ {product.price?.toLocaleString()}
                  </p>
                </div>

              </Link>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default Shop;