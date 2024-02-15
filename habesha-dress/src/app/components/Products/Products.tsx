"use client";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import allProducts from "./allProducts.js";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import ClothProduct from "@/app/api/models/product";

const Products: React.FC = () => {
  const products = useSelector((state: any) => state.data);
  console.log(products);

  return (
    <main className="w-full  h-full flex flex-col">
      <h1 className="mb-16 mt-32 font-roboto font-md text-3xl  mx-4 ">
        Popular Products
      </h1>

      <div className="w-full flex items-center gap-4 justify-between flex-wrap">
        {products.data?.cloth?.length > 1 &&
          products?.data?.cloth?.map((item: any) => {
            return <ProductCard key={item.id} product={item} />;
          })}
      </div>
    </main>
  );
};

export default Products;
