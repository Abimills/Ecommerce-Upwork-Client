"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import ClothProduct from "@/app/api/models/newsletter";
import { RiMenuSearchLine } from "react-icons/ri";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import { useParams, useRouter } from "next/navigation";
import { toggleShowFilter } from "@/app/lib/cartSlice/cartSlice";
import Footer from "@/app/components/Footer/Footer";

// interface Props {
//   category: string[];
// }
const AllProducts: React.FC = () => {
  // const products = useSelector((state: any) => state.data);
  const param = useParams<{ category: string }>();
  const router = useRouter();

  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const handleOpenFilter = (e: any) => {
    dispatch(toggleShowFilter());
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/product/");

      if (res.data.cloths) {
        let allCloths = res.data.cloths;
        allCloths = allCloths.filter(
          (cloth: any) =>
            cloth.category.includes(param?.category) ||
            cloth.forWhichGender.includes(param?.category) ||
            cloth.clothOccasion.includes(param?.category) ||
            cloth.whichGroupCloth.includes(param?.category)
        );

        setData(allCloths);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="w-full h-max bg-white  h-full flex flex-col">
      <div className="w-full flex items-center justify-between py-8  mb-8">
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
              Products
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
      {/* <div className="w-full mb-16 mt-8 flex items-center justify-between ">
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
      </div> */}

      <div className="w-full flex items-center gap-4 justify-between flex-wrap p-4">
        {data.length > 1 &&
          data
            ?.filter((cloth: any) => cloth.category?.includes("Popular"))
            .map((item: any) => {
              return <ProductCard key={item._id} product={item} />;
            })}
      </div>
      <Footer />
    </main>
  );
};

export default AllProducts;
