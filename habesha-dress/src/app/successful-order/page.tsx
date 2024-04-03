"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/Navbar/SearchBar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useAppSelector } from "../lib/hooks";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { loginSuccess } from "../lib/authSlice/authSlice";
import { emptyCart } from "../lib/cartSlice/cartSlice";
const SuccessfulPayment = () => {
  const showSearch = useSelector((state: any) => state.cart.showSearch);
  // const user = useAppSelector((state: any) => state.auth.user);
  const user = JSON.parse(localStorage.getItem("user") as string);
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems: any = useAppSelector((state: any) => state.cart.items) || [];
  console.log(cartItems);
  const showIcons = {
    search: false,
    user: true,
    wishlist: true,
    cart: true,
    navigation: true,
  };
  const handleUserExistOrder = async () => {
    const id: any = JSON.parse(localStorage.getItem("payId") as string);
    console.log(user?._id);

    if (user?._id && id) {
      const userData = {
        id: user?._id,
        token: user?.token,
        data: { orders: [...user?.orders, id] },
      };
      console.log("working");
      const res = await axios.put("/api/login", { ...userData });
      if (res.data.success) {
        const updatedUser = {
          ...user,
          orders: res.data.updatedUser.orders,
        };
        dispatch(loginSuccess(updatedUser));
      }
    }
  };
  const handleOrder = async () => {
    const id: any = JSON.parse(localStorage.getItem("payId") as string);
    const customerDetail: any = JSON.parse(
      localStorage.getItem("customerDetail") as string
    );

    let data: any = {};
    if (user?._id) {
      data = {
        orderedProducts: cartItems,
        customerId: user?._id,
        orderProductsQuantity: cartItems?.length,
        customerAddress: customerDetail,
      };
    } else {
      data = {
        orderedProducts: cartItems,
        orderProductsQuantity: cartItems?.length,
        customerAddress: customerDetail,
      };
    }
    const payload = { id, data };
    const res = await axios.put("/api/order", payload);

    if (res.data.success) {
      toast.success("successfully ordered your product");
      localStorage.removeItem("cart");
      dispatch(emptyCart());
      localStorage.removeItem("payId");
    }
  };

  useEffect(() => {
    const id: any = JSON.parse(localStorage.getItem("payId") as string);
    if (id) {
      handleUserExistOrder();
      handleOrder();
    }
  }, []);

  return (
    <main className="w-full h-screen bg-white flex items-center justify-start flex-col">
      <div className="w-full">
        {showSearch ? (
          <SearchBar showIcons={showIcons} />
        ) : (
          <Navbar showIcons={showIcons} />
        )}
      </div>
      <ToastContainer />
      <div className="w-full flex items-center flex-col py-32 px-6 md:px-48 mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-poppins">
          Thank you for your order!
        </h1>
        <p className=" font-Dosis text-lg text-gray-600 mb-8 w-full sm:max-w-md">
          Your order has been confirmed.You will receive an
          <span className="text-green-500 underline"> email </span>
          confirmation shortly.Your order ID is
          <span className="text-green-500 underline"> 21123213123123321 </span>
        </p>
        <div className="flex w-full items-center font-Dosis gap-8 sm:justify-center">
          <button
            onClick={() => router.push(`/order-history`)}
            className="px-3 sm:px-6 py-2 bg-black text-white font-medium hover:bg-white hover:text-black
           uppercase text-sm border border-black rounded-md"
          >
            view order
          </button>

          <button
            onClick={() => router.push(`/order-history-all`)}
            className="px-3 sm:px-6 py-2 bg-transparent text-black font-medium
           uppercase text-sm border border-black rounded-md hover:bg-black hover:text-white"
          >
            view all orders
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default SuccessfulPayment;
