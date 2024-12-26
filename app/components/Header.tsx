import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="flex items-center p-4 bg-gray-100">
      {/* Logo */}
      <Image 
        src="/images/CompanyLogo.svg" 
        alt="CompanyLogo" 
        width={150} 
        height={150} 
        className="mr-5"
      />
      {/* Name */}
      {/* <h1 className="text-xl font-semibold">Brand Name</h1> */}
    </header>
  );
};

export default Header;
