"use client";
import React, { useState } from "react";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [isHovered, setIsHovered] = useState("");

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/yourcompany", name: "facebook" },
    { icon: Instagram, href: "https://www.instagram.com/thenow.company/", name: "instagram" },
    { icon: Linkedin, href: "https://linkedin.com/yourcompany", name: "linkedin" },
  ];

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 transition-all duration-300 hover:bg-gray-200">
      <div className="flex items-center">
        <Link href="/">
          <div
            className="text-2xl lg:text-5xl font-extrabold relative group cursor-pointer"
            onMouseEnter={() => setIsHovered("logo")}
            onMouseLeave={() => setIsHovered("")}
          >
            <span className="bg-black bg-clip-text text-transparent font-['helveticanowtext-black-demo]">
              The
              <span className="inline-block  w-1 h-1 lg:w-3 lg:h-3 bg-black rounded-full font-['Uniform_Rounded_Condensed_Black]"></span>
              Now
              <span className="inline-block  w-1 h-1 lg:w-3 lg:h-3 bg-black rounded-full font-['Uniform_Rounded_Condensed_Black]"></span>
              Company
              <span className="inline-block  w-1 h-1 lg:w-3 lg:h-3 bg-black rounded-full font-['Uniform_Rounded_Condensed_Black]"></span>
            </span>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-1 lg:space-x-4">
        {socialLinks.map(({ icon: Icon, href, name }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative bg-black rounded-full p-2 transition-all duration-300 transform hover:scale-110 hover:bg-gray-800 ${
              isHovered === name ? "scale-110 bg-gray-800" : ""
            }`}
            onMouseEnter={() => setIsHovered(name)}
            onMouseLeave={() => setIsHovered("")}
          >
            <Icon
              size={20}
              className={`text-white transition-all duration-300 ${
                isHovered === name ? "animate-pulse" : ""
              }`}
            />
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;