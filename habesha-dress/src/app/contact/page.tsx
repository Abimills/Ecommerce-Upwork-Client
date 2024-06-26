"use client";
import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/Navbar/SearchBar";
import Navbar from "../components/Navbar/Navbar";
import SidebarNavigation from "../components/SidebarNavigation/SidebarNavigation";
import Login from "../components/LoginSlider/Login";
import ToggleSubscribe from "../components/NewsletterSlider/ToggleSubscribe";

const Contact: React.FC = () => {
  const showSearch = useSelector((state: any) => state.cart.showSearch);
  const showIcons = {
    search: true,
    user: true,
    wishlist: true,
    cart: true,
    navigation: true,
  };
  const showNewsletter = useSelector((state: any) => state.cart.showNewsletter);
  const showSignIn = useSelector((state: any) => state.cart.showSignIn);
  const showSidebar = useSelector((state: any) => state.cart.showSidebar);
  return (
    <div className=" w-full text-black min-h-screen  bg-white ">
      {showSearch ? (
        <SearchBar showIcons={showIcons} />
      ) : (
        <Navbar showIcons={showIcons} />
      )}
      {showSidebar && <SidebarNavigation />}
      {showSignIn && <Login />}
      {showNewsletter && <ToggleSubscribe />}
      <section className=" w-full h-full mt-24 p-3 ">
        <div className="flex flex-wrap">
          <div className="mb-10 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
            <h2 className="mb-9 text-4xl font-bold">Contact us</h2>
            <p className="mb-9 text-neutral-500 dark:text-neutral-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium, modi accusantium ipsum corporis quia asperiores
              dolorem nisi corrupti eveniet dolores ad maiores repellendus enim
              autem omnis fugiat perspiciatis? Ad, veritatis.
            </p>
            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
              New York, 94126, United States
            </p>
            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
              + 01 234 567 89
            </p>
            <p className="mb-2 text-neutral-500 dark:text-neutral-300">
              info@gmail.com
            </p>
          </div>
          <div className="mb-12  w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-6">
            <form>
              <div className="relative mb-6">
                <input
                  type="text"
                  className="peer border border-green-200 block min-h-[auto] w-full rounded  bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 "
                  id="exampleInput90"
                />
                <label className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                  Name
                </label>
              </div>
              <div className="relative mb-6">
                <input
                  type="email"
                  className="peer block min-h-[auto] w-full rounded border border-green-200 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleInput91"
                />
                <label className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                  Email address
                </label>
              </div>
              <div className="relative mb-6">
                <textarea className="peer block min-h-32 w-full rounded border border-green-200 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"></textarea>
                <label className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                  Message
                </label>
              </div>
              <div className="mb-6 inline-block min-h-[1.5rem] justify-center pl-[1.5rem] md:flex">
                <input
                  className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="checkbox"
                  value=""
                  id="exampleCheck96"
                  checked
                />
                <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                  Send me a copy of this message
                </label>
              </div>
              <button
                type="button"
                className="mb-6 bg-green-200 inline-block w-full rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-primary-600 "
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
