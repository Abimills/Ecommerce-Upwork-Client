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
  const {
    id,
    title,
    img,
    price,
    rating,
    quantity,
    discount,
    chosenColor,
    chosenSize,
  } = product;
  const shortTitle = title.slice(0, 10);
  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (id: any) => {
    dispatch(removeFromCart(id));
  };
  const handleSetQuantity = (id: any, quantity: any) => {
    quantity = parseInt(quantity);
    dispatch(setCartQuantity({ id, quantity }));
  };
  const discountPercentage = (
    (parseFloat(discount) / parseFloat(price)) *
    100
  ).toFixed(0);
  console.log(discount);
  const priceString = discount
    ? (price * quantity).toFixed(2)
    : (price * quantity).toFixed(2);
  const [wholePart, decimalPart] = priceString.split(".");
  return (
    <section className="w-full flex items-start border-b-2  border-b border-gray-200 p-8">
      <div className="w-full flex items-start justify-between">
        <img
          className="w-2/4 h-64 bg-gray-100 object-contain rounded-lg "
          src={img}
          alt={title}
        />
        <div className="w-full ml-2">
          <div className="text-base text-lg font-base text-gray-500 font-poppins">
            <h2 className=" text-xl mb-7 text-base font-medium text-gray-600 ">
              {shortTitle}...
            </h2>
            <div className="flex w-full  items-center   gap-x-10 mt-9">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <p className="w-40">Available</p>
              </div>
              {/* <span className=" text-2xl text-gray-300">|</span> */}
              <p className="">{chosenSize} </p>
            </div>
            {/* <p className="mb-24 text-lg  font-semibold text-gray-700">
              ${price}
            </p> */}
            <div className="flex w-full  items-center   gap-x-10 mt-9 mb-16">
              <p className="text-2xl w-40  text-gray-900 font-semibold   font-roboto cursor-pointer">
                <span className="text-sm font-medium text-black relative bottom-2 mr-0.5  ">
                  £
                </span>
                {wholePart}
                <span className="text-base font-medium relative bottom-1 mr-0.5  ">
                  {decimalPart}
                </span>
              </p>
              {/* <span className=" text-2xl text-gray-300">|</span> */}
              <p className="text-base text-green-400 ">
                {discount > 0 && ` - ${discountPercentage}% off`}
              </p>
            </div>
          </div>
          <div className="text-base flex items-center w-full  justify-between text-lg font-base text-gray-500 font-poppins">
            <button
              onClick={() => handleRemoveFromCart(id)}
              className="bg-gray-700 text-white p-1 px-3 rounded-sm text-sm"
            >
              delete
            </button>
            <button className="bg-gray-700 text-white p-1 px-3 rounded-sm text-sm">
              Give your body size
            </button>
          </div>
        </div>
        <select
          name=""
          onChange={(e) => handleSetQuantity(id, e.target.value)}
          value={quantity}
          id=""
          className="border border-gray-200 p-1 px-6 w-max outline-none rounded-md"
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
        {/* <IoMdClose
          className="text-2xl cursor-pointer text-gray-400 "
          onClick={() => handleRemoveFromCart(id)}
        /> */}
      </div>
    </section>
  );
};

export default CartProduct;
