import ProductCard from "../ProductCard/ProductCard";
import allProducts from "./allProducts.js";

const Products: React.FC = () => {
  return (
    <main className="w-full  h-full flex flex-col">
      <h1 className="mb-4 mt-16">Popular Products</h1>

      <div className="w-full flex items-center gap-4 justify-between flex-wrap">
        {allProducts.map((item: any) => {
          return <ProductCard key={item.id} product={item} />;
        })}
      </div>
    </main>
  );
};

export default Products;
