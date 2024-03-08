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
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import FilterData from "../components/Filter/Filter";
// interface Props {
//   category: string[];
// }
const AllProducts: React.FC = () => {
  // const products = useSelector((state: any) => state.data);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);

  const router = useRouter();
  const [activePagination, setActivePagination] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCloths, setTotalCloths] = useState(0);
  const handlePagination = async (page: any) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/product/?page=${page}`
      );
      setData(res.data.cloths);
      setFilteredData(res.data.cloths);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/product/");

      if (res.data.cloths) {
        setData(res.data.cloths);
        setFilteredData(res.data.cloths);
        setTotalPages(res.data.totalPages);
        setTotalCloths(res.data.totalCloths);
      }
    };
    fetchData();
  }, []);
  return (
    <main className="w-full  h-max bg-white px-5 py-3 flex flex-col ">
      {openFilter && (
        <FilterData
          data={data}
          open={openFilter}
          setOpen={setOpenFilter}
          setData={setFilteredData}
        />
      )}
      <div className="w-full mb-16 mt-6  flex items-center justify-between ">
        <h1 className="font-roboto font-md text-3xl  mx-4 ">
          Discover All Products
        </h1>
        <button
          onClick={() => setOpenFilter(true)}
          className="hover:text-green-500 mx-4 flex items-center gap-2 font-medium"
        >
          <RiMenuSearchLine className="text-xl" />
          Filter & Sort
        </button>
      </div>

      <div className="w-full flex items-center mt-8 gap-4 justify-between flex-wrap">
        {filteredData.length > 1 &&
          filteredData?.map((item: any) => {
            return <ProductCard key={item._id} product={item} />;
          })}
      </div>
      {/* pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-alice-blue  mt-8 px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{activePagination}</span> to{" "}
              <span className="font-medium">{totalPages}</span> of{" "}
              <span className="font-medium">{totalCloths}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => {
                  if (activePagination > 1) {
                    setActivePagination(activePagination - 1);
                    handlePagination(activePagination - 1);
                  } else {
                    setActivePagination(totalPages);
                    handlePagination(totalPages);
                  }
                }}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="flex ">
                {Array(totalPages)
                  ?.fill("")
                  ?.map((_, index) =>
                    activePagination === index + 1 ? (
                      <button
                        key={index}
                        onClick={() => {
                          setActivePagination(index + 1);

                          handlePagination(index + 1);
                        }}
                        className="relative bg-indigo-500 inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0"
                      >
                        {index + 1}
                      </button>
                    ) : (
                      <button
                        key={index}
                        onClick={() => {
                          setActivePagination(index + 1);
                          handlePagination(index + 1);
                        }}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        {index + 1}
                      </button>
                    )
                  )}
              </div>

              <button
                onClick={() => {
                  if (activePagination < totalPages) {
                    setActivePagination(activePagination + 1);
                    handlePagination(activePagination + 1);
                  } else {
                    setActivePagination(1);
                    handlePagination(1);
                  }
                }}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
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

export default AllProducts;
