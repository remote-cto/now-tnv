"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Contact = () => {
  const router = useRouter();

  const handleStartValuation = () => {
    router.push('/valuation'); 
  };

  return (
    <div className="w-full px-4 py-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header Section */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Need Help?
        </h2>
        <p className="text-gray-600 mb-8">
          We understand that buying or selling a digital business isn’t easy. If you have any questions or require assistance, feel free to contact us anytime.
        </p>

        {/* Support Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Contact Customer Support Card */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                <span className="text-blue-500 text-xl">🎧</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 ml-4">
                Contact Customer Support
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Search our knowledge base for answers to common questions.
            </p>
            <a
              href="#"
              className="text-blue-500 font-medium hover:underline"
            >
              Go to Help Center →
            </a>
          </div>

          {/* Customer Guide Card */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                <span className="text-blue-500 text-xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 ml-4">
                Read Flippa’s Customer Guide
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Learn how we can help you buy and sell online businesses.
            </p>
            <button
              onClick={handleStartValuation}
              className="mt-4 mb-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              START YOUR VALUATION
            </button>
            <a
              href="#"
              className="text-blue-500 font-medium hover:underline"
            >
              Learn more →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
