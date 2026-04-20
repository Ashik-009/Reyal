import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Lock background scrolling when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onClose(); 
      setSearchQuery(''); 
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-500 animate-in fade-in">
      
      {/* The Circular Close 'X' Button - Now positioned relative to the search bar */}
      <button 
        onClick={onClose} 
        className="mb-6 flex items-center justify-center w-10 h-10 bg-white rounded-full text-black hover:scale-110 hover:bg-yellow-500 transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Tighter, more refined Search Input Area */}
      <form onSubmit={handleSearch} className="w-11/12 max-w-2xl flex shadow-2xl">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter Ref. No./ Product Name"
          autoFocus
          className="flex-1 bg-white text-gray-800 px-5 py-3 sm:px-6 sm:py-4 text-base sm:text-lg font-bold outline-none placeholder:text-gray-400"
        />
        <button 
          type="submit" 
          className="bg-linear-to-b from-gray-600 to-gray-800 text-white px-6 sm:px-10 font-black tracking-[0.2em] text-[10px] sm:text-xs uppercase hover:from-gray-500 hover:to-gray-700 transition-colors"
        >
          Search
        </button>
      </form>

    </div>
  );
};

export default SearchOverlay;