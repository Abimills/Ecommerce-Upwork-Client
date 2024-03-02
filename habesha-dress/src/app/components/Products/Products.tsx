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
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
const Products: React.FC = () => {
  // const products = useSelector((state: any) => state.data);
  const data = useSelector((state: any) => state.data.data);
  const sortedData = useSelector((state: any) => state.data.sortedData);
  const showFilter = useSelector((state: any) => state.cart.showFilter);

  const [activePagination, setActivePagination] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  const handleOpenFilter = (e: any) => {
    dispatch(toggleShowFilter());
  };
  console.log(totalPages);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/product/");

      if (res.data.totalPages) {
        setTotalPages(res.data.totalPages);
      }
    };
    fetchData();
  }, []);
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
      {/* pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-alice-blue  mt-8 px-4 py-3 sm:px-6">
        {/* <div className="flex flex-1 justify-between sm:hidden">
          <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div> */}
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">97</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              <div className="flex ">
                {Array(totalPages)
                  ?.fill("")
                  ?.map((_, index) =>
                    activePagination === index + 1 ? (
                      <button
                        key={index}
                        onClick={() => setActivePagination(index + 1)}
                        className="relative bg-indigo-500 inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0"
                      >
                        {index + 1}
                      </button>
                    ) : (
                      <button
                        key={index}
                        onClick={() => setActivePagination(index + 1)}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        {index + 1}
                      </button>
                    )
                  )}
              </div>

              <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
