import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/LandingPage/Landing";
import Discount from "./components/DiscountPage/Discount";
import Category from "./components/ShopByCategories/Category";
import Products from "./components/Products/Products";
import ForHer from "./components/ForHer/ForHer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-alice-blue items-center p-2">
      <Navbar />
      <Landing />
      <Discount />
      <Category />
      <Products />
      <ForHer />
    </main>
  );
}
