"use client";
import React, { useState, useEffect } from "react";

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-500 ${
        !isLoading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-black border-r-black animate-[spin_2s_linear_infinite]"></div>

          <div className="absolute inset-2 rounded-full border-6 border-transparent border-t-gray-600 border-l-gray-600 animate-[spin_1.5s_linear_infinite_reverse]"></div>

          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-gray-700 to-black animate-[pulse_1s_ease-in-out_infinite]"></div>

          <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-black animate-[bounce_1s_ease-in-out_infinite]"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-gray-600 animate-[bounce_1s_ease-in-out_infinite_0.5s]"></div>
        </div>

        <div className="text-gray-800 font-medium tracking-wider animate-[pulse_2s_ease-in-out_infinite]">
          LOADING
        </div>

        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-black animate-[bounce_1s_ease-in-out_infinite]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-700 animate-[bounce_1s_ease-in-out_infinite_0.2s]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600 animate-[bounce_1s_ease-in-out_infinite_0.4s]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-500 animate-[bounce_1s_ease-in-out_infinite_0.6s]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
