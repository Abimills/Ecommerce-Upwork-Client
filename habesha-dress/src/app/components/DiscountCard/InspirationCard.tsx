import React from "react";
interface Item {
  img: string;
  title: string;
  desc: string;
  price: number;
}
interface Props {
  item: Item;
}
const InspirationCard: React.FC<Props> = ({ item }) => {
  const { img, title, desc } = item;
  return (
    <div className="flex flex-col  items-center gap-5">
      <img
        className="w-72 h-96 object-contain rounded-lg bg-gray-100"
        src={img}
        alt={title}
      />
      <div className=" flex  flex-col justify-start w-full">
        <h3 className="text-base font-medium w-full text-left text-gray-900 ">
          {title}
        </h3>
        <div className=" flex items-center  justify-evenly w-full my-4">
          <p className=" flex-1 text-yellow-400 text-xl text-left text-sm text-black font-thinner  ">
            ${item.price}
          </p>
          <button className="bg-black text-white p-1 rounded-full text-sm px-8">
           check
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspirationCard;
