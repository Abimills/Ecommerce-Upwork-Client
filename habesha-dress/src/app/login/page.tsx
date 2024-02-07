import React from "react";

const LoginPage: React.FC = () => {
  return (
    <section className="w-full h-screen flex bg-alice-blue    flex-col  items-center justify-center">
      {/* <div className=" w-1/3 flex flex-col shadow-2xl  rounded-2xl">
        <div
          className=" bg-[url('/red.jpg')] bg-cover rounded-lg flex flex-col w-full h-full items-center
        justify-center h-64"
        >
          <h1 className="text-white tracking-wider text-xl mb-6">
            Don't have an account?
          </h1>

          <button className="p-1 text-sm rounded-full bg-white text-gray-500 px-5 mb-6">
            Sign up
          </button>
          <h1 className="mt-9 text-3xl text-white uppercase tracking-widest">
            Welcome
          </h1>
        </div>
        <div className="h-72 bg-white items-center justify-center p-3 rounded-2xl  flex flex-col w-full">
          <input
            type="text"
            placeholder="email"
            className=" w-full border border-gray-400 text-sm p-2 mb-3"
          />
          <input
            type="password"
            placeholder="password"
            className=" w-full border text-sm border-gray-400 p-2"
          />
          <button className="w-full mt-6 bg-black text-white hover uppercase mb-4 p-1">
            login
          </button>
          <p className="mt-2 text-center text-sm text-gray-500 ">
            Forgot your password?
          </p>
        </div>
      </div> */}

      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h5>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Lost Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <a
              href="#"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
