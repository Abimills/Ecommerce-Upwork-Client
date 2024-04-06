"use client";
import { IoMdArrowBack } from "react-icons/io";
// import data from "../components/Products/allProducts";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";
import Footer from "../components/Footer/Footer";
import ProductCard from "../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RiMenuSearchLine } from "react-icons/ri";
import { RiArrowGoBackLine } from "react-icons/ri";
import ReactLoading from "react-loading";
import { useRouter } from "next/navigation";
import { toggleShowFilter } from "../lib/cartSlice/cartSlice";
import FilterData from "../components/Filter/Filter";
import WishlistCard from "../components/WishlistCard/WishlistCard";
import SearchBar from "../components/Navbar/SearchBar";
import Navbar from "../components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";

const Favorites: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilteredProducts] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any>([]);
  const favorites = useSelector((state: any) => state.cart.favorites);
  const showFilter = useSelector((state: any) => state.cart.showFilter);
  const showSearch = useSelector((state: any) => state.cart.showSearch);
  const gateWay = useSelector((state: any) => state.cart.gateWay);

  const showIcons = {
    search: true,
    user: true,
    wishlist: true,
    cart: true,
    navigation: false,
  };
  const router = useRouter();
  const filterData = (category: string) => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product: any) => {
          return product.category.includes(category);
        })
      );
    }
  };
  const dispatch = useDispatch();
  const handleOpenFilter = (e: any) => {
    dispatch(toggleShowFilter());
  };
  useEffect(() => {
    const fetchData = async () => {
      if (favorites?.length > 0 && favorites !== undefined) {
        const selected: any = [];
        try {
          setLoading(true);
          const res = await Promise.all(
            favorites?.map((id: any) =>
              axios.get(`${gateWay}/api/product/?id=${id}`)
            )
          );
          const wishlistProducts: any = res.map(
            (product) => product.data.cloth
          );
          wishlistProducts?.map((item: any) => selected.push(...item.category));
          setProducts(wishlistProducts);
          setFilteredProducts(wishlistProducts);
          setCategories(["All", ...new Set(selected)]);
          setLoading(false);
        } catch (error) {
          setLoading(false);

          console.log({ message: "error while fetching favorites", error });
        }
      }
    };

    fetchData();
  }, [favorites]);
  return (
    <main className="w-full min-h-screen  font-Dosis flex flex-col bg-white ">
      <ToastContainer
        newestOnTop={true}
        autoClose={1000}
        theme="dark"
        position={"bottom-right"}
      />
      <div className="w-full flex items-center   border border-gray-100 border-2 ">
        <div className=" w-max flex items-center gap-4 p-0.5 ">
          <RiArrowGoBackLine
            onClick={() => router.back()}
            className="ml-6 font-medium hover:text-green-700  cursor-pointer"
          />
          <h1 className=" hidden sm:inline text-xl font-medium  text-gray-600 tracking-tight font-base text-gray-700 cursor-pointer">
            <span
              className="hover:underline text-gray-700 mx-1"
              onClick={() => router.push("/")}
            >
              Home
            </span>
            {"/"}

            <span className="  hover:underline text-gray-700  mx-1">
              Favorites
            </span>
          </h1>
        </div>

        {showSearch ? (
          <SearchBar showIcons={showIcons} />
        ) : (
          <Navbar showIcons={showIcons} />
        )}
      </div>
      {openFilter && (
        <FilterData
          data={products}
          open={openFilter}
          setOpen={setOpenFilter}
          setData={setFilteredProducts}
        />
      )}
      <div className="w-full flex items-center mt-16 justify-between  p-4 ">
        <p className="mx-4 font-medium text-sm">
          {filterProducts?.length} Article
        </p>
        <button
          onClick={() => setOpenFilter(true)}
          className=" text-sm hover:text-green-500 mx-4 flex items-center gap-2 font-semibold"
        >
          <RiMenuSearchLine className="text-xl" />
          Filter & Sort
        </button>
      </div>
      {loading ? (
        <div className=" relative   my-8 flex items-center justify-center">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#2d7e23"}
            height={64}
            width={64}
          />
        </div>
      ) : (
        <div className="w-full">
          {favorites?.length > 0 ? (
            <div className="w-full flex px-2 py-8  border-y border-y-2-gray-400 items-center flex-wrap items-center mb-24 justify-evenly gap-4">
              {filterProducts?.map((item: any) => {
                return <WishlistCard product={item} key={item.id} />;
              })}
            </div>
          ) : (
            <div className="w-full flex  flex-col">
              {/* empty orders page */}
              <div className=" w-full flex  mb-16 items-center justify-center flex-col ">
                <img
                  src="../cart-empty.gif"
                  alt=""
                  className="h-56 w-full object-contain rounded-full mb-8"
                />
                <h1 className="font-bold text-2xl tracking-wide mb-8 leading-normal">
                  Your wishlist is empty
                </h1>
                <p className="leading-normal text-base font-medium text-gray-500 mb-8">
                  Get started and discover fashion for your whole family.
                </p>
                <button className="bg-black w-1/2 text-white py-3 px-9 font-bold rounded-full">
                  Check Products Now!
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <Footer />
    </main>
  );
};

export default Favorites;
