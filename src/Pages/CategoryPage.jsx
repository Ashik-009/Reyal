import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const CategoryPage = () => {
  // 1. Grab the category name from the URL (e.g., if URL is /collections/jeans, categoryName = "jeans")
  const { categoryName } = useParams(); 
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Start loading whenever the category changes
    
    // 2. Fetch all products from our JSON file
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        // 3. Filter the data to ONLY show products that match the URL category
        const filteredProducts = data.filter(
          (item) => item.category.toLowerCase() === categoryName.toLowerCase()
        );
        
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [categoryName]); // This tells React to re-run the fetch if the URL changes

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 px-6 lg:px-12 font-sans">
      
      {/* Dynamic Header */}
      <div className="max-w-400 mx-auto mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[0.15em] uppercase mb-4">
          {categoryName.replace('-', ' ')} 
        </h1>
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
          <Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">{categoryName.replace('-', ' ')}</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-400 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16">
        {loading ? (
          <p className="text-white col-span-full text-center">Loading {categoryName}...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col cursor-pointer">
              <div className="relative aspect-3/4 w-full overflow-hidden bg-neutral-900 rounded-lg mb-4">
                <img src={product.image1} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
                <img src={product.image2} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <h3 className="text-white text-xs sm:text-sm font-medium tracking-wide group-hover:text-yellow-500">{product.name}</h3>
                <p className="text-gray-400 text-xs font-bold tracking-widest mt-1">{product.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-500 tracking-widest uppercase text-sm">No items found for {categoryName} right now.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default CategoryPage;