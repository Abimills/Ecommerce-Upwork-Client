"use client";
import { IoMdArrowBack } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import data from "./wishData";
import CartProduct from "../components/CartProduct/CartProduct";
import Footer from "../components/Footer/Footer";
import { RootState } from "../lib/store";
import { useAppSelector } from "../lib/hooks";
import SingleNavigation from "../components/singleItemNavigation/SingleNav";
import SingleSearchBar from "../components/Searchbar/Searchbar";
import { useSelector } from "react-redux";
import { useState } from "react";
const Cart: React.FC = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const showSearch = useSelector((state: any) => state.cart.showSearch);
  const subTotal = cartItems.reduce(
    (total: number, current: any) => total + current.price * current.quantity,
    0
  );
  const total: number = subTotal + totalDiscount;
  return (
    <main className="w-full  min-h-screen p-2 bg-white">
      <div className=" mb-8">
        {!showSearch ? <SingleNavigation /> : <SingleSearchBar />}
      </div>
      <div className="w-full flex mb-24  justify-between min-h-screen p-5 gap-8 bg-white">
        {/* left side cart */}
        {cartItems?.length > 0 ? (
          <div className="w-2/3 ">
            <h1 className=" text-4xl leading-7 font-poppins w-full  r mb-5 flex justify-start gap-2  text-gray-600   font-semibold ">
              <FaShoppingBag className=" text-2xl" />
              <span className="">Shopping Cart </span>
            </h1>
            <div className="w-full flex flex-col">
              {cartItems.map((item: any) => (
                <CartProduct key={item.id} product={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-2/3 flex mt-8  flex-col">
            {/* empty orders page */}
            <div className=" w-full flex   items-center justify-center flex-col ">
              <img
                src="../cart-empty.gif"
                alt=""
                className="h-56 w-full object-contain rounded-full mb-8"
              />
              <h1 className="font-bold text-2xl tracking-wide mb-8 leading-normal">
                Your Cart is empty
              </h1>
              <p className="leading-normal text-base font-medium text-gray-500 mb-8">
                Get started and discover fashion for your whole family.
              </p>
              <button className="bg-black hover:bg-gray-800 w-1/2 text-white py-3 px-9 font-bold rounded-full">
                Shop Now!
              </button>
            </div>
          </div>
        )}
        {/* right side cart  */}
        <div className="w-1/3 bg-gray-100 font-poppins  text-base mt-8  p-8 h-max rounded-lg shadow-lg">
          <h1 className="text-xl font-medium mb-7 ">Order summary</h1>
          <div className="w-full flex items-center justify-between border-b border-gray-300">
            <p className="text-base text-lg text-gray-600 my-4 ">Subtotal</p>
            <p className="my-4 font-medium">${subTotal}</p>
          </div>
          <div className="w-full flex items-center justify-between border-b border-gray-300">
            <p className="text-base text-lg text-gray-600 my-4 ">
              Discount estimate
            </p>
            <p className="my-4 font-medium">$5.00</p>
          </div>
          {/* <div className="w-full flex items-center justify-between border-b border-gray-300">
            <p className="text-base text-lg text-gray-600 my-4 ">
              Tax estimate
            </p>
            <p className="my-4 font-medium">$8.32</p>
          </div> */}
          <div className="w-full flex items-center mt-2 justify-between ">
            <p className="text-base font-semibold text-lg text-gray-600 my-4 ">
              Order total
            </p>
            <p className="my-4 font-semibold">${total}</p>
          </div>
          <button className=" w-full my-4 border border-indigo-200 p-2 bg-indigo-600 py-4 font-semibold tracking-wide text-lg rounded-lg text-white">
            Checkout
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Cart;
