import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="bg-black flex flex-col items-center justify-center text-white py-12 px-4 mb-4 font-['helveticanowtext-black-demo']">
      <div className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-3xl lg:text-6xl font-extrabold mb-6 font-['Helvetica']">
          Need Help?
        </h1>

        <div className="space-y-4 text-left">
          <p className="text-lg lg:text-2xl leading-tight font-['helveticanowtext-black-demo']">
            We understand that buying or selling a digital business isn't easy.
          </p>
          <p className="text-xl lg:text-2xl font-['helveticanowtext-black-demo']">
            If you have any questions or require assistance, feel free to
            contact us anytime.
          </p>
        </div>

        <div className="space-y-4 mt-12 text-left">
          <p className="text-lg lg:text-2xl font-['helveticanowtext-black-demo']">
            email :{" "}
            <a
              href="mailto:hello@nowvaluation.com"
              className="text-white hover:text-gray-300 underline"
            >
              hello@nowvaluation.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
