import { useRouter } from "next/navigation";
import React from "react";
interface Item {
  img: string;
  title: string;
  desc: string;
}
interface Props {
  item: any;
}
const DiscountCard: React.FC<Props> = ({ item }) => {
  const router = useRouter();
  const { _id, img, title, desc, discount, price } = item.products;
  const discountInPercent = (discount / price) * 100;
  return (
    <div
      onClick={() => router.push(`discount/${_id}`)}
      className="flex h-48 rounded-lg  items-center gap-5 "
    >
      <img
        className="w-24 h-24 object-contain rounded-full hover:bg-yellow-300 bg-indigo-100"
        src={img}
        alt={title}
      />
      <div className=" flex  flex-col justify-start w-full hover:shadow-sm p-1">
        <h3 className="text-xl font-Dosis font-semibold text-gray-600 mb-4">
          {title.slice(0, 15)}...
        </h3>
        <p className=" text-sm text-green-400">
          {`${discountInPercent.toFixed(0)}% discount`}
        </p>
      </div>
    </div>
  );
};

export default DiscountCard;
