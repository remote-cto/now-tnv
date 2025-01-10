import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-6 flex justify-between items-center border-t border-gray-200 mb-1 font-['helveticanowtext-black-demo] font-extrabold">
      <div className="text-base lg:text-4xl ">
        The
        <span className="inline-block w-1 h-1 lg:w-3 lg:h-3 bg-black rounded-full font-['Uniform_Rounded_Condensed_Black]"></span>
        Now
        <span className="inline-block  w-1 h-1 lg:w-3 lg:h-3 bg-black rounded-full font-['Uniform_Rounded_Condensed_Black]"></span>
        Company
        <span className="inline-block  w-1 h-1 lg:w-3 lg:h-3 bg-black rounded-full font-['Uniform_Rounded_Condensed_Black]"></span>
      </div>

      <div className="text-xs lg:text-base text-gray-700 font-semibold font-['helveticanowtext-black-demo]">
        © {currentYear} The.Now.Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
