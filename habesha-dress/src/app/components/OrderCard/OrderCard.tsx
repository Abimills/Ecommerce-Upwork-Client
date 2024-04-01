import React from "react";
import { FcApproval } from "react-icons/fc";

interface Props {
  item: any;
}
const OrderCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="w-full h-max flex flex-col sm:flex-row items-start px-4 py-16 sm:p-16 border border-green-300">
      <div className="w-max">
        <img
          src={item.img}
          alt=""
          className=" object-contain  h-56 w-full sm:w-56 flex items-start  rounded-lg mb-4 bg-teal-10 "
        />
        <div className="w-full flex-1 h-max  items-center justify-between">
          <p className="w-max flex items-center gap-2">
            <FcApproval className="text-green-400 text-2xl " />{" "}
            <span className="text-gray-400">Order has been approved</span>
          </p>
        </div>
      </div>
      <div className=" w-full flex items-start flex-col ml-6">
        <span className="w-full flex items-center   gap-16 my-3">
          <h2 className=" text-xl   text-gray-700 font-medium w-1/4 ">
            {item.title?.slice(0, 20)}...
          </h2>
          <h2 className="text-xl text-black font-semibold ">
            ${item.discountedPrice?.toFixed(2)}
          </h2>
        </span>
        <span className="w-full flex items-center   gap-16 my-3 mb-6">
          <h2 className=" text-lg text-gray-700 font-base w-1/4 ">Quantity</h2>
          <h2 className="text-lg text-black font-semibold ml-3 ">
            x{item.quantity}
          </h2>
        </span>

        <div className="flex w-full  gap-8 items-center">
          <p className=" text-indigo-600 cursor-pointer  hover:underline hover:underline-offset-8 ">
            View product
          </p>
          |
          <p className="text-indigo-600 cursor-pointer hover:underline hover:underline-offset-8 font-medium">
            Buy again
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
