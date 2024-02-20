import React from "react";
interface Item {
  img: string;
  title: string;
  desc: string;
}
interface Props {
  item: Item;
}
const WelcomeCard: React.FC<Props> = ({ item }) => {
  const { img, title, desc } = item;
  return (
    <div className="flex flex-col  items-center gap-5">
      <img
        className="w-56 h-72 object-contain rounded-lg bg-indigo-100"
        src={img}
        alt={title}
      />
      <div className=" flex  flex-col justify-start w-full">
        <h3 className="text-xl font-medium text-gray-900 text-center">
          {"Wedding"}
        </h3>
        <button className="text-center text-sm text-black font-thinner underline hover:font-bold ">
          Shop now{" "}
        </button>
      </div>
    </div>
  );
};

export default WelcomeCard;
