import React, { useState, useEffect } from 'react';
import logo from '../Images/reyal-logo.png'; 
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCart } from '../redux/cartSlice';
import SearchOverlay from './SearchOverlay'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState('SHOP');
  const [openDepartment, setOpenDepartment] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Initialize with an empty array to prevent mapping errors
  const [categories, setCategories] = useState([]); 
  
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();

  // 🛡️ ERROR-FREE FETCH: Safely handles non-array responses
  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        // Only set categories if the backend actually sent an array
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]); 
        }
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
        setCategories([]); // Fallback to empty array on fail
      });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleDropdown = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  const toggleDepartment = (dept) => {
    setOpenDepartment(openDepartment === dept ? null : dept);
    setOpenSubCategory(null);
  };

  const toggleSubCategory = (categoryId) => {
    setOpenSubCategory(openSubCategory === categoryId ? null : categoryId);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // 🛡️ SAFETY CHECK: Ensures .filter() never crashes the app
  const manCategories = Array.isArray(categories) ? categories.filter(c => c.department === 'man') : [];
  const womenCategories = Array.isArray(categories) ? categories.filter(c => c.department === 'women') : [];

  const infoCategories = [
    { name: 'About Reyal', path: '/about' }, 
    { name: 'Find a Store', path: '/store-locator' }, 
    { name: 'Terms & Condition', path: '/terms' }, 
    { name: 'Privacy Policy', path: '/privacy' }, 
    { name: 'Refund & Return Policy', path: '/refunds' }
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-transparent text-white font-sans transition-all duration-300">
        <div className="relative flex items-center justify-between px-6 lg:px-12 h-24 sm:h-28">
          
          <div className="flex items-center gap-6 sm:gap-10 lg:gap-12">
            <button onClick={toggleMenu} className="flex items-center gap-4 text-white hover:text-yellow-500 transition-colors focus:outline-none group">
              <div className="flex flex-col gap-0.75 w-6 sm:w-7">
                <span className="block h-[1.5px] w-full bg-current transform transition-transform group-hover:scale-x-110 origin-left"></span>
                <span className="block h-[1.5px] w-4/5 bg-current transform transition-transform group-hover:scale-x-125 origin-left"></span>
                <span className="block h-[1.5px] w-full bg-current transform transition-transform group-hover:scale-x-110 origin-left"></span>
              </div>
              <span className="text-[11px] font-bold tracking-[0.25em] hidden sm:block mt-0.5">MENU</span>
            </button>

            <div className="flex-none flex justify-center items-center mt-1 sm:mt-0">
              <Link to="/" onClick={handleLinkClick}>
                <img src={logo} alt="REYAL" className="h-10 sm:h-12 lg:h-14 w-auto object-contain cursor-pointer hover:scale-105 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          <button 
            onClick={() => setIsSearchOpen(true)} 
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-4 group cursor-pointer focus:outline-none"
          >
            <span className="text-[11px] font-bold tracking-[0.25em] text-gray-300 group-hover:text-yellow-500 transition-colors mt-0.5">SEARCH</span>
            <div className="w-32 xl:w-48 h-px bg-gray-400 group-hover:bg-yellow-500 transition-colors"></div>
          </button>

          <div className="flex items-center gap-5 lg:gap-10">
            <Link to="/profile" className="text-[11px] font-bold tracking-[0.2em] text-gray-300 hover:text-yellow-500 transition-colors hidden md:block mt-0.5">ACCOUNT</Link>
            <Link to="/help" className="text-[11px] font-bold tracking-[0.25em] text-gray-300 hover:text-yellow-500 transition-colors hidden md:block mt-0.5">HELP</Link>
            
            <Link to="/profile" onClick={handleLinkClick} className="text-gray-300 hover:text-yellow-500 transition-colors md:hidden focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>

            <button 
              onClick={() => dispatch(toggleCart())} 
              className="flex items-center gap-2 text-gray-300 hover:text-yellow-500 transition-colors focus:outline-none group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 lg:w-6 lg:h-6 group-hover:-translate-y-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <span className="text-sm lg:text-base font-medium mt-0.5">{totalQuantity}</span>
            </button>
          </div>

        </div>
      </nav>

      <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={toggleMenu}></div>
      
      <div className={`fixed top-0 left-0 h-dvh w-full sm:w-100 bg-neutral-950 border-r border-yellow-500/20 z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="flex-none flex items-center justify-between p-8 sm:p-12 pb-6">
          <Link to="/" onClick={handleLinkClick}>
            <img src={logo} alt="REYAL" className="h-8 sm:h-10 w-auto object-contain" />
          </Link>
          <button onClick={toggleMenu} className="text-gray-400 hover:text-yellow-500 transition-colors ml-4 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 sm:px-12 pb-32 hide-scroll" style={{ WebkitOverflowScrolling: 'touch' }}>
          <nav className="flex flex-col gap-6 mt-4">
            
            {/* SHOP SECTION */}
            <div>
              <div className="flex items-center justify-between w-full">
                <Link to="/shop" onClick={handleLinkClick} className="text-xl sm:text-2xl font-black tracking-widest text-white hover:text-yellow-500 transition-colors uppercase text-left">
                  Shop
                </Link>
                <button onClick={() => toggleDropdown('SHOP')} className="text-gray-400 hover:text-yellow-500 p-2 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 transition-transform duration-300 ${openDropdown === 'SHOP' ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
              
              <div className={`flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out ${openDropdown === 'SHOP' ? 'max-h-375 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                
                <Link to="/new-arrivals" onClick={handleLinkClick} className="text-[11px] sm:text-xs font-bold tracking-[0.15em] transition-colors flex items-center justify-between w-full sm:w-4/5 text-[#cc0000] hover:text-red-400">
                  NEW ARRIVAL
                </Link>

                {/* MAN DEPARTMENT FOLDER */}
                <div className="w-full mt-2">
                  <button onClick={() => toggleDepartment('MAN')} className="flex items-center justify-between w-full sm:w-4/5 text-[11px] sm:text-xs font-bold tracking-[0.15em] text-white hover:text-yellow-500 uppercase transition-colors">
                    MAN
                    <span className="text-lg font-light leading-none">{openDepartment === 'MAN' ? '-' : '+'}</span>
                  </button>
                  
                  <div className={`flex flex-col gap-3 ml-4 overflow-hidden transition-all duration-300 ease-in-out ${openDepartment === 'MAN' ? 'max-h-200 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                    {manCategories.map(cat => (
                      <div key={cat._id} className="w-full">
                        {cat.subCategories && cat.subCategories.length > 0 ? (
                          <>
                            <button 
                              onClick={() => toggleSubCategory(cat._id)} 
                              className="flex items-center justify-between w-full sm:w-4/5 text-[10px] sm:text-[11px] font-normal tracking-[0.15em] text-gray-400 hover:text-white uppercase transition-colors"
                            >
                              {cat.name}
                              <span className="text-lg font-light leading-none">{openSubCategory === cat._id ? '-' : '+'}</span>
                            </button>
                            
                            <div className={`flex flex-col gap-2 ml-4 overflow-hidden transition-all duration-300 ease-in-out ${openSubCategory === cat._id ? 'max-h-75 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
                              {cat.subCategories.map(sub => (
                                <Link 
                                  key={sub.slug} 
                                  to={`/collections/${sub.slug}`} 
                                  onClick={handleLinkClick} 
                                  className="text-[9px] sm:text-[10px] font-normal tracking-[0.15em] text-gray-500 hover:text-yellow-500 uppercase transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link 
                            to={`/collections/${cat.slug}`} 
                            onClick={handleLinkClick} 
                            className="text-[10px] sm:text-[11px] font-normal tracking-[0.15em] text-gray-400 hover:text-white uppercase transition-colors block"
                          >
                            {cat.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* WOMEN DEPARTMENT FOLDER */}
                <div className="w-full mt-2">
                  <button onClick={() => toggleDepartment('WOMEN')} className="flex items-center justify-between w-full sm:w-4/5 text-[11px] sm:text-xs font-bold tracking-[0.15em] text-white hover:text-yellow-500 uppercase transition-colors">
                    WOMEN
                    <span className="text-lg font-light leading-none">{openDepartment === 'WOMEN' ? '-' : '+'}</span>
                  </button>
                  
                  <div className={`flex flex-col gap-3 ml-4 overflow-hidden transition-all duration-300 ease-in-out ${openDepartment === 'WOMEN' ? 'max-h-200 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                    {womenCategories.map(cat => (
                      <div key={cat._id} className="w-full">
                        {cat.subCategories && cat.subCategories.length > 0 ? (
                          <>
                            <button 
                              onClick={() => toggleSubCategory(cat._id)} 
                              className="flex items-center justify-between w-full sm:w-4/5 text-[10px] sm:text-[11px] font-normal tracking-[0.15em] text-gray-400 hover:text-white uppercase transition-colors"
                            >
                              {cat.name}
                              <span className="text-lg font-light leading-none">{openSubCategory === cat._id ? '-' : '+'}</span>
                            </button>
                            <div className={`flex flex-col gap-2 ml-4 overflow-hidden transition-all duration-300 ease-in-out ${openSubCategory === cat._id ? 'max-h-75 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
                              {cat.subCategories.map(sub => (
                                <Link 
                                  key={sub.slug} 
                                  to={`/collections/${sub.slug}`} 
                                  onClick={handleLinkClick} 
                                  className="text-[9px] sm:text-[10px] font-normal tracking-[0.15em] text-gray-500 hover:text-yellow-500 uppercase transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link 
                            to={`/collections/${cat.slug}`} 
                            onClick={handleLinkClick} 
                            className="text-[10px] sm:text-[11px] font-normal tracking-[0.15em] text-gray-400 hover:text-white uppercase transition-colors block"
                          >
                            {cat.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
            
            <div className="w-16 h-0.5 bg-yellow-500/30 my-4"></div>
            
            {/* INFO SECTION */}
            <div>
              <button onClick={() => toggleDropdown('INFO')} className="text-lg sm:text-xl font-black tracking-widest text-white hover:text-yellow-500 transition-colors uppercase flex items-center gap-3 w-full text-left">
                <span className="text-yellow-500 text-2xl font-light leading-none mb-1">
                  {openDropdown === 'INFO' ? '-' : '+'}
                </span> 
                Info
              </button>

              <div className={`flex flex-col gap-3 ml-10 overflow-hidden transition-all duration-500 ease-in-out ${openDropdown === 'INFO' ? 'max-h-125 opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'}`}>
                {infoCategories.map((item, idx) => (
                  <Link key={`info-${idx}`} to={item.path} onClick={handleLinkClick} className="text-[11px] sm:text-xs font-normal tracking-[0.05em] text-gray-400 hover:text-white transition-colors uppercase">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
          </nav>

          <div className="mt-12 flex flex-col gap-6 md:hidden">
            
            {/* 4. MOBILE SEARCH BUTTON */}
            <button 
              onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }} 
              className="flex items-center gap-3 group cursor-pointer focus:outline-none w-full text-left"
            >
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 group-hover:text-yellow-500 transition-colors">SEARCH</span>
              <div className="w-full max-w-25 h-px bg-gray-600 group-hover:bg-yellow-500 transition-colors"></div>
            </button>
            
            <Link to="/profile" onClick={handleLinkClick} className="text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-yellow-500 uppercase">LOGIN</Link>
            <Link to="/help" onClick={handleLinkClick} className="text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-yellow-500 uppercase">HELP</Link>
          </div>

        </div>
      </div>

      {/* 5. RENDER THE OVERLAY */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default Navbar;