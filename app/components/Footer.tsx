import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-6 flex justify-between items-center border-t border-gray-200 mb-1">
      <div className=" text-base lg:text-4xl font-extrabold ">
        The.Now.Company.
      </div>
      
      <div className=" text-xs lg:text-base text-gray-700 font-semibold font-['Helvetica']">
        © {currentYear} The.Now.Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;