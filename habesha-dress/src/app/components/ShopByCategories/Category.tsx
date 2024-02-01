import CategoryCard from "../CategoryCard/CategoryCard";
import category from "./data.js";

const Category: React.FC = () => {
  return (
    <main className="w-full ">
      <h1 className="mt-8 mb-6 font-semibold text-gray-500">
        Shop By Categories
      </h1>

      <div className="flex w-full   gap-4 items-center">
        {category.map((item: any) => {
          return <CategoryCard key={item.id} item={item} />;
        })}
      </div>
    </main>
  );
};

export default Category;
