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
import { RiMenuSearchLine } from "react-icons/ri";

import { useRouter } from "next/navigation";
import { toggleShowFilter } from "../lib/cartSlice/cartSlice";
import FilterData from "../components/Filter/Filter";

const Favorites: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState<any>([]);
  const favorites = useSelector((state: any) => state.cart.favorites);
  const showFilter = useSelector((state: any) => state.cart.showFilter);

  const router = useRouter();
  const filterData = (category: string) => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product: any) => {
          return product.category.includes(category);
        })
      );
    }
  };
  const dispatch = useDispatch();
  const handleOpenFilter = (e: any) => {
    dispatch(toggleShowFilter());
  };
  useEffect(() => {
    const fetchData = async () => {
      if (favorites?.length > 0 && favorites !== undefined) {
        const selected: any = [];
        const res = await Promise.all(
          favorites?.map((id: any) =>
            axios.get(`http://localhost:3000/api/product/?id=${id}`)
          )
        );
        const wishlistProducts: any = res.map((product) => product.data.cloth);
        wishlistProducts?.map((item: any) => selected.push(...item.category));
        console.log(wishlistProducts);
        setProducts(wishlistProducts);
        setFilteredProducts(wishlistProducts);
        setCategories(["All", ...new Set(selected)]);
      }
    };
    // const fetchData = async () => {
    //   const res = await axios.get("http://localhost:3000/api/product"); // Replace with your actual API endpoint
    //   setFilteredProducts(res.data.cloth);
    //   setCategories(["All", ...new Set(selected)]);
    // };
    fetchData();
  }, [favorites]);
  return (
    <main className="w-full min-h-screen  flex flex-col bg-white ">
      {showFilter && <FilterData />}
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
              Favorites
            </span>
          </h1>
        </div>
        <div className="w-1/2  flex justify-end items-center gap-10">
          <button
            onClick={handleOpenFilter}
            className="hover:text-green-500 mx-4 flex items-center gap-2 font-medium"
          >
            <RiMenuSearchLine className="text-xl" />
            Filter & Sort
          </button>
        </div>
      </div>
      <div className="w-full  p-2 mb-10"></div>
      {filterProducts?.length > 0 ? (
        <div className="w-full flex items-center flex-wrap items-center mb-16 justify-evenly gap-4">
          {filterProducts.map((item: any) => {
            return <ProductCard product={item} key={item.id} />;
          })}
        </div>
      ) : (
        <div className="w-full flex  flex-col">
          {/* empty orders page */}
          <div className=" w-full flex  mb-16 items-center justify-center flex-col ">
            <img
              src="../cart-empty.gif"
              alt=""
              className="h-56 w-full object-contain rounded-full mb-8"
            />
            <h1 className="font-bold text-2xl tracking-wide mb-8 leading-normal">
              Your wishlist is empty
            </h1>
            <p className="leading-normal text-base font-medium text-gray-500 mb-8">
              Get started and discover fashion for your whole family.
            </p>
            <button className="bg-black w-1/2 text-white py-3 px-9 font-bold rounded-full">
              Check Products Now!
            </button>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
};

export default Favorites;
