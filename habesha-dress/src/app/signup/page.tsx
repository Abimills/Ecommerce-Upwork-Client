"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import SearchBar from "../components/Navbar/SearchBar";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
const LoginPage: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<any>({
    name: "",
    email: "",
    gender: "Man",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [readTermsVerify, setReadTermsVerify] = useState(false);
  const showSearch = useSelector((state: any) => state.cart.showSearch);

  const showIcons = {
    search: true,
    user: true,
    wishlist: true,
    cart: true,
    navigation: true,
  };

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      data.name !== "" &&
      data.email !== "" &&
      data.gender !== "" &&
      data.password !== ""
    ) {
      try {
        setLoading(true);
        const res = await axios.post("/api/user", data);

        if (res.data.success) {
          toast.success("Registration Successful");
          router.push("/login");
          setLoading(false);
        } else if (res.data.registerIssue === "email exist") {
          toast.error("Email already Registered!", {
            position: "bottom-right",
          });
          setLoading(false);
        } else {
          toast.error(
            "Registration Failed ,try again please with new Email and valid password",
            {
              position: "bottom-right",
            }
          );
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log({ message: "error while registering user ", error });
      }
    } else {
      toast.error("Please Fill all Fields", {
        position: "bottom-right",
      });
    }
  };
  const handleDownloadTerms = () => {
    const pdfFile = "/terms.pdf";
    saveAs(pdfFile, "downloaded_file.pdf");
  };
  return (
    <div className="w-full font-Dosis     bg-white ">
      <div className="w-full   border border-gray-100 border-2 ">
        {showSearch ? (
          <SearchBar showIcons={showIcons} />
        ) : (
          <Navbar showIcons={showIcons} />
        )}
      </div>
      <ToastContainer />
      <section className="bg-white  relative my-8 p-4 py-15 rounded-full ">
        {loading && (
          <div className="fixed bg-gray-100  opacity-75 flex items-center justify-center top-0 w-full h-screen">
            <ReactLoading
              type={"spinningBubbles"}
              color={"#2d7e23"}
              height={64}
              width={64}
            />
          </div>
        )}

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-xl border border-green-100  md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6  w-full space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <form
                className=" w-full space-y-4 md:space-y-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    value={data.name}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    value={data.email}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john@gmail.com"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Gender
                  </label>
                  {/* <select
                    name="gender"
                    onChange={(e) => handleChange(e)}
                    value={data.gender}
                    required
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  > */}
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-6">
                      <input
                        type="radio"
                        className=" w-5 h-5 border border-gray-400 checked:bg-green-500 focus:ring-green-500 hover:bg-green-500 checked:text-green-500 "
                        name="gender"
                        value={"women"}
                        onChange={(e) => handleChange(e)}
                      />
                      <label>Woman</label>
                    </div>
                    <div className="flex items-center gap-6">
                      <input
                        type="radio"
                        name="gender"
                        onChange={(e) => handleChange(e)}
                        defaultChecked={true}
                        className=" w-5 h-5 border border-gray-400 checked:bg-green-500 focus:ring-green-500 hover:bg-green-500 checked:text-green-500 "
                        value={"man"}
                      />
                      <label>Man</label>
                    </div>
                  </div>

                  {/* </select> */}
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    value={data.password}
                    placeholder="••••••••"
                    required
                    className="bg-gray-50 border mb-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <div className=" px-2 flex items-center justify-between">
                    <p className="text-xs"> 8 characters</p>
                    <p className="text-xs"> 1 digit</p>
                    <p className="text-xs"> 1 capital letter</p>
                    <p className="text-xs"> 1 punctuation mark</p>
                  </div>
                </div>
                {/* <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    onChange={(e: any) => setPasswordAgain(e.target.value)}
                    placeholder="••••••••"
                    value={passwordAgain}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div> */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      aria-describedby="terms"
                      type="checkbox"
                      onChange={() => setReadTermsVerify(!readTermsVerify)}
                      required
                      className="w-5 h-5 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm flex">
                    <label className="font-light text-gray-500 dark:text-gray-300">
                      I accept the
                    </label>
                    <p
                      className="font-medium text-blue-600 hover:underline dark:text-primary-500 cursor-pointer"
                      onClick={handleDownloadTerms}
                    >
                      Terms and Conditions
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-black hover:bg-gray-900 focus:none focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
                      Create an account
                    </span>
                  )}{" "}
                </button>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400 ">
                  Already have an account?
                  <p
                    onClick={() => router.push("/login")}
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500 cursor-pointer"
                  >
                    Login here
                  </p>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LoginPage;
