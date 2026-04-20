import React, { useEffect } from 'react';

const BillingPayments = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] pt-32 pb-24 px-6 lg:px-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-[0.15em] uppercase mb-12 text-center">
          Billing & Payments
        </h1>
        
        <div className="space-y-8 text-sm sm:text-base text-gray-400 leading-relaxed tracking-wide">
          <p>
            At REYAL, we offer a variety of secure payment options to ensure a smooth checkout process. All digital transactions are heavily encrypted and securely processed.
          </p>
          
          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Digital Payments</h2>
          <p>
            We process all online payments through the official SSLCommerz gateway. This allows you to safely pay using:
          </p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Mobile Banking: bKash, Nagad, Rocket, Upay.</li>
            <li>Credit/Debit Cards: Visa, MasterCard, American Express.</li>
            <li>Internet Banking: City Touch, BRAC Bank, DBBL Nexus, and more.</li>
          </ul>

          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Cash on Delivery (COD)</h2>
          <p>
            We offer Cash on Delivery across Bangladesh. You can pay the exact invoice amount to the delivery executive when your package arrives at your doorstep. Please have exact change ready if possible to speed up the delivery process.
          </p>

          <h2 className="text-white font-bold tracking-widest uppercase text-lg mt-12 mb-4 border-b border-white/10 pb-2">Billing Security</h2>
          <p>
            We do not store your credit card data or mobile banking PINs on our servers. Your financial data is securely handled entirely by our verified payment partners.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillingPayments;