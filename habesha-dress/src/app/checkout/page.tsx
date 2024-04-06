"use client";
import { IoMdArrowBack } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";

import { RiArrowGoBackLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IoHome } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAppSelector } from "@/app/lib/hooks";
import Footer from "@/app/components/Footer/Footer";
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator";

const Cart: React.FC = () => {
  const cartItems: any = useAppSelector((state: any) => state.cart.items) || [];
  const [deliveryData, setDeliveryData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    extraInformation: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [validateData, setValidateData] = useState({
    email: false,
    firstName: false,
    lastName: false,
    street: false,
    houseNumber: false,
    postalCode: false,
    city: false,
    phone: false,
  });
  const [searchingCity, setSearchingCity] = useState(false);
  const [searchResultCity, setSearchResultCity] = useState([]);
  const [searchingPostCode, setSearchingPostCode] = useState(false);
  const [searchResultPostCode, setSearchResultPostCode] = useState([]);
  const gateWay = useSelector((state: any) => state.cart.gateWay);

  const router = useRouter();
  const [errorInput, setErrorInput] = useState({
    email: false,
    firstName: false,
    lastName: false,
    street: false,
    houseNumber: false,
    postCode: false,
    city: false,
    phone: false,
  });
  // const [totalDiscount, setTotalDiscount] = useState<number>(0);

  const subTotal: number =
    cartItems.length > 0 &&
    cartItems
      ?.reduce(
        (total: number, current: any) =>
          total + parseFloat(current.price) * parseFloat(current.quantity),
        0
      )
      .toFixed(2);
  const subTotalDiscount: number =
    cartItems.length > 0 &&
    cartItems
      ?.reduce(
        (total: number, current: any) =>
          total + parseFloat(current.discount) * parseFloat(current.quantity),
        0
      )
      .toFixed(2);
  const total = (subTotal - subTotalDiscount).toFixed(2);
  const showIcons = {
    search: true,
    user: true,
    wishlist: true,
    cart: true,
    navigation: false,
  };
  const handleInput = (e: any) => {
    if (e.target.name === "streetAddress") {
      setSearching(true);
      setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value });
    } else if (e.target.name === "postalCode") {
      setSearchingPostCode(true);
      setDeliveryData({
        ...deliveryData,
        [e.target.name]: e.target.value?.trim(),
      });
    } else if (e.target.name === "city") {
      setSearchingCity(true);
      setDeliveryData({
        ...deliveryData,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(e.target.value)) {
        setValidateData({ ...validateData, email: true });
        setDeliveryData({
          ...deliveryData,
          [e.target.name]: e.target.value,
        });
      } else {
        setDeliveryData({
          ...deliveryData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === "firstName") {
      if (
        deliveryData.firstName !== "" &&
        deliveryData.firstName.trim().length > 1
      ) {
        setValidateData({ ...validateData, firstName: true });
        setDeliveryData({
          ...deliveryData,
          [e.target.name]: e.target.value,
        });
      } else {
        setValidateData({ ...validateData, firstName: false });
        setDeliveryData({
          ...deliveryData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === "lastName") {
      if (
        deliveryData.lastName !== "" &&
        deliveryData.lastName.trim().length > 1
      ) {
        setValidateData({ ...validateData, lastName: true });
        setDeliveryData({
          ...deliveryData,
          [e.target.name]: e.target.value,
        });
      } else {
        setValidateData({ ...validateData, lastName: false });
        setDeliveryData({
          ...deliveryData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === "houseNumber") {
      if (deliveryData.houseNumber !== "") {
        setValidateData({ ...validateData, houseNumber: true });
        setDeliveryData({
          ...deliveryData,
          [e.target.name]: e.target.value,
        });
      } else {
        setValidateData({ ...validateData, houseNumber: false });
        setDeliveryData({
          ...deliveryData,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === "phone") {
      if (deliveryData.phone !== "") {
        setValidateData({ ...validateData, phone: true });
        setDeliveryData({
          ...deliveryData,
          [e.target.name]: e.target.value,
        });
      } else {
        setValidateData({ ...validateData, phone: false });
        setDeliveryData({
          ...deliveryData,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmitToCheckout = async (e: any) => {
    e.preventDefault();
    if (
      !deliveryData.email ||
      !deliveryData.firstName ||
      !deliveryData.lastName ||
      !deliveryData.streetAddress ||
      !deliveryData.houseNumber ||
      !deliveryData.postalCode ||
      !deliveryData.city ||
      !deliveryData.phone
    ) {
      toast.error("Please fill out all fields!");
    } else {
      const products = cartItems.map((item: any) => {
        const finalPrice = item.discountedPrice.toFixed(0);

        return {
          id: item.id,
          title: item.title,
          img: item.img,
          price: finalPrice,
          quantity: item.quantity,
        };
      });

      try {
        const res = await axios.post(
          `${gateWay}/api/stripe/checkout_sessions`,
          {
            successUrl: `${gateWay}/successful-order`,
            cancelUrl: `${gateWay}/cart`,
            products,
          }
        );
        if (res.data.success) {
          localStorage.setItem("payId", JSON.stringify(res.data.id));
          const items =
            JSON.parse(localStorage.getItem("itemsBought") as string) || [];
          items.unshift(res.data.id);
          localStorage.setItem("itemsBought", JSON.stringify(items));
          localStorage.setItem("customerDetail", JSON.stringify(deliveryData));
          window.location.href = res.data.url;
        } else {
          console.log(res.data);
        }
      } catch (error) {
        console.log({ message: "error in payment", error });
      }
    }
  };
  const handleStreet = (value: string) => {
    setDeliveryData({ ...deliveryData, streetAddress: value });
    setSearchResult([]);
    setSearching(false);
    setValidateData({ ...validateData, street: true });
  };
  const handlePostCode = (value: string) => {
    setDeliveryData({ ...deliveryData, postalCode: value });
    setSearchResultPostCode([]);
    setSearchingPostCode(false);
    setValidateData({ ...validateData, postalCode: true });
  };
  const handleCity = (value: string) => {
    setDeliveryData({ ...deliveryData, city: value });
    setSearchResultCity([]);
    setSearchingCity(false);
    setValidateData({ ...validateData, city: true });
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        if (deliveryData.streetAddress && searching) {
          const res =
            await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${deliveryData.streetAddress}&format=json&apiKey=192d3a0385674930879b6e9e80d7e7ee
`);
          setSearchResult(res.data.results);
          console.log(res.data);
        }
        if (!deliveryData.streetAddress) {
          setSearchResult([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPostCode = async () => {
      try {
        if (deliveryData.postalCode && searchingPostCode) {
          const res =
            await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${deliveryData.postalCode}&format=json&apiKey=192d3a0385674930879b6e9e80d7e7ee
`);
          setSearchResultPostCode(res.data.results);
          console.log(res.data);
        } else if (!deliveryData.postalCode) {
          setSearchResultPostCode([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCity = async () => {
      try {
        if (deliveryData.city && searchingCity) {
          const res =
            await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${deliveryData.city}&format=json&apiKey=192d3a0385674930879b6e9e80d7e7ee
`);
          setSearchResultCity(res.data.results);
          console.log(res.data);
        } else if (!deliveryData.city) {
          setSearchResultCity([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCity();
    fetchAddress();
    fetchPostCode();
  }, [deliveryData.streetAddress, deliveryData.postalCode, deliveryData.city]);
  return (
    <main
      className="w-full flex flex-col items-center justify-center
      font-poppins  min-h-screen  bg-white"
    >
      <ToastContainer />
      <div className=" w-full px-2 lg:px-0 lg:w-1/2 ">
        {/* <div className="w-full mb-8">
          <div className="w-full flex gap-16 items-center py-4  px-16 border-2 rounded-sm border-gray-500">
            <IoHome className="text-2xl " />
            <div className="">
              <h1 className="text-xl font-semibold">Home Delivery</h1>
              <p
                className="
              "
              >
                1-2 weeks
              </p>
            </div>
          </div>
        </div> */}

        <form
          className="w-full mb-12"
          onSubmit={(e) => handleSubmitToCheckout(e)}
        >
          <h1 className="w-full text-center  mb-8 mt-12 text-3xl font-semibold">
            My Delivery Address
          </h1>
          <div className="w-full mb-8">
            <div className="w-full">
              <div className="w-full flex items-center sm:pr-2 justify-between border border-gray-300">
                <input
                  onChange={(e) => handleInput(e)}
                  name="email"
                  type="email"
                  value={deliveryData.email}
                  required
                  className={`${
                    errorInput.email &&
                    "border border-red-300 placeholder-red-400 "
                  } w-full border-none  `}
                  placeholder="Enter Email"
                />
                {validateData.email && (
                  <span className=" text-green-500 ml-1">✓</span>
                )}
              </div>
              {errorInput.email && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your Email Address
                </div>
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap sm:flex-nowrap gap-4 items-center mb-4">
            <div className="w-full sm:w-1/2">
              <div className="w-full flex items-center sm:pr-2 justify-between border border-gray-300">
                <input
                  type="text"
                  onChange={(e) => handleInput(e)}
                  name="firstName"
                  required
                  value={deliveryData.firstName}
                  className={`${
                    errorInput.firstName && "placeholder-red-400 "
                  } w-full border-none  `}
                  placeholder="First name"
                />
                {validateData.firstName && (
                  <span className=" text-green-500 ml-1">✓</span>
                )}
              </div>
              {errorInput.firstName && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your First name
                </div>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <div className="w-full flex items-center sm:pr-2 justify-between border border-gray-300">
                <input
                  type="text"
                  required
                  onChange={(e) => handleInput(e)}
                  name="lastName"
                  value={deliveryData.lastName}
                  className={`${
                    errorInput.lastName &&
                    "border border-red-300 placeholder-red-400 "
                  } w-full border-none `}
                  placeholder="Last name"
                />
                {validateData.lastName && (
                  <span className=" text-green-500 ml-1">✓</span>
                )}
              </div>
              {errorInput.lastName && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your Last name
                </div>
              )}
            </div>
          </div>

          {/* <h1 className="">Home Address</h1> */}
          <div className=" w-full relative flex-wrap sm:flex-nowrap flex gap-4 items-center mb-6 ">
            <div className="w-full sm:w-2/3 ">
              <div className="w-full flex items-center sm:pr-2 justify-between border border-gray-300">
                <input
                  type="text"
                  required
                  onChange={(e) => handleInput(e)}
                  name="streetAddress"
                  value={deliveryData.streetAddress}
                  className={`${
                    errorInput.street && " placeholder-red-400 "
                  } w-full border-none`}
                  placeholder="Street address"
                />
                {validateData.street && deliveryData.streetAddress && (
                  <span className=" text-green-500 ml-1">✓</span>
                )}
              </div>
              {errorInput.street && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your Street address
                </div>
              )}
              <div
                className={`w-full md:w-max  absolute h-max px-8 pt-2 bg-white z-20 `}
              >
                {searchResult?.length > 0 &&
                  searching &&
                  searchResult?.map((result: any, index: number) => {
                    return (
                      <div
                        key={result.formatted + index}
                        onClick={() => handleStreet(result.formatted)}
                        className="my-2 text-sm md:text-base cursor-pointer hover:text-green-400"
                      >
                        {result.formatted}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="w-full sm:w-1/3">
              <div className="w-full flex items-center  justify-between border border-gray-300">
                <input
                  type="text"
                  required
                  onChange={(e) => handleInput(e)}
                  name="houseNumber"
                  value={deliveryData.houseNumber}
                  className={`${
                    errorInput.houseNumber &&
                    "border border-red-300 placeholder-red-400 "
                  } w-full  border-none focus-none outline-none `}
                  placeholder="House number"
                />
                {validateData.houseNumber && deliveryData.houseNumber && (
                  <span className=" text-green-500 mx-1">✓</span>
                )}
              </div>
              {errorInput.houseNumber && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your House number
                </div>
              )}
            </div>
          </div>

          {/* <div className="w-full flex gap-4 items-center mb-6">
            <input
              type="text"
              onChange={(e) => handleInput(e)}
              name="extraInformation"
              value={deliveryData.extraInformation}
              className="w-full  border-b-2 border-gray-300 border-x-white border-t-white"
              placeholder="extra address Information (Optional)"
            />
          </div> */}
          <div className="w-full relative flex-wrap sm:flex-nowrap flex gap-4 items-center mb-6">
            <div className="w-full sm:w-1/2">
              <div className="w-full flex items-center  justify-between border border-gray-300">
                <input
                  type="text"
                  required
                  onChange={(e) => handleInput(e)}
                  name="postalCode"
                  value={deliveryData.postalCode}
                  className={`${
                    errorInput.postCode &&
                    "border border-red-300 placeholder-red-400 "
                  } w-full border-none`}
                  placeholder="Postal Code"
                />
                {validateData.postalCode && deliveryData.postalCode && (
                  <span className=" text-green-500 mx-1">✓</span>
                )}
              </div>
              {errorInput.postCode && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your Postal code
                </div>
              )}
              <div
                className={`w-full md:w-max  absolute h-max px-4 pt-2 bg-white z-10 `}
              >
                {searchResultPostCode?.length > 0 &&
                  searchingPostCode &&
                  searchResultPostCode?.map((result: any, index: number) => {
                    return (
                      <div
                        key={result.postcode + index}
                        onClick={() => handlePostCode(result.postcode)}
                        className="my-2 cursor-pointer hover:text-green-400"
                      >
                        {result.postcode}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="w-full flex items-center  justify-between border border-gray-300">
                <input
                  type="text"
                  required
                  onChange={(e) => handleInput(e)}
                  name="city"
                  value={deliveryData.city}
                  className={`${
                    errorInput.city &&
                    "border border-red-300 placeholder-red-400 "
                  } w-full border-none `}
                  placeholder="City / place"
                />
                {validateData.city && deliveryData.city && (
                  <span className=" text-green-500 mx-1">✓</span>
                )}
              </div>
              {errorInput.city && (
                <div className="text-red-400 flex items-center gap-2">
                  <BiError /> Enter your city and/or country
                </div>
              )}
              <div
                className={`w-full sm:w-max  absolute h-max px-4 pt-2 bg-white z-1 `}
              >
                {searchResultCity?.length > 0 &&
                  searchingCity &&
                  searchResultCity?.map((result: any, index: number) => {
                    return (
                      <div
                        key={result.country + index}
                        onClick={() =>
                          handleCity(`${result.city},${result.country}`)
                        }
                        className="my-2 cursor-pointer hover:text-green-400"
                      >
                        {`${result.city},${result.country}`}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="w-full  gap-4 items-center mb-6">
            <div className="w-full flex items-center  justify-between border border-gray-300">
              <input
                type="tel"
                required
                value={deliveryData.phone}
                onChange={(e) => handleInput(e)}
                name="phone"
                className={`w-full  border-none ${
                  errorInput.phone &&
                  "border border-red-300 placeholder-red-400 "
                } `}
                placeholder="Phone number"
              />
              {validateData.phone && deliveryData.phone && (
                <span className=" text-green-500 mx-1">✓</span>
              )}
            </div>
            {errorInput.phone && (
              <div className="text-red-400 flex items-center gap-2">
                <BiError /> Enter your Phone number
              </div>
            )}
          </div>
          <div className="w-full flex gap-4 items-center justify-center my-6 px-2">
            <button
              type="submit"
              className="w-full py-4 bg-gray-800 hover:bg-gray-600
            font-semibold text-lg sm:text-xl text-white rounded-lg"
            >
              Checkout
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </main>
  );
};

export default Cart;
