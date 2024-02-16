import { TiTick } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "@/app/lib/hooks";
import { addToCart, removeFromCart } from "@/app/lib/cartSlice/cartSlice";

interface Item {
  id: string;
  title: string;
  description: string;
  img: string;
  price: string;
  rating: string;
  available_sizes: string[];
  available_colors: string[];
  purchasedNo: number;
  type: string;
  typeOfClothes: string;
}
interface Props {
  product: Item;
}
const CartProduct: React.FC<Props> = ({ product }) => {
  const { id, title, img, price, rating } = product;
  console.log(product);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (id: any) => {
    dispatch(removeFromCart(id));
  };
  return (
    <section className="w-full flex items-start  border-b border-gray-400 p-8">
      <div className="w-full flex items-start justify-between">
        <img
          className="w-2/4 h-64 bg-gray-100 object-contain rounded-lg "
          src={img}
          alt={title}
        />
        <div className="">
          <div className="text-base text-lg font-base text-gray-500 font-poppins">
            <h2 className=" text-xl mb-7 text-base font-medium text-gray-600 ">
              {title}
            </h2>
            <div className="flex  gap-x-10 mt-9">
              <p className="">white/Orange </p>
              <span className=" text-2xl text-gray-300">|</span>
              <p className="">Small </p>
            </div>
            <p className="mb-24 text-lg  font-semibold text-gray-700">
              {price}
            </p>
          </div>
          <div className="text-base text-lg font-base text-gray-500 font-poppins">
            <p className="flex  items-center gap  ">
              {" "}
              <TiTick className="font-thinner text-2xl text-green-300 " /> In
              stock
            </p>
          </div>
        </div>
        <select
          name=""
          id=""
          className="border border-gray-200 p-1 px-3 outline-none rounded-md"
        >
          <option value="">1</option>
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
        </select>
        <IoMdClose
          className="text-2xl cursor-pointer text-gray-400 float-right"
          onClick={() => handleRemoveFromCart(id)}
        />
      </div>
    </section>
  );
};

export default CartProduct;
