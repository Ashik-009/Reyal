import React, { useEffect } from 'react';

const Privacy = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 px-6 lg:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[0.15em] uppercase mb-12 text-center">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 text-sm sm:text-base text-gray-400 leading-relaxed tracking-wide">
          <p>
            REYAL operates this website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>
          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Information Collection</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you. This includes Personal Data (like your email address, first name, last name, phone number, and address) and Usage Data (how the website is accessed and used).
          </p>
          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Data Security</h2>
          <p>
            The security of your data is important to us. All transactions are encrypted using secure socket layer technology (SSL). However, remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
          </p>
          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;