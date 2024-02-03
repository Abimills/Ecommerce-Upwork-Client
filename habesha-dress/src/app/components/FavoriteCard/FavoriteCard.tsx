import { IoCloseOutline } from "react-icons/io5";

interface Item {
  id: string;
  title: string;
  description: string;
  img: string;
  price: string;
  rating: string;
  available_sizes: string[];
  available_colors: string[];
  purchasedNo: number;
  type: string;
  typeOfClothes: string;
}
interface Props {
  item: Item;
}
const FavoriteCard: React.FC<Props> = ({ item }) => {
  const { title, img, price, rating } = item;

  return (
    <div className="w-72 min-h-80 shadow-xl flex flex-col items-center m-1  bg-white p-3 ">
      <div className="w-full flex  justify-end p-1 mb-3">
        <IoCloseOutline className="text-xl mt-2 ml-2 cursor-pointer" />
      </div>
      <img
        className="w-full h-40 object-cover rounded-lg mb-8"
        src={img}
        alt={title}
      />
      <div className="w-full flex flex-col p-2 gap-3 ">
        <div className="flex items-center justify-between  w-full">
          <h2>{title}</h2>
          <p>{rating}</p>
        </div>
        <p className="font-bold">{price}</p>
        <div className=" w-full flex items-center mt-4 justify-between">
          <button className="border border-gray-600 p-1 text-xs   rounded-sm ">
            Add to Cart
          </button>
          <button className="border border-orange-300 p-1 text-xs bg-orange-300 text-white rounded-sm ">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
