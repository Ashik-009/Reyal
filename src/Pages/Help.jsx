import React from 'react';

const Help = () => {
  return (
    <div className="bg-[#1a1a1a] pt-40 pb-20 px-6 lg:px-12 font-sans flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Main H1 Tag as requested */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[0.15em] uppercase mb-6">
          Customer Service & Help
        </h1>
        
        {/* A subtle subtitle pointing them to the footer */}
        <p className="text-gray-400 tracking-widest text-xs sm:text-sm leading-relaxed">
          PLEASE REFER TO THE DIRECTORY BELOW FOR ASSISTANCE WITH ORDERS, POLICIES, AND GETTING IN TOUCH WITH THE REYAL TEAM.
        </p>

        {/* A subtle decorative line to tie into your premium theme */}
        <div className="w-24 h-px bg-yellow-500/50 mx-auto mt-12"></div>
        
      </div>
    </div>
  );
};

export default Help;