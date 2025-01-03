import React from "react";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center">
        <div className=" text-xl lg:text-4xl font-extrabold ">
          The.Now.Company.
        </div>
      </div>

      {/* Right side - Social Media Icons */}
      <div className="flex items-center space-x-1 lg:space-x-3">
      <a
          href="https://twitter.com/yourcompany"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black rounded-full p-2"
        >
          <Twitter size={16} className="text-white" />
        </a>
        <a
          href="https://facebook.com/yourcompany"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black rounded-full p-2"
        >
          <Facebook size={16} className="text-white" />
        </a>
        <a
          href="https://instagram.com/yourcompany"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black rounded-full p-2"
        >
          <Instagram size={16} className="text-white" />
        </a>
        <a
          href="https://linkedin.com/yourcompany"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black rounded-full p-2"
        >
          <Linkedin size={16} className="text-white" />
        </a>

      </div>
    </header>
  );
};

export default Header;
