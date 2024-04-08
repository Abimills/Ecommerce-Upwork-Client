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
import SidebarNavigation from "../components/SidebarNavigation/SidebarNavigation";
import Login from "../components/LoginSlider/Login";
import ToggleSubscribe from "../components/NewsletterSlider/ToggleSubscribe";
const SuccessfulPayment = () => {
  const showSearch = useSelector((state: any) => state.cart.showSearch);
  // const user = useAppSelector((state: any) => state.auth.user);
  const gateWay = useSelector((state: any) => state.cart.gateWay);
  const showNewsletter = useSelector((state: any) => state.cart.showNewsletter);
  const showSignIn = useSelector((state: any) => state.cart.showSignIn);
  const showSidebar = useSelector((state: any) => state.cart.showSidebar);
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems: any = useAppSelector((state: any) => state.cart.items) || [];

  const showIcons = {
    search: false,
    user: true,
    wishlist: true,
    cart: true,
    navigation: true,
  };

  useEffect(() => {
    const user =
      (localStorage.getItem("user") as string) !== null
        ? JSON.parse(localStorage.getItem("user") as string)
        : {};
    let idExist = localStorage.getItem("payId") as any;
    if (idExist !== null) {
      const id = JSON.parse(idExist);
      const customerDetail: any =
        (localStorage.getItem("customerDetail") as string) !== null
          ? JSON.parse(localStorage.getItem("customerDetail") as string)
          : {};
      // const id: any =
      //   (localStorage.getItem("payId") as string) !== null
      //     ? JSON.parse(localStorage.getItem("payId") as string)
      //     : "";
      const handleUserExistOrder = async () => {
        // const id: any =
        //   (localStorage.getItem("payId") as string) !== null
        //     ? JSON.parse(localStorage.getItem("payId") as string)
        //     : "";

        if (user?._id && id) {
          const userData = {
            id: user?._id,
            token: user?.token,
            data: { orders: [...user?.orders, id] },
          };

          const res = await axios.put(`${gateWay}/api/login`, { ...userData });
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
        // const id: any =
        //   (localStorage.getItem("payId") as string) !== null
        //     ? JSON.parse(localStorage.getItem("payId") as string)
        //     : "";

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
        const res = await axios.put(`${gateWay}/api/order`, payload);

        if (res.data.success) {
          toast.success("successfully ordered your product");
          localStorage.removeItem("cart");
          dispatch(emptyCart());
          localStorage.removeItem("payId");
        }
      };

      handleUserExistOrder();
      handleOrder();
    }
  }, []);

  return (
    <main className="w-full text-black h-screen bg-white flex items-center justify-start flex-col">
      <div className="w-full">
        {showSearch ? (
          <SearchBar showIcons={showIcons} />
        ) : (
          <Navbar showIcons={showIcons} />
        )}
      </div>
      <ToastContainer />
      {showSidebar && <SidebarNavigation />}
      {showSignIn && <Login />}
      {showNewsletter && <ToggleSubscribe />}
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
