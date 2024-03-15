"use client";
import { useRouter } from "next/navigation";

interface Item {
  img: string;
  title: string;
  desc: string;
  category: string;
}
interface Props {
  item: Item;
}

const CategoryCard: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const { img, title, desc, category } = item;
  const handleClick = () => {
    router.push(`/search?query=${category}`);
  };
  return (
    <div
      onClick={handleClick}
      className="w-max  flex flex-col items-center hover:text-yellow-200 cursor-pointer group"
    >
      <div className="w-88 h-80 relative bg-indigo-200 overflow-hidden rounded-sm hover:bg-yellow-200 ">
        <img
          src={img}
          alt={title}
          className=" rounded-lg h-full object-cover overflow-hidden  w-full"
        />

        <h2 className="text-lg absolute top-1/2  w-max bg-alice-blue px-6 py-1 cursor-pointer  z-10 font-bold mt-4 italic uppercase font-Dosis text-indigo-400 opacity-100 group-hover:opacity-0 transition-opacity duration-300   ">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default CategoryCard;
