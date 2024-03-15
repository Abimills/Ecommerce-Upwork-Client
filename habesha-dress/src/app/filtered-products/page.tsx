"use client";
import axios from "axios";
import ProductCard from "../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import ClothProduct from "@/app/api/models/newsletter";
import { RiMenuSearchLine } from "react-icons/ri";
import { toggleShowFilter } from "@/app/lib/cartSlice/cartSlice";
import { useRouter } from "next/router";

// interface Props {
//   category: string[];
// }
const AllProducts: React.FC = () => {
  // const products = useSelector((state: any) => state.data);
  const [data, setData] = useState([]);
  const router = useRouter();
  const { category } = router.query;
  const dispatch = useDispatch();
  const handleOpenFilter = (e: any) => {
    dispatch(toggleShowFilter());
  };
  console.log(category);

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
    <main className="w-full  h-full flex flex-col">
      <div className="w-full mb-16 mt-32  flex items-center justify-between ">
        <h1 className="font-Dosis font-bold text-3xl  mx-4 ">
          Popular Products
        </h1>
        <button
          onClick={handleOpenFilter}
          className="hover:text-green-500 mx-4 flex items-center gap-2 font-medium"
        >
          <RiMenuSearchLine className="text-xl" />
          Filter & Sort
        </button>
      </div>

      <div className="w-full flex items-center gap-4 justify-between flex-wrap">
        {data.length > 1 &&
          data?.map((item: any) => {
            return <ProductCard key={item._id} product={item} />;
          })}
      </div>
    </main>
  );
};

export default AllProducts;
