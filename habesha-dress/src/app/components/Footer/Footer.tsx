import React from "react";

const Footer = () => {
  return (
    <section className="w-full flex items-center flex-col ">
      <div className=" w-full flex items-center   justify-between py-4 text-sm font-medium leading-5 border border-t-gray-300">
        <div className="">
          <h1 className=" mb-3">Company Info</h1>
          <h3 className="">About Noami.net</h3>
        </div>
        <div className="">
          <h1 className=" mt-5 mb-3 pt-5">Contact Us:</h1>

          <p className="mb-1">how to contact us </p>
          <p className="mb-1">how to return </p>
          <p className="mb-1">how to order</p>
          <p className="mb-1">how to order custom products</p>
        </div>
        <div className="">
          <h1 className="text-center mt-5 mb-3 pt-5"> Company Policy</h1>

          <p className="mb-1">Returns Policy </p>
          <p className="mb-1">Privacy Policy</p>
          <p className="mb-1">Term of Use</p>
          <p className="mb-1">Cookie Notice</p>
        </div>
        <div className="">
          <h1 className="text-center mt-5 mb-3 pt-5"> Recommended</h1>

          <p className="mb-1">Dresses </p>
          <p className="mb-1">Shoes</p>
          <p className="mb-1">Men Trousers</p>
          <p className="mb-1">New Products</p>
          <p className="mb-1">popular</p>
        </div>
        <div className="">
          <h1 className=" mt-5 mb-3 pt-5"> Pages</h1>

          <p className="mb-1">Home </p>
          <p className="mb-1">All Products</p>
          <p className="mb-1">Categories</p>
          <p className="mb-1">Contact</p>
          <p className="mb-1">About Us</p>
        </div>
      </div>
      <div className="w-full flex  items-center justify-around ">
        <img className=" h-32 object-contain" src="../payment.jpg" alt="" />
        <p className="text-sm">&copy; 2024 Noami. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Footer;
