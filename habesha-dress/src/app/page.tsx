"use client";

import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/LandingPage/Landing";
import Discount from "./components/DiscountPage/Discount";
import Category from "./components/ShopByCategories/Category";
import Products from "./components/Products/Products";
import ForHer from "./components/ForHer/ForHer";
import NewProduct from "./components/NewProducts/NewProduct";
import LowerDiscount from "./components/LowerDiscount/LowerDiscount";
import Newsletter from "./components/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import Cart from "./components/Cart/Cart";

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(true);
  return (
    <main className="flex min-h-screen flex-col bg-alice-blue items-center p-2">
      <Navbar />

      <Landing />
      {isCartOpen && <Cart setIsOpen={setIsCartOpen} isOpen={isCartOpen} />}
      <Discount />
      <Products />
      <Category />
      <NewProduct />
      <ForHer />
      <LowerDiscount />
      <Newsletter />
      <Footer />
    </main>
  );
}
