import React, { useEffect } from 'react';

const IntellectualProperty = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 px-6 lg:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[0.15em] uppercase mb-12 text-center">
          Intellectual Property
        </h1>
        
        <div className="space-y-8 text-sm sm:text-base text-gray-400 leading-relaxed tracking-wide">
          <p>
            REYAL respects the intellectual property of others. If you believe that your work has been copied in a way that constitutes copyright infringement, please follow our Notice and Procedure for Making Claims of Copyright Infringement.
          </p>
          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Copyrights & Trademarks</h2>
          <p>
            All content included in or made available through REYAL, such as text, graphics, logos, button icons, images, and software is the property of REYAL or its content suppliers and protected by Bangladesh and international copyright laws. The compilation of all content included in or made available through any REYAL Service is the exclusive property of REYAL.
          </p>
          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Submitting a Claim</h2>
          <p>
            If you believe your intellectual property rights have been violated, please submit your complaint to <strong>customer@reyal.com.bd</strong>. Please provide a description of the copyrighted work, where it is located on the site, your contact information, and a statement made under penalty of perjury that the information is accurate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntellectualProperty;