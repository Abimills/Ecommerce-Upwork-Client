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
    <div className="w-60 shadow-2xl flex flex-col items-center m-1  bg-alice-blue p-3 rounded-lg">
      <img
        className="w-full h-40 object-cover rounded-lg"
        src={img}
        alt={title}
      />
      <div className="w-full flex flex-col p-2 gap-3 ">
        <div className="flex items-center justify-between  w-full">
          <h2>{title}</h2>
          <p>{rating}</p>
        </div>
        <p className="font-bold">{price}</p>
        <div className=" w-full flex items-center mt-4 justify-between">
          <button className="border border-gray-600 p-1 text-xs   rounded-sm ">
            Add to Cart
          </button>
          <button className="border border-orange-300 p-1 text-xs bg-orange-300 text-white rounded-sm ">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
