import { IoMdArrowBack } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import data from "./wishData";
import CartProduct from "../components/CartProduct/CartProduct";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
const Cart: React.FC = () => {
  return (
    <main className="w-full  min-h-screen p-2 bg-white">
      <Navbar />
      <div className="w-full flex mb-24  justify-between min-h-screen p-5 gap-8 bg-white">
        {/* left side cart */}
        <div className="w-2/3 ">
          <h1 className=" text-4xl leading-7 font-poppins w-full  r mb-5 flex justify-start gap-2  text-gray-600   font-semibold ">
            <FaShoppingBag className="mb-1 text-2xl" />
            <span className="mt-4">Shopping Cart </span>
          </h1>
          <div className="w-full flex flex-col">
            {data.map((item: any) => (
              <CartProduct key={item.id} product={item} />
            ))}
          </div>
        </div>
        {/* right side cart  */}
        <div className="w-1/3 bg-gray-100 font-poppins  text-base mt-24  p-8 h-max rounded-lg shadow-lg">
          <h1 className="text-xl font-medium mb-7 ">Order summary</h1>
          <div className="w-full flex items-center justify-between border-b border-gray-300">
            <p className="text-base text-lg text-gray-600 my-4 ">Subtotal</p>
            <p className="my-4 font-medium">$97.00</p>
          </div>
          <div className="w-full flex items-center justify-between border-b border-gray-300">
            <p className="text-base text-lg text-gray-600 my-4 ">
              Shipping estimate
            </p>
            <p className="my-4 font-medium">$5.00</p>
          </div>
          <div className="w-full flex items-center justify-between border-b border-gray-300">
            <p className="text-base text-lg text-gray-600 my-4 ">
              Tax estimate
            </p>
            <p className="my-4 font-medium">$8.32</p>
          </div>
          <div className="w-full flex items-center mt-2 justify-between ">
            <p className="text-base font-semibold text-lg text-gray-600 my-4 ">
              Order total
            </p>
            <p className="my-4 font-semibold">$134.32</p>
          </div>
          <button className=" w-full my-4 border border-indigo-200 p-2 bg-indigo-600 py-4 font-semibold tracking-wide text-lg rounded-lg text-white">
            Checkout
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Cart;
