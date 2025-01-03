import React from "react";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center">
        <div className=" text-lg lg:text-4xl font-extrabold ">
          The.Now.Company.
        </div>
      </div>

      {/* Right side - Social Media Icons */}
      <div className="flex items-center space-x-4">
        <a
          href="https://twitter.com/yourcompany"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-400 transition-colors"
        >
          <Twitter size={24} />
        </a>
        <a
          href="https://facebook.com/yourcompany"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Facebook size={24} />
        </a>
        <a
          href="https://instagram.com/yourcompany"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-pink-600 transition-colors"
        >
          <Instagram size={24} />
        </a>
        <a
          href="https://linkedin.com/company/yourcompany"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-700 transition-colors"
        >
          <Linkedin size={24} />
        </a>
      </div>
    </header>
  );
};

export default Header;
