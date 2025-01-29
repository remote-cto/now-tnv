import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="bg-black flex flex-col items-center justify-center text-white py-12 px-4 mb-4 font-['Helvetica'] ">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className=" text-3xl lg:text-5xl font-extrabold mb-6 font-['Helvetica'] ">
          Need Help?
        </h1>

        <div className="space-y-4">
          <p className="text-2xl font-['helveticanowtext-black-demo]">
            We understand that buying or selling a digital business isn't easy.
          </p>
          <p className="text-2xl font-['helveticanowtext-black-demo]">
            If you have any questions or require assistance, feel free to
            contact us anytime.
          </p>
        </div>

        <div className="space-y-4 mt-12">
          <p className="text-xl font-['helveticanowtext-black-demo]">
            email: hello@nowvaluation.com
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
