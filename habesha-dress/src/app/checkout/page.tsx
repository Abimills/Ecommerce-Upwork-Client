"use client";
import { IoMdArrowBack } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";

import { RiArrowGoBackLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useState } from "react";
import { IoHome } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppSelector } from "@/app/lib/hooks";
import Footer from "@/app/components/Footer/Footer";

const Cart: React.FC = () => {
  const cartItems: any = useAppSelector((state: any) => state.cart.items) || [];
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [errorInput, setErrorInput] = useState({
    email: false,
    firstName: false,
    lastName: false,
    street: false,
    houseNumber: false,
    postCode: false,
    city: false,
    phone: false,
  });
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
        successUrl: "http://localhost:3000/successful-order",
        cancelUrl: "http://localhost:3000/cart",
        products,
      });
      if (res.data.success) {
        localStorage.setItem("payId", JSON.stringify(res.data.id));
        const items =
          JSON.parse(localStorage.getItem("itemsBought") as string) || [];
        items.unshift(res.data.id);
        localStorage.setItem("itemsBought", JSON.stringify(items));
        window.location.href = res.data.url;
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log({ message: "error in payment", error });
    }
  };
  return (
    <main
      className="w-full flex flex-col items-center justify-center
      font-Dosis  min-h-screen  bg-white"
    >
      <div className="w-1/2 ">
        {/* <div className="w-full mb-8">
          <div className="w-full flex gap-16 items-center py-4  px-16 border-2 rounded-sm border-gray-500">
            <IoHome className="text-2xl " />
            <div className="">
              <h1 className="text-xl font-semibold">Home Delivery</h1>
              <p
                className="
              "
              >
                1-2 weeks
              </p>
            </div>
          </div>
        </div> */}

        <div className="w-full mb-12">
          <h1 className="w-full text-center  mb-8 mt-12 text-3xl font-semibold">
            My Delivery Address
          </h1>
          <div className="w-full mb-8">
            {/* <h1 className=" mb-2">Email Address</h1> */}
            <div className="w-full">
              <input
                type="email"
                className={`${
                  errorInput.email &&
                  "border border-red-300 placeholder-red-400 "
                } w-full  `}
                placeholder="Enter Email"
              />
              {errorInput.email && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your Email Address
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex gap-4 items-center mb-4">
            <div className="w-1/2">
              <input
                type="text"
                className={`${
                  errorInput.firstName &&
                  "border border-red-300 placeholder-red-400 "
                } w-full `}
                placeholder="First name"
              />
              {errorInput.firstName && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your First name
                </div>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                className={`${
                  errorInput.lastName &&
                  "border border-red-300 placeholder-red-400 "
                } w-full `}
                placeholder="Last name"
              />
              {errorInput.lastName && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your Last name
                </div>
              )}
            </div>
          </div>

          {/* <h1 className="">Home Address</h1> */}
          <div className=" w-full flex gap-4 items-center mb-6 ">
            <div className="w-1/2">
              <input
                type="text"
                className={`${
                  errorInput.street &&
                  "border border-red-300 placeholder-red-400 "
                } w-full `}
                placeholder="Street address"
              />
              {errorInput.street && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your Street address
                </div>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                className={`${
                  errorInput.houseNumber &&
                  "border border-red-300 placeholder-red-400 "
                } w-full `}
                placeholder="House number"
              />
              {errorInput.houseNumber && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your House number
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex gap-4 items-center mb-6">
            <div className="w-1/2">
              <input
                type="text"
                className={`${
                  errorInput.postCode &&
                  "border border-red-300 placeholder-red-400 "
                } w-full `}
                placeholder="Postal Code"
              />
              {errorInput.postCode && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your Postal code
                </div>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                className={`${
                  errorInput.city &&
                  "border border-red-300 placeholder-red-400 "
                } w-full `}
                placeholder="City / place"
              />
              {errorInput.city && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your House number
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex gap-4 items-center mb-6">
            <input
              type="text"
              className="w-full  border-b-2 border-gray-300 border-x-white border-t-white"
              placeholder="extra address Information (Optional)"
            />
          </div>
          <div className="w-full  gap-4 items-center mb-6">
            <input
              type="tel"
              className={`w-full  border-b-2 border-gray-300 border-x-white border-t-white ${
                errorInput.phone && "border border-red-300 placeholder-red-400 "
              } `}
              placeholder="Phone number"
            />
            {errorInput.phone && (
              <div className="text-red-400 flex items-center gap-2">
                <BiError /> Enter your Phone number
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex gap-4 items-center justify-center my-6 px-2">
          <button
            className="w-full py-4 bg-gray-800 hover:bg-gray-600
           font-semibold text-xl text-white rounded-sm"
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
