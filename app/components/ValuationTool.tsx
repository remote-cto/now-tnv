import React from 'react';

interface NodeProps {
  label: string;
  className?: string;
}

const Node: React.FC<NodeProps> = ({ label, className = '' }) => (
  <div className={`
    bg-white 
    shadow-lg 
    rounded-lg 
    px-6 
    py-3 
    transform 
    transition-all 
    duration-300 
    hover:-translate-y-1 
    hover:shadow-xl
    absolute
    ${className}
  `}>
    <span className="text-gray-800 font-medium whitespace-nowrap">{label}</span>
  </div>
);

const ValuationTool: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-16">
          How does the valuation tool work?
        </h1>

        {/* Main Content Container */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Left Side - Diagram */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-square max-w-[500px] mx-auto relative">
              {/* Center Circle */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-16 h-16 bg-[#0084ff] rounded-full flex items-center justify-center shadow-lg">
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16 12.8L13.6 15.2C13.2 15.6 12.7 15.8 12.2 15.8C11.7 15.8 11.2 15.6 10.8 15.2L8 12.4V9.6L10.8 12.4L13.2 10L16 12.8Z"/>
                  </svg>
                </div>
              </div>

              {/* Connecting Lines */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <g stroke="#E5E7EB" strokeWidth="2" strokeDasharray="5,5">
                    {/* Lines from center to each node */}
                    <line x1="200" y1="200" x2="100" y2="100" />
                    <line x1="200" y1="200" x2="300" y2="100" />
                    <line x1="200" y1="200" x2="100" y2="300" />
                    <line x1="200" y1="200" x2="300" y2="300" />
                    <line x1="200" y1="200" x2="200" y2="100" />
                  </g>
                </svg>
              </div>

              {/* Nodes */}
              <Node label="Ecommerce" className="-translate-x-1/2 -translate-y-1/2 left-[25%] top-[25%]" />
              <Node label="FBA" className="left-1/2 top-[15%] -translate-x-1/2" />
              <Node label="Shopify" className="translate-x-[-50%] -translate-y-1/2 left-[75%] top-[25%]" />
              <Node label="Automotive" className="-translate-x-1/2 -translate-y-1/2 left-[25%] top-[75%]" />
              <Node label="2018" className="-translate-x-1/2 -translate-y-1/2 left-[75%] top-[75%]" />
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full lg:w-1/2 px-4 lg:px-8">
            <div className="max-w-lg">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
                Start with some key details
              </h2>
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Flippa uses your inputs and compares data to 1000's of similar sites that have sold on Flippa. We look at business model, category, age and many other factors.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We also consider how many buyers are interested in sites like yours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationTool;