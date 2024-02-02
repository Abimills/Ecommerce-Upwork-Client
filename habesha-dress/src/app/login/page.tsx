import React from "react";

const LoginPage: React.FC = () => {
  return (
    <section className="w-full h-screen flex bg-alice-blue    flex-col  items-center justify-center">
      <div className=" w-1/3 flex flex-col shadow-2xl  rounded-2xl">
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
      </div>
    </section>
  );
};

export default LoginPage;
