import CartItem from "../CartItem/CartItem";
import { data } from "./data";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cart: React.FC<Props> = ({ setIsOpen, isOpen }) => {
  return (
    <section className=" fixed overflow-y-scroll top-0 right-0 bottom-0 w-72 bg-white shadow-lg  scrollbar-thin  ">
      <IoCloseOutline
        className=" text-2xl hover:text-red-600 cursor-pointer "
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className="w-full flex flex-col items-center justify-center p-2  mb-8 border-b border-gray-300">
        <h1 className="text-sm tracking-widest mb-1 mt-4">SubTotal</h1>
        <h1 className=" text-bold text-2xl text-black mb-5 ">$ 89.90</h1>
        <button className=" border border-gray-400 p-1 w-full px-10 text-sm rounded-xl mb-4">
          Go To Cart
        </button>
      </div>
      {data?.map((item: any) => {
        return <CartItem item={item} key={item.id} />;
      })}
    </section>
  );
};

export default Cart;
