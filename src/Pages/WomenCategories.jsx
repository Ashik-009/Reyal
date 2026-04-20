import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 🗺️ 1. The Image Dictionary: Maps your DB slugs to your images
// You can replace these Unsplash links with your local imports (e.g., import topsImg from '../Images/tops.jpg')
const categoryImages = {
  'new-arrivals': 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
  'women-kurti': 'https://images.unsplash.com/photo-1610030469983-98e550d61dc0?q=80&w=800&auto=format&fit=crop',
  'women-dresses': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
  'women-maxi-dresses': 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=800&auto=format&fit=crop',
  'women-midi-dresses': 'https://images.unsplash.com/photo-1515347619152-169824056262?q=80&w=800&auto=format&fit=crop',
  'women-tops': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
  'women-jumpsuit': 'https://images.unsplash.com/photo-1485231183945-ffe14b8a43ec?q=80&w=800&auto=format&fit=crop',
  'women-bottoms': 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=800&auto=format&fit=crop',
};

// Premium fallback image for any brand new categories added in the Admin panel
const fallbackImage = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop';

const WomenCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  // 📡 2. Error-Free Fetch: Only grab women's categories from the Database
  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          // Filter ONLY the women's department
          const womenData = data.filter(c => c.department === 'women');
          setCategories(womenData);
        }
      })
      .catch(err => console.error("Error fetching women categories:", err))
      .finally(() => setLoading(false));
  }, []);

  const closeModal = (e) => {
    if (e.target.id === 'modal-overlay') {
      setActiveModal(null);
    }
  };

  const handleCategoryClick = (category) => {
    // Open modal if it has subcategories, otherwise go straight to the collection
    if (category.subCategories && category.subCategories.length > 0) {
      setActiveModal(category);
    } else {
      navigate(`/collections/${category.slug}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] pt-32 flex justify-center">
        <p className="text-gray-500 font-bold tracking-widest uppercase text-sm animate-pulse">Loading Categories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-12 px-6 lg:px-12 font-sans relative">
      
      <div className="mb-8">
        <h2 className="text-sm font-bold tracking-[0.2em] text-[#cc0000]">WOMEN</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Static "New Arrival" Tile */}
        <div 
          onClick={() => navigate('/collections/new-arrivals')}
          className="group relative h-100 lg:h-125 w-full rounded-2xl overflow-hidden cursor-pointer bg-neutral-900"
        >
          <img 
            src={categoryImages['new-arrivals']} 
            alt="New Arrival" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out" 
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
          <h3 className="absolute bottom-4 left-4 right-4 text-5xl lg:text-6xl font-black text-white/90 uppercase leading-[0.85] tracking-tighter drop-shadow-xl group-hover:text-white transition-colors duration-300">
            <span className="block">NEW</span><span className="block">ARRIVAL</span>
          </h3>
        </div>

        {/* 🔄 Dynamic DB Categories Map */}
        {categories.map((category) => {
          // Look up the image based on the DB slug, otherwise use fallback
          const bgImage = categoryImages[category.slug] || fallbackImage;

          return (
            <div 
              key={category._id}
              onClick={() => handleCategoryClick(category)} 
              className="group relative h-100 lg:h-125 w-full rounded-2xl overflow-hidden cursor-pointer bg-neutral-900"
            >
              <img 
                src={bgImage} 
                alt={category.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
              <h3 className="absolute bottom-4 left-4 right-4 text-5xl lg:text-6xl font-black text-white/90 uppercase leading-[0.85] tracking-tighter drop-shadow-xl group-hover:text-white transition-colors duration-300">
                {category.name.split(' ').map((word, idx) => (
                  <span key={idx} className="block">{word}</span>
                ))}
              </h3>
            </div>
          );
        })}
      </div>

      {/* THE POP-UP MODAL FOR SUB-CATEGORIES */}
      {activeModal && (
        <div 
          id="modal-overlay"
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            
            <div className="relative border-b border-gray-100 p-4 flex justify-center items-center">
              <h4 className="text-sm font-bold tracking-[0.15em] text-gray-800 uppercase">
                {activeModal.name}
              </h4>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                 <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-[6px] border-b-gray-400"></div>
                 <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-[6px] border-t-gray-400"></div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {activeModal.subCategories?.map((sub, idx) => {
                // Look up sub-category image
                const subBgImage = categoryImages[sub.slug] || fallbackImage;

                return (
                  <div 
                    key={idx} 
                    className="group cursor-pointer"
                    onClick={() => navigate(`/collections/${sub.slug}`)} 
                  >
                    <div className="relative h-75 sm:h-100 w-full rounded-xl overflow-hidden mb-3">
                      <img 
                        src={subBgImage} 
                        alt={sub.name} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
                      <h5 className="absolute bottom-4 left-0 w-full text-center text-4xl font-black text-white uppercase leading-none tracking-tight drop-shadow-md">
                        {sub.name.split(' ').map((word, i) => (
                          <span key={i} className="block">{word}</span>
                        ))}
                      </h5>
                    </div>
                    {/* Database subcategories might not have a subtitle field, fallback to generic text if missing */}
                    <p className="text-center text-[10px] font-bold tracking-widest text-gray-900 uppercase group-hover:text-[#cc0000] transition-colors">
                      {sub.subtitle || 'DISCOVER MORE'}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-gray-50 flex justify-center border-t border-gray-100 sm:hidden">
                <button onClick={() => setActiveModal(null)} className="text-xs font-bold tracking-widest text-gray-500">CLOSE</button>
            </div>

          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default WomenCategories;