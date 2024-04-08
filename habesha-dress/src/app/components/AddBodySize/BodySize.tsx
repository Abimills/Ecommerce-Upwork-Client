"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data } from "./data";
import { menData } from "./men-data";
import { IoCloseOutline } from "react-icons/io5";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  toggleShowBodySize,
  toggleShowSignIn,
} from "@/app/lib/cartSlice/cartSlice";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
interface Props {
  id: string;
}

const BodySize: React.FC<Props> = ({ id }) => {
  const [toggleGender, setToggleGender] = useState("women");
  const [loading, setLoading] = useState(false);
  const [bodySize, setBodySize] = useState<any>({
    name: "",
    clothId: id,
    hip: 0,
    arm: 0,
    breast: 0,
    aboveBreast: 0,
    shoulder: 0,
    shoulderToBust: 0,
    shoulderToChestaboveBust: 0,
    underBreast: 0,
    shoulderToWaist: 0,
    waist: 0,
    waistToLeg: 0,
    shoulderToBreast: 0,
    armLength: 0,
    cateogry: "women",
  });
  const [menBodySize, setMenBodySize] = useState<any>({
    name: "",
    clothId: id,
    category: "men",
    arm: 0,
    breast: 0,
    shoulder: 0,

    armLength: 0,
  });

  const handleInput = (e: any) => {
    setBodySize({ ...bodySize, [e.target.name]: e.target.value });
  };
  const handleMenInput = (e: any) => {
    setMenBodySize({ ...menBodySize, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const showSignIn = useSelector((state: any) => state.cart.showBodySize);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      bodySize.name !== "" &&
      bodySize.hip > 0 &&
      bodySize.arm > 0 &&
      bodySize.breast > 0 &&
      bodySize.aboveBreast > 0 &&
      bodySize.shoulder > 0 &&
      bodySize.shoulderToBust > 0 &&
      bodySize.shoulderToChestaboveBust > 0 &&
      bodySize.underBreast > 0 &&
      bodySize.shoulderToWaist > 0 &&
      bodySize.waist > 0 &&
      bodySize.waistToLeg > 0 &&
      bodySize.shoulderToBreast > 0 &&
      bodySize.armLength > 0
    ) {
      let measurements: any = localStorage.getItem("measurements");

      if (measurements !== null) {
        const allMeasurements = JSON.parse(measurements);
        const newBodySizes: any = [...allMeasurements, bodySize];
        localStorage.setItem("measurements", JSON.stringify(newBodySizes));
        setBodySize({
          name: "",
          hip: 0,
          arm: 0,
          breast: 0,
          aboveBreast: 0,
          shoulder: 0,
          shoulderToBust: 0,
          shoulderToChestaboveBust: 0,
          underBreast: 0,
          shoulderToWaist: 0,
          waist: 0,
          waistToLeg: 0,
          shoulderToBreast: 0,
          armLength: 0,
        });
        toast.success("Added  Body Measurement Successfully!");
      } else {
        localStorage.setItem("measurements", JSON.stringify([bodySize]));
        setBodySize({
          name: "",
          hip: 0,
          arm: 0,
          breast: 0,
          aboveBreast: 0,
          shoulder: 0,
          shoulderToBust: 0,
          shoulderToChestaboveBust: 0,
          underBreast: 0,
          shoulderToWaist: 0,
          waist: 0,
          waistToLeg: 0,
          shoulderToBreast: 0,
          armLength: 0,
          category: "women",
        });
        toast.success("Added  Body Measurement Successfully!");
      }
    } else {
      toast.error("Please fill out all fields");
    }
  };

  console.log(menBodySize);
  const handleMenSubmit = async (e: any) => {
    e.preventDefault();
    if (
      menBodySize.name !== "" &&
      menBodySize.arm > 0 &&
      menBodySize.breast > 0 &&
      menBodySize.shoulder > 0 &&
      menBodySize.armLength > 0
    ) {
      let measurements: any = localStorage.getItem("measurements");

      if (measurements !== null) {
        const allMeasurements = JSON.parse(measurements);
        const newBodySizes: any = [...allMeasurements, menBodySize];
        localStorage.setItem("measurements", JSON.stringify(newBodySizes));
        setMenBodySize({
          name: "",
          arm: 0,
          breast: 0,
          shoulder: 0,
          armLength: 0,
        });
        toast.success("Added  Body Measurement Successfully!");
      } else {
        localStorage.setItem("measurements", JSON.stringify([menBodySize]));
        setMenBodySize({
          name: "",
          arm: 0,
          breast: 0,
          shoulder: 0,
          armLength: 0,
        });
        toast.success("Added  Body Measurement Successfully!");
      }
    } else {
      toast.error("Please fill out all fields");
    }
  };
  const handleClose = () => {
    dispatch(toggleShowBodySize());
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
                  <div className="flex h-full overflow-y-scroll   flex-col  bg-white shadow-xl">
                    <div className="flex-1  px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Your Body Size
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
                      <section className="w-full h-full flex text-black    flex-col  items-center justify-center">
                        <div className="w-full flex items-center justify-between gap-3">
                          <div
                            onClick={() => setToggleGender("women")}
                            className={`${
                              toggleGender === "women" &&
                              "border-2 border-gray-500"
                            } w-1/2 flex items-center justify-between border-2 border-gray-300 py-2 px-4  cursor-pointer`}
                          >
                            <div
                              className={`${
                                toggleGender === "men" && "text-gray-900"
                              }text-gray-400`}
                            >
                              women
                            </div>
                            <div
                              className={`${
                                toggleGender === "women" &&
                                "w-2 h-2 bg-green-400 rounded-full"
                              } w-2 h-2 bg-gray-400 rounded-full `}
                            ></div>
                          </div>
                          <div
                            onClick={() => setToggleGender("men")}
                            className={`${
                              toggleGender === "men" &&
                              "border-2 border-gray-500"
                            } w-1/2 flex items-center justify-between border-2 border-gray-300 py-2 px-4 cursor-pointer`}
                          >
                            <div
                              className={`${
                                toggleGender === "men" && "text-gray-900"
                              }text-gray-400`}
                            >
                              men
                            </div>
                            <div
                              className={`${
                                toggleGender === "men" &&
                                "w-2 h-2 bg-green-400 rounded-full"
                              } w-2 h-2 bg-gray-400 rounded-full `}
                            ></div>
                          </div>
                        </div>
                        <div className="w-full max-w-sm p-4 bg-white sm:p-6 md:p-8 ">
                          {toggleGender === "women" ? (
                            <form
                              className="space-y-6 mb-6"
                              onSubmit={handleSubmit}
                            >
                              <div className="flex items-center gap-2">
                                <label className="block capitalize mb-2 text-sm font-medium text-gray-900 ">
                                  whose size :
                                </label>
                                <input
                                  type="text"
                                  value={bodySize.name}
                                  name="name"
                                  onChange={(e) => handleInput(e)}
                                  className={`w-full border-2 border-gray-300 rounded-lg`}
                                  placeholder="your name"
                                  required
                                />
                              </div>

                              <div className="w-full ">
                                {data.map((item: any, index: number) => {
                                  return (
                                    <div
                                      key={item.id + index}
                                      className="flex w-full gap-4 items-center  my-3"
                                    >
                                      <div className="w-full flex items-start justify-center flex-col">
                                        <label className="  text-sm font-medium text-gray-900 ">
                                          {item.title}
                                        </label>
                                        <img
                                          src={item.img}
                                          alt=""
                                          className="w-48 h-48  object-contain"
                                        />
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <input
                                          type="number"
                                          name={item.name}
                                          onChange={(e) => handleInput(e)}
                                          value={bodySize[item.name]}
                                          className={`w-24`}
                                          placeholder="0"
                                          required
                                        />
                                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                          cm
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}
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
                                    Save your sizes
                                  </span>
                                )}
                              </button>
                            </form>
                          ) : (
                            <form
                              className="space-y-6 mb-6"
                              onSubmit={handleMenSubmit}
                            >
                              <div className="flex items-center gap-2">
                                <label className="block capitalize mb-2 text-sm font-medium text-gray-900 ">
                                  whose size :
                                </label>
                                <input
                                  type="text"
                                  value={menBodySize.name}
                                  name="name"
                                  onChange={(e) => handleMenInput(e)}
                                  className={`w-full border-2 border-gray-300 rounded-lg`}
                                  placeholder="your name"
                                  required
                                />
                              </div>

                              <div className="w-full ">
                                {menData.map((item: any, index: number) => {
                                  return (
                                    <div
                                      key={item.id + index}
                                      className="flex w-full gap-4 items-center  my-3"
                                    >
                                      <div className="w-full flex items-start justify-center flex-col">
                                        <label className="  text-sm font-medium text-gray-900 ">
                                          {item.title}
                                        </label>
                                        <img
                                          src={item.img}
                                          alt=""
                                          className="w-48 h-48  object-contain"
                                        />
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <input
                                          type="number"
                                          name={item.name}
                                          onChange={(e) => handleMenInput(e)}
                                          value={menBodySize[item.name]}
                                          className={`w-24`}
                                          placeholder="0"
                                          required
                                        />
                                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                          cm
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })}
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
                                    Save your sizes
                                  </span>
                                )}
                              </button>
                            </form>
                          )}
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

export default BodySize;
