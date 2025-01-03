import React from 'react';
import Image from 'next/image';

interface ValuationToolProps {
  // Add props if needed
}

const WorkingValuationTool: React.FC<ValuationToolProps> = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-xl lg:text-4xl font-extrabold mb-2">HOW DOES THE VALUATION TOOL WORK?</h1>
        <p className="text-gray-800 text-xl">We provide them with more choice and absolute transparency.</p>
      </div>

      {/* Features Grid */}
      <div className="space-y-16">
        {/* Start Section */}
        <div className="flex items-center gap-8">
          <div className="w-24 h-24 flex-shrink-0">
            <Image 
              src="/images/start.png" 
              alt="Start icon" 
              width={96} 
              height={96} 
              className="w-full h-full"
            />
          </div>
          <div>
            <h2 className=" text-xl lg:text-3xl font-extrabold mb-3">Start with some key details</h2>
            <p className="text-gray-700 mb-2 text-lg">TNV uses your inputs and compares data to 1000's of similar sites that have sold on TNV. We look at business model, category, age and many other factors.</p>
            <p className="text-gray-700 text-lg">We also consider how many buyers are interested in sites like yours.</p>
          </div>
        </div>

        {/* Accurate Valuation Section */}
        <div className="flex items-center gap-8 flex-row-reverse">
          <div className="w-24 h-24 flex-shrink-0">
            <Image 
              src="/images/start.png" 
              alt="Accurate valuation icon" 
              width={96} 
              height={96} 
              className="w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-xl lg:text-3xl font-extrabold mb-3">Accurate & instant valuation</h2>
            <p className="text-gray-700 mb-2 text-lg">TNV has more historical sales data than anyone else. If the information you provide is accurate, your Flippa valuation will be a good indicator of price.</p>
            <p className="text-gray-700 text-lg">No waiting around! You will receive your valuation instantly. You will also be able to save and share your valuation.</p>
          </div>
        </div>

        {/* Support Section */}
        <div className="flex items-center gap-8">
          <div className="w-24 h-24 flex-shrink-0">
            <Image 
              src="/images/start.png" 
              alt="Support icon" 
              width={96} 
              height={96} 
              className="w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-xl lg:text-3xl font-extrabold mb-3">Supporting you, all the way</h2>
            <p className="text-gray-700 mb-2 text-lg">Based on the information you have provided, we'll give you a view of the platform and how it works. You can then choose to sell privately or publicly on the marketplace.</p>
            <p className="text-gray-700 text-lg">Platform fees start from USD$39.</p>
          </div>
        </div>

        {/* Trust & Safety Section */}
        <div className="flex items-center gap-8 flex-row-reverse">
          <div className="w-24 h-24 flex-shrink-0">
            <Image 
              src="/images/start.png" 
              alt="Trust and safety icon" 
              width={96} 
              height={96} 
              className="w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-xl lg:text-3xl font-extrabold mb-3">Trust & Safety by Design</h2>
            <p className="text-gray-700 text-lg">Flippa's marketplace integrity team plus sophisticated fraud prevention tools are in place to protect both buyer and seller.</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
        <button className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
          Get a Free Valuation
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        <div className="w-4 h-4 rounded-full bg-gray-400"></div>
        <div className="w-4 h-4 rounded-full bg-gray-300"></div>
        <div className="w-4 h-4 rounded-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export default WorkingValuationTool;
