"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { saveAs } from "file-saver";
const LoginPage: React.FC = () => {
  const [data, setData] = useState<any>({
    name: "",
    email: "",
    gender: "",
    password: "",
  });
  const [passwordAgain, setPasswordAgain] = useState<any>("");
  const router = useRouter();

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      data.name !== "" &&
      data.email !== "" &&
      data.gender !== "" &&
      data.password !== "" &&
      data.passwordAgain !== ""
    ) {
      if (data.password === passwordAgain) {
        const res = await axios.post("http://localhost:3000/api/user", data);

        if (res.data.success) {
          alert("successfully registered");
          router.push("/login");
        } else {
          alert("could not register successfully");
        }
      } else {
        alert("Passwords do not match");
      }
    } else {
      alert("fill all fields");
    }
  };
  const handleDownloadTerms = () => {
    const pdfFile = "/terms.pdf";
    saveAs(pdfFile, "downloaded_file.pdf");
  };
  return (
    <div className="w-full   h-max  bg-white p-1">
      <section className="bg-white mt-16   mb-16 p-4 py-15 rounded-full">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-xl border border-green-100  md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                  <select
                    name="gender"
                    onChange={(e) => handleChange(e)}
                    value={data.gender}
                    required
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  >
                    <option value={"man"}>man</option>
                    <option value={"women"}>women</option>
                  </select>
                </div>
                <div>
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
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
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      aria-describedby="terms"
                      type="checkbox"
                      required
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
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
                  className="w-full text-white bg-black hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
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
    </div>
  );
};

export default LoginPage;
