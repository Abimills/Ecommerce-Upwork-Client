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
import { toggleShowSignIn } from "@/app/lib/cartSlice/cartSlice";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
const Login: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginIssues, setLoginIssues] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const showSignIn = useSelector((state: any) => state.cart.showSignIn);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoginIssues({ email: "", password: "" });
    if (email !== "" && password !== "") {
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:3000/api/login", {
          email,
          password,
        });
        if (res.data.success) {
          dispatch(loginSuccess(res.data.user));

          router.push("/user-profile");
          setLoading(false);
        } else if (!res.data.success) {
          if (res.data.loginIssue === "email") {
            setLoginIssues({ ...loginIssues, email: res.data.loginIssue });
            setLoading(false);
          }
          if (res.data.loginIssue === "password") {
            setLoginIssues({ ...loginIssues, password: res.data.loginIssue });
            setLoading(false);
          }
          toast.error(" Email or Password Wrong", {
            position: "bottom-right",
          });
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);

        console.log({ message: "error while signing in ", error });
      }
    } else {
      toast.error("Please Fill all Required fields", {
        position: "bottom-right",
      });
    }
  };
  const handleClose = () => {
    dispatch(toggleShowSignIn());
  };
  return (
    <Transition.Root show={showSignIn} as={Fragment}>
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
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Account
                        </Dialog.Title>
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
                      <ToastContainer />
                      <section className="w-full h-full flex     flex-col  items-center justify-center">
                        <div className="w-full max-w-sm p-4 bg-white sm:p-6 md:p-8 ">
                          <form
                            className="space-y-6 mb-6"
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
                                onChange={(e: any) => {
                                  setLoginIssues({ ...loginIssues, email: "" });
                                  setEmail(e.target.value);
                                }}
                                className={` border border-gray-300  ${
                                  loginIssues.email == "email" &&
                                  "border-red-600 border-2"
                                }  text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                                placeholder="email@gmail.com"
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
                                onChange={(e: any) => {
                                  setPassword(e.target.value);
                                  setLoginIssues({
                                    ...loginIssues,
                                    password: "",
                                  });
                                }}
                                placeholder="••••••••"
                                className={` border border-gray-300 ${
                                  loginIssues.password == "password" &&
                                  "border-red-600 border-2"
                                } text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                                required
                              />
                            </div>
                            <div className="flex items-start">
                              <button className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">
                                Forget Password?
                              </button>
                            </div>
                            <button
                              type="submit"
                              className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:none focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                              )}
                            </button>
                          </form>
                          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered?{" "}
                            <button
                              onClick={() => router.push("/signup")}
                              className="text-blue-700 hover:underline"
                            >
                              Create account
                            </button>
                          </div>
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

export default Login;
