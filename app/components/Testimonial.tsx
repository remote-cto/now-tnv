// import React from 'react';
// import Image from 'next/image';

// const testimonialImages = [
//   '/images/TM1.png',
//   '/images/TM2.svg',
//   '/images/TM3.png',
//   '/images/TM4.png',
// ];

// const Testimonial = () => {
//   return (
//     <div className="w-full bg-gradient-to-b from-white to-gray-50">
//       <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
//         {/* Header Section with enhanced typography and spacing */}
//         <div className="text-center mb-16 space-y-4">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
//               17,000
//             </span>
//             {' '}new buyers join monthly.
//           </h2>
//           <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
//             We provide them with more choice and absolute transparency.
//           </p>
//         </div>

//         {/* Enhanced Testimonial Images Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {testimonialImages.map((imageSrc, index) => (
//             <div
//               key={index}
//               className="group relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
//             >
//               {/* Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              
//               {/* Background Image with enhanced quality */}
//               <Image
//                 src={imageSrc}
//                 alt={`Testimonial ${index + 1}`}
//                 layout="fill"
//                 objectFit="cover"
//                 quality={90}
//                 className="transform group-hover:scale-105 transition-transform duration-500"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Testimonial;