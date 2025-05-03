import React from 'react';

const Brands: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-gray-600 font-medium">Trusted by innovative companies</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {/* Company logos - using text as placeholders */}
          <div className="text-gray-400 text-xl font-bold">ACME Inc.</div>
          <div className="text-gray-400 text-xl font-bold">TechGiant</div>
          <div className="text-gray-400 text-xl font-bold">Innovate AI</div>
          <div className="text-gray-400 text-xl font-bold">FutureCorp</div>
          <div className="text-gray-400 text-xl font-bold">MediaPro</div>
        </div>
      </div>
    </section>
  );
};

export default Brands;