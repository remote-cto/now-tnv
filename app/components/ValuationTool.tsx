import Image from "next/image";
import React from "react";

const ValuationTool = () => {
  return (
    <>
      <section className="mt-10">
        <div className="mx-auto max-w-screen-xl px-4 text-center">
          <h2 className="text-2xl font-extrabold text-black sm:text-4xl">
            How does the valuation tool work?
          </h2>
        </div>
      </section>

      <section className="mt-10">
        <div className="mx-auto max-w-screen-xl px-4 flex flex-wrap lg:flex-nowrap lg:items-center">
          {/* Image Section */}
          <div className="lg:w-1/2 mb-6 lg:mb-0">
            <div className="relative group">
              <Image
                src="/images/Tool.svg"
                width={400}
                height={400}
                alt="Image Description"
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 lg:pl-10 text-center lg:text-left">
            <p className="text-xl font-extrabold text-gray-900 sm:text-3xl mb-4">
              Start with some key details
            </p>
            <p className="text-lg text-gray-700 sm:text-xl mb-4">
              Flippa uses your inputs and compares data to thousands of similar
              sites that have sold on Flippa. We analyze business model,
              category, age, and other factors.
            </p>
            <p className="text-lg text-gray-700 sm:text-xl mb-4">
              We also consider how many buyers are interested in sites like
              yours.
            </p>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default ValuationTool;
