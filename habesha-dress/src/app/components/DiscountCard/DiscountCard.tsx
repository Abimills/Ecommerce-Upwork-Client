import React from "react";
interface Item {
  img: string;
  title: string;
  desc: string;
}
interface Props {
  item: Item;
}
const DiscountCard: React.FC<Props> = ({ item }) => {
  const { img, title, desc } = item;
  return (
    <div className="flex  items-center gap-5">
      <img
        className="w-20 h-20 object-contain rounded-full"
        src={img}
        alt={title}
      />
      <div className=" flex  flex-col justify-start w-full">
        <h3 className="text-xl font-medium text-gray-900">{title}</h3>
        <p className=" text-xs text-green-400">{"20% discount"}</p>
      </div>
    </div>
  );
};

export default DiscountCard;
