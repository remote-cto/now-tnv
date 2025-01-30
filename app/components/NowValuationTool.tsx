import React from "react";

const NowValuationTool = () => {
  return (
    <div>
      <div className="w-full py-4 px-6 flex justify-between items-center border-t border-gray-200 mb-1 bg-black">
        <div className="text-xl lg:text-5xl font-extrabold text-white font-['helveticanowtext-black-demo'] ">
          The
          <span className="inline-block  w-1 h-1 lg:w-3 lg:h-3 bg-white rounded-full"></span>
          Now
          <span className="inline-block  w-1 h-1 lg:w-3 lg:h-3 bg-white rounded-full"></span>
          Valuation
          <span className="inline-block  w-1 h-1 lg:w-3 lg:h-3 bg-white rounded-full"></span>
          Tool
        </div>
      </div>
    </div>
  );
};

export default NowValuationTool;
