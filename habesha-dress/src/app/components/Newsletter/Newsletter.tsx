import React from "react";
import { GiClover } from "react-icons/gi";

const Newsletter = () => {
  return (
    <section className="w-full flex items-center justify-around p-3 mb-10 shadow-lg  mt-16 bg-gray-100 rounded-lg">
      <div className=" w-1/2 mt-4 flex flex-col items-start p-4">
        <p className="text-gray-300 capitalize mb-3 ">be family</p>
        <h1 className="text-black text-6xl uppercase font-semibold mb-6">
          Subscribe to the
          <br /> News
        </h1>
        <p className="capitalize text-gray-600 text-sm  mb-3">
          never miss your favorite product with
          <br /> Noami clothes{" "}
          <GiClover className="inline text-green-300  text-xl" />
        </p>
        <button className="border border-gray-500 mt-4 rounded text-sm  p-1 pl-4 pr-4">
          Subscribe
        </button>
      </div>
      <div className="w-1/2 bg-red-100 mt-2 ">
        <img className="w-full h-full object-contain" src="../sub.png" alt="" />
      </div>
    </section>
  );
};

export default Newsletter;
