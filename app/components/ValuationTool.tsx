import Image from 'next/image';
import React from 'react';

const ValuationTool = () => {
  return (
    <>
    <section className="mt-20">
    <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center">
      <div
        className="mx-auto max-w-xl text-center"
        
      >
        <h1 className="text-base  sm:text-3xl">
          <strong className=" text-black sm:block">
          How does the valuation tool work?
          </strong>
        </h1>
      </div>
    </div>
  </section>

  <section className="mt-5">
    <div className="mx-auto max-w-screen-xl px-4 lg:flex lg:items-center">
      <div
        className="lg:w-1/2"
       
      >
        <Image
          src="/images/Tool.svg"
          width={270}
          height={300}
          alt=" Image Description"
          className="w-full h-auto"
        />
      </div>

      <div
        className="lg:w-1/2 lg:pl-10 mt-6 lg:mt-0 text-center lg:text-left"
        
      >
        <p className='text-xl text-black  font-extrabold sm:text-3xl mb-4'>Start with some key details</p>
        <p className="text-xl text-black sm:text-xl">
        Flippa uses your inputs and compares data to 1000's of similar sites that have sold on Flippa. We look at business model, category, age and many other factors.
        </p>
        <p className="mt-4 text-black text-xl">
        We also consider how many buyers are interested in sites like yours.
        </p>
      </div>
    </div>
  </section>
  </>
  );
}

export default ValuationTool;
