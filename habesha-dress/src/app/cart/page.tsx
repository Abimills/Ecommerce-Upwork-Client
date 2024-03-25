"use client";
import { IoMdArrowBack } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import data from "./wishData";
import CartProduct from "../components/CartProduct/CartProduct";
import Footer from "../components/Footer/Footer";
import { useAppSelector } from "../lib/hooks";
import { RiArrowGoBackLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useState } from "react";
import SearchBar from "../components/Navbar/SearchBar";
import Navbar from "../components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import axios from "axios";

const Cart: React.FC = () => {
  const cartItems: any = useAppSelector((state: any) => state.cart.items) || [];
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const showSearch = useSelector((state: any) => state.cart.showSearch);
  const subTotal: number =
    cartItems.length > 0 &&
    cartItems
      ?.reduce(
        (total: number, current: any) =>
          total + parseFloat(current.price) * parseFloat(current.quantity),
        0
      )
      .toFixed(2);
  const subTotalDiscount: number =
    cartItems.length > 0 &&
    cartItems
      ?.reduce(
        (total: number, current: any) =>
          total + parseFloat(current.discount) * parseFloat(current.quantity),
        0
      )
      .toFixed(2);
  const total = (subTotal - subTotalDiscount).toFixed(2);
  const showIcons = {
    search: true,
    user: true,
    wishlist: true,
    cart: true,
    navigation: false,
  };
  const handleCheckout = async () => {
    const products = cartItems.map((item: any) => {
      const finalPrice = item.discountedPrice.toFixed(0);

      return {
        id: item.id,
        title: item.title,
        img: item.img,
        price: finalPrice,
        quantity: item.quantity,
      };
    });

    try {
      const res = await axios.post("/api/stripe/checkout_sessions", {
        successUrl: "http://localhost:3000/",
        cancelUrl: "http://localhost:3000/cart",
        products,
      });
      if (res.data.success) {
        window.location.href = res.data.url;
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log({ message: "error in payment", error });
    }
  };
  return (
    <main className="w-full font-Dosis  min-h-screen p-2 bg-white">
      <ToastContainer
        newestOnTop={true}
        position={"bottom-right"}
        autoClose={1000}
        hideProgressBar={false}
        theme="dark"
      />

      <div className=" mb-8 flex items-center">
        <div className=" w-max flex items-center gap-4 p-0.5 ">
          <RiArrowGoBackLine
            onClick={() => router.back()}
            className="ml-6 font-medium hover:text-green-700  cursor-pointer"
          />
          <h1 className=" text-xl font-medium  text-gray-600 tracking-tight font-base text-gray-700 cursor-pointer">
            <span
              className="hover:underline text-gray-700 mx-1"
              onClick={() => router.push("/")}
            >
              Home
            </span>
            {"/"}

            <span className=" hover:underline text-gray-700  mx-1">Cart</span>
          </h1>
        </div>
        {showSearch ? (
          <SearchBar showIcons={showIcons} />
        ) : (
          <Navbar showIcons={showIcons} />
        )}
      </div>
      <div className="w-full flex mb-24 font-Dosis  justify-between min-h-screen p-5 gap-8 bg-white">
        {/* left side cart */}
        {cartItems?.length > 0 ? (
          <div className="w-2/3 ">
            {/* <h1 className=" text-4xl  px-2 leading-7 font-poppins w-full  r mb-5 flex justify-start gap-2  text-gray-600   font-semibold ">
              <FaShoppingBag className=" text-2xl" />
              <span className="">Cart </span>
            </h1> */}
            <div className="w-full flex font-Dosis flex-col">
              {cartItems.map((item: any) => (
                <CartProduct key={item.id} product={item} />
              ))}
            </div>
            {cartItems.length > 1 && (
              <div className="w-full font-Dosis flex items-center border-b-2 bg-gray-50 px-4 py-1 border-b-gray-400 justify-between ">
                <div className="flex items-center">
                  <p className="text-base font-semibold text-xl text-gray-600 my-4 ">
                    Total <span>{`(${cartItems?.length}) items`}</span>:
                  </p>
                  <p className="my-4 font-semibold font-Dosis text-xl ml-3">
                    {" "}
                    $ {total}
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  className=" w-1/3 my-4 border border-indigo-200 p-2 bg-gray-700 hover:bg-gray-600 py-4 font-semibold tracking-wide text-lg rounded-lg text-white"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-2/3 flex mt-8  flex-col">
            {/* empty orders page */}
            <div className=" w-full flex  font-Dosis  items-center justify-center flex-col ">
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
        <div className="w-1/3 bg-gray-100 font-Dosis text-base mt-8  p-8 h-max rounded-lg shadow-lg">
          <h1 className="text-xl font-medium mb-7 ">Order summary</h1>
          <div className="w-full flex items-center justify-between border-b border-gray-300">
            <p className="text-base text-lg text-gray-600 my-4 ">Subtotal</p>
            <p className="my-4 font-medium">${subTotal}</p>
          </div>
          <div className="w-full flex items-center justify-between border-b border-gray-300">
            <p className="text-base text-lg text-gray-600 my-4 ">
              Discount estimate
            </p>
            <p className="my-4 font-medium text-green-500">
              - ${subTotalDiscount}
            </p>
          </div>
          {/* <div className="w-full flex items-center justify-between border-b border-gray-300">
            <p className="text-base text-lg text-gray-600 my-4 ">
              Tax estimate
            </p>
            <p className="my-4 font-medium">$8.32</p>
          </div> */}

          <div className="w-full flex items-center mt-2 justify-between ">
            <p className="text-base font-semibold text-lg text-gray-600 my-4 ">
              Total
            </p>
            <p className="my-4 font-semibold">${total}</p>
          </div>
          <button
            onClick={handleCheckout}
            className=" w-full my-4 border border-indigo-200 p-2 bg-gray-700 hover:bg-gray-600 py-4 font-semibold tracking-wide text-lg rounded-lg text-white"
          >
            Checkout
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Cart;
