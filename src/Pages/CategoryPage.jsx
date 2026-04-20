import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams(); 
  const navigate = useNavigate();
  
  const [allProducts, setAllProducts] = useState([]); 
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for the Premium Subcategory Modal
  const [modalCategory, setModalCategory] = useState(null);

  useEffect(() => {
    setLoading(true); 
    setModalCategory(null); // Close modal if URL changes
    
    Promise.all([
      fetch('http://localhost:5000/api/products').then(res => res.json()),
      fetch('http://localhost:5000/api/categories').then(res => res.json())
    ])
    .then(([prodsData, catsData]) => {
      setAllProducts(prodsData);
      setCategories(catsData);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching live data:", error);
      setLoading(false);
    });

    window.scrollTo(0, 0); 
  }, [categoryName]);

  // --- CORE LOGIC SWITCH ---
  // Are we on a Department Hub (e.g., 'man') or a Specific Category (e.g., 'casual-shirts')?
  const isDepartment = categoryName.toLowerCase() === 'man' || categoryName.toLowerCase() === 'women';

  // 1. IF DEPARTMENT: Filter & build the Category Directory Cards
  const populatedCategories = isDepartment ? categories
    .filter(c => c.department?.toLowerCase() === categoryName.toLowerCase())
    .map(cat => {
      // Find all valid slugs for this category family
      const validSlugs = [cat.slug, ...(cat.subCategories?.map(s => s.slug) || [])];
      // Find matching products
      const matchingProducts = allProducts.filter(p => validSlugs.includes(p.category));
      
      return {
        ...cat,
        itemCount: matchingProducts.length,
        // STRICT RULE: Only use a real product image from the database
        thumbnail: matchingProducts.length > 0 ? matchingProducts[0].image1 : null 
      };
    })
    .filter(cat => cat.itemCount > 0) // STRICT RULE: Hide category if it has 0 products
  : [];

  // 2. IF SPECIFIC CATEGORY: Filter & build the Product Cards
  const displayProducts = !isDepartment 
    ? allProducts.filter(p => p.category === categoryName.toLowerCase()).reverse() 
    : [];

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 px-6 lg:px-12 font-sans relative">
      
      {/* 🌟 PREMIUM SUBCATEGORY MODAL */}
      {modalCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="bg-white rounded-xl w-full max-w-4xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            
            <button onClick={() => setModalCategory(null)} className="absolute top-4 right-5 text-gray-400 hover:text-black z-20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="p-6 sm:p-10 overflow-y-auto hide-scroll flex-1">
              <h2 className="text-center text-gray-800 font-black tracking-[0.2em] uppercase mb-8 text-lg sm:text-xl">
                {modalCategory.name}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {modalCategory.subCategories
                  .map(sub => {
                    // Check if this subcategory actually has products
                    const matchingProds = allProducts.filter(p => p.category === sub.slug);
                    return {
                      ...sub,
                      itemCount: matchingProds.length,
                      thumbnail: matchingProds.length > 0 ? matchingProds[0].image1 : null
                    };
                  })
                  .filter(sub => sub.itemCount > 0) // STRICT RULE: Hide empty subcategories from modal
                  .map(sub => {
                    const bigText = sub.name.replace(/shirt/i, '').replace(/pants/i, '').trim();

                    return (
                      <div 
                        key={sub.slug} 
                        onClick={() => navigate(`/collections/${sub.slug}`)} 
                        className="group relative aspect-3/4 rounded-xl overflow-hidden cursor-pointer bg-neutral-200"
                      >
                        <img src={sub.thumbnail} alt={sub.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>

                        <div className="absolute bottom-6 left-0 w-full text-center px-4">
                          <h3 className="text-white font-black text-4xl sm:text-5xl tracking-tighter uppercase leading-none drop-shadow-lg group-hover:text-yellow-500 transition-colors">
                            {bigText}
                          </h3>
                          <div className="mt-3 bg-white text-black text-[10px] font-black tracking-widest uppercase py-2 px-4 inline-block shadow-xl">
                            {sub.name}
                          </div>
                        </div>
                      </div>
                    )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shared Page Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center border-b border-gray-800 pb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[0.15em] uppercase mb-4">
          {categoryName.replace('-', ' ')} 
        </h1>
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
          <Link to="/" className="hover:text-yellow-500 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">{categoryName.replace('-', ' ')}</span>
        </div>
        {!loading && (
          <p className="text-yellow-500 text-[10px] font-bold tracking-widest mt-4 uppercase">
            {isDepartment ? `${populatedCategories.length} Categories` : `${displayProducts.length} Items`}
          </p>
        )}
      </div>


      {loading ? (
        <p className="text-white text-center tracking-widest uppercase text-sm animate-pulse">Syncing Database...</p>
      ) : (
        <>
          {/* ========================================= */}
          {/* VIEW 1: DEPARTMENT HUB (CATEGORY GRID) */}
          {/* ========================================= */}
          {isDepartment && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
              {populatedCategories.length > 0 ? (
                populatedCategories.map(cat => (
                  <div
                    key={cat._id}
                    onClick={() => {
                      // Check if any subcategories have products before opening modal
                      const hasPopulatedSubs = cat.subCategories?.some(sub => allProducts.some(p => p.category === sub.slug));
                      
                      if (hasPopulatedSubs) {
                        setModalCategory(cat);
                      } else {
                        navigate(`/collections/${cat.slug}`);
                      }
                    }}
                    className="relative aspect-4/5 rounded-xl overflow-hidden group cursor-pointer bg-neutral-900 border border-white/5 shadow-xl"
                  >
                    <img src={cat.thumbnail} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-90" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-8 left-8 right-8">
                      <h3 className="text-white font-black text-3xl sm:text-4xl tracking-tighter uppercase leading-none drop-shadow-lg group-hover:text-yellow-500 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mt-3 flex items-center gap-2">
                        {cat.itemCount} Items Available <span className="text-yellow-500 text-lg leading-none">→</span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-gray-500 tracking-widest uppercase text-xs font-bold">No collections available yet.</p>
                </div>
              )}
            </div>
          )}


          {/* ========================================= */}
          {/* VIEW 2: SPECIFIC CATEGORY (PRODUCT GRID) */}
          {/* ========================================= */}
          {!isDepartment && (
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16">
              {displayProducts.length > 0 ? (
                displayProducts.map((product) => {
                  const totalStock = product.sizes ? product.sizes.reduce((sum, item) => sum + item.stock, 0) : 0;
                  const isOutOfStock = totalStock === 0;

                  return (
                    <Link to={`/product/${product._id}`} key={product._id} className="group flex flex-col cursor-pointer relative">
                      
                      {isOutOfStock ? (
                        <div className="absolute top-2 left-2 z-20 bg-black/80 backdrop-blur-sm text-[#cc0000] text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-sm border border-[#cc0000]/30">Sold Out</div>
                      ) : product.isNewArrival && (
                        <div className="absolute top-2 left-2 z-20 bg-white text-black text-[9px] font-black tracking-widest uppercase px-2 py-1 rounded-sm">New</div>
                      )}

                      <div className="relative aspect-3/4 w-full overflow-hidden bg-neutral-900 rounded-lg mb-4">
                        <img src={product.image1} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
                        <img src={product.image2 || product.image1} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" />
                        
                        {product.refNumber && (
                          <div className="absolute bottom-4 sm:bottom-6 left-0 w-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                            <div className="bg-linear-to-r from-transparent via-black/80 to-transparent w-[90%] py-1.5 flex flex-col items-center justify-center backdrop-blur-[2px]">
                              <span className="text-gray-200 text-[9px] font-bold tracking-[0.2em] uppercase drop-shadow-md">
                                REF: {product.refNumber}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1 text-center sm:text-left">
                        <h3 className="text-white text-[11px] sm:text-xs font-bold tracking-widest uppercase group-hover:text-yellow-500 truncate transition-colors">{product.name}</h3>
                        <p className="text-gray-400 text-xs font-bold tracking-widest mt-0.5">
                          ৳ {product.price?.toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  )
                })
              ) : (
                <div className="col-span-full text-center py-20 flex flex-col items-center">
                  <p className="text-gray-500 tracking-widest uppercase text-xs font-bold mb-6">No items found in this category.</p>
                  <Link to="/collections/man" className="text-yellow-500 hover:text-white transition-colors tracking-widest text-[10px] uppercase font-black underline underline-offset-4">
                    Go Back to Department
                  </Link>
                </div>
              )}
            </div>
          )}
        </>
      )}

      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CategoryPage;