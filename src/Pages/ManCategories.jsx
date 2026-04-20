import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 📸 1. Keep your existing local image imports
import casualImg from '../Images/casual-grid.jpg';
import poloImg from '../Images/polo-grid.jpg';
import jeansImg from '../Images/jeans-grid.jpg';
import suitsImg from '../Images/suits-grid.jpg';
import fullSleeveImg from '../Images/full-sleeve.jpg';
import halfSleeveImg from '../Images/half-sleeve.jpg';
import newarrivalImg from '../Images/new-arrival.jpg';
import panjabiImg from '../Images/panjabi.jpg';
import formalshirtsImg from '../Images/formal-shirts.jpg';
import tshirtsImg from '../Images/t-shirts.jpg';
import pajamaImg from '../Images/pajama.jpg';

// 🗺️ 2. The Image Dictionary: Maps your DB slugs to your local images
const categoryImages = {
  'new-arrivals': newarrivalImg,
  'man-casual-shirts': casualImg,
  'man-casual-full-sleeves': fullSleeveImg,
  'man-casual-half-sleeves': halfSleeveImg,
  'man-formal-shirts': formalshirtsImg,
  'man-t-shirts': tshirtsImg,
  'man-jeans': jeansImg,
  'man-polo': poloImg,
  'man-panjabi': panjabiImg,
  'man-pajama': pajamaImg,
  'man-twill-pants': 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop',
  'man-formal-pants': 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop',
  'man-cargo': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
  'man-shorts': 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop',
  'man-blazers': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
  'man-suits': suitsImg,
};

// Premium fallback image if a new category is added to the DB but has no image mapped yet
const fallbackImage = 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop';

const ManCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);
  const navigate = useNavigate();

  // 📡 3. Fetch categories from the live Database!
  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          // Filter ONLY the men's department
          const manData = data.filter(c => c.department === 'man');
          setCategories(manData);
        }
      })
      .catch(err => console.error("Error fetching man categories:", err))
      .finally(() => setLoading(false));
  }, []);

  const closeModal = (e) => {
    if (e.target.id === 'modal-overlay') {
      setActiveModal(null);
    }
  };

  const handleCategoryClick = (category) => {
    // If the database says this category has subcategories, open the modal
    if (category.subCategories && category.subCategories.length > 0) {
      setActiveModal(category);
    } else {
      // Otherwise, navigate directly to the collection page
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
      
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-sm font-bold tracking-[0.2em] text-gray-400">MAN</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Static "New Arrival" Tile (Since this usually pulls mixed items, keeping it static is safe) */}
        <div 
          onClick={() => navigate('/collections/new-arrivals')}
          className="group relative h-100 lg:h-125 w-full rounded-2xl overflow-hidden cursor-pointer bg-neutral-900"
        >
          <img src={categoryImages['new-arrivals']} alt="New Arrival" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out" />
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
              {activeModal.subCategories.map((sub) => {
                // Look up sub-category image
                const subBgImage = categoryImages[sub.slug] || fallbackImage;

                return (
                  <div 
                    key={sub._id} 
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

export default ManCategories;