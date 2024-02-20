"use client";
import { IoMdArrowBack } from "react-icons/io";
// import data from "../components/Products/allProducts";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";
import Footer from "../components/Footer/Footer";
import ProductCard from "../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../lib/cartSlice/dataSlice";
import axios from "axios";
import { useRouter } from "next/navigation";

const Favorites: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState<any>([]);
  const router = useRouter();
  const filterData = (category: string) => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product: any) => {
          console.log(product.category.includes(category));
          return product.category.includes(category);
        })
      );
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const selected: any = [];
      const res = await axios.get("http://localhost:3000/api/product"); // Replace with your actual API endpoint
      setProducts(res.data.cloth);
      setFilteredProducts(res.data.cloth);
      res.data.cloth?.map((item: any) => selected.push(...item.category));
      setCategories(["All", ...new Set(selected)]);
    };
    fetchData();
  }, []);
  return (
    <main className="w-full min-h-screen  flex flex-col bg-white ">
      <div className="w-full flex items-center justify-between p-8 ">
        <div className=" w-max flex items-center gap-10 ">
          {/* <IoMdArrowBack className="text-2xl text-gray-600  cursor-pointer" /> */}
          <h1 className=" text-lg  text-gray-600 tracking-tight font-base text-green-400 cursor-pointer">
            <span
              className="hover:underline text-green-400 mx-2"
              onClick={() => router.push("/")}
            >
              Home
            </span>
            {">"}

            <span className=" hover:underline text-green-400 mx-2 ">
              Product
            </span>
          </h1>
        </div>
        <div className="w-1/2  flex justify-end items-center gap-10">
          {categories.map((item: string) => {
            return (
              <button
                onClick={() => filterData(item)}
                className="border border-black p-1 text-xs px-6  rounded-sm uppercase"
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full border-b border-gray-600 p-2 mb-10"></div>
      <div className="w-full flex items-center flex-wrap items-center mb-16 justify-evenly gap-4">
        {filterProducts.map((item: any) => {
          return <ProductCard product={item} key={item.id} />;
        })}
      </div>
      <Footer />
    </main>
  );
};

export default Favorites;
