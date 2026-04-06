import React, { useState } from 'react';

// Keep your existing local image imports
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

const ManCategories = () => {
  // State to track which category modal is currently open
  const [activeModal, setActiveModal] = useState(null);

  // Expanded categories array to include all 14 items matching the sidebar
  const categories = [
    {
      id: 1,
      name: 'NEW ARRIVAL',
      image: newarrivalImg,
      subCategories: null
    },
    
    {
      id: 2,
      name: 'CASUAL SHIRTS',
      image: casualImg, 
      subCategories: [ 
        { 
          name: 'FULL SLEEVES', 
          subtitle: 'FULL SLEEVES SHIRT', 
          image: fullSleeveImg 
        },
        { 
          name: 'HALF SLEEVES', 
          subtitle: 'HALF SLEEVES SHIRT', 
          image: halfSleeveImg 
        }
      ]
    },
    {
      id: 3,
      name: 'FORMAL SHIRTS',
      image: formalshirtsImg,
      subCategories: null
    },
     {
      id: 4,
      name: 'T-SHIRTS',
      image: tshirtsImg,
      subCategories: null
    },
    {
      id: 5,
      name: 'JEANS',
      image: jeansImg, 
      subCategories: null
    },
      {
      id: 6,
      name: 'POLO',
      image: poloImg, 
      subCategories: null
    },
    {
      id: 7,
      name: 'PANJABI',
      image: panjabiImg,
      subCategories: null
    },
     {
      id: 8,
      name: 'PAJAMA',
      image: pajamaImg,
      subCategories: null
    },
   
    {
      id: 9,
      name: 'TWILL PANTS',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop',
      subCategories: null
    },
    {
      id: 10,
      name: 'FORMAL PANTS',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop',
      subCategories: null
    },
     {
      id: 11,
      name: 'CARGO',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
      subCategories: null
    },
   
    {
      id: 12,
      name: 'SHORTS',
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop',
      subCategories: null
    },
    {
      id: 13,
      name: 'BLAZERS',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
      subCategories: null
    },
    {
      id: 14,
      name: 'SUITS',
      image: suitsImg, 
      subCategories: null
    }
  ];

  // Function to handle clicking outside the modal to close it
  const closeModal = (e) => {
    if (e.target.id === 'modal-overlay') {
      setActiveModal(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-12 px-6 lg:px-12 font-sans relative">
      
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-sm font-bold tracking-[0.2em] text-gray-400">MAN</h2>
      </div>

      {/* =========================================
          1. THE MAIN BACKGROUND GRID
      ========================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div 
            key={category.id}
            onClick={() => category.subCategories ? setActiveModal(category) : console.log(`Go to ${category.name} page`)}
            className="group relative h-100 lg:h-125 w-full rounded-2xl overflow-hidden cursor-pointer bg-neutral-900"
          >
            {/* Background Image with Hover Zoom */}
            <img 
              src={category.image} 
              alt={category.name} 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
            />
            
            {/* Dark Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>

            {/* Huge Overlay Text */}
            <h3 className="absolute bottom-4 left-4 right-4 text-5xl lg:text-6xl font-black text-white/90 uppercase leading-[0.85] tracking-tighter drop-shadow-xl group-hover:text-white transition-colors duration-300">
              {category.name.split(' ').map((word, idx) => (
                <span key={idx} className="block">{word}</span>
              ))}
            </h3>
          </div>
        ))}
      </div>


      {/* =========================================
          2. THE POP-UP MODAL (Conditional Rendering)
      ========================================= */}
      {activeModal && (
        <div 
          id="modal-overlay"
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          {/* The White Modal Box */}
          <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            
            {/* Modal Header */}
            <div className="relative border-b border-gray-100 p-4 flex justify-center items-center">
              <h4 className="text-sm font-bold tracking-[0.15em] text-gray-800 uppercase">
                {activeModal.name}
              </h4>
              
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                 <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-[6px] border-b-gray-400"></div>
                 <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-[6px] border-t-gray-400"></div>
              </div>
            </div>

            {/* Modal Content (The Sub-categories) */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {activeModal.subCategories.map((sub, idx) => (
                <div key={idx} className="group cursor-pointer">
                  
                  {/* Image Card */}
                  <div className="relative h-75 sm:h-100 w-full rounded-xl overflow-hidden mb-3">
                    <img 
                      src={sub.image} 
                      alt={sub.name} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Inner Big Text */}
                    <h5 className="absolute bottom-4 left-0 w-full text-center text-4xl font-black text-white uppercase leading-none tracking-tight drop-shadow-md">
                      {sub.name.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </h5>
                  </div>

                  {/* Bottom Subtitle Text */}
                  <p className="text-center text-[10px] font-bold tracking-widest text-gray-900 uppercase group-hover:text-[#cc0000] transition-colors">
                    {sub.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Close Button at bottom (Mobile friendly) */}
            <div className="p-4 bg-gray-50 flex justify-center border-t border-gray-100 sm:hidden">
                <button onClick={() => setActiveModal(null)} className="text-xs font-bold tracking-widest text-gray-500">CLOSE</button>
            </div>

          </div>
        </div>
      )}

      {/* Basic animation for the modal popping in */}
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