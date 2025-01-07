"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ValuationTool = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-black lg:h-[88vh] flex items-center py-8 lg:py-0 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black"></div>

      <section className="w-full relative z-10">
        <div className="mx-auto max-w-screen-xl px-4 flex flex-wrap lg:flex-nowrap lg:items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 animate-fade-in">
              <span className="bg-clip-text text-white">
                The.Now.Valuation.Tool
              </span>
            </h2>

            <div>
              <p className="text-lg text-white/90 sm:text-xl mb-4 font-['Helvetica']">
                Flippa uses your inputs and compares data to thousands of
                similar sites that have sold on Flippa. We analyze business
                model, category, age, and other factors.
              </p>
              <p className="text-lg text-white/90 sm:text-xl mb-4 font-['Helvetica']">
                We also consider how many buyers are interested in sites like
                yours.
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-start mt-7 mb-8 lg:mb-2">
              <Link href="/valuation">
                <button
                  className="relative overflow-hidden bg-white text-black px-7 py-3 rounded-full font-extrabold text-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span
                    className={`relative z-10  ${
                      isHovered ? "text-black" : ""
                    }`}
                  >
                    Get a Free Valuation
                  </span>
                  <div
                    className={`absolute inset-0 transition-transform duration-300 ${
                      isHovered ? "translate-x-0" : "-translate-x-full"
                    }`}
                  ></div>
                </button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pl-10">
            <div
              className="relative group transform transition-all duration-500 hover:scale-105"
              style={{
                filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))",
              }}
            >
              <Image
                src="/images/GROUP.svg"
                width={400}
                height={400}
                alt="Image Description"
                className="w-full h-auto transition-transform duration-300"
              />
              <div className="absolute inset-0 transition-opacity duration-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ValuationTool;
