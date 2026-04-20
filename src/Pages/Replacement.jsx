import React, { useEffect } from 'react';

const Replacement = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 px-6 lg:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[0.15em] uppercase mb-12 text-center">
          Replacement Policy
        </h1>
        
        <div className="space-y-8 text-sm sm:text-base text-gray-400 leading-relaxed tracking-wide">
          <p>
            We ensure strict quality control before dispatching any order. However, if you receive a product that is defective, damaged, or incorrect in size, our replacement policy ensures a hassle-free exchange.
          </p>
          
          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Eligibility for Replacement</h2>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>The claim must be made within 3 days of receiving the delivery.</li>
            <li>The item must be unworn, unwashed, and have all original tags intact.</li>
            <li>Replacements are only applicable for size issues or manufacturing defects.</li>
          </ul>

          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">How to Request a Replacement</h2>
          <p>
            Contact our customer support team at <strong>customer@reyal.com.bd</strong> or call our hotline. Please provide your Order ID and photographic evidence of the defect or the incorrect item received. Once approved, our team will guide you through the return shipping process.
          </p>

          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Exchange Processing</h2>
          <p>
            Once we receive the returned item at our warehouse, our quality check team will inspect it. Upon successful verification, the replacement item will be dispatched to your address within 3-5 business days. Please note that replacement is subject to stock availability. If the desired size/product is out of stock, a full refund will be initiated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Replacement;