"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ValuationToolProps {
  // Add props if needed
}

const WorkingValuationTool: React.FC<ValuationToolProps> = () => {
  const [activeSection, setActiveSection] = useState(0);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const sections = [
    {
      title: "Start with some key details",
      description: [
        "TNV uses your inputs and compares data to 1000's of similar sites that have sold on TNV. We look at business model, category, age and many other factors.",
        "We also consider how many buyers are interested in sites like yours."
      ]
    },
    {
      title: "Accurate & instant valuation",
      description: [
        "TNV has more historical sales data than anyone else. If the information you provide is accurate, your Flippa valuation will be a good indicator of price.",
        "No waiting around! You will receive your valuation instantly. You will also be able to save and share your valuation."
      ]
    },
    {
      title: "Supporting you, all the way",
      description: [
        "Based on the information you have provided, we'll give you a view of the platform and how it works. You can then choose to sell privately or publicly on the marketplace.",
        "Platform fees start from USD$39."
      ]
    },
    {
      title: "Trust & Safety by Design",
      description: [
        "Flippa's marketplace integrity team plus sophisticated fraud prevention tools are in place to protect both buyer and seller."
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-xl lg:text-4xl font-extrabold mb-2">HOW DOES THE VALUATION TOOL WORK?</h1>
        <p className="text-gray-800 text-xl">We provide them with more choice and absolute transparency.</p>
      </motion.div>

      <div className="space-y-16">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-8 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            onMouseEnter={() => setActiveSection(index)}
          >
            <motion.div 
              className="w-24 h-24 flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image 
                src="/images/start.png" 
                alt={`${section.title} icon`} 
                width={96} 
                height={96} 
                className="w-full h-full"
              />
            </motion.div>
            <div className={`transform transition-all duration-300 ${activeSection === index ? 'scale-105' : 'scale-100'}`}>
              <h2 className="text-xl lg:text-3xl font-extrabold mb-3">{section.title}</h2>
              {section.description.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-gray-700 mb-2 text-lg">{paragraph}</p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/valuation">
          <motion.button 
            className="bg-black text-white px-7 py-3 rounded-full font-extrabold text-2xl"
            whileHover={{ scale: 1.05, backgroundColor: '#333' }}
            whileTap={{ scale: 0.95 }}
          >
            Get a Free Valuation
          </motion.button>
        </Link>
      </motion.div>

      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className={`w-6 h-6 rounded-full ${dot === activeSection % 3 ? 'bg-gray-500' : 'bg-gray-300'}`}
            whileHover={{ scale: 1.2 }}
            animate={{ 
              backgroundColor: dot === activeSection % 3 ? '#6B7280' : '#D1D5DB'
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkingValuationTool;