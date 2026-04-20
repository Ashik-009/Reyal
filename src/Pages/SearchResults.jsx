import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || ''; // Grabs the search term from the URL
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all products, then filter them locally. 
    // (For massive stores, you'd do this filtering on the backend API instead!)
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = data.filter(product => 
          product.name.toLowerCase().includes(lowerCaseQuery) || 
          product.category.toLowerCase().includes(lowerCaseQuery)
        );
        setProducts(filtered);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white tracking-widest text-sm uppercase">Searching...</div>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 px-6 lg:px-12 pb-20 font-sans">
      
      <div className="mb-12">
        <h1 className="text-2xl sm:text-4xl font-black tracking-widest uppercase mb-2">
          Search Results
        </h1>
        <p className="text-gray-400 tracking-widest text-xs uppercase font-bold">
          {products.length} {products.length === 1 ? 'Result' : 'Results'} found for "{query}"
        </p>
      </div>

      {products.length === 0 ? (
        <div className="border border-white/10 rounded-xl p-12 text-center">
          <p className="text-gray-500 tracking-widest text-sm uppercase font-bold mb-4">No exact matches found.</p>
          <Link to="/shop" className="text-yellow-500 hover:text-white transition-colors tracking-widest text-xs uppercase font-black underline underline-offset-4">Browse All Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {products.map(product => (
            <Link key={product._id} to={`/product/${product._id}`} className="group cursor-pointer">
              <div className="relative aspect-3/4 bg-neutral-900 overflow-hidden mb-4">
                <img 
                  src={product.image1} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <img 
                  src={product.image2 || product.image1} 
                  alt={`${product.name} hover`} 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-gray-300 group-hover:text-white transition-colors truncate">
                  {product.name}
                </h3>
                <p className="text-yellow-500 font-bold tracking-widest text-sm">
                  ৳ {product.price?.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;