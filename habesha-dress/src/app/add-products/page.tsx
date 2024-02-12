"use client";

import { useState } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import validateData from "../util/validateData";
import axios from "axios";
interface ProductData {
  title: string;
  description: string;
  img: string;
  price: number;
  purchasedNo: number;
  rating: number;
  availableSizes: string[];
  availableColors: string[];
  boughtWithIds: string[];
  category: string[];
  forWhichGender: string[];
}
const AddProducts: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const [data, setData] = useState<ProductData>({
    title: "",
    description: "",
    img: "",
    price: 0,
    purchasedNo: 0,
    rating: 0,
    availableSizes: [],
    availableColors: [],
    boughtWithIds: [],
    category: [],
    forWhichGender: [],
  });
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];

    const newData = new FormData();
    newData.append("file", file);
    newData.append("upload_preset", "uploads");
    const imgUploaded = await axios.post(
      "https://api.cloudinary.com/v1_1/dnokvmwmd/image/upload",
      newData
    );
    const { url } = imgUploaded.data;
    setData({ ...data, img: url });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validatedData = validateData(data);
    console.log(validatedData);
    console.log(data);
    if (Object.keys(validatedData).length > 1) {
      alert("fill all fields please");
    } else {
      const res = await axios.post("http://localhost:3000/api/product", data);
      console.log(res.data);
      alert("product saved to database");
    }
  };

  return (
    <div className="">
      <Navbar />
      <section className="max-w-4xl p-6 mb-10 mx-auto bg-green-500 rounded-md shadow-md  mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Product Information
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-white dark:text-gray-200">
                Product Name
              </label>
              <input
                type="text"
                value={data.title}
                name="title"
                onChange={(e) => handleChange(e)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Price</label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={(e) => handleChange(e)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Purchased Number
              </label>
              <input
                type="number"
                value={data.purchasedNo}
                onChange={(e) => handleChange(e)}
                name="purchasedNo"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                For which gender
              </label>
              <select
                value={data.forWhichGender}
                onChange={(e) =>
                  setData({
                    ...data,
                    forWhichGender: [...data.forWhichGender, e.target.value],
                  })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>...</option>
                <option value={"Men"}>Men</option>
                <option value={"Women"}>Women</option>
                <option value={"Kids"}>Kids</option>
                <option value={"Uni Sex"}>Uni Sex</option>
              </select>
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Rating</label>
              <input
                type="number"
                value={data.rating}
                onChange={(e) => handleChange(e)}
                name="rating"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Bought With products
              </label>
              <input
                type="text"
                name="boughtWithIds"
                value={data.boughtWithIds}
                onChange={(e) => handleChange(e)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200">Colors</label>
              <select
                name="availableColors"
                onChange={(e) =>
                  setData({
                    ...data,
                    availableColors: [...data.availableColors, e.target.value],
                  })
                }
                value={data.availableColors}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>...</option>
                <option value={"Red"}>Red</option>
                <option value={"Green"}>Green</option>
                <option value={"White"}>White</option>
                <option value={"blue"}>blue</option>
                <option value={"green"}>green</option>
                <option value={"black"}>black</option>
                <option value={"yellow"}>yellow</option>
                <option value={""}>orange</option>
              </select>
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Sizes</label>
              <select
                name="availableSizes"
                onChange={(e) =>
                  setData({
                    ...data,
                    availableSizes: [...data.availableSizes, e.target.value],
                  })
                }
                value={data.availableSizes}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>...</option>
                <option value={"S"}>S</option>
                <option value={"M"}>M</option>
                <option value={"L"}>L</option>
                <option value={"XL"}>XL</option>
                <option value={"2XL"}>2XL</option>
                <option value={"3XL"}>3XL</option>
              </select>
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Category</label>
              <select
                onChange={(e) =>
                  setData({
                    ...data,
                    category: [...data.category, e.target.value],
                  })
                }
                value={data.category}
                name="category"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>...</option>
                <option value={"New Product"}>New Product</option>
                <option value={"Recommended"}>Recommended</option>
                <option value={"Popular"}>Popular</option>
              </select>
            </div>

            <div>
              <label className="text-white dark:text-gray-200">
                Product Description
              </label>
              <textarea
                name="description"
                onChange={(e) => handleChange(e)}
                value={data.description}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-white">
                Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span className="">Upload a file</span>
                      <input
                        name="file-upload"
                        onChange={(e) => handleImageChange(e)}
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1 text-white">or drag and drop</p>
                  </div>
                  <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </div>
  );
};
export default AddProducts;
