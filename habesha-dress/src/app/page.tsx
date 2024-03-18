"use client";

import Image from "next/image";
import Landing from "./components/LandingPage/Landing";
import Discount from "./components/DiscountPage/Discount";
import Category from "./components/ShopByCategories/Category";
import Products from "./components/Products/Products";
import ForHer from "./components/ForHer/ForHer";
import NewProduct from "./components/NewProducts/NewProduct";
import LowerDiscount from "./components/LowerDiscount/LowerDiscount";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import { useEffect, useState } from "react";
import Cart from "./components/Cart/Cart";
import { GetServerSideProps } from "next";
import axios from "axios";
import { useAppDispatch } from "./lib/hooks";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/LoginSlider/Login";
import SidebarNavigation from "./components/SidebarNavigation/SidebarNavigation";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/Navbar/SearchBar";
import FilterData from "./components/Filter/Filter";
import ToggleSubscribe from "./components/NewsletterSlider/ToggleSubscribe";
import { setAllProducts, sortDataReducer } from "./lib/cartSlice/dataSlice";
import Notification from "./components/Notification/Notification";
// import { setInitialData } from "./lib/cartSlice/dataSlice";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  // const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const dispatch = useDispatch();

  const showNewsletter = useSelector((state: any) => state.cart.showNewsletter);
  const showSignIn = useSelector((state: any) => state.cart.showSignIn);
  const showSearch = useSelector((state: any) => state.cart.showSearch);
  const showSidebar = useSelector((state: any) => state.cart.showSidebar);
  const showFilter = useSelector((state: any) => state.cart.showFilter);
  const showIcons = {
    search: true,
    user: true,
    wishlist: true,
    cart: true,
    navigation: true,
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/product/");

      if (res.data.cloths) {
        dispatch(setAllProducts(res.data.cloths));
        dispatch(sortDataReducer(res.data.cloths));
      }
    };
    fetchData();
  }, []);

  return (
    <main className="flex font-Dosis  relative min-h-screen flex-col bg-alice-blue  items-center ">
      <div className="w-full    ">
        {showSearch ? (
          <SearchBar showIcons={showIcons} />
        ) : (
          <Navbar showIcons={showIcons} />
        )}
      </div>
      {showSidebar && <SidebarNavigation />}
      {showNewsletter && <ToggleSubscribe />}
      <Notification />
      <Landing />
      {isCartOpen && <Cart setIsOpen={setIsCartOpen} isOpen={isCartOpen} />}
      {showSignIn && <Login />}
      <Discount />
      <Category />
      <Products />
      <ForHer />
      <NewProduct />
      <Discount />
      <Newsletter />
      <Footer />
    </main>
  );
}
