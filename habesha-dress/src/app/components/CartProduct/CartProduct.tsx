import { TiTick } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "@/app/lib/hooks";
import {
  addToCart,
  removeFromCart,
  setCartQuantity,
} from "@/app/lib/cartSlice/cartSlice";

// interface Item {
//   id: string;
//   title: string;
//   description: string;
//   quantity: number;
//   img: string;
//   price: string;
//   rating: string;
//   available_sizes: string[];
//   available_colors: string[];
//   purchasedNo: number;
//   type: string;

//   chosen_colors: string;
//   chosen_sizes: string;
//   typeOfClothes: string;
// }
interface Props {
  product: any;
}
const CartProduct: React.FC<Props> = ({ product }) => {
  const { id, title, img, price, rating, quantity, chosenColor, chosenSize } =
    product;
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (id: any) => {
    dispatch(removeFromCart(id));
  };
  const handleSetQuantity = (id: any, quantity: any) => {
    quantity = parseInt(quantity);
    dispatch(setCartQuantity({ id, quantity }));
  };
  return (
    <section className="w-full flex items-start border-b-2  border-b border-gray-200 p-8">
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
            <div className="flex w-full gap-x-10 mt-9">
              <p className="w-32">{chosenColor}</p>
              <span className=" text-2xl text-gray-300">|</span>
              <p className="">{chosenSize} </p>
            </div>
            {/* <p className="mb-24 text-lg  font-semibold text-gray-700">
              ${price}
            </p> */}
            <div className="flex w-full   gap-x-10 mt-9 mb-16">
              <p className="text-2xl font-semibold text-green-600   text-gray-900 relative mr-4 font-poppins">
                <span className="text-base font-roboto text-lg  mr-0.5 relative bottom-1">
                  $
                </span>
                {parseInt(price) * quantity}
                <span className="text-base font-roboto  relative bottom-1 ml-1">
                  89
                </span>
              </p>
              <span className=" text-2xl text-gray-300">|</span>
              <p className="text-base text-orange-400 ">-20% off</p>
            </div>
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
          onChange={(e) => handleSetQuantity(id, e.target.value)}
          value={quantity}
          id=""
          className="border border-gray-200 p-1 px-3 outline-none rounded-md"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
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
