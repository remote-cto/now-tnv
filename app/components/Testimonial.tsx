import React from 'react';

interface TestimonialCard {
  purchaseType: string;
  role: string;
  company: string;
  icon?: string;
}

const testimonialData: TestimonialCard[] = [
  {
    purchaseType: '7-figure Adsense Site',
    role: 'CEO',
    company: 'Launch Potato',
    icon: '🟡'
  },
  {
    purchaseType: '8-figure App',
    role: 'CEO',
    company: 'Appex',
    icon: '▶️'
  },
  {
    purchaseType: '7-figure Ecom Store',
    role: 'Tech Executive',
    company: '',
    icon: 'S'
  },
  {
    purchaseType: '9 content websites',
    role: 'Investor',
    company: '',
    icon: 'W'
  }
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

      {/* Testimonial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonialData.map((item, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden bg-gray-900 group hover:opacity-95 transition-opacity"
          >
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
              <div className="mb-2">
                {item.icon && (
                  <span className="inline-block w-6 h-6 text-center leading-6 bg-white/20 rounded">
                    {item.icon}
                  </span>
                )}
              </div>
              <p className="text-lg font-medium mb-1">
                I bought a {item.purchaseType}
              </p>
              <div className="text-sm text-gray-300">
                {item.role}
                {item.company && `, ${item.company}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;