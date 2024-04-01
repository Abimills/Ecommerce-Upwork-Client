import { TiTick } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { useAppDispatch } from "@/app/lib/hooks";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import {
  addToCart,
  removeFromCart,
  setCartQuantity,
} from "@/app/lib/cartSlice/cartSlice";
import { useState } from "react";

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
  const dispatch = useAppDispatch();
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
  const shortTitle = title.slice(0, 30);
  const [currentQuantity, setCurrentQuantity] = useState<number>(quantity || 1);
  const discountedPrice = (product?.discountedPrice * quantity).toFixed(2);

  const [discountedPart, decimalDiscountedPart] = discountedPrice.split(".");
  const handleRemoveFromCart = (id: any) => {
    dispatch(removeFromCart(id));
  };
  const handleSetQuantity = (id: any, quantity: any, operation: string) => {
    if (operation === "increment") {
      const newQuantity: number = currentQuantity + 1;
      setCurrentQuantity(newQuantity);
      dispatch(setCartQuantity({ id, newQuantity }));
    }
    if (operation === "decrement") {
      if (parseInt(quantity) > 1) {
        const newQuantity: number = currentQuantity - 1;
        setCurrentQuantity(newQuantity);
        dispatch(setCartQuantity({ id, newQuantity }));
      } else {
        const newQuantity: number = 1;
        setCurrentQuantity(newQuantity);
        dispatch(setCartQuantity({ id, newQuantity }));
      }
    }
  };
  const discountPercentage = (
    (parseFloat(discount) / parseFloat(price)) *
    100
  ).toFixed(0);
  const priceString = (price * currentQuantity).toFixed(2);
  const [wholePart, decimalPart] = priceString.split(".");
  console.log(currentQuantity);
  return (
    <section className="w-full flex items-start font-Dosis border-b-2  border-b border-gray-200 p-2 sm:p-8 mb-6">
      <div className="w-full flex-col gap-4 flex items-start flex-wrap ">
        <div className="w-full flex flex-col sm:flex-row  gap-4">
          <div className=" w-full sm:w-1/4">
            <img
              className="w-full lg:w-full h-64 mb-4 bg-white object-contain border rounded-sm border-gray-300 "
              src={img}
              alt={title}
            />
            <button
              onClick={() => handleRemoveFromCart(id)}
              className="bg-gray-200 text-black hover:bg-gray-300  px-3 rounded-sm text-sm"
            >
              delete
            </button>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex w-full  justify-between">
              <h2 className=" underline underline-offset-4 text-xl mb-7 text-base font-medium text-gray-700 capitalize">
                {shortTitle}...
              </h2>
              <div className="w-max">
                <p className="text-2xl text-gray-900 font-bold   font-Dosis">
                  <span className="text-sm font-medium text-black relative font-Dosis bottom-2   ">
                    $
                  </span>
                  {discountedPart}
                  <span className="text-base font-medium relative bottom-1 mr-0.5  ">
                    {decimalDiscountedPart}
                  </span>
                </p>
                {discount > 0 && (
                  <p className="text-md relative bottom-2  text-gray-200 font-medium line-through   font-Dosis ">
                    {/* <span className="text-sm font-medium font-Dosis text-gray-400 relative bottom-2   ">
                      $
                    </span> */}
                    {wholePart}
                    <span className="text-base font-medium relative bottom-1   ">
                      {decimalPart}
                    </span>
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <p className="w-40 text-gray-400 text-base">Available</p>
              </div>
              <p className="text-green-400 text-base mr-2">
                <span className="relative bottom-1 text-lg mr-0.5">
                  &#8595;
                </span>
                {discountPercentage}%
              </p>
            </div>
            <div
              className="w-full flex items-center
             justify-between mt-6"
            >
              <p className="flex gap-2 font-poppins">X {quantity}</p>
              <div className="flex  items-center gap-x-4">
                <button
                  onClick={() =>
                    handleSetQuantity(id, currentQuantity, "decrement")
                  }
                  className="rounded-full bg-red-100 text-3xl p-2"
                >
                  <AiOutlineMinus />
                </button>

                <p className="w-8 text-center text-xl">{quantity}</p>
                {/* <input
                  type="number"
                  min={1}
                  className="border-none outline-none w-8 text-center flex justify-center"
                  value={quantity}
                  onChange={(e) => handleSetQuantity(id, e.target.value)}
                /> */}
                <button
                  onClick={() =>
                    handleSetQuantity(id, currentQuantity, "increment")
                  }
                  className="rounded-full bg-red-100 text-3xl p-2"
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>
            <div className="flex  justify-end mt-6">
              <button className="bg-gray-800 hover:bg-gray-300 mr-2 text-white p-2 px-3 rounded-full text-sm">
                Give your body size
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center ml-2">
          <div className=" w-full flex items-center  text-base text-lg font-base text-gray-500 font-Dosis">
            <div className="w-full flex items-center">
              <div className="flex w-full  items-center   gap-x-10 mt-9">
                {/* <div className="flex items-center gap-4"> */}
              </div>
            </div>
          </div>
          <div className="text-base flex items-center w-full  gap-10 text-lg font-base text-gray-500 font-Dosis"></div>
        </div>
        {/* <div className="">
          <select
            name=""
            onChange={(e) => handleSetQuantity(id, e.target.value)}
            value={quantity}
            id=""
            className="border font-roboto border-gray-200 p-1 px-6 w-max outline-none rounded-md"
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
        </div> */}
        {/* <IoMdClose
          className="text-2xl cursor-pointer text-gray-400 "
          onClick={() => handleRemoveFromCart(id)}
        /> */}
      </div>
    </section>
  );
};

export default CartProduct;
