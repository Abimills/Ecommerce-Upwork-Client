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
import { fetchData } from "./lib/cartSlice/dataSlice";
import Login from "./components/LoginSlider/Login";
import SidebarNavigation from "./components/SidebarNavigation/SidebarNavigation";
import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/Navbar/SearchBar";
import FilterData from "./components/Filter/Filter";
import ToggleSubscribe from "./components/NewsletterSlider/ToggleSubscribe";
// import { setInitialData } from "./lib/cartSlice/dataSlice";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  // const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector((state: any) => state.data);

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
    if (status === "idle") {
      const data: any = fetchData();
      dispatch(data);
    }
  }, [status, dispatch]);
  return (
    <main className="flex relative min-h-screen flex-col bg-alice-blue items-center ">
      {showSearch ? (
        <SearchBar showIcons={showIcons} />
      ) : (
        <Navbar showIcons={showIcons} />
      )}
      {showSidebar && <SidebarNavigation />}
      {showNewsletter && <ToggleSubscribe />}
      <Landing />
      {isCartOpen && <Cart setIsOpen={setIsCartOpen} isOpen={isCartOpen} />}
      {showSignIn && <Login />}
      {showFilter && <FilterData />}

      <Discount />
      <Products />
      <Category />
      <NewProduct />
      <ForHer />
      <Discount />
      <Newsletter />
      <Footer />
    </main>
  );
}
