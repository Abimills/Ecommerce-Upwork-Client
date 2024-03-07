"use client";
import React from "react";
import CartItem from "../CartItem/CartItem";
import { IoCloseOutline } from "react-icons/io5";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowFilter } from "@/app/lib/cartSlice/cartSlice";
import { sortDataReducer } from "@/app/lib/cartSlice/dataSlice";

const sortProducts = [
  {
    id: 1,
    value: "Price(low to high)",
    checked: true,
    typeFilter: "ascending",
  },
  {
    id: 2,
    value: "Price(high to low)",
    checked: false,
    typeFilter: "descending",
  },
  // { id: 3, value: "Most Popular", checked: false, typeFilter: "ascending" },
  { id: 4, value: "Newest", checked: false, typeFilter: "time" },
  { id: 5, value: "Best Rating", checked: false, typeFilter: "rating" },
];
const genderFilter = [
  { id: 1, value: "Women", checked: true },
  { id: 2, value: "Men", checked: false },
  { id: 3, value: "Kids", checked: false },
];
const OccasionsFilter = [
  { id: 1, value: "Wedding", checked: false },
  { id: 2, value: "Holidays", checked: true },
  { id: 3, value: "Awdeamet", checked: true },
  { id: 4, value: "Timket", checked: false },
  { id: 5, value: "Birthday", checked: false },
];
const sizeFilter = [
  { id: 1, value: "S", label: "S", checked: true },
  { id: 2, value: "M", label: "M", checked: true },
  { id: 3, value: "L", label: "L", checked: true },
  { id: 4, value: "XL", label: "XL", checked: false },
  { id: 5, value: "2XL", label: "2XL", checked: false },
  { id: 6, value: "3XL", label: "4XL", checked: false },
  { id: 7, value: "4XL", label: "4XL", checked: false },
  { id: 8, value: "5XL", label: "5XL", checked: false },
];
interface Props {
  data: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<any>>;
  setData: React.Dispatch<React.SetStateAction<any>>;
}
const FilterData: React.FC<Props> = ({ setData, data, open, setOpen }) => {
  const showFilter = useSelector((state: any) => state.cart.showFilter);
  // const data = useSelector((state: any) => state.data.data);
  const [sizes, setSizes] = useState(["S", "M", "L"]);
  const [gender, setGender] = useState(["Women"]);
  const [occasion, setOccasion] = useState(["Holidays", "Awdeamet"]);
  const dispatch = useDispatch();
  const [rangeValue, setRangeValue] = useState(250);
  const handleRangeChange = (e: any) => {
    setRangeValue(e.target.value);
  };

  const handleSizes = (item: any) => {
    const foundSize = sizes.find((size: any) => size == item);
    if (!foundSize) {
      const newSizes: any = [...sizes, item];
      setSizes(newSizes);
    } else if (foundSize) {
      const filteredData = sizes.filter((size: any) => size !== item);
      setSizes(filteredData);
    }
  };
  const handleGender = (item: any) => {
    const foundGender = gender.find(
      (singleGender: any) => singleGender === item
    );
    if (!foundGender) {
      const newGender: any = [...gender, item];
      setGender(newGender);
    } else if (foundGender) {
      const filteredData = gender.filter(
        (singleGender: any) => singleGender !== item
      );
      setGender(filteredData);
    }
  };
  const handleOccasions = (item: any) => {
    const foundOccasion = occasion.find(
      (singleOccasion: any) => singleOccasion === item
    );
    if (!foundOccasion) {
      const newOccasion: any = [...occasion, item];
      setOccasion(newOccasion);
    } else if (foundOccasion) {
      const filteredData = occasion.filter(
        (singleOccasion: any) => singleOccasion !== item
      );
      setOccasion(filteredData);
    }
  };

  const handleSort = (typeFilter: any) => {
    if (typeFilter === "ascending") {
      const newData = [...data].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return priceA - priceB;
      });
      setData(newData);
    }
    if (typeFilter === "descending") {
      const newData = [...data].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return priceB - priceA;
      });
      setData(newData);
    }
    if (typeFilter === "time") {
      const newData = [...data].sort((a, b) => {
        const dateA: any = new Date(a.updatedAt).getTime();
        const dateB: any = new Date(b.updatedAt).getTime();
        return dateB - dateA;
      });
      setData(newData);
    }
    if (typeFilter === "rating") {
      const newData = [...data].sort((a, b) => {
        const ratingA: any = a.rating;
        const ratingB: any = b.rating;
        return ratingB - ratingA;
      });
      setData(newData);
    }
  };
  const handleOpenFilter = (e: any) => {
    setOpen(false);
  };

  const handleFilterAll = () => {
    let finalFilteredData = data;
    if (sizes?.length > 0) {
      finalFilteredData = finalFilteredData.filter((product: any) =>
        sizes.some((size) => product.availableSizes.includes(size))
      );
      if (gender?.length > 0) {
        finalFilteredData = finalFilteredData.filter((product: any) =>
          gender.some((singleGender) =>
            product.forWhichGender.includes(singleGender)
          )
        );
      }
      if (rangeValue) {
        finalFilteredData = finalFilteredData.filter(
          (product: any) => product.price <= rangeValue
        );
      }
      if (occasion?.length > 0) {
        finalFilteredData = finalFilteredData.filter((product: any) =>
          occasion.some((singleOccasion) =>
            product.clothOccasion.includes(singleOccasion)
          )
        );
      }

      setData(finalFilteredData);
      dispatch(toggleShowFilter());
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleOpenFilter}>
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
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className=" text-gray-900 font-semibold text-2xl">
                          Sort & Filter
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={handleOpenFilter}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      {/* filter section */}
                      <div className="w-full mt-8 mb-2">
                        <div className="w-full h-max bg-white flex flex-col">
                          <div className=" w-full">
                            <h1 className="  font-semibold text-2xl mb-8 w-full text-center">
                              Sort
                            </h1>
                            <div className="w-full border-b-2 border-gray-400">
                              {sortProducts.map((item) => {
                                return (
                                  <div
                                    key={item.id}
                                    className="flex items-center gap-4 text-lg mb-8"
                                  >
                                    <input
                                      type="radio"
                                      name="sort"
                                      onClick={() =>
                                        handleSort(item.typeFilter)
                                      }
                                      defaultChecked={item.checked}
                                      className=" w-5 h-5 border border-gray-400 checked:bg-green-500 focus:ring-green-500 hover:bg-green-500 checked:text-green-500 "
                                    />

                                    <label className="text-lg font-roboto text-gray-700">
                                      {item.value}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <h1 className="  font-semibold text-2xl mb-8 mt-8 underline w-full text-center">
                            Filter
                          </h1>

                          {/* size section */}
                          <div className=" w-full">
                            <h1 className="  font-medium text-xl mb-8">
                              Sizes
                            </h1>
                            <div className="w-full border-y-2  py-2 border-gray-400">
                              {sizeFilter.map((item: any) => {
                                return (
                                  <div
                                    className="flex items-center gap-4 text-lg mb-8"
                                    key={item.id}
                                  >
                                    <input
                                      type="checkbox"
                                      name="sort"
                                      onClick={() => handleSizes(item.value)}
                                      defaultChecked={item.checked}
                                      className=" w-5 h-5 border border-gray-400  "
                                    />
                                    <label className="text-lg font-roboto text-gray-700">
                                      {item.value}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          {/* category */}
                          <div className=" w-full">
                            <h1 className="  font-medium text-xl mt-8 mb-8">
                              Gender & age
                            </h1>
                            <div className="w-full border-y-2 mb-8 border-gray-400">
                              {genderFilter.map((gender) => (
                                <div
                                  className="flex items-center gap-4 text-lg mb-8"
                                  key={gender.id}
                                >
                                  <input
                                    type="checkbox"
                                    name="sort"
                                    onClick={() => handleGender(gender.value)}
                                    defaultChecked={gender.checked}
                                    className=" w-5 h-5 border border-gray-400  "
                                  />
                                  <label className="text-lg font-roboto text-gray-700">
                                    {gender.value}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* price */}
                          <div className=" w-full">
                            <h1 className="  font-medium text-xl mt-8 mb-8">
                              Price Range
                            </h1>
                            <div className="w-full  border-y-2 mb-8 border-gray-400">
                              <div className="flex mt-16 relative items-center gap-4 text-lg mb-8">
                                <label className="text-lg font-roboto text-gray-700">
                                  $0
                                </label>
                                <input
                                  type="range"
                                  name="sort"
                                  min={0}
                                  value={rangeValue}
                                  max={800}
                                  onChange={handleRangeChange}
                                  defaultChecked
                                  className="w-full  border border-gray-400  "
                                />
                                <label className="text-lg font-semibold absolute bottom-8 left-1/2 font-roboto text-gray-700">
                                  ${rangeValue}
                                </label>
                                <label className="text-lg font-roboto text-gray-700">
                                  $800
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* ocasions */}
                          <div className=" w-full">
                            <h1 className="  font-medium text-xl mt-8 mb-8">
                              Filter Occasions
                            </h1>
                            <div className="w-full border-y-2 mt-8 border-gray-400">
                              {OccasionsFilter.map((occasion) => (
                                <div
                                  className="flex items-center gap-4 text-lg mt-8 mb-8"
                                  key={occasion.id}
                                >
                                  <input
                                    type="checkbox"
                                    name="sort"
                                    onClick={() =>
                                      handleOccasions(occasion.value)
                                    }
                                    defaultChecked={occasion.checked}
                                    className=" w-5 h-5 border border-gray-400  "
                                  />
                                  <label className="text-lg font-roboto text-gray-700">
                                    {occasion.value}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <button
                        type="button"
                        className="w-full text-center text-gray-400 hover:text-indigo-500"
                        onClick={() => setData(data)}
                      >
                        clear filter
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                      <div className="mt-6">
                        <button
                          onClick={handleFilterAll}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Apply Filters
                        </button>
                      </div>
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

export default FilterData;
