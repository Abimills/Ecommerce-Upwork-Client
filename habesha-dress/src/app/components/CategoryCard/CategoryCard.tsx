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
    router.push(`/filtered-products/${category}`);
  };
  return (
    <div
      onClick={handleClick}
      className="w-full flex flex-col items-center hover:text-yellow-200"
    >
      <div className="w-60 h-96 bg-indigo-200 overflow-hidden rounded-full hover:bg-yellow-200">
        <img
          src={img}
          alt={title}
          className=" rounded-lg h-full object-cover overflow-hidden  w-full"
        />
      </div>

      <h2 className="text-lg font-semibold mt-4 italic uppercase font-poppins text-indigo-400   ">
        {title}
      </h2>
    </div>
  );
};

export default CategoryCard;
