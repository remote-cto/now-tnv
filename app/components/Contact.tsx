"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Headphones, Lightbulb } from 'lucide-react';

const Contact = () => {
  const router = useRouter();

  const handleStartValuation = () => {
    router.push('/valuation'); 
  };

  return (
    <div className="w-full px-6 py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Need Help?
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          We understand that buying or selling a digital business isn't easy. If you have any questions or require assistance, feel free to contact us anytime.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="group p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-200">
                <Headphones className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 ml-4">
                Contact Customer Support
              </h3>
            </div>
            <p className="text-gray-600 mb-6 text-left">
              Search our knowledge base for answers to common questions.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
            >
              Go to Help Center <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          <div className="group p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors duration-200">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 ml-4">
                Read Flippa's Customer Guide
              </h3>
            </div>
            <p className="text-gray-600 mb-6 text-left">
              Learn how we can help you buy and sell online businesses.
            </p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={handleStartValuation}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
              >
                Start your Valuation
              </button>
              <a
                href="#"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
              >
                Learn more <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;