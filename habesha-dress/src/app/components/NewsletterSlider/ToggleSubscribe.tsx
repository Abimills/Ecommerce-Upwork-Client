"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../lib/authSlice/authSlice";
import CartItem from "../CartItem/CartItem";
// import { data } from "./data";
import { IoCloseOutline } from "react-icons/io5";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  toggleShowNewsletter,
  toggleShowSignIn,
} from "@/app/lib/cartSlice/cartSlice";

const ToggleSubscribe: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const showNewsletter = useSelector((state: any) => state.cart.showNewsletter);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      if (res.data.success) {
        alert("successfully signed In");

        dispatch(loginSuccess(res.data.user));

        router.push("/user-profile");
      } else {
        alert("could not signIn successfully : check your credentials");
      }
    } else {
      alert("fill all fields");
    }
  };
  const handleClose = () => {
    dispatch(toggleShowNewsletter());
  };

  return (
    <Transition.Root show={showNewsletter} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col  bg-white shadow-xl">
                    <div className="flex-1  px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-medium text-gray-900"></Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={handleClose}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      {/* login section */}
                      <section className="w-full h-full flex     flex-col  items-start ">
                        <div className="w-full max-w-sm  bg-white sm:p-6 md:p-8 ">
                          <p className="mb-16 relative mt-8 font-base text-base uppercase text-green-600">
                            Subscribe to get notified for every new release and
                            updates.
                          </p>
                          <form
                            className="space-y-16 w-full"
                            onSubmit={handleSubmit}
                          >
                            <div className="">
                              {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Name
                              </label> */}
                              <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)}
                                className="border-b-2 w-full border-white border-b-gray-400 text-gray-900 text-sm   block w-full p-2.5 "
                                placeholder="Name"
                                required
                              />
                            </div>
                            <div>
                              {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Email
                              </label> */}
                              <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)}
                                className="border-b-2 border-white border-b-gray-400 text-gray-900 text-sm   block w-full p-2.5"
                                placeholder="Email"
                                required
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Subscribe for News
                            </button>
                          </form>
                        </div>
                      </section>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ToggleSubscribe;