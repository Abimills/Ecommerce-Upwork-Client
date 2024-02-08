import ProductCard from "../ProductCard/ProductCard";
import allProducts from "../Products/allProducts";

const NewProduct: React.FC = () => {
  return (
    <main className="w-full flex flex-col mt-16 items-center justify-start">
      <h1 className=" w-full text-left mb-16 font-semibold font-roboto text-3xl">
        New & Recommended Products
      </h1>
      <div className="w-full flex flex-wrap justify-between items-center">
        {allProducts?.slice(0, 5).map((product: any) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </main>
  );
};

export default NewProduct;
