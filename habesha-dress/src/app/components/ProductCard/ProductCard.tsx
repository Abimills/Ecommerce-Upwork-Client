import Link from "next/link";
import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";

interface Product {
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
  product: Product;
}
const ProductCard: React.FC<Props> = ({ product }) => {
  const { id, title, img, price, rating } = product;

  return (
    // <div className="w-60 shadow-2xl flex flex-col items-center m-1  bg-alice-blue p-3 rounded-lg">
    //   <img
    //     className="w-full h-40 object-cover rounded-lg"
    //     src={img}
    //     alt={title}
    //   />
    //   <div className="w-full flex flex-col p-2 gap-3 ">
    //     <div className="flex items-center justify-between  w-full">
    //       <h2>{title}</h2>
    //       <p>{rating}</p>
    //     </div>
    //     <p className="font-bold">{price}</p>
    //     <div className=" w-full flex items-center mt-4 justify-between">
    //       <button className="border border-gray-600 p-1 text-xs   rounded-sm ">
    //         Add to Cart
    //       </button>
    //       <button className="border border-orange-300 p-1 text-xs bg-orange-300 text-white rounded-sm ">
    //         Buy Now
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="w-80 max-w-sm bg-alice-blue   rounded-md shadow-lg relative  ">
      <IoIosHeartEmpty className="absolute  text-2xl m-1 text-orange-500 right-0 hover:text-3xl" />
      <Link href={`/${id}`}>
        <img
          className="object-contain w-full h-56 rounded-t-lg bg-gray-100 mb-10"
          src={img}
          alt="product image"
        />
      </Link>

      <div className="px-5 pb-5">
        <h5 className="text-lg font-semibold tracking-tight text-gray-900 ">
          {title}
        </h5>

        <div className="flex items-center justify-between mt-2.5 mb-5">
          <div className="flex items-center ">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <GoStarFill className="w-4 h-4 text-yellow-300" />
              <GoStarFill className="w-4 h-4 text-yellow-300" />
              <GoStarFill className="w-4 h-4 text-yellow-300" />
              <GoStarFill className="w-4 h-4 text-yellow-300" />
              <GoStar className="text-gray-300" />
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
              {rating}
            </span>
          </div>
          <p className="text-2xl  text-gray-900 relative mr-4 font-roboto">
            <span className="text-base absolute right-8 mr-3 mt-0.5 ">$</span>
            254
            <span className="text-base absolute left-8 ml-3  mt-0.5 ">89</span>
          </p>
        </div>
        <div className=" p-1 flex gap-3 w-full font-roboto mb-3">
          <p className=" text-xs text-gray-400  border border-gray-300 px-0.5 rounded-sm">
            S
          </p>
          <p className=" text-xs text-gray-400  border border-gray-300 px-0.5 rounded-sm">
            M
          </p>
          <p className=" text-xs text-gray-400  border border-gray-300 px-0.5 rounded-sm">
            L
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button className="text-white font-roboto bg-yellow-400  hover:bg-yellow-300 hover:text-black   font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
            Add to Cart
          </button>
          <button className="text-pink-400 font-roboto border border-pink-300 hover:bg-pink-400 hover:text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
