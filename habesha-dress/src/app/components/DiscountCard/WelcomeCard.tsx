import React from "react";
interface Item {
  img: string;
  title: string;
}
interface Props {
  item: Item;
}
const WelcomeCard: React.FC<Props> = ({ item }) => {
  const { img, title } = item;
  return (
    <div className="flex flex-col  items-center gap-5">
      <img
        className="w-64 h-80 object-contain rounded-lg "
        src={img}
        alt={title}
      />
      <div className=" flex  flex-col justify-start w-full">
        <h3 className="text-xl font-medium text-gray-900 text-center mb-4">
          {title}
        </h3>
        <button className="text-center text-sm text-black font-thinner underline underline-offset-4 hover:font-bold ">
          Shop now{" "}
        </button>
      </div>
    </div>
  );
};

export default WelcomeCard;
