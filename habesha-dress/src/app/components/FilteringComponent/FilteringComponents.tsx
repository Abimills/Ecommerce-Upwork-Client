"use client";
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { FcFilledFilter } from "react-icons/fc";
import { MdFilterListAlt } from "react-icons/md";

const sortProducts = [
  {
    id: 1,
    value: "cheapest to expensive",
    checked: true,
    typeFilter: "ascending",
  },
  {
    id: 2,
    value: "expensive to cheapest",
    checked: false,
    typeFilter: "descending",
  },
  { id: 4, value: "latest", checked: false, typeFilter: "time" },
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
// const sizeFilter = [
//   { id: 1, value: "S", label: "S", checked: false },
//   { id: 2, value: "M", label: "M", checked: false },
//   { id: 3, value: "L", label: "L", checked: false },
//   { id: 4, value: "XL", label: "XL", checked: false },
//   { id: 5, value: "2XL", label: "2XL", checked: false },
//   // { id: 6, value: "3XL", label: "4XL", checked: false },
//   // { id: 7, value: "4XL", label: "4XL", checked: false },
//   // { id: 8, value: "5XL", label: "5XL", checked: false },
// ];
interface Props {
  data: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<any>>;
  setData: React.Dispatch<React.SetStateAction<any>>;
}
const Filtering: React.FC<Props> = ({ data, setData, open, setOpen }) => {
  const [openSort, setOpenSort] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openGender, setOpenGender] = useState(false);
  const [openOccasion, setOpenOccasion] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [gender, setGender] = useState<string>("");
  const [occasion, setOccasion] = useState([]);
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
  const handleSizes = (newSize: any) => {
    const foundSize = sizes.find((size: any) => size == newSize);

    if (!foundSize) {
      const newSizes: any = [...sizes, newSize];
      setSizes(newSizes);

      if (newSizes?.length > 0) {
        let finalFilteredData = data;
        finalFilteredData = finalFilteredData.filter((product: any) =>
          newSizes.some(
            (size: any) =>
              product.availableSizes.includes(size) &&
              product.availableSizes.some((availableSize: string) =>
                availableSize.startsWith(size)
              )
          )
        );

        setData(finalFilteredData);
      } else {
        setData(data);
      }
    } else if (foundSize) {
      const filteredData = sizes.filter((size: any) => size !== newSize);

      setSizes(filteredData);
      if (filteredData?.length > 0) {
        let finalFilteredData = data;
        finalFilteredData = finalFilteredData.filter((product: any) =>
          filteredData.some(
            (size) =>
              product.availableSizes.includes(size) &&
              product.availableSizes.some((availableSize: string) =>
                availableSize.startsWith(size)
              )
          )
        );
        setData(finalFilteredData);
      } else {
        setData(data);
      }
    }
  };
  const handleOccasions = (newOccasion: any) => {
    const foundOccasion = occasion.find(
      (occasion: any) => occasion == newOccasion
    );

    if (!foundOccasion) {
      const newOccasions: any = [...occasion, newOccasion];
      setOccasion(newOccasions);

      if (newOccasions?.length > 0) {
        let finalFilteredData = data;
        finalFilteredData = finalFilteredData.filter((product: any) =>
          newOccasions.some(
            (oldOccasion: any) =>
              product.clothOccasion.includes(oldOccasion) &&
              product.clothOccasion.some((singleOccasion: string) =>
                singleOccasion.startsWith(oldOccasion)
              )
          )
        );

        setData(finalFilteredData);
      } else {
        setData(data);
      }
    } else if (foundOccasion) {
      const filteredData = occasion.filter(
        (single: any) => single !== newOccasion
      );

      setOccasion(filteredData);
      if (filteredData?.length > 0) {
        let finalFilteredData = data;
        finalFilteredData = finalFilteredData.filter((product: any) =>
          filteredData.some(
            (singleOccasion) =>
              product.clothOccasion.includes(singleOccasion) &&
              product.clothOccasion.some((oneOccasion: string) =>
                oneOccasion.startsWith(singleOccasion)
              )
          )
        );
        setData(finalFilteredData);
      } else {
        setData(data);
      }
    }
  };
  const handleGenderFilter = (value: string) => {
    let finalFilteredData = data;

    setGender(value);
    if (value !== "") {
      finalFilteredData = finalFilteredData.filter(
        (product: any) =>
          product.forWhichGender.includes(value) &&
          product.forWhichGender.some((singleGender: string) =>
            singleGender.startsWith(value)
          )
      );

      setData(finalFilteredData);
    } else {
      setData(data);
    }
  };
  const handleGenderCheck = (value: string) => {
    const foundGender = gender == value;
    if (foundGender) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div
      // onClick={() => {
      //   openGender && setOpenGender(false);
      //   openSort && setOpenSort(false);
      //   openSize && setOpenSize(false);
      //   openOccasion && setOpenOccasion(false);
      // }}
      className="w-full  h-max p-6 z-4"
    >
      <div className="w-full  h-max ">
        <div className="w-full h-max flex flex-col  gap-6  ">
          <div className="w-full sm:w-64 h-max flex flex-wrap  items-center gap-6 ">
            {sizes?.map((size: any, id: number) => {
              return (
                <div
                  key={id + size}
                  onClick={() => handleSizes(size)}
                  className=" cursor-pointer hover:line-through w-max h-2 border border-indigo-300 hover:bg-red-100 gap-4  px-3 py-3 rounded-full flex items-center justify-center"
                >
                  <MdOutlineClose className="text-base text-gray-500  " />
                  <h1 className="font-medium text-sm ">{size}</h1>
                </div>
              );
            })}
            {occasion?.map((singleOccasion: any, id: number) => {
              return (
                <div
                  key={id + singleOccasion}
                  onClick={() => handleOccasions(singleOccasion)}
                  className=" cursor-pointer hover:line-through w-max h-2 border border-indigo-300 hover:bg-red-100 gap-4 p-1 px-3 py-3 rounded-full flex items-center justify-center"
                >
                  <MdOutlineClose className="text-base  text-gray-500  " />
                  <h1 className="font-medium text-sm ">{singleOccasion}</h1>
                </div>
              );
            })}
            {gender && (
              <div
                onClick={() => {
                  setData(data);
                  setGender("");
                }}
                className=" cursor-pointer hover:line-through w-max h-2 border border-indigo-300 hover:bg-red-100 gap-4 px-3 py-3 rounded-full flex items-center justify-center"
              >
                <MdOutlineClose className="text-3xl text-gray-500  " />
                <h1 className="font-medium text-sm ">{gender}</h1>
              </div>
            )}

            {/* <div className=" w-max h-2 border border-indigo-300 hover:bg-red-100 gap-4 p-1 px-6 py-6 rounded-full flex items-center justify-center">
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
        </div> */}
          </div>
          <div className="relative w-full">
            <h1 className="font-semibold text-lg">Filter Gender/Age</h1>
            {/* <div className=" w-max h-2 border border-indigo-300 bg-indigo-100 gap-4  px-4 py-4 rounded-sm flex items-center justify-center">
              <h1 className="font-medium text-sm">Gender & Age</h1>
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
            </div> */}
            {/* {openGender && ( */}
            <div className="bg-white w-full  sm:w-64 h-max  p-4 my-6 border-b border-gray-300 ">
              {genderFilter.map((filter: any) => {
                return (
                  <div
                    onClick={() => handleGenderFilter(filter.value)}
                    key={filter.id}
                    className=" w-full h-max flex items-center my-2 gap-4"
                  >
                    <input
                      type="radio"
                      onChange={() => setGender(filter.value)}
                      checked={gender == filter.value}
                      name="gender"
                      className="w-5 h-5 border border-gray-400 checked:bg-green-500 focus:ring-green-500 hover:bg-green-500 checked:text-green-500"
                    />
                    <label className="">{filter.value}</label>
                  </div>
                );
              })}
            </div>
            {/* // )} */}
          </div>
          <div className=" hidden sm:inline relative w-max">
            <h1 className="font-semibold text-lg">Filter Occasion</h1>
            {/* <div className=" w-max h-2 border border-indigo-300 bg-indigo-100 gap-4  px-4 py-4 rounded-sm flex items-center justify-center">
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
            </div> */}
            {/* {openOccasion && ( */}
            <div className="  bg-white  w-64 h-max  p-4 border-b border-b-gray-300 ">
              {OccasionsFilter.map((filter: any) => {
                return (
                  <div
                    key={filter.id}
                    onClick={() => handleOccasions(filter.value)}
                    className=" w-full h-max flex items-center my-8 gap-4"
                  >
                    <input
                      type="checkbox"
                      onChange={() => handleOccasions(filter.value)}
                      checked={
                        occasion.find((occ: any) => occ == filter.value)
                          ? true
                          : false
                      }
                      name="occasion"
                      className="w-5 h-5 border border-gray-400 checked:bg-green-500 focus:ring-green-500 hover:bg-green-500 checked:text-green-500"
                    />
                    <label className="">{filter.value}</label>
                  </div>
                );
              })}
            </div>
            {/* // )} */}
          </div>
          <div className=" hidden sm:inline relative w-max">
            <h1 className="font-semibold text-lg">Sort by</h1>
            {/* <div
              onClick={() => setOpenSort(!openSort)}
              className=" cursor-pointer  w-max h-2 border border-indigo-300 bg-indigo-100 gap-4  px-4 py-4 rounded-sm flex items-center justify-center"
            >
              <h1 className="font-medium text-sm">Sort</h1>
              {openSort ? (
                <MdKeyboardArrowUp className="text-3xl text-gray-500 border border-gray-200 " />
              ) : (
                <MdKeyboardArrowDown className="text-3xl text-gray-500 border border-gray-200 " />
              )}
            </div>
            {openSort && ( */}
            <div className="  bg-white w-64 h-max border-b border-b-gray-300  p-4 ">
              {sortProducts.map((sort: any) => {
                return (
                  <div
                    key={sort.id}
                    className=" w-full h-max flex items-center my-6 gap-4"
                  >
                    <input
                      type="radio"
                      onClick={() => handleSort(sort.typeFilter)}
                      defaultChecked={sort.checked}
                      name="sort"
                      className="w-5 h-5 border border-gray-400 checked:bg-green-500 focus:ring-green-500 hover:bg-green-500 checked:text-green-500"
                    />
                    <label className="">{sort.value}</label>
                  </div>
                );
              })}
            </div>
            {/* // )} */}
          </div>
          {/* <div className="hidden sm:inline relative w-max  ">
            <h1 className="font-semibold text-lg">Filter Size</h1> */}
          {/* <div className=" w-max h-2 border border-indigo-300 bg-indigo-100 gap-4 px-4 py-4 rounded-sm flex items-center justify-center">
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
            </div> */}
          {/* {openSize && ( */}
          {/* <div className="  bg-white border-b border-b-gray-300   w-64 h-max  px-4 ">
              {sizeFilter.map((size: any) => {
                return (
                  <div
                    key={size.id}
                    className=" w-full h-max flex items-center my-8 gap-4"
                  >
                    <input
                      type="checkbox"
                      onClick={() => handleSizes(size.value)}
                      checked={sizes.find(
                        (sizeExist) => sizeExist == size.value
                      )}
                      name="size"
                      className="w-5 h-5 border border-gray-400 checked:bg-green-500 focus:ring-green-500 hover:bg-green-500 checked:text-green-500"
                    />
                    <label className="">{size.value}</label>
                  </div>
                );
              })}
            </div> */}
          {/* // )} */}
          {/* <div className="w-full h-full absolute"></div>
          </div> */}

          {/* <div
            onClick={() => setOpen(!open)}
            className="w-max cursor-pointer h-2 border border-indigo-300 bg-indigo-100 gap-4 p-1  px-4 py-4 rounded-full flex items-center justify-center"
          >
            <h1 className="font-medium text-sm">All Filters</h1>
            <MdFilterListAlt className="text-xl text-gray-500 border border-gray-200 " />
          </div> */}
        </div>
        <div className=" w-full h-full flex items-center"></div>
      </div>
    </div>
  );
};

export default Filtering;
