import React from "react";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";

import DiscountCard from "../DiscountCard/DiscountCard";
import { data } from "./data";
const Discount: React.FC = () => {
  return (
    <main className="flex  w-full p-5 bg-green-100 items-center justify-between">
      {data.map((item) => {
        return <DiscountCard item={item} key={item.id} />;
      })}
      <LiaAngleDoubleRightSolid className="text-lg text-gray-400" />
    </main>
  );
};

export default Discount;
