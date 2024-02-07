import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";

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
  const { title, img, price, rating } = product;

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

    <div className="w-96 max-w-sm bg-white   rounded-lg shadow-lg  ">
      <img
        className="object-contain w-full h-56 rounded-t-lg"
        src={img}
        alt="product image"
      />

      <div className="px-5 pb-5">
        <h5 className="text-lg font-semibold tracking-tight text-gray-900 ">
          Apple Watch Series
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
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            $599
          </span>y
        </div>
        <div className="flex items-center justify-between">
          <button className="text-white bg-green-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add to Cart
          </button>
          <button className="text-green-400 border border-green-400 hover:bg-green-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
