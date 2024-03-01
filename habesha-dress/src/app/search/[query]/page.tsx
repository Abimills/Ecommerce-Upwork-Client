"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import ClothProduct from "@/app/api/models/newsletter";
import { RiMenuSearchLine } from "react-icons/ri";
import { toggleShowFilter } from "@/app/lib/cartSlice/cartSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useParams } from "next/navigation";
import SearchBar from "@/app/components/Navbar/SearchBar";
import Navbar from "@/app/components/Navbar/Navbar";
const showIcons = {
  search: true,
  user: true,
  wishlist: true,
  cart: true,
  navigation: true,
};
const Search: React.FC = () => {
  const [data, setData] = useState([]);
  const param = useParams<{ query: string }>();
  const showSearch = useSelector((state: any) => state.cart.showSearch);

  console.log(param.query);
  useEffect(() => {
    const searchData = async () => {
      if (param?.query !== "" || !param?.query) {
        setData([]);
      }
      if (param?.query && param?.query !== "") {
        const res = await axios.get(
          `http://localhost:3000/api/search/?query=${param?.query}`
        );
        console.log(res.data.cloths);
        if (res.data.cloths) {
          setData(res.data.cloths);
        }
      }
    };
    searchData();
  }, []);
  const dispatch = useDispatch();
  const handleOpenFilter = (e: any) => {
    dispatch(toggleShowFilter());
  };

  return (
    <main className="w-full  h-max bg-white flex flex-col">
      {showSearch ? (
        <SearchBar showIcons={showIcons} />
      ) : (
        <Navbar showIcons={showIcons} />
      )}
      {/* {showFilter && <FilterData />} */}
      <div className="w-full mb-16 mt-8  flex flex-col  items-center justify-center ">
        <h1 className="font-roboto font-md text-3xl  mx-4 mb-5 font-semibold ">
          Search result
        </h1>
        <p className="mb-8">
          <span className="font-semibold">{data?.length}results</span> for “{" "}
          {param.query} ”
        </p>
        {/* <button
          onClick={handleOpenFilter}
          className="hover:text-green-500 mx-4 flex items-center gap-2 font-medium"
        >
          <RiMenuSearchLine className="text-xl" />
          Filter & Sort
        </button> */}
      </div>
      {/* 
      <div className="w-full flex items-center gap-4 p-4 justify-between flex-wrap">
        {data.length > 1 &&
          data
            ?.filter((cloth: any) => cloth.category?.includes("Popular"))
            .map((item: any) => {
              return <ProductCard key={item._id} product={item} />;
            })}
      </div> */}
    </main>
  );
};

export default Search;
