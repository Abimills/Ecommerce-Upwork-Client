"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";

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
const Filtering = () => {
  const [openSort, setOpenSort] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openOccasion, setOpenOccasion] = useState(false);
  return (
    <div
      onClick={() => {
        openGender && setOpenGender(false);
        openSort && setOpenSort(false);
        openSize && setOpenSize(false);
        openOccasion && setOpenOccasion(false);
      }}
      className="w-full bg-white h-max p-16"
    >
      <div className="w-full p-8 h-max border-b border-gray-300">
        <div className="w-full h-max flex items-center justify-between gap-8">
          <div className="relative w-max">
            <div className="  w-max h-2 border border-indigo-300 bg-indigo-100 gap-4 p-1 px-6 py-6 rounded-full flex items-center justify-center">
              <h1 className="font-medium text-sm">Sort</h1>
              {openSort ? (
                <MdKeyboardArrowUp
                  onClick={() => setOpenSort(!openSort)}
                  className="text-3xl text-gray-500 border border-gray-200 "
                />
              ) : (
                <MdKeyboardArrowDown
                  onClick={() => setOpenSort(!openSort)}
                  className="text-3xl text-gray-500 border border-gray-200 "
                />
              )}
            </div>
            {openSort && (
              <div className=" fixed bg-white w-96 h-max my-6 p-8 shadow-lg border border-gray-200   rounded-lg ">
                {sortProducts.map((sort: any) => {
                  return (
                    <div
                      key={sort.id}
                      className=" w-full h-max flex items-center my-8 justify-between"
                    >
                      <label className="">{sort.value}</label>
                      <input
                        type="radio"
                        defaultChecked={sort.checked}
                        name="sort"
                        className="w-5 h-5 border border-gray-400 checked:bg-green-500 focus:ring-green-500 hover:bg-green-500 checked:text-green-500"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="relative w-max  ">
            <div className=" w-max h-2 border border-indigo-300 bg-indigo-100 gap-4 p-1 px-6 py-6 rounded-full flex items-center justify-center">
              <h1 className="font-medium text-sm">Size</h1>
              {openSize ? (
                <MdKeyboardArrowUp
                  onClick={() => setOpenSize(!openSize)}
                  className="text-3xl text-gray-500 border border-gray-200 "
                />
              ) : (
                <MdKeyboardArrowDown
                  onClick={() => setOpenSize(!openSize)}
                  className="text-3xl text-gray-500 border border-gray-200 "
                />
              )}
            </div>
            {openSize && (
              <div className=" fixed bg-white overflow-y-scroll  w-96 h-max my-6 p-8 shadow-lg border border-gray-200   rounded-lg ">
                {sizeFilter.map((size: any) => {
                  return (
                    <div
                      key={size.id}
                      className=" w-full h-max flex items-center my-8 justify-between"
                    >
                      <label className="">{size.value}</label>
                      <input
                        type="checkbox"
                        onClick={() => {
                          openSize && setOpenSize(true);
                        }}
                        defaultChecked={size.checked}
                        name="size"
                        className="w-5 h-5 border border-gray-400 checked:bg-green-500 focus:ring-green-500 hover:bg-green-500 checked:text-green-500"
                      />
                    </div>
                  );
                })}
              </div>
            )}
            <div className="w-full h-full absolute"></div>
          </div>
          <div className="relative w-max">
            <div className=" w-max h-2 border border-indigo-300 bg-indigo-100 gap-4 p-1 px-6 py-6 rounded-full flex items-center justify-center">
              <h1 className="font-medium text-sm">Gender</h1>
              {openGender ? (
                <MdKeyboardArrowUp
                  onClick={() => setOpenGender(!openGender)}
                  className="text-3xl text-gray-500 border border-gray-200 "
                />
              ) : (
                <MdKeyboardArrowDown
                  onClick={() => setOpenGender(!openGender)}
                  className="text-3xl text-gray-500 border border-gray-200 "
                />
              )}
            </div>
            {openGender && (
              <div className=" fixed bg-white  w-96 h-max my-6 p-8 shadow-lg border border-gray-200   rounded-lg ">
                {genderFilter.map((gender: any) => {
                  return (
                    <div
                      key={gender.id}
                      className=" w-full h-max flex items-center my-8 justify-between"
                    >
                      <label className="">{gender.value}</label>
                      <input
                        type="radio"
                        defaultChecked={gender.checked}
                        name="gender"
                        className="w-5 h-5 border border-gray-400 checked:bg-green-500 focus:ring-green-500 hover:bg-green-500 checked:text-green-500"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="relative w-max">
            <div className=" w-max h-2 border border-indigo-300 bg-indigo-100 gap-4 p-1 px-6 py-6 rounded-full flex items-center justify-center">
              <h1 className="font-medium text-sm">Occasions</h1>
              {openOccasion ? (
                <MdKeyboardArrowUp
                  onClick={() => setOpenOccasion(!openOccasion)}
                  className="text-3xl text-gray-500 border border-gray-200 "
                />
              ) : (
                <MdKeyboardArrowDown
                  onClick={() => setOpenOccasion(!openOccasion)}
                  className="text-3xl text-gray-500 border border-gray-200 "
                />
              )}
            </div>
            {openOccasion && (
              <div className=" fixed bg-white  w-96 h-max my-6 p-8 shadow-lg border border-gray-200   rounded-lg ">
                {OccasionsFilter.map((occasion: any) => {
                  return (
                    <div
                      key={occasion.id}
                      className=" w-full h-max flex items-center my-8 justify-between"
                    >
                      <label className="">{occasion.value}</label>
                      <input
                        type="checkbox"
                        defaultChecked={occasion.checked}
                        name="occasion"
                        className="w-5 h-5 border border-gray-400 checked:bg-green-500 focus:ring-green-500 hover:bg-green-500 checked:text-green-500"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="w-max h-2 border border-indigo-300 bg-indigo-100 gap-4 p-1 px-6 py-6 rounded-full flex items-center justify-center">
            <h1 className="font-medium text-sm">All Filters</h1>
            <MdKeyboardArrowDown className="text-3xl text-gray-500 border border-gray-200 " />
          </div>
        </div>
        <div className=" w-full h-full flex items-center"></div>
      </div>
      <div className="w-full h-max flex items-center gap-6 my-6">
        <div className=" cursor-pointer hover:line-through w-max h-2 border border-indigo-300 hover:bg-red-100 gap-4 p-1 px-6 py-6 rounded-full flex items-center justify-center">
          <MdOutlineClose
            onClick={() => setOpenSize(!openSize)}
            className="text-3xl text-gray-500  "
          />
          <h1 className="font-medium text-sm ">women</h1>
        </div>
        <div className=" w-max h-2 border border-indigo-300 hover:bg-red-100 gap-4 p-1 px-6 py-6 rounded-full flex items-center justify-center">
          <MdOutlineClose
            onClick={() => setOpenSize(!openSize)}
            className="text-3xl text-gray-500  "
          />
          <h1 className="font-medium text-sm ">women</h1>
        </div>
        <div className=" w-max h-2 border border-indigo-300 hover:bg-red-100 gap-4 p-1 px-6 py-6 rounded-full flex items-center justify-center">
          <MdOutlineClose
            onClick={() => setOpenSize(!openSize)}
            className="text-3xl text-gray-500  "
          />
          <h1 className="font-medium text-sm ">women</h1>
        </div>
      </div>
    </div>
  );
};

export default Filtering;
