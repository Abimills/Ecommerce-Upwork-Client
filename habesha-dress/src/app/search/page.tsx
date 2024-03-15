"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import ClothProduct from "@/app/api/models/newsletter";
import { RiMenuSearchLine } from "react-icons/ri";
import { useRouter, useSearchParams } from "next/navigation";
import {
  toggleShowFilter,
  toggleShowSearch,
} from "@/app/lib/cartSlice/cartSlice";
import ProductCard from "../components/ProductCard/ProductCard";
import { useParams } from "next/navigation";
import SearchBar from "@/app/components/Navbar/SearchBar";
import Navbar from "@/app/components/Navbar/Navbar";
const showIcons = {
  search: false,
  user: true,
  wishlist: true,
  cart: true,
  navigation: true,
};
const Search: React.FC = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [genderData, setGenderData] = useState<any>({});

  const showSearch = useSelector((state: any) => state.cart.showSearch);

  const handleFilterByGender = (gender: string) => {
    const newData = data.filter((cloth: any) =>
      cloth.forWhichGender.includes(gender)
    );
    setFilteredData(newData);
  };

  useEffect(() => {
    const q = new URLSearchParams(window.location?.search).get("query");

    const searchData = async () => {
      if (q && q !== "") {
        setQuery(q);
        const res = await axios.get(
          `http://localhost:3000/api/search/?query=${q}`
        );
        if (res.data.cloths) {
          setData(res.data.cloths);
          setFilteredData(res.data.cloths);
        }
        const allGender: any = [];

        res.data.cloths.map((product: any) =>
          allGender.push(...product.forWhichGender)
        );

        const numberOfGender: any = {};
        allGender.map((gender: any) => {
          numberOfGender[gender] = (numberOfGender[gender] || 0) + 1;
        });

        setGenderData(numberOfGender);
      }
    };

    searchData();
  }, []);
  // console.log(categoryData);
  const dispatch = useDispatch();
  const handleOpenFilter = (e: any) => {
    dispatch(toggleShowFilter());
  };

  return (
    <main className="w-full font-Dosis  h-max bg-white flex flex-col">
      {showSearch ? (
        <SearchBar showIcons={showIcons} />
      ) : (
        <Navbar showIcons={showIcons} />
      )}
      {/* {showFilter && <FilterData />} */}
      <div className="w-full    flex flex-col  items-center justify-center ">
        <h1 className="font-Dosis font-md text-3xl  mx-4 mb-5 font-semibold ">
          Search result
        </h1>
        <p className="mb-8">
          <span className="font-semibold">{data?.length} results </span> for “
          {query} ”
        </p>
        <div className="flex gap-7 items-center mb-6">
          {Object.keys(genderData).length > 0 &&
            Object.entries(genderData)?.map(([category, count]) => (
              <button
                className=" font-medium text-black tracking-wide text-sm hover:underline decoration-2 hover:underline-offset-8"
                key={category}
                onClick={() => handleFilterByGender(category)}
              >
                {category} {"("}
                {count}
                {")"}
              </button>
            ))}
        </div>
        <div className="w-full flex items-center mb-1  justify-between ">
          <p className="mx-4 font-medium text-sm">
            {filteredData?.length} Article
          </p>
          <button
            onClick={handleOpenFilter}
            className=" text-sm hover:text-green-500 mx-4 flex items-center gap-2 font-semibold"
          >
            <RiMenuSearchLine className="text-xl" />
            Filter & Sort
          </button>
        </div>
      </div>

      <div className="w-full flex items-center border-t border-gray-200 gap-4 justify-between flex-wrap">
        {filteredData.length > 1 &&
          filteredData.map((item: any) => {
            return <ProductCard key={item._id} product={item} />;
          })}
      </div>
    </main>
  );
};

export default Search;
