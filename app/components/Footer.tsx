import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-6 flex justify-between items-center border-t border-gray-200 mb-1 font-['Helvetica']">
      <div className="text-base lg:text-4xl font-extrabold">
        The
        <span className="inline-block mx-1 w-1 h-1 lg:w-3 lg:h-3 bg-black rounded-full"></span>
        Now
        <span className="inline-block mx-1 w-1 h-1 lg:w-3 lg:h-3 bg-black rounded-full"></span>
        Company
        <span className="inline-block mx-1 w-1 h-1 lg:w-3 lg:h-3 bg-black rounded-full"></span>
      </div>

      <div className="text-xs lg:text-base text-gray-700 font-semibold">
        © {currentYear} The.Now.Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
