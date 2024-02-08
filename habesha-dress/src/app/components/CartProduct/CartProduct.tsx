import React from "react";
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
  product: Item;
}
const CartProduct: React.FC<Props> = ({ product }) => {
  const { title, img, price, rating } = product;
  return (
    <section className="w-full flex items-start justify-around border-b border-gray-400 p-8">
      <img
        className="w-1/4 h-56 object-contain rounded-lg "
        src={img}
        alt={title}
      />

      <div className="">
        <h1 className="text-2xl text-gray-600 tracking-widest mb-3 ">
          {title}
        </h1>
        <p className="text-sm text-green-300 tracking-widest mb-1">In stock</p>
        <p className="my-2 text-sm tracking-widest ">
          Size : <span>S</span>
        </p>
        <p className="my-2 mb-6 text-sm tracking-widest ">
          Color : <span>Red</span>{" "}
        </p>
        <div className=" flex  w-full  justify-between my-2">
          <select
            name=""
            className="border border-gray-300 px-5 rounded-lg outline-none"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <div className="h-6 w-0.5  bg-gray-300 rounded-full"></div>
          <button className="text-orange-400 text-sm tracking-widest capitalize">
            delete
          </button>
        </div>
      </div>
      <div className="">
        <p className="bg-green-500 p-1 text-white px-2 mb-5">Deal 10% off</p>
        <p className="text-xl font-bold  my-2 tracking-widest">{price}</p>
        <p className="text-lg line-through text-gray-400 ">
          ${(parseInt(price) * 1.4)?.toFixed(2)}
        </p>
      </div>
    </section>
  );
};

export default CartProduct;
