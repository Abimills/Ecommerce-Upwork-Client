"use client";
import { IoSearch } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="flex  w-full align-items justify-between p-2 ">
      <div className="flex align-items flex-1  justify-between ">
        <h1 className="font-bold">Noami</h1>
        <ul className="flex align-items w-4/5 justify-between ">
          <li className="ml-8 flex align-items font-semibold">
            {/* <RxDragHandleDots2 className="flex align-items mt-1" /> */}
            Home
          </li>
          <li className="ml-8 font-semibold ">Today's Deals</li>
          <li className="ml-8 font-semibold">Populars</li>
          <li className="ml-8 font-semibold">Contact</li>
        </ul>
      </div>
      <div className="flex  flex-1 align-items w-1\2  justify-between ">
        <ul className="flex justify-end flex-1 align-items gap-10 ">
          <div className="flex items-center w-1/3 gap-3 rounded-full border bg-green-200 border-gray-300">
            <input
              type="text"
              className="bg-none w-full rounded-full indent-3 my-2 bg-green-200 h-full text-sm outline-none"
              placeholder="Search"
            />
            <IoSearch className="text-2xl mr-1 border-black border rounded-full bg-black text-white " />
          </div>
          <FiUser
            onClick={() => router.push("/login")}
            className="text-2xl cursor-pointer"
          />
          <FaRegHeart
            className="text-2xl cursor-pointer"
            onClick={() => router.push("/wishlist")}
          />
          <FiShoppingCart
            className="text-2xl cursor-pointer"
            onClick={() => router.push("/cart")}
          />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
