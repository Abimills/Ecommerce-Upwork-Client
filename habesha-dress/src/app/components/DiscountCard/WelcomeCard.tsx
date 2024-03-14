import { useRouter } from "next/navigation";
import React from "react";
interface Item {
  img: string;
  title: string;
  searchTerm: string;
}
interface Props {
  item: Item;
}
const WelcomeCard: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const { img, title, searchTerm } = item;
  const handleSearch = (value: string) => {
    router.push(`/search?query=${value}`);
  };

  return (
    <div
      onClick={() => handleSearch(searchTerm)}
      className="flex flex-col  items-center gap-5"
    >
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
