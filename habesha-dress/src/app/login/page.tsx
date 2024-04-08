"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../lib/authSlice/authSlice";
import { ToastContainer, toast } from "react-toastify";
import SearchBar from "../components/Navbar/SearchBar";
import Navbar from "../components/Navbar/Navbar";
import SidebarNavigation from "../components/SidebarNavigation/SidebarNavigation";
import Login from "../components/LoginSlider/Login";
import ToggleSubscribe from "../components/NewsletterSlider/ToggleSubscribe";
import Footer from "../components/Footer/Footer";
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const gateWay = useSelector((state: any) => state.cart.gateWay);
  const showNewsletter = useSelector((state: any) => state.cart.showNewsletter);
  const showSignIn = useSelector((state: any) => state.cart.showSignIn);
  const showSidebar = useSelector((state: any) => state.cart.showSidebar);
  const showSearch = useSelector((state: any) => state.cart.showSearch);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      try {
        setLoading(true);
        const res = await axios.post(`${gateWay}/api/login`, {
          email,
          password,
        });
        if (res.data.success) {
          toast.success("Login Successful");

          dispatch(loginSuccess(res.data.user));
          router.push("/user-profile");
          setLoading(false);
        } else {
          toast.error(
            "Login Failed ,try again with correct Email and password",
            {
              position: "bottom-right",
            }
          );
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log({ message: "error while signing in ", error });
      }
    } else {
      toast.error("Please Fill all Fields", {
        position: "bottom-right",
      });
    }
  };
  const showIcons = {
    search: true,
    user: true,
    wishlist: false,
    cart: true,
    navigation: true,
  };
  return (
    <section className="w-full  max-h-max bg-alice-blue   ">
      <div className="w-full   border border-gray-100 border-2 ">
        {showSearch ? (
          <SearchBar showIcons={showIcons} />
        ) : (
          <Navbar showIcons={showIcons} />
        )}
      </div>
      {showSidebar && <SidebarNavigation />}
      {showSignIn && <Login />}
      {showNewsletter && <ToggleSubscribe />}
      <ToastContainer className={"font-Dosis"} />
      <div className="w-full mt-8 text-black  h-max flex items-center justify-center p-4   rounded-lg  sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form
          className="w-full md:shadow-sm md:p-8  mt-8 sm:w-1/2 h-max space-y-6"
          onSubmit={handleSubmit}
        >
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="jane@gmail.com"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div className="flex items-start">
            <button className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
              forgot Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:none focus:outline-none focus:none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? (
              <span className="w-full h-full  flex items-center  justify-center">
                <ReactLoading
                  type={"bubbles"}
                  color={"#ffffff"}
                  height={25}
                  width={75}
                  className="relative bottom-6"
                />
              </span>
            ) : (
              <span className="w-full flex items-center justify-center">
                Login to your account
              </span>
            )}{" "}
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-blue-700 hover:underline"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default LoginPage;
