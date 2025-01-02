import Image from "next/image";
import Link from "next/link";
import React from "react";

const ValuationTool = () => {
  return (
    <div className="bg-gray-900">
      <section className="mt-5">
        <div className="mx-auto max-w-screen-xl px-4 flex flex-wrap lg:flex-nowrap lg:items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              The.Now.Valuation.Tool
            </h2>
            <p className="text-xl font-extrabold sm:text-3xl mb-4 text-white">
              Start with some key details
            </p>
            <p className="text-lg text-white sm:text-xl mb-4">
              Flippa uses your inputs and compares data to thousands of similar
              sites that have sold on Flippa. We analyze business model,
              category, age, and other factors.
            </p>
            <p className="text-lg text-white sm:text-xl mb-4">
              We also consider how many buyers are interested in sites like
              yours.
            </p>
            <div className="mt-8 flex flex-col items-center lg:items-start">
              <Link
                href="/valuation"
                className="block w-full rounded bg-white px-12 py-3 text-xl text-gray-950 font-bold sm:w-auto"
              >
                Get a Free Valuation
              </Link>
              
              {/* Three Circles */}
              <div className="flex gap-4 mt-6">
              <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                <div className="w-4 h-4 rounded-full bg-gray-500"></div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pl-10">
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
        </div>
      </section>
    </div>
  );
};

export default ValuationTool;