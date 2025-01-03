import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center text-white py-12 px-4 mb-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Heading */}
        <h1 className=" text-3xl lg:text-5xl font-extrabold mb-6">
          Need Help?
        </h1>

        {/* Main text */}
        <div className="space-y-4">
          <p className="text-2xl">
            We understand that buying or selling a digital business isn't easy.
          </p>
          <p className="text-2xl">
            If you have any questions or require assistance, feel free to contact us anytime.
          </p>
        </div>

        {/* Contact Information */}
        <div className="space-y-4 mt-12">
          <p className="text-xl">
            email: xxyxyxyx@tnv.com
          </p>
          <p className="text-xl">
            customer support: +00000 0000 0000
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;