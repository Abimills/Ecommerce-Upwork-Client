interface Item {
  img: string;
  title: string;
  desc: string;
}
interface Props {
  item: Item;
}

const CategoryCard: React.FC<Props> = ({ item }) => {
  const { img, title, desc } = item;
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-60 h-80  rounded-full">
        <img
          src={img}
          alt={title}
          className=" rounded-lg h-full object-cover  w-full"
        />
      </div>

      <h2 className="text-lg font-semibold mt-4 italic   ">{title}</h2>
    </div>
  );
};

export default CategoryCard;
