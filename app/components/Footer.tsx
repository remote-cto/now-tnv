import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-4 px-6 flex justify-between items-center border-t border-gray-200 mb-1">
      <div className="text-xl font-bold">
        The.Now.Company.
      </div>
      
      <div className="text-sm text-gray-600">
        © {currentYear} The.Now.Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;