import React from 'react';

const ValuationPageFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-6 flex justify-between items-center border-t border-gray-200 bg-black">
      <div className=" text-base lg:text-4xl font-extrabold text-white">
        The.Now.Company.
      </div>
      
      <div className=" text-xs lg:text-xl text-white">
        © {currentYear} The.Now.Company. All rights reserved.
      </div>
    </footer>
  );
};

export default ValuationPageFooter;