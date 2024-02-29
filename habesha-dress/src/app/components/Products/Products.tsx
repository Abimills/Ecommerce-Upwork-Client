"use client";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import ClothProduct from "@/app/api/models/newsletter";
import { RiMenuSearchLine } from "react-icons/ri";
import { toggleShowFilter } from "@/app/lib/cartSlice/cartSlice";
import FilterData from "../Filter/Filter";

const Products: React.FC = () => {
  // const products = useSelector((state: any) => state.data);
  const data = useSelector((state: any) => state.data.data);
  const sortedData = useSelector((state: any) => state.data.sortedData);
  const showFilter = useSelector((state: any) => state.cart.showFilter);

  const dispatch = useDispatch();
  const handleOpenFilter = (e: any) => {
    dispatch(toggleShowFilter());
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get("http://localhost:3000/api/product/");

  //     if (res.data.cloths) {
  //       setData(res.data.cloths);
  //     }
  //   };
  //   fetchData();
  // }, []);
  return (
    <main className="w-full  h-full flex flex-col">
      {showFilter && <FilterData />}
      <div className="w-full mb-16 mt-32  flex items-center justify-between ">
        <h1 className="font-roboto font-md text-3xl  mx-4 ">
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
        {sortedData.length > 1 &&
          sortedData
            ?.filter((cloth: any) => cloth.category?.includes("Popular"))
            .map((item: any) => {
              return <ProductCard key={item._id} product={item} />;
            })}
      </div>
    </main>
  );
};

export default Products;
