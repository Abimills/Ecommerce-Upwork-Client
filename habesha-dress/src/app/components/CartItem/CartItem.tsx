import React from "react";
interface Item {
  id: string;
  title: string;
  img: string;
  desc: string;
  price: string;
}
interface Props {
  item: Item;
}
const CartItem: React.FC<Props> = ({ item }) => {
  const { img, price } = item;
  return (
    <div className="w-full flex flex-col items-center justify-center mb-5 border-b border-gray-300">
      <img className="w-1/2 rounded-full " src={img} alt="" />
      <h2>{price}</h2>
      <div className="w-full  flex justify-evenly items-center my-4 p-2">
        <select
          className="border border-gray-300 px-5 rounded-full text-xs "
          name="quantity"
        >
          <option  value="1">
            1
          </option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <button className="border border-red-100  px-4 text-white bg-red-200 transition ease-in-out delay-300 hover:bg-red-600 text-xs rounded-2xl">
          {" "}
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;
