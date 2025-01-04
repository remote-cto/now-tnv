"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ValuationQuestionAnswer = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white lg:h-[85vh] flex items-center py-8 lg:py-0 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-white"></div>

      <section className="w-full relative z-10">
        <div className="mx-auto max-w-screen-xl px-4 flex flex-wrap lg:flex-nowrap lg:items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-6xl font-extrabold text-black mb-6 animate-fade-in">
              Valuation Questions & Answers
            </h2>
            <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-6 animate-fade-in">
              Start with some key details
            </h2>

            <div className="transform transition-all duration-500 hover:scale-105">
              <p className="text-lg text-black/90 sm:text-xl mb-4">
                TNV uses your inputs and compares data to thousands of similar
                sites that have sold on TNV. We analyze business model,
                category, age and other factors.
              </p>
              <p className="text-lg text-black/90 sm:text-xl mb-4">
                We also consider how many buyers are interested in sites like
                yours.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 mb-6 lg:mb-0 lg:pl-10">
            <div className="relative group transform transition-all duration-500 hover:scale-105">
              <Image
                src="/images/Valuation.jpg"
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

export default ValuationQuestionAnswer;
