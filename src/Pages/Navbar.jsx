import React, { useState } from 'react';
import logo from '../Images/reyal-logo.png'; 
import { Link } from 'react-router-dom';
import fullSleeveImg from '../Images/full-sleeve.jpg';
import halfSleeveImg from '../Images/half-sleeve.jpg';
import { useSelector , useDispatch } from 'react-redux';
import { toggleCart } from '../redux/cartSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState('MAN');
  const [activeModal, setActiveModal] = useState(null);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setActiveModal(null); 
  };
  
  const toggleDropdown = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  // 1. Added paths to the modal subcategories
  const casualShirtsModalData = {
    name: 'CASUAL SHIRTS',
    subCategories: [
      { name: 'FULL SLEEVES', subtitle: 'FULL SLEEVES SHIRT', image: fullSleeveImg, path: '/collections/casual-full-sleeves' },
      { name: 'HALF SLEEVES', subtitle: 'HALF SLEEVES SHIRT', image: halfSleeveImg, path: '/collections/casual-half-sleeves' }
    ]
  };

  // 2. Added explicit dynamic paths to ALL Men's categories
  const manCategories = [
    { name: 'NEW ARRIVAL', isRed: true, path: '/new-arrivals' }, 
    { name: 'PANJABI', path: '/collections/panjabi' }, 
    { name: 'CASUAL SHIRTS', hasModal: true }, 
    { name: 'FORMAL SHIRTS', path: '/collections/formal' }, 
    { name: 'POLO', path: '/collections/polo' }, 
    { name: 'T-SHIRTS', path: '/collections/t-shirts' }, 
    { name: 'JEANS', path: '/collections/jeans' }, 
    { name: 'CARGO', path: '/collections/cargo' }, 
    { name: 'TWILL PANTS', path: '/collections/twill-pants' }, 
    { name: 'FORMAL PANTS', path: '/collections/formal-pants' }, 
    { name: 'PAJAMA', path: '/collections/pajama' }, 
    { name: 'SHORTS', path: '/collections/shorts' }, 
    { name: 'BLAZERS', path: '/collections/blazers' }, 
    { name: 'SUITS', path: '/collections/suits' }
  ];

  // 3. Added explicit dynamic paths to ALL Women's categories
  const womenCategories = [
    { name: 'NEW ARRIVAL', isRed: true, path: '/new-arrivals' }, 
    { name: 'KURTI', path: '/collections/kurti' }, 
    { name: 'DRESSES', path: '/collections/dresses' }, 
    { name: 'TOPS', path: '/collections/tops' }, 
    { name: 'JUMPSUIT', path: '/collections/jumpsuit' }, 
    { name: 'BOTTOM', path: '/collections/bottom' }
  ];

  const infoCategories = [
    { name: 'About Reyal' }, { name: 'Find a Store' }, { name: 'Terms & Condition' }, 
    { name: 'Privacy Policy' }, { name: 'Refund & Return Policy' }
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* MAIN NAVBAR */}
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

          {/* Desktop Search */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-4 group cursor-text">
            <span className="text-[11px] font-bold tracking-[0.25em] text-gray-300 group-hover:text-yellow-500 transition-colors mt-0.5">SEARCH</span>
            <div className="w-32 xl:w-48 h-px bg-gray-400 group-hover:bg-yellow-500 transition-colors"></div>
          </div>

          <div className="flex items-center gap-5 lg:gap-10">
            {/* Desktop Login & Help Text */}
            <Link to="/login" className="text-[11px] font-bold tracking-[0.25em] text-gray-300 hover:text-yellow-500 transition-colors hidden md:block mt-0.5">LOGIN</Link>
            <Link to="/help" className="text-[11px] font-bold tracking-[0.25em] text-gray-300 hover:text-yellow-500 transition-colors hidden md:block mt-0.5">HELP</Link>
            
            {/* Mobile User Icon */}
            <Link to="/login" onClick={handleLinkClick} className="text-gray-300 hover:text-yellow-500 transition-colors md:hidden focus:outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
               </svg>
            </Link>

            {/* Cart Icon */}
            <button 
              onClick={() => dispatch(toggleCart())} 
              className="flex items-center gap-2 text-gray-300 hover:text-yellow-500 transition-colors focus:outline-none group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 lg:w-6 lg:h-6 group-hover:-translate-y-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
                {/* The magic happens here! */}
              <span className="text-sm lg:text-base font-medium mt-0.5">{totalQuantity}</span>
            </button>
          </div>

        </div>
      </nav>

      {/* OVERLAY */}
      <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={toggleMenu}></div>
      
      {/* SLIDE-OUT SIDEBAR */}
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
            
            {/* MAN SECTION */}
            <div>
              <div className="flex items-center justify-between w-full">
                <Link to="/man" onClick={handleLinkClick} className="text-xl sm:text-2xl font-black tracking-widest text-white hover:text-yellow-500 transition-colors uppercase text-left">
                  Man
                </Link>
                <button onClick={() => toggleDropdown('MAN')} className="text-gray-400 hover:text-yellow-500 p-2 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 transition-transform duration-300 ${openDropdown === 'MAN' ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
              
              <div className={`flex flex-col gap-4 ml-4 overflow-hidden transition-all duration-500 ease-in-out ${openDropdown === 'MAN' ? 'max-h-250 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                {manCategories.map((item, idx) => (
                  <div key={`man-${idx}`} className="w-full">
                    {item.hasModal ? (
                      <button 
                        onClick={() => setActiveModal(casualShirtsModalData)}
                        className={`text-[11px] sm:text-xs font-normal tracking-[0.15em] transition-colors flex items-center justify-between w-full sm:w-4/5 text-gray-400 hover:text-white`}
                      >
                        {item.name}
                        <span className="text-sm font-light">+</span>
                      </button>
                    ) : (
                      // 4. Changed to={item.path}
                      <Link 
                        to={item.path} 
                        onClick={handleLinkClick} 
                        className={`text-[11px] sm:text-xs font-normal tracking-[0.15em] transition-colors flex items-center justify-between w-full sm:w-4/5 ${
                          item.isRed ? 'text-[#cc0000] hover:text-red-400 font-medium' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* WOMEN SECTION */}
            <div>
              <div className="flex items-center justify-between w-full mt-2">
                <Link to="/women" onClick={handleLinkClick} className="text-xl sm:text-2xl font-black tracking-widest text-white hover:text-yellow-500 transition-colors uppercase text-left">
                  Women
                </Link>
                <button onClick={() => toggleDropdown('WOMEN')} className="text-gray-400 hover:text-yellow-500 p-2 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 transition-transform duration-300 ${openDropdown === 'WOMEN' ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>

              <div className={`flex flex-col gap-4 ml-4 overflow-hidden transition-all duration-500 ease-in-out ${openDropdown === 'WOMEN' ? 'max-h-200 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                {womenCategories.map((item, idx) => (
                  // 5. Changed to={item.path}
                  <Link 
                    key={`woman-${idx}`} 
                    to={item.path} 
                    onClick={handleLinkClick}
                    className={`text-[11px] sm:text-xs font-normal tracking-[0.15em] transition-colors flex items-center justify-between w-full sm:w-4/5 ${
                      item.isRed ? 'text-[#cc0000] hover:text-red-400 font-medium' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
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
                  <Link key={`info-${idx}`} to="#" onClick={handleLinkClick} className="text-[11px] sm:text-xs font-normal tracking-[0.05em] text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
          </nav>

          {/* Bottom Sidebar Utilities */}
          <div className="mt-12 flex flex-col gap-6 md:hidden">
            <div className="flex items-center gap-3 group cursor-text">
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 group-hover:text-yellow-500 transition-colors">SEARCH</span>
              <div className="w-full max-w-25 h-px bg-gray-600 group-hover:bg-yellow-500 transition-colors"></div>
            </div>
            <Link to="/login" onClick={handleLinkClick} className="text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-yellow-500">LOGIN</Link>
            <Link to="/help" onClick={handleLinkClick} className="text-[10px] font-bold tracking-[0.2em] text-gray-400 hover:text-yellow-500">HELP</Link>
          </div>

        </div>
      </div>

      {/* POP-UP MODAL */}
      {activeModal && (
        <div 
          id="navbar-modal-overlay"
          onClick={(e) => e.target.id === 'navbar-modal-overlay' && setActiveModal(null)}
          className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
        >
          <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden shadow-2xl animate-[slideUp_0.3s_ease-out]">
            
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
              {activeModal.subCategories.map((sub, idx) => (
                <Link 
                  key={idx} 
                  to={sub.path} 
                  onClick={(e) => {
                    if (sub.path === '#') e.preventDefault();
                    else {
                      setActiveModal(null);
                      setIsMenuOpen(false); 
                    }
                  }}
                  className="group cursor-pointer block"
                >
                  <div className="relative h-75 sm:h-100 w-full rounded-xl overflow-hidden mb-3">
                    <img src={sub.image} alt={sub.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
                    <h5 className="absolute bottom-4 left-0 w-full text-center text-4xl font-black text-white uppercase leading-none tracking-tight drop-shadow-md">
                      {sub.name.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </h5>
                  </div>
                  <p className="text-center text-[10px] font-bold tracking-widest text-gray-900 uppercase group-hover:text-[#cc0000] transition-colors">
                    {sub.subtitle}
                  </p>
                </Link>
              ))}
            </div>

            <div className="p-4 bg-gray-50 flex justify-center border-t border-gray-100 sm:hidden">
                <button onClick={() => setActiveModal(null)} className="text-xs font-bold tracking-widest text-gray-500">CLOSE</button>
            </div>

          </div>
        </div>
      )}
      
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </>
  );
};

export default Navbar;