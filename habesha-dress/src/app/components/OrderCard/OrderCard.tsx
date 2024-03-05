import React from "react";
import { FcApproval } from "react-icons/fc";

const OrderCard = () => {
  return (
    <div className="w-full h-max flex items-start p-16 border border-gray-300">
      <div className="">
        <img
          src="/hab42.png"
          alt=""
          className=" object-contain  h-56 w-56 flex items-start p-4 rounded-lg mb-4 bg-gray-200 "
        />
        <div className="w-full flex-1 h-max  items-center justify-between">
          <p className="w-max flex items-center gap-6">
            <FcApproval className="text-green-400 text-2xl " />{" "}
            <span className="text-gray-400">Delivered on July 21,2024</span>
          </p>
        </div>
      </div>
      <div className=" w-full flex items-start flex-col">
        <span className="w-full flex items-center p-0.5 justify-between my-3">
          <h2 className=" text-xl text-black font-medium ">Micro Dress</h2>
          <h2 className="text-xl text-black  font-medium">$70.00</h2>
        </span>
        <p className="text-lg mb-4 p-0.5 text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat iusto
          quod perspiciatis eaque error distinctio quia quaerat dolorum eum
          odio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          iusto quod perspiciatis eaque error distinctio quia quaerat dolorum
          eum odio!
        </p>
        <div className="flex w-full  justify-end gap-8 items-end">
          <p className=" text-indigo-600 cursor-pointer">View product</p>|
          <p className="text-indigo-600 cursor-pointer font-medium">
            Buy again
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
