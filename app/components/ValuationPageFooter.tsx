import React from "react";

const ValuationPageFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-6 flex justify-between items-center border-t border-gray-200 bg-black font-['helveticanowtext-black-demo']">
      <div className="text-base lg:text-4xl font-extrabold text-white">
        The
        <span className="inline-block  w-1 h-1 lg:w-3 lg:h-3 bg-white rounded-full "></span>
        Now
        <span className="inline-block  w-1 h-1 lg:w-3 lg:h-3 bg-white rounded-full "></span>
        Company
        <span className="inline-block  w-1 h-1 lg:w-3 lg:h-3 bg-white rounded-full "></span>
      </div>

      <div className="text-xs lg:text-base text-white font-semibold font-['helveticanowtext-black-demo']">
        © {currentYear} The.Now.Company. All rights reserved.
      </div>
    </footer>
  );
};

export default ValuationPageFooter;
