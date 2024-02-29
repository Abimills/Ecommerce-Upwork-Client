"use client";
import { useDispatch } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import { RiMenuSearchLine } from "react-icons/ri";
import { toggleShowFilter } from "@/app/lib/cartSlice/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const NewProduct: React.FC = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const handleOpenFilter = (e: any) => {
    dispatch(toggleShowFilter());
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/product/");

      if (res.data.cloths) {
        setData(res.data.cloths);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="w-full flex flex-col mt-16 items-center justify-start">
      <div className="w-full mb-16 mt-32  flex items-center justify-between ">
        <h1 className="w-full text-left font-semibold font-roboto text-3xl">
          New & Recommended Products
        </h1>
        <button
          onClick={handleOpenFilter}
          className="w-48 hover:text-green-500 mx-4 flex items-center gap-2 font-medium"
        >
          <RiMenuSearchLine className="text-xl" />
          Filter & Sort
        </button>
      </div>
      <div className="w-full flex flex-wrap justify-between items-center">
        {data
          ?.filter(
            (cloth: any) =>
              cloth.category?.includes("Recommended") ||
              cloth.category?.includes("New Product")
          )
          .map((product: any) => {
            return <ProductCard key={product._id} product={product} />;
          })}
      </div>
    </main>
  );
};

export default NewProduct;
