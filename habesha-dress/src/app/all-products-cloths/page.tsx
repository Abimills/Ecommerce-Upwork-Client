"use client";
import axios from "axios";
import ProductCard from "../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import { TbDeviceDesktopSearch } from "react-icons/tb";
import ClothProduct from "@/app/api/models/newsletter";
import { RiMenuSearchLine } from "react-icons/ri";
import { toggleShowFilter } from "@/app/lib/cartSlice/cartSlice";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import FilterData from "../components/Filter/Filter";
import SearchBar from "../components/Navbar/SearchBar";
import Navbar from "../components/Navbar/Navbar";
import Filtering from "../components/FilteringComponent/FilteringComponents";
import Footer from "../components/Footer/Footer";
import Notification from "../components/Notification/Notification";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import SidebarNavigation from "../components/SidebarNavigation/SidebarNavigation";
import Login from "../components/LoginSlider/Login";
import ToggleSubscribe from "../components/NewsletterSlider/ToggleSubscribe";
// interface Props {
//   category: string[];
// }
const showIcons = {
  search: true,
  user: false,
  wishlist: true,
  cart: true,
  navigation: true,
};
const AllProducts: React.FC = () => {
  // const products = useSelector((state: any) => state.data);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const gateWay = useSelector((state: any) => state.cart.gateWay);
  const showSidebar = useSelector((state: any) => state.cart.showSidebar);
  const showSearch = useSelector((state: any) => state.cart.showSearch);
  const showSignIn = useSelector((state: any) => state.cart.showSignIn);
  const showNewsletter = useSelector((state: any) => state.cart.showNewsletter);

  const router = useRouter();
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationNumber, setPaginationNumber] = useState(
    totalPages ? 96 / totalPages : 8
  );
  const [totalCloths, setTotalCloths] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${gateWay}/api/product/`);

        if (res.data.cloths) {
          setData(res.data.cloths);
          setFilteredData(res.data.cloths);
          setTotalPages(res.data.totalPages);
          setTotalCloths(res.data.totalCloths);
          setActivePage(res.data.page);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);

        console.log({ message: "error while fetching product ", error });
      }
    };
    fetchData();
  }, []);
  const handleMultiplyPagination = async () => {
    if (currentPage < totalPages) {
      const newPagination = currentPage + 1;
      setCurrentPage(newPagination);
      setPaginationNumber(newPagination * paginationNumber);
      try {
        setLoading(true);
        const incrementCurrentPage = activePage + 1;
        setActivePage(incrementCurrentPage);
        const res = await axios.get(
          `${gateWay}/api/product/?page=${incrementCurrentPage}`
        );
        setData(res.data.cloths);
        setFilteredData(res.data.cloths);
        setActivePage(res.data.page);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log({ message: "error while adding pagination", error });
      }
    }
    return;
  };
  return (
    <main className="w-full text-black  font-Dosis h-max bg-white flex flex-col  ">
      <div className="w-full   border border-gray-100 mb-8 border-2 ">
        {showSearch ? (
          <SearchBar showIcons={showIcons} />
        ) : (
          <Navbar showIcons={showIcons} />
        )}
      </div>
      <ToastContainer />
      {showSidebar && <SidebarNavigation />}
      {showSignIn && <Login />}
      {showNewsletter && <ToggleSubscribe />}
      {loading && (
        <div className="fixed z-20 bg-gray-100  opacity-75 flex items-center justify-center top-0 w-full h-screen">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#2d7e23"}
            height={64}
            width={64}
          />
        </div>
      )}
      <Notification />
      {openFilter && (
        <FilterData
          data={data}
          open={openFilter}
          setOpen={setOpenFilter}
          setData={setFilteredData}
        />
      )}
      <div className="w-full flex items-start flex-col sm:flex-row  ">
        <div className=" w-full sm:w-max ">
          <Filtering
            data={data}
            setData={setFilteredData}
            open={openFilter}
            setOpen={setOpenFilter}
          />
        </div>

        <div className="w-full  flex items-center mt-8 mb-16 gap-16 justify-center flex-wrap">
          {filteredData.length > 0 ? (
            filteredData?.map((item: any) => {
              return <ProductCard key={item._id} product={item} />;
            })
          ) : (
            <div className=" relative w-full  h-full min-h-[300px]  my-8 flex items-center justify-center">
              <div className=" w-full flex items-center justify-center flex-col gap-5">
                <h1 className="text-5xl ">Click show more &rarr;</h1>
                <TbDeviceDesktopSearch className="text-4xl" />
                <button
                  onClick={handleMultiplyPagination}
                  className="bg-black text-white rounded-sm p-1 px-6 border border-gray-400 "
                >
                  click here
                </button>
              </div>
            </div>
          )}

          <div className="w-full flex flex-col   justify-center">
            <div className="">
              <p className=" text-sm mb-4 text-gray-400">
                showing <span className="">{filteredData?.length}</span> out of{" "}
                <span className="">{totalCloths}</span> results
              </p>
            </div>
            <div className="mb-8 w-full sm:w-96 h-0.5 bg-gray-200 rounded-full">
              <div
                className={`w-${paginationNumber} h-0.5 bg-black rounded-full`}
              ></div>
            </div>

            <button
              onClick={handleMultiplyPagination}
              className="w-72 px-24 py-2  mb-24 text-xs font-medium border border-gray-600 rounded-full text-center"
            >
              {loading ? (
                <span className="w-full h-full  flex items-center  justify-center">
                  <ReactLoading
                    type={"bubbles"}
                    color={"#000"}
                    height={25}
                    width={75}
                    className="relative bottom-6"
                  />
                </span>
              ) : (
                <span className="w-full flex items-center justify-center">
                  Show more &#8594;
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* pagination */}
      {/* <div className="flex items-center justify-between border-t border-gray-200 bg-alice-blue  mt-8 px-4 py-3 sm:px-6">
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
      </div> */}

      <Footer />
    </main>
  );
};

export default AllProducts;
