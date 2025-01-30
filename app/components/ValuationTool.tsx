import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

const ValuationTool = () => {
  return (
    <section className="relative w-full bg-black ">
      <div className="relative w-full">
       
        <div className="w-full relative">
          <img
            className="w-full min-h-[200px]"
            src="images/Valuation.png"
            alt="Valuation Tool"
          />
          
        
          <div className="absolute bottom-1/4 md:bottom-1/3 left-[8%]">
            <Link
              href="/valuation"
              className="flex items-center text-white text-xl lg:text-4xl font-bold font-['helveticanowtext-black-demo']"
            >
              Get Started
              <Plus 
                className="text-yellow-300 ml-1" 
                size={25}  
                strokeWidth={4}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuationTool;