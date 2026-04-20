import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Parallax, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/mousewheel';

import heroImage1 from '../Images/hero1.jpg';
import heroImage2 from '../Images/hero2.jpg';
import heroImage3 from '../Images/hero3.jpg';

const HomeHero = () => {
  // Updated slides: Left always points to MAN, Right always points to WOMEN
  const slides = [
    {
      id: 1,
      image: heroImage1,
      leftNav: 'SHOP MAN',
      leftPath: '/collections/man', 
      rightNav: 'SHOP WOMEN',
      rightPath: '/collections/women',
      btnText: 'SHOP ONLINE',
      btnPath: '/shop'
    },
    {
      id: 2,
      image: heroImage2,
      leftNav: 'SHOP MAN',
      leftPath: '/collections/man',
      rightNav: 'SHOP WOMEN',
      rightPath: '/collections/women', 
      btnText: 'SHOP ONLINE',
      btnPath: '/shop'
    },
    {
      id: 3,
      image: heroImage3,
      leftNav: 'SHOP MAN',
      leftPath: '/collections/man',
      rightNav: 'SHOP WOMEN',
      rightPath: '/collections/women',
      btnText: 'SHOP ONLINE',
      btnPath: '/shop'
    }
  ];

  return (
    <div className="h-dvh w-full bg-neutral-950 font-sans">
      
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        loop={true}
        parallax={true}
        speed={1000} 
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Mousewheel, Parallax, Autoplay]}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="overflow-hidden">
            
            <div className="relative h-full w-full flex items-center justify-center">
              
              <div 
                className="absolute inset-0 w-full h-full scale-100 sm:scale-110"
                data-swiper-parallax-y="30%"
              >
                <img 
                  src={slide.image} 
                  alt="Fashion Model" 
                  className="w-full h-full object-cover object-center sm:object-top"
                />
              </div>
              
              <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 z-10"></div>

              {/* LEFT NAVIGATION (< SHOP MAN) */}
              <Link 
                to={slide.leftPath} 
                className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white hover:text-yellow-500 transition-colors group z-20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] mt-0.5">{slide.leftNav}</span>
              </Link>

              {/* RIGHT NAVIGATION (SHOP WOMEN >) */}
              <Link 
                to={slide.rightPath} 
                className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white hover:text-[#cc0000] transition-colors group z-20"
              >
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] mt-0.5">{slide.rightNav}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>

              {/* BOTTOM LEFT BUTTON */}
              <div className="absolute bottom-16 sm:bottom-16 left-6 lg:left-12 z-20">
                <div data-swiper-parallax="-100" data-swiper-parallax-opacity="0">
                    <Link to={slide.btnPath} className="inline-block rounded-xl group relative overflow-hidden border border-white px-8 py-3 sm:px-10 sm:py-4 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white transition-all duration-300 hover:border-[#cc0000]">
                        <span className="absolute inset-0 w-0 bg-[#cc0000] transition-all duration-500 ease-out group-hover:w-full"></span>
                        <span className="relative z-10">{slide.btnText}</span>
                    </Link>
                </div>
              </div>

            </div>
            
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default HomeHero;