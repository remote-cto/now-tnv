// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";

// const WorkingValuationTool = () => {
//   const [activeSection, setActiveSection] = useState(0);

//   const fadeInUp = {
//     initial: { opacity: 0, y: 20 },
//     whileInView: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6 },
//     },
//   };

//   const sections = [
//     {
//       title: "Start with some key details",
//       description: [
//         "TNV uses your inputs and compares data to 1000's of similar sites that have sold on TNV. We look at business model, category, age and many other factors.",
//         "We also consider how many buyers are interested in sites like yours.",
//       ],
//       imageSrc: "/images/START.svg",
//     },
//     {
//       title: "Accurate & instant valuation",
//       description: [
//         "TNV has more historical sales data than anyone else. If the information you provide is accurate, your Flippa valuation will be a good indicator of price.",
//         "No waiting around! You will receive your valuation instantly. You will also be able to save and share your valuation.",
//       ],
//       imageSrc: "/images/ACCURATE.svg",
//     },
//     {
//       title: "Supporting you, all the way",
//       description: [
//         "Based on the information you have provided, we'll give you a view of the platform and how it works. You can then choose to sell privately or publicly on the marketplace.",
//         "Platform fees start from USD$39.",
//       ],
//       imageSrc: "/images/SUPPORTING.svg",
//     },
//     {
//       title: "Trust & Safety by Design",
//       description: [
//         "TNV's marketplace integrity team plus sophisticated fraud prevention tools are in place to protect both buyer and seller.",
//       ],
//       imageSrc: "/images/TRUSTED.svg",
//     },
//   ];

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12">
//       <motion.div
//         className="text-center mb-16"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 font-['helveticanowtext-black-demo]">
//           HOW DOES THE VALUATION TOOL WORK?
//         </h1>
//         <p className="text-black text-2xl font-semibold font-['helveticanowtext-black-demo]">
//           We provide them with more choice and absolute transparency.
//         </p>
//       </motion.div>

//       <div className="space-y-24">
//         {sections.map((section, index) => (
//           <motion.div
//             key={index}
//             className={`flex flex-col lg:flex-row items-center gap-12 ${
//               index % 2 === 1 ? "lg:flex-row-reverse" : ""
//             }`}
//             variants={fadeInUp}
//             initial="initial"
//             whileInView="whileInView"
//             viewport={{ once: true, margin: "-100px" }}
//             onMouseEnter={() => setActiveSection(index)}
//           >
//             <motion.div
//               className="w-48 h-48 lg:w-64 lg:h-64 flex-shrink-0 cursor-pointer"
//               whileHover={{ scale: 1.15, rotate: 5 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Image
//                 src={section.imageSrc}
//                 alt={`${section.title} icon`}
//                 width={256}
//                 height={256}
//                 className="w-full h-full object-contain  rounded-xl"
//               />
//             </motion.div>
//             <div className="flex-1">
//               <h2 className="text-2xl lg:text-4xl font-extrabold mb-4 font-['helveticanowtext-black-demo]">
//                 {section.title}
//               </h2>
//               {section.description.map((paragraph, pIndex) => (
//                 <motion.p
//                   key={pIndex}
//                   className="text-black mb-3 text-xl font-['helveticanowtext-black-demo]"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: pIndex * 0.2 }}
//                 >
//                   {paragraph}
//                 </motion.p>
//               ))}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <motion.div
//         className="mt-16 "
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         <Link href="/valuation">
//           <motion.button
//             className="bg-black text-white px-10 py-4 rounded-full font-extrabold text-xl lg:text-3xl shadow-xl font-['helveticanowtext-black-demo]"
//             whileHover={{ scale: 1.05, backgroundColor: "#333" }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Get a Free Valuation
//           </motion.button>
//         </Link>
//       </motion.div>
//     </div>
//   );
// };

// export default WorkingValuationTool;



import React from "react";

const WorkingValuationTool = () => {
  return (
    <div className="min-h-[400px] w-full bg-black flex flex-col items-center justify-center px-6 py-16 font-['helveticanowtext-black-demo'] ">
      <div className="max-w-3xl">
        <p className="text-white text-lg lg:text-2xl font-semibold mb-6 leading-tight font-['helveticanowtext-black-demo']">
          Every business has a story, and understanding its value is a key part
          of that journey<span className="font-sans font-bold">.</span> Valuation<span className="text-red-600 font-sans font-bold">.</span>Pro offers a clear, data-driven way to
          understand your business's worth. With a powerful algorithm at its
          core, it analyzes the essentials and provides reliable insight in
          moments.
        </p>

        <p className="text-white text-lg lg:text-2xl font-semibold  leading-tight font-['helveticanowtext-black-demo']">
          It's a straightforward, no-frills approach to help you see your
          business from a fresh perspective.
        </p>
      </div>
      <div className="w-full h-px bg-white mt-16"></div>
    </div>
  );
};

export default WorkingValuationTool;
