import { IoMdArrowBack } from "react-icons/io";

const Cart: React.FC = () => {
  return (
    <main className="w-full flex justify-between min-h-screen p-2 bg-white">
      {/* left side cart */}
      <div className="">
        <div className=" w-full flex  gap-5 p-3">
          <IoMdArrowBack className="text-2xl text-gray-600  cursor-pointer" />

          <h1 className=" text-xl text-gray-600 mb-10">Home/Cart</h1>
        </div>
        <h1 className=" text-2xl tracking-widest font-bold ">Shopping Cart</h1>
      </div>
      {/* right side cart  */}
      <div className="w-1/4 bg-alice-blue mt-10  p-5 h-56 rounded-lg shadow-lg">
        <h1 className="my-6 text-xl mb-9">
          Subtotal(2 items) : <span className="font-bold tracking-wide">$49.50</span>
        </h1>
        <button className="w-full border border-orange-300 p-2 bg-orange-300 rounded-lg ">Proceed to Checkout</button>
      </div>
    </main>
  );
};

export default Cart;
