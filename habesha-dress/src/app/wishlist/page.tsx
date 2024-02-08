import { IoMdArrowBack } from "react-icons/io";
import data from "../components/Products/allProducts";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";
import Footer from "../components/Footer/Footer";
import ProductCard from "../components/ProductCard/ProductCard";

const Favorites: React.FC = () => {
  return (
    <main className="w-full min-h-screen  flex flex-col bg-white ">
      <div className="w-full flex items-center justify-between p-8 ">
        <div className=" w-1/2 flex items-center gap-10 p-1">
          <IoMdArrowBack className="text-2xl text-gray-600  cursor-pointer" />
          <h1 className="text-xl tracking-widest">FAVORITES CLOTHES</h1>
        </div>
        <div className="w-1/2  flex justify-end items-center gap-10">
          <button className="border border-black p-1 text-xs px-6  rounded-sm uppercase">
            Popular
          </button>
          <button className="border border-gray-400 p-1 text-xs px-6  text-gray-400 rounded-sm uppercase">
            New
          </button>
          <button className="border border-gray-400 p-1 text-xs px-6 text-gray-400  rounded-sm uppercase">
            Men
          </button>
          <button className="border border-gray-400 p-1 text-xs px-6 text-gray-400  rounded-sm uppercase ">
            Women
          </button>
        </div>
      </div>
      <div className="w-full border-b border-gray-600 p-2 mb-10"></div>
      <div className="w-full flex items-center flex-wrap items-center mb-16 justify-evenly gap-4">
        {data.map((item: any) => {
          return <ProductCard product={item} key={item.id} />;
        })}
      </div>
      <Footer />
    </main>
  );
};

export default Favorites;
