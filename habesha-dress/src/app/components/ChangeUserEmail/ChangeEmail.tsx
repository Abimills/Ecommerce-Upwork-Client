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
interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ChangeEmail: React.FC<Props> = ({ open, setOpen }) => {
  const user = useSelector((state: any) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState<any>("");
  const gateWay = useSelector((state: any) => state.cart.gateWay);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      try {
        setLoading(true);
        const res = await axios.put(`${gateWay}/api/update-email`, {
          token: user?.token,

          email,
          password,
        });
        if (res.data.success) {
          toast.success("Successfully updated Email!");
          const updatedUser = { ...user, email: res.data.email };
          dispatch(loginSuccess(updatedUser));
          setLoading(false);
        } else {
          toast.error("Sorry can not update Email, try again");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log({ message: "error while updating Email", error });
      }
    } else {
      toast.error("Please fill all fields");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
                          Change Email address
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
                      <section className="w-full h-full flex  font-Dosis    flex-col  items-center justify-center">
                        <div className="w-full max-w-sm p-4 bg-white sm:p-6 md:p-8 ">
                          <form className="space-y-6" onSubmit={handleSubmit}>
                            <p className="">
                              Please enter your new email address and confirm
                              the change by entering your password.
                            </p>
                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Your Email
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className=" border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
                                required
                                onChange={(e: any) =>
                                  setPassword(e.target.value)
                                }
                                placeholder="••••••••"
                                className=" border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              />
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
                                  Save New Email
                                </span>
                              )}
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

export default ChangeEmail;
