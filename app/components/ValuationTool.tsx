
import React from "react";
import Image from "next/image";
import Link from "next/link";

const ValuationTool = () => {
  return (
    <div className="bg-black h-[70vh] lg:h-[88vh] relative overflow-hidden ">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 -translate-x-1/2 top-20 flex items-center justify-center lg:flex-row flex-col">
          {/* Gray cross */}
          <div className="relative w-[300px] h-[300px] lg:w-[500px] lg:h-[500px]">
            <Image
              src="/images/Cross.png"
              alt="Decorative cross"
              fill
              className="object-contain opacity-80"
              priority
            />
          </div>

          {/* Blue circle - hidden on smaller screens */}
          <div className="relative w-[400px] h-[300px] lg:w-[600px] lg:h-[500px] -ml-0 lg:-ml-20 hidden md:block">
            <Image
              src="/images/Circle.png"
              alt="Decorative circle"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-24 md:pt-48">
        <div className="space-y-4 md:ml-64 text-center md:text-left">
          <div className="text-white text-6xl lg:text-8xl font-bold font-['helveticanowtext-black-demo]">
            Valuation<span className="text-red-500">.</span>
          </div>
          <h2 className="text-white text-6xl lg:text-8xl font-bold font-['helveticanowtext-black-demo]">
            Pro<span className="text-red-500">.</span>
          </h2>
          <Link href="/valuation">
            <div className="pt-6 md:pt-8">
              <button className="text-white text-2xl lg:text-4xl font-bold hover:text-gray-200 transition-colors duration-200 group font-['helveticanowtext-black-demo]">
                Get Started
                <span className="text-yellow-200 group-hover:text-yellow-300 ml-1">
                  +
                </span>
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ValuationTool;
