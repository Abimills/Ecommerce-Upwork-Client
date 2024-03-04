import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { addToFavorites } from "@/app/lib/cartSlice/cartSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import axios from "axios";
interface Item {
  _id: string;
  img: string;
  title: string;
  desc: string;
  price: number;
}
interface Props {
  item: Item;
}
const InspirationCard: React.FC<Props> = ({ item }) => {
  const { img, title, _id } = item;
  const favorites = useSelector((state: any) => state.cart.favorites);
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useAppDispatch();

  const [isFavored, setIsFavored] = useState(favorites?.includes(_id) || false);
  const addToDbFavorites = async (userId: any, itemId: any) => {
    const res = await axios.put("http://localhost:3000/api/user", {
      userId,
      itemId,
    });
  };

  const handleFavorites = (id: any) => {
    dispatch(addToFavorites(id));
    setIsFavored(!isFavored);
    if (user) {
      addToDbFavorites(user._id, id);
    }
  };
  return (
    <div className="flex flex-col  items-center gap-5">
      {!isFavored ? (
        <IoIosHeartEmpty
          onClick={() => handleFavorites(_id)}
          className="absolute  text-2xl m-1 text-gray-500 right-0 "
        />
      ) : (
        <IoIosHeart
          onClick={() => handleFavorites(_id)}
          className="absolute  text-2xl m-1 text-black right-0 "
        />
      )}
      <img
        className="w-72 h-96 object-contain rounded-lg bg-gray-100"
        src={img}
        alt={title}
      />
      <div className=" flex  flex-col justify-start w-full">
        <h3 className="text-base  w-full text-left text-gray-900 ">{title}</h3>
        <div className=" flex items-center  justify-evenly w-full my-4">
          <p className=" flex-1 text-black text-xl font-semibold text-left text-sm text-black font-thinner  ">
            ${item.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InspirationCard;
