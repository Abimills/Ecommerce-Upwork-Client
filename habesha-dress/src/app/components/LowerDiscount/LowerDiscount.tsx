import React from "react";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { PiCaretDoubleLeftThin } from "react-icons/pi";

import DiscountCard from "../DiscountCard/DiscountCard";
import { data } from "./data";
const LowerDiscount: React.FC = () => {
  return (
    <main className="flex shadow-lg mt-4 rounded-xl  w-full p-5 bg-white items-center justify-between">
      <PiCaretDoubleLeftThin className="text-lg text-gray-400" />
      {data.map((item: any) => {
        return <DiscountCard item={item} key={item.id} />;
      })}
      <LiaAngleDoubleRightSolid className="text-lg text-gray-400" />
    </main>
  );
};

export default LowerDiscount;
