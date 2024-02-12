"use client";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import allProducts from "./allProducts.js";
import { useEffect, useState } from "react";

const Products: React.FC = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/api/product");
    console.log(res.data);
    setData(res.data.cloth);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="w-full  h-full flex flex-col">
      <h1 className="mb-16 mt-32 font-roboto font-md text-3xl  mx-4 ">
        Popular Products
      </h1>

      <div className="w-full flex items-center gap-4 justify-between flex-wrap">
        {data?.map((item: any) => {
          return <ProductCard key={item.id} product={item} />;
        })}
      </div>
    </main>
  );
};

export default Products;
