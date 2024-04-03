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
    // Function to get user's location
    const getUserLocationByIP = async () => {
      const storedValue = sessionStorage.getItem("userVisited");

      if (storedValue === null || !storedValue) {
        try {
          const currentTime = new Date();
          const response = await fetch("https://ipapi.co/json/");
          const data = await response.json();
          const refinedData = {
            city: data?.city,
            region: data?.region,
            country: data?.country,
            latitude: data?.latitude,
            longitude: data?.longitude,
            org: data?.org,
            postal: data?.postal,
            countryName: data?.country_name,
          };
          const userAgent = navigator?.userAgent;
          const userInfo = [{ currentTime }, refinedData, { userAgent }];

          const res = await axios.post("/api/userInfo", { userInfo });
          sessionStorage.setItem("userVisited", "yes");
        } catch (error) {
          console.error("Error getting user's location by IP:", error);
        }
      }
    };

    // Call functions to get user's location, current time, and device type
    getUserLocationByIP();
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
