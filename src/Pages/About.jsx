import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 px-6 lg:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[0.15em] uppercase mb-12 text-center">
          About REYAL
        </h1>
        
        <div className="space-y-8 text-sm sm:text-base text-gray-400 leading-relaxed tracking-wide">
          <p>
            Welcome to <strong className="text-white tracking-widest">REYAL</strong>, the premier destination for modern men's and women's fashion in Bangladesh. Based in the heart of Dhaka, we are dedicated to redefining everyday elegance with premium quality, cutting-edge designs, and uncompromising comfort.
          </p>
          <p>
            Founded with a vision to bridge the gap between luxury aesthetics and accessible fashion, REYAL curates collections that empower individuals to express their unique style. From sharp formal wear to relaxed casuals, every piece is crafted with meticulous attention to detail.
          </p>
          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Our Mission</h2>
          <p>
            To inspire confidence through clothing. We believe that what you wear is an extension of who you are, and we are committed to providing you with the wardrobe essentials that make you look and feel your absolute best.
          </p>
          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Contact Headquarters</h2>
          <p>
            Nurjahan Road, Mohammadpur, Dhaka-1207<br />
            Hotline: +88 0171 00 00 000<br />
            Email: customer@reyal.shop
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;