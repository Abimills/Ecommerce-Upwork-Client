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
    <div className=" w-full flex flex-col items-center m-1 p-8 bg-alice-blue rounded-lg">
      <img className="w-full h-40 object-cover" src={img} alt={title} />
      <div className="w-full ">
        <div className="flex items-center justify-between w-full">
          <h2>{title}</h2>
          <p>rating-3</p>
        </div>
        <p>{price}</p>
        <div className="">
          <button>Add to Cart</button>
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
