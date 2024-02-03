import { IoMdArrowBack } from "react-icons/io";
import { FaShoppingBag } from "react-icons/fa";
import data from "./wishData";
import CartProduct from "../components/CartProduct/CartProduct";
import Footer from "../components/Footer/Footer";
const Cart: React.FC = () => {
  return (
    <main className="w-full  min-h-screen p-2 bg-white">
      <div className=" w-full flex  gap-5 p-3">
        <IoMdArrowBack className="text-2xl text-gray-600  cursor-pointer" />

        <h1 className=" text-xl text-gray-600 mb-10">Home/Cart</h1>
      </div>
      <div className="w-full flex mb-24  justify-between min-h-screen p-2 bg-white">
        {/* left side cart */}
        <div className="w-full ">
          <h1 className=" text-2xl w-full text-center mb-5 flex justify-start gap-2  tracking-widest font-bold ">
            <FaShoppingBag className="mb-1 text-5xl" />
            <span className="mt-4">Shopping Cart </span>
          </h1>
          <div className="w-full flex flex-col">
            {data.map((item: any) => (
              <CartProduct key={item.id} product={item} />
            ))}
          </div>
        </div>
        {/* right side cart  */}
        <div className="w-1/4 bg-alice-blue mt-24  p-5 h-56 rounded-lg shadow-lg">
          <h1 className="my-6 text-xl mb-9">
            Subtotal(2 items) :{" "}
            <span className="font-bold tracking-wide">$49.50</span>
          </h1>
          <button className="w-full border border-orange-300 p-2 bg-orange-300 rounded-lg ">
            Proceed to Checkout
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Cart;
