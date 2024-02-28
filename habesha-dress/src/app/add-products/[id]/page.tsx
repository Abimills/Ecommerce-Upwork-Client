"use client";

import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import validateData from "../../util/validateData";
import axios from "axios";
import { useSelector } from "react-redux";
import SearchBar from "../../components/Navbar/SearchBar";
import Navbar from "../../components/Navbar/Navbar";
import { useParams } from "next/navigation";
interface ProductData {
  title: string;
  description: string;
  img: string;
  price: number;
  discount: number;
  discountInPercent: number;
  purchasedNo: number;
  stock: number;
  likes: number;
  rating: number;
  availableSizes: string[];
  availableColors: string[];
  boughtWithIds: string[];
  category: string[];
  forWhichGender: string[];
  whichGroupCloth: string[];
  clothOccasion: string[];
  couples: string;
}
const showIcons = {
  search: true,
  user: true,
  wishlist: true,
  cart: true,
  navigation: true,
};
const AddProducts: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const param = useParams<{ id: string }>();

  const [id, setId] = useState(param?.id);

  const [data, setData] = useState<ProductData>({
    title: "",
    couples: "false",
    description: "",
    img: "",
    price: 0,
    discount: 0,
    discountInPercent: 0,
    stock: 0,
    likes: 0,
    purchasedNo: 0,
    rating: 0,
    availableSizes: [],
    clothOccasion: [],
    availableColors: [],
    whichGroupCloth: [],
    boughtWithIds: [],
    category: [],
    forWhichGender: [],
  });
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const showSearch = useSelector((state: any) => state.cart.showSearch);
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

    if (Object.keys(validatedData).length > 1) {
      alert("fill all fields please");
    } else {
      const res = await axios.put("http://localhost:3000/api/product", {
        ...data,
        id,
      });

      alert("product updated in database");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/product/?id=${param?.id}`
      );
      const cloth: any = res.data.cloth;
      setId(cloth?._id);
      setData({
        title: cloth?.title,
        couples: cloth?.couples,
        description: cloth?.description,
        img: cloth?.img,
        price: cloth?.price,
        discount: cloth?.discount,
        discountInPercent: cloth?.discountInPercent,
        stock: cloth?.stock,
        likes: cloth?.likes,
        purchasedNo: cloth?.purchasedNo,
        rating: cloth?.rating,
        availableSizes: cloth?.availableSizes,
        clothOccasion: cloth?.clothOccasion,
        availableColors: cloth?.availableColors,
        whichGroupCloth: cloth?.whichGroupCloth,
        boughtWithIds: cloth?.boughtWithIds,
        category: cloth?.category,
        forWhichGender: cloth?.forWhichGender,
      });
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white w-full ">
      {showSearch ? (
        <SearchBar showIcons={showIcons} />
      ) : (
        <Navbar showIcons={showIcons} />
      )}
      <section className="max-w-full p-6 mb-10 mx-auto bg-gray-700 rounded-md shadow-md  mt-20">
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
                Total Liked by users
              </label>
              <input
                type="number"
                name="likes"
                value={data.likes}
                onChange={(e) => handleChange(e)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Stock Status :
              </label>
              <input
                type="number"
                name="stock"
                value={data.stock}
                onChange={(e) => handleChange(e)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Discount</label>
              <input
                type="number"
                name="discount"
                value={data.discount}
                onChange={(e) => handleChange(e)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                Discount Percentage
              </label>
              <input
                type="number"
                name="discountInPercent"
                value={data.discountInPercent}
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
                Couples Clothes
              </label>
              <select
                value={data.couples}
                onChange={(e) =>
                  setData({
                    ...data,
                    couples: JSON.parse(e.target.value),
                  })
                }
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option value={"true"}>true</option>
                <option value={"false"}>false</option>
              </select>
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                For which gender
              </label>
              <select
                value={data.forWhichGender}
                onChange={(e: any) => {
                  const found = data?.forWhichGender?.find(
                    (item: any) => item == e.target.value
                  );
                  if (!found) {
                    setData({
                      ...data,

                      forWhichGender: [...data.forWhichGender, e.target.value],
                    });
                  }
                  return;
                }}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>...</option>
                <option value={"Men"}>Men</option>
                <option value={"Women"}>Women</option>
                <option value={"Kids"}>Kids</option>
                <option value={"Uni Sex"}>Uni Sex</option>
              </select>
              {data.forWhichGender.length > 0 && (
                <div className="w-max flex items-center gap-3 my-3">
                  {data?.forWhichGender?.map((item: any) => {
                    return (
                      <div className="text-white text-sm flex border border-white mx-1 w-max items-center bg-green-500 rounded-lg p-1">
                        <span
                          onClick={() =>
                            setData({
                              ...data,
                              forWhichGender: data.forWhichGender.filter(
                                (cat: any) => cat !== item
                              ),
                            })
                          }
                          className="hover:line-through cursor-pointer"
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Groups</label>
              <select
                value={data.whichGroupCloth}
                onChange={(e: any) => {
                  const found = data?.whichGroupCloth?.find(
                    (item: any) => item == e.target.value
                  );
                  if (!found) {
                    setData({
                      ...data,

                      whichGroupCloth: [
                        ...data.whichGroupCloth,
                        e.target.value,
                      ],
                    });
                  }
                  return;
                }}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>...</option>
                <option value={"Friends"}>Friends</option>
                <option value={"Family"}>Family</option>
                <option value={"Men Friends"}>Men Friends</option>
                <option value={"Women Friends"}>Women Friends</option>
                <option value={"Family Holiday"}>Family Holiday</option>
              </select>
              {data.whichGroupCloth.length > 0 && (
                <div className="w-max flex items-center gap-3 my-3">
                  {data?.whichGroupCloth?.map((item: any) => {
                    return (
                      <div className="text-white text-sm flex border border-white mx-1 w-max items-center bg-green-500 rounded-lg p-1">
                        <span
                          onClick={() =>
                            setData({
                              ...data,
                              whichGroupCloth: data.whichGroupCloth.filter(
                                (cat: any) => cat !== item
                              ),
                            })
                          }
                          className="hover:line-through cursor-pointer"
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              <label className="text-white dark:text-gray-200">
                For which occasions
              </label>
              <select
                value={data.clothOccasion}
                onChange={(e: any) => {
                  const found = data?.clothOccasion?.find(
                    (item: any) => item == e.target.value
                  );
                  if (!found) {
                    setData({
                      ...data,

                      clothOccasion: [...data.clothOccasion, e.target.value],
                    });
                  }
                  return;
                }}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>...</option>
                <option value={"Wedding"}>Wedding</option>
                <option value={"Holiday"}>Holiday</option>
                <option value={"Timket"}>Timket</option>
                <option value={"Awdeamet"}>Awdeamet</option>
                <option value={"Birthday"}>Birthday</option>
                <option value={"Other Occasions"}>Other Occasions</option>
              </select>
              {data.clothOccasion.length > 0 && (
                <div className="w-max flex items-center gap-3 my-3">
                  {data?.clothOccasion?.map((item: any) => {
                    return (
                      <div className="text-white text-sm flex border border-white mx-1 w-max items-center bg-green-500 rounded-lg p-1">
                        <span
                          onClick={() =>
                            setData({
                              ...data,
                              clothOccasion: data.clothOccasion.filter(
                                (cat: any) => cat !== item
                              ),
                            })
                          }
                          className="hover:line-through cursor-pointer"
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
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
                onChange={(e: any) => {
                  const found = data?.availableColors?.find(
                    (item: any) => item == e.target.value
                  );
                  if (!found) {
                    setData({
                      ...data,

                      availableColors: [
                        ...data.availableColors,
                        e.target.value,
                      ],
                    });
                  }
                  return;
                }}
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
              {data.availableColors.length > 0 && (
                <div className="w-max flex items-center gap-3 my-3">
                  {data?.availableColors?.map((item: any) => {
                    return (
                      <div className="text-white text-sm flex border border-white mx-1 w-max items-center bg-green-500 rounded-lg p-1">
                        <span
                          onClick={() =>
                            setData({
                              ...data,
                              availableColors: data.availableColors.filter(
                                (cat: any) => cat !== item
                              ),
                            })
                          }
                          className="hover:line-through cursor-pointer"
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Sizes</label>
              <select
                name="availableSizes"
                onChange={(e: any) => {
                  const found = data?.availableSizes?.find(
                    (item: any) => item == e.target.value
                  );
                  if (!found) {
                    setData({
                      ...data,
                      availableSizes: [...data.availableSizes, e.target.value],
                    });
                  }
                  return;
                }}
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
              {data.availableSizes.length > 0 && (
                <div className="w-max flex items-center gap-3 my-3">
                  {data?.availableSizes?.map((item: any) => {
                    return (
                      <div className="text-white text-sm flex border border-white mx-1 w-max items-center bg-green-500 rounded-lg p-1">
                        <span
                          onClick={() =>
                            setData({
                              ...data,
                              availableSizes: data.availableSizes.filter(
                                (cat: any) => cat !== item
                              ),
                            })
                          }
                          className="hover:line-through cursor-pointer"
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              <label className="text-white dark:text-gray-200">Category</label>
              <select
                onChange={(e: any) => {
                  const found = data?.category?.find(
                    (item: any) => item == e.target.value
                  );
                  if (!found) {
                    setData({
                      ...data,

                      category: [...data.category, e.target.value],
                    });
                  }
                  return;
                }}
                value={data.category}
                name="category"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              >
                <option>...</option>
                <option value={"New Product"}>New Product</option>
                <option value={"Recommended"}>Recommended</option>
                <option value={"Popular"}>Popular</option>
              </select>
              {data.category.length > 0 && (
                <div className="w-max flex items-center gap-3 my-3">
                  {data?.category?.map((item: any) => {
                    return (
                      <div className="text-white text-sm flex border border-white mx-1 w-max items-center bg-green-500 rounded-lg p-1">
                        <span
                          onClick={() =>
                            setData({
                              ...data,
                              category: data.category.filter(
                                (cat: any) => cat !== item
                              ),
                            })
                          }
                          className="hover:line-through cursor-pointer"
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
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
                  <p className="text-xs text-white">PNG, JPG, GIF up to 5MB</p>
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
