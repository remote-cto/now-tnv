import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

const ValuationTool = () => {
  return (
    <section className="bg-black">
      <div className="w-[70%] mx-auto h">
        <img
          className="w-full h-auto max-w-full"
          src="images/Valuation.jpg"
          alt="Valuation Tool"
        />
        <div className="text-center">
          <Link
            href="/valuation"
            className="flex items-center justify-center text-white text-xl lg:text-4xl font-bold font-['helveticanowtext-black-demo]"
          >
            Get Started
            <Plus className="text-yellow-300 ml-2 text-xl font-bold" /> 
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ValuationTool;
