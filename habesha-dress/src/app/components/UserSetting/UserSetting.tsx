"use client";
import React, { useEffect, useState } from "react";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";

import { Pagination, Navigation, Autoplay, EffectFade } from "swiper/modules";
import DiscountCard from "../DiscountCard/DiscountCard";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import axios from "axios";
import WelcomeCard from "../DiscountCard/WelcomeCard";
import Products from "../Products/Products";
import ProductCard from "../ProductCard/ProductCard";
import InspirationCard from "../DiscountCard/InspirationCard";
import Footer from "../Footer/Footer";
import { CiUser } from "react-icons/ci";
import { MdMailOutline } from "react-icons/md";
import { CiUnlock } from "react-icons/ci";
import { useSelector } from "react-redux";
import Login from "../LoginSlider/Login";
import Navbar from "../Navbar/Navbar";
import UserBasicInfo from "../UserBasicInfo/UserBasicInfo";
import ChangeEmail from "../ChangeUserEmail/ChangeEmail";

const UserSetting: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);

  const user = useSelector((state: any) => state.auth.user);

  return (
    <div className="w-full  ">
      {/* empty orders page */}
      {/* {showUserBasicInfo && <Login />} */}
      <UserBasicInfo open={open} setOpen={setOpen} />
      <ChangeEmail open={openEmail} setOpen={setOpenEmail} />
      <div className=" w-full flex   flex-col p-6">
        <h1 className="my-8 text-2xl font-bold "> Your data</h1>
        <div className="w-full  flex justify-between items-start my-4 border-b border-gray-300">
          <div className="flex  items-start gap-6">
            <CiUser className="text-3xl" />
            <div className="">
              <p className="mb-3">{user?.gender}</p>
              <p className="mb-3 font-medium">{user?.name}</p>
              <p className="mb-3 text-gray-500">Date of birth not saved</p>
              <p className="mb-3 text-gray-500">Phone number not saved</p>
              <p className="mb-3 text-gray-500">{user?.location}</p>
            </div>
          </div>
          <button onClick={() => setOpen(true)} className="underline text-sm">
            {" "}
            modify
          </button>
        </div>
        <div className="w-full ">
          <h1 className="my-8 text-2xl font-bold ">Your email address</h1>
          <div className="w-full  flex justify-between mb-8 items-start my-4 border-b border-gray-300">
            <div className=" flex items-center mb-8 gap-8">
              <MdMailOutline className="text-gray-500 text-4xl" />
              <p className="">{user?.email}</p>
            </div>

            <button
              onClick={() => setOpenEmail(true)}
              className="underline text-sm mb-8"
            >
              {" "}
              modify
            </button>
          </div>
        </div>
        <div className="w-full">
          <h1 className="my-8 text-2xl font-bold ">Your password</h1>
          <div className="w-full  flex justify-between mb-8 items-start my-4 border-b border-gray-300">
            <div className=" flex items-center mb-4 gap-8">
              <CiUnlock className="text-gray-500 text-4xl" />
              <p className="font-bold text-4xl tracking-wide mb-4">.......</p>
            </div>

            <button className="underline text-sm mb-8"> modify</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserSetting;
