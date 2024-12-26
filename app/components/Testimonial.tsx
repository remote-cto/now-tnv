import React from 'react';
import Image from 'next/image';

const testimonialImages = [
  '/images/TM1.png',
  '/images/TM2.svg',
  '/images/TM3.png',
  '/images/TM4.png',
];

const Testimonial = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          17,000 new buyers join monthly.
        </h2>
        <p className="text-xl md:text-2xl text-gray-700">
          We provide them with more choice and absolute transparency.
        </p>
      </div>

      {/* Testimonial Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonialImages.map((imageSrc, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 group hover:opacity-95 transition-opacity"
          >
            {/* Background Image */}
            <Image
              src={imageSrc}
              alt={`Testimonial ${index + 1}`}
              layout="fill"
              objectFit="cover"
              quality={80}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
